
import React from 'react';
import { Button } from '@/components/ui/button';
import { Check, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const benefits = [
  "Reduce fraud-related losses by up to 60%",
  "Improve customer satisfaction with 24/7 support",
  "Decrease operational costs with AI automation",
  "Ensure compliance with banking regulations",
];

const CTASection = () => {
  return (
    <section className="py-20 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-1/4 w-32 h-32 border border-tusk-teal/30 rounded-full"></div>
        <div className="absolute bottom-20 right-1/4 w-40 h-40 border border-tusk-teal/30 rounded-full"></div>
      </div>
      
      <div className="container mx-auto px-4">
        <div className="bg-gradient-to-br from-tusk-darkNavy via-tusk-navy to-tusk-blue rounded-2xl p-8 md:p-12 shadow-xl border border-tusk-teal/20 backdrop-blur-sm relative overflow-hidden">
          {/* Accent lines */}
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-tusk-teal/40 to-transparent"></div>
          <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-tusk-teal/40 to-transparent"></div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div className="text-white">
              <div className="inline-flex items-center px-3 py-1 mb-6 rounded-full border border-tusk-accent/40 bg-tusk-accent/10">
                <span className="text-sm font-medium text-tusk-accent">Ready to transform your business?</span>
              </div>
              <h2 className="text-3xl font-bold mb-6">
                Advanced Banking Security <span className="text-gradient">Solutions</span>
              </h2>
              <p className="text-tusk-lightBlue mb-8">
                Join leading financial institutions already benefiting from our AI-powered platform. Request a demo today and see how TUSK AI can protect your customers and improve your services.
              </p>
              <ul className="space-y-3 mb-8">
                {benefits.map((benefit, index) => (
                  <li key={index} className="flex items-center gap-3">
                    <span className="bg-tusk-teal/20 p-1 rounded-full">
                      <Check className="h-4 w-4 text-tusk-teal" />
                    </span>
                    <span>{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="tech-border bg-black/30 backdrop-blur-xl p-6 md:p-8">
              <h3 className="text-2xl font-semibold text-white mb-6 flex items-center">
                Request a Demo
                <div className="ml-2 h-2 w-2 rounded-full bg-tusk-teal animate-pulse-glow"></div>
              </h3>
              <Button asChild className="w-full bg-tusk-teal hover:bg-tusk-accent text-black font-medium transition-all duration-300 flex items-center justify-center gap-2 py-6">
                <Link to="/demo">
                  Schedule Demo <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
              <p className="mt-4 text-xs text-tusk-lightBlue/60 text-center">
                Click above to request a personalized demo
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
