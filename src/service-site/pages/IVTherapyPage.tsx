import { useState } from "react";
import { Reveal } from "@/components/Reveal";
import { Button } from "@/components/ui/button";
import { Footer } from "@/components/sections/Footer";
import { Navigation } from "@/components/sections/Navigation";
import { BookingForm } from "@/components/sections/BookingForm";
import { MetaTags } from "@/components/MetaTags";
import { ArrowRight, ChevronDown, ChevronUp } from "lucide-react";

/* ─────────────────────────────────────────────────────────────────
   Constants
   AIWO-OPEN-FLAG-1: Confirm WA number +91 86820 86820 with Ops
───────────────────────────────────────────────────────────────── */


const scrollTo =
  (id: string) => (e: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement>) => {
    e.preventDefault();
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

/* ─────────────────────────────────────────────────────────────────
   IV Drip visual (SVG — no OEM/stock images)
───────────────────────────────────────────────────────────────── */

function IVVisualSVG() {
  return (
    <svg
      viewBox="0 0 400 440"
      className="w-full h-full"
      aria-label="AIWO IV therapy clinical infusion setup at Fairmont Mumbai"
    >
      <rect width="400" height="440" fill="#000" />

      {/* Header strip */}
      <text x="20" y="28" fill="white" fillOpacity="0.22" fontFamily="monospace" fontSize="7" letterSpacing="2">
        AIWO IV THERAPY · CLINICAL INFUSION · FAIRMONT MUMBAI
      </text>
      <line x1="20" y1="36" x2="380" y2="36" stroke="rgba(255,255,255,0.08)" strokeWidth="1" />

      {/* Absorption comparison */}
      <text x="20" y="56" fill="white" fillOpacity="0.2" fontFamily="monospace" fontSize="7" letterSpacing="2">ABSORPTION COMPARISON</text>

      <text x="20" y="80" fill="white" fillOpacity="0.35" fontFamily="monospace" fontSize="7">ORAL SUPPLEMENTS</text>
      <rect x="20" y="85" width="360" height="10" fill="rgba(255,255,255,0.05)" />
      <rect x="20" y="85" width="72" height="10" fill="rgba(255,255,255,0.25)" />
      <text x="98" y="93" fill="white" fillOpacity="0.3" fontFamily="monospace" fontSize="7">10–30%</text>

      <text x="20" y="114" fill="white" fillOpacity="0.8" fontFamily="monospace" fontSize="7" letterSpacing="1">AIWO IV THERAPY</text>
      <rect x="20" y="119" width="360" height="10" fill="rgba(255,255,255,0.06)" />
      <rect x="20" y="119" width="352" height="10" fill="rgba(255,255,255,0.75)" />
      <text x="378" y="127" fill="white" fillOpacity="0.9" fontFamily="monospace" fontSize="7" textAnchor="end">~100%</text>

      <line x1="20" y1="142" x2="380" y2="142" stroke="rgba(255,255,255,0.06)" strokeWidth="1" />

      {/* Formulation grid */}
      <text x="20" y="158" fill="white" fillOpacity="0.2" fontFamily="monospace" fontSize="7" letterSpacing="2">FORMULATION MENU</text>

      {[
        { id: "IV-01", name: "Mega Glow Therapy IV", tag: "SKIN · RADIANCE", time: "45 min" },
        { id: "IV-02", name: "Memory Booster IV", tag: "COGNITIVE · UNIQUE", time: "30 min" },
        { id: "IV-03", name: "Metabolic Booster IV", tag: "METABOLIC · RECOVERY", time: "30 min" },
        { id: "IV-04", name: "Immunity Booster IV", tag: "IMMUNITY · RESPIRATORY", time: "45 min" },
      ].map((f, i) => {
        const y = 168 + i * 64;
        return (
          <g key={f.id}>
            <rect x="20" y={y} width="360" height="52" fill="rgba(255,255,255,0.03)" stroke="rgba(255,255,255,0.07)" strokeWidth="0.5" />
            <text x="30" y={y + 14} fill="white" fillOpacity="0.3" fontFamily="monospace" fontSize="7" letterSpacing="1">{f.id}</text>
            <text x="80" y={y + 14} fill="white" fillOpacity="0.18" fontFamily="monospace" fontSize="6.5" letterSpacing="0.5">[{f.tag}]</text>
            <text x="30" y={y + 30} fill="white" fillOpacity="0.7" fontFamily="serif" fontSize="11">{f.name}</text>
            <text x="30" y={y + 44} fill="white" fillOpacity="0.2" fontFamily="monospace" fontSize="6.5" letterSpacing="0.5">{f.time} per session · Physician-supervised</text>
          </g>
        );
      })}
    </svg>
  );
}

/* ─────────────────────────────────────────────────────────────────
   Top bar
───────────────────────────────────────────────────────────────── */

/* ─────────────────────────────────────────────────────────────────
   SECTION 1 — HERO
───────────────────────────────────────────────────────────────── */

function Hero() {
  return (
    <section className="relative bg-white border-b border-border overflow-hidden">
      <div className="absolute inset-0 clinical-grid opacity-50" />
      <div className="container mx-auto px-4 sm:px-6 max-w-7xl relative py-12 lg:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">

          {/* Left — copy */}
          <div className="lg:col-span-7">
            <Reveal>
              <div className="inline-flex items-center gap-2 mb-5">
                <span className="w-2 h-2 bg-black shrink-0" aria-hidden />
                <span className="font-mono text-[10px] sm:text-xs font-bold uppercase tracking-widest">
                  AIWO IV THERAPY
                </span>
              </div>
            </Reveal>

            <Reveal delay={0.08}>
              <h1 className="font-serif text-[36px] sm:text-[50px] lg:text-[64px] leading-[1.0] tracking-tight text-foreground mb-5 lg:mb-7">
                Absolute absorption.
                <br />
                <span className="italic text-muted-foreground">Zero waste.</span>
              </h1>
            </Reveal>

            <Reveal delay={0.14}>
              <p className="text-base lg:text-lg text-muted-foreground leading-relaxed max-w-lg mb-8 lg:mb-10">
                Oral supplements deliver 10–30% of what's on the label. IV therapy delivers nearly all of it — directly into your bloodstream, in 30 minutes, under physician supervision.
              </p>
            </Reveal>

            <Reveal delay={0.22}>
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6 mb-5">
                <Button
                  onClick={scrollTo("book")}
                  className="bg-black hover:bg-black/90 text-white rounded-none h-12 lg:h-14 px-6 lg:px-8 font-medium text-base w-full sm:w-auto"
                >
                  <span className="inline-flex items-center justify-center gap-2">
                    Book Consultation <ArrowRight className="w-4 h-4 lg:w-5 lg:h-5" />
                  </span>
                </Button>
              </div>
            </Reveal>
          </div>

          {/* Right — IV visual */}
          <div className="lg:col-span-5">
            <Reveal delay={0.28} direction="none">
              <div className="aspect-[10/11] bg-black overflow-hidden border border-border w-full max-w-sm mx-auto lg:max-w-none">
                <IVVisualSVG />
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────────────
   SECTION 2 — WHY IT MATTERS (4 case cards)
───────────────────────────────────────────────────────────────── */

const caseCards = [
  {
    n: "CASE 01 · EXECUTIVE FATIGUE",
    headline: "Six supplements every morning. Your body absorbs two.",
    body: "You sleep seven hours and wake up depleted. You've tried B12 tablets, magnesium, multivitamins. Some of it is working. Most of it is leaving your body unused. IV bypasses the gut entirely.",
  },
  {
    n: "CASE 02 · DULLNESS AT CELLULAR LEVEL",
    headline: "Your skincare works on the surface. The dullness is cellular.",
    body: "Topicals address the outer layer. Glutathione — your body's master antioxidant — depletes from the inside, faster after age 30. Oral glutathione is poorly absorbed. IV delivery is the only consumer route that reaches therapeutic plasma levels.",
  },
  {
    n: "CASE 03 · COGNITIVE SHARPNESS",
    headline: "You are still sharp. You are also slower than you used to be.",
    body: "Recall fades. Sugar and HIIT-tasking make you feel sharper in the moment, then harder. Cognitive decline does not arrive announced — it arrives quietly. AIWO's Memory Booster IV (Citicholine + Piracetam) is formulated to support brain energy metabolism. Almost nowhere else in India offers this protocol commercially.",
  },
  {
    n: "CASE 04 · IMMUNE LOAD",
    headline: "You catch every flu in the office.",
    body: "Frequent infection is not bad luck. It is your immune system telling you it has nothing left to work with. Therapeutic-dose IV Vitamin C and NAC reach immune cell function levels that oral intake cannot safely match.",
  },
];

function WhyItMatters() {
  return (
    <section id="why-it-matters" className="py-16 lg:py-24 bg-white border-b border-border">
      <div className="container mx-auto px-4 sm:px-6 max-w-7xl">

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-12 mb-10 lg:mb-14">
          <div className="lg:col-span-6">
            <Reveal>
              <div className="font-mono text-[10px] sm:text-xs font-bold uppercase tracking-widest text-muted-foreground mb-4">
                WHY THIS MATTERS
              </div>
              <h2 className="font-serif text-2xl sm:text-4xl lg:text-5xl leading-[1.05] text-foreground">
                Your supplements are working harder
                <br />
                <span className="italic text-muted-foreground">than your cells are receiving.</span>
              </h2>
            </Reveal>
          </div>
          <div className="lg:col-span-5 lg:col-start-8 lg:flex lg:items-end">
            <Reveal delay={0.1}>
              <p className="text-base lg:text-lg text-muted-foreground leading-relaxed">
                The bottle says 1000mg of Vitamin C. By the time it reaches your bloodstream, your gut has eliminated 70–90% of it. Multiply that across every supplement you take, every day, for years. The gap between what you spend on nutrition and what your body actually uses is what IV therapy closes.
              </p>
            </Reveal>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-px bg-border border border-border">
          {caseCards.map((card, i) => (
            <Reveal key={card.n} delay={i * 0.06}>
              <div className="bg-white p-6 lg:p-10 h-full">
                <div className="font-mono text-[10px] sm:text-xs uppercase tracking-widest text-muted-foreground mb-3">
                  {card.n}
                </div>
                <h3 className="font-serif text-lg sm:text-xl lg:text-2xl leading-snug text-foreground mb-3">
                  "{card.headline}"
                </h3>
                <p className="text-sm lg:text-[15px] text-muted-foreground leading-relaxed">
                  {card.body}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────────────
   SECTION 3 — CLINICAL CREDIBILITY STRIP
───────────────────────────────────────────────────────────────── */

function TechStrip() {
  const signals = [
    { icon: "⊕", label: "Physician-supervised · Nurse-administered", detail: "Every infusion · Every client · No exceptions" },
    { icon: "◈", label: "Pharmaceutical-grade sourcing", detail: "Every formulation · No compromises" },
    { icon: "◉", label: "Programme-based protocols", detail: "Informed consent before every infusion" },
  ];

  return (
    <section className="py-8 lg:py-10 bg-black text-white border-b border-black">
      <div className="container mx-auto px-4 sm:px-6 max-w-7xl">
        <div className="font-mono text-[10px] uppercase tracking-widest text-white/40 mb-5 text-center sm:text-left">
          CLINICAL STANDARD
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x divide-white/10">
          {signals.map((s) => (
            <div key={s.label} className="flex items-center gap-4 py-4 sm:py-0 sm:px-8 first:sm:pl-0 last:sm:pr-0">
              <span className="font-mono text-2xl text-white/40 shrink-0" aria-hidden>{s.icon}</span>
              <div>
                <div className="font-mono text-xs sm:text-sm font-bold text-white tracking-widest leading-snug">
                  {s.label}
                </div>
                {s.detail && (
                  <div className="font-mono text-[11px] text-white/40 tracking-widest mt-0.5">
                    {s.detail}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────────────
   SECTION 4 — FORMULATION MENU
───────────────────────────────────────────────────────────────── */

const ivCards = [
  {
    id: "IV-01",
    tag: "SKIN · RADIANCE",
    name: "Mega Glow Therapy IV",
    body: "Vitamin C, NAC, Glutathione (with oral Glycine support). 45-minute session. Formulated to support skin radiance, immune function, and reduction in pigmentation and fine lines.",
    programme: "Once weekly for 12 weeks.",
  },
  {
    id: "IV-02",
    tag: "COGNITIVE · UNIQUE",
    name: "Memory Booster IV",
    body: "Citicoline + Piracetam. 30-minute session. Formulated to support cognitive performance, brain energy metabolism, and protection from oxidative stress and inflammation. Rare in India's commercial wellness market.",
    programme: "Once weekly for 6 weeks.",
  },
  {
    id: "IV-03",
    tag: "METABOLIC · RECOVERY",
    name: "Metabolic Booster IV",
    body: "Vitamin C, NAC, L-Carnitine, Vitamin B12. 30-minute session. Formulated to support enhanced muscle function, stroke recovery, and promotion of collagen synthesis.",
    programme: "Once weekly for 12 weeks.",
  },
  {
    id: "IV-04",
    tag: "IMMUNITY · RESPIRATORY",
    name: "Immunity Booster IV",
    body: "Vitamin C, NAC (with oral Glycine support). 45-minute session. Formulated to support immune function and respiratory health. Promotes energy levels.",
    programme: "Once weekly for 12 weeks.",
  },
];

const additionalCards = [
  {
    id: "IV-05",
    tag: "NEUROLOGICAL · IM",
    name: "Cerebrolysin IM",
    body: "Peptides + Amino acids (Cerebrolysin). 5-minute injection · 10 doses on alternate days over a 20-day cycle. Neuroprotective peptide formulation. Supports neuroplasticity, cognitive recovery, and brain energy metabolism.",
    programme: "10 doses on alternate days (20-day cycle).",
  },
  {
    id: "IV-06",
    tag: "NEUROLOGICAL · IV/IM",
    name: "Vitamin B1 IV/IM",
    body: "Thiamine hydrochloride. 5-minute injection. Supports neurological function, energy metabolism, and cardiovascular health. Addresses thiamine-related cognitive fog and metabolic compromise.",
    programme: "Once weekly for 12 weeks.",
  },
  {
    id: "IV-07",
    tag: "ENERGY · IV/IM",
    name: "Vitamin B12 IV/IM",
    body: "Methylcobalamin (active B12). 5-minute injection. Bypasses gut absorption for complete delivery. Supports neurological health, red blood cell formation, and energy production.",
    programme: "Once weekly for 7 weeks.",
  },
  {
    id: "IV-08",
    tag: "IMMUNITY · IM",
    name: "Vitamin D3 IM",
    body: "High-dose intramuscular Vitamin D3. 5-minute injection. Rapid repletion of deficiency. Supports immune function, bone health, and hormonal balance. Start dose followed by oral maintenance protocol.",
    programme: "Start dose + oral maintenance.",
  },
];

function FormulationMenu() {
  return (
    <section id="what-it-delivers" className="py-16 lg:py-24 bg-white border-b border-border">
      <div className="container mx-auto px-4 sm:px-6 max-w-7xl">

        <div className="mb-10 lg:mb-14">
          <Reveal>
            <div className="font-mono text-[10px] sm:text-xs font-bold uppercase tracking-widest text-muted-foreground mb-2">
              PROTOCOL-BASED · NOT MENU-BASED
            </div>
            <h2 className="font-serif text-2xl sm:text-4xl lg:text-5xl leading-[1.05] text-foreground">
              Eight formulations
              <br />
              <span className="italic text-muted-foreground">One clinical standard</span>
            </h2>
          </Reveal>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">

          {/* Left — mechanism + metric */}
          <div className="lg:col-span-4">
            <Reveal delay={0.05}>
              <p className="text-base lg:text-[15px] text-muted-foreground leading-relaxed mb-8">
                IV therapy infuses nutrients directly into your venous circulation. Your gut, your liver's first-pass metabolism, and your digestive enzyme load are all bypassed. The result is that nearly the full dose of the formulation reaches your bloodstream — and from there, your cells — within minutes. AIWO's IV protocols are designed as 6–12 week programmes, not one-off sessions. The cellular changes IV supports build consistently over time.
              </p>
            </Reveal>
            <Reveal delay={0.1}>
              <div className="border border-border p-6 lg:p-8">
                <div className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground mb-4">
                  BLOODSTREAM DELIVERY
                </div>
                <div className="font-serif text-5xl lg:text-6xl text-foreground mb-1">10×</div>
                <div className="font-mono text-xs uppercase tracking-widest text-foreground mb-4 leading-snug">
                  THE BLOODSTREAM DELIVERY
                  <br />
                  OF ORAL SUPPLEMENTS
                </div>
                <div className="border-t border-border pt-4">
                  <p className="font-mono text-[11px] text-muted-foreground tracking-widest leading-relaxed">
                    Pharmacokinetic comparison of IV vs oral nutrient administration. Verifiable across published literature.
                  </p>
                </div>
              </div>
            </Reveal>
          </div>

          {/* Right — 4 IV formulation cards */}
          <div className="lg:col-span-7 lg:col-start-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-px bg-border border border-border">
              {ivCards.map((card, i) => (
                <Reveal key={card.id} delay={i * 0.06}>
                  <div className="bg-white p-5 lg:p-7 h-full">
                    <div className="flex items-center justify-between gap-3 mb-3">
                      <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                        {card.id}
                      </span>
                      <span className="font-mono text-[9px] uppercase tracking-widest border border-border px-2 py-0.5 text-muted-foreground shrink-0">
                        {card.tag}
                      </span>
                    </div>
                    <h3 className="font-serif text-base lg:text-lg text-foreground mb-2 leading-snug">
                      {card.name}
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed mb-3">
                      {card.body}
                    </p>
                    <div className="font-mono text-[10px] text-muted-foreground/60 tracking-widest border-t border-border pt-3">
                      Programme: {card.programme}
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
            <Reveal delay={0.1}>
              <div className="border border-border border-t-0 p-4 lg:p-5 bg-[#fafafa]">
                <p className="font-mono text-[10px] text-muted-foreground tracking-widest leading-relaxed">
                  <span className="font-bold text-foreground">Also includes:</span> NAD+ IV (specialised · confirm with clinical team before scheduling). Discussed at consultation.
                </p>
              </div>
            </Reveal>
          </div>
        </div>

        {/* Additional formulations — IM/IV single-nutrient */}
        <div className="mt-10 lg:mt-14">
          <Reveal>
            <div className="font-mono text-[10px] sm:text-xs font-bold uppercase tracking-widest text-muted-foreground mb-6">
              ADDITIONAL FORMULATIONS · IM / IV
            </div>
          </Reveal>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-border border border-border">
            {additionalCards.map((card, i) => (
              <Reveal key={card.id} delay={i * 0.06}>
                <div className="bg-white p-5 lg:p-7 h-full">
                  <div className="flex items-center justify-between gap-3 mb-3">
                    <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                      {card.id}
                    </span>
                    <span className="font-mono text-[9px] uppercase tracking-widest border border-border px-2 py-0.5 text-muted-foreground shrink-0">
                      {card.tag}
                    </span>
                  </div>
                  <h3 className="font-serif text-base lg:text-lg text-foreground mb-2 leading-snug">
                    {card.name}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-3">
                    {card.body}
                  </p>
                  <div className="font-mono text-[10px] text-muted-foreground/60 tracking-widest border-t border-border pt-3">
                    Programme: {card.programme}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────────────
   SECTION 5 — CLINICAL PROCESS (4 steps)
───────────────────────────────────────────────────────────────── */

const processSteps = [
  {
    n: "01",
    title: "CONSULTATION",
    body: "Pre-IV clinical assessment. Health history, medications, contraindications reviewed. Formulation matched to your goal.",
  },
  {
    n: "02",
    title: "FORMULATION",
    body: "Pharmaceutical-grade preparation by qualified clinical pharmacist. Vials inspected. Informed consent signed.",
  },
  {
    n: "03",
    title: "INFUSION",
    body: "Administered by qualified nurse under physician supervision in AIWO's clinical infusion bay. Vitals monitored. 30–45 minutes per session.",
  },
  {
    n: "04",
    title: "FOLLOW-UP",
    body: "Post-session check. Next-session scheduled per programme protocol (weekly cadence). Progress documented in your AIWO clinical record.",
  },
];

function Process() {
  return (
    <section className="py-16 lg:py-24 bg-black text-white border-b border-black">
      <div className="container mx-auto px-4 sm:px-6 max-w-7xl">

        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-10 lg:mb-14">
          <div>
            <Reveal>
              <div className="font-mono text-[10px] sm:text-xs uppercase tracking-widest text-white/50 mb-4">
                PROTOCOL
              </div>
              <h2 className="font-serif text-2xl sm:text-4xl lg:text-5xl leading-[1.05] text-white">
                Clinical process
              </h2>
            </Reveal>
          </div>
          <Reveal delay={0.05}>
            <div className="font-mono text-[11px] text-white/35 tracking-widest">
              TOTAL_TIME_PER_SESSION: 30–45 MINUTES
            </div>
          </Reveal>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-white/10 border border-white/10">
          {processSteps.map((step, i) => (
            <Reveal key={step.n} delay={i * 0.07}>
              <div className="bg-black p-6 lg:p-8 h-full">
                <div className="font-mono text-2xl lg:text-3xl text-white/20 mb-4 tracking-widest">
                  {step.n}
                </div>
                <div className="font-mono text-xs font-bold uppercase tracking-widest text-white mb-3">
                  {step.title}
                </div>
                <p className="text-[13px] lg:text-[15px] text-white/55 leading-relaxed">
                  {step.body}
                </p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.1}>
          <div className="mt-8 text-center">
            <Button
              onClick={scrollTo("book")}
              className="bg-white hover:bg-white/90 text-black rounded-none h-12 lg:h-14 px-8 font-medium text-base"
            >
              <span className="inline-flex items-center gap-2">
                Book Your Consultation <ArrowRight className="w-4 h-4 lg:w-5 lg:h-5" />
              </span>
            </Button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────────────
   SECTION 6 — COMPARISON TABLE
───────────────────────────────────────────────────────────────── */

const comparisonRows = [
  { metric: "Bloodstream absorption", oral: "10–30%", drip: "~100%", aiwo: "~100%" },
  { metric: "Onset of effect", oral: "30–120 minutes", drip: "Within minutes", aiwo: "Within minutes" },
  { metric: "Physician supervision", oral: "Not applicable", drip: "Often absent", aiwo: "Always present" },
  { metric: "Nurse administration", oral: "N/A", drip: "Sometimes technician", aiwo: "Always qualified nurse" },
  { metric: "Emergency protocol", oral: "N/A", drip: "Rarely disclosed", aiwo: "Documented, clinical floor" },
  { metric: "Informed consent process", oral: "N/A", drip: "Inconsistent", aiwo: "Signed before every IV" },
  { metric: "Programme-based protocol", oral: "Self-managed", drip: "One-off sessions", aiwo: "6–12 week protocols" },
  { metric: "Pharmaceutical-grade sourcing", oral: "Varies widely", drip: "Varies widely", aiwo: "Pharmaceutical-grade" },
  { metric: "Personalisation", oral: "Generic", drip: "Menu-driven", aiwo: "Consultation-driven" },
];

function ComparisonTable() {
  return (
    <section id="comparison" className="py-16 lg:py-24 bg-white border-b border-border">
      <div className="container mx-auto px-4 sm:px-6 max-w-7xl">

        <div className="mb-10 lg:mb-14">
          <Reveal>
            <div className="font-mono text-[10px] sm:text-xs font-bold uppercase tracking-widest text-muted-foreground mb-4">
              BENCHMARK
            </div>
            <h2 className="font-serif text-2xl sm:text-4xl lg:text-5xl leading-[1.05] text-foreground">
              Why clinical IV beats the alternatives
            </h2>
          </Reveal>
        </div>

        <Reveal delay={0.05}>
          <div className="overflow-x-auto -mx-4 sm:mx-0">
            <div className="min-w-[680px] mx-4 sm:mx-0">
              {/* Header */}
              <div className="grid grid-cols-4 border border-border">
                <div className="p-4 lg:p-5 border-r border-border">
                  <div className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">Criterion</div>
                </div>
                <div className="p-4 lg:p-5 border-r border-border">
                  <div className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">Oral Supplements</div>
                </div>
                <div className="p-4 lg:p-5 border-r border-border">
                  <div className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">Drip Lounges</div>
                </div>
                <div className="p-4 lg:p-5 bg-black">
                  <div className="font-mono text-[10px] uppercase tracking-widest text-white/60">AIWO IV THERAPY ★</div>
                </div>
              </div>
              {/* Rows */}
              {comparisonRows.map((row, i) => (
                <div key={row.metric} className={`grid grid-cols-4 border-x border-b border-border ${i % 2 === 0 ? "bg-white" : "bg-[#fafafa]"}`}>
                  <div className="p-4 lg:p-5 border-r border-border">
                    <span className="font-mono text-[11px] text-foreground tracking-widest leading-snug">{row.metric}</span>
                  </div>
                  <div className="p-4 lg:p-5 border-r border-border">
                    <span className="text-[13px] text-muted-foreground leading-snug">{row.oral}</span>
                  </div>
                  <div className="p-4 lg:p-5 border-r border-border">
                    <span className="text-[13px] text-muted-foreground leading-snug">{row.drip}</span>
                  </div>
                  <div className="p-4 lg:p-5 bg-black">
                    <span className="text-[13px] text-white leading-snug font-medium">{row.aiwo}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.08}>
          <p className="font-mono text-[10px] text-muted-foreground/55 tracking-widest mt-5 leading-relaxed">
            Benchmark drawn from publicly available clinical IV standards and India market scan. The "Drip Lounges" column reflects the typical Indian wellness drip clinic — not any single named operator. {/* AIWO-FLAG: Review periodically for accuracy */}
          </p>
        </Reveal>
      </div>
    </section>
  );
}


/* ─────────────────────────────────────────────────────────────────
   SECTION 8 — BOOKING INTAKE (2-step)
───────────────────────────────────────────────────────────────── */

function BookingIntake() {
  return (
    <section id="book" className="py-16 lg:py-24 bg-black text-white border-b border-black">
      <div className="container mx-auto px-4 sm:px-6 max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">

          {/* Left */}
          <div className="lg:col-span-5">
            <Reveal>
              <div className="font-mono text-[10px] sm:text-xs uppercase tracking-widest text-white/60 mb-4">
                INTAKE
              </div>
              <h2 className="font-serif text-2xl sm:text-4xl lg:text-5xl leading-[1.02] text-white mb-5 lg:mb-7">
                Speak to AIWO before your first IV
              </h2>
              <p className="text-white/65 text-base lg:text-lg leading-relaxed">
                Every IV at AIWO is preceded by a clinical consultation. The consultation matches the formulation to your goal, reviews medications, and confirms suitability. You will not be placed on an IV without prior assessment.
              </p>
            </Reveal>
          </div>

          {/* Right — real booking + payment form */}
          <div className="lg:col-span-6 lg:col-start-7">
            <Reveal delay={0.06}>
              <BookingForm isInline={true} />
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────────────
   SECTION 9 — FAQ (8 questions)
───────────────────────────────────────────────────────────────── */

const faqItems = [
  {
    q: "Is IV therapy safe?",
    a: "At AIWO, every IV is administered by a qualified nurse under physician supervision, in our clinical infusion bay, with informed consent signed in advance. Mild side effects such as slight bruising at the cannula site are uncommon. Serious reactions are rare and managed on site.",
  },
  {
    q: "Will I feel the effect immediately?",
    a: "Many clients report feeling lighter, hydrated, and clearer within the session itself, or within 24 hours. Cellular changes — the reason IV is run as a 6–12 week programme — build over weeks of consistent infusion, not in a single session.",
  },
  {
    q: "Do I need to fast before an IV?",
    a: "No fasting required. A light meal one to two hours before the session is usually recommended to support stable blood sugar and accessible veins. Specific instructions are confirmed at consultation.",
  },
  {
    q: "How is this different from a drip lounge?",
    a: "The clinical structure is different at every layer. AIWO IVs are formulated by clinical pharmacy team, administered by qualified nurse under physician supervision, preceded by consultation, accompanied by emergency protocol on site, and run as 6–12 week programmes — not one-off sessions. The comparison table above sets out each difference specifically.",
  },
  {
    q: "How is the formulation chosen for me?",
    a: "At your pre-IV consultation. The AIWO clinician reviews your health history, current medications, reason for enquiry, and any relevant biomarker data (existing or new). The formulation is matched to your goal — not selected from a menu by you.",
  },
  {
    q: "What if I am on medication?",
    a: "Disclose every prescription, supplement, and recreational substance at consultation. Some medications interact with IV nutrients. The AIWO clinical team will adjust the formulation or postpone the IV if a contraindication is identified. Patient safety is the only consideration.",
  },
  {
    q: "How is my data handled?",
    a: "AIWO is a clinical organisation. Member health data is collected, stored, and processed under AIWO's clinical data protection protocols, compliant with the Digital Personal Data Protection Act, 2023. Marketing data is separated from clinical data under the same DPDP framework. Consent is taken in writing at enrolment.",
  },
];

function FAQSection() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" className="py-16 lg:py-24 bg-white border-b border-border">
      <div className="container mx-auto px-4 sm:px-6 max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">

          <div className="lg:col-span-4">
            <Reveal>
              <div className="font-mono text-[10px] sm:text-xs font-bold uppercase tracking-widest text-muted-foreground mb-4">
                INFORMATION
              </div>
              <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl leading-[1.05] text-foreground mb-6">
                Common questions
              </h2>
              <p className="font-mono text-[11px] text-muted-foreground tracking-widest">
                Have a question we didn't answer?{" "}
                <button onClick={scrollTo("book")} className="underline underline-offset-4 hover:opacity-60 bg-transparent border-0 cursor-pointer font-mono text-[11px] tracking-widest text-foreground">
                  Book a consultation →
                </button>
              </p>
            </Reveal>
          </div>

          <div className="lg:col-span-7 lg:col-start-6">
            <Reveal delay={0.05}>
              <div className="divide-y divide-border border-t border-b border-border">
                {faqItems.map((item, i) => (
                  <div key={i}>
                    <button
                      type="button"
                      onClick={() => setOpen(open === i ? null : i)}
                      className="w-full flex items-start justify-between gap-4 py-5 text-left"
                      aria-expanded={open === i}
                    >
                      <span className="font-serif text-base lg:text-lg text-foreground leading-snug">{item.q}</span>
                      {open === i
                        ? <ChevronUp className="w-4 h-4 shrink-0 mt-0.5 text-muted-foreground" />
                        : <ChevronDown className="w-4 h-4 shrink-0 mt-0.5 text-muted-foreground" />
                      }
                    </button>
                    {open === i && (
                      <div className="pb-5">
                        <p className="text-muted-foreground text-sm lg:text-[15px] leading-relaxed">{item.a}</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </Reveal>
            <Reveal delay={0.08}>
              <div className="mt-6">
                <Button
                  onClick={scrollTo("book")}
                  className="bg-black hover:bg-black/90 text-white rounded-none h-12 px-6 lg:px-8 font-medium w-full sm:w-auto"
                >
                  <span className="inline-flex items-center justify-center gap-2">
                    Book Your Consultation <ArrowRight className="w-4 h-4" />
                  </span>
                </Button>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────────────
   Sticky mobile CTA (activates at 30% scroll)
───────────────────────────────────────────────────────────────── */

/* ─────────────────────────────────────────────────────────────────
   PAGE — 10-section DEXA template clone (IV Therapy v1)
───────────────────────────────────────────────────────────────── */

export default function IVTherapyPage() {
  return (
    <div className="min-h-screen bg-white">
      <MetaTags
        title="IV Therapy in Mumbai | Immunity, Energy & Skin Glow | AIWO"
        description="Experience personalized IV Therapy in Mumbai for immunity, hydration, energy, recovery, anti-aging and glowing skin. Book your IV drip at AIWO today."
      />
      <Navigation
        sections={[
          { label: "Formulations", href: "#what-it-delivers" },
          { label: "How It Compares", href: "#comparison" },
          { label: "FAQ", href: "#faq" },
        ]}
        ctaLabel="Book Consultation"
      />
      <main>
        <Hero />             {/* S1 */}
        <WhyItMatters />     {/* S2 */}
        <TechStrip />        {/* S3 */}
        <FormulationMenu />  {/* S4 */}
        <Process />          {/* S5 */}
        <ComparisonTable />  {/* S6 */}
        <BookingIntake />    {/* S7 */}
        <FAQSection />       {/* S9 */}
      </main>
      <Footer />             {/* S10 */}
    </div>
  );
}
