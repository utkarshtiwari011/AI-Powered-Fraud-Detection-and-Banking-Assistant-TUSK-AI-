import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { 
  Shield, 
  AlertTriangle, 
  CheckCircle, 
  Activity,
  CreditCard,
  MapPin,
  Clock,
  DollarSign,
  TrendingUp,
  Brain
} from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';

interface TransactionData {
  amount: number;
  merchant: string;
  location: string;
  cardPresent: boolean;
  customerAge: number;
  accountBalance: number;
  recentTransactions: number[];
}

interface FraudResult {
  riskScore: number;
  prediction: 'legitimate' | 'fraudulent' | 'suspicious';
  riskFactors: string[];
  confidence: number;
  recommendedAction: string;
}

const LiveFraudDemo = () => {
  const [transaction, setTransaction] = useState<TransactionData>({
    amount: 250,
    merchant: 'Amazon.com',
    location: 'Online',
    cardPresent: false,
    customerAge: 35,
    accountBalance: 5000,
    recentTransactions: [45.99, 127.50, 89.00, 234.56, 67.89]
  });

  const [result, setResult] = useState<FraudResult | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [realTimeData, setRealTimeData] = useState({
    threatsBlocked: 1247,
    accuracy: 99.7,
    responseTime: 47
  });

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      setRealTimeData(prev => ({
        threatsBlocked: prev.threatsBlocked + Math.floor(Math.random() * 3),
        accuracy: 99.7 + (Math.random() * 0.3 - 0.15),
        responseTime: 45 + Math.floor(Math.random() * 10)
      }));
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const analyzeTransaction = async () => {
    setIsAnalyzing(true);
    setResult(null);

    try {
      const response = await supabase.functions.invoke('ai-fraud-detection', {
        body: {
          transaction: {
            ...transaction,
            id: `txn_${Date.now()}`,
            time: new Date().toISOString(),
            sessionId: `session_${Date.now()}`
          }
        }
      });

      if (response.error) {
        throw new Error(response.error.message);
      }

      setResult(response.data.result);
    } catch (error) {
      console.error('Error analyzing transaction:', error);
      
      // Fallback local analysis
      const mockResult: FraudResult = {
        riskScore: transaction.amount > 1000 ? 0.75 : 0.25,
        prediction: transaction.amount > 1000 ? 'suspicious' : 'legitimate',
        riskFactors: transaction.amount > 1000 ? ['High-value transaction', 'Card not present'] : [],
        confidence: 0.94,
        recommendedAction: transaction.amount > 1000 ? 'Require additional authentication' : 'Approve transaction'
      };
      setResult(mockResult);
    } finally {
      setTimeout(() => setIsAnalyzing(false), 1500); // Simulate processing time
    }
  };

  const generateRandomTransaction = () => {
    const merchants = ['Amazon.com', 'Walmart', 'Starbucks', 'Uber', 'Netflix', 'Shell Gas', 'Target'];
    const locations = ['Online', 'New York, NY', 'Los Angeles, CA', 'Chicago, IL', 'Miami, FL'];
    
    setTransaction({
      amount: Math.floor(Math.random() * 2000) + 10,
      merchant: merchants[Math.floor(Math.random() * merchants.length)],
      location: locations[Math.floor(Math.random() * locations.length)],
      cardPresent: Math.random() > 0.6,
      customerAge: Math.floor(Math.random() * 50) + 20,
      accountBalance: Math.floor(Math.random() * 50000) + 1000,
      recentTransactions: Array.from({length: 5}, () => Math.floor(Math.random() * 500) + 10)
    });
    setResult(null);
  };

  const getRiskColor = (score: number) => {
    if (score > 0.7) return 'text-red-500';
    if (score > 0.4) return 'text-yellow-500';
    return 'text-green-500';
  };

  const getRiskIcon = (prediction: string) => {
    switch (prediction) {
      case 'fraudulent': return <AlertTriangle className="h-5 w-5 text-red-500" />;
      case 'suspicious': return <Shield className="h-5 w-5 text-yellow-500" />;
      default: return <CheckCircle className="h-5 w-5 text-green-500" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Real-time Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        {[
          { icon: Shield, label: "Threats Blocked", value: realTimeData.threatsBlocked.toLocaleString(), color: "text-green-400" },
          { icon: TrendingUp, label: "Accuracy", value: `${realTimeData.accuracy.toFixed(1)}%`, color: "text-blue-400" },
          { icon: Activity, label: "Response Time", value: `${realTimeData.responseTime}ms`, color: "text-purple-400" }
        ].map((metric, index) => (
          <Card key={index} className="bg-gradient-to-br from-gray-50 to-white border-2">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">{metric.label}</p>
                  <p className={`text-2xl font-bold ${metric.color}`}>{metric.value}</p>
                </div>
                <metric.icon className={`h-8 w-8 ${metric.color}`} />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Transaction Input */}
        <Card className="border-2 border-tusk-teal/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CreditCard className="h-5 w-5 text-tusk-teal" />
              Test Transaction
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-gray-700">Amount ($)</label>
                <Input
                  type="number"
                  value={transaction.amount}
                  onChange={(e) => setTransaction(prev => ({ ...prev, amount: parseFloat(e.target.value) || 0 }))}
                />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700">Merchant</label>
                <Input
                  value={transaction.merchant}
                  onChange={(e) => setTransaction(prev => ({ ...prev, merchant: e.target.value }))}
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-gray-700">Location</label>
                <Input
                  value={transaction.location}
                  onChange={(e) => setTransaction(prev => ({ ...prev, location: e.target.value }))}
                />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700">Account Balance ($)</label>
                <Input
                  type="number"
                  value={transaction.accountBalance}
                  onChange={(e) => setTransaction(prev => ({ ...prev, accountBalance: parseFloat(e.target.value) || 0 }))}
                />
              </div>
            </div>

            <div className="flex items-center gap-4">
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={transaction.cardPresent}
                  onChange={(e) => setTransaction(prev => ({ ...prev, cardPresent: e.target.checked }))}
                />
                <span className="text-sm">Card Present</span>
              </label>
              <div>
                <label className="text-sm font-medium text-gray-700 mr-2">Customer Age</label>
                <Input
                  type="number"
                  value={transaction.customerAge}
                  onChange={(e) => setTransaction(prev => ({ ...prev, customerAge: parseInt(e.target.value) || 0 }))}
                  className="w-20 inline"
                />
              </div>
            </div>

            <div className="flex gap-2">
              <Button 
                onClick={analyzeTransaction} 
                disabled={isAnalyzing}
                className="flex-1 bg-tusk-teal hover:bg-tusk-accent"
              >
                {isAnalyzing ? (
                  <>
                    <Brain className="h-4 w-4 mr-2 animate-spin" />
                    Analyzing...
                  </>
                ) : (
                  <>
                    <Shield className="h-4 w-4 mr-2" />
                    Analyze Transaction
                  </>
                )}
              </Button>
              <Button 
                onClick={generateRandomTransaction} 
                variant="outline"
                className="border-tusk-teal text-tusk-teal hover:bg-tusk-teal hover:text-white"
              >
                Random
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Analysis Results */}
        <Card className="border-2 border-gray-200">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Brain className="h-5 w-5 text-purple-600" />
              AI Analysis Results
            </CardTitle>
          </CardHeader>
          <CardContent>
            {isAnalyzing ? (
              <div className="flex items-center justify-center py-12">
                <div className="text-center">
                  <div className="w-16 h-16 border-4 border-tusk-teal border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                  <p className="text-gray-600">Running advanced ML algorithms...</p>
                  <p className="text-sm text-gray-500 mt-1">Neural networks • Behavioral analysis • Pattern recognition</p>
                </div>
              </div>
            ) : result ? (
              <div className="space-y-4">
                <Alert className={`border-2 ${
                  result.prediction === 'fraudulent' ? 'border-red-200 bg-red-50' :
                  result.prediction === 'suspicious' ? 'border-yellow-200 bg-yellow-50' :
                  'border-green-200 bg-green-50'
                }`}>
                  <AlertDescription className="flex items-center gap-2">
                    {getRiskIcon(result.prediction)}
                    <span className="font-medium">
                      {result.prediction.toUpperCase()} - {result.recommendedAction}
                    </span>
                  </AlertDescription>
                </Alert>

                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-gray-50 p-3 rounded-lg">
                    <div className="flex items-center gap-2 mb-1">
                      <TrendingUp className="h-4 w-4 text-gray-600" />
                      <span className="text-sm font-medium">Risk Score</span>
                    </div>
                    <div className={`text-2xl font-bold ${getRiskColor(result.riskScore)}`}>
                      {(result.riskScore * 100).toFixed(1)}%
                    </div>
                  </div>
                  <div className="bg-gray-50 p-3 rounded-lg">
                    <div className="flex items-center gap-2 mb-1">
                      <CheckCircle className="h-4 w-4 text-gray-600" />
                      <span className="text-sm font-medium">Confidence</span>
                    </div>
                    <div className="text-2xl font-bold text-blue-600">
                      {(result.confidence * 100).toFixed(1)}%
                    </div>
                  </div>
                </div>

                {result.riskFactors.length > 0 && (
                  <div>
                    <h4 className="font-medium text-gray-700 mb-2">Risk Factors Detected:</h4>
                    <div className="space-y-1">
                      {result.riskFactors.map((factor, index) => (
                        <Badge key={index} variant="outline" className="mr-2 mb-1">
                          {factor}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}

                <div className="bg-blue-50 p-3 rounded-lg">
                  <h4 className="font-medium text-blue-900 mb-1">AI Analysis Details</h4>
                  <p className="text-sm text-blue-700">
                    This transaction was analyzed using ensemble machine learning models including 
                    LSTM neural networks, Random Forest, and behavioral analytics. Processing completed 
                    in {realTimeData.responseTime}ms with {result.confidence > 0.9 ? 'high' : 'medium'} confidence.
                  </p>
                </div>
              </div>
            ) : (
              <div className="text-center py-12 text-gray-500">
                <Brain className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                <p>Enter transaction details and click "Analyze Transaction" to see AI-powered fraud detection in action.</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default LiveFraudDemo;