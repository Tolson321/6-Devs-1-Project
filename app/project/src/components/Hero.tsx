import React from 'react';

const Hero: React.FC = () => {
  return (
    <div className="bg-gray-100 py-12 px-4 md:px-8 md:py-16">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        <div className="space-y-6">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 leading-tight">
            Get Medical Documents Translated—Fast, Secure, and Travel-Ready
          </h1>
          <p className="text-gray-700">
            Work with a trusted, bilingual doctor who offers document-by-document translations that insurance companies, hospitals, and doctors accept.
          </p>
          <p className="text-sm text-gray-600">
            Trusted by doctors, hospitals, and major carriers, meeting travel needs MedTranslate cares.
          </p>

          <div className="flex flex-wrap gap-4 pt-2">
            <a href="#" className="text-sm font-medium text-gray-600 hover:text-blue-600">Patient Notes</a>
            <a href="#" className="text-sm font-medium text-gray-600 hover:text-blue-600">Lab and Test Results</a>
            <a href="#" className="text-sm font-medium text-gray-600 hover:text-blue-600">Insurance Info</a>
            <a href="#" className="text-sm font-medium text-gray-600 hover:text-blue-600">All Doc Categories</a>
          </div>

          <button className="bg-blue-600 text-white px-6 py-3 rounded-md font-medium hover:bg-blue-700 transition-colors">
            Get Expert Medical Translation
          </button>
        </div>
        
        <div className="relative">
          <img 
            src="https://images.pexels.com/photos/668300/pexels-photo-668300.jpeg" 
            alt="Medical facility" 
            className="rounded-lg shadow-lg w-full"
          />
          <div className="absolute -bottom-6 -left-6 bg-white p-4 rounded-lg shadow-md max-w-[220px]">
            <p className="text-sm font-medium">Get help translating your medical records for your trip or insurance claim</p>
            <button className="mt-3 bg-teal-500 text-white py-2 px-4 rounded text-sm font-medium hover:bg-teal-600 transition-colors">
              Get 30% off
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;