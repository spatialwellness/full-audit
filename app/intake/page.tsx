"use client";

import { useState, useRef } from "react";

const TOTAL_STEPS = 5;

interface FormData {
  companyName: string;
  industry: string;
  employeeCount: string;
  contactName: string;
  contactEmail: string;
  totalSqm: string;
  numberOfSpaces: string;
  spaceType: string;
  hasBrandColors: string;
  brandColors: string;
  q_lighting: string;
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
  q_neuro: string;
  q_neuro_detail: string;
  q_ergonomics: string;
  q_ergonomics_detail: string;
  q_neuro_inclusive: string;
  q_neuro_inclusive_detail: string;
  q_overall: string;
  q_overall_detail: string;
  q_energy: string;
  q_stress: string;
  q_productivity: string;
  q_loudest_times: string;
  q_avoided_spots: string;
  q_favourite_spots: string;
  q_specific_complaints: string;
  q_previous_attempts: string;
  q_sensory_needs: string;
  q_top_priority: string;
}

const initialData: FormData = {
  companyName: "",
  industry: "",
  employeeCount: "",
  contactName: "",
  contactEmail: "",
  totalSqm: "",
  numberOfSpaces: "",
  spaceType: "",
  hasBrandColors: "",
  brandColors: "",
  q_lighting: "",
  q_lighting_detail: "",
  q_acoustics: "",
  q_acoustics_detail: "",
  q_temperature: "",
  q_temperature_detail: "",
  q_layout: "",
  q_layout_detail: "",
  q_privacy: "",
  q_privacy_detail: "",
  q_biophilia: "",
  q_biophilia_detail: "",
  q_sensory: "",
  q_sensory_detail: "",
  q_neuro: "",
  q_neuro_detail: "",
  q_ergonomics: "",
  q_ergonomics_detail: "",
  q_neuro_inclusive: "",
  q_neuro_inclusive_detail: "",
  q_overall: "",
  q_overall_detail: "",
  q_energy: "",
  q_stress: "",
  q_productivity: "",
  q_loudest_times: "",
  q_avoided_spots: "",
  q_favourite_spots: "",
  q_specific_complaints: "",
  q_previous_attempts: "",
  q_sensory_needs: "",
  q_top_priority: "",
};

const SCORE_OPTIONS = [
  { value: "1", label: "1 - Needs urgent attention" },
  { value: "2", label: "2 - Below average" },
  { value: "3", label: "3 - Acceptable" },
  { value: "4", label: "4 - Good" },
  { value: "5", label: "5 - Excellent" },
];

function ScoreSelect({
  id,
  value,
  onChange,
  label,
  hint,
  error,
}: {
  id: string;
  value: string;
  onChange: (v: string) => void;
  label: string;
  hint?: string;
  error?: boolean;
}) {
  return (
    <div className="space-y-2">
      <label
        htmlFor={id}
        className={`block font-lora font-medium ${error ? "text-red-600" : "text-brand-dark"}`}
      >
        {label}
        {error && <span className="ml-2 text-sm font-normal text-red-500">- Please select a rating</span>}
      </label>
      {hint && <p className="text-sm text-brand-dark/60 font-lora">{hint}</p>}
      <div className={`grid grid-cols-1 sm:grid-cols-5 gap-2 ${error ? "rounded-lg ring-2 ring-red-400 p-2" : ""}`}>
        {SCORE_OPTIONS.map((opt) => (
          <button
            key={opt.value}
            type="button"
            onClick={() => onChange(opt.value)}
            className={`px-3 py-3 rounded-lg text-sm font-lora border-2 transition-all text-left ${
              value === opt.value
                ? "bg-brand-dark text-brand-cream border-brand-dark"
                : error
                ? "bg-white border-red-300 text-brand-dark hover:border-brand-dark"
                : "bg-white border-brand-rose/40 text-brand-dark hover:border-brand-dark"
            }`}
          >
            {opt.label}
          </button>
        ))}
      </div>
    </div>
  );
}

function TextArea({
  id,
  value,
  onChange,
  label,
  hint,
  placeholder,
  required,
  error,
}: {
  id: string;
  value: string;
  onChange: (v: string) => void;
  label: string;
  hint?: string;
  placeholder?: string;
  required?: boolean;
  error?: boolean;
}) {
  return (
    <div className="space-y-1">
      <label
        htmlFor={id}
        className={`block font-lora font-medium ${error ? "text-red-600" : "text-brand-dark"}`}
      >
        {label}
        {required && <span className={`ml-1 ${error ? "text-red-500" : "text-brand-orange"}`}>*</span>}
      </label>
      {hint && <p className="text-sm text-brand-dark/60 font-lora mb-2">{hint}</p>}
      <textarea
        id={id}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        rows={3}
        required={required}
        className={`w-full border rounded-lg px-4 py-3 font-lora text-brand-dark bg-white focus:outline-none focus:ring-2 resize-y ${
          error
            ? "border-red-400 focus:ring-red-400"
            : "border-brand-rose/40 focus:ring-brand-orange"
        }`}
      />
      {error && (
        <p className="text-red-500 text-sm font-lora">This field is required.</p>
      )}
    </div>
  );
}

function Input({
  id,
  value,
  onChange,
  label,
  hint,
  placeholder,
  type = "text",
  required,
  error,
}: {
  id: string;
  value: string;
  onChange: (v: string) => void;
  label: string;
  hint?: string;
  placeholder?: string;
  type?: string;
  required?: boolean;
  error?: boolean;
}) {
  return (
    <div className="space-y-1">
      <label
        htmlFor={id}
        className={`block font-lora font-medium ${error ? "text-red-600" : "text-brand-dark"}`}
      >
        {label}
        {required && <span className={`ml-1 ${error ? "text-red-500" : "text-brand-orange"}`}>*</span>}
      </label>
      {hint && <p className="text-sm text-brand-dark/60 font-lora mb-1">{hint}</p>}
      <input
        id={id}
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        required={required}
        className={`w-full border rounded-lg px-4 py-3 font-lora text-brand-dark bg-white focus:outline-none focus:ring-2 ${
          error
            ? "border-red-400 focus:ring-red-400"
            : "border-brand-rose/40 focus:ring-brand-orange"
        }`}
      />
      {error && (
        <p className="text-red-500 text-sm font-lora">This field is required.</p>
      )}
    </div>
  );
}

export default function IntakePage() {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState<FormData>(initialData);
  const [photos, setPhotos] = useState<File[]>([]);
  const [floorplan, setFloorplan] = useState<File | null>(null);
  const [logo, setLogo] = useState<File | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [errors, setErrors] = useState<Record<string, boolean>>({});
  const [submitted, setSubmitted] = useState(false);
  const [submittedData, setSubmittedData] = useState<{ contactName: string; companyName: string } | null>(null);
  const photoRef = useRef<HTMLInputElement>(null);
  const floorplanRef = useRef<HTMLInputElement>(null);
  const logoRef = useRef<HTMLInputElement>(null);
  const topRef = useRef<HTMLDivElement>(null);

  const set = (key: keyof FormData) => (value: string) =>
    setForm((prev) => ({ ...prev, [key]: value }));

  const scrollToTop = () => {
    topRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const validateStep = (currentStep: number): boolean => {
    const newErrors: Record<string, boolean> = {};

    if (currentStep === 1) {
      if (!form.companyName.trim()) newErrors.companyName = true;
      if (!form.industry.trim()) newErrors.industry = true;
      if (!form.contactName.trim()) newErrors.contactName = true;
      if (!form.contactEmail.trim()) newErrors.contactEmail = true;
    }

    if (currentStep === 2) {
      if (!form.totalSqm.trim()) newErrors.totalSqm = true;
      if (!form.numberOfSpaces.trim()) newErrors.numberOfSpaces = true;
      if (!form.spaceType) newErrors.spaceType = true;
    }

    if (currentStep === 3) {
      if (photos.length < 8) newErrors.photos = true;
    }

    if (currentStep === 4) {
      const scoreFields = [
        "q_lighting", "q_acoustics", "q_temperature", "q_layout",
        "q_privacy", "q_biophilia", "q_sensory", "q_neuro", "q_ergonomics",
        "q_energy", "q_stress", "q_productivity",
      ];
      scoreFields.forEach((field) => {
        if (!form[field as keyof FormData]) newErrors[field] = true;
      });
    }

    if (currentStep === 5) {
      if (!form.q_top_priority.trim()) newErrors.q_top_priority = true;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const nextStep = () => {
    const valid = validateStep(step);
    if (!valid) {
      scrollToTop();
      return;
    }
    setErrors({});
    scrollToTop();
    setStep((s) => Math.min(s + 1, TOTAL_STEPS));
  };

  const prevStep = () => {
    setErrors({});
    scrollToTop();
    setStep((s) => Math.max(s - 1, 1));
  };

  const handlePhotos = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    setPhotos((prev) => [...prev, ...files]);
  };

  const removePhoto = (idx: number) => {
    setPhotos((prev) => prev.filter((_, i) => i !== idx));
  };

  const handleSubmit = async () => {
    const valid = validateStep(5);
    if (!valid) return;

    setSubmitting(true);
    setError("");

    try {
      const photoNames = photos.map((f) => f.name);

      const res = await fetch("/api/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          photoFiles: photoNames,
          photoCount: photos.length,
          hasFloorplan: !!floorplan,
          hasLogo: !!logo,
        }),
      });

      const data = await res.json();

      if (data.ok && data.id) {
        if (data.result) {
          localStorage.setItem(`audit-result-${data.id}`, JSON.stringify(data.result));
        }
        setSubmittedData({ contactName: form.contactName, companyName: form.companyName });
        setSubmitted(true);
        scrollToTop();
      } else {
        setError("Submission failed. Please try again or email hello@spatial-wellness.com");
      }
    } catch {
      setError("Connection error. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const progressPercent = Math.round((step / TOTAL_STEPS) * 100);

  // Thank you screen
  if (submitted && submittedData) {
    return (
      <main className="min-h-screen bg-brand-cream flex items-center justify-center px-6" ref={topRef}>
        <div className="max-w-lg w-full text-center">
          <div className="bg-white rounded-2xl border border-brand-rose/20 p-10 shadow-sm">
            <div className="w-16 h-16 bg-brand-green/20 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-8 h-8 text-brand-green" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            </div>

            <h1 className="font-playfair text-3xl text-brand-dark mb-3">
              Thank you, {submittedData.contactName}!
            </h1>

            <p className="font-lora text-brand-dark/80 mb-4 leading-relaxed">
              Your intake for <strong>{submittedData.companyName}</strong> has been received.
            </p>

            <div className="bg-brand-cream rounded-xl p-5 mb-6">
              <p className="font-lora text-brand-dark/80 leading-relaxed text-sm">
                We will review your submission and prepare your personalised report.
                You will receive a link to your results page via email within 5 working days.
              </p>
            </div>

            <p className="font-lora text-sm text-brand-dark/60">
              If you have questions in the meantime, email{" "}
              <a
                href="mailto:hello@spatial-wellness.com"
                className="text-brand-orange underline hover:no-underline"
              >
                hello@spatial-wellness.com
              </a>
            </p>

            <div className="mt-8 pt-6 border-t border-brand-rose/20">
              <p className="font-lora text-xs text-brand-dark/40 uppercase tracking-widest">
                House of Return
              </p>
            </div>
          </div>
        </div>
      </main>
    );
  }

  const hasStepErrors = Object.keys(errors).length > 0;

  return (
    <main className="min-h-screen bg-brand-cream" ref={topRef}>
      {/* Progress header */}
      <div className="sticky top-0 z-10 bg-white border-b border-brand-rose/30 shadow-sm">
        <div className="max-w-3xl mx-auto px-6 py-3">
          <div className="flex items-center justify-between mb-2">
            <span className="font-lora text-sm text-brand-dark/60">
              Step {step} of {TOTAL_STEPS}
            </span>
            <span className="font-lora text-sm text-brand-dark/60">
              {progressPercent}% complete
            </span>
          </div>
          <div className="h-2 bg-brand-rose/20 rounded-full">
            <div
              className="h-2 bg-brand-orange rounded-full transition-all duration-500"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
          <div className="flex justify-between mt-2 text-xs font-lora text-brand-dark/50">
            <span className={step >= 1 ? "text-brand-orange font-medium" : ""}>
              Your details
            </span>
            <span className={step >= 2 ? "text-brand-orange font-medium" : ""}>
              Your space
            </span>
            <span className={step >= 3 ? "text-brand-orange font-medium" : ""}>
              Photos
            </span>
            <span className={step >= 4 ? "text-brand-orange font-medium" : ""}>
              Experience
            </span>
            <span className={step >= 5 ? "text-brand-orange font-medium" : ""}>
              Deeper questions
            </span>
          </div>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-6 py-10">
        {/* Reassurance banner */}
        <div className="bg-brand-green/10 border border-brand-green/30 rounded-xl p-4 mb-8">
          <p className="font-lora text-sm text-brand-dark">
            <strong>Take your time.</strong> There is no time limit on this form.
            You can complete it in stages - your browser will remember your answers if you stay on this page.
            If you close the tab, start again from the beginning.
          </p>
        </div>

        {/* Error summary banner */}
        {hasStepErrors && (
          <div className="bg-red-50 border border-red-200 rounded-xl p-4 mb-6">
            <p className="font-lora text-sm text-red-700 font-medium">
              Please fill in all required fields before continuing.
            </p>
          </div>
        )}

        {/* ---- STEP 1: Business details ---- */}
        {step === 1 && (
          <div className="space-y-8">
            <div>
              <h1 className="font-playfair text-3xl text-brand-dark mb-2">
                About your organisation
              </h1>
              <p className="font-lora text-brand-dark/70">
                These details help us frame your report correctly.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-8 border border-brand-rose/20 space-y-6">
              <Input
                id="companyName"
                label="Company or organisation name"
                value={form.companyName}
                onChange={set("companyName")}
                placeholder="e.g. Bright Minds Agency"
                required
                error={errors.companyName}
              />

              <Input
                id="industry"
                label="Industry or sector"
                value={form.industry}
                onChange={set("industry")}
                placeholder="e.g. Marketing agency, law firm, healthcare, tech startup..."
                required
                error={errors.industry}
              />

              <Input
                id="employeeCount"
                label="Number of employees working at this location"
                value={form.employeeCount}
                onChange={set("employeeCount")}
                placeholder="e.g. 15"
                hint="A rough number is fine."
              />

              <div className="border-t border-brand-rose/20 pt-6">
                <h2 className="font-playfair text-xl text-brand-dark mb-4">
                  Contact details
                </h2>
                <div className="space-y-4">
                  <Input
                    id="contactName"
                    label="Your name"
                    value={form.contactName}
                    onChange={set("contactName")}
                    placeholder="Your full name"
                    required
                    error={errors.contactName}
                  />
                  <Input
                    id="contactEmail"
                    label="Your email address"
                    value={form.contactEmail}
                    onChange={set("contactEmail")}
                    placeholder="you@yourcompany.com"
                    type="email"
                    required
                    error={errors.contactEmail}
                  />
                </div>
              </div>

              <div className="border-t border-brand-rose/20 pt-6">
                <h2 className="font-playfair text-xl text-brand-dark mb-4">
                  Branding
                </h2>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <label className="block font-lora font-medium text-brand-dark">
                      Do you have brand colours that should be reflected in the space?
                    </label>
                    <div className="flex gap-3">
                      {["Yes", "No", "Not sure"].map((opt) => (
                        <button
                          key={opt}
                          type="button"
                          onClick={() => set("hasBrandColors")(opt)}
                          className={`px-4 py-2 rounded-lg font-lora text-sm border-2 transition-all ${
                            form.hasBrandColors === opt
                              ? "bg-brand-dark text-brand-cream border-brand-dark"
                              : "bg-white border-brand-rose/40 text-brand-dark hover:border-brand-dark"
                          }`}
                        >
                          {opt}
                        </button>
                      ))}
                    </div>
                  </div>

                  {form.hasBrandColors === "Yes" && (
                    <TextArea
                      id="brandColors"
                      label="What are your brand colours?"
                      value={form.brandColors}
                      onChange={set("brandColors")}
                      placeholder="e.g. Deep navy (#1a2b5c), warm gold (#d4a843), white. Or just describe them - exact hex codes are helpful but not required."
                      hint="List your brand colours so we can work with them in our recommendations."
                    />
                  )}

                  <div>
                    <p className="font-lora font-medium text-brand-dark mb-2">
                      Logo (optional)
                    </p>
                    <p className="text-sm text-brand-dark/60 font-lora mb-3">
                      Uploading your logo helps us understand your visual identity.
                    </p>
                    <button
                      type="button"
                      onClick={() => logoRef.current?.click()}
                      className="border-2 border-dashed border-brand-rose/40 rounded-xl px-6 py-4 font-lora text-sm text-brand-dark/60 hover:border-brand-orange hover:text-brand-orange transition-all"
                    >
                      {logo ? `Logo uploaded: ${logo.name}` : "Click to upload your logo (PNG or SVG preferred)"}
                    </button>
                    <input
                      ref={logoRef}
                      type="file"
                      accept="image/*,.svg,.pdf"
                      className="hidden"
                      onChange={(e) => setLogo(e.target.files?.[0] || null)}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ---- STEP 2: Space information ---- */}
        {step === 2 && (
          <div className="space-y-8">
            <div>
              <h1 className="font-playfair text-3xl text-brand-dark mb-2">
                About your space
              </h1>
              <p className="font-lora text-brand-dark/70">
                Help us understand the physical setup of your workplace.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-8 border border-brand-rose/20 space-y-6">
              <Input
                id="totalSqm"
                label="Approximate total floor area (square metres)"
                value={form.totalSqm}
                onChange={set("totalSqm")}
                placeholder="e.g. 120"
                hint="An estimate is fine. We can only audit up to 150m2 or 3 rooms in this package."
                required
                error={errors.totalSqm}
              />

              <Input
                id="numberOfSpaces"
                label="Number of distinct rooms or areas"
                value={form.numberOfSpaces}
                onChange={set("numberOfSpaces")}
                placeholder="e.g. 3 (open-plan office + meeting room + kitchen)"
                hint="Count each separate room or distinct area separately."
                required
                error={errors.numberOfSpaces}
              />

              <div className="space-y-2">
                <label className={`block font-lora font-medium ${errors.spaceType ? "text-red-600" : "text-brand-dark"}`}>
                  Primary layout type
                  <span className={`ml-1 ${errors.spaceType ? "text-red-500" : "text-brand-orange"}`}>*</span>
                  {errors.spaceType && <span className="ml-2 text-sm font-normal text-red-500">- Please select an option</span>}
                </label>
                <p className="text-sm text-brand-dark/60 font-lora">
                  Select the option that best describes your main workspace.
                </p>
                <div className={`space-y-2 ${errors.spaceType ? "rounded-lg ring-2 ring-red-400 p-2" : ""}`}>
                  {[
                    {
                      value: "open-plan",
                      label: "Fully open plan",
                      desc: "One large shared space with no permanent walls dividing it",
                    },
                    {
                      value: "private-offices",
                      label: "Separate offices",
                      desc: "Individual or small shared rooms with their own doors",
                    },
                    {
                      value: "mixed",
                      label: "Mixed",
                      desc: "A combination of open-plan areas and some private or semi-private rooms",
                    },
                  ].map((opt) => (
                    <button
                      key={opt.value}
                      type="button"
                      onClick={() => set("spaceType")(opt.value)}
                      className={`w-full text-left px-5 py-4 rounded-xl border-2 transition-all ${
                        form.spaceType === opt.value
                          ? "bg-brand-dark text-brand-cream border-brand-dark"
                          : errors.spaceType
                          ? "bg-white border-red-300 hover:border-brand-dark"
                          : "bg-white border-brand-rose/40 hover:border-brand-dark"
                      }`}
                    >
                      <span className="font-lora font-medium block">{opt.label}</span>
                      <span
                        className={`font-lora text-sm ${
                          form.spaceType === opt.value
                            ? "text-brand-cream/70"
                            : "text-brand-dark/60"
                        }`}
                      >
                        {opt.desc}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              <div className="border-t border-brand-rose/20 pt-6">
                <p className="font-lora font-medium text-brand-dark mb-2">
                  Floorplan (optional but very helpful)
                </p>
                <p className="text-sm text-brand-dark/60 font-lora mb-3">
                  A floorplan - even a rough hand-drawn one - helps us give much more specific
                  layout recommendations. PDF, image, or any format is fine.
                </p>
                <button
                  type="button"
                  onClick={() => floorplanRef.current?.click()}
                  className="border-2 border-dashed border-brand-rose/40 rounded-xl px-6 py-4 font-lora text-sm text-brand-dark/60 hover:border-brand-orange hover:text-brand-orange transition-all"
                >
                  {floorplan
                    ? `Floorplan uploaded: ${floorplan.name}`
                    : "Click to upload a floorplan (any format)"}
                </button>
                <input
                  ref={floorplanRef}
                  type="file"
                  accept="image/*,.pdf,.dxf,.dwg"
                  className="hidden"
                  onChange={(e) => setFloorplan(e.target.files?.[0] || null)}
                />
              </div>
            </div>
          </div>
        )}

        {/* ---- STEP 3: Photo upload ---- */}
        {step === 3 && (
          <div className="space-y-8">
            <div>
              <h1 className="font-playfair text-3xl text-brand-dark mb-2">
                Photos of your space
              </h1>
              <p className="font-lora text-brand-dark/70">
                This is the most important part of the intake. Good photos allow us to give specific,
                accurate recommendations.
              </p>
            </div>

            <div className="bg-brand-dark text-brand-cream rounded-2xl p-8">
              <h2 className="font-playfair text-xl mb-4">
                Photo instructions
              </h2>
              <div className="space-y-3 font-lora text-sm">
                <p className="text-brand-rose font-medium">Minimum 8 photos required:</p>
                <ul className="space-y-2 list-none">
                  {[
                    "For each room: 2 photos from opposite corners (so you capture all four walls)",
                    "Close-up of at least 2 individual workstations",
                    "Any problem spots you are aware of",
                    "Windows and lighting fixtures where possible",
                    "Any areas people specifically avoid or prefer",
                  ].map((tip, i) => (
                    <li key={i} className="flex gap-3">
                      <span className="text-brand-orange mt-0.5 flex-shrink-0">+</span>
                      <span className="text-brand-cream/80">{tip}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-4 pt-4 border-t border-brand-cream/20">
                  <p className="text-brand-cream/60 text-xs">
                    Tips for better photos: natural light is best. Turn on all existing lights.
                    Take photos at eye level. Do not worry about tidying up first - we want to
                    see the space as it really is.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-8 border border-brand-rose/20">
              <div
                className={`border-2 border-dashed rounded-xl p-8 text-center transition-all cursor-pointer ${
                  errors.photos ? "border-red-400 bg-red-50" : "border-brand-rose/40 hover:border-brand-orange"
                }`}
                onClick={() => photoRef.current?.click()}
              >
                <span className="text-4xl block mb-3">📸</span>
                <p className="font-playfair text-xl text-brand-dark mb-2">
                  Upload your photos
                </p>
                <p className="font-lora text-sm text-brand-dark/60 mb-4">
                  You can select multiple files at once. JPG, PNG, HEIC accepted.
                </p>
                <span className="bg-brand-dark text-brand-cream font-lora text-sm px-6 py-3 rounded-lg inline-block">
                  Choose photos
                </span>
              </div>
              <input
                ref={photoRef}
                type="file"
                accept="image/*"
                multiple
                className="hidden"
                onChange={handlePhotos}
              />

              {errors.photos && (
                <div className="mt-4 bg-red-50 border border-red-200 rounded-xl p-4">
                  <p className="font-lora text-sm text-red-700 font-medium">
                    Please upload at least 8 photos before continuing.
                    You currently have {photos.length} - {8 - photos.length} more needed.
                  </p>
                </div>
              )}

              {photos.length > 0 && (
                <div className="mt-6">
                  <div className="flex items-center justify-between mb-3">
                    <p className="font-lora font-medium text-brand-dark">
                      {photos.length} photo{photos.length !== 1 ? "s" : ""} selected
                    </p>
                    <span
                      className={`font-lora text-sm px-3 py-1 rounded-full ${
                        photos.length >= 8
                          ? "bg-brand-green/20 text-brand-green"
                          : "bg-brand-orange/20 text-brand-orange"
                      }`}
                    >
                      {photos.length >= 8
                        ? "Minimum reached"
                        : `Need ${8 - photos.length} more`}
                    </span>
                  </div>
                  <div className="grid grid-cols-3 md:grid-cols-4 gap-3">
                    {photos.map((file, idx) => (
                      <div
                        key={idx}
                        className="relative bg-brand-rose/10 rounded-lg overflow-hidden aspect-square"
                      >
                        <img
                          src={URL.createObjectURL(file)}
                          alt={file.name}
                          className="w-full h-full object-cover"
                        />
                        <button
                          type="button"
                          onClick={() => removePhoto(idx)}
                          className="absolute top-1 right-1 w-6 h-6 bg-brand-dark/80 text-white rounded-full text-xs flex items-center justify-center hover:bg-red-600 transition-colors"
                          title="Remove photo"
                        >
                          x
                        </button>
                        <div className="absolute bottom-0 left-0 right-0 bg-brand-dark/60 px-2 py-1">
                          <p className="text-white text-xs truncate font-lora">
                            {file.name}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                  <button
                    type="button"
                    onClick={() => photoRef.current?.click()}
                    className="mt-3 w-full border border-dashed border-brand-rose/40 rounded-lg py-3 font-lora text-sm text-brand-dark/60 hover:border-brand-orange hover:text-brand-orange transition-all"
                  >
                    Add more photos
                  </button>
                </div>
              )}
            </div>
          </div>
        )}

        {/* ---- STEP 4: Experience scores ---- */}
        {step === 4 && (
          <div className="space-y-8">
            <div>
              <h1 className="font-playfair text-3xl text-brand-dark mb-2">
                How does your space feel?
              </h1>
              <p className="font-lora text-brand-dark/70">
                Rate each category from 1 to 5, then add any context that helps explain your score.
                Trust your first instinct - there are no wrong answers.
              </p>
            </div>

            <div className="space-y-6">
              {[
                {
                  id: "q_lighting",
                  detailId: "q_lighting_detail",
                  label: "Lighting",
                  emoji: "💡",
                  hint: "Think about natural light levels, artificial lighting quality, glare, and any dark spots.",
                  detailPrompt: "Tell us more about your lighting (optional)",
                  detailPlaceholder:
                    "e.g. Very bright afternoon sun causes glare on screens, the corridor is dark...",
                },
                {
                  id: "q_acoustics",
                  detailId: "q_acoustics_detail",
                  label: "Acoustics and noise",
                  emoji: "🔊",
                  hint: "Consider background noise levels, echo, concentration disruptions, and whether you can have private conversations.",
                  detailPrompt: "Tell us more about noise in your space (optional)",
                  detailPlaceholder:
                    "e.g. Phone calls are clearly audible across the whole office, our kitchen is very loud...",
                },
                {
                  id: "q_temperature",
                  detailId: "q_temperature_detail",
                  label: "Temperature and air quality",
                  emoji: "🌡️",
                  hint: "Think about whether the space is too hot, too cold, stuffy, or drafty throughout the year.",
                  detailPrompt: "Tell us more about temperature and air in your space (optional)",
                  detailPlaceholder:
                    "e.g. South-facing office is very hot in summer, windows cannot be opened...",
                },
                {
                  id: "q_layout",
                  detailId: "q_layout_detail",
                  label: "Space and layout",
                  emoji: "📐",
                  hint: "Think about whether the space works for how you actually work - flow, orientation, desk placement.",
                  detailPrompt: "Tell us more about the layout (optional)",
                  detailPlaceholder:
                    "e.g. The printer is in an awkward place, desks are too close together...",
                },
                {
                  id: "q_privacy",
                  detailId: "q_privacy_detail",
                  label: "Privacy and focus",
                  emoji: "🎯",
                  hint: "Consider whether people can find quiet places to concentrate, and whether conversations remain confidential.",
                  detailPrompt: "Tell us more about privacy and focus (optional)",
                  detailPlaceholder:
                    "e.g. Client calls can be heard by everyone, there is nowhere to go for deep work...",
                },
                {
                  id: "q_biophilia",
                  detailId: "q_biophilia_detail",
                  label: "Biophilia and nature",
                  emoji: "🌿",
                  hint: "Think about plants, natural materials, daylight, views of the outside, and connection to the natural world.",
                  detailPrompt: "Tell us more about nature in your space (optional)",
                  detailPlaceholder:
                    "e.g. No windows in the main office, we have a few plants near reception...",
                },
                {
                  id: "q_sensory",
                  detailId: "q_sensory_detail",
                  label: "Sensory comfort",
                  emoji: "✨",
                  hint: "Think about visual clutter, smells, uncomfortable textures, harsh lighting, or anything that feels irritating or overwhelming. Flickering lights, humming electronics, and strong smells can be particularly impactful for neurodivergent team members.",
                  detailPrompt: "Tell us more about sensory comfort (optional)",
                  detailPlaceholder:
                    "e.g. The overhead fluorescents flicker slightly, strong cleaning smells in the morning...",
                },
                {
                  id: "q_neuro",
                  detailId: "q_neuro_detail",
                  label: "Neuro-inclusive design",
                  emoji: "◆",
                  hint: "Does the space accommodate different ways of processing information and managing energy? Think about quiet zones, movement options, fidget-friendly culture, adjustable everything, and whether people can control their sensory environment.",
                  detailPrompt: "Tell us more about neuro-inclusive features (optional)",
                  detailPlaceholder:
                    "e.g. We have a quiet room but it is often used for storage, some people use standing desks or fidget tools...",
                },
                {
                  id: "q_ergonomics",
                  detailId: "q_ergonomics_detail",
                  label: "Ergonomics",
                  emoji: "💺",
                  hint: "Think about whether chairs, desks, screens, and equipment support healthy posture and comfortable working.",
                  detailPrompt: "Tell us more about ergonomics (optional)",
                  detailPlaceholder:
                    "e.g. Chairs are old and unsupportive, screens cannot be height-adjusted...",
                },
              ].map((q) => (
                <div
                  key={q.id}
                  className="bg-white rounded-2xl p-6 border border-brand-rose/20"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <span className="text-2xl">{q.emoji}</span>
                    <h2 className="font-playfair text-xl text-brand-dark">
                      {q.label}
                    </h2>
                  </div>
                  <ScoreSelect
                    id={q.id}
                    label="How would you rate this?"
                    hint={q.hint}
                    value={form[q.id as keyof FormData]}
                    onChange={set(q.id as keyof FormData)}
                    error={errors[q.id]}
                  />
                  <div className="mt-4">
                    <TextArea
                      id={q.detailId}
                      label={q.detailPrompt}
                      value={form[q.detailId as keyof FormData]}
                      onChange={set(q.detailId as keyof FormData)}
                      placeholder={q.detailPlaceholder}
                    />
                  </div>
                </div>
              ))}

              {/* Overall wellbeing */}
              <div className="bg-white rounded-2xl p-6 border border-brand-rose/20">
                <h2 className="font-playfair text-xl text-brand-dark mb-4">
                  Overall workplace wellbeing
                </h2>
                <div className="space-y-6">
                  <ScoreSelect
                    id="q_energy"
                    label="How energised do people tend to feel at the end of the working day?"
                    hint="1 = very drained, 5 = still have energy"
                    value={form.q_energy}
                    onChange={set("q_energy")}
                    error={errors.q_energy}
                  />
                  <ScoreSelect
                    id="q_stress"
                    label="How much does the physical environment contribute to workplace stress?"
                    hint="1 = major contributor, 5 = not a factor"
                    value={form.q_stress}
                    onChange={set("q_stress")}
                    error={errors.q_stress}
                  />
                  <ScoreSelect
                    id="q_productivity"
                    label="How well does the space support productive, focused work?"
                    hint="1 = actively hinders, 5 = strongly supports"
                    value={form.q_productivity}
                    onChange={set("q_productivity")}
                    error={errors.q_productivity}
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ---- STEP 5: Deeper questions ---- */}
        {step === 5 && (
          <div className="space-y-8">
            <div>
              <h1 className="font-playfair text-3xl text-brand-dark mb-2">
                A few deeper questions
              </h1>
              <p className="font-lora text-brand-dark/70">
                These questions give us the context to write a truly personalised report.
                Answer as much or as little as you like.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-8 border border-brand-rose/20 space-y-8">
              <TextArea
                id="q_loudest_times"
                label="When during the day is it loudest in your office?"
                value={form.q_loudest_times}
                onChange={set("q_loudest_times")}
                placeholder="e.g. Tuesday mornings when the full team is in, or between 11am and 1pm when calls overlap..."
                hint="This helps us understand your acoustic peaks and how to plan around them."
              />

              <TextArea
                id="q_avoided_spots"
                label="Are there any spots where nobody likes to sit? Which ones, and why?"
                value={form.q_avoided_spots}
                onChange={set("q_avoided_spots")}
                placeholder="e.g. The desk by the kitchen is too noisy and warm, the corner desk is too dark..."
                hint="Even if you are not sure why, naming the spots helps us analyse the photos for clues."
              />

              <TextArea
                id="q_favourite_spots"
                label="Are there any spots people prefer or always try to grab? Which ones, and why?"
                value={form.q_favourite_spots}
                onChange={set("q_favourite_spots")}
                placeholder="e.g. The window desk is always taken first, the sofa corner is popular for meetings..."
                hint="Understanding what works well helps us replicate it elsewhere in the space."
              />

              <TextArea
                id="q_specific_complaints"
                label="Are there specific complaints employees have made about the space?"
                value={form.q_specific_complaints}
                onChange={set("q_specific_complaints")}
                placeholder="e.g. Headaches from the lighting, back pain from the chairs, too hot, can never concentrate..."
                hint="Direct feedback from employees is the most valuable data we can receive."
              />

              <TextArea
                id="q_previous_attempts"
                label="Have you already tried to improve anything? What did or did not work?"
                value={form.q_previous_attempts}
                onChange={set("q_previous_attempts")}
                placeholder="e.g. We added plants but they died, we tried noise-cancelling headphones policy but it felt antisocial..."
                hint="Knowing what has been tried helps us avoid repeating it and build on what worked."
              />

              <TextArea
                id="q_sensory_needs"
                label="Are any of your employees open about having specific sensory needs or neurodivergence? (Optional)"
                value={form.q_sensory_needs}
                onChange={set("q_sensory_needs")}
                placeholder="e.g. We have two team members with ADHD who struggle with open-plan noise, one colleague is autistic and prefers a consistent routine and space, someone with HSP finds the fluorescent lighting draining..."
                hint="About 1 in 5 people is neurodivergent - including ADHD, autism, dyslexia, HSP, and others. Designing with this in mind helps everyone work better. Share only what feels comfortable - all information is confidential."
              />

              <TextArea
                id="q_top_priority"
                label="What is the single most important thing you want to improve?"
                value={form.q_top_priority}
                onChange={set("q_top_priority")}
                placeholder="e.g. I just want people to be able to concentrate, or we need better collaboration spaces..."
                required
                hint="One clear priority helps us focus your report and action plan on what matters most."
                error={errors.q_top_priority}
              />
            </div>

            {/* Summary before submit */}
            <div className="bg-brand-dark text-brand-cream rounded-2xl p-6">
              <h2 className="font-playfair text-xl mb-4">Ready to submit</h2>
              <div className="font-lora text-sm text-brand-cream/80 space-y-1">
                <p>Company: {form.companyName || "(not provided)"}</p>
                <p>Contact: {form.contactName} - {form.contactEmail}</p>
                <p>Photos: {photos.length} uploaded</p>
                <p>Floorplan: {floorplan ? floorplan.name : "Not uploaded"}</p>
              </div>
              <p className="font-lora text-xs text-brand-rose mt-4">
                After submitting, we will analyse your intake and deliver your personalised
                results page within 5 working days.
              </p>
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 rounded-xl p-4">
                <p className="text-red-700 font-lora text-sm">{error}</p>
              </div>
            )}
          </div>
        )}

        {/* Navigation */}
        <div className="mt-10 flex justify-between items-center">
          {step > 1 ? (
            <button
              type="button"
              onClick={prevStep}
              className="font-lora text-sm text-brand-dark/60 hover:text-brand-dark transition-colors px-4 py-2"
            >
              Back
            </button>
          ) : (
            <span />
          )}

          {step < TOTAL_STEPS ? (
            <button
              type="button"
              onClick={nextStep}
              className="bg-brand-dark text-brand-cream font-playfair text-lg px-8 py-4 rounded-xl hover:bg-brand-dark/90 transition-all"
            >
              Continue
            </button>
          ) : (
            <button
              type="button"
              onClick={handleSubmit}
              disabled={submitting}
              className="bg-brand-orange hover:bg-brand-orange/90 text-white font-playfair text-lg px-8 py-4 rounded-xl transition-all disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {submitting ? "Submitting..." : "Submit your intake"}
            </button>
          )}
        </div>
      </div>
    </main>
  );
}
