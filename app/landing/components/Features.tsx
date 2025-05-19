'use client';

import React from 'react';
import { Zap, FileCheck2, ShieldCheck, Smartphone } from 'lucide-react';
import Image from 'next/image';

const Features = () => {
  const featuresData = [
    {
      icon: <Zap className="h-10 w-10 text-sky-600" />,
      title: "Under 1 Hour Turnaround",
      description: "Critical documents translated fast. No more lengthy waits."
    },
    {
      icon: <FileCheck2 className="h-10 w-10 text-sky-600" />,
      title: "Mistral AI Accuracy",
      description: "Advanced OCR handles complex docs, even handwriting, for precise results."
    },
    {
      icon: <ShieldCheck className="h-10 w-10 text-sky-600" />,
      title: "Secure & Confidential",
      description: "Encrypted uploads and auto-delete after translation. Your data is safe."
    },
    {
      icon: <Smartphone className="h-10 w-10 text-sky-600" />,
      title: "Easy Mobile Uploads",
      description: "Translate on-the-go. Upload PDFs or photos directly from your phone."
    }
  ];

  return (
    <section id="features" className="bg-slate-50 py-16 md:py-24 px-4 md:px-6 scroll-mt-16 relative overflow-hidden">
      <div className="absolute top-0 left-0 -z-10 opacity-15 transform -translate-x-1/3 -translate-y-1/4 pointer-events-none">
        <Image 
          src="/palmtree.png"
          alt="Palm tree decoration"
          width={500}
          height={500}
          className="object-contain"
        />
      </div>

      <div className="container mx-auto relative z-10">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-4">
            Why Choose Us for Medical Translations?
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Get peace of mind with fast, accurate, and secure translations of your vital medical documents.
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          {featuresData.map((feature) => (
            <div key={feature.title} className="bg-white p-6 rounded-lg border border-slate-200 text-center shadow-sm">
              <div className="flex justify-center mb-4">
                {feature.icon}
              </div>
              <h3 className="font-semibold text-xl mb-2 text-slate-800">{feature.title}</h3>
              <p className="text-slate-600 text-sm">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features; 