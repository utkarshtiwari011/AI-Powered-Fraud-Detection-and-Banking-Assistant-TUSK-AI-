
import React from 'react';
import { MessageSquare, CircleCheck, Clock, User, Search, Lock } from 'lucide-react';

const features = [
  {
    icon: MessageSquare,
    title: "Natural Language Processing",
    description: "Understand and respond to a wide range of banking queries in conversational language."
  },
  {
    icon: CircleCheck,
    title: "Fraud Support Flow",
    description: "Report suspicious activity, freeze accounts or cards, and request support all through the chatbot."
  },
  {
    icon: Clock,
    title: "24/7 Availability",
    description: "Access banking support anytime, anywhere without waiting for human agents."
  },
  {
    icon: User,
    title: "Personalized Experience",
    description: "Receive tailored assistance based on your account history and preferences."
  },
  {
    icon: Search,
    title: "Quick Information Access",
    description: "Instantly retrieve account details, transaction history, and banking information."
  },
  {
    icon: Lock,
    title: "Secure Conversations",
    description: "End-to-end encryption ensures all communications remain private and protected."
  }
];

const AssistantFeatures = () => {
  return (
    <div className="py-12">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-tusk-navy mb-4">
            AI-Powered Banking Assistant
          </h2>
          <p className="text-tusk-blue text-lg max-w-2xl mx-auto">
            Enhance customer support and service efficiency with our intelligent chatbot designed specifically for banking operations.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <div key={index} className="p-6 bg-white rounded-xl shadow-md border border-gray-100 floating-card">
              <div className="bg-tusk-teal/10 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                <feature.icon className="h-6 w-6 text-tusk-teal" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-tusk-navy">{feature.title}</h3>
              <p className="text-tusk-blue">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AssistantFeatures;
