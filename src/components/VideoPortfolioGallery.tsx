"use client";

import React, { useRef, useState } from "react";
import Image from "next/image";
import {
  Play,
  Pause,
  Volume2,
  VolumeX,
  Film,
  Sparkles,
  Maximize2,
  X,
  MessageCircle,
  CheckCircle2,
  ArrowRight,
} from "lucide-react";
import { VIDEO_SHOWCASE_REELS, VideoReel } from "@/data/videos";

// Re-export for any legacy consumers
export const VIDEO_PORTFOLIO_REELS = VIDEO_SHOWCASE_REELS;

interface VideoPortfolioGalleryProps {
  compactHeader?: boolean;
  limit?: number;
  showAllLink?: boolean;
}

export default function VideoPortfolioGallery({
  compactHeader = false,
  limit,
  showAllLink = false,
}: VideoPortfolioGalleryProps) {
  const [modalReel, setModalReel] = useState<VideoReel | null>(null);
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const previewVideoRefs = useRef<Record<string, HTMLVideoElement | null>>({});

  const reelsToDisplay = limit
    ? VIDEO_SHOWCASE_REELS.slice(0, limit)
    : VIDEO_SHOWCASE_REELS;

  const handleMouseEnter = (reelId: string) => {
    setHoveredId(reelId);
    const vid = previewVideoRefs.current[reelId];
    if (vid) {
      vid.currentTime = 0;
      vid.play().catch(() => {});
    }
  };

  const handleMouseLeave = (reelId: string) => {
    setHoveredId(null);
    const vid = previewVideoRefs.current[reelId];
    if (vid) {
      vid.pause();
      vid.currentTime = 0;
    }
  };

  const openModal = (reel: VideoReel) => {
    setModalReel(reel);
  };

  const closeModal = () => {
    setModalReel(null);
  };

  return (
    <div className="w-full">
      {!compactHeader && (
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/15 border border-purple-500/30 text-purple-600 dark:text-purple-300 text-[11px] font-semibold uppercase tracking-wider mb-2.5">
              <Film className="w-3.5 h-3.5" />
              <span>Video Editing &amp; Viral Reels Showcase</span>
            </div>
            <h3 className="font-heading text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              Scroll-Stopping Reels, <span className="gradient-text-purple">VFX &amp; Motion Edits</span>
            </h3>
          </div>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-gray-400 max-w-md">
            Click any reel below to watch with full audio, 3D text layers, Roman Urdu captions, and custom sound design.
          </p>
        </div>
      )}

      {/* 9:16 Vertical Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-7">
        {reelsToDisplay.map((reel) => {
          const isHovered = hoveredId === reel.id;

          return (
            <div
              key={reel.id}
              onMouseEnter={() => handleMouseEnter(reel.id)}
              onMouseLeave={() => handleMouseLeave(reel.id)}
              className="group relative flex flex-col justify-between rounded-3xl bg-white dark:bg-[#0f142e] border border-slate-200/90 dark:border-white/10 shadow-[0_12px_34px_rgba(15,23,42,0.08)] dark:shadow-[0_14px_38px_rgba(3,6,20,0.55)] overflow-hidden transition-all duration-300 hover:border-purple-400/60 dark:hover:border-purple-500/50 hover:-translate-y-1.5"
            >
              {/* 9:16 Vertical Video Frame with Hover Loop & Click to Open */}
              <div
                onClick={() => openModal(reel)}
                className="relative w-full aspect-[9/15] bg-[#070A1A] overflow-hidden cursor-pointer select-none"
              >
                {/* Static WebP Poster Image */}
                <Image
                  src={reel.posterUrl}
                  alt={reel.title}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 380px"
                  className={`object-cover transition-opacity duration-300 ${
                    isHovered ? "opacity-0" : "opacity-100"
                  }`}
                  priority={false}
                />

                {/* Muted Preview Loop on Hover (Desktop) */}
                <video
                  ref={(el) => {
                    previewVideoRefs.current[reel.id] = el;
                  }}
                  src={reel.previewUrl}
                  muted
                  playsInline
                  loop
                  preload="none"
                  className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-300 ${
                    isHovered ? "opacity-100" : "opacity-0 pointer-events-none"
                  }`}
                />

                {/* Ambient Dark Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#070A1A]/95 via-[#070A1A]/20 to-black/35 pointer-events-none" />

                {/* Top Badges */}
                <div className="absolute top-3.5 left-3.5 right-3.5 z-20 flex items-center justify-between pointer-events-none">
                  <span className="px-2.5 py-1 rounded-full bg-black/75 backdrop-blur-md border border-white/20 text-white text-[10.5px] font-semibold flex items-center gap-1.5 shadow-md">
                    <span>🎬 {reel.styleTag}</span>
                  </span>

                  <span className="px-2.5 py-0.5 rounded-full bg-purple-600/90 backdrop-blur-md text-white text-[10px] font-mono font-bold shadow-md">
                    {reel.resolution}
                  </span>
                </div>

                {/* Center Glowing Play Button */}
                <div className="absolute inset-0 flex items-center justify-center z-20 pointer-events-none">
                  <span className="relative flex items-center justify-center w-14 h-14 rounded-full bg-gradient-to-tr from-[#2563EB] via-[#7C3AED] to-[#EC4899] text-white shadow-[0_0_28px_rgba(124,58,237,0.7)] group-hover:scale-115 transition-transform duration-300">
                    <span className="absolute inset-0 rounded-full bg-purple-500/40 animate-ping opacity-60" />
                    <Play className="w-6 h-6 fill-white ml-0.5 relative z-10" />
                  </span>
                </div>

                {/* Bottom Overlay Hint */}
                <div className="absolute bottom-3 left-3.5 right-3.5 z-20 flex items-center justify-between pointer-events-none">
                  <span className="px-2.5 py-1 rounded-lg bg-black/80 backdrop-blur-md border border-white/15 text-white text-[10.5px] font-semibold flex items-center gap-1.5">
                    <Sparkles className="w-3 h-3 text-amber-400" />
                    <span>Watch with Sound</span>
                  </span>
                  <span className="px-2 py-0.5 rounded-lg bg-black/80 backdrop-blur-md border border-white/15 text-sky-300 text-[10.5px] font-mono font-bold">
                    {reel.duration}
                  </span>
                </div>
              </div>

              {/* Card Details */}
              <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between">
                <div>
                  <h4 className="font-heading font-extrabold text-base sm:text-lg text-slate-900 dark:text-white mb-1.5 group-hover:text-purple-600 dark:group-hover:text-purple-300 transition-colors">
                    {reel.title}
                  </h4>
                  <p className="text-xs text-slate-600 dark:text-gray-400 leading-relaxed mb-3">
                    {reel.tagline}
                  </p>

                  {/* Plain Language Bullets */}
                  <div className="space-y-1.5 mb-4">
                    {reel.bullets.map((bullet, idx) => (
                      <div
                        key={idx}
                        className="flex items-start gap-1.5 text-[11.5px] text-slate-700 dark:text-gray-300 leading-snug"
                      >
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 dark:text-emerald-400 mt-0.5 shrink-0" />
                        <span>{bullet}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Footer Buttons: Watch Reel & Order on WhatsApp */}
                <div className="pt-3 border-t border-slate-100 dark:border-white/10 flex flex-col gap-2">
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => openModal(reel)}
                      className="flex-1 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-md shadow-blue-600/25 transition-all hover:scale-[1.02] active:scale-95 cursor-pointer"
                    >
                      <Play className="w-3.5 h-3.5 fill-white" />
                      <span>Watch Full Reel</span>
                    </button>

                    <a
                      href={`https://wa.me/14374348789?text=${encodeURIComponent(
                        reel.whatsappMessage
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="Order this style on WhatsApp"
                      className="px-3 py-2.5 rounded-xl bg-[#25D366]/15 hover:bg-[#25D366]/25 border border-[#25D366]/30 text-[#25D366] font-bold text-xs flex items-center justify-center gap-1.5 transition-all hover:scale-105"
                      title="Order this edit style on WhatsApp"
                    >
                      <MessageCircle className="w-4 h-4 fill-current" />
                      <span className="hidden sm:inline">Order Style</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {showAllLink && (
        <div className="mt-8 text-center">
          <a
            href="/video-editing"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-[#8B5CF6] to-[#A855F7] text-white text-xs font-bold hover:scale-105 transition-all shadow-md shadow-purple-900/30"
          >
            <span>Explore All 5 Reels, Before/After &amp; Pricing Packages</span>
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      )}

      {/* Accessible Fullscreen / Centered Video Modal */}
      {modalReel && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={`Playing ${modalReel.title}`}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md p-3 sm:p-6"
          onClick={closeModal}
        >
          <div
            className="relative w-full max-w-sm sm:max-w-md max-h-[92vh] bg-[#0c102a] rounded-3xl border border-white/15 overflow-hidden shadow-2xl flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between p-3.5 border-b border-white/10 bg-[#080b1e]">
              <div className="flex items-center gap-2 overflow-hidden">
                <span className="px-2 py-0.5 rounded bg-purple-500/20 text-purple-300 text-[10px] font-mono font-bold shrink-0">
                  {modalReel.duration}
                </span>
                <h4 className="text-xs sm:text-sm font-bold text-white truncate">
                  {modalReel.title}
                </h4>
              </div>

              <button
                type="button"
                onClick={closeModal}
                aria-label="Close video player"
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors cursor-pointer shrink-0 ml-2"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Video Player */}
            <div className="relative aspect-[9/16] max-h-[68vh] bg-black flex items-center justify-center overflow-hidden">
              <video
                src={modalReel.videoUrl}
                poster={modalReel.posterUrl}
                autoPlay
                controls
                playsInline
                className="w-full h-full object-contain"
              />
            </div>

            {/* Modal Footer with WhatsApp CTA */}
            <div className="p-4 bg-[#080b1e] border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3">
              <div className="text-left w-full sm:w-auto">
                <span className="text-[11px] text-gray-400 block">
                  Aisi high-retention edit chahiye?
                </span>
                <span className="text-xs font-bold text-white">
                  Get delivery in 24–48 hours
                </span>
              </div>

              <a
                href={`https://wa.me/14374348789?text=${encodeURIComponent(
                  modalReel.whatsappMessage
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-[#25D366] hover:bg-[#20ba59] text-black font-extrabold text-xs flex items-center justify-center gap-2 shadow-lg shadow-[#25D366]/20 transition-all hover:scale-105"
              >
                <MessageCircle className="w-4 h-4 fill-black" />
                <span>Order on WhatsApp</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
