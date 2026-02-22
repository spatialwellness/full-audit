"use client";

import { useState } from "react";

export default function HomePage() {
  const [email, setEmail] = useState("");
  const [discountCode, setDiscountCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleCheckout = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, discountCode }),
      });

      const data = await res.json();

      if (data.unavailable) {
        // Stripe not configured - redirect to intake directly
        window.location.href = "/intake";
        return;
      }

      if (data.url) {
        window.location.href = data.url;
      } else {
        setError("Something went wrong. Please try again or email hello@houseofreturn.nl");
      }
    } catch {
      setError("Connection error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main>
      {/* Hero */}
      <section className="bg-brand-dark text-brand-cream py-20 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-brand-orange font-lora text-sm tracking-widest uppercase mb-4">
            Spatial Wellness
          </p>
          <h1 className="font-playfair text-4xl md:text-5xl lg:text-6xl mb-6">
            Full Home Office Audit
          </h1>
          <p className="text-brand-rose font-lora text-lg md:text-xl leading-relaxed">
            A comprehensive analysis of your home office environment.
            Eight categories. Personalised scores. A concrete action plan.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4 text-sm font-lora">
            <span className="bg-brand-cream/10 px-4 py-2 rounded-full">
              5 working day turnaround
            </span>
            <span className="bg-brand-cream/10 px-4 py-2 rounded-full">
              Up to 150m2 or 3 spaces
            </span>
            <span className="bg-brand-cream/10 px-4 py-2 rounded-full">
              Results page stays live 1 year
            </span>
          </div>
        </div>
      </section>

      {/* What you get */}
      <section className="py-16 px-6 bg-brand-cream">
        <div className="max-w-3xl mx-auto">
          <h2 className="font-playfair text-3xl text-brand-dark mb-10 text-center">
            What you receive
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            {[
              {
                icon: "📊",
                title: "8-category scored analysis",
                desc: "Lighting, acoustics, temperature, layout, privacy, biophilia, sensory comfort, and ergonomics - each scored and explained.",
              },
              {
                icon: "📋",
                title: "Phased action plan",
                desc: "Quick wins under 100 euros, medium-term improvements, and longer-term investments - all with estimated costs.",
              },
              {
                icon: "🎨",
                title: "Colour palette recommendations",
                desc: "Farrow and Ball-referenced palettes with hex codes and RAL equivalents, chosen for your specific space and challenges.",
              },
              {
                icon: "📐",
                title: "Layout suggestions",
                desc: "Two or three relevant spatial layout examples from our library, with diagrams and explanations of why they work.",
              },
              {
                icon: "🔗",
                title: "Personal results page",
                desc: "An interactive page with your scores, a checkable action list, and colour palettes - live for at least one year.",
              },
              {
                icon: "📸",
                title: "Photo-based insights",
                desc: "We analyse your photos to identify specific issues and opportunities in your actual space.",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="bg-white rounded-xl p-6 border border-brand-rose/30"
              >
                <span className="text-2xl mb-3 block">{item.icon}</span>
                <h3 className="font-playfair text-lg text-brand-dark mb-2">
                  {item.title}
                </h3>
                <p className="text-brand-dark/70 font-lora text-sm leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Eight categories */}
      <section className="py-16 px-6 bg-brand-dark text-brand-cream">
        <div className="max-w-3xl mx-auto">
          <h2 className="font-playfair text-3xl mb-10 text-center">
            Eight categories, one complete picture
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { label: "Lighting", emoji: "💡" },
              { label: "Acoustics", emoji: "🔊" },
              { label: "Temperature and Air", emoji: "🌡️" },
              { label: "Space and Layout", emoji: "📐" },
              { label: "Privacy and Focus", emoji: "🎯" },
              { label: "Biophilia and Nature", emoji: "🌿" },
              { label: "Sensory Comfort", emoji: "✨" },
              { label: "Ergonomics", emoji: "💺" },
            ].map((cat) => (
              <div
                key={cat.label}
                className="bg-brand-cream/10 rounded-lg p-4 text-center"
              >
                <span className="text-2xl block mb-2">{cat.emoji}</span>
                <span className="font-lora text-sm text-brand-rose">
                  {cat.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Checkout section */}
      <section className="py-20 px-6 bg-brand-cream" id="book">
        <div className="max-w-lg mx-auto">
          <div className="bg-white rounded-2xl shadow-sm border border-brand-rose/30 overflow-hidden">
            <div className="bg-brand-dark px-8 py-6 text-center">
              <p className="text-brand-rose font-lora text-sm uppercase tracking-widest mb-1">
                Full Home Office Audit
              </p>
              <div className="text-brand-cream">
                <span className="font-playfair text-5xl">€97</span>
                <span className="font-lora text-brand-rose ml-2">one-time</span>
              </div>
            </div>

            <form onSubmit={handleCheckout} className="p-8">
              <div className="mb-5">
                <label
                  htmlFor="email"
                  className="block font-lora text-sm text-brand-dark/70 mb-2"
                >
                  Your email address
                </label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  placeholder="you@yourcompany.com"
                  className="w-full border border-brand-rose/40 rounded-lg px-4 py-3 font-lora text-brand-dark bg-brand-cream/50 focus:outline-none focus:ring-2 focus:ring-brand-orange"
                />
              </div>

              <div className="mb-6">
                <label
                  htmlFor="code"
                  className="block font-lora text-sm text-brand-dark/70 mb-2"
                >
                  Discount code (optional)
                </label>
                <input
                  type="text"
                  id="code"
                  value={discountCode}
                  onChange={(e) => setDiscountCode(e.target.value.toUpperCase())}
                  placeholder="e.g. LITE30"
                  className="w-full border border-brand-rose/40 rounded-lg px-4 py-3 font-lora text-brand-dark bg-brand-cream/50 focus:outline-none focus:ring-2 focus:ring-brand-orange uppercase"
                />
                <p className="text-xs text-brand-dark/50 font-lora mt-1">
                  Used the Lite Audit? Enter LITE30 for a 30 euro discount, valid 7 days after your Lite results.
                </p>
              </div>

              {error && (
                <p className="text-red-600 font-lora text-sm mb-4 bg-red-50 rounded-lg p-3">
                  {error}
                </p>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-brand-orange hover:bg-brand-orange/90 text-white font-playfair text-lg py-4 rounded-xl transition-all disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {loading ? "Preparing checkout..." : "Book your Full Audit"}
              </button>

              <p className="text-center text-xs text-brand-dark/50 font-lora mt-4">
                Secure payment via Stripe. iDEAL, credit card, and Bancontact accepted.
              </p>
            </form>
          </div>

          {/* Add-on */}
          <div className="mt-6 bg-brand-green/10 border border-brand-green/30 rounded-xl p-5 text-center">
            <p className="font-playfair text-brand-dark text-lg mb-1">
              Add a 30-minute implementation call
            </p>
            <p className="font-lora text-sm text-brand-dark/70 mb-2">
              Personal guidance on your action plan, product sourcing, and phased rollout.
            </p>
            <p className="font-playfair text-brand-green text-xl">+75-95 euro</p>
            <p className="font-lora text-xs text-brand-dark/50 mt-1">
              Add at checkout or book separately after receiving your report.
            </p>
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="py-16 px-6 bg-brand-rose/20">
        <div className="max-w-3xl mx-auto">
          <h2 className="font-playfair text-3xl text-brand-dark mb-10 text-center">
            How it works
          </h2>
          <div className="space-y-4">
            {[
              {
                step: "1",
                title: "Book and pay",
                desc: "Complete checkout. You receive an email confirmation immediately.",
              },
              {
                step: "2",
                title: "Complete the intake form",
                desc: "Fill in the questionnaire and upload at least 8 photos of your space. The form is designed to be completed at your own pace.",
              },
              {
                step: "3",
                title: "We analyse your space",
                desc: "Your photos and answers are reviewed in depth against the eight wellness categories.",
              },
              {
                step: "4",
                title: "Receive your results",
                desc: "Within 5 working days, you receive a link to your personalised results page with scores, palettes, layout ideas, and a prioritised action plan.",
              },
              {
                step: "5",
                title: "Take action",
                desc: "Work through your interactive checklist at your own pace. Optionally book a call for hands-on support.",
              },
            ].map((item) => (
              <div key={item.step} className="flex gap-5 items-start bg-white rounded-xl p-5 border border-brand-rose/20">
                <div className="w-10 h-10 rounded-full bg-brand-dark text-brand-cream font-playfair text-lg flex items-center justify-center flex-shrink-0">
                  {item.step}
                </div>
                <div>
                  <h3 className="font-playfair text-brand-dark text-lg mb-1">
                    {item.title}
                  </h3>
                  <p className="font-lora text-sm text-brand-dark/70">
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
