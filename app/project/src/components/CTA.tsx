import React from 'react';

const CTA: React.FC = () => {
  return (
    <div className="py-16 px-4 md:px-8 bg-blue-600 text-white">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-2xl md:text-3xl font-bold mb-6">
          Need Your Medical Docs In English—Now?
        </h2>
        <p className="mb-8 text-blue-100">
          Our team of medical translators is standing by to help. Contact us for a consultation on the best solution for your emergency needs.
        </p>
        
        <div className="flex flex-col md:flex-row gap-3 justify-center max-w-lg mx-auto">
          <input 
            type="email" 
            placeholder="Your email address" 
            className="py-3 px-4 rounded-md text-gray-800 w-full focus:outline-none focus:ring-2 focus:ring-blue-300"
          />
          <button className="bg-white text-blue-600 font-medium py-3 px-6 rounded-md hover:bg-gray-100 transition-colors whitespace-nowrap">
            Contact Us
          </button>
        </div>
      </div>
    </div>
  );
};

export default CTA;