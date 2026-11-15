import React from "react";
import Link from "next/link";
import { Metadata } from "next";
import {
  Sparkles,
  MessageCircle,
  Play,
  CheckCircle2,
  ArrowRight,
  Clock,
  Film,
  Zap,
  Type,
  Sliders,
  Volume2,
  Smartphone,
  ShieldCheck,
  ChevronRight,
} from "lucide-react";
import { buildPageMetadata, buildBreadcrumbJsonLd, SITE_URL } from "@/lib/seo";
import VideoPortfolioGallery from "@/components/VideoPortfolioGallery";
import BeforeAfterPlayer from "@/components/BeforeAfterPlayer";
import {
  BEFORE_AFTER_DATA,
  BEFORE_AFTER_SAMPLES,
  WHAT_YOU_GET_ITEMS,
  THREE_STEP_PROCESS,
  VIDEO_PACKAGES,
  VIDEO_FAQS,
  VIDEO_SHOWCASE_REELS,
} from "@/data/videos";
import VideoFaqAccordion from "@/components/VideoFaqAccordion";

export const metadata: Metadata = buildPageMetadata({
  path: "/video-editing",
  title: "Viral Video Editing & Motion Graphics | AI by Faraz",
  description:
    "Turn your raw phone recordings into scroll-stopping Instagram Reels, TikToks & YouTube Shorts. Bold Roman Urdu captions, 3D text behind subject, audio cleanup, and SFX.",
  keywords: [
    "Video Editing",
    "Viral Reels Editor",
    "Roman Urdu Captions",
    "3D Rotoscoping",
    "Instagram Reels Editing",
    "TikTok Video Editor",
    "YouTube Shorts Editing",
    "Faraz Ahmed Video Editor",
    "Motion Graphics Pakistan",
  ],
});

export default function VideoEditingPage() {
  const breadcrumbJsonLd = buildBreadcrumbJsonLd([
    { name: "Home", path: "/" },
    { name: "Video Editing", path: "/video-editing" },
  ]);

  const videoObjectJsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: VIDEO_SHOWCASE_REELS.map((reel, index) => ({
      "@type": "ListItem",
      position: index + 1,
      item: {
        "@type": "VideoObject",
        name: reel.title,
        description: reel.tagline,
        thumbnailUrl: `${SITE_URL}${reel.posterUrl}`,
        contentUrl: `${SITE_URL}${reel.videoUrl}`,
        uploadDate: "2026-11-08T00:00:00+05:00",
        duration: "PT1M",
        caption: reel.styleTag,
      },
    })),
  };

  const getIcon = (name: string) => {
    switch (name) {
      case "Type":
        return <Type className="w-5 h-5 text-sky-400" />;
      case "Sparkles":
        return <Sparkles className="w-5 h-5 text-purple-400" />;
      case "Volume2":
        return <Volume2 className="w-5 h-5 text-emerald-400" />;
      case "Sliders":
        return <Sliders className="w-5 h-5 text-amber-400" />;
      case "Zap":
        return <Zap className="w-5 h-5 text-rose-400" />;
      case "Smartphone":
        return <Smartphone className="w-5 h-5 text-indigo-400" />;
      default:
        return <Film className="w-5 h-5 text-purple-400" />;
    }
  };

  return (
    <div className="pt-28 sm:pt-36 pb-24 px-4 sm:px-6 lg:px-8 bg-transparent text-slate-900 dark:text-white relative overflow-hidden transition-colors duration-300">
      {/* Ambient Lighting Orbs */}
      <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[900px] h-[450px] bg-gradient-to-b from-purple-500/15 dark:from-purple-600/30 via-sky-400/10 dark:via-sky-500/18 to-transparent rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-1/3 -left-32 w-[550px] h-[550px] bg-indigo-500/10 dark:bg-indigo-600/18 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 -right-32 w-[600px] h-[600px] bg-purple-500/10 dark:bg-purple-600/18 rounded-full blur-[140px] pointer-events-none" />

      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(videoObjectJsonLd) }}
      />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Breadcrumb */}
        <div className="mb-6 flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-purple-600 dark:text-purple-400">
          <Link href="/" className="hover:text-purple-800 dark:hover:text-white transition-colors">
            Home
          </Link>
          <span>/</span>
          <span className="text-slate-500 dark:text-gray-300">Video Editing</span>
        </div>

        {/* ========================================================
            HERO SECTION
            ======================================================== */}
        <div className="max-w-4xl mx-auto text-center mb-16 sm:mb-24">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-purple-100 dark:bg-purple-900/40 border border-purple-300/80 dark:border-purple-500/30 text-purple-700 dark:text-purple-300 text-xs font-semibold uppercase tracking-wider mb-5 shadow-sm">
            <Film className="w-3.5 h-3.5 text-purple-600 dark:text-purple-400" />
            <span>High-Retention Video Editing &amp; Viral Reels</span>
          </div>

          <h1 className="font-heading text-3xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-[1.15] mb-5">
            Aapki Raw Video <span className="text-purple-600 dark:text-purple-400">&rarr;</span>{" "}
            <span className="gradient-text-purple">Viral Reel</span>
          </h1>

          <p className="text-sm sm:text-lg text-slate-600 dark:text-gray-300 leading-relaxed max-w-2xl mx-auto mb-8 font-normal">
            I turn your phone recordings into scroll-stopping Reels, TikToks &amp; YouTube Shorts.
            Word-by-word Roman Urdu captions, 3D text behind you, clean studio sound, and motion graphics — all done.
          </p>

          {/* Hero CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 mb-10">
            <a
              href="#samples"
              className="w-full sm:w-auto px-7 py-3.5 rounded-full bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-bold text-sm flex items-center justify-center gap-2 shadow-[0_0_25px_rgba(99,102,241,0.4)] transition-all hover:scale-105"
            >
              <Play className="w-4 h-4 fill-white" />
              <span>Watch Video Samples</span>
            </a>

            <a
              href="https://wa.me/14374348789?text=Hi%20Faraz,%20I%20want%20video%20editing%20for%20my%20reels"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-7 py-3.5 rounded-full bg-[#25D366] hover:bg-[#20ba59] text-black font-extrabold text-sm flex items-center justify-center gap-2 shadow-[0_0_25px_rgba(37,211,102,0.35)] transition-all hover:scale-105"
            >
              <MessageCircle className="w-4 h-4 fill-black" />
              <span>Order on WhatsApp</span>
            </a>
          </div>

          {/* Trust Metrics Pill */}
          <div className="inline-flex flex-wrap items-center justify-center gap-2 sm:gap-4 px-4 py-2.5 rounded-2xl bg-white/80 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-[11px] sm:text-xs text-slate-700 dark:text-gray-300 shadow-sm">
            <span className="flex items-center gap-1.5 font-medium">
              <Clock className="w-3.5 h-3.5 text-purple-600 dark:text-purple-400" />
              <span>24–48h Turnaround</span>
            </span>
            <span className="text-slate-300 dark:text-white/20">•</span>
            <span className="flex items-center gap-1.5 font-medium">
              <Sparkles className="w-3.5 h-3.5 text-amber-500 dark:text-amber-400" />
              <span>3D Text Behind Subject</span>
            </span>
            <span className="text-slate-300 dark:text-white/20">•</span>
            <span className="flex items-center gap-1.5 font-medium">
              <Volume2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
              <span>Saaf Audio Guaranteed</span>
            </span>
            <span className="text-slate-300 dark:text-white/20">•</span>
            <span className="flex items-center gap-1.5 font-medium">
              <Smartphone className="w-3.5 h-3.5 text-sky-600 dark:text-sky-400" />
              <span>9:16 Vertical HD</span>
            </span>
          </div>
        </div>

        {/* ========================================================
            BEFORE / AFTER INTERACTIVE COMPARISON
            ======================================================== */}
        <div className="mb-20 sm:mb-28">
          <BeforeAfterPlayer samples={BEFORE_AFTER_SAMPLES} />
        </div>

        {/* ========================================================
            REEL WALL / SAMPLES SECTION
            ======================================================== */}
        <div id="samples" className="mb-20 sm:mb-28 scroll-mt-28">
          <div className="max-w-3xl mb-10">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-purple-100 dark:bg-purple-900/30 border border-purple-300 dark:border-purple-500/30 text-purple-700 dark:text-purple-300 text-xs font-semibold uppercase tracking-wider mb-3">
              <Film className="w-3.5 h-3.5 text-purple-600 dark:text-purple-400" />
              <span>Real Portfolio Reels</span>
            </div>
            <h2 className="font-heading text-2xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-3">
              Reels Wall — <span className="gradient-text-purple">Choose Your Style</span>
            </h2>
            <p className="text-sm text-slate-600 dark:text-gray-300">
              Hover to preview or click any reel to watch with full audio. Every edit is custom-crafted for high watch time and organic shares.
            </p>
          </div>

          <VideoPortfolioGallery compactHeader />
        </div>

        {/* ========================================================
            WHAT YOU GET SECTION (6-ICON GRID)
            ======================================================== */}
        <div className="mb-20 sm:mb-28">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-semibold uppercase tracking-wider text-purple-600 dark:text-purple-400">
              Comprehensive Post-Production
            </span>
            <h2 className="font-heading text-2xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight mt-1 mb-3">
              Har Video Mein <span className="gradient-text-purple">Aapko Kya Milega?</span>
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-gray-300">
              Zero compromises. Every single reel gets the full VIP treatment from first hook to final color grade.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {WHAT_YOU_GET_ITEMS.map((item, idx) => (
              <div
                key={idx}
                className="p-6 rounded-2xl bg-white dark:bg-[#0f142e] border border-slate-200/90 dark:border-white/10 shadow-sm dark:shadow-none hover:border-purple-400 dark:hover:border-purple-500/40 transition-all duration-300 hover:-translate-y-1"
              >
                <div className="w-10 h-10 rounded-xl bg-purple-50 dark:bg-white/5 border border-purple-200/60 dark:border-white/10 flex items-center justify-center mb-4">
                  {getIcon(item.icon)}
                </div>
                <h3 className="font-heading text-base sm:text-lg font-bold text-slate-900 dark:text-white mb-2">
                  {item.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-gray-400 leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* ========================================================
            3-STEP SIMPLE PROCESS
            ======================================================== */}
        <div className="mb-20 sm:mb-28">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-semibold uppercase tracking-wider text-purple-600 dark:text-purple-400">
              Hassle-Free Workflow
            </span>
            <h2 className="font-heading text-2xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight mt-1 mb-3">
              3 Aasan Steps Mein <span className="gradient-text-purple">Video Ready</span>
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-gray-300">
              Aap bas record karein, baqi saara technical kaam mera hai.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {THREE_STEP_PROCESS.map((st, idx) => (
              <div
                key={idx}
                className="relative p-7 rounded-2xl bg-white dark:bg-[#0f142e] border border-slate-200/90 dark:border-white/10 shadow-sm dark:shadow-none flex flex-col justify-between hover:border-purple-400 dark:hover:border-purple-500/30 transition-all"
              >
                <div>
                  <span className="font-mono text-3xl font-extrabold text-purple-500/40 dark:text-purple-400/50 block mb-3">
                    {st.step}
                  </span>
                  <h3 className="font-heading text-xl font-bold text-slate-900 dark:text-white mb-2">
                    {st.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 dark:text-gray-400 leading-relaxed">
                    {st.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ========================================================
            PRICING & PACKAGES
            ======================================================== */}
        <div id="pricing" className="mb-20 sm:mb-28 scroll-mt-28">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-semibold uppercase tracking-wider text-purple-600 dark:text-purple-400">
              Transparent Pricing
            </span>
            <h2 className="font-heading text-2xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight mt-1 mb-3">
              Video Editing <span className="gradient-text-purple">Packages</span>
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-gray-300">
              Choose single reel editing or monthly creator packages. No hidden fees.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 items-stretch">
            {VIDEO_PACKAGES.map((pkg) => (
              <div
                key={pkg.id}
                className={`relative rounded-3xl p-7 flex flex-col justify-between transition-all duration-300 ${
                  pkg.isPopular
                    ? "bg-white dark:bg-gradient-to-b dark:from-[#181c44] dark:to-[#0f1330] border-2 border-purple-500 shadow-xl shadow-purple-500/15 dark:shadow-[0_0_40px_rgba(139,92,246,0.35)] sm:-translate-y-2"
                    : "bg-white dark:bg-[#0f142e] border border-slate-200/90 dark:border-white/10 shadow-sm dark:shadow-none hover:border-purple-400 dark:hover:border-purple-500/30"
                }`}
              >
                {pkg.isPopular && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                    <span className="px-3.5 py-1 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 text-white text-[11px] font-extrabold uppercase tracking-wider shadow-lg">
                      🔥 Most Popular
                    </span>
                  </div>
                )}

                <div>
                  <h3 className="font-heading text-xl font-bold text-slate-900 dark:text-white mb-1">
                    {pkg.name}
                  </h3>
                  <p className="text-xs text-slate-600 dark:text-gray-400 mb-5 min-h-[32px]">
                    {pkg.tagline}
                  </p>

                  <div className="flex items-baseline gap-2 mb-6 pb-6 border-b border-slate-200 dark:border-white/10">
                    <span className="font-heading text-4xl font-extrabold text-slate-900 dark:text-white">
                      {pkg.price}
                    </span>
                    {pkg.period && (
                      <span className="text-xs text-slate-500 dark:text-gray-400 font-medium">
                        {pkg.period}
                      </span>
                    )}
                  </div>

                  <div className="space-y-2.5 mb-8">
                    {pkg.features.map((feat, i) => (
                      <div key={i} className="flex items-start gap-2 text-xs text-slate-700 dark:text-gray-300">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 dark:text-emerald-400 mt-0.5 shrink-0" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <a
                  href={`https://wa.me/14374348789?text=${encodeURIComponent(
                    pkg.whatsappMessage
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`w-full py-3 rounded-xl font-bold text-xs flex items-center justify-center gap-2 transition-all ${
                    pkg.isPopular
                      ? "bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white shadow-lg shadow-purple-600/30 hover:scale-105"
                      : "bg-slate-100 dark:bg-white/10 hover:bg-slate-200 dark:hover:bg-white/20 text-slate-900 dark:text-white hover:scale-105"
                  }`}
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Order on WhatsApp</span>
                </a>
              </div>
            ))}
          </div>
        </div>

        {/* ========================================================
            FAQ ACCORDION
            ======================================================== */}
        <div className="mb-20 sm:mb-28 max-w-3xl mx-auto">
          <div className="text-center mb-10">
            <span className="text-xs font-semibold uppercase tracking-wider text-purple-600 dark:text-purple-400">
              Clear Answers
            </span>
            <h2 className="font-heading text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight mt-1 mb-3">
              Frequently Asked <span className="gradient-text-purple">Questions</span>
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-gray-300">
              Everything you need to know before ordering your video edit.
            </p>
          </div>

          <VideoFaqAccordion faqs={VIDEO_FAQS} />
        </div>

        {/* ========================================================
            FINAL BOTTOM CTA BAND
            ======================================================== */}
        <div className="p-8 sm:p-14 rounded-3xl bg-gradient-to-r from-purple-900/60 via-indigo-900/60 to-blue-900/60 text-white border border-purple-500/40 text-center relative overflow-hidden shadow-2xl">
          <div className="absolute -right-20 -top-20 w-64 h-64 bg-purple-500/20 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -left-20 -bottom-20 w-64 h-64 bg-blue-500/20 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 max-w-2xl mx-auto">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs font-semibold uppercase tracking-wider mb-4">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              <span>Available for New Projects</span>
            </div>

            <h2 className="font-heading text-2xl sm:text-4xl font-extrabold text-white mb-3">
              Apni Video Ko Viral Banayein!
            </h2>

            <p className="text-xs sm:text-base text-purple-100 mb-8 leading-relaxed">
              Bas raw phone recording send karein — captions, 3D text layers, SFX, aur dynamic cuts ke sath 24–48 hours mein final reel haasil karein.
            </p>

            <a
              href="https://wa.me/14374348789?text=Hi%20Faraz,%20I%20have%20raw%20video%20footage%20and%20want%20to%20get%20started"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 px-8 py-4 rounded-full bg-[#25D366] hover:bg-[#20ba59] text-black font-extrabold text-sm sm:text-base shadow-[0_0_35px_rgba(37,211,102,0.4)] transition-all hover:scale-105"
            >
              <MessageCircle className="w-5 h-5 fill-black" />
              <span>WhatsApp Par Baat Karein</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
