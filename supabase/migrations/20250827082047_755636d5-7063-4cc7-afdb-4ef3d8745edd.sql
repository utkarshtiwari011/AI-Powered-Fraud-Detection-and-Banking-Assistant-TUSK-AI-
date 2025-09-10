-- Fix security issues from the linter
-- Update all functions to include proper search_path

-- Fix handle_failed_login function
CREATE OR REPLACE FUNCTION public.handle_failed_login(user_email text)
RETURNS boolean
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  user_record public.profiles%ROWTYPE;
  lockout_duration interval := '30 minutes';
  max_attempts integer := 5;
BEGIN
  -- Get user profile
  SELECT p.* INTO user_record
  FROM public.profiles p
  JOIN auth.users u ON p.user_id = u.id
  WHERE u.email = user_email;
  
  IF user_record.user_id IS NULL THEN
    RETURN false;
  END IF;
  
  -- Increment failed attempts
  UPDATE public.profiles 
  SET failed_login_attempts = COALESCE(failed_login_attempts, 0) + 1
  WHERE user_id = user_record.user_id;
  
  -- Check if account should be locked
  IF user_record.failed_login_attempts + 1 >= max_attempts THEN
    UPDATE public.profiles 
    SET account_locked_until = now() + lockout_duration
    WHERE user_id = user_record.user_id;
    RETURN true; -- Account is now locked
  END IF;
  
  RETURN false; -- Account not locked yet
END;
$$;

-- Fix reset_failed_attempts function
CREATE OR REPLACE FUNCTION public.reset_failed_attempts(user_email text)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  UPDATE public.profiles 
  SET 
    failed_login_attempts = 0,
    account_locked_until = NULL,
    last_login = now()
  FROM auth.users u
  WHERE profiles.user_id = u.id AND u.email = user_email;
END;
$$;

-- Fix is_account_locked function
CREATE OR REPLACE FUNCTION public.is_account_locked(user_email text)
RETURNS boolean
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  locked_until timestamptz;
BEGIN
  SELECT p.account_locked_until INTO locked_until
  FROM public.profiles p
  JOIN auth.users u ON p.user_id = u.id
  WHERE u.email = user_email;
  
  IF locked_until IS NULL THEN
    RETURN false;
  END IF;
  
  IF locked_until > now() THEN
    RETURN true;
  ELSE
    -- Unlock account if time has passed
    UPDATE public.profiles 
    SET account_locked_until = NULL
    FROM auth.users u
    WHERE profiles.user_id = u.id AND u.email = user_email;
    RETURN false;
  END IF;
END;
$$;

-- Fix handle_new_user function
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (user_id, full_name)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'full_name', NEW.email)
  );
  RETURN NEW;
END;
$$;

-- Fix update_updated_at_column function
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS trigger
LANGUAGE plpgsql
SET search_path = public
AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;