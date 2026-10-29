import type { Metadata } from "next";
import { Inter, Space_Grotesk, Caveat } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FloatingSocialBar from "@/components/FloatingSocialBar";
import AIChatBot from "@/components/AIChatBot";

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

export const metadata: Metadata = {
  metadataBase: new URL("https://aibyfaraz.com"),
  title: {
    default: "AI by Faraz | Web Developer & AI Solutions Specialist",
    template: "%s | AI by Faraz",
  },
  description:
    "Official portfolio and digital agency website for AI by Faraz, owned by Faraz Ahmed. Specializing in WordPress, Next.js, modern web applications, AI chatbots, and intelligent automation systems.",
  keywords: [
    "AI by Faraz",
    "Faraz Ahmed",
    "Web Developer",
    "AI Solutions Specialist",
    "WordPress Developer",
    "Next.js Developer",
    "AI Chatbots",
    "AI Automation",
    "Autonomous AI Agents",
    "E-commerce Developer",
    "Elite Class Limo Developer",
    "Toronto Web Developer",
  ],
  authors: [{ name: "Faraz Ahmed", url: "https://aibyfaraz.com" }],
  creator: "Faraz Ahmed",
  publisher: "AI by Faraz",
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
    url: "https://aibyfaraz.com",
    siteName: "AI by Faraz",
    title: "AI by Faraz | Building Intelligent Websites & AI-Powered Solutions",
    description:
      "Modern websites, custom AI chatbots, business automation workflows, and tailored software solutions engineered by Faraz Ahmed.",
    images: [
      {
        url: "/images/website-reference.png",
        width: 1200,
        height: 630,
        alt: "AI by Faraz - Futuristic AI and Web Development",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "AI by Faraz | Web Developer & AI Solutions Specialist",
    description:
      "Building intelligent websites, AI chatbots, and automated digital solutions that help businesses scale.",
    images: ["/images/website-reference.png"],
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
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        "@id": "https://aibyfaraz.com/#faraz",
        name: "Faraz Ahmed",
        jobTitle: "Web Developer & AI Solutions Specialist",
        url: "https://aibyfaraz.com",
        image: "https://aibyfaraz.com/images/faraz-portrait.png",
        email: "faraz.ahmed4724@gmail.com",
        telephone: "+14374348789",
        knowsAbout: [
          "Next.js",
          "WordPress",
          "React",
          "TypeScript",
          "AI Chatbots",
          "AI Automation",
          "AI Agents",
          "Shopify",
          "Full Stack Web Development",
        ],
      },
      {
        "@type": "ProfessionalService",
        "@id": "https://aibyfaraz.com/#business",
        name: "AI by Faraz",
        url: "https://aibyfaraz.com",
        logo: "https://aibyfaraz.com/images/logo.jpg",
        image: "https://aibyfaraz.com/images/website-reference.png",
        founder: {
          "@id": "https://aibyfaraz.com/#faraz",
        },
        description:
          "Professional web development, custom AI chatbots, workflow automation, and custom digital software development.",
        telephone: "+14374348789",
        email: "faraz.ahmed4724@gmail.com",
      },
      {
        "@type": "WebSite",
        "@id": "https://aibyfaraz.com/#website",
        url: "https://aibyfaraz.com",
        name: "AI by Faraz",
        publisher: {
          "@id": "https://aibyfaraz.com/#faraz",
        },
      },
    ],
  };

  return (
    <html lang="en" className="dark scroll-smooth" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem('faraz-theme');if(t==='light'){document.documentElement.classList.remove('dark');document.documentElement.classList.add('light');document.documentElement.style.colorScheme='light';}else{document.documentElement.classList.add('dark');document.documentElement.classList.remove('light');document.documentElement.style.colorScheme='dark';}}catch(e){}})();`,
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body
        className={`${inter.variable} ${spaceGrotesk.variable} ${caveat.variable} font-sans bg-[#060813] text-[#F8FAFC] antialiased selection:bg-purple-600/30 selection:text-white min-h-screen flex flex-col transition-colors duration-300`}
      >
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
        <FloatingSocialBar />
        <AIChatBot />
      </body>
    </html>
  );
}
