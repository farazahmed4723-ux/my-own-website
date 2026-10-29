import React from "react";
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

export default function HomePage() {
  return (
    <div className="relative overflow-hidden">
      {/* 1. Hero Section matching website-reference.png */}
      <HeroSection />

      {/* 2. Specialized Services Showcase (All 6 Required Services) */}
      <ServicesPreview />

      {/* 3. About Faraz Ahmed */}
      <AboutPreview />

      {/* 4. Core Engineering Proficiency & Technical Stack */}
      <TechProficiencySection />

      {/* 5. Genuine Client Project (Elite Class Limo) + Portfolio */}
      <PortfolioPreview />

      {/* 5. 6-Step Development Process */}
      <ProcessSection />

      {/* 6. Client Testimonials */}
      <TestimonialsSection />

      {/* 7. Comprehensive FAQs */}
      <FAQSection />

      {/* 8. Personal Founder Journey & Signature Showcase Card */}
      <FounderJourneyCard />

      {/* 9. High-Conversion Contact CTA */}
      <ContactCTA />
    </div>
  );
}
