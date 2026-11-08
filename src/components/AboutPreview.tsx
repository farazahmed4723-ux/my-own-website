"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight, Check, Users, Globe, Briefcase, Sparkles } from "lucide-react";
import { ScrollReveal, StaggerGrid, StaggerItem } from "@/components/ScrollMotion";

const stats = [
  {
    icon: Users,
    target: 100,
    suffix: "+",
    label: "Satisfied Clients",
    color: "text-sky-400",
    duration: 2400,
    delayMs: 140,
    floatDelay: 0,
  },
  {
    icon: Globe,
    target: 50,
    suffix: "+",
    label: "Web Apps & WordPress",
    color: "text-amber-400",
    duration: 2200,
    delayMs: 260,
    floatDelay: 0.4,
  },
  {
    icon: Briefcase,
    target: 20,
    suffix: "+",
    label: "Projects Completed",
    color: "text-purple-400",
    duration: 2000,
    delayMs: 380,
    floatDelay: 0.8,
  },
];

function AnimatedStatValue({
  target,
  suffix,
  duration,
  delayMs = 150,
  active,
}: {
  target: number;
  suffix: string;
  duration: number;
  delayMs?: number;
  active: boolean;
}) {
  const [count, setCount] = useState(0);
  const [finished, setFinished] = useState(false);

  useEffect(() => {
    if (!active) {
      setCount(0);
      setFinished(false);
      return;
    }

    let rafId = 0;
    let timerId: ReturnType<typeof setTimeout> | null = null;

    timerId = setTimeout(() => {
      const startTime = performance.now();

      const tick = (now: number) => {
        const elapsed = now - startTime;
        const progress = Math.min(elapsed / duration, 1);
        // Smooth cubic ease-out: lively visible count-up that eases gently to a stop
        const easeOut = 1 - Math.pow(1 - progress, 3);
        setCount(Math.round(easeOut * target));

        if (progress < 1) {
          rafId = requestAnimationFrame(tick);
        } else {
          setCount(target);
          setFinished(true);
        }
      };

      rafId = requestAnimationFrame(tick);
    }, delayMs);

    return () => {
      if (timerId) clearTimeout(timerId);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, [active, target, duration, delayMs]);

  return (
    <motion.span
      animate={
        finished
          ? { scale: [1.12, 1], y: [0, -2, 0] }
          : { scale: 1, y: 0 }
      }
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="font-heading font-extrabold text-base sm:text-2xl lg:text-3xl text-white tracking-tight tabular-nums inline-flex items-baseline"
    >
      <span>{count}</span>
      <span className="text-[#A855F7] ml-0.5">{suffix}</span>
    </motion.span>
  );
}

const desktopHighlights = [
  "7+ Years Full Stack & AI Experience",
  "50+ Successfully Delivered Projects",
  "React, TypeScript & Custom WordPress",
  "Context-Aware RAG AI Chatbots",
];

export default function AboutPreview() {
  const statsRef = useRef<HTMLDivElement>(null);
  const [statsVisible, setStatsVisible] = useState(false);

  useEffect(() => {
    const el = statsRef.current;
    if (!el) return;

    // Trigger ONLY when the card is clearly inside the visible screen (not barely peeking behind the bottom browser bar)
    const enterObserver = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setStatsVisible(true);
        }
      },
      { threshold: 0.45, rootMargin: "0px 0px -55px 0px" }
    );

    // Reset ONLY when the card has scrolled completely off-screen so re-scrolling replays the count-up smoothly
    const exitObserver = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => !entry.isIntersecting)) {
          setStatsVisible(false);
        }
      },
      { threshold: 0, rootMargin: "40px 0px 40px 0px" }
    );

    enterObserver.observe(el);
    exitObserver.observe(el);
    return () => {
      enterObserver.disconnect();
      exitObserver.disconnect();
    };
  }, []);

  return (
    <section className="relative py-16 sm:py-24 px-4 sm:px-6 lg:px-8 bg-transparent overflow-hidden" id="about">
      {/* Ambient background lighting */}
      <div className="absolute top-1/3 left-10 w-[600px] h-[600px] bg-gradient-to-r from-purple-600/25 via-indigo-500/20 to-transparent rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-[500px] h-[500px] bg-sky-500/18 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Top 3-Stat Horizontal Card (Mobile & Tablet < lg; Desktop Hero already displays key stats) */}
        <ScrollReveal variant="pop-up" className="lg:hidden mb-10 sm:mb-14">
          <div
            ref={statsRef}
            className="rounded-2xl sm:rounded-3xl glass-card border border-white/10 bg-[#0e122b]/80 p-4 sm:p-6 shadow-xl max-w-4xl mx-auto"
          >
            <div className="grid grid-cols-3 divide-x divide-white/10 text-center items-center">
              {stats.map((st) => {
                const Icon = st.icon;
                return (
                  <motion.div
                    key={st.label}
                    animate={{ y: [-2.5, 2.5, -2.5] }}
                    transition={{
                      duration: 4.6,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: st.floatDelay,
                    }}
                    whileHover={{ scale: 1.05, y: -3 }}
                    className="px-2 sm:px-4 flex flex-col items-center cursor-default"
                  >
                    <div className="flex items-center justify-center gap-1.5 mb-1">
                      <Icon className={`w-3.5 h-3.5 sm:w-4 sm:h-4 ${st.color} shrink-0`} />
                      <AnimatedStatValue
                        target={st.target}
                        suffix={st.suffix}
                        duration={st.duration}
                        delayMs={st.delayMs}
                        active={statsVisible}
                      />
                    </div>
                    <span className="text-[9.5px] sm:text-xs font-semibold text-gray-400 uppercase tracking-wider leading-tight">
                      {st.label}
                    </span>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </ScrollReveal>

        {/* Mobile-Only Dedicated About Card (Matches Pic 2 Exactly 1:1) */}
        <div className="lg:hidden">
          <ScrollReveal variant="zoom-pop">
            <div className="rounded-3xl glass-card border border-purple-500/30 bg-[#0e122b]/90 p-6 sm:p-8 text-center shadow-2xl relative overflow-hidden">
              {/* Circular Framed Avatar with Glowing Ring */}
              <div className="relative mx-auto mb-4 w-28 h-28 rounded-full p-[3px] bg-gradient-to-tr from-[#38bdf8] via-[#8B5CF6] to-[#A855F7] shadow-[0_0_25px_rgba(56,189,248,0.35)]">
                <div className="relative w-full h-full rounded-full overflow-hidden bg-[#070918]">
                  <Image
                    src="/images/faraz-profile.webp"
                    alt="Faraz Ahmed"
                    fill
                    className="object-cover"
                    sizes="112px"
                    priority
                  />
                </div>
              </div>

              <div className="text-[11px] font-bold uppercase tracking-widest text-gray-400 mb-2">
                ABOUT ME
              </div>

              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-900/30 border border-purple-500/30 text-purple-300 text-xs font-semibold uppercase tracking-wider mb-4">
                <Sparkles className="w-3.5 h-3.5 text-purple-300" />
                <span>About Me</span>
              </div>

              <h2 className="font-heading text-xl sm:text-2xl font-extrabold text-white tracking-tight mb-4 leading-snug">
                Code & AI solutions that build{" "}
                <span className="gradient-text-purple">trust, clarity, and rapid scale</span>
              </h2>

              <p className="text-xs sm:text-sm text-gray-300 leading-relaxed mb-4">
                I am a passionate Freelance Full Stack Developer, WordPress Specialist, AI Chatbot Engineer, and Automation Expert. Over the past 7+ years, I have helped founders, startups, and decision-makers translate ambitious ideas into high-speed, secure, and user-centric web applications.
              </p>

              <p className="text-xs sm:text-sm text-gray-400 leading-relaxed mb-6">
                Whether you need a custom React web application, a pixel-perfect WordPress portal, an intelligent RAG chatbot, or automated n8n workflows—I deliver agency-level quality with individual dedication.
              </p>

              <Link
                href="/contact"
                id="about-mobile-lets-work-btn"
                className="w-full py-3.5 rounded-xl bg-gradient-to-r from-[#ea580c] via-[#f97316] to-[#fb923c] hover:from-[#c2410c] hover:to-[#ea580c] text-white font-extrabold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg shadow-orange-600/30 transition-all active:scale-95"
              >
                <span>LET&apos;S WORK TOGETHER</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </ScrollReveal>
        </div>

        {/* Laptop & Desktop Layout (>= lg): Executive Portrait Frame + Bio & 2x2 Highlights */}
        <div className="hidden lg:grid grid-cols-12 gap-12 xl:gap-16 items-center">
          {/* Left Column: Tall Blue-Bordered Executive Portrait Frame + Overlapping Nameplate */}
          <ScrollReveal
            variant="slide-left"
            className="lg:col-span-5 relative flex justify-center items-center"
          >
            <div className="relative w-full max-w-[395px] xl:max-w-[425px] mx-auto pb-7 select-none group">
              {/* Vertical Studio Portrait Card */}
              <div className="dark-preserve relative w-full aspect-[896/1090] rounded-[2.6rem] overflow-hidden border border-[#2563EB]/65 bg-[#152338] shadow-[0_24px_60px_rgba(2,6,23,0.62)] transition-colors duration-300 group-hover:border-[#38BDF8]/80">
                <Image
                  src="/images/faraz-about-standing.webp"
                  alt="Faraz Ahmed - Freelance Full Stack Developer & AI Engineer"
                  fill
                  sizes="(max-width: 1280px) 395px, 425px"
                  className="object-cover object-top transition-transform duration-700 ease-out group-hover:scale-[1.02]"
                />
                {/* Subtle bottom vignette into nameplate */}
                <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[#090f1d]/85 via-[#090f1d]/30 to-transparent" />
              </div>

              {/* Overlapping Wide Bottom Nameplate Dock */}
              <div className="dark-preserve absolute -inset-x-3 xl:-inset-x-5 bottom-0 z-20 rounded-2xl bg-[#0B1120]/95 border border-white/10 backdrop-blur-md py-4 px-6 text-center shadow-[0_18px_42px_rgba(0,0,0,0.65)]">
                <h3 className="font-heading text-xl xl:text-[22px] font-extrabold text-white tracking-tight">
                  Faraz Ahmed
                </h3>
                <p className="text-xs xl:text-[13px] font-medium text-[#60A5FA] mt-0.5">
                  Full Stack Developer &amp; AI Solutions Specialist
                </p>
              </div>
            </div>
          </ScrollReveal>

          {/* Right Column: Bold Headline, Bio Paragraphs & 2x2 Feature Pill Grid */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            <ScrollReveal variant="slide-right">
              <h2 className="font-heading text-4xl lg:text-[44px] xl:text-[52px] font-extrabold text-white leading-[1.13] tracking-tight mb-7">
                <span className="block">Crafting High-Performance</span>
                <span className="block">
                  Web Apps &amp;{" "}
                  <span className="bg-gradient-to-r from-[#3B82F6] via-[#7B979C] to-[#BA9B6B] bg-clip-text text-transparent">
                    Intelligent AI
                  </span>
                </span>
                <span className="block bg-gradient-to-r from-[#9E8F68] via-[#DF921A] to-[#F59E0B] bg-clip-text text-transparent">
                  Workflows
                </span>
              </h2>

              <div className="space-y-5 text-[15px] xl:text-[16.5px] text-gray-300 leading-[1.78] mb-9 max-w-2xl">
                <p>
                  I am <strong className="font-bold text-white">Faraz Ahmed</strong>, a passionate Freelance Full Stack Developer, Custom WordPress Specialist, and AI Engineer. Over the past 7+ years, I have engineered modern web systems, custom themes, RAG AI chatbots, and automated workflows that transform business operations.
                </p>
                <p>
                  My goal is simple: deliver agency-level visual elegance and clean code architecture with rapid execution, helping founders and teams scale with confidence.
                </p>
              </div>
            </ScrollReveal>

            {/* 2x2 Highlight Cards with Circular Blue Checkmark Badges */}
            <StaggerGrid className="grid grid-cols-2 gap-4 max-w-2xl">
              {desktopHighlights.map((label) => (
                <StaggerItem key={label}>
                  <div className="flex items-center gap-3.5 px-5 py-4 rounded-2xl bg-[#0e142e]/90 border border-[#1e293b] hover:border-[#38bdf8]/45 transition-all duration-300 shadow-[0_8px_24px_rgba(2,6,23,0.32)] h-full">
                    <span className="w-7 h-7 rounded-full bg-[#102444] border border-[#1d4ed8]/35 flex items-center justify-center text-[#38bdf8] shrink-0">
                      <Check className="w-3.5 h-3.5 stroke-[2.5]" />
                    </span>
                    <span className="font-heading text-[14px] xl:text-[15px] font-bold text-white leading-snug">
                      {label}
                    </span>
                  </div>
                </StaggerItem>
              ))}
            </StaggerGrid>
          </div>
        </div>
      </div>
    </section>
  );
}
