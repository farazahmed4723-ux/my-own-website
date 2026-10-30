import React from "react";
import type { Metadata } from "next";
import HeroSection from "@/components/HeroSection";
import ServicesPreview from "@/components/ServicesPreview";
import AboutPreview from "@/components/AboutPreview";
import TechProficiencySection from "@/components/TechProficiencySection";
import PortfolioPreview from "@/components/PortfolioPreview";
import ProcessSection from "@/components/ProcessSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import FAQSection from "@/components/FAQSection";
import FounderJourneyCard from "@/components/FounderJourneyCard";
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

      {/* 1. Hero Section */}
      <HeroSection />

      {/* 2. Specialized Services Showcase (All 6 Core Services) */}
      <ServicesPreview />

      {/* 3. About Faraz Ahmed */}
      <AboutPreview />

      {/* 4. Core Engineering Proficiency & Technical Stack */}
      <TechProficiencySection />

      {/* 5. Genuine Client Project (Elite Class Limo) + Portfolio */}
      <PortfolioPreview />

      {/* 6. 6-Step Development Process */}
      <ProcessSection />

      {/* 7. Verified Client Testimonials */}
      <TestimonialsSection />

      {/* 8. Comprehensive FAQs */}
      <FAQSection />

      {/* 9. Personal Founder Journey & Signature Showcase Card */}
      <FounderJourneyCard />

      {/* 10. High-Conversion Contact CTA */}
      <ContactCTA />
    </div>
  );
}
