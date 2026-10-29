import React from "react";
import Link from "next/link";
import { Metadata } from "next";
import {
  Search,
  FileSpreadsheet,
  Palette,
  Code2,
  CheckCircle,
  Rocket,
  ArrowRight,
  Sparkles,
  ShieldCheck,
  Clock,
  CheckCircle2,
} from "lucide-react";

export const metadata: Metadata = {
  title: "My Development Process | AI by Faraz",
  description:
    "Explore the 6-stage engineering and design lifecycle Faraz Ahmed uses to deliver websites and AI solutions: Discovery, Planning, Design, Development, Testing, and Launch.",
};

const detailedSteps = [
  {
    step: "01",
    title: "Discovery & Strategy",
    icon: Search,
    duration: "Days 1 - 3",
    deliverables: ["Project Scope Document", "Technical Requirements", "Competitor & Market Research"],
    desc: "We begin with an in-depth discovery session to uncover your core business objectives, audience expectations, brand identity, and technical parameters. We clarify whether WordPress or Next.js best fits your goals, what AI chatbots or automations will deliver tangible ROI, and define clear success metrics.",
  },
  {
    step: "02",
    title: "Architecture & Planning",
    icon: FileSpreadsheet,
    duration: "Days 4 - 6",
    deliverables: ["Site Map & Hierarchy", "Database Schema Plan", "API & Automation Diagram", "Timeline Milestones"],
    desc: "Before writing a line of code, we outline the exact architecture. This includes mapping URL routes, database schemas, third-party API integration points (Stripe, OpenAI, CRM webhooks), and data flows to ensure zero scope creep and smooth delivery.",
  },
  {
    step: "03",
    title: "UI/UX & Design System",
    icon: Palette,
    duration: "Days 7 - 10",
    deliverables: ["Design System & Tokens", "Component Layouts", "Dark/Light Contrast Checks", "Interactive Micro-Interactions"],
    desc: "Crafting a visual experience that captures your brand's unique presence. For AI by Faraz projects, we implement futuristic dark surfaces, glowing violet/purple lighting, glassmorphism card elevation, and responsive typography that feels premium across mobile and 4K displays.",
  },
  {
    step: "04",
    title: "Full-Stack Development",
    icon: Code2,
    duration: "Days 11 - 18",
    deliverables: ["Production-Ready Source Code", "SSR/SSG Optimization", "AI Chatbot Knowledge Wiring", "Webhook Endpoints"],
    desc: "Writing clean, modular, and maintainable TypeScript and Next.js / WordPress code. We implement semantic HTML, Framer Motion fluid animations, secure server-side form handlers, and high-performance asset loading.",
  },
  {
    step: "05",
    title: "Rigorous Testing & QA",
    icon: CheckCircle,
    duration: "Days 19 - 22",
    deliverables: ["Cross-Browser Audit (Chrome, Safari, Edge)", "Mobile Breakpoint Check (320px - 1440px)", "Lighthouse Speed Report", "Security Verification"],
    desc: "Every button, link, form submission, and responsive breakpoint is manually and systematically verified in Google Chrome and mobile emulators. We check Core Web Vitals, JSON-LD Schema structured data, and ensure zero console errors.",
  },
  {
    step: "06",
    title: "Launch & Production Handover",
    icon: Rocket,
    duration: "Days 23 - 25",
    deliverables: ["Production Deployment", "Custom Domain & SSL Setup", "Search Console Indexing", "Handover Documentation"],
    desc: "Live deployment on rock-solid cloud infrastructure. We configure custom domain DNS, SSL certificates, sitemaps, robots.txt, and provide full documentation so you have complete ownership of your digital asset.",
  },
];

export default function ProcessPage() {
  return (
    <div className="pt-28 sm:pt-36 pb-24 px-4 sm:px-6 lg:px-8 bg-[#060813]">
      <div className="max-w-5xl mx-auto">
        {/* Breadcrumb */}
        <div className="mb-6 flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-purple-400">
          <Link href="/" className="hover:text-white transition-colors">
            Home
          </Link>
          <span>/</span>
          <span className="text-gray-300">Development Process</span>
        </div>

        {/* Header */}
        <div className="max-w-3xl mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-purple-900/30 border border-purple-500/30 text-purple-300 text-xs font-semibold uppercase tracking-wider mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Methodical Execution</span>
          </div>
          <h1 className="font-heading text-4xl sm:text-5xl font-extrabold text-white tracking-tight mb-4">
            My 6-Stage <span className="gradient-text-purple">Development Process</span>
          </h1>
          <p className="text-base sm:text-lg text-gray-300 leading-relaxed">
            Delivering exceptional websites and AI solutions requires discipline, transparency, and clear milestones. Here is the exact roadmap applied to every project Faraz Ahmed builds.
          </p>
        </div>

        {/* Detailed Timeline Steps */}
        <div className="space-y-8 mb-20">
          {detailedSteps.map((step) => {
            const Icon = step.icon;

            return (
              <div
                key={step.step}
                className="rounded-3xl p-8 sm:p-10 glass-card border border-white/10 hover:border-purple-500/40 transition-all duration-300 relative overflow-hidden"
              >
                {/* Step Number Background Accent */}
                <span className="absolute top-6 right-8 font-heading text-5xl font-black text-white/5 pointer-events-none">
                  {step.step}
                </span>

                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-purple-600/20 border border-purple-500/30 flex items-center justify-center text-purple-300">
                      <Icon className="w-6 h-6" />
                    </div>
                    <div>
                      <span className="text-xs font-bold text-purple-400 uppercase tracking-wider">
                        STAGE {step.step}
                      </span>
                      <h2 className="font-heading text-2xl font-bold text-white">
                        {step.title}
                      </h2>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs text-gray-300 font-medium w-fit">
                    <Clock className="w-3.5 h-3.5 text-purple-400" />
                    <span>Estimated: {step.duration}</span>
                  </div>
                </div>

                <p className="text-sm sm:text-base text-gray-300 leading-relaxed mb-6">
                  {step.desc}
                </p>

                {/* Deliverables Checklist */}
                <div className="pt-6 border-t border-white/[0.08]">
                  <h4 className="text-xs font-semibold uppercase tracking-wider text-purple-400 mb-3">
                    Key Deliverables:
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {step.deliverables.map((item, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-xs text-gray-300">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Client Guarantee & Transparency */}
        <div className="p-8 sm:p-12 rounded-3xl glass-card border border-purple-500/30 text-center relative overflow-hidden">
          <div className="w-14 h-14 rounded-2xl bg-emerald-600/20 border border-emerald-500/40 flex items-center justify-center text-emerald-300 mx-auto mb-6">
            <ShieldCheck className="w-7 h-7" />
          </div>
          <h2 className="font-heading text-2xl sm:text-3xl font-extrabold text-white mb-3">
            Predictable Timelines & Fixed Scope
          </h2>
          <p className="text-sm text-gray-300 max-w-xl mx-auto mb-8 leading-relaxed">
            You will always know what phase your project is in, what is being developed, and when to expect the next demonstration. Ready to discuss your project?
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/contact"
              className="px-8 py-3.5 rounded-full bg-gradient-to-r from-[#8B5CF6] to-[#A855F7] text-white font-semibold text-sm shadow-[0_0_20px_rgba(139,92,246,0.5)] hover:scale-105 transition-all"
            >
              Start Your Project Discovery
            </Link>
            <Link
              href="/portfolio"
              className="px-7 py-3.5 rounded-full bg-white/5 border border-white/10 text-gray-300 hover:text-white font-medium text-sm transition-colors"
            >
              Review Client Case Studies
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
