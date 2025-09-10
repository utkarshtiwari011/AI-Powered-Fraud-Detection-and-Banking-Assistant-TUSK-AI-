
import React from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqItems = [
  {
    question: "How does your pricing model work?",
    answer: "Our pricing is based on the size of your financial institution and transaction volume. All plans include core fraud detection and banking assistant features, with higher tiers adding more customization, support, and volume capacity."
  },
  {
    question: "Can I upgrade or downgrade my plan later?",
    answer: "Yes, you can upgrade your plan at any time. Downgrades can be processed at the end of your current billing cycle. Our team will help ensure a smooth transition."
  },
  {
    question: "Do you offer a free trial?",
    answer: "We offer a 30-day pilot program for qualified financial institutions that allows you to test our platform with a limited set of transactions before committing to a full implementation."
  },
  {
    question: "What kind of support is included?",
    answer: "All plans include technical support, with varying levels of availability. Starter plans include standard 8/5 support, Professional plans include 24/7 priority support, and Enterprise plans include a dedicated support manager."
  },
  {
    question: "Are there any hidden fees?",
    answer: "No, our pricing is transparent. The plans include all features listed. The only additional costs would be for significant custom development work or transaction volumes that greatly exceed your plan's limits."
  },
  {
    question: "Do you offer special pricing for startups or non-profits?",
    answer: "Yes, we have special programs for fintech startups and non-profit financial institutions. Contact our sales team to learn more about these opportunities."
  }
];

const PricingFAQ = () => {
  return (
    <div className="mt-20">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-white mb-2">Frequently Asked Questions</h2>
        <p className="text-tusk-lightBlue">
          Common questions about our pricing and plans
        </p>
      </div>
      
      <div className="max-w-3xl mx-auto">
        <Accordion type="single" collapsible className="space-y-4">
          {faqItems.map((item, index) => (
            <AccordionItem 
              key={index} 
              value={`item-${index}`}
              className="border border-white/10 rounded-lg bg-tusk-darkNavy/50 px-6 overflow-hidden"
            >
              <AccordionTrigger className="text-white hover:text-tusk-teal hover:no-underline py-4">
                {item.question}
              </AccordionTrigger>
              <AccordionContent className="text-tusk-lightBlue pb-4">
                {item.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
        
        <div className="mt-8 text-center">
          <p className="text-tusk-lightBlue mb-2">
            Still have questions about our pricing?
          </p>
          <a 
            href="/contact" 
            className="text-tusk-teal hover:text-tusk-accent underline transition-colors"
          >
            Contact our sales team
          </a>
        </div>
      </div>
    </div>
  );
};

export default PricingFAQ;
