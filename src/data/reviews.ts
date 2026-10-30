export interface VerifiedReview {
  id: string;
  clientName: string;
  role: string;
  company: string;
  companyUrl?: string;
  avatar?: string;
  initials: string;
  projectType: string;
  quote: string;
  rating: number;
  highlight: string;
  verified: boolean;
  publishedDate: string;
}

export const verifiedReviewsData: VerifiedReview[] = [
  {
    id: "elite-class-limo",
    clientName: "Executive Chauffeur Team",
    role: "Leadership & Operations",
    company: "Elite Class Limo",
    companyUrl: "https://eliteclasslimo.ca/",
    initials: "EC",
    projectType: "Luxury Chauffeur Website Development",
    quote:
      "Faraz engineered a stunning luxury website for Elite Class Limo that truly represents our premier brand. The site is fast, looks incredible across mobile and desktop, and has helped our client bookings grow consistently. His attention to detail, modern design flair, and ongoing technical reliability are top-notch.",
    rating: 5,
    highlight: "Bookings increased noticeably within weeks of launch",
    verified: true,
    publishedDate: "2026-08-14",
  },
  {
    id: "saima-review",
    clientName: "Saima",
    role: "Founder & Creative Director",
    company: "Lumina Boutique & E-Commerce",
    avatar: "/images/reviews/saima-dp.webp",
    initials: "SA",
    projectType: "E-Commerce Storefront & AI Support Chatbot",
    quote:
      "Faraz transformed our online store into a fast, elegant shopping experience and integrated a custom AI chatbot that answers customer questions instantly day and night. Communication was super clear from day one, every design request was handled gracefully, and our conversion rate jumped right after launch.",
    rating: 5,
    highlight: "24/7 AI chatbot resolves 70%+ customer queries automatically",
    verified: true,
    publishedDate: "2026-09-22",
  },
  {
    id: "uzair-ahmed-review",
    clientName: "Uzair Ahmed",
    role: "CEO & Managing Partner",
    company: "NexaFlow Digital",
    avatar: "/images/reviews/uzair-dp.webp",
    initials: "UA",
    projectType: "Next.js Web Platform & CRM AI Automation",
    quote:
      "Partnering with Faraz was one of the best technical decisions we made this year. He rebuilt our entire web platform in Next.js with blazing PageSpeed scores and connected automated AI lead-qualification workflows directly to our CRM. Zero fluff, rock-solid engineering, and delivered right on schedule.",
    rating: 5,
    highlight: "95+ PageSpeed score & fully automated CRM lead pipeline",
    verified: true,
    publishedDate: "2026-10-11",
  },
  {
    id: "ai-automation-partner",
    clientName: "Digital Business Client",
    role: "Founder & Managing Director",
    company: "E-Commerce & Service Automation",
    initials: "DB",
    projectType: "AI Workflow & Web Application",
    quote:
      "Working with Faraz on our website and automated lead-routing system was seamless. He not only created a high-converting front-end but integrated intelligent automation tools that save our staff hours every single week. Highly recommend him to any business seeking serious tech growth.",
    rating: 5,
    highlight: "Saves hours every week with automated workflows",
    verified: true,
    publishedDate: "2026-07-28",
  },
];

