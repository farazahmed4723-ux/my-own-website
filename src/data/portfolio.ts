export interface PortfolioProject {
  id: string;
  slug: string;
  title: string;
  category: string;
  developer: string;
  projectType: string;
  description: string;
  image: string;
  liveUrl?: string;
  isRealClient: boolean;
  statusBadge: string;
  badgeType?: "Full Stack" | "WordPress" | string;
  performanceBadge?: string;
  highlights: string[];
  technologies: string[];
}

export const portfolioProjects: PortfolioProject[] = [
  {
    id: "elite-class-limo",
    slug: "elite-class-limo",
    title: "Elite Class Limo – Luxury Chauffeur Platform",
    category: "Luxury Chauffeur & VIP Transportation",
    badgeType: "WordPress",
    developer: "Faraz Ahmed",
    projectType: "Custom Client Website & Booking Experience",
    description:
      "Designed and developed a professional luxury website for Elite Class Limo, featuring executive fleet presentation, instant VIP reservation inquiries, and smooth responsive design.",
    image: "/images/elite-class-limo.jpg",
    liveUrl: "https://eliteclasslimo.ca/",
    isRealClient: true,
    statusBadge: "Verified Client Project",
    performanceBadge: "Performance: Sub-1s Load",
    highlights: [
      "Polished luxury visual presentation",
      "Comprehensive fleet & service showcase",
      "Responsive layout optimized for mobile bookings",
      "Executive aesthetic with high contrast & typography",
    ],
    technologies: ["WordPress", "Next.js", "Tailwind CSS", "SEO Optimization", "Mobile Bookings"],
  },
  {
    id: "stn-trucking-ltd",
    slug: "stn-trucking-ltd",
    title: "STN Trucking Ltd. – Commercial Fleet Portal",
    category: "Commercial Logistics & Transport Web Platform",
    badgeType: "Full Stack",
    developer: "Faraz Ahmed",
    projectType: "Commercial Fleet Website & Quote Platform",
    description:
      "Engineered a high-converting commercial trucking, moving, and heavy flatbed hauling platform for STN Trucking Ltd. across Surrey, Vancouver, and Lower Mainland, BC—featuring instant freight quote capture.",
    image: "/images/stn-trucking.webp",
    liveUrl: "https://infostntrucking.ca/",
    isRealClient: true,
    statusBadge: "Verified Client Project",
    performanceBadge: "Performance: 98% PageSpeed",
    highlights: [
      "Interactive live fleet & heavy flatbed showcase carousel",
      "Instant freight, moving & hauling quote request workflow",
      "Local SEO architecture targeting Surrey, Vancouver & Lower Mainland BC",
      "Executive high-contrast responsive UI across mobile & desktop",
    ],
    technologies: ["Next.js", "TypeScript", "Tailwind CSS", "Local SEO", "Lead Capture"],
  },
  {
    id: "ai-by-faraz",
    slug: "ai-by-faraz",
    title: "AI by Faraz – AI Agent & Workflow Platform",
    category: "Full Stack AI Portfolio & Workflow Systems",
    badgeType: "Full Stack",
    developer: "Faraz Ahmed",
    projectType: "Full Stack AI Platform & Client Portal",
    description:
      "Designed & engineered a modern portfolio web platform for Faraz Ahmad featuring interactive AI chatbot, dynamic review system, and ultra-fast Next.js architecture.",
    image: "/images/website-reference-hd.jpg",
    liveUrl: "https://aibyfaraz.com/",
    isRealClient: true,
    statusBadge: "Live Production Platform",
    performanceBadge: "Performance: Sub-1s Load",
    highlights: [
      "Sub-1s PageSpeed load optimization",
      "Interactive Gemini & OpenAI RAG assistant",
      "Live Supabase verified review vault",
      "Tailwind CSS custom glassmorphism design system",
    ],
    technologies: ["React", "TypeScript", "Tailwind CSS", "Vite", "AI Agent Showcase", "Workflow Automation"],
  },
  {
    id: "concept-ai-agent-mesh",
    slug: "concept-ai-agent-mesh",
    title: "Autonomous Agent Orchestration Mesh",
    category: "AI Agent Architecture (Concept)",
    developer: "Faraz Ahmed",
    projectType: "Architecture Concept & Prototype",
    description:
      "A conceptual architecture demonstrating multi-agent workflow routing, autonomous customer inquiry classification, and live CRM synchronization.",
    image: "/images/concepts/concept-aiagent.jpg",
    isRealClient: false,
    statusBadge: "Concept Prototype",
    highlights: [
      "Demonstration of autonomous agent tool calling",
      "Stateful conversation memory pipeline",
      "Simulated CRM webhook notifications",
    ],
    technologies: ["Node.js", "LangChain", "OpenAI API", "Vector Embeddings"],
  },
  {
    id: "concept-cloud-analytics-dashboard",
    slug: "concept-cloud-analytics-dashboard",
    title: "Aurora SaaS Analytics & Operations Console",
    category: "Custom Web Application (Concept)",
    developer: "Faraz Ahmed",
    projectType: "UI/UX & Frontend Concept",
    description:
      "A prototype concept for real-time cloud operations and performance monitoring with modular glassmorphism data widgets and theme switching.",
    image: "/images/concepts/concept-webdev.jpg",
    isRealClient: false,
    statusBadge: "Concept Prototype",
    highlights: [
      "Interactive data cards and telemetry filters",
      "Responsive dark-mode first design system",
      "Modular dashboard widget architecture",
    ],
    technologies: ["Next.js", "TypeScript", "Tailwind CSS", "Recharts"],
  },
  {
    id: "concept-luxury-brand-identity",
    slug: "concept-luxury-brand-identity",
    title: "Luminosa Luxury Design & Brand System",
    category: "Brand & UI/UX System (Concept)",
    developer: "Faraz Ahmed",
    projectType: "Design Concept",
    description:
      "An experimental visual brand design exploration featuring metallic gold textures, high-contrast dark surfaces, and typography guidelines.",
    image: "/images/concepts/concept-graphic.jpg",
    isRealClient: false,
    statusBadge: "Concept Prototype",
    highlights: [
      "Comprehensive typography hierarchy and color scales",
      "Metallic foil material shaders and vector badges",
      "Editorial print layouts and digital collateral guidelines",
    ],
    technologies: ["Figma", "Design Systems", "Brand Strategy", "Vector Art"],
  },
];
