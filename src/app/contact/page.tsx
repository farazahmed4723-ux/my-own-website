import React from "react";
import type { Metadata } from "next";
import ContactPageClient from "@/components/ContactPageClient";
import { buildBreadcrumbJsonLd, buildPageMetadata, SITE_URL } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "Contact a Toronto Web Developer — Get a Free Quote",
  description:
    "Get a free quote from Toronto web developer Faraz Ahmed for a website, Shopify store, AI chatbot or automation. Message on WhatsApp or send your requirements.",
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
