import React from "react";
import Link from "next/link";
import { Metadata } from "next";
import { servicesData } from "@/data/services";
import {
  Cpu,
  Bot,
  Code,
  Zap,
  ShoppingBag,
  Terminal,
  Globe,
  Layers,
  Film,
  ArrowRight,
  CheckCircle2,
  Sparkles,
} from "lucide-react";

import { buildBreadcrumbJsonLd, buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "Web & AI Development Services Toronto",
  description:
    "Explore website development, Next.js, WordPress, Shopify, AI chatbots and automation services in Toronto & the GTA. Contact Faraz for a custom quote.",
  path: "/services",
  keywords: [
    "Web Development Services",
    "Custom AI Chatbot Development",
    "Business Process Automation Services",
    "Shopify Store Development",
    "Autonomous AI Agent Engineering",
  ],
});

const iconMap: Record<string, React.ElementType> = {
  Cpu,
  Bot,
  Code,
  Zap,
  ShoppingBag,
  Terminal,
  Globe,
  Layers,
  Film,
};

export default function ServicesPage() {
  const breadcrumbJsonLd = buildBreadcrumbJsonLd([
    { name: "Home", path: "/" },
    { name: "Services", path: "/services" },
  ]);

  return (
    <div className="pt-28 sm:pt-36 pb-24 px-4 sm:px-6 lg:px-8 bg-transparent text-slate-900 dark:text-white relative overflow-hidden transition-colors duration-300">
      {/* Ambient Lighting Orbs */}
      <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[900px] h-[450px] bg-gradient-to-b from-purple-500/15 dark:from-purple-600/30 via-sky-400/10 dark:via-sky-500/18 to-transparent rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-1/3 -left-32 w-[550px] h-[550px] bg-indigo-500/10 dark:bg-indigo-600/18 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 -right-32 w-[600px] h-[600px] bg-purple-500/10 dark:bg-purple-600/18 rounded-full blur-[140px] pointer-events-none" />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <div className="max-w-7xl mx-auto">
        {/* Breadcrumb */}
        <div className="mb-6 flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-purple-600 dark:text-purple-400">
          <Link href="/" className="hover:text-purple-800 dark:hover:text-white transition-colors">
            Home
          </Link>
          <span>/</span>
          <span className="text-slate-500 dark:text-gray-300">Services</span>
        </div>

        {/* Header */}
        <div className="max-w-3xl mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-purple-100 dark:bg-purple-900/30 border border-purple-300 dark:border-purple-500/30 text-purple-700 dark:text-purple-300 text-xs font-semibold uppercase tracking-wider mb-4 shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-purple-600 dark:text-purple-300" />
            <span>Digital Engineering Solutions</span>
          </div>
          <h1 className="font-heading text-4xl sm:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-4">
            Intelligent Services Designed For <span className="gradient-text-purple">Growth & Automation</span>
          </h1>
          <p className="text-base sm:text-lg text-slate-600 dark:text-gray-300 leading-relaxed">
            Faraz Ahmed provides end-to-end web engineering, custom AI integrations, and process automation. Review the 6 core service offerings below or click into any discipline for a detailed walkthrough.
          </p>
        </div>

        {/* All 6 Services Detailed Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          {servicesData.map((service) => {
            const Icon = iconMap[service.icon] || Code;

            return (
              <div
                key={service.id}
                className="rounded-2xl p-7 bg-white dark:bg-[#0f142e] border border-slate-200/90 dark:border-white/10 hover:border-purple-500/40 transition-all duration-300 flex flex-col justify-between shadow-sm dark:shadow-none hover:shadow-[0_0_35px_rgba(139,92,246,0.25)] hover:-translate-y-1"
              >
                <div>
                  <div className="flex items-center justify-between mb-5">
                    <div className="w-12 h-12 rounded-xl bg-purple-100 dark:bg-purple-600/20 border border-purple-300 dark:border-purple-500/30 flex items-center justify-center text-purple-600 dark:text-purple-300">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-[11px] font-semibold uppercase px-3 py-1 rounded-full bg-slate-100 dark:bg-white/5 border border-slate-200/90 dark:border-white/10 text-slate-700 dark:text-gray-300">
                      {service.badge}
                    </span>
                  </div>

                  <h2 className="font-heading text-2xl font-bold text-slate-900 dark:text-white mb-2">
                    {service.title}
                  </h2>
                  <p className="text-xs text-purple-600 dark:text-purple-400 font-medium mb-4">
                    {service.tagline}
                  </p>
                  <p className="text-sm text-slate-600 dark:text-gray-400 leading-relaxed mb-6">
                    {service.shortDescription}
                  </p>

                  {/* Highlights */}
                  <div className="space-y-2 mb-6 pt-4 border-t border-slate-100 dark:border-white/[0.08]">
                    {service.features.slice(0, 4).map((f, i) => (
                      <div key={i} className="flex items-start gap-2 text-xs text-slate-700 dark:text-gray-300">
                        <CheckCircle2 className="w-3.5 h-3.5 text-purple-600 dark:text-purple-400 mt-0.5 shrink-0" />
                        <span>{f}</span>
                      </div>
                    ))}
                  </div>

                  {/* Tech stack tags */}
                  <div className="flex flex-wrap gap-1.5 mb-6">
                    {service.technologies.slice(0, 4).map((t, i) => (
                      <span
                        key={i}
                        className="text-[10px] px-2.5 py-1 rounded-md bg-slate-100 dark:bg-white/5 border border-slate-200/80 dark:border-white/10 text-slate-600 dark:text-gray-400 font-medium"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-100 dark:border-white/[0.08] flex items-center justify-between">
                  <Link
                    href={service.slug === "video-editing" ? "/video-editing" : `/services/${service.slug}`}
                    className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300 transition-colors"
                  >
                    <span>{service.slug === "video-editing" ? "Watch Video Showcase" : "View Full Service Page"}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                  <Link
                    href={service.slug === "video-editing" ? "/video-editing#packages" : `/contact?service=${service.slug}`}
                    className="text-[11px] font-medium text-slate-500 dark:text-gray-400 hover:text-slate-900 dark:hover:text-white transition-colors"
                  >
                    {service.slug === "video-editing" ? "View Packages" : "Inquire Now"}
                  </Link>
                </div>
              </div>
            );
          })}
        </div>

        {/* Custom Project Callout */}
        <div className="p-8 sm:p-12 rounded-3xl bg-white dark:bg-[#0f142e] border border-purple-200 dark:border-purple-500/30 text-center shadow-md dark:shadow-none">
          <h2 className="font-heading text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white mb-3">
            Need a combination of multiple services?
          </h2>
          <p className="text-sm text-slate-600 dark:text-gray-300 max-w-xl mx-auto mb-8">
            Most client projects blend website development with custom AI chatbots and lead automation pipelines. Tell Faraz about your goals to receive a tailored project blueprint.
          </p>
          <Link
            href="/contact"
            className="px-8 py-3.5 rounded-full bg-gradient-to-r from-[#8B5CF6] to-[#A855F7] text-white font-semibold text-sm shadow-[0_0_20px_rgba(139,92,246,0.5)] hover:scale-105 transition-all inline-flex items-center gap-2"
          >
            <span>Request A Custom Project Consultation</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
