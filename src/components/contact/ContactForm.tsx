import React, { useState } from 'react';
import { Check } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

const ContactForm = () => {
  const [submitted, setSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    subject: '',
    message: '',
    inquiryType: ''
  });
  const { toast } = useToast();
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted', formData);
    setIsLoading(true);
    
    try {
      const { error } = await supabase
        .from('contact_submissions')
        .insert([
          {
            name: formData.name,
            email: formData.email,
            company: formData.company || null,
            message: `Subject: ${formData.subject}\n\nInquiry Type: ${formData.inquiryType}\n\nMessage:\n${formData.message}`
          }
        ]);

      if (error) {
        throw error;
      }

      setSubmitted(true);
      toast({
        title: "Message sent successfully",
        description: "We'll get back to you as soon as possible.",
      });
    } catch (error) {
      console.error('Error submitting form:', error);
      toast({
        title: "Error sending message",
        description: "There was a problem sending your message. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    console.log(`Changing ${field} to:`, value);
    setFormData(prev => ({ ...prev, [field]: value }));
  };
  
  if (submitted) {
    return (
      <div style={{
        border: '1px solid rgba(255, 255, 255, 0.2)',
        backgroundColor: 'rgba(30, 41, 59, 0.8)',
        padding: '32px',
        borderRadius: '8px'
      }}>
        <div style={{ textAlign: 'center', padding: '32px' }}>
          <div style={{
            width: '64px',
            height: '64px',
            borderRadius: '50%',
            backgroundColor: 'rgba(20, 184, 166, 0.2)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto'
          }}>
            <Check style={{ height: '32px', width: '32px', color: '#14b8a6' }} />
          </div>
          <h3 style={{ 
            fontSize: '20px', 
            fontWeight: 'bold', 
            color: 'white', 
            marginTop: '16px', 
            marginBottom: '8px' 
          }}>
            Message Sent!
          </h3>
          <p style={{ color: '#94a3b8' }}>
            Thank you for contacting us. We've received your message and will respond as soon as possible.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div style={{
      border: '1px solid rgba(255, 255, 255, 0.2)',
      backgroundColor: 'rgba(30, 41, 59, 0.8)',
      padding: '32px',
      borderRadius: '8px',
      position: 'relative',
      zIndex: 10
    }}>
      <h2 style={{ 
        fontSize: '24px', 
        fontWeight: 'bold', 
        color: 'white', 
        marginBottom: '24px' 
      }}>
        Get in Touch
      </h2>
      
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
          <div>
            <label style={{ 
              display: 'block', 
              fontSize: '14px', 
              color: 'white', 
              marginBottom: '8px' 
            }}>
              Name
            </label>
            <input 
              type="text"
              required 
              value={formData.name}
              onChange={(e) => handleInputChange('name', e.target.value)}
              placeholder="John Smith"
              style={{
                width: '100%',
                height: '40px',
                padding: '8px 12px',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                backgroundColor: 'rgba(0, 0, 0, 0.3)',
                color: 'white',
                borderRadius: '6px',
                fontSize: '14px',
                outline: 'none',
                cursor: 'text'
              }}
              onFocus={(e) => {
                e.target.style.borderColor = '#14b8a6';
                e.target.style.boxShadow = '0 0 0 2px rgba(20, 184, 166, 0.2)';
              }}
              onBlur={(e) => {
                e.target.style.borderColor = 'rgba(255, 255, 255, 0.2)';
                e.target.style.boxShadow = 'none';
              }}
            />
          </div>
          <div>
            <label style={{ 
              display: 'block', 
              fontSize: '14px', 
              color: 'white', 
              marginBottom: '8px' 
            }}>
              Email
            </label>
            <input 
              type="email"
              required 
              value={formData.email}
              onChange={(e) => handleInputChange('email', e.target.value)}
              placeholder="john@example.com"
              style={{
                width: '100%',
                height: '40px',
                padding: '8px 12px',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                backgroundColor: 'rgba(0, 0, 0, 0.3)',
                color: 'white',
                borderRadius: '6px',
                fontSize: '14px',
                outline: 'none',
                cursor: 'text'
              }}
              onFocus={(e) => {
                e.target.style.borderColor = '#14b8a6';
                e.target.style.boxShadow = '0 0 0 2px rgba(20, 184, 166, 0.2)';
              }}
              onBlur={(e) => {
                e.target.style.borderColor = 'rgba(255, 255, 255, 0.2)';
                e.target.style.boxShadow = 'none';
              }}
            />
          </div>
        </div>
        
        <div>
          <label style={{ 
            display: 'block', 
            fontSize: '14px', 
            color: 'white', 
            marginBottom: '8px' 
          }}>
            Company (Optional)
          </label>
          <input 
            type="text"
            value={formData.company}
            onChange={(e) => handleInputChange('company', e.target.value)}
            placeholder="Your company name"
            style={{
              width: '100%',
              height: '40px',
              padding: '8px 12px',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              backgroundColor: 'rgba(0, 0, 0, 0.3)',
              color: 'white',
              borderRadius: '6px',
              fontSize: '14px',
              outline: 'none',
              cursor: 'text'
            }}
            onFocus={(e) => {
              e.target.style.borderColor = '#14b8a6';
              e.target.style.boxShadow = '0 0 0 2px rgba(20, 184, 166, 0.2)';
            }}
            onBlur={(e) => {
              e.target.style.borderColor = 'rgba(255, 255, 255, 0.2)';
              e.target.style.boxShadow = 'none';
            }}
          />
        </div>
        
        <div>
          <label style={{ 
            display: 'block', 
            fontSize: '14px', 
            color: 'white', 
            marginBottom: '8px' 
          }}>
            Inquiry Type
          </label>
          <select 
            value={formData.inquiryType} 
            onChange={(e) => handleInputChange('inquiryType', e.target.value)}
            style={{
              width: '100%',
              height: '40px',
              padding: '8px 12px',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              backgroundColor: 'rgba(0, 0, 0, 0.3)',
              color: 'white',
              borderRadius: '6px',
              fontSize: '14px',
              outline: 'none',
              cursor: 'pointer'
            }}
            onFocus={(e) => {
              e.target.style.borderColor = '#14b8a6';
              e.target.style.boxShadow = '0 0 0 2px rgba(20, 184, 166, 0.2)';
            }}
            onBlur={(e) => {
              e.target.style.borderColor = 'rgba(255, 255, 255, 0.2)';
              e.target.style.boxShadow = 'none';
            }}
          >
            <option value="">Select inquiry type</option>
            <option value="sales">Sales Inquiry</option>
            <option value="support">Technical Support</option>
            <option value="partnership">Partnership Opportunity</option>
            <option value="press">Press & Media</option>
            <option value="other">Other</option>
          </select>
        </div>
        
        <div>
          <label style={{ 
            display: 'block', 
            fontSize: '14px', 
            color: 'white', 
            marginBottom: '8px' 
          }}>
            Subject
          </label>
          <input 
            type="text"
            required 
            value={formData.subject}
            onChange={(e) => handleInputChange('subject', e.target.value)}
            placeholder="Brief subject of your message"
            style={{
              width: '100%',
              height: '40px',
              padding: '8px 12px',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              backgroundColor: 'rgba(0, 0, 0, 0.3)',
              color: 'white',
              borderRadius: '6px',
              fontSize: '14px',
              outline: 'none',
              cursor: 'text'
            }}
            onFocus={(e) => {
              e.target.style.borderColor = '#14b8a6';
              e.target.style.boxShadow = '0 0 0 2px rgba(20, 184, 166, 0.2)';
            }}
            onBlur={(e) => {
              e.target.style.borderColor = 'rgba(255, 255, 255, 0.2)';
              e.target.style.boxShadow = 'none';
            }}
          />
        </div>
        
        <div>
          <label style={{ 
            display: 'block', 
            fontSize: '14px', 
            color: 'white', 
            marginBottom: '8px' 
          }}>
            Message
          </label>
          <textarea 
            required
            value={formData.message}
            onChange={(e) => handleInputChange('message', e.target.value)}
            placeholder="How can we help you?"
            rows={6}
            style={{
              width: '100%',
              padding: '8px 12px',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              backgroundColor: 'rgba(0, 0, 0, 0.3)',
              color: 'white',
              borderRadius: '6px',
              fontSize: '14px',
              outline: 'none',
              resize: 'vertical',
              cursor: 'text',
              fontFamily: 'inherit'
            }}
            onFocus={(e) => {
              e.target.style.borderColor = '#14b8a6';
              e.target.style.boxShadow = '0 0 0 2px rgba(20, 184, 166, 0.2)';
            }}
            onBlur={(e) => {
              e.target.style.borderColor = 'rgba(255, 255, 255, 0.2)';
              e.target.style.boxShadow = 'none';
            }}
          />
        </div>
        
        <button 
          type="submit" 
          disabled={isLoading}
          style={{
            width: '100%',
            height: '40px',
            padding: '8px 16px',
            backgroundColor: isLoading ? '#6b7280' : '#14b8a6',
            color: 'black',
            border: 'none',
            borderRadius: '6px',
            fontSize: '14px',
            fontWeight: '500',
            cursor: isLoading ? 'not-allowed' : 'pointer',
            transition: 'background-color 0.2s'
          }}
          onMouseEnter={(e) => {
            if (!isLoading) {
              (e.target as HTMLButtonElement).style.backgroundColor = '#0d9488';
            }
          }}
          onMouseLeave={(e) => {
            if (!isLoading) {
              (e.target as HTMLButtonElement).style.backgroundColor = '#14b8a6';
            }
          }}
        >
          {isLoading ? "Sending..." : "Send Message"}
        </button>
      </form>
    </div>
  );
};

export default ContactForm;