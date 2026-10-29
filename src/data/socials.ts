export interface SocialLink {
  id: string;
  name: string;
  icon: string;
  url: string;
  color: string;
  hoverGlow: string;
  bgGradient?: string;
  badge?: string;
  tooltip: string;
}

export const farazSocialLinks: SocialLink[] = [
  {
    id: "whatsapp",
    name: "WhatsApp",
    icon: "whatsapp",
    url: "https://wa.me/14374348789",
    color: "#25D366",
    hoverGlow: "rgba(37, 211, 102, 0.5)",
    bgGradient: "bg-[#25D366]",
    badge: "Online",
    tooltip: "Chat on WhatsApp (+1 437 434-8789)",
  },
  {
    id: "facebook",
    name: "Facebook",
    icon: "facebook",
    url: "https://www.facebook.com/aibyfaraz",
    color: "#1877F2",
    hoverGlow: "rgba(24, 119, 242, 0.5)",
    bgGradient: "bg-[#1877F2]",
    tooltip: "Connect on Facebook",
  },
  {
    id: "linkedin",
    name: "LinkedIn",
    icon: "linkedin",
    url: "https://www.linkedin.com/in/faraz-ahmad-b11b36437/",
    color: "#0A66C2",
    hoverGlow: "rgba(10, 102, 194, 0.5)",
    bgGradient: "bg-[#0A66C2]",
    tooltip: "Faraz Ahmed on LinkedIn",
  },
  {
    id: "email",
    name: "Email",
    icon: "mail",
    url: "mailto:faraz.ahmed4724@gmail.com",
    color: "#0284C7",
    hoverGlow: "rgba(2, 132, 199, 0.5)",
    bgGradient: "bg-[#0284C7]",
    tooltip: "Send Email (faraz.ahmed4724@gmail.com)",
  },
  {
    id: "instagram",
    name: "Instagram",
    icon: "instagram",
    url: "https://www.instagram.com/aibyfaraz",
    color: "#E1306C",
    hoverGlow: "rgba(225, 48, 108, 0.5)",
    bgGradient: "bg-gradient-to-tr from-[#833AB4] via-[#FD1D1D] to-[#F77737]",
    tooltip: "Follow @aibyfaraz on Instagram",
  },
];
