'use client';

import React from 'react';
import Link from 'next/link';

const Navbar = () => {
  return (
    <nav className="bg-white shadow-md py-4">
      <div className="container mx-auto px-4 md:px-6 flex justify-between items-center">
        <div className="flex items-center">
          <Link href="/landing" className="text-2xl font-bold text-blue-600">
            DocuTranslate
          </Link>
        </div>
        <div className="hidden md:flex items-center space-x-8">
          <Link href="/landing#features" className="text-gray-600 hover:text-blue-600">Features</Link>
          <Link href="/landing#how-it-works" className="text-gray-600 hover:text-blue-600">How It Works</Link>
          <Link href="/landing#faq" className="text-gray-600 hover:text-blue-600">FAQ</Link>
          <Link href="/" className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
            Try It Now
          </Link>
        </div>
        <div className="md:hidden">
          <button className="text-gray-600 hover:text-blue-600">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar; 