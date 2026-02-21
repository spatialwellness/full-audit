import { AuditScores, ActionItem, IntakeFormData } from "./types";

export function calculateScores(data: Partial<IntakeFormData>): AuditScores {
  const parse = (val: string | undefined): number => {
    const n = parseInt(val || "3", 10);
    return isNaN(n) ? 3 : Math.max(1, Math.min(5, n));
  };

  const lighting = parse(data.q_lighting);
  const acoustics = parse(data.q_acoustics);
  const temperature = parse(data.q_temperature);
  const layout = parse(data.q_layout);
  const privacy = parse(data.q_privacy);
  const biophilia = parse(data.q_biophilia);
  const sensory = parse(data.q_sensory);
  const ergonomics = parse(data.q_ergonomics);

  const overall =
    Math.round(
      ((lighting + acoustics + temperature + layout + privacy + biophilia + sensory + ergonomics) /
        8) *
        10
    ) / 10;

  return {
    lighting,
    acoustics,
    temperature,
    layout,
    privacy,
    biophilia,
    sensory,
    ergonomics,
    overall,
  };
}

export function generateActionItems(scores: AuditScores, formData: Partial<IntakeFormData>): ActionItem[] {
  const items: ActionItem[] = [];

  // Lighting
  if (scores.lighting <= 2) {
    items.push({
      id: "light-1",
      category: "quick-win",
      title: "Reposition existing task lights",
      description:
        "Move desk lamps so light falls from the side (not behind or in front of screens). This immediately reduces glare and eye strain at zero cost.",
      estimatedCost: "Free",
      timeframe: "Today",
      impact: "high",
      completed: false,
    });
    items.push({
      id: "light-2",
      category: "medium-term",
      title: "Replace overhead fluorescents with tunable LED panels",
      description:
        "Tunable white LEDs allow you to shift from energising cool light (5000K) in the morning to warmer tones (3000K) in the afternoon, supporting natural circadian rhythms.",
      estimatedCost: "200-400 per fitting",
      timeframe: "Within a month",
      impact: "high",
      completed: false,
    });
  } else if (scores.lighting === 3) {
    items.push({
      id: "light-3",
      category: "quick-win",
      title: "Add warm accent lighting to social areas",
      description:
        "Install warm-toned (2700-3000K) floor or table lamps in breakout and social spaces to create a contrast with your work zone lighting and support cognitive switching.",
      estimatedCost: "Under 100",
      timeframe: "This week",
      impact: "medium",
      completed: false,
    });
  }

  if (scores.lighting <= 3) {
    items.push({
      id: "light-4",
      category: "medium-term",
      title: "Add adjustable window coverings for glare control",
      description:
        "Solar sheer blinds allow daylight in while eliminating screen glare. They are significantly cheaper than tinted glass and can be adjusted throughout the day.",
      estimatedCost: "150-300 per window",
      timeframe: "Within a month",
      impact: "medium",
      completed: false,
    });
  }

  // Acoustics
  if (scores.acoustics <= 2) {
    items.push({
      id: "acou-1",
      category: "quick-win",
      title: "Add soft furnishings to absorb sound",
      description:
        "Rugs, cushions, curtains and upholstered furniture all absorb sound. Start by adding a large rug to your noisiest area - this is the fastest and most affordable acoustic improvement.",
      estimatedCost: "Under 100",
      timeframe: "This week",
      impact: "high",
      completed: false,
    });
    items.push({
      id: "acou-2",
      category: "medium-term",
      title: "Install acoustic wall panels in key zones",
      description:
        "Fabric-wrapped acoustic panels in the 40-60mm density range provide significant sound absorption. Position them on the walls surrounding your noisiest areas first.",
      estimatedCost: "200-600 per area",
      timeframe: "Within a month",
      impact: "high",
      completed: false,
    });
    items.push({
      id: "acou-3",
      category: "investment",
      title: "Commission an acoustic consultant for a full assessment",
      description:
        "For serious noise problems, a professional acoustic assessment with dB measurements will identify the specific frequencies and reflection points causing issues and provide engineered solutions.",
      estimatedCost: "500-1500",
      timeframe: "Within a quarter",
      impact: "high",
      completed: false,
    });
  } else if (scores.acoustics === 3) {
    items.push({
      id: "acou-4",
      category: "quick-win",
      title: "Create phone call etiquette guidance",
      description:
        "Post clear, friendly signage about using call booths or stepping away from open-plan areas for calls. Culture change costs nothing and can reduce noise significantly.",
      estimatedCost: "Free",
      timeframe: "This week",
      impact: "medium",
      completed: false,
    });
  }

  // Biophilia
  if (scores.biophilia <= 2) {
    items.push({
      id: "bio-1",
      category: "quick-win",
      title: "Add 3-5 desk plants immediately",
      description:
        "Plants with high foliage density (such as Monstera, Peace Lily or Pothos) start providing biophilic benefit immediately. Group them near the highest-stress areas first.",
      estimatedCost: "Under 100",
      timeframe: "This week",
      impact: "high",
      completed: false,
    });
    items.push({
      id: "bio-2",
      category: "medium-term",
      title: "Install a living plant wall or large planter clusters",
      description:
        "A dedicated green feature - whether a freestanding moss panel, living wall section, or large architectural planter - signals serious investment in biophilia and provides acoustic benefit too.",
      estimatedCost: "300-800",
      timeframe: "Within a month",
      impact: "high",
      completed: false,
    });
  }

  // Privacy
  if (scores.privacy <= 2) {
    items.push({
      id: "priv-1",
      category: "quick-win",
      title: "Designate quiet zones with clear signage",
      description:
        "Pick the area furthest from the entrance and noisiest activities. Add clear, respectful signage asking for quiet. This costs nothing but shifts the social contract significantly.",
      estimatedCost: "Under 20",
      timeframe: "Today",
      impact: "high",
      completed: false,
    });
    items.push({
      id: "priv-2",
      category: "medium-term",
      title: "Add privacy screens to open workstations",
      description:
        "Freestanding desk screens (60-80cm high) reduce visual distraction and create a perception of privacy even in fully open-plan environments. Start with the most exposed desks.",
      estimatedCost: "80-200 per screen",
      timeframe: "Within a month",
      impact: "medium",
      completed: false,
    });
    items.push({
      id: "priv-3",
      category: "investment",
      title: "Install a pre-fabricated acoustic phone booth",
      description:
        "Prefab booths from brands like Framery, Room, or Hush provide genuine acoustic isolation for calls and focused work without expensive construction. ROI is measurable within months.",
      estimatedCost: "3000-8000",
      timeframe: "Within a quarter",
      impact: "high",
      completed: false,
    });
  }

  // Sensory
  if (scores.sensory <= 2) {
    items.push({
      id: "sens-1",
      category: "quick-win",
      title: "Audit and reduce visual clutter immediately",
      description:
        "Visual clutter is a significant sensory stressor, especially for neurodiverse employees. Do a 30-minute sweep: clear surfaces, hide cables, remove unnecessary signage.",
      estimatedCost: "Free",
      timeframe: "Today",
      impact: "high",
      completed: false,
    });
    items.push({
      id: "sens-2",
      category: "medium-term",
      title: "Create a sensory recovery corner",
      description:
        "Designate a small corner with lower lighting, minimal visual stimulation, comfortable seating, and a clear 'quiet please' culture. This is particularly valuable for autistic and ADHD employees.",
      estimatedCost: "200-500",
      timeframe: "Within a month",
      impact: "high",
      completed: false,
    });
  }

  // Ergonomics
  if (scores.ergonomics <= 2) {
    items.push({
      id: "ergo-1",
      category: "quick-win",
      title: "Conduct a basic desk height audit",
      description:
        "Walk through every workstation and check: elbows at 90 degrees, screen at arm's length and eye level, feet flat on floor. Fix simple issues immediately - many require only a monitor stand or seat adjustment.",
      estimatedCost: "Free or under 50",
      timeframe: "This week",
      impact: "high",
      completed: false,
    });
    items.push({
      id: "ergo-2",
      category: "medium-term",
      title: "Add sit-stand desk converters to fixed workstations",
      description:
        "Sit-stand converters allow height adjustment without replacing full desks. Research shows alternating sitting and standing reduces musculoskeletal complaints and increases afternoon alertness.",
      estimatedCost: "150-400 per unit",
      timeframe: "Within a month",
      impact: "high",
      completed: false,
    });
  }

  // Layout
  if (scores.layout <= 2) {
    items.push({
      id: "lay-1",
      category: "quick-win",
      title: "Clear all circulation routes completely",
      description:
        "Blocked paths create stress and signal chaos subconsciously. Remove everything from main walkways: bags, equipment, boxes. This improves both safety and the felt quality of the space.",
      estimatedCost: "Free",
      timeframe: "Today",
      impact: "medium",
      completed: false,
    });
    items.push({
      id: "lay-2",
      category: "medium-term",
      title: "Rearrange furniture to create one clear collaborative zone",
      description:
        "Move cluster seating and whiteboards to one end of the space. Clear, functional zones reduce decision fatigue and make it easier for teams to self-organise.",
      estimatedCost: "Free",
      timeframe: "Within a month",
      impact: "high",
      completed: false,
    });
  }

  // Temperature / Air
  if (scores.temperature <= 2) {
    items.push({
      id: "temp-1",
      category: "quick-win",
      title: "Open windows for 10 minutes at the start of each day",
      description:
        "CO2 levels in unventilated offices can reach 1500-2000ppm by mid-morning, causing fatigue and reduced cognitive function. Daily fresh-air flushing is the most impactful free intervention.",
      estimatedCost: "Free",
      timeframe: "Today",
      impact: "high",
      completed: false,
    });
    items.push({
      id: "temp-2",
      category: "medium-term",
      title: "Install a CO2 monitor and a HEPA air purifier",
      description:
        "A CO2 monitor shows you when ventilation is needed. A HEPA filter removes VOCs, particulates and allergens. Together they meaningfully improve air quality and cognitive performance.",
      estimatedCost: "200-500",
      timeframe: "Within a month",
      impact: "high",
      completed: false,
    });
  }

  // Always add a call to action
  items.push({
    id: "call-1",
    category: "medium-term",
    title: "Book your 30-minute implementation call",
    description:
      "Use your 30-minute call to get personalised guidance on prioritising your action plan, sourcing specific products for your budget, and planning your phased rollout.",
    estimatedCost: "75-95 (add-on)",
    timeframe: "Whenever you are ready",
    impact: "high",
    completed: false,
  });

  return items;
}

export function recalculateScore(
  originalScores: AuditScores,
  completedItems: ActionItem[]
): AuditScores {
  const boosts: Partial<Record<keyof AuditScores, number>> = {};

  completedItems.forEach((item) => {
    const boost = item.impact === "high" ? 0.3 : item.impact === "medium" ? 0.15 : 0.05;

    if (item.id.startsWith("light")) boosts.lighting = (boosts.lighting || 0) + boost;
    if (item.id.startsWith("acou")) boosts.acoustics = (boosts.acoustics || 0) + boost;
    if (item.id.startsWith("bio")) boosts.biophilia = (boosts.biophilia || 0) + boost;
    if (item.id.startsWith("priv")) boosts.privacy = (boosts.privacy || 0) + boost;
    if (item.id.startsWith("sens")) boosts.sensory = (boosts.sensory || 0) + boost;
    if (item.id.startsWith("ergo")) boosts.ergonomics = (boosts.ergonomics || 0) + boost;
    if (item.id.startsWith("lay")) boosts.layout = (boosts.layout || 0) + boost;
    if (item.id.startsWith("temp")) boosts.temperature = (boosts.temperature || 0) + boost;
  });

  const cap = (val: number, boost: number) => Math.min(5, val + boost);

  const updated = {
    lighting: cap(originalScores.lighting, boosts.lighting || 0),
    acoustics: cap(originalScores.acoustics, boosts.acoustics || 0),
    temperature: cap(originalScores.temperature, boosts.temperature || 0),
    layout: cap(originalScores.layout, boosts.layout || 0),
    privacy: cap(originalScores.privacy, boosts.privacy || 0),
    biophilia: cap(originalScores.biophilia, boosts.biophilia || 0),
    sensory: cap(originalScores.sensory, boosts.sensory || 0),
    ergonomics: cap(originalScores.ergonomics, boosts.ergonomics || 0),
    overall: 0,
  };

  updated.overall =
    Math.round(
      ((updated.lighting +
        updated.acoustics +
        updated.temperature +
        updated.layout +
        updated.privacy +
        updated.biophilia +
        updated.sensory +
        updated.ergonomics) /
        8) *
        10
    ) / 10;

  return updated;
}
