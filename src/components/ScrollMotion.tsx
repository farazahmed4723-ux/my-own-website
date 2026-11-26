"use client";

import React, { useEffect, useRef, useState } from "react";
import {
  motion,
  useScroll,
  useSpring,
  useReducedMotion,
  Variants,
} from "framer-motion";

export type RevealVariant =
  | "pop-up"
  | "zoom-pop"
  | "card-3d"
  | "blur-zoom"
  | "slide-left"
  | "slide-right";

interface ScrollRevealProps {
  children: React.ReactNode;
  variant?: RevealVariant;
  delay?: number;
  duration?: number;
  className?: string;
  once?: boolean;
  amount?: number;
  hoverLift?: boolean;
}

/**
 * Top Viewport Glowing Scroll Progress Bar
 */
export function ScrollProgressBar() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 180,
    damping: 28,
    restDelta: 0.001,
  });

  return (
    <motion.div
      aria-hidden="true"
      style={{ scaleX }}
      className="fixed top-0 left-0 right-0 h-[3px] origin-left z-[70] bg-gradient-to-r from-[#7C3AED] via-[#C084FC] to-[#F59E0B] shadow-[0_0_14px_rgba(168,85,247,0.85)] pointer-events-none"
    />
  );
}

/**
 * Bidirectional Scroll-Triggered Pop-Up (on scroll down) & Pop-Down (on scroll up) Wrapper
 *
 * Uses a viewport IntersectionObserver to detect whether an element exited
 * above or below the viewport so re-entering from the top smoothly pops DOWN
 * and entering from the bottom smoothly pops UP.
 */
export function ScrollReveal({
  children,
  variant = "pop-up",
  delay = 0,
  className = "",
  once = false,
  amount = 0.06,
  hoverLift = false,
}: ScrollRevealProps) {
  const prefersReducedMotion = useReducedMotion();
  const containerRef = useRef<HTMLDivElement>(null);
  const [isInView, setIsInView] = useState<boolean>(true);
  const [restEdge, setRestEdge] = useState<"bottom" | "top">("bottom");
  const hasHydratedRef = useRef(false);

  useEffect(() => {
    if (prefersReducedMotion || typeof window === "undefined") return;
    const el = containerRef.current;
    if (!el) return;

    // Evaluate initial viewport position without causing initial SSR flicker
    const rect = el.getBoundingClientRect();
    const vh = window.innerHeight || 900;
    if (rect.top > vh * 0.96) {
      setIsInView(false);
      setRestEdge("bottom");
    } else if (rect.bottom < 0) {
      setIsInView(false);
      setRestEdge("top");
    } else {
      setIsInView(true);
    }
    hasHydratedRef.current = true;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setIsInView(true);
            if (once) observer.unobserve(el);
          } else if (!once) {
            const top = entry.boundingClientRect.top;
            const winH = window.innerHeight || 900;
            // If element went off the top edge, rest it slightly above so scrolling UP pops it DOWN
            setRestEdge(top < winH * 0.4 ? "top" : "bottom");
            setIsInView(false);
          }
        }
      },
      {
        threshold: Math.min(0.25, Math.max(0.02, amount)),
        rootMargin: "-12px 0px -12px 0px",
      }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [once, amount, prefersReducedMotion]);

  if (prefersReducedMotion) {
    return <div className={className}>{children}</div>;
  }

  const hiddenY = restEdge === "top" ? -38 : 42;

  const getHiddenTransform = () => {
    switch (variant) {
      case "zoom-pop":
        return { opacity: 0, y: hiddenY * 0.8, scale: 0.87 };
      case "card-3d":
        return {
          opacity: 0,
          y: hiddenY,
          scale: 0.89,
          rotateX: restEdge === "top" ? -8 : 8,
          transformPerspective: 1100,
        };
      case "blur-zoom":
        return { opacity: 0, y: hiddenY * 0.7, scale: 0.92, filter: "blur(5px)" };
      case "slide-left":
        return { opacity: 0, x: -42, y: 0, scale: 0.94 };
      case "slide-right":
        return { opacity: 0, x: 42, y: 0, scale: 0.94 };
      case "pop-up":
      default:
        return { opacity: 0, y: hiddenY, scale: 0.92 };
    }
  };

  const visibleTransform =
    variant === "card-3d"
      ? { opacity: 1, y: 0, scale: 1, rotateX: 0, transformPerspective: 1100 }
      : variant === "blur-zoom"
      ? { opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }
      : { opacity: 1, x: 0, y: 0, scale: 1 };

  return (
    <motion.div
      ref={containerRef}
      initial={false}
      animate={(isInView ? visibleTransform : getHiddenTransform()) as never}
      transition={{
        type: "spring",
        stiffness: 250,
        damping: 22,
        mass: 0.82,
        delay: isInView ? delay : 0,
      }}
      whileHover={
        hoverLift
          ? {
              y: -7,
              scale: 1.02,
              transition: { type: "spring", stiffness: 340, damping: 20 },
            }
          : undefined
      }
      className={`will-change-transform ${className}`}
    >
      {children}
    </motion.div>
  );
}

/**
 * Staggered Grid Container + Child Item for Cascading Card Pop-Up & Pop-Down Waves
 */
export function StaggerGrid({
  children,
  className = "",
  stagger = 0.075,
  staggerDelay,
  once = false,
  amount = 0.05,
}: {
  children: React.ReactNode;
  className?: string;
  stagger?: number;
  staggerDelay?: number;
  once?: boolean;
  amount?: number;
}) {
  const prefersReducedMotion = useReducedMotion();

  if (prefersReducedMotion) {
    return <div className={className}>{children}</div>;
  }

  const effectiveStagger = staggerDelay ?? stagger;

  const containerVariants: Variants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: effectiveStagger,
        delayChildren: 0.03,
      },
    },
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, amount, margin: "-12px 0px -12px 0px" }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({
  children,
  className = "",
  hoverLift = true,
}: {
  children: React.ReactNode;
  className?: string;
  hoverLift?: boolean;
}) {
  const itemVariants: Variants = {
    hidden: {
      opacity: 0,
      y: 36,
      scale: 0.89,
      rotateX: 7,
      transformPerspective: 1100,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      rotateX: 0,
      transformPerspective: 1100,
      transition: {
        type: "spring",
        stiffness: 255,
        damping: 20,
        mass: 0.82,
      },
    },
  };

  return (
    <motion.div
      variants={itemVariants}
      whileHover={
        hoverLift
          ? {
              y: -7,
              scale: 1.022,
              transition: { type: "spring", stiffness: 340, damping: 20 },
            }
          : undefined
      }
      whileTap={hoverLift ? { scale: 0.985 } : undefined}
      className={`will-change-transform ${className}`}
    >
      {children}
    </motion.div>
  );
}
