'use client';

import React from 'react';
import dynamic from 'next/dynamic';
import Link from 'next/link';

// Dynamically import components
const Navbar = dynamic(() => import('./components/Navbar'));
const Hero = dynamic(() => import('./components/Hero'));
const Features = dynamic(() => import('./components/Features'));
const WhyChooseUs = dynamic(() => import('./components/WhyChooseUs'));
const HowItWorks = dynamic(() => import('./components/HowItWorks'));
const Stats = dynamic(() => import('./components/Stats'));
const FAQ = dynamic(() => import('./components/FAQ'));
const CTA = dynamic(() => import('./components/CTA'));
const Footer = dynamic(() => import('./components/Footer'));

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <Hero />
      <Features />
      <WhyChooseUs />
      <HowItWorks />
      <Stats />
      <FAQ />
      <CTA />
      <Footer />
      
      {/* Link back to main app */}
      <div className="fixed bottom-4 right-4 z-50">
        <Link 
          href="/" 
          className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full shadow-lg"
        >
          Go to App
        </Link>
      </div>
    </div>
  );
} 