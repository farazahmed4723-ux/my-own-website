import React from "react";
import Link from "next/link";
import { Metadata } from "next";
import { ShieldCheck } from "lucide-react";

import { buildBreadcrumbJsonLd, buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "Privacy Policy",
  description:
    "Privacy Policy for AI by Faraz, owned by Faraz Ahmed. Explaining how inquiry data, Supabase database encryption, and client confidentiality are handled.",
  path: "/privacy",
});

export default function PrivacyPage() {
  const breadcrumbJsonLd = buildBreadcrumbJsonLd([
    { name: "Home", path: "/" },
    { name: "Privacy Policy", path: "/privacy" },
  ]);

  return (
    <div className="pt-28 sm:pt-36 pb-24 px-4 sm:px-6 lg:px-8 bg-[#060813]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <div className="max-w-4xl mx-auto">
        <div className="mb-6 flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-purple-400">
          <Link href="/" className="hover:text-white transition-colors">
            Home
          </Link>
          <span>/</span>
          <span className="text-gray-300">Privacy Policy</span>
        </div>

        <div className="rounded-3xl p-8 sm:p-12 glass-card border border-white/10">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-purple-600/20 border border-purple-500/30 flex items-center justify-center text-purple-300">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h1 className="font-heading text-3xl font-extrabold text-white">
              Privacy Policy
            </h1>
          </div>

          <p className="text-xs text-gray-400 mb-8 pb-4 border-b border-white/[0.08]">
            Effective Date: October 2026 | Last Updated: October 25, 2026
          </p>

          <div className="space-y-6 text-sm text-gray-300 leading-relaxed">
            <section>
              <h2 className="font-heading text-lg font-bold text-white mb-2">1. Overview</h2>
              <p>
                AI by Faraz (&ldquo;we&rdquo;, &ldquo;our&rdquo;, or &ldquo;us&rdquo;), operated by Faraz Ahmed, is committed to respecting your privacy and protecting the personal and project information you share with us through our website.
              </p>
            </section>

            <section>
              <h2 className="font-heading text-lg font-bold text-white mb-2">2. Information We Collect</h2>
              <p>When you contact us or submit an inquiry, we may collect:</p>
              <ul className="list-disc list-inside mt-2 space-y-1 text-gray-400">
                <li>Your name and business/company title</li>
                <li>Your email address and telephone/WhatsApp number</li>
                <li>Project descriptions, specifications, budgets, and website URLs you provide</li>
                <li>Standard anonymous browser telemetry (IP address, browser type, device viewport)</li>
              </ul>
            </section>

            <section>
              <h2 className="font-heading text-lg font-bold text-white mb-2">3. How Your Information Is Used</h2>
              <p>
                Information submitted through our project inquiry form or WhatsApp is strictly used to evaluate your technical requirements, prepare project proposals, deliver agreed-upon software engineering deliverables, and maintain direct client communication. We never sell, rent, or trade your contact details to third parties.
              </p>
            </section>

            <section>
              <h2 className="font-heading text-lg font-bold text-white mb-2">4. Client Confidentiality & Code Ownership</h2>
              <p>
                All proprietary client algorithms, business databases, API keys, and strategic trade secrets shared during an engagement are held under strict confidentiality. Source code and deliverables are transferred in full according to individual service contracts.
              </p>
            </section>

            <section>
              <h2 className="font-heading text-lg font-bold text-white mb-2">5. Contact Information</h2>
              <p>
                If you have questions regarding this Privacy Policy, please contact Faraz Ahmed directly:
              </p>
              <p className="mt-2 text-purple-300 font-medium">
                Email: faraz.ahmed4724@gmail.com | WhatsApp: +1 (437) 434-8789
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
