import React from "react";
import type { Metadata } from "next";
import ContactPageClient from "@/components/ContactPageClient";
import { buildBreadcrumbJsonLd, buildPageMetadata, SITE_URL } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "Contact Toronto Web & AI Developer",
  description:
    "Get a custom quote from Toronto web developer Faraz Ahmed for Next.js, WordPress, AI chatbots or automation. Send a message or chat on WhatsApp.",
  path: "/contact",
  keywords: [
    "Hire Faraz Ahmed",
    "Contact AI by Faraz",
    "Hire Next.js Developer",
    "Hire AI Chatbot Developer",
    "Web Development Quote",
  ],
});

export default function ContactPage() {
  const breadcrumbJsonLd = buildBreadcrumbJsonLd([
    { name: "Home", path: "/" },
    { name: "Contact", path: "/contact" },
  ]);

  const contactPageJsonLd = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    name: "Contact Faraz Ahmed | AI by Faraz",
    url: `${SITE_URL}/contact`,
    description:
      "Direct project inquiry form and instant WhatsApp/email contact channels for AI by Faraz.",
    mainEntity: {
      "@id": `${SITE_URL}/#business`,
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(contactPageJsonLd) }}
      />
      <ContactPageClient />
    </>
  );
}
