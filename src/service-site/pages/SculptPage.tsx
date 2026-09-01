import { useState } from "react";
import { Reveal } from "@/components/Reveal";
import { Button } from "@/components/ui/button";
import { Footer } from "@/components/sections/Footer";
import { Navigation } from "@/components/sections/Navigation";
import { ServiceBookingWidget } from "@/booking/ServiceBookingWidget";
import { MetaTags } from "@/components/MetaTags";
import { ArrowRight, Check, ChevronDown, ChevronUp } from "lucide-react";

const scrollTo = (id: string) => (e: React.MouseEvent<HTMLAnchorElement>) => {
  e.preventDefault();
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
};

function SectionLabel({ n, label }: { n: string; label: string }) {
  return (
    <div className="flex items-center gap-3 mb-5">
      <span className="font-mono text-xs text-muted-foreground tracking-widest">{n}</span>
      <span className="w-10 h-px bg-border" />
      <span className="font-mono text-xs uppercase tracking-widest text-foreground font-bold">{label}</span>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────
   Hero SVG — actual before/after programme data (V1)
───────────────────────────────────────────────────────────────── */

function SculptSVG() {
  return (
    <svg viewBox="0 0 400 520" className="w-full h-full" aria-hidden>
      <rect width="400" height="520" fill="#000" />

      <text x="20" y="35" fill="white" fillOpacity="0.35" fontFamily="monospace" fontSize="8" letterSpacing="2">
        PROGRAMME MEASUREMENTS · AIWO SCULPT
      </text>
      <line x1="20" y1="45" x2="380" y2="45" stroke="rgba(255,255,255,0.12)" strokeWidth="1" />

      <text x="20" y="68" fill="white" fillOpacity="0.35" fontFamily="monospace" fontSize="8" letterSpacing="2">
        CLIENT · PROGRAMME: 10-WEEK ABDOMINAL PROTOCOL
      </text>

      <text x="20" y="100" fill="white" fillOpacity="0.4" fontFamily="monospace" fontSize="8" letterSpacing="1.5">WAISTLINE CIRCUMFERENCE</text>
      <g fontFamily="serif" fontSize="26">
        <text x="20" y="126" fill="white" fillOpacity="0.5">87.0 cm</text>
        <text x="170" y="126" fill="white" fillOpacity="0.3">→</text>
        <text x="200" y="126" fill="white">83.0 cm</text>
      </g>
      <text x="20" y="140" fill="white" fillOpacity="0.35" fontFamily="monospace" fontSize="9">BEFORE</text>
      <text x="200" y="140" fill="white" fillOpacity="0.55" fontFamily="monospace" fontSize="9">AFTER · 4 CM REDUCTION</text>

      <line x1="20" y1="155" x2="380" y2="155" stroke="rgba(255,255,255,0.07)" strokeWidth="1" />

      <text x="20" y="178" fill="white" fillOpacity="0.4" fontFamily="monospace" fontSize="8" letterSpacing="1.5">MUSCLE MASS (TREATED AREA)</text>
      <g fontFamily="serif" fontSize="26">
        <text x="20" y="204" fill="white" fillOpacity="0.5">28.4 kg</text>
        <text x="170" y="204" fill="white" fillOpacity="0.3">→</text>
        <text x="200" y="204" fill="white">32.9 kg</text>
      </g>
      <text x="20" y="218" fill="white" fillOpacity="0.35" fontFamily="monospace" fontSize="9">BEFORE</text>
      <text x="200" y="218" fill="white" fillOpacity="0.55" fontFamily="monospace" fontSize="9">AFTER · +16% INCREASE</text>

      <line x1="20" y1="232" x2="380" y2="232" stroke="rgba(255,255,255,0.07)" strokeWidth="1" />

      <text x="20" y="256" fill="white" fillOpacity="0.4" fontFamily="monospace" fontSize="8" letterSpacing="1.5">REGIONAL FAT (TREATED AREA)</text>
      <g fontFamily="serif" fontSize="26">
        <text x="20" y="282" fill="white" fillOpacity="0.5">100%</text>
        <text x="170" y="282" fill="white" fillOpacity="0.3">→</text>
        <text x="200" y="282" fill="white">81%</text>
      </g>
      <text x="20" y="296" fill="white" fillOpacity="0.35" fontFamily="monospace" fontSize="9">BEFORE</text>
      <text x="200" y="296" fill="white" fillOpacity="0.55" fontFamily="monospace" fontSize="9">AFTER · 19% REDUCTION</text>

      <line x1="20" y1="312" x2="380" y2="312" stroke="rgba(255,255,255,0.15)" strokeWidth="1" />

      <text x="20" y="334" fill="white" fillOpacity="0.25" fontFamily="monospace" fontSize="8" letterSpacing="2">10-WEEK PROGRAMME TIMELINE</text>
      <rect x="20" y="344" width="360" height="3" fill="rgba(255,255,255,0.08)" />
      {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((week) => (
        <g key={week}>
          <rect x={20 + week * 36} y="344" width="34" height="3" fill={week < 8 ? "rgba(255,255,255,0.5)" : "rgba(255,255,255,0.2)"} />
          <text x={37 + week * 36} y="360" fill="white" fillOpacity="0.25" fontFamily="monospace" fontSize="7" textAnchor="middle">W{week + 1}</text>
        </g>
      ))}
      <text x="20" y="378" fill="white" fillOpacity="0.35" fontFamily="monospace" fontSize="8" letterSpacing="1.5">20 SESSIONS · 2 PER WEEK · 30 MIN EACH</text>

      <line x1="20" y1="394" x2="380" y2="394" stroke="rgba(255,255,255,0.12)" strokeWidth="1" />

      <text x="20" y="414" fill="white" fillOpacity="0.25" fontFamily="monospace" fontSize="8" letterSpacing="2">TECHNOLOGY STACK — PER SESSION</text>
      <g fontFamily="monospace" fontSize="9" letterSpacing="0.5">
        <text x="20" y="432" fill="white" fillOpacity="0.4">HIFEM</text>
        <text x="80" y="432" fill="white" fillOpacity="0.6">~20,000 SUPRAMAXIMAL CONTRACTIONS</text>
        <text x="20" y="450" fill="white" fillOpacity="0.4">EMS</text>
        <text x="80" y="450" fill="white" fillOpacity="0.6">SURFACE MUSCLE FIBRE ACTIVATION</text>
        <text x="20" y="468" fill="white" fillOpacity="0.4">RF</text>
        <text x="80" y="468" fill="white" fillOpacity="0.6">FAT APOPTOSIS + COLLAGEN STIMULATION</text>
      </g>

      <line x1="20" y1="482" x2="380" y2="482" stroke="rgba(255,255,255,0.08)" strokeWidth="1" />
      <text x="20" y="500" fill="white" fillOpacity="0.18" fontFamily="monospace" fontSize="7" letterSpacing="2">
        RESULTS FROM CLINICAL STUDIES · INDIVIDUAL OUTCOMES VARY
      </text>
    </svg>
  );
}

// ─── SECTION 1: HERO ──────────────────────────────────────────────────────────

function Hero() {
  return (
    <section className="relative bg-white border-b border-border overflow-hidden">
      <div className="absolute inset-0 clinical-grid opacity-50" />
      <div className="container mx-auto px-6 max-w-7xl relative py-12 lg:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          <div className="lg:col-span-7">
            <Reveal>
              <span className="font-mono text-xs font-bold text-foreground uppercase tracking-widest block mb-4">
                ■ AIWO SCULPT PROGRAMME · Triple-Energy Body Sculpting
              </span>
            </Reveal>
            <Reveal delay={0.1}>
              <h1 className="font-serif text-[32px] sm:text-[46px] lg:text-[60px] leading-[1.0] tracking-tight text-foreground mb-6">
                Your training works.
                <br />
                <span className="italic text-muted-foreground">Your body is hiding what it can't reach.</span>
              </h1>
            </Reveal>
            <Reveal delay={0.18}>
              <p className="text-base lg:text-xl text-muted-foreground leading-relaxed max-w-[560px] mb-8">
                Voluntary exercise recruits 10–30% of deep muscle fibres. The rest stay dormant — no matter how hard you train. In 30 minutes, twice a week, AIWO Sculpt triggers approximately 20,000 supramaximal contractions using Triple-Energy technology (HIFEM + EMS + RF) — reaching the muscle fibres that no voluntary effort can consciously activate.
              </p>
            </Reveal>
            <Reveal delay={0.26}>
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5 mb-4">
                <Button asChild className="bg-black hover:bg-black/90 text-white rounded-none h-auto min-h-14 sm:h-14 px-8 py-3 sm:py-0 font-medium text-base whitespace-normal w-full sm:w-auto">
                  <a href="#intake" onClick={scrollTo("intake")} className="inline-flex items-center justify-center gap-2 text-center">
                    Book Your Body Composition Consult — ₹3,500 <ArrowRight className="w-5 h-5 shrink-0" />
                  </a>
                </Button>
              </div>
              <p className="font-mono text-[11px] text-muted-foreground tracking-widest">
                ₹3,500 · 20 minutes · Body composition reading included
              </p>
            </Reveal>
          </div>

          <div className="lg:col-span-5">
            <Reveal delay={0.3} direction="none">
              <div className="aspect-[4/5] bg-black overflow-hidden border border-border">
                <SculptSVG />
              </div>
            </Reveal>
          </div>
        </div>

        <Reveal delay={0.35}>
          <div className="mt-10 border-t border-border pt-8 grid grid-cols-2 md:grid-cols-5 gap-4">
            {[
              "FDA-cleared device technology · CE certified",
              "Triple-Energy: HIFEM + EMS + RF",
              "AIWO clinical team supervised",
              "Fairmont Mumbai, T2 Terminal",
              "30-min sessions · No downtime · No surgery",
            ].map((item) => (
              <div key={item} className="flex items-start gap-2">
                <Check className="w-3.5 h-3.5 shrink-0 mt-0.5" strokeWidth={2.5} />
                <span className="font-mono text-[11px] tracking-wide text-muted-foreground leading-snug">{item}</span>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

// ─── SECTION 2: WHY THIS MATTERS ─────────────────────────────────────────────

function WhyItMatters() {
  const cases = [
    {
      eyebrow: "For the athlete",
      headline: "You've trained for years. The last 10% hasn't moved.",
      body: "You're consistent. Your diet is clean. Your plateau is not a motivation problem — it's a fibre-recruitment problem. Some deep muscle groups only fully activate under load your voluntary effort cannot generate. That's what AIWO Sculpt is built for.",
      tag: "Plateau + Definition",
    },
    {
      eyebrow: "For the postpartum mother",
      headline: "Your body delivered. Your abdomen hasn't caught up.",
      body: "Diastasis recti, weakened pelvic floor, abdominal laxity — these don't resolve through standard training. AIWO Sculpt's postpartum protocol is specifically designed for targeted HIFEM and RF in the areas that need clinical, not cosmetic, support.",
      tag: "Postpartum Recovery",
    },
    {
      eyebrow: "For the longevity tracker",
      headline: "You measure your VO₂. Your body composition should also be on record.",
      body: "You already review your AIWO biomarker panels. AIWO Sculpt gives you a body composition baseline before and a measurement after — so your programme result is a number, not a feeling.",
      tag: "Measured Outcomes",
    },
    {
      eyebrow: "For the recovery client",
      headline: "Your weight reached target. Your contour didn't follow.",
      body: "Post-weight-loss — whether through sustained lifestyle change or GLP-1 medication — often leaves a body composition that hasn't caught up with the number on the scale. AIWO Sculpt builds the muscle and tightens the subcutaneous tissue your weight loss alone cannot reshape.",
      tag: "Post-Weight-Loss Recomposition",
    },
  ];

  return (
    <section id="why-it-matters" className="py-12 lg:py-20 bg-white border-b border-border">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-10">
          <div className="lg:col-span-5">
            <SectionLabel n="02" label="Why This Matters" />
            <h2 className="font-serif text-3xl lg:text-5xl leading-[1.05] text-foreground">
              Your body is changing.
              <br />
              <span className="italic text-muted-foreground">You just can't reach all of it.</span>
            </h2>
          </div>
          <div className="lg:col-span-5 lg:col-start-8 flex items-end">
            <p className="text-base text-muted-foreground leading-relaxed">
              You train, diet, and track — and still the waistline stays, the separation lingers, the definition doesn't arrive. The gap is not effort. It is access: the deep muscle fibres that define contour and support structure require stimulation that voluntary exercise simply cannot generate. AIWO Sculpt closes that gap, clinically.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 border-t border-l border-border">
          {cases.map((c, i) => (
            <Reveal key={c.eyebrow} delay={i * 0.08}>
              <div className="border-r border-b border-border p-6 lg:p-8 h-full flex flex-col">
                <div className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground mb-3">{c.eyebrow}</div>
                <h3 className="font-serif text-xl text-foreground mb-3 leading-snug">{c.headline}</h3>
                <p className="text-[14px] text-muted-foreground leading-relaxed flex-1">{c.body}</p>
                <div className="mt-4 inline-block border border-border font-mono text-[10px] uppercase tracking-widest px-3 py-1 text-muted-foreground self-start">
                  {c.tag}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── SECTION 3: TECHNOLOGY CREDIBILITY STRIP ─────────────────────────────────

function TechStrip() {
  const items = [
    {
      label: "Triple-Energy Platform",
      body: "HIFEM + EMS + RF in one applicator. No other clinic in Mumbai combines all three in a single session.",
    },
    {
      label: "FDA-Cleared Device Technology · CE Certified",
      body: "Device class has received FDA clearance and CE certification for safety and efficacy.",
    },
    {
      label: "Clinical Team Supervised",
      body: "Every programme is designed and reviewed by AIWO's clinical team — inside the AIWO Longevity Clinic at Fairmont Mumbai, T2 Terminal.",
    },
  ];

  return (
    <section className="py-8 lg:py-12 bg-black text-white border-b border-black">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="font-mono text-[10px] uppercase tracking-widest text-white/40 mb-6">03 · The Technology</div>
        <div className="grid grid-cols-1 lg:grid-cols-3 divide-y lg:divide-y-0 lg:divide-x divide-white/15">
          {items.map((item, i) => (
            <div key={item.label} className="py-6 lg:py-0 lg:px-8 first:lg:pl-0 last:lg:pr-0">
              <div className="font-mono text-[10px] uppercase tracking-widest text-white/30 mb-2">0{i + 1}</div>
              <div className="font-mono text-[12px] font-bold text-white uppercase tracking-wide mb-2">{item.label}</div>
              <p className="text-[14px] text-white/55 leading-relaxed">{item.body}</p>
            </div>
          ))}
        </div>
        <p className="font-mono text-[10px] text-white/20 tracking-widest mt-6">
          "No other clinic in Mumbai combines all three" — competitive claim subject to AIWO marketing verification before publishing.
        </p>
      </div>
    </section>
  );
}

// ─── SECTION 4: WHAT IT DELIVERS ─────────────────────────────────────────────

function WhatItDelivers() {
  const cards = [
    {
      id: "SC-01",
      tag: "HIFEM",
      name: "Deep Motor Unit Recruitment",
      body: "High-intensity focused electromagnetic energy activates deep muscle fibres — including the slow-twitch stabilisers voluntary exercise leaves dormant.",
    },
    {
      id: "SC-02",
      tag: "EMS",
      name: "Full-Group Muscle Activation",
      body: "Electrical muscle stimulation fires the entire muscle group simultaneously, not just the surface fibres that voluntary contraction reaches first.",
    },
    {
      id: "SC-03",
      tag: "RF",
      name: "Subcutaneous Fat Apoptosis",
      body: "Radiofrequency energy heats the fat layer to trigger permanent fat cell reduction in the treated area, while stimulating collagen for skin tightening.",
    },
    {
      id: "SC-04",
      tag: "Diagnostic Integration",
      name: "Programme-End Measurement",
      body: "Your programme begins with a body composition baseline and ends with a clinical measurement. Your result is a number — not a mirror assessment.",
    },
  ];

  return (
    <section id="what-it-delivers" className="py-12 lg:py-20 bg-white border-b border-border">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 mb-10">
          <div className="lg:col-span-5">
            <SectionLabel n="04" label="The Mechanism" />
            <h2 className="font-serif text-3xl lg:text-5xl leading-[1.05] text-foreground mb-5">
              Beyond toning.
              <br />
              <span className="italic text-muted-foreground">Beyond guessing.</span>
            </h2>
            <p className="text-base text-muted-foreground leading-relaxed">
              A single AIWO Sculpt session delivers approximately 20,000 supramaximal muscle contractions — a load that voluntary exercise cannot consciously generate. The three energy modalities work simultaneously: HIFEM recruits deep motor units, EMS stimulates the full muscle group at once, and RF heats the subcutaneous fat layer to trigger apoptosis and collagen remodelling.
            </p>
          </div>

          <div className="lg:col-span-5 lg:col-start-8">
            <div className="bg-black text-white p-6 lg:p-8 h-full flex flex-col justify-between">
              <div className="font-mono text-[10px] uppercase tracking-widest text-white/40 mb-5">Clinical Study Figure</div>
              <div>
                <div className="font-serif text-6xl lg:text-7xl text-white leading-none mb-3">~20,000</div>
                <div className="font-mono text-[11px] text-white/60 uppercase tracking-widest mb-2">
                  Supramaximal contractions per 30-minute session
                </div>
                <p className="text-[13px] text-white/40 leading-relaxed">
                  Equivalent muscle stimulation unreachable through voluntary training.
                </p>
              </div>
              <div className="border-t border-white/15 pt-4 mt-6">
                <p className="font-mono text-[10px] text-white/20 tracking-widest">
                  Results from controlled clinical studies on the device technology class. Individual outcomes vary.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 border-t border-l border-border">
          {cards.map((c, i) => (
            <Reveal key={c.id} delay={i * 0.08}>
              <div className="border-r border-b border-border p-6 lg:p-8 h-full">
                <div className="flex items-baseline gap-3 mb-4">
                  <span className="font-mono text-[11px] uppercase tracking-widest text-muted-foreground font-bold">{c.id}</span>
                  <span className="border border-border font-mono text-[10px] uppercase tracking-widest px-2 py-0.5 text-muted-foreground">{c.tag}</span>
                </div>
                <h3 className="font-serif text-lg text-foreground mb-3 leading-snug">{c.name}</h3>
                <p className="text-[14px] text-muted-foreground leading-relaxed">{c.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── SECTION 5: CLINICAL PROCESS ─────────────────────────────────────────────

function Process() {
  const steps = [
    {
      n: "01",
      name: "Schedule",
      body: "Book your body composition consult — ₹3,500. 20 minutes. Includes your body composition reading. Confirm your treatment area and programme design with the clinical team.",
    },
    {
      n: "02",
      name: "Prepare",
      body: "No fasting required. Avoid eating in the hour before your session. Wear comfortable clothing with access to the treatment area. Arrive at Fairmont Mumbai, Level 2, T2 Terminal.",
    },
    {
      n: "03",
      name: "The Session",
      body: "Applicator paddles are positioned on the treatment area and secured. Intensity is set with you — starting low, increasing as your tolerance builds. 30 minutes. Deep rhythmic contractions — intense, never painful. You may read, rest, or close your eyes.",
    },
    {
      n: "04",
      name: "Return to Your Day",
      body: "No recovery time. No soreness restriction. No missed workouts. Two sessions per week, ten-week programme. Programme-end measurement at session 20.",
    },
  ];

  return (
    <section id="process" className="py-12 lg:py-20 bg-black text-white border-b border-black">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-10">
          <div className="lg:col-span-5">
            <div className="font-mono text-xs uppercase tracking-widest text-white/60 mb-4">05 · Protocol</div>
            <h2 className="font-serif text-3xl lg:text-5xl leading-[1.05] text-white">Clinical process.</h2>
          </div>
          <div className="lg:col-span-5 lg:col-start-8 flex items-end">
            <p className="font-mono text-[13px] text-white/40 tracking-widest">
              TOTAL_TIME: 30_MINUTES_PER_SESSION
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 border-t border-l border-white/20 mb-8">
          {steps.map((s, i) => (
            <Reveal key={s.n} delay={i * 0.08}>
              <div className="border-r border-b border-white/20 p-6 lg:p-7 h-full">
                <div className="font-serif text-4xl text-white/20 mb-4 leading-none">{s.n}</div>
                <div className="font-mono text-[11px] uppercase tracking-widest text-white font-bold mb-3">{s.name}</div>
                <p className="text-[14px] text-white/55 leading-relaxed">{s.body}</p>
              </div>
            </Reveal>
          ))}
        </div>

        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5">
          <Button asChild className="bg-white hover:bg-white/90 text-black rounded-none h-12 px-6 font-medium">
            <a href="#intake" onClick={scrollTo("intake")} className="inline-flex items-center gap-2">
              Book Your Body Composition Consult <ArrowRight className="w-4 h-4" />
            </a>
          </Button>
          <p className="font-mono text-[11px] text-white/40 tracking-widest">
            ₹3,500 · 20 minutes · Body composition reading included
          </p>
        </div>
      </div>
    </section>
  );
}

// ─── SECTION 6: COMPARISON TABLE ─────────────────────────────────────────────

function Comparison() {
  const rows = [
    { label: "Technology", col1: "1–2 energy modalities", col2: "Voluntary muscle contraction only", col3: "HIFEM + EMS + RF — all three" },
    { label: "Muscle fibre depth", col1: "Surface + mid fibres", col2: "Surface + mid fibres", col3: "Deep motor units + full group" },
    { label: "Fat reduction", col1: "Limited (depends on tech)", col2: "Requires separate effort", col3: "RF-driven subcutaneous apoptosis" },
    { label: "Diagnostic baseline", col1: "Not standard", col2: "Not available", col3: "Body composition reading included" },
    { label: "Programme-end measurement", col1: "Not standard", col2: "Not available", col3: "Clinical measurement at session 20" },
    { label: "Session length", col1: "30 min", col2: "60–90 min per session", col3: "30 min" },
    { label: "Downtime", col1: "None", col2: "Soreness / recovery days", col3: "None — return to training same day" },
    { label: "Clinical supervision", col1: "Aesthetic technician", col2: "Personal trainer", col3: "AIWO clinical team" },
    { label: "Setting", col1: "Aesthetic spa / standalone clinic", col2: "Gym", col3: "Longevity diagnostics centre" },
  ];

  return (
    <section id="comparison" className="py-12 lg:py-20 bg-white border-b border-border">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-10">
          <div className="lg:col-span-5">
            <SectionLabel n="06" label="Why AIWO Sculpt Is the Standard" />
            <h2 className="font-serif text-3xl lg:text-5xl leading-[1.05] text-foreground">
              One technology treats.
              <br />
              <span className="italic text-muted-foreground">Three technologies transform.</span>
            </h2>
          </div>
        </div>

        {/* Desktop table */}
        <div className="hidden md:block border border-border overflow-hidden mb-4">
          <div className="grid grid-cols-4 divide-x divide-border bg-muted">
            <div className="p-4 font-mono text-[10px] uppercase tracking-widest text-muted-foreground">Criteria</div>
            <div className="p-4 font-mono text-[10px] uppercase tracking-widest text-muted-foreground">Emsculpt / Single-tech clinics</div>
            <div className="p-4 font-mono text-[10px] uppercase tracking-widest text-muted-foreground">Gym + Personal Training</div>
            <div className="p-4 font-mono text-[10px] uppercase tracking-widest text-white bg-black font-bold">AIWO Sculpt</div>
          </div>
          {rows.map((row, i) => (
            <div key={row.label} className={`grid grid-cols-4 divide-x divide-border border-t border-border ${i % 2 === 0 ? "" : "bg-muted/20"}`}>
              <div className="p-4 font-mono text-[12px] text-foreground font-bold tracking-wide">{row.label}</div>
              <div className="p-4 text-[13px] text-muted-foreground leading-snug">{row.col1}</div>
              <div className="p-4 text-[13px] text-muted-foreground leading-snug">{row.col2}</div>
              <div className="p-4 text-[13px] text-foreground font-medium bg-muted/40 leading-snug">{row.col3}</div>
            </div>
          ))}
        </div>

        {/* Mobile stacked cards */}
        <div className="md:hidden space-y-4 mb-4">
          {rows.map((row) => (
            <div key={row.label} className="border border-border p-4">
              <div className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground mb-3">{row.label}</div>
              <div className="grid grid-cols-1 gap-2">
                <div className="flex items-start gap-2">
                  <span className="font-mono text-[10px] text-muted-foreground/50 shrink-0 w-20">Others</span>
                  <span className="text-[13px] text-muted-foreground">{row.col1}</span>
                </div>
                <div className="flex items-start gap-2 border-t border-border pt-2">
                  <span className="font-mono text-[10px] text-foreground font-bold shrink-0 w-20">AIWO</span>
                  <span className="text-[13px] text-foreground font-medium">{row.col3}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <p className="font-mono text-[10px] text-muted-foreground/40 tracking-widest">
          "No other clinic in Mumbai combines all three technologies" — competitive claim subject to AIWO marketing verification before publishing.
        </p>
      </div>
    </section>
  );
}

// ─── SECTION 6b: KEY DIFFERENCE (from V1) ────────────────────────────────────

function KeyDifference() {
  return (
    <section className="py-12 lg:py-20 bg-black text-white border-b border-black">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="border border-white/20 p-6 lg:p-8 mb-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div>
              <div className="font-mono text-[11px] uppercase tracking-widest text-white/50 mb-3">The key difference</div>
              <p className="font-serif text-2xl text-white leading-snug mb-4">
                Most India sculpting programmes use one or two technologies. AIWO Sculpt delivers all three — in one session, in one clinical setting.
              </p>
              <p className="text-white/60 text-[15px] leading-relaxed">
                Muscle activation, fat apoptosis and skin tightening happen in the same 30 minutes — not across three separate visits to three separate clinics.
              </p>
            </div>
            <div className="border border-white/20 p-6">
              <div className="font-mono text-[10px] uppercase tracking-widest text-white/40 mb-5">What one 30-minute AIWO Sculpt session delivers</div>
              <div className="space-y-3">
                {[
                  "~20,000 supramaximal muscle contractions (HIFEM)",
                  "Surface muscle fibre activation (EMS)",
                  "Subcutaneous fat apoptosis (RF)",
                  "Collagen stimulation for skin tightening (RF)",
                  "Return to your day immediately after",
                ].map((item) => (
                  <div key={item} className="flex items-start gap-3">
                    <Check className="w-4 h-4 shrink-0 mt-0.5 text-white" strokeWidth={2} />
                    <span className="text-white text-[14px] leading-snug">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className="flex justify-end">
          <Button asChild className="bg-white hover:bg-white/90 text-black rounded-none h-12 px-8 font-medium">
            <a href="#intake" onClick={scrollTo("intake")} className="inline-flex items-center gap-2">
              Book Your Body Composition Consult <ArrowRight className="w-4 h-4" />
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
}

// ─── SECTION 6c: WHY THIS IS DIFFERENT (from V1) ─────────────────────────────

function WhyItsDifferent() {
  return (
    <section className="py-12 lg:py-20 bg-white border-b border-border">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 mb-8 lg:mb-12">
          <div className="lg:col-span-6">
            <SectionLabel n="03" label="Why This Is Different" />
            <h2 className="font-serif text-3xl lg:text-5xl leading-[1.05] text-foreground">
              Sculpting begins
              <br />
              with your body composition —
              <br />
              <span className="italic text-muted-foreground">not a sales conversation.</span>
            </h2>
          </div>
          <div className="lg:col-span-5 lg:col-start-8 lg:flex lg:items-end mt-3 lg:mt-0">
            <p className="text-base lg:text-lg text-muted-foreground leading-relaxed">
              At most aesthetic centres, body sculpting begins with a conversation about your goals. At AIWO, it begins with data.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 mb-8 lg:mb-12">
          <div>
            <p className="text-lg text-foreground leading-relaxed mb-6">
              Every AIWO Sculpt client starts with a body composition reading. We measure where you are before we recommend what changes. Where relevant, your programme is informed by your existing AIWO diagnostic data.
            </p>
            <p className="text-lg text-foreground leading-relaxed mb-6">
              This means the AIWO Sculpt session plan is shaped by your body — not by a generic protocol applied to every client.
            </p>
            <p className="text-lg text-muted-foreground leading-relaxed">
              No other India sculpt programme integrates measurement and treatment this way.
            </p>
          </div>

          <div className="border border-border overflow-hidden">
            <div className="grid grid-cols-2 divide-x divide-border h-full">
              <div className="bg-muted p-5 lg:p-6">
                <div className="font-mono text-[11px] uppercase tracking-widest text-muted-foreground mb-5">Most clinics</div>
                <div className="space-y-4">
                  <div>
                    <div className="font-mono text-[11px] text-muted-foreground tracking-widest mb-1">Step 1</div>
                    <div className="text-[13px] text-muted-foreground">Consultation about your goals</div>
                  </div>
                  <div>
                    <div className="font-mono text-[11px] text-muted-foreground tracking-widest mb-1">Step 2</div>
                    <div className="text-[13px] text-muted-foreground">Treatment begins</div>
                  </div>
                </div>
              </div>
              <div className="bg-black text-white p-5 lg:p-6">
                <div className="font-mono text-[11px] uppercase tracking-widest text-white/60 mb-5">AIWO Sculpt</div>
                <div className="space-y-3">
                  {[
                    "Diagnostic baseline — body composition reading",
                    "Programme design — calibrated to your data",
                    "Session series — 20 sessions across 10 weeks",
                    "Outcome measurement — compared against your baseline",
                  ].map((step, i) => (
                    <div key={i} className="flex items-start gap-2">
                      <span className="font-mono text-[10px] text-white/40 mt-0.5 shrink-0">{String(i + 1).padStart(2, "0")}</span>
                      <span className="text-[13px] text-white leading-snug">{step}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="border border-border p-6 lg:p-8">
          <div className="font-mono text-[11px] uppercase tracking-widest text-muted-foreground mb-4">Where relevant, your programme is informed by</div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { label: "DEXA Scan", desc: "Regional fat distribution and muscle mass" },
              { label: "RMR Testing", desc: "Baseline energy use and metabolic rate" },
              { label: "AIWO 100 / 181 Panel", desc: "Informing safety and response prediction" },
              { label: "Posture Screening", desc: "Muscle imbalances to address before treatment" },
            ].map((item) => (
              <div key={item.label} className="border-l-2 border-border pl-4">
                <div className="font-mono text-xs font-bold tracking-widest text-foreground mb-1">{item.label}</div>
                <div className="text-[13px] text-muted-foreground leading-snug">{item.desc}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-8 flex justify-end">
          <Button asChild className="bg-black hover:bg-black/90 text-white rounded-none h-12 px-8 font-medium">
            <a href="#intake" onClick={scrollTo("intake")} className="inline-flex items-center gap-2">
              Begin With Your Numbers <ArrowRight className="w-4 h-4" />
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
}

// ─── SECTION 7: PRICING ───────────────────────────────────────────────────────

function Pricing() {
  const includes = [
    "20 sessions across 10 weeks (2/week)",
    "Triple-Energy treatment every session (HIFEM + EMS + RF)",
    "Body composition baseline reading",
    "Clinical review at session 8 + session 14",
    "Programme-end outcome measurement",
    "Clinical team supervision throughout",
    "₹3,500 body composition consult to start",
  ];

  return (
    <section id="pricing" className="py-12 lg:py-20 bg-black text-white border-b border-black">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          <div className="lg:col-span-5">
            <div className="font-mono text-xs uppercase tracking-widest text-white/60 mb-4">07 · Transparent Pricing</div>
            <h2 className="font-serif text-3xl lg:text-5xl leading-[1.05] text-white mb-6">
              One programme.
              <br />
              <span className="italic text-white/60">Complete clinical support.</span>
            </h2>
            <p className="text-white/60 text-base leading-relaxed mb-6">
              AIWO Sculpt is a bundled 10-week clinical programme — not per-session aesthetic visits. Pricing is calibrated to your treatment area and confirmed in your ₹3,500 body composition consult. No upselling per session. No surprise charges after you commit.
            </p>
            <div className="border border-white/15 p-5">
              <p className="font-mono text-[11px] text-white/30 tracking-widest leading-relaxed">
                The gym-based equivalent — 240 hours of supervised personal training in Mumbai over 10 weeks — costs ₹4,00,000–₹6,00,000. AIWO Sculpt is priced at a fraction of that comparison, and reaches the muscle fibres no PT session can.
              </p>
            </div>
          </div>

          <div className="lg:col-span-6 lg:col-start-7">
            <div className="border border-white/20 p-7 lg:p-9">
              <div className="font-mono text-[11px] uppercase tracking-widest text-white/40 mb-2">Programme pricing</div>
              <div className="font-serif text-3xl text-white mb-1">Confirmed in your consult</div>
              <p className="font-mono text-[11px] text-white/30 tracking-widest mb-7">Calibrated to treatment area and programme design</p>

              <div className="border-t border-white/15 pt-6 mb-7">
                <div className="font-mono text-[10px] uppercase tracking-widest text-white/40 mb-4">What's included</div>
                <div className="space-y-3">
                  {includes.map((item) => (
                    <div key={item} className="flex items-start gap-3">
                      <Check className="w-4 h-4 shrink-0 mt-0.5 text-white" strokeWidth={2} />
                      <span className="text-white text-[14px] leading-snug">{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              <Button asChild className="w-full bg-white hover:bg-white/90 text-black rounded-none h-13 font-medium text-base">
                <a href="#intake" onClick={scrollTo("intake")} className="inline-flex items-center justify-center gap-2">
                  Book Consult — ₹3,500 <ArrowRight className="w-5 h-5" />
                </a>
              </Button>
              <p className="font-mono text-[10px] text-white/25 tracking-widest text-center mt-3">
                ₹3,500 · 20 minutes · All-inclusive
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── SECTION 8: BOOKING INTAKE ────────────────────────────────────────────────

function Intake() {
  return (
    <section id="intake" className="py-12 lg:py-20 bg-white border-b border-border">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          <div className="lg:col-span-5">
            <SectionLabel n="08" label="Intake" />
            <h2 className="font-serif text-3xl lg:text-5xl leading-[1.05] text-foreground mb-5">
              Secure your baseline.
            </h2>
            <p className="text-muted-foreground text-base leading-relaxed mb-6">
              Start with a 20-minute body composition consult. You leave with your measurements and an honest recommendation on whether AIWO Sculpt is right for your body.
            </p>
          </div>

          <div className="lg:col-span-6 lg:col-start-7">
            <ServiceBookingWidget />
            <div className="mt-4 text-center">
              <span className="font-mono text-[11px] text-muted-foreground tracking-widest">Prefer to call? </span>
              <a
                href="tel:+919150048626"
                className="font-mono text-[11px] text-foreground tracking-widest underline underline-offset-4 hover:opacity-60"
              >
                +91 91500 48626 →
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── SECTION 9: FAQ — 9 questions, white bg (from V1) ────────────────────────

function FAQSection() {
  const [open, setOpen] = useState<number | null>(null);

  const items = [
    {
      q: "Does AIWO Sculpt hurt?",
      a: "No — but you will feel it. The sessions produce intense, rhythmic muscle contractions deeper than anything voluntary exercise produces. Most clients describe the sensation as powerful but not painful. Intensity is set with you, not on you. We start low and increase as your tolerance builds.",
    },
    {
      q: "How is AIWO Sculpt different from Emsculpt or the body sculpt programmes at other clinics?",
      a: "Most India sculpting programmes use one or two technologies. AIWO Sculpt combines all three — HIFEM, EMS and RF — in the same applicator. And AIWO Sculpt is delivered inside an integrated longevity diagnostics centre, so your programme is informed by your body composition data, not designed in isolation.",
    },
    {
      q: "How many sessions will I actually need?",
      a: "The standard AIWO Sculpt programme is 20 sessions across 10 weeks. Some clients see visible change after session 4. Programme-end measurement is at session 20. Your specific session count is confirmed in your consult.",
    },
    {
      q: "Is AIWO Sculpt appropriate after childbirth?",
      a: "Yes, after the standard postpartum waiting period your obstetrician or gynaecologist confirms is appropriate for your delivery type. AIWO Sculpt's postpartum protocol is specifically designed for diastasis recti, pelvic floor weakness and abdominal laxity. Bring your post-delivery clearance to your consult.",
    },
    {
      q: "Are there side effects?",
      a: "Some clients report mild soreness in the 24 hours after a session — similar to a focused gym workout. Some report increased thirst. These typically resolve within a day. AIWO Sculpt is non-surgical and non-invasive. The treatment is not appropriate for clients with metal implants, pacemakers, or electronic devices in the treatment area, or during pregnancy.",
    },
    {
      q: "Will the results last?",
      a: "Muscle mass gained through AIWO Sculpt is maintained by continued use — the same as voluntary training. Fat cells eliminated in the treated area do not regenerate, but new fat deposits can form elsewhere with weight gain. AIWO Sculpt is most durable when paired with sustained training and nutrition habits. Maintenance sessions every 2–3 months can extend results.",
    },
    {
      q: "Do I need to do the diagnostics to start AIWO Sculpt?",
      a: "The body composition consult is included in the programme. DEXA, RMR and blood panel add-ons are optional but recommended for clients who want a fully measured programme. Your consult will tell you which add-ons are most useful for your situation.",
    },
    {
      q: "Can men do AIWO Sculpt?",
      a: "Yes. The four client profiles AIWO Sculpt is designed for — plateau athlete, postpartum recovery, longevity-tracker, post-weight-loss recovery — include both men and women. Approximately half of AIWO Sculpt clients are men.",
    },
    {
      q: "How do I book?",
      a: "Book your body composition consult through the form on this page. Or call our toll-free line at 1800-572-2496.",
    },
  ];

  return (
    <section id="faq" className="py-12 lg:py-20 bg-white border-b border-border">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          <div className="lg:col-span-4">
            <SectionLabel n="12" label="Questions" />
            <h2 className="font-serif text-3xl lg:text-4xl leading-[1.05] text-foreground mb-5">
              Everything you want to know before booking.
            </h2>
            <a
              href="tel:+919150048626"
              className="font-mono text-xs uppercase tracking-widest text-muted-foreground underline underline-offset-4 hover:text-foreground"
            >
              More questions? Call us →
            </a>
          </div>
          <div className="lg:col-span-7 lg:col-start-6">
            <div className="divide-y divide-border border-t border-b border-border">
              {items.map((item, i) => (
                <div key={i}>
                  <button
                    type="button"
                    onClick={() => setOpen(open === i ? null : i)}
                    className="w-full flex items-center justify-between gap-6 py-6 text-left"
                    aria-expanded={open === i}
                  >
                    <span className="font-serif text-base text-foreground leading-snug">{item.q}</span>
                    {open === i
                      ? <ChevronUp className="w-4 h-4 shrink-0 text-muted-foreground" />
                      : <ChevronDown className="w-4 h-4 shrink-0 text-muted-foreground" />
                    }
                  </button>
                  {open === i && (
                    <div className="pb-6">
                      <p className="text-muted-foreground text-[14px] leading-relaxed">{item.a}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── PAGE ─────────────────────────────────────────────────────────────────────

export default function SculptPage() {
  return (
    <div className="min-h-screen bg-white text-foreground font-sans">
      <MetaTags
        title="Body Sculpting in Mumbai | Non-Surgical Fat Reduction | AIWO"
        description="Transform your body with AIWO Sculpt. Non-surgical body contouring helps reduce stubborn fat, tone muscles and improve body shape. Book today."
      />
      <Navigation
        sections={[
          { label: "The Mechanism", href: "#what-it-delivers" },
          { label: "Process", href: "#process" },
          { label: "Compare", href: "#comparison" },
          { label: "FAQ", href: "#faq" },
        ]}
        ctaLabel="Book Consult · ₹3,500"
        ctaTarget="#intake"
      />
      <main>
        <Hero />
        <WhyItMatters />
        <TechStrip />
        <WhatItDelivers />
        <Process />
        <Comparison />
        <KeyDifference />
        <WhyItsDifferent />
        <Pricing />
        <Intake />
        <FAQSection />
      </main>
      <Footer brand="AIWO SCULPT" />
    </div>
  );
}
