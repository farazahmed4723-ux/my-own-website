"use client";

import React, { useRef, useState, useEffect } from "react";
import Image from "next/image";
import {
  Code2,
  Sparkles,
  ShieldCheck,
  Star,
} from "lucide-react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  useMotionTemplate,
} from "framer-motion";

interface FounderShowcaseCardProps {
  subtitle?: string;
  priority?: boolean;
}

export default function FounderShowcaseCard({
  subtitle = "Web Developer & AI Solutions Specialist",
  priority = false,
}: FounderShowcaseCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isTouch, setIsTouch] = useState(false);

  // Normalized cursor coordinates (-0.5 .. 0.5) for 3D tilt & parallax
  const normX = useMotionValue(0);
  const normY = useMotionValue(0);

  // Pixel cursor coordinates for interactive radial spotlight
  const spotX = useMotionValue(210);
  const spotY = useMotionValue(240);

  const springCfg = { stiffness: 180, damping: 22, mass: 0.6 };
  const smoothX = useSpring(normX, springCfg);
  const smoothY = useSpring(normY, springCfg);

  const rotateX = useTransform(smoothY, [-0.5, 0.5], [5, -5]);
  const rotateY = useTransform(smoothX, [-0.5, 0.5], [-6, 6]);
  const portraitX = useTransform(smoothX, [-0.5, 0.5], [-8, 8]);
  const portraitY = useTransform(smoothY, [-0.5, 0.5], [-5, 5]);

  const spotlightBg = useMotionTemplate`radial-gradient(320px circle at ${spotX}px ${spotY}px, rgba(168, 85, 247, 0.22), transparent 75%)`;

  useEffect(() => {
    const touch =
      typeof window !== "undefined" &&
      ("ontouchstart" in window || navigator.maxTouchPoints > 0);
    setIsTouch(touch);
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isTouch || !cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const px = e.clientX - rect.left;
    const py = e.clientY - rect.top;
    spotX.set(px);
    spotY.set(py);
    normX.set(px / rect.width - 0.5);
    normY.set(py / rect.height - 0.5);
  };

  const handleMouseLeave = () => {
    normX.set(0);
    normY.set(0);
    spotX.set(210);
    spotY.set(240);
  };

  return (
    <div
      className="relative w-full max-w-[400px] sm:max-w-[435px] mx-auto select-none"
      style={{ perspective: "1100px" }}
    >
      {/* Outer Ambient Halo Ring behind the Card */}
      <motion.div
        animate={{
          opacity: [0.45, 0.75, 0.45],
          scale: [0.97, 1.02, 0.97],
        }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -inset-3 rounded-[2.25rem] bg-gradient-to-tr from-[#D6A84B]/20 via-[#8B5CF6]/25 to-[#38BDF8]/20 blur-2xl pointer-events-none -z-10"
      />

      {/* Interactive 3D Tilt Gradient Border Shell */}
      <motion.div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          rotateX: isTouch ? 0 : rotateX,
          rotateY: isTouch ? 0 : rotateY,
          transformStyle: "preserve-3d",
        }}
        className="founder-showcase-shell relative rounded-[2rem] p-[1.5px] bg-gradient-to-br from-[#D6A84B]/80 via-[#8B5CF6] to-[#38BDF8]/70 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.65)] transition-shadow duration-500 hover:shadow-[0_30px_70px_-12px_rgba(139,92,246,0.4)]"
      >
        {/* Inner Bento Studio Card */}
        <div className="founder-showcase-card relative w-full rounded-[calc(2rem-1.5px)] overflow-hidden bg-gradient-to-b from-[#15193b] via-[#0d1028] to-[#080a18] pt-4 sm:pt-5 flex flex-col justify-between">
          {/* 1. Interactive Cursor-Tracking Spotlight Refraction */}
          <motion.div
            style={{ background: spotlightBg }}
            className="absolute inset-0 pointer-events-none z-0"
          />

          {/* 2. Breathing Animated Aurora Studio Orbs */}
          <motion.div
            animate={{
              scale: [1, 1.18, 1],
              x: [-14, 14, -14],
              y: [-8, 10, -8],
            }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            className="founder-aurora-primary absolute top-14 left-1/2 -translate-x-1/2 w-64 sm:w-72 h-64 sm:h-72 rounded-full bg-gradient-to-tr from-[#7C3AED]/35 via-[#A855F7]/25 to-[#38BDF8]/20 blur-[55px] pointer-events-none z-0"
          />
          <motion.div
            animate={{
              scale: [1.1, 0.92, 1.1],
              x: [12, -12, 12],
            }}
            transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
            className="founder-aurora-gold absolute bottom-16 right-4 w-44 h-44 rounded-full bg-[#F59E0B]/18 blur-[50px] pointer-events-none z-0"
          />

          {/* 3. Architectural Masked Perspective Grid */}
          <div
            className="founder-grid-pattern absolute inset-0 opacity-[0.09] pointer-events-none z-0"
            style={{
              backgroundImage:
                "linear-gradient(to right, rgba(168,85,247,0.5) 1px, transparent 1px), linear-gradient(to bottom, rgba(168,85,247,0.5) 1px, transparent 1px)",
              backgroundSize: "30px 30px",
              maskImage:
                "radial-gradient(ellipse 80% 72% at 50% 44%, black 30%, transparent 85%)",
              WebkitMaskImage:
                "radial-gradient(ellipse 80% 72% at 50% 44%, black 30%, transparent 85%)",
            }}
          />

          {/* 4. Dual Counter-Rotating Kinetic Tech Radar Rings behind Head & Shoulders */}
          <div className="absolute top-[46%] left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none z-0 flex items-center justify-center">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 28, repeat: Infinity, ease: "linear" }}
              className="founder-orbit-ring w-[270px] sm:w-[310px] h-[270px] sm:h-[310px] rounded-full border border-dashed border-purple-400/25 relative"
            >
              <span className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-2.5 h-2.5 rounded-full bg-[#A855F7] shadow-[0_0_12px_#A855F7]" />
              <span className="absolute -bottom-1 left-1/3 w-2 h-2 rounded-full bg-[#F59E0B] shadow-[0_0_10px_#F59E0B]" />
            </motion.div>

            <motion.div
              animate={{ rotate: -360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="founder-orbit-ring absolute w-[205px] sm:w-[235px] h-[205px] sm:h-[235px] rounded-full border border-cyan-400/20"
            >
              <span className="absolute top-1/2 -right-1 w-2 h-2 rounded-full bg-[#38BDF8] shadow-[0_0_10px_#38BDF8]" />
            </motion.div>
          </div>

          {/* 5. Top Bento Telemetry Header Bar (Eliminates Empty Top Void) */}
          <div className="relative z-20 px-4 sm:px-5 flex items-center justify-between gap-2">
            {/* Live Availability Status Pill */}
            <div className="founder-telemetry-pill inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#0e132e]/80 border border-white/10 backdrop-blur-md shadow-sm">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-80" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400" />
              </span>
              <span className="text-[11px] font-semibold text-gray-200 tracking-wide">
                Available for Projects
              </span>
            </div>

            {/* Shipped Track Record Pill */}
            <div className="founder-telemetry-pill inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#0e132e]/80 border border-purple-500/25 backdrop-blur-md shadow-sm">
              <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
              <span className="text-[11px] font-bold text-purple-200">
                50+ Shipped
              </span>
            </div>
          </div>

          {/* 6. Floating Micro-Badges flanking Portrait (Kinetic Gentle Float) */}
          <motion.div
            animate={{ y: [-4, 5, -4] }}
            transition={{ duration: 4.8, repeat: Infinity, ease: "easeInOut" }}
            className="founder-floating-chip absolute top-[68px] sm:top-[76px] left-3 sm:left-4 z-20 px-2.5 sm:px-3 py-1.5 rounded-xl bg-[#111636]/85 border border-white/10 backdrop-blur-md shadow-lg flex items-center gap-1.5 pointer-events-none"
          >
            <div className="w-5 h-5 rounded-md bg-gradient-to-tr from-[#7C3AED] to-[#A855F7] flex items-center justify-center text-white shrink-0">
              <Code2 className="w-3 h-3 text-white" />
            </div>
            <span className="text-[10px] sm:text-[11px] font-semibold text-gray-200">
              Next.js &bull; WP
            </span>
          </motion.div>

          <motion.div
            animate={{ y: [5, -4, 5] }}
            transition={{
              duration: 5.4,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 0.6,
            }}
            className="founder-floating-chip absolute top-[122px] sm:top-[142px] right-3 sm:right-4 z-20 px-2.5 sm:px-3 py-1.5 rounded-xl bg-[#111636]/85 border border-white/10 backdrop-blur-md shadow-lg flex items-center gap-1.5 pointer-events-none"
          >
            <div className="w-5 h-5 rounded-md bg-gradient-to-tr from-[#8B5CF6] to-[#F59E0B] flex items-center justify-center text-white shrink-0">
              <Sparkles className="w-3 h-3 text-white" />
            </div>
            <span className="text-[10px] sm:text-[11px] font-semibold text-gray-200">
              <span className="sm:hidden">AI Agents</span>
              <span className="hidden sm:inline">AI Agents &bull; RAG</span>
            </span>
          </motion.div>

          {/* 7. Crisp Zero-Halo Founder Cutout Portrait with Smooth Parallax */}
          <motion.div
            style={{
              x: isTouch ? 0 : portraitX,
              y: isTouch ? 0 : portraitY,
            }}
            className="relative z-10 mt-5 sm:mt-6 px-2 flex justify-center items-end"
          >
            <Image
              src="/images/faraz-journey-cutout.webp?v=2"
              alt="Faraz Ahmed - Independent Web Developer & AI Solutions Specialist"
              width={844}
              height={702}
              priority={priority}
              unoptimized
              className="w-[96%] h-auto max-h-[340px] sm:max-h-[375px] object-contain object-bottom drop-shadow-[0_18px_32px_rgba(7,7,17,0.55)] transition-transform duration-500 ease-out"
            />
          </motion.div>

          {/* 8. Subtle Grounding Vignette + Sleek Liquid-Glass Nameplate Dock */}
          <div className="founder-bottom-fade absolute bottom-0 inset-x-0 h-28 bg-gradient-to-t from-[#080a18] via-[#080a18]/85 to-transparent pointer-events-none z-10" />

          <div className="founder-nameplate relative z-20 mx-3.5 sm:mx-4 mb-3.5 sm:mb-4 -mt-12 p-3 sm:p-3.5 rounded-2xl bg-[#0d1229]/85 border border-white/15 backdrop-blur-xl shadow-[0_12px_32px_rgba(0,0,0,0.45)] flex items-center justify-between gap-3">
            <div className="flex items-center gap-3 min-w-0">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#7C3AED] via-[#8B5CF6] to-[#A855F7] flex items-center justify-center text-white shadow-[0_0_16px_rgba(139,92,246,0.45)] shrink-0">
                <ShieldCheck className="w-5 h-5 text-white" />
              </div>
              <div className="min-w-0 text-left">
                <h4 className="font-heading font-bold text-sm sm:text-[15px] text-white truncate">
                  Faraz Ahmed
                </h4>
                <p className="text-[11px] sm:text-xs text-purple-300 font-medium truncate">
                  {subtitle}
                </p>
              </div>
            </div>

            <div className="founder-verified-tag hidden sm:inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-emerald-500/15 border border-emerald-400/30 text-emerald-300 text-[10px] font-bold uppercase tracking-wider shrink-0">
              <span>Verified</span>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
