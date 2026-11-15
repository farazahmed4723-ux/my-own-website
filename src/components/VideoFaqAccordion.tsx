"use client";

import React, { useState } from "react";
import { ChevronDown } from "lucide-react";
import { VideoFaq } from "@/data/videos";

interface VideoFaqAccordionProps {
  faqs: VideoFaq[];
}

export default function VideoFaqAccordion({ faqs }: VideoFaqAccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (idx: number) => {
    setOpenIndex((prev) => (prev === idx ? null : idx));
  };

  return (
    <div className="space-y-3">
      {faqs.map((faq, idx) => {
        const isOpen = openIndex === idx;

        return (
          <div
            key={idx}
            className={`rounded-2xl border transition-all duration-300 overflow-hidden ${
              isOpen
                ? "bg-purple-50/70 dark:bg-[#0f142e] border-purple-400 dark:border-purple-500/50 shadow-[0_0_25px_rgba(139,92,246,0.15)]"
                : "bg-white dark:bg-white/5 border-slate-200/90 dark:border-white/10 hover:border-purple-300 dark:hover:border-white/20 shadow-sm dark:shadow-none"
            }`}
          >
            <button
              type="button"
              onClick={() => toggle(idx)}
              className="w-full p-5 text-left flex items-center justify-between gap-4 cursor-pointer"
            >
              <h3 className="font-heading text-sm sm:text-base font-bold text-slate-900 dark:text-white">
                {faq.question}
              </h3>
              <div
                className={`w-7 h-7 rounded-full bg-slate-100 dark:bg-white/5 flex items-center justify-center shrink-0 transition-transform duration-300 ${
                  isOpen ? "rotate-180 bg-purple-500/20 text-purple-600 dark:text-purple-300" : "text-slate-500 dark:text-gray-400"
                }`}
              >
                <ChevronDown className="w-4 h-4" />
              </div>
            </button>

            {isOpen && (
              <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-slate-600 dark:text-gray-300 leading-relaxed border-t border-slate-100 dark:border-white/[0.06]">
                {faq.answer}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

