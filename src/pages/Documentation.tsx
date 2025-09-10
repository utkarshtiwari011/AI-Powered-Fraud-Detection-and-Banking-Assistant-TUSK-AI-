
import React from 'react';
import Layout from '@/components/layout/Layout';
import ApiDocs from '@/components/documentation/ApiDocs';
import CodeSnippets from '@/components/documentation/CodeSnippets';
import GettingStarted from '@/components/documentation/GettingStarted';

const Documentation = () => {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-12">
        <div className="tech-border bg-tusk-darkNavy/80 backdrop-blur-xl p-8 mb-12">
          <h1 className="text-3xl font-bold mb-4 text-white">API Documentation</h1>
          <p className="text-tusk-lightBlue">
            Integrate our powerful AI fraud detection and banking assistant into your systems
          </p>
        </div>
        <GettingStarted />
        <ApiDocs />
        <CodeSnippets />
      </div>
    </Layout>
  );
};

export default Documentation;
