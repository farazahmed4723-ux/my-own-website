"use client";

import React from "react";
import Link from "next/link";
import { servicesData } from "@/data/services";
import {
  Cpu,
  Bot,
  Code,
  Zap,
  ShoppingBag,
  Terminal,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";
import { motion } from "framer-motion";

const iconMap: Record<string, React.ElementType> = {
  Cpu,
  Bot,
  Code,
  Zap,
  ShoppingBag,
  Terminal,
};

export default function ServicesPreview() {
  return (
    <section className="relative py-24 px-4 sm:px-6 lg:px-8 overflow-hidden bg-[#070916]" id="services">
      {/* Background radial accent */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-purple-900/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-purple-900/30 border border-purple-500/30 text-purple-300 text-xs font-semibold uppercase tracking-wider mb-4">
            Specialized Capabilities
          </div>
          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight mb-4">
            Services Built For <span className="gradient-text-purple">Real Business Impact</span>
          </h2>
          <p className="text-base text-gray-400 leading-relaxed">
            From modern responsive web platforms to custom autonomous AI assistants and business workflow automation, Faraz Ahmed delivers end-to-end digital engineering.
          </p>
        </div>

        {/* 6 Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {servicesData.map((service, index) => {
            const IconComponent = iconMap[service.icon] || Code;

            return (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group relative"
              >
                <div className="h-full rounded-2xl p-7 glass-card border border-white/10 hover:border-purple-500/40 transition-all duration-300 flex flex-col justify-between hover:shadow-[0_0_35px_rgba(139,92,246,0.25)] hover:-translate-y-1">
                  <div>
                    {/* Top Row: Icon & Badge */}
                    <div className="flex items-center justify-between mb-6">
                      <div className="w-12 h-12 rounded-xl bg-purple-600/20 border border-purple-500/30 flex items-center justify-center text-purple-300 group-hover:scale-110 group-hover:bg-purple-600/30 group-hover:text-purple-200 transition-all duration-300">
                        <IconComponent className="w-6 h-6" />
                      </div>
                      <span className="text-[11px] font-semibold tracking-wide uppercase px-3 py-1 rounded-full bg-white/5 border border-white/10 text-gray-300">
                        {service.badge}
                      </span>
                    </div>

                    {/* Service Title */}
                    <h3 className="font-heading text-xl font-bold text-white mb-2 group-hover:text-purple-300 transition-colors">
                      {service.title}
                    </h3>

                    {/* Tagline / Subtitle */}
                    <p className="text-xs text-purple-400 font-medium mb-3">
                      {service.tagline}
                    </p>

                    {/* Short Description */}
                    <p className="text-sm text-gray-400 leading-relaxed mb-6">
                      {service.shortDescription}
                    </p>

                    {/* Key Features List */}
                    <div className="space-y-2 mb-6 pt-4 border-t border-white/[0.08]">
                      {service.features.slice(0, 3).map((feat, i) => (
                        <div key={i} className="flex items-start gap-2 text-xs text-gray-300">
                          <CheckCircle2 className="w-3.5 h-3.5 text-purple-400 mt-0.5 shrink-0" />
                          <span>{feat}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Footer Action Link */}
                  <div className="pt-4 border-t border-white/[0.06] flex items-center justify-between">
                    <Link
                      href={`/services/${service.slug}`}
                      className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-purple-400 hover:text-purple-300 transition-colors group/link"
                    >
                      <span>Explore Service Details</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover/link:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* View All Services Bottom Banner */}
        <div className="mt-14 text-center">
          <Link
            href="/services"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-[#121630] border border-purple-500/30 text-white text-sm font-semibold hover:bg-[#1a2046] hover:border-purple-400/60 transition-all shadow-lg"
          >
            <span>Compare All 6 Service Offerings & Tech Specs</span>
            <ArrowRight className="w-4 h-4 text-purple-400" />
          </Link>
        </div>
      </div>
    </section>
  );
}
