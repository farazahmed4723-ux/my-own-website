"use client";

import React, { useState } from "react";
import {
  Star,
  Send,
  CheckCircle2,
  AlertCircle,
  Sparkles,
  MessageSquarePlus,
  Check,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { ScrollReveal } from "@/components/ScrollMotion";
import { VerifiedReview } from "@/data/reviews";

const projectTypeOptions = [
  "Website Development (Next.js / WordPress)",
  "E-Commerce Storefront (Shopify / WooCommerce)",
  "Custom AI Chatbot & Support Assistant",
  "AI Workflow & CRM Automation",
  "Autonomous AI Agent System",
  "Custom Software & Web Application",
];

const ratingLabels: Record<number, string> = {
  5: "5.0 ★ — Exceptional Experience!",
  4: "4.0 ★ — Great Collaboration",
  3: "3.0 ★ — Good Experience",
  2: "2.0 ★ — Fair Experience",
  1: "1.0 ★ — Needs Improvement",
};

export default function CustomerReviewSection() {
  const [rating, setRating] = useState<number>(5);
  const [hoverRating, setHoverRating] = useState<number>(0);
  const [formData, setFormData] = useState({
    clientName: "",
    role: "",
    company: "",
    companyUrl: "",
    projectType: projectTypeOptions[0],
    highlight: "",
    quote: "",
    honeypot: "",
  });

  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [feedbackMsg, setFeedbackMsg] = useState("");
  const [publishedReview, setPublishedReview] = useState<VerifiedReview | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (formData.clientName.trim().length < 2) {
      setStatus("error");
      setFeedbackMsg("Please enter your full name.");
      return;
    }

    if (formData.company.trim().length < 2) {
      setStatus("error");
      setFeedbackMsg("Please enter your company or brand name.");
      return;
    }

    if (formData.quote.trim().length < 15) {
      setStatus("error");
      setFeedbackMsg("Please write at least 15 characters about your experience.");
      return;
    }

    setStatus("submitting");
    setFeedbackMsg("");

    try {
      const res = await fetch("/api/reviews", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          rating,
        }),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        setStatus("success");
        setFeedbackMsg(data.message);
        setPublishedReview(data.review || null);

        // Broadcast to TestimonialsSection so the new review card appears immediately in the grid too!
        if (typeof window !== "undefined" && data.review) {
          window.dispatchEvent(
            new CustomEvent("faraz-review-added", { detail: data.review })
          );
        }

        setFormData({
          clientName: "",
          role: "",
          company: "",
          companyUrl: "",
          projectType: projectTypeOptions[0],
          highlight: "",
          quote: "",
          honeypot: "",
        });
        setRating(5);
      } else {
        setStatus("error");
        setFeedbackMsg(data.error || "Could not submit review. Please try again.");
      }
    } catch {
      setStatus("error");
      setFeedbackMsg("Network error while submitting review. Please try again.");
    }
  };

  const activeStarValue = hoverRating || rating;

  return (
    <section
      id="write-review"
      className="relative py-16 sm:py-24 px-4 sm:px-6 lg:px-8 bg-[#060813] overflow-hidden"
    >
      {/* Ambient Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[420px] rounded-full bg-purple-900/15 blur-[140px] pointer-events-none" />

      <div className="max-w-4xl mx-auto relative z-10">
        <ScrollReveal variant="blur-zoom" className="text-center max-w-2xl mx-auto mb-10 sm:mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-purple-900/30 border border-purple-500/30 text-purple-300 text-xs font-semibold uppercase tracking-wider mb-4">
            <MessageSquarePlus className="w-3.5 h-3.5 text-amber-400" />
            <span>Share Your Feedback</span>
          </div>
          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight mb-3">
            Worked With Faraz?{" "}
            <span className="gradient-text-purple">Write a Review</span>
          </h2>
          <p className="text-gray-400 text-xs sm:text-base leading-relaxed">
            Your feedback helps businesses partner with confidence. Share your project experience and publish your review live!
          </p>
        </ScrollReveal>

        <ScrollReveal variant="zoom-pop">
          <div className="rounded-3xl p-6 sm:p-10 glass-card border border-purple-500/30 bg-gradient-to-b from-[#121633]/95 via-[#0d1026]/95 to-[#080b19]/95 shadow-2xl shadow-purple-950/30">
            {/* Live Success Celebration + Instant Review Card Preview */}
            <AnimatePresence>
              {status === "success" && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9, y: 16 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.92 }}
                  transition={{ type: "spring", stiffness: 250, damping: 20 }}
                  className="mb-8 p-5 sm:p-6 rounded-2xl bg-emerald-950/40 border border-emerald-500/40 text-emerald-200"
                >
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                    <div className="flex-1">
                      <strong className="block text-sm sm:text-base font-bold text-white mb-1">
                        Review Published Live!
                      </strong>
                      <p className="text-xs sm:text-sm text-emerald-200/90">
                        {feedbackMsg}
                      </p>

                      {publishedReview && (
                        <div className="mt-4 p-4 rounded-xl bg-[#0d1229]/90 border border-white/10">
                          <div className="flex items-center justify-between gap-2 mb-2">
                            <div className="flex items-center gap-1">
                              {[...Array(publishedReview.rating)].map((_, idx) => (
                                <Star
                                  key={idx}
                                  className="w-3.5 h-3.5 fill-amber-400 text-amber-400"
                                />
                              ))}
                            </div>
                            <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-300 bg-emerald-500/15 border border-emerald-400/30 px-2 py-0.5 rounded-full">
                              <Check className="w-2.5 h-2.5" />
                              LIVE ON SITE
                            </span>
                          </div>
                          <p className="text-xs sm:text-sm text-gray-200 italic mb-2">
                            &ldquo;{publishedReview.quote}&rdquo;
                          </p>
                          <div className="text-xs text-purple-300 font-semibold">
                            — {publishedReview.clientName},{" "}
                            <span className="text-gray-400 font-normal">
                              {publishedReview.role} at {publishedReview.company}
                            </span>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {status === "error" && (
              <div className="mb-6 p-4 rounded-xl bg-rose-950/40 border border-rose-500/40 text-rose-200 text-xs sm:text-sm flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />
                <span>{feedbackMsg}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6" id="customer-write-review-form">
              {/* Honeypot */}
              <input
                type="text"
                name="honeypot"
                value={formData.honeypot}
                onChange={handleChange}
                className="hidden"
                tabIndex={-1}
                autoComplete="off"
              />

              {/* Interactive 5-Star Rating Picker */}
              <div className="p-4 sm:p-5 rounded-2xl bg-black/30 border border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <span className="block text-xs font-bold uppercase tracking-wider text-gray-300 mb-1">
                    Your Overall Rating *
                  </span>
                  <span className="text-xs sm:text-sm font-semibold text-amber-300">
                    {ratingLabels[activeStarValue]}
                  </span>
                </div>

                <div
                  className="flex items-center gap-1.5 sm:gap-2"
                  role="radiogroup"
                  aria-label="Select star rating"
                >
                  {[1, 2, 3, 4, 5].map((star) => {
                    const isFilled = star <= activeStarValue;
                    return (
                      <motion.button
                        key={star}
                        type="button"
                        whileHover={{ scale: 1.22, rotate: -4 }}
                        whileTap={{ scale: 0.9 }}
                        onMouseEnter={() => setHoverRating(star)}
                        onMouseLeave={() => setHoverRating(0)}
                        onClick={() => setRating(star)}
                        aria-label={`Rate ${star} out of 5 stars`}
                        className={`p-1.5 rounded-xl transition-colors cursor-pointer focus:outline-none ${
                          isFilled
                            ? "bg-amber-400/15 text-amber-400"
                            : "bg-white/5 text-gray-500 hover:text-amber-300"
                        }`}
                      >
                        <Star
                          className={`w-6 h-6 sm:w-7 sm:h-7 transition-all ${
                            isFilled
                              ? "fill-amber-400 text-amber-400 drop-shadow-[0_0_8px_rgba(245,158,11,0.6)]"
                              : ""
                          }`}
                        />
                      </motion.button>
                    );
                  })}
                </div>
              </div>

              {/* Row 1: Name & Role */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label
                    htmlFor="review-clientName"
                    className="block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-2"
                  >
                    Your Name *
                  </label>
                  <input
                    type="text"
                    id="review-clientName"
                    name="clientName"
                    value={formData.clientName}
                    onChange={handleChange}
                    placeholder="e.g. Bilal Khan"
                    required
                    className="w-full px-4 py-3 rounded-xl bg-black/40 border border-white/10 text-white placeholder-gray-500 text-sm focus:outline-none focus:border-purple-500 transition-colors"
                  />
                </div>

                <div>
                  <label
                    htmlFor="review-role"
                    className="block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-2"
                  >
                    Your Role / Title (Optional)
                  </label>
                  <input
                    type="text"
                    id="review-role"
                    name="role"
                    value={formData.role}
                    onChange={handleChange}
                    placeholder="e.g. Founder & CEO"
                    className="w-full px-4 py-3 rounded-xl bg-black/40 border border-white/10 text-white placeholder-gray-500 text-sm focus:outline-none focus:border-purple-500 transition-colors"
                  />
                </div>
              </div>

              {/* Row 2: Company & Website URL */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label
                    htmlFor="review-company"
                    className="block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-2"
                  >
                    Company / Business Name *
                  </label>
                  <input
                    type="text"
                    id="review-company"
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
                    placeholder="e.g. STN Trucking Ltd."
                    required
                    className="w-full px-4 py-3 rounded-xl bg-black/40 border border-white/10 text-white placeholder-gray-500 text-sm focus:outline-none focus:border-purple-500 transition-colors"
                  />
                </div>

                <div>
                  <label
                    htmlFor="review-companyUrl"
                    className="block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-2"
                  >
                    Company Website (Optional)
                  </label>
                  <input
                    type="text"
                    id="review-companyUrl"
                    name="companyUrl"
                    value={formData.companyUrl}
                    onChange={handleChange}
                    placeholder="e.g. https://yourwebsite.com"
                    className="w-full px-4 py-3 rounded-xl bg-black/40 border border-white/10 text-white placeholder-gray-500 text-sm focus:outline-none focus:border-purple-500 transition-colors"
                  />
                </div>
              </div>

              {/* Row 3: Service Completed & Key Highlight */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label
                    htmlFor="review-projectType"
                    className="block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-2"
                  >
                    Project / Service *
                  </label>
                  <select
                    id="review-projectType"
                    name="projectType"
                    value={formData.projectType}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl bg-[#090d1f] border border-white/10 text-white text-sm focus:outline-none focus:border-purple-500 transition-colors"
                  >
                    {projectTypeOptions.map((opt) => (
                      <option key={opt} value={opt}>
                        {opt}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label
                    htmlFor="review-highlight"
                    className="block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-2"
                  >
                    Key Result / Highlight (Optional)
                  </label>
                  <input
                    type="text"
                    id="review-highlight"
                    name="highlight"
                    value={formData.highlight}
                    onChange={handleChange}
                    placeholder="e.g. Fast delivery & 2x more online bookings"
                    className="w-full px-4 py-3 rounded-xl bg-black/40 border border-white/10 text-white placeholder-gray-500 text-sm focus:outline-none focus:border-purple-500 transition-colors"
                  />
                </div>
              </div>

              {/* Review Message */}
              <div>
                <label
                  htmlFor="review-quote"
                  className="block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-2"
                >
                  Your Review *
                </label>
                <textarea
                  id="review-quote"
                  name="quote"
                  rows={4}
                  value={formData.quote}
                  onChange={handleChange}
                  placeholder="Share how working with Faraz helped your website, store, or AI automation project..."
                  required
                  className="w-full px-4 py-3 rounded-xl bg-black/40 border border-white/10 text-white placeholder-gray-500 text-sm focus:outline-none focus:border-purple-500 transition-colors resize-none"
                />
              </div>

              {/* Submit Button */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-1">
                <div className="flex items-center gap-2 text-xs text-gray-400">
                  <Sparkles className="w-4 h-4 text-purple-400 shrink-0" />
                  <span>Publishes directly to Faraz&apos;s verified client wall</span>
                </div>

                <button
                  type="submit"
                  disabled={status === "submitting"}
                  id="submit-customer-review-btn"
                  className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-gradient-to-r from-[#8B5CF6] via-[#9333EA] to-[#A855F7] text-white font-semibold text-sm flex items-center justify-center gap-2 shadow-[0_0_25px_rgba(139,92,246,0.45)] hover:shadow-[0_0_35px_rgba(139,92,246,0.75)] hover:scale-105 active:scale-95 disabled:opacity-60 transition-all cursor-pointer"
                >
                  {status === "submitting" ? (
                    <span>Publishing Review...</span>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      <span>Publish My Review</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}

