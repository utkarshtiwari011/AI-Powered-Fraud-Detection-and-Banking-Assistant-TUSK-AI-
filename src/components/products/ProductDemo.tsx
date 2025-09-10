
import React from 'react';
import { Button } from '@/components/ui/button';
import { Play, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const ProductDemo = () => {
  return (
    <section className="py-20 bg-tusk-darkNavy">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold mb-6 text-white">See Our Technology in Action</h2>
            <p className="text-tusk-lightBlue mb-8">
              Experience firsthand how our AI detects suspicious transactions and provides instant support to banking customers. Watch our demo video or schedule a personalized demonstration.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Button asChild size="lg" className="bg-tusk-teal hover:bg-tusk-accent text-black font-medium">
                <Link to="/demo" className="flex items-center gap-2">
                  <Play className="h-5 w-5" />
                  Watch Demo
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="bg-transparent border-white text-white hover:bg-white/10">
                <Link to="/demo" className="flex items-center gap-2">
                  Schedule Live Demo <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
          
          <div>
            <div className="relative">
              <div className="tech-border bg-black/20 backdrop-blur-sm overflow-hidden relative aspect-video">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-tusk-teal to-transparent"></div>
                <img 
                  src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80" 
                  alt="AI Fraud Detection Demo"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-br from-tusk-darkNavy/60 to-transparent flex items-center justify-center">
                  <div className="w-20 h-20 rounded-full bg-tusk-teal/20 backdrop-blur-md flex items-center justify-center cursor-pointer hover:bg-tusk-teal/30 transition-colors border border-tusk-teal/50">
                    <div className="w-16 h-16 rounded-full bg-tusk-teal flex items-center justify-center">
                      <Play fill="black" className="h-8 w-8 text-black ml-1" />
                    </div>
                  </div>
                </div>
                
                <div className="absolute bottom-4 left-4 right-4 p-3 bg-black/40 backdrop-blur-md rounded-lg border border-white/10">
                  <div className="flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full bg-tusk-teal animate-pulse"></div>
                    <span className="text-sm text-white">Demo: Fraud Detection in Real-Time</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductDemo;
