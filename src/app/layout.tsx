import type { Metadata, Viewport } from "next";
import { Inter, Plus_Jakarta_Sans, Caveat } from "next/font/google";
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

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
  variable: "--font-heading",
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
    default: `Web Developer Toronto | AI Chatbots & Automation | ${SITE_NAME}`,
    template: `%s | ${SITE_NAME}`,
  },
  description:
    "Toronto web developer Faraz Ahmed (AI by Faraz) builds fast Next.js & WordPress websites, Shopify stores, AI chatbots and automation for small businesses. Free quote.",
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
    "Web Developer Toronto",
    "Website Development Toronto",
    "AI Chatbot Development Toronto",
    "AI Agent Development Toronto",
    "Shopify Developer Toronto",
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
    locale: "en_CA",
    url: SITE_URL,
    siteName: SITE_NAME,
    title: `Web Developer Toronto | AI Chatbots & Automation | ${SITE_NAME}`,
    description:
      "Toronto web developer Faraz Ahmed builds fast Next.js & WordPress websites, AI chatbots, Shopify stores and automated workflows for small businesses.",
    images: [
      {
        url: `${SITE_URL}/images/website-reference.png`,
        width: 1200,
        height: 630,
        alt: "AI by Faraz — Toronto Web Developer & AI Solutions Specialist",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `Web Developer Toronto | AI Chatbots & Automation | ${SITE_NAME}`,
    description:
      "Toronto web developer building fast Next.js & WordPress websites, AI chatbots, Shopify stores and automated workflows for small businesses.",
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
    <html lang="en-CA" className="light scroll-smooth" suppressHydrationWarning>
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
        className={`${inter.variable} ${plusJakartaSans.variable} ${caveat.variable} font-sans bg-[#F7F8FF] dark:bg-[#070B1F] text-[#0F172A] dark:text-[#F8FAFC] antialiased selection:bg-purple-600/30 selection:text-white min-h-screen flex flex-col transition-colors duration-300 relative`}
      >
        {/* Premium Site-wide Backdrop (aurora mesh + dot grid + film grain, GPU-cheap) */}
        <div className="premium-backdrop" aria-hidden="true">
          <div className="premium-aurora" />
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
