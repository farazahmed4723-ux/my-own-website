import React from "react";
import type { Metadata } from "next";
import HeroSection from "@/components/HeroSection";
import AboutPreview from "@/components/AboutPreview";
import PortfolioPreview from "@/components/PortfolioPreview";
import TestimonialsSection from "@/components/TestimonialsSection";
import WhyChooseMeSection from "@/components/WhyChooseMeSection";
import ProcessSection from "@/components/ProcessSection";
import ServicesPreview from "@/components/ServicesPreview";
import TechProficiencySection from "@/components/TechProficiencySection";
import FAQSection from "@/components/FAQSection";
import FounderJourneyCard from "@/components/FounderJourneyCard";
import CustomerReviewSection from "@/components/CustomerReviewSection";
import ContactCTA from "@/components/ContactCTA";
import { buildFaqJsonLd, SITE_URL } from "@/lib/seo";

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

      {/* 3. Featured Projects & Solutions (Horizontal Swipe Carousel, Matches Pic 6) */}
      <PortfolioPreview />

      {/* 4. Client Reviews & Real Chat Proofs (Matches Pic 4) */}
      <TestimonialsSection />

      {/* 5. Why Clients Choose My Digital Solutions (Matches Pic 3 & Latest Screenshot) */}
      <WhyChooseMeSection />

      {/* 6. Development Process: From Idea to Impact (Matches Latest Screenshot) */}
      <ProcessSection />

      {/* Desktop Deep-Dive Engineering & Specialized Services (Preserved for Desktop) */}
      <div className="hidden lg:block">
        <ServicesPreview />
        <TechProficiencySection />
        <FounderJourneyCard />
      </div>

      {/* Comprehensive FAQs */}
      <FAQSection />

      {/* Client Review Submission ("Write a Review") */}
      <CustomerReviewSection />

      {/* High-Conversion Contact CTA */}
      <ContactCTA />
    </div>
  );
}
