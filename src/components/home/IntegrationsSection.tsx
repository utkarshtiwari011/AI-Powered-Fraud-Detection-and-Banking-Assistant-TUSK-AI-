
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle } from 'lucide-react';

const integrations = [
  { name: "Stripe", category: "Payments", logo: "🏦" },
  { name: "Plaid", category: "Banking APIs", logo: "💳" },
  { name: "Salesforce", category: "CRM", logo: "☁️" },
  { name: "Slack", category: "Communication", logo: "💬" },
  { name: "Webhook", category: "Real-time", logo: "🔗" },
  { name: "AWS", category: "Cloud", logo: "☁️" },
  { name: "Visa", category: "Card Networks", logo: "💰" },
  { name: "MasterCard", category: "Card Networks", logo: "💳" },
];

const IntegrationsSection = () => {
  return (
    <section className="py-20 bg-tusk-grey">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-6 text-tusk-navy">
            Seamless Integrations
          </h2>
          <p className="text-xl text-tusk-blue max-w-3xl mx-auto">
            Connect with your existing banking infrastructure, payment systems, and business tools through our comprehensive API.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
              {integrations.map((integration, index) => (
                <div 
                  key={index}
                  className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 text-center group hover:scale-105 transform transition-transform"
                >
                  <div className="text-3xl mb-3">{integration.logo}</div>
                  <div className="text-sm font-medium text-tusk-navy">{integration.name}</div>
                  <div className="text-xs text-tusk-blue mt-1">{integration.category}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-8">
            <div>
              <h3 className="text-2xl font-bold mb-4 text-tusk-navy">
                Built for Your Ecosystem
              </h3>
              <p className="text-tusk-blue mb-6">
                Our platform integrates seamlessly with your existing banking systems, payment processors, and business tools. Get up and running in minutes, not months.
              </p>
            </div>

            <div className="space-y-4">
              {[
                "RESTful API with comprehensive documentation",
                "Webhooks for real-time event notifications",
                "SDKs for popular programming languages",
                "Sandbox environment for testing",
                "24/7 developer support"
              ].map((feature, index) => (
                <div key={index} className="flex items-center gap-3">
                  <CheckCircle className="h-5 w-5 text-tusk-teal" />
                  <span className="text-tusk-navy">{feature}</span>
                </div>
              ))}
            </div>

            <Link 
              to="/documentation"
              className="inline-flex items-center gap-2 px-6 py-3 bg-tusk-teal text-black rounded-lg hover:bg-tusk-accent transition-colors duration-300 font-medium"
            >
              View API Documentation <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default IntegrationsSection;
