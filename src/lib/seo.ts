import type { Metadata } from "next";
import { servicesData, ServiceItem } from "@/data/services";
import { faqsData } from "@/data/faqs";
import { verifiedReviewsData } from "@/data/reviews";
import { portfolioProjects } from "@/data/portfolio";

const rawEnvUrl = process.env.NEXT_PUBLIC_APP_URL || "";
export const SITE_URL =
  rawEnvUrl.startsWith("http") && !rawEnvUrl.includes("localhost")
    ? rawEnvUrl.replace(/\/$/, "")
    : "https://aibyfaraz.com";

export const SITE_NAME = "AI by Faraz";
export const FOUNDER_NAME = "Faraz Ahmed";

interface PageSeoOptions {
  title: string;
  description: string;
  path: string;
  keywords?: string[];
  noIndex?: boolean;
}

export function buildPageMetadata({
  title,
  description,
  path,
  keywords = [],
  noIndex = false,
}: PageSeoOptions): Metadata {
  const canonicalUrl = `${SITE_URL}${path === "/" ? "" : path}`;
  const fullSocialTitle = title.includes(SITE_NAME) ? title : `${title} | ${SITE_NAME}`;

  return {
    title,
    description,
    keywords: [
      "AI by Faraz",
      "Faraz Ahmed",
      "Web Developer",
      "AI Solutions Specialist",
      "Next.js Developer",
      "WordPress Developer",
      "Custom AI Chatbots",
      "AI Automation Agency",
      ...keywords,
    ],
    alternates: {
      canonical: canonicalUrl,
    },
    robots: noIndex
      ? { index: false, follow: true }
      : {
          index: true,
          follow: true,
          googleBot: {
            index: true,
            follow: true,
            "max-video-preview": -1,
            "max-image-preview": "large",
            "max-snippet": -1,
          },
        },
    openGraph: {
      type: "website",
      locale: "en_US",
      url: canonicalUrl,
      siteName: SITE_NAME,
      title: fullSocialTitle,
      description,
      images: [
        {
          url: `${SITE_URL}/images/website-reference.png`,
          width: 1200,
          height: 630,
          alt: `${SITE_NAME} — ${FOUNDER_NAME} | Web Developer & AI Solutions Specialist`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: fullSocialTitle,
      description,
      images: [`${SITE_URL}/images/website-reference.png`],
    },
  };
}

export function buildGlobalGraphJsonLd() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        "@id": `${SITE_URL}/#faraz`,
        name: FOUNDER_NAME,
        alternateName: "Faraz Ahmad",
        jobTitle: "Full-Stack Web Developer & AI Solutions Specialist",
        url: SITE_URL,
        image: `${SITE_URL}/images/faraz-portrait.webp`,
        email: "faraz.ahmed4724@gmail.com",
        telephone: "+14374348789",
        sameAs: [
          "https://www.linkedin.com/in/faraz-ahmad-b11b36437/",
          "https://www.instagram.com/aibyfaraz",
          "https://www.facebook.com/aibyfaraz",
          "https://github.com/farazahmed4723-ux",
        ],
        knowsAbout: [
          "Next.js",
          "React.js",
          "TypeScript",
          "WordPress Development",
          "Shopify E-Commerce",
          "WooCommerce",
          "AI Chatbots & RAG Systems",
          "Autonomous AI Agents",
          "CRM & Business Workflow Automation",
          "Supabase & PostgreSQL Architecture",
          "Technical SEO & Core Web Vitals",
        ],
        worksFor: {
          "@id": `${SITE_URL}/#business`,
        },
      },
      {
        "@type": "ProfessionalService",
        "@id": `${SITE_URL}/#business`,
        name: SITE_NAME,
        url: SITE_URL,
        logo: `${SITE_URL}/images/logo.jpg`,
        image: `${SITE_URL}/images/website-reference.png`,
        priceRange: "$$",
        founder: {
          "@id": `${SITE_URL}/#faraz`,
        },
        description:
          "AI by Faraz is a modern web engineering and AI automation studio led by Faraz Ahmed, delivering high-converting Next.js & WordPress websites, Shopify stores, custom 24/7 AI chatbots, autonomous AI agents, and CRM workflow automations.",
        telephone: "+14374348789",
        email: "faraz.ahmed4724@gmail.com",
        areaServed: [
          { "@type": "Country", name: "Canada" },
          { "@type": "Country", name: "United States" },
          { "@type": "Country", name: "United Kingdom" },
          { "@type": "Country", name: "United Arab Emirates" },
          { "@type": "Place", name: "Worldwide" },
        ],
        sameAs: [
          "https://www.linkedin.com/in/faraz-ahmad-b11b36437/",
          "https://www.instagram.com/aibyfaraz",
          "https://www.facebook.com/aibyfaraz",
        ],
        contactPoint: [
          {
            "@type": "ContactPoint",
            telephone: "+1-437-434-8789",
            email: "faraz.ahmed4724@gmail.com",
            contactType: "customer service",
            availableLanguage: ["English", "Urdu"],
          },
        ],
        aggregateRating: {
          "@type": "AggregateRating",
          ratingValue: "5.0",
          bestRating: "5",
          worstRating: "1",
          ratingCount: String(verifiedReviewsData.length),
          reviewCount: String(verifiedReviewsData.length),
        },
        review: verifiedReviewsData.map((rev) => ({
          "@type": "Review",
          author: {
            "@type": "Person",
            name: rev.clientName,
          },
          datePublished: rev.publishedDate,
          reviewBody: rev.quote,
          name: `${rev.company} — ${rev.projectType}`,
          reviewRating: {
            "@type": "Rating",
            ratingValue: String(rev.rating),
            bestRating: "5",
            worstRating: "1",
          },
        })),
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: "Web Engineering & AI Automation Services",
          itemListElement: servicesData.map((svc, idx) => ({
            "@type": "Offer",
            position: idx + 1,
            itemOffered: {
              "@type": "Service",
              name: svc.title,
              description: svc.shortDescription,
              url: `${SITE_URL}/services/${svc.slug}`,
            },
          })),
        },
      },
      {
        "@type": "WebSite",
        "@id": `${SITE_URL}/#website`,
        url: SITE_URL,
        name: SITE_NAME,
        inLanguage: "en-US",
        description:
          "Official website of AI by Faraz — Next.js & WordPress Web Development, Custom AI Chatbots, Shopify Stores, and Intelligent Business Automation.",
        publisher: {
          "@id": `${SITE_URL}/#faraz`,
        },
      },
    ],
  };
}

export function buildBreadcrumbJsonLd(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, idx) => ({
      "@type": "ListItem",
      position: idx + 1,
      name: item.name,
      item: `${SITE_URL}${item.path === "/" ? "" : item.path}`,
    })),
  };
}

export function buildFaqJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqsData.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}

export function buildServiceDetailJsonLd(service: ServiceItem) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${SITE_URL}/services/${service.slug}#service`,
    name: service.title,
    serviceType: service.badge,
    description: service.fullDescription,
    url: `${SITE_URL}/services/${service.slug}`,
    provider: {
      "@id": `${SITE_URL}/#business`,
    },
    areaServed: "Worldwide",
    termsOfService: `${SITE_URL}/terms`,
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: `${service.title} Deliverables`,
      itemListElement: service.features.map((feat, idx) => ({
        "@type": "Offer",
        position: idx + 1,
        itemOffered: {
          "@type": "Service",
          name: feat,
        },
      })),
    },
  };
}

export function buildPortfolioCollectionJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Portfolio & Verified Client Case Studies — AI by Faraz",
    url: `${SITE_URL}/portfolio`,
    description:
      "Verified client websites, luxury web deployments, and AI automation architectures engineered by Faraz Ahmed.",
    mainEntity: {
      "@type": "ItemList",
      itemListElement: portfolioProjects.map((proj, idx) => ({
        "@type": "ListItem",
        position: idx + 1,
        item: {
          "@type": "CreativeWork",
          name: proj.title,
          description: proj.description,
          url: proj.liveUrl || `${SITE_URL}/portfolio`,
          creator: {
            "@id": `${SITE_URL}/#faraz`,
          },
        },
      })),
    },
  };
}

export function buildProcessHowToJsonLd(
  steps: { step: string; title: string; desc: string }[]
) {
  return {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: "6-Stage Web Engineering & AI Solutions Development Process",
    description:
      "How Faraz Ahmed plans, designs, develops, tests, and deploys high-converting websites and AI automation pipelines.",
    step: steps.map((s, idx) => ({
      "@type": "HowToStep",
      position: idx + 1,
      name: s.title,
      text: s.desc,
      url: `${SITE_URL}/process#step-${s.step}`,
    })),
  };
}
