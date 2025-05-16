'use client';

import React, { useState } from 'react';
import { ChevronDown, ChevronRight } from 'lucide-react';

interface FAQItemProps {
  question: string;
  answer: string;
}

const FAQItem = ({ question, answer }: FAQItemProps) => {
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <div className="border-b border-gray-200 py-4">
      <button 
        className="flex justify-between items-center w-full text-left font-medium text-gray-900 hover:text-blue-600"
        onClick={() => setIsOpen(!isOpen)}
      >
        {question}
        {isOpen ? (
          <ChevronDown className="h-5 w-5 text-gray-500" />
        ) : (
          <ChevronRight className="h-5 w-5 text-gray-500" />
        )}
      </button>
      {isOpen && (
        <div className="mt-2 text-gray-600">
          {answer}
        </div>
      )}
    </div>
  );
};

const FAQ = () => {
  return (
    <div id="faq" className="py-16 px-4 md:px-8 bg-white scroll-mt-16">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-12 text-gray-900">
          Frequently Asked Questions
        </h2>
        
        <div className="space-y-2">
          <FAQItem 
            question="Will it work with a public housing plan?" 
            answer="Yes, our translations are accepted by all public housing plans and government agencies. We follow all regulatory requirements for official document translations."
          />
          <FAQItem 
            question="Does it understand medical terms and abbreviations?" 
            answer="Yes, our translators are specialized in medical terminology and understand all common and uncommon medical abbreviations used in different countries' healthcare systems."
          />
          <FAQItem 
            question="Is my data safe?" 
            answer="Yes, we use bank-level encryption and never store your documents after translation is complete. All our processes comply with HIPAA and international data protection regulations."
          />
          <FAQItem 
            question="Do I get a printable version for my doctor in hospital?" 
            answer="Yes, you receive both digital and print-ready PDF versions of your translated documents that are formatted for medical professionals."
          />
          <FAQItem 
            question="How much does it cost?" 
            answer="Pricing starts at $15 per page for standard documents, with options for rush service. Volume discounts are available for multiple pages. See our detailed pricing page for more information."
          />
          <FAQItem 
            question="Can I use this for insurance purposes?" 
            answer="Yes, our translations are specifically designed to be accepted by insurance companies worldwide and include all necessary certification stamps and formatting."
          />
        </div>
      </div>
    </div>
  );
};

export default FAQ; 