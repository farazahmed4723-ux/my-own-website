"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, CheckCircle, Users, Globe, Briefcase, Sparkles } from "lucide-react";
import FounderShowcaseCard from "@/components/FounderShowcaseCard";
import { ScrollReveal, StaggerGrid, StaggerItem } from "@/components/ScrollMotion";

const stats = [
  {
    icon: Users,
    value: "100+",
    label: "Satisfied Clients",
    color: "text-sky-400",
  },
  {
    icon: Globe,
    value: "50+",
    label: "Web Apps & WordPress",
    color: "text-amber-400",
  },
  {
    icon: Briefcase,
    value: "20+",
    label: "Projects Completed",
    color: "text-purple-400",
  },
];

const corePrinciples = [
  {
    title: "Modern Clean Architecture",
    desc: "Semantic code, fast SSR/SSG, responsive layouts, and zero bloat.",
  },
  {
    title: "Pragmatic AI Integration",
    desc: "Tested AI agents and chatbots tailored to specific business operations.",
  },
  {
    title: "Direct Communication",
    desc: "Work directly with Faraz—no middlemen, no account executive delays.",
  },
  {
    title: "End-to-End Ownership",
    desc: "From discovery and design to testing, domain deployment, and handover.",
  },
];

export default function AboutPreview() {
  return (
    <section className="relative py-16 sm:py-24 px-4 sm:px-6 lg:px-8 bg-[#070918] overflow-hidden" id="about">
      {/* Ambient background glow */}
      <div className="absolute top-1/3 left-10 w-[500px] h-[500px] bg-purple-900/15 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Top 3-Stat Horizontal Card (Matches Pic 2 Exactly) */}
        <ScrollReveal variant="pop-up" className="mb-10 sm:mb-14">
          <div className="rounded-2xl sm:rounded-3xl glass-card border border-white/10 bg-[#0e122b]/80 p-4 sm:p-6 shadow-xl max-w-4xl mx-auto">
            <div className="grid grid-cols-3 divide-x divide-white/10 text-center items-center">
              {stats.map((st) => {
                const Icon = st.icon;
                return (
                  <div key={st.label} className="px-2 sm:px-4 flex flex-col items-center">
                    <div className="flex items-center justify-center gap-1.5 mb-1">
                      <Icon className={`w-3.5 h-3.5 sm:w-4 sm:h-4 ${st.color} shrink-0`} />
                      <span className="font-heading font-extrabold text-base sm:text-2xl lg:text-3xl text-white tracking-tight">
                        {st.value}
                      </span>
                    </div>
                    <span className="text-[9.5px] sm:text-xs font-semibold text-gray-400 uppercase tracking-wider leading-tight">
                      {st.label}
                    </span>
                  </div>
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
                    src="/images/faraz-profile.jpg"
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

        {/* Desktop Layout (Preserved 1:1 on Desktop >= lg) */}
        <div className="hidden lg:grid grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Interactive Founder Showcase Bento Card */}
          <ScrollReveal
            variant="slide-left"
            className="lg:col-span-5 relative flex justify-center items-center"
          >
            <FounderShowcaseCard subtitle="Web Developer & AI Solutions Specialist" />
          </ScrollReveal>

          {/* Right Column: Bio & Core Philosophy */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            <ScrollReveal variant="slide-right">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-purple-900/30 border border-purple-500/30 text-purple-300 text-xs font-semibold uppercase tracking-wider mb-4 w-fit">
                Meet The Developer
              </div>

              <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight mb-6">
                Engineering Intelligent Systems That{" "}
                <span className="gradient-text-purple">Help Businesses Scale</span>
              </h2>

              <div className="space-y-4 text-sm sm:text-base text-gray-300 leading-relaxed mb-8">
                <p>
                  Hello, I&apos;m <strong>Faraz Ahmed</strong>. I am an independent web developer and AI solutions specialist dedicated to engineering digital experiences that marry clean architecture with high conversion.
                </p>
                <p>
                  My focus centers on developing modern websites using <strong>WordPress</strong> and <strong>Next.js</strong>, crafting intelligent <strong>AI chatbots</strong> trained on proprietary business data, building <strong>automation workflows</strong> that eliminate manual repetition, and delivering tailored digital systems.
                </p>
                <p>
                  Rather than treating web development as an isolated design exercise, I approach every project with an engineer&apos;s mindset: high performance, bulletproof security, rock-solid technical SEO, and practical business utility.
                </p>
              </div>
            </ScrollReveal>

            {/* Core Values / Work Principles */}
            <StaggerGrid className="grid grid-cols-2 gap-4 mb-8">
              {corePrinciples.map((item) => (
                <StaggerItem key={item.title}>
                  <div className="flex items-start gap-3 p-4 rounded-xl bg-white/[0.03] border border-white/[0.06] hover:border-purple-500/35 transition-colors h-full">
                    <CheckCircle className="w-5 h-5 text-purple-400 mt-0.5 shrink-0" />
                    <div>
                      <h4 className="font-heading text-sm font-semibold text-white">
                        {item.title}
                      </h4>
                      <p className="text-xs text-gray-400 mt-0.5">{item.desc}</p>
                    </div>
                  </div>
                </StaggerItem>
              ))}
            </StaggerGrid>

            <ScrollReveal variant="pop-up" delay={0.1}>
              <div className="flex flex-wrap items-center gap-4">
                <Link
                  href="/about"
                  className="px-6 py-3 rounded-full bg-gradient-to-r from-[#8B5CF6] to-[#A855F7] text-white text-xs sm:text-sm font-semibold flex items-center gap-2 shadow-[0_0_20px_rgba(139,92,246,0.4)] hover:shadow-[0_0_30px_rgba(139,92,246,0.7)] transition-all hover:scale-105 active:scale-95"
                >
                  <span>Read Full Biography & Background</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  href="/contact"
                  className="px-6 py-3 rounded-full bg-white/5 border border-white/10 text-gray-300 hover:text-white text-xs sm:text-sm font-medium hover:bg-white/10 hover:scale-105 active:scale-95 transition-all"
                >
                  Discuss A Project
                </Link>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </section>
  );
}
