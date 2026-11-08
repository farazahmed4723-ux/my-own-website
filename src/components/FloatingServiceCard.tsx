"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion, MotionValue, useMotionValue, useTransform } from "framer-motion";

interface FloatingServiceCardProps {
  title: string;
  subtitle: string;
  icon: React.ReactNode;
  accentGradient?: string;
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
  accentGradient = "from-[#7C3AED] via-[#8B5CF6] to-[#A855F7]",
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

  const activeMouseX = mouseX || fallbackX;
  const activeMouseY = mouseY || fallbackY;

  const x = useTransform(activeMouseX, (val: number) => val * parallaxDepth);
  const y = useTransform(activeMouseY, (val: number) => val * parallaxDepth);

  const handleClick = () => {
    setIsClicked(true);
    setTimeout(() => setIsClicked(false), 500);
    if (onClick) {
      onClick();
    }
  };

  const cardContent = (
    <motion.div
      animate={{
        y: [-5, 5, -5],
        rotate: [-0.5, 0.5, -0.5],
        scale: isClicked ? [1, 1.06, 0.96, 1.02, 1] : 1,
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
        scale: 1.06,
        y: -3,
      }}
      whileTap={{
        scale: 0.95,
      }}
      onClick={handleClick}
      className="dark-preserve-exempt group cursor-pointer rounded-full sm:rounded-2xl border border-indigo-200/80 dark:border-purple-400/25 bg-white/95 dark:bg-[#0d1330]/90 px-3 py-2 sm:px-3.5 sm:py-2.5 shadow-[0_14px_34px_-6px_rgba(37,99,235,0.16)] dark:shadow-[0_16px_38px_rgba(0,0,0,0.62)] hover:border-purple-400/70 dark:hover:border-purple-400/60 backdrop-blur-xl transition-all duration-300"
    >
      <div className="flex items-center gap-2.5">
        {/* Theme-harmonized Gradient Icon Badge */}
        <motion.div
          animate={isClicked ? { rotate: [0, -12, 12, -4, 0], scale: [1, 1.15, 1] } : {}}
          transition={{ duration: 0.4 }}
          className={`dark-preserve flex h-8 w-8 sm:h-9 sm:w-9 shrink-0 items-center justify-center rounded-full sm:rounded-xl bg-gradient-to-tr ${accentGradient} text-white shadow-md group-hover:scale-110 transition-transform duration-300`}
        >
          {icon}
        </motion.div>

        {/* Card Copy — adapts cleanly between Light Mode & Dark Mode */}
        <div className="flex flex-col pr-1">
          <span className="font-heading text-xs sm:text-[13px] font-bold tracking-tight text-slate-900 dark:text-white leading-tight">
            {title}
          </span>
          <span className="text-[10px] sm:text-[11px] font-medium text-slate-500 dark:text-[#94A3B8] leading-tight mt-0.5">
            {subtitle}
          </span>
        </div>
      </div>
    </motion.div>
  );

  return (
    <motion.div style={{ x, y }} className={`select-none ${className}`}>
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
