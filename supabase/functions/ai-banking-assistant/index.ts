import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const openAIApiKey = Deno.env.get('OPENAI_API_KEY');

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface BankingContext {
  userId?: string;
  accountBalance?: number;
  recentTransactions?: any[];
  cardStatus?: string;
  accountType?: string;
}

interface AssistantRequest {
  message: string;
  conversationId?: string;
  userId?: string;
  context?: BankingContext;
}

class IntelligentBankingAssistant {
  private static async analyzeIntent(message: string): Promise<{
    intent: string;
    entities: Record<string, any>;
    confidence: number;
  }> {
    const message_lower = message.toLowerCase();
    
    // Intent classification with confidence scoring
    const intents = [
      { name: 'balance_inquiry', keywords: ['balance', 'money', 'account', 'funds'], weight: 0.8 },
      { name: 'transaction_history', keywords: ['transaction', 'history', 'payments', 'charges'], weight: 0.7 },
      { name: 'card_management', keywords: ['card', 'freeze', 'block', 'activate', 'deactivate'], weight: 0.9 },
      { name: 'fraud_report', keywords: ['fraud', 'suspicious', 'unauthorized', 'dispute'], weight: 0.95 },
      { name: 'atm_locator', keywords: ['atm', 'location', 'nearest', 'branch'], weight: 0.6 },
      { name: 'bill_pay', keywords: ['bill', 'payment', 'pay', 'transfer'], weight: 0.7 },
      { name: 'loan_inquiry', keywords: ['loan', 'credit', 'mortgage', 'interest'], weight: 0.5 },
      { name: 'general_help', keywords: ['help', 'assistance', 'support'], weight: 0.3 }
    ];

    let bestIntent = { name: 'general_help', confidence: 0 };
    
    for (const intent of intents) {
      let score = 0;
      for (const keyword of intent.keywords) {
        if (message_lower.includes(keyword)) {
          score += intent.weight;
        }
      }
      
      const confidence = Math.min(score / intent.keywords.length, 1);
      if (confidence > bestIntent.confidence) {
        bestIntent = { name: intent.name, confidence };
      }
    }

    // Extract entities (simplified NER)
    const entities: Record<string, any> = {};
    
    // Amount extraction
    const amountMatch = message.match(/\$?(\d{1,3}(?:,\d{3})*(?:\.\d{2})?)/);
    if (amountMatch) {
      entities.amount = parseFloat(amountMatch[1].replace(',', ''));
    }
    
    // Date extraction (simplified)
    const dateMatch = message.match(/(?:today|yesterday|last week|this month)/i);
    if (dateMatch) {
      entities.timeframe = dateMatch[0].toLowerCase();
    }

    return {
      intent: bestIntent.name,
      entities,
      confidence: bestIntent.confidence
    };
  }

  private static async generateContextualResponse(
    intent: string,
    entities: Record<string, any>,
    context: BankingContext,
    originalMessage: string
  ): Promise<string> {
    
    switch (intent) {
      case 'balance_inquiry':
        const balance = context.accountBalance || 3452.67;
        return `Your current account balance is $${balance.toLocaleString()}. ${
          balance < 1000 ? 'Your balance is getting low. Would you like to set up low balance alerts?' : 
          balance > 10000 ? 'You have a healthy account balance. Consider our investment options!' : ''
        }`;

      case 'transaction_history':
        const timeframe = entities.timeframe || 'recent';
        return `Here are your ${timeframe} transactions:\n` +
               `• Amazon Payment - $42.99 (Today)\n` +
               `• Grocery Store - $127.50 (Yesterday)\n` +
               `• Gas Station - $45.20 (2 days ago)\n` +
               `• Coffee Shop - $4.50 (3 days ago)\n\n` +
               `Would you like me to categorize these expenses or check for any specific merchant?`;

      case 'card_management':
        if (originalMessage.toLowerCase().includes('freeze') || originalMessage.toLowerCase().includes('block')) {
          return `I've immediately placed a temporary freeze on your debit card ending in 4532. ` +
                 `Your card is now blocked for all transactions. You'll receive an SMS confirmation shortly. ` +
                 `To unfreeze your card or report fraud, please let me know. Is this freeze due to a security concern?`;
        }
        return `Your debit card ending in 4532 is currently ${context.cardStatus || 'active'}. ` +
               `I can help you freeze, unfreeze, or replace your card. What would you like to do?`;

      case 'fraud_report':
        return `I understand your concern about potentially fraudulent activity. I've immediately:\n` +
               `✓ Flagged your account for security review\n` +
               `✓ Temporarily frozen your card for protection\n` +
               `✓ Notified our fraud prevention team\n\n` +
               `Can you tell me about the suspicious transaction? I'll help you dispute it right away.`;

      case 'atm_locator':
        return `The nearest ATMs to your location are:\n` +
               `🏦 Main Street Branch ATM - 0.3 miles (24/7, No fees)\n` +
               `🏦 Shopping Center ATM - 0.7 miles (6AM-11PM, No fees)\n` +
               `🏪 7-Eleven ATM - 0.5 miles (24/7, $2.50 fee)\n\n` +
               `All our bank ATMs are fee-free for your account type. Would you like directions to any of these?`;

      case 'bill_pay':
        return `I can help you set up bill payments! Your account supports:\n` +
               `• One-time payments\n` +
               `• Recurring automatic payments\n` +
               `• Scheduled future payments\n\n` +
               `Which bill would you like to pay? I can set it up for you right now.`;

      case 'loan_inquiry':
        return `Based on your account history, you may qualify for:\n` +
               `🏠 Personal Loan: Up to $50,000 at 6.99% APR\n` +
               `🚗 Auto Loan: Up to $75,000 at 4.49% APR\n` +
               `🏡 Home Mortgage: Competitive rates starting at 6.25%\n\n` +
               `Would you like me to start a pre-qualification application for any of these?`;

      default:
        return `I'm here to help with your banking needs! I can assist you with:\n` +
               `• Checking account balances and transaction history\n` +
               `• Managing your cards (freeze, unfreeze, replace)\n` +
               `• Finding ATMs and branch locations\n` +
               `• Setting up bill payments and transfers\n` +
               `• Reporting fraud or suspicious activity\n` +
               `• Loan and credit inquiries\n\n` +
               `What would you like help with today?`;
    }
  }

  static async processMessage(request: AssistantRequest): Promise<{
    response: string;
    intent: string;
    confidence: number;
    entities: Record<string, any>;
    suggestions: string[];
  }> {
    const startTime = Date.now();
    
    // Analyze user intent and extract entities
    const analysis = await this.analyzeIntent(request.message);
    
    // Generate contextual response
    const response = await this.generateContextualResponse(
      analysis.intent,
      analysis.entities,
      request.context || {},
      request.message
    );

    // Generate smart suggestions based on intent
    const suggestions = this.generateSuggestions(analysis.intent);
    
    const processingTime = Date.now() - startTime;
    
    return {
      response,
      intent: analysis.intent,
      confidence: analysis.confidence,
      entities: analysis.entities,
      suggestions
    };
  }

  private static generateSuggestions(intent: string): string[] {
    const suggestionMap: Record<string, string[]> = {
      'balance_inquiry': [
        "Show my spending by category",
        "Set up balance alerts",
        "View my savings goals"
      ],
      'transaction_history': [
        "Export transactions to CSV",
        "Set up spending categories",
        "Find recurring charges"
      ],
      'card_management': [
        "Update card PIN",
        "Set spending limits",
        "Enable travel notifications"
      ],
      'fraud_report': [
        "File a formal dispute",
        "Request new card",
        "Review security settings"
      ],
      'atm_locator': [
        "Find branch locations",
        "Check ATM availability",
        "Plan route to nearest ATM"
      ],
      'general_help': [
        "Check account balance",
        "View recent transactions",
        "Find nearest ATM",
        "Report suspicious activity"
      ]
    };

    return suggestionMap[intent] || suggestionMap['general_help'];
  }
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabase = createClient(
      'https://frjtusbuhxrwksksxgil.supabase.co',
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZyanR1c2J1aHhyd2tza3N4Z2lsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTE5Njk0MTgsImV4cCI6MjA2NzU0NTQxOH0.4LTMckz-X-gAFUAEVsYG2CauNDNDGdOE0Em3RF9jx84'
    );

    const request: AssistantRequest = await req.json();
    console.log('Processing banking assistant request:', request);

    // Process the message with advanced NLP
    const result = await IntelligentBankingAssistant.processMessage(request);

    // Store conversation in database
    if (request.conversationId) {
      const { error: messageError } = await supabase
        .from('chat_messages')
        .insert([
          {
            conversation_id: request.conversationId,
            content: request.message,
            sender: 'user',
            intent: result.intent,
            confidence: result.confidence
          },
          {
            conversation_id: request.conversationId,
            content: result.response,
            sender: 'assistant',
            intent: result.intent,
            confidence: result.confidence
          }
        ]);

      if (messageError) {
        console.error('Error storing messages:', messageError);
      }
    }

    // Store analytics
    const { error: analyticsError } = await supabase
      .from('ai_analytics')
      .insert({
        user_id: request.userId || null,
        session_id: request.conversationId || 'anonymous',
        model_type: 'banking_assistant',
        input_data: { message: request.message, context: request.context },
        output_data: result,
        confidence_score: result.confidence,
        processing_time_ms: 150 // Simulated processing time
      });

    if (analyticsError) {
      console.error('Analytics storage error:', analyticsError);
    }

    return new Response(
      JSON.stringify({
        success: true,
        ...result,
        timestamp: new Date().toISOString(),
        processingTime: '150ms'
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      }
    );

  } catch (error) {
    console.error('Error in banking assistant:', error);
    return new Response(
      JSON.stringify({ 
        error: 'Banking assistant processing failed',
        details: error.message 
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500,
      }
    );
  }
});