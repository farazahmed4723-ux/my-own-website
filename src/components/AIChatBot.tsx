"use client";

import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  MessageSquare,
  X,
  Send,
  Sparkles,
  Bot,
  ExternalLink,
  Phone,
  Mail,
  ChevronRight,
  User,
} from "lucide-react";

interface Message {
  id: string;
  sender: "bot" | "user";
  text: string;
  time: string;
  actions?: { label: string; url?: string; onClick?: () => void; isExternal?: boolean }[];
}

export default function AIChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [inputText, setInputText] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const initialMessages: Message[] = [
    {
      id: "welcome-1",
      sender: "bot",
      text: "Hi there! 👋 I am Faraz Ahmed's AI Assistant. How can I help you today?",
      time: "Just now",
    },
    {
      id: "welcome-2",
      sender: "bot",
      text: "You can ask me about Faraz's background, core services, project pricing, or start a collaboration directly!",
      time: "Just now",
      actions: [
        { label: "👤 Who is Faraz Ahmed?", onClick: () => handlePreset("Who is Faraz Ahmed?") },
        { label: "🚀 What services do you offer?", onClick: () => handlePreset("What services do you offer?") },
        { label: "💰 Pricing & Cost Estimates", onClick: () => handlePreset("How much does a project cost?") },
        { label: "💬 Talk on WhatsApp", url: "https://wa.me/14374348789", isExternal: true },
      ],
    },
  ];

  const [messages, setMessages] = useState<Message[]>(initialMessages);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    const handleToggle = () => setIsOpen((prev) => !prev);
    const handleOpen = () => setIsOpen(true);
    window.addEventListener("toggle-faraz-ai-chat", handleToggle);
    window.addEventListener("open-faraz-ai-chat", handleOpen);
    return () => {
      window.removeEventListener("toggle-faraz-ai-chat", handleToggle);
      window.removeEventListener("open-faraz-ai-chat", handleOpen);
    };
  }, []);

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen, isTyping]);

  const generateResponse = (query: string): { text: string; actions?: Message["actions"] } => {
    const q = query.toLowerCase();

    // Who is Faraz
    if (q.includes("who is") || q.includes("about faraz") || q.includes("bio") || q.includes("faraz ahmed") || q.includes("who are you")) {
      return {
        text: "Faraz Ahmed is a dedicated Web Developer and AI Solutions Specialist with 2+ years of proven experience and 50+ completed client projects. He specializes in intelligent websites, AI chatbots, autonomous agents, business automations, and custom web applications.\n\nHe is the creator of Elite Class Limo's platform (eliteclasslimo.ca) and is known for delivering state-of-the-art digital experiences that drive real business growth.",
        actions: [
          { label: "Explore Services", url: "/services" },
          { label: "View Portfolio", url: "/portfolio" },
          { label: "Chat on WhatsApp", url: "https://wa.me/14374348789", isExternal: true },
        ],
      };
    }

    // Services
    if (q.includes("service") || q.includes("what do you do") || q.includes("offer") || q.includes("capabilities")) {
      return {
        text: "Faraz provides 6 core specialized digital services:\n\n1. ⚡ AI Automation — End-to-end workflow automation (n8n, Make, Zapier).\n2. 🤖 AI Chatbots — Custom 24/7 support assistants trained on your business data.\n3. 🌐 Website Development — High-performance Next.js and custom WordPress sites.\n4. 🧠 AI Agents — Autonomous task-oriented assistants with API integrations.\n5. 🛒 E-Commerce Solutions — High-converting Shopify & WooCommerce storefronts.\n6. 💻 Custom Software Development — Tailored web applications, dashboards, & SaaS MVPs.",
        actions: [
          { label: "Detailed Services Overview", url: "/services" },
          { label: "Discuss Your Project", url: "https://wa.me/14374348789", isExternal: true },
        ],
      };
    }

    // Pricing & Cost
    if (q.includes("price") || q.includes("cost") || q.includes("rate") || q.includes("quote") || q.includes("budget") || q.includes("paise")) {
      return {
        text: "Project pricing is fully transparent and customized based on your specific requirements:\n\n• High-Converting Landing Page / Business Website: 1-2 weeks delivery\n• Custom AI Chatbot / RAG Assistant: Custom tailored to your knowledge base\n• Business Automation & Workflow Systems: ROI-focused scalable packages\n• Custom Web Apps & SaaS MVPs: Milestone-based transparent estimates\n\nFaraz offers free discovery consultations with fixed-price quotes. Connect with Faraz directly below:",
        actions: [
          { label: "💬 Message on WhatsApp", url: "https://wa.me/14374348789", isExternal: true },
          { label: "✉️ Direct Email", url: "mailto:faraz.ahmed4724@gmail.com", isExternal: true },
        ],
      };
    }

    // WhatsApp / Contact
    if (q.includes("whatsapp") || q.includes("contact") || q.includes("email") || q.includes("phone") || q.includes("hire") || q.includes("call")) {
      return {
        text: "You can reach Faraz Ahmed directly through either of these instant channels:\n\n📱 WhatsApp: +1 (437) 434-8789\n✉️ Email: faraz.ahmed4724@gmail.com\n\nHe responds promptly to all new project inquiries!",
        actions: [
          { label: "Open WhatsApp Now", url: "https://wa.me/14374348789", isExternal: true },
          { label: "Send an Email", url: "mailto:faraz.ahmed4724@gmail.com", isExternal: true },
        ],
      };
    }

    // WordPress or Next.js
    if (q.includes("wordpress") || q.includes("nextjs") || q.includes("next.js") || q.includes("website") || q.includes("web development")) {
      return {
        text: "Yes! Faraz is an expert in both WordPress and Next.js. For non-technical clients who need easy content management, custom WordPress is fast and dependable. For high-speed web apps, custom animations, and SaaS platforms, Next.js + TypeScript + Tailwind delivers ultimate performance and 100/100 Lighthouse SEO.",
        actions: [
          { label: "View Website Development", url: "/services/website-development" },
          { label: "Book a Website Call", url: "https://wa.me/14374348789", isExternal: true },
        ],
      };
    }

    // Shopify / E-Commerce
    if (q.includes("shopify") || q.includes("woocommerce") || q.includes("store") || q.includes("ecommerce") || q.includes("e-commerce")) {
      return {
        text: "Faraz builds high-converting e-commerce storefronts on Shopify and WooCommerce with custom checkout flows, inventory automations, payment gateways, and lightning-fast product pages.",
        actions: [
          { label: "Explore E-commerce", url: "/services/ecommerce-solutions" },
          { label: "Discuss Store Build", url: "https://wa.me/14374348789", isExternal: true },
        ],
      };
    }

    // General fallback
    return {
      text: "Thanks for asking! Faraz Ahmed specializes in building tailored websites, AI chatbots, workflow automations, and custom software. Would you like to get a personalized quote or discuss this with Faraz directly?",
      actions: [
        { label: "💬 Chat on WhatsApp", url: "https://wa.me/14374348789", isExternal: true },
        { label: "✉️ Email Faraz", url: "mailto:faraz.ahmed4724@gmail.com", isExternal: true },
        { label: "Explore All Services", url: "/services" },
      ],
    };
  };

  const handleSend = () => {
    if (!inputText.trim()) return;

    const userText = inputText.trim();
    const userMsg: Message = {
      id: `user-${Date.now()}`,
      sender: "user",
      text: userText,
      time: "Just now",
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputText("");
    setIsTyping(true);

    setTimeout(() => {
      const reply = generateResponse(userText);
      const botMsg: Message = {
        id: `bot-${Date.now()}`,
        sender: "bot",
        text: reply.text,
        time: "Just now",
        actions: reply.actions,
      };
      setMessages((prev) => [...prev, botMsg]);
      setIsTyping(false);
    }, 650);
  };

  const handlePreset = (text: string) => {
    const userMsg: Message = {
      id: `user-${Date.now()}`,
      sender: "user",
      text,
      time: "Just now",
    };
    setMessages((prev) => [...prev, userMsg]);
    setIsTyping(true);

    setTimeout(() => {
      const reply = generateResponse(text);
      const botMsg: Message = {
        id: `bot-${Date.now()}`,
        sender: "bot",
        text: reply.text,
        time: "Just now",
        actions: reply.actions,
      };
      setMessages((prev) => [...prev, botMsg]);
      setIsTyping(false);
    }, 600);
  };

  return (
    <>
      {/* Interactive AI Chatbot Window (Triggered from Floating Social Bar or Service Cards) */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 280, damping: 25 }}
            className="fixed right-3 sm:right-20 bottom-4 sm:bottom-10 w-[94vw] sm:w-[420px] max-w-[440px] h-[580px] max-h-[82vh] rounded-3xl bg-[#090D24]/95 border border-purple-500/30 shadow-[0_25px_60px_rgba(0,0,0,0.85)] backdrop-blur-2xl z-50 flex flex-col overflow-hidden select-none"
          >
            {/* Header */}
            <div className="p-4 bg-gradient-to-r from-[#111738] via-[#1A1842] to-[#121332] border-b border-white/10 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="relative w-10 h-10 rounded-full p-[2px] bg-gradient-to-tr from-purple-500 to-cyan-400 shadow-[0_0_12px_rgba(168,85,247,0.4)]">
                  <div className="relative w-full h-full rounded-full overflow-hidden bg-black">
                    <Image
                      src="/images/logo.jpg"
                      alt="Faraz AI"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-emerald-400 border-2 border-[#090D24] rounded-full" />
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <h3 className="font-heading font-bold text-sm text-white">Faraz Ahmed AI</h3>
                    <Sparkles className="w-3.5 h-3.5 text-purple-300" />
                  </div>
                  <p className="text-[11px] text-emerald-400 font-medium flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    Online • AI Solutions Specialist
                  </p>
                </div>
              </div>

              <button
                onClick={() => setIsOpen(false)}
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-gray-300 hover:text-white flex items-center justify-center transition-colors"
                aria-label="Close AI Chatbot"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Chat Body */}
            <div className="flex-1 p-4 overflow-y-auto space-y-3.5 scrollbar-thin scrollbar-thumb-purple-900/40">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex flex-col ${
                    msg.sender === "user" ? "items-end" : "items-start"
                  }`}
                >
                  <div
                    className={`max-w-[85%] px-3.5 py-2.5 rounded-2xl text-xs sm:text-sm leading-relaxed ${
                      msg.sender === "user"
                        ? "bg-gradient-to-r from-[#7C3AED] to-[#9333EA] text-white rounded-br-none shadow-[0_4px_15px_rgba(124,58,237,0.3)]"
                        : "bg-[#141A3D]/90 border border-white/10 text-gray-200 rounded-bl-none shadow-md whitespace-pre-line"
                    }`}
                  >
                    {msg.text}
                  </div>

                  {/* Optional Action Buttons */}
                  {msg.actions && msg.actions.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 mt-2 max-w-[90%]">
                      {msg.actions.map((act, aIdx) => {
                        if (act.url) {
                          return (
                            <a
                              key={aIdx}
                              href={act.url}
                              target={act.isExternal ? "_blank" : undefined}
                              rel="noopener noreferrer"
                              className="px-2.5 py-1.5 rounded-xl bg-purple-950/70 hover:bg-purple-800/80 border border-purple-500/30 text-[11px] text-purple-200 hover:text-white flex items-center gap-1.5 transition-all shadow-sm"
                            >
                              <span>{act.label}</span>
                              <ExternalLink className="w-3 h-3 text-purple-300" />
                            </a>
                          );
                        }
                        return (
                          <button
                            key={aIdx}
                            onClick={act.onClick}
                            className="px-2.5 py-1.5 rounded-xl bg-[#1D224E]/80 hover:bg-purple-900/60 border border-white/15 text-[11px] text-gray-200 hover:text-white flex items-center gap-1.5 transition-all shadow-sm cursor-pointer"
                          >
                            <span>{act.label}</span>
                            <ChevronRight className="w-3 h-3 text-purple-400" />
                          </button>
                        );
                      })}
                    </div>
                  )}

                  <span className="text-[10px] text-gray-400 mt-1 px-1">
                    {msg.time}
                  </span>
                </div>
              ))}

              {isTyping && (
                <div className="flex items-center gap-1.5 px-3 py-2 rounded-2xl bg-[#141A3D]/90 border border-white/10 text-gray-400 w-fit">
                  <span className="w-1.5 h-1.5 rounded-full bg-purple-400 animate-bounce" />
                  <span className="w-1.5 h-1.5 rounded-full bg-purple-400 animate-bounce [animation-delay:0.2s]" />
                  <span className="w-1.5 h-1.5 rounded-full bg-purple-400 animate-bounce [animation-delay:0.4s]" />
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Quick Contact Footer Bar */}
            <div className="px-3 py-2 bg-[#0C102C] border-t border-white/10 flex items-center justify-between text-[11px]">
              <span className="text-gray-400">Direct Contact:</span>
              <div className="flex items-center gap-3">
                <a
                  href="https://wa.me/14374348789"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-emerald-400 hover:text-emerald-300 flex items-center gap-1 font-medium transition-colors"
                >
                  <Phone className="w-3 h-3" />
                  <span>WhatsApp</span>
                </a>
                <span className="text-gray-600">•</span>
                <a
                  href="mailto:faraz.ahmed4724@gmail.com"
                  className="text-cyan-400 hover:text-cyan-300 flex items-center gap-1 font-medium transition-colors"
                >
                  <Mail className="w-3 h-3" />
                  <span>Email</span>
                </a>
              </div>
            </div>

            {/* Input Bar */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSend();
              }}
              className="p-3 bg-[#080B1F] border-t border-white/10 flex items-center gap-2"
            >
              <input
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder="Ask about Faraz, services, pricing..."
                className="flex-1 px-3.5 py-2.5 rounded-xl bg-[#121636] border border-white/15 text-xs sm:text-sm text-white placeholder-gray-400 focus:outline-none focus:border-purple-400 transition-colors"
                id="ai-bot-chat-input"
              />
              <button
                type="submit"
                disabled={!inputText.trim()}
                className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#7C3AED] to-[#9333EA] text-white flex items-center justify-center hover:scale-105 active:scale-95 disabled:opacity-40 disabled:hover:scale-100 transition-all shadow-md cursor-pointer"
                aria-label="Send Message"
                id="ai-bot-chat-send-btn"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
