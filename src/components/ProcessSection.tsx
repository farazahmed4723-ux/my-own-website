"use client";

import React, { useState } from "react";
import { Search, Users, RefreshCw, Rocket, ChevronDown, ChevronUp } from "lucide-react";
import { ScrollReveal } from "@/components/ScrollMotion";

interface ProcessStep {
  number: string;
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  iconColor: string;
}

const steps: ProcessStep[] = [
  {
    number: "01",
    title: "Optimized production process",
    description:
      "A proven, refined workflow keeps production clear, efficient, on time, and within budget.",
    icon: Search,
    iconColor: "text-[#1E88E5]",
  },
  {
    number: "02",
    title: "Collaborative approach",
    description:
      "You get a dedicated project manager and a smooth partnership where every detail stays aligned.",
    icon: Users,
    iconColor: "text-[#FF8F00]",
  },
  {
    number: "03",
    title: "Flexibility for revisions",
    description:
      "We welcome stakeholder feedback and refine the draft until it is ready for confident production.",
    icon: RefreshCw,
    iconColor: "text-[#1E88E5]",
  },
  {
    number: "04",
    title: "Personalized client support",
    description:
      "Our team gives hands-on support at every stage, from kickoff through delivery and beyond.",
    icon: Rocket,
    iconColor: "text-[#FF8F00]",
  },
];

export default function ProcessSection() {
  const [showAllMobile, setShowAllMobile] = useState(false);

  return (
    <section
      id="process"
      className="w-full py-20 sm:py-24 relative overflow-hidden transition-colors duration-300 shadow-xl dark:shadow-2xl bg-gradient-to-b from-[#EEF2FF] via-[#E0E7FF]/70 to-[#F5F3FF] dark:bg-gradient-to-br dark:from-[#0B469C] dark:via-[#0E2A60] dark:to-[#0F1B3D] text-slate-900 dark:text-white border-y border-blue-200 dark:border-blue-400/25 select-none touch-manipulation"
      style={{ WebkitTouchCallout: "none", WebkitUserSelect: "none", userSelect: "none" }}
    >
      {/* Ambient background studio lighting */}
      <div className="absolute -top-20 -left-20 w-[600px] h-[600px] bg-[#2563EB]/25 dark:bg-[#2563EB]/38 rounded-full blur-[140px] pointer-events-none select-none" />
      <div className="absolute -bottom-20 -right-20 w-[550px] h-[550px] bg-[#FF8F00]/20 dark:bg-[#FF8F00]/26 rounded-full blur-[140px] pointer-events-none select-none" />

      <div className="max-w-[1400px] mx-auto px-4 sm:px-8 lg:px-12 relative z-10 select-none">
        {/* Section Header */}
        <ScrollReveal variant="pop-up" className="mb-12 lg:mb-16 select-none">
          <div className="select-none">
            <span className="text-xs font-mono font-bold tracking-widest text-[#FF8F00] uppercase block mb-3 select-none">
              MY PROCESS
            </span>
            <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight select-none">
              From Idea to <span className="gradient-text-purple">Impact</span>
            </h2>
          </div>
        </ScrollReveal>

        {/* 4-Step Process Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 sm:gap-8 select-none">
          {steps.map((step, idx) => {
            const Icon = step.icon;
            const isHiddenOnMobile = idx >= 2 && !showAllMobile;

            return (
              <ScrollReveal
                key={step.number}
                variant="pop-up"
                delay={idx * 0.07}
                className={isHiddenOnMobile ? "hidden sm:block" : "block"}
              >
                <div
                  draggable={false}
                  onDragStart={(e) => e.preventDefault()}
                  style={{ WebkitUserSelect: "none", userSelect: "none", WebkitTouchCallout: "none" }}
                  className="flex flex-col items-start group h-full transition-all duration-300 select-none cursor-default"
                >
                  {/* Round Icon Container with Top-Right Orange Badge */}
                  <div
                    draggable={false}
                    onDragStart={(e) => e.preventDefault()}
                    style={{ WebkitUserSelect: "none", userSelect: "none" }}
                    className="relative mb-6 select-none pointer-events-none"
                  >
                    <div className="w-16 h-16 rounded-full border shadow-md dark:shadow-lg flex items-center justify-center sm:group-hover:scale-110 transition-transform bg-white dark:bg-[#0F2350]/90 border-blue-200 dark:border-blue-400/35 select-none">
                      <Icon className={`w-6 h-6 ${step.iconColor}`} />
                    </div>
                    <div className="absolute -top-2 -right-2 w-7 h-7 rounded-full bg-[#FF8F00] text-white font-mono font-bold text-xs flex items-center justify-center shadow-md border-2 border-white dark:border-[#0F2350] select-none">
                      {step.number}
                    </div>
                  </div>

                  {/* Step Title */}
                  <h3
                    draggable={false}
                    style={{ WebkitUserSelect: "none", userSelect: "none" }}
                    className="font-heading text-xl font-extrabold text-slate-900 dark:text-white mb-3 leading-snug sm:group-hover:text-blue-600 dark:sm:group-hover:text-[#90CAF9] transition-colors select-none"
                  >
                    {step.title}
                  </h3>

                  {/* Step Description */}
                  <p
                    draggable={false}
                    style={{ WebkitUserSelect: "none", userSelect: "none" }}
                    className="text-slate-600 dark:text-slate-300 text-xs sm:text-sm leading-relaxed max-w-xs select-none"
                  >
                    {step.description}
                  </p>
                </div>
              </ScrollReveal>
            );
          })}
        </div>

        {/* Mobile Toggle to view all 4 steps or keep compact */}
        <div className="sm:hidden mt-8 text-center select-none">
          <button
            type="button"
            onClick={() => setShowAllMobile(!showAllMobile)}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-200/80 hover:bg-slate-300 active:bg-slate-300/90 dark:bg-white/5 dark:hover:bg-white/10 dark:active:bg-white/20 border border-slate-300 dark:border-white/15 text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white text-xs font-semibold tracking-wide transition-all cursor-pointer select-none touch-manipulation"
          >
            <span className="select-none">{showAllMobile ? "Show Less" : "View All 4 Steps (Revisions & Support)"}</span>
            {showAllMobile ? <ChevronUp className="w-3.5 h-3.5 text-[#FF8F00]" /> : <ChevronDown className="w-3.5 h-3.5 text-[#FF8F00]" />}
          </button>
        </div>
      </div>
    </section>
  );
}
