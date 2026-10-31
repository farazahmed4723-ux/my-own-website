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
      "Over the past 7+ years, Faraz has engineered custom WordPress solutions for international brands. From bespoke lightweight themes without bloated plugins to complex WooCommerce stores and Bricks/Elementor builds, you get pixel-perfect design combined with enterprise-grade caching, security, and sub-second load times.",
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
];
