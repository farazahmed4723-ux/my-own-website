"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { portfolioProjects } from "@/data/portfolio";
import { ExternalLink, ArrowRight, ShieldCheck, Sparkles } from "lucide-react";
import { ScrollReveal, StaggerGrid, StaggerItem } from "@/components/ScrollMotion";

export default function PortfolioPreview() {
  const realProjects = portfolioProjects.filter((p) => p.isRealClient);
  const conceptProjects = portfolioProjects.filter((p) => !p.isRealClient).slice(0, 2);

  return (
    <section className="relative py-24 px-4 sm:px-6 lg:px-8 bg-[#060813] overflow-hidden" id="portfolio">
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <ScrollReveal variant="pop-up">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-purple-900/30 border border-purple-500/30 text-purple-300 text-xs font-semibold uppercase tracking-wider mb-4">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                <span>Verified Client Deliverables</span>
              </div>
              <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
                Featured <span className="gradient-text-purple">Client Portfolio</span>
              </h2>
              <p className="text-gray-400 text-sm sm:text-base mt-3">
                Explore authentic commercial websites and digital platforms engineered by Faraz Ahmed—designed for luxury presentation, rapid load speeds, and real customer lead conversion.
              </p>
            </div>

            <Link
              href="/portfolio"
              className="inline-flex items-center gap-2 text-sm font-semibold text-purple-400 hover:text-purple-300 transition-colors group"
            >
              <span>View All Portfolio Entries</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </ScrollReveal>

        {/* Mobile Swipe Hint */}
        <div className="sm:hidden text-center text-xs font-semibold text-gray-400 mb-3 flex items-center justify-center gap-1.5 animate-pulse">
          <span>&larr; Swipe to explore projects &rarr;</span>
        </div>

        {/* Featured Real Client Projects (Swipeable on Mobile, Stacked on Desktop) */}
        <div className="flex sm:block overflow-x-auto snap-x snap-mandatory pb-4 sm:pb-0 sm:space-y-12 mb-10 sm:mb-16 gap-4 no-scrollbar">
          {realProjects.map((project, idx) => (
            <div
              key={project.id}
              className="min-w-[88vw] sm:min-w-0 snap-center shrink-0 sm:shrink"
            >
              <ScrollReveal
                variant={idx % 2 === 0 ? "card-3d" : "zoom-pop"}
                delay={0.1}
              >
                <div
                  data-cursor="portfolio"
                  className="rounded-3xl glass-card border border-purple-500/30 overflow-hidden shadow-2xl shadow-purple-950/30 hover:border-purple-400/50 transition-all duration-500 h-full flex flex-col justify-between"
                >
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center p-6 sm:p-10 lg:p-12">
                    {/* Project Image Preview */}
                    <div className={`dark-preserve lg:col-span-7 relative group rounded-2xl overflow-hidden aspect-[16/10] border border-white/10 bg-black/60 shadow-xl ${idx % 2 === 1 ? "lg:order-2" : ""}`}>
                      <Image
                        src={project.image}
                        alt={`${project.title} Website Screenshot`}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-700"
                        priority={idx === 0}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60 group-hover:opacity-30 transition-opacity duration-500" />

                      <div className="absolute top-4 left-4 z-10 flex items-center gap-2">
                        <span className="px-3.5 py-1.5 rounded-full bg-emerald-500/20 border border-emerald-400/40 text-emerald-300 text-xs font-semibold backdrop-blur-md flex items-center gap-1.5 shadow-lg">
                          <ShieldCheck className="w-3.5 h-3.5" />
                          <span>{project.statusBadge}</span>
                        </span>
                      </div>

                      {project.liveUrl && (
                        <div className="absolute bottom-4 right-4 z-10">
                          <span className="px-3 py-1 rounded-full bg-black/70 border border-white/20 text-gray-300 text-[11px] font-medium backdrop-blur-md flex items-center gap-1.5">
                            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                            <span>Live In Production</span>
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Project Details */}
                    <div className={`lg:col-span-5 flex flex-col justify-center ${idx % 2 === 1 ? "lg:order-1" : ""}`}>
                      <span className="text-xs font-semibold tracking-wider uppercase text-purple-400 mb-2">
                        {project.category}
                      </span>

                      <h3 className="font-heading text-2xl sm:text-3xl font-extrabold text-white mb-3">
                        {project.title}
                      </h3>

                      <div className="flex flex-wrap items-center gap-3 text-xs text-gray-400 mb-4 pb-4 border-b border-white/10">
                        <span>Developer: <strong className="text-white">{project.developer}</strong></span>
                        <span>•</span>
                        <span>{project.projectType}</span>
                      </div>

                      <p className="text-sm text-gray-300 leading-relaxed mb-6">
                        {project.description}
                      </p>

                      {/* Verified Highlights */}
                      <div className="space-y-2 mb-6">
                        {project.highlights.map((item, i) => (
                          <div key={i} className="flex items-center gap-2 text-xs text-gray-300">
                            <span className="w-1.5 h-1.5 rounded-full bg-purple-400 shrink-0" />
                            <span>{item}</span>
                          </div>
                        ))}
                      </div>

                      {/* Tech Badges */}
                      <div className="flex flex-wrap gap-2 mb-7">
                        {project.technologies.map((tech, i) => (
                          <span
                            key={i}
                            className="px-2.5 py-1 rounded-md bg-white/5 border border-white/10 text-[11px] text-gray-300 font-medium"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>

                      {/* Action Buttons */}
                      <div className="flex flex-wrap items-center gap-4">
                        {project.liveUrl && (
                          <a
                            href={project.liveUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            id={`portfolio-${project.id}-live-btn`}
                            className="px-6 py-3 rounded-full bg-gradient-to-r from-[#8B5CF6] to-[#A855F7] text-white text-xs sm:text-sm font-semibold flex items-center gap-2 shadow-[0_0_20px_rgba(139,92,246,0.5)] hover:shadow-[0_0_30px_rgba(139,92,246,0.8)] transition-all hover:scale-105"
                          >
                            <span>Visit Live Website</span>
                            <ExternalLink className="w-3.5 h-3.5" />
                          </a>
                        )}
                        <Link
                          href="/portfolio"
                          className="px-5 py-3 rounded-full bg-white/5 border border-white/10 text-gray-300 hover:text-white text-xs sm:text-sm font-medium hover:bg-white/10 transition-colors"
                        >
                          Read Case Details
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            </div>
          ))}
        </div>

        {/* Concept Architecture Prototypes Grid (Desktop Only) */}
        <div className="hidden lg:block">
          <ScrollReveal variant="pop-up" delay={0.1}>
            <div className="mb-6 flex items-center justify-between">
              <h3 className="text-xl font-bold text-white flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-purple-400" />
                <span>Advanced Engineering Prototypes</span>
              </h3>
              <span className="text-xs text-gray-400">R&D & High-Scale Systems</span>
            </div>
          </ScrollReveal>

          <StaggerGrid className="grid grid-cols-1 md:grid-cols-2 gap-8" staggerDelay={0.15}>
            {conceptProjects.map((concept) => (
              <StaggerItem key={concept.id}>
                <div
                  data-cursor="portfolio"
                  className="h-full rounded-2xl p-6 glass-card border border-white/10 hover:border-purple-500/40 hover:shadow-xl hover:shadow-purple-950/20 transition-all duration-500 flex flex-col justify-between group"
                >
                  <div>
                    <div className="dark-preserve relative rounded-xl overflow-hidden aspect-[16/9] mb-5 border border-white/10 bg-black/40">
                      <Image
                        src={concept.image}
                        alt={concept.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-700"
                      />
                      <div className="absolute top-3 left-3">
                        <span className="px-3 py-1 rounded-full bg-indigo-950/80 border border-indigo-400/40 text-indigo-300 text-[11px] font-semibold backdrop-blur-md flex items-center gap-1.5">
                          <Sparkles className="w-3 h-3" />
                          <span>{concept.statusBadge}</span>
                        </span>
                      </div>
                    </div>

                    <span className="text-[11px] font-semibold tracking-wider uppercase text-gray-400">
                      {concept.category}
                    </span>
                    <h4 className="font-heading text-lg font-bold text-white mt-1 mb-2 group-hover:text-purple-300 transition-colors">
                      {concept.title}
                    </h4>
                    <p className="text-xs text-gray-400 leading-relaxed mb-4">
                      {concept.description}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-white/[0.08] flex items-center justify-between text-xs text-gray-400">
                    <span>Developer: Faraz Ahmed</span>
                    <span className="text-purple-400 font-medium">Concept Architecture</span>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </StaggerGrid>
        </div>
      </div>
    </section>
  );
}
