import { useState } from "react";
import { Reveal } from "@/components/Reveal";
import { Button } from "@/components/ui/button";
import { Footer } from "@/components/sections/Footer";
import { ArrowRight, Check, ChevronDown, ChevronUp } from "lucide-react";
import vo2TestingImg from "@/assets/09-Vo2maxtesting_1781348570353.webp";
import { BookingForm } from "@/components/sections/BookingForm";
import { MetaTags } from "@/components/MetaTags";
import { Navigation } from "@/components/sections/Navigation";

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


function Hero() {
  return (
    <section className="relative bg-white border-b border-border overflow-hidden">
      <div className="absolute inset-0 clinical-grid opacity-50" />
      <div className="container mx-auto px-6 max-w-7xl relative py-12 lg:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          <div className="lg:col-span-7">
            <Reveal>
              <Eyebrow>VO2 Max Test · Lab-Measured · Mumbai</Eyebrow>
            </Reveal>
            <Reveal delay={0.1}>
              <h1 className="font-serif text-[36px] sm:text-[52px] lg:text-[66px] leading-[1.0] tracking-tight text-foreground mb-6 lg:mb-8">
                4 Pages of Data
                <br />
                About Your
                <br />
                Cardiovascular Fitness
                <br />
                <span className="italic text-muted-foreground">That No Wearable Can Produce.</span>
              </h1>
            </Reveal>
            <Reveal delay={0.15}>
              <p className="font-mono text-sm text-muted-foreground tracking-widest max-w-[560px] mb-5 uppercase">
                Gold-standard measurement. University-validated accuracy. 60 minutes at AIWO Mumbai.
              </p>
            </Reveal>
            <Reveal delay={0.2}>
              <p className="text-base lg:text-xl text-muted-foreground leading-relaxed max-w-[560px] mb-8 lg:mb-10">
                You track your fitness every day. But your watch has never measured your oxygen. It has never measured your carbon dioxide. It has never shown you exactly where your body stops burning fat and starts burning only carbohydrates.
                <br /><br />
                At AIWO, your VO2 Max is measured — not estimated. Our analyser uses mixing chamber technology, the gold standard in exercise physiology, independently validated at the University of Southern California and Oregon State University.
                <br /><br />
                <span className="text-foreground font-medium">In 60 minutes, you receive a 4-page clinical report: your real VO2 Max, precise training zones, the exact heart rate where fat burning stops, and a 14-stage breakdown of how your body responds at every intensity.</span>
              </p>
            </Reveal>
            <Reveal delay={0.3}>
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
                <Button asChild className="bg-black hover:bg-black/90 text-white rounded-none h-14 px-8 font-medium text-base">
                  <a href="#book" onClick={scrollTo("book")} className="inline-flex items-center gap-2">
                    Book My Test <ArrowRight className="w-5 h-5" />
                  </a>
                </Button>
                <div className="flex flex-col">
                  <div className="flex items-baseline gap-3">
                    <span className="font-serif text-3xl text-foreground">₹7,999</span>
                    <span className="font-mono text-xs font-bold border border-foreground px-2 py-1">CONSULTATION</span>
                  </div>
                  <span className="text-xs text-muted-foreground mt-1 font-mono tracking-wide">
                    60 min · Mixing chamber gold standard · Report on-site
                  </span>
                </div>
              </div>
            </Reveal>
          </div>

          <div className="lg:col-span-5 relative">
            <Reveal delay={0.3} direction="none">
              <div className="aspect-[4/5] bg-black overflow-hidden border border-border">
                <img
                  src={vo2TestingImg}
                  alt="Client undergoing AIWO VO2 Max test"
                  className="w-full h-full object-cover"
                  style={{ filter: "grayscale(100%) contrast(1.2) brightness(0.85)" }}
                />
              </div>
            </Reveal>
          </div>
        </div>

        <div className="mt-10 lg:mt-16 border-t border-border pt-8 grid grid-cols-2 md:grid-cols-4 gap-4 lg:gap-6">
          {[
            "Mixing Chamber Gold Standard",
            "4-Page Report On-Site + Expert Consultation",
            "No Fasting Required",
            "Mumbai's Dedicated Longevity Diagnostics Centre",
          ].map((item) => (
            <div key={item} className="flex items-start gap-2">
              <Check className="w-3.5 h-3.5 shrink-0 mt-0.5 text-foreground" strokeWidth={2.5} />
              <span className="font-mono text-[11px] tracking-wide text-muted-foreground leading-snug">{item}</span>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

function TheSilentProblem() {
  return (
    <section id="problem" className="py-12 lg:py-20 bg-white border-b border-border">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 lg:gap-12 mb-8 lg:mb-12">
          <div className="lg:col-span-6">
            <SectionLabel n="01" label="The Silent Problem" />
            <h2 className="font-serif text-3xl lg:text-6xl leading-[1.02] text-foreground">
              You exercise.
              <br />
              You watch what you eat.
              <br />
              <span className="italic text-muted-foreground">You still don't know.</span>
            </h2>
          </div>
          <div className="lg:col-span-5 lg:col-start-8 lg:flex lg:items-end mt-3 lg:mt-0">
            <p className="text-base lg:text-lg text-muted-foreground leading-relaxed">
              Fitness metrics on your wrist are estimates. Your cardiovascular system deserves better than an estimate.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 mb-8 lg:mb-12">
          <div className="lg:col-span-7">
            <p className="text-lg text-foreground leading-relaxed mb-6">
              VO2 Max is the maximum oxygen your cardiovascular system can process during exercise — one of the strongest predictors of long-term health. A 2018 JAMA study across 122,000 patients found that moving from the lowest fitness category to even the next category up was associated with a 50% reduction in all-cause mortality risk. Yet most people have never measured it. Consumer fitness trackers estimate VO2 Max from heart rate algorithms — never measuring oxygen or carbon dioxide. Research shows these estimates carry an average error of up to 16%: enough to place you in the wrong training zone entirely.
            </p>
          </div>
          <div className="lg:col-span-5">
            <div className="border border-border p-6 lg:p-8 bg-black text-white">
              <div className="font-mono text-[10px] uppercase tracking-widest text-white/50 mb-6">
                The error that matters
              </div>
              <div className="space-y-6">
                <div>
                  <div className="font-mono text-xs text-white/60 mb-2 uppercase tracking-widest">Wearable Estimate</div>
                  <div className="flex items-baseline gap-3">
                    <span className="font-serif text-4xl">48</span>
                    <span className="font-mono text-sm text-white/50">mL/kg/min ± 16%</span>
                  </div>
                  <div className="mt-2 w-full h-1.5 bg-white/10">
                    <div className="h-full bg-white/30" style={{ width: "76%" }} />
                  </div>
                  <div className="font-mono text-[10px] text-white/40 mt-1 tracking-widest">ESTIMATED · ALGORITHM-DERIVED</div>
                </div>
                <div className="border-t border-white/10 pt-6">
                  <div className="font-mono text-xs text-white/60 mb-2 uppercase tracking-widest">AIWO Lab Measurement</div>
                  <div className="flex items-baseline gap-3">
                    <span className="font-serif text-4xl">41.2</span>
                    <span className="font-mono text-sm text-white/50">mL/kg/min</span>
                  </div>
                  <div className="mt-2 w-full h-1.5 bg-white/10">
                    <div className="h-full bg-white" style={{ width: "65%" }} />
                  </div>
                  <div className="font-mono text-[10px] text-white/40 mt-1 tracking-widest">DIRECT · GAS ANALYSIS · CLINICAL</div>
                </div>
              </div>
              <div className="border-t border-white/10 mt-6 pt-6 font-mono text-[10px] text-white/40 tracking-widest">
                SAMPLE DATA · NOT DIAGNOSTIC · INDIVIDUAL RESULTS VARY
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 border-t border-l border-border">
          {[
            {
              stat: "50%",
              label: "Mortality risk reduction",
              body: "A landmark JAMA 2018 study (Mandsager et al.) found moving from the lowest VO2 Max category to the second-lowest was associated with a 50% reduction in all-cause mortality risk.",
            },
            {
              stat: "16%",
              label: "Average wearable error",
              body: "Research on consumer fitness trackers shows VO2 Max estimates carry an average error of up to 16%. That error determines which training zone you're actually in.",
            },
            {
              stat: "60 min",
              label: "Everything you need",
              body: "One appointment. Mixing chamber gold standard. 4-page report on-site. 14-stage breakdown. Expert consultation on-site. Everything your annual check-up never captures.",
            },
          ].map((c) => (
            <Reveal key={c.stat}>
              <div className="border-r border-b border-border p-6 lg:p-8 bg-white">
                <div className="font-serif text-5xl lg:text-6xl text-foreground mb-2">{c.stat}</div>
                <div className="font-mono text-[11px] uppercase tracking-widest text-muted-foreground mb-4">{c.label}</div>
                <p className="text-[15px] text-muted-foreground leading-relaxed">{c.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function WhatItMeasures() {
  const pages = [
    {
      page: "Page 1",
      label: "VO2 Max Summary + Training Zones",
      body: "Your core results in one view: VO2 Max, heart rate, and calories at Start, Aerobic Threshold, Anaerobic Threshold, and VO2 Max. Heart rate recovery (1 min + 2 min). Five personalised training zones with exact heart rate, speed, and calorie ranges. Your fitness classification: Very Low / Low / Fair / Good / Excellent / Superior.",
    },
    {
      page: "Page 2",
      label: "VO2 Test Graph",
      body: "A real-time graph plotting three lines across your full test: VO2 (oxygen consumption), VCO2 (carbon dioxide production), and Heart Rate. Aerobic Threshold (AeT) and Anaerobic Threshold (AT) plotted as vertical reference lines. You see the exact moment your aerobic system reaches its ceiling.",
    },
    {
      page: "Page 3",
      label: "14 Stage Averages — The Deep Data",
      body: "For each of the 14 stages of your test: Heart Rate, Speed, VO2, VE/VO2, VE/VCO2, RER (Respiratory Exchange Ratio), CHO% and Fat% at every intensity, grams of fat and carbohydrate burned per minute, and total calories per hour. This is where you see exactly where fat burning peaks — and where it disappears.",
    },
    {
      page: "Page 4",
      label: "Effective Fat Burn Chart",
      body: "A visual bar chart showing total calories, fat calories, and carbohydrate calories at each stage. Heart rate and speed displayed below each bar. At a glance: the exact heart rate range where fat burning is maximised and the precise point where it drops to zero. The single most actionable page in your report.",
    },
  ];

  return (
    <section id="measures" className="py-12 lg:py-20 bg-black text-white border-b border-black">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 mb-8 lg:mb-12">
          <div className="lg:col-span-6">
            <div className="font-mono text-xs uppercase tracking-widest text-white/60 mb-4">
              02 · What the AIWO VO2 Max Test Measures
            </div>
            <h2 className="font-serif text-3xl lg:text-6xl leading-[1.02] text-white">
              4-page report
              <br />
              <span className="italic text-white/60">On-site — In 60 minutes</span>
            </h2>
          </div>
          <div className="lg:col-span-5 lg:col-start-8 lg:flex lg:items-end mt-3 lg:mt-0">
            <p className="text-white/70 text-base lg:text-lg leading-relaxed">
              The AIWO VO2 Max test is not an estimate from a formula. It is a direct measurement. AIWO's mixing chamber analyser collects and analyses your expired air at every level of effort — measuring both the oxygen you consume (O₂) and the carbon dioxide you produce (CO₂) simultaneously. The system self-calibrates for barometric pressure, temperature, and humidity before every test. Automatically. Every. Single. Test.
            </p>
          </div>
        </div>

        {/* 4-page report grid */}
        <div className="font-mono text-[11px] uppercase tracking-widest text-white/50 mb-6">
          Your 4-Page Report — What You Receive On-Site
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 border-t border-l border-white/20 mb-8 lg:mb-10">
          {pages.map((p, i) => (
            <Reveal key={p.page} delay={i * 0.07}>
              <div className="border-r border-b border-white/20 p-6 lg:p-8 h-full">
                <div className="font-mono text-[11px] uppercase tracking-widest text-white/40 mb-2">{p.page}</div>
                <h3 className="font-serif text-xl text-white mb-4 leading-snug">{p.label}</h3>
                <p className="text-white/60 text-[15px] leading-relaxed">{p.body}</p>
              </div>
            </Reveal>
          ))}
        </div>

        {/* Sample data table */}
        <div className="border border-white/20 overflow-hidden mb-8 lg:mb-10">
          <div className="p-6 border-b border-white/20 flex items-center justify-between">
            <div className="font-mono text-[11px] uppercase tracking-widest text-white/50">
              Sample Report Data — Illustrative Only
            </div>
            <div className="font-mono text-[11px] text-white/30 tracking-widest">
              NOT DIAGNOSTIC · INDIVIDUAL RESULTS VARY
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm font-mono">
              <thead>
                <tr className="border-b border-white/10 text-white/40 text-[11px] uppercase tracking-widest">
                  <td className="p-4 lg:p-6">Milestone</td>
                  <td className="p-4 lg:p-6">Heart Rate</td>
                  <td className="p-4 lg:p-6">VO2 (mL/kg/min)</td>
                  <td className="p-4 lg:p-6">Fuel Zone</td>
                </tr>
              </thead>
              <tbody>
                {[
                  { milestone: "Start", hr: "69 bpm", vo2: "2.5", fuel: "Fat dominant — 57 Kcal/hr" },
                  { milestone: "Aerobic Threshold (AeT)", hr: "132 bpm", vo2: "16.4", fuel: "Fat/Mixed — 379 Kcal/hr", highlight: true },
                  { milestone: "Anaerobic Threshold (AT)", hr: "153 bpm", vo2: "23.1", fuel: "Carb dominant — 553 Kcal/hr", highlight: true },
                  { milestone: "VO2 Max (measured)", hr: "193 bpm", vo2: "32.7", fuel: "Peak — 782 Kcal/hr" },
                ].map((row) => (
                  <tr
                    key={row.milestone}
                    className={`border-b border-white/10 ${row.highlight ? "bg-white/5" : ""}`}
                  >
                    <td className="p-4 lg:p-6 text-white">{row.milestone}</td>
                    <td className="p-4 lg:p-6 text-white/70">{row.hr}</td>
                    <td className="p-4 lg:p-6 text-white font-bold">{row.vo2}</td>
                    <td className="p-4 lg:p-6 text-white/50">{row.fuel}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="p-4 font-mono text-[10px] text-white/30 tracking-widest border-t border-white/10">
            Real AIWO client data — name and identifiers redacted · Fitness classification: Low (6-point scale) · Your report replaces every number here · Not diagnostic · Individual results vary
          </div>
        </div>

        <div className="mt-10 flex justify-end">
          <Button asChild className="bg-white hover:bg-white/90 text-black rounded-none h-12 px-8 font-medium">
            <a href="#book" onClick={scrollTo("book")} className="inline-flex items-center gap-2">
              Book My Test <ArrowRight className="w-4 h-4" />
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
}

function ValueEquation() {
  return (
    <section className="py-12 lg:py-20 bg-black text-white border-b border-black">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          <div className="lg:col-span-5">
            <div className="font-mono text-xs uppercase tracking-widest text-white/60 mb-4">
              03 · The Value Equation
            </div>
            <h2 className="font-serif text-3xl lg:text-5xl leading-[1.05] text-white mb-6 lg:mb-8">
              ₹7,999 for the most important health data you've ever collected.
            </h2>
            <p className="text-white/70 text-lg leading-relaxed">
              The most detailed fitness assessment available in Mumbai.
            </p>
          </div>

          <div className="lg:col-span-6 lg:col-start-7">
            <div className="border border-white/20 p-6 lg:p-8">
              <div className="font-mono text-[11px] uppercase tracking-widest text-white/50 mb-5 lg:mb-6">
                What ₹7,999 includes
              </div>
              <div className="space-y-3 lg:space-y-4 mb-6 lg:mb-8">
                {[
                  "60-minute graded exercise test, mixing chamber technology",
                  "Your VO2 Max — measured, not estimated",
                  "5 personalised training zones from your actual AeT and AT",
                  "Fat vs carbohydrate burn curve at every heart rate",
                  "14-stage performance breakdown",
                  "4-page printed report, on-site same day",
                ].map((item) => (
                  <div key={item} className="flex items-start gap-3">
                    <Check className="w-4 h-4 shrink-0 mt-0.5 text-white" strokeWidth={2} />
                    <span className="text-white text-[15px] leading-snug">{item}</span>
                  </div>
                ))}
              </div>
              <div className="border-t border-white/20 pt-6 flex items-baseline gap-4">
                <span className="font-serif text-5xl text-white">₹7,999</span>
              </div>
            </div>
            <Button asChild className="mt-6 w-full bg-white hover:bg-white/90 text-black rounded-none h-14 font-medium text-base">
              <a href="#book" onClick={scrollTo("book")} className="inline-flex items-center justify-center gap-2">
                Book My Test <ArrowRight className="w-5 h-5" />
              </a>
            </Button>
            <p className="text-center font-mono text-[11px] text-white/40 tracking-widest mt-3">
              No fasting. No injections. 60 minutes. Fairmont Mumbai, T2.
            </p>
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
      title: "Book in 60 Seconds",
      body: "Choose a date and time online or send a WhatsApp message. Instant confirmation. No fasting required.",
    },
    {
      n: "02",
      title: "Arrive at AIWO, Fairmont Mumbai",
      body: "Come dressed for exercise. Arrive 15 minutes before your appointment. Our team runs a short health screen to confirm the test is right for you.",
    },
    {
      n: "03",
      title: "Your 45-Minute Test",
      body: "You wear a mask connected to AIWO's mixing chamber analyser and exercise on a treadmill or stationary bike at progressively increasing intensity. The active phase is approximately 10–14 minutes; warm-up, setup, and cool-down complete the full 60 minutes.",
    },
    {
      n: "04",
      title: "Your 4-Page Report, On-Site",
      body: "Your report prints immediately. Your AIWO expert walks you through all four pages on-site.",
    },
    {
      n: "05",
      title: "Expert Consultation",
      body: "An AIWO expert reviews your results with you on-site and provides personalised training guidance based on your data.",
    },
  ];

  return (
    <section id="process" className="py-12 lg:py-20 bg-white border-b border-border">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 mb-8 lg:mb-12">
          <div className="lg:col-span-6">
            <SectionLabel n="04" label="How It Works" />
            <h2 className="font-serif text-3xl lg:text-5xl leading-[1.05] text-foreground">
              Book. Test. Report.
              <br />
              <span className="italic text-muted-foreground">From booking to report in hand — same day.</span>
            </h2>
          </div>
          <div className="lg:col-span-5 lg:col-start-8 lg:flex lg:items-end mt-3 lg:mt-0">
            <p className="text-base lg:text-lg text-muted-foreground leading-relaxed">
              Most people expect a clinical test to be complicated. This one isn't.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 border-t border-l border-border mb-8 lg:mb-12">
          {steps.map((s, i) => (
            <Reveal key={s.n} delay={i * 0.07}>
              <div className={`border-r border-b border-border p-6 lg:p-8 h-full ${i === 4 ? "bg-black text-white" : "bg-white"}`}>
                <div className={`font-mono text-[11px] uppercase tracking-widest mb-4 ${i === 4 ? "text-white/40" : "text-muted-foreground"}`}>
                  Step {s.n}
                </div>
                <h3 className={`font-serif text-xl mb-4 leading-snug ${i === 4 ? "text-white" : "text-foreground"}`}>
                  {s.title}
                </h3>
                <p className={`text-[15px] leading-relaxed ${i === 4 ? "text-white/70" : "text-muted-foreground"}`}>
                  {s.body}
                </p>
              </div>
            </Reveal>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 border-t border-border pt-8 lg:pt-12">
          <div>
            <div className="font-mono text-[11px] uppercase tracking-widest text-muted-foreground mb-5">
              What to do before your test
            </div>
            <div className="space-y-3">
              {[
                "Eat normally — no fasting required",
                "No strenuous exercise in the 24 hours before",
                "No caffeine for 4 hours before your test",
                "Do not smoke for at least 4 hours before",
                "Wear comfortable exercise clothes and training shoes",
                "If you use a rescue inhaler, bring it",
              ].map((item) => (
                <div key={item} className="flex items-start gap-3">
                  <Check className="w-4 h-4 shrink-0 mt-0.5 text-foreground" strokeWidth={2} />
                  <span className="text-[15px] text-foreground leading-snug">{item}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="border border-border p-6 lg:p-8">
            <div className="font-mono text-[11px] uppercase tracking-widest text-muted-foreground mb-4">
              Location
            </div>
            <div className="font-serif text-xl text-foreground mb-2">AIWO Longevity Clinic</div>
            <p className="text-muted-foreground text-[15px] leading-relaxed">
              Level 2, Fairmont Mumbai, T2 Terminal<br />
              Chhatrapati Shivaji Maharaj International Airport Road<br />
              Mumbai 400 099, Maharashtra
            </p>
            <div className="mt-6 border-t border-border pt-6">
              <a
                href="#book" onClick={scrollTo("book")}
                className="font-mono text-xs uppercase tracking-widest text-foreground underline underline-offset-4 hover:opacity-60"
              >
                Book My Appointment
              </a>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}

function WhoIsItFor() {
  return (
    <section className="py-12 lg:py-20 bg-white border-b border-border">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="mb-10 lg:mb-14">
          <SectionLabel n="05" label="Who This Is For" />
          <h2 className="font-serif text-3xl lg:text-5xl leading-[1.05] text-foreground max-w-2xl">
            The VO2 Max test is for you if any of these are true.
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          <div>
            <div className="border border-border overflow-hidden">
              <div className="bg-black text-white p-5 font-mono text-[11px] uppercase tracking-widest">
                This test is for you if
              </div>
              <div className="divide-y divide-border">
                {[
                  "You exercise regularly but have never verified your actual training zones.",
                  "Your fitness tracker gives a VO2 Max number and you want to know if it's accurate.",
                  "You train for endurance or manage weight and want to know where your body burns fat.",
                  "You have a family history of cardiovascular issues and want a sensitive baseline.",
                ].map((item, i) => (
                  <div key={i} className="p-5 flex items-start gap-4">
                    <Check className="w-4 h-4 shrink-0 mt-0.5 text-foreground" strokeWidth={2.5} />
                    <p className="text-[15px] text-foreground leading-snug">{item}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-8">
            <div className="border border-border overflow-hidden">
              <div className="bg-muted p-5 font-mono text-[11px] uppercase tracking-widest text-muted-foreground">
                Medical clearance required if
              </div>
              <div className="divide-y divide-border">
                {[
                  "You have been diagnosed with a serious cardiovascular or pulmonary condition and have not received medical clearance for maximal exercise testing. Speak to a qualified medical professional first — or ask us about our submaximal option.",
                  "You have experienced chest pain, fainting, or significant breathlessness during exercise in the past 6 months without medical review.",
                ].map((item, i) => (
                  <div key={i} className="p-5 flex items-start gap-4">
                    <span className="font-mono text-xs text-muted-foreground shrink-0 mt-0.5">—</span>
                    <p className="text-[15px] text-muted-foreground leading-snug">{item}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="border border-border p-6 lg:p-8">
              <div className="font-mono text-[11px] uppercase tracking-widest text-muted-foreground mb-4">
                AIWO Experts
              </div>
              <blockquote className="font-serif text-xl text-foreground leading-relaxed">
                "We test everyone from competitive marathoners to people who haven't exercised in two years and want to know where they're starting from. The test is adapted to your fitness level. We have never failed to complete a test for a client whose health screen cleared them to participate."
              </blockquote>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Testimonials() {
  const cards = [
    {
      quote:
        "I run four days a week and thought I had a good sense of my fitness. My Garmin had been telling me my VO2 Max was 48 for two years. The AIWO test gave me 41. More importantly, it told me my Zone 2 boundary was at 138 bpm — not the 148 my watch was using. Three months later, my easy runs are genuinely easy and my VO2 Max has moved to 44.2 on my next test.",
      name: "Karthik R.",
      meta: "38 · Marathoner · Mumbai",
    },
    {
      quote:
        "I am not an athlete. I walk 45 minutes daily and do yoga. I came in because my father died of a cardiac event at 57 and I wanted to understand my own risk. My VO2 Max put me in the below average category for my age group. An AIWO expert explained that two Zone 2 cardio sessions per week would likely move me to average in six months. That is a clear, actionable answer I had never received from any standard check-up.",
      name: "Priya S.",
      meta: "46 · Business Owner · Mumbai",
    },
  ];

  return (
    <section className="py-12 lg:py-20 bg-black text-white border-b border-black">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="mb-10 lg:mb-14">
          <div className="font-mono text-xs uppercase tracking-widest text-white/60 mb-4">
            06 · What Our Members Discovered
          </div>
          <h2 className="font-serif text-3xl lg:text-5xl leading-[1.05] text-white max-w-2xl">
            The number changed
            <br />
            <span className="italic text-white/60">So did the training</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 border-t border-l border-white/20">
          {cards.map((c, i) => (
            <Reveal key={i} delay={i * 0.1}>
              <div className="border-r border-b border-white/20 p-6 lg:p-8 h-full">
                <blockquote className="font-serif text-lg text-white leading-relaxed mb-8">
                  "{c.quote}"
                </blockquote>
                <div className="border-t border-white/20 pt-6">
                  <div className="font-mono text-xs text-white/80 tracking-widest">{c.name}</div>
                  <div className="font-mono text-[11px] text-white/40 tracking-widest mt-1">{c.meta}</div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
        <div className="mt-6 font-mono text-[10px] text-white/30 tracking-widest">
          Individual results vary. Testimonials are illustrative — AIWO will replace with verified, consented client accounts before publishing.
        </div>
      </div>
    </section>
  );
}

function FAQ() {
  const [open, setOpen] = useState<number | null>(null);

  const items = [
    {
      q: "My annual blood test and ECG were fine. Why do I need a VO2 Max test?",
      a: "Your blood test measures chemical markers at rest. Your ECG measures electrical activity at rest. Neither one measures how your cardiovascular system performs under the load of actual exercise — which is when most cardiac and respiratory stress occurs. VO2 Max is the measure of function under load. It reveals what resting tests cannot.",
    },
    {
      q: "My Apple Watch already gives me a VO2 Max estimate. Is a lab test really necessary?",
      a: "That depends on how much the number matters to you. If VO2 Max is primarily a curiosity metric, your watch is sufficient. If it is a number you intend to train from, benchmark against, or use as a health indicator — research shows wearable estimates carry an average error of up to 16%. A direct lab measurement eliminates that error entirely.",
    },
    {
      q: "I'm not an athlete. Is this test relevant to me?",
      a: "VO2 Max is more relevant to non-athletes than it is to competitive athletes, because it is the most sensitive early indicator of cardiovascular aging. Athletes monitor it for performance. Everyone else should monitor it for longevity. The lower a person's VO2 Max relative to their age and gender, the higher their statistical risk. You do not need to be an athlete for that data to matter.",
    },
    {
      q: "How physically demanding is the test? What if I can't complete it?",
      a: "The test increases in intensity until you reach your maximum. Our technicians are experienced working with every fitness level — from elite athletes to people who have not exercised in years. The test is always adapted to you. A health screen before the test confirms you are appropriate for the protocol.",
    },
    {
      q: "What happens if my results raise a concern?",
      a: "Our AIWO experts are ready for exactly this. If your results indicate something that warrants attention, we will tell you clearly, explain what it means, and refer you to the appropriate specialist.",
    },
  ];

  return (
    <section id="faq" className="py-12 lg:py-20 bg-white border-b border-border">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          <div className="lg:col-span-4">
            <SectionLabel n="07" label="Questions" />
            <h2 className="font-serif text-4xl lg:text-5xl leading-[1.05] text-foreground">
              Everything you want to know before booking.
            </h2>
          </div>
          <div className="lg:col-span-7 lg:col-start-6">
            <div className="divide-y divide-border border-t border-b border-border">
              {items.map((item, i) => (
                <div key={i}>
                  <button
                    type="button"
                    onClick={() => setOpen(open === i ? null : i)}
                    className="w-full flex items-center justify-between gap-6 py-6 text-left"
                  >
                    <span className="font-serif text-lg text-foreground leading-snug">{item.q}</span>
                    {open === i
                      ? <ChevronUp className="w-4 h-4 shrink-0 text-muted-foreground" />
                      : <ChevronDown className="w-4 h-4 shrink-0 text-muted-foreground" />
                    }
                  </button>
                  {open === i && (
                    <div className="pb-6">
                      <p className="text-muted-foreground text-[15px] leading-relaxed">{item.a}</p>
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

function BookingSection() {
  return (
    <section id="book" className="py-12 lg:py-20 bg-black text-white border-b border-black">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          <div className="lg:col-span-5">
            <div className="font-mono text-xs uppercase tracking-widest text-white/60 mb-4">
              08 · Take Action
            </div>
            <h2 className="font-serif text-3xl lg:text-6xl leading-[1.02] mb-6 lg:mb-8">
              The only question left is
              <br />
              <span className="italic text-white/60">what is your VO2 Max</span>
            </h2>
            <p className="text-white/70 text-lg leading-relaxed">
              You now have a precise understanding of what this test measures, what it reveals, and what ₹7,999 buys you. What is not useful is not knowing.
            </p>
          </div>

          <div className="lg:col-span-6 lg:col-start-7">
            <BookingForm isInline={true} />
          </div>
        </div>
      </div>
    </section>
  );
}

export default function VO2MaxPage() {
  return (
    <div className="min-h-screen bg-white">
      <MetaTags
        title="VO2 Max Test in Mumbai | Cardiorespiratory Fitness Assessment"
        description="Improve endurance and heart health with a VO2 Max test in Mumbai. Get precise cardiorespiratory fitness analysis for athletes, runners, and health-conscious individuals."
      />
      <Navigation
        sections={[
          { label: "Problem", href: "#problem" },
          { label: "What It Measures", href: "#measures" },
          { label: "Process", href: "#process" },
          { label: "FAQ", href: "#faq" },
        ]}
        ctaLabel="Book Test"
        ctaVariant="outline"
      />
      <main className="pt-0 md:pt-[80px]">
        <Hero />
        <TheSilentProblem />
        <WhatItMeasures />
        <ValueEquation />
        <HowItWorks />
        <WhoIsItFor />
        <Testimonials />
        <FAQ />
        <BookingSection />
      </main>
      <Footer />
    </div>
  );
}
