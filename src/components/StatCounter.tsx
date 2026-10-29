"use client";

import React, { useEffect, useState, useRef } from "react";
import { useInView } from "framer-motion";

interface StatCounterProps {
  target: number;
  suffix?: string;
  prefix?: string;
  label: string;
  duration?: number;
}

export default function StatCounter({
  target,
  suffix = "",
  prefix = "",
  label,
  duration = 1800,
}: StatCounterProps) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });
  const hasAnimated = useRef(false);

  useEffect(() => {
    // Check for prefers-reduced-motion
    if (
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      setCount(target);
      return;
    }

    const startAnimation = () => {
      if (hasAnimated.current) return;
      hasAnimated.current = true;
      const startTime = typeof performance !== "undefined" ? performance.now() : Date.now();

      const intervalId = setInterval(() => {
        const now = typeof performance !== "undefined" ? performance.now() : Date.now();
        const elapsed = now - startTime;
        const progress = Math.min(elapsed / duration, 1);

        // Cubic ease-out: 1 - Math.pow(1 - progress, 3)
        const easeOut = 1 - Math.pow(1 - progress, 3);
        const currentCount = Math.floor(easeOut * target);

        setCount(currentCount);

        if (progress >= 1) {
          clearInterval(intervalId);
          setCount(target);
        }
      }, 30);
    };


    if (isInView) {
      startAnimation();
    } else {
      // In case observer is delayed or already in upper fold
      const timer = setTimeout(() => {
        if (ref.current) {
          const rect = ref.current.getBoundingClientRect();
          if (rect.top < window.innerHeight && rect.bottom >= 0) {
            startAnimation();
          }
        }
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [isInView, target, duration]);


  return (
    <div ref={ref} className="flex flex-col">
      <div className="font-heading font-bold text-2xl sm:text-3xl lg:text-4xl text-white tracking-tight flex items-baseline">
        <span>{prefix}</span>
        <span className="tabular-nums">{count}</span>
        <span className="text-[#A855F7] font-semibold ml-0.5">{suffix}</span>
      </div>
      <p className="text-xs sm:text-sm text-[#94A3B8] font-normal mt-1 leading-snug">
        {label}
      </p>
    </div>
  );
}
