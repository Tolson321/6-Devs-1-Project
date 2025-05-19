'use client';

import React from 'react';
import Link from 'next/link';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-50 py-8 px-4 md:px-6 border-t border-slate-200">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center text-center md:text-left">
          <div className="mb-4 md:mb-0">
            <Link href="/landing" className="text-xl font-bold text-slate-800">
              DocuTranslate
            </Link>
            <p className="text-sm text-slate-500 mt-1">
              Secure Document Translation.
            </p>
          </div>
          
          <div className="flex items-center space-x-6 mb-4 md:mb-0">
            <Link href="/pricing" className="text-sm text-slate-600 hover:text-slate-900">Pricing</Link>
            <Link href="/terms" className="text-sm text-slate-600 hover:text-slate-900">Terms</Link>
            <Link href="/privacy" className="text-sm text-slate-600 hover:text-slate-900">Privacy</Link>
          </div>
        </div>
        
        <div className="mt-8 pt-8 border-t border-slate-200 text-sm text-slate-500 text-center">
          <p>&copy; {currentYear} DocuTranslate. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 