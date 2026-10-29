import React from "react";
import Link from "next/link";
import { Metadata } from "next";
import {
  ShieldCheck,
  CheckCircle2,
  Phone,
  Sparkles,
  Award,
} from "lucide-react";
import TechProficiencySection from "@/components/TechProficiencySection";
import FounderJourneyCard from "@/components/FounderJourneyCard";
import FounderShowcaseCard from "@/components/FounderShowcaseCard";

export const metadata: Metadata = {
  title: "About Faraz Ahmed | Web Developer & AI Solutions Specialist",
  description:
    "Learn about Faraz Ahmed, an independent web developer and AI specialist crafting high-performance WordPress and Next.js websites, intelligent AI chatbots, and automated workflows.",
};

export default function AboutPage() {
  return (
    <div className="pt-28 sm:pt-36 pb-24 px-4 sm:px-6 lg:px-8 bg-[#060813]">
      <div className="max-w-6xl mx-auto">
        {/* Breadcrumb / Top Tag */}
        <div className="mb-6 flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-purple-400">
          <Link href="/" className="hover:text-white transition-colors">
            Home
          </Link>
          <span>/</span>
          <span className="text-gray-300">About Me</span>
        </div>

        {/* Hero Introduction */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center mb-20">
          <div className="lg:col-span-7">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-purple-900/30 border border-purple-500/30 text-purple-300 text-xs font-semibold uppercase tracking-wider mb-4">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Independent Developer & AI Specialist</span>
            </div>
            <h1 className="font-heading text-4xl sm:text-5xl font-extrabold text-white tracking-tight mb-6 leading-tight">
              Crafting High-Performance Websites & <span className="gradient-text-purple">Intelligent Automation</span>
            </h1>
            <p className="text-base sm:text-lg text-gray-300 leading-relaxed mb-6 font-normal">
              I am <strong>Faraz Ahmed</strong>, an independent full-stack web developer and AI solutions specialist. I partner with forward-thinking businesses, founders, and organizations to design, build, and deploy digital platforms that solve real operational bottlenecks.
            </p>
            <p className="text-sm sm:text-base text-gray-400 leading-relaxed mb-8">
              Whether you need an executive web platform that presents your services with authority, an automated lead pipeline that syncs instantly to your CRM, or an intelligent 24/7 AI chatbot trained on your company knowledge, I manage the entire engineering lifecycle with complete transparency and direct communication.
            </p>

            <div className="flex flex-wrap items-center gap-4">
              <Link
                href="/contact"
                className="px-7 py-3.5 rounded-full bg-gradient-to-r from-[#8B5CF6] to-[#A855F7] text-white font-semibold text-sm shadow-[0_0_25px_rgba(139,92,246,0.5)] hover:scale-105 transition-all"
              >
                Start A Conversation
              </Link>
              <a
                href="https://wa.me/14374348789"
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3.5 rounded-full bg-[#111530] border border-white/10 hover:border-purple-500/40 text-gray-200 hover:text-white font-medium text-sm flex items-center gap-2 transition-all"
              >
                <Phone className="w-4 h-4 text-emerald-400" />
                <span>WhatsApp: +1 (437) 434-8789</span>
              </a>
            </div>
          </div>

          {/* Interactive Founder Showcase Bento Card */}
          <div className="lg:col-span-5 relative flex justify-center">
            <FounderShowcaseCard
              subtitle="Owner & Lead Developer, AI by Faraz"
              priority
            />
          </div>
        </div>

        {/* Core Principles */}
        <div className="mb-20">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="font-heading text-3xl font-bold text-white mb-3">
              How I Approach <span className="gradient-text-purple">Every Project</span>
            </h2>
            <p className="text-sm text-gray-400">
              Clear commitments and engineering standards applied to every client engagement.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-7 rounded-2xl glass-card border border-white/10">
              <div className="w-12 h-12 rounded-xl bg-purple-600/20 border border-purple-500/30 flex items-center justify-center text-purple-300 mb-5">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="font-heading text-lg font-bold text-white mb-2">Direct Collaboration</h3>
              <p className="text-xs sm:text-sm text-gray-400 leading-relaxed">
                You work directly with Faraz Ahmed. You don&apos;t deal with junior subcontractors or account managers who relay second-hand messages. Every line of code and design choice is handled with personal accountability.
              </p>
            </div>

            <div className="p-7 rounded-2xl glass-card border border-white/10">
              <div className="w-12 h-12 rounded-xl bg-indigo-600/20 border border-indigo-500/30 flex items-center justify-center text-indigo-300 mb-5">
                <Award className="w-6 h-6" />
              </div>
              <h3 className="font-heading text-lg font-bold text-white mb-2">No Gimmicks, Real Results</h3>
              <p className="text-xs sm:text-sm text-gray-400 leading-relaxed">
                I do not recommend technology just because it is trendy. If WordPress fits your marketing speed, we use WordPress. If a custom Next.js web application is needed for scale, we engineer with Next.js.
              </p>
            </div>

            <div className="p-7 rounded-2xl glass-card border border-white/10">
              <div className="w-12 h-12 rounded-xl bg-violet-600/20 border border-violet-500/30 flex items-center justify-center text-violet-300 mb-5">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <h3 className="font-heading text-lg font-bold text-white mb-2">Long-Term Reliability</h3>
              <p className="text-xs sm:text-sm text-gray-400 leading-relaxed">
                Websites and AI automations shouldn&apos;t break after two weeks. I build with defensive error handling, documented handover steps, and offer ongoing support to keep your operations running smoothly.
              </p>
            </div>
          </div>
        </div>

        {/* Interactive Technical Proficiency & Stack Showcase */}
        <TechProficiencySection embedded />

        {/* Personal Founder Journey & Signature Showcase Card */}
        <FounderJourneyCard embedded />
      </div>
    </div>
  );
}
