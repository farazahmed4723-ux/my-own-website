import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import { servicesData, serviceSeo, serviceLocalContent } from "@/data/services";
import {
  Cpu,
  Bot,
  Code,
  Zap,
  ShoppingBag,
  Terminal,
  Globe,
  Layers,
  Film,
  CheckCircle2,
  ArrowRight,
  Sparkles,
  Phone,
  ArrowLeft,
} from "lucide-react";

interface ServicePageProps {
  params: {
    slug: string;
  };
}

const iconMap: Record<string, React.ElementType> = {
  Cpu,
  Bot,
  Code,
  Zap,
  ShoppingBag,
  Terminal,
  Globe,
  Layers,
  Film,
};

import {
  buildBreadcrumbJsonLd,
  buildPageMetadata,
  buildServiceDetailJsonLd,
  SITE_URL,
} from "@/lib/seo";
import VideoPortfolioGallery from "@/components/VideoPortfolioGallery";

export async function generateStaticParams() {
  return servicesData.map((service) => ({
    slug: service.slug,
  }));
}

export async function generateMetadata({ params }: ServicePageProps): Promise<Metadata> {
  const service = servicesData.find((s) => s.slug === params.slug);
  if (!service) {
    return { title: "Service Not Found" };
  }

  const seo = serviceSeo[service.slug];
  const metadata = buildPageMetadata({
    title: seo?.title ?? `${service.title} Toronto — ${service.tagline}`,
    description:
      seo?.description ??
      `${service.shortDescription} Toronto-based, engineered by Faraz Ahmed.`,
    path: `/services/${service.slug}`,
    keywords: [...(seo?.keywords ?? []), service.title, service.badge, ...service.technologies],
  });

  // /video-editing is the main video page; point search engines there to avoid
  // two pages competing for the same "video editing" searches.
  if (service.slug === "video-editing") {
    metadata.alternates = { canonical: `${SITE_URL}/video-editing` };
  }

  return metadata;
}

export default function ServiceDetailPage({ params }: ServicePageProps) {
  const service = servicesData.find((s) => s.slug === params.slug);

  if (!service) {
    notFound();
  }

  const Icon = iconMap[service.icon] || Code;
  const breadcrumbJsonLd = buildBreadcrumbJsonLd([
    { name: "Home", path: "/" },
    { name: "Services", path: "/services" },
    { name: service.title, path: `/services/${service.slug}` },
  ]);
  const serviceJsonLd = buildServiceDetailJsonLd(service);
  const local = serviceLocalContent[service.slug];
  const serviceFaqJsonLd = local
    ? {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: local.faqs.map((faq) => ({
          "@type": "Question",
          name: faq.question,
          acceptedAnswer: { "@type": "Answer", text: faq.answer },
        })),
      }
    : null;

  return (
    <div className="pt-28 sm:pt-36 pb-24 px-4 sm:px-6 lg:px-8 bg-transparent text-slate-900 dark:text-white relative overflow-hidden transition-colors duration-300">
      {/* Ambient Lighting Orbs */}
      <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[900px] h-[450px] bg-gradient-to-b from-purple-600/15 via-sky-500/10 to-transparent dark:from-purple-600/30 dark:via-sky-500/18 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-1/3 -left-32 w-[550px] h-[550px] bg-indigo-500/10 dark:bg-indigo-600/18 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 -right-32 w-[600px] h-[600px] bg-purple-500/10 dark:bg-purple-600/18 rounded-full blur-[140px] pointer-events-none" />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }}
      />
      {serviceFaqJsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceFaqJsonLd) }}
        />
      )}
      <div className="max-w-5xl mx-auto">
        {/* Back Link & Breadcrumbs */}
        <div className="flex items-center justify-between mb-8">
          <Link
            href="/services"
            className="inline-flex items-center gap-2 text-xs font-semibold text-slate-600 dark:text-gray-400 hover:text-slate-900 dark:hover:text-white transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to All Services</span>
          </Link>

          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-purple-600 dark:text-purple-400">
            <Link href="/" className="hover:text-slate-900 dark:hover:text-white transition-colors">
              Home
            </Link>
            <span>/</span>
            <Link href="/services" className="hover:text-slate-900 dark:hover:text-white transition-colors">
              Services
            </Link>
            <span>/</span>
            <span className="text-slate-600 dark:text-gray-300">{service.title}</span>
          </div>
        </div>

        {/* Hero Section of Service */}
        <div className="rounded-3xl p-8 sm:p-12 glass-card border border-purple-200 dark:border-purple-500/30 mb-14 relative overflow-hidden shadow-lg">
          <div className="absolute top-0 right-0 w-96 h-96 bg-purple-600/10 dark:bg-purple-600/15 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-14 h-14 rounded-2xl bg-purple-100 dark:bg-purple-600/30 border border-purple-200 dark:border-purple-500/40 flex items-center justify-center text-purple-600 dark:text-purple-300 shadow-md">
                <Icon className="w-7 h-7" />
              </div>
              <span className="px-3.5 py-1.5 rounded-full bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-xs font-semibold uppercase tracking-wider text-purple-700 dark:text-purple-300">
                {service.badge}
              </span>
            </div>

            <h1 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-4 leading-tight">
              {service.title}
            </h1>
            <p className="text-lg text-purple-600 dark:text-purple-300 font-medium mb-6">
              {service.tagline}
            </p>
            <p className="text-base text-slate-600 dark:text-gray-300 leading-relaxed max-w-3xl mb-8">
              {service.fullDescription}
            </p>

            <div className="flex flex-wrap items-center gap-4">
              <Link
                href={`/contact?service=${service.slug}`}
                id="service-cta-inquire"
                className="px-7 py-3.5 rounded-full bg-gradient-to-r from-[#8B5CF6] to-[#A855F7] text-white font-semibold text-sm shadow-[0_0_20px_rgba(139,92,246,0.5)] hover:scale-105 transition-all flex items-center gap-2"
              >
                <span>Request {service.title} Consultation</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <a
                href="https://wa.me/14374348789"
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3.5 rounded-full bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-300 dark:border-emerald-500/40 text-emerald-700 dark:text-emerald-300 hover:text-emerald-900 dark:hover:text-white font-medium text-sm flex items-center gap-2 transition-all shadow-sm"
              >
                <Phone className="w-4 h-4" />
                <span>Discuss on WhatsApp</span>
              </a>
            </div>
          </div>
        </div>

        {/* Live Video Editing Portfolio Showcase (Rendered on /services/video-editing) */}
        {service.slug === "video-editing" && (
          <div className="mb-16">
            <VideoPortfolioGallery />
          </div>
        )}

        {/* Features & Deliverables Grid */}
        <div className="mb-16">
          <div className="mb-8">
            <span className="text-xs font-semibold uppercase tracking-wider text-purple-600 dark:text-purple-400">
              Scope of Capabilities
            </span>
            <h2 className="font-heading text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white mt-1">
              What&apos;s Included In This Service
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {service.features.map((feature, idx) => (
              <div
                key={idx}
                className="p-5 rounded-xl bg-white dark:bg-white/[0.03] border border-slate-200/90 dark:border-white/[0.08] flex items-start gap-3 hover:border-purple-500/40 transition-colors shadow-sm"
              >
                <CheckCircle2 className="w-5 h-5 text-purple-600 dark:text-purple-400 mt-0.5 shrink-0" />
                <span className="text-sm text-slate-800 dark:text-gray-200 font-medium leading-relaxed">
                  {feature}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Real-World Use Cases */}
        <div className="mb-16">
          <div className="mb-8">
            <span className="text-xs font-semibold uppercase tracking-wider text-purple-600 dark:text-purple-400">
              Practical Applications
            </span>
            <h2 className="font-heading text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white mt-1">
              Common Business Use Cases
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {service.useCases.map((useCase, idx) => (
              <div key={idx} className="p-6 rounded-2xl glass-card border border-slate-200/90 dark:border-white/10 shadow-sm">
                <div className="w-8 h-8 rounded-lg bg-purple-100 dark:bg-purple-900/30 border border-purple-200 dark:border-purple-500/30 flex items-center justify-center text-purple-700 dark:text-purple-300 font-bold text-xs mb-3">
                  0{idx + 1}
                </div>
                <p className="text-sm text-slate-700 dark:text-gray-300 leading-relaxed font-medium">
                  {useCase}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Development & Implementation Roadmap */}
        <div className="mb-16">
          <div className="mb-8">
            <span className="text-xs font-semibold uppercase tracking-wider text-purple-600 dark:text-purple-400">
              Execution Roadmap
            </span>
            <h2 className="font-heading text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white mt-1">
              How Faraz Delivers {service.title}
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {service.process.map((step, idx) => (
              <div key={idx} className="p-6 rounded-2xl glass-card border border-slate-200/90 dark:border-white/10 flex flex-col justify-between shadow-sm">
                <div>
                  <span className="text-xs font-bold text-purple-600 dark:text-purple-400 tracking-wider">
                    PHASE {step.step}
                  </span>
                  <h3 className="font-heading text-base font-bold text-slate-900 dark:text-white mt-2 mb-2">
                    {step.title}
                  </h3>
                  <p className="text-xs text-slate-600 dark:text-gray-400 leading-relaxed">
                    {step.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Technologies Employed */}
        <div className="mb-16 p-7 rounded-2xl glass-card border border-slate-200/90 dark:border-white/10 shadow-sm">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h3 className="font-heading text-base font-bold text-slate-900 dark:text-white">
                Technologies & Tooling Applied
              </h3>
              <p className="text-xs text-slate-600 dark:text-gray-400 mt-1">
                Industry-standard libraries and infrastructure selected for performance and stability.
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              {service.technologies.map((tech, idx) => (
                <span
                  key={idx}
                  className="px-3 py-1.5 rounded-lg bg-purple-100 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-500/30 text-purple-700 dark:text-purple-300 text-xs font-medium"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Toronto-focused service content (SEO) */}
        {local && (
          <div className="mb-16">
            <div className="mb-8">
              <span className="text-xs font-semibold uppercase tracking-wider text-purple-600 dark:text-purple-400">
                Toronto &amp; the GTA
              </span>
              <h2 className="font-heading text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white mt-1">
                {local.heading}
              </h2>
            </div>

            <div className="p-7 rounded-2xl glass-card border border-slate-200/90 dark:border-white/10 shadow-sm">
              {local.paragraphs.map((para, idx) => (
                <p
                  key={idx}
                  className="text-sm text-slate-700 dark:text-gray-300 leading-relaxed mb-4 last:mb-0"
                >
                  {para}
                </p>
              ))}

              {local.proof && local.proof.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-6">
                  {local.proof.map((item, idx) =>
                    item.href.startsWith("/") ? (
                      <Link
                        key={idx}
                        href={item.href}
                        className="px-3.5 py-2 rounded-lg bg-purple-100 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-500/30 text-purple-700 dark:text-purple-300 text-xs font-medium hover:border-purple-500/60 transition-colors inline-flex items-center gap-1.5"
                      >
                        <span>{item.label}</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                    ) : (
                      <a
                        key={idx}
                        href={item.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-3.5 py-2 rounded-lg bg-purple-100 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-500/30 text-purple-700 dark:text-purple-300 text-xs font-medium hover:border-purple-500/60 transition-colors inline-flex items-center gap-1.5"
                      >
                        <span>{item.label}</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </a>
                    )
                  )}
                </div>
              )}
            </div>
          </div>
        )}

        {/* Service FAQ (SEO + FAQPage schema) */}
        {local && local.faqs.length > 0 && (
          <div className="mb-16">
            <div className="mb-8">
              <span className="text-xs font-semibold uppercase tracking-wider text-purple-600 dark:text-purple-400">
                Answers &amp; Clarity
              </span>
              <h2 className="font-heading text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white mt-1">
                {service.title} — Frequently Asked Questions
              </h2>
            </div>

            <div className="space-y-4">
              {local.faqs.map((faq, idx) => (
                <div
                  key={idx}
                  className="p-6 rounded-2xl glass-card border border-slate-200/90 dark:border-white/10 shadow-sm"
                >
                  <h3 className="font-heading text-base font-bold text-slate-900 dark:text-white mb-2">
                    {faq.question}
                  </h3>
                  <p className="text-sm text-slate-600 dark:text-gray-400 leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Bottom CTA */}
        <div className="rounded-3xl p-8 sm:p-12 glass-card border border-purple-200 dark:border-purple-500/40 text-center relative overflow-hidden shadow-lg">
          <h2 className="font-heading text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white mb-3">
            Ready to implement {service.title} for your business?
          </h2>
          <p className="text-sm text-slate-600 dark:text-gray-300 max-w-xl mx-auto mb-8">
            Contact Faraz Ahmed today to discuss your project requirements, receive a clear milestone breakdown, and get a personal quote for your project.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link
              href={`/contact?service=${service.slug}`}
              className="px-8 py-3.5 rounded-full bg-gradient-to-r from-[#8B5CF6] to-[#A855F7] text-white font-semibold text-sm shadow-[0_0_20px_rgba(139,92,246,0.5)] hover:scale-105 transition-all"
            >
              Start Project Inquiry
            </Link>
            <Link
              href="/services"
              className="px-7 py-3.5 rounded-full bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-white font-medium text-sm transition-colors"
            >
              Browse Other Services
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
