import React from 'react';
import { Zap, CheckCircle, Lock, Smartphone, FileCheck, Award } from 'lucide-react';

const WhyChooseUs: React.FC = () => {
  return (
    <div className="py-16 px-4 md:px-8 bg-white">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-12">
          Why Travelers Choose Us Over Agencies & Google Translate
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="p-6 bg-gray-50 rounded-lg">
            <div className="mb-4">
              <Zap className="h-6 w-6 text-blue-600" />
            </div>
            <h3 className="font-bold text-lg mb-2">Fast</h3>
            <p className="text-gray-600">
              Get most urgent translations in under 24 hours. We process express orders within 2 hours.
            </p>
          </div>
          
          <div className="p-6 bg-gray-50 rounded-lg">
            <div className="mb-4">
              <CheckCircle className="h-6 w-6 text-blue-600" />
            </div>
            <h3 className="font-bold text-lg mb-2">Accurate</h3>
            <p className="text-gray-600">
              More accurate than AI tools with verified medical professionals who understand healthcare "translation" and "terminology".
            </p>
          </div>
          
          <div className="p-6 bg-gray-50 rounded-lg">
            <div className="mb-4">
              <Lock className="h-6 w-6 text-blue-600" />
            </div>
            <h3 className="font-bold text-lg mb-2">Private</h3>
            <p className="text-gray-600">
              We never store or share confidential data. All files are deleted after your order (yet they are still secure).
            </p>
          </div>
          
          <div className="p-6 bg-gray-50 rounded-lg">
            <div className="mb-4">
              <Smartphone className="h-6 w-6 text-blue-600" />
            </div>
            <h3 className="font-bold text-lg mb-2">Mobile-First</h3>
            <p className="text-gray-600">
              Designed to be easy to use from your phone, on the go, in case of medical emergency.
            </p>
          </div>
          
          <div className="p-6 bg-gray-50 rounded-lg">
            <div className="mb-4">
              <FileCheck className="h-6 w-6 text-blue-600" />
            </div>
            <h3 className="font-bold text-lg mb-2">Clear + Doctor-Ready</h3>
            <p className="text-gray-600">
              Each document comes as a PDF your doctor will understand. Perfect for urgent use needs.
            </p>
          </div>
          
          <div className="p-6 bg-gray-50 rounded-lg">
            <div className="mb-4">
              <Award className="h-6 w-6 text-blue-600" />
            </div>
            <h3 className="font-bold text-lg mb-2">Guaranteed Results</h3>
            <p className="text-gray-600">
              Insurance companies and hospitals accept our translations every time. Satisfaction guaranteed.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WhyChooseUs;