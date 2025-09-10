
import React from 'react';
import { Link } from 'react-router-dom';
import { Shield, Twitter, Linkedin, Github, Mail } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-tusk-darkNavy text-white py-16 relative overflow-hidden">
      {/* Tech pattern background */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-10 right-10 w-40 h-40 border border-white rounded-full"></div>
        <div className="absolute bottom-20 left-20 w-60 h-60 border border-white rounded-full"></div>
        <div className="absolute top-40 left-1/3 w-20 h-20 border border-white rounded-full"></div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          <div className="col-span-1">
            <div className="flex items-center gap-2 mb-5">
              <div className="relative">
                <div className="absolute -inset-1 bg-gradient-to-r from-tusk-teal to-tusk-accent opacity-30 rounded-full blur"></div>
                <Shield className="h-6 w-6 text-tusk-teal relative" />
              </div>
              <span className="text-xl font-bold">TUSK AI</span>
            </div>
            <p className="text-tusk-lightBlue mb-6 max-w-xs">
              AI-powered fraud detection and banking assistant for modern financial institutions.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-white/60 hover:text-tusk-teal transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-white/60 hover:text-tusk-teal transition-colors">
                <Linkedin className="h-5 w-5" />
              </a>
              <a href="#" className="text-white/60 hover:text-tusk-teal transition-colors">
                <Github className="h-5 w-5" />
              </a>
              <a href="#" className="text-white/60 hover:text-tusk-teal transition-colors">
                <Mail className="h-5 w-5" />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="font-semibold mb-5 text-lg relative inline-block">
              Products
              <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-tusk-teal to-transparent"></span>
            </h3>
            <ul className="space-y-3">
              <li><Link to="/fraud-detection" className="text-tusk-lightBlue hover:text-tusk-teal transition-colors">Fraud Detection</Link></li>
              <li><Link to="/banking-assistant" className="text-tusk-lightBlue hover:text-tusk-teal transition-colors">Banking Assistant</Link></li>
              <li><Link to="/products" className="text-tusk-lightBlue hover:text-tusk-teal transition-colors">All Products</Link></li>
              <li><Link to="/demo" className="text-tusk-lightBlue hover:text-tusk-teal transition-colors">Request Demo</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold mb-5 text-lg relative inline-block">
              Company
              <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-tusk-teal to-transparent"></span>
            </h3>
            <ul className="space-y-3">
              <li><Link to="/about" className="text-tusk-lightBlue hover:text-tusk-teal transition-colors">About Us</Link></li>
              <li><Link to="/pricing" className="text-tusk-lightBlue hover:text-tusk-teal transition-colors">Pricing</Link></li>
              <li><Link to="/documentation" className="text-tusk-lightBlue hover:text-tusk-teal transition-colors">Documentation</Link></li>
              <li><Link to="/contact" className="text-tusk-lightBlue hover:text-tusk-teal transition-colors">Contact</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold mb-5 text-lg relative inline-block">
              Legal
              <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-tusk-teal to-transparent"></span>
            </h3>
            <ul className="space-y-3">
              <li><a href="#" className="text-tusk-lightBlue hover:text-tusk-teal transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="text-tusk-lightBlue hover:text-tusk-teal transition-colors">Terms of Service</a></li>
              <li><a href="#" className="text-tusk-lightBlue hover:text-tusk-teal transition-colors">Compliance</a></li>
              <li><a href="#" className="text-tusk-lightBlue hover:text-tusk-teal transition-colors">Security</a></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-tusk-blue/30 mt-10 pt-8 text-center text-tusk-lightBlue/60">
          <p>&copy; {currentYear} TUSK AI. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
