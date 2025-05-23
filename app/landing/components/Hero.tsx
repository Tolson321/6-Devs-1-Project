'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useAuth } from '@/components/auth-provider';
import { useRouter } from 'next/navigation';

const Hero = () => {
  const router = useRouter();
  const { user } = useAuth();

  const handleGetStarted = () => {
    if (user) {
      router.push('/upload');
    } else {
      router.push('/signup');
    }
  };

  return (
    <div className="relative isolate">
      <div className="mx-auto max-w-7xl px-6 pb-24 pt-10 sm:pb-32 lg:flex lg:px-8 lg:py-40">
        <div className="mx-auto max-w-2xl flex-shrink-0 lg:mx-0 lg:max-w-xl lg:pt-8">
          <div className="mt-24 sm:mt-32 lg:mt-16">
            <a href="#" className="inline-flex space-x-6">
              <span className="rounded-full bg-indigo-500/10 px-3 py-1 text-sm font-semibold leading-6 text-indigo-600 ring-1 ring-inset ring-indigo-500/20">
                What's new
              </span>
              <span className="inline-flex items-center space-x-2 text-sm font-medium leading-6 text-gray-600">
                <span>Just shipped v1.0</span>
              </span>
            </a>
          </div>
          <h1 className="mt-10 text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
            Document Translation Made Simple
          </h1>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            Upload your documents and get accurate translations in minutes. Our AI-powered platform supports multiple languages and maintains your document's formatting.
          </p>
          <div className="mt-10 flex items-center gap-x-6">
            <button
              onClick={handleGetStarted}
              className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Get started
            </button>
            <a href="#features" className="text-sm font-semibold leading-6 text-gray-900">
              Learn more <span aria-hidden="true">→</span>
            </a>
          </div>
        </div>
        <div className="mx-auto mt-16 flex max-w-2xl sm:mt-24 lg:ml-10 lg:mr-0 lg:mt-0 lg:max-w-none lg:flex-none xl:ml-32">
          <div className="max-w-3xl flex-none sm:max-w-5xl lg:max-w-none">
            <Image
              src="/imang.png"
              alt="App screenshot"
              width={2432}
              height={1442}
              className="w-[76rem] rounded-md bg-white/5 shadow-2xl ring-1 ring-white/10"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero; 