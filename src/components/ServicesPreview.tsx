"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  CodeXml,
  Globe,
  Bot,
  Cpu,
  Layers,
  Zap,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import { ScrollReveal } from "@/components/ScrollMotion";

interface ServiceItem {
  id: string;
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  iconColor: string;
  slug: string;
}

const services: ServiceItem[] = [
  {
    id: "full-stack",
    title: "Freelance Full Stack Development",
    description:
      "Custom, scalable web applications built with React, Vite, Node.js, and TypeScript. Lightning-fast performance and clean APIs.",
    icon: CodeXml,
    iconColor: "text-[#1E88E5]",
    slug: "website-development",
  },
  {
    id: "wordpress",
    title: "WordPress Website Development",
    description:
      "Custom theme development, Elementor & Bricks setups, WooCommerce store scaling, and PageSpeed optimization to green 90+ scores.",
    icon: Globe,
    iconColor: "text-[#FF8F00]",
    slug: "wordpress-development",
  },
  {
    id: "ai-chatbots",
    title: "AI Chatbot Development",
    description:
      "Custom conversational AI bots trained securely on your internal documentation, PDFs, or website using RAG and Gemini/OpenAI models.",
    icon: Bot,
    iconColor: "text-[#1E88E5]",
    slug: "ai-chatbots",
  },
  {
    id: "ai-automation",
    title: "AI Automation Expert",
    description:
      "End-to-end Make.com, n8n, and Zapier pipelines that eliminate manual data entry, automate lead scoring, and sync CRMs effortlessly.",
    icon: Cpu,
    iconColor: "text-[#FF8F00]",
    slug: "ai-automation",
  },
  {
    id: "digital-solutions",
    title: "Digital Solutions Provider",
    description:
      "Full-stack digital architecture, serverless cloud setup on Vercel/AWS, Stripe payment integrations, and custom SaaS integrations.",
    icon: Layers,
    iconColor: "text-[#1E88E5]",
    slug: "digital-solutions",
  },
  {
    id: "seo-performance",
    title: "Technical SEO & Optimization",
    description:
      "Google Search Console optimization, semantic Schema.org markup, Core Web Vitals speed tuning, and conversion-focused UX layouts.",
    icon: Zap,
    iconColor: "text-[#FF8F00]",
    slug: "seo-performance",
  },
];

export default function ServicesPreview() {
  const [showAllMobile, setShowAllMobile] = useState(false);

  return (
    <section
      id="services"
      className="dark-preserve w-full py-16 sm:py-24 relative overflow-hidden transition-colors duration-300 shadow-2xl bg-gradient-to-br from-[#070B14] via-[#0B132B] to-[#050A15] text-white border-y border-slate-800/80"
    >
      {/* Ambient background glows */}
      <div className="absolute -top-20 -right-20 w-[500px] h-[500px] bg-[#1E88E5]/20 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute -bottom-20 -left-20 w-[500px] h-[500px] bg-[#FF8F00]/20 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-[1400px] mx-auto px-3 sm:px-8 lg:px-12 relative z-10">
        {/* Section Header (Matches Uploaded Screenshot Exactly 1:1) */}
        <ScrollReveal variant="pop-up">
          <div className="flex flex-col items-center justify-center text-center mb-10 sm:mb-12 lg:mb-16 gap-4 sm:gap-6">
            <div className="max-w-2xl mx-auto">
              <span className="text-xs font-mono font-bold tracking-widest text-[#FF8F00] uppercase block mb-2 sm:mb-3">
                SERVICES
              </span>
              <h2 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
                What I Can Do For You
              </h2>
            </div>

            <Link
              href="/services"
              id="view-all-services-btn"
              className="px-4 py-2 sm:px-5 sm:py-2.5 rounded-xl border border-white/30 text-white font-bold text-xs hover:border-[#FF8F00] hover:text-[#FF8F00] hover:bg-white/10 shrink-0 cursor-pointer shadow-sm transition-all"
            >
              <span className="flex items-center gap-2">
                <span>View All Services</span>
                <span className="text-[#FF8F00]">↗</span>
              </span>
            </Link>
          </div>
        </ScrollReveal>

        {/* 2-Column Mobile Grid, 3-Column Desktop Grid (Matches Screenshot Exactly) */}
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-6 lg:gap-8">
          {services.map((item, idx) => {
            const Icon = item.icon;
            const isHiddenOnMobile = idx >= 4 && !showAllMobile;

            return (
              <div
                key={item.id}
                className={`transition-all duration-300 ${
                  isHiddenOnMobile ? "hidden sm:block" : "block"
                }`}
              >
                <article className="rounded-2xl sm:rounded-3xl p-3.5 sm:p-6 md:p-8 text-center border shadow-md hover:shadow-2xl hover:-translate-y-1.5 hover:border-[#FF8F00] dark:hover:border-[#FF8F00] transition-all duration-300 flex flex-col items-center justify-center group h-full bg-white dark:bg-[#0F172A]/90 border-slate-200/90 dark:border-slate-800">
                  {/* Round Icon Container */}
                  <div className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 rounded-full border flex items-center justify-center mb-3 sm:mb-4 md:mb-6 group-hover:scale-110 group-hover:border-[#1E88E5] transition-all shadow-sm shrink-0 bg-slate-100 dark:bg-slate-900 border-slate-200 dark:border-slate-700">
                    <Icon className={`w-5 h-5 sm:w-6 sm:h-6 ${item.iconColor}`} />
                  </div>

                  {/* Service Title */}
                  <h3 className="text-xs sm:text-base md:text-xl font-bold sm:font-extrabold mb-1.5 sm:mb-3 group-hover:text-[#1E88E5] transition-colors leading-snug text-slate-900 dark:text-white">
                    {item.title}
                  </h3>

                  {/* Short Description */}
                  <p className="text-[10px] sm:text-xs md:text-sm leading-tight sm:leading-relaxed max-w-xs mx-auto text-slate-600 dark:text-slate-300">
                    {item.description}
                  </p>
                </article>
              </div>
            );
          })}
        </div>

        {/* Mobile Toggle to view remaining 2 services (Digital Solutions & SEO) */}
        <div className="sm:hidden mt-6 text-center">
          <button
            type="button"
            onClick={() => setShowAllMobile(!showAllMobile)}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 hover:bg-white/10 border border-white/15 text-slate-300 hover:text-white text-xs font-semibold tracking-wide transition-all cursor-pointer"
          >
            <span>{showAllMobile ? "Show Less" : "+ View More Services (Cloud & SEO)"}</span>
            {showAllMobile ? (
              <ChevronUp className="w-3.5 h-3.5 text-[#FF8F00]" />
            ) : (
              <ChevronDown className="w-3.5 h-3.5 text-[#FF8F00]" />
            )}
          </button>
        </div>
      </div>
    </section>
  );
}
