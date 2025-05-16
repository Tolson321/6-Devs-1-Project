import React from 'react';

const Stats: React.FC = () => {
  return (
    <div className="py-16 px-4 md:px-8 bg-white border-t border-gray-200">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-12">
          Real Stats. Real Travelers.
        </h2>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
          <div className="text-center">
            <p className="text-3xl font-bold text-blue-600">92.4</p>
            <p className="text-gray-600 text-sm">of first-time customers continue using our service</p>
          </div>
          
          <div className="text-center">
            <p className="text-3xl font-bold text-blue-600">3M+</p>
            <p className="text-gray-600 text-sm">patients have used our translations</p>
          </div>
          
          <div className="text-center">
            <p className="text-3xl font-bold text-blue-600">85%</p>
            <p className="text-gray-600 text-sm">faster than traditional agencies</p>
          </div>
          
          <div className="text-center">
            <p className="text-3xl font-bold text-blue-600">$15</p>
            <p className="text-gray-600 text-sm">average cost for A4 docs, cost could vary based on complexity</p>
          </div>
        </div>
        
        <p className="text-center text-gray-600 mb-6">
          Trusted by medical societies, carriers, and global travelers.
        </p>
        
        <div className="bg-gray-50 p-6 rounded-lg max-w-2xl mx-auto mb-8">
          <h3 className="font-bold mb-2">Case Example</h3>
          <p className="text-gray-700 mb-4">
            Jane had 32 pages translated in 30 minutes. No U.S. hospital accepted her insurance until she showed our translation.
          </p>
          <div className="text-xs text-gray-500 text-right">
            March 15 · Digital Document Location
          </div>
        </div>
        
        <div className="text-center">
          <a href="#" className="text-blue-600 font-medium hover:underline">
            See a recent report
          </a>
        </div>
      </div>
    </div>
  );
};

export default Stats;