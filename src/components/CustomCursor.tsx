"use client";

import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";

/**
 * Premium Animated Custom Cursor Follower
 * Inspired by aliaideveloper.site
 *
 * Features:
 * - Fluid dual-layer follower (responsive core dot + inertia outer ring)
 * - Continuous subtle rotating orbital ring
 * - Soft brand blue glow (#38bdf8 / #818cf8)
 * - Dynamic button/link hover expansion
 * - Smooth magnetic pull on CTA buttons
 * - Interactive "VIEW" badge on portfolio cards
 * - Zero interference (pointer-events: none)
 * - Auto-disabled on touch devices & prefers-reduced-motion
 */
export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const rotatingRingRef = useRef<SVGSVGElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  const [cursorState, setCursorState] = useState<"default" | "hover" | "portfolio">("default");
  const [cursorText, setCursorText] = useState<string>("");
  const [isClient, setIsClient] = useState<boolean>(false);

  useEffect(() => {
    setIsClient(true);

    // Disable on touch devices or users who prefer reduced motion
    const isTouch =
      window.matchMedia("(pointer: coarse)").matches ||
      window.matchMedia("(hover: none)").matches ||
      "ontouchstart" in window;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (isTouch || prefersReducedMotion) {
      return;
    }

    const ring = ringRef.current;
    const dot = dotRef.current;
    const rotatingRing = rotatingRingRef.current;
    const textEl = textRef.current;

    if (!ring || !dot || !rotatingRing) return;

    // Initially hide cursor until first movement
    gsap.set([ring, dot], { opacity: 0 });

    // GSAP high-performance quickTo setters for 60/120fps fluid tracking
    const setDotX = gsap.quickTo(dot, "x", { duration: 0.12, ease: "power2.out" });
    const setDotY = gsap.quickTo(dot, "y", { duration: 0.12, ease: "power2.out" });

    const setRingX = gsap.quickTo(ring, "x", { duration: 0.42, ease: "power3.out" });
    const setRingY = gsap.quickTo(ring, "y", { duration: 0.42, ease: "power3.out" });

    // Continuous smooth rotation for the outer decorative dashed ring
    const rotationTween = gsap.to(rotatingRing, {
      rotation: 360,
      repeat: -1,
      duration: 12,
      ease: "none",
      transformOrigin: "center center",
    });

    let hasRevealed = false;
    let activeMagneticEl: HTMLElement | null = null;

    const handleMouseMove = (e: MouseEvent) => {
      const { clientX: x, clientY: y } = e;

      // Reveal cursor elements on first mouse movement
      if (!hasRevealed) {
        gsap.to([ring, dot], { opacity: 1, duration: 0.25 });
        hasRevealed = true;
      }

      setDotX(x);
      setDotY(y);
      setRingX(x);
      setRingY(y);

      // Handle magnetic pull on active CTA button if hovered
      if (activeMagneticEl) {
        const rect = activeMagneticEl.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        const pullFactor = 0.22;
        const deltaX = (x - centerX) * pullFactor;
        const deltaY = (y - centerY) * pullFactor;

        gsap.to(activeMagneticEl, {
          x: deltaX,
          y: deltaY,
          duration: 0.35,
          ease: "power2.out",
          overwrite: "auto",
        });
      }
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;

      // Check if target is inside a portfolio showcase card
      const portfolioCard = target.closest<HTMLElement>(
        "#portfolio .glass-card, [data-cursor='portfolio'], [id^='portfolio-'], a[href*='infostntrucking.ca'], a[href*='eliteclasslimo.ca']"
      );

      if (portfolioCard) {
        setCursorState("portfolio");
        setCursorText("VIEW");
        gsap.to(ring, {
          scale: 2.2,
          backgroundColor: "rgba(10, 16, 38, 0.8)",
          borderColor: "rgba(56, 189, 248, 0.9)",
          boxShadow: "0 0 25px rgba(56, 189, 248, 0.55), 0 0 45px rgba(139, 92, 246, 0.3)",
          duration: 0.35,
          ease: "power2.out",
        });
        gsap.to(dot, { opacity: 0, scale: 0.4, duration: 0.2 });
        return;
      }

      // Check if target is an interactive button / link / input
      const interactiveEl = target.closest<HTMLElement>(
        "a, button, input, select, textarea, [role='button'], label, [data-cursor='pointer']"
      );

      if (interactiveEl) {
        setCursorState("hover");
        setCursorText("");

        gsap.to(ring, {
          scale: 1.65,
          backgroundColor: "rgba(56, 189, 248, 0.12)",
          borderColor: "rgba(56, 189, 248, 0.85)",
          boxShadow: "0 0 20px rgba(56, 189, 248, 0.45), 0 0 35px rgba(99, 102, 241, 0.25)",
          duration: 0.3,
          ease: "power2.out",
        });
        gsap.to(dot, {
          scale: 0.6,
          opacity: 0.6,
          duration: 0.2,
        });

        // Detect CTA buttons for magnetic hover effect
        const isCta =
          interactiveEl.matches("button") ||
          interactiveEl.matches("a[href*='contact']") ||
          interactiveEl.matches("a[href*='wa.me']") ||
          interactiveEl.matches("[id*='btn']") ||
          interactiveEl.matches("[class*='cta']") ||
          interactiveEl.hasAttribute("data-magnetic");

        if (isCta) {
          activeMagneticEl = interactiveEl;
        }
        return;
      }

      // Default state reset
      setCursorState("default");
      setCursorText("");
      gsap.to(ring, {
        scale: 1,
        backgroundColor: "transparent",
        borderColor: "rgba(56, 189, 248, 0.55)",
        boxShadow: "0 0 14px rgba(56, 189, 248, 0.35), 0 0 28px rgba(139, 92, 246, 0.15)",
        duration: 0.35,
        ease: "power2.out",
      });
      gsap.to(dot, {
        scale: 1,
        opacity: 1,
        duration: 0.25,
      });

      if (activeMagneticEl) {
        gsap.to(activeMagneticEl, {
          x: 0,
          y: 0,
          duration: 0.65,
          ease: "elastic.out(1, 0.4)",
        });
        activeMagneticEl = null;
      }
    };

    const handleMouseLeave = () => {
      gsap.to([ring, dot], { opacity: 0, duration: 0.25 });
      if (activeMagneticEl) {
        gsap.to(activeMagneticEl, {
          x: 0,
          y: 0,
          duration: 0.65,
          ease: "elastic.out(1, 0.4)",
        });
        activeMagneticEl = null;
      }
    };

    const handleMouseDown = () => {
      gsap.to(ring, { scale: 0.82, duration: 0.15, ease: "power2.out" });
      gsap.to(dot, { scale: 1.3, duration: 0.15, ease: "power2.out" });
    };

    const handleMouseUp = () => {
      const targetScale = cursorState === "portfolio" ? 2.2 : cursorState === "hover" ? 1.65 : 1;
      gsap.to(ring, { scale: targetScale, duration: 0.25, ease: "back.out(2)" });
      gsap.to(dot, { scale: cursorState === "hover" ? 0.6 : 1, duration: 0.25 });
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    document.addEventListener("mouseover", handleMouseOver, { passive: true });
    document.documentElement.addEventListener("mouseleave", handleMouseLeave);
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseover", handleMouseOver);
      document.documentElement.removeEventListener("mouseleave", handleMouseLeave);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
      rotationTween.kill();
      if (activeMagneticEl) {
        gsap.set(activeMagneticEl, { x: 0, y: 0 });
      }
    };
  }, [cursorState]);

  if (!isClient) return null;

  return (
    <div
      ref={cursorRef}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-[9999] overflow-hidden select-none hidden md:block"
    >
      {/* Outer Follower Ring */}
      <div
        ref={ringRef}
        className="pointer-events-none fixed top-0 left-0 -translate-x-1/2 -translate-y-1/2 rounded-full flex items-center justify-center will-change-transform border border-sky-400/60 backdrop-blur-[1px] transition-colors duration-200"
        style={{
          width: 38,
          height: 38,
          boxShadow:
            "0 0 16px rgba(56, 189, 248, 0.35), 0 0 32px rgba(139, 92, 246, 0.18)",
        }}
      >
        {/* Subtle Decorative Rotating SVG Ring */}
        <svg
          ref={rotatingRingRef}
          className="absolute inset-[-4px] w-[calc(100%+8px)] h-[calc(100%+8px)] pointer-events-none will-change-transform"
          viewBox="0 0 100 100"
        >
          <circle
            cx="50"
            cy="50"
            r="47"
            fill="none"
            stroke="url(#bluePurpleGrad)"
            strokeWidth="1.8"
            strokeDasharray="14 10 6 10"
            strokeLinecap="round"
            opacity="0.85"
          />
          <defs>
            <linearGradient id="bluePurpleGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#38bdf8" />
              <stop offset="50%" stopColor="#818cf8" />
              <stop offset="100%" stopColor="#c084fc" />
            </linearGradient>
          </defs>
        </svg>

        {/* Dynamic Context Label (e.g. 'VIEW' on portfolio cards) */}
        {cursorText && (
          <span
            ref={textRef}
            className="text-[9px] font-heading font-extrabold uppercase tracking-widest text-sky-200 pointer-events-none select-none flex items-center gap-0.5"
          >
            {cursorText}
            <span className="text-[10px] text-sky-300">↗</span>
          </span>
        )}
      </div>

      {/* Inner Responsive Core Dot */}
      <div
        ref={dotRef}
        className="pointer-events-none fixed top-0 left-0 -translate-x-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-gradient-to-tr from-sky-400 to-indigo-300 will-change-transform"
        style={{
          boxShadow:
            "0 0 8px rgba(56, 189, 248, 0.9), 0 0 16px rgba(139, 92, 246, 0.6)",
        }}
      />
    </div>
  );
}

