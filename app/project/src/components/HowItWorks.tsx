import React from 'react';
import { Upload, Languages, FileCheck, Share2 } from 'lucide-react';

const HowItWorks: React.FC = () => {
  return (
    <div className="py-16 px-4 md:px-8 bg-gray-100">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-12">
          How It Works
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div className="space-y-12">
            <div className="flex items-start space-x-4">
              <div className="bg-blue-600 text-white w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0">
                1
              </div>
              <div>
                <h3 className="font-bold text-lg mb-1">Upload your medical docs</h3>
                <div className="h-24 w-full bg-white rounded-lg shadow-sm border border-gray-200 flex items-center justify-center">
                  <Upload className="h-6 w-6 text-gray-400" />
                </div>
              </div>
            </div>
            
            <div className="flex items-start space-x-4">
              <div className="bg-blue-600 text-white w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0">
                3
              </div>
              <div>
                <h3 className="font-bold text-lg mb-1">Receive your order by rush translation (optional)</h3>
                <div className="h-24 w-full bg-white rounded-lg shadow-sm border border-gray-200 flex items-center justify-center">
                  <FileCheck className="h-6 w-6 text-gray-400" />
                </div>
              </div>
            </div>
          </div>
          
          <div className="space-y-12">
            <div className="flex items-start space-x-4">
              <div className="bg-blue-600 text-white w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0">
                2
              </div>
              <div>
                <h3 className="font-bold text-lg mb-1">Choose your preferred language</h3>
                <div className="h-24 w-full bg-white rounded-lg shadow-sm border border-gray-200 flex items-center justify-center">
                  <Languages className="h-6 w-6 text-gray-400" />
                </div>
              </div>
            </div>
            
            <div className="flex items-start space-x-4">
              <div className="bg-blue-600 text-white w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0">
                4
              </div>
              <div>
                <h3 className="font-bold text-lg mb-1">Share the link with your doctor or insurer</h3>
                <div className="h-24 w-full bg-white rounded-lg shadow-sm border border-gray-200 flex items-center justify-center">
                  <Share2 className="h-6 w-6 text-gray-400" />
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="mt-12 text-center text-sm text-gray-600">
          <p>Industry-recognized, safe, trusted. 100% compliant.</p>
          <p>Locations in USA, Europe, Asia, and many more.</p>
        </div>
        
        <div className="mt-8 text-center">
          <button className="bg-blue-600 text-white px-6 py-3 rounded-md font-medium hover:bg-blue-700 transition-colors">
            Get Started Translating
          </button>
        </div>
      </div>
    </div>
  );
};

export default HowItWorks;