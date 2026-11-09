"use client";

import React, { useRef, useState } from "react";
import Image from "next/image";
import { Play, Pause, Volume2, VolumeX, Film, Sparkles, Maximize2 } from "lucide-react";

export interface VideoReelItem {
  id: string;
  title: string;
  subtitle: string;
  categoryBadge: string;
  duration: string;
  resolution: string;
  videoUrl: string;
  posterUrl: string;
  highlights: string[];
  tools: string[];
}

export const VIDEO_PORTFOLIO_REELS: VideoReelItem[] = [
  {
    id: "reel-master-mindset",
    title: "Money ≠ Respect — Viral Personal Brand Reel",
    subtitle:
      "Full 55-second high-retention vertical edit featuring 3D rotoscoped depth titles behind the subject, flying cash VFX, custom motion graphics, and bilingual kinetic captions.",
    categoryBadge: "Full Master Edit",
    duration: "0:55",
    resolution: "1080×1920 • 60fps",
    videoUrl: "/videos/faraz-reel-master.mp4",
    posterUrl: "/images/videos/thumb-master.webp?v=2",
    highlights: [
      "3D Rotoscoped Depth Typography",
      "Flying Cash Particle VFX",
      "Dynamic Bilingual Captions",
      "Color Grading & SFX Design",
    ],
    tools: ["Premiere Pro", "After Effects", "CapCut Pro", "SFX"],
  },
  {
    id: "reel-vfx-hook",
    title: "3D Subject Masking & Cash VFX Breakdown",
    subtitle:
      "High-impact opening hook sequence combining clean foreground subject rotoscoping, layered bold typography ('MILLIONAIRE' & 'MONEY ≠ RESPECT'), and currency physics.",
    categoryBadge: "VFX & Rotoscoping",
    duration: "0:16",
    resolution: "HD Vertical • 9:16",
    videoUrl: "/videos/faraz-reel-vfx.mp4",
    posterUrl: "/images/videos/thumb-vfx.webp",
    highlights: [
      "Precision Subject Rotoscoping",
      "Layered 3D Title Compositing",
      "Beat-Synced Punch-In Cuts",
    ],
    tools: ["After Effects", "Rotobrush 3.0", "VFX Compositing"],
  },
  {
    id: "reel-motion-broll",
    title: "Custom Neon Motion Graphics & B-Roll Storytelling",
    subtitle:
      "Bespoke animated visual metaphors ('NO WORK IS SMALL' lawn-mower animation & 'EVERY JOB • DELIVERY BOY' neon HUD card) engineered to boost viewer retention.",
    categoryBadge: "Motion Graphics",
    duration: "0:18",
    resolution: "HD Vertical • 9:16",
    videoUrl: "/videos/faraz-reel-motion.mp4",
    posterUrl: "/images/videos/thumb-motion.webp",
    highlights: [
      "Custom Animated Vector B-Roll",
      "Glowing Neon HUD Callout Cards",
      "Smooth Speed Ramps & Transitions",
    ],
    tools: ["After Effects", "Motion Graphics", "Kinetic Type"],
  },
];

interface VideoPortfolioGalleryProps {
  compactHeader?: boolean;
}

export default function VideoPortfolioGallery({
  compactHeader = false,
}: VideoPortfolioGalleryProps) {
  const [activeId, setActiveId] = useState<string | null>(null);
  const [isPlayingMap, setIsPlayingMap] = useState<Record<string, boolean>>({});
  const [isMutedMap, setIsMutedMap] = useState<Record<string, boolean>>({});
  const videoRefs = useRef<Record<string, HTMLVideoElement | null>>({});

  const handlePlayReel = (id: string) => {
    // Pause any other playing video first
    Object.entries(videoRefs.current).forEach(([key, vid]) => {
      if (key !== id && vid && !vid.paused) {
        vid.pause();
      }
    });

    if (activeId !== id) {
      setActiveId(id);
      setIsPlayingMap((prev) => ({ ...prev, [id]: true }));
      return;
    }

    const vid = videoRefs.current[id];
    if (!vid) return;
    if (vid.paused) {
      vid.play().catch(() => {});
    } else {
      vid.pause();
    }
  };

  const toggleMute = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const vid = videoRefs.current[id];
    if (!vid) return;
    vid.muted = !vid.muted;
    setIsMutedMap((prev) => ({ ...prev, [id]: vid.muted }));
  };

  const handleFullscreen = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const vid = videoRefs.current[id];
    if (!vid) return;
    if (vid.requestFullscreen) {
      vid.requestFullscreen().catch(() => {});
    }
  };

  return (
    <div className="w-full">
      {!compactHeader && (
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/15 border border-purple-500/30 text-purple-600 dark:text-purple-300 text-[11px] font-semibold uppercase tracking-wider mb-2.5">
              <Film className="w-3.5 h-3.5" />
              <span>Video Editing &amp; Motion Graphics Showcase</span>
            </div>
            <h3 className="font-heading text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              High-Retention Reels, <span className="gradient-text-purple">VFX &amp; Motion Edits</span>
            </h3>
          </div>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-gray-400 max-w-md">
            Click any reel below to play with full audio, custom motion graphics, 3D rotoscoped titles, and dynamic captions.
          </p>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-7">
        {VIDEO_PORTFOLIO_REELS.map((reel) => {
          const isActivated = activeId === reel.id;
          const isPlaying = !!isPlayingMap[reel.id];
          const isMuted = !!isMutedMap[reel.id];

          return (
            <div
              key={reel.id}
              className="group relative flex flex-col justify-between rounded-3xl bg-white dark:bg-[#0f142e] border border-slate-200/90 dark:border-white/10 shadow-[0_12px_34px_rgba(15,23,42,0.08)] dark:shadow-[0_14px_38px_rgba(3,6,20,0.55)] overflow-hidden transition-all duration-300 hover:border-purple-400/60 dark:hover:border-purple-500/50 hover:-translate-y-1"
            >
              {/* 9:16 Vertical Studio Video Frame */}
              <div
                onClick={() => handlePlayReel(reel.id)}
                className="relative w-full aspect-[9/14] bg-[#070A1A] overflow-hidden cursor-pointer select-none"
              >
                {isActivated ? (
                  <video
                    ref={(el) => {
                      videoRefs.current[reel.id] = el;
                    }}
                    src={reel.videoUrl}
                    poster={reel.posterUrl}
                    autoPlay
                    playsInline
                    controls
                    preload="metadata"
                    onPlay={() =>
                      setIsPlayingMap((prev) => ({ ...prev, [reel.id]: true }))
                    }
                    onPause={() =>
                      setIsPlayingMap((prev) => ({ ...prev, [reel.id]: false }))
                    }
                    onEnded={() =>
                      setIsPlayingMap((prev) => ({ ...prev, [reel.id]: false }))
                    }
                    className="w-full h-full object-cover relative z-10"
                  />
                ) : (
                  <>
                    <Image
                      src={reel.posterUrl}
                      alt={reel.title}
                      fill
                      sizes="(max-width: 768px) 92vw, 380px"
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#070A1A]/90 via-[#070A1A]/25 to-black/30 group-hover:via-[#070A1A]/15 transition-opacity duration-300" />

                    {/* Center Glowing Play Button */}
                    <div className="absolute inset-0 flex items-center justify-center z-20">
                      <span className="relative flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-tr from-[#2563EB] via-[#7C3AED] to-[#EC4899] text-white shadow-[0_0_32px_rgba(124,58,237,0.65)] group-hover:scale-110 transition-transform duration-300">
                        <span className="absolute inset-0 rounded-full bg-purple-500/40 animate-ping opacity-60" />
                        <Play className="w-7 h-7 fill-white ml-0.5 relative z-10" />
                      </span>
                    </div>

                    {/* Bottom Overlay Caption Preview */}
                    <div className="absolute bottom-3.5 left-3.5 right-3.5 z-20 flex items-center justify-between pointer-events-none">
                      <span className="px-2.5 py-1 rounded-lg bg-black/75 backdrop-blur-md border border-white/15 text-white text-[10.5px] font-semibold flex items-center gap-1.5">
                        <Sparkles className="w-3 h-3 text-amber-400" />
                        <span>Click to Play Reel</span>
                      </span>
                      <span className="px-2.5 py-1 rounded-lg bg-black/75 backdrop-blur-md border border-white/15 text-sky-300 text-[10.5px] font-mono font-bold">
                        {reel.duration}
                      </span>
                    </div>
                  </>
                )}

                {/* Top Floating Badges */}
                <div className="absolute top-3.5 left-3.5 right-3.5 z-20 flex items-center justify-between pointer-events-none">
                  <span className="px-3 py-1 rounded-full bg-black/70 backdrop-blur-md border border-white/20 text-white text-[10.5px] font-mono font-bold flex items-center gap-1.5 shadow-md">
                    <span>🎬 {reel.categoryBadge}</span>
                  </span>

                  {isActivated ? (
                    <div className="flex items-center gap-1.5 pointer-events-auto">
                      <button
                        type="button"
                        onClick={(e) => toggleMute(reel.id, e)}
                        aria-label={isMuted ? "Unmute video" : "Mute video"}
                        className="w-8 h-8 rounded-full bg-black/75 hover:bg-black/90 border border-white/20 text-white flex items-center justify-center backdrop-blur-md transition-transform hover:scale-105"
                      >
                        {isMuted ? (
                          <VolumeX className="w-3.5 h-3.5 text-rose-400" />
                        ) : (
                          <Volume2 className="w-3.5 h-3.5 text-emerald-400" />
                        )}
                      </button>
                      <button
                        type="button"
                        onClick={(e) => handleFullscreen(reel.id, e)}
                        aria-label="Fullscreen video"
                        className="w-8 h-8 rounded-full bg-black/75 hover:bg-black/90 border border-white/20 text-white flex items-center justify-center backdrop-blur-md transition-transform hover:scale-105"
                      >
                        <Maximize2 className="w-3.5 h-3.5 text-sky-300" />
                      </button>
                    </div>
                  ) : (
                    <span className="px-2.5 py-1 rounded-full bg-purple-600/85 backdrop-blur-md text-white text-[10px] font-bold shadow-md">
                      {reel.resolution}
                    </span>
                  )}
                </div>
              </div>

              {/* Card Details */}
              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <h4 className="font-heading font-extrabold text-base sm:text-lg text-slate-900 dark:text-white mb-1.5 group-hover:text-purple-600 dark:group-hover:text-purple-300 transition-colors">
                    {reel.title}
                  </h4>
                  <p className="text-xs text-slate-600 dark:text-gray-400 leading-relaxed mb-4">
                    {reel.subtitle}
                  </p>

                  {/* Editing Highlights */}
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {reel.highlights.map((h, i) => (
                      <span
                        key={i}
                        className="px-2.5 py-0.5 rounded-md bg-purple-500/10 dark:bg-purple-500/15 border border-purple-500/20 text-[10.5px] text-purple-700 dark:text-purple-300 font-semibold"
                      >
                        {h}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Footer Play / Pause Button + Tool Badges */}
                <div className="pt-3 border-t border-slate-100 dark:border-white/10 flex items-center justify-between gap-2">
                  <div className="flex flex-wrap gap-1">
                    {reel.tools.slice(0, 2).map((tool, idx) => (
                      <span
                        key={idx}
                        className="px-2 py-0.5 rounded bg-slate-100 dark:bg-white/5 border border-slate-200/70 dark:border-white/10 text-[10px] text-slate-600 dark:text-gray-400 font-medium"
                      >
                        {tool}
                      </span>
                    ))}
                  </div>

                  <button
                    type="button"
                    onClick={() => handlePlayReel(reel.id)}
                    className="px-4 py-2 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold text-xs flex items-center gap-1.5 shadow-md shadow-blue-600/25 transition-all hover:scale-105 active:scale-95 cursor-pointer"
                  >
                    {isActivated && isPlaying ? (
                      <>
                        <Pause className="w-3.5 h-3.5 fill-white" />
                        <span>Pause</span>
                      </>
                    ) : (
                      <>
                        <Play className="w-3.5 h-3.5 fill-white" />
                        <span>Watch Reel</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

