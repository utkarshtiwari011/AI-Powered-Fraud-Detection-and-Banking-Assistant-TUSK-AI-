
import React from 'react';
import { Brain, Database, Shield, Zap, Code, Cloud } from 'lucide-react';

const technologies = [
  {
    category: "AI & Machine Learning",
    icon: Brain,
    techs: ["TensorFlow", "PyTorch", "Scikit-learn", "LSTM Networks", "Random Forest", "XGBoost"],
    color: "from-purple-500 to-indigo-500"
  },
  {
    category: "Database & Storage",
    icon: Database,
    techs: ["PostgreSQL", "MongoDB", "Redis", "Elasticsearch", "AWS S3", "DynamoDB"],
    color: "from-blue-500 to-cyan-500"
  },
  {
    category: "Security & Encryption",
    icon: Shield,
    techs: ["AES-256", "TLS 1.3", "OAuth 2.0", "JWT", "PCI-DSS", "GDPR Compliance"],
    color: "from-green-500 to-emerald-500"
  },
  {
    category: "Real-time Processing",
    icon: Zap,
    techs: ["Apache Kafka", "WebSockets", "Node.js", "FastAPI", "Redis Streams", "Event Sourcing"],
    color: "from-yellow-500 to-orange-500"
  },
  {
    category: "API & Integration",
    icon: Code,
    techs: ["REST APIs", "GraphQL", "Webhooks", "OpenAPI", "SDK Support", "Microservices"],
    color: "from-pink-500 to-rose-500"
  },
  {
    category: "Cloud Infrastructure",
    icon: Cloud,
    techs: ["AWS", "Kubernetes", "Docker", "Terraform", "CloudFormation", "Auto-scaling"],
    color: "from-indigo-500 to-purple-500"
  }
];

const TechStack = () => {
  return (
    <section className="py-20 bg-tusk-navy">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-6 text-white">
            Powered by <span className="text-gradient">Cutting-Edge Technology</span>
          </h2>
          <p className="text-xl text-tusk-lightBlue max-w-3xl mx-auto">
            Our platform leverages the latest in AI, cloud computing, and security technologies to deliver unmatched performance and reliability.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {technologies.map((tech, index) => (
            <div 
              key={index}
              className="group relative overflow-hidden bg-tusk-darkNavy/80 rounded-2xl border border-tusk-teal/30 backdrop-blur-sm hover:border-tusk-teal/60 transition-all duration-300"
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${tech.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}></div>
              
              <div className="relative p-8">
                <div className={`inline-flex p-3 rounded-xl bg-gradient-to-br ${tech.color} mb-6`}>
                  <tech.icon className="h-6 w-6 text-white" />
                </div>
                
                <h3 className="text-xl font-bold mb-6 text-white">
                  {tech.category}
                </h3>
                
                <div className="grid grid-cols-2 gap-2">
                  {tech.techs.map((item, idx) => (
                    <div 
                      key={idx}
                      className="px-3 py-2 bg-black/20 rounded-lg text-sm text-tusk-lightBlue hover:bg-black/40 hover:text-white transition-colors duration-200"
                    >
                      {item}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TechStack;
