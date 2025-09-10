
import React from 'react';
import { Button } from '@/components/ui/button';
import { Check } from 'lucide-react';
import { Link } from 'react-router-dom';

interface PricingTableProps {
  isYearly: boolean;
}

const plans = [
  {
    name: 'Starter',
    description: 'For small financial institutions and startups',
    monthlyPrice: 999,
    yearlyPrice: 9990,
    features: [
      'AI Fraud Detection (basic)',
      'Banking Assistant (5,000 messages/mo)',
      'Email & Phone Alerts',
      'Standard Support (8/5)',
      'API Access (limited)',
      'Single Admin Dashboard',
      '1 Custom Integration'
    ],
    isPopular: false,
    ctaLink: '/contact'
  },
  {
    name: 'Professional',
    description: 'For mid-size banks and credit unions',
    monthlyPrice: 2499,
    yearlyPrice: 24990,
    features: [
      'Advanced Fraud Detection',
      'Banking Assistant (25,000 messages/mo)',
      'Multi-channel Alerts',
      'Priority Support (24/7)',
      'Full API Access',
      '5 Admin Dashboards',
      'Custom Rule Configuration',
      '3 Custom Integrations'
    ],
    isPopular: true,
    ctaLink: '/contact'
  },
  {
    name: 'Enterprise',
    description: 'For large financial institutions',
    monthlyPrice: 4999,
    yearlyPrice: 49990,
    features: [
      'Enterprise Fraud Detection',
      'Unlimited Banking Assistant Usage',
      'Custom Alert Workflows',
      'Dedicated Support Manager',
      'White-labeled Solutions',
      'Unlimited Dashboards',
      'Custom ML Model Training',
      'Custom Reporting',
      'Custom SLAs'
    ],
    isPopular: false,
    ctaLink: '/contact'
  }
];

const PricingTable = ({ isYearly }: PricingTableProps) => {
  return (
    <div className="grid md:grid-cols-3 gap-8">
      {plans.map((plan, index) => (
        <div 
          key={index} 
          className={`tech-border backdrop-blur-xl relative ${
            plan.isPopular 
              ? 'bg-gradient-to-b from-tusk-teal/10 to-tusk-navy border-tusk-teal/30' 
              : 'bg-tusk-darkNavy/80 border-white/10'
          }`}
        >
          {plan.isPopular && (
            <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-tusk-teal text-black text-sm font-medium rounded-full px-4 py-1">
              Most Popular
            </div>
          )}
          
          <div className="p-8">
            <h3 className="text-2xl font-bold text-white mb-2">{plan.name}</h3>
            <p className="text-tusk-lightBlue mb-6">{plan.description}</p>
            
            <div className="mb-6">
              <div className="text-4xl font-bold text-white">
                ${isYearly ? (plan.yearlyPrice / 12).toFixed(0) : plan.monthlyPrice.toFixed(0)}
                <span className="text-xl font-normal text-tusk-lightBlue">/mo</span>
              </div>
              
              {isYearly && (
                <div className="text-sm text-tusk-teal mt-1">
                  ${plan.yearlyPrice.toLocaleString()} billed annually (save 20%)
                </div>
              )}
            </div>
            
            <Button 
              asChild
              className={`w-full mb-8 ${
                plan.isPopular 
                  ? 'bg-tusk-teal hover:bg-tusk-accent text-black' 
                  : 'bg-white/10 hover:bg-white/20 text-white'
              }`}
            >
              <Link to={plan.ctaLink}>
                {plan.isPopular ? 'Get Started' : 'Contact Us'}
              </Link>
            </Button>
            
            <div className="space-y-4">
              <div className="text-white font-medium">Includes:</div>
              <ul className="space-y-3">
                {plan.features.map((feature, fidx) => (
                  <li key={fidx} className="flex items-start gap-3">
                    <div className={`mt-1 p-1 rounded-full ${
                      plan.isPopular ? 'bg-tusk-teal/20' : 'bg-white/10'
                    }`}>
                      <Check className={`h-3 w-3 ${
                        plan.isPopular ? 'text-tusk-teal' : 'text-white'
                      }`} />
                    </div>
                    <span className="text-tusk-lightBlue">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PricingTable;
