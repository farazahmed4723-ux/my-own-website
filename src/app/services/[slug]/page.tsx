import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import { servicesData } from "@/data/services";
import {
  Cpu,
  Bot,
  Code,
  Zap,
  ShoppingBag,
  Terminal,
  CheckCircle2,
  ArrowRight,
  Sparkles,
  Phone,
  Layers,
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
};

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

  return {
    title: `${service.title} | AI by Faraz`,
    description: service.shortDescription,
    openGraph: {
      title: `${service.title} | AI by Faraz`,
      description: service.shortDescription,
    },
  };
}

export default function ServiceDetailPage({ params }: ServicePageProps) {
  const service = servicesData.find((s) => s.slug === params.slug);

  if (!service) {
    notFound();
  }

  const Icon = iconMap[service.icon] || Code;

  return (
    <div className="pt-28 sm:pt-36 pb-24 px-4 sm:px-6 lg:px-8 bg-[#060813]">
      <div className="max-w-5xl mx-auto">
        {/* Back Link & Breadcrumbs */}
        <div className="flex items-center justify-between mb-8">
          <Link
            href="/services"
            className="inline-flex items-center gap-2 text-xs font-semibold text-gray-400 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to All Services</span>
          </Link>

          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-purple-400">
            <Link href="/" className="hover:text-white transition-colors">
              Home
            </Link>
            <span>/</span>
            <Link href="/services" className="hover:text-white transition-colors">
              Services
            </Link>
            <span>/</span>
            <span className="text-gray-300">{service.title}</span>
          </div>
        </div>

        {/* Hero Section of Service */}
        <div className="rounded-3xl p-8 sm:p-12 glass-card border border-purple-500/30 mb-14 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-purple-600/15 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-14 h-14 rounded-2xl bg-purple-600/30 border border-purple-500/40 flex items-center justify-center text-purple-300 shadow-lg shadow-purple-950/50">
                <Icon className="w-7 h-7" />
              </div>
              <span className="px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-semibold uppercase tracking-wider text-purple-300">
                {service.badge}
              </span>
            </div>

            <h1 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight mb-4 leading-tight">
              {service.title}
            </h1>
            <p className="text-lg text-purple-300 font-medium mb-6">
              {service.tagline}
            </p>
            <p className="text-base text-gray-300 leading-relaxed max-w-3xl mb-8">
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
                className="px-6 py-3.5 rounded-full bg-emerald-950/40 border border-emerald-500/40 text-emerald-300 hover:text-white font-medium text-sm flex items-center gap-2 transition-all"
              >
                <Phone className="w-4 h-4" />
                <span>Discuss on WhatsApp</span>
              </a>
            </div>
          </div>
        </div>

        {/* Features & Deliverables Grid */}
        <div className="mb-16">
          <div className="mb-8">
            <span className="text-xs font-semibold uppercase tracking-wider text-purple-400">
              Scope of Capabilities
            </span>
            <h2 className="font-heading text-2xl sm:text-3xl font-bold text-white mt-1">
              What&apos;s Included In This Service
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {service.features.map((feature, idx) => (
              <div
                key={idx}
                className="p-5 rounded-xl bg-white/[0.03] border border-white/[0.08] flex items-start gap-3 hover:border-purple-500/30 transition-colors"
              >
                <CheckCircle2 className="w-5 h-5 text-purple-400 mt-0.5 shrink-0" />
                <span className="text-sm text-gray-200 font-medium leading-relaxed">
                  {feature}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Real-World Use Cases */}
        <div className="mb-16">
          <div className="mb-8">
            <span className="text-xs font-semibold uppercase tracking-wider text-purple-400">
              Practical Applications
            </span>
            <h2 className="font-heading text-2xl sm:text-3xl font-bold text-white mt-1">
              Common Business Use Cases
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {service.useCases.map((useCase, idx) => (
              <div key={idx} className="p-6 rounded-2xl glass-card border border-white/10">
                <div className="w-8 h-8 rounded-lg bg-purple-900/30 border border-purple-500/30 flex items-center justify-center text-purple-300 font-bold text-xs mb-3">
                  0{idx + 1}
                </div>
                <p className="text-sm text-gray-300 leading-relaxed font-medium">
                  {useCase}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Development & Implementation Roadmap */}
        <div className="mb-16">
          <div className="mb-8">
            <span className="text-xs font-semibold uppercase tracking-wider text-purple-400">
              Execution Roadmap
            </span>
            <h2 className="font-heading text-2xl sm:text-3xl font-bold text-white mt-1">
              How Faraz Delivers {service.title}
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {service.process.map((step, idx) => (
              <div key={idx} className="p-6 rounded-2xl glass-card border border-white/10 flex flex-col justify-between">
                <div>
                  <span className="text-xs font-bold text-purple-400 tracking-wider">
                    PHASE {step.step}
                  </span>
                  <h3 className="font-heading text-base font-bold text-white mt-2 mb-2">
                    {step.title}
                  </h3>
                  <p className="text-xs text-gray-400 leading-relaxed">
                    {step.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Technologies Employed */}
        <div className="mb-16 p-7 rounded-2xl glass-card border border-white/10">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h3 className="font-heading text-base font-bold text-white">
                Technologies & Tooling Applied
              </h3>
              <p className="text-xs text-gray-400 mt-1">
                Industry-standard libraries and infrastructure selected for performance and stability.
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              {service.technologies.map((tech, idx) => (
                <span
                  key={idx}
                  className="px-3 py-1.5 rounded-lg bg-purple-900/20 border border-purple-500/30 text-purple-300 text-xs font-medium"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="rounded-3xl p-8 sm:p-12 glass-card border border-purple-500/40 text-center relative overflow-hidden">
          <h2 className="font-heading text-2xl sm:text-3xl font-extrabold text-white mb-3">
            Ready to implement {service.title} for your business?
          </h2>
          <p className="text-sm text-gray-300 max-w-xl mx-auto mb-8">
            Contact Faraz Ahmed today to discuss your project requirements, receive a clear milestone breakdown, and get transparent pricing.
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
              className="px-7 py-3.5 rounded-full bg-white/5 border border-white/10 text-gray-300 hover:text-white font-medium text-sm transition-colors"
            >
              Browse Other Services
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
