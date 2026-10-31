"use client";

import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";

/**
 * Premium Animated Custom Cursor Follower
 * Inspired by aliaideveloper.site
 *
 * Requirements Met:
 * - Fluid dual-layer follower (responsive core dot + inertia outer ring)
 * - Subtle rotating dashed orbital ring (GSAP infinite rotation)
 * - Soft brand blue glow (#38bdf8 / #818cf8 / #8B5CF6)
 * - Smooth enlargement on button and link hover
 * - Subtle magnetic attraction on CTA buttons
 * - Interactive "VIEW ↗" badge over portfolio cards
 * - Zero interference (pointer-events: none on all elements)
 * - Auto-disabled on touch taps and respects reduced-motion
 * - Visible on all screen sizes when using mouse / trackpad
 */
export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const rotatingRingRef = useRef<SVGSVGElement>(null);
  const trail1Ref = useRef<HTMLDivElement>(null);
  const trail2Ref = useRef<HTMLDivElement>(null);
  const clickWaveRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLSpanElement>(null);

  const [cursorText, setCursorText] = useState<string>("");
  const [mounted, setMounted] = useState<boolean>(false);

  useEffect(() => {
    setMounted(true);

    // Respect reduced-motion accessibility settings
    const prefersReducedMotion =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (prefersReducedMotion) return;

    const dot = dotRef.current;
    const ring = ringRef.current;
    const rotatingRing = rotatingRingRef.current;
    const trail1 = trail1Ref.current;
    const trail2 = trail2Ref.current;
    const clickWave = clickWaveRef.current;

    if (!dot || !ring || !rotatingRing) return;

    // Set initial centering offsets in GSAP (prevents Tailwind translate clashes)
    gsap.set([dot, ring, trail1, trail2, clickWave].filter(Boolean), {
      xPercent: -50,
      yPercent: -50,
      opacity: 0,
    });

    // High performance GSAP quickTo setters for 60/120fps fluid tracking
    const setDotX = gsap.quickTo(dot, "x", { duration: 0.08, ease: "none" });
    const setDotY = gsap.quickTo(dot, "y", { duration: 0.08, ease: "none" });

    const setRingX = gsap.quickTo(ring, "x", { duration: 0.32, ease: "power2.out" });
    const setRingY = gsap.quickTo(ring, "y", { duration: 0.32, ease: "power2.out" });

    const setTrail1X = trail1 ? gsap.quickTo(trail1, "x", { duration: 0.44, ease: "power3.out" }) : null;
    const setTrail1Y = trail1 ? gsap.quickTo(trail1, "y", { duration: 0.44, ease: "power3.out" }) : null;

    const setTrail2X = trail2 ? gsap.quickTo(trail2, "x", { duration: 0.6, ease: "power3.out" }) : null;
    const setTrail2Y = trail2 ? gsap.quickTo(trail2, "y", { duration: 0.6, ease: "power3.out" }) : null;

    // Continuous subtle rotating ring animation (12s smooth rotation)
    const rotationTween = gsap.to(rotatingRing, {
      rotation: 360,
      repeat: -1,
      duration: 12,
      ease: "none",
      transformOrigin: "center center",
    });

    let isVisible = false;
    let activeMagnetic: HTMLElement | null = null;
    let currentState: "default" | "hover" | "portfolio" = "default";

    const handlePointerMove = (e: PointerEvent) => {
      // If it is a touch tap, hide cursor and return
      if (e.pointerType === "touch") {
        if (isVisible) {
          gsap.to([dot, ring, trail1, trail2].filter(Boolean), { opacity: 0, duration: 0.2 });
          isVisible = false;
        }
        return;
      }

      const { clientX: x, clientY: y } = e;

      // Make cursor visible on first move
      if (!isVisible) {
        gsap.to([dot, ring], { opacity: 1, duration: 0.25 });
        if (trail1) gsap.to(trail1, { opacity: 0.6, duration: 0.25 });
        if (trail2) gsap.to(trail2, { opacity: 0.35, duration: 0.25 });
        isVisible = true;
      }

      setDotX(x);
      setDotY(y);
      setRingX(x);
      setRingY(y);
      if (setTrail1X && setTrail1Y) {
        setTrail1X(x);
        setTrail1Y(y);
      }
      if (setTrail2X && setTrail2Y) {
        setTrail2X(x);
        setTrail2Y(y);
      }

      // Magnetic hover pull on CTA buttons
      if (activeMagnetic) {
        const rect = activeMagnetic.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        const maxPull = 12;
        const deltaX = Math.max(-maxPull, Math.min(maxPull, (x - centerX) * 0.24));
        const deltaY = Math.max(-maxPull, Math.min(maxPull, (y - centerY) * 0.24));

        gsap.to(activeMagnetic, {
          x: deltaX,
          y: deltaY,
          duration: 0.2,
          ease: "power2.out",
          overwrite: "auto",
        });
      }
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;

      // 1. Check if hovering over a portfolio showcase card
      const portfolioCard = target.closest<HTMLElement>(
        "#portfolio .glass-card, [data-cursor='portfolio'], [id^='portfolio-'], a[href*='infostntrucking.ca'], a[href*='eliteclasslimo.ca']"
      );

      if (portfolioCard) {
        currentState = "portfolio";
        setCursorText("VIEW");
        gsap.to(ring, {
          scale: 2.25,
          backgroundColor: "rgba(10, 16, 38, 0.85)",
          borderColor: "rgba(56, 189, 248, 0.95)",
          boxShadow: "0 0 25px rgba(56, 189, 248, 0.65), 0 0 45px rgba(139, 92, 246, 0.35)",
          duration: 0.3,
          ease: "power2.out",
        });
        gsap.to(dot, { opacity: 0, scale: 0.3, duration: 0.2 });
        return;
      }

      // 2. Check if hovering over buttons, links, or interactive elements
      const interactiveEl = target.closest<HTMLElement>(
        "button, a, input, select, textarea, [role='button'], label, [data-magnetic], .cursor-pointer"
      );

      if (interactiveEl) {
        currentState = "hover";
        setCursorText("");
        gsap.to(ring, {
          scale: 1.7,
          backgroundColor: "rgba(56, 189, 248, 0.15)",
          borderColor: "rgba(56, 189, 248, 0.9)",
          boxShadow: "0 0 22px rgba(56, 189, 248, 0.55), 0 0 35px rgba(99, 102, 241, 0.3)",
          duration: 0.3,
          ease: "power2.out",
        });
        gsap.to(dot, {
          scale: 0.5,
          opacity: 0.5,
          duration: 0.2,
        });

        // Detect CTA buttons for magnetic pull
        const isCta =
          interactiveEl.matches("button") ||
          interactiveEl.matches("a[href*='contact']") ||
          interactiveEl.matches("a[href*='wa.me']") ||
          interactiveEl.matches("a[href*='#write-review']") ||
          interactiveEl.matches("[id*='btn']") ||
          interactiveEl.matches("[class*='cta']") ||
          interactiveEl.hasAttribute("data-magnetic");

        if (isCta) {
          activeMagnetic = interactiveEl;
        }
        return;
      }

      // 3. Reset to default state
      currentState = "default";
      setCursorText("");
      gsap.to(ring, {
        scale: 1,
        backgroundColor: "transparent",
        borderColor: "rgba(56, 189, 248, 0.7)",
        boxShadow: "0 0 14px rgba(56, 189, 248, 0.4), 0 0 28px rgba(139, 92, 246, 0.2)",
        duration: 0.35,
        ease: "power2.out",
      });
      gsap.to(dot, {
        scale: 1,
        opacity: 1,
        duration: 0.25,
      });

      if (activeMagnetic) {
        gsap.to(activeMagnetic, {
          x: 0,
          y: 0,
          duration: 0.6,
          ease: "elastic.out(1, 0.4)",
        });
        activeMagnetic = null;
      }
    };

    const handlePointerDown = (e: PointerEvent) => {
      if (e.pointerType === "touch") return;

      gsap.to(ring, { scale: 0.85, duration: 0.15, ease: "power2.out" });
      gsap.to(dot, { scale: 1.4, duration: 0.15, ease: "power2.out" });

      // Click ripple wave effect
      if (clickWave) {
        gsap.set(clickWave, {
          x: e.clientX,
          y: e.clientY,
          scale: 0.4,
          opacity: 0.9,
        });
        gsap.to(clickWave, {
          scale: 2.2,
          opacity: 0,
          duration: 0.45,
          ease: "power2.out",
        });
      }
    };

    const handlePointerUp = (e: PointerEvent) => {
      if (e.pointerType === "touch") return;

      const targetScale = currentState === "portfolio" ? 2.25 : currentState === "hover" ? 1.7 : 1;
      gsap.to(ring, { scale: targetScale, duration: 0.25, ease: "back.out(2)" });
      gsap.to(dot, { scale: currentState === "hover" ? 0.5 : 1, duration: 0.25 });
    };

    const handleMouseLeave = () => {
      gsap.to([dot, ring, trail1, trail2].filter(Boolean), { opacity: 0, duration: 0.25 });
      isVisible = false;
      if (activeMagnetic) {
        gsap.to(activeMagnetic, {
          x: 0,
          y: 0,
          duration: 0.6,
          ease: "elastic.out(1, 0.4)",
        });
        activeMagnetic = null;
      }
    };

    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    document.addEventListener("mouseover", handleMouseOver, { passive: true });
    window.addEventListener("pointerdown", handlePointerDown, { passive: true });
    window.addEventListener("pointerup", handlePointerUp, { passive: true });
    document.documentElement.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
      document.removeEventListener("mouseover", handleMouseOver);
      window.removeEventListener("pointerdown", handlePointerDown);
      window.removeEventListener("pointerup", handlePointerUp);
      document.documentElement.removeEventListener("mouseleave", handleMouseLeave);
      rotationTween.kill();
      if (activeMagnetic) {
        gsap.set(activeMagnetic, { x: 0, y: 0 });
      }
    };
  }, []);

  if (!mounted) return null;

  return (
    <>
      {/* 1. Click Ripple Expansion Wave */}
      <div
        ref={clickWaveRef}
        aria-hidden="true"
        className="fixed top-0 left-0 pointer-events-none z-[999996] w-10 h-10 rounded-full border border-sky-400 opacity-0 will-change-transform"
      />

      {/* 2. Trailing Inertia Micro Particles (from aliaideveloper.site) */}
      <div
        ref={trail2Ref}
        aria-hidden="true"
        className="fixed top-0 left-0 pointer-events-none z-[999997] w-1.5 h-1.5 rounded-full bg-[#818cf8]/50 opacity-0 will-change-transform shadow-[0_0_6px_#818cf8]"
      />
      <div
        ref={trail1Ref}
        aria-hidden="true"
        className="fixed top-0 left-0 pointer-events-none z-[999997] w-2 h-2 rounded-full bg-[#38bdf8]/60 opacity-0 will-change-transform shadow-[0_0_8px_#38bdf8]"
      />

      {/* 3. Outer Rotating Follower Ring */}
      <div
        ref={ringRef}
        aria-hidden="true"
        className="fixed top-0 left-0 pointer-events-none z-[999998] w-[38px] h-[38px] rounded-full flex items-center justify-center will-change-transform border-[1.5px] border-sky-400/75 backdrop-blur-[1px] transition-colors duration-200 opacity-0"
        style={{
          boxShadow:
            "0 0 16px rgba(56, 189, 248, 0.45), 0 0 32px rgba(139, 92, 246, 0.22)",
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
            strokeWidth="2"
            strokeDasharray="14 10 6 10"
            strokeLinecap="round"
            opacity="0.9"
          />
          <defs>
            <linearGradient id="bluePurpleGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#38bdf8" />
              <stop offset="50%" stopColor="#818cf8" />
              <stop offset="100%" stopColor="#c084fc" />
            </linearGradient>
          </defs>
        </svg>

        {/* Dynamic Context Label ('VIEW ↗' on portfolio cards) */}
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

      {/* 4. Inner Responsive Core Dot */}
      <div
        ref={dotRef}
        aria-hidden="true"
        className="fixed top-0 left-0 pointer-events-none z-[999999] w-2 h-2 rounded-full bg-gradient-to-tr from-sky-400 to-indigo-300 will-change-transform opacity-0"
        style={{
          boxShadow:
            "0 0 10px rgba(56, 189, 248, 0.95), 0 0 20px rgba(139, 92, 246, 0.7)",
        }}
      />
    </>
  );
}
