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
      "A decade-refined workflow keeps production clear, efficient, on time, and within budget.",
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
      className="dark-preserve w-full py-20 sm:py-24 relative overflow-hidden transition-colors duration-300 shadow-2xl bg-gradient-to-br from-[#070B14] via-[#0B132B] to-[#050A15] text-white border-y border-slate-800/80 select-none touch-manipulation"
      style={{ WebkitTouchCallout: "none", WebkitUserSelect: "none", userSelect: "none" }}
    >
      {/* Ambient background glows */}
      <div className="absolute -top-20 -left-20 w-[500px] h-[500px] bg-[#1E88E5]/15 rounded-full blur-[140px] pointer-events-none select-none" />
      <div className="absolute -bottom-20 -right-20 w-[500px] h-[500px] bg-[#FF8F00]/15 rounded-full blur-[140px] pointer-events-none select-none" />

      <div className="max-w-[1400px] mx-auto px-4 sm:px-8 lg:px-12 relative z-10 select-none">
        {/* Section Header */}
        <ScrollReveal variant="pop-up" className="mb-12 lg:mb-16 select-none">
          <div className="select-none">
            <span className="text-xs font-mono font-bold tracking-widest text-[#FF8F00] uppercase block mb-3 select-none">
              MY PROCESS
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight select-none">
              From Idea to Impact
            </h2>
          </div>
        </ScrollReveal>

        {/* 4-Step Process Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 sm:gap-8 select-none">
          {steps.map((step, idx) => {
            const Icon = step.icon;
            const isHiddenOnMobile = idx >= 2 && !showAllMobile;

            return (
              <div
                key={step.number}
                draggable={false}
                style={{ WebkitUserSelect: "none", userSelect: "none", WebkitTouchCallout: "none" }}
                className={`flex-col items-start group h-full transition-all duration-300 select-none cursor-default ${
                  isHiddenOnMobile ? "hidden sm:flex" : "flex"
                }`}
              >
                {/* Round Icon Container with Top-Right Orange Badge */}
                <div
                  draggable={false}
                  style={{ WebkitUserSelect: "none", userSelect: "none" }}
                  className="relative mb-6 select-none pointer-events-none"
                >
                  <div className="w-16 h-16 rounded-full border shadow-lg flex items-center justify-center group-hover:scale-110 transition-transform bg-slate-900 border-slate-700 select-none">
                    <Icon className={`w-6 h-6 ${step.iconColor}`} />
                  </div>
                  <div className="absolute -top-2 -right-2 w-7 h-7 rounded-full bg-[#FF8F00] text-white font-mono font-bold text-xs flex items-center justify-center shadow-md border-2 border-slate-900 select-none">
                    {step.number}
                  </div>
                </div>

                {/* Step Title */}
                <h3
                  draggable={false}
                  style={{ WebkitUserSelect: "none", userSelect: "none" }}
                  className="text-xl font-extrabold text-white mb-3 leading-snug group-hover:text-[#90CAF9] transition-colors select-none"
                >
                  {step.title}
                </h3>

                {/* Step Description */}
                <p
                  draggable={false}
                  style={{ WebkitUserSelect: "none", userSelect: "none" }}
                  className="text-slate-300 text-xs sm:text-sm leading-relaxed max-w-xs select-none"
                >
                  {step.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* Mobile Toggle to view all 4 steps or keep compact */}
        <div className="sm:hidden mt-8 text-center select-none">
          <button
            type="button"
            onClick={() => setShowAllMobile(!showAllMobile)}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 hover:bg-white/10 active:bg-white/20 border border-white/15 text-slate-300 hover:text-white text-xs font-semibold tracking-wide transition-all cursor-pointer select-none touch-manipulation"
          >
            <span className="select-none">{showAllMobile ? "Show Less" : "View All 4 Steps (Revisions & Support)"}</span>
            {showAllMobile ? <ChevronUp className="w-3.5 h-3.5 text-[#FF8F00]" /> : <ChevronDown className="w-3.5 h-3.5 text-[#FF8F00]" />}
          </button>
        </div>
      </div>
    </section>
  );
}
