
import React from 'react';
import { Shield, AlertTriangle, Lock, Cpu } from 'lucide-react';

const ProductHero = () => {
  return (
    <section className="gradient-bg text-white py-24 relative overflow-hidden">
      {/* Background tech pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 w-20 h-20 border border-white/20 rounded-full"></div>
        <div className="absolute top-40 right-20 w-32 h-32 border border-white/20 rounded-full"></div>
        <div className="absolute bottom-10 left-1/4 w-40 h-40 border border-white/20 rounded-full"></div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center max-w-4xl mx-auto">
          <div className="inline-flex items-center px-3 py-1 mb-6 rounded-full border border-tusk-teal/40 bg-tusk-teal/10">
            <span className="mr-2 h-2 w-2 rounded-full bg-tusk-teal animate-pulse-glow"></span>
            <span className="text-sm font-medium text-tusk-teal">Secure. Intelligent. Fast.</span>
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
            AI-Powered <span className="text-gradient">Banking Security</span> Solutions
          </h1>
          <p className="text-xl text-tusk-lightBlue/90 mb-12">
            Our comprehensive suite of AI products is designed to protect financial institutions
            and their customers from sophisticated fraud while enhancing the banking experience.
          </p>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { icon: Shield, label: "Fraud Detection" },
              { icon: AlertTriangle, label: "Risk Assessment" },
              { icon: Lock, label: "Account Security" },
              { icon: Cpu, label: "AI Assistant" }
            ].map((item, index) => (
              <div key={index} className="tech-border bg-black/30 backdrop-blur-sm p-4 text-center">
                <div className="w-10 h-10 mx-auto rounded-full bg-tusk-darkBlue flex items-center justify-center mb-2 border border-tusk-teal/30">
                  <item.icon className="h-5 w-5 text-tusk-teal" />
                </div>
                <span className="text-sm text-tusk-lightBlue">{item.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductHero;
