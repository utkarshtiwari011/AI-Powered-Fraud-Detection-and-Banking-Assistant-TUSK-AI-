
import React from 'react';
import { Shield, Activity, Users, Globe } from 'lucide-react';

const MissionSection = () => {
  return (
    <section className="py-20 gradient-bg relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 w-32 h-32 border border-white/20 rounded-full"></div>
        <div className="absolute bottom-20 right-20 w-40 h-40 border border-white/20 rounded-full"></div>
      </div>
      
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center mb-16">
          <div className="inline-flex items-center px-3 py-1 mb-6 rounded-full border border-tusk-teal/40 bg-tusk-teal/10">
            <span className="text-sm font-medium text-tusk-teal">Our Mission</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Securing The Future of <span className="text-gradient">Digital Banking</span>
          </h1>
          <p className="text-tusk-lightBlue text-lg md:text-xl">
            At TUSK AI, we're committed to building the most reliable, intelligent and secure AI system for financial institutions. Our mission is to eliminate fraud while enhancing the banking experience for customers worldwide.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-16">
          {[
            {
              icon: Shield,
              title: "Security First",
              description: "We build every product with security as the foundation, not an afterthought."
            },
            {
              icon: Activity,
              title: "Real-Time Protection",
              description: "Our systems operate in microseconds to identify and prevent fraud before it happens."
            },
            {
              icon: Users,
              title: "Human-Centered",
              description: "We balance powerful AI with intuitive interfaces that real people can understand."
            },
            {
              icon: Globe,
              title: "Global Impact",
              description: "Our solutions protect millions of transactions daily across six continents."
            }
          ].map((item, index) => (
            <div key={index} className="tech-border bg-black/30 backdrop-blur-xl p-6 text-center">
              <div className="relative">
                <div className="absolute -inset-1 bg-gradient-to-r from-tusk-teal to-tusk-accent opacity-30 rounded-full blur"></div>
                <div className="w-12 h-12 mx-auto rounded-full bg-tusk-darkBlue flex items-center justify-center mb-4 relative border border-tusk-teal/30">
                  <item.icon className="h-6 w-6 text-tusk-teal" />
                </div>
              </div>
              <h3 className="text-xl font-semibold mb-2 text-white">{item.title}</h3>
              <p className="text-tusk-lightBlue">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MissionSection;
