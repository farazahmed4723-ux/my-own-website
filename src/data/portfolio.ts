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
  highlights: string[];
  technologies: string[];
}

export const portfolioProjects: PortfolioProject[] = [
  {
    id: "elite-class-limo",
    slug: "elite-class-limo",
    title: "Elite Class Limo",
    category: "Luxury Transportation Website",
    developer: "Faraz Ahmed",
    projectType: "Client Website Development",
    description:
      "Designed and developed a professional website for Elite Class Limo, a luxury transportation business, with a focus on presenting its services through a polished digital experience.",
    image: "/images/elite-class-limo.jpg",
    liveUrl: "https://eliteclasslimo.ca/",
    isRealClient: true,
    statusBadge: "Verified Client Project",
    highlights: [
      "Polished luxury visual presentation",
      "Comprehensive fleet & service showcase",
      "Responsive layout optimized for mobile bookings",
      "Executive aesthetic with high contrast & typography",
    ],
    technologies: ["React", "Next.js", "Tailwind CSS", "SEO Optimization"],
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
      "3D metallic lighting and glass aesthetic studies",
      "Custom vector assets and component library",
    ],
    technologies: ["Figma", "UI/UX Design", "Color Theory", "CSS Glassmorphism"],
  },
];
