export interface FAQItem {
  question: string;
  answer: string;
  category: string;
}

export const faqsData: FAQItem[] = [
  {
    category: "Websites",
    question: "Do you build websites with WordPress or Next.js?",
    answer:
      "Faraz works with both depending on your business requirements. For marketing sites, blogs, and businesses that require easy non-technical content management, WordPress (with custom Gutenberg or Elementor builds) is an excellent choice. For high-performance web applications, SaaS platforms, or custom dynamic experiences, Next.js with TypeScript and Tailwind CSS delivers blazing speed, ultimate scalability, and top-tier SEO.",
  },
  {
    category: "AI Chatbots",
    question: "How do your custom AI chatbots differ from basic rule-based bots?",
    answer:
      "Traditional chatbots only follow rigid if/then decision trees and quickly frustrate users. The AI chatbots Faraz builds are powered by advanced Large Language Models and custom Retrieval-Augmented Generation (RAG). They are trained specifically on your company's documents, FAQs, and service packages to provide accurate, human-like answers 24/7, qualify leads, and smoothly route high-intent prospects to your WhatsApp or email.",
  },
  {
    category: "Timelines",
    question: "What is the typical turnaround timeline for a project?",
    answer:
      "Project timelines depend on the scope and complexity. A focused high-converting landing page or business website typically takes 1 to 2 weeks from discovery to launch. Custom AI chatbot integrations usually take 1 to 2 weeks. Full custom web applications or multi-step automation pipelines typically range from 2 to 4 weeks with weekly milestone reviews and staging demos.",
  },
  {
    category: "Pricing",
    question: "How much does a website cost in Toronto?",
    answer:
      "Every project is quoted individually, because the price depends on the number of pages, custom features such as booking forms, quote calculators or payments, integrations, and whether you need an AI chatbot or automation added. Send your requirements on WhatsApp or through the contact form and Faraz will reply with a clear quote and timeline — no hidden fees.",
  },
  {
    category: "Integrations",
    question: "Can you integrate AI and automated workflows into our existing tools?",
    answer:
      "Yes. Faraz specializes in connecting modern AI and automation tools directly into your existing stack, including CRMs (HubSpot, Salesforce, Pipedrive), messaging platforms (WhatsApp, Slack, Telegram), databases (Supabase, PostgreSQL), and platforms like Shopify or WordPress.",
  },
  {
    category: "Process",
    question: "How do we get started and how is the project managed?",
    answer:
      "Every project begins with a free initial discovery consultation to understand your exact requirements. Faraz then prepares a clear project proposal with scope, milestone timeline, and fixed transparent pricing. Throughout the development phase, you receive private staging links to test progress and give feedback before final deployment.",
  },
  {
    category: "Support",
    question: "Do you provide post-launch maintenance and support?",
    answer:
      "Absolutely. Every completed project includes post-launch testing and warranty support. Flexible ongoing maintenance packages are also available for software updates, server monitoring, prompt tuning, and continuous enhancements.",
  },
  {
    category: "Video Editing",
    question: "Do you edit viral short-form videos for Instagram Reels, TikTok, and YouTube Shorts?",
    answer:
      "Yes! Faraz edits high-retention vertical 9:16 videos tailored for founders, creators, and brands. Edits include dead pause elimination, dynamic Roman Urdu & English kinetic captions, custom animated B-roll, 3D text behind the subject, background noise removal, and studio SFX — ready to publish within 24 to 48 hours.",
  },
  {
    category: "Video Editing",
    question: "How do I send my video footage and how are revisions handled?",
    answer:
      "You can send raw phone recordings or clips via Google Drive, Dropbox, or directly over WhatsApp. Every video package includes revisions (with unlimited revisions on Pro and Monthly packs) so your captions, styling, and pacing match your exact vision before final HD delivery.",
  },
];
