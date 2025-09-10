import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { AlertTriangle, Shield, TrendingUp, Clock, MapPin, CreditCard } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface FraudAlert {
  id: string;
  transaction_id: string;
  amount: number;
  merchant_name: string;
  location: string;
  risk_score: number;
  prediction: string;
  risk_factors: string[];
  timestamp: string;
}

const RealTimeFraudMonitor = () => {
  const [alerts, setAlerts] = useState<FraudAlert[]>([]);
  const [isMonitoring, setIsMonitoring] = useState(false);
  const [stats, setStats] = useState({
    totalTransactions: 12847,
    threatsBlocked: 143,
    riskScore: 0.12,
    responseTime: 45
  });
  const { toast } = useToast();

  // Simulate real-time fraud detection
  useEffect(() => {
    if (!isMonitoring) return;

    const interval = setInterval(() => {
      // Generate mock transaction for demonstration
      const mockTransaction = {
        transaction_id: `TXN-${Date.now()}`,
        amount: Math.random() * 10000 + 100,
        merchant_name: ['Amazon', 'Walmart', 'Gas Station', 'ATM Withdrawal', 'Online Casino'][Math.floor(Math.random() * 5)],
        location: ['New York, NY', 'Los Angeles, CA', 'Unknown Location', 'Chicago, IL', 'Miami, FL'][Math.floor(Math.random() * 5)],
        card_present: Math.random() > 0.3,
        customer_ip: '192.168.1.' + Math.floor(Math.random() * 255),
        device_id: `device_${Math.floor(Math.random() * 1000)}`,
        user_id: null
      };

      // Call ensemble fraud detection
      analyzeTransaction(mockTransaction);
    }, 3000 + Math.random() * 4000); // Random interval between 3-7 seconds

    return () => clearInterval(interval);
  }, [isMonitoring]);

  const analyzeTransaction = async (transaction: any) => {
    try {
      const { data, error } = await supabase.functions.invoke('ensemble-fraud-detection', {
        body: { transaction }
      });

      if (error) throw error;

      // Only show high-risk transactions as alerts
      if (data.ensemble_score > 0.4) {
        const newAlert: FraudAlert = {
          id: data.transaction_id,
          transaction_id: data.transaction_id,
          amount: transaction.amount,
          merchant_name: transaction.merchant_name,
          location: transaction.location,
          risk_score: data.ensemble_score,
          prediction: data.prediction,
          risk_factors: data.risk_factors,
          timestamp: new Date().toISOString()
        };

        setAlerts(prev => [newAlert, ...prev.slice(0, 9)]); // Keep last 10 alerts

        // Update stats
        setStats(prev => ({
          ...prev,
          totalTransactions: prev.totalTransactions + 1,
          threatsBlocked: data.prediction === 'fraudulent' ? prev.threatsBlocked + 1 : prev.threatsBlocked,
          riskScore: data.ensemble_score,
          responseTime: 35 + Math.floor(Math.random() * 20)
        }));

        // Show toast for high-risk transactions
        if (data.ensemble_score > 0.7) {
          toast({
            title: "High Risk Transaction Detected",
            description: `${transaction.merchant_name} - $${transaction.amount.toFixed(2)}`,
            variant: "destructive"
          });
        }
      }
    } catch (error) {
      console.error('Error analyzing transaction:', error);
    }
  };

  const getRiskColor = (score: number) => {
    if (score > 0.7) return 'text-red-500 bg-red-50';
    if (score > 0.4) return 'text-orange-500 bg-orange-50';
    return 'text-green-500 bg-green-50';
  };

  const getRiskIcon = (prediction: string) => {
    if (prediction === 'fraudulent') return <AlertTriangle className="h-4 w-4" />;
    if (prediction === 'suspicious') return <TrendingUp className="h-4 w-4" />;
    return <Shield className="h-4 w-4" />;
  };

  return (
    <div className="space-y-6">
      {/* Control Panel */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5" />
              Real-Time Fraud Monitoring
            </CardTitle>
            <Button
              onClick={() => setIsMonitoring(!isMonitoring)}
              variant={isMonitoring ? "destructive" : "default"}
            >
              {isMonitoring ? 'Stop Monitoring' : 'Start Monitoring'}
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="bg-blue-50 p-4 rounded-lg">
              <div className="text-2xl font-bold text-blue-600">{stats.totalTransactions.toLocaleString()}</div>
              <div className="text-sm text-blue-500">Transactions Processed</div>
            </div>
            <div className="bg-red-50 p-4 rounded-lg">
              <div className="text-2xl font-bold text-red-600">{stats.threatsBlocked}</div>
              <div className="text-sm text-red-500">Threats Blocked</div>
            </div>
            <div className="bg-orange-50 p-4 rounded-lg">
              <div className="text-2xl font-bold text-orange-600">{(stats.riskScore * 100).toFixed(1)}%</div>
              <div className="text-sm text-orange-500">Current Risk Score</div>
            </div>
            <div className="bg-green-50 p-4 rounded-lg">
              <div className="text-2xl font-bold text-green-600">{stats.responseTime}ms</div>
              <div className="text-sm text-green-500">Avg Response Time</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Real-time Alerts */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5" />
            Live Fraud Alerts
            {isMonitoring && <div className="h-2 w-2 bg-red-500 rounded-full animate-pulse ml-2" />}
          </CardTitle>
        </CardHeader>
        <CardContent>
          {alerts.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              {isMonitoring ? 'Monitoring for suspicious transactions...' : 'Start monitoring to see real-time alerts'}
            </div>
          ) : (
            <div className="space-y-3 max-h-96 overflow-y-auto">
              {alerts.map((alert) => (
                <div key={alert.id} className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <Badge className={getRiskColor(alert.risk_score)}>
                          {getRiskIcon(alert.prediction)}
                          {alert.prediction.toUpperCase()}
                        </Badge>
                        <span className="text-sm text-gray-500">Risk: {(alert.risk_score * 100).toFixed(1)}%</span>
                      </div>
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div className="flex items-center gap-1">
                          <CreditCard className="h-4 w-4 text-gray-400" />
                          <span className="font-medium">${alert.amount.toFixed(2)}</span>
                          <span className="text-gray-500">at {alert.merchant_name}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <MapPin className="h-4 w-4 text-gray-400" />
                          <span className="text-gray-500">{alert.location}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="h-4 w-4 text-gray-400" />
                          <span className="text-gray-500">
                            {new Date(alert.timestamp).toLocaleTimeString()}
                          </span>
                        </div>
                        <div className="text-gray-500">
                          ID: {alert.transaction_id}
                        </div>
                      </div>
                      {alert.risk_factors.length > 0 && (
                        <div className="mt-2 flex flex-wrap gap-1">
                          {alert.risk_factors.map((factor, idx) => (
                            <Badge key={idx} variant="outline" className="text-xs">
                              {factor.replace('_', ' ')}
                            </Badge>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default RealTimeFraudMonitor;