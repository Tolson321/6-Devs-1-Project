'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useAuth } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';

const Hero = () => {
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
    <section className="bg-white py-16 md:py-24 px-4 md:px-6">
      <div className="container mx-auto grid md:grid-cols-2 items-center gap-12">
        <div className="space-y-6 text-center md:text-left">
          <h1 className="text-4xl md:text-5xl font-bold text-slate-800 leading-tight">
            Medical Docs Abroad? Get <span className="text-sky-600">Fast, Clear</span> English Translations.
          </h1>
          <p className="text-lg text-slate-600 max-w-md mx-auto md:mx-0">
            Translate foreign medical reports into clear English in under an hour. Secure, accurate, and ready for insurance or your doctor.
          </p>
          <div className="pt-4">
            <button 
              onClick={handleCTAClick}
              className="inline-block bg-sky-600 text-white px-8 py-4 rounded-md font-semibold hover:bg-sky-700 transition-colors text-lg shadow-md"
            >
              Upload & Translate Your Document
            </button>
          </div>
          <p className="text-sm text-slate-500 pt-2">Supports PDF &amp; Images. Results typically in &lt;1 hour.</p>
        </div>
        
        <div className="relative h-[300px] md:h-[500px] w-full max-w-md mx-auto md:max-w-none">
          <Image 
            src="/image.png"
            alt="Illustration of a traveler receiving translated medical documents on their phone"
            className="rounded-lg shadow-xl object-cover"
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 400px"
            priority
          />
        </div>
      </div>
    </section>
  );
};

export default Hero; 