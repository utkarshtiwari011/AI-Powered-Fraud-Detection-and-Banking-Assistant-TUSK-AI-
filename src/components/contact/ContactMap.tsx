
import React from 'react';

const ContactMap = () => {
  return (
    <div className="tech-border overflow-hidden h-[300px]">
      <iframe
        title="TUSK AI Headquarters Location"
        className="w-full h-full"
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d50470.09973807942!2d-122.43520065598853!3d37.77710888586985!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80858086e96b9859%3A0x2cc7a5b2bb6e894d!2sFinancial%20District%2C%20San%20Francisco%2C%20CA%2094104!5e0!3m2!1sen!2sus!4v1684789052261!5m2!1sen!2sus"
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      ></iframe>
    </div>
  );
};

export default ContactMap;
