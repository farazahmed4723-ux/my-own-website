"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  Sparkles,
  ShieldCheck,
  Users,
  MessageSquare,
  Bot,
  Database,
  Download,
  Trash2,
  RefreshCw,
  Search,
  CheckCircle2,
  ExternalLink,
  ChevronRight,
  Sliders,
  Cpu,
  KeyRound,
  ArrowLeft,
  Mail,
  Phone,
} from "lucide-react";
import { KNOWLEDGE_BASE, retrieveKnowledgeContext } from "@/lib/ai";

export default function ChatbotAdminPage() {
  const [adminKey, setAdminKey] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // Dashboard Data
  const [stats, setStats] = useState<any>(null);
  const [providerHealth, setProviderHealth] = useState<any>(null);
  const [recentLeads, setRecentLeads] = useState<any[]>([]);
  const [activeTab, setActiveTab] = useState<"leads" | "analytics" | "kb" | "settings">("leads");

  // Leads Filter
  const [filterHotOnly, setFilterHotOnly] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  // KB Tester State
  const [testQuery, setTestQuery] = useState("");
  const [testResults, setTestResults] = useState<any>(null);

  useEffect(() => {
    const saved = localStorage.getItem("faraz-chatbot-admin-key");
    if (saved) {
      setAdminKey(saved);
      loadDashboardData(saved);
    }
  }, []);

  const loadDashboardData = async (keyToUse: string) => {
    setLoading(true);
    setErrorMsg(null);
    try {
      const res = await fetch(`/api/admin/chatbot?key=${encodeURIComponent(keyToUse)}`);
      const data = await res.json();
      if (res.ok && data.success) {
        setIsAuthenticated(true);
        localStorage.setItem("faraz-chatbot-admin-key", keyToUse);
        setStats(data.stats);
        setProviderHealth(data.providerHealth);
        setRecentLeads(data.recentLeads || []);
      } else {
        setIsAuthenticated(false);
        setErrorMsg(data.error || "Authentication failed. Check your admin secret key.");
      }
    } catch (err: any) {
      setErrorMsg("Network error connecting to Admin API.");
    } finally {
      setLoading(false);
    }
  };

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!adminKey.trim()) return;
    loadDashboardData(adminKey.trim());
  };

  const handleExportCSV = () => {
    if (recentLeads.length === 0) return;
    const headers = ["Date", "Session ID", "Email", "Phone", "Intent", "Hot Lead", "User Message", "Bot Reply"];
    const rows = recentLeads.map((l) => [
      l.created_at || "",
      l.session_id || "",
      l.captured_email || "",
      l.captured_phone || "",
      l.intent || "",
      l.is_hot_lead ? "YES" : "NO",
      `"${(l.user_message || "").replace(/"/g, '""')}"`,
      `"${(l.bot_response || "").replace(/"/g, '""')}"`,
    ]);

    const csvContent = "data:text/csv;charset=utf-8," + [headers.join(","), ...rows.map((r) => r.join(","))].join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `faraz-chat-leads-${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleTestKnowledge = () => {
    if (!testQuery.trim()) return;
    const res = retrieveKnowledgeContext(testQuery.trim(), 3);
    setTestResults(res);
  };

  const filteredLeads = recentLeads.filter((lead) => {
    if (filterHotOnly && !lead.is_hot_lead) return false;
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    return (
      (lead.captured_email && lead.captured_email.toLowerCase().includes(q)) ||
      (lead.captured_phone && lead.captured_phone.toLowerCase().includes(q)) ||
      (lead.user_message && lead.user_message.toLowerCase().includes(q)) ||
      (lead.intent && lead.intent.toLowerCase().includes(q))
    );
  });

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#070A1E] text-slate-900 dark:text-gray-100 transition-colors">
      {/* Top Navbar */}
      <header className="sticky top-0 z-30 bg-white/80 dark:bg-[#0A0E2A]/80 backdrop-blur-md border-b border-slate-200 dark:border-white/10 px-4 sm:px-8 py-3.5 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link
            href="/"
            className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-white/5 dark:hover:bg-white/10 text-slate-700 dark:text-gray-300 transition-colors"
            title="Back to Website"
          >
            <ArrowLeft className="w-4 h-4" />
          </Link>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-purple-600 to-indigo-600 flex items-center justify-center text-white shadow-md">
              <Bot className="w-4 h-4" />
            </div>
            <div>
              <h1 className="font-heading font-bold text-sm sm:text-base text-slate-900 dark:text-white leading-tight">
                AI Assistant Management Console
              </h1>
              <p className="text-[11px] text-slate-600 dark:text-gray-400">
                AI by Faraz • Conversational Sales & Lead System
              </p>
            </div>
          </div>
        </div>

        {isAuthenticated && (
          <div className="flex items-center gap-2">
            <button
              onClick={() => loadDashboardData(adminKey)}
              disabled={loading}
              className="px-3 py-1.5 rounded-lg border border-slate-200 dark:border-white/10 text-xs font-medium text-slate-700 dark:text-gray-300 hover:bg-slate-100 dark:hover:bg-white/5 flex items-center gap-1.5 transition-colors"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${loading ? "animate-spin text-purple-500" : ""}`} />
              <span className="hidden sm:inline">Refresh</span>
            </button>
            <button
              onClick={() => {
                localStorage.removeItem("faraz-chatbot-admin-key");
                setIsAuthenticated(false);
              }}
              className="px-3 py-1.5 rounded-lg bg-rose-50 hover:bg-rose-100 dark:bg-rose-500/10 dark:hover:bg-rose-500/20 text-rose-600 dark:text-rose-400 text-xs font-medium transition-colors"
            >
              Sign Out
            </button>
          </div>
        )}
      </header>

      <main className="max-w-7xl mx-auto p-4 sm:p-8 space-y-6">
        {/* Auth Gate Modal if not authenticated */}
        {!isAuthenticated ? (
          <div className="max-w-md mx-auto my-16 p-6 sm:p-8 rounded-3xl bg-white dark:bg-[#0C102C] border border-slate-200 dark:border-white/10 shadow-2xl space-y-5">
            <div className="w-12 h-12 rounded-2xl bg-purple-500/10 border border-purple-500/30 flex items-center justify-center text-purple-600 dark:text-purple-400 mx-auto">
              <KeyRound className="w-6 h-6" />
            </div>
            <div className="text-center">
              <h2 className="font-heading font-extrabold text-xl text-slate-900 dark:text-white">
                Admin Authentication
              </h2>
              <p className="text-xs text-slate-600 dark:text-gray-400 mt-1">
                Enter your Admin Secret Key to access captured leads and AI configuration.
              </p>
            </div>

            <form onSubmit={handleLoginSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-gray-300 mb-1.5">
                  Admin Passcode / Secret Key
                </label>
                <input
                  type="password"
                  value={adminKey}
                  onChange={(e) => setAdminKey(e.target.value)}
                  placeholder="Enter secret key (e.g. faraz-ai-admin-2026)"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-[#14183E] border border-slate-200 dark:border-white/15 text-sm text-slate-900 dark:text-white focus:outline-none focus:border-purple-500"
                />
              </div>

              {errorMsg && (
                <div className="p-3 rounded-xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-500/30 text-xs text-rose-600 dark:text-rose-300">
                  {errorMsg}
                </div>
              )}

              <button
                type="submit"
                disabled={loading || !adminKey.trim()}
                className="w-full py-2.5 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-bold text-sm shadow-lg shadow-purple-600/30 disabled:opacity-50 transition-all cursor-pointer"
              >
                {loading ? "Authenticating..." : "Unlock Management Console"}
              </button>
            </form>

            <p className="text-[11px] text-center text-slate-600 dark:text-gray-400">
              Default development key: <code className="font-mono text-purple-600 dark:text-purple-400">faraz-ai-admin-2026</code>
            </p>
          </div>
        ) : (
          <>
            {/* KPI Cards Row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {/* Total Conversations */}
              <div className="p-5 rounded-2xl bg-white dark:bg-[#0B0F2E] border border-slate-200 dark:border-white/10 shadow-sm flex items-center justify-between">
                <div>
                  <p className="text-xs font-medium text-slate-600 dark:text-gray-400">Total Interactions</p>
                  <h3 className="font-heading font-extrabold text-2xl text-slate-900 dark:text-white mt-1">
                    {stats?.totalInteractions || 0}
                  </h3>
                  <span className="text-[10px] text-emerald-500 font-semibold flex items-center gap-1 mt-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                    Supabase PostgreSQL Synced
                  </span>
                </div>
                <div className="w-12 h-12 rounded-2xl bg-purple-500/10 text-purple-600 dark:text-purple-400 flex items-center justify-center">
                  <MessageSquare className="w-6 h-6" />
                </div>
              </div>

              {/* Hot Leads Captured */}
              <div className="p-5 rounded-2xl bg-white dark:bg-[#0B0F2E] border border-slate-200 dark:border-white/10 shadow-sm flex items-center justify-between">
                <div>
                  <p className="text-xs font-medium text-slate-600 dark:text-gray-400">Captured Hot Leads</p>
                  <h3 className="font-heading font-extrabold text-2xl text-emerald-600 dark:text-emerald-400 mt-1">
                    {stats?.totalHotLeads || 0}
                  </h3>
                  <span className="text-[10px] text-slate-600 dark:text-gray-400 mt-1 block">
                    Email / WhatsApp Verified
                  </span>
                </div>
                <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
                  <Users className="w-6 h-6" />
                </div>
              </div>

              {/* Active AI Provider */}
              <div className="p-5 rounded-2xl bg-white dark:bg-[#0B0F2E] border border-slate-200 dark:border-white/10 shadow-sm flex items-center justify-between">
                <div>
                  <p className="text-xs font-medium text-slate-600 dark:text-gray-400">Active AI Model</p>
                  <h3 className="font-heading font-extrabold text-lg text-slate-900 dark:text-white mt-1 capitalize">
                    {providerHealth?.provider === "fallback" ? "RAG Knowledge Engine" : providerHealth?.provider}
                  </h3>
                  <span className="text-[10px] text-purple-600 dark:text-purple-400 font-mono mt-1 block truncate max-w-[160px]">
                    {providerHealth?.model}
                  </span>
                </div>
                <div className="w-12 h-12 rounded-2xl bg-blue-500/10 text-blue-600 dark:text-blue-400 flex items-center justify-center">
                  <Cpu className="w-6 h-6" />
                </div>
              </div>

              {/* Knowledge Base */}
              <div className="p-5 rounded-2xl bg-white dark:bg-[#0B0F2E] border border-slate-200 dark:border-white/10 shadow-sm flex items-center justify-between">
                <div>
                  <p className="text-xs font-medium text-slate-600 dark:text-gray-400">Knowledge Chunks</p>
                  <h3 className="font-heading font-extrabold text-2xl text-slate-900 dark:text-white mt-1">
                    {stats?.knowledgeChunksCount || KNOWLEDGE_BASE.length}
                  </h3>
                  <span className="text-[10px] text-slate-600 dark:text-gray-400 mt-1 block">
                    Bio, 7 Services, Pricing & Video
                  </span>
                </div>
                <div className="w-12 h-12 rounded-2xl bg-amber-500/10 text-amber-600 dark:text-amber-400 flex items-center justify-center">
                  <Database className="w-6 h-6" />
                </div>
              </div>
            </div>

            {/* Navigation Tabs */}
            <div className="flex border-b border-slate-200 dark:border-white/10 space-x-1 sm:space-x-3 overflow-x-auto scrollbar-none">
              <button
                onClick={() => setActiveTab("leads")}
                className={`px-4 py-2.5 text-xs sm:text-sm font-semibold border-b-2 whitespace-nowrap transition-colors cursor-pointer ${
                  activeTab === "leads"
                    ? "border-purple-600 text-purple-600 dark:border-purple-400 dark:text-purple-400"
                    : "border-transparent text-slate-600 hover:text-slate-900 dark:text-gray-400 dark:hover:text-white"
                }`}
              >
                📋 Captured Leads ({recentLeads.filter((l) => l.is_hot_lead).length})
              </button>
              <button
                onClick={() => setActiveTab("analytics")}
                className={`px-4 py-2.5 text-xs sm:text-sm font-semibold border-b-2 whitespace-nowrap transition-colors cursor-pointer ${
                  activeTab === "analytics"
                    ? "border-purple-600 text-purple-600 dark:border-purple-400 dark:text-purple-400"
                    : "border-transparent text-slate-600 hover:text-slate-900 dark:text-gray-400 dark:hover:text-white"
                }`}
              >
                📊 Conversation Analytics
              </button>
              <button
                onClick={() => setActiveTab("kb")}
                className={`px-4 py-2.5 text-xs sm:text-sm font-semibold border-b-2 whitespace-nowrap transition-colors cursor-pointer ${
                  activeTab === "kb"
                    ? "border-purple-600 text-purple-600 dark:border-purple-400 dark:text-purple-400"
                    : "border-transparent text-slate-600 hover:text-slate-900 dark:text-gray-400 dark:hover:text-white"
                }`}
              >
                🧠 Knowledge Base & Tester
              </button>
              <button
                onClick={() => setActiveTab("settings")}
                className={`px-4 py-2.5 text-xs sm:text-sm font-semibold border-b-2 whitespace-nowrap transition-colors cursor-pointer ${
                  activeTab === "settings"
                    ? "border-purple-600 text-purple-600 dark:border-purple-400 dark:text-purple-400"
                    : "border-transparent text-slate-600 hover:text-slate-900 dark:text-gray-400 dark:hover:text-white"
                }`}
              >
                ⚙️ Provider & System Config
              </button>
            </div>

            {/* TAB 1: CAPTURED LEADS TABLE */}
            {activeTab === "leads" && (
              <div className="space-y-4">
                <div className="flex flex-col sm:flex-row gap-3 items-center justify-between">
                  <div className="relative w-full sm:w-72">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <input
                      type="text"
                      placeholder="Search leads, email, phone..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full pl-9 pr-3.5 py-2 rounded-xl bg-white dark:bg-[#0D1236] border border-slate-200 dark:border-white/10 text-xs sm:text-sm text-slate-900 dark:text-white focus:outline-none focus:border-purple-500"
                    />
                  </div>

                  <div className="flex items-center gap-2.5 w-full sm:w-auto justify-end">
                    <label className="flex items-center gap-1.5 text-xs text-slate-700 dark:text-gray-300 font-medium cursor-pointer">
                      <input
                        type="checkbox"
                        checked={filterHotOnly}
                        onChange={(e) => setFilterHotOnly(e.target.checked)}
                        className="rounded border-slate-300 text-purple-600 focus:ring-purple-500"
                      />
                      <span>Hot Leads Only</span>
                    </label>

                    <button
                      onClick={handleExportCSV}
                      className="px-3.5 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold flex items-center gap-1.5 shadow-md shadow-purple-600/20 transition-all cursor-pointer"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>Export CSV</span>
                    </button>
                  </div>
                </div>

                <div className="rounded-2xl bg-white dark:bg-[#0A0E2A] border border-slate-200 dark:border-white/10 shadow-sm overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs">
                      <thead className="bg-slate-50 dark:bg-white/5 border-b border-slate-200 dark:border-white/10 text-slate-500 dark:text-gray-400 font-semibold uppercase tracking-wider">
                        <tr>
                          <th className="p-3.5">Time / Date</th>
                          <th className="p-3.5">Lead Contact</th>
                          <th className="p-3.5">Intent</th>
                          <th className="p-3.5">User Inquiry</th>
                          <th className="p-3.5">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100 dark:divide-white/5 text-slate-700 dark:text-gray-300">
                        {filteredLeads.length === 0 ? (
                          <tr>
                            <td colSpan={5} className="p-8 text-center text-slate-600 dark:text-gray-400">
                              No leads matching this filter yet. Start a chat in the AI assistant to test!
                            </td>
                          </tr>
                        ) : (
                          filteredLeads.map((lead, idx) => (
                            <tr key={lead.id || idx} className="hover:bg-slate-50/70 dark:hover:bg-white/[0.02] transition-colors">
                              <td className="p-3.5 font-mono text-[11px] text-slate-500 dark:text-gray-400 whitespace-nowrap">
                                {lead.created_at ? new Date(lead.created_at).toLocaleString() : "Recent"}
                              </td>
                              <td className="p-3.5">
                                {lead.captured_email && (
                                  <div className="flex items-center gap-1 text-slate-900 dark:text-white font-semibold">
                                    <Mail className="w-3 h-3 text-purple-500" />
                                    <span>{lead.captured_email}</span>
                                  </div>
                                )}
                                {lead.captured_phone && (
                                  <div className="flex items-center gap-1 text-emerald-600 dark:text-emerald-400 font-semibold mt-0.5">
                                    <Phone className="w-3 h-3" />
                                    <span>{lead.captured_phone}</span>
                                  </div>
                                )}
                                {!lead.captured_email && !lead.captured_phone && (
                                  <span className="text-slate-400 dark:text-gray-500 italic">No direct contact</span>
                                )}
                              </td>
                              <td className="p-3.5">
                                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-purple-100 dark:bg-purple-500/20 text-purple-700 dark:text-purple-300 border border-purple-200 dark:border-purple-500/30">
                                  {lead.intent || "general"}
                                </span>
                              </td>
                              <td className="p-3.5 max-w-xs truncate" title={lead.user_message}>
                                {lead.user_message}
                              </td>
                              <td className="p-3.5 whitespace-nowrap">
                                {lead.captured_phone ? (
                                  <a
                                    href={`https://wa.me/${lead.captured_phone.replace(/\D/g, "")}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="px-2.5 py-1 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-white font-bold text-[11px] inline-flex items-center gap-1"
                                  >
                                    WhatsApp
                                  </a>
                                ) : lead.captured_email ? (
                                  <a
                                    href={`mailto:${lead.captured_email}`}
                                    className="px-2.5 py-1 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-bold text-[11px] inline-flex items-center gap-1"
                                  >
                                    Email
                                  </a>
                                ) : (
                                  <span className="text-slate-400 text-[11px]">—</span>
                                )}
                              </td>
                            </tr>
                          ))
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}

            {/* TAB 2: CONVERSATION ANALYTICS */}
            {activeTab === "analytics" && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="p-6 rounded-2xl bg-white dark:bg-[#0A0E2A] border border-slate-200 dark:border-white/10 shadow-sm space-y-4">
                  <h3 className="font-heading font-bold text-base text-slate-900 dark:text-white">
                    User Inquiries by Topic
                  </h3>
                  <div className="space-y-3">
                    {Object.entries(stats?.intentBreakdown || {}).map(([intent, count]: any) => (
                      <div key={intent} className="space-y-1">
                        <div className="flex justify-between text-xs font-semibold capitalize">
                          <span>{intent.replace("_", " ")}</span>
                          <span className="text-purple-600 dark:text-purple-400">{count} inquiries</span>
                        </div>
                        <div className="w-full h-2 rounded-full bg-slate-100 dark:bg-white/10 overflow-hidden">
                          <div
                            className="h-full bg-gradient-to-r from-purple-500 to-indigo-500 rounded-full"
                            style={{
                              width: `${Math.min(100, Math.max(8, (count / Math.max(1, stats?.totalInteractions || 1)) * 100))}%`,
                            }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="p-6 rounded-2xl bg-white dark:bg-[#0A0E2A] border border-slate-200 dark:border-white/10 shadow-sm space-y-4">
                  <h3 className="font-heading font-bold text-base text-slate-900 dark:text-white">
                    Lead Conversion Health
                  </h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 rounded-xl bg-purple-50 dark:bg-purple-950/30 border border-purple-200 dark:border-purple-500/20">
                      <div>
                        <p className="text-xs text-purple-700 dark:text-purple-300 font-medium">Conversion Rate</p>
                        <h4 className="font-heading font-extrabold text-2xl text-purple-900 dark:text-white mt-0.5">
                          {stats?.totalInteractions > 0
                            ? `${Math.round(((stats?.totalHotLeads || 0) / stats.totalInteractions) * 100)}%`
                            : "0%"}
                        </h4>
                      </div>
                      <Sparkles className="w-8 h-8 text-purple-500 opacity-60" />
                    </div>

                    <p className="text-xs text-slate-600 dark:text-gray-400 leading-relaxed">
                      Every time a visitor shares their phone or email, the AI automatically creates a Hot Lead record in Supabase and triggers an instant notification to Faraz Ahmed.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* TAB 3: KNOWLEDGE BASE EXPLORER & TESTER */}
            {activeTab === "kb" && (
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-1 p-6 rounded-2xl bg-white dark:bg-[#0A0E2A] border border-slate-200 dark:border-white/10 shadow-sm space-y-4">
                  <h3 className="font-heading font-bold text-base text-slate-900 dark:text-white">
                    Semantic Retrieval Tester
                  </h3>
                  <p className="text-xs text-slate-600 dark:text-gray-400">
                    Type a question below to see exactly which business knowledge chunks the RAG system extracts before answering.
                  </p>

                  <div className="space-y-2">
                    <input
                      type="text"
                      placeholder="e.g. How much does a website cost?"
                      value={testQuery}
                      onChange={(e) => setTestQuery(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-[#14183E] border border-slate-200 dark:border-white/10 text-xs sm:text-sm text-slate-900 dark:text-white focus:outline-none focus:border-purple-500"
                    />
                    <button
                      onClick={handleTestKnowledge}
                      className="w-full py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs shadow-md transition-all cursor-pointer"
                    >
                      Run Retrieval Test
                    </button>
                  </div>

                  {testResults && (
                    <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 space-y-2">
                      <span className="text-[11px] font-bold text-purple-600 dark:text-purple-400 uppercase tracking-wider block">
                        Matched {testResults.matchedChunks.length} Chunks:
                      </span>
                      {testResults.matchedChunks.map((chunk: any) => (
                        <div key={chunk.id} className="text-xs p-2 rounded-lg bg-white dark:bg-[#0B0F2E] border border-slate-200 dark:border-white/10">
                          <strong className="text-slate-900 dark:text-white block">{chunk.title}</strong>
                          <span className="text-[10px] text-slate-500 font-mono">Category: {chunk.category}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <div className="lg:col-span-2 space-y-3">
                  <h3 className="font-heading font-bold text-base text-slate-900 dark:text-white">
                    Active Knowledge Chunks ({KNOWLEDGE_BASE.length})
                  </h3>
                  <div className="space-y-3 max-h-[600px] overflow-y-auto pr-1">
                    {KNOWLEDGE_BASE.map((chunk) => (
                      <div
                        key={chunk.id}
                        className="p-4 rounded-xl bg-white dark:bg-[#0A0E2A] border border-slate-200 dark:border-white/10 space-y-2 shadow-sm"
                      >
                        <div className="flex items-center justify-between">
                          <h4 className="font-heading font-bold text-sm text-slate-900 dark:text-white">
                            {chunk.title}
                          </h4>
                          <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-slate-100 dark:bg-white/5 text-purple-600 dark:text-purple-400">
                            {chunk.category}
                          </span>
                        </div>
                        <p className="text-xs text-slate-600 dark:text-gray-300 whitespace-pre-line leading-relaxed font-sans">
                          {chunk.content}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* TAB 4: PROVIDER & SYSTEM SETTINGS */}
            {activeTab === "settings" && (
              <div className="max-w-3xl space-y-6">
                <div className="p-6 rounded-2xl bg-white dark:bg-[#0A0E2A] border border-slate-200 dark:border-white/10 shadow-sm space-y-4">
                  <h3 className="font-heading font-bold text-base text-slate-900 dark:text-white">
                    AI Provider Configuration Status
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div className="p-4 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10">
                      <div className="flex items-center justify-between mb-1">
                        <strong className="text-xs text-slate-900 dark:text-white">Google Gemini</strong>
                        {providerHealth?.availableProviders?.gemini ? (
                          <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                        ) : (
                          <span className="text-[10px] text-slate-400">Not configured</span>
                        )}
                      </div>
                      <span className="text-[11px] text-slate-500 font-mono">GEMINI_API_KEY</span>
                    </div>

                    <div className="p-4 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10">
                      <div className="flex items-center justify-between mb-1">
                        <strong className="text-xs text-slate-900 dark:text-white">OpenAI GPT-4o</strong>
                        {providerHealth?.availableProviders?.openai ? (
                          <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                        ) : (
                          <span className="text-[10px] text-slate-400">Not configured</span>
                        )}
                      </div>
                      <span className="text-[11px] text-slate-500 font-mono">OPENAI_API_KEY</span>
                    </div>

                    <div className="p-4 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10">
                      <div className="flex items-center justify-between mb-1">
                        <strong className="text-xs text-slate-900 dark:text-white">Anthropic Claude</strong>
                        {providerHealth?.availableProviders?.anthropic ? (
                          <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                        ) : (
                          <span className="text-[10px] text-slate-400">Not configured</span>
                        )}
                      </div>
                      <span className="text-[11px] text-slate-500 font-mono">ANTHROPIC_API_KEY</span>
                    </div>
                  </div>

                  <p className="text-xs text-slate-600 dark:text-gray-400 leading-relaxed">
                    The AI architecture is completely provider-independent. Adding a <code className="font-mono text-purple-600 dark:text-purple-400">GEMINI_API_KEY</code> or <code className="font-mono text-purple-600 dark:text-purple-400">OPENAI_API_KEY</code> to your environment variables instantly upgrades the streaming LLM responses without rebuilding the app.
                  </p>
                </div>
              </div>
            )}
          </>
        )}
      </main>
    </div>
  );
}
