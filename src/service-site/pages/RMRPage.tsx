import { useState } from "react";
import { Reveal } from "@/components/Reveal";
import { Button } from "@/components/ui/button";
import { Footer } from "@/components/sections/Footer";
import { Navigation } from "@/components/sections/Navigation";
import { ArrowRight, Check, ChevronDown, ChevronUp } from "lucide-react";
import rmrTestingImg from "@/assets/08-RMRTesting_1781241418139.webp";
import { BookingForm } from "@/components/sections/BookingForm";
import { MetaTags } from "@/components/MetaTags";

const scrollTo = (id: string) => (e: React.MouseEvent<HTMLAnchorElement>) => {
  e.preventDefault();
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
};

function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <span className="font-mono text-xs font-bold text-foreground uppercase tracking-widest block mb-4">
      {children}
    </span>
  );
}

function SectionLabel({ n, label }: { n: string; label: string }) {
  return (
    <div className="flex items-center gap-3 mb-6">
      <span className="font-mono text-xs text-muted-foreground tracking-widest">{n}</span>
      <span className="w-12 h-px bg-border" />
      <span className="font-mono text-xs uppercase tracking-widest text-foreground font-bold">
        {label}
      </span>
    </div>
  );
}

function RMRReportSVG() {
  const L = 32; // left margin
  const R = 368; // right edge
  return (
    <svg viewBox="0 0 400 500" className="w-full h-full" aria-hidden>
      {/* Background */}
      <rect width="400" height="500" fill="#000" />

      {/* Outer border */}
      <rect x="16" y="16" width="368" height="468" fill="none" stroke="rgba(255,255,255,0.15)" strokeWidth="1" />

      {/* Header row */}
      <rect x="16" y="16" width="368" height="36" fill="rgba(255,255,255,0.05)" />
      <line x1="16" y1="52" x2="384" y2="52" stroke="rgba(255,255,255,0.15)" strokeWidth="1" />
      <text x={L} y="38" fontFamily="monospace" fontSize="8.5" fill="rgba(255,255,255,0.45)" letterSpacing="1.8">
        AIWO RMR · SAMPLE · M · 34 · 78 KG · 175 CM
      </text>
      <text x={R} y="38" fontFamily="monospace" fontSize="8.5" fill="rgba(255,255,255,0.3)" letterSpacing="1" textAnchor="end">
        DIRECT
      </text>

      {/* ── RMR number ── */}
      <text x={L} y="88" fontFamily="monospace" fontSize="8.5" fill="rgba(255,255,255,0.35)" letterSpacing="2">
        RESTING METABOLIC RATE
      </text>
      <text x={L} y="142" fontFamily="Georgia, serif" fontSize="62" fontWeight="700" fill="white" letterSpacing="-1">
        2,510
      </text>
      <text x={L} y="160" fontFamily="monospace" fontSize="10" fill="rgba(255,255,255,0.45)" letterSpacing="1">
        kcal / day
      </text>

      {/* Divider */}
      <line x1={L} y1="176" x2={R} y2="176" stroke="rgba(255,255,255,0.1)" strokeWidth="1" />

      {/* ── Peer comparison ── */}
      <text x={L} y="196" fontFamily="monospace" fontSize="8.5" fill="rgba(255,255,255,0.35)" letterSpacing="1.8">
        YOUR RATE VS. PEERS
      </text>
      <rect x={L} y="204" width={R - L} height="7" rx="0" fill="rgba(255,255,255,0.08)" />
      <rect x={L} y="204" width="222" height="7" fill="rgba(255,255,255,0.72)" />
      <line x1="200" y1="201" x2="200" y2="214" stroke="rgba(255,255,255,0.25)" strokeWidth="1" strokeDasharray="2,2" />
      <text x={L} y="226" fontFamily="monospace" fontSize="8" fill="rgba(255,255,255,0.3)" letterSpacing="1">SLOWER</text>
      <text x={R} y="226" fontFamily="monospace" fontSize="8" fill="rgba(255,255,255,0.3)" letterSpacing="1" textAnchor="end">FASTER</text>
      <text x={L} y="243" fontFamily="monospace" fontSize="9" fill="white" letterSpacing="0.8">
        FASTER THAN EXPECTED
      </text>

      {/* Divider */}
      <line x1={L} y1="256" x2={R} y2="256" stroke="rgba(255,255,255,0.1)" strokeWidth="1" />

      {/* ── Calorie targets ── */}
      <text x={L} y="275" fontFamily="monospace" fontSize="8.5" fill="rgba(255,255,255,0.35)" letterSpacing="2">
        CALORIE TARGETS
      </text>
      {[
        { label: "MAINTENANCE", value: "3,514 kcal", y: 297, dim: false },
        { label: "WEIGHT LOSS", value: "2,510 kcal", y: 318, dim: false },
        { label: "EXERCISE BURN", value: "+600 kcal",  y: 339, dim: true  },
      ].map(({ label, value, y, dim }) => (
        <g key={label}>
          <text x={L} y={y} fontFamily="monospace" fontSize="9" fill="rgba(255,255,255,0.4)" letterSpacing="0.8">{label}</text>
          <text x={R} y={y} fontFamily="monospace" fontSize="11" fill={dim ? "rgba(255,255,255,0.5)" : "white"} letterSpacing="0.5" textAnchor="end">{value}</text>
        </g>
      ))}

      {/* Divider */}
      <line x1={L} y1="354" x2={R} y2="354" stroke="rgba(255,255,255,0.1)" strokeWidth="1" />

      {/* ── Quality Score + BMI ── two columns, no overlap ── */}
      <text x={L} y="372" fontFamily="monospace" fontSize="8.5" fill="rgba(255,255,255,0.35)" letterSpacing="2">QUALITY SCORE</text>
      <text x="220" y="372" fontFamily="monospace" fontSize="8.5" fill="rgba(255,255,255,0.35)" letterSpacing="2">BMI</text>

      {/* Quality bar */}
      <rect x={L} y="379" width="160" height="6" fill="rgba(255,255,255,0.08)" />
      <rect x={L} y="379" width="143" height="6" fill="rgba(255,255,255,0.75)" />

      {/* Score number */}
      <text x={L} y="414" fontFamily="Georgia, serif" fontSize="32" fontWeight="700" fill="white">89</text>
      <text x="72" y="414" fontFamily="monospace" fontSize="8.5" fill="rgba(255,255,255,0.4)">/100</text>
      <text x={L} y="428" fontFamily="monospace" fontSize="8" fill="rgba(255,255,255,0.35)" letterSpacing="1">HIGHLY RELIABLE</text>

      {/* BMI number */}
      <text x="220" y="414" fontFamily="Georgia, serif" fontSize="32" fontWeight="700" fill="white">22.86</text>
      <text x="220" y="428" fontFamily="monospace" fontSize="8" fill="rgba(255,255,255,0.35)" letterSpacing="1">HEALTHY</text>

      {/* Footer */}
      <line x1="16" y1="448" x2="384" y2="448" stroke="rgba(255,255,255,0.08)" strokeWidth="1" />
      <text x={L} y="462" fontFamily="monospace" fontSize="7.5" fill="rgba(255,255,255,0.2)" letterSpacing="1.2">
        AIWO LONGEVITY CLINIC · FAIRMONT MUMBAI · T2
      </text>
    </svg>
  );
}

function Hero() {
  return (
    <section className="relative bg-white border-b border-border overflow-hidden">
      <div className="absolute inset-0 clinical-grid opacity-50" />
      <div className="container mx-auto px-6 max-w-7xl relative py-12 lg:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          <div className="lg:col-span-7">
            <Reveal>
              <Eyebrow>RMR Test · Breath-Based · Mumbai</Eyebrow>
            </Reveal>
            <Reveal delay={0.1}>
              <h1 className="font-serif text-[36px] sm:text-[52px] lg:text-[66px] leading-[1.0] tracking-tight text-foreground mb-6 lg:mb-8">
                Your Calorie App
                <br />
                Is Guessing.
                <br />
                <span className="italic text-muted-foreground">Your AIWO RMR Test Measures.</span>
              </h1>
            </Reveal>
            <Reveal delay={0.15}>
              <p className="font-mono text-sm text-muted-foreground tracking-widest max-w-[560px] mb-5 uppercase">
                A 10-minute breath test. Your exact calorie burn. Personalised to you — not a population average.
              </p>
            </Reveal>
            <Reveal delay={0.2}>
              <p className="text-base lg:text-xl text-muted-foreground leading-relaxed max-w-[560px] mb-8 lg:mb-10">
                Every diet plan, every calorie tracker, every fitness app starts with an estimate. They use formulas built from population averages — and for any individual, those formulas can be wrong by up to 40%.
                <br /><br />
                The AIWO RMR Test uses indirect calorimetry — the gold-standard method used in university research — to measure your actual oxygen consumption while you breathe quietly for 10 minutes.
              </p>
            </Reveal>
            <Reveal delay={0.3}>
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
                <Button asChild className="bg-black hover:bg-black/90 text-white rounded-none h-14 px-8 font-medium text-base">
                  <a href="#book" onClick={scrollTo("book")} className="inline-flex items-center gap-2" data-track="hero-primary-cta">
                    Book My RMR Test <ArrowRight className="w-5 h-5" />
                  </a>
                </Button>
                <div className="flex flex-col">
                  <div className="flex items-baseline gap-3">
                    <span className="font-serif text-3xl text-foreground">₹2,499</span>
                    <span className="font-mono text-xs font-bold border border-foreground px-2 py-1">COMPLETE TEST</span>
                  </div>
                  <span className="text-xs text-muted-foreground mt-1 font-mono tracking-wide">
                    10 min · Indirect calorimetry · Report same day
                  </span>
                </div>
              </div>
            </Reveal>
            <Reveal delay={0.35}>
              <div className="mt-6">
                <a
                  href="https://wa.me/918682086820"
                  data-track="whatsapp-cta"
                  className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-muted-foreground hover:text-foreground transition-colors"
                >
                  Message Us on WhatsApp <ArrowRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </Reveal>
          </div>

          <div className="lg:col-span-5 relative">
            <Reveal delay={0.3} direction="none">
              <div className="aspect-[4/5] bg-black overflow-hidden border border-border">
                <RMRReportSVG />
              </div>
            </Reveal>
          </div>
        </div>

        <Reveal delay={0.4}>
          <div className="mt-10 lg:mt-16 border-t border-border pt-8 grid grid-cols-2 md:grid-cols-4 gap-4 lg:gap-6">
            {[
              "Indirect Calorimetry Gold Standard",
              "Accuracy: ±0.2% O₂ | ±2% Airflow",
              "Report Ready in 5 Minutes",
              "Mumbai's Dedicated Longevity Diagnostics Centre",
            ].map((item) => (
              <div key={item} className="flex items-start gap-2">
                <Check className="w-3.5 h-3.5 shrink-0 mt-0.5 text-foreground" strokeWidth={2.5} />
                <span className="font-mono text-[11px] tracking-wide text-muted-foreground leading-snug">{item}</span>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function TheSilentProblem() {
  return (
    <section id="problem" className="py-12 lg:py-20 bg-white border-b border-border">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 lg:gap-12 mb-8 lg:mb-12">
          <div className="lg:col-span-5">
            <SectionLabel n="01" label="The Problem" />
            <h2 className="font-serif text-3xl lg:text-6xl leading-[1.02] text-foreground">
              You Have Been Working With
              <br />
              <span className="italic text-muted-foreground">The Wrong Number.</span>
            </h2>
          </div>
          <div className="lg:col-span-6 lg:col-start-7 lg:flex lg:items-end mt-3 lg:mt-0">
            <p className="text-base lg:text-lg leading-relaxed text-foreground/70">
              Every month you eat to someone else's calorie estimate, not your own.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 mb-8 lg:mb-12">
          <div className="lg:col-span-7">
            <p className="text-lg text-foreground leading-relaxed mb-6">
              You track calories. You follow the plan. You're consistent. And yet — the scale doesn't move the way it should.
            </p>
            <p className="text-lg text-muted-foreground leading-relaxed mb-6">
              Here is why: the calorie target you are working from was calculated using a formula designed for average populations. For your body, it can be off by up to 600 calories a day.
            </p>
            <p className="text-lg text-foreground leading-relaxed">
              That is a full meal. Applied every day. In the wrong direction.
            </p>
          </div>
          <div className="lg:col-span-4 lg:col-start-9">
            <div className="border border-border p-6 lg:p-8 bg-black text-white">
              <div className="font-mono text-[10px] uppercase tracking-widest text-white/50 mb-4 lg:mb-6">
                Formula vs. Measured
              </div>
              <div className="space-y-6">
                <div>
                  <div className="font-mono text-[10px] uppercase tracking-widest text-white/40 mb-2">App estimate</div>
                  <div className="font-serif text-3xl text-white/40 line-through">2,100 kcal</div>
                  <div className="font-mono text-[10px] text-white/30 mt-1 tracking-wide">Mifflin-St Jeor formula</div>
                </div>
                <div className="border-t border-white/10 pt-6">
                  <div className="font-mono text-[10px] uppercase tracking-widest text-white/40 mb-2">AIWO measured</div>
                  <div className="font-serif text-4xl text-white">2,510 kcal</div>
                  <div className="font-mono text-[10px] text-white/50 mt-1 tracking-wide">Indirect calorimetry · direct measurement</div>
                </div>
                <div className="border-t border-white/10 pt-4">
                  <div className="font-mono text-[10px] uppercase tracking-widest text-white/60">Difference: 410 kcal/day</div>
                  <div className="font-mono text-[10px] text-white/40 mt-1">A full meal. Every day. In the wrong direction.</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-0 border border-border">
          {[
            {
              stat: "30–40%",
              label: "Formula error range",
              body: "Published research shows formula-based calorie estimates can differ from measured RMR by 10–40% in individuals. Individual formula accuracy varies significantly.",
            },
            {
              stat: "300–600",
              label: "kcal/day off",
              body: "For many individuals, the gap between their formula estimate and their actual resting calorie burn is large enough to determine whether a diet works or fails.",
            },
            {
              stat: "10 min",
              label: "To your real number",
              body: "One breath test. 10 minutes of quiet breathing. Your measured resting metabolic rate — expressed as a single, specific, personally verified number.",
            },
          ].map((c) => (
            <Reveal key={c.stat}>
              <div className="border-r border-b border-border p-6 lg:p-8 bg-white">
                <div className="font-serif text-[52px] leading-none text-foreground mb-3">{c.stat}</div>
                <div className="font-mono text-[11px] uppercase tracking-widest text-muted-foreground mb-4">{c.label}</div>
                <p className="text-sm text-muted-foreground leading-relaxed">{c.body}</p>
              </div>
            </Reveal>
          ))}
        </div>

      </div>
    </section>
  );
}

function WhatIsTheTest() {
  return (
    <section id="test" className="py-12 lg:py-20 bg-black text-white border-b border-black">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 mb-8 lg:mb-12">
          <div className="lg:col-span-6">
            <div className="font-mono text-xs uppercase tracking-widest text-white/60 mb-4">
              02 · The Science
            </div>
            <h2 className="font-serif text-3xl lg:text-6xl leading-[1.02] text-white">
              Indirect calorimetry
              <br />
              <span className="italic text-white/60">The science behind your exact number</span>
            </h2>
          </div>
          <div className="lg:col-span-5 lg:col-start-8 flex items-end">
            <p className="text-white/70 text-base lg:text-lg leading-relaxed">
              Your body cannot hide how it uses energy. Every calorie burned requires oxygen. AIWO's indirect calorimeter measures the oxygen — and calculates your exact metabolic rate from that measurement alone.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          <div className="lg:col-span-7">
            <p className="text-white/80 text-lg leading-relaxed mb-6">
              Resting Metabolic Rate is the total number of calories your body burns at rest to keep you alive — breathing, circulating blood, maintaining your brain, repairing cells. It accounts for 60–75% of all the energy you expend in a day.
            </p>
            <p className="text-white/70 text-lg leading-relaxed mb-6">
              The AIWO RMR Test measures yours using indirect calorimetry — the established gold standard for metabolic measurement used in hospitals, university research, and elite athletic programmes.
            </p>
            <div className="border border-white/10 p-6 my-8 bg-white/[0.03]">
              <div className="font-mono text-[10px] uppercase tracking-widest text-white/40 mb-4">The Science Made Simple</div>
              <p className="text-white/70 text-[15px] leading-relaxed mb-4">
                Burning 1 calorie requires 208 millilitres of oxygen. So oxygen consumption and calorie burn are directly, precisely linked.
              </p>
              <p className="text-white/70 text-[15px] leading-relaxed">
                AIWO's indirect calorimeter measures the exact volume of every breath you exhale and the precise concentration of oxygen in that air. From these two measurements — analysed breath by breath for 10 minutes — it calculates your exact resting metabolic rate. No formula. No population average. No inference. Just your oxygen. Your result.
              </p>
            </div>
            <p className="text-white/70 text-[15px] leading-relaxed">
              The device auto-calibrates using ambient room air in 90 seconds before every test. Your report includes a Quality Score — a confidence metric for your specific session. A score above 80 means your result is highly reliable. Most AIWO tests score 80–95.
            </p>
          </div>
          <div className="lg:col-span-4 lg:col-start-9">
            <div className="border border-white/10 p-6 space-y-6">
              <div className="font-mono text-[10px] uppercase tracking-widest text-white/40 mb-2">The Measurement Chain</div>
              {[
                { step: "01", label: "You breathe", body: "Quiet, resting breathing. 10 minutes." },
                { step: "02", label: "O₂ measured", body: "Volume and oxygen concentration of every exhaled breath." },
                { step: "03", label: "Calories calculated", body: "208 mL O₂ = 1 kcal. Fixed by biochemistry." },
                { step: "04", label: "Your RMR", body: "Your exact resting calorie burn — personalised to you." },
              ].map((item, i) => (
                <div key={i} className="flex gap-4">
                  <div className="font-mono text-[10px] text-white/30 pt-0.5 shrink-0">{item.step}</div>
                  <div>
                    <div className="font-mono text-[11px] uppercase tracking-widest text-white mb-1">{item.label}</div>
                    <p className="text-white/50 text-[13px] leading-snug">{item.body}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}

function WhyItsDifferent() {
  return (
    <section className="py-12 lg:py-20 bg-white border-b border-border">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="mb-10 lg:mb-14">
          <SectionLabel n="03" label="Why This Is Different" />
          <h2 className="font-serif text-3xl lg:text-5xl leading-[1.05] text-foreground max-w-3xl">
            Not all metabolic tests are built the same.
          </h2>
          <p className="text-base lg:text-lg text-muted-foreground leading-relaxed max-w-2xl mt-4 lg:mt-6">
            AIWO's indirect calorimeter uses two separate flow sensors — one for resting breathing, one for exercise. Most devices use one sensor for both. This distinction matters more than it sounds.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          <div>
            <p className="text-lg text-foreground leading-relaxed mb-6">
              Resting metabolic rate involves low, quiet, slow breathing. Exercise testing involves rapid, high-volume breathing. These are fundamentally different measurement challenges. A single sensor built for one is less accurate at the other.
            </p>
            <p className="text-lg text-muted-foreground leading-relaxed mb-6">
              AIWO's indirect calorimeter addresses this with dual-port, dual-sensor architecture:
            </p>
            <div className="space-y-4">
              <div className="flex gap-4 border border-border p-5">
                <div className="font-mono text-[10px] text-muted-foreground pt-0.5 shrink-0">LOW</div>
                <div>
                  <div className="font-mono text-[11px] uppercase tracking-widest text-foreground mb-1">Low-flow port</div>
                  <p className="text-muted-foreground text-[14px] leading-snug">Precision sensor optimised for the quiet breathing of an RMR test. Calibrated specifically for resting breath volumes.</p>
                </div>
              </div>
              <div className="flex gap-4 border border-border p-5">
                <div className="font-mono text-[10px] text-muted-foreground pt-0.5 shrink-0">HIGH</div>
                <div>
                  <div className="font-mono text-[11px] uppercase tracking-widest text-foreground mb-1">High-flow port</div>
                  <p className="text-muted-foreground text-[14px] leading-snug">Separate sensor optimised for VO₂ Max exercise testing. Not used for RMR — kept distinct so each sensor serves its purpose.</p>
                </div>
              </div>
            </div>
          </div>
          <div>
            <div className="border border-border p-6 lg:p-8 bg-muted/20 h-full flex flex-col justify-between">
              <div>
                <div className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground mb-6">What this means for you</div>
                <p className="text-foreground text-lg leading-relaxed mb-8">
                  Your resting metabolic rate is measured by a sensor specifically calibrated for resting breath volumes — not extrapolated from an exercise-grade instrument.
                </p>
              </div>
              <div className="border-t border-border pt-6">
                <div className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground mb-3">Result</div>
                <p className="font-serif text-xl text-foreground leading-snug">
                  The most accurate resting metabolic rate measurement available in Mumbai.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function WhatYourReportReveals() {
  const elements = [
    {
      n: "01",
      label: "Your Resting Metabolic Rate",
      body: "The exact number of calories your body burns at rest — in kcal/day. This is your foundation. Every nutrition plan, every weight-loss target, every maintenance strategy should be built from this number, not a formula.",
      example: "Example from AIWO sample report: 2,510 kcal/day",
    },
    {
      n: "02",
      label: "Your Metabolic Rate vs. Your Peers",
      body: "The report compares your measured RMR against others of your exact height and weight. You will know immediately if your metabolic rate is faster, average, or slower than expected for your size — a data point for calorie calculator like none ever given you.",
      example: "Example: Your metabolic rate is FASTER than others with your same height and weight.",
    },
    {
      n: "03",
      label: "Your Three Calorie Targets",
      body: "Maintenance calories (how much you need to maintain current weight), weight loss calories (your calorie target for fat loss — personalised to your actual metabolism), and exercise calories (estimated burn during physical activity). These are your numbers. No app. No average. Just your measured metabolism translated into a daily plan.",
      example: "Example: Maintenance 3,514 kcal | Weight loss 2,510 kcal",
    },
    {
      n: "04",
      label: "Quality Score",
      body: "Every AIWO RMR test includes a Quality Score — a confidence metric specific to your test session. A score of 80 or above means your result is highly reliable. This score reflects how consistently you breathed during the test and how stable the measurement was. Our experts will explain your results during the review.",
      example: "Example from sample report: Quality Score 89/100",
    },
    {
      n: "05",
      label: "BMI Classification",
      body: "A standard BMI assessment included alongside your metabolic data — so your report gives a complete picture of your metabolic and body composition baseline.",
      example: "Example: BMI 22.86 — Healthy",
    },
  ];

  return (
    <section id="report" className="py-12 lg:py-20 bg-white border-b border-border">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="mb-10 lg:mb-14">
          <SectionLabel n="04" label="What Your Report Reveals" />
          <h2 className="font-serif text-3xl lg:text-5xl leading-[1.05] text-foreground max-w-3xl">
            Your RMR report: five numbers that change everything.
          </h2>
          <p className="text-base lg:text-lg text-muted-foreground max-w-2xl mt-4 lg:mt-6 leading-relaxed">
            Not a generic printout. A personalised metabolic profile — including how your rate compares to others your height and weight.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 mb-8 lg:mb-12">
          <div className="lg:col-span-7 space-y-0 border border-border">
            {elements.map((el, i) => (
              <Reveal key={el.n}>
                <div className={`p-6 lg:p-8 ${i < elements.length - 1 ? "border-b border-border" : ""}`}>
                  <div className="flex gap-6 items-start">
                    <div className="font-mono text-[11px] text-muted-foreground shrink-0 pt-1">{el.n}</div>
                    <div>
                      <div className="font-mono text-[12px] uppercase tracking-widest text-foreground font-bold mb-3">{el.label}</div>
                      <p className="text-[15px] text-muted-foreground leading-relaxed mb-3">{el.body}</p>
                      <div className="font-mono text-[11px] text-muted-foreground/60 border border-border/50 px-3 py-2 inline-block">
                        {el.example}
                      </div>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>

          <div className="lg:col-span-4 lg:col-start-9">
            <div className="aspect-[4/5] border border-border relative overflow-hidden">
              <img
                src={rmrTestingImg}
                alt="Client undergoing AIWO RMR test"
                className="w-full h-full object-cover"
                style={{ filter: "grayscale(100%) contrast(1.15) brightness(0.95)" }}
              />
              <div className="absolute inset-0 bg-black/10" />
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4">
          <Button asChild className="bg-black hover:bg-black/90 text-white rounded-none h-14 px-8 font-medium">
            <a href="#book" onClick={scrollTo("book")} className="inline-flex items-center gap-2" data-track="mid-page-cta-1">
              See My Report — Book My RMR Test <ArrowRight className="w-5 h-5" />
            </a>
          </Button>
          <p className="self-center text-xs text-foreground font-mono tracking-wide border-2 border-foreground px-5 py-3 font-bold">Report in 5 minutes. Reviewed with AIWO's experts.</p>
        </div>
      </div>
    </section>
  );
}

function ValueEquation() {
  return (
    <section id="pricing" className="py-12 lg:py-20 bg-black text-white border-b border-black">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          <div className="lg:col-span-6">
            <div className="font-mono text-xs uppercase tracking-widest text-white/60 mb-4">
              05 · Pricing
            </div>
            <h2 className="font-serif text-3xl lg:text-6xl leading-[1.02] text-white mb-6 lg:mb-8">
              What your AIWO
              <br />
              <span className="italic text-white/60">RMR test includes.</span>
            </h2>
            <p className="text-white/60 text-base leading-relaxed mb-6 lg:mb-8">
              A standalone indirect calorimetry test at a sports medicine clinic typically costs ₹5,000–₹8,000. At AIWO, the RMR test includes not just the measurement — but everything around it.
            </p>
            <div className="space-y-3 lg:space-y-4 mb-6 lg:mb-8">
              {[
                "10-minute indirect calorimetry RMR test",
                "Dual-gas analysis (O₂ + CO₂) with auto-calibration",
                "Your exact RMR — measured, not estimated (kcal/day)",
                "Peer comparison: your rate vs. others of your height and weight",
                "Three calorie targets: maintenance / weight loss / exercise",
                "Quality Score — reliability metric for your specific session",
                "BMI assessment included",
                "AIWO Smart Report with additional metabolic insights",
                "Post-test expert consultation",
                "Option to consult AIWO's in-house nutritionist on your results",
              ].map((item) => (
                <div key={item} className="flex items-start gap-3">
                  <Check className="w-4 h-4 shrink-0 mt-0.5 text-white" strokeWidth={2} />
                  <span className="text-white text-[15px] leading-snug">{item}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-5 lg:col-start-8">
            <div className="border border-white/20 p-6 lg:p-8 sticky top-24">
              <div className="font-mono text-[10px] uppercase tracking-widest text-white/40 mb-6">
                Complete test
              </div>
              <div className="font-serif text-[72px] leading-none text-white mb-2">₹2,499</div>
              <p className="text-white/50 text-[15px] leading-relaxed mb-8">
                For a measurement that can change every nutrition and training decision you make for the next 12 months.
              </p>
              <Button asChild className="w-full bg-white text-black hover:bg-white/90 rounded-none h-14 font-medium text-base mb-4">
                <a href="#book" onClick={scrollTo("book")} data-track="pricing-cta" className="inline-flex items-center justify-center gap-2">
                  Book My RMR Test — ₹2,499 <ArrowRight className="w-5 h-5" />
                </a>
              </Button>
              <a
                href="https://wa.me/918682086820"
                className="flex items-center justify-center gap-2 font-mono text-xs uppercase tracking-widest text-white/50 hover:text-white transition-colors mb-8"
              >
                Message on WhatsApp <ArrowRight className="w-3 h-3" />
              </a>
              <div className="space-y-3 border-t border-white/10 pt-6">
                {[
                  { label: "Duration", value: "30–45 min total" },
                  { label: "Active test", value: "10 min breathing" },
                  { label: "Report", value: "In 5 minutes" },
                  { label: "Payment", value: "UPI, card, cash" },
                ].map((item) => (
                  <div key={item.label} className="flex items-center justify-between border-b border-white/10 pb-3">
                    <span className="font-mono text-[11px] uppercase tracking-widest text-white/40">{item.label}</span>
                    <span className="font-mono text-[12px] text-white">{item.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function HowItWorks() {
  const steps = [
    {
      n: "01",
      title: "Book Your Test",
      body: "Schedule your test at your preferred time — we offer appointments throughout the day to accommodate your schedule. Please note: The test requires a 4-hour fasting period beforehand. Instant confirmation is available via our online portal or WhatsApp.",
    },
    {
      n: "02",
      title: "Prepare (Simple)",
      body: "Fast for 4 hours before your test — water is fine. Skip caffeine, nicotine, and intense exercise on the day of the test. Wear comfortable clothing. That is everything.",
    },
    {
      n: "03",
      title: "The Test — 10 Minutes of Breathing",
      body: "Sit or lie back comfortably in our clinic. Breathe normally for 10 minutes. Stay relaxed. The indirect calorimeter measures every breath you exhale — capturing your oxygen consumption in real time. You do not need to do anything except breathe.",
    },
    {
      n: "04",
      title: "Your Report — Ready in 5 Minutes",
      body: "Your report is ready within 5 minutes. Our experts review your results with you. If you want to go further, book a nutritionist session to build a full eating plan.",
    },
  ];

  return (
    <section id="process" className="py-12 lg:py-20 bg-white border-b border-border">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 mb-8 lg:mb-12">
          <div className="lg:col-span-6">
            <SectionLabel n="06" label="How It Works" />
            <h2 className="font-serif text-3xl lg:text-5xl leading-[1.05] text-foreground">
              Four steps.
              <br />
              <span className="italic text-muted-foreground">10 minutes of breathing. Your real number.</span>
            </h2>
          </div>
          <div className="lg:col-span-5 lg:col-start-8 flex items-end">
            <p className="text-base lg:text-lg text-muted-foreground leading-relaxed">
              The test itself is the easiest part. People often say it feels like a restful 10 minutes in a calm room. The number it gives you can change how you approach nutrition for years.
            </p>
          </div>
        </div>

        <div className="space-y-0 border border-border">
          {steps.map((step, i) => (
            <Reveal key={step.n}>
              <div className={`grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-8 p-6 lg:p-8 ${i < steps.length - 1 ? "border-b border-border" : ""}`}>
                <div className="lg:col-span-1">
                  <div className="font-serif text-[40px] lg:text-[48px] leading-none text-muted-foreground/30">{step.n}</div>
                </div>
                <div className="lg:col-span-11">
                  <h3 className="font-mono text-sm uppercase tracking-widest text-foreground font-bold mb-3">{step.title}</h3>
                  <p className="text-[15px] text-muted-foreground leading-relaxed whitespace-pre-line">{step.body}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function WhoItsFor() {
  const tiles = [
    {
      label: "You've hit a plateau",
      body: "You're exercising and eating right, but the weight has stopped moving. A slower-than-expected metabolism — measurable through RMR testing — is one of the most common hidden causes.",
    },
    {
      label: "You can't get your nutrition right",
      body: "Every app gives you a different calorie target. None of them are measuring your body — they're estimating it. Your RMR test ends the disagreement with a number that's actually yours.",
    },
    {
      label: "You train regularly but your results lag",
      body: "Consistent training with inconsistent results often means the fuelling doesn't match the output. Your RMR tells you the baseline your training plan needs to be built on.",
    },
    {
      label: "Your energy is inconsistent",
      body: "Persistent fatigue with no clear cause can be connected to eating above or below your actual metabolic needs. Your RMR is the first number your doctor or nutritionist needs.",
    },
    {
      label: "You're managing your weight long-term",
      body: "After significant weight loss or gain, formula estimates become even less accurate — because they don't account for how your metabolism has adapted. A direct measurement resets your baseline.",
    },
    {
      label: "You want precision, not guesswork",
      body: "Some people get this test simply because they want to know. If you're someone who tracks, optimises, and makes evidence-based decisions — your RMR is a gap in your data that should be filled.",
    },
  ];

  return (
    <section className="py-12 lg:py-20 bg-white border-b border-border">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="mb-10 lg:mb-14">
          <SectionLabel n="07" label="Who This Is For" />
          <h2 className="font-serif text-3xl lg:text-5xl leading-[1.05] text-foreground max-w-3xl">
            The AIWO RMR Test is for you if…
          </h2>
          <p className="text-base lg:text-lg text-muted-foreground mt-4 lg:mt-6 max-w-2xl leading-relaxed">
            You don't need to be an athlete or have a health condition. If any of the following is true, your RMR number will change how you approach your health.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-0 border border-border mb-8 lg:mb-10">
          {tiles.map((tile) => (
            <Reveal key={tile.label}>
              <div className="border-r border-b border-border p-6 lg:p-8 bg-white">
                <div className="font-mono text-[11px] uppercase tracking-widest text-foreground font-bold mb-3">{tile.label}</div>
                <p className="text-[14px] text-muted-foreground leading-relaxed">{tile.body}</p>
              </div>
            </Reveal>
          ))}
        </div>

        <div className="border border-border p-5 mb-6 lg:mb-8 bg-muted/20">
          <p className="text-[14px] text-muted-foreground leading-relaxed">
            <span className="font-mono text-[11px] uppercase tracking-widest text-foreground font-bold block mb-2">Who this is not for</span>
            The AIWO RMR test is not for everyone. If you are pregnant, have a respiratory condition that significantly affects breathing, or have a medical condition that makes breath-based testing inadvisable, please consult your doctor before booking. For all other adults — if you eat, exercise, and care about your health — your RMR number matters.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4">
          <Button asChild className="bg-black hover:bg-black/90 text-white rounded-none h-14 px-8 font-medium">
            <a href="#book" onClick={scrollTo("book")} data-track="identity-cta" className="inline-flex items-center gap-2">
              For People Who Want Their Own Number <ArrowRight className="w-5 h-5" />
            </a>
          </Button>
          <p className="self-center text-xs text-foreground font-mono tracking-wide border-2 border-foreground px-5 py-3 font-bold">Book your AIWO RMR test.</p>
        </div>
      </div>
    </section>
  );
}

function Testimonials() {
  const testimonials = [
    {
      name: "Priya M., 34",
      context: "IT Manager",
      before: "I had been eating 1,300 calories a day for four months. I was convinced I had a 'broken metabolism' because nothing was moving.",
      after: "My AIWO RMR test showed my actual resting burn was 1,680 kcal/day. I had been eating 380 calories below my baseline — my body had been in stress mode the entire time.",
      bridge: "Six weeks after adjusting my intake to match my measured RMR, I lost 2.8 kg without changing my exercise at all. I just started eating to my actual metabolism.",
    },
    {
      name: "Karthik R., 41",
      context: "Business Owner",
      before: "I was training five days a week and following a coach's diet. Nothing was building. My trainer kept saying 'eat more' but I had no idea how much more.",
      after: "My RMR came in at 1,940 kcal/day — faster than expected for my weight. My total daily need with training was around 3,100 kcal. I had been eating 2,200.",
      bridge: "Three months later — after actually fuelling my training — my strength numbers improved significantly and my body composition shifted in a way four years of training hadn't managed.",
    },
    {
      name: "Deepa S., 29",
      context: "Doctor",
      before: "I knew theoretically what RMR was. But seeing my actual number — and seeing it compared to the formula estimate my fitness app used — was genuinely surprising.",
      after: "My app's estimate was out by nearly 280 calories a day. For a doctor who should know this stuff, it was humbling.",
      bridge: "I now recommend the AIWO RMR test to any patient who tells me they're 'eating right but not losing weight.' The formula is almost never accurate enough for clinical use.",
    },
  ];

  return (
    <section className="py-12 lg:py-20 bg-black text-white border-b border-black">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="mb-10 lg:mb-14">
          <div className="font-mono text-xs uppercase tracking-widest text-white/60 mb-4">08 · Social Proof</div>
          <h2 className="font-serif text-3xl lg:text-5xl leading-[1.05] text-white max-w-3xl">
            What people discovered after their AIWO RMR test.
          </h2>
          <p className="text-white/50 text-base mt-4 font-mono tracking-wide max-w-2xl">
            AIWO has conducted RMR tests for clients across Mumbai — from competitive athletes to working professionals to new mothers returning to fitness.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8 mb-8 lg:mb-10">
          {testimonials.map((t) => (
            <Reveal key={t.name}>
              <div className="border border-white/10 p-6 lg:p-8 flex flex-col gap-5 h-full">
                <div>
                  <div className="font-mono text-[11px] uppercase tracking-widest text-white/40 mb-1">Before</div>
                  <p className="text-white/60 text-[14px] leading-relaxed italic">"{t.before}"</p>
                </div>
                <div>
                  <div className="font-mono text-[11px] uppercase tracking-widest text-white/40 mb-1">After</div>
                  <p className="text-white/70 text-[14px] leading-relaxed">"{t.after}"</p>
                </div>
                <div>
                  <div className="font-mono text-[11px] uppercase tracking-widest text-white/40 mb-1">Bridge</div>
                  <p className="text-white/80 text-[14px] leading-relaxed">"{t.bridge}"</p>
                </div>
                <div className="border-t border-white/10 pt-4 mt-auto">
                  <div className="font-mono text-[12px] text-white font-bold">{t.name}</div>
                  <div className="font-mono text-[10px] text-white/40 tracking-wide mt-1">{t.context}</div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        <div className="flex flex-col sm:flex-row gap-4">
          <Button asChild className="bg-white text-black hover:bg-white/90 rounded-none h-14 px-8 font-medium">
            <a href="#book" onClick={scrollTo("book")} data-track="mid-page-cta-2" className="inline-flex items-center gap-2">
              Book Now <ArrowRight className="w-5 h-5" />
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
}

function FAQ() {
  const [open, setOpen] = useState<number | null>(null);
  const faqs = [
    {
      q: "How is this different from the BMR or calorie calculations my fitness app does?",
      a: "Your app uses a mathematical formula — typically Mifflin-St Jeor or Harris-Benedict — built from data across large populations. For any individual, those formulas can be 200–600 calories off. The AIWO RMR test uses indirect calorimetry: it physically measures the oxygen your lungs consume over 10 minutes and calculates your actual calorie burn from that. The formula estimates a number. The test measures yours.",
    },
    {
      q: "What is indirect calorimetry and how does it work?",
      a: "Burning 1 calorie requires 208 millilitres of oxygen. AIWO's indirect calorimeter measures the exact volume of air you exhale and the oxygen concentration in that air, breath by breath. From these two measurements it calculates exactly how many calories your body is burning at rest. The relationship between oxygen consumed and calories burned is fixed by biochemistry — so the measurement is highly precise.",
    },
    {
      q: "Do I need to fast before the test? What exactly is required?",
      a: "Yes — a 4-hour fast before your test (water is fine). On the day of the test: no caffeine, no nicotine, no intense exercise. Take your regular prescription medications as normal. These restrictions exist because food, stimulants, and recent exercise all temporarily change your metabolic rate — which would give you a result that reflects today's coffee, not your baseline metabolism.",
    },
    {
      q: "What is a Quality Score on the RMR report?",
      a: "AIWO's indirect calorimeter assigns a Quality Score (0–100) to every test session. It reflects how stable and consistent your breathing was during the test. A score of 80 or above means the measurement is highly reliable. Most AIWO tests score 80–95. If your score falls below 80, our experts will discuss whether a re-test is recommended — and if the lower score was due to any equipment or procedural issue on our side, the re-test is at no charge.",
    },
    {
      q: "How long does the test take?",
      a: "The active testing time is approximately 10 minutes of quiet breathing. Allow 30–45 minutes total for your visit, including arrival, setup, the test, and the brief results review with our experts.",
    },
    {
      q: "What does the report include exactly?",
      a: "Your report includes: your exact RMR in kcal/day, a comparison of your metabolic rate versus others of your height and weight, three calorie targets (maintenance / weight loss / exercise burn), a Quality Score, and your BMI. AIWO also provides a Smart Report with additional metabolic insights and a personalised expert consultation.",
    },
    {
      q: "Is ₹2,499 for the test alone, or does it include the consultation?",
      a: "₹2,499 includes the full indirect calorimetry RMR test, your personalised report, your AIWO Smart Report, and the post-test expert review. A full nutritionist consultation for a personalised eating plan is available as an additional service.",
    },
    {
      q: "How often should I re-test my RMR?",
      a: "Once annually is sufficient for most people to track metabolic changes over time. If you have made significant dietary changes, experienced major weight change, or changed your training programme substantially, a re-test 3–6 months later can show how your metabolism has adapted.",
    },
  ];

  return (
    <section id="faq" className="py-12 lg:py-20 bg-white border-b border-border">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="mb-10 lg:mb-14">
          <SectionLabel n="11" label="FAQ" />
          <h2 className="font-serif text-3xl lg:text-5xl leading-[1.05] text-foreground">
            Questions about the AIWO RMR test.
          </h2>
        </div>
        <div className="border border-border">
          {faqs.map((faq, i) => (
            <div key={i} className={i < faqs.length - 1 ? "border-b border-border" : ""}>
              <button
                onClick={() => setOpen(open === i ? null : i)}
                className="w-full text-left flex items-center justify-between gap-6 p-6 lg:p-8 hover:bg-muted/30 transition-colors"
                aria-expanded={open === i}
              >
                <span className="font-mono text-sm text-foreground font-medium leading-snug pr-4">{faq.q}</span>
                {open === i ? (
                  <ChevronUp className="w-4 h-4 shrink-0 text-muted-foreground" />
                ) : (
                  <ChevronDown className="w-4 h-4 shrink-0 text-muted-foreground" />
                )}
              </button>
              {open === i && (
                <div className="px-6 lg:px-8 pb-8 border-t border-border pt-6">
                  <p className="text-muted-foreground text-[15px] leading-relaxed max-w-3xl">{faq.a}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default function RMRPage() {
  return (
    <div className="min-h-screen bg-white">
      <MetaTags
        title="RMR Test in Mumbai | Resting Metabolic Rate Analysis Clinic"
        description="Measure your metabolism with an advanced RMR test in Mumbai. Get accurate resting metabolic rate analysis for weight loss, fitness, and personalized nutrition plans."
      />
      <Navigation
        sections={[
          { label: "The Science", href: "#test" },
          { label: "Your Report", href: "#report" },
          { label: "Pricing", href: "#pricing" },
          { label: "FAQ", href: "#faq" },
        ]}
        ctaLabel="Book · ₹2,499"
      />
      <main className="pt-0 md:pt-[80px]">
        <Hero />
        <TheSilentProblem />
        <WhatIsTheTest />
        <WhyItsDifferent />
        <WhatYourReportReveals />
        <ValueEquation />
        <HowItWorks />
        <WhoItsFor />
        <Testimonials />
        <BookingForm />
        <FAQ />
      </main>
      <Footer />
    </div>
  );
}
