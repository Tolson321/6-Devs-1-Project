'use client';

import React from 'react';
import dynamic from 'next/dynamic';
// import Link from 'next/link'; // Link is no longer needed here if FAB is removed

// Dynamically import components
// const Navbar = dynamic(() => import('./landing/components/Navbar')); // REMOVED
const Hero = dynamic(() => import('./landing/components/Hero')); // Adjusted path
const Features = dynamic(() => import('./landing/components/Features')); // Adjusted path
const Pricing = dynamic(() => import('./landing/components/Pricing')); // Added Pricing
// const WhyChooseUs = dynamic(() => import('./landing/components/WhyChooseUs')); // Minimalist: Removed
const HowItWorks = dynamic(() => import('./landing/components/HowItWorks')); // Added HowItWorks
// const Stats = dynamic(() => import('./landing/components/Stats')); // Minimalist: Removed
// const FAQ = dynamic(() => import('./landing/components/FAQ')); // Minimalist: Removed
const CTA = dynamic(() => import('./landing/components/CTA')); // Adjusted path
const Footer = dynamic(() => import('./landing/components/Footer')); // Adjusted path

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* <Navbar /> */}{/* REMOVED */}
      <main className="flex-grow">
        <Hero />
        <HowItWorks />
        <Features /> 
        <Pricing />
        <CTA />
      </main>
      <Footer />
      
      {/* Link back to main app - REMOVED */}
      {/* 
      <div className="fixed bottom-4 right-4 z-50">
        <Link 
          href="/" 
          className="bg-sky-600 hover:bg-sky-700 text-white font-medium py-3 px-6 rounded-lg shadow-md transition-colors duration-150 ease-in-out flex items-center"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 mr-2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 8.25H7.5a2.25 2.25 0 00-2.25 2.25v9a2.25 2.25 0 002.25 2.25h9a2.25 2.25 0 002.25-2.25v-9a2.25 2.25 0 00-2.25-2.25H15m0-3l-3-3m0 0l-3 3m3-3V15" />
          </svg>
          Go to App
        </Link>
      </div>
      */}
    </div>
  );
}
