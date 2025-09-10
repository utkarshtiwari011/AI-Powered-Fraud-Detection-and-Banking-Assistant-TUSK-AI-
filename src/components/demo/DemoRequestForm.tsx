import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { CalendarIcon, Check } from 'lucide-react';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

const DemoRequestForm = () => {
  const [submitted, setSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [date, setDate] = useState<Date>();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    phone: '',
    useCase: '',
    companySize: '',
    notes: ''
  });
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      const { error } = await supabase
        .from('demo_requests')
        .insert([
          {
            name: formData.name,
            email: formData.email,
            company: formData.company,
            phone: formData.phone || null,
            use_case: formData.useCase || null,
            company_size: formData.companySize || null,
            preferred_date: date ? format(date, 'yyyy-MM-dd') : null,
            notes: formData.notes || null
          }
        ]);

      if (error) {
        throw error;
      }

      setSubmitted(true);
      toast({
        title: "Demo request submitted!",
        description: "Our team will contact you within 24 hours to schedule your personalized demo.",
      });
    } catch (error) {
      console.error('Error submitting demo request:', error);
      toast({
        title: "Error submitting request",
        description: "There was a problem submitting your demo request. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  if (submitted) {
    return (
      <div className="tech-border bg-tusk-darkNavy/80 backdrop-blur-xl p-8">
        <div className="text-center">
          <div className="w-16 h-16 rounded-full bg-tusk-teal/20 flex items-center justify-center mx-auto mb-4">
            <Check className="h-8 w-8 text-tusk-teal" />
          </div>
          <h3 className="text-xl font-bold text-white mb-2">Demo Request Submitted!</h3>
          <p className="text-tusk-lightBlue mb-4">
            Thank you for your interest in TUSK AI. Our team will review your request and contact you within 24 hours to schedule your personalized demo.
          </p>
          <p className="text-sm text-tusk-lightBlue">
            In the meantime, you can explore our documentation and see our fraud detection algorithm in action.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-tusk-darkNavy/80 backdrop-blur-xl border border-tusk-teal/30 rounded-xl p-8 relative z-10">
      <h2 className="text-2xl font-bold text-white mb-6">Request a Personalized Demo</h2>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-sm text-white">Full Name *</label>
            <input
              type="text"
              required 
              value={formData.name}
              onChange={(e) => handleInputChange('name', e.target.value)}
              className="w-full px-3 py-2 bg-black/30 border border-white/20 rounded-md text-white placeholder:text-white/60 focus:border-tusk-teal focus:outline-none"
              placeholder="Your full name"
              disabled={isLoading}
              style={{ pointerEvents: 'auto' }}
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm text-white">Email *</label>
            <input
              type="email"
              required 
              value={formData.email}
              onChange={(e) => handleInputChange('email', e.target.value)}
              className="w-full px-3 py-2 bg-black/30 border border-white/20 rounded-md text-white placeholder:text-white/60 focus:border-tusk-teal focus:outline-none"
              placeholder="your.email@company.com"
              disabled={isLoading}
              style={{ pointerEvents: 'auto' }}
            />
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-sm text-white">Company *</label>
            <input
              type="text"
              required 
              value={formData.company}
              onChange={(e) => handleInputChange('company', e.target.value)}
              className="w-full px-3 py-2 bg-black/30 border border-white/20 rounded-md text-white placeholder:text-white/60 focus:border-tusk-teal focus:outline-none"
              placeholder="Your company name"
              disabled={isLoading}
              style={{ pointerEvents: 'auto' }}
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm text-white">Phone (Optional)</label>
            <input
              type="tel"
              value={formData.phone}
              onChange={(e) => handleInputChange('phone', e.target.value)}
              className="w-full px-3 py-2 bg-black/30 border border-white/20 rounded-md text-white placeholder:text-white/60 focus:border-tusk-teal focus:outline-none"
              placeholder="+91 98765 43210"
              disabled={isLoading}
              style={{ pointerEvents: 'auto' }}
            />
          </div>
        </div>
        
        <div className="space-y-2">
          <label className="text-sm text-white">Company Size</label>
          <div className="relative">
            <select
              value={formData.companySize}
              onChange={(e) => handleInputChange('companySize', e.target.value)}
              className="w-full px-3 py-2 bg-black/30 border border-white/20 rounded-md text-white focus:border-tusk-teal focus:outline-none appearance-none"
              disabled={isLoading}
              style={{ pointerEvents: 'auto' }}
            >
              <option value="" className="bg-tusk-navy text-white">Select company size</option>
              <option value="startup" className="bg-tusk-navy text-white">Startup (1-10 employees)</option>
              <option value="small" className="bg-tusk-navy text-white">Small Business (11-50 employees)</option>
              <option value="medium" className="bg-tusk-navy text-white">Medium Business (51-200 employees)</option>
              <option value="large" className="bg-tusk-navy text-white">Large Enterprise (201-1000 employees)</option>
              <option value="enterprise" className="bg-tusk-navy text-white">Enterprise (1000+ employees)</option>
            </select>
            <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
              <svg className="w-4 h-4 text-white/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
              </svg>
            </div>
          </div>
        </div>
        
        <div className="space-y-2">
          <label className="text-sm text-white">Primary Use Case</label>
          <div className="relative">
            <select
              value={formData.useCase}
              onChange={(e) => handleInputChange('useCase', e.target.value)}
              className="w-full px-3 py-2 bg-black/30 border border-white/20 rounded-md text-white focus:border-tusk-teal focus:outline-none appearance-none"
              disabled={isLoading}
              style={{ pointerEvents: 'auto' }}
            >
              <option value="" className="bg-tusk-navy text-white">What's your main interest?</option>
              <option value="fraud-detection" className="bg-tusk-navy text-white">AI Fraud Detection</option>
              <option value="banking-assistant" className="bg-tusk-navy text-white">Banking Assistant</option>
              <option value="risk-management" className="bg-tusk-navy text-white">Risk Management</option>
              <option value="customer-service" className="bg-tusk-navy text-white">Customer Service Automation</option>
              <option value="compliance" className="bg-tusk-navy text-white">Compliance & Monitoring</option>
              <option value="integration" className="bg-tusk-navy text-white">API Integration</option>
              <option value="other" className="bg-tusk-navy text-white">Other</option>
            </select>
            <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
              <svg className="w-4 h-4 text-white/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
              </svg>
            </div>
          </div>
        </div>
        
        <div className="space-y-2">
          <label className="text-sm text-white">Preferred Demo Date (Optional)</label>
          <input
            type="date"
            value={date ? format(date, 'yyyy-MM-dd') : ''}
            onChange={(e) => setDate(e.target.value ? new Date(e.target.value) : undefined)}
            min={format(new Date(), 'yyyy-MM-dd')}
            className="w-full px-3 py-2 bg-black/30 border border-white/20 rounded-md text-white focus:border-tusk-teal focus:outline-none"
            disabled={isLoading}
            style={{ pointerEvents: 'auto' }}
          />
        </div>
        
        <div className="space-y-2">
          <label className="text-sm text-white">Additional Notes (Optional)</label>
          <textarea
            value={formData.notes}
            onChange={(e) => handleInputChange('notes', e.target.value)}
            className="w-full px-3 py-2 bg-black/30 border border-white/20 rounded-md text-white placeholder:text-white/60 focus:border-tusk-teal focus:outline-none min-h-[100px] resize-y"
            placeholder="Tell us more about your specific needs or questions..."
            disabled={isLoading}
            style={{ pointerEvents: 'auto' }}
          />
        </div>
        
        <button
          type="submit"
          disabled={isLoading}
          className="w-full py-3 px-4 bg-tusk-teal hover:bg-tusk-accent text-black font-medium rounded-md transition-all disabled:opacity-50"
          style={{ pointerEvents: 'auto', cursor: 'pointer' }}
        >
          {isLoading ? "Submitting Request..." : "Schedule Demo"}
        </button>
      </form>
    </div>
  );
};

export default DemoRequestForm;