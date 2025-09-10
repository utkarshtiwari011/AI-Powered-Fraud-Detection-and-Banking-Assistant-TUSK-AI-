
import React, { useState } from 'react';
import Layout from '@/components/layout/Layout';
import ChatInterface from '@/components/bankingAssistant/ChatInterface';
import AssistantFeatures from '@/components/bankingAssistant/AssistantFeatures';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { MessageSquare, Brain, Users, Clock, Languages, Shield, Zap, TrendingUp } from 'lucide-react';

const BankingAssistant = () => {
  const [assistantStats, setAssistantStats] = useState({
    queriesHandled: 15420,
    avgResolutionTime: 12,
    customerSatisfaction: 4.8,
    automationRate: 87
  });

  const [isLearning, setIsLearning] = useState(false);

  const triggerLearningMode = () => {
    setIsLearning(true);
    setTimeout(() => {
      setAssistantStats(prev => ({
        ...prev,
        queriesHandled: prev.queriesHandled + Math.floor(Math.random() * 50),
        avgResolutionTime: Math.max(8, prev.avgResolutionTime - 1)
      }));
      setIsLearning(false);
    }, 3000);
  };

  return (
    <Layout>
      <div className="bg-tusk-navy text-white py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl">
            <div className="flex items-center gap-3 mb-4">
              <MessageSquare className="h-8 w-8 text-tusk-teal" />
              <h1 className="text-4xl font-bold">AI Banking Assistant</h1>
            </div>
            <p className="text-xl text-tusk-lightBlue mb-6">
              Intelligent conversational AI that provides 24/7 customer support with natural language understanding and contextual responses.
            </p>
            <div className="flex gap-4">
              <Button 
                onClick={triggerLearningMode}
                disabled={isLearning}
                className="bg-tusk-teal text-black hover:bg-tusk-accent flex items-center gap-2"
              >
                {isLearning ? (
                  <>
                    <div className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin"></div>
                    AI Learning...
                  </>
                ) : (
                  <>
                    <Brain className="h-4 w-4" />
                    Trigger Learning Mode
                  </>
                )}
              </Button>
              <Button variant="outline" className="border-tusk-teal text-tusk-teal hover:bg-tusk-teal hover:text-black">
                Integration Guide
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Performance Metrics */}
      <section className="py-12 bg-tusk-darkNavy">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
            {[
              { 
                icon: Users, 
                label: "Queries Handled Today", 
                value: assistantStats.queriesHandled.toLocaleString(),
                color: "text-blue-400" 
              },
              { 
                icon: Clock, 
                label: "Avg Resolution Time", 
                value: `${assistantStats.avgResolutionTime}s`,
                color: "text-green-400" 
              },
              { 
                icon: TrendingUp, 
                label: "Customer Satisfaction", 
                value: `${assistantStats.customerSatisfaction}/5.0`,
                color: "text-tusk-teal" 
              },
              { 
                icon: Zap, 
                label: "Automation Rate", 
                value: `${assistantStats.automationRate}%`,
                color: "text-yellow-400" 
              }
            ].map((stat, index) => (
              <Card key={index} className="bg-black/30 border-tusk-teal/20 backdrop-blur-sm">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-tusk-lightBlue text-sm mb-1">{stat.label}</p>
                      <p className={`text-2xl font-bold ${stat.color}`}>
                        {stat.value}
                      </p>
                    </div>
                    <stat.icon className={`h-8 w-8 ${stat.color}`} />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* AI Capabilities */}
          <Card className="bg-black/30 border-tusk-teal/20 backdrop-blur-sm mb-12">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Brain className="h-5 w-5 text-tusk-teal" />
                AI Capabilities & NLP Processing
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                  {
                    name: "Natural Language Understanding",
                    description: "Advanced NLP models for intent recognition and entity extraction",
                    status: isLearning ? "Training..." : "Active",
                    accuracy: "96.2%"
                  },
                  {
                    name: "Contextual Memory",
                    description: "Conversation history and context retention for personalized responses",
                    status: isLearning ? "Updating..." : "Online",
                    accuracy: "94.7%"
                  },
                  {
                    name: "Multi-language Support",
                    description: "Support for 15+ languages with cultural context understanding",
                    status: isLearning ? "Optimizing..." : "Ready",
                    accuracy: "92.1%"
                  }
                ].map((capability, index) => (
                  <div key={index} className="p-4 bg-tusk-darkNavy/50 rounded-lg border border-tusk-teal/10">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="text-white font-medium">{capability.name}</h4>
                      <Badge className={`${
                        isLearning ? 'bg-orange-500/20 text-orange-400' : 'bg-green-500/20 text-green-400'
                      }`}>
                        {capability.status}
                      </Badge>
                    </div>
                    <p className="text-tusk-lightBlue text-sm mb-2">{capability.description}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-tusk-lightBlue">Accuracy</span>
                      <span className="text-xs text-tusk-teal font-medium">{capability.accuracy}</span>
                    </div>
                    {isLearning && (
                      <div className="mt-2 h-1 bg-tusk-darkNavy rounded-full overflow-hidden">
                        <div className="h-full bg-gradient-to-r from-orange-400 to-tusk-teal animate-pulse"></div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
      
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          <div>
            <h2 className="text-2xl font-bold text-tusk-navy mb-6">Try Our AI Assistant</h2>
            <p className="text-tusk-blue mb-6">
              Experience our advanced AI banking assistant with natural language processing, 
              contextual understanding, and comprehensive banking knowledge.
            </p>
            
            {/* Enhanced Command Examples */}
            <div className="bg-tusk-grey p-6 rounded-lg mb-6">
              <h3 className="font-semibold mb-4 text-tusk-navy">Advanced Commands to Try:</h3>
              <div className="grid grid-cols-1 gap-3">
                {[
                  { command: "What's my account balance and recent spending pattern?", category: "Account Management" },
                  { command: "I suspect fraud on my card, please freeze it immediately", category: "Security" },
                  { command: "Show me my transaction history for the last 30 days", category: "Transactions" },
                  { command: "Help me set up automatic bill payments", category: "Automation" },
                  { command: "I need to dispute a charge from yesterday", category: "Dispute Resolution" },
                  { command: "Find the nearest ATM with my bank network", category: "Location Services" }
                ].map((example, index) => (
                  <div key={index} className="p-3 bg-white rounded border-l-4 border-tusk-teal">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">{example.command}</span>
                      <Badge variant="outline" className="text-xs">{example.category}</Badge>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="bg-blue-50 p-4 rounded-lg">
              <div className="flex items-start gap-3">
                <Shield className="h-5 w-5 text-blue-600 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-blue-900 mb-1">Demo Environment</p>
                  <p className="text-xs text-blue-700">
                    This demonstration uses simulated banking data. In production, the assistant 
                    connects securely to your core banking systems with full encryption and compliance.
                  </p>
                </div>
              </div>
            </div>
          </div>
          
          <div>
            <ChatInterface />
          </div>
        </div>
        
        <div className="mt-20">
          <AssistantFeatures />
        </div>
      </div>
    </Layout>
  );
};

export default BankingAssistant;
