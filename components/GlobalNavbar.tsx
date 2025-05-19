'use client';

import React from 'react';
import Link from 'next/link';
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";

const GlobalNavbar = () => {
  return (
    <nav className="bg-white py-4 border-b border-slate-200 sticky top-0 z-50">
      <div className="container mx-auto px-4 md:px-6 flex justify-between items-center">
        <div className="flex items-center">
          <Link href="/" className="text-2xl font-bold text-slate-800">
            DocuTranslate
          </Link>
        </div>
        <div className="hidden md:flex items-center space-x-6">
          <SignedOut>
            {/* Links for signed-out users (typically landing page links) */}
            <Link href="/#features" className="text-slate-600 hover:text-sky-600">Features</Link>
            <Link href="/pricing" className="text-slate-600 hover:text-sky-600">Pricing</Link>
            <Link 
              href="/sign-in"
              className="px-5 py-2 bg-sky-600 text-white rounded-md hover:bg-sky-700 text-sm font-medium transition-colors shadow-sm"
            >
              Get Started
            </Link>
          </SignedOut>
          <SignedIn>
            {/* Links for signed-in users (app navigation) */}
            <Link 
              href="/upload" 
              className="text-slate-600 hover:text-sky-600"
            >
              Home
            </Link>
            <Link 
              href="/files" 
              className="text-slate-600 hover:text-sky-600"
            >
              My Files
            </Link>
            <Link 
              href="/pricing" 
              className="text-slate-600 hover:text-sky-600"
            >
              Pricing
            </Link>
            <UserButton afterSignOutUrl="/"/>
          </SignedIn>
        </div>
        <div className="md:hidden flex items-center space-x-4">
          {/* Basic mobile menu: Shows UserButton when signed in, or a placeholder for a menu icon when signed out. 
              A full mobile menu implementation would require a state for open/closed and list the links. */}
          <SignedOut>
            <button className="text-slate-600 hover:text-sky-600"> {/* Placeholder for hamburger menu icon */}
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </SignedOut>
          <SignedIn>
            <UserButton afterSignOutUrl="/"/>
          </SignedIn>
        </div>
      </div>
    </nav>
  );
};

export default GlobalNavbar; 