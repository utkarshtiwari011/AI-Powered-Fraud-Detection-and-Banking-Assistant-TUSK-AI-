import React from 'react';
import Layout from '@/components/layout/Layout';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import RealTimeFraudMonitor from '@/components/realtime/RealTimeFraudMonitor';
import IntelligentAssistant from '@/components/ai/IntelligentAssistant';
import BiometricsDemo from '@/components/biometrics/BiometricsDemo';
import PredictiveAnalytics from '@/components/analytics/PredictiveAnalytics';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Shield, Bot, Fingerprint, TrendingUp, Building2, Users, Globe, Award } from 'lucide-react';

const Enterprise = () => {
  return (
    <Layout>
      {/* Hero Section */}
      <div className="bg-tusk-navy text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl">
            <div className="flex items-center gap-3 mb-6">
              <Building2 className="h-8 w-8 text-tusk-teal" />
              <h1 className="text-4xl font-bold">Enterprise Fintech Platform</h1>
            </div>
            <p className="text-xl text-tusk-lightBlue mb-8 max-w-3xl">
              Complete B2B fraud detection and prevention platform designed for banks, credit unions, 
              and fintech companies. Powered by advanced AI, real-time monitoring, and behavioral biometrics.
            </p>
            <div className="flex flex-wrap gap-4 mb-8">
              <Badge className="bg-tusk-teal/20 text-tusk-teal px-4 py-2">
                <Shield className="h-4 w-4 mr-2" />
                Enterprise Security
              </Badge>
              <Badge className="bg-blue-500/20 text-blue-300 px-4 py-2">
                <Globe className="h-4 w-4 mr-2" />
                Global Compliance
              </Badge>
              <Badge className="bg-green-500/20 text-green-300 px-4 py-2">
                <Award className="h-4 w-4 mr-2" />
                99.7% Accuracy
              </Badge>
            </div>
            <div className="flex gap-4">
              <Button size="lg" className="bg-tusk-teal text-black hover:bg-tusk-accent">
                Schedule Enterprise Demo
              </Button>
              <Button size="lg" variant="outline" className="border-tusk-teal text-tusk-teal hover:bg-tusk-teal hover:text-black">
                View Pricing
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Key Benefits */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-tusk-navy mb-4">
              Why Enterprise Clients Choose Our Platform
            </h2>
            <p className="text-tusk-blue text-lg max-w-2xl mx-auto">
              Comprehensive fraud prevention ecosystem with enterprise-grade security and performance.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: Shield,
                title: "Real-Time Protection",
                description: "Instant fraud detection with <50ms response time. Advanced ensemble ML models analyze every transaction.",
                stats: "99.7% accuracy, <0.1% false positives"
              },
              {
                icon: Users,
                title: "Scalable Infrastructure",
                description: "Handle millions of transactions per day with auto-scaling cloud infrastructure and 99.99% uptime SLA.",
                stats: "10M+ transactions/day capacity"
              },
              {
                icon: Globe,
                title: "Global Compliance",
                description: "Full compliance with PCI DSS, SOX, GDPR, PSD2, and regional banking regulations worldwide.",
                stats: "50+ regulatory frameworks"
              }
            ].map((benefit, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="bg-tusk-teal/10 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                    <benefit.icon className="h-6 w-6 text-tusk-teal" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3 text-tusk-navy">{benefit.title}</h3>
                  <p className="text-tusk-blue mb-4">{benefit.description}</p>
                  <Badge variant="outline" className="text-tusk-teal border-tusk-teal">
                    {benefit.stats}
                  </Badge>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Interactive Platform Demo */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-tusk-navy mb-4">
              Live Platform Demonstration
            </h2>
            <p className="text-tusk-blue text-lg max-w-2xl mx-auto">
              Experience our enterprise platform capabilities with interactive demos of core features.
            </p>
          </div>

          <Tabs defaultValue="fraud" className="w-full">
            <TabsList className="grid w-full grid-cols-4 max-w-4xl mx-auto">
              <TabsTrigger value="fraud" className="flex items-center gap-2">
                <Shield className="h-4 w-4" />
                Fraud Detection
              </TabsTrigger>
              <TabsTrigger value="assistant" className="flex items-center gap-2">
                <Bot className="h-4 w-4" />
                AI Assistant
              </TabsTrigger>
              <TabsTrigger value="biometrics" className="flex items-center gap-2">
                <Fingerprint className="h-4 w-4" />
                Biometrics
              </TabsTrigger>
              <TabsTrigger value="analytics" className="flex items-center gap-2">
                <TrendingUp className="h-4 w-4" />
                Analytics
              </TabsTrigger>
            </TabsList>

            <TabsContent value="fraud" className="mt-8">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Shield className="h-5 w-5 text-tusk-teal" />
                    Real-Time Fraud Detection & Prevention
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <RealTimeFraudMonitor />
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="assistant" className="mt-8">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Bot className="h-5 w-5 text-tusk-teal" />
                    Intelligent Banking Assistant
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <IntelligentAssistant />
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="biometrics" className="mt-8">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Fingerprint className="h-5 w-5 text-tusk-teal" />
                    Behavioral Biometrics Authentication
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <BiometricsDemo />
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="analytics" className="mt-8">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="h-5 w-5 text-tusk-teal" />
                    Predictive Analytics & Insights
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <PredictiveAnalytics />
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Technical Specifications */}
      <section className="py-16 bg-tusk-darkNavy text-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Enterprise Technical Specifications</h2>
            <p className="text-tusk-lightBlue text-lg max-w-2xl mx-auto">
              Built for scale, security, and performance with enterprise-grade infrastructure.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                title: "Performance",
                specs: [
                  "< 50ms fraud detection",
                  "10M+ transactions/day",
                  "99.99% uptime SLA",
                  "Auto-scaling infrastructure"
                ]
              },
              {
                title: "Security",
                specs: [
                  "End-to-end encryption",
                  "PCI DSS Level 1",
                  "SOC 2 Type II",
                  "Multi-factor authentication"
                ]
              },
              {
                title: "AI Models",
                specs: [
                  "Ensemble ML algorithms",
                  "Real-time learning",
                  "Behavioral analytics",
                  "Anomaly detection"
                ]
              },
              {
                title: "Integration",
                specs: [
                  "RESTful APIs",
                  "WebSocket support",
                  "SDK libraries",
                  "Webhook callbacks"
                ]
              }
            ].map((spec, index) => (
              <Card key={index} className="bg-black/30 border-tusk-teal/20">
                <CardHeader>
                  <CardTitle className="text-tusk-teal">{spec.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {spec.specs.map((item, idx) => (
                      <li key={idx} className="text-tusk-lightBlue text-sm flex items-center gap-2">
                        <div className="w-1 h-1 bg-tusk-teal rounded-full"></div>
                        {item}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Enterprise;