
import React from 'react';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';

const ContactInfo = () => {
  return (
    <div className="tech-border bg-tusk-darkNavy/80 backdrop-blur-xl p-8 mb-8">
      <h2 className="text-2xl font-bold text-white mb-6">Contact Information</h2>
      
      <div className="space-y-6">
        <div className="flex items-start gap-4">
          <div className="bg-tusk-teal/10 p-3 rounded-full">
            <MapPin className="h-6 w-6 text-tusk-teal" />
          </div>
          <div>
            <h3 className="text-white font-medium mb-1">Headquarters</h3>
            <p className="text-tusk-lightBlue">
              Innovation Hub, Block-A<br />
              Kalyanpur, Kanpur 208017<br />
              Uttar Pradesh, India
            </p>
          </div>
        </div>
        
        <div className="flex items-start gap-4">
          <div className="bg-tusk-teal/10 p-3 rounded-full">
            <Phone className="h-6 w-6 text-tusk-teal" />
          </div>
          <div>
            <h3 className="text-white font-medium mb-1">Phone</h3>
            <p className="text-tusk-lightBlue">
              <a href="tel:+91-512-2876543" className="hover:text-tusk-teal transition-colors">+91 (512) 287-6543</a><br />
              <a href="tel:+91-9876543210" className="hover:text-tusk-teal transition-colors">+91 98765-43210</a>
            </p>
          </div>
        </div>
        
        <div className="flex items-start gap-4">
          <div className="bg-tusk-teal/10 p-3 rounded-full">
            <Mail className="h-6 w-6 text-tusk-teal" />
          </div>
          <div>
            <h3 className="text-white font-medium mb-1">Email</h3>
            <p className="text-tusk-lightBlue">
              <a href="mailto:info@tusk-ai.com" className="hover:text-tusk-teal transition-colors">info@tusk-ai.com</a><br />
              <a href="mailto:support@tusk-ai.com" className="hover:text-tusk-teal transition-colors">support@tusk-ai.com</a>
            </p>
          </div>
        </div>
        
        <div className="flex items-start gap-4">
          <div className="bg-tusk-teal/10 p-3 rounded-full">
            <Clock className="h-6 w-6 text-tusk-teal" />
          </div>
          <div>
            <h3 className="text-white font-medium mb-1">Business Hours</h3>
            <p className="text-tusk-lightBlue">
              Monday - Friday: 9:00 AM - 6:00 PM IST<br />
              Technical Support: 24/7/365<br />
              Saturday: 10:00 AM - 4:00 PM IST
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactInfo;
