"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Send, Menu, X, Sun, Moon } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { name: "Services", href: "/services" },
  { name: "Portfolio", href: "/portfolio" },
  { name: "Process", href: "/process" },
  { name: "Testimonials", href: "/#testimonials" },
  { name: "FAQ", href: "/#faq" },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isDark, setIsDark] = useState(true);
  const pathname = usePathname();

  useEffect(() => {
    if (typeof document !== "undefined") {
      const savedTheme = localStorage.getItem("faraz-theme");
      const currentlyDark = savedTheme
        ? savedTheme !== "light"
        : document.documentElement.classList.contains("dark");
      setIsDark(currentlyDark);
    }

    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleTheme = () => {
    const nextDark = !isDark;
    setIsDark(nextDark);
    if (typeof document !== "undefined") {
      const root = document.documentElement;
      if (nextDark) {
        root.classList.add("dark");
        root.classList.remove("light");
        root.style.colorScheme = "dark";
      } else {
        root.classList.remove("dark");
        root.classList.add("light");
        root.style.colorScheme = "light";
      }
      try {
        localStorage.setItem("faraz-theme", nextDark ? "dark" : "light");
      } catch {
        // Ignore storage errors in restricted environments
      }
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-3 sm:px-8 ${
        isScrolled
          ? "py-2.5 sm:py-3.5 bg-[#070711]/90 backdrop-blur-md border-b border-white/[0.08] shadow-lg shadow-black/30"
          : "py-3 sm:py-4 bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Brand Logo & Name */}
        <Link
          href="/"
          className="flex items-center gap-2.5 sm:gap-3 group focus:outline-none shrink-0"
          id="nav-brand-logo"
        >
          <div className="relative w-9 h-9 sm:w-11 sm:h-11 rounded-full p-[2px] bg-gradient-to-tr from-[#D6A84B] via-[#8B5CF6] to-[#A855F7] shadow-lg group-hover:scale-105 transition-transform duration-300">
            <div className="relative w-full h-full rounded-full overflow-hidden bg-black">
              <Image
                src="/images/logo.jpg"
                alt="AI by Faraz Official Logo"
                fill
                className="object-cover"
                priority
              />
            </div>
          </div>
          <div className="flex flex-col">
            <span className="font-heading font-bold text-sm sm:text-lg text-white tracking-tight group-hover:text-purple-300 transition-colors">
              AI by Faraz
            </span>
            <span className="text-[9px] sm:text-[10px] tracking-[0.2em] uppercase font-semibold text-[#94A3B8]">
              FARAZ AHMED
            </span>
          </div>
        </Link>

        {/* Center Desktop Navigation Pill */}
        <nav
          className={`hidden lg:flex items-center gap-1 xl:gap-2 px-5 py-2 rounded-full transition-all duration-300 ${
            isScrolled
              ? "bg-[#070711]/85 backdrop-blur-xl border border-white/10 shadow-2xl shadow-purple-950/25"
              : "bg-[#0e122b]/65 backdrop-blur-md border border-white/[0.08]"
          }`}
          aria-label="Main Navigation"
        >
          {navLinks.map((link) => {
            const isActive =
              link.href === "/"
                ? pathname === "/"
                : link.href.startsWith("/#")
                ? false
                : pathname.startsWith(link.href);

            return (
              <Link
                key={link.name}
                href={link.href}
                className={`relative px-3.5 py-1.5 text-xs xl:text-sm font-medium transition-colors duration-200 rounded-full hover:text-white ${
                  isActive ? "text-white" : "text-[#B9B9C9] hover:text-white"
                }`}
              >
                {link.name}
                {isActive && (
                  <motion.div
                    layoutId="activeNavIndicator"
                    className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-[#8B5CF6] rounded-full shadow-[0_0_8px_#8B5CF6]"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Right Action Buttons */}
        <div className="flex items-center gap-2.5 sm:gap-4 shrink-0">
          {/* Light/Dark Theme Toggle Button */}
          <button
            type="button"
            id="theme-toggle-btn"
            onClick={toggleTheme}
            aria-label="Toggle theme mode"
            title={isDark ? "Switch to Day Mode" : "Switch to Night Mode"}
            className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-[#10142A]/80 hover:bg-[#181d3f] border border-white/10 hover:border-purple-500/40 text-[#94A3B8] hover:text-white flex items-center justify-center transition-all duration-300 focus:outline-none cursor-pointer"
          >
            {isDark ? (
              <Sun className="w-4 h-4 text-amber-300 transition-transform duration-300 hover:rotate-45" />
            ) : (
              <Moon className="w-4 h-4 text-purple-600 transition-transform duration-300 hover:-rotate-12" />
            )}
          </button>

          {/* Let's Talk Glowing CTA Pill Button */}
          <Link
            href="/contact"
            id="nav-lets-talk-btn"
            className="group px-4 sm:px-6 py-2 sm:py-2.5 rounded-full bg-gradient-to-r from-[#8B5CF6] via-[#9333EA] to-[#A855F7] text-white font-semibold text-xs sm:text-sm flex items-center gap-2 shadow-[0_0_20px_rgba(139,92,246,0.4)] hover:shadow-[0_0_30px_rgba(139,92,246,0.7)] transition-all duration-300 hover:scale-105 active:scale-95"
          >
            <Send className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            <span>Let&apos;s Talk</span>
          </Link>

          {/* Mobile Hamburger Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle navigation menu"
            className="lg:hidden w-9 h-9 rounded-full bg-[#10142A]/80 border border-white/10 text-gray-300 hover:text-white flex items-center justify-center focus:outline-none"
          >
            {mobileMenuOpen ? (
              <X className="w-5 h-5" />
            ) : (
              <Menu className="w-5 h-5" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="lg:hidden mt-3 max-w-md mx-auto rounded-3xl bg-[#090D1A]/95 border border-white/10 backdrop-blur-2xl p-5 shadow-2xl"
          >
            <div className="flex flex-col gap-2">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`px-4 py-2.5 rounded-2xl text-sm font-medium transition-colors ${
                    pathname === link.href
                      ? "bg-purple-600/20 text-purple-200 border border-purple-500/30"
                      : "text-gray-300 hover:text-white hover:bg-white/5"
                  }`}
                >
                  {link.name}
                </Link>
              ))}
              <div className="pt-3 mt-1 border-t border-white/10 flex flex-col gap-2">
                <Link
                  href="/contact"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full py-3 rounded-2xl bg-gradient-to-r from-[#8B5CF6] to-[#A855F7] text-white font-semibold text-center text-sm shadow-lg"
                >
                  Start Project Inquiry
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
