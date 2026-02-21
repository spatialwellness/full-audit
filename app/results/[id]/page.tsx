"use client";

import { useState, useEffect } from "react";
import { colorPalettes } from "@/lib/color-palettes";
import { layoutExamples } from "@/lib/layout-examples";
import { AuditResult, AuditScores, ActionItem, CATEGORY_LABELS } from "@/lib/types";
import { recalculateScore } from "@/lib/scoring";

const MOCK_RESULT: AuditResult = {
  id: "demo",
  createdAt: new Date().toISOString(),
  companyName: "Your Organisation",
  contactName: "",
  contactEmail: "",
  scores: {
    lighting: 2,
    acoustics: 1,
    temperature: 2,
    layout: 3,
    privacy: 1,
    biophilia: 2,
    sensory: 2,
    ergonomics: 3,
    overall: 2.0,
  },
  actionItems: [
    {
      id: "acou-1",
      category: "quick-win",
      title: "Add soft furnishings to absorb sound",
      description: "Rugs, cushions, curtains and upholstered furniture all absorb sound. Start by adding a large rug to your noisiest area.",
      estimatedCost: "Under 100",
      timeframe: "This week",
      impact: "high",
      completed: false,
    },
    {
      id: "priv-1",
      category: "quick-win",
      title: "Designate quiet zones with clear signage",
      description: "Pick the area furthest from the entrance. Add clear, respectful signage asking for quiet.",
      estimatedCost: "Under 20",
      timeframe: "Today",
      impact: "high",
      completed: false,
    },
    {
      id: "light-3",
      category: "quick-win",
      title: "Add warm accent lighting to social areas",
      description: "Install warm-toned floor or table lamps in breakout spaces.",
      estimatedCost: "Under 100",
      timeframe: "This week",
      impact: "medium",
      completed: false,
    },
    {
      id: "bio-1",
      category: "quick-win",
      title: "Add 3-5 desk plants immediately",
      description: "Plants with high foliage density provide biophilic benefit immediately.",
      estimatedCost: "Under 100",
      timeframe: "This week",
      impact: "high",
      completed: false,
    },
    {
      id: "acou-2",
      category: "medium-term",
      title: "Install acoustic wall panels",
      description: "Fabric-wrapped acoustic panels in the 40-60mm density range provide significant sound absorption.",
      estimatedCost: "200-600 per area",
      timeframe: "Within a month",
      impact: "high",
      completed: false,
    },
    {
      id: "priv-2",
      category: "medium-term",
      title: "Add privacy screens to open workstations",
      description: "Freestanding desk screens reduce visual distraction and create a perception of privacy.",
      estimatedCost: "80-200 per screen",
      timeframe: "Within a month",
      impact: "medium",
      completed: false,
    },
    {
      id: "light-4",
      category: "medium-term",
      title: "Add adjustable window coverings for glare control",
      description: "Solar sheer blinds allow daylight in while eliminating screen glare.",
      estimatedCost: "150-300 per window",
      timeframe: "Within a month",
      impact: "medium",
      completed: false,
    },
    {
      id: "bio-2",
      category: "medium-term",
      title: "Install a living plant wall or large planter clusters",
      description: "A dedicated green feature provides acoustic benefit and biophilic connection.",
      estimatedCost: "300-800",
      timeframe: "Within a month",
      impact: "high",
      completed: false,
    },
    {
      id: "priv-3",
      category: "investment",
      title: "Install a pre-fabricated acoustic phone booth",
      description: "Prefab booths provide genuine acoustic isolation for calls and focused work.",
      estimatedCost: "3000-8000",
      timeframe: "Within a quarter",
      impact: "high",
      completed: false,
    },
    {
      id: "acou-3",
      category: "investment",
      title: "Commission an acoustic consultant",
      description: "A professional acoustic assessment will identify specific frequencies and reflection points.",
      estimatedCost: "500-1500",
      timeframe: "Within a quarter",
      impact: "high",
      completed: false,
    },
    {
      id: "call-1",
      category: "medium-term",
      title: "Book your 30-minute implementation call",
      description: "Get personalised guidance on prioritising your action plan and planning your phased rollout.",
      estimatedCost: "75-95 (add-on)",
      timeframe: "Whenever you are ready",
      impact: "high",
      completed: false,
    },
  ],
  recommendedPalettes: ["coastal-calm", "warm-grounding", "calm-focus"],
  recommendedLayouts: ["stille-hoek", "zonering", "groene-lint"],
  summary:
    "Your workplace has several areas that need meaningful attention, particularly around acoustics and privacy. The action plan below prioritises the changes that will have the greatest impact on your team's focus and wellbeing. Your overall spatial wellness score is 2.0 out of 5.",
};

// Educational content per category
const CATEGORY_EDUCATION: Record<string, string> = {
  lighting: "Research shows that access to natural light improves sleep, wellbeing, and productivity by measurable margins. Poorly calibrated artificial lighting - especially cold fluorescent overhead lights - contributes to eye strain, headaches, and afternoon fatigue. Even small improvements to your lighting setup can have an outsized effect on how your team feels by 3pm.",
  acoustics: "Unwanted noise is the single most commonly cited workplace complaint and a major contributor to cognitive fatigue. Studies show that speech intelligibility - being able to understand nearby conversations - is more disruptive than consistent background noise, even at lower volumes. A thoughtfully designed acoustic environment allows people to focus and collaborate without constantly switching contexts.",
  temperature: "Indoor CO2 levels in poorly ventilated offices can reach 1500-2000ppm by mid-morning, significantly reducing cognitive function and decision-making ability. Thermal discomfort also distracts attention and increases error rates. Ventilation and thermal comfort are among the highest-ROI environmental interventions available to office-based organisations.",
  layout: "Physical layout shapes how teams collaborate, how easily people can focus, and how much control individuals feel over their environment. A well-zoned layout reduces friction, supports different work modes, and signals respect for how people actually work. Small rearrangements can transform the felt quality of a space without any budget.",
  privacy: "The ability to find genuine quiet for focused work is increasingly rare in modern offices - yet research consistently identifies it as a top priority for knowledge workers. Lack of acoustic privacy also creates anxiety around sensitive conversations. Even low-cost interventions like designated quiet zones can meaningfully shift concentration levels.",
  biophilia: "Research shows that visual access to plants and natural materials reduces cortisol levels by up to 15%. Even a single plant on a desk measurably improves concentration and mood. Connection to nature is a fundamental human need - and one of the most affordable levers available when improving workplace wellbeing.",
  sensory: "Sensory overwhelm - from visual clutter, harsh lighting, competing sounds, or strong smells - activates the stress response and drains cognitive resources. Employees who experience sensory overload report higher burnout rates and lower job satisfaction. Creating a calmer sensory environment benefits everyone, and is especially important for neurodiverse team members.",
  ergonomics: "Poor ergonomics is a slow-building problem: the effects accumulate over months and years. Musculoskeletal complaints from poor posture and ill-fitting furniture are among the most common causes of workplace sick leave in office-based roles. A basic desk audit costs nothing and can prevent significant suffering and productivity loss.",
};

// Which action item IDs link to toolkit
const TOOLKIT_ITEM_IDS = new Set([
  "light-1", "light-2", "light-3", "light-4",
  "bio-1", "bio-2",
  "acou-2",
  "ergo-1", "ergo-2",
  "temp-2",
  "priv-2",
  "sens-2",
]);

function ScoreBar({
  label,
  score,
  emoji,
  educationText,
}: {
  label: string;
  score: number;
  emoji: string;
  educationText?: string;
}) {
  const pct = Math.round((score / 5) * 100);
  const color =
    score <= 1.5
      ? "#dc2626"
      : score <= 2.5
      ? "#F17F05"
      : score <= 3.5
      ? "#84a842"
      : score <= 4.5
      ? "#15803d"
      : "#14532d";

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span>{emoji}</span>
          <span className="font-lora font-medium text-brand-dark text-sm">
            {label}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span
            className="font-playfair text-lg font-bold"
            style={{ color }}
          >
            {score.toFixed(1)}
          </span>
          <span className="font-lora text-xs text-brand-dark/50">/5</span>
        </div>
      </div>
      <div className="h-3 bg-brand-rose/20 rounded-full overflow-hidden">
        <div
          className="h-3 rounded-full transition-all duration-700"
          style={{ width: `${pct}%`, backgroundColor: color }}
        />
      </div>
      <div className="flex justify-between text-xs font-lora text-brand-dark/40">
        <span>Needs attention</span>
        <span>Excellent</span>
      </div>
      {educationText && (
        <p className="text-xs font-lora text-brand-dark/60 leading-relaxed pt-1 border-t border-brand-rose/10 mt-2">
          {educationText}
        </p>
      )}
    </div>
  );
}

function ActionItemCard({
  item,
  onToggle,
}: {
  item: ActionItem;
  onToggle: (id: string) => void;
}) {
  const impactColors = {
    high: "bg-brand-dark text-brand-cream",
    medium: "bg-brand-rose text-brand-dark",
    low: "bg-brand-cream border border-brand-rose/40 text-brand-dark",
  };

  const showToolkitLink = TOOLKIT_ITEM_IDS.has(item.id);

  return (
    <div
      className={`bg-white rounded-xl border-2 p-5 transition-all ${
        item.completed
          ? "border-brand-green/40 bg-brand-green/5"
          : "border-brand-rose/20 hover:border-brand-rose/40"
      }`}
    >
      <div className="flex items-start gap-4">
        <button
          type="button"
          onClick={() => onToggle(item.id)}
          className={`mt-0.5 w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-all ${
            item.completed
              ? "bg-brand-green border-brand-green text-white"
              : "border-brand-rose/40 hover:border-brand-green"
          }`}
          aria-label={item.completed ? "Mark as incomplete" : "Mark as complete"}
        >
          {item.completed && (
            <svg viewBox="0 0 12 12" className="w-3 h-3 fill-current">
              <path d="M2 6l3 3 5-5" stroke="white" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          )}
        </button>

        <div className="flex-1">
          <div className="flex flex-wrap items-center gap-2 mb-1">
            <h3
              className={`font-playfair text-lg ${
                item.completed ? "line-through text-brand-dark/40" : "text-brand-dark"
              }`}
            >
              {item.title}
            </h3>
            <span
              className={`text-xs font-lora px-2 py-0.5 rounded-full ${
                impactColors[item.impact]
              }`}
            >
              {item.impact} impact
            </span>
          </div>
          <p
            className={`font-lora text-sm leading-relaxed ${
              item.completed ? "text-brand-dark/40" : "text-brand-dark/70"
            }`}
          >
            {item.description}
            {showToolkitLink && !item.completed && (
              <>
                {" "}
                <a
                  href="https://spatial-wellness.com/toolkit"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-brand-orange underline hover:no-underline text-xs"
                >
                  (see our recommendations)
                </a>
              </>
            )}
          </p>
          <div className="flex flex-wrap gap-3 mt-3 text-xs font-lora">
            <span className="flex items-center gap-1 text-brand-dark/50">
              <span>💶</span> {item.estimatedCost}
            </span>
            <span className="flex items-center gap-1 text-brand-dark/50">
              <span>📅</span> {item.timeframe}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

const categoryEmojis: Record<string, string> = {
  lighting: "💡",
  acoustics: "🔊",
  temperature: "🌡️",
  layout: "📐",
  privacy: "🎯",
  biophilia: "🌿",
  sensory: "✨",
  ergonomics: "💺",
};

export default function ResultsPage({ params }: { params: { id: string } }) {
  const { id } = params;
  const [result, setResult] = useState<AuditResult | null>(null);
  const [loading, setLoading] = useState(true);
  const [scores, setScores] = useState<AuditScores | null>(null);
  const [items, setItems] = useState<ActionItem[]>([]);
  const [activeTab, setActiveTab] = useState<"quick-win" | "medium-term" | "investment">("quick-win");

  useEffect(() => {
    const fetchResult = async () => {
      try {
        // Check localStorage first (set immediately after intake submission)
        const localData = localStorage.getItem(`audit-result-${id}`);
        if (localData) {
          const parsed: AuditResult = JSON.parse(localData);
          setResult(parsed);

          // Apply saved checklist state
          const savedState = localStorage.getItem(`audit-checklist-${id}`);
          if (savedState) {
            const completedIds: string[] = JSON.parse(savedState);
            const restored = parsed.actionItems.map((item: ActionItem) => ({
              ...item,
              completed: completedIds.includes(item.id),
            }));
            setItems(restored);
            const newScores = recalculateScore(parsed.scores, restored.filter(i => i.completed));
            setScores(newScores);
          } else {
            setScores(parsed.scores);
            setItems(parsed.actionItems);
          }
          setLoading(false);
          return;
        }

        // Try the API (works when KV is configured)
        const res = await fetch(`/api/results/${id}`);
        const data = await res.json();
        if (data.ok && data.result) {
          setResult(data.result);

          // Cache in localStorage for future visits
          localStorage.setItem(`audit-result-${id}`, JSON.stringify(data.result));

          // Apply saved checklist state
          const savedState = localStorage.getItem(`audit-checklist-${id}`);
          if (savedState) {
            const completedIds: string[] = JSON.parse(savedState);
            const restored = data.result.actionItems.map((item: ActionItem) => ({
              ...item,
              completed: completedIds.includes(item.id),
            }));
            setItems(restored);
            const newScores = recalculateScore(data.result.scores, restored.filter((i: ActionItem) => i.completed));
            setScores(newScores);
          } else {
            setScores(data.result.scores);
            setItems(data.result.actionItems);
          }
        } else {
          // Show demo/mock data if not found (for testing or when ID is unknown)
          setResult(MOCK_RESULT);
          setScores(MOCK_RESULT.scores);
          setItems(MOCK_RESULT.actionItems);
        }
      } catch {
        setResult(MOCK_RESULT);
        setScores(MOCK_RESULT.scores);
        setItems(MOCK_RESULT.actionItems);
      } finally {
        setLoading(false);
      }
    };

    fetchResult();
  }, [id]);

  const toggleItem = (itemId: string) => {
    const updated = items.map((item) =>
      item.id === itemId ? { ...item, completed: !item.completed } : item
    );
    setItems(updated);

    // Save to localStorage
    const completedIds = updated.filter((i) => i.completed).map((i) => i.id);
    localStorage.setItem(`audit-checklist-${id}`, JSON.stringify(completedIds));

    // Recalculate scores
    if (result) {
      const completedItems = updated.filter((i) => i.completed);
      const newScores = recalculateScore(result.scores, completedItems);
      setScores(newScores);
    }
  };

  const completedCount = items.filter((i) => i.completed).length;
  const totalCount = items.length;

  if (loading) {
    return (
      <div className="min-h-screen bg-brand-cream flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-brand-rose border-t-brand-dark rounded-full animate-spin mx-auto mb-4" />
          <p className="font-lora text-brand-dark/70">Loading your results...</p>
        </div>
      </div>
    );
  }

  if (!result || !scores) return null;

  const recommendedPalettes = result.recommendedPalettes
    .map((id) => colorPalettes.find((p) => p.id === id))
    .filter(Boolean);

  const recommendedLayouts = result.recommendedLayouts
    .map((id) => layoutExamples.find((l) => l.id === id))
    .filter(Boolean);

  const quickWins = items.filter((i) => i.category === "quick-win");
  const mediumTerm = items.filter((i) => i.category === "medium-term");
  const investments = items.filter((i) => i.category === "investment");

  const overallPct = Math.round((scores.overall / 5) * 100);
  const overallColor =
    scores.overall <= 1.5
      ? "#dc2626"
      : scores.overall <= 2.5
      ? "#F17F05"
      : scores.overall <= 3.5
      ? "#84a842"
      : scores.overall <= 4.5
      ? "#15803d"
      : "#14532d";

  return (
    <main className="min-h-screen bg-brand-cream">
      {/* Hero / Overall score */}
      <section className="bg-brand-dark text-brand-cream py-16 px-6">
        <div className="max-w-3xl mx-auto">
          <p className="font-lora text-brand-rose text-sm uppercase tracking-widest mb-2">
            Full Spatial Wellness Audit
          </p>
          <h1 className="font-playfair text-4xl md:text-5xl mb-2">
            {result.companyName}
          </h1>
          <p className="font-lora text-brand-rose text-sm mb-8">
            Generated {new Date(result.createdAt).toLocaleDateString("en-GB", {
              day: "numeric",
              month: "long",
              year: "numeric",
            })}
          </p>

          {/* Overall score dial */}
          <div className="bg-brand-cream/10 rounded-2xl p-8 text-center mb-8">
            <p className="font-lora text-brand-rose text-sm mb-2">Overall spatial wellness score</p>
            <div className="flex items-baseline justify-center gap-2 mb-4">
              <span
                className="font-playfair text-8xl font-bold"
                style={{ color: overallColor }}
              >
                {scores.overall.toFixed(1)}
              </span>
              <span className="font-playfair text-3xl text-brand-cream/50">/5</span>
            </div>
            <div className="max-w-xs mx-auto">
              <div className="h-4 bg-brand-cream/10 rounded-full overflow-hidden">
                <div
                  className="h-4 rounded-full transition-all duration-1000"
                  style={{ width: `${overallPct}%`, backgroundColor: overallColor }}
                />
              </div>
              <div className="flex justify-between mt-1 text-xs font-lora text-brand-cream/40">
                <span>Needs attention</span>
                <span>Excellent</span>
              </div>
            </div>
          </div>

          <p className="font-lora text-brand-cream/80 leading-relaxed text-lg">
            {result.summary}
          </p>
        </div>
      </section>

      {/* Progress indicator */}
      {completedCount > 0 && (
        <div className="bg-brand-green text-white px-6 py-3">
          <div className="max-w-3xl mx-auto flex items-center justify-between font-lora text-sm">
            <span>
              {completedCount} of {totalCount} action items completed
            </span>
            <span className="font-medium">
              New score: {scores.overall.toFixed(1)}/5
            </span>
          </div>
        </div>
      )}

      <div className="max-w-3xl mx-auto px-6 py-12 space-y-16">
        {/* Scores by category */}
        <section>
          <h2 className="font-playfair text-3xl text-brand-dark mb-2">
            Your scores by category
          </h2>
          <p className="font-lora text-brand-dark/60 mb-8">
            Scores update as you complete items in your action plan below.
          </p>
          <div className="bg-white rounded-2xl p-8 border border-brand-rose/20 space-y-8">
            {(Object.keys(CATEGORY_LABELS) as Array<keyof typeof CATEGORY_LABELS>).map(
              (cat) => (
                <ScoreBar
                  key={cat}
                  label={CATEGORY_LABELS[cat]}
                  score={scores[cat]}
                  emoji={categoryEmojis[cat] || "📊"}
                  educationText={CATEGORY_EDUCATION[cat]}
                />
              )
            )}
          </div>
        </section>

        {/* Action plan */}
        <section>
          <h2 className="font-playfair text-3xl text-brand-dark mb-2">
            Your action plan
          </h2>
          <p className="font-lora text-brand-dark/60 mb-6">
            Tick items off as you complete them. Your score updates automatically
            to show your progress.
          </p>

          {/* Tab navigation */}
          <div className="flex rounded-xl bg-brand-rose/20 p-1 mb-6">
            {[
              { key: "quick-win", label: "Quick wins", count: quickWins.length, emoji: "⚡" },
              { key: "medium-term", label: "Medium term", count: mediumTerm.length, emoji: "📅" },
              { key: "investment", label: "Investment", count: investments.length, emoji: "💶" },
            ].map((tab) => (
              <button
                key={tab.key}
                type="button"
                onClick={() => setActiveTab(tab.key as typeof activeTab)}
                className={`flex-1 py-2 px-3 rounded-lg font-lora text-sm transition-all ${
                  activeTab === tab.key
                    ? "bg-brand-dark text-brand-cream shadow-sm"
                    : "text-brand-dark/60 hover:text-brand-dark"
                }`}
              >
                <span className="mr-1">{tab.emoji}</span>
                {tab.label}
                <span className="ml-2 text-xs opacity-60">({tab.count})</span>
              </button>
            ))}
          </div>

          {/* Tab descriptions */}
          <div className="mb-6">
            {activeTab === "quick-win" && (
              <div className="bg-brand-orange/10 border border-brand-orange/30 rounded-xl p-4">
                <p className="font-lora text-sm text-brand-dark">
                  <strong>Quick wins</strong> are changes you can make immediately,
                  often for under 100 euros or free. Start here for the fastest impact.
                </p>
              </div>
            )}
            {activeTab === "medium-term" && (
              <div className="bg-brand-green/10 border border-brand-green/30 rounded-xl p-4">
                <p className="font-lora text-sm text-brand-dark">
                  <strong>Medium-term improvements</strong> typically cost between 100 and 500 euros
                  and can be implemented within a month. Plan and budget for these now.
                </p>
              </div>
            )}
            {activeTab === "investment" && (
              <div className="bg-brand-dark/5 border border-brand-dark/20 rounded-xl p-4">
                <p className="font-lora text-sm text-brand-dark">
                  <strong>Investments</strong> are larger changes (500+ euros) that typically
                  require planning, procurement, and potentially minor construction.
                  These deliver the most transformative results.
                </p>
              </div>
            )}
          </div>

          <div className="space-y-4">
            {activeTab === "quick-win" &&
              quickWins.map((item) => (
                <ActionItemCard key={item.id} item={item} onToggle={toggleItem} />
              ))}
            {activeTab === "medium-term" &&
              mediumTerm.map((item) => (
                <ActionItemCard key={item.id} item={item} onToggle={toggleItem} />
              ))}
            {activeTab === "investment" &&
              investments.map((item) => (
                <ActionItemCard key={item.id} item={item} onToggle={toggleItem} />
              ))}
          </div>

          {/* Toolkit link */}
          <div className="mt-8 bg-brand-cream border border-brand-rose/30 rounded-xl p-5 text-center">
            <p className="font-lora text-sm text-brand-dark/70 mb-3">
              Looking for specific products to implement your action plan?
            </p>
            <a
              href="https://houseofreturn.nl/toolkit"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-brand-dark text-brand-cream font-lora text-sm px-6 py-3 rounded-lg hover:bg-brand-dark/90 transition-all"
            >
              <span>🛍</span>
              Browse our curated product recommendations
            </a>
          </div>
        </section>

        {/* Colour palettes */}
        <section>
          <h2 className="font-playfair text-3xl text-brand-dark mb-2">
            Colour palette recommendations
          </h2>
          <p className="font-lora text-brand-dark/60 mb-2">
            These palettes have been selected based on your specific space challenges
            and the psychological effects of colour on the categories where you scored lowest.
          </p>
          <div className="bg-brand-rose/10 rounded-xl p-4 mb-8 font-lora text-sm text-brand-dark/70">
            <strong>Disclaimer:</strong> Colour recommendations reference Farrow and Ball
            paints for illustrative purposes only. House of Return has no commercial
            affiliation with Farrow and Ball. If your brand colours are a priority,
            those are your starting point and these palettes are secondary inspiration.
            RAL codes are approximate equivalents - always verify with physical samples.
          </div>

          <div className="space-y-8">
            {recommendedPalettes.map((palette) => {
              if (!palette) return null;
              return (
                <div
                  key={palette.id}
                  className="bg-white rounded-2xl border border-brand-rose/20 overflow-hidden"
                >
                  <div className="p-6">
                    <h3 className="font-playfair text-2xl text-brand-dark mb-1">
                      {palette.name}
                    </h3>
                    <p className="font-lora text-brand-orange text-sm mb-3">
                      {palette.tagline}
                    </p>
                    <p className="font-lora text-sm text-brand-dark/70 leading-relaxed mb-4">
                      {palette.description}
                    </p>

                    {/* Colour swatches */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
                      {palette.colors.map((swatch) => (
                        <div key={swatch.farrowBall} className="space-y-2">
                          <div
                            className="aspect-square rounded-xl shadow-sm border border-black/5"
                            style={{ backgroundColor: swatch.hex }}
                          />
                          <div>
                            <p className="font-lora text-xs font-medium text-brand-dark">
                              {swatch.farrowBall}
                            </p>
                            <p className="font-lora text-xs text-brand-dark/50">
                              {swatch.hex}
                            </p>
                            <p className="font-lora text-xs text-brand-dark/50">
                              {swatch.ral}
                            </p>
                            <p className="font-lora text-xs text-brand-dark/70 mt-1">
                              {swatch.role}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Best for */}
                    <div>
                      <p className="font-lora text-xs font-medium text-brand-dark/50 uppercase tracking-wide mb-2">
                        Best for
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {palette.bestFor.map((tag) => (
                          <span
                            key={tag}
                            className="bg-brand-cream border border-brand-rose/30 font-lora text-xs px-3 py-1 rounded-full text-brand-dark/70"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Show all palettes toggle */}
          <details className="mt-6">
            <summary className="cursor-pointer font-lora text-sm text-brand-dark/50 hover:text-brand-dark transition-colors py-2">
              View all 10 palettes in our library
            </summary>
            <div className="mt-4 space-y-4">
              {colorPalettes
                .filter((p) => !result.recommendedPalettes.includes(p.id))
                .map((palette) => (
                  <div
                    key={palette.id}
                    className="bg-white rounded-xl border border-brand-rose/20 p-5"
                  >
                    <div className="flex gap-3 mb-3">
                      {palette.colors.map((c) => (
                        <div
                          key={c.hex}
                          className="w-8 h-8 rounded-full border border-black/5 shadow-sm"
                          style={{ backgroundColor: c.hex }}
                          title={c.farrowBall}
                        />
                      ))}
                    </div>
                    <h4 className="font-playfair text-lg text-brand-dark">{palette.name}</h4>
                    <p className="font-lora text-xs text-brand-orange mb-2">{palette.tagline}</p>
                    <p className="font-lora text-sm text-brand-dark/60">{palette.description}</p>
                  </div>
                ))}
            </div>
          </details>
        </section>

        {/* Layout suggestions */}
        <section>
          <h2 className="font-playfair text-3xl text-brand-dark mb-2">
            Layout suggestions
          </h2>
          <p className="font-lora text-brand-dark/60 mb-8">
            These layout principles have been selected as most relevant for your space
            type and the challenges identified in your intake.
          </p>

          <div className="space-y-8">
            {recommendedLayouts.map((layout) => {
              if (!layout) return null;
              return (
                <div
                  key={layout.id}
                  className="bg-white rounded-2xl border border-brand-rose/20 overflow-hidden"
                >
                  <div className="p-6">
                    <h3 className="font-playfair text-2xl text-brand-dark mb-1">
                      {layout.name}
                    </h3>
                    <p className="font-lora text-brand-orange text-sm mb-4">
                      {layout.tagline}
                    </p>

                    {/* SVG diagram */}
                    <div
                      className="bg-brand-cream rounded-xl p-2 mb-6"
                      dangerouslySetInnerHTML={{ __html: layout.svgDiagram }}
                    />

                    <p className="font-lora text-sm text-brand-dark/70 leading-relaxed mb-5">
                      {layout.description}
                    </p>

                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <p className="font-lora text-xs font-medium text-brand-dark/50 uppercase tracking-wide mb-2">
                          When to use this layout
                        </p>
                        <ul className="space-y-1">
                          {layout.whenToUse.map((w) => (
                            <li key={w} className="flex gap-2 font-lora text-sm text-brand-dark/70">
                              <span className="text-brand-orange mt-0.5 flex-shrink-0">+</span>
                              <span>{w}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <p className="font-lora text-xs font-medium text-brand-dark/50 uppercase tracking-wide mb-2">
                          Key benefits
                        </p>
                        <ul className="space-y-1">
                          {layout.benefits.map((b) => (
                            <li key={b} className="flex gap-2 font-lora text-sm text-brand-dark/70">
                              <span className="text-brand-green mt-0.5 flex-shrink-0">+</span>
                              <span>{b}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Book a call CTA */}
        <section className="bg-brand-dark text-brand-cream rounded-2xl p-8 text-center">
          <p className="text-brand-rose font-lora text-sm mb-3">Optional add-on</p>
          <h2 className="font-playfair text-3xl mb-4">
            Want to talk it through?
          </h2>
          <p className="font-lora text-brand-cream/80 leading-relaxed mb-6 max-w-lg mx-auto">
            Book a 30-minute implementation call with Elianne to get personalised guidance
            on prioritising your action plan, specific product recommendations for your
            budget, and a clear rollout sequence.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <a
              href="https://houseofreturn.nl/book-call"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-brand-orange hover:bg-brand-orange/90 text-white font-playfair text-lg px-8 py-4 rounded-xl transition-all inline-block"
            >
              Book a 30-minute call
            </a>
            <span className="font-playfair text-2xl text-brand-rose">75-95 euro</span>
          </div>
        </section>

        {/* Affiliate disclaimer */}
        <section className="text-center">
          <p className="font-lora text-xs text-brand-dark/40 max-w-lg mx-auto leading-relaxed">
            Product recommendations on this page may include affiliate links.
            House of Return may earn a small commission on qualifying purchases
            at no additional cost to you. This never influences which products
            are recommended - only genuinely useful products are included.
          </p>
        </section>
      </div>
    </main>
  );
}
