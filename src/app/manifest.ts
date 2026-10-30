import { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "AI by Faraz | Web Developer & AI Solutions Specialist",
    short_name: "AI by Faraz",
    description:
      "Modern Next.js & WordPress websites, Shopify stores, custom 24/7 AI chatbots, autonomous AI agents, and business workflow automations by Faraz Ahmed.",
    start_url: "/",
    display: "standalone",
    background_color: "#060813",
    theme_color: "#7C3AED",
    icons: [
      {
        src: "/images/logo.jpg",
        sizes: "192x192",
        type: "image/jpeg",
      },
      {
        src: "/images/logo.jpg",
        sizes: "512x512",
        type: "image/jpeg",
      },
    ],
  };
}

