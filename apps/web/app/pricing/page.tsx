"use client";

import { GlowButton, DashboardStat } from "@castquest/neo-ux-core";
import { neo } from "@castquest/neo-ux-core";
import { Check } from "lucide-react";
import Link from "next/link";

const pricingPlans = [
  {
    name: "Free",
    price: "$0",
    description: "Perfect for getting started",
    features: [
      "Create up to 10 frames",
      "Basic frame templates",
      "Community support",
      "Access to public quests",
      "Standard analytics",
    ],
    cta: "Get Started",
    highlighted: false,
  },
  {
    name: "Creator",
    price: "$29",
    description: "For serious creators",
    features: [
      "Unlimited frames",
      "Premium frame templates",
      "Priority support",
      "Custom quests",
      "Advanced analytics",
      "NFT minting capabilities",
      "Revenue sharing: 90/10",
    ],
    cta: "Start Creating",
    highlighted: true,
  },
  {
    name: "Enterprise",
    price: "Custom",
    description: "For large-scale operations",
    features: [
      "Everything in Creator",
      "White-label solution",
      "Dedicated account manager",
      "Custom integrations",
      "SLA guarantees",
      "Priority feature requests",
      "Revenue sharing: 95/5",
    ],
    cta: "Contact Sales",
    highlighted: false,
  },
];

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-black">
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-black via-neutral-900 to-black">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(16,185,129,0.1),transparent_50%)]" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 text-center">
          <div className={`inline-block mb-6 px-4 py-2 rounded-full border border-emerald-500/50 bg-emerald-500/10`}>
            <span className="text-sm font-bold text-emerald-400 uppercase tracking-wide">
              💎 Pricing
            </span>
          </div>

          <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-emerald-400 via-cyan-400 to-purple-400 bg-clip-text text-transparent">
            Choose Your Plan
          </h1>

          <p className="text-xl text-neutral-300 mb-8 max-w-3xl mx-auto">
            Start free, scale as you grow. All plans include access to the CastQuest Protocol.
          </p>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="relative py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-8">
            {pricingPlans.map((plan) => (
              <div
                key={plan.name}
                className={`relative rounded-2xl p-8 ${
                  plan.highlighted
                    ? "border-2 border-emerald-500/50 bg-gradient-to-br from-emerald-500/10 to-cyan-500/10"
                    : "border border-neutral-800 bg-neutral-900/50"
                }`}
              >
                {plan.highlighted && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <span className="px-4 py-1 rounded-full text-xs font-bold bg-emerald-500 text-white">
                      MOST POPULAR
                    </span>
                  </div>
                )}

                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold text-white mb-2">
                    {plan.name}
                  </h3>
                  <p className="text-sm text-neutral-400 mb-4">
                    {plan.description}
                  </p>
                  <div className="mb-2">
                    <span className="text-5xl font-bold text-white">
                      {plan.price}
                    </span>
                    {plan.price !== "Custom" && (
                      <span className="text-lg text-neutral-400">/month</span>
                    )}
                  </div>
                </div>

                <ul className="space-y-4 mb-8">
                  {plan.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-neutral-300">{feature}</span>
                    </li>
                  ))}
                </ul>

                <GlowButton
                  variant={plan.highlighted ? "accent" : "secondary"}
                  size="lg"
                  className="w-full"
                  onClick={() => {
                    if (plan.name === "Enterprise") {
                      window.location.href = "mailto:enterprise@castquest.xyz";
                    } else {
                      window.location.href = "/dashboard";
                    }
                  }}
                >
                  {plan.cta}
                </GlowButton>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-20">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Ready to get started?
          </h2>
          <p className="text-xl text-neutral-300 mb-8">
            Join thousands of creators building on CastQuest
          </p>
          <div className="flex gap-4 justify-center">
            <Link href="/dashboard">
              <GlowButton variant="accent" size="lg">
                Start Free
              </GlowButton>
            </Link>
            <Link href="/about">
              <GlowButton variant="secondary" size="lg">
                Learn More
              </GlowButton>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
