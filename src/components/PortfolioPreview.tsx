"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { portfolioProjects } from "@/data/portfolio";
import { ExternalLink, ArrowUpRight, Play, X, MessageCircle } from "lucide-react";
import { ScrollReveal } from "@/components/ScrollMotion";
import VideoPortfolioGallery from "@/components/VideoPortfolioGallery";

type CategoryFilter = "All" | "Full Stack" | "WordPress" | "Video Editing";

export default function PortfolioPreview() {
  const [selectedCategory, setSelectedCategory] = useState<CategoryFilter>("All");
  const [playingInlineId, setPlayingInlineId] = useState<string | null>(null);
  const [modalProject, setModalProject] = useState<typeof portfolioProjects[0] | null>(null);

  const categories: CategoryFilter[] = ["All", "Full Stack", "WordPress", "Video Editing"];

  const filteredProjects = portfolioProjects.filter((p) => {
    if (selectedCategory === "All") return true;
    if (selectedCategory === "Full Stack") {
      return p.badgeType === "Full Stack" || p.category.toLowerCase().includes("full stack");
    }
    if (selectedCategory === "WordPress") {
      return p.badgeType === "WordPress" || p.category.toLowerCase().includes("wordpress");
    }
    if (selectedCategory === "Video Editing") {
      return p.badgeType === "Video Editing" || p.category.toLowerCase().includes("video");
    }
    return true;
  });

  return (
    <section className="relative py-16 sm:py-24 px-4 sm:px-6 lg:px-8 bg-transparent overflow-hidden transition-colors duration-300" id="portfolio">
      {/* Background Ambient Studio Lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[450px] bg-purple-400/20 dark:bg-purple-600/22 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-1/3 -left-20 w-[550px] h-[550px] bg-sky-500/18 dark:block hidden rounded-full blur-[140px] pointer-events-none" />

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

          {/* Filter Tabs (All | Full Stack | WordPress | Video Editing) */}
          <div className="inline-flex max-w-full overflow-x-auto no-scrollbar items-center p-1 rounded-full bg-slate-200/70 dark:bg-[#0f142e] border border-slate-300/60 dark:border-white/10 shadow-inner gap-1 px-1.5">
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className={`shrink-0 px-3.5 sm:px-5 py-2 rounded-full text-xs sm:text-sm font-bold transition-all cursor-pointer ${
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

        {/* Dedicated 9:16 Video Editing Gallery when "Video Editing" tab is selected, or standard project grid */}
        {selectedCategory === "Video Editing" ? (
          <div className="mt-2">
            <div className="mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 rounded-2xl bg-purple-500/10 border border-purple-500/20">
              <p className="text-xs sm:text-sm text-purple-700 dark:text-purple-300 font-medium">
                Want to see the full before-and-after breakdown, scope packages, and all viral reels?
              </p>
              <Link
                href="/video-editing"
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold transition-all shadow-md shrink-0 w-fit"
              >
                <span>See all video edits &amp; Before/After &rarr;</span>
              </Link>
            </div>
            <VideoPortfolioGallery compactHeader />
          </div>
        ) : (
        <>
        {/* Swipeable Projects Track (Side-by-Side sliding on Mobile, Responsive Grid on Tablet/Desktop) */}
        <ScrollReveal variant="pop-up" amount={0.04}>
          <div className="flex overflow-x-auto snap-x snap-mandatory pb-4 px-1 gap-4 sm:gap-6 no-scrollbar sm:grid sm:grid-cols-2 lg:grid-cols-3">
          {filteredProjects.map((project, idx) => (
            <div
              key={project.id}
              className="w-[86vw] max-w-[360px] sm:w-auto snap-center shrink-0 flex flex-col justify-between rounded-3xl bg-white dark:bg-[#0f142e] border border-slate-200/90 dark:border-white/10 shadow-[0_10px_30px_rgba(15,23,42,0.06)] dark:shadow-none overflow-hidden transition-all duration-300 hover:border-purple-400/50 dark:hover:border-purple-500/40 hover:-translate-y-1 hover:shadow-xl group"
              data-cursor="portfolio"
            >
              {/* Top Image / Video Preview with Verified Badges */}
              <div className="relative aspect-[16/10] overflow-hidden bg-black/40">
                {project.videoUrl && playingInlineId === project.id ? (
                  <video
                    src={project.videoUrl}
                    poster={project.image}
                    autoPlay
                    controls
                    playsInline
                    preload="metadata"
                    className="w-full h-full object-contain bg-[#070A1A] relative z-20"
                  />
                ) : (
                  <>
                    <Image
                      src={project.image}
                      alt={`${project.title} Screenshot`}
                      fill
                      sizes="(max-width: 640px) 90vw, (max-width: 1024px) 45vw, 380px"
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                      priority={idx === 0}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-300" />
                    {project.videoUrl && (
                      <button
                        type="button"
                        onClick={() => setModalProject(project)}
                        aria-label={`Play ${project.title}`}
                        className="absolute inset-0 z-20 flex items-center justify-center cursor-pointer group/play"
                      >
                        <span className="relative flex items-center justify-center w-14 h-14 rounded-full bg-gradient-to-tr from-[#2563EB] via-[#7C3AED] to-[#EC4899] text-white shadow-[0_0_28px_rgba(124,58,237,0.65)] group-hover/play:scale-110 transition-transform duration-300">
                          <span className="absolute inset-0 rounded-full bg-purple-500/40 animate-ping opacity-60" />
                          <Play className="w-6 h-6 fill-white ml-0.5 relative z-10" />
                        </span>
                      </button>
                    )}
                  </>
                )}

                {/* Top-Left Category Badge */}
                <div className="absolute top-3.5 left-3.5 z-30 pointer-events-none">
                  <span className="px-3 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/20 text-white text-[10.5px] font-mono font-bold flex items-center gap-1.5 shadow-md">
                    <span>
                      {project.badgeType === "WordPress"
                        ? "🌐 WordPress"
                        : project.badgeType === "Video Editing"
                          ? "🎬 Video Editing"
                          : "</> Full Stack"}
                    </span>
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
                    <span>{project.performanceBadge || "Speed-Optimized Build"}</span>
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
                    href={project.videoUrl ? "/video-editing" : "/portfolio"}
                    className="flex-1 py-2.5 rounded-xl border border-slate-200 dark:border-white/15 bg-slate-50 hover:bg-slate-100 dark:bg-white/5 dark:hover:bg-white/10 text-amber-600 dark:text-amber-400 font-bold text-xs flex items-center justify-center gap-1.5 transition-all"
                  >
                    <span>{project.videoUrl ? "Full Showcase" : "Case Study"}</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </Link>

                  {project.videoUrl ? (
                    <button
                      type="button"
                      onClick={() => setModalProject(project)}
                      className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-md shadow-blue-600/30 transition-all hover:scale-105 active:scale-95 cursor-pointer"
                    >
                      <Play className="w-3.5 h-3.5 fill-white" />
                      <span>Watch Reel</span>
                    </button>
                  ) : project.liveUrl ? (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-md shadow-blue-600/30 transition-all hover:scale-105 active:scale-95"
                    >
                      <span>Live</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  ) : null}
                </div>
              </div>
            </div>
          ))}
          </div>
        </ScrollReveal>

        {/* Mobile Swipe Hint at Bottom */}
        <div className="sm:hidden text-center text-xs font-semibold text-slate-500 dark:text-gray-400 mt-5 flex items-center justify-center gap-1.5 animate-pulse">
          <span>&larr; Swipe to explore projects &rarr;</span>
        </div>

        {/* Dedicated Video Editing Link Band */}
        <div className="mt-8 pt-6 border-t border-slate-200/60 dark:border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <p className="text-xs sm:text-sm text-slate-600 dark:text-gray-400">
            Looking for high-retention viral video editing for Reels, TikTok &amp; YouTube Shorts?
          </p>
          <Link
            href="/video-editing"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-purple-600/10 hover:bg-purple-600/20 text-purple-600 dark:text-purple-300 border border-purple-500/30 text-xs font-bold transition-all hover:scale-105"
          >
            <span>See all video edits, packages &amp; Before/After &rarr;</span>
          </Link>
        </div>
        </>
        )}
      </div>

      {/* Accessible Mobile-Optimized Fullscreen Vertical Reel Modal */}
      {modalProject && modalProject.videoUrl && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={`Playing ${modalProject.title}`}
          className="fixed inset-0 z-[80] flex items-center justify-center bg-black/90 backdrop-blur-md p-3 sm:p-6"
          onClick={() => setModalProject(null)}
        >
          <div
            className="relative w-full max-w-sm sm:max-w-md max-h-[92vh] bg-white dark:bg-[#0c102a] rounded-3xl border border-slate-200 dark:border-white/15 overflow-hidden shadow-2xl flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between p-3.5 border-b border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-[#080b1e]">
              <div className="flex items-center gap-2 overflow-hidden">
                <span className="px-2 py-0.5 rounded bg-purple-100 dark:bg-purple-500/20 text-purple-700 dark:text-purple-300 text-[10px] font-mono font-bold shrink-0">
                  🎬 HD 9:16
                </span>
                <h4 className="font-heading text-xs sm:text-sm font-bold text-slate-900 dark:text-white truncate">
                  {modalProject.title}
                </h4>
              </div>

              <button
                type="button"
                onClick={() => setModalProject(null)}
                aria-label="Close video player"
                className="w-8 h-8 rounded-full bg-slate-200/80 hover:bg-slate-300 dark:bg-white/10 dark:hover:bg-white/20 text-slate-700 dark:text-white flex items-center justify-center transition-colors cursor-pointer shrink-0 ml-2"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Video Player */}
            <div className="relative aspect-[9/16] max-h-[66vh] bg-black flex items-center justify-center overflow-hidden">
              <video
                src={modalProject.videoUrl}
                poster={modalProject.image}
                autoPlay
                controls
                playsInline
                className="w-full h-full object-contain"
              />
            </div>

            {/* Modal Footer with WhatsApp CTA */}
            <div className="p-3.5 sm:p-4 bg-slate-50 dark:bg-[#080b1e] border-t border-slate-200 dark:border-white/10 flex flex-col sm:flex-row items-center justify-between gap-2.5">
              <div className="text-left w-full sm:w-auto">
                <span className="text-[11px] text-slate-600 dark:text-gray-400 block">
                  Aisi high-retention reel chahiye?
                </span>
                <span className="text-xs font-bold text-slate-900 dark:text-white">
                  Delivery in 24–48 hours
                </span>
              </div>

              <a
                href={`https://wa.me/14374348789?text=${encodeURIComponent(
                  `Hi Faraz, I saw your video edit '${modalProject.title}' and want a similar high-retention reel edited.`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-[#25D366] hover:bg-[#20ba59] text-black font-extrabold text-xs flex items-center justify-center gap-2 shadow-lg shadow-[#25D366]/20 transition-all hover:scale-105"
              >
                <MessageCircle className="w-4 h-4 fill-black" />
                <span>Order on WhatsApp</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
