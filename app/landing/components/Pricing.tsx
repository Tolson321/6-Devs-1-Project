'use client';

import React from 'react';
import { CheckCircle, Check } from 'lucide-react';
import { useAuth } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

const Pricing = () => {
  const { userId } = useAuth();
  const router = useRouter();

  const tiers = [
    {
      name: "Free",
      price: "$0",
      priceSuffix: "",
      description: "For quick translations of a few documents.",
      image: "/coconut.png",
      features: [
        "Up to 5 documents per month",
        "Basic language support",
        "7-day link expiration",
        "Standard processing speed"
      ],
      buttonText: "Get Started",
      buttonVariant: "outline",
      ctaAction: () => {
        if (userId) {
          router.push('/upload');
        } else {
          router.push('/sign-up');
        }
      }
    },
    {
      name: "Pro",
      price: "$9.99",
      priceSuffix: "/month",
      description: "Unlimited translations & all advanced features.",
      image: "/strawb.png",
      features: [
        "Unlimited documents",
        "All language support",
        "30-day link expiration",
        "Priority processing",
        "Advanced OCR support",
        "Bulk document processing"
      ],
      buttonText: "Upgrade to Pro",
      buttonVariant: "default",
      ctaAction: () => {
        if (userId) {
          router.push('/upload');
        } else {
          router.push('/sign-up?plan=pro');
        }
      }
    }
  ];

  return (
    <section id="pricing" className="bg-slate-50 py-16 md:py-24 px-4 md:px-6">
      <div className="container mx-auto">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-4">
            Choose Your Plan
          </h2>
          <p className="text-lg text-slate-600 max-w-xl mx-auto">
            Start translating for free, or go Pro for unlimited use and advanced features.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {tiers.map((tier) => (
            <div key={tier.name} className="flex flex-col bg-white rounded-xl shadow-lg overflow-hidden border border-slate-200">
              {tier.image && (
                <div className="relative h-40 w-full bg-slate-100">
                  <Image
                    src={tier.image}
                    alt={`${tier.name} plan image`}
                    layout="fill"
                    objectFit="contain"
                    className="p-4"
                  />
                </div>
              )}
              <div className="p-6 md:p-8 flex flex-col flex-grow">
                <h3 className="text-2xl font-semibold text-slate-800">{tier.name}</h3>
                <div className="mt-3 mb-1">
                  <span className="text-4xl font-bold text-slate-900">{tier.price}</span>
                  {tier.priceSuffix && <span className="text-slate-500">{tier.priceSuffix}</span>}
                </div>
                <p className="text-sm text-slate-600 mb-6 min-h-[40px]">{tier.description}</p>
                
                <ul className="space-y-3 mb-8 flex-grow">
                  {tier.features.map((feature) => (
                    <li key={feature} className="flex items-start">
                      <Check className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                      <span className="text-slate-600 text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>

                <button 
                  onClick={tier.ctaAction}
                  className={`w-full px-6 py-3 rounded-md font-semibold text-lg transition-colors shadow-md 
                    ${tier.buttonVariant === 'default' 
                      ? 'bg-sky-600 text-white hover:bg-sky-700' 
                      : 'bg-white text-sky-700 border border-sky-600 hover:bg-sky-50'}`}
                >
                  {tier.buttonText}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Pricing; 