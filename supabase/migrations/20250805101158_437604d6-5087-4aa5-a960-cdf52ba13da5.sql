-- Real-time trading data tables
CREATE TABLE public.trading_data (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  symbol TEXT NOT NULL,
  price NUMERIC NOT NULL,
  volume BIGINT NOT NULL,
  timestamp TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  market_status TEXT NOT NULL DEFAULT 'open',
  change_percent NUMERIC,
  bid_price NUMERIC,
  ask_price NUMERIC,
  metadata JSONB DEFAULT '{}'::jsonb
);

-- Behavioral biometrics for user authentication
CREATE TABLE public.user_biometrics (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  session_id TEXT NOT NULL,
  keystroke_dynamics JSONB,
  mouse_patterns JSONB,
  device_fingerprint JSONB,
  geolocation JSONB,
  risk_score NUMERIC DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  is_verified BOOLEAN DEFAULT false
);

-- Investment recommendations
CREATE TABLE public.investment_recommendations (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  asset_type TEXT NOT NULL,
  symbol TEXT NOT NULL,
  recommendation_type TEXT NOT NULL, -- 'buy', 'sell', 'hold'
  confidence_score NUMERIC NOT NULL,
  target_price NUMERIC,
  reasoning JSONB,
  ai_model_used TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  expires_at TIMESTAMP WITH TIME ZONE,
  is_active BOOLEAN DEFAULT true
);

-- Enhanced fraud detection with ensemble models
CREATE TABLE public.fraud_ensemble_results (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  transaction_id TEXT NOT NULL,
  user_id UUID,
  model_1_score NUMERIC NOT NULL,
  model_2_score NUMERIC NOT NULL,
  model_3_score NUMERIC NOT NULL,
  ensemble_score NUMERIC NOT NULL,
  prediction TEXT NOT NULL,
  confidence NUMERIC NOT NULL,
  risk_factors JSONB,
  behavioral_score NUMERIC,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Spending pattern analytics
CREATE TABLE public.spending_analytics (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  category TEXT NOT NULL,
  predicted_amount NUMERIC NOT NULL,
  actual_amount NUMERIC,
  time_period TEXT NOT NULL, -- 'daily', 'weekly', 'monthly'
  confidence_interval JSONB,
  trends JSONB,
  anomalies JSONB,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Document processing results
CREATE TABLE public.document_analysis (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  document_type TEXT NOT NULL,
  file_url TEXT,
  extracted_data JSONB,
  entities JSONB,
  sentiment_score NUMERIC,
  processing_status TEXT DEFAULT 'pending',
  ai_confidence NUMERIC,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  processed_at TIMESTAMP WITH TIME ZONE
);

-- Real-time alerts
CREATE TABLE public.real_time_alerts (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID,
  alert_type TEXT NOT NULL,
  severity TEXT NOT NULL, -- 'low', 'medium', 'high', 'critical'
  title TEXT NOT NULL,
  message TEXT NOT NULL,
  metadata JSONB,
  is_read BOOLEAN DEFAULT false,
  is_dismissed BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  expires_at TIMESTAMP WITH TIME ZONE
);

-- Live chat sessions
CREATE TABLE public.chat_sessions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID,
  session_type TEXT NOT NULL DEFAULT 'support', -- 'support', 'ai_advisor', 'trading'
  status TEXT NOT NULL DEFAULT 'active', -- 'active', 'ended', 'transferred'
  ai_model TEXT,
  context JSONB,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  ended_at TIMESTAMP WITH TIME ZONE
);

-- Enable RLS on all tables
ALTER TABLE public.trading_data ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_biometrics ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.investment_recommendations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.fraud_ensemble_results ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.spending_analytics ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.document_analysis ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.real_time_alerts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.chat_sessions ENABLE ROW LEVEL SECURITY;

-- Create policies for trading data (public read for market data)
CREATE POLICY "Anyone can view trading data" 
ON public.trading_data 
FOR SELECT 
USING (true);

-- Create policies for user-specific data
CREATE POLICY "Users can view their own biometrics" 
ON public.user_biometrics 
FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own biometrics" 
ON public.user_biometrics 
FOR INSERT 
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can view their own investment recommendations" 
ON public.investment_recommendations 
FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Users can view their own fraud results" 
ON public.fraud_ensemble_results 
FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Users can view their own spending analytics" 
ON public.spending_analytics 
FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Users can view their own document analysis" 
ON public.document_analysis 
FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own document analysis" 
ON public.document_analysis 
FOR INSERT 
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can view their own alerts" 
ON public.real_time_alerts 
FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Users can update their own alerts" 
ON public.real_time_alerts 
FOR UPDATE 
USING (auth.uid() = user_id);

CREATE POLICY "Users can view their own chat sessions" 
ON public.chat_sessions 
FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own chat sessions" 
ON public.chat_sessions 
FOR INSERT 
WITH CHECK (auth.uid() = user_id);

-- Create indexes for performance
CREATE INDEX idx_trading_data_symbol_timestamp ON public.trading_data(symbol, timestamp DESC);
CREATE INDEX idx_user_biometrics_user_session ON public.user_biometrics(user_id, session_id);
CREATE INDEX idx_investment_recommendations_user_active ON public.investment_recommendations(user_id, is_active);
CREATE INDEX idx_fraud_ensemble_transaction ON public.fraud_ensemble_results(transaction_id);
CREATE INDEX idx_spending_analytics_user_period ON public.spending_analytics(user_id, time_period);
CREATE INDEX idx_document_analysis_user_status ON public.document_analysis(user_id, processing_status);
CREATE INDEX idx_real_time_alerts_user_read ON public.real_time_alerts(user_id, is_read);
CREATE INDEX idx_chat_sessions_user_status ON public.chat_sessions(user_id, status);

-- Enable real-time for critical tables
ALTER TABLE public.trading_data REPLICA IDENTITY FULL;
ALTER TABLE public.real_time_alerts REPLICA IDENTITY FULL;
ALTER TABLE public.fraud_ensemble_results REPLICA IDENTITY FULL;

-- Add tables to realtime publication
ALTER PUBLICATION supabase_realtime ADD TABLE public.trading_data;
ALTER PUBLICATION supabase_realtime ADD TABLE public.real_time_alerts;
ALTER PUBLICATION supabase_realtime ADD TABLE public.fraud_ensemble_results;