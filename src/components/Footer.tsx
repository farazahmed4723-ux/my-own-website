import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Mail, Phone, MessageSquare, ArrowUpRight, ShieldCheck, Heart } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative bg-[#050711] border-t border-white/[0.08] pt-16 pb-12 overflow-hidden">
      {/* Ambient background glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-24 bg-purple-900/10 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8 mb-12">
          {/* Column 1: Brand Info */}
          <div className="lg:col-span-2 flex flex-col gap-4">
            <Link href="/" className="flex items-center gap-3">
              <div className="relative w-10 h-10 rounded-full p-[2px] bg-gradient-to-tr from-[#D6A84B] to-[#8B5CF6]">
                <div className="relative w-full h-full rounded-full overflow-hidden bg-black">
                  <Image
                    src="/images/logo.jpg"
                    alt="AI by Faraz Logo"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
              <div>
                <span className="font-heading font-bold text-lg text-white">AI by Faraz</span>
                <p className="text-[10px] tracking-widest uppercase font-semibold text-gray-400">
                  FARAZ AHMED
                </p>
              </div>
            </Link>

            <p className="text-sm text-gray-400 max-w-sm leading-relaxed">
              Building intelligent websites, custom AI chatbots, business automation systems, and high-performance modern web applications tailored for real-world growth.
            </p>

            <div className="flex flex-col gap-2 pt-2 text-xs text-gray-300">
              <a
                href="mailto:faraz.ahmed4724@gmail.com"
                className="flex items-center gap-2 hover:text-purple-300 transition-colors"
                id="footer-email-link"
              >
                <Mail className="w-4 h-4 text-purple-400" />
                <span>faraz.ahmed4724@gmail.com</span>
              </a>
              <a
                href="https://wa.me/14374348789"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 hover:text-emerald-300 transition-colors"
                id="footer-whatsapp-link"
              >
                <Phone className="w-4 h-4 text-emerald-400" />
                <span>WhatsApp: +1 (437) 434-8789</span>
              </a>
            </div>

            {/* Social Icons Row */}
            <div className="flex items-center gap-3 pt-2">
              <a
                href="https://wa.me/14374348789"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp"
                className="w-8 h-8 rounded-full bg-[#25D366]/15 hover:bg-[#25D366]/30 text-[#25D366] flex items-center justify-center border border-[#25D366]/30 transition-all hover:scale-110"
              >
                <Phone className="w-4 h-4" />
              </a>
              <a
                href="https://www.linkedin.com/in/faraz-ahmad-b11b36437/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="w-8 h-8 rounded-full bg-[#0A66C2]/15 hover:bg-[#0A66C2]/30 text-[#0A66C2] flex items-center justify-center border border-[#0A66C2]/30 transition-all hover:scale-110"
              >
                <span className="font-bold text-xs">in</span>
              </a>
              <a
                href="https://www.instagram.com/aibyfaraz"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="w-8 h-8 rounded-full bg-[#E1306C]/15 hover:bg-[#E1306C]/30 text-[#E1306C] flex items-center justify-center border border-[#E1306C]/30 transition-all hover:scale-110"
              >
                <span className="font-bold text-xs">IG</span>
              </a>
              <a
                href="mailto:faraz.ahmed4724@gmail.com"
                aria-label="Email"
                className="w-8 h-8 rounded-full bg-cyan-500/15 hover:bg-cyan-500/30 text-cyan-400 flex items-center justify-center border border-cyan-500/30 transition-all hover:scale-110"
              >
                <Mail className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Column 2: Navigation */}
          <div>
            <h4 className="font-heading text-sm font-semibold text-white uppercase tracking-wider mb-4">
              Navigation
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-sm text-gray-400">
              <li>
                <Link href="/" className="hover:text-purple-300 transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-purple-300 transition-colors">
                  About Faraz
                </Link>
              </li>
              <li>
                <Link href="/services" className="hover:text-purple-300 transition-colors">
                  All Services
                </Link>
              </li>
              <li>
                <Link href="/portfolio" className="hover:text-purple-300 transition-colors">
                  Client Portfolio
                </Link>
              </li>
              <li>
                <Link href="/process" className="hover:text-purple-300 transition-colors">
                  Development Process
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-purple-300 transition-colors">
                  Contact & Inquiries
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: The 6 Services */}
          <div>
            <h4 className="font-heading text-sm font-semibold text-white uppercase tracking-wider mb-4">
              Services
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-sm text-gray-400">
              <li>
                <Link
                  href="/services/ai-automation"
                  className="hover:text-purple-300 transition-colors flex items-center gap-1 group"
                >
                  <span>AI Automation</span>
                  <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                </Link>
              </li>
              <li>
                <Link
                  href="/services/ai-chatbots"
                  className="hover:text-purple-300 transition-colors flex items-center gap-1 group"
                >
                  <span>AI Chatbots</span>
                  <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                </Link>
              </li>
              <li>
                <Link
                  href="/services/website-development"
                  className="hover:text-purple-300 transition-colors flex items-center gap-1 group"
                >
                  <span>Website Development</span>
                  <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                </Link>
              </li>
              <li>
                <Link
                  href="/services/ai-agents"
                  className="hover:text-purple-300 transition-colors flex items-center gap-1 group"
                >
                  <span>AI Agents</span>
                  <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                </Link>
              </li>
              <li>
                <Link
                  href="/services/ecommerce-solutions"
                  className="hover:text-purple-300 transition-colors flex items-center gap-1 group"
                >
                  <span>E-commerce Solutions</span>
                  <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                </Link>
              </li>
              <li>
                <Link
                  href="/services/custom-software-development"
                  className="hover:text-purple-300 transition-colors flex items-center gap-1 group"
                >
                  <span>Custom Software</span>
                  <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Quick CTA Box */}
          <div className="flex flex-col gap-3">
            <h4 className="font-heading text-sm font-semibold text-white uppercase tracking-wider mb-2">
              Start A Project
            </h4>
            <p className="text-xs text-gray-400">
              Have an upcoming project or need advice on website development and AI automation?
            </p>
            <Link
              href="/contact"
              className="mt-2 inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-purple-600/20 border border-purple-500/40 text-purple-300 text-xs font-semibold hover:bg-purple-600/30 transition-all shadow-lg shadow-purple-950/40"
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span>Request Free Consultation</span>
            </Link>
            <div className="flex items-center gap-2 text-[11px] text-gray-500 mt-2">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>Independent Developer | 100% Quality Guaranteed</span>
            </div>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Legal */}
        <div className="pt-8 border-t border-white/[0.06] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-500">
          <p>© {currentYear} AI by Faraz. All rights reserved. Owned by Faraz Ahmed.</p>
          <div className="flex items-center gap-6">
            <Link href="/privacy" className="hover:text-gray-300 transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-gray-300 transition-colors">
              Terms & Conditions
            </Link>
            <a
              href="https://eliteclasslimo.ca"
              target="_blank"
              rel="noopener noreferrer"
              className="text-purple-400 hover:text-purple-300 transition-colors"
            >
              Client Spotlight: Elite Class Limo
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
