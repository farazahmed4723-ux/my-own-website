export interface VideoReel {
  id: string;
  title: string;
  tagline: string;
  styleTag: string;
  duration: string;
  resolution: string;
  videoUrl: string;
  previewUrl: string;
  posterUrl: string;
  aspectRatio: string;
  bullets: string[];
  tools: string[];
  whatsappMessage: string;
}

export interface VideoPackage {
  id: string;
  name: string;
  tagline: string;
  price: string;
  period?: string;
  isPopular?: boolean;
  features: string[];
  whatsappMessage: string;
}

export interface VideoFaq {
  question: string;
  answer: string;
}

export const VIDEO_SHOWCASE_REELS: VideoReel[] = [
  {
    id: "asal-kamyabi",
    title: "Asal Kamyabi Kya Hai? – Viral Urdu Brand Reel",
    tagline: "High-retention personal brand reel with bold Roman Urdu captions and punchy storytelling.",
    styleTag: "Roman Urdu Captions & Storytelling",
    duration: "2:04",
    resolution: "720×1280 • HD 9:16",
    videoUrl: "/videos/asal-kamyabi-full.mp4",
    previewUrl: "/videos/preview-asal.mp4",
    posterUrl: "/images/videos/thumb-asal.webp",
    aspectRatio: "9/16",
    bullets: [
      "Word-by-word kinetic captions in Roman Urdu & English",
      "All dead pauses & filler words cut for rapid pacing",
      "Saaf audio (wind/room echo removed) + punchy sound design",
    ],
    tools: ["Premiere Pro", "CapCut Pro", "Audio Mastering", "Kinetic Typography"],
    whatsappMessage: "Hi Faraz, I want a reel edited like 'Asal Kamyabi' (Roman Urdu captions + rapid pacing).",
  },
  {
    id: "canada-pakistan",
    title: "Canada vs Pakistan Journey – Dynamic Hook Reel",
    tagline: "Fast-paced conversational reel engineered to lock attention in the first 3 seconds.",
    styleTag: "Fast Paced Cuts & Subtitles",
    duration: "0:55",
    resolution: "720×1280 • HD 9:16",
    videoUrl: "/videos/canada-pakistan.mp4",
    previewUrl: "/videos/preview-canada.mp4",
    posterUrl: "/images/videos/thumb-canada.webp",
    aspectRatio: "9/16",
    bullets: [
      "Instant visual hook in the first 3 seconds",
      "Dynamic camera zooms & beat-synced cuts",
      "High-contrast subtitle styling for mobile viewers",
    ],
    tools: ["Premiere Pro", "CapCut Pro", "Dynamic Zooms", "Sound Design"],
    whatsappMessage: "Hi Faraz, I want a reel edited like 'Canada vs Pakistan' with fast-paced cuts and bold captions.",
  },
  {
    id: "money-respect",
    title: "Canada vs Pakistan – Mindset & 3D Depth VFX Reel",
    tagline: "High-retention personal brand reel featuring 3D typography behind the subject ('MILLIONAIRE' & 'CANADA') and clean audio mastering.",
    styleTag: "3D Depth & Particle VFX",
    duration: "0:55",
    resolution: "720×1280 • HD 9:16",
    videoUrl: "/videos/faraz-reel-master.mp4",
    previewUrl: "/videos/preview-master.mp4",
    posterUrl: "/images/videos/cover-canada-reel.webp",
    aspectRatio: "9/16",
    bullets: [
      "3D text rotoscoped BEHIND the subject ('MILLIONAIRE' & 'CANADA')",
      "Flying cash particle effects synced to the beat",
      "Custom neon motion graphics B-roll ('NO WORK IS SMALL')",
    ],
    tools: ["After Effects", "Premiere Pro", "Rotoscoping", "Particle VFX"],
    whatsappMessage: "Hi Faraz, I want a high-end reel with 3D text behind me and particle VFX like 'Canada vs Pakistan'.",
  },
  {
    id: "vfx-breakdown",
    title: "3D Subject Masking & Cash VFX Breakdown",
    tagline: "Behind-the-scenes breakdown of 3D rotoscoping and floating currency physics.",
    styleTag: "3D Rotoscoping Breakdown",
    duration: "0:16",
    resolution: "720×1280 • HD 9:16",
    videoUrl: "/videos/faraz-reel-vfx.mp4",
    previewUrl: "/videos/preview-vfx.mp4",
    posterUrl: "/images/videos/thumb-vfx.webp",
    aspectRatio: "9/16",
    bullets: [
      "Seamless subject separation from the background",
      "Layered 3D text compositing in After Effects",
      "Punch-in cuts timed to voice inflections",
    ],
    tools: ["After Effects", "Rotoscoping", "Motion Tracking"],
    whatsappMessage: "Hi Faraz, I want 3D text placed behind me in my videos.",
  },
  {
    id: "motion-broll",
    title: "Custom Neon Motion Graphics & Animated B-Roll",
    tagline: "Bespoke vector illustrations and neon HUD cards to keep viewers engaged.",
    styleTag: "Custom Animated B-Roll",
    duration: "0:18",
    resolution: "720×1280 • HD 9:16",
    videoUrl: "/videos/faraz-reel-motion.mp4",
    previewUrl: "/videos/preview-motion.mp4",
    posterUrl: "/images/videos/thumb-motion.webp",
    aspectRatio: "9/16",
    bullets: [
      "Custom animated vector illustrations & metaphors",
      "Glowing neon HUD callout cards for key points",
      "Zero boring moments — constant visual stimulation",
    ],
    tools: ["After Effects", "Vector Animation", "Neon HUD"],
    whatsappMessage: "Hi Faraz, I want custom animated B-roll and motion graphics for my brand videos.",
  },
];

export interface BeforeAfterProject {
  id: string;
  tabLabel: string;
  badge: string;
  title: string;
  subtitle: string;
  before: {
    label: string;
    videoUrl: string;
    posterUrl: string;
    badge: string;
    badgeColor: string;
    note: string;
  };
  after: {
    label: string;
    videoUrl: string;
    posterUrl: string;
    badge: string;
    badgeColor: string;
    note: string;
  };
  checklist: {
    title: string;
    desc: string;
  }[];
}

export const BEFORE_AFTER_SAMPLES: BeforeAfterProject[] = [
  {
    id: "canada-mindset",
    tabLabel: "Reel 1: Canada vs Pakistan (3D VFX)",
    badge: "3D Rotoscoping & Depth",
    title: "Canada vs Pakistan — 3D Rotoscoping & Hook",
    subtitle: "Dekhiye kaise raw phone recording 3D depth typography aur dynamic zooms ke sath high-retention reel banti hai.",
    before: {
      label: "Raw Phone Recording",
      videoUrl: "/videos/canada-raw.mp4",
      posterUrl: "/images/videos/thumb-canada-raw.webp",
      badge: "Raw Phone Video (Before)",
      badgeColor: "bg-rose-500/90 text-white",
      note: "Uncut camera, dead pauses, no text, flat mobile audio",
    },
    after: {
      label: "Faraz Ahmed Edit",
      videoUrl: "/videos/canada-pakistan.mp4",
      posterUrl: "/images/videos/cover-canada-reel.webp",
      badge: "Viral Reel (After ✨)",
      badgeColor: "bg-emerald-500/95 text-white",
      note: "3D text rotoscoped behind Faraz, punch-in cuts, saaf studio audio",
    },
    checklist: [
      {
        title: "3D text rotoscoped BEHIND subject",
        desc: "'CANADA' aur 'MILLIONAIRE' depth typography subject ke peeche place ki.",
      },
      {
        title: "Faltu pauses aur galtiyan kaati",
        desc: "Zero dead space — rapid sentence pacing so viewers never scroll away.",
      },
      {
        title: "Dynamic camera punch-ins",
        desc: "Angle changes aur zoom-ins lagaye taake video flat ya boring na lage.",
      },
      {
        title: "Bold kinetic captions",
        desc: "Word-by-word highlighted captions designed for 80% viewers watching on mute.",
      },
      {
        title: "Saaf studio audio & SFX",
        desc: "Background noise completely removed with clear voice mastering & whooshes.",
      },
    ],
  },
  {
    id: "cash-vfx",
    tabLabel: "Reel 2: Asal Kamyabi (Cash VFX)",
    badge: "Cash Particle VFX & Captions",
    title: "Asal Kamyabi — Flying Cash VFX & Voice Mastering",
    subtitle: "Dekhiye kaise phone camera video ko floating cash particles, Roman Urdu subtitles aur crystal clear audio di.",
    before: {
      label: "Raw Camera Recording",
      videoUrl: "/videos/asal-raw.mp4",
      posterUrl: "/images/videos/thumb-asal-raw.webp?v=3",
      badge: "Raw Camera Video (Before)",
      badgeColor: "bg-rose-500/90 text-white",
      note: "Uncut raw recording, ambient room noise, zero VFX",
    },
    after: {
      label: "Faraz Ahmed Edit",
      videoUrl: "/videos/after.mp4",
      posterUrl: "/images/videos/thumb-after-cash.webp",
      badge: "VFX Edit (After ✨)",
      badgeColor: "bg-emerald-500/95 text-white",
      note: "Floating cash particle physics, bold Roman Urdu subtitles, audio mastered",
    },
    checklist: [
      {
        title: "Floating cash particle VFX",
        desc: "3D currency physics beat ke sath animate kiye gaye jo screen par float karte hain.",
      },
      {
        title: "Bold Roman Urdu & English captions",
        desc: "Word-by-word kinetic subtitles har viewer ki attention lock karne ke liye.",
      },
      {
        title: "Saaf studio awaaz",
        desc: "Background room noise aur hiss completely remove kar ke clear voice master ki.",
      },
      {
        title: "Custom animated visual hooks",
        desc: "Eye-catching overlays aur icons jo storytelling ko visual banate hain.",
      },
      {
        title: "Punchy sound effects (SFX)",
        desc: "Whooshes, risers aur subtle pops transitions aur key words par lagaye.",
      },
    ],
  },
];

export const BEFORE_AFTER_DATA = BEFORE_AFTER_SAMPLES[0];

export const WHAT_YOU_GET_ITEMS = [
  {
    icon: "Type",
    title: "Urdu, English & Roman Urdu Captions",
    desc: "Clean, error-free word-by-word kinetic captions styled to your brand identity.",
  },
  {
    icon: "Sparkles",
    title: "Motion Graphics & Animated B-Roll",
    desc: "Custom animated illustrations, charts, and icons that keep retention above 70%.",
  },
  {
    icon: "Volume2",
    title: "Clean Audio & Punchy Sound Effects",
    desc: "Noise removal, voice enhancement, and studio SFX (whoosh, pop, click, riser).",
  },
  {
    icon: "Sliders",
    title: "Color Correction & Lighting Fix",
    desc: "Rich contrast, skin tone smoothing, and vibrant color grading on mobile footage.",
  },
  {
    icon: "Zap",
    title: "Hook in the First 3 Seconds",
    desc: "Proven visual and text hooks that stop the scroll on Instagram, TikTok & Shorts.",
  },
  {
    icon: "Smartphone",
    title: "100% Ready-to-Post 9:16 Video",
    desc: "Exported in optimal vertical resolution ready for instant upload with zero compression loss.",
  },
];

export const THREE_STEP_PROCESS = [
  {
    step: "01",
    title: "Footage Bhejein",
    desc: "Apni raw phone video WhatsApp ya Google Drive link par send karein. Script ya key points batayein.",
  },
  {
    step: "02",
    title: "Main Edit Karta Hoon",
    desc: "24–72 hours mein cuts, captions, motion graphics, audio cleanup aur sound effects complete.",
  },
  {
    step: "03",
    title: "Revisions & Final File",
    desc: "Aap review karein. Koi bhi changes hon toh update ho kar ready-to-post HD file deliver hoti hai.",
  },
];

export const VIDEO_PACKAGES: VideoPackage[] = [
  {
    id: "basic-reel",
    name: "Starter Reel",
    tagline: "Ideal for quick talking-head videos and daily social content.",
    price: "Custom Quote",
    period: "Single reel edit",
    isPopular: false,
    features: [
      "Cut all dead pauses & filler words",
      "Bold kinetic captions (Urdu / Roman Urdu / English)",
      "Background music & volume leveling",
      "Dynamic zoom-ins & framing punch",
      "48-hour delivery",
      "2 free rounds of revisions",
    ],
    whatsappMessage: "Hi Faraz, I would like a quote for the Starter Reel edit.",
  },
  {
    id: "pro-reel",
    name: "Pro Viral Reel",
    tagline: "Best fit for founders, coaches & personal brands seeking maximum reach.",
    price: "Custom Quote",
    period: "Single pro reel",
    isPopular: true,
    features: [
      "Everything in Starter Reel",
      "3D text placed BEHIND the subject",
      "Custom motion graphics & animated B-roll",
      "Complete audio noise reduction & studio SFX",
      "Color grading & skin tone enhancement",
      "Particle VFX & beat-synced transitions",
      "Priority 24-48h delivery",
      "Unlimited minor revisions",
    ],
    whatsappMessage: "Hi Faraz, I would like a quote for the Pro Viral Reel edit.",
  },
  {
    id: "monthly-pack",
    name: "Monthly Growth Pack",
    tagline: "Consistent video production for creators who publish every week.",
    price: "Custom Quote",
    period: "10 reels / month",
    isPopular: false,
    features: [
      "10 Pro Viral Reels per month",
      "Direct 1-on-1 WhatsApp channel with Faraz",
      "Hook optimization & retention pacing",
      "Consistent custom brand typography & color palette",
      "Fast turnaround per reel",
      "Revisions until satisfied",
    ],
    whatsappMessage: "Hi Faraz, I would like a quote for the Monthly Growth Pack (10 Reels).",
  },
];

export const VIDEO_FAQS: VideoFaq[] = [
  {
    question: "Main apni raw video footage aapko kaise bhej sakta hoon?",
    answer: "Aap apni mobile video Google Drive, Dropbox, WeTransfer, ya directly WhatsApp par document format mein bhej sakte hain taake quality compress na ho.",
  },
  {
    question: "Video edit ho kar kab tak milegi (Turnaround Time)?",
    answer: "Single reel aam taur par 24 se 48 hours mein deliver ho jati hai. Agar urgent requirement ho toh rush delivery (same day) bhi available hai.",
  },
  {
    question: "Kya aap Roman Urdu, Urdu ya English dono mein captions add karte hain?",
    answer: "Haan, bilkul! Hum Roman Urdu (jaise 'Asal Kamyabi Kya Hai?'), pure Urdu nastaliq captions, aur English captions — teeno styles mein word-by-word highlight captions create karte hain.",
  },
  {
    question: "Agar mujhe video mein kuch change karwana ho (Revisions)?",
    answer: "Aapko har package ke sath revisions milti hain (Pro package mein unlimited minor revisions). Agar koi caption word, timing, ya color change karwana ho toh hum foran update kar dete hain.",
  },
  {
    question: "Yeh videos kin platforms ke liye ready hoti hain?",
    answer: "Tamam videos 9:16 vertical full HD (1080×1920 / 720×1280) format mein hoti hain, jo Instagram Reels, TikTok, YouTube Shorts, aur Facebook Reels par direct upload ke liye 100% optimized hoti hain.",
  },
];

