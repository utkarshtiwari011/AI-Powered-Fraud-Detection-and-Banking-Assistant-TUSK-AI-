
import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Send, MessageSquare, Bot, User } from 'lucide-react';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
  typing?: boolean;
}

const IntelligentChatbot = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: "Hello! I'm your AI Banking Assistant. I can help you with account inquiries, fraud reports, and general banking questions. How can I assist you today?",
      sender: 'bot',
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // AI-powered response generator
  const generateResponse = (userInput: string): string => {
    const input = userInput.toLowerCase();
    
    // Balance inquiries
    if (input.includes('balance') || input.includes('account balance')) {
      return "Your current checking account balance is $3,247.89 and your savings account balance is $15,623.45. Would you like to see recent transactions?";
    }
    
    // Transaction history
    if (input.includes('transaction') || input.includes('history') || input.includes('statement')) {
      return "Here are your recent transactions:\n• $42.99 - Amazon Purchase (Today)\n• $1,200.00 - Rent Payment (Dec 1)\n• $89.50 - Grocery Store (Nov 30)\n• $25.00 - Gas Station (Nov 29)\n\nWould you like to see more details?";
    }
    
    // Fraud reporting
    if (input.includes('fraud') || input.includes('suspicious') || input.includes('unauthorized')) {
      return "I understand your concern about potential fraud. I've immediately flagged your account for review and temporarily frozen your card for security. You should receive a confirmation email within 2 minutes. Would you like me to connect you with our fraud specialist?";
    }
    
    // Card services
    if (input.includes('card') || input.includes('freeze') || input.includes('block')) {
      return "I can help you with card services. Your card has been temporarily frozen for security. To unfreeze it, please verify your identity by providing the last 4 digits of your social security number, or I can transfer you to a human agent.";
    }
    
    // ATM locations
    if (input.includes('atm') || input.includes('location') || input.includes('branch')) {
      return "The nearest ATM is located at 123 Main Street, just 0.3 miles away. It's available 24/7 with no fees for our customers. Would you like directions or information about other nearby locations?";
    }
    
    // Transfer money
    if (input.includes('transfer') || input.includes('send money') || input.includes('payment')) {
      return "I can help you transfer money between your accounts or to other recipients. For security, transfers over $1,000 require additional verification. What type of transfer would you like to make?";
    }
    
    // Loan information
    if (input.includes('loan') || input.includes('mortgage') || input.includes('credit')) {
      return "I can provide information about our loan products. Based on your account history, you may be pre-qualified for a personal loan up to $25,000 at 5.99% APR. Would you like to learn more about our loan options?";
    }
    
    // Investment services
    if (input.includes('invest') || input.includes('stock') || input.includes('portfolio')) {
      return "Our investment services can help you grow your wealth. Based on your profile, I recommend starting with our diversified portfolio option. Would you like to schedule a consultation with one of our financial advisors?";
    }
    
    // Help or capabilities
    if (input.includes('help') || input.includes('what can you do') || input.includes('capabilities')) {
      return "I can help you with:\n• Account balance and transaction history\n• Fraud reporting and card management\n• Money transfers and payments\n• ATM and branch locations\n• Loan and investment information\n• General banking questions\n\nWhat would you like assistance with?";
    }
    
    // Greeting responses
    if (input.includes('hello') || input.includes('hi') || input.includes('good morning') || input.includes('good afternoon')) {
      return "Hello! It's great to hear from you. I'm here to help with all your banking needs. How can I assist you today?";
    }
    
    // Default response
    return "I understand you're asking about banking services. While I can help with most common banking tasks, I want to make sure I give you accurate information. Could you please rephrase your question or ask about account balances, transactions, fraud concerns, or card services?";
  };

  const handleSendMessage = async () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: input,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    // Simulate AI processing time
    setTimeout(() => {
      const response = generateResponse(input);
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: response,
        sender: 'bot',
        timestamp: new Date()
      };

      setMessages(prev => [...prev, botMessage]);
      setIsTyping(false);
    }, 1500);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <Card className="h-[600px] bg-tusk-darkNavy/80 border-tusk-teal/30 backdrop-blur-sm flex flex-col">
      <CardHeader className="pb-3 border-b border-tusk-teal/20">
        <CardTitle className="text-white flex items-center gap-2">
          <MessageSquare className="h-5 w-5 text-tusk-teal" />
          AI Banking Assistant
        </CardTitle>
        <div className="flex items-center gap-2 text-sm text-tusk-lightBlue">
          <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></div>
          Online and ready to help
        </div>
      </CardHeader>

      <CardContent className="flex-1 flex flex-col p-0">
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`flex items-start gap-2 max-w-[80%] ${
                message.sender === 'user' ? 'flex-row-reverse' : 'flex-row'
              }`}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  message.sender === 'user' ? 'bg-tusk-teal' : 'bg-tusk-blue'
                }`}>
                  {message.sender === 'user' ? 
                    <User className="h-4 w-4 text-black" /> : 
                    <Bot className="h-4 w-4 text-white" />
                  }
                </div>
                <div className={`rounded-lg px-4 py-2 ${
                  message.sender === 'user' 
                    ? 'bg-tusk-teal text-black' 
                    : 'bg-tusk-blue/20 text-white border border-tusk-teal/20'
                }`}>
                  <div className="whitespace-pre-wrap">{message.text}</div>
                  <div className={`text-xs mt-1 ${
                    message.sender === 'user' ? 'text-black/70' : 'text-tusk-lightBlue'
                  }`}>
                    {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </div>
                </div>
              </div>
            </div>
          ))}
          
          {isTyping && (
            <div className="flex justify-start">
              <div className="flex items-start gap-2">
                <div className="w-8 h-8 rounded-full bg-tusk-blue flex items-center justify-center">
                  <Bot className="h-4 w-4 text-white" />
                </div>
                <div className="bg-tusk-blue/20 text-white border border-tusk-teal/20 rounded-lg px-4 py-2">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 rounded-full bg-tusk-teal animate-bounce"></div>
                    <div className="w-2 h-2 rounded-full bg-tusk-teal animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    <div className="w-2 h-2 rounded-full bg-tusk-teal animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                  </div>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        <div className="p-4 border-t border-tusk-teal/20">
          <div className="flex gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Ask about your account, report fraud, or get help..."
              className="flex-1 px-4 py-2 rounded-lg bg-black/20 border border-tusk-teal/30 text-white placeholder:text-tusk-lightBlue focus:outline-none focus:ring-2 focus:ring-tusk-teal"
              disabled={isTyping}
            />
            <Button 
              onClick={handleSendMessage}
              disabled={!input.trim() || isTyping}
              className="bg-tusk-teal hover:bg-tusk-accent text-black"
            >
              <Send className="h-4 w-4" />
            </Button>
          </div>
          <div className="text-xs text-tusk-lightBlue mt-2 text-center">
            This AI assistant can help with banking, fraud detection, and account management.
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default IntelligentChatbot;
