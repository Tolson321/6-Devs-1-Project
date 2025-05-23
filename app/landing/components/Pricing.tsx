'use client';

import React from 'react';
import { CheckCircle, Check } from 'lucide-react';
import { useAuth } from '@/components/auth-provider';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

const Pricing = () => {
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
    <div className="bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="text-base font-semibold leading-7 text-indigo-600">Pricing</h2>
          <p className="mt-2 text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
            Choose the right plan for&nbsp;you
          </p>
        </div>
        <p className="mx-auto mt-6 max-w-2xl text-center text-lg leading-8 text-gray-600">
          Whether you're translating a single document or need ongoing translation services, we have a plan that fits your needs.
        </p>
        <div className="isolate mx-auto mt-16 grid max-w-md grid-cols-1 gap-y-8 sm:mt-20 lg:mx-0 lg:max-w-none lg:grid-cols-3">
          {/* Free Tier */}
          <div className="flex flex-col justify-between rounded-3xl bg-white p-8 ring-1 ring-gray-200 xl:p-10">
            <div>
              <div className="flex items-center justify-between gap-x-4">
                <h3 className="text-lg font-semibold leading-8 text-gray-900">Free</h3>
              </div>
              <p className="mt-4 text-sm leading-6 text-gray-600">Perfect for trying out our service</p>
              <p className="mt-6 flex items-baseline gap-x-1">
                <span className="text-4xl font-bold tracking-tight text-gray-900">$0</span>
                <span className="text-sm font-semibold leading-6 text-gray-600">/month</span>
              </p>
              <ul role="list" className="mt-8 space-y-3 text-sm leading-6 text-gray-600">
                <li className="flex gap-x-3">
                  <Check className="h-6 w-5 flex-none text-indigo-600" />
                  <span>1 document per day</span>
                </li>
                <li className="flex gap-x-3">
                  <Check className="h-6 w-5 flex-none text-indigo-600" />
                  <span>Basic translation</span>
                </li>
                <li className="flex gap-x-3">
                  <Check className="h-6 w-5 flex-none text-indigo-600" />
                  <span>7-day file retention</span>
                </li>
              </ul>
            </div>
            <button
              onClick={handleGetStarted}
              className="mt-8 block rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Get started
            </button>
          </div>

          {/* Pro Tier */}
          <div className="flex flex-col justify-between rounded-3xl bg-white p-8 ring-1 ring-gray-200 xl:p-10">
            <div>
              <div className="flex items-center justify-between gap-x-4">
                <h3 className="text-lg font-semibold leading-8 text-gray-900">Pro</h3>
                <p className="rounded-full bg-indigo-600/10 px-2.5 py-1 text-xs font-semibold leading-5 text-indigo-600">
                  Most popular
                </p>
              </div>
              <p className="mt-4 text-sm leading-6 text-gray-600">For individuals and small teams</p>
              <p className="mt-6 flex items-baseline gap-x-1">
                <span className="text-4xl font-bold tracking-tight text-gray-900">$29</span>
                <span className="text-sm font-semibold leading-6 text-gray-600">/month</span>
              </p>
              <ul role="list" className="mt-8 space-y-3 text-sm leading-6 text-gray-600">
                <li className="flex gap-x-3">
                  <Check className="h-6 w-5 flex-none text-indigo-600" />
                  <span>10 documents per day</span>
                </li>
                <li className="flex gap-x-3">
                  <Check className="h-6 w-5 flex-none text-indigo-600" />
                  <span>Advanced translation</span>
                </li>
                <li className="flex gap-x-3">
                  <Check className="h-6 w-5 flex-none text-indigo-600" />
                  <span>30-day file retention</span>
                </li>
                <li className="flex gap-x-3">
                  <Check className="h-6 w-5 flex-none text-indigo-600" />
                  <span>Priority support</span>
                </li>
              </ul>
            </div>
            <button
              onClick={handleGetStarted}
              className="mt-8 block rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Get started
            </button>
          </div>

          {/* Enterprise Tier */}
          <div className="flex flex-col justify-between rounded-3xl bg-white p-8 ring-1 ring-gray-200 xl:p-10">
            <div>
              <div className="flex items-center justify-between gap-x-4">
                <h3 className="text-lg font-semibold leading-8 text-gray-900">Enterprise</h3>
              </div>
              <p className="mt-4 text-sm leading-6 text-gray-600">For large organizations</p>
              <p className="mt-6 flex items-baseline gap-x-1">
                <span className="text-4xl font-bold tracking-tight text-gray-900">$99</span>
                <span className="text-sm font-semibold leading-6 text-gray-600">/month</span>
              </p>
              <ul role="list" className="mt-8 space-y-3 text-sm leading-6 text-gray-600">
                <li className="flex gap-x-3">
                  <Check className="h-6 w-5 flex-none text-indigo-600" />
                  <span>Unlimited documents</span>
                </li>
                <li className="flex gap-x-3">
                  <Check className="h-6 w-5 flex-none text-indigo-600" />
                  <span>Premium translation</span>
                </li>
                <li className="flex gap-x-3">
                  <Check className="h-6 w-5 flex-none text-indigo-600" />
                  <span>90-day file retention</span>
                </li>
                <li className="flex gap-x-3">
                  <Check className="h-6 w-5 flex-none text-indigo-600" />
                  <span>24/7 support</span>
                </li>
                <li className="flex gap-x-3">
                  <Check className="h-6 w-5 flex-none text-indigo-600" />
                  <span>Custom integrations</span>
                </li>
              </ul>
            </div>
            <button
              onClick={handleGetStarted}
              className="mt-8 block rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Get started
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Pricing; 