"use client";

import React, { useRef, useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, useMotionValue, useSpring } from "framer-motion";
import {
  ArrowRight,
  MessageCircle,
  Code2,
  Bot,
  Zap,
  ShoppingBag,
  Sparkles,
} from "lucide-react";
import OrbitalSystem from "@/components/OrbitalSystem";
import FloatingServiceCard from "@/components/FloatingServiceCard";
import StatCounter from "@/components/StatCounter";
import { ScrollReveal } from "@/components/ScrollMotion";
import HireMeModal from "@/components/HireMeModal";

export default function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  const [isDmModalOpen, setIsDmModalOpen] = useState(false);

  // Smooth Spring-based cursor parallax motion values
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 25, stiffness: 120 };
  const smoothMouseX = useSpring(mouseX, springConfig);
  const smoothMouseY = useSpring(mouseY, springConfig);

  useEffect(() => {
    // Detect touch device or reduced motion
    const isTouch =
      typeof window !== "undefined" &&
      ("ontouchstart" in window || navigator.maxTouchPoints > 0);
    setIsTouchDevice(isTouch);

    const handleOpenDm = () => setIsDmModalOpen(true);
    window.addEventListener("open-faraz-dm-modal", handleOpenDm);
    return () => window.removeEventListener("open-faraz-dm-modal", handleOpenDm);
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isTouchDevice || !containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5; // -0.5 to 0.5
    const y = (e.clientY - rect.top) / rect.height - 0.5; // -0.5 to 0.5
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <section
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative min-h-[94vh] pt-24 sm:pt-28 pb-8 sm:pb-12 px-4 sm:px-6 lg:px-8 overflow-hidden flex flex-col justify-between bg-[#070711]"
    >
      {/* Controlled Radial Tech Glow (Localized behind right side, not flooding whole screen) */}
      <div className="absolute top-1/4 right-[8%] w-[550px] h-[550px] rounded-full bg-gradient-to-tr from-[#7C3AED]/22 via-[#8B5CF6]/15 to-transparent blur-[120px] pointer-events-none" />
      <div className="absolute -top-20 left-10 w-[380px] h-[380px] rounded-full bg-indigo-950/20 blur-[130px] pointer-events-none" />

      {/* Subtle Ambient Grid Layer */}
      <div
        className="absolute inset-0 opacity-[0.025] pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(#8B5CF6 1px, transparent 1px), linear-gradient(90deg, #8B5CF6 1px, transparent 1px)",
          backgroundSize: "64px 64px",
        }}
      />

      {/* Main Grid: Split Layout */}
      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-6 items-center relative z-10 my-auto">
        {/* Left Column: Heading, Subtitle, CTAs, Stats */}
        <div className="lg:col-span-6 flex flex-col justify-center items-center text-center lg:items-start lg:text-left pt-2 sm:pt-0">
          {/* Top Pill Badge (Matches Pic 1) */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#121634]/80 border border-purple-500/30 backdrop-blur-md w-fit mb-4 sm:mb-5 shadow-[0_0_20px_rgba(139,92,246,0.18)]">
            <Sparkles className="w-3.5 h-3.5 text-amber-400 shrink-0" />
            <span className="text-xs sm:text-sm font-medium text-purple-200 tracking-wide">
              Full Stack Developer &amp; AI Specialist
            </span>
          </div>

          {/* Main Headline (Matches Pic 1) */}
          <h1 className="font-heading text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-[1.18] sm:leading-[1.1] tracking-tight mb-4 sm:mb-5 max-w-2xl">
            <span className="lg:hidden">
              We simplify the complex with{" "}
              <span className="bg-gradient-to-r from-[#38bdf8] via-[#818cf8] to-[#c084fc] bg-clip-text text-transparent">
                stunning web &amp; AI solutions!
              </span>
            </span>
            <span className="hidden lg:inline">
              <span className="block">Building Intelligent</span>
              <span className="block bg-gradient-to-r from-[#A855F7] via-[#8B5CF6] to-[#C084FC] bg-clip-text text-transparent drop-shadow-[0_0_35px_rgba(168,85,247,0.35)]">
                Websites &amp; AI-Powered
              </span>
              <span className="block">Solutions.</span>
            </span>
          </h1>

          {/* Subheading (Matches Pic 1) */}
          <p className="text-xs sm:text-base lg:text-lg text-[#B9B9C9] leading-relaxed mb-6 sm:mb-8 max-w-xl font-normal">
            Harnessing innovative React web apps, custom WordPress theme engineering, context-aware AI chatbots, and automated workflows to turn your vision into high-converting digital realities.
          </p>

          {/* CTA Buttons Row (Matches Pic 1: View My Work ↗ & Hire Me Now ⚡ with WhatsApp, Insta & LinkedIn) */}
          <div className="grid grid-cols-2 gap-2.5 sm:gap-4 w-full max-w-sm sm:max-w-md sm:flex sm:items-center mb-8 sm:mb-10">
            {/* Primary Button */}
            <a
              href="#portfolio"
              id="hero-view-my-work-btn"
              className="group px-3.5 sm:px-7 py-3 sm:py-3.5 rounded-xl sm:rounded-full bg-gradient-to-r from-[#1d4ed8] via-[#2563eb] to-[#3b82f6] text-white font-semibold text-xs sm:text-base flex items-center justify-center gap-1.5 sm:gap-2.5 shadow-[0_0_20px_rgba(37,99,235,0.45)] hover:shadow-[0_0_35px_rgba(37,99,235,0.7)] transition-all duration-300 hover:scale-105 active:scale-95"
            >
              <span>View My Work</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
            </a>

            {/* Secondary Direct DM Channels / Hire Button with WhatsApp, Insta & LinkedIn Logos */}
            <button
              type="button"
              onClick={() => setIsDmModalOpen(true)}
              id="hero-hire-me-now-btn"
              className="px-3 sm:px-6 py-3 sm:py-3.5 rounded-xl sm:rounded-full bg-white/10 hover:bg-white/15 border border-white/20 text-white font-medium text-xs sm:text-base flex items-center justify-center gap-1.5 sm:gap-2 backdrop-blur-md transition-all duration-300 hover:scale-105 active:scale-95 shadow-md cursor-pointer group"
              title="Hire & DM Faraz on WhatsApp, Instagram or LinkedIn"
            >
              <span>Hire Me Now</span>
              <span className="text-amber-400">⚡</span>

              {/* Verified Mini Logos for WhatsApp, Instagram, LinkedIn */}
              <span className="flex items-center gap-1 pl-1 sm:pl-1.5 border-l border-white/20">
                {/* WhatsApp */}
                <span
                  title="WhatsApp"
                  className="w-4 h-4 rounded-full bg-[#25D366]/20 flex items-center justify-center text-[#25D366] group-hover:scale-110 transition-transform"
                >
                  <svg className="w-2.5 h-2.5 fill-current" viewBox="0 0 24 24">
                    <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
                  </svg>
                </span>
                {/* Instagram */}
                <span
                  title="Instagram"
                  className="w-4 h-4 rounded-full bg-pink-500/20 flex items-center justify-center text-pink-400 group-hover:scale-110 transition-transform"
                >
                  <svg className="w-2.5 h-2.5 fill-current" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                  </svg>
                </span>
                {/* LinkedIn */}
                <span
                  title="LinkedIn"
                  className="w-4 h-4 rounded-full bg-[#0A66C2]/20 flex items-center justify-center text-[#0A66C2] group-hover:scale-110 transition-transform"
                >
                  <svg className="w-2.5 h-2.5 fill-current" viewBox="0 0 24 24">
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                  </svg>
                </span>
              </span>
            </button>
          </div>

          {/* Animated Statistics Counters (Desktop Only, on Mobile stats are featured in About top strip) */}
          <motion.div
            initial={{ opacity: 0, y: 22, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ type: "spring", stiffness: 230, damping: 21, delay: 0.44 }}
            className="hidden lg:grid grid-cols-3 gap-3 sm:gap-6 pt-5 sm:pt-6 border-t border-white/10 max-w-lg"
          >
            <StatCounter
              target={2}
              suffix="+"
              label="Years Experience"
              duration={1600}
            />
            <StatCounter
              target={50}
              suffix="+"
              label="Projects Completed"
              duration={1800}
            />
            <StatCounter
              target={100}
              suffix="%"
              label="Client Satisfaction"
              duration={2000}
            />
          </motion.div>
        </div>

        {/* Right Column: Sharp Portrait, Orbital Rings, 4 Floating Cards, Parallax */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 28 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ type: "spring", stiffness: 200, damping: 22, delay: 0.18 }}
          className="lg:col-span-6 relative flex flex-col items-center justify-center min-h-[300px] sm:min-h-[560px] lg:min-h-[620px]"
        >
          <div className="hero-studio-stage dark-preserve relative w-full h-full min-h-[300px] sm:min-h-[560px] lg:min-h-[620px] flex items-end sm:items-center justify-center rounded-3xl sm:rounded-none overflow-hidden sm:overflow-visible pt-4 sm:pt-0">
            {/* 1. Animated Orbital System (behind portrait) */}
            <OrbitalSystem />

            {/* Mobile-Only Non-Overlapping Corner Status Pills */}
            <div className="sm:hidden absolute top-3 left-3 z-20 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#0e132e]/85 border border-white/15 backdrop-blur-md">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-[10px] font-semibold text-gray-200">
                Available Now
              </span>
            </div>
            <div className="sm:hidden absolute top-3 right-3 z-20 inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#0e132e]/85 border border-purple-500/30 backdrop-blur-md">
              <span className="text-[10px] font-bold text-purple-200">
                ★ 50+ Shipped
              </span>
            </div>

            {/* 2. Handwritten Script Annotations */}
            {/* Top-left: "Faraz Ahmed" with curved arrow pointing to him */}
            <div className="absolute top-12 sm:top-16 left-8 sm:left-14 z-20 hidden sm:flex flex-col items-center pointer-events-none select-none">
              <span className="font-script text-2xl sm:text-3xl text-purple-200/90 -rotate-12 tracking-wide drop-shadow-[0_0_10px_rgba(168,85,247,0.4)]">
                Faraz Ahmed
              </span>
              <svg
                className="w-14 h-7 text-purple-300/80 -mt-0.5 ml-6 -rotate-12"
                viewBox="0 0 60 25"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
              >
                <path d="M 4 18 C 20 12, 36 8, 52 5" />
                <path d="M 45 2 L 53 5 L 47 11" />
              </svg>
            </div>

            {/* Lower-Right (below AI Agents, above MacBook): "Ideas \n Automation \n Growth" */}
            <div className="absolute right-2 sm:right-5 bottom-28 sm:bottom-36 z-20 hidden md:flex flex-col items-start pointer-events-none select-none -rotate-6">
              <span className="font-script text-xl sm:text-2xl text-purple-200/95 tracking-wider leading-tight drop-shadow-[0_0_12px_rgba(168,85,247,0.4)]">
                Ideas
              </span>
              <span className="font-script text-xl sm:text-2xl text-amber-100/95 tracking-wider leading-tight drop-shadow-[0_0_12px_rgba(245,158,11,0.3)]">
                Automation
              </span>
              <span className="font-script text-xl sm:text-2xl text-purple-200/95 tracking-wider leading-tight">
                Growth
              </span>
              <svg
                className="w-24 h-4 text-purple-400/80 -mt-1"
                viewBox="0 0 100 16"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              >
                <path d="M 4 12 Q 50 4, 94 6" />
              </svg>
            </div>

            {/* 3. Founder Portrait Showcase (Studio-integrated natural photo, seamless vignette blending) */}
            <motion.div
              style={{
                x: isTouchDevice ? 0 : smoothMouseX,
                y: isTouchDevice ? 0 : smoothMouseY,
              }}
              className="relative z-10 w-full max-w-[500px] sm:max-w-[580px] lg:max-w-[640px] aspect-[1.14/1] flex items-end justify-center"
            >
              <div className="relative w-full h-full">
                <Image
                  src="/images/faraz-portrait.webp?v=2"
                  alt="Faraz Ahmed - Web Developer & AI Solutions Specialist"
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 640px"
                  className="object-contain object-bottom"
                  priority
                  unoptimized
                />
              </div>

              {/* Desk Bottom Warm Gold Reflection Beam (Matches reference image) */}
              <div className="absolute bottom-0 inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-[#F59E0B]/50 to-transparent pointer-events-none" />
              <div className="absolute bottom-0 inset-x-0 h-6 bg-gradient-to-t from-[#070711] to-transparent pointer-events-none" />

              {/* Mobile-Only Dual Floating Skill Badges (Matches Pic 1 Exactly) */}
              <div className="lg:hidden absolute bottom-3 left-1 z-20 flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-[#0f142e]/90 border border-white/15 backdrop-blur-md shadow-lg">
                <div className="w-6 h-6 rounded-lg bg-sky-500/20 border border-sky-400/40 flex items-center justify-center text-sky-300 font-mono text-[10px] font-bold">
                  &lt;/&gt;
                </div>
                <div className="text-left">
                  <div className="text-[10px] font-bold text-white leading-tight">Full Stack Dev</div>
                  <div className="text-[8px] text-gray-400">React, Node &amp; APIs</div>
                </div>
              </div>

              <div className="lg:hidden absolute bottom-3 right-12 z-20 flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-[#0f142e]/90 border border-white/15 backdrop-blur-md shadow-lg">
                <div className="w-6 h-6 rounded-lg bg-amber-500/20 border border-amber-400/40 flex items-center justify-center text-amber-300 text-[10px]">
                  🌐
                </div>
                <div className="text-left">
                  <div className="text-[10px] font-bold text-white leading-tight">WordPress Expert</div>
                  <div className="text-[8px] text-gray-400">Custom Themes &amp; Woo</div>
                </div>
              </div>

              {/* Floating Glowing Brand Logo Bubble with Online Dot (Matches Pic 1) */}
              <div className="lg:hidden absolute -bottom-1 right-0 z-30 w-10 h-10 rounded-full p-[2px] bg-gradient-to-tr from-[#38bdf8] via-[#818cf8] to-[#f59e0b] shadow-[0_0_15px_rgba(56,189,248,0.5)] flex items-center justify-center">
                <div className="relative w-full h-full rounded-full overflow-hidden bg-black">
                  <Image src="/images/logo.jpg" alt="Logo" fill className="object-cover" />
                </div>
                <span className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-emerald-400 border-2 border-[#070711] animate-pulse" />
              </div>
            </motion.div>
          </div>

          {/* 4. Four Independent Floating Service Cards (Tablet & Desktop >= sm) */}
          {/* Card 1: Modern Websites (Top Right) */}
          <FloatingServiceCard
            title="Modern Websites"
            subtitle="WordPress | Next.js"
            icon={<Code2 className="w-5 h-5 text-white" />}
            className="hidden sm:block absolute top-3 sm:top-5 -right-1 sm:right-1 z-30"
            floatDuration={5.8}
            floatDelay={0}
            mouseX={smoothMouseX}
            mouseY={smoothMouseY}
            parallaxDepth={14}
            href="/services/website-development"
          />

          {/* Card 2: AI Chatbots (Middle-Upper Right) */}
          <FloatingServiceCard
            title="AI Chatbots"
            subtitle="Smart Automation"
            icon={<Bot className="w-5 h-5 text-white" />}
            className="hidden sm:block absolute top-24 sm:top-28 right-1 sm:right-5 z-30"
            floatDuration={6.8}
            floatDelay={0.8}
            mouseX={smoothMouseX}
            mouseY={smoothMouseY}
            parallaxDepth={10}
            href="/services/ai-chatbots"
          />

          {/* Card 3: AI Agents (Middle-Lower Right, above Ideas/Automation/Growth) */}
          <FloatingServiceCard
            title="AI Agents"
            subtitle="Custom Solutions"
            icon={<Zap className="w-5 h-5 text-white" />}
            className="hidden sm:block absolute top-44 sm:top-52 -right-2 sm:right-0 z-30"
            floatDuration={6.2}
            floatDelay={1.4}
            mouseX={smoothMouseX}
            mouseY={smoothMouseY}
            parallaxDepth={16}
            href="/services/ai-agents"
          />

          {/* Card 4: E-commerce (Lower Left - over suit jacket) */}
          <FloatingServiceCard
            title="E-commerce"
            subtitle="Shopify | WooCommerce"
            icon={<ShoppingBag className="w-5 h-5 text-white" />}
            className="hidden sm:block absolute bottom-16 sm:bottom-24 lg:bottom-[150px] left-2 sm:left-8 lg:left-[86px] z-30"
            floatDuration={7.2}
            floatDelay={0.4}
            mouseX={smoothMouseX}
            mouseY={smoothMouseY}
            parallaxDepth={8}
            href="/services/ecommerce-solutions"
          />

        </motion.div>
      </div>

      {/* 5. Bottom Technologies Strip Dock (Desktop/Tablet Only to keep mobile concise like Pic 1 & 2) */}
      <ScrollReveal variant="zoom-pop" delay={0.1} className="hidden sm:block max-w-6xl mx-auto w-full mt-8 sm:mt-12 z-20">

        <div className="glass-dock px-5 sm:px-10 py-4 sm:py-5 rounded-2xl sm:rounded-3xl border border-white/10 flex flex-col md:flex-row items-center justify-between gap-5 sm:gap-6 shadow-[0_20px_50px_rgba(0,0,0,0.6)]">
          {/* Dock Label */}
          <div className="flex flex-col text-center md:text-left shrink-0">
            <span className="font-heading font-semibold text-xs sm:text-base text-purple-200">
              Technologies I Work With
            </span>
            <span className="text-[11px] sm:text-xs text-[#94A3B8]">
              Modern tools for modern solutions
            </span>
          </div>

          {/* Technology Badges (Symmetric 3x2 grid on mobile, horizontal row on sm+) */}
          <div className="grid grid-cols-3 gap-x-6 gap-y-4 w-full sm:w-auto sm:flex sm:items-center sm:flex-wrap sm:justify-center sm:gap-8 lg:gap-10">
            {/* WordPress */}
            <div className="flex flex-col items-center gap-1.5 group cursor-default">
              <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-[#21759B]/15 border border-[#21759B]/35 flex items-center justify-center text-[#21759B] group-hover:scale-110 group-hover:border-[#21759B] transition-all shadow-md">
                <svg
                  className="w-5 h-5 fill-current"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm0 1.2c5.967 0 10.8 4.833 10.8 10.8 0 2.22-.673 4.283-1.827 6L14.73 6.643c.483-.024.945-.07 1.393-.105v-.602H10.88v.602c.444.035.903.081 1.385.105L9.624 14.39 6.84 6.643c.483-.024.945-.07 1.393-.105v-.602H3v.602c.444.035.903.081 1.385.105l4.137 11.535L5.7 18.06A10.742 10.742 0 0 1 1.2 12C1.2 6.033 6.033 1.2 12 1.2z" />
                </svg>
              </div>
              <span className="text-[10px] sm:text-[11px] text-[#94A3B8] font-medium group-hover:text-white transition-colors">
                WordPress
              </span>
            </div>

            {/* Next.js */}
            <div className="flex flex-col items-center gap-1.5 group cursor-default">
              <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-black/80 border border-white/25 flex items-center justify-center text-white group-hover:scale-110 group-hover:border-purple-400 transition-all shadow-md">
                <svg
                  className="w-5 h-5 fill-current"
                  viewBox="0 0 180 180"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <mask
                    height="180"
                    id="mask0"
                    maskUnits="userSpaceOnUse"
                    width="180"
                    x="0"
                    y="0"
                    style={{ maskType: "alpha" }}
                  >
                    <circle cx="90" cy="90" fill="black" r="90" />
                  </mask>
                  <g mask="url(#mask0)">
                    <circle cx="90" cy="90" fill="black" r="90" />
                    <path
                      d="M149.508 157.52L69.142 54H54V125.97H66.1136V69.3836L139.999 164.845C143.333 162.614 146.509 160.165 149.508 157.52Z"
                      fill="white"
                    />
                    <rect
                      fill="white"
                      height="72"
                      width="12"
                      x="115"
                      y="54"
                    />
                  </g>
                </svg>
              </div>
              <span className="text-[10px] sm:text-[11px] text-[#94A3B8] font-medium group-hover:text-white transition-colors">
                Next.js
              </span>
            </div>

            {/* React */}
            <div className="flex flex-col items-center gap-1.5 group cursor-default">
              <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-[#00D8FF]/15 border border-[#00D8FF]/35 flex items-center justify-center text-[#00D8FF] group-hover:scale-110 group-hover:border-[#00D8FF] transition-all shadow-md">
                <svg
                  className="w-5 h-5"
                  viewBox="-11.5 -10.23174 23 20.46348"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <circle cx="0" cy="0" r="2.05" fill="#00D8FF" />
                  <g stroke="#00D8FF">
                    <ellipse rx="11" ry="4.2" />
                    <ellipse rx="11" ry="4.2" transform="rotate(60)" />
                    <ellipse rx="11" ry="4.2" transform="rotate(120)" />
                  </g>
                </svg>
              </div>
              <span className="text-[10px] sm:text-[11px] text-[#94A3B8] font-medium group-hover:text-white transition-colors">
                React
              </span>
            </div>

            {/* Node.js */}
            <div className="flex flex-col items-center gap-1.5 group cursor-default">
              <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-[#5FA04E]/15 border border-[#5FA04E]/35 flex items-center justify-center text-[#5FA04E] group-hover:scale-110 group-hover:border-[#5FA04E] transition-all shadow-md">
                <svg
                  className="w-5 h-5 fill-current"
                  viewBox="0 0 32 32"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M16 1.488L2.484 9.293v15.61L16 32.707l13.516-7.805V9.293L16 1.488zm0 2.316l11.51 6.645v13.297L16 30.387 4.49 23.746V10.45L16 3.805z" />
                </svg>
              </div>
              <span className="text-[10px] sm:text-[11px] text-[#94A3B8] font-medium group-hover:text-white transition-colors">
                Node.js
              </span>
            </div>

            {/* Shopify */}
            <div className="flex flex-col items-center gap-1.5 group cursor-default">
              <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-[#95BF47]/15 border border-[#95BF47]/35 flex items-center justify-center text-[#95BF47] group-hover:scale-110 group-hover:border-[#95BF47] transition-all shadow-md">
                <svg
                  className="w-5 h-5"
                  viewBox="0 0 256 292"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-label="Shopify"
                >
                  <path
                    d="M223.774 57.34c-.201-1.46-1.48-2.268-2.537-2.357-1.055-.088-23.383-1.743-23.383-1.743s-15.507-15.395-17.209-17.099c-1.703-1.703-5.029-1.185-6.32-.805-.19.056-3.388 1.043-8.678 2.68-5.18-14.906-14.322-28.604-30.405-28.604-.444 0-.901.018-1.358.044C129.31 3.407 123.644.779 118.75.779c-37.465 0-55.364 46.835-60.976 70.635-14.558 4.511-24.9 7.718-26.221 8.133-8.126 2.549-8.383 2.805-9.45 10.462C21.3 95.806 0 260.235 0 260.235l165.678 31.042 89.77-19.42S223.973 58.8 223.775 57.34zM156.49 40.848l-14.019 4.339c.005-.988.01-1.96.01-3.023 0-9.264-1.286-16.723-3.349-22.636 8.287 1.04 13.806 10.469 17.358 21.32zm-27.638-19.483c2.304 5.773 3.802 14.058 3.802 25.238 0 .572-.005 1.095-.01 1.624-9.117 2.824-19.024 5.89-28.953 8.966 5.575-21.516 16.025-31.908 25.161-35.828zm-11.131-10.537c1.617 0 3.246.549 4.805 1.622-12.007 5.65-24.877 19.88-30.312 48.297l-22.886 7.088C75.694 46.16 90.81 10.828 117.72 10.828z"
                    fill="#95BF47"
                  />
                  <path
                    d="M221.237 54.983c-1.055-.088-23.383-1.743-23.383-1.743s-15.507-15.395-17.209-17.099c-.637-.634-1.496-.959-2.394-1.099l-12.527 256.233 89.762-19.418S223.972 58.8 223.774 57.34c-.201-1.46-1.48-2.268-2.537-2.357z"
                    fill="#5E8E3E"
                  />
                  <path
                    d="M135.242 104.585l-11.069 32.926s-9.698-5.176-21.586-5.176c-17.428 0-18.305 10.937-18.305 13.693 0 15.038 39.2 20.8 39.2 56.024 0 27.713-17.577 45.558-41.277 45.558-28.44 0-42.984-17.7-42.984-17.7l7.615-25.16s14.95 12.835 27.565 12.835c8.243 0 11.596-6.49 11.596-11.232 0-19.616-32.16-20.491-32.16-52.724 0-27.129 19.472-53.382 58.778-53.382 15.145 0 22.627 4.338 22.627 4.338z"
                    fill="#FFFFFF"
                  />
                </svg>
              </div>
              <span className="text-[10px] sm:text-[11px] text-[#94A3B8] font-medium group-hover:text-white transition-colors">
                Shopify
              </span>
            </div>

            {/* OpenAI */}
            <div className="flex flex-col items-center gap-1.5 group cursor-default">
              <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white/10 border border-white/20 flex items-center justify-center text-white group-hover:scale-110 group-hover:border-purple-300 transition-all shadow-md">
                <Sparkles className="w-4 h-4 text-purple-300" />
              </div>
              <span className="text-[10px] sm:text-[11px] text-[#94A3B8] font-medium group-hover:text-white transition-colors">
                OpenAI
              </span>
            </div>
          </div>
        </div>
      </ScrollReveal>

      {/* Interactive Hire Me & Direct DM Modal (WhatsApp, Instagram, LinkedIn, Email) */}
      <HireMeModal
        isOpen={isDmModalOpen}
        onClose={() => setIsDmModalOpen(false)}
      />
    </section>
  );
}

