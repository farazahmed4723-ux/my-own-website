"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  Send,
  Sparkles,
  ExternalLink,
  Phone,
  Mail,
  ChevronRight,
  CheckCircle2,
  Maximize2,
  Minimize2,
  RotateCcw,
  Bot,
  MessageSquare,
} from "lucide-react";
import {
  BOT_CONFIG,
  INITIAL_SUGGESTIONS,
  ChatAction,
  ChatMessage,
  LeadData,
} from "@/lib/ai";

interface DisplayMessage {
  id: string;
  sender: "bot" | "user";
  text: string;
  time: string;
  leadCaptured?: boolean;
  lead?: LeadData | null;
  actions?: ChatAction[];
  isStreaming?: boolean;
}

export default function AIChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMaximized, setIsMaximized] = useState(false);
  const [inputText, setInputText] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [sessionId, setSessionId] = useState("sess-init");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Initialize or restore session ID
  useEffect(() => {
    try {
      const existing = sessionStorage.getItem("faraz-chat-session");
      if (existing) {
        setSessionId(existing);
      } else {
        const created = `sess-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
        sessionStorage.setItem("faraz-chat-session", created);
        setSessionId(created);
      }
    } catch {
      setSessionId(`sess-${Date.now()}`);
    }
  }, []);

  const getInitialMessages = useCallback((): DisplayMessage[] => [
    {
      id: "welcome-1",
      sender: "bot",
      text: "Hi there! 👋 I'm Faraz Ahmed's AI Assistant.\n\nI can answer questions about Faraz's 50+ delivered projects, pricing estimates, Next.js / WordPress development, custom RAG AI chatbots, or viral video editing.",
      time: "Just now",
    },
    {
      id: "welcome-2",
      sender: "bot",
      text: "How can I help you today? You can select a quick question below or type your project idea directly:",
      time: "Just now",
      actions: INITIAL_SUGGESTIONS,
    },
  ], []);

  const [messages, setMessages] = useState<DisplayMessage[]>(getInitialMessages);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  // Keyboard navigation: Escape key closes modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        setIsOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  // Global custom event listeners to toggle chat from anywhere on the website
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
      setTimeout(() => inputRef.current?.focus(), 250);
    }
  }, [messages, isOpen, isTyping]);

  const handleResetChat = () => {
    setMessages(getInitialMessages());
    setInputText("");
    setIsTyping(false);
  };

  // Streaming Message Sender
  const sendMessageToBackend = async (textToSend: string) => {
    const userMsg: DisplayMessage = {
      id: `user-${Date.now()}`,
      sender: "user",
      text: textToSend,
      time: "Just now",
    };

    setMessages((prev) => [...prev, userMsg]);
    setIsTyping(true);

    const botMessageId = `bot-${Date.now()}`;
    const streamingBotMsg: DisplayMessage = {
      id: botMessageId,
      sender: "bot",
      text: "",
      time: "Just now",
      isStreaming: true,
    };

    // Format conversation history for multi-turn context
    const historyPayload: ChatMessage[] = messages
      .filter((m) => m.id !== "welcome-1" && m.id !== "welcome-2")
      .slice(-6)
      .map((m) => ({
        role: m.sender === "user" ? "user" : "assistant",
        content: m.text,
      }));

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "text/event-stream",
        },
        body: JSON.stringify({
          message: textToSend,
          history: historyPayload,
          sessionId,
          stream: true,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        setIsTyping(false);
        setMessages((prev) => [
          ...prev,
          {
            id: `bot-err-${Date.now()}`,
            sender: "bot",
            text:
              errorData.error ||
              "I'm temporarily experiencing high traffic. Please feel free to message Faraz Ahmed directly on WhatsApp (+1 437-434-8789)!",
            time: "Just now",
            actions: [
              { label: "💬 Instant WhatsApp", url: BOT_CONFIG.whatsappUrl, isExternal: true },
              { label: "📋 Project Inquiry Form", url: BOT_CONFIG.contactUrl },
            ],
          },
        ]);
        return;
      }

      // Check if response is an SSE stream
      const contentType = response.headers.get("content-type") || "";
      if (contentType.includes("text/event-stream") && response.body) {
        // Append empty streaming bot message
        setMessages((prev) => [...prev, streamingBotMsg]);
        setIsTyping(false);

        const reader = response.body.getReader();
        const decoder = new TextDecoder();
        let buffer = "";
        let accumulatedText = "";
        let finalMetadata: any = null;

        while (true) {
          const { done, value } = await reader.read();
          if (done) break;

          buffer += decoder.decode(value, { stream: true });
          const parts = buffer.split("\n\n");
          buffer = parts.pop() || "";

          for (const block of parts) {
            const lines = block.split("\n");
            let eventType = "message";
            let dataStr = "";

            for (const line of lines) {
              if (line.startsWith("event:")) {
                eventType = line.replace(/^event:\s*/, "").trim();
              } else if (line.startsWith("data:")) {
                dataStr = line.replace(/^data:\s*/, "").trim();
              }
            }

            if (eventType === "delta") {
              try {
                const parsed = JSON.parse(dataStr);
                if (parsed.token) {
                  accumulatedText += parsed.token;
                  setMessages((prev) =>
                    prev.map((msg) =>
                      msg.id === botMessageId
                        ? { ...msg, text: accumulatedText, isStreaming: true }
                        : msg
                    )
                  );
                }
              } catch {
                // Ignore chunk parse error
              }
            } else if (eventType === "metadata") {
              try {
                finalMetadata = JSON.parse(dataStr);
              } catch {
                // Ignore parse error
              }
            }
          }
        }

        // Finalize message with metadata & action buttons
        setMessages((prev) =>
          prev.map((msg) =>
            msg.id === botMessageId
              ? {
                  ...msg,
                  text: accumulatedText || "Thank you for your inquiry! How else may I assist you?",
                  isStreaming: false,
                  leadCaptured: finalMetadata?.leadCaptured,
                  lead: finalMetadata?.lead,
                  actions: finalMetadata?.actions,
                }
              : msg
          )
        );
      } else {
        // Standard JSON fallback
        const data = await response.json();
        setIsTyping(false);
        setMessages((prev) => [
          ...prev,
          {
            id: botMessageId,
            sender: "bot",
            text: data.reply,
            time: "Just now",
            leadCaptured: data.leadCaptured,
            lead: data.lead,
            actions: data.actions,
          },
        ]);
      }
    } catch (err) {
      console.error("[Chat Stream Error]", err);
      setIsTyping(false);
      setMessages((prev) => [
        ...prev,
        {
          id: `bot-err-${Date.now()}`,
          sender: "bot",
          text: "You can reach Faraz Ahmed directly on WhatsApp (+1 437-434-8789) or via the contact inquiry page anytime!",
          time: "Just now",
          actions: [
            { label: "💬 Open WhatsApp", url: BOT_CONFIG.whatsappUrl, isExternal: true },
            { label: "📋 Contact Inquiry", url: BOT_CONFIG.contactUrl },
          ],
        },
      ]);
    }
  };

  const handleSend = () => {
    if (!inputText.trim() || isTyping) return;
    const userText = inputText.trim();
    setInputText("");
    sendMessageToBackend(userText);
  };

  const handlePreset = (text: string) => {
    if (isTyping) return;
    sendMessageToBackend(text);
  };

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label="Faraz Ahmed AI Assistant"
            initial={{ opacity: 0, y: 35, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 35, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 300, damping: 28 }}
            className={`fixed z-50 flex flex-col overflow-hidden select-none transition-all duration-300 shadow-[0_25px_70px_rgba(0,0,0,0.45)] dark:shadow-[0_25px_80px_rgba(0,0,0,0.85)] border border-slate-200/90 dark:border-purple-500/30 backdrop-blur-2xl ${
              isMaximized
                ? "right-2 sm:right-6 bottom-2 sm:bottom-6 w-[96vw] sm:w-[720px] max-w-[780px] h-[92vh] max-h-[860px] rounded-3xl bg-white/95 dark:bg-[#090D24]/95"
                : "right-2.5 sm:right-20 bottom-3 sm:bottom-8 w-[95vw] sm:w-[420px] max-w-[440px] h-[590px] max-h-[84vh] rounded-3xl bg-white/95 dark:bg-[#090D24]/95"
            }`}
          >
            {/* Header */}
            <div className="p-3.5 sm:p-4 bg-gradient-to-r from-slate-100 via-purple-50 to-indigo-50 dark:from-[#111738] dark:via-[#1A1842] dark:to-[#121332] border-b border-slate-200 dark:border-white/10 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="relative w-10 h-10 rounded-full p-[2px] bg-gradient-to-tr from-purple-500 to-indigo-500 shadow-md">
                  <div className="relative w-full h-full rounded-full overflow-hidden bg-slate-900">
                    <Image
                      src={BOT_CONFIG.avatarUrl}
                      alt={BOT_CONFIG.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-emerald-500 border-2 border-white dark:border-[#090D24] rounded-full" />
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <h3 className="font-heading font-bold text-sm text-slate-900 dark:text-white">
                      {BOT_CONFIG.name}
                    </h3>
                    <Sparkles className="w-3.5 h-3.5 text-purple-600 dark:text-purple-300" />
                  </div>
                  <p className="text-[11px] text-emerald-600 dark:text-emerald-400 font-medium flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    Online • AI Solutions Consultant
                  </p>
                </div>
              </div>

              {/* Window Controls */}
              <div className="flex items-center gap-1">
                {/* Reset Chat Button */}
                <button
                  type="button"
                  onClick={handleResetChat}
                  title="Reset Conversation"
                  aria-label="Reset Conversation"
                  className="p-1.5 rounded-lg text-slate-500 hover:text-slate-900 hover:bg-slate-200/60 dark:text-gray-400 dark:hover:text-white dark:hover:bg-white/10 transition-colors cursor-pointer"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>

                {/* Maximize / Minimize Button (Desktop & Tablet) */}
                <button
                  type="button"
                  onClick={() => setIsMaximized((prev) => !prev)}
                  title={isMaximized ? "Restore Window" : "Maximize Window"}
                  aria-label={isMaximized ? "Restore Window" : "Maximize Window"}
                  className="hidden sm:inline-flex p-1.5 rounded-lg text-slate-500 hover:text-slate-900 hover:bg-slate-200/60 dark:text-gray-400 dark:hover:text-white dark:hover:bg-white/10 transition-colors cursor-pointer"
                >
                  {isMaximized ? (
                    <Minimize2 className="w-4 h-4" />
                  ) : (
                    <Maximize2 className="w-4 h-4" />
                  )}
                </button>

                {/* Close Button */}
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  title="Close Assistant"
                  aria-label="Close Assistant"
                  className="p-1.5 rounded-lg text-slate-500 hover:text-slate-900 hover:bg-slate-200/60 dark:text-gray-400 dark:hover:text-white dark:hover:bg-white/10 transition-colors cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Chat Messages Body */}
            <div className="flex-1 p-3.5 sm:p-4 overflow-y-auto space-y-3.5 scrollbar-thin scrollbar-thumb-purple-500/20">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex flex-col ${
                    msg.sender === "user" ? "items-end" : "items-start"
                  }`}
                >
                  <div
                    className={`max-w-[88%] px-4 py-3 rounded-2xl text-xs sm:text-sm leading-relaxed ${
                      msg.sender === "user"
                        ? "bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-br-none shadow-md"
                        : "bg-slate-100 dark:bg-[#141A3D]/90 border border-slate-200/80 dark:border-white/10 text-slate-800 dark:text-gray-200 rounded-bl-none shadow-sm whitespace-pre-line"
                    }`}
                  >
                    {msg.leadCaptured && (
                      <div className="mb-2 inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-[10.5px] font-bold text-emerald-700 dark:text-emerald-300">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>Lead Saved to Secure Backend Vault</span>
                      </div>
                    )}

                    <div className="font-sans">{msg.text}</div>

                    {msg.isStreaming && (
                      <span className="inline-block w-1.5 h-3.5 bg-purple-500 ml-1 animate-pulse align-middle" />
                    )}
                  </div>

                  {/* Contextual Action Buttons */}
                  {msg.actions && msg.actions.length > 0 && !msg.isStreaming && (
                    <div className="flex flex-wrap gap-1.5 mt-2.5 max-w-[92%]">
                      {msg.actions.map((act, aIdx) => {
                        if (act.url) {
                          return (
                            <a
                              key={aIdx}
                              href={act.url}
                              target={act.isExternal ? "_blank" : undefined}
                              rel={act.isExternal ? "noopener noreferrer" : undefined}
                              className="px-3 py-1.5 rounded-xl bg-purple-50 hover:bg-purple-100 dark:bg-purple-950/70 dark:hover:bg-purple-900/80 border border-purple-200 dark:border-purple-500/30 text-[11px] font-semibold text-purple-700 dark:text-purple-200 flex items-center gap-1.5 transition-all shadow-sm"
                            >
                              <span>{act.label}</span>
                              <ExternalLink className="w-3 h-3 opacity-75" />
                            </a>
                          );
                        }
                        return (
                          <button
                            key={aIdx}
                            type="button"
                            onClick={() => {
                              if (act.preset) handlePreset(act.preset);
                            }}
                            className="px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-[#1D224E]/80 dark:hover:bg-purple-900/60 border border-slate-200 dark:border-white/15 text-[11px] font-medium text-slate-700 dark:text-gray-200 flex items-center gap-1.5 transition-all shadow-sm cursor-pointer"
                          >
                            <span>{act.label}</span>
                            <ChevronRight className="w-3 h-3 text-purple-500 dark:text-purple-400" />
                          </button>
                        );
                      })}
                    </div>
                  )}

                  <span className="text-[10px] text-slate-600 dark:text-gray-400 mt-1 px-1">
                    {msg.time}
                  </span>
                </div>
              ))}

              {isTyping && (
                <div className="flex items-center gap-1.5 px-3.5 py-2.5 rounded-2xl bg-slate-100 dark:bg-[#141A3D]/90 border border-slate-200 dark:border-white/10 text-slate-500 dark:text-gray-400 w-fit">
                  <span className="w-1.5 h-1.5 rounded-full bg-purple-500 animate-bounce" />
                  <span className="w-1.5 h-1.5 rounded-full bg-purple-500 animate-bounce [animation-delay:0.2s]" />
                  <span className="w-1.5 h-1.5 rounded-full bg-purple-500 animate-bounce [animation-delay:0.4s]" />
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Quick Human Handover Footer */}
            <div className="px-3.5 py-2 bg-slate-50 dark:bg-[#0C102C] border-t border-slate-200 dark:border-white/10 flex items-center justify-between text-[11px]">
              <span className="text-slate-500 dark:text-gray-400 font-medium">Direct Handover:</span>
              <div className="flex items-center gap-3">
                <a
                  href={BOT_CONFIG.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-emerald-600 dark:text-emerald-400 hover:underline flex items-center gap-1 font-bold transition-colors"
                >
                  <Phone className="w-3 h-3" />
                  <span>WhatsApp</span>
                </a>
                <span className="text-slate-300 dark:text-gray-600">•</span>
                <a
                  href={`mailto:${BOT_CONFIG.email}`}
                  className="text-indigo-600 dark:text-cyan-400 hover:underline flex items-center gap-1 font-bold transition-colors"
                >
                  <Mail className="w-3 h-3" />
                  <span>Email</span>
                </a>
                <span className="text-slate-300 dark:text-gray-600">•</span>
                <a
                  href={BOT_CONFIG.contactUrl}
                  className="text-purple-600 dark:text-purple-400 hover:underline flex items-center gap-1 font-bold transition-colors"
                >
                  <span>Quote</span>
                </a>
              </div>
            </div>

            {/* Input Bar */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSend();
              }}
              className="p-3 bg-white dark:bg-[#080B1F] border-t border-slate-200 dark:border-white/10 flex items-center gap-2"
            >
              <input
                ref={inputRef}
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder="Ask about pricing, services, or drop your email..."
                className="flex-1 px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-[#121636] border border-slate-200 dark:border-white/15 text-xs sm:text-sm text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-gray-400 focus:outline-none focus:border-purple-500 dark:focus:border-purple-400 transition-colors"
                id="ai-bot-chat-input"
                autoComplete="off"
              />
              <button
                type="submit"
                disabled={!inputText.trim() || isTyping}
                className="w-10 h-10 rounded-xl bg-gradient-to-tr from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white flex items-center justify-center hover:scale-105 active:scale-95 disabled:opacity-40 disabled:hover:scale-100 transition-all shadow-md cursor-pointer"
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
