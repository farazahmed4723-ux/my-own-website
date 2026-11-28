export interface ServiceItem {
  id: string;
  slug: string;
  title: string;
  tagline: string;
  shortDescription: string;
  fullDescription: string;
  icon: string;
  badge: string;
  features: string[];
  useCases: string[];
  process: { step: string; title: string; desc: string }[];
  technologies: string[];
}

export const servicesData: ServiceItem[] = [
  {
    id: "website-development",
    slug: "website-development",
    title: "Freelance Full Stack Development",
    tagline: "High-Performance Modern Web Platforms & Clean APIs",
    shortDescription:
      "Custom, scalable web applications built with React, Vite, Node.js, and TypeScript. Lightning-fast performance and clean APIs.",
    fullDescription:
      "Your web application is the core of your digital identity. Faraz engineers high-speed, modern responsive web applications with modular TypeScript architecture, clean REST/GraphQL APIs, seamless database integrations, and sub-second Core Web Vitals performance.",
    icon: "Code",
    badge: "Core Engineering",
    features: [
      "Custom Next.js App Router and React web application architecture",
      "Type-safe backend API endpoints and microservices",
      "Pixel-perfect responsive design across mobile, tablet, and desktop",
      "Performance optimization achieving sub-second load times",
      "Technical SEO foundation: Schema markup, sitemaps, Open Graph",
      "Clean, scalable, maintainable codebase engineered for production",
    ],
    useCases: [
      "Modern SaaS web platforms and customer portals",
      "High-converting landing pages for marketing campaigns and launches",
      "Custom business web applications replacing spreadsheets",
      "Digital booking platforms and quotation calculation engines",
    ],
    process: [
      { step: "01", title: "Discovery & Structure", desc: "Defining goals, technical specifications, database schema, and API contracts." },
      { step: "02", title: "Wireframes & UI Polish", desc: "Creating modern responsive layouts, dark/light themes, and motion states." },
      { step: "03", title: "Full Stack Build", desc: "Writing clean TypeScript, modular React components, and secure backend endpoints." },
      { step: "04", title: "QA & Deployment", desc: "Cross-browser verification, Lighthouse benchmarking, and production deployment." },
    ],
    technologies: ["React", "TypeScript", "Next.js", "Node.js", "Tailwind CSS", "PostgreSQL", "Supabase"],
  },
  {
    id: "wordpress-development",
    slug: "wordpress-development",
    title: "WordPress Website Development",
    tagline: "Custom Themes, WooCommerce & 90+ PageSpeed Engineering",
    shortDescription:
      "Custom theme development, Elementor & Bricks setups, WooCommerce store scaling, and PageSpeed optimization to green 90+ scores.",
    fullDescription:
      "Over the past 2+ years, Faraz has engineered custom WordPress solutions for businesses in Canada and abroad. From bespoke lightweight themes without bloated plugins to complex WooCommerce stores and Bricks/Elementor builds, you get pixel-perfect design combined with enterprise-grade caching, security, and sub-second load times.",
    icon: "Globe",
    badge: "WordPress Specialist",
    features: [
      "Custom WordPress theme engineering built from scratch (zero bloat)",
      "Elementor Pro & Bricks Builder advanced dynamic templates",
      "WooCommerce online store setup, product filters, and payment gateways",
      "Core Web Vitals & PageSpeed optimization reaching green 90+ scores",
      "Enterprise security hardening, SSL setup, and automated daily backups",
      "Seamless migration, custom post types, and ACF Pro integrations",
    ],
    useCases: [
      "Corporate business websites for consultancies, agencies, and clinics",
      "WooCommerce online stores selling physical and digital products",
      "Content-rich media platforms, blogs, and international directories",
      "Custom booking, appointment scheduling, and quotation forms",
    ],
    process: [
      { step: "01", title: "Architecture Plan", desc: "Auditing requirements, plugin footprint, and server hosting environment." },
      { step: "02", title: "Design & Template Build", desc: "Crafting customized WordPress layouts tailored to your exact brand." },
      { step: "03", title: "Speed & Security Hardening", desc: "Configuring Redis object caching, Cloudflare CDN, and security protocols." },
      { step: "04", title: "Handover & Training", desc: "Complete admin dashboard handover with easy client editing capabilities." },
    ],
    technologies: ["WordPress", "WooCommerce", "PHP", "Elementor Pro", "Bricks Builder", "ACF Pro", "MySQL"],
  },
  {
    id: "ai-chatbots",
    slug: "ai-chatbots",
    title: "AI Chatbot Development",
    tagline: "24/7 Context-Aware Conversational AI Assistants & Lead Capturing",
    shortDescription:
      "Custom conversational AI bots trained securely on your internal documentation, PDFs, or website using RAG and Gemini/OpenAI models.",
    fullDescription:
      "Deliver instant, accurate, and context-aware responses to prospective clients 24/7. Faraz builds intelligent chatbots powered by modern LLMs (Gemini, OpenAI) and Retrieval-Augmented Generation (RAG), strictly trained on your business documentation, services, and pricing without hallucinating.",
    icon: "Bot",
    badge: "Conversational AI",
    features: [
      "Secure knowledge ingestion from PDFs, websites, Notion, and databases",
      "Multi-channel deployment: Website widget, WhatsApp, and Telegram",
      "Automated lead qualification and direct calendar booking integration",
      "Strict hallucination guardrails and fallback escalation to human staff",
      "Conversation logging, sentiment analysis, and topic clustering",
      "Custom drawer UI matching your website branding with smooth animations",
    ],
    useCases: [
      "Answering prospective client inquiries on pricing, timeline, and booking 24/7",
      "Qualifying incoming leads and routing high-value prospects to WhatsApp",
      "Tier-1 customer support handling common troubleshooting questions",
      "E-commerce product recommendation assistants guiding buyers to checkout",
    ],
    process: [
      { step: "01", title: "Knowledge Ingestion", desc: "Structuring FAQs, service catalogs, company policies, and documentation." },
      { step: "02", title: "RAG & Guardrail Config", desc: "Setting up vector embeddings, system prompts, and strict boundary rules." },
      { step: "03", title: "UI Integration", desc: "Embedding a responsive, branded floating chat drawer into your website." },
      { step: "04", title: "Monitoring & Tuning", desc: "Reviewing real conversation logs and refining prompt responses." },
    ],
    technologies: ["Gemini API", "OpenAI API", "LangChain", "Vector DBs", "Next.js", "WhatsApp Business API"],
  },
  {
    id: "ai-automation",
    slug: "ai-automation",
    title: "AI Automation Expert",
    tagline: "Self-Operating Business Pipelines & Zero-Manual-Entry Workflows",
    shortDescription:
      "End-to-end Make.com, n8n, and Zapier pipelines that eliminate manual data entry, automate lead scoring, and sync CRMs effortlessly.",
    fullDescription:
      "Eliminate repetitive administrative tasks and stitch together your software ecosystem into self-operating pipelines. Faraz builds robust, fail-safe automation workflows using n8n, Make.com, and Zapier that connect your lead capture forms, CRM, email campaigns, invoicing, and messaging apps.",
    icon: "Cpu",
    badge: "Process Automation",
    features: [
      "No-code & code-level automation pipelines (n8n, Make.com, Zapier)",
      "Instant lead capture, AI scoring, and multi-channel notification dispatch",
      "AI document, invoice, and PDF contract parsing into spreadsheets",
      "Bidirectional CRM synchronization (HubSpot, Notion, Airtable, Google Sheets)",
      "Automated WhatsApp & Email customer onboarding sequences",
      "Error handling, webhooks, retry logic, and transaction safeguards",
    ],
    useCases: [
      "Capturing leads from web forms and instantly notifying your team on WhatsApp",
      "Auto-parsing client PDFs and generating structured invoicing data",
      "Syncing Stripe payment events with CRM records and access provisioning",
      "Automating repetitive client reporting and scheduled email summaries",
    ],
    process: [
      { step: "01", title: "Process Audit", desc: "Identifying time-draining manual tasks and architecting automated workflows." },
      { step: "02", title: "Pipeline Engineering", desc: "Configuring API triggers, data transformation nodes, and AI filters." },
      { step: "03", title: "Staging Stress Test", desc: "Simulating edge cases, invalid inputs, and error recovery routes." },
      { step: "04", title: "Live Handover", desc: "Deploying to production with monitoring alerts and documentation." },
    ],
    technologies: ["n8n.io", "Make.com", "Zapier", "Python", "Node.js", "Webhooks", "REST APIs"],
  },
  {
    id: "digital-solutions",
    slug: "digital-solutions",
    title: "Digital Solutions Provider",
    tagline: "End-to-End Cloud Architecture, Payment Gateways & SaaS Scale",
    shortDescription:
      "Full-stack digital architecture, serverless cloud setup on Vercel/AWS, Stripe payment integrations, and custom SaaS integrations.",
    fullDescription:
      "Beyond basic websites, modern ventures need resilient digital infrastructure. Faraz provisions secure serverless cloud architecture on Vercel and AWS, connects international payment gateways (Stripe, PayPal), configures DNS and email deliverability, and builds custom SaaS integration bridges.",
    icon: "Layers",
    badge: "Cloud & Systems",
    features: [
      "Serverless cloud backend infrastructure setup on Vercel & AWS",
      "Stripe and PayPal payment gateway integration with secure checkout",
      "Custom domain configuration, DNS routing, and enterprise SSL provisioning",
      "Real-time analytics, uptime monitoring, and error tracking",
      "Transactional email deliverability (Resend, SendGrid, Postmark)",
      "Bank-level encryption, environment security, and RBAC authorization",
    ],
    useCases: [
      "Setting up high-availability cloud hosting for mission-critical web applications",
      "Integrating international credit card payments and subscription billing",
      "Configuring business email domains with 100% SPF, DKIM, and DMARC passing",
      "Connecting disparate third-party SaaS tools through custom middleware",
    ],
    process: [
      { step: "01", title: "Infrastructure Blueprint", desc: "Selecting optimal cloud vendors, security tiers, and database engines." },
      { step: "02", title: "Environment Provisioning", desc: "Configuring serverless environments, environment variables, and CDN." },
      { step: "03", title: "Gateway & API Binding", desc: "Integrating webhook handlers for Stripe payments and transactional mail." },
      { step: "04", title: "Security Audit & Handover", desc: "Verifying encryption headers, DNS records, and system resilience." },
    ],
    technologies: ["AWS", "Vercel", "Stripe API", "Supabase", "Docker", "Cloudflare", "PostgreSQL"],
  },
  {
    id: "seo-performance",
    slug: "seo-performance",
    title: "Technical SEO & Optimization",
    tagline: "Core Web Vitals Mastery, Schema Markup & Search Dominance",
    shortDescription:
      "Google Search Console optimization, semantic Schema.org markup, Core Web Vitals speed tuning, and conversion-focused UX layouts.",
    fullDescription:
      "Dominate search results and turn searchers into paying clients. Faraz provides comprehensive technical SEO and UX performance engineering, including JSON-LD Schema.org structured data, Core Web Vitals optimization, Google Search Console indexing, and conversion rate optimization (CRO).",
    icon: "Zap",
    badge: "SEO & Growth",
    features: [
      "Comprehensive Schema.org (LocalBusiness, Organization, Service, FAQ) JSON-LD",
      "Core Web Vitals performance tuning targeting 95+ Lighthouse scores",
      "Google Search Console setup, sitemap indexing, and crawl error resolution",
      "Conversion Rate Optimization (CRO) UX layouts and magnetic CTA placement",
      "Semantic HTML5 hierarchy, Open Graph, and Twitter Card social previews",
      "Accessibility (WCAG 2.1) compliance audit and mobile viewport optimization",
    ],
    useCases: [
      "Ranking local businesses (e.g. logistics, limousine services) in Google Search",
      "Achieving instant sub-second page loads across mobile 4G networks",
      "Eliminating Google Search Console indexing and schema validation errors",
      "Boosting organic lead conversion through refined visual hierarchy",
    ],
    process: [
      { step: "01", title: "Technical Audit", desc: "Scanning Lighthouse metrics, crawl errors, schema gaps, and asset weight." },
      { step: "02", title: "Codebase Optimization", desc: "Minifying bundles, modernizing images (AVIF/WebP), and implementing JSON-LD." },
      { step: "03", title: "Search Engine Verification", desc: "Submitting verified sitemaps to Google Search Console and Bing." },
      { step: "04", title: "Growth Benchmarking", desc: "Monitoring search impressions, ranking keywords, and conversion rates." },
    ],
    technologies: ["Google Search Console", "Schema.org", "Lighthouse", "Next.js SEO", "Open Graph", "Ahrefs"],
  },
  {
    id: "ai-agents",
    slug: "ai-agents",
    title: "AI Agents",
    tagline: "Autonomous Task Execution & Intelligent Business Assistants",
    shortDescription:
      "Task-oriented AI assistants, autonomous workflow agents, and smart integrations that take proactive action for your business.",
    fullDescription:
      "Unlike simple chatbots that only respond to queries, AI Agents possess the capability to reason, use external tools, call APIs, search databases, and execute multi-step workflows autonomously. Faraz designs purposeful AI agents that perform practical work for your business.",
    icon: "Zap",
    badge: "Autonomous Systems",
    features: [
      "Multi-step reasoning and autonomous decision execution",
      "Tool-calling capabilities (web search, database lookup, email dispatch)",
      "Memory retention across multi-turn interactions",
      "Human-in-the-loop review checkpoints for sensitive actions",
      "Integration with Google Workspace, Slack, Notion, and CRMs",
      "Audit logging and complete traceability of all agent actions",
    ],
    useCases: [
      "Research agents compiling competitive market reports and summaries",
      "Customer onboarding agents verifying documents and generating welcome packs",
      "Data monitoring agents alerting teams to unusual anomalies or traffic spikes",
      "Automated content drafting agents assisting marketing teams with brand-aligned copy",
    ],
    process: [
      { step: "01", title: "Task Decomposition", desc: "Breaking complex operations into discrete agent actions and validation criteria." },
      { step: "02", title: "Tool & API Binding", desc: "Granting the agent secure, permission-scoped access to external tools." },
      { step: "03", title: "Guardrails & Testing", desc: "Implementing strict boundaries, fallbacks, and human approval steps." },
      { step: "04", title: "Operational Execution", desc: "Deploying to cloud infrastructure with real-time logging and status dashboards." },
    ],
    technologies: ["LangChain", "LlamaIndex", "OpenAI / Claude APIs", "Node.js", "Vector DBs", "Python"],
  },
  {
    id: "ecommerce-solutions",
    slug: "ecommerce-solutions",
    title: "E-commerce Solutions",
    tagline: "High-Converting Online Stores & Custom Checkout Flows",
    shortDescription:
      "Shopify stores, WooCommerce websites, online storefronts, and custom e-commerce functionality built to maximize revenue.",
    fullDescription:
      "Turn casual shoppers into repeat buyers with frictionless shopping experiences. Faraz builds, customizes, and optimizes e-commerce platforms using Shopify, WooCommerce, and headless commerce architectures, complete with secure payment gateway integrations, inventory tracking, and speed optimization.",
    icon: "ShoppingBag",
    badge: "Digital Commerce",
    features: [
      "Complete Shopify theme customization and liquid development",
      "WooCommerce setup with custom product types and payment gateways",
      "Stripe, PayPal, and Interac e-Transfer checkout flows",
      "Mobile-optimized checkout to minimize cart abandonment",
      "Automated order confirmation, shipping notifications, and CRM sync",
      "Product filtering, dynamic search, and inventory management",
    ],
    useCases: [
      "Direct-to-consumer (D2C) brand storefronts with custom visual aesthetics",
      "B2B wholesale ordering portals with tiered volume pricing",
      "Service and digital product download marketplaces",
      "Custom booking and scheduled reservation systems",
    ],
    process: [
      { step: "01", title: "Store Strategy", desc: "Product catalog review, payment gateway requirements, and competitor analysis." },
      { step: "02", title: "Storefront Design", desc: "Crafting modern product showcases, clear value propositions, and trust badges." },
      { step: "03", title: "Cart & Checkout Setup", desc: "Configuring secure payment gateways, taxes, shipping rules, and discounts." },
      { step: "04", title: "Launch & Conversion QA", desc: "End-to-end test purchases, speed optimization, and live publishing." },
    ],
    technologies: ["Shopify", "Liquid", "WooCommerce", "WordPress", "Stripe API", "Next.js Commerce"],
  },
  {
    id: "custom-software-development",
    slug: "custom-software-development",
    title: "Custom Software Development",
    tagline: "Bespoke Web Applications, Dashboards & Tailored APIs",
    shortDescription:
      "Custom web applications, business dashboards, integrations, APIs, and tailored digital systems built for unique operational needs.",
    fullDescription:
      "Off-the-shelf software doesn't always fit your exact business process. Faraz engineers bespoke web applications, interactive internal dashboards, and reliable API backends that give your team the precise digital tooling needed to scale efficiently.",
    icon: "Terminal",
    badge: "Tailored Engineering",
    features: [
      "Modern full-stack web applications (Next.js, Node.js, Express, PostgreSQL)",
      "Real-time administrative dashboards with interactive charts and metrics",
      "RESTful and GraphQL API design and integration",
      "Role-based access control (RBAC) and secure authentication",
      "Database schema design, migrations, and performance tuning",
      "Cloud deployment on Vercel, Supabase, Render, or AWS",
    ],
    useCases: [
      "Internal operational dashboards replacing chaotic spreadsheets",
      "Client portals for service tracking, file sharing, and project status",
      "Custom quotation and price calculation engines",
      "Middleware microservices bridging legacy databases to modern web apps",
    ],
    process: [
      { step: "01", title: "Requirements Engineering", desc: "Defining detailed data models, user roles, workflows, and technical constraints." },
      { step: "02", title: "System Architecture", desc: "Designing secure database schemas, API contracts, and component libraries." },
      { step: "03", title: "Iterative Development", desc: "Building modular features with TypeScript, automated tests, and review builds." },
      { step: "04", title: "Deployment & Maintenance", desc: "CI/CD setup, database backups, uptime monitoring, and ongoing support." },
    ],
    technologies: ["TypeScript", "Next.js", "Node.js", "Express", "PostgreSQL", "Supabase", "Tailwind CSS"],
  },
  {
    id: "video-editing",
    slug: "video-editing",
    title: "Video Editing & Motion Graphics",
    tagline: "High-Retention Commercial Edits, Reels, YouTube & Brand Storytelling",
    shortDescription:
      "Cinematic video editing, high-retention Instagram Reels/TikToks, promotional commercials, dynamic captions, color grading, and motion graphics.",
    fullDescription:
      "Capture attention in the first 3 seconds and turn viewers into loyal clients. Faraz delivers studio-grade video editing and motion graphics for brands, creators, and businesses — combining crisp pacing, dynamic typography, seamless transitions, sound design, and color grading tailored for YouTube, Instagram Reels, TikTok, and commercial ad campaigns.",
    icon: "Film",
    badge: "Creative Post-Production",
    features: [
      "High-retention short-form edits (Instagram Reels, TikTok, YouTube Shorts)",
      "Commercial brand promos, product showcases, and social media video ads",
      "Dynamic animated captions, kinetic typography, and custom motion graphics",
      "Professional color grading, audio cleanup, and immersive SFX sound design",
      "Smooth speed ramps, b-roll storytelling, and beat-synced transitions",
      "Multi-format delivery optimized for 9:16 vertical, 16:9 widescreen, and 1:1 feeds",
    ],
    useCases: [
      "Personal brand and founder authority Reels designed for maximum organic reach",
      "High-converting promotional video ads for e-commerce products and services",
      "YouTube long-form episodes, tutorials, and documentary-style storytelling",
      "Corporate event highlights, client testimonials, and SaaS explainer videos",
    ],
    process: [
      { step: "01", title: "Footage & Script Review", desc: "Analyzing raw clips, brand tone, target platform, and hook strategy." },
      { step: "02", title: "Rough Cut & Pacing", desc: "Assembling the narrative arc with tight cuts and high-retention pacing." },
      { step: "03", title: "VFX, Captions & Sound", desc: "Adding motion graphics, dynamic subtitles, SFX layers, and color grading." },
      { step: "04", title: "Final Master Export", desc: "Delivering crisp 4K/1080p masters formatted for every social platform." },
    ],
    technologies: ["Premiere Pro", "After Effects", "CapCut Pro", "DaVinci Resolve", "Motion Graphics", "Sound Design"],
  },
];

/**
 * Search-engine titles & meta descriptions per service page.
 * Visible page headings stay as defined above — these only change the
 * <title> tag and meta description Google shows in search results.
 * The layout template appends " | AI by Faraz" to each title.
 */
export const serviceSeo: Record<string, { title: string; description: string; keywords: string[] }> = {
  "website-development": {
    title: "Website Development Toronto | Next.js & WordPress",
    description:
      "Toronto web developer building fast, SEO-ready Next.js and WordPress websites for small businesses. Most business sites launch in 1–2 weeks. Get a free quote.",
    keywords: ["website development Toronto", "web developer Toronto", "Next.js developer Toronto", "freelance web developer Toronto"],
  },
  "wordpress-development": {
    title: "WordPress Developer Toronto | Custom Themes & WooCommerce",
    description:
      "Custom WordPress websites and WooCommerce stores for Toronto and GTA businesses — lightweight themes, speed tuning and security hardening. Message Faraz for a quote.",
    keywords: ["WordPress developer Toronto", "WordPress website development Toronto", "WooCommerce developer Toronto"],
  },
  "ai-chatbots": {
    title: "AI Chatbot Development Toronto | Website & WhatsApp Bots",
    description:
      "AI chatbots for Toronto businesses, trained on your own services and FAQs, for your website and WhatsApp. Answer leads 24/7. Most chatbots go live in 1–2 weeks.",
    keywords: ["AI chatbot development Toronto", "AI chatbot for business Toronto", "WhatsApp chatbot Toronto", "AI chatbot for trucking company"],
  },
  "ai-automation": {
    title: "AI Automation Toronto | n8n, Make & CRM Workflows",
    description:
      "AI and workflow automation for Toronto small businesses with n8n, Make and Zapier — connect web forms, CRM (HubSpot, Airtable), email and WhatsApp. Get a quote.",
    keywords: ["AI automation for small business Toronto", "CRM workflow automation Toronto", "n8n automation Toronto"],
  },
  "digital-solutions": {
    title: "Cloud, Payments & API Integrations Toronto",
    description:
      "Cloud hosting, Stripe payment gateways, DNS, email deliverability and API integrations for Toronto businesses on Vercel and AWS. Message Faraz for a quote.",
    keywords: ["Stripe integration Toronto", "cloud setup Toronto", "API integration developer Toronto"],
  },
  "seo-performance": {
    title: "Technical SEO Toronto | Core Web Vitals & Schema",
    description:
      "Technical SEO for Toronto business websites — Core Web Vitals, schema markup, sitemaps and Google Search Console setup so customers can find you on Google.",
    keywords: ["technical SEO Toronto", "website speed optimization Toronto", "Core Web Vitals Toronto"],
  },
  "ai-agents": {
    title: "AI Agent Development Toronto | Custom Business AI Agents",
    description:
      "Custom AI agents for Toronto small businesses that do real work — lead follow-up, scheduling, data entry and API tasks — with human approval steps. Request a quote.",
    keywords: ["AI agent development Toronto", "AI agents for small business", "custom AI agent developer Canada"],
  },
  "ecommerce-solutions": {
    title: "Shopify Developer Toronto | E-commerce Store Setup",
    description:
      "Shopify and WooCommerce store setup for Toronto and GTA brands — product pages, payments, shipping rules and a fast checkout. Message Faraz for a custom quote.",
    keywords: ["Shopify developer Toronto", "Shopify store setup Toronto small business", "e-commerce website Toronto"],
  },
  "custom-software-development": {
    title: "Custom Software Development Toronto | Web Apps & Dashboards",
    description:
      "Custom web apps, client portals and dashboards for Toronto businesses, built with Next.js, TypeScript and Supabase, with clear weekly milestones. Request a quote.",
    keywords: ["custom software development Toronto", "web app developer Toronto", "SaaS MVP developer Toronto"],
  },
  "video-editing": {
    title: "Video Editing Toronto | Reels, TikTok & YouTube Edits",
    description:
      "Video editing in Toronto for Instagram Reels, TikTok, YouTube Shorts and brand videos — captions, motion graphics and sound design, delivered in 24–48 hours.",
    keywords: ["video editing Toronto", "Reels editor Toronto", "short form video editor Toronto"],
  },
};

/**
 * Extra on-page content for the main service pages: a Toronto section,
 * links to real client work, and an FAQ block (also output as FAQPage schema).
 * Pricing is intentionally never published — every project is quoted on enquiry.
 */
export interface ServiceLocalContent {
  heading: string;
  paragraphs: string[];
  proof?: { label: string; href: string }[];
  faqs: { question: string; answer: string }[];
}

const QUOTE_NOTE =
  "Send your requirements on WhatsApp (+1 437-434-8789) or through the contact form and Faraz will reply with a clear quote and timeline.";

export const serviceLocalContent: Record<string, ServiceLocalContent> = {
  "website-development": {
    heading: "Website Development in Toronto",
    paragraphs: [
      "AI by Faraz is a Toronto-based, one-person web development studio. When you hire Faraz, the person who quotes your project is the same person who writes the code — no account managers and no hand-off to a junior team.",
      "Most small-business websites — for a service company, a clinic, a limo or a trucking business — launch in 1 to 2 weeks. Larger custom web applications usually take 2 to 4 weeks, with private staging links so you can review progress before anything goes live.",
      "Every site is built SEO-ready from day one: clear page titles and meta descriptions, an XML sitemap, Schema.org structured data and mobile-first layouts, so Google understands which Toronto searches your business should appear for.",
      "Faraz works with businesses across Toronto and the GTA — Mississauga, Brampton, Vaughan, Markham and beyond — and with clients across Canada and abroad, over WhatsApp, email or a video call.",
    ],
    proof: [
      { label: "Elite Class Limo — live client website", href: "https://eliteclasslimo.ca/" },
      { label: "STN Trucking — live client website", href: "https://infostntrucking.ca/" },
      { label: "See the full portfolio", href: "/portfolio" },
    ],
    faqs: [
      {
        question: "How much does a website cost in Toronto?",
        answer: `Every project is quoted individually, because the price depends on the number of pages, custom features (booking forms, quote calculators, payments), integrations and who supplies the content. ${QUOTE_NOTE}`,
      },
      {
        question: "Should my business website use Next.js or WordPress?",
        answer:
          "WordPress is a great fit when your team wants to edit pages and blog posts without a developer. Next.js is the better choice for custom web apps, booking or quote tools, and sites where speed and flexibility matter most. Faraz builds with both and recommends one after hearing your goals.",
      },
      {
        question: "How long does it take to build a business website?",
        answer:
          "A focused landing page or small-business website typically takes 1 to 2 weeks from discovery to launch. Custom web applications usually take 2 to 4 weeks, with weekly milestone reviews.",
      },
      {
        question: "Will my website be optimized for Google and mobile phones?",
        answer:
          "Yes. Every build includes a technical SEO foundation — page titles, meta descriptions, sitemap, structured data and Open Graph previews — and is designed mobile-first and tested on phone, tablet and desktop.",
      },
      {
        question: "Do you work with businesses outside Toronto?",
        answer:
          "Yes. Faraz is based in Toronto and works with clients across the GTA, the rest of Canada and internationally — client work includes a trucking company in British Columbia and an HVAC business in Riyadh.",
      },
      {
        question: "What happens after my website launches?",
        answer:
          "Every completed project includes post-launch testing and warranty support. Ongoing maintenance — updates, monitoring and new features — is available if you need it.",
      },
    ],
  },
  "wordpress-development": {
    heading: "WordPress Developer in Toronto",
    paragraphs: [
      "Faraz builds custom WordPress websites for Toronto and GTA businesses — lightweight themes without a pile of plugins, or Elementor Pro and Bricks Builder layouts when your team wants drag-and-drop editing.",
      "WooCommerce stores, booking and quote forms, custom post types and ACF Pro fields are all handled in-house, along with caching, security hardening, SSL and automated backups.",
      "At handover you get full admin access and a walkthrough of how to edit your own pages, so small changes never have to wait for a developer.",
    ],
    proof: [{ label: "See WordPress and client work in the portfolio", href: "/portfolio" }],
    faqs: [
      {
        question: "How much does a WordPress website cost in Toronto?",
        answer: `It depends on the number of pages, whether you need WooCommerce, and which forms or integrations are required, so every project is quoted individually. ${QUOTE_NOTE}`,
      },
      {
        question: "Can you speed up or fix my existing WordPress website?",
        answer:
          "Yes. Faraz audits plugins, hosting and page weight, then applies caching, image optimization and security hardening. Migrations to new hosting or a new theme are also available.",
      },
      {
        question: "Will I be able to edit the website myself?",
        answer:
          "Yes. Every WordPress project ends with a dashboard handover and training, so you can update text, images and blog posts on your own.",
      },
      {
        question: "Custom theme or Elementor — which is better?",
        answer:
          "A custom theme is the leanest and fastest option. Elementor Pro or Bricks Builder is better if your team wants to rearrange page layouts without code. Faraz recommends one based on how you plan to manage the site.",
      },
      {
        question: "How long does a WordPress website take?",
        answer:
          "A typical business website takes 1 to 2 weeks. WooCommerce stores and sites with custom functionality take longer; you get a timeline with the quote.",
      },
    ],
  },
  "ai-chatbots": {
    heading: "AI Chatbots for Toronto Businesses",
    paragraphs: [
      "Faraz builds AI chatbots for Toronto and GTA businesses that answer questions using your own information — your services, FAQs, policies and documents — instead of generic internet answers. They run on modern models such as Gemini and OpenAI with Retrieval-Augmented Generation (RAG).",
      "A chatbot can live on your website, WhatsApp or Telegram, answer customers 24/7, collect contact details and send high-intent leads straight to your WhatsApp or email.",
      "Typical uses include a trucking or dispatch company answering quote and service-area questions, a limo or chauffeur service handling booking questions, and home-service companies qualifying callers before a technician is booked.",
      "Most chatbots go live in 1 to 2 weeks. You can try a live example right now: the assistant on this website was built by Faraz.",
    ],
    proof: [{ label: "See client work in the portfolio", href: "/portfolio" }],
    faqs: [
      {
        question: "How much does an AI chatbot cost for a small business?",
        answer: `It depends on the channels (website, WhatsApp), how much information it must learn, and the integrations it needs, so every chatbot is quoted individually. ${QUOTE_NOTE}`,
      },
      {
        question: "How long does it take to build an AI chatbot?",
        answer:
          "Most custom AI chatbot projects take 1 to 2 weeks, including preparing your knowledge base, testing and installing it on your website.",
      },
      {
        question: "Will the chatbot make up wrong answers?",
        answer:
          "The chatbot is limited to your approved information and has guardrails for questions it should not answer. When it is unsure, it hands the conversation to your team instead of guessing.",
      },
      {
        question: "Can the chatbot work on WhatsApp?",
        answer:
          "Yes. Chatbots can be deployed on your website, on WhatsApp and on Telegram, and can pass qualified leads to WhatsApp or email.",
      },
      {
        question: "What do you need from me to build it?",
        answer:
          "Your service list, common customer questions, policies and any documents or web pages the chatbot should learn from. Faraz structures this into the chatbot's knowledge base for you.",
      },
    ],
  },
  "ai-agents": {
    heading: "AI Agent Development in Toronto",
    paragraphs: [
      "A chatbot answers questions; an AI agent does work. Faraz builds AI agents for Toronto and GTA small businesses that can use tools — search a database, draft and send an email, update a CRM or call an API — to finish multi-step tasks.",
      "Sensitive actions include a human approval step, every action is logged, and each agent only gets the permissions it needs. That keeps you in control while the repetitive work runs on its own.",
      "Agents connect to the tools you already use, such as Google Workspace, Slack, Notion and popular CRMs. Most agent and automation projects take 2 to 4 weeks with weekly reviews.",
    ],
    proof: [{ label: "See AI agent and automation work in the portfolio", href: "/portfolio" }],
    faqs: [
      {
        question: "What is the difference between an AI agent and a chatbot?",
        answer:
          "A chatbot replies to messages. An AI agent can reason through a task and take actions with tools — for example, look up a customer, draft a follow-up email and log it in your CRM.",
      },
      {
        question: "How much does a custom AI agent cost?",
        answer: `It depends on how many steps and tools the agent uses and how much testing it needs, so every agent is quoted individually. ${QUOTE_NOTE}`,
      },
      {
        question: "Is it safe to let an AI agent act for my business?",
        answer:
          "Agents are given permission-scoped access, include human-in-the-loop checkpoints for sensitive actions, and keep a full audit log of what they did.",
      },
      {
        question: "What tasks can an AI agent handle for a small business?",
        answer:
          "Common examples are research summaries, customer onboarding steps, monitoring data for unusual changes, and drafting brand-aligned marketing copy for review.",
      },
      {
        question: "How long does it take to build an AI agent?",
        answer:
          "Most AI agent and multi-step automation projects take 2 to 4 weeks, including testing with real examples before going live.",
      },
    ],
  },
  "ecommerce-solutions": {
    heading: "Shopify & E-commerce Development in Toronto",
    paragraphs: [
      "Faraz sets up and customizes Shopify and WooCommerce stores for Toronto and GTA brands — product pages, collections, filters, shipping rules, taxes and a fast, mobile-friendly checkout.",
      "Checkout can include Stripe, PayPal and Interac e-Transfer, with automatic order confirmations, shipping notifications and CRM syncing so fewer orders need manual follow-up.",
      "Whether you are launching your first store or improving an existing one, you work directly with the developer, and you get a timeline with your quote.",
    ],
    proof: [{ label: "See store and client work in the portfolio", href: "/portfolio" }],
    faqs: [
      {
        question: "Shopify or WooCommerce — which is better for a small Toronto store?",
        answer:
          "Shopify is simpler to run and includes hosting and security. WooCommerce runs on WordPress and gives more control if you already have a WordPress site or need custom product rules. Faraz recommends one based on your products and budget.",
      },
      {
        question: "How much does a Shopify store setup cost?",
        answer: `It depends on the number of products, the theme work, apps and integrations you need, so every store is quoted individually. ${QUOTE_NOTE}`,
      },
      {
        question: "Can customers pay with Interac e-Transfer?",
        answer:
          "Yes. Stores can be set up with Stripe, PayPal and Interac e-Transfer checkout flows for Canadian customers.",
      },
      {
        question: "Can you improve or redesign my existing store?",
        answer:
          "Yes. Faraz can customize your current theme, speed up product pages, improve the mobile checkout and connect order data to your CRM.",
      },
    ],
  },
  "ai-automation": {
    heading: "AI Automation for Toronto Small Businesses",
    paragraphs: [
      "Faraz builds automation workflows with n8n, Make.com and Zapier that remove repetitive admin work for Toronto and GTA businesses — no more copying leads from forms into spreadsheets by hand.",
      "A common example: a new enquiry arrives on your website, AI scores it, your team gets an instant WhatsApp alert, and the lead is added to your CRM (HubSpot, Notion, Airtable or Google Sheets) with a follow-up email already sent.",
      "Every workflow includes error handling, retries and monitoring alerts, and is documented at handover. Most automation projects take 2 to 4 weeks.",
    ],
    proof: [{ label: "See automation work in the portfolio", href: "/portfolio" }],
    faqs: [
      {
        question: "n8n, Make or Zapier — which should my business use?",
        answer:
          "Zapier is the quickest to set up for simple tasks, Make handles more complex visual workflows, and n8n is best for advanced or self-hosted automation. Faraz chooses based on your tools, volume and budget.",
      },
      {
        question: "How much does business automation cost?",
        answer: `It depends on how many steps, apps and data sources are involved, so every workflow is quoted individually. ${QUOTE_NOTE}`,
      },
      {
        question: "Do I need to change the software I already use?",
        answer:
          "Usually not. Automations connect your existing tools — CRMs, WhatsApp, email, spreadsheets, Shopify or WordPress — so your team keeps working the way it does now.",
      },
      {
        question: "What happens if an automation fails?",
        answer:
          "Workflows are built with error handling and retry logic, and monitoring alerts tell you if something needs attention.",
      },
    ],
  },
  "seo-performance": {
    heading: "Technical SEO for Toronto Business Websites",
    paragraphs: [
      "Technical SEO makes sure Google can crawl, understand and trust your website. Faraz audits Toronto business websites for crawl errors, missing or wrong page titles, slow pages, broken structured data and indexing problems — then fixes them in the code.",
      "Work includes Schema.org structured data (LocalBusiness, Service, FAQ), Core Web Vitals speed tuning, image optimization, sitemap and Google Search Console setup, and clear titles and descriptions for each service and location you target.",
    ],
    proof: [{ label: "See client websites in the portfolio", href: "/portfolio" }],
    faqs: [
      {
        question: "What is the difference between technical SEO and regular SEO?",
        answer:
          "Technical SEO fixes how your website is built — speed, structure, indexing and structured data. Content and local SEO (blog posts, reviews, Google Business Profile) build on top of that foundation.",
      },
      {
        question: "How much does a technical SEO audit and fix cost?",
        answer: `It depends on the size of the site and what the audit finds, so every SEO project is quoted individually. ${QUOTE_NOTE}`,
      },
      {
        question: "Can you guarantee first-page rankings on Google?",
        answer:
          "No honest provider can — Google itself says there is no way to pay for a better ranking. What Faraz guarantees is a technically clean, fast website that gives your content and reviews the best chance to rank.",
      },
      {
        question: "How soon will I see results?",
        answer:
          "Technical fixes take effect as Google recrawls your pages, which can take days to several weeks. Ranking changes depend on competition and on content and reviews, so they usually take longer.",
      },
    ],
  },
};
