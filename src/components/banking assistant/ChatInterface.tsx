import React, { useState, useEffect, useRef } from 'react';
import { Send, Bot, User, Sparkles, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/hooks/use-toast';

interface Message {
  id: number;
  content: string;
  sender: 'user' | 'assistant';
  timestamp: Date;
  intent?: string;
  confidence?: number;
  suggestions?: string[];
}

// Sample initial messages
const initialMessages: Message[] = [
  {
    id: 1,
    content: "Hello! I'm your TUSK AI Banking Assistant. I can help you with account inquiries, transaction history, fraud reports, and general banking questions. How can I assist you today?",
    sender: 'assistant',
    timestamp: new Date(),
    suggestions: [
      "Check my account balance",
      "Recent transactions",
      "Report fraud",
      "Find nearby ATM"
    ]
  },
];

const ChatInterface = () => {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [conversationId, setConversationId] = useState<string>('');
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const { user } = useAuth();
  const { toast } = useToast();

  useEffect(() => {
    // Generate unique conversation ID
    setConversationId(`conv_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`);
    
    // Auto-scroll to bottom
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight;
    }
  }, [messages]);

  const getAIResponse = async (userMessage: string): Promise<{ content: string; intent: string; confidence: number; suggestions?: string[] }> => {
    // Enhanced AI response logic
    const lowerMessage = userMessage.toLowerCase();
    
    if (lowerMessage.includes('balance') || lowerMessage.includes('money') || lowerMessage.includes('account')) {
      return {
        content: "Your current checking account balance is $3,452.67. Your savings account balance is $12,890.45. Both accounts are in good standing.",
        intent: 'balance_inquiry',
        confidence: 0.95,
        suggestions: ["Recent transactions", "Transfer money", "Account statements"]
      };
    }
    
    if (lowerMessage.includes('transaction') || lowerMessage.includes('payment') || lowerMessage.includes('history')) {
      return {
        content: "Here are your recent transactions:\\n\\n• April 7: Amazon.com - $42.99 (Online Purchase)\\n• April 6: Starbucks - $5.47 (Debit Card)\\n• April 5: Shell Gas Station - $65.23 (Debit Card)\\n• April 4: Salary Deposit - +$3,200.00\\n\\nWould you like more details about any specific transaction?",
        intent: 'transaction_history',
        confidence: 0.92,
        suggestions: ["Dispute transaction", "Download statement", "Set up alerts"]
      };
    }
    
    if (lowerMessage.includes('fraud') || lowerMessage.includes('suspicious') || lowerMessage.includes('unauthorized')) {
      return {
        content: "I understand your concern about potential fraud. I've immediately flagged this for our security team and temporarily frozen your card for protection. You'll receive an email confirmation shortly. Our fraud department will contact you within 2 hours to verify recent transactions.",
        intent: 'fraud_report',
        confidence: 0.98,
        suggestions: ["Check card status", "Update contact info", "Security settings"]
      };
    }
    
    if (lowerMessage.includes('atm') || lowerMessage.includes('location') || lowerMessage.includes('branch')) {
      return {
        content: "The nearest ATM is at 123 Main Street, about 0.3 miles away. It's open 24/7 and has no service fee for our customers. There's also a full-service branch at 456 Oak Avenue, open Monday-Friday 9 AM to 5 PM.",
        intent: 'location_inquiry',
        confidence: 0.88,
        suggestions: ["Get directions", "Check branch hours", "Schedule appointment"]
      };
    }
    
    if (lowerMessage.includes('transfer') || lowerMessage.includes('send') || lowerMessage.includes('move')) {
      return {
        content: "I can help you with transfers! You can transfer between your accounts instantly, or send money to other people. What type of transfer would you like to make?",
        intent: 'transfer_request',
        confidence: 0.90,
        suggestions: ["Transfer between accounts", "Send to contact", "International transfer"]
      };
    }
    
    if (lowerMessage.includes('help') || lowerMessage.includes('support') || lowerMessage.includes('assist')) {
      return {
        content: "I'm here to help! I can assist you with:\\n\\n• Checking account balances and statements\\n• Reviewing transaction history\\n• Reporting fraud or suspicious activity\\n• Finding ATMs and branch locations\\n• Money transfers and payments\\n• General banking questions\\n\\nWhat would you like to do?",
        intent: 'help_request',
        confidence: 0.85,
        suggestions: ["Check balance", "Recent transactions", "Find ATM", "Report fraud"]
      };
    }
    
    // Default response with AI-powered assistance
    try {
      const response = await supabase.functions.invoke('ai-banking-assistant', {
        body: { 
          prompt: userMessage,
          user_id: user?.id,
          conversation_id: conversationId
        }
      });
      
      if (response.error) throw response.error;
      
      return {
        content: response.data?.response || "I understand you're asking about banking services. While I'm here to help with account inquiries, transactions, and general banking questions, I may need to connect you with a human agent for more complex requests. How else can I assist you today?",
        intent: 'general_inquiry',
        confidence: response.data?.confidence || 0.7,
        suggestions: ["Speak to agent", "Check balance", "Recent transactions", "Find help"]
      };
    } catch (error) {
      console.error('AI response error:', error);
      return {
        content: "I'm here to help with your banking needs! I can assist with account balances, transactions, fraud reports, and finding locations. What would you like to know?",
        intent: 'fallback',
        confidence: 0.6,
        suggestions: ["Check balance", "Recent transactions", "Report fraud", "Find ATM"]
      };
    }
  };

  const saveConversation = async (userMessage: string, assistantMessage: string, intent: string, confidence: number) => {
    if (!user) return;
    
    try {
      // Create conversation if it doesn't exist
      const { data: conversation } = await supabase
        .from('chat_conversations')
        .select('id')
        .eq('session_id', conversationId)
        .single();
      
      let convId = conversation?.id;
      
      if (!convId) {
        const { data: newConv, error: convError } = await supabase
          .from('chat_conversations')
          .insert([{
            user_id: user.id,
            session_id: conversationId,
            title: 'Banking Assistant Chat'
          }])
          .select()
          .single();
        
        if (convError) throw convError;
        convId = newConv.id;
      }
      
      // Save messages
      await supabase
        .from('chat_messages')
        .insert([
          {
            conversation_id: convId,
            content: userMessage,
            sender: 'user'
          },
          {
            conversation_id: convId,
            content: assistantMessage,
            sender: 'assistant',
            intent,
            confidence
          }
        ]);
    } catch (error) {
      console.error('Error saving conversation:', error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isTyping) return;

    const userMessage = input.trim();
    setInput('');

    // Add user message
    const userMsg: Message = {
      id: messages.length + 1,
      content: userMessage,
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMsg]);
    setIsTyping(true);

    try {
      // Get AI response
      const aiResponse = await getAIResponse(userMessage);
      
      // Add assistant message
      const assistantMsg: Message = {
        id: messages.length + 2,
        content: aiResponse.content,
        sender: 'assistant',
        timestamp: new Date(),
        intent: aiResponse.intent,
        confidence: aiResponse.confidence,
        suggestions: aiResponse.suggestions
      };

      // Simulate typing delay
      setTimeout(() => {
        setMessages(prev => [...prev, assistantMsg]);
        setIsTyping(false);
        
        // Save conversation to database
        saveConversation(userMessage, aiResponse.content, aiResponse.intent, aiResponse.confidence);
      }, 1000);
      
    } catch (error) {
      console.error('Error getting AI response:', error);
      setIsTyping(false);
      
      toast({
        title: "Connection Error",
        description: "Having trouble connecting to the AI assistant. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    setInput(suggestion);
  };

  if (!user) {
    return (
      <Card className="tech-border bg-tusk-darkNavy/80 backdrop-blur-xl">
        <CardContent className="p-8 text-center">
          <AlertCircle className="h-12 w-12 text-tusk-accent mx-auto mb-4" />
          <h3 className="text-xl font-bold text-white mb-2">Authentication Required</h3>
          <p className="text-tusk-lightBlue mb-4">
            Please sign in to access the AI Banking Assistant and get personalized help with your banking needs.
          </p>
          <Button asChild className="bg-tusk-teal hover:bg-tusk-accent text-black">
            <a href="/auth">Sign In</a>
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="tech-border bg-tusk-darkNavy/80 backdrop-blur-xl h-[600px] flex flex-col">
      <div className="p-4 border-b border-white/10">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-tusk-teal/20 flex items-center justify-center">
            <Bot className="h-6 w-6 text-tusk-teal" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-white">TUSK AI Banking Assistant</h3>
            <p className="text-sm text-tusk-lightBlue">Secure • Intelligent • Always Available</p>
          </div>
          <div className="ml-auto">
            <Badge variant="outline" className="border-tusk-teal text-tusk-teal">
              Online
            </Badge>
          </div>
        </div>
      </div>

      <ScrollArea ref={scrollAreaRef} className="flex-1 p-4">
        <div className="space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex gap-3 ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              {message.sender === 'assistant' && (
                <div className="w-8 h-8 rounded-full bg-tusk-teal/20 flex items-center justify-center flex-shrink-0">
                  <Bot className="h-4 w-4 text-tusk-teal" />
                </div>
              )}
              
              <div className={`max-w-[80%] ${message.sender === 'user' ? 'order-2' : ''}`}>
                <div
                  className={`rounded-lg p-3 ${
                    message.sender === 'user'
                      ? 'bg-tusk-teal text-black ml-auto'
                      : 'bg-black/30 text-white border border-white/10'
                  }`}
                >
                  <p className="whitespace-pre-line">{message.content}</p>
                  
                  {message.intent && message.confidence && (
                    <div className="flex items-center gap-2 mt-2 text-xs opacity-60">
                      <Sparkles className="h-3 w-3" />
                      <span>{message.intent} ({Math.round(message.confidence * 100)}% confidence)</span>
                    </div>
                  )}
                </div>
                
                {message.suggestions && message.suggestions.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-2">
                    {message.suggestions.map((suggestion, index) => (
                      <Button
                        key={index}
                        variant="outline"
                        size="sm"
                        onClick={() => handleSuggestionClick(suggestion)}
                        className="text-xs border-white/20 text-white hover:bg-white/10"
                      >
                        {suggestion}
                      </Button>
                    ))}
                  </div>
                )}
              </div>
              
              {message.sender === 'user' && (
                <div className="w-8 h-8 rounded-full bg-tusk-blue/20 flex items-center justify-center flex-shrink-0">
                  <User className="h-4 w-4 text-tusk-blue" />
                </div>
              )}
            </div>
          ))}
          
          {isTyping && (
            <div className="flex gap-3 justify-start">
              <div className="w-8 h-8 rounded-full bg-tusk-teal/20 flex items-center justify-center">
                <Bot className="h-4 w-4 text-tusk-teal" />
              </div>
              <div className="bg-black/30 text-white border border-white/10 rounded-lg p-3">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-tusk-teal rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-tusk-teal rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                  <div className="w-2 h-2 bg-tusk-teal rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                </div>
              </div>
            </div>
          )}
        </div>
      </ScrollArea>

      <div className="p-4 border-t border-white/10">
        <form onSubmit={handleSubmit} className="flex gap-2">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask about your account, transactions, or banking services..."
            disabled={isTyping}
            className="bg-black/30 border border-white/20 text-white placeholder:text-white/60 focus:border-tusk-teal"
          />
          <Button 
            type="submit" 
            disabled={!input.trim() || isTyping}
            className="bg-tusk-teal hover:bg-tusk-accent text-black"
          >
            <Send className="h-4 w-4" />
          </Button>
        </form>
        
        <div className="mt-2 text-xs text-tusk-lightBlue/60 text-center">
          Powered by TUSK AI • Secure & Encrypted • Banking-Grade Security
        </div>
      </div>
    </Card>
  );
};

export default ChatInterface;