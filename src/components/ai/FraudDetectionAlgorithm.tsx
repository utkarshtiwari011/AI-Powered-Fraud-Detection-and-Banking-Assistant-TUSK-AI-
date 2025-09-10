
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Shield, AlertTriangle, CheckCircle, Brain, TrendingUp } from 'lucide-react';

interface Transaction {
  id: string;
  amount: number;
  location: string;
  time: string;
  riskScore: number;
  status: 'processing' | 'approved' | 'blocked' | 'flagged';
  factors: string[];
}

const FraudDetectionAlgorithm = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [isRunning, setIsRunning] = useState(false);
  const [stats, setStats] = useState({
    processed: 0,
    blocked: 0,
    approved: 0,
    accuracy: 0
  });

  // Simulate AI fraud detection algorithm
  const analyzeTransaction = (transaction: Partial<Transaction>): Transaction => {
    const factors = [];
    let riskScore = Math.random() * 100;

    // Amount-based risk
    if (transaction.amount! > 5000) {
      factors.push('High amount transaction');
      riskScore += 20;
    }

    // Location-based risk
    const suspiciousLocations = ['Nigeria', 'Russia', 'Unknown'];
    if (suspiciousLocations.some(loc => transaction.location?.includes(loc))) {
      factors.push('Suspicious location');
      riskScore += 30;
    }

    // Time-based risk
    const hour = new Date().getHours();
    if (hour < 6 || hour > 22) {
      factors.push('Unusual time');
      riskScore += 15;
    }

    // Pattern-based risk (simulated)
    if (Math.random() > 0.8) {
      factors.push('Unusual pattern detected');
      riskScore += 25;
    }

    // Determine status based on risk score
    let status: Transaction['status'] = 'approved';
    if (riskScore > 80) {
      status = 'blocked';
    } else if (riskScore > 60) {
      status = 'flagged';
    }

    return {
      id: transaction.id!,
      amount: transaction.amount!,
      location: transaction.location!,
      time: transaction.time!,
      riskScore: Math.min(riskScore, 100),
      status,
      factors
    };
  };

  const generateTransaction = (): Partial<Transaction> => {
    const locations = ['New York, US', 'London, UK', 'Tokyo, Japan', 'Lagos, Nigeria', 'Moscow, Russia', 'Unknown Location'];
    const amounts = [100, 250, 500, 1000, 2500, 5000, 7500, 10000, 15000];
    
    return {
      id: `TXN-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      amount: amounts[Math.floor(Math.random() * amounts.length)],
      location: locations[Math.floor(Math.random() * locations.length)],
      time: new Date().toLocaleTimeString()
    };
  };

  const startAnalysis = () => {
    setIsRunning(true);
    const interval = setInterval(() => {
      const newTransaction = generateTransaction();
      const analyzedTransaction = analyzeTransaction(newTransaction);
      
      setTransactions(prev => [analyzedTransaction, ...prev.slice(0, 9)]);
      
      setStats(prev => ({
        processed: prev.processed + 1,
        blocked: prev.blocked + (analyzedTransaction.status === 'blocked' ? 1 : 0),
        approved: prev.approved + (analyzedTransaction.status === 'approved' ? 1 : 0),
        accuracy: prev.processed > 0 ? ((prev.blocked + prev.approved) / prev.processed) * 100 : 0
      }));
    }, 2000);

    setTimeout(() => {
      clearInterval(interval);
      setIsRunning(false);
    }, 30000);
  };

  return (
    <div className="space-y-6">
      <Card className="bg-tusk-darkNavy/80 border-tusk-teal/30 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <Brain className="h-5 w-5 text-tusk-teal" />
            AI Fraud Detection Algorithm Demo
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-tusk-teal">{stats.processed}</div>
              <div className="text-sm text-tusk-lightBlue">Processed</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-red-400">{stats.blocked}</div>
              <div className="text-sm text-tusk-lightBlue">Blocked</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-400">{stats.approved}</div>
              <div className="text-sm text-tusk-lightBlue">Approved</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-tusk-teal">{stats.accuracy.toFixed(1)}%</div>
              <div className="text-sm text-tusk-lightBlue">Accuracy</div>
            </div>
          </div>

          <Button 
            onClick={startAnalysis} 
            disabled={isRunning}
            className="w-full bg-tusk-teal hover:bg-tusk-accent text-black mb-6"
          >
            {isRunning ? 'AI Analysis Running...' : 'Start AI Analysis'}
          </Button>

          <div className="space-y-3">
            {transactions.map((transaction) => (
              <div 
                key={transaction.id}
                className={`p-4 rounded-lg border-l-4 ${
                  transaction.status === 'blocked' 
                    ? 'bg-red-950/30 border-red-500' 
                    : transaction.status === 'flagged'
                    ? 'bg-yellow-950/30 border-yellow-500'
                    : 'bg-green-950/30 border-green-500'
                }`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-3">
                    {transaction.status === 'blocked' && <Shield className="h-5 w-5 text-red-500 mt-1" />}
                    {transaction.status === 'flagged' && <AlertTriangle className="h-5 w-5 text-yellow-500 mt-1" />}
                    {transaction.status === 'approved' && <CheckCircle className="h-5 w-5 text-green-500 mt-1" />}
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-white font-medium">{transaction.id}</span>
                        <Badge className={`${
                          transaction.status === 'blocked' ? 'bg-red-500' :
                          transaction.status === 'flagged' ? 'bg-yellow-500' : 'bg-green-500'
                        } text-white`}>
                          {transaction.status.toUpperCase()}
                        </Badge>
                      </div>
                      <div className="text-sm text-tusk-lightBlue">
                        ${transaction.amount.toLocaleString()} • {transaction.location} • {transaction.time}
                      </div>
                      <div className="text-xs text-tusk-teal mt-1">
                        Risk Score: {transaction.riskScore.toFixed(1)}%
                      </div>
                      {transaction.factors.length > 0 && (
                        <div className="text-xs text-tusk-lightBlue mt-1">
                          Factors: {transaction.factors.join(', ')}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default FraudDetectionAlgorithm;
