"use client";

import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { Play, Pause, Sparkles, CheckCircle2, ArrowRight, ArrowDown, Film, Layers } from "lucide-react";
import { BEFORE_AFTER_SAMPLES, BeforeAfterProject } from "@/data/videos";

interface BeforeAfterPlayerProps {
  samples?: BeforeAfterProject[];
  data?: BeforeAfterProject;
}

export default function BeforeAfterPlayer({ samples, data }: BeforeAfterPlayerProps) {
  const projectList: BeforeAfterProject[] = samples || (data ? [data] : BEFORE_AFTER_SAMPLES);
  const [selectedProjectId, setSelectedProjectId] = useState<string>(projectList[0]?.id || "canada-mindset");
  const [mobileViewMode, setMobileViewMode] = useState<"both" | "before" | "after">("both");
  const [playingState, setPlayingState] = useState<{ before: boolean; after: boolean }>({
    before: false,
    after: false,
  });

  const activeProject = projectList.find((p) => p.id === selectedProjectId) || projectList[0];

  const beforeVidRef = useRef<HTMLVideoElement | null>(null);
  const afterVidRef = useRef<HTMLVideoElement | null>(null);

  // When switching projects, pause any playing videos
  useEffect(() => {
    if (beforeVidRef.current) {
      beforeVidRef.current.pause();
    }
    if (afterVidRef.current) {
      afterVidRef.current.pause();
    }
    setPlayingState({ before: false, after: false });
  }, [selectedProjectId]);

  const handlePlayBefore = () => {
    if (afterVidRef.current && !afterVidRef.current.paused) {
      afterVidRef.current.pause();
      setPlayingState((prev) => ({ ...prev, after: false }));
    }
    setPlayingState((prev) => ({ ...prev, before: true }));
  };

  const handlePlayAfter = () => {
    if (beforeVidRef.current && !beforeVidRef.current.paused) {
      beforeVidRef.current.pause();
      setPlayingState((prev) => ({ ...prev, before: false }));
    }
    setPlayingState((prev) => ({ ...prev, after: true }));
  };

  const toggleManualPlay = (side: "before" | "after") => {
    const vid = side === "before" ? beforeVidRef.current : afterVidRef.current;
    if (!vid) return;

    if (vid.paused) {
      if (side === "before" && afterVidRef.current) {
        afterVidRef.current.pause();
        setPlayingState((prev) => ({ ...prev, after: false }));
      }
      if (side === "after" && beforeVidRef.current) {
        beforeVidRef.current.pause();
        setPlayingState((prev) => ({ ...prev, before: false }));
      }
      vid.play().catch(() => {});
      setPlayingState((prev) => ({ ...prev, [side]: true }));
    } else {
      vid.pause();
      setPlayingState((prev) => ({ ...prev, [side]: false }));
    }
  };

  return (
    <div className="w-full">
      {/* Section Eyebrow & Title */}
      <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-10">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-purple-900/30 border border-purple-500/30 text-purple-300 text-xs font-semibold uppercase tracking-wider mb-3">
          <Sparkles className="w-3.5 h-3.5 text-amber-400" />
          <span>Real Client Transformations • Before vs After</span>
        </div>
        <h2 className="font-heading text-2xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-2.5">
          Dekhiye Farq — <span className="gradient-text-purple">Raw Footage vs Edited Reel</span>
        </h2>
        <p className="text-xs sm:text-sm text-slate-600 dark:text-gray-300 leading-relaxed">
          See exactly how mobile phone recordings transform into scroll-stopping, high-retention viral reels.
        </p>

        {/* Project Selector Pills (Switch between Canada 3D VFX & Cash VFX) */}
        {projectList.length > 1 && (
          <div className="flex flex-wrap justify-center gap-2 mt-6">
            {projectList.map((proj) => {
              const isSelected = proj.id === selectedProjectId;
              return (
                <button
                  key={proj.id}
                  type="button"
                  onClick={() => setSelectedProjectId(proj.id)}
                  className={`px-4 py-2 sm:px-5 sm:py-2.5 rounded-full text-xs sm:text-sm font-bold transition-all cursor-pointer flex items-center gap-2 shadow-sm ${
                    isSelected
                      ? "bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600 text-white shadow-purple-600/30 shadow-lg scale-105 border border-purple-400/40"
                      : "bg-white/70 dark:bg-slate-900/80 text-slate-700 dark:text-gray-300 border border-slate-200 dark:border-white/10 hover:border-purple-400 hover:text-white"
                  }`}
                >
                  <Film className={`w-3.5 h-3.5 ${isSelected ? "text-amber-300" : "text-gray-400"}`} />
                  <span>{proj.tabLabel}</span>
                  {isSelected && (
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  )}
                </button>
              );
            })}
          </div>
        )}
      </div>

      {/* Mobile View Mode Switcher (Stacked Both | Raw Only | Edited Only) */}
      <div className="lg:hidden flex flex-col items-center gap-2 mb-6">
        <div className="inline-flex p-1 rounded-full bg-slate-200/90 dark:bg-slate-900/90 border border-slate-300 dark:border-white/15 shadow-inner">
          <button
            type="button"
            onClick={() => setMobileViewMode("both")}
            className={`px-3 sm:px-4 py-1.5 rounded-full text-[11px] sm:text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
              mobileViewMode === "both"
                ? "bg-purple-600 text-white shadow-md shadow-purple-600/30"
                : "text-slate-600 dark:text-gray-400 hover:text-slate-900 dark:hover:text-white"
            }`}
          >
            <Layers className="w-3 h-3" />
            <span>Show Both (Compare)</span>
          </button>
          <button
            type="button"
            onClick={() => setMobileViewMode("before")}
            className={`px-3 sm:px-4 py-1.5 rounded-full text-[11px] sm:text-xs font-bold transition-all cursor-pointer ${
              mobileViewMode === "before"
                ? "bg-rose-600 text-white shadow-md shadow-rose-600/30"
                : "text-slate-600 dark:text-gray-400 hover:text-slate-900 dark:hover:text-white"
            }`}
          >
            <span>Raw Only</span>
          </button>
          <button
            type="button"
            onClick={() => setMobileViewMode("after")}
            className={`px-3 sm:px-4 py-1.5 rounded-full text-[11px] sm:text-xs font-bold transition-all cursor-pointer ${
              mobileViewMode === "after"
                ? "bg-emerald-600 text-white shadow-md shadow-emerald-600/30"
                : "text-slate-600 dark:text-gray-400 hover:text-slate-900 dark:hover:text-white"
            }`}
          >
            <span>Edited Only ✨</span>
          </button>
        </div>
        <span className="text-[10px] text-slate-500 dark:text-gray-400">
          {mobileViewMode === "both"
            ? "Showing both raw video and edited reel stacked below"
            : `Showing single view: ${mobileViewMode === "before" ? "Raw Phone Recording" : "Edited Reel"}`}
        </span>
      </div>

      {/* Video Players + Checklist Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left / Center: Side-by-Side (Desktop) or Stacked (Mobile) Video Cards */}
        <div className="lg:col-span-7 flex flex-col gap-6 items-center">
          {/* Active Project Title Banner */}
          <div className="w-full text-center lg:text-left px-2">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md bg-purple-500/10 border border-purple-500/20 text-purple-600 dark:text-purple-300 text-[10.5px] font-mono font-bold mb-1">
              <span>{activeProject.badge}</span>
            </div>
            <h3 className="font-heading text-lg sm:text-xl font-bold text-slate-900 dark:text-white">
              {activeProject.title}
            </h3>
            <p className="text-xs text-slate-600 dark:text-gray-400 mt-0.5">
              {activeProject.subtitle}
            </p>
          </div>

          <div className="w-full flex flex-col sm:flex-row gap-5 sm:gap-6 justify-center items-center">
            {/* ========================================================
                BEFORE VIDEO CARD (RAW FOOTAGE)
                ======================================================== */}
            <div
              className={`w-full max-w-[340px] sm:max-w-[290px] rounded-3xl bg-white dark:bg-[#080b1e] border border-rose-300 dark:border-rose-500/30 overflow-hidden shadow-xl dark:shadow-2xl flex flex-col transition-all duration-300 hover:border-rose-400 ${
                mobileViewMode === "after" ? "hidden sm:flex" : "flex"
              }`}
            >
              {/* Card Header */}
              <div className="px-4 py-2.5 bg-rose-50 dark:bg-rose-950/70 border-b border-rose-200 dark:border-rose-500/30 flex items-center justify-between">
                <span className="text-[11px] font-bold text-rose-900 dark:text-rose-300 flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse" />
                  <span>{activeProject.before.label}</span>
                </span>
                <span className="px-2 py-0.5 rounded text-[9.5px] font-mono font-bold bg-rose-100 dark:bg-rose-500/20 text-rose-700 dark:text-rose-300 border border-rose-300 dark:border-rose-500/40">
                  BEFORE
                </span>
              </div>

              {/* Video Player Frame */}
              <div className="relative aspect-[9/16] bg-black overflow-hidden group">
                <video
                  ref={beforeVidRef}
                  src={activeProject.before.videoUrl}
                  poster={activeProject.before.posterUrl}
                  controls
                  playsInline
                  preload="metadata"
                  onPlay={handlePlayBefore}
                  onPause={() => setPlayingState((prev) => ({ ...prev, before: false }))}
                  className="w-full h-full object-cover"
                />

                {/* Big Floating Play Button Overlay when paused */}
                {!playingState.before && (
                  <button
                    type="button"
                    onClick={() => toggleManualPlay("before")}
                    aria-label="Play Before Video"
                    className="absolute inset-0 z-10 flex items-center justify-center bg-black/30 hover:bg-black/10 transition-colors cursor-pointer group/btn"
                  >
                    <span className="w-12 h-12 rounded-full bg-rose-600/90 text-white flex items-center justify-center shadow-lg group-hover/btn:scale-110 transition-transform">
                      <Play className="w-5 h-5 fill-white ml-0.5" />
                    </span>
                  </button>
                )}
              </div>

              {/* Card Footer Note */}
              <div className="p-3 text-center bg-rose-50/50 dark:bg-[#070918] border-t border-rose-100 dark:border-white/5">
                <span className="text-[11px] text-slate-600 dark:text-gray-400 block leading-tight">
                  {activeProject.before.note}
                </span>
              </div>
            </div>

            {/* Mobile-only Arrow Indicator between stacked cards */}
            {mobileViewMode === "both" && (
              <div className="sm:hidden flex items-center gap-2 py-1 text-purple-600 dark:text-purple-400 text-xs font-bold">
                <ArrowDown className="w-4 h-4 animate-bounce" />
                <span>TRANSFORMED BY FARAZ</span>
                <ArrowDown className="w-4 h-4 animate-bounce" />
              </div>
            )}

            {/* ========================================================
                AFTER VIDEO CARD (EDITED VIRAL REEL)
                ======================================================== */}
            <div
              className={`w-full max-w-[340px] sm:max-w-[290px] rounded-3xl bg-white dark:bg-[#080b1e] border-2 border-purple-400 dark:border-purple-500/60 overflow-hidden shadow-xl shadow-purple-500/10 dark:shadow-[0_0_40px_rgba(139,92,246,0.3)] flex flex-col transition-all duration-300 hover:border-purple-500 ${
                mobileViewMode === "before" ? "hidden sm:flex" : "flex"
              }`}
            >
              {/* Card Header */}
              <div className="px-4 py-2.5 bg-purple-50 dark:bg-gradient-to-r dark:from-purple-950/90 dark:to-indigo-950/90 border-b border-purple-200 dark:border-purple-500/40 flex items-center justify-between">
                <span className="text-[11px] font-bold text-purple-950 dark:text-purple-200 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-amber-500 dark:text-amber-400" />
                  <span>{activeProject.after.label}</span>
                </span>
                <span className="px-2 py-0.5 rounded text-[9.5px] font-mono font-bold bg-emerald-100 dark:bg-emerald-500/20 text-emerald-700 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-500/40">
                  AFTER ✨
                </span>
              </div>

              {/* Video Player Frame */}
              <div className="relative aspect-[9/16] bg-black overflow-hidden group">
                <video
                  ref={afterVidRef}
                  src={activeProject.after.videoUrl}
                  poster={activeProject.after.posterUrl}
                  controls
                  playsInline
                  preload="metadata"
                  onPlay={handlePlayAfter}
                  onPause={() => setPlayingState((prev) => ({ ...prev, after: false }))}
                  className="w-full h-full object-cover"
                />

                {/* Big Floating Play Button Overlay when paused */}
                {!playingState.after && (
                  <button
                    type="button"
                    onClick={() => toggleManualPlay("after")}
                    aria-label="Play After Video"
                    className="absolute inset-0 z-10 flex items-center justify-center bg-black/30 hover:bg-black/10 transition-colors cursor-pointer group/btn"
                  >
                    <span className="w-12 h-12 rounded-full bg-gradient-to-tr from-blue-600 via-purple-600 to-pink-500 text-white flex items-center justify-center shadow-lg group-hover/btn:scale-110 transition-transform">
                      <Play className="w-5 h-5 fill-white ml-0.5" />
                    </span>
                  </button>
                )}
              </div>

              {/* Card Footer Note */}
              <div className="p-3 text-center bg-purple-50/50 dark:bg-[#070918] border-t border-purple-100 dark:border-white/5">
                <span className="text-[11px] font-semibold text-purple-900 dark:text-purple-300 block leading-tight">
                  {activeProject.after.note}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* ========================================================
            RIGHT COLUMN: EDITING CHANGES CHECKLIST & CTA
            ======================================================== */}
        <div className="lg:col-span-5 p-6 sm:p-7 rounded-3xl bg-white dark:bg-[#0f142e] border border-slate-200/90 dark:border-white/10 shadow-lg dark:shadow-none flex flex-col justify-between">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-700 dark:text-emerald-300 text-[11px] font-semibold uppercase tracking-wider mb-4">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Editing Breakdown for {activeProject.tabLabel}</span>
            </div>

            <h3 className="font-heading text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white mb-2">
              Is Reel Mein Kya Badla?
            </h3>
            <p className="text-xs text-slate-600 dark:text-gray-400 mb-6 leading-relaxed">
              Every detail is engineered for retention, watch time, and virality on Instagram &amp; TikTok:
            </p>

            <div className="space-y-4">
              {activeProject.checklist.map((item, idx) => (
                <div key={idx} className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-lg bg-purple-500/20 border border-purple-500/30 flex items-center justify-center shrink-0 mt-0.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 dark:text-emerald-400" />
                  </div>
                  <div>
                    <h4 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white">
                      {item.title}
                    </h4>
                    <p className="text-[11px] sm:text-xs text-slate-600 dark:text-gray-400 leading-relaxed mt-0.5">
                      {item.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-8 pt-5 border-t border-slate-100 dark:border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <span className="text-xs text-slate-600 dark:text-gray-400 font-medium">
              Want your raw footage edited like this?
            </span>
            <a
              href={`https://wa.me/14374348789?text=Hi%20Faraz,%20I%20saw%20your%20Before%20vs%20After%20video%20for%20${encodeURIComponent(activeProject.title)}%20and%20want%20this%20for%20my%20content`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold transition-all shadow-md shrink-0 w-fit"
            >
              <span>Order this Style on WhatsApp &rarr;</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
