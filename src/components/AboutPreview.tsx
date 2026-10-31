"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, CheckCircle } from "lucide-react";
import FounderShowcaseCard from "@/components/FounderShowcaseCard";
import { ScrollReveal, StaggerGrid, StaggerItem } from "@/components/ScrollMotion";

const corePrinciples = [
  {
    title: "Modern Clean Architecture",
    desc: "Semantic code, fast SSR/SSG, responsive layouts, and zero bloat.",
  },
  {
    title: "Pragmatic AI Integration",
    desc: "Tested AI agents and chatbots tailored to specific business operations.",
  },
  {
    title: "Direct Communication",
    desc: "Work directly with Faraz—no middlemen, no account executive delays.",
  },
  {
    title: "End-to-End Ownership",
    desc: "From discovery and design to testing, domain deployment, and handover.",
  },
];

export default function AboutPreview() {
  return (
    <section className="relative py-24 px-4 sm:px-6 lg:px-8 bg-[#070918] overflow-hidden" id="about">
      {/* Ambient background glow */}
      <div className="absolute top-1/3 left-10 w-[500px] h-[500px] bg-purple-900/15 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Interactive Founder Showcase Bento Card — Zoom & Slide Left */}
          <ScrollReveal
            variant="slide-left"
            className="lg:col-span-5 relative flex justify-center items-center"
          >
            <FounderShowcaseCard subtitle="Web Developer & AI Solutions Specialist" />
          </ScrollReveal>

          {/* Right Column: Bio & Core Philosophy — Slide Right + Staggered Value Cards */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            <ScrollReveal variant="slide-right">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-purple-900/30 border border-purple-500/30 text-purple-300 text-xs font-semibold uppercase tracking-wider mb-4 w-fit">
                Meet The Developer
              </div>

              <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight mb-6">
                Engineering Intelligent Systems That{" "}
                <span className="gradient-text-purple">Help Businesses Scale</span>
              </h2>

              <div className="space-y-4 text-sm sm:text-base text-gray-300 leading-relaxed mb-8">
                <p>
                  Hello, I&apos;m <strong>Faraz Ahmed</strong>. I am an independent web developer and AI solutions specialist dedicated to engineering digital experiences that marry clean architecture with high conversion.
                </p>
                <p>
                  My focus centers on developing modern websites using <strong>WordPress</strong> and <strong>Next.js</strong>, crafting intelligent <strong>AI chatbots</strong> trained on proprietary business data, building <strong>automation workflows</strong> that eliminate manual repetition, and delivering tailored digital systems.
                </p>
                <p>
                  Rather than treating web development as an isolated design exercise, I approach every project with an engineer&apos;s mindset: high performance, bulletproof security, rock-solid technical SEO, and practical business utility.
                </p>
              </div>
            </ScrollReveal>

            {/* Core Values / Work Principles — Cascading 2x2 Zoom-Pop */}
            <StaggerGrid className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
              {corePrinciples.map((item) => (
                <StaggerItem key={item.title}>
                  <div className="flex items-start gap-3 p-4 rounded-xl bg-white/[0.03] border border-white/[0.06] hover:border-purple-500/35 transition-colors h-full">
                    <CheckCircle className="w-5 h-5 text-purple-400 mt-0.5 shrink-0" />
                    <div>
                      <h4 className="font-heading text-sm font-semibold text-white">
                        {item.title}
                      </h4>
                      <p className="text-xs text-gray-400 mt-0.5">{item.desc}</p>
                    </div>
                  </div>
                </StaggerItem>
              ))}
            </StaggerGrid>

            <ScrollReveal variant="pop-up" delay={0.1}>
              <div className="flex flex-wrap items-center gap-4">
                <Link
                  href="/about"
                  className="px-6 py-3 rounded-full bg-gradient-to-r from-[#8B5CF6] to-[#A855F7] text-white text-xs sm:text-sm font-semibold flex items-center gap-2 shadow-[0_0_20px_rgba(139,92,246,0.4)] hover:shadow-[0_0_30px_rgba(139,92,246,0.7)] transition-all hover:scale-105 active:scale-95"
                >
                  <span>Read Full Biography & Background</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  href="/contact"
                  className="px-6 py-3 rounded-full bg-white/5 border border-white/10 text-gray-300 hover:text-white text-xs sm:text-sm font-medium hover:bg-white/10 hover:scale-105 active:scale-95 transition-all"
                >
                  Discuss A Project
                </Link>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </section>
  );
}
