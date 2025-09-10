
import React from 'react';

const teamMembers = [
  {
    name: "Alexandra Chen",
    role: "Chief Executive Officer",
    bio: "Former Head of Digital Banking at Global Trust, Alex brings 15+ years of experience in fintech innovation.",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=300&q=80"
  },
  {
    name: "Marcus Johnson",
    role: "Chief Technology Officer",
    bio: "Ph.D. in Machine Learning from MIT, previously led fraud detection systems at PaySecure.",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=300&q=80"
  },
  {
    name: "Sophia Wang",
    role: "Head of AI Research",
    bio: "Renowned researcher in NLP and transaction pattern recognition with 40+ published papers.",
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=300&q=80"
  },
  {
    name: "Jamal Adeyemi",
    role: "Chief Security Officer",
    bio: "Former cybersecurity lead at Central Bank of Nigeria with expertise in financial system protection.",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=300&q=80"
  },
  {
    name: "Elena Rodriguez",
    role: "Head of Client Success",
    bio: "Banking operations specialist with experience deploying AI solutions in 200+ financial institutions.",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=300&q=80"
  },
  {
    name: "David Park",
    role: "Lead API Architect",
    bio: "Full-stack developer specialized in secure, high-throughput financial integration systems.",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=300&q=80"
  }
];

const TeamSection = () => {
  return (
    <section className="py-20 bg-tusk-navy">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold mb-4 text-white">Meet Our Team</h2>
          <p className="text-tusk-lightBlue text-lg max-w-2xl mx-auto">
            Our diverse team of experts brings together decades of experience in AI, banking security, and customer service innovation.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {teamMembers.map((member, index) => (
            <div 
              key={index} 
              className="group tech-border bg-tusk-darkNavy/80 backdrop-blur-sm overflow-hidden relative"
            >
              <div className="p-6">
                <div className="aspect-square rounded-full overflow-hidden mb-6 border-2 border-tusk-teal/30 mx-auto max-w-[180px] relative">
                  <img 
                    src={member.image} 
                    alt={member.name} 
                    className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-tusk-darkNavy to-transparent opacity-0 group-hover:opacity-40 transition-opacity duration-300"></div>
                </div>
                
                <h3 className="text-xl font-bold text-white mb-1 text-center">{member.name}</h3>
                <p className="text-tusk-teal mb-4 text-center">{member.role}</p>
                <p className="text-tusk-lightBlue text-center">{member.bio}</p>
              </div>
              
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-tusk-teal to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TeamSection;
