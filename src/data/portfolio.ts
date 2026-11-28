export interface PortfolioProject {
  id: string;
  slug: string;
  title: string;
  category: string;
  developer: string;
  projectType: string;
  description: string;
  image: string;
  videoUrl?: string;
  liveUrl?: string;
  isRealClient: boolean;
  statusBadge: string;
  badgeType?: "Full Stack" | "WordPress" | "Video Editing" | string;
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
    image: "/images/elite-class-limo.webp",
    liveUrl: "https://eliteclasslimo.ca/",
    isRealClient: true,
    statusBadge: "Verified Client Project",
    performanceBadge: "Speed-Optimized Build",
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
    performanceBadge: "Speed-Optimized Build",
    highlights: [
      "Interactive live fleet & heavy flatbed showcase carousel",
      "Instant freight, moving & hauling quote request workflow",
      "Local SEO architecture targeting Surrey, Vancouver & Lower Mainland BC",
      "Executive high-contrast responsive UI across mobile & desktop",
    ],
    technologies: ["Next.js", "TypeScript", "Tailwind CSS", "Local SEO", "Lead Capture"],
  },
  {
    id: "tabreed-riyadh",
    slug: "tabreed-riyadh",
    title: "تبريد وتكييف الرياض – HVAC & Maintenance Platform",
    category: "Commercial HVAC & Appliance Engineering (Riyadh, KSA)",
    badgeType: "Full Stack",
    developer: "Faraz Ahmed",
    projectType: "Commercial HVAC Platform & WhatsApp Dispatch",
    description:
      "Designed and developed a high-converting Arabic web platform for Tabreed & Takeef in Al-Zahra, Riyadh—featuring 24/7 instant WhatsApp service dispatch, free home inspection booking, circuit board repair showcase, and local Riyadh SEO.",
    image: "/images/tabreed-riyadh.webp",
    liveUrl: "https://xn-----dtdablc2brf0dwhzar8c3afaf.com/",
    isRealClient: true,
    statusBadge: "Verified Client Project",
    performanceBadge: "Speed-Optimized Build",
    highlights: [
      "Instant WhatsApp dispatch & direct calling emergency hotline",
      "Comprehensive AC, refrigeration & electronic circuit board repair showcase",
      "Local Riyadh SEO architecture targeting Al-Zahra & Greater Riyadh districts",
      "High-conversion RTL layout with verified 25-day warranty trust badges",
    ],
    technologies: ["Next.js", "TypeScript", "Tailwind CSS", "RTL Architecture", "Local SEO", "WhatsApp Automation"],
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
      "Designed & engineered a modern portfolio web platform for Faraz Ahmad featuring an interactive AI chatbot, service architecture showcases, and ultra-fast Next.js performance.",
    image: "/images/website-reference-hd.webp",
    liveUrl: "https://www.aibyfaraz.com/",
    isRealClient: true,
    statusBadge: "Live Production Platform",
    performanceBadge: "Speed-Optimized Build",
    highlights: [
      "PageSpeed load optimization",
      "Interactive Gemini & OpenAI RAG assistant",
      "PostgreSQL & Supabase lead capture",
      "Tailwind CSS custom glassmorphism design system",
    ],
    technologies: ["React", "TypeScript", "Tailwind CSS", "Vite", "AI Agent Showcase", "Workflow Automation"],
  },
  {
    id: "faraz-video-editing-showcase",
    slug: "faraz-video-editing-showcase",
    title: "Canada vs Pakistan – Mindset & Viral Brand Reel",
    category: "Video Editing & Motion Graphics",
    badgeType: "Video Editing",
    developer: "Faraz Ahmed",
    projectType: "Viral Personal Brand Reel (3D Rotoscoping & VFX)",
    description:
      "High-retention vertical video edit featuring 3D text placed behind the subject ('CANADA', 'MILLIONAIRE'), fast-paced cuts, custom motion graphics B-roll, and clean voice mastering.",
    image: "/images/videos/cover-canada-reel.webp",
    videoUrl: "/videos/faraz-reel-master.mp4",
    liveUrl: "/video-editing",
    isRealClient: true,
    statusBadge: "Featured Video Edit",
    performanceBadge: "Format: 720×1280 • HD 9:16",
    highlights: [
      "3D text rotoscoped behind subject ('MILLIONAIRE' & 'CANADA')",
      "Zero dead pauses & rapid visual hooks for high retention",
      "Custom animated motion graphics B-roll & sound effects",
      "Clean studio voice mastering with background noise eliminated",
    ],
    technologies: ["3D Rotoscoping", "Motion Graphics", "SFX & Sound Design", "Color Grading", "Premiere Pro", "After Effects"],
  },
  {
    id: "asal-kamyabi-reel",
    slug: "asal-kamyabi-reel",
    title: "Asal Kamyabi Kya Hai? – Viral Urdu Reel",
    category: "Personal Brand & Podcast Editing",
    badgeType: "Video Editing",
    developer: "Faraz Ahmed",
    projectType: "High-Retention Vertical Video (Reels / TikTok / Shorts)",
    description:
      "Customer-ready viral storytelling reel with bold Roman Urdu kinetic captions, all dead pauses removed, zoom punch-ins, crisp audio cleanup, and ambient sound effects.",
    image: "/images/videos/thumb-asal.webp",
    videoUrl: "/videos/asal-kamyabi-full.mp4",
    liveUrl: "/video-editing",
    isRealClient: true,
    statusBadge: "Verified Client Reel",
    performanceBadge: "Format: 720×1280 • HD 9:16",
    highlights: [
      "Bold Roman Urdu word-by-word kinetic captions",
      "Zero dead pauses — rapid pacing for high watch time",
      "Dynamic zoom-ins & visual hooks in first 3 seconds",
      "Saaf studio audio (background noise removed) + SFX",
    ],
    technologies: ["Kinetic Captions", "Audio Cleanup", "Zoom Hooks", "Premiere Pro", "Sound Design"],
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
    image: "/images/concepts/concept-aiagent.webp",
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
    image: "/images/concepts/concept-webdev.webp",
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
    image: "/images/concepts/concept-graphic.webp",
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
