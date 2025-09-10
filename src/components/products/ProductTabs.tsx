
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Shield, MessageSquare, BellRing, BarChart3, Scale, Database, Globe, Lock, Check,
  Brain, Bell, LineChart, Cpu, UserCog, ArrowRight
} from 'lucide-react';

const features = [
  {
    id: "detection",
    icon: Shield,
    label: "Fraud Detection",
    title: "Real-Time Fraud Detection",
    description: "Our AI models analyze thousands of transaction attributes in milliseconds to identify suspicious activity before fraud occurs.",
    benefits: [
      "Transaction monitoring across all channels",
      "Behavioral biometrics for enhanced security",
      "Customizable risk thresholds for your business",
      "Entity-based fraud detection across accounts"
    ],
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "assistant",
    icon: MessageSquare,
    label: "AI Assistant",
    title: "Intelligent Banking Assistant",
    description: "Handle customer inquiries, account operations, and fraud reporting with our advanced conversational AI.",
    benefits: [
      "Natural language processing for human-like interactions",
      "Multi-language support for global customers",
      "Contextual awareness and conversation memory",
      "Seamless handoff to human agents when needed"
    ],
    image: "https://images.unsplash.com/photo-1556742031-c6961e8560b0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "alerts",
    icon: BellRing,
    label: "Real-Time Alerts",
    title: "Instant Alert System",
    description: "Notify customers and security teams instantly about suspicious activities via multiple channels.",
    benefits: [
      "Push notifications, SMS, and email alerts",
      "In-app verification of suspicious transactions",
      "One-click account locking for customer safety",
      "Customizable alert rules and thresholds"
    ],
    image: "https://images.unsplash.com/photo-1563986768609-322da13575f3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "analytics",
    icon: BarChart3,
    label: "Analytics",
    title: "Advanced Analytics Dashboard",
    description: "Gain insights into fraud patterns, customer behavior, and system performance through comprehensive analytics.",
    benefits: [
      "Visual fraud pattern recognition",
      "Predictive risk scoring for accounts",
      "Performance metrics and KPI tracking",
      "Custom reporting for regulatory compliance"
    ],
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "scaling",
    icon: Scale,
    label: "Scalability",
    title: "Enterprise Scalability",
    description: "Our platform scales with your business, handling millions of transactions with consistent performance.",
    benefits: [
      "Auto-scaling infrastructure based on transaction volume",
      "Multi-region deployment for global operations",
      "High-availability architecture (99.99% uptime)",
      "Load balancing for consistent performance"
    ],
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "api",
    icon: Database,
    label: "API First",
    title: "API-First Architecture",
    description: "Seamlessly integrate our solutions with your existing banking systems through our comprehensive API.",
    benefits: [
      "RESTful API with comprehensive documentation",
      "Webhooks for real-time event notifications",
      "Sandbox environment for development and testing",
      "SDKs for popular programming languages"
    ],
    image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "selflearning",
    icon: Brain,
    label: "Self-Learning Models",
    title: "Adaptive AI Models",
    description: "Our AI models continuously learn and adapt to new fraud patterns, improving detection accuracy over time.",
    benefits: [
      "Reinforcement learning for pattern adaptation",
      "Anomaly detection for new attack vectors",
      "Continuous model training with new data",
      "Feedback loops from manual reviews"
    ],
    image: "https://images.unsplash.com/photo-1655720828018-edd2daec9349?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "admin",
    icon: UserCog,
    label: "Admin Dashboard",
    title: "Comprehensive Management Console",
    description: "Monitor and manage all aspects of your fraud prevention and customer service operations from a single interface.",
    benefits: [
      "Real-time activity monitoring and alerts",
      "User and role management for security",
      "Detailed audit logs for compliance",
      "Customizable dashboards and reports"
    ],
    image: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
  }
];

const ProductTabs = () => {
  const [activeView, setActiveView] = useState('user'); // 'user' or 'enterprise'
  const [hoveredFeature, setHoveredFeature] = useState<string | null>(null);
  
  return (
    <section className="py-16 bg-tusk-navy">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-12">
          <div className="animate-fade-in">
            <h2 className="text-3xl font-bold mb-2 text-white">Our Core Features</h2>
            <p className="text-tusk-lightBlue">
              Comprehensive protection and assistance for modern banking
            </p>
          </div>
          
          <div className="mt-4 md:mt-0 p-1 rounded-lg bg-tusk-darkNavy/50 backdrop-blur-sm inline-flex shadow-lg border border-tusk-teal/10">
            <button 
              className={`px-4 py-2 rounded-md text-sm transition-all duration-300 ${
                activeView === 'user' 
                  ? 'bg-tusk-teal text-black shadow-md' 
                  : 'text-tusk-lightBlue hover:text-white'
              }`}
              onClick={() => setActiveView('user')}
            >
              User View
            </button>
            <button 
              className={`px-4 py-2 rounded-md text-sm transition-all duration-300 ${
                activeView === 'enterprise' 
                  ? 'bg-tusk-teal text-black shadow-md' 
                  : 'text-tusk-lightBlue hover:text-white'
              }`}
              onClick={() => setActiveView('enterprise')}
            >
              Enterprise View
            </button>
          </div>
        </div>
        
        <Tabs defaultValue="detection" className="w-full">
          <TabsList className="w-full bg-tusk-darkNavy/50 backdrop-blur-sm p-1 mb-8 flex flex-wrap rounded-xl border border-tusk-teal/10 shadow-lg">
            {features.map(feature => (
              <TabsTrigger 
                key={feature.id}
                value={feature.id}
                className="flex-1 data-[state=active]:bg-tusk-teal data-[state=active]:text-black data-[state=active]:shadow-md transition-all duration-300"
                onMouseEnter={() => setHoveredFeature(feature.id)}
                onMouseLeave={() => setHoveredFeature(null)}
              >
                <div className="flex items-center gap-2 relative">
                  <feature.icon className={`h-4 w-4 ${hoveredFeature === feature.id ? 'animate-pulse' : ''}`} />
                  <span className="hidden md:inline">{feature.label}</span>
                  {hoveredFeature === feature.id && (
                    <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-tusk-teal/50 animate-fade-in"></span>
                  )}
                </div>
              </TabsTrigger>
            ))}
          </TabsList>
          
          {features.map(feature => (
            <TabsContent key={feature.id} value={feature.id} className="mt-0 animate-fade-in">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                <div className="order-2 md:order-1">
                  <h3 className="text-2xl font-bold mb-4 text-white">{feature.title}</h3>
                  <p className="text-tusk-lightBlue mb-6">{feature.description}</p>
                  
                  <div className="space-y-4">
                    <h4 className="text-white font-medium">
                      {activeView === 'user' ? 'Customer Benefits' : 'Institution Benefits'}
                    </h4>
                    <ul className="space-y-3">
                      {feature.benefits.map((benefit, index) => (
                        <li key={index} className="flex items-start gap-3 group">
                          <div className="mt-1 bg-tusk-teal/20 p-1 rounded-full group-hover:bg-tusk-teal/40 transition-colors duration-300">
                            <Check className="h-3 w-3 text-tusk-teal" />
                          </div>
                          <span className="text-tusk-lightBlue group-hover:text-white transition-colors duration-300">{benefit}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div className="mt-8 flex gap-4">
                    <button className="px-5 py-2.5 bg-tusk-teal text-black rounded-lg flex items-center gap-2 hover:bg-tusk-accent transition-colors duration-300 shadow-lg hover:shadow-tusk-teal/20">
                      Learn More <ArrowRight className="h-4 w-4" />
                    </button>
                    <button className="px-5 py-2.5 bg-transparent border border-tusk-teal/50 text-white rounded-lg hover:bg-tusk-teal/10 transition-all duration-300">
                      Request Demo
                    </button>
                  </div>
                </div>
                
                <div className="order-1 md:order-2">
                  <div className="tech-border overflow-hidden bg-black/20 backdrop-blur-sm hover:shadow-tusk-teal/20 hover:shadow-lg transition-all duration-300 group">
                    <img 
                      src={feature.image} 
                      alt={feature.title}
                      className="w-full h-[300px] md:h-[400px] object-cover object-center group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-br from-tusk-darkNavy/70 to-transparent"></div>
                  </div>
                </div>
              </div>
            </TabsContent>
          ))}
        </Tabs>
        
        <div className="mt-16 text-center">
          <div className="inline-flex items-center px-3 py-1 mb-6 rounded-full border border-tusk-teal/40 bg-tusk-teal/10">
            <span className="mr-2 h-2 w-2 rounded-full bg-tusk-teal animate-pulse-glow"></span>
            <span className="text-sm font-medium text-tusk-teal">Ready to get started?</span>
          </div>
          <h3 className="text-2xl font-bold mb-6 text-white">Experience TUSK AI for Your Organization</h3>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="px-6 py-3 bg-tusk-teal text-black rounded-lg flex items-center gap-2 hover:bg-tusk-accent transition-colors duration-300 shadow-lg hover:shadow-tusk-teal/20 justify-center">
              <Shield className="h-5 w-5" /> Get Started Free
            </button>
            <button className="px-6 py-3 bg-transparent border border-white/20 text-white rounded-lg hover:border-tusk-teal hover:text-tusk-teal transition-all duration-300 flex items-center justify-center gap-2">
              Schedule Custom Demo <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductTabs;
