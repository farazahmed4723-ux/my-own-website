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
    id: "ai-automation",
    slug: "ai-automation",
    title: "AI Automation",
    tagline: "Streamline Workflows & Eliminate Repetitive Tasks",
    shortDescription:
      "Business process automation, workflow integrations, and repetitive task automation that save hours every single day.",
    fullDescription:
      "Modern businesses lose countless productive hours to manual data entry, disconnected tools, and repetitive tasks. Faraz Ahmed engineers custom automated workflows that link your CRM, email, databases, and internal spreadsheets using intelligent triggers and modern AI logic.",
    icon: "Cpu",
    badge: "Process Automation",
    features: [
      "End-to-end workflow automation (Make, Zapier, n8n, Custom Node scripts)",
      "CRM & lead pipeline automatic synchronization",
      "Automated document parsing & invoice processing",
      "Real-time event webhooks & notifications",
      "Error handling and fail-safe transactional logic",
      "Custom business rule triggers and scheduling",
    ],
    useCases: [
      "Capturing leads from landing pages and auto-syncing to CRM & WhatsApp alerts",
      "Extracting text from PDF contracts and populating financial sheets",
      "Auto-generating personalized email follow-ups based on client actions",
      "Automating customer onboarding sequences and asset provisioning",
    ],
    process: [
      { step: "01", title: "Workflow Audit", desc: "Mapping your current bottlenecks and identifying high-impact automation opportunities." },
      { step: "02", title: "Architecture Plan", desc: "Selecting the ideal toolchain, API endpoints, and data transformation rules." },
      { step: "03", title: "Integration & Build", desc: "Developing reliable automation pipelines with robust error recovery." },
      { step: "04", title: "Testing & Handover", desc: "Rigorous staging validation, documentation, and operational monitoring." },
    ],
    technologies: ["Node.js", "Python", "Zapier", "Make", "n8n", "Webhooks", "REST APIs"],
  },
  {
    id: "ai-chatbots",
    slug: "ai-chatbots",
    title: "AI Chatbots",
    tagline: "24/7 Intelligent Customer Support & Lead Conversion",
    shortDescription:
      "Custom website chatbots, business support assistants, and AI-powered customer interactions that convert visitors into clients.",
    fullDescription:
      "Deliver instant, context-aware answers to prospective customers at any time of day or night. Faraz builds intelligent chatbots powered by modern LLMs and custom knowledge bases, designed to understand your specific products, services, and policies without hallucinating.",
    icon: "Bot",
    badge: "Smart Support",
    features: [
      "Trained on your business documentation, FAQs, and service catalogs",
      "Instant lead qualification and calendar booking integration",
      "Custom chat widget UI matching your brand aesthetic",
      "Multi-channel support (Website, WhatsApp, Telegram)",
      "Seamless escalation to human agents with conversation summary",
      "Conversation analytics, topic clustering, and sentiment logging",
    ],
    useCases: [
      "Answering common client questions on pricing and booking 24/7",
      "Guiding visitors through quote estimations and scheduling consultations",
      "Providing immediate tier-1 support for software or e-commerce customers",
      "Automating WhatsApp inquiries with instant structured replies",
    ],
    process: [
      { step: "01", title: "Knowledge Ingestion", desc: "Curating and structuring your business FAQs, services, and product guidelines." },
      { step: "02", title: "Prompt Engineering & RAG", desc: "Configuring system instructions and knowledge retrieval safeguards." },
      { step: "03", title: "Widget Interface Design", desc: "Creating a sleek, responsive chat drawer integrated with your website." },
      { step: "04", title: "Production Deployment", desc: "Connecting analytics, rate limiting, and monitoring live user queries." },
    ],
    technologies: ["OpenAI API", "LangChain", "Next.js", "Tailwind CSS", "Pinecone", "WhatsApp API"],
  },
  {
    id: "website-development",
    slug: "website-development",
    title: "Website Development",
    tagline: "High-Performance Modern Web Platforms & Landing Pages",
    shortDescription:
      "WordPress websites, Next.js applications, business websites, landing pages, and custom responsive web experiences.",
    fullDescription:
      "Your website is the central hub of your digital identity. Faraz creates blazing-fast, visually captivating, and mobile-optimized websites engineered with modern frameworks like Next.js or tailored WordPress solutions that look stunning and convert visitors into paying clients.",
    icon: "Code",
    badge: "Core Specialty",
    features: [
      "Custom Next.js App Router applications with server-side rendering",
      "Tailored WordPress themes & Elementor/Gutenberg architectures",
      "Pixel-perfect responsive design across mobile, tablet, and desktop viewports",
      "Performance optimization with sub-second page load times",
      "Technical SEO foundation: Schema markup, sitemaps, Open Graph, Core Web Vitals",
      "Accessible, secure, and easily maintainable codebase",
    ],
    useCases: [
      "Luxury service & executive transportation platforms (e.g., Elite Class Limo)",
      "High-converting landing pages for marketing campaigns and service launches",
      "Corporate business websites for consultancies, agencies, and firms",
      "Portfolio websites for creative professionals and entrepreneurs",
    ],
    process: [
      { step: "01", title: "Discovery & Structure", desc: "Defining goals, audience persona, site architecture, and content hierarchy." },
      { step: "02", title: "Wireframes & UI Polish", desc: "Creating modern layouts, dark/light themes, and interactive components." },
      { step: "03", title: "Development & Optimization", desc: "Writing clean TypeScript/React code with dynamic animations and SEO." },
      { step: "04", title: "Quality QA & Launch", desc: "Cross-device browser verification, domain DNS setup, and live deployment." },
    ],
    technologies: ["Next.js", "React", "TypeScript", "Tailwind CSS", "WordPress", "HTML5/CSS3"],
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
