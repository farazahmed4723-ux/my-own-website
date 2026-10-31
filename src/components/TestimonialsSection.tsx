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
} from "lucide-react";
import { verifiedReviewsData, VerifiedReview } from "@/data/reviews";
import { ScrollReveal, StaggerGrid, StaggerItem } from "@/components/ScrollMotion";

export default function TestimonialsSection() {
  const [reviews, setReviews] = useState<VerifiedReview[]>(verifiedReviewsData);

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
      className="relative py-24 sm:py-32 px-4 sm:px-6 lg:px-8 bg-[#070711] overflow-hidden"
      id="testimonials"
    >
      {/* Ambient background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[450px] rounded-full bg-purple-950/20 blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <ScrollReveal variant="pop-up">
          <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#121634]/80 border border-purple-500/30 text-purple-300 text-xs font-semibold uppercase tracking-wider mb-4 shadow-[0_0_15px_rgba(139,92,246,0.2)]">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Verified Client Feedback</span>
            </div>
            <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
              Client Reviews &{" "}
              <span className="bg-gradient-to-r from-[#A855F7] via-[#8B5CF6] to-[#C084FC] bg-clip-text text-transparent">
                Endorsements
              </span>
            </h2>
            <p className="text-[#94A3B8] text-xs sm:text-base mt-3.5 sm:mt-4 leading-relaxed">
              Real outcomes from real collaboration. Here is what founders, dispatchers, and
              business leaders say about partnering with Faraz Ahmed.
            </p>

            {/* Compact Trust Summary Strip with Client Avatars & Write a Review CTA */}
            <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
              <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-[#111532]/90 border border-white/10 shadow-md">
                <div className="flex items-center -space-x-2.5">
                  <div className="relative w-7 h-7 rounded-full overflow-hidden border-2 border-white dark:border-[#0e122b]">
                    <Image
                      src="/images/reviews/saima-dp.webp"
                      alt="Saima"
                      fill
                      sizes="28px"
                      className="object-cover"
                      unoptimized
                    />
                  </div>
                  <div className="relative w-7 h-7 rounded-full overflow-hidden border-2 border-white dark:border-[#0e122b]">
                    <Image
                      src="/images/reviews/uzair-dp.webp"
                      alt="Uzair Ahmed"
                      fill
                      sizes="28px"
                      className="object-cover"
                      unoptimized
                    />
                  </div>
                  <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-[#7C3AED] to-[#A855F7] border-2 border-white dark:border-[#0e122b] flex items-center justify-center text-[9px] font-bold text-white">
                    EC
                  </div>
                  <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-[#8B5CF6] to-[#F59E0B] border-2 border-white dark:border-[#0e122b] flex items-center justify-center text-[9px] font-bold text-white">
                    STN
                  </div>
                </div>
                <div className="flex items-center gap-1.5 text-left">
                  <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400 shrink-0" />
                  <span className="text-[11px] sm:text-xs font-bold text-white">
                    5.0 Rated
                  </span>
                  <span className="text-[11px] text-[#94A3B8]">
                    &bull; 100% Client Satisfaction
                  </span>
                </div>
              </div>

              <a
                href="#write-review"
                id="header-write-review-cta"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-600/30 hover:bg-purple-600/50 border border-purple-400/40 text-purple-200 hover:text-white text-xs font-semibold backdrop-blur-md transition-all shadow-[0_0_15px_rgba(168,85,247,0.25)] hover:scale-105"
              >
                <MessageSquarePlus className="w-3.5 h-3.5 text-purple-300" />
                <span>Write a Review</span>
              </a>
            </div>
          </div>
        </ScrollReveal>

        {/* 2x2 Bento Grid of Client Reviews with 3D Stagger Reveal */}
        <StaggerGrid className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 lg:gap-8" staggerDelay={0.12}>
          {reviews.map((item) => (
            <StaggerItem key={item.id}>
              <div className="h-full group relative rounded-2xl sm:rounded-3xl bg-gradient-to-b from-[#11142e]/90 to-[#0c0f24]/90 border border-white/10 hover:border-purple-500/40 p-5 sm:p-8 shadow-2xl backdrop-blur-2xl flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 hover:shadow-purple-950/30">
                <div>
                  {/* Top Row: Stars & Project Type Tag */}
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-4 sm:mb-6">
                    <div className="flex items-center gap-1">
                      {[...Array(item.rating || 5)].map((_, i) => (
                        <Star
                          key={i}
                          className="w-3.5 h-3.5 sm:w-[18px] sm:h-[18px] fill-amber-400 text-amber-400 drop-shadow-[0_0_6px_rgba(245,158,11,0.45)]"
                        />
                      ))}
                      <span className="text-xs font-bold text-white ml-1">
                        {(item.rating || 5).toFixed(1)}
                      </span>
                    </div>

                    <span className="text-[10px] sm:text-[11px] font-semibold px-2.5 sm:px-3 py-1 rounded-full bg-purple-900/30 border border-purple-500/25 text-purple-300">
                      {item.projectType}
                    </span>
                  </div>

                  {/* Quote Body */}
                  <div className="relative mb-4 sm:mb-6">
                    <Quote className="w-7 h-7 sm:w-8 sm:h-8 text-purple-500/20 absolute -top-2.5 -left-2 pointer-events-none" />
                    <p className="text-[13.5px] sm:text-base text-gray-200 leading-relaxed italic relative z-10">
                      &ldquo;{item.quote}&rdquo;
                    </p>
                  </div>
                </div>

                <div>
                  {/* Key Highlight Pill */}
                  <div className="inline-flex items-center gap-2 px-3 sm:px-3.5 py-1.5 rounded-full bg-emerald-950/40 border border-emerald-500/30 text-emerald-300 text-[11px] sm:text-xs font-medium mb-4 sm:mb-6">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse shrink-0" />
                    <span>{item.highlight}</span>
                  </div>

                  {/* Author Info with DP Avatar */}
                  <div className="pt-5 border-t border-white/10 flex flex-wrap items-center justify-between gap-4">
                    <div className="flex items-center gap-3.5 min-w-0">
                      {/* Circular Avatar with Gradient Ring & Verified Badge */}
                      <div className="relative shrink-0">
                        <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full p-[2px] bg-gradient-to-tr from-[#8B5CF6] via-[#A855F7] to-[#F59E0B] shadow-md">
                          {item.avatar ? (
                            <div className="relative w-full h-full rounded-full overflow-hidden bg-[#0e122b]">
                              <Image
                                src={item.avatar}
                                alt={`${item.clientName} - Verified Client`}
                                fill
                                sizes="56px"
                                className="object-cover"
                                unoptimized
                              />
                            </div>
                          ) : (
                            <div className="w-full h-full rounded-full bg-gradient-to-tr from-[#7C3AED] to-[#A855F7] flex items-center justify-center text-white font-heading font-bold text-sm tracking-wider">
                              {item.initials || item.clientName.substring(0, 2).toUpperCase()}
                            </div>
                          )}
                        </div>

                        {item.verified && (
                          <span
                            title="Verified Client"
                            className="absolute -bottom-0.5 -right-0.5 w-5 h-5 rounded-full bg-gradient-to-tr from-emerald-500 to-emerald-400 border-2 border-white dark:border-[#0e122b] flex items-center justify-center text-white shadow-sm"
                          >
                            <Check className="w-2.5 h-2.5 text-white stroke-[3]" />
                          </span>
                        )}
                      </div>

                      <div className="min-w-0">
                        <h3 className="font-heading font-bold text-white text-base sm:text-[17px] truncate">
                          {item.clientName}
                        </h3>
                        <p className="text-xs text-[#94A3B8] truncate">
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
                        className="inline-flex items-center gap-1.5 text-xs font-semibold text-purple-300 hover:text-purple-200 transition-colors bg-[#181d3f]/60 px-3.5 py-2 rounded-full border border-purple-500/20 shrink-0 hover:bg-[#181d3f]"
                      >
                        <span>Live Site</span>
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </StaggerItem>
          ))}
        </StaggerGrid>

        {/* Quick Review Prompt banner at bottom */}
        <ScrollReveal variant="zoom-pop" delay={0.2}>
          <div className="mt-12 text-center p-6 rounded-2xl glass-card border border-purple-500/20 max-w-2xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-left">
              <h4 className="text-sm font-bold text-white flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-purple-400" />
                <span>Worked with Faraz Ahmed on a project?</span>
              </h4>
              <p className="text-xs text-gray-400 mt-1">
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
