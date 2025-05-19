'use client';

import React from 'react';
// import Link from 'next/link'; // No longer using Link for the main CTA button
import { useAuth } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';

const CTA = () => {
  const { userId } = useAuth();
  const router = useRouter();

  const handleCTAClick = () => {
    if (userId) {
      router.push('/upload');
    } else {
      router.push('/sign-up');
    }
  };

  return (
    <section className="bg-sky-600 py-16 md:py-24 px-4 md:px-6 text-white">
      <div className="container mx-auto text-center max-w-3xl">
        <h2 className="text-3xl md:text-4xl font-bold mb-6">
          Ready for Clear Medical Translations?
        </h2>
        <p className="text-lg text-sky-100 mb-10 max-w-xl mx-auto">
          Get your medical documents translated quickly and securely. Upload now for instant peace of mind.
        </p>
        
        <button 
          onClick={handleCTAClick}
          className="inline-block bg-white text-sky-700 px-10 py-4 rounded-md font-semibold hover:bg-slate-100 transition-colors text-lg shadow-md"
        >
          Get Your Translation Started Instantly
        </button>
      </div>
    </section>
  );
};

export default CTA; 