"use client";

import { GlowButton } from "@castquest/neo-ux-core";
import { Shield, Zap, Code, Heart } from "lucide-react";
import Link from "next/link";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-black">
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-black via-neutral-900 to-black">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(16,185,129,0.1),transparent_50%)]" />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-emerald-400 via-cyan-400 to-purple-400 bg-clip-text text-transparent">
            About CastQuest
          </h1>

          <p className="text-xl text-neutral-300 mb-8">
            A Web3-native social photo protocol that feels like Instagram, mints like Zora,
            extends like Farcaster Frames, and builds like Remix — powered by a Smart Brain multi-agent AI.
          </p>
        </div>
      </section>

      {/* Core Principles */}
      <section className="relative py-16">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-white text-center mb-12">
            Core Principles
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: Shield,
                title: "Chain-first",
                description: "Built on Base with multi-chain EVM support",
              },
              {
                icon: Heart,
                title: "Creator-first",
                description: "Onchain minting, collecting, royalties, and programmable fees",
              },
              {
                icon: Code,
                title: "Builder-first",
                description: "Frames, SDK, and a Remix-style module builder",
              },
              {
                icon: Zap,
                title: "AI-native",
                description: "Smart Brain agents for pricing, previews, tagging, and optimization",
              },
            ].map((principle, idx) => (
              <div
                key={idx}
                className="rounded-xl p-6 border border-neutral-800 bg-neutral-900/50 hover:border-emerald-500/50 transition-all"
              >
                <principle.icon className="w-12 h-12 text-emerald-400 mb-4" />
                <h3 className="text-xl font-bold text-white mb-2">
                  {principle.title}
                </h3>
                <p className="text-sm text-neutral-300">
                  {principle.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Vision */}
      <section className="relative py-16">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold text-white mb-8">
            Our Vision
          </h2>

          <div className="space-y-6 text-lg text-neutral-300">
            <p>Social feeds will be onchain.</p>
            <p>Creators will own their rails.</p>
            <p>Builders will extend everything through Frames and SDKs.</p>
            <p>AI will act as the invisible Smart Brain across the entire stack.</p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative py-20">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Join the Revolution
          </h2>
          <p className="text-xl text-neutral-300 mb-8">
            Start building on CastQuest today
          </p>
          <div className="flex gap-4 justify-center">
            <Link href="/dashboard">
              <GlowButton className="px-6 py-3 bg-gradient-to-r from-emerald-600 to-cyan-600 hover:from-emerald-500 hover:to-cyan-500">
                Get Started
              </GlowButton>
            </Link>
            <Link href="/pricing">
              <GlowButton className="px-6 py-3">
                View Pricing
              </GlowButton>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
