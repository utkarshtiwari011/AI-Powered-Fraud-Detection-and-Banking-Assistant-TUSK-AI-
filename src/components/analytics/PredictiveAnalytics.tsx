import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { TrendingUp, TrendingDown, BarChart3, Target, AlertTriangle, DollarSign } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';
import { supabase } from '@/integrations/supabase/client';

interface PredictionData {
  category: string;
  predicted_amount: number;
  actual_amount?: number;
  confidence_interval: {
    lower: number;
    upper: number;
  };
  trends: {
    direction: 'up' | 'down' | 'stable';
    percentage: number;
  };
  anomalies: Array<{
    type: string;
    severity: 'low' | 'medium' | 'high';
    description: string;
  }>;
}

const PredictiveAnalytics = () => {
  const [predictions, setPredictions] = useState<PredictionData[]>([]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [timeRange, setTimeRange] = useState<'week' | 'month' | 'quarter'>('month');

  const categories = ['groceries', 'entertainment', 'utilities', 'transport', 'dining', 'shopping'];

  const runPredictiveAnalysis = async () => {
    setIsAnalyzing(true);
    
    try {
      // Generate historical data for each category
      for (const category of categories) {
        const historicalData = generateMockHistoricalData(category);
        
        const { data, error } = await supabase.functions.invoke('predictive-analytics', {
          body: {
            user_id: null, // Demo mode
            historical_data: historicalData,
            category,
            time_period: timeRange,
            prediction_horizon: 30 // days
          }
        });

        if (error) throw error;

        setPredictions(prev => {
          const existing = prev.filter(p => p.category !== category);
          return [...existing, data];
        });
      }
    } catch (error) {
      console.error('Error running predictive analysis:', error);
      
      // Fallback with mock data
      const mockPredictions = categories.map(category => ({
        category,
        predicted_amount: Math.random() * 1000 + 200,
        actual_amount: Math.random() * 1000 + 180,
        confidence_interval: {
          lower: Math.random() * 100 + 150,
          upper: Math.random() * 200 + 300
        },
        trends: {
          direction: ['up', 'down', 'stable'][Math.floor(Math.random() * 3)] as 'up' | 'down' | 'stable',
          percentage: Math.random() * 20
        },
        anomalies: generateMockAnomalies()
      }));
      
      setPredictions(mockPredictions);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const generateMockHistoricalData = (category: string) => {
    return Array.from({ length: 30 }, (_, i) => ({
      date: new Date(Date.now() - (29 - i) * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      amount: Math.random() * 200 + 50 + (category === 'groceries' ? 100 : 0),
      transactions: Math.floor(Math.random() * 10) + 1
    }));
  };

  const generateMockAnomalies = () => {
    const anomalyTypes = [
      { type: 'unusual_spike', severity: 'medium', description: 'Spending increased by 40% compared to last month' },
      { type: 'frequency_change', severity: 'low', description: 'Transaction frequency pattern changed' },
      { type: 'amount_outlier', severity: 'high', description: 'Several transactions above normal range detected' }
    ];
    
    return anomalyTypes.slice(0, Math.floor(Math.random() * 3) + 1) as Array<{
      type: string;
      severity: 'low' | 'medium' | 'high';
      description: string;
    }>;
  };

  const getTrendIcon = (direction: string) => {
    switch (direction) {
      case 'up': return <TrendingUp className="h-4 w-4 text-green-500" />;
      case 'down': return <TrendingDown className="h-4 w-4 text-red-500" />;
      default: return <BarChart3 className="h-4 w-4 text-blue-500" />;
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'high': return 'bg-red-100 text-red-700';
      case 'medium': return 'bg-orange-100 text-orange-700';
      default: return 'bg-yellow-100 text-yellow-700';
    }
  };

  const chartData = predictions.map((pred, index) => ({
    name: pred.category,
    predicted: pred.predicted_amount,
    actual: pred.actual_amount || 0,
    confidence_lower: pred.confidence_interval.lower,
    confidence_upper: pred.confidence_interval.upper
  }));

  const filteredPredictions = selectedCategory === 'all' 
    ? predictions 
    : predictions.filter(p => p.category === selectedCategory);

  return (
    <div className="space-y-6">
      {/* Control Panel */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5" />
            Predictive Spending Analytics
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap items-center gap-4 mb-6">
            <Button
              onClick={runPredictiveAnalysis}
              disabled={isAnalyzing}
              className="flex items-center gap-2"
            >
              {isAnalyzing ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Analyzing...
                </>
              ) : (
                <>
                  <Target className="h-4 w-4" />
                  Run Analysis
                </>
              )}
            </Button>
            
            <div className="flex items-center gap-2">
              <label className="text-sm font-medium">Category:</label>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="border rounded px-3 py-1 text-sm"
              >
                <option value="all">All Categories</option>
                {categories.map(cat => (
                  <option key={cat} value={cat}>{cat.charAt(0).toUpperCase() + cat.slice(1)}</option>
                ))}
              </select>
            </div>
            
            <div className="flex items-center gap-2">
              <label className="text-sm font-medium">Time Range:</label>
              <select
                value={timeRange}
                onChange={(e) => setTimeRange(e.target.value as 'week' | 'month' | 'quarter')}
                className="border rounded px-3 py-1 text-sm"
              >
                <option value="week">1 Week</option>
                <option value="month">1 Month</option>
                <option value="quarter">3 Months</option>
              </select>
            </div>
          </div>

          {predictions.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="bg-blue-50 p-4 rounded-lg">
                <div className="text-2xl font-bold text-blue-600">
                  ${predictions.reduce((sum, p) => sum + p.predicted_amount, 0).toFixed(0)}
                </div>
                <div className="text-sm text-blue-500">Total Predicted Spending</div>
              </div>
              <div className="bg-green-50 p-4 rounded-lg">
                <div className="text-2xl font-bold text-green-600">
                  {predictions.filter(p => p.trends.direction === 'down').length}
                </div>
                <div className="text-sm text-green-500">Categories Decreasing</div>
              </div>
              <div className="bg-orange-50 p-4 rounded-lg">
                <div className="text-2xl font-bold text-orange-600">
                  {predictions.reduce((sum, p) => sum + p.anomalies.length, 0)}
                </div>
                <div className="text-sm text-orange-500">Anomalies Detected</div>
              </div>
              <div className="bg-purple-50 p-4 rounded-lg">
                <div className="text-2xl font-bold text-purple-600">
                  {(predictions.reduce((sum, p) => sum + p.confidence_interval.upper - p.confidence_interval.lower, 0) / predictions.length).toFixed(0)}
                </div>
                <div className="text-sm text-purple-500">Avg Confidence Range</div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Predictions Chart */}
      {predictions.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Spending Predictions vs Actuals</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip formatter={(value: any) => [`$${value?.toFixed(2)}`, '']} />
                <Area 
                  type="monotone" 
                  dataKey="confidence_upper" 
                  stackId="1" 
                  stroke="none" 
                  fill="#e0e7ff" 
                  fillOpacity={0.4}
                />
                <Area 
                  type="monotone" 
                  dataKey="confidence_lower" 
                  stackId="1" 
                  stroke="none" 
                  fill="#ffffff" 
                  fillOpacity={1}
                />
                <Line type="monotone" dataKey="predicted" stroke="#3b82f6" strokeWidth={2} />
                <Line type="monotone" dataKey="actual" stroke="#10b981" strokeWidth={2} strokeDasharray="5 5" />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      )}

      {/* Category Predictions */}
      {filteredPredictions.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPredictions.map((prediction, index) => (
            <Card key={index}>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span className="capitalize">{prediction.category}</span>
                  <div className="flex items-center gap-1">
                    {getTrendIcon(prediction.trends.direction)}
                    <span className={`text-sm ${
                      prediction.trends.direction === 'up' ? 'text-green-600' : 
                      prediction.trends.direction === 'down' ? 'text-red-600' : 'text-blue-600'
                    }`}>
                      {prediction.trends.percentage.toFixed(1)}%
                    </span>
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <DollarSign className="h-4 w-4 text-gray-500" />
                    <span className="text-2xl font-bold">${prediction.predicted_amount.toFixed(0)}</span>
                    <span className="text-sm text-gray-500">predicted</span>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Confidence Range</span>
                      <span>${prediction.confidence_interval.lower.toFixed(0)} - ${prediction.confidence_interval.upper.toFixed(0)}</span>
                    </div>
                    <Progress 
                      value={((prediction.predicted_amount - prediction.confidence_interval.lower) / 
                               (prediction.confidence_interval.upper - prediction.confidence_interval.lower)) * 100} 
                    />
                  </div>

                  {prediction.anomalies.length > 0 && (
                    <div className="space-y-2">
                      <div className="text-sm font-medium flex items-center gap-1">
                        <AlertTriangle className="h-4 w-4 text-orange-500" />
                        Anomalies Detected
                      </div>
                      {prediction.anomalies.map((anomaly, idx) => (
                        <Badge key={idx} className={getSeverityColor(anomaly.severity)} variant="outline">
                          {anomaly.type.replace('_', ' ')}: {anomaly.description}
                        </Badge>
                      ))}
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default PredictiveAnalytics;