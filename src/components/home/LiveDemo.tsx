
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Shield, AlertTriangle, CheckCircle, TrendingUp, Brain, Zap } from 'lucide-react';

const LiveDemo = () => {
  const [activeTransactions, setActiveTransactions] = useState(1248);
  const [threatsBlocked, setThreatsBlocked] = useState(9842);
  const [detectionRate, setDetectionRate] = useState(99.8);
  const [isScanning, setIsScanning] = useState(false);

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveTransactions(prev => prev + Math.floor(Math.random() * 10) + 1);
      if (Math.random() > 0.7) {
        setThreatsBlocked(prev => prev + 1);
      }
      setDetectionRate(prev => Math.min(99.9, prev + (Math.random() - 0.5) * 0.1));
      setIsScanning(prev => !prev);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const recentAlerts = [
    { id: 1, type: 'critical', message: 'Unusual transaction pattern detected', time: '2 min ago', amount: '$5,240' },
    { id: 2, type: 'warning', message: 'Multiple login attempts', time: '5 min ago', location: 'Tokyo, Japan' },
    { id: 3, type: 'blocked', message: 'Fraudulent transaction blocked', time: '8 min ago', amount: '$12,500' },
  ];

  return (
    <section className="py-20 bg-tusk-navy">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-3 py-1 mb-6 rounded-full border border-tusk-teal/40 bg-tusk-teal/10">
            <span className="mr-2 h-2 w-2 rounded-full bg-tusk-teal animate-pulse"></span>
            <span className="text-sm font-medium text-tusk-teal">Live AI Demonstration</span>
          </div>
          <h2 className="text-4xl font-bold mb-6 text-white">
            Watch Our AI in <span className="text-gradient">Real-Time Action</span>
          </h2>
          <p className="text-xl text-tusk-lightBlue max-w-3xl mx-auto">
            Experience how our AI algorithms detect fraud patterns, analyze transactions, and protect your customers 24/7.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Real-time Stats */}
          <div className="lg:col-span-1 space-y-6">
            <Card className="bg-tusk-darkNavy/80 border-tusk-teal/30 backdrop-blur-sm">
              <CardHeader className="pb-3">
                <CardTitle className="text-white flex items-center gap-2">
                  <Brain className="h-5 w-5 text-tusk-teal" />
                  AI System Status
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-tusk-lightBlue">Active Monitoring</span>
                  <Badge className={`${isScanning ? 'bg-green-500' : 'bg-tusk-teal'} text-black`}>
                    {isScanning ? 'Scanning' : 'Active'}
                  </Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-tusk-lightBlue">Transactions</span>
                  <span className="text-white font-mono">{activeTransactions.toLocaleString()}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-tusk-lightBlue">Threats Blocked</span>
                  <span className="text-white font-mono">{threatsBlocked.toLocaleString()}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-tusk-lightBlue">Detection Rate</span>
                  <span className="text-white font-mono">{detectionRate.toFixed(1)}%</span>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-tusk-darkNavy/80 border-tusk-teal/30 backdrop-blur-sm">
              <CardHeader className="pb-3">
                <CardTitle className="text-white flex items-center gap-2">
                  <Zap className="h-5 w-5 text-tusk-teal" />
                  AI Processing
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></div>
                    <span className="text-sm text-tusk-lightBlue">Pattern Recognition Active</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-tusk-teal animate-pulse"></div>
                    <span className="text-sm text-tusk-lightBlue">Behavioral Analysis Running</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-blue-400 animate-pulse"></div>
                    <span className="text-sm text-tusk-lightBlue">Risk Assessment Processing</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Live Alerts Feed */}
          <div className="lg:col-span-2">
            <Card className="bg-tusk-darkNavy/80 border-tusk-teal/30 backdrop-blur-sm h-full">
              <CardHeader className="pb-3">
                <CardTitle className="text-white flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5 text-tusk-teal" />
                  Live Security Alerts
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentAlerts.map((alert) => (
                    <div 
                      key={alert.id}
                      className={`p-4 rounded-lg border-l-4 transition-all duration-300 ${
                        alert.type === 'critical' 
                          ? 'bg-red-950/30 border-red-500 animate-pulse' 
                          : alert.type === 'warning'
                          ? 'bg-yellow-950/30 border-yellow-500'
                          : 'bg-green-950/30 border-green-500'
                      }`}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex items-start gap-3">
                          {alert.type === 'critical' && <Shield className="h-5 w-5 text-red-500 mt-1" />}
                          {alert.type === 'warning' && <AlertTriangle className="h-5 w-5 text-yellow-500 mt-1" />}
                          {alert.type === 'blocked' && <CheckCircle className="h-5 w-5 text-green-500 mt-1" />}
                          <div>
                            <p className="text-white font-medium">{alert.message}</p>
                            <div className="flex items-center gap-4 mt-1">
                              <span className="text-xs text-tusk-lightBlue">{alert.time}</span>
                              {alert.amount && (
                                <span className="text-xs text-tusk-teal font-mono">{alert.amount}</span>
                              )}
                              {alert.location && (
                                <span className="text-xs text-tusk-lightBlue">{alert.location}</span>
                              )}
                            </div>
                          </div>
                        </div>
                        <Badge variant="outline" className="text-xs">
                          {alert.type.toUpperCase()}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LiveDemo;
