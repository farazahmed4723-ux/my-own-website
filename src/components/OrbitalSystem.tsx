"use client";

import React from "react";

/**
 * Animated orbital rings behind the hero portrait.
 * Uses pure CSS keyframes (GPU compositor thread) so the rings spin smoothly
 * on every device — including iPhone / Android mobile browsers.
 */
export default function OrbitalSystem() {
  return (
    <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden select-none z-0">
      {/* Ambient Radial Tech Aura behind Faraz (smaller + softer on mobile so it never looks like a hazy clipped box) */}
      <div className="absolute w-[260px] sm:w-[580px] h-[260px] sm:h-[580px] rounded-full bg-gradient-to-tr from-[#7C3AED]/30 via-[#8B5CF6]/15 to-[#38BDF8]/10 blur-[60px] sm:blur-[110px]" />

      {/* Primary Outer Orbital Ellipse (clockwise) */}
      <div className="orbit-spin orbit-spin-slow absolute w-[340px] sm:w-[620px] lg:w-[720px] h-[210px] sm:h-[380px] lg:h-[430px] rounded-[50%] border border-purple-500/30 shadow-[0_0_20px_rgba(139,92,246,0.15)]">
        {/* Node 1: Purple Glowing Pulse Node */}
        <div className="absolute -top-1.5 left-1/4 w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-[#A855F7] shadow-[0_0_12px_#A855F7]">
          <span className="absolute inset-0 rounded-full bg-[#A855F7] animate-ping opacity-60" />
        </div>

        {/* Node 2: Cyan Glowing Node */}
        <div className="absolute -bottom-1.5 right-1/4 w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-[#38BDF8] shadow-[0_0_12px_#38BDF8]" />
      </div>

      {/* Secondary Middle Orbital Ellipse (counter-clockwise) */}
      <div className="orbit-spin orbit-spin-reverse absolute w-[280px] sm:w-[500px] lg:w-[580px] h-[170px] sm:h-[300px] lg:h-[340px] rounded-[50%] border border-cyan-400/25 shadow-[0_0_15px_rgba(56,189,248,0.1)]">
        {/* Node 3: Bright White-Cyan Particle */}
        <div className="absolute top-1/2 -right-1.5 w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-cyan-200 shadow-[0_0_10px_#38BDF8]">
          <span className="absolute inset-0 rounded-full bg-cyan-400 animate-ping opacity-50" />
        </div>

        {/* Node 4: Violet Orbit Dot */}
        <div className="absolute top-1/2 -left-1.5 w-2 h-2 rounded-full bg-purple-400 shadow-[0_0_8px_#C084FC]" />
      </div>

      {/* Tertiary Inner Orbital Ellipse (faster clockwise) */}
      <div className="orbit-spin orbit-spin-fast absolute w-[220px] sm:w-[380px] lg:w-[440px] h-[135px] sm:h-[220px] lg:h-[250px] rounded-[50%] border border-dashed border-purple-400/30">
        {/* Node 5: Amber Accent Node */}
        <div className="absolute top-3 sm:top-4 left-1/3 w-2 h-2 rounded-full bg-[#F59E0B] shadow-[0_0_8px_#F59E0B]" />
      </div>

      {/* Subtle Micro Star Dust / Light Specks */}
      <div className="absolute top-1/4 right-1/3 w-1 h-1 rounded-full bg-white/60 shadow-[0_0_6px_#fff]" />
      <div className="absolute bottom-1/3 left-1/4 w-1.5 h-1.5 rounded-full bg-purple-300/50 shadow-[0_0_8px_#A855F7]" />
      <div className="absolute top-1/3 left-1/5 w-1 h-1 rounded-full bg-cyan-300/40" />
    </div>
  );
}
