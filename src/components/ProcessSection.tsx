"use client";

import React from "react";
import Link from "next/link";
import {
  Search,
  FileSpreadsheet,
  Palette,
  Code2,
  CheckCircle,
  Rocket,
  ArrowRight,
} from "lucide-react";
import { ScrollReveal, StaggerGrid, StaggerItem } from "@/components/ScrollMotion";

const steps = [
  {
    number: "01",
    title: "Discovery",
    icon: Search,
    description:
      "Deep-dive consultation to understand your business objectives, target audience, competitive landscape, and technical specifications.",
  },
  {
    number: "02",
    title: "Planning",
    icon: FileSpreadsheet,
    description:
      "Formulating clear architectural blueprints, user journey wireframes, timeline milestones, and data integration diagrams.",
  },
  {
    number: "03",
    title: "Design",
    icon: Palette,
    description:
      "Crafting high-fidelity UI designs with custom color harmony, glassmorphism aesthetics, responsive layouts, and interactive motion states.",
  },
  {
    number: "04",
    title: "Development",
    icon: Code2,
    description:
      "Clean, scalable engineering using Next.js, TypeScript, Tailwind CSS, or custom WordPress themes with semantic HTML and security best practices.",
  },
  {
    number: "05",
    title: "Testing",
    icon: CheckCircle,
    description:
      "Comprehensive multi-device QA, cross-browser verification (Chrome, Safari, Edge, Firefox), performance benchmarking, and SEO checks.",
  },
  {
    number: "06",
    title: "Launch",
    icon: Rocket,
    description:
      "Production deployment, custom domain DNS configuration, SSL provisioning, Google Search Console indexing, and client handover.",
  },
];

export default function ProcessSection() {
  return (
    <section className="relative py-24 px-4 sm:px-6 lg:px-8 bg-[#060813] overflow-hidden" id="process">
      {/* Background radial accent */}
      <div className="absolute top-1/2 right-1/4 w-[600px] h-[600px] bg-purple-900/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <ScrollReveal variant="pop-up">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-purple-900/30 border border-purple-500/30 text-purple-300 text-xs font-semibold uppercase tracking-wider mb-4">
              Structured Execution
            </div>
            <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight mb-4">
              My Proven <span className="gradient-text-purple">Development Process</span>
            </h2>
            <p className="text-gray-400 text-sm sm:text-base leading-relaxed">
              From initial strategy to final deployment, every project follows a predictable, transparent 6-stage engineering roadmap.
            </p>
          </div>
        </ScrollReveal>

        {/* 6 Step Process Cards Grid with 3D Stagger Wave */}
        <StaggerGrid className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8" staggerDelay={0.1}>
          {steps.map((step) => {
            const Icon = step.icon;

            return (
              <StaggerItem key={step.number}>
                <div className="h-full relative group p-7 rounded-2xl glass-card border border-white/10 hover:border-purple-500/40 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_0_30px_rgba(139,92,246,0.25)] flex flex-col justify-between">
                  <div>
                    {/* Step Number Watermark */}
                    <span className="absolute top-5 right-6 font-heading text-3xl font-black text-white/5 group-hover:text-purple-500/15 transition-colors pointer-events-none">
                      {step.number}
                    </span>

                    <div className="w-12 h-12 rounded-xl bg-purple-600/20 border border-purple-500/30 flex items-center justify-center text-purple-300 mb-5 group-hover:scale-110 group-hover:bg-purple-600/30 transition-all duration-300">
                      <Icon className="w-6 h-6" />
                    </div>

                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-xs font-bold text-purple-400">STAGE {step.number}</span>
                      <span className="w-1 h-1 rounded-full bg-gray-500" />
                      <h3 className="font-heading text-lg font-bold text-white group-hover:text-purple-300 transition-colors">
                        {step.title}
                      </h3>
                    </div>

                    <p className="text-xs sm:text-sm text-gray-400 leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </div>
              </StaggerItem>
            );
          })}
        </StaggerGrid>

        {/* Bottom Process Link */}
        <ScrollReveal variant="pop-up" delay={0.2}>
          <div className="mt-14 text-center">
            <Link
              href="/process"
              className="inline-flex items-center gap-2 text-sm font-semibold text-purple-400 hover:text-purple-300 transition-colors group"
            >
              <span>Learn More About Project Milestones & Deliverables</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
