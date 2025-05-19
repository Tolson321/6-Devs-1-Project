'use client';

import React from 'react';
import { UploadCloud, ScanSearch, FileText, CheckCircle } from 'lucide-react';

const HowItWorks = () => {
  const steps = [
    {
      icon: <UploadCloud className="h-12 w-12 text-sky-600 mb-4" />,
      title: "1. Upload Document",
      description: "Drag & drop or select your PDF, JPG, or PNG file. Quick and easy."
    },
    {
      icon: <ScanSearch className="h-12 w-12 text-sky-600 mb-4" />,
      title: "2. AI Translates Securely",
      description: "Mistral AI accurately translates your document while ensuring data privacy. Language auto-detected."
    },
    {
      icon: <FileText className="h-12 w-12 text-sky-600 mb-4" />,
      title: "3. Get English Report Fast",
      description: "Receive your clear English translation in under an hour, ready for use."
    }
  ];

  return (
    <section id="how-it-works" className="bg-white py-16 md:py-24 px-4 md:px-6">
      <div className="container mx-auto">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-4">
            Translate Docs in 3 Easy Steps
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Fast, simple, and secure translation when you need it most.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
          {steps.map((step, index) => (
            <div 
              key={index} 
              className="text-center p-6 bg-slate-50 rounded-lg shadow-sm border border-slate-200 hover:shadow-md transition-shadow"
            >
              <div className="flex justify-center">
                {step.icon}
              </div>
              <h3 className="text-xl font-semibold text-slate-800 mb-3">{step.title}</h3>
              <p className="text-slate-600 text-sm">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks; 