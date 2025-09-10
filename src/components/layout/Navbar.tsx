
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Shield, Menu, X, User, LogOut } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { user, signOut } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled 
        ? 'bg-tusk-darkNavy/95 backdrop-blur-md shadow-lg' 
        : 'bg-transparent'
    }`}>
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <div className="flex items-center gap-2">
          <div className="relative">
            <div className="absolute -inset-1 bg-gradient-to-r from-tusk-teal to-tusk-accent opacity-30 rounded-full blur"></div>
            <Shield className="h-8 w-8 text-tusk-teal relative" />
          </div>
          <Link to="/" className="text-xl font-bold text-white">
            TUSK AI
          </Link>
        </div>
        
        <div className="hidden md:flex space-x-6">
          <Link to="/" className="text-white/80 hover:text-tusk-teal transition-colors">
            Home
          </Link>
          <Link to="/about" className="text-white/80 hover:text-tusk-teal transition-colors">
            About
          </Link>
          <Link to="/products" className="text-white/80 hover:text-tusk-teal transition-colors">
            Products
          </Link>
          <Link to="/fraud-detection" className="text-white/80 hover:text-tusk-teal transition-colors">
            Fraud Detection
          </Link>
          <Link to="/banking-assistant" className="text-white/80 hover:text-tusk-teal transition-colors">
            Banking Assistant
          </Link>
          <Link to="/documentation" className="text-white/80 hover:text-tusk-teal transition-colors">
            API Docs
          </Link>
          <Link to="/pricing" className="text-white/80 hover:text-tusk-teal transition-colors">
            Pricing
          </Link>
          <Link to="/contact" className="text-white/80 hover:text-tusk-teal transition-colors">
            Contact
          </Link>
        </div>
        
        <div className="flex items-center gap-4">
          <Button asChild variant="default" className="bg-tusk-teal hover:bg-tusk-accent text-black transition-all duration-300">
            <Link to="/demo">Request Demo</Link>
          </Button>
          
          {user ? (
            <div className="hidden md:flex items-center gap-2">
              <Button 
                asChild
                variant="ghost" 
                size="sm"
                className="text-white hover:bg-white/10"
              >
                <Link to="/profile">
                  <User className="h-4 w-4 mr-1" />
                  Profile
                </Link>
              </Button>
              <Button 
                variant="outline" 
                size="sm"
                onClick={signOut}
                className="border-white/20 text-white hover:bg-white/10"
              >
                <LogOut className="h-4 w-4 mr-1" />
                Sign Out
              </Button>
            </div>
          ) : (
            <Button asChild variant="outline" className="hidden md:flex border-white/20 text-white hover:bg-white/10">
              <Link to="/auth">
                <User className="h-4 w-4 mr-1" />
                Sign In
              </Link>
            </Button>
          )}
          
          <button 
            className="md:hidden text-white" 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>
      
      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-tusk-darkNavy/95 backdrop-blur-md">
          <div className="container mx-auto px-4 py-4 flex flex-col space-y-4">
            <Link 
              to="/" 
              className="text-white/80 hover:text-tusk-teal transition-colors py-2"
              onClick={() => setMobileMenuOpen(false)}
            >
              Home
            </Link>
            <Link 
              to="/about" 
              className="text-white/80 hover:text-tusk-teal transition-colors py-2"
              onClick={() => setMobileMenuOpen(false)}
            >
              About
            </Link>
            <Link 
              to="/products" 
              className="text-white/80 hover:text-tusk-teal transition-colors py-2"
              onClick={() => setMobileMenuOpen(false)}
            >
              Products
            </Link>
            <Link 
              to="/fraud-detection" 
              className="text-white/80 hover:text-tusk-teal transition-colors py-2"
              onClick={() => setMobileMenuOpen(false)}
            >
              Fraud Detection
            </Link>
            <Link 
              to="/banking-assistant" 
              className="text-white/80 hover:text-tusk-teal transition-colors py-2"
              onClick={() => setMobileMenuOpen(false)}
            >
              Banking Assistant
            </Link>
            <Link 
              to="/documentation" 
              className="text-white/80 hover:text-tusk-teal transition-colors py-2"
              onClick={() => setMobileMenuOpen(false)}
            >
              API Docs
            </Link>
            <Link 
              to="/pricing" 
              className="text-white/80 hover:text-tusk-teal transition-colors py-2"
              onClick={() => setMobileMenuOpen(false)}
            >
              Pricing
            </Link>
            <Link 
              to="/contact" 
              className="text-white/80 hover:text-tusk-teal transition-colors py-2"
              onClick={() => setMobileMenuOpen(false)}
            >
              Contact
            </Link>
            {user ? (
              <>
                <Link 
                  to="/profile" 
                  className="text-white/80 hover:text-tusk-teal transition-colors py-2 flex items-center gap-2"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <User className="h-4 w-4" />
                  Profile
                </Link>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => {
                    signOut();
                    setMobileMenuOpen(false);
                  }}
                  className="border-white/20 text-white hover:bg-white/10 justify-start"
                >
                  <LogOut className="h-4 w-4 mr-2" />
                  Sign Out
                </Button>
              </>
            ) : (
              <Link 
                to="/auth" 
                className="text-white/80 hover:text-tusk-teal transition-colors py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                Sign In
              </Link>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
