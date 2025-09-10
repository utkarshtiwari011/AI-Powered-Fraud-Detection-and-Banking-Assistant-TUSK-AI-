
import React, { useRef, useEffect, useState } from 'react';

const roadmapItems = [
  {
    year: "2023",
    title: "Project Inception",
    description: "TUSK AI was conceived by a team of college students in their 2nd year, recognizing the growing need for intelligent fraud detection in banking.",
    icon: "🚀"
  },
  {
    year: "2023",
    title: "Initial Research & Development",
    description: "Deep dive into machine learning algorithms, fraud detection patterns, and banking security requirements. First prototype development.",
    icon: "🔬"
  },
  {
    year: "2024",
    title: "AI Model Development",
    description: "Built and trained our core fraud detection engine using advanced neural networks and real-world transaction datasets.",
    icon: "🧠"
  },
  {
    year: "2024",
    title: "Banking Assistant Integration",
    description: "Developed the conversational AI component with natural language processing capabilities for customer service automation.",
    icon: "💬"
  },
  {
    year: "2024",
    title: "Platform Beta Launch",
    description: "Released beta version with core fraud detection and customer service features. Initial testing with select financial institutions.",
    icon: "🚀"
  },
  {
    year: "2025",
    title: "Production Ready Platform",
    description: "Full-scale platform launch with enterprise-grade security, real-time processing, and comprehensive analytics dashboard.",
    icon: "🎯"
  },
  {
    year: "2025+",
    title: "Future Innovations",
    description: "Expanding into quantum-resistant encryption, advanced behavioral analytics, and global compliance frameworks.",
    icon: "🔮"
  }
];

const RoadmapSection = () => {
  const [visibleItems, setVisibleItems] = useState<number[]>([]);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          const index = itemRefs.current.findIndex(ref => ref === entry.target);
          if (entry.isIntersecting && index !== -1 && !visibleItems.includes(index)) {
            setVisibleItems(prev => [...prev, index]);
          }
        });
      },
      { threshold: 0.3 }
    );
    
    itemRefs.current.forEach(ref => {
      if (ref) observer.observe(ref);
    });
    
    return () => observer.disconnect();
  }, [visibleItems]);

  return (
    <section className="py-20 bg-tusk-darkNavy">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold mb-4 text-white">Our Journey</h2>
          <p className="text-tusk-lightBlue text-lg max-w-2xl mx-auto">
            From college innovation to industry-leading AI platform
          </p>
        </div>
        
        <div className="relative">
          {/* Vertical timeline line */}
          <div className="absolute top-0 bottom-0 left-1/2 w-px bg-gradient-to-b from-tusk-teal via-tusk-accent to-tusk-teal transform -translate-x-1/2"></div>
          
          {roadmapItems.map((item, index) => (
            <div 
              key={index} 
              ref={el => itemRefs.current[index] = el}
              className={`relative flex items-center mb-16 last:mb-0 transition-all duration-1000 ${
                visibleItems.includes(index) ? 'opacity-100' : 'opacity-0 translate-y-10'
              }`}
            >
              <div className={`w-1/2 pr-12 text-right ${index % 2 === 1 ? 'md:order-2 md:text-left md:pl-12 md:pr-0' : ''}`}>
                <div className="text-tusk-teal font-bold text-xl mb-2">{item.year}</div>
                <h3 className="text-white text-2xl font-bold mb-2">{item.title}</h3>
                <p className="text-tusk-lightBlue">{item.description}</p>
              </div>
              
              <div className="absolute left-1/2 transform -translate-x-1/2 w-12 h-12 rounded-full bg-tusk-darkNavy border-2 border-tusk-teal/50 flex items-center justify-center text-2xl z-10">
                {item.icon}
              </div>
              
              <div className={`w-1/2 pl-12 ${index % 2 === 1 ? 'md:order-1 md:pr-12 md:pl-0 md:text-right' : 'invisible md:visible'}`}>
                {index % 2 === 0 ? (
                  <span className="hidden md:inline text-tusk-lightBlue/30">●</span>
                ) : (
                  <>
                    <div className="text-tusk-teal font-bold text-xl mb-2 md:hidden">{item.year}</div>
                    <h3 className="text-white text-2xl font-bold mb-2 md:hidden">{item.title}</h3>
                    <p className="text-tusk-lightBlue md:hidden">{item.description}</p>
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default RoadmapSection;
