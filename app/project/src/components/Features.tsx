import React from 'react';
import { UserCheck, Shield, FileText } from 'lucide-react';

const Features: React.FC = () => {
  return (
    <div className="py-16 px-4 md:px-8">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-10">
          Designed for Emergencies Abroad
        </h2>
        <p className="text-center text-gray-600 max-w-2xl mx-auto mb-12">
          Whether you're filing an insurance claim, navigating for a family-member abroad, or trying to get reimbursed for out-of-pocket fees.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="p-6 rounded-lg">
            <div className="mb-4">
              <UserCheck className="h-10 w-10 text-blue-600" />
            </div>
            <h3 className="font-bold text-lg mb-2">Human-Certified Doctor</h3>
            <p className="text-gray-600">
              Keeping all your information secure and out of reach from everyone but the human reviewers.
            </p>
          </div>
          
          <div className="p-6 rounded-lg">
            <div className="mb-4">
              <Shield className="h-10 w-10 text-blue-600" />
            </div>
            <h3 className="font-bold text-lg mb-2">Insurance Claims</h3>
            <p className="text-gray-600">
              Get insurance company-preferred translation that is always accepted.
            </p>
          </div>
          
          <div className="p-6 rounded-lg">
            <div className="mb-4">
              <FileText className="h-10 w-10 text-blue-600" />
            </div>
            <h3 className="font-bold text-lg mb-2">Technical Reviews</h3>
            <p className="text-gray-600">
              Nuanced industry-specific medical translations with accuracy. Works with the best translation tools.
            </p>
          </div>
        </div>
        
        <div className="text-center mt-10">
          <a href="#" className="text-blue-600 hover:underline font-medium">
            We're Just the Best
          </a>
        </div>
      </div>
    </div>
  );
};

export default Features;