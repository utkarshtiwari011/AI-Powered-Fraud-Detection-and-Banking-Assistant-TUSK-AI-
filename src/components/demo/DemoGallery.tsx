
import React, { useState } from 'react';
import { ArrowLeft, ArrowRight, X } from 'lucide-react';

const galleryItems = [
  {
    title: "Fraud Detection Dashboard",
    description: "Real-time monitoring of transactions with AI-powered risk assessment",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
  },
  {
    title: "Banking Assistant Interface",
    description: "Natural language processing for customer inquiries and banking operations",
    image: "https://images.unsplash.com/photo-1579621970588-a35d0e7ab9b6?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
  },
  {
    title: "Security Alert System",
    description: "Multi-channel notification system for suspicious activities",
    image: "https://images.unsplash.com/photo-1563986768609-322da13575f3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
  },
  {
    title: "Analytics & Reporting",
    description: "Comprehensive analytics dashboard with predictive insights",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
  }
];

const DemoGallery = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalImage, setModalImage] = useState('');
  
  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % galleryItems.length);
  };
  
  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + galleryItems.length) % galleryItems.length);
  };
  
  const openModal = (imageUrl: string) => {
    setModalImage(imageUrl);
    setModalOpen(true);
  };
  
  return (
    <section className="py-16 bg-tusk-darkNavy">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4 text-white">Product Gallery</h2>
          <p className="text-tusk-lightBlue max-w-2xl mx-auto">
            Explore screenshots of our AI banking security platform in action
          </p>
        </div>
        
        <div className="relative">
          <div className="overflow-hidden tech-border bg-black/30 backdrop-blur-sm">
            <div 
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${currentSlide * 100}%)` }}
            >
              {galleryItems.map((item, index) => (
                <div key={index} className="w-full flex-shrink-0">
                  <div 
                    className="aspect-[16/9] cursor-pointer relative"
                    onClick={() => openModal(item.image)}
                  >
                    <img 
                      src={item.image} 
                      alt={item.title} 
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex flex-col justify-end p-8">
                      <h3 className="text-2xl font-bold text-white mb-2">{item.title}</h3>
                      <p className="text-tusk-lightBlue">{item.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Navigation buttons */}
          <button 
            onClick={prevSlide}
            className="absolute top-1/2 left-4 transform -translate-y-1/2 w-10 h-10 rounded-full bg-black/50 backdrop-blur-sm flex items-center justify-center text-white hover:bg-tusk-teal/80 hover:text-black transition-colors"
            aria-label="Previous"
          >
            <ArrowLeft className="h-5 w-5" />
          </button>
          
          <button 
            onClick={nextSlide}
            className="absolute top-1/2 right-4 transform -translate-y-1/2 w-10 h-10 rounded-full bg-black/50 backdrop-blur-sm flex items-center justify-center text-white hover:bg-tusk-teal/80 hover:text-black transition-colors"
            aria-label="Next"
          >
            <ArrowRight className="h-5 w-5" />
          </button>
          
          {/* Dots */}
          <div className="flex justify-center mt-4 gap-2">
            {galleryItems.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`w-3 h-3 rounded-full transition-colors ${
                  index === currentSlide ? 'bg-tusk-teal' : 'bg-white/30'
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
        
        {/* Image Modal */}
        {modalOpen && (
          <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
            <div className="relative max-w-5xl w-full max-h-[90vh]">
              <button 
                onClick={() => setModalOpen(false)}
                className="absolute -top-12 right-0 text-white hover:text-tusk-teal"
                aria-label="Close"
              >
                <X className="h-8 w-8" />
              </button>
              <img 
                src={modalImage} 
                alt="Full size preview" 
                className="max-h-[80vh] max-w-full mx-auto object-contain"
              />
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default DemoGallery;
