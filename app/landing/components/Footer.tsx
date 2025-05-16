'use client';

import React from 'react';
import Link from 'next/link';

const Footer = () => {
  return (
    <footer className="bg-white py-12 px-4 md:px-8 border-t border-gray-200">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          <div>
            <h2 className="text-blue-600 font-bold text-xl mb-4">DocuTranslate</h2>
            <p className="text-gray-600 text-sm mb-4">
              Medical grade document translations that doctors, insurance, and hospitals recognize and trust.
            </p>
            <Link 
              href="/" 
              className="inline-block bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-700 transition-colors"
            >
              Try It Now
            </Link>
          </div>
          
          <div>
            <h3 className="font-bold text-gray-900 mb-4">Resources</h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li><Link href="#" className="hover:text-blue-600">Pricing</Link></li>
              <li><Link href="#" className="hover:text-blue-600">Examples</Link></li>
              <li><Link href="#" className="hover:text-blue-600">Help Center</Link></li>
              <li><Link href="#" className="hover:text-blue-600">Guarantees</Link></li>
              <li><Link href="#" className="hover:text-blue-600">Plans</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-bold text-gray-900 mb-4">Company</h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li><Link href="#" className="hover:text-blue-600">About</Link></li>
              <li><Link href="#" className="hover:text-blue-600">Careers</Link></li>
              <li><Link href="#" className="hover:text-blue-600">Press</Link></li>
              <li><Link href="#" className="hover:text-blue-600">Contact Us</Link></li>
              <li><Link href="#" className="hover:text-blue-600">Terms of Service</Link></li>
              <li><Link href="#" className="hover:text-blue-600">Privacy Policy</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-bold text-gray-900 mb-4">Connect</h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li><Link href="#" className="hover:text-blue-600">Twitter</Link></li>
              <li><Link href="#" className="hover:text-blue-600">Facebook</Link></li>
              <li><Link href="#" className="hover:text-blue-600">Instagram</Link></li>
              <li><Link href="#" className="hover:text-blue-600">LinkedIn</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="mt-12 pt-6 border-t border-gray-200 text-sm text-gray-600 flex flex-col md:flex-row justify-between items-center">
          <p>© 2025 DocuTranslate. All rights reserved.</p>
          <div className="flex space-x-4 mt-4 md:mt-0">
            <Link href="#" className="hover:text-blue-600">Terms</Link>
            <Link href="#" className="hover:text-blue-600">Privacy</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 