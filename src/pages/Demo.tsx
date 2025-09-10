
import React from 'react';
import Layout from '@/components/layout/Layout';
import DemoHero from '@/components/demo/DemoHero';
import DemoRequestForm from '@/components/demo/DemoRequestForm';
import FraudDetectionAlgorithm from '@/components/ai/FraudDetectionAlgorithm';
import IntelligentChatbot from '@/components/ai/IntelligentChatbot';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const Demo = () => {
  return (
    <Layout>
      <DemoHero />
      
      <div className="container mx-auto px-4 py-12">
        <Tabs defaultValue="request-demo" className="w-full">
          <TabsList className="grid w-full md:w-[800px] mx-auto grid-cols-3 mb-8">
            <TabsTrigger value="request-demo">Request Demo</TabsTrigger>
            <TabsTrigger value="fraud-detection">AI Fraud Detection</TabsTrigger>
            <TabsTrigger value="banking-assistant">Banking Assistant</TabsTrigger>
          </TabsList>
          
          <TabsContent value="request-demo" className="mt-0">
            <div className="max-w-2xl mx-auto">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-white mb-4">
                  Get Your Personalized Demo
                </h2>
                <p className="text-lg text-tusk-lightBlue">
                  See how TUSK AI can transform your banking operations. Schedule a demo 
                  tailored to your specific needs and use cases.
                </p>
              </div>
              <DemoRequestForm />
            </div>
          </TabsContent>
          
          <TabsContent value="fraud-detection" className="mt-0">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-white mb-4">
                  AI Fraud Detection Algorithm
                </h2>
                <p className="text-lg text-tusk-lightBlue">
                  Watch our machine learning algorithms analyze transactions in real-time, 
                  detecting fraud patterns and protecting customer accounts.
                </p>
              </div>
              <FraudDetectionAlgorithm />
            </div>
          </TabsContent>
          
          <TabsContent value="banking-assistant" className="mt-0">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-white mb-4">
                  Intelligent Banking Assistant
                </h2>
                <p className="text-lg text-tusk-lightBlue">
                  Experience our AI-powered banking assistant that handles customer inquiries, 
                  fraud reports, and account management with natural language processing.
                </p>
              </div>
              <IntelligentChatbot />
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default Demo;
