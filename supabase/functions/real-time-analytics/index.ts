import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface AnalyticsMetrics {
  apiResponseTime: number;
  modelAccuracy: number;
  systemLoad: number;
  errorRate: number;
  activeUsers: number;
  transactionsProcessed: number;
  fraudDetected: number;
  assistantQueries: number;
}

class RealTimeAnalytics {
  static generateLiveMetrics(): AnalyticsMetrics {
    const now = new Date();
    const hour = now.getHours();
    const minute = now.getMinutes();
    
    // Simulate realistic metrics with some variation
    const baseLoad = 0.3 + (Math.sin(hour * Math.PI / 12) * 0.2); // Daily pattern
    const minuteVariation = Math.sin(minute * Math.PI / 30) * 0.1;
    
    return {
      apiResponseTime: 45 + Math.floor(Math.random() * 20), // 45-65ms
      modelAccuracy: 0.987 + (Math.random() * 0.01), // 98.7-99.7%
      systemLoad: Math.max(0.1, baseLoad + minuteVariation + (Math.random() * 0.1)),
      errorRate: Math.max(0, 0.002 + (Math.random() * 0.003)), // 0.2-0.5%
      activeUsers: 1247 + Math.floor(Math.random() * 100),
      transactionsProcessed: 15420 + Math.floor(Math.random() * 50),
      fraudDetected: 23 + Math.floor(Math.random() * 5),
      assistantQueries: 8934 + Math.floor(Math.random() * 30)
    };
  }

  static async updateSystemMetrics(supabase: any): Promise<void> {
    const metrics = this.generateLiveMetrics();
    
    // Store each metric with appropriate status
    const metricEntries = [
      {
        metric_type: 'api_response_time',
        metric_value: metrics.apiResponseTime,
        threshold_value: 100,
        status: metrics.apiResponseTime > 100 ? 'warning' : 'normal'
      },
      {
        metric_type: 'model_accuracy',
        metric_value: metrics.modelAccuracy,
        threshold_value: 0.95,
        status: metrics.modelAccuracy < 0.95 ? 'warning' : 'normal'
      },
      {
        metric_type: 'system_load',
        metric_value: metrics.systemLoad,
        threshold_value: 0.8,
        status: metrics.systemLoad > 0.8 ? 'critical' : metrics.systemLoad > 0.6 ? 'warning' : 'normal'
      },
      {
        metric_type: 'error_rate',
        metric_value: metrics.errorRate,
        threshold_value: 0.01,
        status: metrics.errorRate > 0.01 ? 'critical' : metrics.errorRate > 0.005 ? 'warning' : 'normal'
      }
    ];

    for (const entry of metricEntries) {
      await supabase
        .from('real_time_monitoring')
        .insert(entry);
    }
  }

  static async getHistoricalData(supabase: any, hours: number = 24): Promise<any[]> {
    const { data, error } = await supabase
      .from('real_time_monitoring')
      .select('*')
      .gte('created_at', new Date(Date.now() - hours * 60 * 60 * 1000).toISOString())
      .order('created_at', { ascending: true });

    if (error) {
      console.error('Error fetching historical data:', error);
      return [];
    }

    return data || [];
  }

  static async getModelPerformance(supabase: any): Promise<any[]> {
    const { data, error } = await supabase
      .from('ml_model_performance')
      .select('*')
      .eq('is_active', true)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching model performance:', error);
      return [];
    }

    return data || [];
  }

  static calculateTrends(data: any[]): {
    [key: string]: {
      current: number;
      trend: 'up' | 'down' | 'stable';
      changePercent: number;
    }
  } {
    const trends: any = {};
    
    const metricTypes = ['api_response_time', 'model_accuracy', 'system_load', 'error_rate'];
    
    for (const metricType of metricTypes) {
      const metricData = data.filter(d => d.metric_type === metricType);
      
      if (metricData.length >= 2) {
        const recent = metricData.slice(-10); // Last 10 points
        const older = metricData.slice(-20, -10); // Previous 10 points
        
        const recentAvg = recent.reduce((sum, d) => sum + d.metric_value, 0) / recent.length;
        const olderAvg = older.reduce((sum, d) => sum + d.metric_value, 0) / (older.length || 1);
        
        const changePercent = ((recentAvg - olderAvg) / olderAvg) * 100;
        
        trends[metricType] = {
          current: recentAvg,
          trend: Math.abs(changePercent) < 5 ? 'stable' : changePercent > 0 ? 'up' : 'down',
          changePercent: Math.round(changePercent * 100) / 100
        };
      }
    }
    
    return trends;
  }
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabase = createClient(
      'https://frjtusbuhxrwksksxgil.supabase.co',
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZyanR1c2J1aHhyd2tza3N4Z2lsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTE5Njk0MTgsImV4cCI6MjA2NzU0NTQxOH0.4LTMckz-X-gAFUAEVsYG2CauNDNDGdOE0Em3RF9jx84'
    );

    const url = new URL(req.url);
    const action = url.searchParams.get('action') || 'metrics';

    switch (action) {
      case 'metrics':
        // Update system metrics and return current state
        await RealTimeAnalytics.updateSystemMetrics(supabase);
        const currentMetrics = RealTimeAnalytics.generateLiveMetrics();
        
        return new Response(
          JSON.stringify({
            success: true,
            data: currentMetrics,
            timestamp: new Date().toISOString()
          }),
          {
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
            status: 200,
          }
        );

      case 'historical':
        const hours = parseInt(url.searchParams.get('hours') || '24');
        const historicalData = await RealTimeAnalytics.getHistoricalData(supabase, hours);
        const trends = RealTimeAnalytics.calculateTrends(historicalData);
        
        return new Response(
          JSON.stringify({
            success: true,
            data: historicalData,
            trends,
            timestamp: new Date().toISOString()
          }),
          {
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
            status: 200,
          }
        );

      case 'models':
        const modelPerformance = await RealTimeAnalytics.getModelPerformance(supabase);
        
        return new Response(
          JSON.stringify({
            success: true,
            data: modelPerformance,
            timestamp: new Date().toISOString()
          }),
          {
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
            status: 200,
          }
        );

      case 'dashboard':
        // Combined dashboard data
        const [metrics, historical, models] = await Promise.all([
          RealTimeAnalytics.generateLiveMetrics(),
          RealTimeAnalytics.getHistoricalData(supabase, 24),
          RealTimeAnalytics.getModelPerformance(supabase)
        ]);
        
        const dashboardTrends = RealTimeAnalytics.calculateTrends(historical);
        
        return new Response(
          JSON.stringify({
            success: true,
            liveMetrics: metrics,
            historicalData: historical,
            modelPerformance: models,
            trends: dashboardTrends,
            timestamp: new Date().toISOString()
          }),
          {
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
            status: 200,
          }
        );

      default:
        return new Response(
          JSON.stringify({ 
            error: 'Invalid action parameter',
            availableActions: ['metrics', 'historical', 'models', 'dashboard']
          }),
          {
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
            status: 400,
          }
        );
    }

  } catch (error) {
    console.error('Error in real-time analytics:', error);
    return new Response(
      JSON.stringify({ 
        error: 'Real-time analytics processing failed',
        details: error.message 
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500,
      }
    );
  }
});