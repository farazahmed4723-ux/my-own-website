import React from "react";
import type { Metadata } from "next";
import dynamic from "next/dynamic";
import HeroSection from "@/components/HeroSection";
import AboutPreview from "@/components/AboutPreview";
import ServicesPreview from "@/components/ServicesPreview";
import { buildFaqJsonLd, SITE_URL } from "@/lib/seo";

// Code-split below-the-fold and desktop-only sections to dramatically reduce mobile initial JS bundle
const PortfolioPreview = dynamic(() => import("@/components/PortfolioPreview"));
const WhyChooseMeSection = dynamic(() => import("@/components/WhyChooseMeSection"));
const ProcessSection = dynamic(() => import("@/components/ProcessSection"));
const TechProficiencySection = dynamic(() => import("@/components/TechProficiencySection"));
const FAQSection = dynamic(() => import("@/components/FAQSection"));
const FounderJourneyCard = dynamic(() => import("@/components/FounderJourneyCard"));
const ContactCTA = dynamic(() => import("@/components/ContactCTA"));

export const metadata: Metadata = {
  alternates: {
    canonical: SITE_URL,
  },
};

export default function HomePage() {
  const faqJsonLd = buildFaqJsonLd();

  return (
    <div className="relative overflow-hidden">
      {/* Homepage FAQPage Rich Snippet Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      {/* 1. Mobile & Desktop Hero (Matches Pic 1) */}
      <HeroSection />

      {/* 2. Stats Strip + About Faraz (Matches Pic 2) */}
      <AboutPreview />

      {/* 3. Services: What I Can Do For You (Matches User Request & Attachment Screenshot) */}
      <ServicesPreview />

      {/* 4. Featured Projects & Solutions (Horizontal Swipe Carousel) */}
      <PortfolioPreview />

      {/* 5. Why Clients Choose My Digital Solutions */}
      <WhyChooseMeSection />

      {/* 6. Development Process: From Idea to Impact */}
      <ProcessSection />

      {/* Desktop Deep-Dive Engineering & Specialized Services */}
      <div className="hidden lg:block">
        <TechProficiencySection />
        <FounderJourneyCard />
      </div>

      {/* Comprehensive FAQs */}
      <FAQSection />

      {/* High-Conversion Contact CTA */}
      <ContactCTA />
    </div>
  );
}
