"use client";

import React, { useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function FounderJourneyCard({
  embedded = false,
}: {
  embedded?: boolean;
}) {
  const btnRef = useRef<HTMLDivElement>(null);

  // Smooth magnetic button hover motion (desktop pointer)
  const magX = useMotionValue(0);
  const magY = useMotionValue(0);
  const smoothX = useSpring(magX, { stiffness: 260, damping: 18 });
  const smoothY = useSpring(magY, { stiffness: 260, damping: 18 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!btnRef.current) return;
    const rect = btnRef.current.getBoundingClientRect();
    const offsetX = e.clientX - (rect.left + rect.width / 2);
    const offsetY = e.clientY - (rect.top + rect.height / 2);
    magX.set(offsetX * 0.22);
    magY.set(offsetY * 0.28);
  };

  const handleMouseLeave = () => {
    magX.set(0);
    magY.set(0);
  };

  return (
    <section
      className={
        embedded
          ? "relative pt-4 pb-2 overflow-hidden"
          : "relative py-14 sm:py-20 px-4 sm:px-6 lg:px-8 bg-[#060813] overflow-hidden"
      }
      id="founder-journey"
    >
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.65, ease: "easeOut" }}
        className="founder-journey-card rounded-[2rem] sm:rounded-[2.5rem] border border-purple-500/30 bg-gradient-to-b from-[#131735] via-[#0e122b] to-[#080b1a] pt-7 sm:pt-12 pb-0 px-5 sm:px-12 shadow-2xl relative flex flex-col items-center text-center max-w-3xl mx-auto overflow-hidden transition-colors duration-300"
      >
        {/* Ambient Center Multi-Tone Radial Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] sm:w-[400px] h-[300px] sm:h-[400px] bg-gradient-to-tr from-[#8B5CF6]/18 via-[#A855F7]/10 to-[#F59E0B]/15 rounded-full blur-[80px] pointer-events-none" />

        {/* Headline */}
        <h2 className="font-heading text-xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight leading-snug sm:leading-tight max-w-2xl mb-2.5 sm:mb-4 relative z-10 text-white">
          My journey is a testament to the power of{" "}
          <span className="bg-gradient-to-r from-[#8B5CF6] via-[#C084FC] to-[#F59E0B] bg-clip-text text-transparent block sm:inline">
            code, AI &amp; visual innovation
          </span>
        </h2>

        {/* Subheading */}
        <p className="text-xs sm:text-sm lg:text-[15px] leading-relaxed max-w-xl mb-5 sm:mb-7 relative z-10 text-gray-300">
          Join me in empowering your business to create clear, captivating web
          applications, custom WordPress portals, AI chatbots, and intelligent
          automations that inspire and convert.
        </p>

        {/* Magnetic CTA Button */}
        <motion.div
          ref={btnRef}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          style={{ x: smoothX, y: smoothY }}
          className="mb-4 sm:mb-6 relative z-10"
        >
          <Link
            href="/contact"
            id="journey-lets-work-btn"
            className="group relative overflow-hidden inline-flex items-center justify-center gap-2 px-6 sm:px-8 py-3 sm:py-4 rounded-xl sm:rounded-2xl font-extrabold text-xs uppercase tracking-wider text-white bg-gradient-to-r from-[#7C3AED] via-[#8B5CF6] to-[#9333EA] shadow-lg shadow-purple-600/35 hover:shadow-purple-500/55 transition-all duration-300 hover:scale-[1.03] active:scale-95 cursor-pointer"
          >
            <span>Let&apos;s Work Together</span>
            <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        </motion.div>

        {/* Signature Founder Name */}
        <div className="relative z-10 flex flex-col items-center mb-1 sm:mb-2">
          <span className="font-serif italic text-2xl sm:text-4xl font-extrabold text-purple-400 tracking-wide block drop-shadow-sm select-none">
            Faraz Ahmed
          </span>
        </div>

        {/* Mobile Cutout Showcase (Optimized specifically for mobile screens) */}
        <div className="flex sm:hidden relative z-20 mt-1 w-full justify-center items-end">
          <div className="relative flex justify-center items-end">
            <div className="absolute bottom-0 w-48 h-48 bg-[#8B5CF6]/25 rounded-full blur-2xl pointer-events-none" />
            <Image
              src="/images/faraz-journey-cutout.webp?v=2"
              alt="Faraz Ahmed - Web Developer & AI Solutions Specialist"
              width={422}
              height={351}
              className="relative z-10 w-[245px] h-auto max-h-[205px] object-contain object-bottom drop-shadow-[0_10px_20px_rgba(15,23,42,0.28)]"
              unoptimized
            />
          </div>
        </div>

        {/* Tablet & Desktop Cutout Showcase */}
        <div className="hidden sm:flex relative z-20 w-full justify-center items-end mt-2">
          <div className="relative flex justify-center items-end">
            <div className="absolute bottom-0 w-64 sm:w-72 h-64 sm:h-72 bg-[#8B5CF6]/22 rounded-full blur-2xl pointer-events-none" />
            <Image
              src="/images/faraz-journey-cutout.webp?v=2"
              alt="Faraz Ahmed - Web Developer & AI Solutions Specialist"
              width={844}
              height={702}
              className="relative z-10 w-[310px] sm:w-[360px] lg:w-[400px] h-auto max-h-[270px] sm:max-h-[320px] object-contain object-bottom drop-shadow-[0_15px_30px_rgba(15,23,42,0.32)] hover:scale-[1.03] transition-transform duration-500 ease-out"
              unoptimized
            />
          </div>
        </div>
      </motion.div>
    </section>
  );
}
