
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Check, ArrowRight } from 'lucide-react';

const GettingStarted = () => {
  return (
    <section className="mb-16">
      <h2 className="text-2xl font-bold text-white mb-6">Getting Started</h2>
      
      <div className="tech-border bg-tusk-darkNavy/80 backdrop-blur-xl p-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          <div className="md:col-span-5">
            <h3 className="text-xl font-bold text-white mb-4">Quick Start Guide</h3>
            <p className="text-tusk-lightBlue mb-6">
              Follow these steps to integrate TUSK AI's fraud detection and banking assistant into your systems.
            </p>
            
            <div className="space-y-6">
              {[
                "Create an account in our client portal",
                "Generate API keys for your environment",
                "Install the SDK for your platform",
                "Configure fraud detection rules",
                "Test with sandbox transactions"
              ].map((step, index) => (
                <div key={index} className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded-full bg-tusk-teal/20 flex items-center justify-center flex-shrink-0 border border-tusk-teal/30">
                    <span className="text-tusk-teal font-medium">{index + 1}</span>
                  </div>
                  <div>
                    <div className="text-white font-medium mb-1">{step}</div>
                    <p className="text-tusk-lightBlue/80 text-sm">
                      {index === 0 && "Register your organization and create admin users."}
                      {index === 1 && "Create separate keys for development and production."}
                      {index === 2 && "Use our libraries for Java, Python, Node.js, or .NET."}
                      {index === 3 && "Set custom thresholds and risk parameters."}
                      {index === 4 && "Validate integration before going live."}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="md:col-span-7">
            <Tabs defaultValue="authentication">
              <TabsList className="bg-black/30 p-1 mb-4">
                <TabsTrigger value="authentication">Authentication</TabsTrigger>
                <TabsTrigger value="configuration">Configuration</TabsTrigger>
                <TabsTrigger value="testing">Testing</TabsTrigger>
              </TabsList>
              
              <div className="rounded-md border border-white/10 overflow-hidden">
                <TabsContent value="authentication" className="m-0">
                  <div className="bg-black/50 p-4 border-b border-white/10 text-tusk-lightBlue">
                    <span className="text-white font-mono">// Authentication Example</span>
                  </div>
                  <pre className="p-4 overflow-x-auto text-tusk-lightBlue bg-black/30 font-mono text-sm">
                    {`// Initialize the TUSK AI client with your API key
const tuskAI = new TuskAI({
  apiKey: 'your_api_key',
  environment: 'production', // or 'sandbox'
  region: 'us-west'
});

// Verify connection
try {
  const status = await tuskAI.verifyConnection();
  console.log('Connected successfully:', status);
} catch (error) {
  console.error('Connection failed:', error.message);
}`}
                  </pre>
                </TabsContent>
                
                <TabsContent value="configuration" className="m-0">
                  <div className="bg-black/50 p-4 border-b border-white/10 text-tusk-lightBlue">
                    <span className="text-white font-mono">// Configuration Example</span>
                  </div>
                  <pre className="p-4 overflow-x-auto text-tusk-lightBlue bg-black/30 font-mono text-sm">
                    {`// Configure fraud detection settings
await tuskAI.configure({
  riskThreshold: 0.75,
  alertChannels: ['api', 'email', 'sms'],
  autoBlockThreshold: 0.9,
  customRules: [
    {
      name: 'high_value_international',
      condition: 'amount > 5000 && location != "US"',
      riskScore: 0.8
    }
  ]
});

// Configure banking assistant parameters
await tuskAI.configureBankingAssistant({
  language: ['en', 'es'],
  authentication: 'oauth',
  customerDataAccess: ['transactions', 'profile'],
  customInstructions: {
    greeting: "Welcome to {{bank_name}}! How can I help you today?"
  }
});`}
                  </pre>
                </TabsContent>
                
                <TabsContent value="testing" className="m-0">
                  <div className="bg-black/50 p-4 border-b border-white/10 text-tusk-lightBlue">
                    <span className="text-white font-mono">// Testing Example</span>
                  </div>
                  <pre className="p-4 overflow-x-auto text-tusk-lightBlue bg-black/30 font-mono text-sm">
                    {`// Send a test transaction
const testResult = await tuskAI.analyzeSandboxTransaction({
  amount: 1299.99,
  merchantName: 'Tech Store',
  cardPresent: false,
  location: 'FR',
  customerIP: '203.0.113.195',
  previousTransactions: 15,
  accountAgeInDays: 63
});

console.log('Risk score:', testResult.riskScore);
console.log('Alert triggered:', testResult.alertTriggered);
console.log('Rules matched:', testResult.matchedRules);

// Test banking assistant
const assistantResponse = await tuskAI.testBankingAssistant({
  customerId: 'test_user_123',
  userMessage: 'What's my current balance?'
});

console.log('Assistant response:', assistantResponse.message);
console.log('Intent detected:', assistantResponse.intent);`}
                  </pre>
                </TabsContent>
              </div>
            </Tabs>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GettingStarted;
