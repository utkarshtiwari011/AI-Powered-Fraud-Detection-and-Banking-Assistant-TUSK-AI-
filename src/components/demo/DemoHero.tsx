
import React from 'react';

const DemoHero = () => {
  return (
    <section className="py-24 gradient-bg text-white">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center px-3 py-1 mb-6 rounded-full border border-tusk-teal/40 bg-tusk-teal/10">
            <span className="mr-2 h-2 w-2 rounded-full bg-tusk-teal animate-pulse-glow"></span>
            <span className="text-sm font-medium text-tusk-teal">Interactive Demo</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Experience <span className="text-gradient">TUSK AI</span> in Action
          </h1>
          <p className="text-xl text-tusk-lightBlue mb-8">
            See firsthand how our AI technology detects fraud and assists banking customers in real-time.
          </p>
        </div>
      </div>
    </section>
  );
};

export default DemoHero;
