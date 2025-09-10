
import React, { useState, useEffect } from 'react';

const stats = [
  {
    value: 95,
    suffix: "%",
    label: "Detection Accuracy",
    description: "AI-powered fraud detection with continuous learning"
  },
  {
    value: 60,
    suffix: "%",
    label: "Reduction in Fraud Resolution Time",
    description: "Automated response and real-time threat blocking"
  },
  {
    value: 70,
    suffix: "%",
    label: "Customer Interactions Managed by AI",
    description: "24/7 intelligent banking assistant support"
  },
  {
    value: 99.9,
    suffix: "%",
    label: "Platform Uptime",
    description: "Enterprise-grade reliability and performance"
  },
];

const AnimatedCounter = ({ value, suffix, duration = 2000 }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const increment = value / (duration / 16);
    const timer = setInterval(() => {
      start += increment;
      if (start >= value) {
        setCount(value);
        clearInterval(timer);
      } else {
        setCount(start);
      }
    }, 16);

    return () => clearInterval(timer);
  }, [value, duration]);

  return (
    <span className="text-4xl md:text-5xl font-bold text-tusk-teal">
      {count.toFixed(value % 1 !== 0 ? 1 : 0)}{suffix}
    </span>
  );
};

const StatsSection = () => {
  return (
    <section className="bg-tusk-navy text-white py-20 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-1/4 w-32 h-32 border border-tusk-teal/30 rounded-full animate-pulse"></div>
        <div className="absolute bottom-20 right-1/4 w-40 h-40 border border-tusk-teal/30 rounded-full animate-pulse" style={{ animationDelay: '1s' }}></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-3 py-1 mb-6 rounded-full border border-tusk-teal/40 bg-tusk-teal/10">
            <span className="mr-2 h-2 w-2 rounded-full bg-tusk-teal animate-pulse"></span>
            <span className="text-sm font-medium text-tusk-teal">Proven Results</span>
          </div>
          <h2 className="text-4xl font-bold mb-6">
            Measurable <span className="text-gradient">Impact</span>
          </h2>
          <p className="text-xl text-tusk-lightBlue max-w-3xl mx-auto">
            Our platform delivers consistent, measurable improvements for financial institutions worldwide. 
            Join thousands of satisfied customers who trust our AI-powered solutions.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div 
              key={index} 
              className="text-center group relative overflow-hidden bg-tusk-darkNavy/50 backdrop-blur-sm rounded-2xl p-8 border border-tusk-teal/20 hover:border-tusk-teal/60 transition-all duration-300"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-tusk-teal/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              
              <div className="relative z-10">
                <div className="mb-4">
                  <AnimatedCounter 
                    value={stat.value} 
                    suffix={stat.suffix}
                    duration={2000 + index * 200}
                  />
                </div>
                <div className="text-lg font-semibold text-white mb-2">
                  {stat.label}
                </div>
                <div className="text-sm text-tusk-lightBlue">
                  {stat.description}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <p className="text-tusk-lightBlue mb-6">
            Trusted by leading financial institutions worldwide
          </p>
          <div className="flex justify-center items-center gap-8 opacity-60">
            {['Bank of America', 'Chase', 'Wells Fargo', 'Citibank', 'Goldman Sachs'].map((bank, index) => (
              <div key={index} className="text-sm font-medium text-tusk-lightBlue">
                {bank}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
