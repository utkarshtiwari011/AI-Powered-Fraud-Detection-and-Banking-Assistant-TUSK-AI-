
import React, { useState } from 'react';
import Layout from '@/components/layout/Layout';
import { Switch } from '@/components/ui/switch';
import PricingTable from '@/components/pricing/PricingTable';
import PricingFAQ from '@/components/pricing/PricingFAQ';

const Pricing = () => {
  const [isYearly, setIsYearly] = useState(false);

  return (
    <Layout>
      <div className="container mx-auto px-4 py-20">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4 text-white">Transparent Pricing for Financial Institutions</h1>
          <p className="text-tusk-lightBlue text-xl max-w-2xl mx-auto">
            Scale your fraud protection and customer service with our flexible plans
          </p>
          
          <div className="flex items-center justify-center mt-8 gap-4">
            <span className={`text-sm ${!isYearly ? 'text-white' : 'text-tusk-lightBlue'}`}>Monthly</span>
            <Switch 
              checked={isYearly}
              onCheckedChange={setIsYearly}
              className="data-[state=checked]:bg-tusk-teal"
            />
            <div className="flex items-center">
              <span className={`text-sm ${isYearly ? 'text-white' : 'text-tusk-lightBlue'}`}>Yearly</span>
              <span className="ml-2 bg-tusk-teal/20 text-tusk-accent text-xs py-1 px-2 rounded-full">20% off</span>
            </div>
          </div>
        </div>
        
        <PricingTable isYearly={isYearly} />
        <PricingFAQ />
      </div>
    </Layout>
  );
};

export default Pricing;
