"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, Instagram, Sparkles } from "lucide-react";
import { farazSocialLinks, SocialLink } from "@/data/socials";

export default function FloatingSocialBar() {
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  const handleOpenAiBot = () => {
    if (typeof window !== "undefined") {
      window.dispatchEvent(new CustomEvent("toggle-faraz-ai-chat"));
    }
  };

  // Render SVG icons matching exact brand logos from reference screenshot
  const renderIcon = (link: SocialLink) => {
    switch (link.id) {
      case "whatsapp":
        return (
          <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
            <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
          </svg>
        );
      case "facebook":
        return (
          <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
            <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
          </svg>
        );
      case "linkedin":
        return (
          <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
            <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
          </svg>
        );
      case "email":
        return <Mail className="w-5 h-5 text-white" />;
      case "instagram":
        return <Instagram className="w-5 h-5 text-white" />;
      default:
        return null;
    }
  };

  return (
    <>
      {/* Desktop & Tablet Floating Social Bar (Exact Match with Reference Design) */}
      <div className="hidden md:flex fixed right-3 sm:right-5 top-1/2 -translate-y-1/2 z-40 flex-col items-center gap-2.5 sm:gap-3 select-none">
        {/* 1. Staggered Social Media Action Icons */}
        {farazSocialLinks.map((link, idx) => {
          const isHovered = hoveredId === link.id;

          return (
            <div key={link.id} className="relative flex items-center justify-end">
              {/* Tooltip on Left */}
              <AnimatePresence>
                {isHovered && (
                  <motion.div
                    initial={{ opacity: 0, x: 10, scale: 0.9 }}
                    animate={{ opacity: 1, x: 0, scale: 1 }}
                    exit={{ opacity: 0, x: 10, scale: 0.9 }}
                    transition={{ duration: 0.16 }}
                    className="absolute right-14 px-3 py-1.5 rounded-lg bg-[#0E1329]/95 border border-white/15 text-white text-xs font-medium shadow-xl whitespace-nowrap pointer-events-none backdrop-blur-md z-50 flex items-center gap-2"
                  >
                    <span>{link.tooltip}</span>
                    <div
                      className="w-1.5 h-1.5 rounded-full"
                      style={{ backgroundColor: link.color }}
                    />
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Circular Social Button */}
              <motion.a
                href={link.url}
                target={link.url.startsWith("http") ? "_blank" : undefined}
                rel="noopener noreferrer"
                onMouseEnter={() => setHoveredId(link.id)}
                onMouseLeave={() => setHoveredId(null)}
                initial={{ scale: 0, opacity: 0, x: 40 }}
                animate={{ scale: 1, opacity: 1, x: 0 }}
                transition={{
                  delay: 0.15 + idx * 0.08,
                  type: "spring",
                  stiffness: 260,
                  damping: 20,
                }}
                whileHover={{
                  scale: 1.15,
                  boxShadow: `0 0 24px ${link.hoverGlow}`,
                }}
                whileTap={{ scale: 0.92 }}
                className={`relative w-11 h-11 sm:w-12 sm:h-12 rounded-full ${link.bgGradient || ""} flex items-center justify-center text-white shadow-lg transition-transform`}
                style={{
                  backgroundColor: !link.bgGradient ? link.color : undefined,
                }}
                aria-label={link.name}
                id={`floating-social-${link.id}`}
              >
                {renderIcon(link)}

                {/* Glowing Active Online Dot on WhatsApp (matches screenshot) */}
                {link.badge && (
                  <span className="absolute -top-0.5 -right-0.5 flex h-3.5 w-3.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-80" />
                    <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-white border-2 border-[#25D366]" />
                  </span>
                )}
              </motion.a>
            </div>
          );
        })}

        {/* Subtle Divider */}
        <div className="w-6 h-[1px] bg-gradient-to-r from-transparent via-purple-500/40 to-transparent my-0.5" />

        {/* 2. AI Bot Launcher with Logo (Matches Reference Screenshot) */}
        <div className="relative flex items-center justify-end">
          {/* Tooltip on Left */}
          <AnimatePresence>
            {hoveredId === "ai-bot" && (
              <motion.div
                initial={{ opacity: 0, x: 10, scale: 0.9 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={{ opacity: 0, x: 10, scale: 0.9 }}
                transition={{ duration: 0.16 }}
                className="absolute right-16 px-3.5 py-1.5 rounded-lg bg-[#0E1329]/95 border border-purple-500/40 text-purple-200 text-xs font-semibold shadow-xl whitespace-nowrap pointer-events-none backdrop-blur-md z-50 flex items-center gap-2"
              >
                <Sparkles className="w-3.5 h-3.5 text-purple-400 animate-pulse" />
                <span>Ask Faraz AI Assistant</span>
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              </motion.div>
            )}
          </AnimatePresence>

          <motion.button
            onClick={handleOpenAiBot}
            onMouseEnter={() => setHoveredId("ai-bot")}
            onMouseLeave={() => setHoveredId(null)}
            initial={{ scale: 0, opacity: 0, x: 40 }}
            animate={{ scale: 1, opacity: 1, x: 0 }}
            transition={{
              delay: 0.65,
              type: "spring",
              stiffness: 260,
              damping: 20,
            }}
            whileHover={{
              scale: 1.15,
              boxShadow: "0 0 30px rgba(168, 85, 247, 0.65)",
            }}
            whileTap={{ scale: 0.92 }}
            className="relative w-12 h-12 sm:w-14 sm:h-14 rounded-full p-[2px] bg-gradient-to-tr from-[#7C3AED] via-[#8B5CF6] to-[#38BDF8] flex items-center justify-center shadow-xl cursor-pointer"
            aria-label="Open AI Assistant"
            id="floating-ai-bot-trigger"
          >
            {/* Inner Logo */}
            <div className="relative w-full h-full rounded-full overflow-hidden bg-[#0A0D1F] border border-white/20">
              <Image
                src="/images/logo.jpg"
                alt="AI by Faraz Logo"
                fill
                className="object-cover"
              />
            </div>

            {/* Active Online Green Beacon (Matches Screenshot) */}
            <span className="absolute -top-0.5 -right-0.5 flex h-3.5 w-3.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-emerald-400 border-2 border-[#0A0D1F]" />
            </span>
          </motion.button>
        </div>
      </div>

      {/* Mobile Clean Floating Quick-Actions (1-Tap WhatsApp + AI Assistant at bottom-right) */}
      <div className="md:hidden fixed bottom-4 right-3 z-40 flex flex-col items-center gap-2.5">
        <motion.a
          href="https://wa.me/14374348789"
          target="_blank"
          rel="noopener noreferrer"
          whileTap={{ scale: 0.92 }}
          className="relative w-10 h-10 rounded-full bg-[#25D366] flex items-center justify-center text-white shadow-xl"
          aria-label="Chat on WhatsApp"
          id="floating-social-whatsapp-mobile"
        >
          <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
            <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
          </svg>
        </motion.a>

        <motion.button
          onClick={handleOpenAiBot}
          whileTap={{ scale: 0.92 }}
          className="relative w-11 h-11 rounded-full p-[2px] bg-gradient-to-tr from-[#7C3AED] via-[#8B5CF6] to-[#38BDF8] flex items-center justify-center shadow-2xl cursor-pointer"
          aria-label="Open AI Assistant"
          id="floating-ai-bot-trigger-mobile"
        >
          <div className="relative w-full h-full rounded-full overflow-hidden bg-[#0A0D1F] border border-white/20">
            <Image
              src="/images/logo.jpg"
              alt="AI by Faraz Logo"
              fill
              className="object-cover"
            />
          </div>
          <span className="absolute -top-0.5 -right-0.5 flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-400 border-2 border-[#0A0D1F]" />
          </span>
        </motion.button>
      </div>
    </>
  );
}
