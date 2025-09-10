
import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight, Shield, Lock, BarChart3, Cpu } from 'lucide-react';
import { Link } from 'react-router-dom';

const Hero = () => {
  return (
    <div className="gradient-bg text-white overflow-hidden relative">
      {/* Background tech pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 w-20 h-20 border border-white/20 rounded-full"></div>
        <div className="absolute top-40 right-20 w-32 h-32 border border-white/20 rounded-full"></div>
        <div className="absolute bottom-10 left-1/4 w-40 h-40 border border-white/10 rounded-full"></div>
        <div className="absolute -bottom-20 -right-20 w-64 h-64 border-2 border-tusk-teal/20 rounded-full"></div>
      </div>
      
      <div className="container mx-auto px-4 py-20 md:py-28 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="animate-slide-up">
            <div className="inline-flex items-center px-3 py-1 mb-6 rounded-full border border-tusk-teal/40 bg-tusk-teal/10">
              <span className="mr-2 h-2 w-2 rounded-full bg-tusk-teal animate-pulse-glow"></span>
              <span className="text-sm font-medium text-tusk-teal">Next-generation AI Security</span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              Real-Time <span className="text-gradient">Fraud Prevention</span> for Fintech & Banks
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-tusk-lightBlue/90 leading-relaxed">
              Enterprise-grade AI fraud detection and prevention platform with real-time alerts,
              behavioral biometrics, and intelligent banking assistance for financial institutions.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button asChild size="lg" className="bg-tusk-teal hover:bg-tusk-accent text-black font-medium transition-all duration-300 shadow-lg hover:shadow-tusk-teal/20 hover:shadow-xl">
                <Link to="/fraud-detection" className="flex items-center gap-2">
                  <Shield className="h-5 w-5" />
                  Live Fraud Detection Demo
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="bg-transparent border-white text-white hover:bg-white/10 hover:border-tusk-teal hover:text-tusk-teal transition-all duration-300">
                <Link to="/demo" className="flex items-center gap-2">
                  See Platform Demo <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            </div>
            
            <div className="mt-12 flex items-center gap-x-8">
              <div className="flex -space-x-2">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="h-8 w-8 rounded-full bg-tusk-blue border-2 border-tusk-navy flex items-center justify-center text-xs font-medium">
                    {['AB', 'TD', 'CB', 'FN'][i-1]}
                  </div>
                ))}
              </div>
              <p className="text-sm text-tusk-lightBlue">
                Trusted by leading financial institutions
              </p>
            </div>
          </div>
          
          <div className="hidden md:block">
            <div className="relative">
              <div className="absolute -top-8 -left-8 w-64 h-64 bg-tusk-teal/20 rounded-full blur-3xl"></div>
              <div className="absolute -bottom-8 -right-8 w-64 h-64 bg-tusk-blue/20 rounded-full blur-3xl"></div>
              
              <div className="relative tech-border bg-black/30 backdrop-blur-xl p-8 animate-float-advanced floating-card">
                <div className="absolute top-0 right-0 w-full h-1 bg-gradient-to-r from-transparent via-tusk-teal to-transparent"></div>
                <div className="mb-6 text-center">
                  <div className="inline-block glow-effect bg-tusk-darkBlue p-3 rounded-full mb-3 border border-tusk-teal/30">
                    <Shield className="h-8 w-8 text-tusk-teal" />
                  </div>
                  <h2 className="text-xl font-bold">Real-Time Protection</h2>
                </div>
                <div className="space-y-4">
                  <div className="bg-black/20 p-3 rounded-lg flex items-center gap-3 border border-white/10">
                    <div className="h-3 w-3 rounded-full bg-green-400"></div>
                    <span>AI monitoring active</span>
                  </div>
                  <div className="bg-black/20 p-3 rounded-lg flex items-center gap-3 border border-white/10">
                    <div className="h-3 w-3 rounded-full bg-tusk-teal animate-pulse-glow"></div>
                    <span>Analyzing 1,248 transactions</span>
                  </div>
                  
                  {/* Tech stats */}
                  <div className="grid grid-cols-2 gap-2 mt-2">
                    <div className="bg-black/20 p-3 rounded-lg border border-white/10 flex items-center gap-2">
                      <Lock className="h-4 w-4 text-tusk-teal" />
                      <div>
                        <div className="text-xs text-tusk-lightBlue">Threats blocked</div>
                        <div className="text-sm font-medium">9,842</div>
                      </div>
                    </div>
                    <div className="bg-black/20 p-3 rounded-lg border border-white/10 flex items-center gap-2">
                      <BarChart3 className="h-4 w-4 text-tusk-teal" />
                      <div>
                        <div className="text-xs text-tusk-lightBlue">Detection rate</div>
                        <div className="text-sm font-medium">99.8%</div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-black/10 p-3 rounded-lg text-center border border-white/5">
                    <span className="text-sm text-tusk-accent flex items-center justify-center gap-2">
                      <Cpu className="h-3 w-3" />
                      Last fraud attempt blocked: 3 minutes ago
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
