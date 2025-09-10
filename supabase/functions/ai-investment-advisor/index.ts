import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.7.1';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface UserProfile {
  risk_tolerance: 'low' | 'medium' | 'high';
  investment_goals: string[];
  time_horizon: number; // years
  current_portfolio?: any;
  monthly_income?: number;
  available_capital?: number;
}

interface MarketData {
  symbol: string;
  current_price: number;
  pe_ratio?: number;
  dividend_yield?: number;
  market_cap?: number;
  beta?: number;
  analyst_rating?: string;
}

class AIInvestmentAdvisor {
  static async getMarketData(symbol: string): Promise<MarketData> {
    // Simulate real market data (in production, use real API like Alpha Vantage or Finnhub)
    const mockData: { [key: string]: MarketData } = {
      'AAPL': { symbol: 'AAPL', current_price: 150.00, pe_ratio: 25.5, dividend_yield: 0.5, market_cap: 2400000000000, beta: 1.2, analyst_rating: 'Buy' },
      'GOOGL': { symbol: 'GOOGL', current_price: 2500.00, pe_ratio: 22.8, dividend_yield: 0, market_cap: 1650000000000, beta: 1.1, analyst_rating: 'Strong Buy' },
      'MSFT': { symbol: 'MSFT', current_price: 300.00, pe_ratio: 28.1, dividend_yield: 0.7, market_cap: 2200000000000, beta: 0.9, analyst_rating: 'Buy' },
      'TSLA': { symbol: 'TSLA', current_price: 800.00, pe_ratio: 45.2, dividend_yield: 0, market_cap: 850000000000, beta: 2.1, analyst_rating: 'Hold' },
      'VTI': { symbol: 'VTI', current_price: 220.00, pe_ratio: 20.5, dividend_yield: 1.3, market_cap: 1400000000000, beta: 1.0, analyst_rating: 'Buy' },
      'BND': { symbol: 'BND', current_price: 85.00, pe_ratio: null, dividend_yield: 2.1, market_cap: 300000000000, beta: 0.2, analyst_rating: 'Hold' }
    };
    
    return mockData[symbol] || { symbol, current_price: 100, pe_ratio: 20, dividend_yield: 1.0, market_cap: 1000000000, beta: 1.0, analyst_rating: 'Hold' };
  }

  static analyzeRiskTolerance(profile: UserProfile): number {
    let riskScore = 0;
    
    // Base risk from tolerance
    switch (profile.risk_tolerance) {
      case 'low': riskScore = 0.2; break;
      case 'medium': riskScore = 0.5; break;
      case 'high': riskScore = 0.8; break;
    }
    
    // Adjust for time horizon
    if (profile.time_horizon > 20) riskScore += 0.1;
    else if (profile.time_horizon < 5) riskScore -= 0.2;
    
    // Adjust for goals
    if (profile.investment_goals.includes('retirement')) riskScore += 0.1;
    if (profile.investment_goals.includes('speculation')) riskScore += 0.3;
    if (profile.investment_goals.includes('preservation')) riskScore -= 0.2;
    
    return Math.max(0, Math.min(1, riskScore));
  }

  static async generateRecommendations(profile: UserProfile): Promise<any[]> {
    const riskScore = this.analyzeRiskTolerance(profile);
    const recommendations = [];

    // Core portfolio allocation based on risk
    if (riskScore < 0.3) {
      // Conservative portfolio
      recommendations.push({
        symbol: 'BND',
        asset_type: 'bond_etf',
        recommendation_type: 'buy',
        allocation_percentage: 60,
        reasoning: 'Conservative bond allocation for capital preservation',
        confidence_score: 0.85
      });
      recommendations.push({
        symbol: 'VTI',
        asset_type: 'stock_etf',
        recommendation_type: 'buy',
        allocation_percentage: 30,
        reasoning: 'Diversified stock market exposure',
        confidence_score: 0.80
      });
      recommendations.push({
        symbol: 'AAPL',
        asset_type: 'individual_stock',
        recommendation_type: 'buy',
        allocation_percentage: 10,
        reasoning: 'Stable blue-chip stock with dividend',
        confidence_score: 0.75
      });
    } else if (riskScore < 0.7) {
      // Moderate portfolio
      recommendations.push({
        symbol: 'VTI',
        asset_type: 'stock_etf',
        recommendation_type: 'buy',
        allocation_percentage: 60,
        reasoning: 'Broad market diversification',
        confidence_score: 0.90
      });
      recommendations.push({
        symbol: 'BND',
        asset_type: 'bond_etf',
        recommendation_type: 'buy',
        allocation_percentage: 25,
        reasoning: 'Stability and income generation',
        confidence_score: 0.80
      });
      recommendations.push({
        symbol: 'GOOGL',
        asset_type: 'individual_stock',
        recommendation_type: 'buy',
        allocation_percentage: 15,
        reasoning: 'Growth potential in technology sector',
        confidence_score: 0.75
      });
    } else {
      // Aggressive portfolio
      recommendations.push({
        symbol: 'VTI',
        asset_type: 'stock_etf',
        recommendation_type: 'buy',
        allocation_percentage: 40,
        reasoning: 'Core equity position',
        confidence_score: 0.85
      });
      recommendations.push({
        symbol: 'TSLA',
        asset_type: 'individual_stock',
        recommendation_type: 'buy',
        allocation_percentage: 25,
        reasoning: 'High growth potential in EV market',
        confidence_score: 0.65
      });
      recommendations.push({
        symbol: 'GOOGL',
        asset_type: 'individual_stock',
        recommendation_type: 'buy',
        allocation_percentage: 20,
        reasoning: 'Strong fundamentals and AI growth',
        confidence_score: 0.80
      });
      recommendations.push({
        symbol: 'MSFT',
        asset_type: 'individual_stock',
        recommendation_type: 'buy',
        allocation_percentage: 15,
        reasoning: 'Cloud computing and productivity software leader',
        confidence_score: 0.85
      });
    }

    // Enhance with market data and target prices
    for (const rec of recommendations) {
      const marketData = await this.getMarketData(rec.symbol);
      rec.target_price = marketData.current_price * (1 + (riskScore * 0.3 + 0.1));
      rec.market_data = marketData;
    }

    return recommendations;
  }

  static async performTechnicalAnalysis(symbol: string): Promise<any> {
    // Simulate technical analysis
    const marketData = await this.getMarketData(symbol);
    
    return {
      rsi: Math.random() * 100,
      moving_averages: {
        sma_20: marketData.current_price * (0.95 + Math.random() * 0.1),
        sma_50: marketData.current_price * (0.90 + Math.random() * 0.2),
        ema_12: marketData.current_price * (0.98 + Math.random() * 0.04)
      },
      macd: {
        signal: Math.random() > 0.5 ? 'bullish' : 'bearish',
        histogram: (Math.random() - 0.5) * 10
      },
      support_levels: [
        marketData.current_price * 0.95,
        marketData.current_price * 0.90
      ],
      resistance_levels: [
        marketData.current_price * 1.05,
        marketData.current_price * 1.10
      ]
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

    const { user_id, profile, action } = await req.json();
    console.log('AI Investment Advisor request:', { user_id, action });

    let result;

    if (action === 'generate_recommendations') {
      const recommendations = await AIInvestmentAdvisor.generateRecommendations(profile);
      
      // Store recommendations in database
      for (const rec of recommendations) {
        await supabase.from('investment_recommendations').insert({
          user_id,
          asset_type: rec.asset_type,
          symbol: rec.symbol,
          recommendation_type: rec.recommendation_type,
          confidence_score: rec.confidence_score,
          target_price: rec.target_price,
          reasoning: rec.reasoning,
          ai_model_used: 'ensemble_investment_advisor_v1.0',
          expires_at: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString() // 7 days
        });
      }

      result = { recommendations };

    } else if (action === 'technical_analysis') {
      const { symbol } = await req.json();
      const analysis = await AIInvestmentAdvisor.performTechnicalAnalysis(symbol);
      result = { symbol, analysis };

    } else {
      throw new Error('Invalid action specified');
    }

    // Store analytics
    await supabase.from('ai_analytics').insert({
      user_id,
      session_id: `investment_${Date.now()}`,
      model_type: 'ai_investment_advisor',
      input_data: { profile, action },
      output_data: result,
      confidence_score: 0.80,
      processing_time_ms: 250
    });

    return new Response(JSON.stringify(result), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Error in AI investment advisor:', error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});