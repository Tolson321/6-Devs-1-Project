import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Check } from "lucide-react"
// import { HeaderWrapper } from "@/components/header-wrapper"; // REMOVED
import Image from "next/image";
import dynamic from "next/dynamic"

// Import FloatingDocuments with client-side only rendering
const FloatingDocuments = dynamic(
  () => import("@/components/floating-documents"),
  { ssr: false }
)

const tiers = [
  {
    name: "Free",
    price: "$0",
    description: "Basic document translation",
    image: "/coconut.png",
    features: [
      "Up to 5 documents per month",
      "Basic language support",
      "7-day link expiration",
      "Standard processing speed"
    ],
    buttonText: "Get Started",
    buttonVariant: "outline" as const
  },
  {
    name: "Pro",
    price: "$9.99",
    description: "Advanced document translation",
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
    buttonVariant: "default" as const
  }
]

export default function PricingPage() {
  return (
    <>
      {/* <HeaderWrapper /> */}{/* REMOVED */}
      <main className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-indigo-100 dark:from-slate-950 dark:via-indigo-950 dark:to-slate-900 relative">
        {/* Floating documents background - positioned absolutely within the relative container */}
        <div className="absolute inset-0 overflow-hidden">
          <FloatingDocuments />
        </div>
        
        <div className="container max-w-5xl mx-auto px-4 py-16 relative z-10">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4">Simple, Transparent Pricing</h1>
            <p className="text-lg text-slate-600 dark:text-slate-400">
              Choose the plan that's right for you
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {tiers.map((tier) => (
              <Card key={tier.name} className="flex flex-col bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm">
                {tier.image && (
                  <div className="relative h-40 w-full">
                    <Image
                      src={tier.image}
                      alt={`${tier.name} plan image`}
                      layout="fill"
                      objectFit="contain"
                    />
                  </div>
                )}
                <CardHeader>
                  <CardTitle className="text-2xl">{tier.name}</CardTitle>
                  <div className="mt-4">
                    <span className="text-4xl font-bold">{tier.price}</span>
                    <span className="text-slate-500 dark:text-slate-400">/month</span>
                  </div>
                  <CardDescription className="mt-2">{tier.description}</CardDescription>
                </CardHeader>
                <CardContent className="flex-grow">
                  <ul className="space-y-3">
                    {tier.features.map((feature) => (
                      <li key={feature} className="flex items-center">
                        <Check className="h-4 w-4 text-green-500 mr-2" />
                        <span className="text-slate-600 dark:text-slate-400">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button variant={tier.buttonVariant} className="w-full">
                    {tier.buttonText}
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </main>
    </>
  )
} 