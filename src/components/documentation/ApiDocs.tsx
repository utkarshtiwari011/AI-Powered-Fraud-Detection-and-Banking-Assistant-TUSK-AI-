
import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

interface Endpoint {
  method: 'GET' | 'POST' | 'PUT' | 'DELETE';
  path: string;
  description: string;
  requestParams?: string;
  responseExample?: string;
}

const apiEndpoints: Record<string, Endpoint[]> = {
  'Fraud Detection': [
    {
      method: 'POST',
      path: '/v1/transactions/analyze',
      description: 'Analyze a transaction for potential fraud',
      requestParams: `{
  "transactionId": "t-12345",
  "amount": 299.99,
  "merchantName": "Online Electronics Store",
  "cardPresent": false,
  "location": "US",
  "customerIp": "192.168.1.1",
  "deviceId": "d-abcdef",
  "timestamp": "2023-05-15T14:22:30Z"
}`,
      responseExample: `{
  "transactionId": "t-12345",
  "riskScore": 0.35,
  "recommendation": "approve",
  "flags": ["new_device", "high_value"],
  "analysisTime": "25ms"
}`
    },
    {
      method: 'GET',
      path: '/v1/transactions/{transactionId}',
      description: 'Get analysis details for a specific transaction',
      requestParams: `// Path Parameter:
transactionId: string`,
      responseExample: `{
  "transactionId": "t-12345",
  "analysisResults": {
    "riskScore": 0.35,
    "recommendation": "approve",
    "flags": ["new_device", "high_value"],
    "rulesTriggered": ["amount_threshold", "new_device_check"]
  },
  "originalTransaction": {
    "amount": 299.99,
    "merchantName": "Online Electronics Store",
    "timestamp": "2023-05-15T14:22:30Z"
  }
}`
    }
  ],
  'Banking Assistant': [
    {
      method: 'POST',
      path: '/v1/assistant/message',
      description: 'Send a message to the banking assistant',
      requestParams: `{
  "customerId": "c-67890",
  "message": "What's my current account balance?",
  "sessionId": "session-12345",
  "context": {
    "previousInteractions": 3,
    "authenticated": true
  }
}`,
      responseExample: `{
  "responseId": "r-abcdef",
  "message": "Your current checking account balance is $1,250.75.",
  "intent": "account_balance",
  "confidence": 0.98,
  "actions": [
    {
      "type": "provide_balance",
      "accountType": "checking"
    }
  ]
}`
    },
    {
      method: 'PUT',
      path: '/v1/assistant/feedback',
      description: 'Provide feedback on assistant responses',
      requestParams: `{
  "responseId": "r-abcdef",
  "rating": 5,
  "feedback": "Perfect and accurate response",
  "correct": true
}`,
      responseExample: `{
  "status": "success",
  "message": "Feedback recorded successfully",
  "improvementPromise": "This feedback will help improve our assistant"
}`
    }
  ],
  'User Management': [
    {
      method: 'POST',
      path: '/v1/users',
      description: 'Create a new user',
      requestParams: `{
  "email": "user@example.com",
  "firstName": "John",
  "lastName": "Doe",
  "role": "admin",
  "permissions": ["read:transactions", "write:rules"]
}`,
      responseExample: `{
  "userId": "u-12345",
  "email": "user@example.com",
  "firstName": "John",
  "lastName": "Doe",
  "role": "admin",
  "apiKey": "sk_live_abc123def456...",
  "createdAt": "2023-05-15T14:22:30Z"
}`
    },
    {
      method: 'DELETE',
      path: '/v1/users/{userId}',
      description: 'Delete an existing user',
      requestParams: `// Path Parameter:
userId: string`,
      responseExample: `{
  "status": "success",
  "message": "User deleted successfully",
  "deletedAt": "2023-05-15T14:22:30Z"
}`
    }
  ]
};

const ApiDocs = () => {
  const [expandedSection, setExpandedSection] = useState('Fraud Detection');
  
  return (
    <section className="mb-16">
      <h2 className="text-2xl font-bold text-white mb-6">API Reference</h2>
      
      <div className="space-y-4">
        {Object.keys(apiEndpoints).map((section) => (
          <div 
            key={section}
            className="tech-border bg-tusk-darkNavy/80 backdrop-blur-xl overflow-hidden"
          >
            <button
              className="w-full p-6 flex items-center justify-between text-white text-left"
              onClick={() => setExpandedSection(expandedSection === section ? '' : section)}
            >
              <span className="text-xl font-bold">{section} API</span>
              <ChevronDown 
                className={`h-5 w-5 text-tusk-lightBlue transition-transform ${
                  expandedSection === section ? 'transform rotate-180' : ''
                }`} 
              />
            </button>
            
            {expandedSection === section && (
              <div className="border-t border-white/10">
                {apiEndpoints[section].map((endpoint, index) => (
                  <div 
                    key={index}
                    className={`p-6 ${
                      index !== apiEndpoints[section].length - 1 ? 'border-b border-white/10' : ''
                    }`}
                  >
                    <div className="flex items-center gap-3 mb-3">
                      <span className={`text-xs font-bold py-1 px-3 rounded-full ${
                        endpoint.method === 'GET' ? 'bg-blue-500/20 text-blue-400' :
                        endpoint.method === 'POST' ? 'bg-green-500/20 text-green-400' :
                        endpoint.method === 'PUT' ? 'bg-yellow-500/20 text-yellow-400' :
                        'bg-red-500/20 text-red-400'
                      }`}>
                        {endpoint.method}
                      </span>
                      <code className="text-white font-mono">{endpoint.path}</code>
                    </div>
                    
                    <p className="text-tusk-lightBlue mb-4">{endpoint.description}</p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {endpoint.requestParams && (
                        <div>
                          <div className="text-sm font-medium text-white mb-1">Request</div>
                          <pre className="p-3 bg-black/40 rounded-md overflow-x-auto text-tusk-lightBlue font-mono text-xs">
                            {endpoint.requestParams}
                          </pre>
                        </div>
                      )}
                      
                      {endpoint.responseExample && (
                        <div>
                          <div className="text-sm font-medium text-white mb-1">Response</div>
                          <pre className="p-3 bg-black/40 rounded-md overflow-x-auto text-tusk-lightBlue font-mono text-xs">
                            {endpoint.responseExample}
                          </pre>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
};

export default ApiDocs;
