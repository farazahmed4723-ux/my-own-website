"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { X, ExternalLink, Mail, Copy, Check, Sparkles } from "lucide-react";

interface HireMeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function HireMeModal({ isOpen, onClose }: HireMeModalProps) {
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  // Close on Escape key press
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      document.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose]);

  const copyToClipboard = (text: string, key: string, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const contactChannels = [
    {
      id: "whatsapp",
      title: "WhatsApp Direct",
      handle: "+1 (437) 434-8789",
      description: "Instant chat, voice notes & fastest milestone estimates",
      actionText: "Chat on WhatsApp",
      url: "https://wa.me/14374348789?text=Hi%20Faraz,%20I%20saw%20your%20website%20and%20would%20like%20to%20discuss%20hiring%20you%20for%20a%20project!",
      badge: "Fastest Response • Active Now",
      badgeColor: "bg-emerald-500/15 border-emerald-500/30 text-emerald-300",
      accentBg: "from-[#25D366]/20 to-transparent",
      borderColor: "hover:border-[#25D366]/50",
      btnClass: "bg-[#25D366] hover:bg-[#1ebd5b] text-black shadow-lg shadow-[#25D366]/25",
      icon: (
        <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
          <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
        </svg>
      ),
    },
    {
      id: "instagram",
      title: "Instagram DM",
      handle: "@aibyfaraz",
      description: "Direct message, project inspiration & quick collaborations",
      actionText: "DM on Instagram",
      url: "https://www.instagram.com/aibyfaraz",
      badge: "DMs Open • Active",
      badgeColor: "bg-pink-500/15 border-pink-500/30 text-pink-300",
      accentBg: "from-[#E1306C]/20 to-transparent",
      borderColor: "hover:border-[#E1306C]/50",
      btnClass: "bg-gradient-to-r from-[#833AB4] via-[#FD1D1D] to-[#F77737] hover:opacity-90 text-white shadow-lg shadow-pink-600/25",
      icon: (
        <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
        </svg>
      ),
    },
    {
      id: "linkedin",
      title: "LinkedIn InMail",
      handle: "Faraz Ahmed",
      description: "Professional inquiries, contracts & long-term development",
      actionText: "Message on LinkedIn",
      url: "https://www.linkedin.com/in/faraz-ahmad-b11b36437/",
      badge: "Verified Profile",
      badgeColor: "bg-sky-500/15 border-sky-500/30 text-sky-300",
      accentBg: "from-[#0A66C2]/20 to-transparent",
      borderColor: "hover:border-[#0A66C2]/50",
      btnClass: "bg-[#0A66C2] hover:bg-[#08529c] text-white shadow-lg shadow-[#0A66C2]/25",
      icon: (
        <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
          <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
        </svg>
      ),
    },
    {
      id: "email",
      title: "Direct Email",
      handle: "faraz.ahmed4724@gmail.com",
      description: "Detailed RFQs, design briefs & architectural documents",
      actionText: "Send Direct Email",
      url: "mailto:faraz.ahmed4724@gmail.com?subject=Project%20Inquiry%20-%20AI%20by%20Faraz",
      badge: "Official Inbox",
      badgeColor: "bg-purple-500/15 border-purple-500/30 text-purple-300",
      accentBg: "from-purple-600/20 to-transparent",
      borderColor: "hover:border-purple-500/50",
      btnClass: "bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white shadow-lg shadow-purple-600/25",
      icon: <Mail className="w-5 h-5 text-white" />,
    },
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 sm:p-6 overflow-y-auto">
          {/* Backdrop Blur Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-md cursor-pointer"
          />

          {/* Dialog Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.94, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="relative w-full max-w-xl rounded-3xl bg-[#0B0E23] border border-purple-500/30 p-5 sm:p-7 shadow-[0_0_60px_rgba(139,92,246,0.3)] z-10 overflow-hidden my-auto"
            role="dialog"
            aria-modal="true"
          >
            {/* Ambient Background Gradient */}
            <div className="absolute top-0 right-0 w-72 h-72 bg-gradient-to-br from-purple-600/20 via-sky-500/15 to-transparent rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-60 h-60 bg-gradient-to-tr from-emerald-600/15 to-transparent rounded-full blur-2xl pointer-events-none" />

            {/* Header */}
            <div className="relative z-10 flex items-start justify-between gap-4 mb-6 pb-5 border-b border-white/10">
              <div className="flex items-center gap-3.5">
                {/* Faraz Avatar with pulsing active ring */}
                <div className="relative w-12 h-12 sm:w-14 sm:h-14 rounded-full p-[2px] bg-gradient-to-tr from-[#25D366] via-[#8B5CF6] to-[#E1306C] shadow-lg shrink-0">
                  <div className="relative w-full h-full rounded-full overflow-hidden bg-black">
                    <Image
                      src="/images/faraz-profile.jpg"
                      alt="Faraz Ahmed"
                      fill
                      className="object-cover"
                      priority
                    />
                  </div>
                  <span className="absolute bottom-0 right-0 w-3.5 h-3.5 rounded-full bg-emerald-400 border-2 border-[#0B0E23] animate-pulse" />
                </div>

                <div>
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-purple-900/40 border border-purple-500/30 text-[10px] font-bold uppercase tracking-wider text-purple-300 mb-1">
                    <Sparkles className="w-3 h-3 text-amber-400" />
                    <span>Direct Channels • Instant DM</span>
                  </div>
                  <h3 className="font-heading text-lg sm:text-2xl font-black text-white tracking-tight">
                    Hire &amp; Message Faraz Ahmed
                  </h3>
                  <p className="text-xs text-gray-400">
                    Select your preferred platform to start an instant project conversation:
                  </p>
                </div>
              </div>

              {/* Close Button */}
              <button
                type="button"
                onClick={onClose}
                className="w-8 h-8 rounded-full bg-white/5 hover:bg-white/15 border border-white/10 text-gray-400 hover:text-white flex items-center justify-center transition-colors shrink-0 cursor-pointer"
                aria-label="Close dialog"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Platform Direct DM Cards */}
            <div className="relative z-10 space-y-3">
              {contactChannels.map((ch) => (
                <div
                  key={ch.id}
                  className={`group relative rounded-2xl p-3.5 sm:p-4 bg-gradient-to-r ${ch.accentBg} bg-[#111636]/90 border border-white/10 ${ch.borderColor} transition-all duration-300 shadow-md hover:shadow-xl`}
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    {/* Left Info */}
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded-xl bg-white/10 border border-white/15 flex items-center justify-center shrink-0 text-white group-hover:scale-110 transition-transform">
                        {ch.icon}
                      </div>

                      <div>
                        <div className="flex items-center gap-2 mb-0.5">
                          <span className="font-heading font-bold text-sm sm:text-base text-white">
                            {ch.title}
                          </span>
                          <span
                            className={`px-2 py-0.5 rounded-md border text-[9.5px] font-semibold ${ch.badgeColor}`}
                          >
                            {ch.badge}
                          </span>
                        </div>

                        <div className="flex items-center gap-2 text-xs font-mono text-gray-200">
                          <span>{ch.handle}</span>
                          <button
                            type="button"
                            onClick={(e) => copyToClipboard(ch.handle, ch.id, e)}
                            title="Copy handle"
                            className="text-gray-400 hover:text-white transition-colors"
                          >
                            {copiedKey === ch.id ? (
                              <Check className="w-3.5 h-3.5 text-emerald-400" />
                            ) : (
                              <Copy className="w-3.5 h-3.5" />
                            )}
                          </button>
                        </div>

                        <p className="text-[11px] text-gray-400 mt-1 line-clamp-1">
                          {ch.description}
                        </p>
                      </div>
                    </div>

                    {/* Action Button */}
                    <a
                      href={ch.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`px-4 py-2 sm:py-2.5 rounded-xl font-bold text-xs flex items-center justify-center gap-1.5 transition-all active:scale-95 shrink-0 ${ch.btnClass}`}
                    >
                      <span>{ch.actionText}</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>
              ))}
            </div>

            {/* Bottom Guarantee Note */}
            <div className="relative z-10 mt-5 pt-4 border-t border-white/10 flex items-center justify-between text-[11px] text-gray-400">
              <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>100% Direct with Faraz (No Middlemen)</span>
              </span>
              <span className="text-purple-300 font-semibold">Typical reply: &lt; 15 mins</span>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

