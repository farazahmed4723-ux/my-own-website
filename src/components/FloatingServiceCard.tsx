"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion, MotionValue, useMotionValue, useTransform } from "framer-motion";

interface FloatingServiceCardProps {
  title: string;
  subtitle: string;
  icon: React.ReactNode;
  className?: string;
  floatDuration?: number;
  floatDelay?: number;
  mouseX?: MotionValue<number>;
  mouseY?: MotionValue<number>;
  parallaxDepth?: number;
  href?: string;
  onClick?: () => void;
}

export default function FloatingServiceCard({
  title,
  subtitle,
  icon,
  className = "",
  floatDuration = 6,
  floatDelay = 0,
  mouseX,
  mouseY,
  parallaxDepth = 12,
  href,
  onClick,
}: FloatingServiceCardProps) {
  const fallbackX = useMotionValue(0);
  const fallbackY = useMotionValue(0);
  const [isClicked, setIsClicked] = useState(false);

  // 3D Parallax offset based on cursor position
  const activeMouseX = mouseX || fallbackX;
  const activeMouseY = mouseY || fallbackY;

  const x = useTransform(activeMouseX, (val: number) => val * parallaxDepth);
  const y = useTransform(activeMouseY, (val: number) => val * parallaxDepth);

  const handleClick = (e: React.MouseEvent) => {
    setIsClicked(true);
    setTimeout(() => setIsClicked(false), 500);
    if (onClick) {
      onClick();
    }
  };

  const cardContent = (
    <motion.div
      animate={{
        y: [-6, 6, -6],
        rotate: [-0.6, 0.6, -0.6],
        scale: isClicked ? [1, 1.08, 0.95, 1.03, 1] : 1,
      }}
      transition={{
        y: {
          duration: floatDuration,
          repeat: Infinity,
          ease: "easeInOut",
          delay: floatDelay,
        },
        rotate: {
          duration: floatDuration * 1.25,
          repeat: Infinity,
          ease: "easeInOut",
          delay: floatDelay,
        },
        scale: {
          duration: 0.45,
          ease: "easeOut",
        },
      }}
      whileHover={{
        scale: 1.08,
        y: -4,
        boxShadow: "0 20px 45px -8px rgba(139, 92, 246, 0.55)",
        borderColor: "rgba(168, 85, 247, 0.7)",
      }}
      whileTap={{
        scale: 0.92,
        y: 4,
      }}
      onClick={handleClick}
      className="group cursor-pointer rounded-2xl border border-white/15 bg-[#0e122b]/90 p-2.5 sm:p-3 shadow-[0_15px_35px_rgba(0,0,0,0.65)] backdrop-blur-xl transition-all duration-300"
    >
      <div className="flex items-center gap-2.5 sm:gap-3">
        {/* Purple Gradient Icon Container with Interactive Kinetic Reaction */}
        <motion.div
          animate={isClicked ? { rotate: [0, -15, 15, -5, 0], scale: [1, 1.2, 1] } : {}}
          transition={{ duration: 0.4 }}
          className="flex h-9 w-9 sm:h-10 sm:w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-tr from-[#7C3AED] via-[#8B5CF6] to-[#A855F7] text-white shadow-[0_0_15px_rgba(139,92,246,0.45)] group-hover:scale-110 group-hover:shadow-[0_0_25px_rgba(168,85,247,0.7)] transition-all duration-300"
        >
          {icon}
        </motion.div>

        {/* Card Copy */}
        <div className="flex flex-col pr-1 sm:pr-2">
          <span className="font-heading text-xs sm:text-sm font-semibold tracking-tight text-white group-hover:text-purple-200 transition-colors">
            {title}
          </span>
          <span className="text-[10px] sm:text-xs font-medium text-[#94A3B8]">
            {subtitle}
          </span>
        </div>

        {/* Live Active Beacon Indicator */}
        <div className="relative ml-auto flex h-2 w-2 items-center justify-center">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
          <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-400" />
        </div>
      </div>
    </motion.div>
  );

  return (
    <motion.div
      style={{ x, y }}
      className={`select-none ${className}`}
    >
      {href ? (
        <Link href={href} className="block">
          {cardContent}
        </Link>
      ) : (
        cardContent
      )}
    </motion.div>
  );
}
