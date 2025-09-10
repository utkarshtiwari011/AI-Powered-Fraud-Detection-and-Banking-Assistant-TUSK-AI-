import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Checkbox } from '@/components/ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Shield, Mail, Lock, User, Building, AlertCircle, CheckCircle, Eye, EyeOff } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/hooks/useAuth';
import { PasswordStrengthIndicator } from '@/components/auth/PasswordStrengthIndicator';
import TwoFactorSetup from '@/components/auth/TwoFactorSetup';
import { validatePasswordStrength } from '@/utils/passwordStrength';
import Layout from '@/components/layout/Layout';

const EnhancedAuth = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('signin');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [show2FASetup, setShow2FASetup] = useState(false);
  
  // Sign in form state
  const [signInData, setSignInData] = useState({
    email: '',
    password: ''
  });
  
  // Enhanced sign up form state
  const [signUpData, setSignUpData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    fullName: '',
    company: '',
    department: '',
    position: '',
    phone: '',
    employeeId: '',
    securityClearance: 'standard',
    acceptTerms: false,
    acceptPrivacy: false,
    complianceTraining: false
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

  const validateSignUpForm = (): boolean => {
    const { password, confirmPassword, email, fullName, acceptTerms, acceptPrivacy } = signUpData;
    
    // Basic required fields
    if (!email || !password || !fullName) {
      toast({
        title: "Missing Required Fields",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return false;
    }
    
    // Password confirmation
    if (password !== confirmPassword) {
      toast({
        title: "Password Mismatch",
        description: "Passwords do not match.",
        variant: "destructive",
      });
      return false;
    }
    
    // Password strength validation
    const passwordStrength = validatePasswordStrength(password);
    if (!passwordStrength.isValid) {
      toast({
        title: "Password Too Weak",
        description: "Please create a stronger password that meets our security requirements.",
        variant: "destructive",
      });
      return false;
    }
    
    // Terms and privacy acceptance
    if (!acceptTerms || !acceptPrivacy) {
      toast({
        title: "Accept Terms & Privacy",
        description: "You must accept the Terms of Service and Privacy Policy to continue.",
        variant: "destructive",
      });
      return false;
    }
    
    return true;
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateSignUpForm()) return;
    
    setIsLoading(true);

    try {
      // Check if account is locked first
      const lockCheck = await supabase.rpc('is_account_locked', { 
        user_email: signUpData.email 
      });
      
      if (lockCheck.data) {
        toast({
          title: "Account Locked",
          description: "This account is temporarily locked due to security reasons. Please try again later.",
          variant: "destructive",
        });
        return;
      }

      const { data, error } = await supabase.auth.signUp({
        email: signUpData.email,
        password: signUpData.password,
        options: {
          emailRedirectTo: `${window.location.origin}/`,
          data: {
            full_name: signUpData.fullName,
            company: signUpData.company,
            department: signUpData.department,
            position: signUpData.position,
            phone: signUpData.phone,
            employee_id: signUpData.employeeId,
            security_clearance: signUpData.securityClearance,
            terms_accepted_at: new Date().toISOString(),
            privacy_accepted_at: new Date().toISOString(),
            compliance_training_completed: signUpData.complianceTraining
          }
        }
      });

      if (error) {
        toast({
          title: "Sign up failed",
          description: error.message,
          variant: "destructive",
        });
      } else if (data.user) {
        toast({
          title: "Account Created Successfully!",
          description: "Please check your email for verification instructions.",
        });
        
        // Show 2FA setup after successful registration
        setShow2FASetup(true);
      }
    } catch (error) {
      console.error('Sign up error:', error);
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
        title: "Missing Information",
        description: "Please enter both email and password.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);

    try {
      // Check if account is locked first
      const lockCheck = await supabase.rpc('is_account_locked', { 
        user_email: signInData.email 
      });
      
      if (lockCheck.data) {
        toast({
          title: "Account Locked",
          description: "This account is temporarily locked due to multiple failed login attempts. Please try again later.",
          variant: "destructive",
        });
        return;
      }

      const { data, error } = await supabase.auth.signInWithPassword({
        email: signInData.email,
        password: signInData.password,
      });

      if (error) {
        // Handle failed login
        await supabase.rpc('handle_failed_login', { 
          user_email: signInData.email 
        });
        
        toast({
          title: "Sign in failed",
          description: error.message,
          variant: "destructive",
        });
      } else {
        // Reset failed attempts on successful login
        await supabase.rpc('reset_failed_attempts', { 
          user_email: signInData.email 
        });
        
        toast({
          title: "Welcome back!",
          description: "You have been signed in successfully.",
        });
        
        setSignInData({ email: '', password: '' });
      }
    } catch (error) {
      console.error('Sign in error:', error);
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
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/`,
        }
      });

      if (error) {
        toast({
          title: "Google sign in failed",
          description: error.message,
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error('Google sign in error:', error);
      toast({
        title: "Error",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive",
      });
    } finally {
      setGoogleLoading(false);
    }
  };

  if (show2FASetup) {
    return (
      <Layout>
        <div className="min-h-screen flex items-center justify-center py-16 px-4">
          <TwoFactorSetup
            onComplete={() => {
              setShow2FASetup(false);
              navigate('/');
            }}
            onSkip={() => {
              setShow2FASetup(false);
              navigate('/');
            }}
          />
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="min-h-screen flex items-center justify-center py-16 px-4">
        <div className="w-full max-w-lg mx-auto">
          <div className="text-center mb-8">
            <div className="flex items-center justify-center gap-2 mb-4">
              <div className="relative">
                <div className="absolute -inset-1 bg-gradient-to-r from-tusk-teal to-tusk-accent opacity-30 rounded-full blur"></div>
                <Shield className="h-8 w-8 text-tusk-teal relative" />
              </div>
              <span className="text-2xl font-bold text-white">TUSK AI</span>
            </div>
            <h1 className="text-3xl font-bold text-white mb-2">Enterprise Security</h1>
            <p className="text-tusk-lightBlue">Secure access to AI-powered fintech solutions</p>
          </div>

          <div className="bg-tusk-darkNavy/80 backdrop-blur-xl border border-tusk-teal/30 rounded-xl p-6 relative z-10">
            <div className="text-center mb-6">
              <h2 className="text-xl font-bold text-white">Authentication Portal</h2>
              <p className="text-tusk-lightBlue">Access your secure banking AI platform</p>
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
                  Register
                </button>
              </div>
            </div>

            {activeTab === 'signin' ? (
              <form onSubmit={handleSignIn} className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm text-white flex items-center gap-2">
                    <Mail className="h-4 w-4" />
                    Corporate Email
                  </label>
                  <Input
                    type="email"
                    value={signInData.email}
                    onChange={(e) => setSignInData(prev => ({ ...prev, email: e.target.value }))}
                    required
                    autoComplete="email"
                    className="bg-black/30 border-white/20 text-white placeholder:text-white/60 focus:border-tusk-teal"
                    placeholder="your@company.com"
                    disabled={isLoading || googleLoading}
                  />
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm text-white flex items-center gap-2">
                    <Lock className="h-4 w-4" />
                    Password
                  </label>
                  <div className="relative">
                    <Input
                      type={showPassword ? "text" : "password"}
                      value={signInData.password}
                      onChange={(e) => setSignInData(prev => ({ ...prev, password: e.target.value }))}
                      required
                      autoComplete="current-password"
                      className="bg-black/30 border-white/20 text-white placeholder:text-white/60 focus:border-tusk-teal pr-10"
                      placeholder="Enter your secure password"
                      disabled={isLoading || googleLoading}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white/60 hover:text-white"
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                </div>
                
                <Button
                  type="submit"
                  className="w-full bg-tusk-teal hover:bg-tusk-accent text-black font-medium"
                  disabled={isLoading || googleLoading}
                >
                  {isLoading ? "Authenticating..." : "Secure Sign In"}
                </Button>
                
                <div className="relative my-4">
                  <div className="absolute inset-0 flex items-center">
                    <span className="w-full border-t border-white/20" />
                  </div>
                  <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-tusk-darkNavy px-2 text-white/60">Or continue with</span>
                  </div>
                </div>
                
                <Button
                  type="button"
                  onClick={handleGoogleSignIn}
                  variant="outline"
                  className="w-full border-white/20 text-white hover:bg-white/10"
                  disabled={googleLoading || isLoading}
                >
                  <svg className="h-4 w-4 mr-2" viewBox="0 0 488 512">
                    <path fill="currentColor" d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h240z"></path>
                  </svg>
                  {googleLoading ? "Connecting..." : "Google SSO"}
                </Button>
              </form>
            ) : (
              <form onSubmit={handleSignUp} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm text-white flex items-center gap-2">
                      <User className="h-4 w-4" />
                      Full Name *
                    </label>
                    <Input
                      type="text"
                      value={signUpData.fullName}
                      onChange={(e) => setSignUpData(prev => ({ ...prev, fullName: e.target.value }))}
                      required
                      className="bg-black/30 border-white/20 text-white placeholder:text-white/60 focus:border-tusk-teal"
                      placeholder="John Doe"
                      disabled={isLoading || googleLoading}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm text-white">Position</label>
                    <Input
                      type="text"
                      value={signUpData.position}
                      onChange={(e) => setSignUpData(prev => ({ ...prev, position: e.target.value }))}
                      className="bg-black/30 border-white/20 text-white placeholder:text-white/60 focus:border-tusk-teal"
                      placeholder="Risk Manager"
                      disabled={isLoading || googleLoading}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm text-white flex items-center gap-2">
                      <Building className="h-4 w-4" />
                      Company *
                    </label>
                    <Input
                      type="text"
                      value={signUpData.company}
                      onChange={(e) => setSignUpData(prev => ({ ...prev, company: e.target.value }))}
                      required
                      className="bg-black/30 border-white/20 text-white placeholder:text-white/60 focus:border-tusk-teal"
                      placeholder="Acme Bank"
                      disabled={isLoading || googleLoading}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm text-white">Department</label>
                    <Input
                      type="text"
                      value={signUpData.department}
                      onChange={(e) => setSignUpData(prev => ({ ...prev, department: e.target.value }))}
                      className="bg-black/30 border-white/20 text-white placeholder:text-white/60 focus:border-tusk-teal"
                      placeholder="Risk & Compliance"
                      disabled={isLoading || googleLoading}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm text-white">Employee ID</label>
                    <Input
                      type="text"
                      value={signUpData.employeeId}
                      onChange={(e) => setSignUpData(prev => ({ ...prev, employeeId: e.target.value }))}
                      className="bg-black/30 border-white/20 text-white placeholder:text-white/60 focus:border-tusk-teal"
                      placeholder="EMP001"
                      disabled={isLoading || googleLoading}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm text-white">Security Clearance</label>
                    <Select value={signUpData.securityClearance} onValueChange={(value) => setSignUpData(prev => ({ ...prev, securityClearance: value }))}>
                      <SelectTrigger className="bg-black/30 border-white/20 text-white">
                        <SelectValue placeholder="Select clearance" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="standard">Standard</SelectItem>
                        <SelectItem value="elevated">Elevated</SelectItem>
                        <SelectItem value="high">High</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm text-white flex items-center gap-2">
                    <Mail className="h-4 w-4" />
                    Corporate Email *
                  </label>
                  <Input
                    type="email"
                    value={signUpData.email}
                    onChange={(e) => setSignUpData(prev => ({ ...prev, email: e.target.value }))}
                    required
                    className="bg-black/30 border-white/20 text-white placeholder:text-white/60 focus:border-tusk-teal"
                    placeholder="your@company.com"
                    disabled={isLoading || googleLoading}
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm text-white">Phone Number</label>
                  <Input
                    type="tel"
                    value={signUpData.phone}
                    onChange={(e) => setSignUpData(prev => ({ ...prev, phone: e.target.value }))}
                    className="bg-black/30 border-white/20 text-white placeholder:text-white/60 focus:border-tusk-teal"
                    placeholder="+1 (555) 123-4567"
                    disabled={isLoading || googleLoading}
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm text-white flex items-center gap-2">
                    <Lock className="h-4 w-4" />
                    Password *
                  </label>
                  <div className="relative">
                    <Input
                      type={showPassword ? "text" : "password"}
                      value={signUpData.password}
                      onChange={(e) => setSignUpData(prev => ({ ...prev, password: e.target.value }))}
                      required
                      className="bg-black/30 border-white/20 text-white placeholder:text-white/60 focus:border-tusk-teal pr-10"
                      placeholder="Create enterprise-grade password"
                      disabled={isLoading || googleLoading}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white/60 hover:text-white"
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                  <PasswordStrengthIndicator password={signUpData.password} />
                </div>

                <div className="space-y-2">
                  <label className="text-sm text-white">Confirm Password *</label>
                  <div className="relative">
                    <Input
                      type={showConfirmPassword ? "text" : "password"}
                      value={signUpData.confirmPassword}
                      onChange={(e) => setSignUpData(prev => ({ ...prev, confirmPassword: e.target.value }))}
                      required
                      className="bg-black/30 border-white/20 text-white placeholder:text-white/60 focus:border-tusk-teal pr-10"
                      placeholder="Confirm your password"
                      disabled={isLoading || googleLoading}
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white/60 hover:text-white"
                    >
                      {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                  {signUpData.confirmPassword && signUpData.password !== signUpData.confirmPassword && (
                    <p className="text-xs text-destructive flex items-center gap-1">
                      <AlertCircle className="h-3 w-3" />
                      Passwords do not match
                    </p>
                  )}
                </div>

                <div className="space-y-3 pt-4 border-t border-white/20">
                  <div className="flex items-start space-x-2">
                    <Checkbox
                      id="terms"
                      checked={signUpData.acceptTerms}
                      onCheckedChange={(checked) => setSignUpData(prev => ({ ...prev, acceptTerms: checked as boolean }))}
                      className="border-white/20"
                    />
                    <label htmlFor="terms" className="text-sm text-white leading-relaxed">
                      I accept the <Link to="/terms" className="text-tusk-teal hover:underline">Terms of Service</Link> and understand the financial data processing requirements *
                    </label>
                  </div>

                  <div className="flex items-start space-x-2">
                    <Checkbox
                      id="privacy"
                      checked={signUpData.acceptPrivacy}
                      onCheckedChange={(checked) => setSignUpData(prev => ({ ...prev, acceptPrivacy: checked as boolean }))}
                      className="border-white/20"
                    />
                    <label htmlFor="privacy" className="text-sm text-white leading-relaxed">
                      I accept the <Link to="/privacy" className="text-tusk-teal hover:underline">Privacy Policy</Link> and consent to secure data handling *
                    </label>
                  </div>

                  <div className="flex items-start space-x-2">
                    <Checkbox
                      id="compliance"
                      checked={signUpData.complianceTraining}
                      onCheckedChange={(checked) => setSignUpData(prev => ({ ...prev, complianceTraining: checked as boolean }))}
                      className="border-white/20"
                    />
                    <label htmlFor="compliance" className="text-sm text-white leading-relaxed">
                      I have completed required compliance and security training
                    </label>
                  </div>
                </div>

                <Button
                  type="submit"
                  className="w-full bg-tusk-teal hover:bg-tusk-accent text-black font-medium"
                  disabled={isLoading || googleLoading}
                >
                  {isLoading ? "Creating Secure Account..." : "Create Enterprise Account"}
                </Button>
                
                <div className="relative my-4">
                  <div className="absolute inset-0 flex items-center">
                    <span className="w-full border-t border-white/20" />
                  </div>
                  <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-tusk-darkNavy px-2 text-white/60">Or register with</span>
                  </div>
                </div>
                
                <Button
                  type="button"
                  onClick={handleGoogleSignIn}
                  variant="outline"
                  className="w-full border-white/20 text-white hover:bg-white/10"
                  disabled={googleLoading || isLoading}
                >
                  <svg className="h-4 w-4 mr-2" viewBox="0 0 488 512">
                    <path fill="currentColor" d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h240z"></path>
                  </svg>
                  {googleLoading ? "Connecting..." : "Google Workspace SSO"}
                </Button>
              </form>
            )}
            
            <div className="mt-6 text-center">
              <Link to="/" className="text-tusk-teal hover:text-tusk-accent text-sm">
                ← Back to Platform
              </Link>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default EnhancedAuth;