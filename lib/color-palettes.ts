export interface ColorSwatch {
  name: string;
  farrowBall: string;
  hex: string;
  ral: string;
  role: string;
}

export interface ColorPalette {
  id: string;
  name: string;
  tagline: string;
  description: string;
  bestFor: string[];
  colors: ColorSwatch[];
}

export const colorPalettes: ColorPalette[] = [
  {
    id: "calm-focus",
    name: "Calm Focus",
    tagline: "Cool neutrals for clear thinking",
    description:
      "A refined palette of cool-toned neutrals that reduces visual noise and supports sustained concentration. These colours work together to create a sense of order and calm without feeling cold or sterile.",
    bestFor: [
      "Focus-intensive work",
      "Legal and financial offices",
      "Analytical roles",
      "Open-plan environments needing visual calm",
    ],
    colors: [
      {
        name: "Walls",
        farrowBall: "Mizzle No. 266",
        hex: "#9aada0",
        ral: "RAL 6021",
        role: "Primary wall colour - calming sage with grey undertones",
      },
      {
        name: "Ceiling",
        farrowBall: "Blackened No. 2011",
        hex: "#dde0dc",
        ral: "RAL 7047",
        role: "Ceiling - whisper white with cool blue undertone",
      },
      {
        name: "Accent",
        farrowBall: "Hague Blue No. 30",
        hex: "#253b4a",
        ral: "RAL 5011",
        role: "Accent wall or joinery - deep anchoring navy",
      },
      {
        name: "Detail",
        farrowBall: "Purbeck Stone No. 275",
        hex: "#b5b0a4",
        ral: "RAL 7044",
        role: "Skirting and trim - warm stone bridge tone",
      },
    ],
  },
  {
    id: "warm-grounding",
    name: "Warm Grounding",
    tagline: "Earth tones for safety and belonging",
    description:
      "Deeply nourishing earth tones inspired by terracotta, clay and warm wood. This palette creates a sense of safety and groundedness - particularly supportive for neurodiverse employees who benefit from a cocooning environment.",
    bestFor: [
      "HR and wellbeing spaces",
      "Meeting rooms",
      "Entrance lobbies",
      "Teams that value warmth and connection",
    ],
    colors: [
      {
        name: "Walls",
        farrowBall: "Dead Salmon No. 28",
        hex: "#c29a89",
        ral: "RAL 3012",
        role: "Primary wall colour - warm clay with terracotta warmth",
      },
      {
        name: "Ceiling",
        farrowBall: "String No. 8",
        hex: "#d8cdb4",
        ral: "RAL 1014",
        role: "Ceiling - warm ivory that glows softly",
      },
      {
        name: "Accent",
        farrowBall: "Chocolate Cake",
        hex: "#3d2b1f",
        ral: "RAL 8025",
        role: "Joinery and frames - deep roasted brown anchor",
      },
      {
        name: "Detail",
        farrowBall: "Savage Ground No. 213",
        hex: "#b09a7e",
        ral: "RAL 1019",
        role: "Trim and shelving - mid-tone warm neutral",
      },
    ],
  },
  {
    id: "natural-energy",
    name: "Natural Energy",
    tagline: "Green accents for vitality and clarity",
    description:
      "Fresh botanical greens combined with warm neutrals bring the restorative power of nature indoors. Biophilic research shows green tones reduce cortisol and support focus recovery - ideal for high-output creative teams.",
    bestFor: [
      "Creative studios",
      "Marketing teams",
      "Collaborative zones",
      "Offices with limited natural greenery",
    ],
    colors: [
      {
        name: "Walls",
        farrowBall: "Mizzle No. 266",
        hex: "#9aada0",
        ral: "RAL 6021",
        role: "Primary wall - fresh sage with natural vitality",
      },
      {
        name: "Ceiling",
        farrowBall: "All White No. 2005",
        hex: "#f3f2ee",
        ral: "RAL 9010",
        role: "Ceiling - pure natural white for brightness",
      },
      {
        name: "Accent",
        farrowBall: "Calke Green No. 80",
        hex: "#5a6e4c",
        ral: "RAL 6003",
        role: "Feature wall - deep botanical green anchor",
      },
      {
        name: "Detail",
        farrowBall: "String No. 8",
        hex: "#d8cdb4",
        ral: "RAL 1014",
        role: "Trim and frames - warm putty contrast",
      },
    ],
  },
  {
    id: "deep-concentration",
    name: "Deep Concentration",
    tagline: "Dark, enveloping tones for deep work",
    description:
      "Rich, deeply saturated tones create an immersive cocoon that blocks visual distraction and signals the brain to enter focused work mode. Best used in dedicated focus rooms or private offices rather than open-plan areas.",
    bestFor: [
      "Private offices",
      "Library or quiet zones",
      "Telephone booths",
      "Evening or low-light environments",
    ],
    colors: [
      {
        name: "Walls",
        farrowBall: "Railings No. 31",
        hex: "#2b343a",
        ral: "RAL 5004",
        role: "Primary wall - almost-black blue for deep focus",
      },
      {
        name: "Ceiling",
        farrowBall: "Purbeck Stone No. 275",
        hex: "#b5b0a4",
        ral: "RAL 7044",
        role: "Ceiling - lifted stone to prevent claustrophobia",
      },
      {
        name: "Accent",
        farrowBall: "Drawing Room Blue No. 253",
        hex: "#3a5068",
        ral: "RAL 5014",
        role: "Joinery - rich mid-blue for depth and warmth",
      },
      {
        name: "Detail",
        farrowBall: "Elephant's Breath No. 229",
        hex: "#9b9389",
        ral: "RAL 7039",
        role: "Skirting - warm grey grounding element",
      },
    ],
  },
  {
    id: "light-and-air",
    name: "Light and Air",
    tagline: "Pale tones for spaciousness and clarity",
    description:
      "An airy palette of barely-there tones that maximise the perception of light and space. Ideal for smaller offices or north-facing rooms where natural light is limited. Creates a calm, uncluttered backdrop that lets the work take centre stage.",
    bestFor: [
      "Smaller offices",
      "North-facing rooms",
      "Hot-desking environments",
      "Spaces with limited natural light",
    ],
    colors: [
      {
        name: "Walls",
        farrowBall: "Hardwick White No. 5",
        hex: "#e0dbd1",
        ral: "RAL 9001",
        role: "Primary wall - pale warm white with depth",
      },
      {
        name: "Ceiling",
        farrowBall: "All White No. 2005",
        hex: "#f3f2ee",
        ral: "RAL 9010",
        role: "Ceiling - pure reflective white",
      },
      {
        name: "Accent",
        farrowBall: "Skylight No. 205",
        hex: "#cddde4",
        ral: "RAL 5024",
        role: "Feature element - soft sky blue for freshness",
      },
      {
        name: "Detail",
        farrowBall: "Cornforth White No. 228",
        hex: "#c0bab3",
        ral: "RAL 7035",
        role: "Trim - cool mid-grey for gentle definition",
      },
    ],
  },
  {
    id: "creative-spark",
    name: "Creative Spark",
    tagline: "Warm accents to inspire and energise",
    description:
      "A vibrant but balanced palette that uses warm ochre, terracotta and amber accents against neutral backgrounds. Stimulates creative thinking without overwhelming the senses - the accent colours are used sparingly to create visual punctuation.",
    bestFor: [
      "Creative agencies",
      "Design studios",
      "Brainstorm and ideation rooms",
      "Breakout spaces",
    ],
    colors: [
      {
        name: "Walls",
        farrowBall: "Joa's White No. 226",
        hex: "#e8e0d0",
        ral: "RAL 9002",
        role: "Primary wall - warm off-white with golden undertone",
      },
      {
        name: "Ceiling",
        farrowBall: "All White No. 2005",
        hex: "#f3f2ee",
        ral: "RAL 9010",
        role: "Ceiling - clean bright white",
      },
      {
        name: "Accent",
        farrowBall: "India Yellow No. 66",
        hex: "#e6b84a",
        ral: "RAL 1005",
        role: "Feature wall or furniture - warm solar yellow",
      },
      {
        name: "Detail",
        farrowBall: "Mahogany No. 36",
        hex: "#5c3027",
        ral: "RAL 8007",
        role: "Joinery and frames - deep warm anchor",
      },
    ],
  },
  {
    id: "forest-retreat",
    name: "Forest Retreat",
    tagline: "Deep greens bringing nature inside",
    description:
      "Deeply saturated forest and pine greens create a strong biophilic connection. This palette is immersive and restorative, evoking the proven stress-reducing effects of time spent in woodland environments. Best for wellness-focused spaces.",
    bestFor: [
      "Wellness and therapy rooms",
      "Rest and recharge spaces",
      "Executive offices",
      "Organisations prioritising employee wellbeing",
    ],
    colors: [
      {
        name: "Walls",
        farrowBall: "Calke Green No. 80",
        hex: "#5a6e4c",
        ral: "RAL 6003",
        role: "Primary wall - deep botanical forest green",
      },
      {
        name: "Ceiling",
        farrowBall: "String No. 8",
        hex: "#d8cdb4",
        ral: "RAL 1014",
        role: "Ceiling - warm ivory to soften the depth",
      },
      {
        name: "Accent",
        farrowBall: "Pitch Black No. 256",
        hex: "#1c1c1c",
        ral: "RAL 9005",
        role: "Joinery - near-black for contrast and drama",
      },
      {
        name: "Detail",
        farrowBall: "Mizzle No. 266",
        hex: "#9aada0",
        ral: "RAL 6021",
        role: "Trim and accessories - lighter green bridge tone",
      },
    ],
  },
  {
    id: "coastal-calm",
    name: "Coastal Calm",
    tagline: "Blue-grey tones for quiet serenity",
    description:
      "A palette drawn from sea fog, driftwood and pale sky. Blue-grey tones have a measurable calming effect on the autonomic nervous system and are particularly effective in high-stress environments. Sophisticated without being cold.",
    bestFor: [
      "High-pressure work environments",
      "Customer-facing spaces",
      "Reception and waiting areas",
      "Legal, medical or financial offices",
    ],
    colors: [
      {
        name: "Walls",
        farrowBall: "Mole's Breath No. 276",
        hex: "#8b8880",
        ral: "RAL 7036",
        role: "Primary wall - sophisticated warm grey",
      },
      {
        name: "Ceiling",
        farrowBall: "Cornforth White No. 228",
        hex: "#c0bab3",
        ral: "RAL 7035",
        role: "Ceiling - pale grey-white that reflects calmly",
      },
      {
        name: "Accent",
        farrowBall: "Hague Blue No. 30",
        hex: "#253b4a",
        ral: "RAL 5011",
        role: "Feature wall - deep coastal navy",
      },
      {
        name: "Detail",
        farrowBall: "Blackened No. 2011",
        hex: "#dde0dc",
        ral: "RAL 7047",
        role: "Trim - pale blue-white for definition",
      },
    ],
  },
  {
    id: "earthy-warmth",
    name: "Earthy Warmth",
    tagline: "Terracotta and ochre for energy and joy",
    description:
      "Sun-warmed terracotta and golden ochre create an inviting, energising atmosphere rooted in warmth and optimism. This palette has roots in Mediterranean and North African interiors - places associated with hospitality and vibrant community.",
    bestFor: [
      "Collaborative team spaces",
      "Kitchen and social areas",
      "Client entertaining spaces",
      "Organisations with a warm, people-first culture",
    ],
    colors: [
      {
        name: "Walls",
        farrowBall: "Templeton Pink No. 303",
        hex: "#c4846a",
        ral: "RAL 3022",
        role: "Primary wall - warm terracotta with life and depth",
      },
      {
        name: "Ceiling",
        farrowBall: "Joa's White No. 226",
        hex: "#e8e0d0",
        ral: "RAL 9002",
        role: "Ceiling - warm off-white that amplifies warmth",
      },
      {
        name: "Accent",
        farrowBall: "India Yellow No. 66",
        hex: "#e6b84a",
        ral: "RAL 1005",
        role: "Feature element - golden ochre vitality",
      },
      {
        name: "Detail",
        farrowBall: "Mahogany No. 36",
        hex: "#5c3027",
        ral: "RAL 8007",
        role: "Joinery - deep brown for earthy grounding",
      },
    ],
  },
  {
    id: "minimalist-zen",
    name: "Minimalist Zen",
    tagline: "White and cream for effortless clarity",
    description:
      "A disciplined palette of white, warm cream and soft grey creates an environment of pure clarity and restful simplicity. Inspired by Japanese minimalism, this palette removes decision fatigue and creates space for clear thought.",
    bestFor: [
      "Solo practitioner offices",
      "Meditation or mindfulness rooms",
      "Clean tech and design companies",
      "Spaces that need maximum light reflection",
    ],
    colors: [
      {
        name: "Walls",
        farrowBall: "Dimity No. 2008",
        hex: "#f2ede6",
        ral: "RAL 9001",
        role: "Primary wall - the softest hint of warmth in white",
      },
      {
        name: "Ceiling",
        farrowBall: "All White No. 2005",
        hex: "#f3f2ee",
        ral: "RAL 9010",
        role: "Ceiling - pure bright white",
      },
      {
        name: "Accent",
        farrowBall: "Elephant's Breath No. 229",
        hex: "#9b9389",
        ral: "RAL 7039",
        role: "Feature detail - warm grey depth element",
      },
      {
        name: "Detail",
        farrowBall: "Cornforth White No. 228",
        hex: "#c0bab3",
        ral: "RAL 7035",
        role: "Trim - pale cool grey for quiet definition",
      },
    ],
  },
];

export function getPaletteById(id: string): ColorPalette | undefined {
  return colorPalettes.find((p) => p.id === id);
}

export function getPalettesForContext(
  categories: string[]
): ColorPalette[] {
  const contextMap: Record<string, string[]> = {
    lighting: ["light-and-air", "minimalist-zen", "natural-energy"],
    acoustics: ["calm-focus", "deep-concentration", "forest-retreat"],
    privacy: ["deep-concentration", "forest-retreat", "coastal-calm"],
    biophilia: ["forest-retreat", "natural-energy", "earthy-warmth"],
    "temperature-air": ["coastal-calm", "calm-focus", "light-and-air"],
    ergonomics: ["warm-grounding", "calm-focus", "minimalist-zen"],
    "sensory-comfort": ["warm-grounding", "coastal-calm", "minimalist-zen"],
    "space-layout": ["natural-energy", "creative-spark", "earthy-warmth"],
  };

  const scores: Record<string, number> = {};
  categories.forEach((cat) => {
    const palettes = contextMap[cat] || [];
    palettes.forEach((id, idx) => {
      scores[id] = (scores[id] || 0) + (3 - idx);
    });
  });

  const sorted = Object.entries(scores)
    .sort(([, a], [, b]) => b - a)
    .map(([id]) => id);

  return sorted
    .slice(0, 3)
    .map((id) => colorPalettes.find((p) => p.id === id))
    .filter(Boolean) as ColorPalette[];
}
