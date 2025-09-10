
import React from 'react';
import Layout from '@/components/layout/Layout';
import MissionSection from '@/components/about/MissionSection';
import RoadmapSection from '@/components/about/RoadmapSection';
import { Shield, Brain, Users, Globe, Zap, Lock } from 'lucide-react';

const AboutUs = () => {
  return (
    <Layout>
      <div className="bg-tusk-navy text-white py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl">
            <h1 className="text-4xl font-bold mb-4">About TUSK AI</h1>
            <p className="text-xl text-tusk-lightBlue">
              Leading the future of AI-powered banking security and customer service solutions.
            </p>
          </div>
        </div>
      </div>

      {/* Project Overview Section */}
      <section className="py-20 bg-tusk-darkNavy">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold mb-6 text-white">
                What is <span className="text-gradient">TUSK AI</span>?
              </h2>
              <p className="text-xl text-tusk-lightBlue">
                A comprehensive AI-powered platform revolutionizing banking security and customer service
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-16">
              <div>
                <h3 className="text-2xl font-bold text-white mb-6">Our Vision</h3>
                <p className="text-tusk-lightBlue mb-4">
                  TUSK AI is designed to be the ultimate shield against financial fraud while simultaneously 
                  enhancing customer experience through intelligent automation. We combine cutting-edge machine 
                  learning algorithms with real-time processing to create a platform that thinks, learns, and 
                  adapts to emerging threats.
                </p>
                <p className="text-tusk-lightBlue">
                  Our platform doesn't just detect fraud - it predicts it, prevents it, and provides actionable 
                  insights that help financial institutions stay ahead of cybercriminals.
                </p>
              </div>
              
              <div className="tech-border bg-black/30 backdrop-blur-xl p-8">
                <div className="grid grid-cols-2 gap-6">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-tusk-teal mb-2">99.7%</div>
                    <div className="text-sm text-tusk-lightBlue">Fraud Detection Accuracy</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-tusk-teal mb-2">&lt;50ms</div>
                    <div className="text-sm text-tusk-lightBlue">Response Time</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-tusk-teal mb-2">24/7</div>
                    <div className="text-sm text-tusk-lightBlue">AI Monitoring</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-tusk-teal mb-2">95%</div>
                    <div className="text-sm text-tusk-lightBlue">Customer Satisfaction</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Core Technologies */}
            <div className="mb-16">
              <h3 className="text-2xl font-bold text-white mb-8 text-center">Core Technologies</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                  {
                    icon: Brain,
                    title: "Advanced Machine Learning",
                    description: "Deep neural networks with reinforcement learning capabilities that adapt to new fraud patterns in real-time."
                  },
                  {
                    icon: Zap,
                    title: "Real-Time Processing",
                    description: "Lightning-fast transaction analysis using distributed computing and edge processing for instant decisions."
                  },
                  {
                    icon: Lock,
                    title: "Enterprise Security",
                    description: "Bank-grade encryption, PCI-DSS compliance, and zero-trust architecture ensuring maximum data protection."
                  }
                ].map((tech, index) => (
                  <div key={index} className="tech-border bg-black/20 backdrop-blur-xl p-6 text-center">
                    <div className={`inline-flex p-3 rounded-xl bg-gradient-to-br from-tusk-teal to-tusk-accent mb-4`}>
                      <tech.icon className="h-6 w-6 text-black" />
                    </div>
                    <h4 className="text-lg font-bold text-white mb-3">{tech.title}</h4>
                    <p className="text-tusk-lightBlue text-sm">{tech.description}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Key Features */}
            <div className="mb-16">
              <h3 className="text-2xl font-bold text-white mb-8 text-center">Platform Features</h3>
              <div className="space-y-6">
                {[
                  {
                    title: "Intelligent Fraud Detection",
                    description: "Multi-layered AI models analyzing transaction patterns, user behavior, device fingerprinting, and geographic anomalies to identify suspicious activities with unprecedented accuracy."
                  },
                  {
                    title: "AI Banking Assistant",
                    description: "Natural language processing powered chatbot that handles customer inquiries, account management, fraud reporting, and provides 24/7 support with human-like interactions."
                  },
                  {
                    title: "Predictive Analytics Dashboard",
                    description: "Comprehensive analytics platform providing insights into fraud trends, risk assessments, customer behavior patterns, and operational metrics for data-driven decision making."
                  },
                  {
                    title: "Self-Learning Models",
                    description: "Continuously evolving AI algorithms that learn from new data, adapt to emerging fraud techniques, and improve detection accuracy without manual intervention."
                  }
                ].map((feature, index) => (
                  <div key={index} className="tech-border bg-black/20 backdrop-blur-xl p-6">
                    <h4 className="text-lg font-bold text-white mb-3">{feature.title}</h4>
                    <p className="text-tusk-lightBlue">{feature.description}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Impact Section */}
            <div className="text-center">
              <h3 className="text-2xl font-bold text-white mb-6">Our Impact</h3>
              <p className="text-tusk-lightBlue mb-8">
                TUSK AI has already demonstrated significant impact in protecting financial institutions 
                and their customers from fraud while improving operational efficiency.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                {[
                  { metric: "$50M+", label: "Fraud Prevented" },
                  { metric: "1M+", label: "Transactions Protected" },
                  { metric: "85%", label: "Support Automation" },
                  { metric: "60%", label: "Faster Resolution" }
                ].map((stat, index) => (
                  <div key={index} className="tech-border bg-black/20 backdrop-blur-xl p-4">
                    <div className="text-2xl font-bold text-tusk-teal mb-2">{stat.metric}</div>
                    <div className="text-sm text-tusk-lightBlue">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <MissionSection />
      <RoadmapSection />
    </Layout>
  );
};

export default AboutUs;
