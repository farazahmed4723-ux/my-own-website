import type { Metadata, Viewport } from "next";
import { Inter, Space_Grotesk, Caveat } from "next/font/google";
import dynamic from "next/dynamic";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FloatingSocialBar from "@/components/FloatingSocialBar";
import { ScrollProgressBar } from "@/components/ScrollMotion";
import { AuthProvider } from "@/context/AuthContext";
import { buildGlobalGraphJsonLd, SITE_NAME, SITE_URL, FOUNDER_NAME } from "@/lib/seo";

// Dynamically import client-only heavy interactive widgets to reduce initial mobile JS bundle
const CustomCursor = dynamic(() => import("@/components/CustomCursor"), {
  ssr: false,
});
const AIChatBot = dynamic(() => import("@/components/AIChatBot"), {
  ssr: false,
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  display: "swap",
});

const caveat = Caveat({
  subsets: ["latin"],
  variable: "--font-caveat",
  display: "swap",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#0A0E24" },
    { media: "(prefers-color-scheme: light)", color: "#F8FAFC" },
  ],
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  applicationName: SITE_NAME,
  category: "technology",
  title: {
    default: `${SITE_NAME} | Web Developer & AI Solutions Specialist (${FOUNDER_NAME})`,
    template: `%s | ${SITE_NAME}`,
  },
  description:
    "Official portfolio and digital engineering studio of Faraz Ahmed (AI by Faraz). Building high-converting Next.js & WordPress websites, Shopify stores, custom 24/7 AI chatbots, autonomous AI agents, and CRM workflow automations.",
  keywords: [
    "AI by Faraz",
    "Faraz Ahmed",
    "Faraz Ahmed Web Developer",
    "AI Solutions Specialist",
    "Next.js Developer",
    "WordPress Developer",
    "Custom AI Chatbots",
    "AI Automation Agency",
    "Autonomous AI Agents",
    "Shopify E-commerce Developer",
    "WooCommerce Developer",
    "Supabase Full-Stack Developer",
    "Toronto Web Developer",
    "Canada AI Consultant",
  ],
  authors: [{ name: FOUNDER_NAME, url: SITE_URL }],
  creator: FOUNDER_NAME,
  publisher: SITE_NAME,
  alternates: {
    canonical: SITE_URL,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: SITE_URL,
    siteName: SITE_NAME,
    title: `${SITE_NAME} | Building Intelligent Websites & AI-Powered Solutions`,
    description:
      "Modern Next.js & WordPress websites, custom 24/7 AI chatbots, Shopify storefronts, and automated workflows engineered by Faraz Ahmed.",
    images: [
      {
        url: `${SITE_URL}/images/website-reference.png`,
        width: 1200,
        height: 630,
        alt: "AI by Faraz — Web Developer & AI Solutions Specialist",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE_NAME} | Web Developer & AI Solutions Specialist`,
    description:
      "Building intelligent Next.js & WordPress websites, AI chatbots, Shopify stores, and automated workflows that help businesses scale.",
    images: [`${SITE_URL}/images/website-reference.png`],
  },
  icons: {
    icon: "/images/logo.jpg",
    apple: "/images/logo.jpg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = buildGlobalGraphJsonLd();

  return (
    <html lang="en" className="light scroll-smooth" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem('faraz-theme-v2');if(t==='dark'){document.documentElement.classList.add('dark');document.documentElement.classList.remove('light');document.documentElement.style.colorScheme='dark';}else{document.documentElement.classList.remove('dark');document.documentElement.classList.add('light');document.documentElement.style.colorScheme='light';}}catch(e){}})();`,
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <meta
          name="google-signin-client_id"
          content="127413910597-81l5uo9epfr168ino5llvjetqumad4kq.apps.googleusercontent.com"
        />
      </head>
      <body
        className={`${inter.variable} ${spaceGrotesk.variable} ${caveat.variable} font-sans bg-[#F4F8FF] dark:bg-[#0D1B3E] text-[#0F172A] dark:text-[#F8FAFC] antialiased selection:bg-purple-600/30 selection:text-white min-h-screen flex flex-col transition-colors duration-300 relative`}
      >
        {/* Global Ambient Studio Lighting Mesh */}
        <div
          className="fixed inset-0 pointer-events-none z-0 overflow-hidden"
          aria-hidden="true"
        >
          {/* Top Radial Flare behind Nav and Hero */}
          <div className="absolute -top-36 left-1/2 -translate-x-1/2 w-[360px] sm:w-[1200px] h-[300px] sm:h-[600px] bg-gradient-to-b from-[#38bdf8]/15 sm:from-[#38bdf8]/20 via-[#8B5CF6]/10 sm:via-[#8B5CF6]/15 to-transparent dark:from-[#1E88E5]/30 sm:dark:from-[#1E88E5]/35 dark:via-[#8B5CF6]/20 sm:dark:via-[#8B5CF6]/25 rounded-full blur-[60px] sm:blur-[140px]" />
          {/* Mid-page Left Glow - Desktop only for 60fps mobile scrolling */}
          <div className="hidden sm:block absolute top-[28%] -left-36 w-[650px] h-[650px] bg-gradient-to-tr from-[#38bdf8]/15 via-[#6366f1]/12 to-transparent dark:from-[#38bdf8]/25 dark:via-[#6366f1]/25 rounded-full blur-[150px]" />
          {/* Mid-page Right Glow - Desktop only for 60fps mobile scrolling */}
          <div className="hidden sm:block absolute top-[55%] -right-36 w-[700px] h-[700px] bg-gradient-to-bl from-[#a855f7]/14 via-[#38bdf8]/12 to-transparent dark:from-[#a855f7]/25 dark:via-[#1E88E5]/22 rounded-full blur-[150px]" />
          {/* Lower Bottom Glow - Desktop only for 60fps mobile scrolling */}
          <div className="hidden sm:block absolute -bottom-24 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-gradient-to-t from-[#38bdf8]/15 via-[#8B5CF6]/10 to-transparent dark:from-[#1E88E5]/30 dark:via-[#8B5CF6]/20 rounded-full blur-[140px]" />
        </div>

        <AuthProvider>
          <CustomCursor />
          <ScrollProgressBar />
          <Navbar />
          <main className="flex-1 relative z-10">{children}</main>
          <Footer />
          <FloatingSocialBar />
          <AIChatBot />
        </AuthProvider>
      </body>
    </html>
  );
}
