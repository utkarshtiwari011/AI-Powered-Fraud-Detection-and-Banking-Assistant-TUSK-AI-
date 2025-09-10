-- Create AI Analytics table
CREATE TABLE public.ai_analytics (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id),
  session_id TEXT NOT NULL,
  model_type TEXT NOT NULL CHECK (model_type IN ('fraud_detection', 'banking_assistant', 'risk_assessment', 'sentiment_analysis')),
  input_data JSONB NOT NULL,
  output_data JSONB NOT NULL,
  confidence_score NUMERIC(5,4) CHECK (confidence_score >= 0 AND confidence_score <= 1),
  processing_time_ms INTEGER NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create ML Model Performance table
CREATE TABLE public.ml_model_performance (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  model_name TEXT NOT NULL,
  model_version TEXT NOT NULL,
  accuracy NUMERIC(5,4) NOT NULL,
  precision_score NUMERIC(5,4) NOT NULL,
  recall NUMERIC(5,4) NOT NULL,
  f1_score NUMERIC(5,4) NOT NULL,
  training_date TIMESTAMP WITH TIME ZONE NOT NULL,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create Real-time Monitoring table
CREATE TABLE public.real_time_monitoring (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  metric_type TEXT NOT NULL CHECK (metric_type IN ('api_response_time', 'model_accuracy', 'system_load', 'error_rate')),
  metric_value NUMERIC NOT NULL,
  threshold_value NUMERIC,
  status TEXT NOT NULL CHECK (status IN ('normal', 'warning', 'critical')),
  alert_sent BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.ai_analytics ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.ml_model_performance ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.real_time_monitoring ENABLE ROW LEVEL SECURITY;

-- Create policies for ai_analytics
CREATE POLICY "Users can view their own analytics" 
ON public.ai_analytics 
FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own analytics" 
ON public.ai_analytics 
FOR INSERT 
WITH CHECK (auth.uid() = user_id);

-- Create policies for ml_model_performance (read-only for users)
CREATE POLICY "Anyone can view model performance" 
ON public.ml_model_performance 
FOR SELECT 
USING (true);

-- Create policies for real_time_monitoring (read-only for users)
CREATE POLICY "Anyone can view monitoring data" 
ON public.real_time_monitoring 
FOR SELECT 
USING (true);

-- Create indexes for better performance
CREATE INDEX idx_ai_analytics_user_id ON public.ai_analytics(user_id);
CREATE INDEX idx_ai_analytics_model_type ON public.ai_analytics(model_type);
CREATE INDEX idx_ai_analytics_created_at ON public.ai_analytics(created_at);
CREATE INDEX idx_ml_model_performance_active ON public.ml_model_performance(is_active);
CREATE INDEX idx_real_time_monitoring_status ON public.real_time_monitoring(status);
CREATE INDEX idx_real_time_monitoring_created_at ON public.real_time_monitoring(created_at);