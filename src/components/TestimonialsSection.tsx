"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import {
  Star,
  ShieldCheck,
  Quote,
  ExternalLink,
  Check,
  MessageSquarePlus,
  Sparkles,
  Lock,
  MessageCircle,
} from "lucide-react";
import { verifiedReviewsData, VerifiedReview } from "@/data/reviews";
import { ScrollReveal, StaggerGrid, StaggerItem } from "@/components/ScrollMotion";

export default function TestimonialsSection() {
  const [reviews, setReviews] = useState<VerifiedReview[]>(verifiedReviewsData);
  const [activeTab, setActiveTab] = useState<"written" | "proofs">("written");

  useEffect(() => {
    let active = true;
    fetch("/api/reviews")
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (active && data?.success && Array.isArray(data.reviews) && data.reviews.length > 0) {
          setReviews(data.reviews);
        }
      })
      .catch(() => {
        // Fallback smoothly to verified static reviews
      });

    const handleNewReview = (e: Event) => {
      const customEvent = e as CustomEvent<VerifiedReview>;
      if (customEvent.detail) {
        setReviews((prev) => [
          customEvent.detail,
          ...prev.filter((r) => r.id !== customEvent.detail.id),
        ]);
      }
    };

    window.addEventListener("faraz-review-added", handleNewReview);

    return () => {
      active = false;
      window.removeEventListener("faraz-review-added", handleNewReview);
    };
  }, []);

  return (
    <section
      className="relative py-16 sm:py-28 px-4 sm:px-6 lg:px-8 bg-[#070711] overflow-hidden"
      id="testimonials"
    >
      {/* Ambient background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[450px] rounded-full bg-purple-950/20 blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Mobile Swipe Hint (Matches Pic 4) */}
        <div className="sm:hidden text-center text-xs font-semibold text-gray-400 mb-3 flex items-center justify-center gap-1.5 animate-pulse">
          <span>&larr; Swipe to explore client reviews &rarr;</span>
        </div>

        {/* Section Header (Matches Pic 4 Exactly 1:1) */}
        <ScrollReveal variant="pop-up">
          <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#121634]/80 border border-purple-500/30 text-purple-300 text-[11px] sm:text-xs font-semibold uppercase tracking-wider mb-4 shadow-[0_0_15px_rgba(139,92,246,0.2)]">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>100% VERIFIED SOCIAL PROOF</span>
            </div>

            <h2 className="font-heading text-2xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight mb-3">
              Client Reviews &amp;{" "}
              <span className="bg-gradient-to-r from-[#A855F7] via-[#8B5CF6] to-[#C084FC] bg-clip-text text-transparent">
                Real Chat Proofs
              </span>
            </h2>

            <p className="text-[#94A3B8] text-xs sm:text-base leading-relaxed max-w-2xl mx-auto mb-6">
              Transparent feedback, 10/10 client ratings, and real WhatsApp payment &amp; project completion receipts.
            </p>

            {/* Two Social Proof Tabs (Matches Pic 4) */}
            <div className="inline-flex items-center p-1.5 rounded-2xl bg-[#0f142e] border border-white/10 shadow-lg gap-2">
              <button
                type="button"
                onClick={() => setActiveTab("written")}
                className={`px-4 sm:px-6 py-2.5 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 transition-all cursor-pointer ${
                  activeTab === "written"
                    ? "bg-gradient-to-r from-[#1d4ed8] via-[#2563eb] to-[#3b82f6] text-white shadow-md shadow-blue-600/30"
                    : "text-gray-400 hover:text-white"
                }`}
              >
                <Quote className="w-3.5 h-3.5" />
                <span>Written Reviews</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab("proofs")}
                className={`px-4 sm:px-6 py-2.5 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 transition-all cursor-pointer ${
                  activeTab === "proofs"
                    ? "bg-gradient-to-r from-[#1d4ed8] via-[#2563eb] to-[#3b82f6] text-white shadow-md shadow-blue-600/30"
                    : "text-gray-400 hover:text-white"
                }`}
              >
                <Lock className="w-3.5 h-3.5 text-amber-400" />
                <span>Verified WhatsApp &amp; Payment Proofs</span>
                <span className="px-2 py-0.5 rounded-md bg-amber-500/20 text-amber-300 text-[10px] font-mono font-bold">
                  LOCKED
                </span>
              </button>
            </div>
          </div>
        </ScrollReveal>

        {/* Tab 1: Written Reviews (Horizontal Swipe Carousel on Mobile, Grid on Desktop) */}
        {activeTab === "written" && (
          <div className="flex sm:grid sm:grid-cols-2 gap-4 sm:gap-6 lg:gap-8 overflow-x-auto snap-x snap-mandatory pb-4 sm:pb-0 no-scrollbar">
            {reviews.map((item) => (
              <div
                key={item.id}
                className="min-w-[85vw] sm:min-w-0 snap-center h-full group relative rounded-2xl sm:rounded-3xl bg-gradient-to-b from-[#11142e]/90 to-[#0c0f24]/90 border border-white/10 hover:border-purple-500/40 p-5 sm:p-8 shadow-2xl backdrop-blur-2xl flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 hover:shadow-purple-950/30"
              >
                <div>
                  {/* Top Row: '//' Symbol (Pic 4) + Stars + Project Type */}
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-4 sm:mb-6">
                    <div className="flex items-center gap-2">
                      <span className="text-amber-500 font-mono font-extrabold text-lg select-none">
                        {"//"}
                      </span>
                      <div className="flex items-center gap-0.5">
                        {[...Array(item.rating || 5)].map((_, i) => (
                          <Star
                            key={i}
                            className="w-3.5 h-3.5 sm:w-4 sm:h-4 fill-amber-400 text-amber-400 drop-shadow-[0_0_6px_rgba(245,158,11,0.45)]"
                          />
                        ))}
                      </div>
                    </div>

                    <span className="text-[10px] sm:text-[11px] font-semibold px-2.5 sm:px-3 py-1 rounded-full bg-purple-900/30 border border-purple-500/25 text-purple-300">
                      {item.projectType}
                    </span>
                  </div>

                  {/* Quote Body */}
                  <div className="relative mb-4 sm:mb-6">
                    <p className="text-[13px] sm:text-base text-gray-200 leading-relaxed italic relative z-10">
                      &ldquo;{item.quote}&rdquo;
                    </p>
                  </div>
                </div>

                <div>
                  {/* Key Highlight Pill */}
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-950/40 border border-emerald-500/30 text-emerald-300 text-[10.5px] sm:text-xs font-medium mb-4 sm:mb-6">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse shrink-0" />
                    <span>{item.highlight}</span>
                  </div>

                  {/* Author Info with DP Avatar (Matches Pic 4) */}
                  <div className="pt-4 border-t border-white/10 flex flex-wrap items-center justify-between gap-3">
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="relative shrink-0">
                        <div className="w-11 h-11 sm:w-13 sm:h-13 rounded-full p-[2px] bg-gradient-to-tr from-[#8B5CF6] via-[#A855F7] to-[#F59E0B] shadow-md">
                          {item.avatar ? (
                            <div className="relative w-full h-full rounded-full overflow-hidden bg-[#0e122b]">
                              <Image
                                src={item.avatar}
                                alt={`${item.clientName} - Verified Client`}
                                fill
                                sizes="52px"
                                className="object-cover"
                                unoptimized
                              />
                            </div>
                          ) : (
                            <div className="w-full h-full rounded-full bg-gradient-to-tr from-[#7C3AED] to-[#A855F7] flex items-center justify-center text-white font-heading font-bold text-xs tracking-wider">
                              {item.initials || item.clientName.substring(0, 2).toUpperCase()}
                            </div>
                          )}
                        </div>

                        {item.verified && (
                          <span
                            title="Verified Client"
                            className="absolute -bottom-0.5 -right-0.5 w-4 h-4 rounded-full bg-gradient-to-tr from-emerald-500 to-emerald-400 border-2 border-white dark:border-[#0e122b] flex items-center justify-center text-white shadow-sm"
                          >
                            <Check className="w-2.5 h-2.5 text-white stroke-[3]" />
                          </span>
                        )}
                      </div>

                      <div className="min-w-0">
                        <h3 className="font-heading font-bold text-white text-sm sm:text-base truncate">
                          {item.clientName}
                        </h3>
                        <p className="text-[11px] sm:text-xs text-[#94A3B8] truncate">
                          {item.role} &bull;{" "}
                          <span className="text-purple-300 font-semibold">
                            {item.company}
                          </span>
                        </p>
                      </div>
                    </div>

                    {item.companyUrl && (
                      <a
                        href={item.companyUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-[11px] font-semibold text-purple-300 hover:text-purple-200 transition-colors bg-[#181d3f]/60 px-3 py-1.5 rounded-full border border-purple-500/20 shrink-0"
                      >
                        <span>Live Site</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Tab 2: Verified WhatsApp Chat & Payment Proofs */}
        {activeTab === "proofs" && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {/* Proof Card 1: STN Trucking Ltd. Deliverable */}
            <div className="rounded-2xl p-6 glass-card border border-emerald-500/30 bg-[#0e142e]/90 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <MessageCircle className="w-4 h-4 text-emerald-400" />
                    <span className="text-xs font-bold text-white">STN Trucking Ltd. — Surrey, BC</span>
                  </div>
                  <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 border border-emerald-400/40 text-emerald-300 text-[10px] font-bold">
                    100% Shipped
                  </span>
                </div>
                <p className="text-xs text-gray-300 leading-relaxed mb-4">
                  &ldquo;Faraz, the fleet showcase and instant quote form on infostntrucking.ca are working flawlessly. The drivers and dispatchers are already getting inquiries!&rdquo;
                </p>
              </div>
              <div className="pt-3 border-t border-white/10 flex items-center justify-between text-[11px] text-gray-400">
                <span>Client: STN Trucking Operations</span>
                <a
                  href="https://infostntrucking.ca/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sky-300 font-semibold hover:underline"
                >
                  infostntrucking.ca ↗
                </a>
              </div>
            </div>

            {/* Proof Card 2: Elite Class Limo Vancouver */}
            <div className="rounded-2xl p-6 glass-card border border-purple-500/30 bg-[#0e142e]/90 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <MessageCircle className="w-4 h-4 text-purple-400" />
                    <span className="text-xs font-bold text-white">Elite Class Limo — Vancouver, BC</span>
                  </div>
                  <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 border border-emerald-400/40 text-emerald-300 text-[10px] font-bold">
                    Verified
                  </span>
                </div>
                <p className="text-xs text-gray-300 leading-relaxed mb-4">
                  &ldquo;Faraz delivered our luxury fleet platform on schedule. The dark aesthetic and mobile booking speed increased our weekend VIP bookings noticeably.&rdquo;
                </p>
              </div>
              <div className="pt-3 border-t border-white/10 flex items-center justify-between text-[11px] text-gray-400">
                <span>Client: Executive Chauffeur Team</span>
                <a
                  href="https://eliteclasslimo.ca/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-purple-300 font-semibold hover:underline"
                >
                  eliteclasslimo.ca ↗
                </a>
              </div>
            </div>
          </div>
        )}

        {/* Quick Review Prompt banner at bottom */}
        <ScrollReveal variant="zoom-pop" delay={0.2}>
          <div className="mt-10 sm:mt-12 text-center p-5 sm:p-6 rounded-2xl glass-card border border-purple-500/20 max-w-2xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-left">
              <h4 className="text-xs sm:text-sm font-bold text-white flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-purple-400" />
                <span>Worked with Faraz Ahmed on a project?</span>
              </h4>
              <p className="text-[11px] sm:text-xs text-gray-400 mt-0.5">
                Share your authentic experience and project feedback with prospective clients.
              </p>
            </div>
            <a
              href="#write-review"
              className="px-5 py-2.5 rounded-full bg-gradient-to-r from-[#8B5CF6] to-[#A855F7] text-white text-xs font-semibold shrink-0 shadow-[0_0_15px_rgba(139,92,246,0.4)] hover:scale-105 transition-all"
            >
              Write Review
            </a>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
