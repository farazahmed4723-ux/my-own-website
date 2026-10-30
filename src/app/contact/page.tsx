import React from "react";
import type { Metadata } from "next";
import ContactPageClient from "@/components/ContactPageClient";
import { buildBreadcrumbJsonLd, buildPageMetadata, SITE_URL } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "Contact Faraz Ahmed — Start a Web or AI Project",
  description:
    "Request a custom project quote or schedule a discovery consultation with Faraz Ahmed for Next.js & WordPress websites, Shopify stores, AI chatbots, and workflow automations.",
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
