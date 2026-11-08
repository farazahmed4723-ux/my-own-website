"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Bot, Code2, Globe, Workflow } from "lucide-react";

interface ServiceOrbitCard {
  id: string;
  title: string;
  subtitle: string;
  href: string;
  initialAngle: number;
  iconColor: string;
  iconBg: string;
  iconBorder: string;
  Icon: React.ComponentType<{ className?: string }>;
}

interface OrbitSphere {
  trackIndex: 0 | 1 | 2;
  initialAngle: number;
  speed: number; // rad/s (positive = clockwise in screen ellipse, negative = counter)
  size: number;  // px
  color: string;
  core: string;
  glow: string;
}

const SERVICE_CARDS: ServiceOrbitCard[] = [
  {
    id: "fullstack",
    title: "Full Stack Developer",
    subtitle: "React • Next.js • APIs",
    href: "/services/website-development",
    initialAngle: Math.PI * 0.2, // front-right
    iconColor: "text-[#60A5FA]",
    iconBg: "bg-[#3B82F6]/15",
    iconBorder: "border-[#3B82F6]/30",
    Icon: Code2,
  },
  {
    id: "wordpress",
    title: "WordPress Expert",
    subtitle: "Custom Websites • WordPress",
    href: "/services/wordpress-development",
    initialAngle: Math.PI * 0.7, // front-left
    iconColor: "text-[#38BDF8]",
    iconBg: "bg-[#0EA5E9]/15",
    iconBorder: "border-[#0EA5E9]/30",
    Icon: Globe,
  },
  {
    id: "chatbots",
    title: "AI Chatbots",
    subtitle: "Smart Bots • AI Assistants",
    href: "/services/ai-chatbots",
    initialAngle: Math.PI * 1.2, // back-upper-left
    iconColor: "text-[#2DD4BF]",
    iconBg: "bg-[#14B8A6]/15",
    iconBorder: "border-[#14B8A6]/30",
    Icon: Bot,
  },
  {
    id: "automation",
    title: "AI Automation",
    subtitle: "n8n • Make • Workflows",
    href: "/services/ai-agents",
    initialAngle: Math.PI * 1.7, // back-upper-right
    iconColor: "text-[#C4B5FD]",
    iconBg: "bg-[#8B5CF6]/15",
    iconBorder: "border-[#8B5CF6]/30",
    Icon: Workflow,
  },
];

// 12 restrained, multi-speed 3D luminous spheres across the 3 orbital planes
const ORBIT_SPHERES: OrbitSphere[] = [
  // Electric Blue
  { trackIndex: 0, initialAngle: 0.35, speed: 0.21, size: 7.5, color: "#3B82F6", core: "#DBEAFE", glow: "rgba(59,130,246,0.45)" },
  { trackIndex: 1, initialAngle: 2.45, speed: -0.28, size: 6, color: "#2563EB", core: "#BFDBFE", glow: "rgba(37,99,235,0.40)" },
  { trackIndex: 2, initialAngle: 4.85, speed: 0.33, size: 5.5, color: "#60A5FA", core: "#EFF6FF", glow: "rgba(96,165,250,0.38)" },
  // Cyan
  { trackIndex: 0, initialAngle: 3.55, speed: 0.21, size: 7, color: "#22D3EE", core: "#ECFEFF", glow: "rgba(34,211,238,0.42)" },
  { trackIndex: 1, initialAngle: 0.95, speed: -0.25, size: 6.5, color: "#06B6D4", core: "#CFFAFE", glow: "rgba(6,182,212,0.38)" },
  { trackIndex: 2, initialAngle: 1.85, speed: 0.36, size: 5, color: "#38BDF8", core: "#E0F2FE", glow: "rgba(56,189,248,0.38)" },
  // Soft Purple
  { trackIndex: 1, initialAngle: 3.95, speed: -0.26, size: 7.5, color: "#8B5CF6", core: "#EDE9FE", glow: "rgba(139,92,246,0.44)" },
  { trackIndex: 2, initialAngle: 0.55, speed: 0.31, size: 6, color: "#A78BFA", core: "#F5F3FF", glow: "rgba(167,139,250,0.38)" },
  // Teal / Green
  { trackIndex: 0, initialAngle: 1.92, speed: 0.21, size: 6.5, color: "#14B8A6", core: "#CCFBF1", glow: "rgba(20,184,166,0.40)" },
  { trackIndex: 1, initialAngle: 5.35, speed: -0.29, size: 5.5, color: "#10B981", core: "#D1FAE5", glow: "rgba(16,185,129,0.38)" },
  // Warm Amber
  { trackIndex: 0, initialAngle: 5.08, speed: 0.21, size: 7, color: "#F59E0B", core: "#FEF3C7", glow: "rgba(245,158,11,0.42)" },
  { trackIndex: 2, initialAngle: 3.25, speed: 0.34, size: 5.5, color: "#FBBF24", core: "#FFFBEB", glow: "rgba(251,191,36,0.38)" },
];

interface TrackSpec {
  cx: number;
  cy: number;
  rx: number;
  ry: number;
  tiltDeg: number;
  tiltRad: number;
  parallaxFactor: number;
}

function computeTracks(
  stageW: number,
  pTop: number,
  pw: number,
  ph: number,
  isMobile: boolean
): [TrackSpec, TrackSpec, TrackSpec] {
  const cx = stageW * 0.5;
  // Anchor orbital center to portrait chest/tie level (pTop + 0.53 * ph) so front arc (sin >= 0)
  // is ALWAYS well below chin (0.39 * ph) & glasses (0.23 * ph) at every screen size!
  const rx0 = isMobile
    ? Math.min(stageW * 0.44, pw * 0.48)
    : Math.min(pw * 0.45, Math.max(148, stageW * 0.5 - 66));
  const ry0 = ph * (isMobile ? 0.33 : 0.35);

  const t0Deg = -7;
  const t1Deg = 8.5;
  const t2Deg = -13.5;

  return [
    {
      cx,
      cy: pTop + ph * 0.535,
      rx: rx0,
      ry: ry0,
      tiltDeg: t0Deg,
      tiltRad: (t0Deg * Math.PI) / 180,
      parallaxFactor: 1.0,
    },
    {
      cx,
      cy: pTop + ph * 0.49,
      rx: rx0 * 0.85,
      ry: ry0 * 0.78,
      tiltDeg: t1Deg,
      tiltRad: (t1Deg * Math.PI) / 180,
      parallaxFactor: 0.72,
    },
    {
      cx,
      cy: pTop + ph * 0.555,
      rx: Math.min(stageW * 0.46, rx0 * 1.08),
      ry: ry0 * 0.58,
      tiltDeg: t2Deg,
      tiltRad: (t2Deg * Math.PI) / 180,
      parallaxFactor: 1.22,
    },
  ];
}

function projectOnTrack(track: TrackSpec, theta: number, px: number, py: number) {
  const cosT = Math.cos(theta);
  const sinT = Math.sin(theta); // < 0 is BACK half (behind portrait), >= 0 is FRONT half (below chin/across desk)
  const u = track.rx * cosT;
  const v = track.ry * sinT;
  const cosPhi = Math.cos(track.tiltRad);
  const sinPhi = Math.sin(track.tiltRad);

  const x = track.cx + u * cosPhi - v * sinPhi + px * track.parallaxFactor;
  const y = track.cy + u * sinPhi + v * cosPhi + py * track.parallaxFactor;

  return { x, y, depth: sinT };
}

export default function HeroOrbitalShowcase() {
  const stageRef = useRef<HTMLDivElement>(null);
  const portraitRef = useRef<HTMLDivElement>(null);
  const backSvgGroupRefs = useRef<(SVGGElement | null)[]>([]);
  const frontSvgGroupRefs = useRef<(SVGGElement | null)[]>([]);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const sphereRefs = useRef<(HTMLDivElement | null)[]>([]);
  const cursorGlowRef = useRef<HTMLDivElement>(null);
  const cursorMoteRefs = useRef<(HTMLDivElement | null)[]>([]);

  const [stageDims, setStageDims] = useState<{ w: number; h: number; pTop: number; pw: number; ph: number }>({
    w: 600,
    h: 520,
    pTop: 92,
    pw: 545,
    ph: 428,
  });
  const [isMobile, setIsMobile] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [isTouch, setIsTouch] = useState(false);

  // Mutable animation state (zero React re-renders during 60fps loop)
  const dimsRef = useRef({ w: 600, h: 520, pTop: 92, pw: 545, ph: 428, isMobile: false });
  const hoverStateRef = useRef<{ stageHovered: boolean; cardHovered: boolean }>({
    stageHovered: false,
    cardHovered: false,
  });
  const inViewRef = useRef(true);
  const pointerTargetRef = useRef({ nx: 0, ny: 0, px: 300, py: 260, inside: false });

  useEffect(() => {
    if (typeof window === "undefined") return;

    const mqReduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    const mqTouch = window.matchMedia("(pointer: coarse)");
    const updateFlags = () => {
      setReducedMotion(mqReduced.matches);
      setIsTouch(mqTouch.matches || "ontouchstart" in window || navigator.maxTouchPoints > 0);
    };
    updateFlags();

    mqReduced.addEventListener("change", updateFlags);
    mqTouch.addEventListener("change", updateFlags);
    return () => {
      mqReduced.removeEventListener("change", updateFlags);
      mqTouch.removeEventListener("change", updateFlags);
    };
  }, []);

  // Track stage & portrait bounding boxes cleanly via ResizeObserver
  useEffect(() => {
    const el = stageRef.current;
    if (!el) return;

    const measure = () => {
      const sRect = el.getBoundingClientRect();
      const w = Math.max(280, Math.round(sRect.width));
      const h = Math.max(260, Math.round(sRect.height));
      let pw = Math.min(w, 545);
      let ph = Math.round((pw * 805) / 1024);
      let pTop = Math.max(0, h - ph);

      if (portraitRef.current) {
        const pRect = portraitRef.current.getBoundingClientRect();
        if (pRect.width > 40 && pRect.height > 40) {
          pw = Math.round(pRect.width);
          ph = Math.round(pRect.height);
          pTop = Math.round(pRect.top - sRect.top);
        }
      }

      const mob = window.innerWidth < 640;
      dimsRef.current = { w, h, pTop, pw, ph, isMobile: mob };
      setIsMobile(mob);
      setStageDims((prev) =>
        Math.abs(prev.w - w) > 2 ||
        Math.abs(prev.h - h) > 2 ||
        Math.abs(prev.pw - pw) > 2 ||
        Math.abs(prev.pTop - pTop) > 2
          ? { w, h, pTop, pw, ph }
          : prev
      );
    };

    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    if (portraitRef.current) ro.observe(portraitRef.current);
    return () => ro.disconnect();
  }, []);

  // Pause RAF when scrolled completely off-screen for zero wasted CPU/GPU cycles
  useEffect(() => {
    const el = stageRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        inViewRef.current = entries.some((e) => e.isIntersecting);
      },
      { threshold: 0.02 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // Main GPU-friendly 3D orbital animation & smooth cursor interpolation loop
  useEffect(() => {
    const applyFrame = (
      cardPhase: number,
      elapsedSec: number,
      parallaxX: number,
      parallaxY: number
    ) => {
      const { w, pTop, pw, ph, isMobile: mob } = dimsRef.current;
      const tracks = computeTracks(w, pTop, pw, ph, mob);

      // 1. Subtle parallax on back/front SVG dotted elliptical tracks (portrait stays 100% stationary)
      for (let tIdx = 0; tIdx < 3; tIdx++) {
        const tr = tracks[tIdx];
        const tx = (tr.cx + parallaxX * tr.parallaxFactor).toFixed(2);
        const ty = (tr.cy + parallaxY * tr.parallaxFactor).toFixed(2);
        const svgTransform = `translate(${tx}, ${ty}) rotate(${tr.tiltDeg})`;
        const backG = backSvgGroupRefs.current[tIdx];
        const frontG = frontSvgGroupRefs.current[tIdx];
        if (backG) backG.setAttribute("transform", svgTransform);
        if (frontG) frontG.setAttribute("transform", svgTransform);
      }

      // 2. Update 4 physically orbiting upright service cards (Desktop & Tablet >= 640px)
      if (!mob) {
        const cardTrack = tracks[0];
        for (let i = 0; i < SERVICE_CARDS.length; i++) {
          const cardEl = cardRefs.current[i];
          if (!cardEl) continue;

          const theta = SERVICE_CARDS[i].initialAngle + cardPhase;
          const { x, y, depth } = projectOnTrack(cardTrack, theta, parallaxX, parallaxY);

          // Depth scale: smaller behind Faraz (0.83), larger in front (1.04); always upright!
          const normDepth = (depth + 1) * 0.5; // 0 (farthest back) -> 1 (closest front)
          const scale = 0.83 + 0.21 * normDepth;
          const opacity = 0.76 + 0.24 * normDepth;
          // Depth-aware z-index: 10 when behind portrait (z-20), 30 when in front of portrait
          const zIdx = depth < 0 ? 10 : 30;

          cardEl.style.transform = `translate3d(${x.toFixed(2)}px, ${y.toFixed(2)}px, 0) translate(-50%, -50%) scale(${scale.toFixed(3)})`;
          cardEl.style.opacity = opacity.toFixed(3);
          cardEl.style.zIndex = String(zIdx);
        }
      }

      // 3. Update 12 independent colorful luminous orbiting spheres
      for (let i = 0; i < ORBIT_SPHERES.length; i++) {
        const spEl = sphereRefs.current[i];
        if (!spEl) continue;
        const sp = ORBIT_SPHERES[i];
        const tr = tracks[sp.trackIndex];
        const theta = sp.initialAngle + elapsedSec * sp.speed;
        const { x, y, depth } = projectOnTrack(tr, theta, parallaxX, parallaxY);

        const normDepth = (depth + 1) * 0.5;
        const scale = 0.66 + 0.42 * normDepth;
        const opacity = 0.42 + 0.54 * normDepth;
        const zIdx = depth < 0 ? 10 : 26;

        spEl.style.transform = `translate3d(${x.toFixed(2)}px, ${y.toFixed(2)}px, 0) translate(-50%, -50%) scale(${scale.toFixed(3)})`;
        spEl.style.opacity = opacity.toFixed(3);
        spEl.style.zIndex = String(zIdx);
      }
    };

    // Static clean layout when prefers-reduced-motion is enabled
    if (reducedMotion) {
      applyFrame(0.06, 0, 0, 0);
      return;
    }

    let rafId = 0;
    let lastTs = performance.now();
    let cardPhase = 0;
    let sphereTime = 0;
    let speedFactor = 1;
    let smoothNx = 0;
    let smoothNy = 0;
    let glowX = dimsRef.current.w * 0.5;
    let glowY = dimsRef.current.h * 0.5;
    let glowOpacity = 0;
    const motePos = [
      { x: glowX, y: glowY },
      { x: glowX, y: glowY },
      { x: glowX, y: glowY },
    ];

    const BASE_CARD_SPEED = 0.205; // rad/s (~30.6s per full 360-degree orbit)

    const tick = (now: number) => {
      const dt = Math.min(0.05, Math.max(0, (now - lastTs) / 1000));
      lastTs = now;

      if (inViewRef.current) {
        // Graceful hover deceleration: pause/crawl on card hover, gentle slowdown on stage hover
        const targetSpeed = hoverStateRef.current.cardHovered
          ? 0.04
          : hoverStateRef.current.stageHovered
            ? 0.55
            : 1.0;
        speedFactor += (targetSpeed - speedFactor) * Math.min(1, dt * 6.5);

        cardPhase = (cardPhase + dt * BASE_CARD_SPEED * speedFactor) % (Math.PI * 2);
        sphereTime += dt * (0.45 + 0.55 * speedFactor);

        // Smooth interpolated parallax (disabled on touch devices)
        const targetNx = !isTouch && pointerTargetRef.current.inside ? pointerTargetRef.current.nx : 0;
        const targetNy = !isTouch && pointerTargetRef.current.inside ? pointerTargetRef.current.ny : 0;
        smoothNx += (targetNx - smoothNx) * Math.min(1, dt * 5.2);
        smoothNy += (targetNy - smoothNy) * Math.min(1, dt * 5.2);

        const parallaxX = smoothNx * 14;
        const parallaxY = smoothNy * 10;

        applyFrame(cardPhase, sphereTime, parallaxX, parallaxY);

        // Desktop-only interpolated cursor-following glow & trailing micro-particles
        if (!isTouch) {
          const pt = pointerTargetRef.current;
          glowX += (pt.px - glowX) * Math.min(1, dt * 7.5);
          glowY += (pt.py - glowY) * Math.min(1, dt * 7.5);
          const targetGlowAlpha = pt.inside ? 1 : 0;
          glowOpacity += (targetGlowAlpha - glowOpacity) * Math.min(1, dt * 6);

          if (cursorGlowRef.current) {
            cursorGlowRef.current.style.transform = `translate3d(${glowX.toFixed(1)}px, ${glowY.toFixed(1)}px, 0) translate(-50%, -50%)`;
            cursorGlowRef.current.style.opacity = glowOpacity.toFixed(3);
          }

          const moteRates = [10, 6.2, 3.8];
          const moteOffsets = [
            { dx: -10, dy: -8 },
            { dx: 14, dy: 10 },
            { dx: -6, dy: 16 },
          ];
          for (let m = 0; m < 3; m++) {
            motePos[m].x += (pt.px + moteOffsets[m].dx - motePos[m].x) * Math.min(1, dt * moteRates[m]);
            motePos[m].y += (pt.py + moteOffsets[m].dy - motePos[m].y) * Math.min(1, dt * moteRates[m]);
            const moteEl = cursorMoteRefs.current[m];
            if (moteEl) {
              moteEl.style.transform = `translate3d(${motePos[m].x.toFixed(1)}px, ${motePos[m].y.toFixed(1)}px, 0) translate(-50%, -50%)`;
              moteEl.style.opacity = (glowOpacity * 0.85).toFixed(3);
            }
          }
        }
      }

      rafId = requestAnimationFrame(tick);
    };

    // Apply initial frame immediately so SSR -> client hydration has zero jump
    applyFrame(0, 0, 0, 0);
    rafId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId);
  }, [reducedMotion, isTouch]);

  const handleStageMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isTouch || reducedMotion || !stageRef.current) return;
    const rect = stageRef.current.getBoundingClientRect();
    const px = e.clientX - rect.left;
    const py = e.clientY - rect.top;
    const nx = (px / Math.max(1, rect.width) - 0.5) * 2;  // -1 .. +1
    const ny = (py / Math.max(1, rect.height) - 0.5) * 2; // -1 .. +1
    pointerTargetRef.current = { nx, ny, px, py, inside: true };
    hoverStateRef.current.stageHovered = true;
  };

  const handleStageMouseLeave = () => {
    pointerTargetRef.current.inside = false;
    hoverStateRef.current.stageHovered = false;
    hoverStateRef.current.cardHovered = false;
  };

  const tracksForSvg = computeTracks(
    stageDims.w,
    stageDims.pTop,
    stageDims.pw,
    stageDims.ph,
    isMobile
  );
  const trackStrokes = [
    { back: "rgba(167, 139, 250, 0.24)", front: "rgba(167, 139, 250, 0.38)", dash: "2.5 7.5" },
    { back: "rgba(56, 189, 248, 0.20)", front: "rgba(56, 189, 248, 0.32)", dash: "2 8.5" },
    { back: "rgba(99, 102, 241, 0.17)", front: "rgba(99, 102, 241, 0.27)", dash: "1.8 9" },
  ];

  return (
    <div className="w-full flex flex-col items-center">
      {/* 3D Orbital Stage + Stationary Central Portrait */}
      <div
        ref={stageRef}
        onMouseMove={handleStageMouseMove}
        onMouseLeave={handleStageMouseLeave}
        className="relative w-full min-h-[290px] sm:min-h-[465px] lg:min-h-[500px] flex items-end justify-center select-none overflow-visible"
      >
        {/* Subtle Restrained Studio Depth Glow (matches existing dark navy/purple palette, no heavy bloom) */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[260px] sm:w-[440px] lg:w-[490px] h-[240px] sm:h-[390px] lg:h-[430px] rounded-full opacity-75 z-0"
          style={{
            background:
              "radial-gradient(ellipse at 50% 48%, rgba(99, 102, 241, 0.16) 0%, rgba(56, 189, 248, 0.08) 42%, rgba(7, 11, 31, 0) 72%)",
          }}
        />

        {/* Desktop-Only Smooth Cursor-Following Particle Glow */}
        {!isTouch && !reducedMotion && (
          <>
            <div
              ref={cursorGlowRef}
              aria-hidden="true"
              className="pointer-events-none absolute top-0 left-0 w-56 h-56 rounded-full opacity-0 z-[5] will-change-transform"
              style={{
                background:
                  "radial-gradient(circle, rgba(56, 189, 248, 0.13) 0%, rgba(139, 92, 246, 0.08) 42%, rgba(7, 11, 31, 0) 72%)",
              }}
            />
            {[
              { size: 4, color: "#38BDF8", shadow: "0 0 8px rgba(56,189,248,0.55)" },
              { size: 3.5, color: "#A78BFA", shadow: "0 0 8px rgba(167,139,250,0.5)" },
              { size: 3, color: "#2DD4BF", shadow: "0 0 7px rgba(45,212,191,0.45)" },
            ].map((mote, idx) => (
              <div
                key={idx}
                ref={(el) => {
                  cursorMoteRefs.current[idx] = el;
                }}
                aria-hidden="true"
                className="pointer-events-none absolute top-0 left-0 rounded-full opacity-0 z-[27] will-change-transform"
                style={{
                  width: `${mote.size}px`,
                  height: `${mote.size}px`,
                  backgroundColor: mote.color,
                  boxShadow: mote.shadow,
                }}
              />
            ))}
          </>
        )}

        {/* BACK HALF of the 3 Dotted Elliptical Tracks (z-10: passes BEHIND Faraz's portrait) */}
        <svg
          aria-hidden="true"
          viewBox={`0 0 ${stageDims.w} ${stageDims.h}`}
          className="pointer-events-none absolute inset-0 w-full h-full overflow-visible z-10"
        >
          {tracksForSvg.map((tr, idx) => (
            <g
              key={`back-${idx}`}
              ref={(el) => {
                backSvgGroupRefs.current[idx] = el;
              }}
              transform={`translate(${tr.cx}, ${tr.cy}) rotate(${tr.tiltDeg})`}
            >
              <path
                d={`M ${tr.rx} 0 A ${tr.rx} ${tr.ry} 0 0 0 ${-tr.rx} 0`}
                fill="none"
                stroke={trackStrokes[idx].back}
                strokeWidth="1.2"
                strokeDasharray={trackStrokes[idx].dash}
                strokeLinecap="round"
              />
            </g>
          ))}
        </svg>

        {/* STATIONARY CENTRAL FOREGROUND PORTRAIT (z-20: completely still, untouched identity & proportions) */}
        <div
          ref={portraitRef}
          className="relative z-20 w-full max-w-[360px] sm:max-w-[490px] lg:max-w-[545px] aspect-[1024/805] flex items-end justify-center pointer-events-none"
        >
          <Image
            src="/images/faraz-hero-portrait.webp"
            alt="Faraz Ahmed - Full Stack Developer & AI Solutions Specialist"
            fill
            sizes="(max-width: 640px) 92vw, (max-width: 1024px) 52vw, 545px"
            className="object-contain object-bottom drop-shadow-[0_18px_36px_rgba(3,6,20,0.45)]"
            priority
          />
        </div>

        {/* FRONT HALF of the 3 Dotted Elliptical Tracks (z-[25]: sweeps IN FRONT across lower laptop/desk, never near face) */}
        <svg
          aria-hidden="true"
          viewBox={`0 0 ${stageDims.w} ${stageDims.h}`}
          className="pointer-events-none absolute inset-0 w-full h-full overflow-visible z-[25]"
        >
          {tracksForSvg.map((tr, idx) => (
            <g
              key={`front-${idx}`}
              ref={(el) => {
                frontSvgGroupRefs.current[idx] = el;
              }}
              transform={`translate(${tr.cx}, ${tr.cy}) rotate(${tr.tiltDeg})`}
            >
              <path
                d={`M ${-tr.rx} 0 A ${tr.rx} ${tr.ry} 0 0 0 ${tr.rx} 0`}
                fill="none"
                stroke={trackStrokes[idx].front}
                strokeWidth="1.25"
                strokeDasharray={trackStrokes[idx].dash}
                strokeLinecap="round"
              />
            </g>
          ))}
        </svg>

        {/* 12 Depth-Layered Luminous Orbiting Spheres (dynamically switch z-10 behind / z-[26] in front) */}
        {ORBIT_SPHERES.map((sp, idx) => (
          <div
            key={`sphere-${idx}`}
            ref={(el) => {
              sphereRefs.current[idx] = el;
            }}
            aria-hidden="true"
            className="pointer-events-none absolute top-0 left-0 rounded-full will-change-transform"
            style={{
              width: `${sp.size}px`,
              height: `${sp.size}px`,
              background: `radial-gradient(circle at 32% 30%, ${sp.core} 0%, ${sp.color} 55%, ${sp.color} 100%)`,
              boxShadow: `0 0 9px ${sp.glow}`,
              zIndex: 10,
            }}
          />
        ))}

        {/* 4 Physically Orbiting Upright Glassmorphism Service Cards (Desktop & Tablet >= sm) */}
        {SERVICE_CARDS.map((card, idx) => {
          const Icon = card.Icon;
          return (
            <div
              key={card.id}
              ref={(el) => {
                cardRefs.current[idx] = el;
              }}
              onMouseEnter={() => {
                hoverStateRef.current.cardHovered = true;
              }}
              onMouseLeave={() => {
                hoverStateRef.current.cardHovered = false;
              }}
              className="hidden sm:block absolute top-0 left-0 will-change-transform"
              style={{ zIndex: 30 }}
            >
              <Link
                href={card.href}
                className="dark-preserve group flex items-center gap-2.5 rounded-2xl border border-white/[0.12] hover:border-[#8B5CF6]/55 bg-[#0B102B]/85 hover:bg-[#10173B]/95 px-3 py-2 lg:px-3.5 lg:py-2.5 backdrop-blur-md shadow-[0_10px_28px_rgba(3,6,20,0.52)] hover:shadow-[0_12px_32px_rgba(99,102,241,0.28)] transition-[border-color,background-color,box-shadow] duration-300 whitespace-nowrap"
              >
                <span
                  className={`flex h-8 w-8 lg:h-9 lg:w-9 shrink-0 items-center justify-center rounded-xl border ${card.iconBg} ${card.iconBorder} ${card.iconColor} group-hover:scale-105 transition-transform duration-200`}
                >
                  <Icon className="w-4 h-4 lg:w-[18px] lg:h-[18px]" />
                </span>
                <span className="flex flex-col leading-tight">
                  <span className="font-heading text-[12px] lg:text-[13px] font-semibold text-white tracking-tight">
                    {card.title}
                  </span>
                  <span className="text-[10px] lg:text-[10.5px] font-medium text-[#94A3B8] mt-0.5">
                    {card.subtitle}
                  </span>
                </span>
              </Link>
            </div>
          );
        })}
      </div>

      {/* Mobile (< 640px): Compact, Accessible 2x2 Glassmorphism Service Card Grid (Zero Face Overlap, Zero Clipping) */}
      <div className="sm:hidden grid grid-cols-2 gap-2.5 w-full max-w-md mt-3 px-0.5 relative z-30">
        {SERVICE_CARDS.map((card) => {
          const Icon = card.Icon;
          return (
            <Link
              key={`mob-${card.id}`}
              href={card.href}
              className="dark-preserve flex items-center gap-2 rounded-xl border border-white/[0.11] bg-[#0B102B]/85 px-2.5 py-2 backdrop-blur-md shadow-[0_8px_20px_rgba(3,6,20,0.42)] active:scale-[0.98] transition-transform"
            >
              <span
                className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-lg border ${card.iconBg} ${card.iconBorder} ${card.iconColor}`}
              >
                <Icon className="w-3.5 h-3.5" />
              </span>
              <span className="flex flex-col min-w-0 leading-tight">
                <span className="font-heading text-[11px] font-semibold text-white truncate">
                  {card.title}
                </span>
                <span className="text-[9.5px] font-medium text-[#94A3B8] truncate mt-0.5">
                  {card.subtitle}
                </span>
              </span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
