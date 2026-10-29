"use client";

import React, { useState } from "react";
import Link from "next/link";
import { faqsData } from "@/data/faqs";
import { ChevronDown, HelpCircle, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleIndex = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="relative py-24 px-4 sm:px-6 lg:px-8 bg-[#070918] overflow-hidden" id="faq">
      {/* Background radial glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[650px] bg-purple-900/10 rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-4xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-purple-900/30 border border-purple-500/30 text-purple-300 text-xs font-semibold uppercase tracking-wider mb-4">
            Answers & Clarity
          </div>
          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight mb-4">
            Frequently Asked <span className="gradient-text-purple">Questions</span>
          </h2>
          <p className="text-gray-400 text-sm sm:text-base leading-relaxed max-w-xl mx-auto">
            Everything you need to know about working with Faraz Ahmed on your website, custom AI chatbots, or automation projects.
          </p>
        </div>

        {/* Accordion List */}
        <div className="space-y-4">
          {faqsData.map((faq, index) => {
            const isOpen = openIndex === index;

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.08 }}
                className={`rounded-2xl border transition-all duration-300 overflow-hidden ${
                  isOpen
                    ? "bg-[#111532]/90 border-purple-500/40 shadow-xl shadow-purple-950/20"
                    : "bg-[#0b0e22]/60 border-white/[0.08] hover:border-white/20"
                }`}
              >
                <button
                  onClick={() => toggleIndex(index)}
                  className="w-full p-6 text-left flex items-center justify-between gap-4 focus:outline-none"
                  aria-expanded={isOpen}
                  id={`faq-toggle-${index}`}
                >
                  <div className="flex items-center gap-3.5">
                    <span className="w-8 h-8 rounded-lg bg-purple-600/20 border border-purple-500/30 flex items-center justify-center text-purple-300 shrink-0">
                      <HelpCircle className="w-4 h-4" />
                    </span>
                    <span className="font-heading font-bold text-base sm:text-lg text-white">
                      {faq.question}
                    </span>
                  </div>

                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center bg-white/5 shrink-0 transition-transform duration-300 ${
                      isOpen ? "rotate-180 bg-purple-600/30 text-purple-200" : "text-gray-400"
                    }`}
                  >
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                    >
                      <div className="px-6 pb-6 pt-1 text-sm text-gray-300 leading-relaxed border-t border-white/[0.04]">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>

        {/* Support CTA Callout */}
        <div className="mt-12 p-6 rounded-2xl glass-card border border-white/10 text-center flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-left">
            <h4 className="font-heading font-bold text-base text-white">Have a specific question not covered here?</h4>
            <p className="text-xs text-gray-400 mt-1">Get an honest, transparent answer directly from Faraz.</p>
          </div>
          <Link
            href="/contact"
            className="px-6 py-2.5 rounded-full bg-gradient-to-r from-[#8B5CF6] to-[#A855F7] text-white text-xs font-semibold hover:scale-105 transition-all shadow-md shrink-0"
          >
            Ask Faraz Directly
          </Link>
        </div>
      </div>
    </section>
  );
}
