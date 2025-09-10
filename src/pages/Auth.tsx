import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Shield, Mail, Lock, User, AlertCircle } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/hooks/useAuth';
import Layout from '@/components/layout/Layout';

const Auth = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('signin');
  
  // Sign in form state
  const [signInData, setSignInData] = useState({
    email: '',
    password: ''
  });
  
  // Sign up form state
  const [signUpData, setSignUpData] = useState({
    email: '',
    password: '',
    fullName: '',
    company: ''
  });
  
  const navigate = useNavigate();
  const { toast } = useToast();
  const { user } = useAuth();

  useEffect(() => {
    // Redirect if user is already logged in
    if (user) {
      navigate('/');
    }
  }, [user, navigate]);

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!signUpData.email || !signUpData.password || !signUpData.fullName) {
      toast({
        title: "Missing information",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);

    try {
      console.log('Attempting to sign up with:', signUpData.email);
      const { data, error } = await supabase.auth.signUp({
        email: signUpData.email,
        password: signUpData.password,
        options: {
          emailRedirectTo: `${window.location.origin}/`,
          data: {
            full_name: signUpData.fullName,
            company: signUpData.company,
          }
        }
      });

      console.log('Sign up response:', { data, error });

      if (error) {
        console.error('Sign up error:', error);
        toast({
          title: "Sign up failed",
          description: error.message,
          variant: "destructive",
        });
      } else if (data.user) {
        toast({
          title: "Account created successfully!",
          description: "You are now logged in and can start using the platform.",
        });
        // Clear form
        setSignUpData({ email: '', password: '', fullName: '', company: '' });
      }
    } catch (error) {
      console.error('Sign up catch error:', error);
      toast({
        title: "Error",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!signInData.email || !signInData.password) {
      toast({
        title: "Missing information",
        description: "Please enter both email and password.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);

    try {
      console.log('Attempting to sign in with:', signInData.email);
      const { data, error } = await supabase.auth.signInWithPassword({
        email: signInData.email,
        password: signInData.password,
      });

      console.log('Sign in response:', { data, error });

      if (error) {
        console.error('Sign in error:', error);
        toast({
          title: "Sign in failed",
          description: error.message,
          variant: "destructive",
        });
      } else {
        toast({
          title: "Welcome back!",
          description: "You have been signed in successfully.",
        });
        // Clear form
        setSignInData({ email: '', password: '' });
      }
    } catch (error) {
      console.error('Sign in catch error:', error);
      toast({
        title: "Error",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setGoogleLoading(true);
    try {
      console.log('Attempting Google sign in');
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/`,
        }
      });

      console.log('Google sign in response:', { data, error });

      if (error) {
        console.error('Google sign in error:', error);
        toast({
          title: "Google sign in failed",
          description: error.message,
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error('Google sign in catch error:', error);
      toast({
        title: "Error",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive",
      });
    } finally {
      setGoogleLoading(false);
    }
  };

  return (
    <Layout>
      <div className="min-h-screen flex items-center justify-center py-16 px-4">
        <div className="w-full max-w-md mx-auto">
          <div className="text-center mb-8">
            <div className="flex items-center justify-center gap-2 mb-4">
              <div className="relative">
                <div className="absolute -inset-1 bg-gradient-to-r from-tusk-teal to-tusk-accent opacity-30 rounded-full blur"></div>
                <Shield className="h-8 w-8 text-tusk-teal relative" />
              </div>
              <span className="text-2xl font-bold text-white">TUSK AI</span>
            </div>
            <h1 className="text-3xl font-bold text-white mb-2">Welcome</h1>
            <p className="text-tusk-lightBlue">Access your AI banking solutions</p>
          </div>

          <div className="bg-tusk-darkNavy/80 backdrop-blur-xl border border-tusk-teal/30 rounded-xl p-6 relative z-10">
            <div className="text-center mb-6">
              <h2 className="text-xl font-bold text-white">Authentication</h2>
              <p className="text-tusk-lightBlue">Sign in to your account or create a new one</p>
            </div>

            <div className="mb-6">
              <div className="flex bg-black/20 rounded-lg p-1">
                <button
                  type="button"
                  onClick={() => setActiveTab('signin')}
                  className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all ${
                    activeTab === 'signin'
                      ? 'bg-tusk-teal text-black'
                      : 'text-white hover:bg-white/10'
                  }`}
                >
                  Sign In
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab('signup')}
                  className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all ${
                    activeTab === 'signup'
                      ? 'bg-tusk-teal text-black'
                      : 'text-white hover:bg-white/10'
                  }`}
                >
                  Sign Up
                </button>
              </div>
            </div>

            {activeTab === 'signin' ? (
              <form onSubmit={handleSignIn} className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm text-white flex items-center gap-2">
                    <Mail className="h-4 w-4" />
                    Email
                  </label>
                  <input
                    type="email"
                    value={signInData.email}
                    onChange={(e) => setSignInData(prev => ({ ...prev, email: e.target.value }))}
                    required
                    autoComplete="email"
                    className="w-full px-3 py-2 bg-black/30 border border-white/20 rounded-md text-white placeholder:text-white/60 focus:border-tusk-teal focus:outline-none"
                    placeholder="Enter your email"
                    disabled={isLoading || googleLoading}
                    style={{ pointerEvents: 'auto' }}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm text-white flex items-center gap-2">
                    <Lock className="h-4 w-4" />
                    Password
                  </label>
                  <input
                    type="password"
                    value={signInData.password}
                    onChange={(e) => setSignInData(prev => ({ ...prev, password: e.target.value }))}
                    required
                    autoComplete="current-password"
                    className="w-full px-3 py-2 bg-black/30 border border-white/20 rounded-md text-white placeholder:text-white/60 focus:border-tusk-teal focus:outline-none"
                    placeholder="Enter your password"
                    disabled={isLoading || googleLoading}
                    style={{ pointerEvents: 'auto' }}
                  />
                </div>
                <button
                  type="submit"
                  className="w-full py-2 px-4 bg-tusk-teal hover:bg-tusk-accent text-black font-medium rounded-md transition-all disabled:opacity-50"
                  disabled={isLoading || googleLoading}
                  style={{ pointerEvents: 'auto', cursor: 'pointer' }}
                >
                  {isLoading ? "Signing in..." : "Sign In"}
                </button>
                
                <div className="relative my-4">
                  <div className="absolute inset-0 flex items-center">
                    <span className="w-full border-t border-white/20" />
                  </div>
                  <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-tusk-darkNavy px-2 text-white/60">Or continue with</span>
                  </div>
                </div>
                
                <button
                  type="button"
                  onClick={handleGoogleSignIn}
                  className="w-full py-2 px-4 border border-white/20 text-white hover:bg-white/10 rounded-md transition-all disabled:opacity-50 flex items-center justify-center gap-2"
                  disabled={googleLoading || isLoading}
                  style={{ pointerEvents: 'auto', cursor: 'pointer' }}
                >
                  <svg className="h-4 w-4" viewBox="0 0 488 512">
                    <path fill="currentColor" d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h240z"></path>
                  </svg>
                  {googleLoading ? "Connecting..." : "Sign in with Google"}
                </button>
              </form>
            ) : (
              <form onSubmit={handleSignUp} className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm text-white flex items-center gap-2">
                    <User className="h-4 w-4" />
                    Full Name *
                  </label>
                  <input
                    type="text"
                    value={signUpData.fullName}
                    onChange={(e) => setSignUpData(prev => ({ ...prev, fullName: e.target.value }))}
                    required
                    autoComplete="name"
                    className="w-full px-3 py-2 bg-black/30 border border-white/20 rounded-md text-white placeholder:text-white/60 focus:border-tusk-teal focus:outline-none"
                    placeholder="Enter your full name"
                    disabled={isLoading || googleLoading}
                    style={{ pointerEvents: 'auto' }}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm text-white">Company (Optional)</label>
                  <input
                    type="text"
                    value={signUpData.company}
                    onChange={(e) => setSignUpData(prev => ({ ...prev, company: e.target.value }))}
                    autoComplete="organization"
                    className="w-full px-3 py-2 bg-black/30 border border-white/20 rounded-md text-white placeholder:text-white/60 focus:border-tusk-teal focus:outline-none"
                    placeholder="Enter your company name"
                    disabled={isLoading || googleLoading}
                    style={{ pointerEvents: 'auto' }}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm text-white flex items-center gap-2">
                    <Mail className="h-4 w-4" />
                    Email *
                  </label>
                  <input
                    type="email"
                    value={signUpData.email}
                    onChange={(e) => setSignUpData(prev => ({ ...prev, email: e.target.value }))}
                    required
                    autoComplete="email"
                    className="w-full px-3 py-2 bg-black/30 border border-white/20 rounded-md text-white placeholder:text-white/60 focus:border-tusk-teal focus:outline-none"
                    placeholder="Enter your email"
                    disabled={isLoading || googleLoading}
                    style={{ pointerEvents: 'auto' }}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm text-white flex items-center gap-2">
                    <Lock className="h-4 w-4" />
                    Password *
                  </label>
                  <input
                    type="password"
                    value={signUpData.password}
                    onChange={(e) => setSignUpData(prev => ({ ...prev, password: e.target.value }))}
                    required
                    autoComplete="new-password"
                    className="w-full px-3 py-2 bg-black/30 border border-white/20 rounded-md text-white placeholder:text-white/60 focus:border-tusk-teal focus:outline-none"
                    placeholder="Create a strong password"
                    disabled={isLoading || googleLoading}
                    style={{ pointerEvents: 'auto' }}
                  />
                </div>
                <button
                  type="submit"
                  className="w-full py-2 px-4 bg-tusk-teal hover:bg-tusk-accent text-black font-medium rounded-md transition-all disabled:opacity-50"
                  disabled={isLoading || googleLoading}
                  style={{ pointerEvents: 'auto', cursor: 'pointer' }}
                >
                  {isLoading ? "Creating account..." : "Create Account"}
                </button>
                
                <div className="relative my-4">
                  <div className="absolute inset-0 flex items-center">
                    <span className="w-full border-t border-white/20" />
                  </div>
                  <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-tusk-darkNavy px-2 text-white/60">Or continue with</span>
                  </div>
                </div>
                
                <button
                  type="button"
                  onClick={handleGoogleSignIn}
                  className="w-full py-2 px-4 border border-white/20 text-white hover:bg-white/10 rounded-md transition-all disabled:opacity-50 flex items-center justify-center gap-2"
                  disabled={googleLoading || isLoading}
                  style={{ pointerEvents: 'auto', cursor: 'pointer' }}
                >
                  <svg className="h-4 w-4" viewBox="0 0 488 512">
                    <path fill="currentColor" d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h240z"></path>
                  </svg>
                  {googleLoading ? "Connecting..." : "Sign up with Google"}
                </button>
              </form>
            )}
            
            <div className="mt-6 text-center">
              <Link to="/" className="text-tusk-teal hover:text-tusk-accent text-sm">
                ← Back to Home
              </Link>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Auth;