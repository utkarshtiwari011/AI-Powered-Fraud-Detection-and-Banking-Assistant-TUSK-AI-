
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { AlertTriangle, Check, X, Clock, ArrowRight } from 'lucide-react';

interface Transaction {
  id: string;
  amount: number;
  merchant: string;
  time: string;
  status: 'legitimate' | 'suspicious' | 'fraudulent' | 'pending';
}

const initialTransactions: Transaction[] = [
  { id: 'tx-001', amount: 42.15, merchant: 'Grocery Store', time: '1 min ago', status: 'legitimate' },
  { id: 'tx-002', amount: 6.50, merchant: 'Coffee Shop', time: '15 mins ago', status: 'legitimate' },
  { id: 'tx-003', amount: 120.00, merchant: 'Gas Station', time: '2 hours ago', status: 'legitimate' },
];

const DemoSimulation = () => {
  const [isRunning, setIsRunning] = useState(false);
  const [transactions, setTransactions] = useState<Transaction[]>(initialTransactions);
  const [detectedFraud, setDetectedFraud] = useState<Transaction | null>(null);
  const [showAction, setShowAction] = useState(false);
  
  const startSimulation = () => {
    setIsRunning(true);
    
    // Simulate detecting a suspicious transaction
    setTimeout(() => {
      const fraudTx: Transaction = {
        id: 'tx-004',
        amount: 899.99,
        merchant: 'Electronics Store (Unusual Location)',
        time: 'Just now',
        status: 'suspicious'
      };
      
      setTransactions(prev => [fraudTx, ...prev]);
      setDetectedFraud(fraudTx);
    }, 3000);
    
    setTimeout(() => {
      setShowAction(true);
    }, 5000);
  };
  
  const handleBlockTransaction = () => {
    if (detectedFraud) {
      setTransactions(prev => 
        prev.map(tx => 
          tx.id === detectedFraud.id 
            ? { ...tx, status: 'fraudulent' } 
            : tx
        )
      );
      
      setTimeout(() => {
        setDetectedFraud(null);
        setShowAction(false);
        setIsRunning(false);
      }, 2000);
    }
  };
  
  const handleApproveTransaction = () => {
    if (detectedFraud) {
      setTransactions(prev => 
        prev.map(tx => 
          tx.id === detectedFraud.id 
            ? { ...tx, status: 'legitimate' } 
            : tx
        )
      );
      
      setTimeout(() => {
        setDetectedFraud(null);
        setShowAction(false);
        setIsRunning(false);
      }, 2000);
    }
  };
  
  const getStatusIcon = (status: Transaction['status']) => {
    switch (status) {
      case 'legitimate':
        return <Check className="h-4 w-4 text-green-400" />;
      case 'suspicious':
        return <AlertTriangle className="h-4 w-4 text-yellow-400" />;
      case 'fraudulent':
        return <X className="h-4 w-4 text-red-400" />;
      case 'pending':
        return <Clock className="h-4 w-4 text-blue-400" />;
    }
  };
  
  return (
    <div className="tech-border bg-tusk-darkNavy/80 backdrop-blur-xl p-8">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-white mb-2">Live Fraud Detection</h2>
        <p className="text-tusk-lightBlue">
          Watch our AI system detect and prevent fraud in real-time
        </p>
      </div>
      
      {detectedFraud && (
        <div className="mb-6 p-4 border border-yellow-500/50 rounded-lg bg-yellow-500/10 animate-pulse">
          <div className="flex items-center gap-3 mb-2">
            <AlertTriangle className="h-5 w-5 text-yellow-400" />
            <span className="text-white font-medium">Suspicious Transaction Detected!</span>
          </div>
          <p className="text-tusk-lightBlue mb-4">
            Our AI has flagged a transaction for ${detectedFraud.amount} at {detectedFraud.merchant} as potentially fraudulent.
          </p>
          
          {showAction && (
            <div className="flex flex-col sm:flex-row gap-2">
              <Button 
                onClick={handleBlockTransaction}
                className="bg-red-500 hover:bg-red-600 text-white flex-1"
              >
                <X className="mr-1 h-4 w-4" /> Block Transaction
              </Button>
              <Button 
                onClick={handleApproveTransaction}
                variant="outline" 
                className="border-white/20 text-white hover:bg-white/10 flex-1"
              >
                <Check className="mr-1 h-4 w-4" /> Approve Transaction
              </Button>
            </div>
          )}
        </div>
      )}
      
      <div className="bg-black/30 rounded-lg border border-white/10 overflow-hidden mb-6">
        <div className="p-3 border-b border-white/10 flex justify-between items-center">
          <div className="text-white font-medium">Recent Transactions</div>
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-tusk-teal animate-pulse"></span>
            <span className="text-xs text-tusk-lightBlue">Live</span>
          </div>
        </div>
        
        <div className="overflow-y-auto max-h-[300px]">
          {transactions.map((tx) => (
            <div key={tx.id} className={`p-3 border-b border-white/10 flex justify-between ${
              tx.status === 'suspicious' ? 'bg-yellow-500/5' : 
              tx.status === 'fraudulent' ? 'bg-red-500/5' : ''
            }`}>
              <div>
                <div className="text-white">${tx.amount.toFixed(2)} - {tx.merchant}</div>
                <div className="text-xs text-tusk-lightBlue">{tx.time}</div>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-5 w-5 rounded-full bg-black/30 flex items-center justify-center">
                  {getStatusIcon(tx.status)}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {!isRunning && !detectedFraud && (
        <Button onClick={startSimulation} className="w-full bg-tusk-teal hover:bg-tusk-accent text-black">
          Start Simulation
        </Button>
      )}
      
      {isRunning && !detectedFraud && (
        <div className="text-center p-4 border border-tusk-teal/30 rounded-lg bg-black/20">
          <div className="inline-block h-6 w-6 animate-spin rounded-full border-2 border-solid border-tusk-teal border-r-transparent mb-2"></div>
          <div className="text-white">Monitoring transactions...</div>
        </div>
      )}
    </div>
  );
};

export default DemoSimulation;
