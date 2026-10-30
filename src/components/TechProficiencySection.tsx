"use client";

import React, { useState } from "react";
import {
  Code2,
  Bot,
  ShoppingBag,
  CheckCircle2,
  Sparkles,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface SkillItem {
  name: string;
  tag: string;
  proficiency: number;
}

interface SkillCategory {
  id: string;
  tabLabel: string;
  title: string;
  subtitle: string;
  countLabel: string;
  icon: React.ElementType;
  skills: SkillItem[];
}

const categories: SkillCategory[] = [
  {
    id: "fullstack-web",
    tabLabel: "Full Stack & Web",
    title: "Full Stack & Web Engineering",
    subtitle:
      "Building high-speed React/Next.js applications, custom WordPress themes, WooCommerce stores, and clean APIs.",
    countLabel: "6 Core Techs",
    icon: Code2,
    skills: [
      { name: "React.js / Next.js", tag: "Core", proficiency: 95 },
      { name: "TypeScript / ES6+", tag: "Core", proficiency: 92 },
      { name: "Custom WordPress & WooCommerce", tag: "Core", proficiency: 96 },
      { name: "Elementor Pro & Bricks Builder", tag: "Core", proficiency: 95 },
      { name: "Tailwind CSS & Modern UI", tag: "Core", proficiency: 98 },
      { name: "PageSpeed 90+ & Core Web Vitals", tag: "Core", proficiency: 95 },
    ],
  },
  {
    id: "ai-automation",
    tabLabel: "AI & Automation",
    title: "AI Chatbots, Agents & Automation",
    subtitle:
      "Engineering custom RAG chatbots, autonomous LLM task agents, and n8n/Make business workflows that save hours daily.",
    countLabel: "6 Core Techs",
    icon: Bot,
    skills: [
      { name: "Custom AI Chatbots & RAG Systems", tag: "Core", proficiency: 96 },
      { name: "OpenAI, Claude & Gemini APIs", tag: "Core", proficiency: 95 },
      { name: "Autonomous AI Task Agents", tag: "Core", proficiency: 93 },
      { name: "n8n, Make & Zapier Workflows", tag: "Core", proficiency: 96 },
      { name: "CRM & WhatsApp Lead Automation", tag: "Core", proficiency: 95 },
      { name: "Prompt Architecture & Vector DBs", tag: "Core", proficiency: 92 },
    ],
  },
  {
    id: "ecommerce-systems",
    tabLabel: "E-Commerce & Cloud",
    title: "E-Commerce & Digital Architecture",
    subtitle:
      "Delivering conversion-focused Shopify & WooCommerce storefronts, payment integrations, and technical SEO foundations.",
    countLabel: "6 Core Techs",
    icon: ShoppingBag,
    skills: [
      { name: "Shopify Storefronts & Liquid", tag: "Core", proficiency: 95 },
      { name: "WooCommerce Checkout & Funnels", tag: "Core", proficiency: 96 },
      { name: "Stripe & Payment Gateways", tag: "Core", proficiency: 94 },
      { name: "REST APIs, Webhooks & Node.js", tag: "Core", proficiency: 93 },
      { name: "Technical SEO & Schema.org", tag: "Core", proficiency: 97 },
      { name: "Vercel, Cloud DNS & SSL Security", tag: "Core", proficiency: 96 },
    ],
  },
];

export default function TechProficiencySection({
  embedded = false,
}: {
  embedded?: boolean;
}) {
  const [activeId, setActiveId] = useState<string>("fullstack-web");
  const activeCategory =
    categories.find((c) => c.id === activeId) || categories[0];
  const ActiveIcon = activeCategory.icon;

  return (
    <section
      id="tech-proficiency"
      className={
        embedded
          ? "relative mb-20"
          : "relative py-20 sm:py-24 px-4 sm:px-6 lg:px-8 bg-[#060813] overflow-hidden"
      }
    >
      {/* Subtle ambient background glow */}
      {!embedded && (
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[450px] bg-purple-900/10 rounded-full blur-[140px] pointer-events-none" />
      )}

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header + Category Switcher Tabs */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-5 sm:gap-6 mb-7 sm:mb-10">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 sm:px-3.5 py-1.5 rounded-full bg-purple-900/30 border border-purple-500/30 text-purple-300 text-[10px] sm:text-xs font-semibold uppercase tracking-wider mb-3">
              <Sparkles className="w-3.5 h-3.5 shrink-0" />
              <span>Technical Proficiency &amp; Stack</span>
            </div>
            <h2 className="font-heading text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
              Core <span className="gradient-text-purple">Engineering Mastery</span>
            </h2>
          </div>

          {/* Interactive Discipline Switcher Pills (Clean 3-col single row on mobile, pill flex on sm+) */}
          <div
            className="grid grid-cols-3 gap-1.5 w-full sm:w-auto sm:flex sm:flex-wrap sm:items-center sm:gap-2"
            role="tablist"
            aria-label="Engineering skill categories"
          >
            {categories.map((cat) => {
              const TabIcon = cat.icon;
              const isSelected = cat.id === activeId;
              const shortLabel =
                cat.id === "fullstack-web"
                  ? "Full Stack"
                  : cat.id === "ai-automation"
                  ? "AI & Agents"
                  : "E-Commerce";
              return (
                <button
                  key={cat.id}
                  type="button"
                  role="tab"
                  aria-selected={isSelected}
                  onClick={() => setActiveId(cat.id)}
                  className={`px-1.5 sm:px-4 py-2 sm:py-2.5 rounded-xl sm:rounded-full text-[10.5px] sm:text-sm font-semibold flex items-center justify-center gap-1 sm:gap-2 transition-all duration-300 cursor-pointer focus:outline-none ${
                    isSelected
                      ? "bg-gradient-to-r from-[#7C3AED] via-[#8B5CF6] to-[#A855F7] text-white shadow-[0_6px_20px_rgba(139,92,246,0.4)] sm:scale-[1.02]"
                      : "tech-tab-inactive bg-[#10142c] border border-white/10 text-gray-300 hover:text-white hover:border-purple-500/35"
                  }`}
                >
                  <TabIcon className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0" />
                  <span className="sm:hidden truncate">{shortLabel}</span>
                  <span className="hidden sm:inline">{cat.tabLabel}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Main Showcase Panel (Matches Reference Design 1:1 with Top Accent Bar & 3x2 Proficiency Grid) */}
        <div className="tech-proficiency-panel relative rounded-[1.5rem] sm:rounded-[2.25rem] border border-white/10 bg-gradient-to-b from-[#111530] via-[#0d1025] to-[#090c1c] shadow-2xl overflow-hidden transition-colors duration-300">
          {/* Sleek Top Multi-Tone Gradient Accent Bar */}
          <div className="h-1.5 w-full bg-gradient-to-r from-[#7C3AED] via-[#A855F7] to-[#F59E0B]" />

          <div className="p-4 sm:p-8 lg:p-10">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeCategory.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.28, ease: "easeOut" }}
              >
                {/* Panel Header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3.5 sm:gap-4 pb-5 sm:pb-6 mb-5 sm:mb-7 border-b border-white/10">
                  <div className="flex items-start sm:items-center gap-3.5 sm:gap-4">
                    {/* Icon Box with Glowing Corner Dot */}
                    <div className="tech-icon-box relative w-11 h-11 sm:w-14 sm:h-14 rounded-2xl bg-[#181e42] border border-purple-500/30 flex items-center justify-center text-purple-300 shrink-0 shadow-md">
                      <ActiveIcon className="w-5 h-5 sm:w-6 sm:h-6" />
                      <span className="absolute -top-1 -right-1 flex h-3 w-3">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-75" />
                        <span className="relative inline-flex rounded-full h-3 w-3 bg-[#8B5CF6] border-2 border-white" />
                      </span>
                    </div>

                    <div className="min-w-0 flex-1">
                      <div className="flex items-center justify-between gap-2">
                        <h3 className="font-heading text-lg sm:text-2xl lg:text-[26px] font-extrabold text-white tracking-tight leading-snug">
                          {activeCategory.title}
                        </h3>
                        <span className="tech-count-pill sm:hidden px-2.5 py-1 rounded-full bg-purple-950/60 border border-purple-500/30 text-purple-300 text-[10px] font-bold tracking-wide shrink-0">
                          {activeCategory.countLabel}
                        </span>
                      </div>
                      <p className="text-xs sm:text-sm text-gray-400 mt-1 leading-relaxed max-w-2xl">
                        {activeCategory.subtitle}
                      </p>
                    </div>
                  </div>

                  {/* Right Pill: "6 Core Techs" (sm+) */}
                  <div className="tech-count-pill hidden sm:inline-flex self-center px-4 py-1.5 rounded-full bg-purple-950/60 border border-purple-500/30 text-purple-300 text-xs font-bold tracking-wide shrink-0">
                    {activeCategory.countLabel}
                  </div>
                </div>

                {/* 6 Core Skills 3x2 Responsive Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-5">
                  {activeCategory.skills.map((skill, idx) => (
                    <motion.div
                      key={skill.name}
                      initial={{ opacity: 0, y: 14 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.35, delay: idx * 0.05 }}
                      className="tech-skill-card group rounded-2xl p-4 sm:p-6 bg-[#151a3a]/75 border border-white/10 hover:border-purple-500/40 transition-all duration-300 flex flex-col justify-between"
                    >
                      {/* Top Row: Check Icon + Skill Name + Core Badge */}
                      <div className="flex items-start justify-between gap-3 mb-3.5 sm:mb-6">
                        <div className="flex items-start gap-2.5">
                          <CheckCircle2 className="w-4 h-4 sm:w-[18px] sm:h-[18px] text-[#8B5CF6] mt-0.5 shrink-0" />
                          <h4 className="font-heading text-sm sm:text-[15px] font-bold text-white leading-snug">
                            {skill.name}
                          </h4>
                        </div>

                        <span className="tech-core-badge px-2.5 py-0.5 rounded-md bg-amber-500/15 border border-amber-400/30 text-amber-300 text-[11px] font-mono font-bold tracking-tight shrink-0">
                          {skill.tag}
                        </span>
                      </div>

                      {/* Bottom Row: PROFICIENCY Label + % + Multi-Tone Progress Bar */}
                      <div>
                        <div className="flex items-center justify-between text-[10px] sm:text-[11px] font-bold uppercase tracking-wider mb-2">
                          <span className="text-[#94A3B8]">PROFICIENCY</span>
                          <span className="text-[#8B5CF6] tabular-nums">
                            {skill.proficiency}%
                          </span>
                        </div>

                        <div className="tech-progress-track w-full h-1.5 rounded-full bg-white/10 overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            whileInView={{ width: `${skill.proficiency}%` }}
                            viewport={{ once: true }}
                            transition={{
                              duration: 0.9,
                              delay: 0.1 + idx * 0.06,
                              ease: "easeOut",
                            }}
                            className="h-full rounded-full bg-gradient-to-r from-[#7C3AED] via-[#A855F7] to-[#F59E0B]"
                          />
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}

