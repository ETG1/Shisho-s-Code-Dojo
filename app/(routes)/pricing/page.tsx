import React from "react"
import { PricingCard, type PricingCardProps } from "./_components/PricingCard"
import { Star, Sparkles, Crown } from "lucide-react"

// ============================================================================
// PRICING DATA - All cards use pixel style
// ============================================================================

const pricingTiers: PricingCardProps[] = [
  {
    name: "Free",
    price: "$0",
    period: "forever",
    description: "Perfect for getting started with coding basics",
    ctaText: "Get Started",
    icon: <Star className="w-5 h-5 text-gray-400" />,
    features: [
      { text: "3 beginner courses", included: true },
      { text: "Basic code exercises", included: true },
      { text: "Community forum access", included: true },
      { text: "Progress tracking", included: true },
      { text: "Priority support", included: false },
    ],
  },
  {
    name: "Pro",
    price: "$19",
    period: "/month",
    description: "Unlock unlimited access to all content",
    ctaText: "Start Trial",
    popular: true,
    badge: "SAVE 20%",
    icon: <Crown className="w-5 h-5 text-gray-400" />,
    features: [
      { text: "Unlimited course access", included: true, highlight: true },
      { text: "All code exercises & projects", included: true },
      { text: "Priority community support", included: true },
      { text: "Downloadable resources", included: true },
      { text: "1-on-1 mentorship", included: false },
    ],
  },
  {
    name: "Mentorship",
    price: "Custom",
    period: "",
    description: "Tailored solutions for students mentorship",
    ctaText: "Contact Us",
    icon: <Sparkles className="w-5 h-5 text-gray-400" />,
    features: [
      { text: "Everything in Pro", included: true },
      { text: "1-on-1 mentorship", included: true, highlight: true},
      { text: "Custom learning paths", included: true},
      { text: "Team management dashboard", included: true },
      { text: "SSO & advanced security", included: true },
      { text: "Dedicated account manager", included: true },
      { text: "Custom integrations", included: true },
    ],
  },
]

// ============================================================================
// PRICING PAGE COMPONENT
// ============================================================================

function Pricing() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative py-24 overflow-hidden">
        {/* Pixel-style background decoration */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-[repeating-linear-gradient(0deg,transparent,transparent_4px,rgba(0,0,0,0.03)_4px,rgba(0,0,0,0.03)_8px)]" />
          <div className="absolute inset-0 bg-[repeating-linear-gradient(90deg,transparent,transparent_4px,rgba(0,0,0,0.03)_4px,rgba(0,0,0,0.03)_8px)]" />
        </div>
        
        <div className="container mx-auto px-4 max-w-6xl">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold font-game mb-2">
              Choose Your Path
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto font-game mb-2">
              Select your training tier and begin your coding journey
            </p>
          </div>
          
          {/* Pricing Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {pricingTiers.map((tier, index) => (
              <PricingCard key={index} {...tier} />
            ))}
          </div>
          
          {/* Trust indicators */}
          <div className="mt-16 text-center">
            <p className="text-md text-muted-foreground font-game">
              Paid plans include a 14-day free trial.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Pricing
