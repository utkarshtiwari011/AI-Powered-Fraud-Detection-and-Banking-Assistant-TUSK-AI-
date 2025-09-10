
import React from 'react';
import { Shield, Clock, CircleCheck, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

const FraudFeatures = () => {
  return (
    <div className="py-12">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-tusk-navy mb-4">
            Advanced Fraud Detection System
          </h2>
          <p className="text-tusk-blue text-lg max-w-2xl mx-auto">
            Protect your financial institution and customers with our AI-powered real-time monitoring and prevention system.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100 floating-card">
            <div className="bg-tusk-navy/10 w-12 h-12 rounded-full flex items-center justify-center mb-4">
              <Shield className="h-6 w-6 text-tusk-navy" />
            </div>
            <h3 className="text-xl font-semibold mb-2 text-tusk-navy">Real-Time Monitoring</h3>
            <p className="text-tusk-blue mb-4">
              Continuous analysis of transactions using machine learning models to detect anomalies, patterns, and high-risk behavior.
            </p>
            <ul className="space-y-2">
              <li className="flex items-center gap-2 text-sm">
                <CircleCheck className="h-4 w-4 text-green-600" />
                <span>Random Forest & LSTM algorithms</span>
              </li>
              <li className="flex items-center gap-2 text-sm">
                <CircleCheck className="h-4 w-4 text-green-600" />
                <span>Behavioral biometrics analysis</span>
              </li>
              <li className="flex items-center gap-2 text-sm">
                <CircleCheck className="h-4 w-4 text-green-600" />
                <span>Pattern recognition technology</span>
              </li>
            </ul>
          </div>
          
          <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100 floating-card">
            <div className="bg-tusk-teal/10 w-12 h-12 rounded-full flex items-center justify-center mb-4">
              <Clock className="h-6 w-6 text-tusk-teal" />
            </div>
            <h3 className="text-xl font-semibold mb-2 text-tusk-navy">Rapid Response</h3>
            <p className="text-tusk-blue mb-4">
              Instant alerts and automated actions to block suspicious transactions and protect customer accounts in real-time.
            </p>
            <ul className="space-y-2">
              <li className="flex items-center gap-2 text-sm">
                <CircleCheck className="h-4 w-4 text-green-600" />
                <span>Under 2-second response time</span>
              </li>
              <li className="flex items-center gap-2 text-sm">
                <CircleCheck className="h-4 w-4 text-green-600" />
                <span>Multi-channel alert system</span>
              </li>
              <li className="flex items-center gap-2 text-sm">
                <CircleCheck className="h-4 w-4 text-green-600" />
                <span>Automated prevention actions</span>
              </li>
            </ul>
          </div>
          
          <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100 floating-card">
            <div className="bg-tusk-blue/10 w-12 h-12 rounded-full flex items-center justify-center mb-4">
              <Shield className="h-6 w-6 text-tusk-blue" />
            </div>
            <h3 className="text-xl font-semibold mb-2 text-tusk-navy">Self-Learning Models</h3>
            <p className="text-tusk-blue mb-4">
              Continuous improvement through feedback loops, reducing false positives and adapting to new fraud patterns.
            </p>
            <ul className="space-y-2">
              <li className="flex items-center gap-2 text-sm">
                <CircleCheck className="h-4 w-4 text-green-600" />
                <span>Adaptive machine learning</span>
              </li>
              <li className="flex items-center gap-2 text-sm">
                <CircleCheck className="h-4 w-4 text-green-600" />
                <span>Historical data analysis</span>
              </li>
              <li className="flex items-center gap-2 text-sm">
                <CircleCheck className="h-4 w-4 text-green-600" />
                <span>95% detection accuracy</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="text-center">
          <Button className="bg-tusk-navy hover:bg-tusk-blue inline-flex items-center gap-2">
            Learn More About Our Fraud Detection <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default FraudFeatures;
