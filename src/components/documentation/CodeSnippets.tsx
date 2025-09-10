
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Copy, Check } from 'lucide-react';

const CodeSnippets = () => {
  const [copiedLang, setCopiedLang] = React.useState<string | null>(null);
  
  const handleCopy = (code: string, language: string) => {
    navigator.clipboard.writeText(code);
    setCopiedLang(language);
    setTimeout(() => setCopiedLang(null), 2000);
  };
  
  const codeSnippets = {
    javascript: `// Initialize the TUSK AI client
const TuskAI = require('tusk-ai');

const client = new TuskAI({
  apiKey: 'your_api_key',
  environment: 'production'
});

// Analyze a transaction
async function analyzeTransaction(transaction) {
  try {
    const result = await client.analyzeTransaction({
      transactionId: transaction.id,
      amount: transaction.amount,
      merchantName: transaction.merchant,
      cardPresent: transaction.isInPerson,
      location: transaction.countryCode,
      customerIp: transaction.ipAddress
    });
    
    if (result.riskScore > 0.8) {
      // High risk transaction detected
      await blockTransaction(transaction.id);
      await notifyCustomer(transaction.customerId);
    }
    
    return result;
  } catch (error) {
    console.error('Error analyzing transaction:', error);
    // Handle error appropriately
  }
}

// Initialize Banking Assistant
const assistant = client.createBankingAssistant({
  customerId: 'customer-123',
  language: 'en',
  permissions: ['balance', 'transactions', 'support']
});

// Handle customer message
async function handleCustomerMessage(message) {
  const response = await assistant.processMessage(message);
  return response.message;
}`,
    python: `# Initialize the TUSK AI client
from tusk_ai import TuskAI

client = TuskAI(
    api_key='your_api_key',
    environment='production'
)

# Analyze a transaction
def analyze_transaction(transaction):
    try:
        result = client.analyze_transaction(
            transaction_id=transaction['id'],
            amount=transaction['amount'],
            merchant_name=transaction['merchant'],
            card_present=transaction['is_in_person'],
            location=transaction['country_code'],
            customer_ip=transaction['ip_address']
        )
        
        if result.risk_score > 0.8:
            # High risk transaction detected
            block_transaction(transaction['id'])
            notify_customer(transaction['customer_id'])
        
        return result
    except Exception as e:
        print(f"Error analyzing transaction: {e}")
        # Handle error appropriately

# Initialize Banking Assistant
assistant = client.create_banking_assistant(
    customer_id='customer-123',
    language='en',
    permissions=['balance', 'transactions', 'support']
)

# Handle customer message
def handle_customer_message(message):
    response = assistant.process_message(message)
    return response.message`,
    java: `// Initialize the TUSK AI client
import ai.tusk.TuskAI;
import ai.tusk.models.TransactionAnalysis;
import ai.tusk.models.AssistantResponse;

public class FraudDetectionService {
    private TuskAI client;
    
    public FraudDetectionService() {
        client = new TuskAI.Builder()
            .apiKey("your_api_key")
            .environment("production")
            .build();
    }
    
    // Analyze a transaction
    public TransactionAnalysis analyzeTransaction(Transaction transaction) {
        try {
            TransactionAnalysis result = client.analyzeTransaction(
                transaction.getId(),
                transaction.getAmount(),
                transaction.getMerchant(),
                transaction.isInPerson(),
                transaction.getCountryCode(),
                transaction.getIpAddress()
            );
            
            if (result.getRiskScore() > 0.8) {
                // High risk transaction detected
                blockTransaction(transaction.getId());
                notifyCustomer(transaction.getCustomerId());
            }
            
            return result;
        } catch (Exception e) {
            System.err.println("Error analyzing transaction: " + e.getMessage());
            // Handle error appropriately
            return null;
        }
    }
    
    // Initialize Banking Assistant
    public String handleCustomerMessage(String customerId, String message) {
        BankingAssistant assistant = client.createBankingAssistant(
            customerId,
            "en",
            new String[]{"balance", "transactions", "support"}
        );
        
        AssistantResponse response = assistant.processMessage(message);
        return response.getMessage();
    }
}`,
    csharp: `// Initialize the TUSK AI client
using TuskAI;
using TuskAI.Models;

public class FraudDetectionService
{
    private readonly TuskAIClient _client;
    
    public FraudDetectionService(string apiKey)
    {
        _client = new TuskAIClient(apiKey, environment: "production");
    }
    
    // Analyze a transaction
    public async Task<TransactionAnalysis> AnalyzeTransactionAsync(Transaction transaction)
    {
        try
        {
            var result = await _client.AnalyzeTransactionAsync(new AnalyzeTransactionRequest
            {
                TransactionId = transaction.Id,
                Amount = transaction.Amount,
                MerchantName = transaction.Merchant,
                CardPresent = transaction.IsInPerson,
                Location = transaction.CountryCode,
                CustomerIp = transaction.IpAddress
            });
            
            if (result.RiskScore > 0.8)
            {
                // High risk transaction detected
                await BlockTransactionAsync(transaction.Id);
                await NotifyCustomerAsync(transaction.CustomerId);
            }
            
            return result;
        }
        catch (Exception ex)
        {
            Console.Error.WriteLine($"Error analyzing transaction: {ex.Message}");
            // Handle error appropriately
            return null;
        }
    }
    
    // Initialize Banking Assistant
    public async Task<string> HandleCustomerMessageAsync(string customerId, string message)
    {
        var assistant = _client.CreateBankingAssistant(new BankingAssistantOptions
        {
            CustomerId = customerId,
            Language = "en",
            Permissions = new[] { "balance", "transactions", "support" }
        });
        
        var response = await assistant.ProcessMessageAsync(message);
        return response.Message;
    }
}`
  };

  return (
    <section className="mb-16">
      <h2 className="text-2xl font-bold text-white mb-6">Code Examples</h2>
      
      <div className="tech-border bg-tusk-darkNavy/80 backdrop-blur-xl p-8">
        <h3 className="text-xl font-bold text-white mb-4">Integration Samples</h3>
        <p className="text-tusk-lightBlue mb-6">
          Example code for integrating TUSK AI's fraud detection and banking assistant into your application.
        </p>
        
        <Tabs defaultValue="javascript">
          <TabsList className="bg-black/30 p-1 mb-4">
            <TabsTrigger value="javascript">JavaScript</TabsTrigger>
            <TabsTrigger value="python">Python</TabsTrigger>
            <TabsTrigger value="java">Java</TabsTrigger>
            <TabsTrigger value="csharp">C#</TabsTrigger>
          </TabsList>
          
          {Object.entries(codeSnippets).map(([language, code]) => (
            <TabsContent key={language} value={language} className="m-0">
              <div className="relative">
                <div className="rounded-md border border-white/10 overflow-hidden">
                  <div className="bg-black/50 p-4 border-b border-white/10 flex justify-between items-center">
                    <span className="text-white font-mono">
                      {language === 'javascript' ? 'JavaScript' : 
                       language === 'python' ? 'Python' : 
                       language === 'java' ? 'Java' : 'C#'}
                    </span>
                    <button 
                      onClick={() => handleCopy(code, language)}
                      className="text-tusk-lightBlue hover:text-tusk-teal transition-colors"
                    >
                      {copiedLang === language ? (
                        <span className="flex items-center">
                          <Check className="h-4 w-4 mr-1" />
                          Copied!
                        </span>
                      ) : (
                        <span className="flex items-center">
                          <Copy className="h-4 w-4 mr-1" /> 
                          Copy code
                        </span>
                      )}
                    </button>
                  </div>
                  <pre className="p-4 overflow-x-auto text-tusk-lightBlue bg-black/30 font-mono text-sm">
                    {code}
                  </pre>
                </div>
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </section>
  );
};

export default CodeSnippets;
