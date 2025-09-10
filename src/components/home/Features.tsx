
import React from 'react';
import { Shield, MessageSquare, Clock, Circle, User, Lock } from 'lucide-react';

const features = [
  {
    icon: Shield,
    title: "Fraud Detection System",
    description: "Real-time transaction monitoring and anomaly detection powered by advanced machine learning models.",
  },
  {
    icon: MessageSquare,
    title: "AI Banking Assistant",
    description: "Conversational AI chatbot handling customer queries, fraud reports, and daily banking operations.",
  },
  {
    icon: Clock,
    title: "Real-Time Alerts",
    description: "Instant notifications for suspicious activities with options to block cards or report fraud.",
  },
  {
    icon: Circle,
    title: "Self-Learning Models",
    description: "Continuous improvement through feedback loops, reducing false positives over time.",
  },
  {
    icon: User,
    title: "Admin Dashboard",
    description: "Comprehensive case management portal for fraud analysis and system monitoring.",
  },
  {
    icon: Lock,
    title: "Enterprise Security",
    description: "Bank-grade encryption, compliance with GDPR, PCI DSS, and regional banking regulations.",
  },
];

const Features = () => {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-tusk-navy mb-4">
            Comprehensive Banking Protection
          </h2>
          <p className="text-tusk-blue text-lg max-w-2xl mx-auto">
            Our platform combines cutting-edge AI with banking expertise to deliver a complete fraud prevention and customer service solution.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className="bg-tusk-grey p-6 rounded-xl hover:shadow-lg transition-shadow floating-card"
            >
              <div className="bg-tusk-teal/10 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                <feature.icon className="h-6 w-6 text-tusk-teal" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-tusk-navy">
                {feature.title}
              </h3>
              <p className="text-tusk-blue">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
