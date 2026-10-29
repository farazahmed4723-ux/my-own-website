import React from "react";
import Link from "next/link";
import { Metadata } from "next";
import { FileText } from "lucide-react";

export const metadata: Metadata = {
  title: "Terms and Conditions | AI by Faraz",
  description:
    "Terms and Conditions governing digital development, website consulting, and AI automation services provided by Faraz Ahmed.",
};

export default function TermsPage() {
  return (
    <div className="pt-28 sm:pt-36 pb-24 px-4 sm:px-6 lg:px-8 bg-[#060813]">
      <div className="max-w-4xl mx-auto">
        <div className="mb-6 flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-purple-400">
          <Link href="/" className="hover:text-white transition-colors">
            Home
          </Link>
          <span>/</span>
          <span className="text-gray-300">Terms & Conditions</span>
        </div>

        <div className="rounded-3xl p-8 sm:p-12 glass-card border border-white/10">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-purple-600/20 border border-purple-500/30 flex items-center justify-center text-purple-300">
              <FileText className="w-5 h-5" />
            </div>
            <h1 className="font-heading text-3xl font-extrabold text-white">
              Terms & Conditions
            </h1>
          </div>

          <p className="text-xs text-gray-400 mb-8 pb-4 border-b border-white/[0.08]">
            Effective Date: October 2026 | Last Updated: October 25, 2026
          </p>

          <div className="space-y-6 text-sm text-gray-300 leading-relaxed">
            <section>
              <h2 className="font-heading text-lg font-bold text-white mb-2">1. Agreement to Terms</h2>
              <p>
                By accessing this website or commissioning web engineering, AI automation, or consulting services from Faraz Ahmed (operating as AI by Faraz), you agree to be bound by these Terms and Conditions and applicable service agreements.
              </p>
            </section>

            <section>
              <h2 className="font-heading text-lg font-bold text-white mb-2">2. Scope of Services</h2>
              <p>
                All development work (including WordPress websites, Next.js web applications, AI chatbots, automation scripts, and custom software) is governed by specific written proposals detailing deliverables, payment milestones, timelines, and technical requirements.
              </p>
            </section>

            <section>
              <h2 className="font-heading text-lg font-bold text-white mb-2">3. Intellectual Property & Deliverables</h2>
              <p>
                Upon receipt of full payment according to the agreed project schedule, full intellectual property and ownership rights of custom-created code and designs are transferred to the client, excluding open-source libraries, pre-existing developer utilities, and third-party APIs.
              </p>
            </section>

            <section>
              <h2 className="font-heading text-lg font-bold text-white mb-2">4. Client Responsibilities</h2>
              <p>
                Clients are responsible for timely provision of necessary text content, brand assets, API keys, and testing feedback required to keep development on schedule.
              </p>
            </section>

            <section>
              <h2 className="font-heading text-lg font-bold text-white mb-2">5. Warranties & Limitation of Liability</h2>
              <p>
                Work is performed to high professional standards. We provide a post-launch warranty period to resolve any bugs in agreed deliverables. We are not liable for outages caused by third-party hosting, API provider downtime (such as OpenAI, Stripe, or Vercel), or client modifications after handover.
              </p>
            </section>

            <section>
              <h2 className="font-heading text-lg font-bold text-white mb-2">6. Inquiries & Governance</h2>
              <p>
                For contract inquiries or questions regarding these terms, reach Faraz Ahmed directly at faraz.ahmed4724@gmail.com or WhatsApp +1 (437) 434-8789.
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
