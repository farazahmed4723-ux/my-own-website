"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Mail,
  Phone,
  MessageCircle,
  Send,
  CheckCircle2,
  AlertCircle,
  Clock,
  Sparkles,
  ShieldCheck,
} from "lucide-react";

const serviceOptions = [
  { value: "AI Automation", label: "AI Automation (Process & Workflow Automation)" },
  { value: "AI Chatbots", label: "AI Chatbots (Customer Support & Conversions)" },
  { value: "Website Development", label: "Website Development (Next.js / WordPress)" },
  { value: "AI Agents", label: "AI Agents (Autonomous Task & Integration Agents)" },
  { value: "E-commerce Solutions", label: "E-commerce Solutions (Shopify / WooCommerce)" },
  { value: "Custom Software Development", label: "Custom Software Development (Web Apps & APIs)" },
  { value: "General Consultation", label: "General Project Consultation / Inquiry" },
];

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    service: "Website Development",
    budget: "",
    description: "",
    honeypot: "",
  });

  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [responseMessage, setResponseMessage] = useState("");
  const [isLiveDelivery, setIsLiveDelivery] = useState<boolean | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name.trim() || formData.name.trim().length < 2) {
      setStatus("error");
      setResponseMessage("Please enter your full name.");
      return;
    }

    if (!formData.email.trim() || !formData.email.includes("@")) {
      setStatus("error");
      setResponseMessage("Please enter a valid email address.");
      return;
    }

    if (!formData.description.trim() || formData.description.trim().length < 10) {
      setStatus("error");
      setResponseMessage("Please provide a brief description of your project (min 10 characters).");
      return;
    }

    setStatus("submitting");
    setResponseMessage("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        setStatus("success");
        setResponseMessage(data.message);
        setIsLiveDelivery(Boolean(data.isLiveDelivery));
        setFormData({
          name: "",
          email: "",
          service: "Website Development",
          budget: "",
          description: "",
          honeypot: "",
        });
      } else {
        setStatus("error");
        setResponseMessage(data.error || "Failed to submit inquiry. Please try again.");
      }
    } catch (err) {
      setStatus("error");
      setResponseMessage("Network error. Please try reaching out directly via WhatsApp or email.");
    }
  };

  const whatsappDirectUrl = `https://wa.me/14374348789?text=${encodeURIComponent(
    `Hello Faraz! I am interested in discussing a project for ${formData.service || "Web/AI Development"}.`
  )}`;

  return (
    <div className="pt-28 sm:pt-36 pb-24 px-4 sm:px-6 lg:px-8 bg-[#060813]">
      <div className="max-w-6xl mx-auto">
        {/* Breadcrumb */}
        <div className="mb-6 flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-purple-400">
          <Link href="/" className="hover:text-white transition-colors">
            Home
          </Link>
          <span>/</span>
          <span className="text-gray-300">Contact</span>
        </div>

        {/* Page Header */}
        <div className="max-w-3xl mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-purple-900/30 border border-purple-500/30 text-purple-300 text-xs font-semibold uppercase tracking-wider mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Direct Project Inquiry</span>
          </div>
          <h1 className="font-heading text-4xl sm:text-5xl font-extrabold text-white tracking-tight mb-4">
            Let&apos;s Build <span className="gradient-text-purple">Together</span>
          </h1>
          <p className="text-base sm:text-lg text-gray-300 leading-relaxed">
            Have an upcoming project, website redesign, AI chatbot requirement, or workflow automation idea? Connect with Faraz Ahmed directly.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          {/* Left Column: Direct Contact Details & WhatsApp Card */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            <div className="p-8 rounded-3xl glass-card border border-white/10">
              <h2 className="font-heading text-xl font-bold text-white mb-6">
                Direct Contact Channels
              </h2>

              <div className="space-y-6">
                {/* Email Item */}
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-purple-600/20 border border-purple-500/30 flex items-center justify-center text-purple-300 shrink-0">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs text-gray-400 uppercase tracking-wider font-semibold block">
                      Direct Email
                    </span>
                    <a
                      href="mailto:faraz.ahmed4724@gmail.com"
                      id="contact-page-email-link"
                      className="text-sm sm:text-base font-semibold text-white hover:text-purple-300 transition-colors"
                    >
                      faraz.ahmed4724@gmail.com
                    </a>
                    <p className="text-xs text-gray-400 mt-0.5">
                      Monitored daily with 24-hour turnaround.
                    </p>
                  </div>
                </div>

                {/* LinkedIn Channel */}
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-[#0A66C2]/20 border border-[#0A66C2]/30 flex items-center justify-center text-[#0A66C2] shrink-0 font-bold text-lg">
                    in
                  </div>
                  <div>
                    <span className="text-xs text-gray-400 uppercase tracking-wider font-semibold block">
                      LinkedIn
                    </span>
                    <a
                      href="https://www.linkedin.com/in/faraz-ahmad-b11b36437/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm sm:text-base font-semibold text-white hover:text-cyan-300 transition-colors"
                    >
                      Faraz Ahmad on LinkedIn
                    </a>
                    <p className="text-xs text-gray-400 mt-0.5">
                      Professional profile & network.
                    </p>
                  </div>
                </div>

                {/* Instagram Channel */}
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-[#833AB4]/20 via-[#FD1D1D]/20 to-[#F77737]/20 border border-[#E1306C]/30 flex items-center justify-center text-[#E1306C] shrink-0 font-bold text-sm">
                    IG
                  </div>
                  <div>
                    <span className="text-xs text-gray-400 uppercase tracking-wider font-semibold block">
                      Instagram
                    </span>
                    <a
                      href="https://www.instagram.com/aibyfaraz"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm sm:text-base font-semibold text-white hover:text-rose-300 transition-colors"
                    >
                      @aibyfaraz
                    </a>
                    <p className="text-xs text-gray-400 mt-0.5">
                      Updates, design concepts & AI projects.
                    </p>
                  </div>
                </div>

                {/* WhatsApp Item */}
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-emerald-600/20 border border-emerald-500/30 flex items-center justify-center text-emerald-300 shrink-0">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs text-gray-400 uppercase tracking-wider font-semibold block">
                      WhatsApp Direct
                    </span>
                    <a
                      href="https://wa.me/14374348789"
                      target="_blank"
                      rel="noopener noreferrer"
                      id="contact-page-whatsapp-link"
                      className="text-sm sm:text-base font-semibold text-white hover:text-emerald-300 transition-colors"
                    >
                      +1 (437) 434-8789
                    </a>
                    <p className="text-xs text-gray-400 mt-0.5">
                      Fastest channel for real-time discussions.
                    </p>
                  </div>
                </div>

                {/* Hours & Location */}
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-indigo-600/20 border border-indigo-500/30 flex items-center justify-center text-indigo-300 shrink-0">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs text-gray-400 uppercase tracking-wider font-semibold block">
                      Availability
                    </span>
                    <span className="text-sm font-semibold text-white">
                      Monday – Saturday (EST / Worldwide)
                    </span>
                    <p className="text-xs text-gray-400 mt-0.5">
                      Working with clients across North America and internationally.
                    </p>
                  </div>
                </div>
              </div>

              {/* 1-Click WhatsApp Direct Dispatch */}
              <div className="mt-8 pt-6 border-t border-white/[0.08]">
                <a
                  href={whatsappDirectUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  id="contact-open-whatsapp-btn"
                  className="w-full py-3.5 px-6 rounded-2xl bg-emerald-600/20 border border-emerald-500/40 text-emerald-300 font-semibold text-xs sm:text-sm flex items-center justify-center gap-2 hover:bg-emerald-600/30 transition-all shadow-lg"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Start Live WhatsApp Chat Now</span>
                </a>
              </div>
            </div>

            {/* Quality Commitment Box */}
            <div className="p-6 rounded-2xl glass-panel border border-white/10 flex items-start gap-3.5">
              <ShieldCheck className="w-6 h-6 text-purple-400 shrink-0 mt-0.5" />
              <div>
                <h4 className="font-heading text-sm font-bold text-white">
                  Owner-Led Project Commitment
                </h4>
                <p className="text-xs text-gray-400 mt-1 leading-relaxed">
                  Every inquiry is reviewed personally by Faraz Ahmed. You receive honest advice regarding technical feasibility, realistic timelines, and transparent estimates.
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Working Project Inquiry Form */}
          <div className="lg:col-span-7">
            <div className="p-8 sm:p-10 rounded-3xl glass-card border border-purple-500/30 shadow-2xl shadow-purple-950/20">
              <h2 className="font-heading text-2xl font-bold text-white mb-2">
                Project Inquiry Form
              </h2>
              <p className="text-xs sm:text-sm text-gray-400 mb-8">
                Fill out the specifications below and Faraz will respond within 24 hours.
              </p>

              {/* Status Alert Banners */}
              {status === "success" && (
                <div
                  className={`p-5 rounded-2xl mb-8 flex items-start gap-3.5 text-xs sm:text-sm leading-relaxed ${
                    isLiveDelivery
                      ? "bg-emerald-950/40 border border-emerald-500/40 text-emerald-200"
                      : "bg-purple-950/50 border border-purple-500/40 text-purple-200"
                  }`}
                >
                  <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <strong className="block font-semibold mb-1 text-white">
                      Inquiry Processed Successfully!
                    </strong>
                    <span>{responseMessage}</span>
                  </div>
                </div>
              )}

              {status === "error" && (
                <div className="p-4 rounded-xl bg-rose-950/40 border border-rose-500/40 text-rose-200 text-xs sm:text-sm mb-6 flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />
                  <span>{responseMessage}</span>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6" id="project-inquiry-form">
                {/* Honeypot hidden input for spam bots */}
                <input
                  type="text"
                  name="honeypot"
                  value={formData.honeypot}
                  onChange={handleChange}
                  className="hidden"
                  tabIndex={-1}
                  autoComplete="off"
                />

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {/* Full Name */}
                  <div>
                    <label
                      htmlFor="form-name"
                      className="block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-2"
                    >
                      Full Name *
                    </label>
                    <input
                      type="text"
                      id="form-name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="e.g. Johnathan Davis"
                      required
                      className="w-full px-4 py-3 rounded-xl bg-black/40 border border-white/10 text-white placeholder-gray-500 text-sm focus:outline-none focus:border-purple-500 transition-colors"
                    />
                  </div>

                  {/* Email Address */}
                  <div>
                    <label
                      htmlFor="form-email"
                      className="block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-2"
                    >
                      Email Address *
                    </label>
                    <input
                      type="email"
                      id="form-email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="e.g. client@company.com"
                      required
                      className="w-full px-4 py-3 rounded-xl bg-black/40 border border-white/10 text-white placeholder-gray-500 text-sm focus:outline-none focus:border-purple-500 transition-colors"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {/* Required Service Dropdown */}
                  <div>
                    <label
                      htmlFor="form-service"
                      className="block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-2"
                    >
                      Required Service *
                    </label>
                    <select
                      id="form-service"
                      name="service"
                      value={formData.service}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-xl bg-[#090d1f] border border-white/10 text-white text-sm focus:outline-none focus:border-purple-500 transition-colors"
                    >
                      {serviceOptions.map((opt) => (
                        <option key={opt.value} value={opt.value}>
                          {opt.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Optional Budget */}
                  <div>
                    <label
                      htmlFor="form-budget"
                      className="block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-2"
                    >
                      Estimated Budget (Optional)
                    </label>
                    <input
                      type="text"
                      id="form-budget"
                      name="budget"
                      value={formData.budget}
                      onChange={handleChange}
                      placeholder="e.g. $1,500 - $3,500 CAD"
                      className="w-full px-4 py-3 rounded-xl bg-black/40 border border-white/10 text-white placeholder-gray-500 text-sm focus:outline-none focus:border-purple-500 transition-colors"
                    />
                  </div>
                </div>

                {/* Project Description */}
                <div>
                  <label
                    htmlFor="form-description"
                    className="block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-2"
                  >
                    Project Description *
                  </label>
                  <textarea
                    id="form-description"
                    name="description"
                    rows={5}
                    value={formData.description}
                    onChange={handleChange}
                    placeholder="Tell Faraz about your goals, existing website URL (if any), desired features, and expected timeline..."
                    required
                    className="w-full px-4 py-3 rounded-xl bg-black/40 border border-white/10 text-white placeholder-gray-500 text-sm focus:outline-none focus:border-purple-500 transition-colors resize-none"
                  />
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={status === "submitting"}
                  id="submit-inquiry-btn"
                  className="w-full py-4 rounded-full bg-gradient-to-r from-[#8B5CF6] via-[#9333EA] to-[#A855F7] text-white font-semibold text-sm sm:text-base flex items-center justify-center gap-2 shadow-[0_0_25px_rgba(139,92,246,0.5)] hover:shadow-[0_0_35px_rgba(139,92,246,0.8)] transition-all hover:scale-102 disabled:opacity-60 disabled:hover:scale-100 cursor-pointer"
                >
                  {status === "submitting" ? (
                    <span>Validating & Sending...</span>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      <span>Send Project Inquiry</span>
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
