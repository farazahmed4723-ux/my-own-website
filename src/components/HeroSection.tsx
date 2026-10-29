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

export default function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isTouchDevice, setIsTouchDevice] = useState(false);

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
        <div className="lg:col-span-6 flex flex-col justify-center pt-2 sm:pt-0">
          {/* Top Pill Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#121634]/80 border border-purple-500/30 backdrop-blur-md w-fit mb-4 sm:mb-5 shadow-[0_0_20px_rgba(139,92,246,0.18)]">
            <span className="text-sm">🚀</span>
            <span className="text-xs sm:text-sm font-medium text-purple-200 tracking-wide">
              AI Solutions for Modern Businesses
            </span>
          </div>

          {/* Main Headline */}
          <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-[1.1] tracking-tight mb-4 sm:mb-5">
            <span className="block">Building Intelligent</span>
            <span className="block bg-gradient-to-r from-[#A855F7] via-[#8B5CF6] to-[#C084FC] bg-clip-text text-transparent drop-shadow-[0_0_35px_rgba(168,85,247,0.35)]">
              Websites & AI-Powered
            </span>
            <span className="block">Solutions.</span>
          </h1>

          {/* Subheading */}
          <p className="text-sm sm:text-base lg:text-lg text-[#B9B9C9] leading-relaxed mb-6 sm:mb-8 max-w-xl font-normal">
            I help businesses grow with modern websites, AI chatbots, automation
            systems and custom software solutions using WordPress, Next.js and
            the latest AI technologies.
          </p>

          {/* CTA Buttons Row */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 mb-8 sm:mb-10">
            {/* Primary Button */}
            <Link
              href="/services"
              id="hero-explore-services-btn"
              className="group px-7 py-3.5 rounded-full bg-gradient-to-r from-[#8B5CF6] via-[#9333EA] to-[#A855F7] text-white font-semibold text-sm sm:text-base flex items-center justify-center gap-3 shadow-[0_0_25px_rgba(139,92,246,0.45)] hover:shadow-[0_0_40px_rgba(139,92,246,0.7)] transition-all duration-300 hover:scale-105 active:scale-95"
            >
              <div className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center group-hover:translate-x-0.5 transition-transform">
                <ArrowRight className="w-3.5 h-3.5" />
              </div>
              <span>Explore Services</span>
            </Link>

            {/* Secondary WhatsApp Button */}
            <a
              href="https://wa.me/14374348789"
              target="_blank"
              rel="noopener noreferrer"
              id="hero-whatsapp-btn"
              className="px-6 py-3.5 rounded-full bg-[#10142A]/80 hover:bg-[#151a38] border border-white/15 hover:border-purple-500/40 text-gray-200 hover:text-white font-medium text-sm sm:text-base flex items-center justify-center gap-2.5 backdrop-blur-md transition-all duration-300 hover:scale-105 active:scale-95 shadow-lg"
            >
              <MessageCircle className="w-4 h-4 text-emerald-400" />
              <span>Let&apos;s Talk on WhatsApp</span>
            </a>
          </div>

          {/* Animated Statistics Counters */}
          <div className="grid grid-cols-3 gap-3 sm:gap-6 pt-5 sm:pt-6 border-t border-white/10 max-w-lg">
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
          </div>
        </div>

        {/* Right Column: Sharp Portrait, Orbital Rings, 4 Floating Cards, Parallax */}
        <div className="lg:col-span-6 relative flex items-center justify-center min-h-[460px] sm:min-h-[560px] lg:min-h-[620px]">
          <div className="hero-studio-stage dark-preserve relative w-full h-full min-h-[460px] sm:min-h-[560px] lg:min-h-[620px] flex items-center justify-center">
            {/* 1. Animated Orbital System (behind portrait) */}
            <OrbitalSystem />

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
            </motion.div>
          </div>

          {/* 4. Four Independent Floating Service Cards with Kinetic Movement & Deep Links */}
          {/* Card 1: Modern Websites (Top Right) */}
          <FloatingServiceCard
            title="Modern Websites"
            subtitle="WordPress | Next.js"
            icon={<Code2 className="w-5 h-5 text-white" />}
            className="absolute top-3 sm:top-5 -right-1 sm:right-1 z-30"
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
            className="absolute top-24 sm:top-28 right-1 sm:right-5 z-30"
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
            className="absolute top-44 sm:top-52 -right-2 sm:right-0 z-30"
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
            className="absolute bottom-16 sm:bottom-24 lg:bottom-[150px] left-2 sm:left-8 lg:left-[86px] z-30"
            floatDuration={7.2}
            floatDelay={0.4}
            mouseX={smoothMouseX}
            mouseY={smoothMouseY}
            parallaxDepth={8}
            href="/services/ecommerce-solutions"
          />

        </div>
      </div>

      {/* 5. Bottom Technologies Strip Dock (matching Reference Image 1) */}
      <div className="max-w-6xl mx-auto w-full mt-8 sm:mt-12 z-20">

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

          {/* Technology Badges */}
          <div className="flex items-center flex-wrap justify-center gap-5 sm:gap-8 lg:gap-10">
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
      </div>
    </section>
  );
}

