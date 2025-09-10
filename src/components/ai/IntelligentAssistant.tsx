import React, { useState, useRef, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Send, Bot, User, AlertTriangle, CreditCard, TrendingUp, Shield } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface Message {
  id: string;
  content: string;
  sender: 'user' | 'assistant';
  timestamp: Date;
  intent?: string;
  confidence?: number;
}

const IntelligentAssistant = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      content: 'Hello! I\'m your AI Banking Assistant. I can help you with fraud reports, transaction analysis, account security, and general banking questions. How can I assist you today?',
      sender: 'assistant',
      timestamp: new Date(),
      intent: 'greeting',
      confidence: 0.99
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async () => {
    if (!inputMessage.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputMessage,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsLoading(true);

    try {
      // Call AI Banking Assistant function
      const { data, error } = await supabase.functions.invoke('ai-banking-assistant', {
        body: { 
          message: inputMessage,
          context: {
            session_id: `session_${Date.now()}`,
            user_id: null // Demo mode
          }
        }
      });

      if (error) throw error;

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: data.response,
        sender: 'assistant',
        timestamp: new Date(),
        intent: data.intent,
        confidence: data.confidence
      };

      setMessages(prev => [...prev, assistantMessage]);

      // Show toast for fraud-related intents
      if (data.intent === 'fraud_report' || data.intent === 'suspicious_activity') {
        toast({
          title: "Fraud Alert Detected",
          description: "I've escalated your concern to our fraud prevention team.",
          variant: "default"
        });
      }

    } catch (error) {
      console.error('Error sending message:', error);
      
      // Fallback responses based on keywords
      let response = "I apologize, but I'm experiencing technical difficulties. Let me provide some general assistance.";
      let intent = 'general';
      let confidence = 0.5;

      const lowerMessage = inputMessage.toLowerCase();
      
      if (lowerMessage.includes('fraud') || lowerMessage.includes('suspicious') || lowerMessage.includes('hack')) {
        response = "🚨 I understand you're reporting suspicious activity. For immediate assistance with potential fraud:\n\n1. **Immediate Action**: Call our fraud hotline at 1-800-FRAUD-HELP\n2. **Block Card**: I can help you temporarily block your card\n3. **Review Transactions**: Let's check your recent transactions\n4. **File Report**: I'll help you file a formal fraud report\n\nWould you like me to start the card blocking process?";
        intent = 'fraud_report';
        confidence = 0.85;
      } else if (lowerMessage.includes('transaction') || lowerMessage.includes('payment')) {
        response = "I can help you with transaction-related questions:\n\n• **Recent Transactions**: View your last 30 days\n• **Disputed Charges**: Report unauthorized transactions\n• **Payment Issues**: Resolve failed or pending payments\n• **Transaction Limits**: Check or modify your limits\n\nWhat specific transaction issue can I help you with?";
        intent = 'transaction_inquiry';
        confidence = 0.80;
      } else if (lowerMessage.includes('account') || lowerMessage.includes('balance')) {
        response = "I can assist with account-related services:\n\n• **Account Balance**: Current balance and available funds\n• **Account Security**: Password reset and security settings\n• **Account Statements**: Download or request statements\n• **Account Alerts**: Set up transaction notifications\n\nWhat would you like to know about your account?";
        intent = 'account_inquiry';
        confidence = 0.75;
      }

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: response,
        sender: 'assistant',
        timestamp: new Date(),
        intent,
        confidence
      };

      setMessages(prev => [...prev, assistantMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const getIntentIcon = (intent?: string) => {
    switch (intent) {
      case 'fraud_report':
      case 'suspicious_activity':
        return <AlertTriangle className="h-4 w-4 text-red-500" />;
      case 'transaction_inquiry':
        return <CreditCard className="h-4 w-4 text-blue-500" />;
      case 'account_inquiry':
        return <TrendingUp className="h-4 w-4 text-green-500" />;
      default:
        return <Shield className="h-4 w-4 text-gray-500" />;
    }
  };

  const getIntentColor = (intent?: string) => {
    switch (intent) {
      case 'fraud_report':
      case 'suspicious_activity':
        return 'bg-red-100 text-red-700';
      case 'transaction_inquiry':
        return 'bg-blue-100 text-blue-700';
      case 'account_inquiry':
        return 'bg-green-100 text-green-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  const quickActions = [
    { label: 'Report Fraud', message: 'I need to report a fraudulent transaction on my account' },
    { label: 'Check Transaction', message: 'Can you help me check a recent transaction?' },
    { label: 'Account Security', message: 'I have concerns about my account security' },
    { label: 'Block Card', message: 'I need to block my credit card immediately' }
  ];

  return (
    <div className="flex flex-col h-[600px]">
      <Card className="flex-1 flex flex-col">
        <CardHeader className="border-b">
          <CardTitle className="flex items-center gap-2">
            <Bot className="h-5 w-5 text-blue-500" />
            AI Banking Assistant
            <Badge variant="outline" className="ml-auto">
              Live Demo
            </Badge>
          </CardTitle>
        </CardHeader>
        
        <CardContent className="flex-1 flex flex-col p-0">
          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div className={`max-w-[80%] ${message.sender === 'user' ? 'order-1' : 'order-2'}`}>
                  <div
                    className={`rounded-lg p-3 ${
                      message.sender === 'user'
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-100 text-gray-800'
                    }`}
                  >
                    <div className="whitespace-pre-wrap">{message.content}</div>
                  </div>
                  
                  <div className={`flex items-center gap-2 mt-1 text-xs text-gray-500 ${
                    message.sender === 'user' ? 'justify-end' : 'justify-start'
                  }`}>
                    <div className="flex items-center gap-1">
                      {message.sender === 'user' ? (
                        <User className="h-3 w-3" />
                      ) : (
                        <Bot className="h-3 w-3" />
                      )}
                      {message.timestamp.toLocaleTimeString()}
                    </div>
                    
                    {message.sender === 'assistant' && message.intent && (
                      <Badge variant="outline" className={`text-xs ${getIntentColor(message.intent)}`}>
                        {getIntentIcon(message.intent)}
                        {message.intent.replace('_', ' ')}
                        {message.confidence && ` (${(message.confidence * 100).toFixed(0)}%)`}
                      </Badge>
                    )}
                  </div>
                </div>
              </div>
            ))}
            
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-gray-100 rounded-lg p-3 max-w-[80%]">
                  <div className="flex items-center gap-2">
                    <Bot className="h-4 w-4 text-blue-500" />
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0ms'}}></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '150ms'}}></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '300ms'}}></div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Actions */}
          <div className="border-t border-b p-3">
            <div className="text-sm text-gray-600 mb-2">Quick Actions:</div>
            <div className="flex flex-wrap gap-2">
              {quickActions.map((action, index) => (
                <Button
                  key={index}
                  variant="outline"
                  size="sm"
                  onClick={() => setInputMessage(action.message)}
                  className="text-xs"
                >
                  {action.label}
                </Button>
              ))}
            </div>
          </div>

          {/* Input */}
          <div className="p-4 border-t">
            <div className="flex gap-2">
              <Input
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ask about fraud, transactions, or banking services..."
                disabled={isLoading}
                className="flex-1"
              />
              <Button
                onClick={handleSendMessage}
                disabled={!inputMessage.trim() || isLoading}
                size="icon"
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default IntelligentAssistant;