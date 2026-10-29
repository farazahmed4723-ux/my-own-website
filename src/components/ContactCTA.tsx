"use client";

import React from "react";
import Link from "next/link";
import { MessageCircle, Mail, ArrowRight, Sparkles, CheckCircle2 } from "lucide-react";
import { motion } from "framer-motion";

export default function ContactCTA() {
  return (
    <section className="relative py-20 px-4 sm:px-6 lg:px-8 bg-[#060813] overflow-hidden">
      <div className="max-w-6xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="relative rounded-3xl p-8 sm:p-14 lg:p-16 overflow-hidden border border-purple-500/40 bg-gradient-to-b from-[#141938] via-[#0e122b] to-[#070918] shadow-2xl shadow-purple-950/40 text-center"
        >
          {/* Ambient Lighting Accents */}
          <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-[400px] h-[250px] bg-purple-600/30 blur-[100px] pointer-events-none" />
          <div className="absolute -bottom-24 left-1/2 -translate-x-1/2 w-[400px] h-[250px] bg-indigo-600/20 blur-[100px] pointer-events-none" />

          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-purple-900/40 border border-purple-400/40 text-purple-200 text-xs font-semibold uppercase tracking-wider mb-6">
            <Sparkles className="w-3.5 h-3.5 text-purple-300" />
            <span>Let&apos;s Build Something Intelligent</span>
          </div>

          {/* Heading */}
          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight mb-6 max-w-3xl mx-auto leading-tight">
            Ready To Launch Your Website Or <span className="gradient-text-purple">Deploy Custom AI?</span>
          </h2>

          <p className="text-gray-300 text-base sm:text-lg max-w-2xl mx-auto mb-10 leading-relaxed font-normal">
            Whether you need a high-converting WordPress or Next.js platform, a custom customer-facing AI chatbot, or automated business workflows, Faraz Ahmed is ready to engineer your solution.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 mb-10">
            {/* WhatsApp Link */}
            <a
              href="https://wa.me/14374348789"
              target="_blank"
              rel="noopener noreferrer"
              id="cta-whatsapp-btn"
              className="px-7 py-3.5 rounded-full bg-gradient-to-r from-emerald-600 to-teal-500 hover:from-emerald-500 hover:to-teal-400 text-white font-semibold text-sm sm:text-base flex items-center gap-2.5 shadow-[0_0_25px_rgba(16,185,129,0.4)] hover:shadow-[0_0_35px_rgba(16,185,129,0.7)] transition-all hover:scale-105"
            >
              <MessageCircle className="w-5 h-5" />
              <span>Chat on WhatsApp (+1 437-434-8789)</span>
            </a>

            {/* Inquire Online */}
            <Link
              href="/contact"
              id="cta-inquire-btn"
              className="px-7 py-3.5 rounded-full bg-gradient-to-r from-[#8B5CF6] to-[#A855F7] text-white font-semibold text-sm sm:text-base flex items-center gap-2.5 shadow-[0_0_25px_rgba(139,92,246,0.5)] hover:shadow-[0_0_35px_rgba(139,92,246,0.8)] transition-all hover:scale-105"
            >
              <span>Submit Project Inquiry</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Trust Guarantees */}
          <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-10 text-xs text-gray-400 pt-6 border-t border-white/[0.08]">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>Transparent Fixed Scope & Pricing</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>Fast 24-Hour Inquiry Response</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>Direct Developer Collaboration</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
