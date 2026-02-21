export interface IntakeFormData {
  // Business info
  companyName: string;
  industry: string;
  employeeCount: string;
  contactName: string;
  contactEmail: string;

  // Space info
  totalSqm: string;
  numberOfSpaces: string;
  spaceType: "open-plan" | "private-offices" | "mixed";
  hasFloorplan: boolean;

  // Branding
  hasBrandColors: boolean;
  brandColors: string;
  hasLogo: boolean;

  // Photos
  photoFiles: File[];

  // Experience questions - 1-5 scale
  q_lighting: string; // 1-5 scale
  q_lighting_detail: string;
  q_acoustics: string;
  q_acoustics_detail: string;
  q_temperature: string;
  q_temperature_detail: string;
  q_layout: string;
  q_layout_detail: string;
  q_privacy: string;
  q_privacy_detail: string;
  q_biophilia: string;
  q_biophilia_detail: string;
  q_sensory: string;
  q_sensory_detail: string;
  q_ergonomics: string;
  q_ergonomics_detail: string;
  q_overall: string;
  q_overall_detail: string;
  q_energy: string;
  q_stress: string;
  q_productivity: string;

  // Extended Full Audit questions
  q_loudest_times: string;
  q_avoided_spots: string;
  q_favourite_spots: string;
  q_specific_complaints: string;
  q_previous_attempts: string;
  q_sensory_needs: string;
  q_top_priority: string;
}

export interface AuditScores {
  lighting: number;
  acoustics: number;
  temperature: number;
  layout: number;
  privacy: number;
  biophilia: number;
  sensory: number;
  ergonomics: number;
  overall: number;
}

export interface ActionItem {
  id: string;
  category: "quick-win" | "medium-term" | "investment";
  title: string;
  description: string;
  estimatedCost: string;
  timeframe: string;
  impact: "high" | "medium" | "low";
  completed: boolean;
}

export interface AuditResult {
  id: string;
  createdAt: string;
  companyName: string;
  contactName: string;
  contactEmail: string;
  scores: AuditScores;
  actionItems: ActionItem[];
  recommendedPalettes: string[];
  recommendedLayouts: string[];
  summary: string;
  paidAt?: string;
}

export const CATEGORY_LABELS: Record<keyof Omit<AuditScores, "overall">, string> = {
  lighting: "Lighting",
  acoustics: "Acoustics",
  temperature: "Temperature and Air Quality",
  layout: "Space and Layout",
  privacy: "Privacy and Focus",
  biophilia: "Biophilia and Nature",
  sensory: "Sensory Comfort",
  ergonomics: "Ergonomics",
};

export const SCORE_LABELS: Record<string, string> = {
  "1": "Needs urgent attention",
  "2": "Below average",
  "3": "Acceptable",
  "4": "Good",
  "5": "Excellent",
};
