
import React from 'react';
import { Shield, MessageSquare, TrendingUp, Users, Zap, Lock } from 'lucide-react';

const useCases = [
  {
    icon: Shield,
    title: "Prevent Fraud in Real-Time",
    description: "Stop fraudulent transactions before they happen with our advanced AI detection algorithms.",
    metrics: "99.8% detection accuracy",
    color: "from-red-500 to-orange-500"
  },
  {
    icon: MessageSquare,
    title: "Automate Customer Queries",
    description: "Handle 70% of customer interactions automatically with our intelligent banking assistant.",
    metrics: "24/7 availability",
    color: "from-blue-500 to-purple-500"
  },
  {
    icon: TrendingUp,
    title: "Reduce Operational Costs",
    description: "Cut support costs by 60% while improving customer satisfaction and response times.",
    metrics: "60% cost reduction",
    color: "from-green-500 to-teal-500"
  },
  {
    icon: Users,
    title: "Scale Customer Support",
    description: "Serve thousands of customers simultaneously without adding human agents.",
    metrics: "Unlimited scalability",
    color: "from-purple-500 to-pink-500"
  },
  {
    icon: Zap,
    title: "Instant Threat Response",
    description: "Respond to security threats in under 2 seconds with automated protective actions.",
    metrics: "<2s response time",
    color: "from-yellow-500 to-orange-500"
  },
  {
    icon: Lock,
    title: "Ensure Compliance",
    description: "Maintain regulatory compliance with built-in audit trails and security protocols.",
    metrics: "100% compliant",
    color: "from-indigo-500 to-blue-500"
  }
];

const UseCases = () => {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-6 text-tusk-navy">
            Transform Your Banking Operations
          </h2>
          <p className="text-xl text-tusk-blue max-w-3xl mx-auto">
            Discover how leading financial institutions are leveraging our AI platform to revolutionize security and customer service.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {useCases.map((useCase, index) => (
            <div 
              key={index}
              className="group relative overflow-hidden bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 hover:border-tusk-teal/30"
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${useCase.color} opacity-0 group-hover:opacity-5 transition-opacity duration-300`}></div>
              
              <div className="relative p-8">
                <div className={`inline-flex p-3 rounded-xl bg-gradient-to-br ${useCase.color} mb-6`}>
                  <useCase.icon className="h-6 w-6 text-white" />
                </div>
                
                <h3 className="text-xl font-bold mb-4 text-tusk-navy group-hover:text-tusk-teal transition-colors">
                  {useCase.title}
                </h3>
                
                <p className="text-tusk-blue mb-6 leading-relaxed">
                  {useCase.description}
                </p>
                
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-tusk-teal"></div>
                  <span className="text-sm font-medium text-tusk-teal">
                    {useCase.metrics}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default UseCases;
