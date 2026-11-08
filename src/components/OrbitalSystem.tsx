"use client";

import React from "react";

/**
 * Animated orbital rings behind the hero portrait.
 * Uses pure CSS keyframes (GPU compositor thread) so the rings spin smoothly
 * on every device — including iPhone / Android mobile browsers.
 */

type NodeProps = {
  color: string;
  className: string;
  size?: string;
  ping?: boolean;
};

function OrbitNode({ color, className, size = "w-2.5 h-2.5 sm:w-3 sm:h-3", ping = false }: NodeProps) {
  return (
    <div
      className={`absolute rounded-full ${size} ${className}`}
      style={{
        background: `radial-gradient(circle at 35% 30%, #ffffff 0%, ${color} 45%, ${color} 100%)`,
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
    <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden select-none z-0">
      {/* Ambient Radial Tech Aura behind Faraz (smaller + softer on mobile so it never looks like a hazy clipped box) */}
      <div className="absolute w-[260px] sm:w-[580px] h-[260px] sm:h-[580px] rounded-full bg-gradient-to-tr from-[#7C3AED]/30 via-[#8B5CF6]/15 to-[#38BDF8]/10 blur-[60px] sm:blur-[110px]" />

      {/* Primary Outer Orbital Ellipse (clockwise) */}
      <div className="orbit-spin orbit-spin-slow absolute w-[340px] sm:w-[620px] lg:w-[720px] h-[210px] sm:h-[380px] lg:h-[430px] rounded-[50%] border border-purple-500/30 shadow-[0_0_20px_rgba(139,92,246,0.15)]">
        <OrbitNode color="#A855F7" className="-top-1.5 left-1/4" ping />
        <OrbitNode color="#F43F5E" className="-bottom-1.5 right-1/4" size="w-2 h-2 sm:w-2.5 sm:h-2.5" />
        <OrbitNode color="#22D3EE" className="top-1/2 -right-1" size="w-2 h-2" />
      </div>

      {/* Secondary Middle Orbital Ellipse (counter-clockwise) */}
      <div className="orbit-spin orbit-spin-reverse absolute w-[280px] sm:w-[500px] lg:w-[580px] h-[170px] sm:h-[300px] lg:h-[340px] rounded-[50%] border border-cyan-400/25 shadow-[0_0_15px_rgba(56,189,248,0.1)]">
        <OrbitNode color="#10B981" className="top-1/2 -right-1.5" size="w-2 h-2 sm:w-2.5 sm:h-2.5" ping />
        <OrbitNode color="#38BDF8" className="top-1/2 -left-1.5" size="w-2 h-2" />
        <OrbitNode color="#E879F9" className="-top-1 left-1/2" size="w-1.5 h-1.5 sm:w-2 sm:h-2" />
      </div>

      {/* Tertiary Inner Orbital Ellipse (faster clockwise) */}
      <div className="orbit-spin orbit-spin-fast absolute w-[220px] sm:w-[380px] lg:w-[440px] h-[135px] sm:h-[220px] lg:h-[250px] rounded-[50%] border border-dashed border-purple-400/30">
        <OrbitNode color="#F59E0B" className="top-3 sm:top-4 left-1/3" size="w-2 h-2" ping />
        <OrbitNode color="#84CC16" className="bottom-3 sm:bottom-4 right-1/3" size="w-1.5 h-1.5 sm:w-2 sm:h-2" />
      </div>

      {/* Subtle Micro Star Dust / Light Specks */}
      <div className="absolute top-1/4 right-1/3 w-1 h-1 rounded-full bg-white/60 shadow-[0_0_6px_#fff]" />
      <div className="absolute bottom-1/3 left-1/4 w-1.5 h-1.5 rounded-full bg-purple-300/50 shadow-[0_0_8px_#A855F7]" />
      <div className="absolute top-1/3 left-1/5 w-1 h-1 rounded-full bg-cyan-300/40" />
    </div>
  );
}
