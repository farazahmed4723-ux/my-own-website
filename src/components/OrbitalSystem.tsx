"use client";

import React from "react";

/**
 * Theme-adaptive animated orbital rings & studio lighting behind the hero desk portrait.
 * Adapts automatically to both Dark Mode and Light Mode with zero rectangular boundaries,
 * running on the GPU compositor thread via CSS keyframes on both mobile and desktop.
 */

type NodeProps = {
  color: string;
  className: string;
  size?: string;
  ping?: boolean;
};

function OrbitNode({
  color,
  className,
  size = "w-2.5 h-2.5 sm:w-3 sm:h-3",
  ping = false,
}: NodeProps) {
  return (
    <div
      className={`absolute rounded-full ${size} ${className}`}
      style={{
        background: `radial-gradient(circle at 35% 30%, #ffffff 0%, ${color} 48%, ${color} 100%)`,
        boxShadow: `0 0 10px ${color}, 0 0 22px ${color}66`,
      }}
    >
      {ping && (
        <span
          className="absolute inset-0 rounded-full animate-ping opacity-60"
          style={{ background: color }}
        />
      )}
    </div>
  );
}

export default function OrbitalSystem() {
  return (
    <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-visible select-none z-0 -translate-y-4 sm:-translate-y-6">
      {/* Theme-Adaptive Studio Radial Aura (soft lavender-sky in Light Mode, deep royal-violet-cyan in Dark Mode) */}
      <div className="absolute w-[290px] sm:w-[540px] lg:w-[600px] h-[290px] sm:h-[500px] lg:h-[560px] rounded-full bg-gradient-to-tr from-[#6366F1]/20 via-[#8B5CF6]/15 to-[#38BDF8]/20 dark:from-[#2563EB]/30 dark:via-[#8B5CF6]/25 dark:to-[#38BDF8]/20 blur-[65px] sm:blur-[110px]" />

      {/* Primary Outer Orbital Ellipse (clockwise) */}
      <div className="orbit-spin orbit-spin-slow absolute w-[330px] sm:w-[560px] lg:w-[650px] h-[205px] sm:h-[345px] lg:h-[400px] rounded-[50%] border border-indigo-500/25 dark:border-purple-400/30 shadow-[0_0_20px_rgba(139,92,246,0.12)]">
        <OrbitNode color="#8B5CF6" className="-top-1.5 left-1/4" ping />
        <OrbitNode color="#3B82F6" className="-bottom-1.5 right-1/4" size="w-2 h-2 sm:w-2.5 sm:h-2.5" />
        <OrbitNode color="#06B6D4" className="top-1/2 -right-1" size="w-2 h-2" />
      </div>

      {/* Secondary Middle Orbital Ellipse (counter-clockwise, dashed like reference) */}
      <div className="orbit-spin orbit-spin-reverse absolute w-[275px] sm:w-[460px] lg:w-[530px] h-[170px] sm:h-[280px] lg:h-[325px] rounded-[50%] border border-dashed border-purple-500/30 dark:border-cyan-400/30">
        <OrbitNode color="#10B981" className="top-1/2 -right-1.5" size="w-2 h-2 sm:w-2.5 sm:h-2.5" ping />
        <OrbitNode color="#38BDF8" className="top-1/2 -left-1.5" size="w-2 h-2" />
        <OrbitNode color="#A855F7" className="-top-1 left-1/2" size="w-2 h-2" />
      </div>

      {/* Tertiary Inner Orbital Ellipse (faster clockwise) */}
      <div className="orbit-spin orbit-spin-fast absolute w-[215px] sm:w-[355px] lg:w-[410px] h-[132px] sm:h-[215px] lg:h-[245px] rounded-[50%] border border-sky-500/25 dark:border-indigo-400/25">
        <OrbitNode color="#F59E0B" className="top-3 sm:top-4 left-1/3" size="w-2 h-2" ping />
        <OrbitNode color="#EC4899" className="bottom-3 sm:bottom-4 right-1/3" size="w-1.5 h-1.5 sm:w-2 sm:h-2" />
      </div>

      {/* Subtle Ambient Light Specks */}
      <div className="absolute top-1/4 right-1/4 w-1.5 h-1.5 rounded-full bg-sky-400/60 dark:bg-white/60 shadow-[0_0_6px_#38BDF8]" />
      <div className="absolute bottom-1/3 left-1/5 w-1.5 h-1.5 rounded-full bg-purple-500/50 dark:bg-purple-300/60 shadow-[0_0_8px_#A855F7]" />
    </div>
  );
}
