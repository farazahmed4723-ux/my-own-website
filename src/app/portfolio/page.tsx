import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Metadata } from "next";
import { portfolioProjects } from "@/data/portfolio";
import {
  ExternalLink,
  ShieldCheck,
  Sparkles,
  ArrowRight,
  Code2,
  CheckCircle2,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Portfolio & Client Case Studies | AI by Faraz",
  description:
    "Explore real client work by Faraz Ahmed, including Elite Class Limo, alongside conceptual AI agent and web architectures.",
};

export default function PortfolioPage() {
  const realProjects = portfolioProjects.filter((p) => p.isRealClient);
  const conceptProjects = portfolioProjects.filter((p) => !p.isRealClient);

  return (
    <div className="pt-28 sm:pt-36 pb-24 px-4 sm:px-6 lg:px-8 bg-[#060813]">
      <div className="max-w-7xl mx-auto">
        {/* Breadcrumb */}
        <div className="mb-6 flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-purple-400">
          <Link href="/" className="hover:text-white transition-colors">
            Home
          </Link>
          <span>/</span>
          <span className="text-gray-300">Portfolio</span>
        </div>

        {/* Header */}
        <div className="max-w-3xl mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-purple-900/30 border border-purple-500/30 text-purple-300 text-xs font-semibold uppercase tracking-wider mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Proven Engineering</span>
          </div>
          <h1 className="font-heading text-4xl sm:text-5xl font-extrabold text-white tracking-tight mb-4">
            Client Work & <span className="gradient-text-purple">Digital Platforms</span>
          </h1>
          <p className="text-base sm:text-lg text-gray-300 leading-relaxed">
            Authentic client websites and specialized engineering deliverables completed by Faraz Ahmed, featuring luxury design aesthetics, mobile responsiveness, and high-performance code.
          </p>
        </div>

        {/* Section 1: Real Client Projects */}
        <div className="mb-20">
          <div className="flex items-center gap-3 mb-8">
            <ShieldCheck className="w-5 h-5 text-emerald-400" />
            <h2 className="font-heading text-2xl font-bold text-white">
              Verified Client Deployments
            </h2>
          </div>

          <div className="space-y-12">
            {realProjects.map((project) => (
              <div
                key={project.id}
                className="rounded-3xl glass-card border border-purple-500/30 overflow-hidden shadow-2xl shadow-purple-950/20"
              >
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-12 p-6 sm:p-10 lg:p-12 items-center">
                  {/* Left: Real Website Screenshot */}
                  <div className="dark-preserve lg:col-span-7 relative rounded-2xl overflow-hidden aspect-[16/10] border border-white/10 bg-black/60 shadow-xl group">
                    <Image
                      src={project.image}
                      alt={`${project.title} Screenshot`}
                      fill
                      className="object-cover group-hover:scale-103 transition-transform duration-700"
                      priority
                    />
                    <div className="absolute top-4 left-4 z-10 flex items-center gap-2">
                      <span className="px-3.5 py-1.5 rounded-full bg-emerald-500/20 border border-emerald-400/40 text-emerald-300 text-xs font-semibold backdrop-blur-md flex items-center gap-1.5">
                        <ShieldCheck className="w-3.5 h-3.5" />
                        <span>{project.statusBadge}</span>
                      </span>
                    </div>
                  </div>

                  {/* Right: Project Information */}
                  <div className="lg:col-span-5 flex flex-col justify-center">
                    <span className="text-xs font-semibold uppercase tracking-wider text-purple-400 mb-2">
                      {project.category}
                    </span>
                    <h3 className="font-heading text-3xl font-extrabold text-white mb-3">
                      {project.title}
                    </h3>

                    <div className="flex flex-col gap-1 text-xs text-gray-400 mb-5 pb-4 border-b border-white/10">
                      <div>Lead Developer: <span className="text-white font-medium">{project.developer}</span></div>
                      <div>Engagement: <span className="text-gray-300">{project.projectType}</span></div>
                    </div>

                    <p className="text-sm text-gray-300 leading-relaxed mb-6">
                      {project.description}
                    </p>

                    {/* Highlights */}
                    <div className="space-y-2 mb-6">
                      {project.highlights.map((item, i) => (
                        <div key={i} className="flex items-center gap-2 text-xs text-gray-300">
                          <CheckCircle2 className="w-3.5 h-3.5 text-purple-400" />
                          <span>{item}</span>
                        </div>
                      ))}
                    </div>

                    {/* Tech Badges */}
                    <div className="flex flex-wrap gap-2 mb-8">
                      {project.technologies.map((tech, i) => (
                        <span
                          key={i}
                          className="px-3 py-1 rounded-md bg-white/5 border border-white/10 text-xs text-gray-300 font-medium"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>

                    {/* Live Button */}
                    {project.liveUrl && (
                      <div>
                        <a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          id="portfolio-visit-live-elite"
                          className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-gradient-to-r from-[#8B5CF6] to-[#A855F7] text-white text-sm font-semibold shadow-[0_0_20px_rgba(139,92,246,0.5)] hover:scale-105 transition-all"
                        >
                          <span>Visit Live Website</span>
                          <ExternalLink className="w-4 h-4" />
                        </a>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Section 2: Clearly Labeled Concept Prototypes */}
        <div className="mb-20">
          <div className="mb-8">
            <span className="text-xs font-semibold uppercase tracking-wider text-purple-400">
              Architectural Explorations
            </span>
            <h2 className="font-heading text-2xl font-bold text-white mt-1">
              Engineering Prototypes & Concepts
            </h2>
            <p className="text-xs sm:text-sm text-gray-400 mt-2 max-w-2xl">
              These entries represent specialized architecture studies, UI explorations, and experimental AI agent pipelines built to test emerging technologies.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {conceptProjects.map((concept) => (
              <div
                key={concept.id}
                className="rounded-2xl p-6 glass-card border border-white/10 flex flex-col justify-between hover:border-purple-500/30 transition-all duration-300"
              >
                <div>
                  <div className="dark-preserve relative rounded-xl overflow-hidden aspect-[16/10] mb-5 border border-white/10 bg-black/40">
                    <Image
                      src={concept.image}
                      alt={concept.title}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute top-3 left-3">
                      <span className="px-3 py-1 rounded-full bg-indigo-950/80 border border-indigo-400/40 text-indigo-300 text-[10px] font-semibold backdrop-blur-md">
                        {concept.statusBadge}
                      </span>
                    </div>
                  </div>

                  <span className="text-[11px] font-semibold uppercase tracking-wider text-purple-400">
                    {concept.category}
                  </span>
                  <h3 className="font-heading text-lg font-bold text-white mt-1 mb-2">
                    {concept.title}
                  </h3>
                  <p className="text-xs text-gray-400 leading-relaxed mb-4">
                    {concept.description}
                  </p>

                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {concept.technologies.map((t, idx) => (
                      <span
                        key={idx}
                        className="text-[10px] px-2 py-0.5 rounded bg-white/5 border border-white/10 text-gray-400 font-medium"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="pt-3 border-t border-white/[0.08] text-[11px] text-gray-400 flex items-center justify-between">
                  <span>Author: {concept.developer}</span>
                  <span className="text-purple-400">Research & Design</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Inquire CTA */}
        <div className="p-8 sm:p-12 rounded-3xl glass-card border border-purple-500/30 text-center">
          <h2 className="font-heading text-2xl sm:text-3xl font-bold text-white mb-3">
            Have a project you want engineered to this standard?
          </h2>
          <p className="text-sm text-gray-300 max-w-xl mx-auto mb-8">
            Tell Faraz about your brand, requirements, and timeline. Get an honest appraisal and transparent roadmap.
          </p>
          <Link
            href="/contact"
            className="px-8 py-3.5 rounded-full bg-gradient-to-r from-[#8B5CF6] to-[#A855F7] text-white font-semibold text-sm shadow-[0_0_20px_rgba(139,92,246,0.5)] hover:scale-105 transition-all inline-flex items-center gap-2"
          >
            <span>Start A Project Inquiry</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
