"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { portfolioProjects } from "@/data/portfolio";
import { ExternalLink, ArrowUpRight, Sparkles } from "lucide-react";
import { ScrollReveal } from "@/components/ScrollMotion";

type CategoryFilter = "All" | "Full Stack" | "WordPress";

export default function PortfolioPreview() {
  const [selectedCategory, setSelectedCategory] = useState<CategoryFilter>("All");

  const categories: CategoryFilter[] = ["All", "Full Stack", "WordPress"];

  const filteredProjects = portfolioProjects.filter((p) => {
    if (selectedCategory === "All") return true;
    if (selectedCategory === "Full Stack") {
      return p.badgeType === "Full Stack" || p.category.toLowerCase().includes("full stack");
    }
    if (selectedCategory === "WordPress") {
      return p.badgeType === "WordPress" || p.category.toLowerCase().includes("wordpress");
    }
    return true;
  });

  return (
    <section className="relative py-16 sm:py-24 px-4 sm:px-6 lg:px-8 bg-[#F8FAFC] dark:bg-[#060813] overflow-hidden transition-colors duration-300" id="portfolio">
      {/* Background Ambient Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[380px] bg-purple-300/20 dark:bg-purple-900/15 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header (Matches Uploaded Screenshot Exactly) */}
        <ScrollReveal variant="pop-up" className="text-center max-w-3xl mx-auto mb-8 sm:mb-12">
          {/* Top Pill Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-purple-50 dark:bg-white/5 border border-purple-200/80 dark:border-white/10 text-purple-700 dark:text-sky-300 text-[11px] font-semibold uppercase tracking-wider mb-3.5 shadow-sm">
            <span>SELECTED WORK</span>
          </div>

          {/* Main Section Headline */}
          <h2 className="font-heading text-2xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-6">
            Featured Projects &amp; <span className="gradient-text-purple">Solutions</span>
          </h2>

          {/* Filter Tabs (All | Full Stack | WordPress) */}
          <div className="inline-flex items-center p-1 rounded-full bg-slate-200/70 dark:bg-[#0f142e] border border-slate-300/60 dark:border-white/10 shadow-inner gap-1">
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className={`px-5 py-2 rounded-full text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                  selectedCategory === cat
                    ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md shadow-blue-600/30"
                    : "text-slate-600 hover:text-slate-900 dark:text-gray-400 dark:hover:text-white"
                }`}
              >
                <span>{cat}</span>
              </button>
            ))}
          </div>
        </ScrollReveal>

        {/* Swipeable Projects Track (Side-by-Side sliding on Mobile, Responsive Grid on Tablet/Desktop) */}
        <div className="flex overflow-x-auto snap-x snap-mandatory pb-4 px-1 gap-4 sm:gap-6 no-scrollbar sm:grid sm:grid-cols-2 lg:grid-cols-3">
          {filteredProjects.map((project, idx) => (
            <div
              key={project.id}
              className="w-[86vw] max-w-[360px] sm:w-auto snap-center shrink-0 flex flex-col justify-between rounded-3xl bg-white dark:bg-[#0f142e] border border-slate-200/90 dark:border-white/10 shadow-[0_10px_30px_rgba(15,23,42,0.06)] dark:shadow-none overflow-hidden transition-all duration-300 hover:border-purple-400/50 dark:hover:border-purple-500/40 hover:-translate-y-1 hover:shadow-xl group"
              data-cursor="portfolio"
            >
              {/* Top Image Preview with Verified Badges */}
              <div className="relative aspect-[16/10] overflow-hidden bg-black/40">
                <Image
                  src={project.image}
                  alt={`${project.title} Screenshot`}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  priority={idx === 0}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-300" />

                {/* Top-Left Category Badge */}
                <div className="absolute top-3.5 left-3.5 z-10">
                  <span className="px-3 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/20 text-white text-[10.5px] font-mono font-bold flex items-center gap-1.5 shadow-md">
                    <span>{project.badgeType === "WordPress" ? "🌐 WordPress" : "</> Full Stack"}</span>
                  </span>
                </div>

                {/* Top-Right Live Site Pill */}
                {project.liveUrl && (
                  <div className="absolute top-3.5 right-3.5 z-10">
                    <span className="px-2.5 py-1 rounded-full bg-emerald-500/90 backdrop-blur-md text-white text-[10.5px] font-bold flex items-center gap-1 shadow-md">
                      <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                      <span>Live Site</span>
                    </span>
                  </div>
                )}

                {/* Bottom-Right Performance Metric */}
                <div className="absolute bottom-3 right-3.5 z-10">
                  <span className="px-2.5 py-0.5 rounded-md bg-black/75 backdrop-blur-md border border-white/10 text-amber-300 text-[10px] font-mono flex items-center gap-1">
                    <span className="text-amber-400">↗</span>
                    <span>{project.performanceBadge || "Performance: Sub-1s Load"}</span>
                  </span>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-heading font-extrabold text-base sm:text-lg text-slate-900 dark:text-white mb-1.5 line-clamp-1 group-hover:text-purple-600 dark:group-hover:text-purple-300 transition-colors">
                    {project.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-slate-600 dark:text-gray-400 line-clamp-2 leading-relaxed mb-4">
                    {project.description}
                  </p>

                  {/* Technology Tags */}
                  <div className="flex flex-wrap gap-1.5 mb-5">
                    {project.technologies.slice(0, 5).map((tech, i) => (
                      <span
                        key={i}
                        className="px-2 py-0.5 rounded-md bg-slate-100 dark:bg-white/5 border border-slate-200/60 dark:border-white/10 text-[10.5px] text-slate-700 dark:text-gray-300 font-medium"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Dual Action Buttons (Case Study ↗ & Live ↗) */}
                <div className="flex items-center gap-2 pt-3 border-t border-slate-100 dark:border-white/10">
                  <Link
                    href={`/portfolio`}
                    className="flex-1 py-2.5 rounded-xl border border-slate-200 dark:border-white/15 bg-slate-50 hover:bg-slate-100 dark:bg-white/5 dark:hover:bg-white/10 text-amber-600 dark:text-amber-400 font-bold text-xs flex items-center justify-center gap-1.5 transition-all"
                  >
                    <span>Case Study</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </Link>

                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-md shadow-blue-600/30 transition-all hover:scale-105 active:scale-95"
                    >
                      <span>Live</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Mobile Swipe Hint at Bottom (Matching Uploaded Screenshot Exactly) */}
        <div className="sm:hidden text-center text-xs font-semibold text-slate-500 dark:text-gray-400 mt-5 flex items-center justify-center gap-1.5 animate-pulse">
          <span>&larr; Swipe to explore projects &rarr;</span>
        </div>
      </div>
    </section>
  );
}
