import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.7.1';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface TransactionData {
  transaction_id: string;
  user_id?: string;
  amount: number;
  merchant_name: string;
  location: string;
  device_id?: string;
  card_present: boolean;
  customer_ip?: string;
  transaction_time?: string;
  merchant_category?: string;
  previous_transactions?: any[];
}

interface EnsembleResult {
  transaction_id: string;
  user_id?: string;
  model_1_score: number;
  model_2_score: number;
  model_3_score: number;
  ensemble_score: number;
  prediction: string;
  confidence: number;
  risk_factors: string[];
  behavioral_score: number;
}

class EnsembleFraudDetection {
  // Model 1: Rule-based anomaly detection
  static model1_anomaly_detection(data: TransactionData): number {
    let score = 0;
    
    // High amount transactions
    if (data.amount > 10000) score += 0.4;
    else if (data.amount > 5000) score += 0.2;
    
    // Time-based patterns
    const hour = new Date().getHours();
    if (hour < 6 || hour > 22) score += 0.3;
    
    // Location-based risk
    const highRiskLocations = ['Unknown', 'Foreign', 'ATM'];
    if (highRiskLocations.some(loc => data.location.includes(loc))) {
      score += 0.3;
    }
    
    // Card not present transactions
    if (!data.card_present && data.amount > 1000) score += 0.25;
    
    return Math.min(score, 1.0);
  }

  // Model 2: Machine Learning-style behavioral analysis
  static model2_behavioral_analysis(data: TransactionData): number {
    let score = 0;
    
    // Velocity checks (simulated)
    const transactionCount = data.previous_transactions?.length || 0;
    if (transactionCount > 10) score += 0.4;
    else if (transactionCount > 5) score += 0.2;
    
    // Amount deviation from user's typical spending
    const avgAmount = data.previous_transactions?.reduce((sum, t) => sum + t.amount, 0) / Math.max(transactionCount, 1) || 100;
    const deviation = Math.abs(data.amount - avgAmount) / avgAmount;
    if (deviation > 5) score += 0.5;
    else if (deviation > 2) score += 0.3;
    
    // Merchant category risk
    const highRiskCategories = ['Cash Advance', 'Gambling', 'Adult'];
    if (highRiskCategories.includes(data.merchant_category || '')) {
      score += 0.3;
    }
    
    return Math.min(score, 1.0);
  }

  // Model 3: Deep learning simulation
  static model3_deep_learning_simulation(data: TransactionData): number {
    // Simulate complex pattern recognition
    const features = [
      data.amount / 10000,
      data.card_present ? 0 : 1,
      Math.random(), // Simulated device fingerprinting
      Math.random(), // Simulated geolocation analysis
      Math.random()  // Simulated network analysis
    ];
    
    // Simulated neural network weights
    const weights = [0.3, 0.25, 0.2, 0.15, 0.1];
    const bias = -0.1;
    
    let score = bias;
    for (let i = 0; i < features.length; i++) {
      score += features[i] * weights[i];
    }
    
    // Apply sigmoid activation
    return 1 / (1 + Math.exp(-score * 5));
  }

  // Ensemble combination using weighted voting
  static combineModels(scores: [number, number, number]): { ensemble_score: number; confidence: number } {
    const weights = [0.4, 0.35, 0.25]; // Weights for each model
    const ensemble_score = scores.reduce((sum, score, index) => sum + score * weights[index], 0);
    
    // Calculate confidence based on agreement between models
    const variance = scores.reduce((sum, score) => sum + Math.pow(score - ensemble_score, 2), 0) / scores.length;
    const confidence = Math.max(0, 1 - variance * 2);
    
    return { ensemble_score, confidence };
  }

  // Main analysis function
  static analyzeTransaction(data: TransactionData): EnsembleResult {
    const model1_score = this.model1_anomaly_detection(data);
    const model2_score = this.model2_behavioral_analysis(data);
    const model3_score = this.model3_deep_learning_simulation(data);
    
    const { ensemble_score, confidence } = this.combineModels([model1_score, model2_score, model3_score]);
    
    // Determine prediction
    let prediction = 'legitimate';
    if (ensemble_score > 0.7) prediction = 'fraudulent';
    else if (ensemble_score > 0.4) prediction = 'suspicious';
    
    // Identify risk factors
    const risk_factors: string[] = [];
    if (data.amount > 5000) risk_factors.push('high_amount');
    if (!data.card_present) risk_factors.push('card_not_present');
    if (model1_score > 0.5) risk_factors.push('anomaly_detected');
    if (model2_score > 0.5) risk_factors.push('behavioral_deviation');
    if (model3_score > 0.5) risk_factors.push('ai_pattern_match');
    
    return {
      transaction_id: data.transaction_id,
      user_id: data.user_id,
      model_1_score: parseFloat(model1_score.toFixed(3)),
      model_2_score: parseFloat(model2_score.toFixed(3)),
      model_3_score: parseFloat(model3_score.toFixed(3)),
      ensemble_score: parseFloat(ensemble_score.toFixed(3)),
      prediction,
      confidence: parseFloat(confidence.toFixed(3)),
      risk_factors,
      behavioral_score: parseFloat(model2_score.toFixed(3))
    };
  }
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    );

    const { transaction } = await req.json();
    console.log('Analyzing transaction with ensemble models:', transaction);

    // Perform ensemble analysis
    const result = EnsembleFraudDetection.analyzeTransaction(transaction);
    
    // Store result in database
    const { error: dbError } = await supabase
      .from('fraud_ensemble_results')
      .insert(result);

    if (dbError) {
      console.error('Database error:', dbError);
    }

    // Store analytics
    await supabase.from('ai_analytics').insert({
      user_id: transaction.user_id,
      session_id: transaction.transaction_id,
      model_type: 'ensemble_fraud_detection',
      input_data: transaction,
      output_data: result,
      confidence_score: result.confidence,
      processing_time_ms: 150 // Simulated processing time
    });

    // Send real-time alert if high risk
    if (result.ensemble_score > 0.6) {
      await supabase.from('real_time_alerts').insert({
        user_id: transaction.user_id,
        alert_type: 'fraud_detection',
        severity: result.ensemble_score > 0.8 ? 'critical' : 'high',
        title: 'Suspicious Transaction Detected',
        message: `Transaction ${transaction.transaction_id} flagged with ${(result.ensemble_score * 100).toFixed(1)}% risk score`,
        metadata: {
          transaction_id: transaction.transaction_id,
          risk_score: result.ensemble_score,
          risk_factors: result.risk_factors
        }
      });
    }

    return new Response(JSON.stringify(result), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Error in ensemble fraud detection:', error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});