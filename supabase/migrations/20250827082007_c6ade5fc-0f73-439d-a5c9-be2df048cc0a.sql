-- Add 2FA and enhanced security features to user profiles
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS 
  two_factor_enabled boolean DEFAULT false,
ADD COLUMN IF NOT EXISTS 
  two_factor_secret text,
ADD COLUMN IF NOT EXISTS 
  backup_codes jsonb DEFAULT '[]'::jsonb,
ADD COLUMN IF NOT EXISTS 
  failed_login_attempts integer DEFAULT 0,
ADD COLUMN IF NOT EXISTS 
  account_locked_until timestamptz,
ADD COLUMN IF NOT EXISTS 
  last_login timestamptz,
ADD COLUMN IF NOT EXISTS 
  password_changed_at timestamptz DEFAULT now(),
ADD COLUMN IF NOT EXISTS 
  role text DEFAULT 'user',
ADD COLUMN IF NOT EXISTS 
  department text,
ADD COLUMN IF NOT EXISTS 
  employee_id text,
ADD COLUMN IF NOT EXISTS 
  security_clearance text DEFAULT 'standard',
ADD COLUMN IF NOT EXISTS 
  terms_accepted_at timestamptz,
ADD COLUMN IF NOT EXISTS 
  privacy_accepted_at timestamptz,
ADD COLUMN IF NOT EXISTS 
  compliance_training_completed boolean DEFAULT false;

-- Create index for faster lookups
CREATE INDEX IF NOT EXISTS idx_profiles_two_factor ON public.profiles(two_factor_enabled);
CREATE INDEX IF NOT EXISTS idx_profiles_role ON public.profiles(role);
CREATE INDEX IF NOT EXISTS idx_profiles_account_locked ON public.profiles(account_locked_until);

-- Create a table for login attempts and security logs
CREATE TABLE IF NOT EXISTS public.security_logs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users NOT NULL,
  event_type text NOT NULL,
  ip_address inet,
  user_agent text,
  success boolean NOT NULL,
  metadata jsonb DEFAULT '{}'::jsonb,
  created_at timestamptz DEFAULT now()
);

-- Enable RLS on security_logs
ALTER TABLE public.security_logs ENABLE ROW LEVEL SECURITY;

-- Create policies for security_logs
CREATE POLICY "Users can view their own security logs" 
ON public.security_logs 
FOR SELECT 
USING (auth.uid() = user_id);

-- Only system can insert security logs (for now, later we'll use edge functions)
CREATE POLICY "System can insert security logs" 
ON public.security_logs 
FOR INSERT 
WITH CHECK (true);

-- Create function to handle account lockout
CREATE OR REPLACE FUNCTION public.handle_failed_login(user_email text)
RETURNS boolean
LANGUAGE plpgsql
SECURITY DEFINER
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

-- Create function to reset failed attempts on successful login
CREATE OR REPLACE FUNCTION public.reset_failed_attempts(user_email text)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
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

-- Create function to check if account is locked
CREATE OR REPLACE FUNCTION public.is_account_locked(user_email text)
RETURNS boolean
LANGUAGE plpgsql
SECURITY DEFINER
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