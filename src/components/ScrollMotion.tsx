"use client";

import React from "react";
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

const variantPresets: Record<
  RevealVariant,
  { hidden: Record<string, unknown>; visible: Record<string, unknown> }
> = {
  "pop-up": {
    hidden: { opacity: 0, y: 38, scale: 0.93 },
    visible: { opacity: 1, y: 0, scale: 1 },
  },
  "zoom-pop": {
    hidden: { opacity: 0, y: 34, scale: 0.85 },
    visible: { opacity: 1, y: 0, scale: 1 },
  },
  "card-3d": {
    hidden: {
      opacity: 0,
      y: 42,
      scale: 0.88,
      rotateX: 10,
      transformPerspective: 1100,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      rotateX: 0,
      transformPerspective: 1100,
    },
  },
  "blur-zoom": {
    hidden: { opacity: 0, y: 26, scale: 0.91, filter: "blur(7px)" },
    visible: { opacity: 1, y: 0, scale: 1, filter: "blur(0px)" },
  },
  "slide-left": {
    hidden: { opacity: 0, x: -46, scale: 0.93 },
    visible: { opacity: 1, x: 0, scale: 1 },
  },
  "slide-right": {
    hidden: { opacity: 0, x: 46, scale: 0.93 },
    visible: { opacity: 1, x: 0, scale: 1 },
  },
};

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
 * Reusable Scroll-Triggered Pop-Up / Zoom-In / 3D Reveal Wrapper
 */
export function ScrollReveal({
  children,
  variant = "pop-up",
  delay = 0,
  className = "",
  once = false,
  amount = 0.15,
  hoverLift = false,
}: ScrollRevealProps) {
  const prefersReducedMotion = useReducedMotion();

  if (prefersReducedMotion) {
    return <div className={className}>{children}</div>;
  }

  const preset = variantPresets[variant];

  return (
    <motion.div
      initial={preset.hidden as never}
      whileInView={preset.visible as never}
      viewport={{ once, amount, margin: "0px 0px -45px 0px" }}
      transition={{
        type: "spring",
        stiffness: 230,
        damping: 21,
        mass: 0.85,
        delay,
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
 * Staggered Grid Container + Child Item for Cascading Card Pop-Up & Zoom-In Waves
 */
export function StaggerGrid({
  children,
  className = "",
  stagger = 0.085,
  staggerDelay,
  once = false,
  amount = 0.1,
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
        delayChildren: 0.04,
      },
    },
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, amount, margin: "0px 0px -40px 0px" }}
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
      y: 40,
      scale: 0.87,
      rotateX: 8,
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
        stiffness: 235,
        damping: 20,
        mass: 0.85,
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

