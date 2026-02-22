"use client";

import { useState } from "react";
import { 
  BarChart3, 
  ClipboardList, 
  Palette, 
  Ruler, 
  Link, 
  Camera,
  Lightbulb,
  Volume2,
  Thermometer,
  LayoutGrid,
  Target,
  Leaf,
  Sparkles,
  Armchair
} from "lucide-react";

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
            Fix Your Home Office Health in 5 Days
          </h1>
          <p className="text-brand-rose font-lora text-lg md:text-xl leading-relaxed mb-8">
            Stop the headaches, brain fog, and sensory overload. Get a professional audit, personalised action plan, and free implementation call — no expensive designer needed.
          </p>
          <div className="bg-brand-cream/10 rounded-2xl p-6 max-w-2xl mx-auto mb-8">
            <p className="font-lora text-brand-cream mb-4">Most people struggling with:</p>
            <div className="grid md:grid-cols-2 gap-3 text-left">
              <div className="flex items-start gap-2">
                <span className="text-brand-orange mt-1">✓</span>
                <span className="font-lora text-sm text-brand-rose">Afternoon headaches & eye strain</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-brand-orange mt-1">✓</span>
                <span className="font-lora text-sm text-brand-rose">Can't focus or get into flow</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-brand-orange mt-1">✓</span>
                <span className="font-lora text-sm text-brand-rose">Sensory overwhelm (ADHD/autism)</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-brand-orange mt-1">✓</span>
                <span className="font-lora text-sm text-brand-rose">Back/neck pain from poor setup</span>
              </div>
            </div>
            <p className="font-lora text-brand-cream mt-4 text-sm">
              ...don't need a designer. They need to understand <em>what their space is doing to them</em>.
            </p>
          </div>
          <div className="mt-8 flex flex-wrap justify-center gap-4 text-sm font-lora">
            <span className="bg-brand-green/20 px-4 py-2 rounded-full text-brand-green border border-brand-green/30">
              Results in 5 working days
            </span>
            <span className="bg-brand-cream/10 px-4 py-2 rounded-full">
              Free 30-min implementation call
            </span>
            <span className="bg-brand-cream/10 px-4 py-2 rounded-full">
              DIY action plan included
            </span>
          </div>
        </div>
      </section>

      {/* What you get */}
      <section className="py-16 px-6 bg-brand-cream">
        <div className="max-w-3xl mx-auto">
          <h2 className="font-playfair text-3xl text-brand-dark mb-4 text-center">
            What you get for €97
          </h2>
          <p className="text-center font-lora text-brand-dark/60 mb-10 max-w-2xl mx-auto">
            Everything you need to fix your workspace health yourself — no designer, no guesswork, no ongoing costs.
          </p>
          <div className="grid md:grid-cols-2 gap-6">
            {[
              {
                icon: BarChart3,
                title: "Your workspace health score",
                desc: "Eight categories scored (lighting, acoustics, ergonomics, sensory comfort, etc). See exactly what's draining your energy and focus.",
              },
              {
                icon: ClipboardList,
                title: "Prioritised action plan",
                desc: "Quick wins under €100, medium-term fixes, and long-term improvements — all with cost estimates so you can budget and execute yourself.",
              },
              {
                icon: Camera,
                title: "Photo-based diagnosis",
                desc: "I analyse your actual space to spot issues you've normalized: glare, poor posture, sensory triggers, and ergonomic problems.",
              },
              {
                icon: Palette,
                title: "Neuro-friendly colour palettes",
                desc: "Personalised colour recommendations (with Farrow & Ball references and hex codes) chosen for your sensory needs and space challenges.",
              },
              {
                icon: Ruler,
                title: "Layout optimization guide",
                desc: "Spatial layout examples from my library showing how to rearrange for better flow, focus zones, and reduced distractions.",
              },
              {
                icon: Link,
                title: "Interactive results page",
                desc: "Your personal dashboard with scores, checkable action items, and palettes — stays live for 1 year so you can work through it at your pace.",
              },
            ].map((item) => {
              const IconComponent = item.icon;
              return (
                <div
                  key={item.title}
                  className="bg-white rounded-xl p-6 border border-brand-rose/30"
                >
                  <IconComponent className="w-8 h-8 text-brand-green mb-3" strokeWidth={1.5} />
                  <h3 className="font-playfair text-lg text-brand-dark mb-2">
                    {item.title}
                  </h3>
                  <p className="text-brand-dark/70 font-lora text-sm leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              );
            })}
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
              { label: "Lighting", icon: Lightbulb },
              { label: "Acoustics", icon: Volume2 },
              { label: "Temperature and Air", icon: Thermometer },
              { label: "Space and Layout", icon: LayoutGrid },
              { label: "Privacy and Focus", icon: Target },
              { label: "Biophilia and Nature", icon: Leaf },
              { label: "Sensory Comfort", icon: Sparkles },
              { label: "Ergonomics", icon: Armchair },
            ].map((cat) => {
              const IconComponent = cat.icon;
              return (
                <div
                  key={cat.label}
                  className="bg-brand-cream/10 rounded-lg p-4 text-center"
                >
                  <IconComponent className="w-7 h-7 text-brand-rose mx-auto mb-2" strokeWidth={1.5} />
                  <span className="font-lora text-sm text-brand-rose">
                    {cat.label}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Why not a designer */}
      <section className="py-16 px-6 bg-brand-cream">
        <div className="max-w-3xl mx-auto">
          <h2 className="font-playfair text-3xl text-brand-dark mb-8 text-center">
            Why not just hire a designer?
          </h2>
          <div className="bg-white rounded-2xl p-8 border border-brand-rose/20 space-y-6">
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="font-playfair text-xl text-brand-dark mb-3">Most designers will:</h3>
                <ul className="space-y-2 font-lora text-sm text-brand-dark/70">
                  <li className="flex items-start gap-2">
                    <span className="text-red-500 mt-1">✗</span>
                    <span>Charge €500-2000+ for a consultation</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-500 mt-1">✗</span>
                    <span>Focus on aesthetics over health</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-500 mt-1">✗</span>
                    <span>Not understand neurodivergence</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-500 mt-1">✗</span>
                    <span>Push expensive renovations</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-500 mt-1">✗</span>
                    <span>Leave you dependent on their taste</span>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="font-playfair text-xl text-brand-dark mb-3">With this audit you get:</h3>
                <ul className="space-y-2 font-lora text-sm text-brand-dark/70">
                  <li className="flex items-start gap-2">
                    <span className="text-brand-green mt-1">✓</span>
                    <span>€97 total — no ongoing costs</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-brand-green mt-1">✓</span>
                    <span>Health and neuroscience-based</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-brand-green mt-1">✓</span>
                    <span>Designed for ADHD/autism/HSP</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-brand-green mt-1">✓</span>
                    <span>DIY action plan you control</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-brand-green mt-1">✓</span>
                    <span>Become your own expert</span>
                  </li>
                </ul>
              </div>
            </div>
            <div className="bg-brand-green/10 rounded-xl p-6 mt-6">
              <p className="font-lora text-brand-dark/80 text-center italic">
                "I was quoted €1,200 by an interior designer who wanted to repaint everything. Elianne showed me three €50 changes that fixed my afternoon headaches and made my ADHD brain actually work in my office. I did it all myself in one weekend." <br/>
                <span className="text-sm not-italic text-brand-dark/60 mt-2 block">— Lisa, graphic designer</span>
              </p>
            </div>
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
                className="w-full bg-brand-orange hover:bg-brand-orange/90 text-white font-playfair text-lg py-4 rounded-xl transition-all disabled:opacity-60 disabled:cursor-not-allowed shadow-lg"
              >
                {loading ? "Preparing checkout..." : "Get My Audit + Free Call (€97)"}
              </button>

              <p className="text-center text-xs text-brand-dark/50 font-lora mt-4">
                Secure payment via Stripe. iDEAL, credit card, and Bancontact accepted.
              </p>
              <p className="text-center text-xs text-brand-green font-lora mt-2 font-medium">
                ✓ Results in 5 working days · ✓ 30-min call included · ✓ No subscription
              </p>
            </form>
          </div>

          {/* Value Stack + Bonus */}
          <div className="mt-8 space-y-4">
            {/* Value breakdown */}
            <div className="bg-white rounded-xl p-6 border border-brand-rose/20">
              <p className="font-playfair text-brand-dark text-lg mb-4 text-center">What you're actually getting:</p>
              <div className="space-y-2 font-lora text-sm">
                <div className="flex justify-between items-center pb-2">
                  <span className="text-brand-dark/70">Professional workspace health audit</span>
                  <span className="font-medium text-brand-dark">€197</span>
                </div>
                <div className="flex justify-between items-center pb-2">
                  <span className="text-brand-dark/70">Personalised action plan with costs</span>
                  <span className="font-medium text-brand-dark">€95</span>
                </div>
                <div className="flex justify-between items-center pb-2">
                  <span className="text-brand-dark/70">Neuro-friendly design guidance</span>
                  <span className="font-medium text-brand-dark">€75</span>
                </div>
                <div className="flex justify-between items-center pb-2 border-b border-brand-rose/20">
                  <span className="text-brand-dark/70">30-min implementation call</span>
                  <span className="font-medium text-brand-dark">€95</span>
                </div>
                <div className="flex justify-between items-center pt-2">
                  <span className="font-playfair text-brand-dark text-lg">Total value:</span>
                  <span className="font-playfair text-brand-dark text-xl line-through opacity-50">€462</span>
                </div>
                <div className="flex justify-between items-center bg-brand-green/10 rounded-lg px-4 py-3 -mx-2">
                  <span className="font-playfair text-brand-dark text-lg">You pay:</span>
                  <span className="font-playfair text-brand-green text-2xl font-bold">€97</span>
                </div>
              </div>
            </div>

            {/* Bonus call details */}
            <div className="bg-brand-orange/10 border-2 border-brand-orange/30 rounded-xl p-6 text-center">
              <p className="font-playfair text-brand-dark text-xl mb-2">
                🎁 Free 30-Minute Implementation Call
              </p>
              <p className="font-lora text-sm text-brand-dark/70 mb-3">
                After you receive your audit results, book your complimentary call. I'll help you:
              </p>
              <ul className="text-left font-lora text-sm text-brand-dark/80 space-y-2 max-w-md mx-auto mb-4">
                <li className="flex items-start gap-2">
                  <span className="text-brand-orange mt-1">✓</span>
                  <span>Choose the right products and brands</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-brand-orange mt-1">✓</span>
                  <span>Prioritize your action plan based on budget</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-brand-orange mt-1">✓</span>
                  <span>Answer questions about implementation</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-brand-orange mt-1">✓</span>
                  <span>Avoid expensive mistakes</span>
                </li>
              </ul>
              <a
                href="https://calendly.com/hello-spatial-wellness"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block bg-brand-orange hover:bg-brand-orange/90 text-white font-playfair px-6 py-3 rounded-lg transition-all mb-3"
              >
                Preview Available Times →
              </a>
              <p className="font-lora text-xs text-brand-dark/60 italic">
                This is normally €95. You get it free when you book within 7 days of receiving your results.
              </p>
            </div>
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
                title: "Book your audit (€97)",
                desc: "Secure checkout via Stripe. You'll receive an email with your intake form link immediately.",
              },
              {
                step: "2",
                title: "Submit your workspace details",
                desc: "Fill in the questionnaire (15 mins) and upload 8+ photos of your home office. Take your time — you can save and return.",
              },
              {
                step: "3",
                title: "I analyse your space",
                desc: "I review your photos and answers against eight health categories: lighting, acoustics, ergonomics, sensory comfort, and more.",
              },
              {
                step: "4",
                title: "Get your results (5 working days)",
                desc: "You receive a link to your personal results page: health scores, action plan with costs, colour palettes, and layout suggestions.",
              },
              {
                step: "5",
                title: "Book your free 30-min call",
                desc: "Within 7 days of receiving your results, use your personal Calendly link to schedule your complimentary implementation call. I'll help you prioritize, choose products, and avoid mistakes.",
              },
              {
                step: "6",
                title: "Execute at your own pace",
                desc: "Work through your action plan yourself. Your results page stays live for 1 year so you can check items off as you go.",
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
