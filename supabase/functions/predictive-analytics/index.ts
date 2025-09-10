import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.7.1';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface TransactionHistory {
  date: string;
  amount: number;
  category: string;
  merchant?: string;
}

interface UserSpendingProfile {
  user_id: string;
  transaction_history: TransactionHistory[];
  income?: number;
  recurring_expenses?: any[];
}

class PredictiveAnalytics {
  // Time series prediction using linear regression
  static predictSpending(transactions: TransactionHistory[], category: string, days: number): any {
    const categoryTransactions = transactions.filter(t => t.category === category);
    
    if (categoryTransactions.length < 7) {
      return {
        predicted_amount: 0,
        confidence: 0.1,
        trend: 'insufficient_data'
      };
    }

    // Group by day and calculate daily spending
    const dailySpending: { [key: string]: number } = {};
    categoryTransactions.forEach(t => {
      const date = new Date(t.date).toDateString();
      dailySpending[date] = (dailySpending[date] || 0) + Math.abs(t.amount);
    });

    const spendingData = Object.entries(dailySpending)
      .sort(([a], [b]) => new Date(a).getTime() - new Date(b).getTime())
      .map(([date, amount], index) => ({ x: index, y: amount }));

    // Simple linear regression
    const n = spendingData.length;
    const sumX = spendingData.reduce((sum, point) => sum + point.x, 0);
    const sumY = spendingData.reduce((sum, point) => sum + point.y, 0);
    const sumXY = spendingData.reduce((sum, point) => sum + point.x * point.y, 0);
    const sumXX = spendingData.reduce((sum, point) => sum + point.x * point.x, 0);

    const slope = (n * sumXY - sumX * sumY) / (n * sumXX - sumX * sumX);
    const intercept = (sumY - slope * sumX) / n;

    // Predict future spending
    const futureX = n + days;
    const predictedDaily = slope * futureX + intercept;
    const predictedTotal = Math.max(0, predictedDaily * days);

    // Calculate confidence based on R-squared
    const meanY = sumY / n;
    const totalSumSquares = spendingData.reduce((sum, point) => sum + Math.pow(point.y - meanY, 2), 0);
    const residualSumSquares = spendingData.reduce((sum, point) => {
      const predicted = slope * point.x + intercept;
      return sum + Math.pow(point.y - predicted, 2);
    }, 0);
    
    const rSquared = 1 - (residualSumSquares / totalSumSquares);
    const confidence = Math.max(0.1, Math.min(0.9, rSquared));

    // Determine trend
    let trend = 'stable';
    if (slope > 10) trend = 'increasing';
    else if (slope < -10) trend = 'decreasing';

    return {
      predicted_amount: parseFloat(predictedTotal.toFixed(2)),
      confidence: parseFloat(confidence.toFixed(3)),
      trend,
      daily_average: parseFloat((predictedTotal / days).toFixed(2)),
      slope: parseFloat(slope.toFixed(3))
    };
  }

  // Seasonal spending pattern analysis
  static analyzeSeasonalPatterns(transactions: TransactionHistory[]): any {
    const monthlySpending: { [key: number]: number[] } = {};
    
    transactions.forEach(t => {
      const month = new Date(t.date).getMonth();
      if (!monthlySpending[month]) monthlySpending[month] = [];
      monthlySpending[month].push(Math.abs(t.amount));
    });

    const seasonalTrends: { [key: string]: number } = {};
    Object.entries(monthlySpending).forEach(([month, amounts]) => {
      const avg = amounts.reduce((sum, amount) => sum + amount, 0) / amounts.length;
      seasonalTrends[month] = parseFloat(avg.toFixed(2));
    });

    return {
      monthly_averages: seasonalTrends,
      peak_month: Object.entries(seasonalTrends).reduce((max, [month, avg]) => 
        avg > max.avg ? { month: parseInt(month), avg } : max, { month: 0, avg: 0 }),
      low_month: Object.entries(seasonalTrends).reduce((min, [month, avg]) => 
        avg < min.avg ? { month: parseInt(month), avg } : min, { month: 0, avg: Infinity })
    };
  }

  // Anomaly detection
  static detectAnomalies(transactions: TransactionHistory[]): any[] {
    const anomalies: any[] = [];
    
    // Calculate statistical thresholds
    const amounts = transactions.map(t => Math.abs(t.amount));
    const mean = amounts.reduce((sum, amount) => sum + amount, 0) / amounts.length;
    const variance = amounts.reduce((sum, amount) => sum + Math.pow(amount - mean, 2), 0) / amounts.length;
    const stdDev = Math.sqrt(variance);
    
    const upperThreshold = mean + (2.5 * stdDev);
    const lowerThreshold = Math.max(0, mean - (2.5 * stdDev));

    transactions.forEach(t => {
      const amount = Math.abs(t.amount);
      let anomalyReasons: string[] = [];
      
      // Amount-based anomalies
      if (amount > upperThreshold) {
        anomalyReasons.push('unusually_high_amount');
      }
      
      // Time-based anomalies
      const hour = new Date(t.date).getHours();
      if (hour < 5 || hour > 23) {
        anomalyReasons.push('unusual_time');
      }
      
      // Weekend large transactions
      const dayOfWeek = new Date(t.date).getDay();
      if ((dayOfWeek === 0 || dayOfWeek === 6) && amount > mean * 1.5) {
        anomalyReasons.push('large_weekend_transaction');
      }

      if (anomalyReasons.length > 0) {
        anomalies.push({
          transaction: t,
          anomaly_score: Math.min(1, amount / upperThreshold),
          reasons: anomalyReasons,
          severity: anomalyReasons.length > 1 ? 'high' : 'medium'
        });
      }
    });

    return anomalies;
  }

  // Cash flow prediction
  static predictCashFlow(profile: UserSpendingProfile, days: number): any {
    const { transaction_history, income = 0, recurring_expenses = [] } = profile;
    
    // Calculate average daily income and expenses
    const totalExpenses = transaction_history
      .filter(t => t.amount < 0)
      .reduce((sum, t) => sum + Math.abs(t.amount), 0);
    
    const daysCovered = Math.max(1, 
      (new Date().getTime() - new Date(transaction_history[0]?.date || new Date()).getTime()) / (1000 * 60 * 60 * 24)
    );
    
    const avgDailyExpenses = totalExpenses / daysCovered;
    const avgDailyIncome = income / 30; // Assuming monthly income

    // Predict future cash flow
    const projectedIncome = avgDailyIncome * days;
    const projectedExpenses = avgDailyExpenses * days;
    const netCashFlow = projectedIncome - projectedExpenses;

    // Add recurring expenses
    const recurringTotal = recurring_expenses.reduce((sum, expense) => {
      const frequency = expense.frequency || 'monthly';
      const multiplier = frequency === 'weekly' ? days / 7 : days / 30;
      return sum + (expense.amount * multiplier);
    }, 0);

    const finalNetCashFlow = netCashFlow - recurringTotal;

    return {
      projected_income: parseFloat(projectedIncome.toFixed(2)),
      projected_expenses: parseFloat((projectedExpenses + recurringTotal).toFixed(2)),
      net_cash_flow: parseFloat(finalNetCashFlow.toFixed(2)),
      cash_flow_status: finalNetCashFlow > 0 ? 'positive' : 'negative',
      burn_rate: parseFloat(avgDailyExpenses.toFixed(2)),
      runway_days: income > 0 ? Math.floor(income / avgDailyExpenses) : 0
    };
  }

  // Budget recommendations
  static generateBudgetRecommendations(transactions: TransactionHistory[]): any[] {
    const categorySpending: { [key: string]: number } = {};
    
    transactions.forEach(t => {
      if (t.amount < 0) { // Only expenses
        categorySpending[t.category] = (categorySpending[t.category] || 0) + Math.abs(t.amount);
      }
    });

    const totalSpending = Object.values(categorySpending).reduce((sum, amount) => sum + amount, 0);
    const recommendations: any[] = [];

    Object.entries(categorySpending).forEach(([category, amount]) => {
      const percentage = (amount / totalSpending) * 100;
      
      let recommendation = '';
      let severity = 'low';
      
      // Category-specific recommendations
      if (category === 'dining' && percentage > 15) {
        recommendation = 'Consider cooking more meals at home to reduce dining expenses';
        severity = 'medium';
      } else if (category === 'entertainment' && percentage > 10) {
        recommendation = 'Look for free or low-cost entertainment alternatives';
        severity = 'medium';
      } else if (category === 'shopping' && percentage > 20) {
        recommendation = 'Set a monthly shopping budget and track impulse purchases';
        severity = 'high';
      } else if (category === 'transportation' && percentage > 25) {
        recommendation = 'Consider carpooling or public transportation to reduce costs';
        severity = 'medium';
      }

      if (recommendation) {
        recommendations.push({
          category,
          current_spending: parseFloat(amount.toFixed(2)),
          percentage_of_total: parseFloat(percentage.toFixed(1)),
          recommendation,
          severity,
          potential_savings: parseFloat((amount * 0.2).toFixed(2)) // Assume 20% savings potential
        });
      }
    });

    return recommendations;
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

    const { user_id, analysis_type, time_period = 30, category } = await req.json();
    console.log('Performing predictive analytics for user:', user_id);

    // Mock transaction history (in production, fetch from database)
    const mockTransactions: TransactionHistory[] = [
      { date: '2024-01-01', amount: -120.50, category: 'groceries' },
      { date: '2024-01-02', amount: -45.00, category: 'gas' },
      { date: '2024-01-03', amount: -89.99, category: 'dining' },
      { date: '2024-01-05', amount: -1200.00, category: 'rent' },
      { date: '2024-01-07', amount: -35.00, category: 'entertainment' },
      { date: '2024-01-10', amount: 3500.00, category: 'salary' },
      { date: '2024-01-12', amount: -150.00, category: 'utilities' },
      { date: '2024-01-15', amount: -80.75, category: 'groceries' },
      { date: '2024-01-18', amount: -65.00, category: 'dining' },
      { date: '2024-01-20', amount: -200.00, category: 'shopping' }
    ];

    let result: any;

    switch (analysis_type) {
      case 'spending_prediction':
        if (!category) throw new Error('Category required for spending prediction');
        result = PredictiveAnalytics.predictSpending(mockTransactions, category, time_period);
        break;
        
      case 'seasonal_analysis':
        result = PredictiveAnalytics.analyzeSeasonalPatterns(mockTransactions);
        break;
        
      case 'anomaly_detection':
        result = PredictiveAnalytics.detectAnomalies(mockTransactions);
        break;
        
      case 'cash_flow_prediction':
        const profile: UserSpendingProfile = {
          user_id,
          transaction_history: mockTransactions,
          income: 4000,
          recurring_expenses: [
            { amount: 1200, frequency: 'monthly', category: 'rent' },
            { amount: 150, frequency: 'monthly', category: 'utilities' }
          ]
        };
        result = PredictiveAnalytics.predictCashFlow(profile, time_period);
        break;
        
      case 'budget_recommendations':
        result = PredictiveAnalytics.generateBudgetRecommendations(mockTransactions);
        break;
        
      default:
        throw new Error('Invalid analysis type specified');
    }

    // Store analytics in database
    const { error: analyticsError } = await supabase.from('spending_analytics').insert({
      user_id,
      category: category || 'all',
      predicted_amount: result.predicted_amount || 0,
      time_period: `${time_period}_days`,
      confidence_interval: result.confidence ? { min: result.confidence - 0.1, max: result.confidence + 0.1 } : null,
      trends: result.trend ? { direction: result.trend } : null,
      anomalies: analysis_type === 'anomaly_detection' ? result : null
    });

    if (analyticsError) {
      console.error('Analytics storage error:', analyticsError);
    }

    // Store AI analytics
    await supabase.from('ai_analytics').insert({
      user_id,
      session_id: `analytics_${Date.now()}`,
      model_type: 'predictive_analytics',
      input_data: { analysis_type, time_period, category },
      output_data: result,
      confidence_score: result.confidence || 0.75,
      processing_time_ms: 180
    });

    return new Response(JSON.stringify({
      analysis_type,
      time_period,
      result,
      processed_at: new Date().toISOString()
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Error in predictive analytics:', error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});