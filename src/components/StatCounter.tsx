"use client";

import React, { useEffect, useState, useRef } from "react";

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
  duration = 2000,
}: StatCounterProps) {
  const [count, setCount] = useState(0);
  const [done, setDone] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    let rafId = 0;

    const startAnimation = () => {
      if (hasAnimated.current) return;
      hasAnimated.current = true;
      const startTime = performance.now();

      const tick = (now: number) => {
        const elapsed = now - startTime;
        const progress = Math.min(elapsed / duration, 1);
        // Smooth cubic ease-out: fast start, gentle deceleration to final number
        const easeOut = 1 - Math.pow(1 - progress, 3);
        setCount(Math.round(easeOut * target));

        if (progress < 1) {
          rafId = requestAnimationFrame(tick);
        } else {
          setCount(target);
          setDone(true);
        }
      };

      rafId = requestAnimationFrame(tick);
    };

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          startAnimation();
          observer.disconnect();
        }
      },
      { threshold: 0.25 }
    );

    observer.observe(el);

    return () => {
      observer.disconnect();
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, [target, duration]);

  return (
    <div ref={ref} className="flex flex-col">
      <div
        className={`font-heading font-bold text-2xl sm:text-3xl lg:text-4xl text-white tracking-tight flex items-baseline transition-transform duration-300 ${
          done ? "scale-100" : "scale-[0.98]"
        }`}
      >
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
