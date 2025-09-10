
import React from 'react';
import Layout from '@/components/layout/Layout';
import Hero from '@/components/home/Hero';
import Features from '@/components/home/Features';
import StatsSection from '@/components/home/StatsSection';
import CTASection from '@/components/home/CTASection';
import LiveDemo from '@/components/home/LiveDemo';
import UseCases from '@/components/home/UseCases';
import TechStack from '@/components/home/TechStack';
import IntegrationsSection from '@/components/home/IntegrationsSection';

const Index = () => {
  return (
    <Layout>
      <Hero />
      <StatsSection />
      <Features />
      <LiveDemo />
      <UseCases />
      <TechStack />
      <IntegrationsSection />
      <CTASection />
    </Layout>
  );
};

export default Index;
