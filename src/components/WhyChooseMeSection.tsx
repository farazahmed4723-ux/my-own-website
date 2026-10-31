"use client";

import React from "react";
import { Zap, Bot, Sparkles, ShieldCheck } from "lucide-react";
import { ScrollReveal, StaggerGrid, StaggerItem } from "@/components/ScrollMotion";

const reasons = [
  {
    icon: Zap,
    title: "High-Speed Execution",
    description:
      "Rapid delivery without sacrificing code quality. Projects are built modularly and launched on schedule.",
    iconColor: "text-amber-500 dark:text-amber-400",
    iconBg: "bg-amber-500/10 border-amber-500/25 dark:bg-amber-400/15 dark:border-amber-400/30",
  },
  {
    icon: Bot,
    title: "Cutting-Edge AI Edge",
    description:
      "Incorporate intelligent Gemini & OpenAI models directly into your web apps and operational workflows.",
    iconColor: "text-sky-600 dark:text-sky-400",
    iconBg: "bg-sky-500/10 border-sky-500/25 dark:bg-sky-400/15 dark:border-sky-400/30",
  },
  {
    icon: Sparkles,
    title: "Ultra-Premium Visual UI",
    description:
      "Modern glassmorphism, soft gradients, smooth hover effects, and responsive mobile-first layouts.",
    iconColor: "text-purple-600 dark:text-purple-400",
    iconBg: "bg-purple-500/10 border-purple-500/25 dark:bg-purple-400/15 dark:border-purple-400/30",
  },
  {
    icon: ShieldCheck,
    title: "Clean & Scalable Codebase",
    description:
      "Well-structured, documented React & WordPress code engineered for maintainability and security.",
    iconColor: "text-emerald-600 dark:text-emerald-400",
    iconBg: "bg-emerald-500/10 border-emerald-500/25 dark:bg-emerald-400/15 dark:border-emerald-400/30",
  },
];

export default function WhyChooseMeSection() {
  return (
    <section className="relative py-16 sm:py-24 px-4 sm:px-6 lg:px-8 bg-[#F8FAFC] dark:bg-[#060813] overflow-hidden transition-colors duration-300" id="why-hire-me">
      {/* Background Ambient Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[350px] bg-purple-300/20 dark:bg-purple-900/15 rounded-full blur-[130px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header (Matching Reference Pic 3 Exactly) */}
        <ScrollReveal variant="pop-up" className="text-center max-w-3xl mx-auto mb-10 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-purple-50 dark:bg-white/5 border border-purple-200/80 dark:border-white/10 text-purple-700 dark:text-sky-300 text-[11px] font-semibold uppercase tracking-wider mb-3.5 shadow-sm">
            <span>WHY HIRE ME</span>
          </div>
          <h2 className="font-heading text-2xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-3">
            Why Clients Choose My <span className="gradient-text-purple">Digital Solutions</span>
          </h2>
          <p className="text-slate-600 dark:text-gray-400 text-xs sm:text-base leading-relaxed max-w-2xl mx-auto">
            Combining world-class engineering, modern design aesthetics, and cutting-edge AI capabilities to deliver exceptional business outcomes.
          </p>
        </ScrollReveal>

        {/* 2x2 Grid on Mobile, 4-col on Desktop (Matching Pic 3 Exactly 1:1) */}
        <StaggerGrid className="grid grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-6" stagger={0.08}>
          {reasons.map((item) => {
            const Icon = item.icon;
            return (
              <StaggerItem key={item.title}>
                <div className="h-full p-3.5 sm:p-7 rounded-2xl sm:rounded-3xl bg-white dark:bg-[#0f142e]/85 border border-slate-200/90 dark:border-white/10 hover:border-purple-400/60 dark:hover:border-purple-500/40 shadow-[0_4px_25px_rgba(15,23,42,0.06)] dark:shadow-none hover:shadow-xl hover:shadow-purple-500/10 dark:hover:shadow-purple-950/25 transition-all duration-300 flex flex-col justify-between group">
                  <div>
                    <div
                      className={`w-8 h-8 sm:w-12 sm:h-12 rounded-lg sm:rounded-2xl ${item.iconBg} border flex items-center justify-center ${item.iconColor} mb-2.5 sm:mb-5 group-hover:scale-110 transition-transform shadow-sm`}
                    >
                      <Icon className="w-4 h-4 sm:w-6 sm:h-6" />
                    </div>

                    <h3 className="font-heading text-xs sm:text-lg font-bold text-slate-900 dark:text-white mb-1.5 group-hover:text-purple-600 dark:group-hover:text-purple-300 transition-colors leading-tight">
                      {item.title}
                    </h3>

                    <p className="text-[10.5px] sm:text-sm text-slate-600 dark:text-gray-400 leading-snug sm:leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>
              </StaggerItem>
            );
          })}
        </StaggerGrid>
      </div>
    </section>
  );
}


