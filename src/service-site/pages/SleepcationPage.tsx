import { useState } from "react";
import { Reveal } from "@/components/Reveal";
import { Button } from "@/components/ui/button";
import { Footer } from "@/components/sections/Footer";
import { Navigation } from "@/components/sections/Navigation";
import { ArrowRight, Check, ChevronDown, ChevronUp } from "lucide-react";
import { MetaTags } from "@/components/MetaTags";
import sleepcationHero from "@/assets/sleepcation-hero.webp";
import sleepcationStudy from "@/assets/sleepcation-study.webp";

const scrollTo = (id: string) => (e: React.MouseEvent<HTMLAnchorElement>) => {
  e.preventDefault();
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
};

// AIWO Sleepcation offers two parallel conversion paths (see BookingSection):
//   1. Book the Programme — begins a clinically-gated booking. Per the programme
//      terms, a mandatory AIWO medical screening is completed before the booking is
//      confirmed and BEFORE any payment is taken, so the reserve action routes the
//      guest to the AIWO clinical desk to start screening and lock dates. There is no
//      self-serve online checkout for Sleepcation today: the MUM booking catalogue has
//      no resourced Sleepcation service and no direct package-payment link exists, so
//      wiring a live "Pay now" button would be fabricated. When a resourced Sleepcation
//      service (with occupancy pricing + availability) or a package payment link is
//      provisioned, the primary CTA upgrades to that mechanism with no copy change.
//   2. Speak to a clinician — an enquiry path for guests who want help deciding first.
// Both paths use the verified public Mumbai contact below.
const ENQUIRY_PHONE_DISPLAY = "+91 89258 14525";
const ENQUIRY_PHONE_HREF = "tel:+918925814525";
const ENQUIRY_WHATSAPP = "https://wa.me/918925814525";

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

// Superscript footnote marker → the LegalFootnotes block at the foot of the page.
function Fn({ n }: { n: string }) {
  return <sup className="text-[0.6em] font-mono text-muted-foreground ml-0.5">{n}</sup>;
}

// ─── 1 · HERO ── felt problem first (problem/solution-aware), single dominant CTA ──
function Hero() {
  return (
    <section className="relative bg-white border-b border-border overflow-hidden">
      <div className="absolute inset-0 clinical-grid opacity-50" />
      <div className="container mx-auto px-6 max-w-7xl relative py-12 lg:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          <div className="lg:col-span-7">
            <Reveal>
              <Eyebrow>Fairmont Mumbai × AIWO — a measured sleep programme</Eyebrow>
            </Reveal>
            <Reveal delay={0.1}>
              <h1 className="font-serif text-[34px] sm:text-[50px] lg:text-[62px] leading-[1.02] tracking-tight text-foreground mb-6 lg:mb-8">
                You measure everything that trains you.
                <br />
                <span className="italic text-muted-foreground">Not the eight hours that repair you.</span>
              </h1>
            </Reveal>
            <Reveal delay={0.2}>
              <p className="text-base lg:text-xl text-muted-foreground leading-relaxed max-w-[580px] mb-6">
                Your watch and your ring <span className="italic">estimate</span> your sleep. Over two nights at Fairmont Mumbai, AIWO <span className="italic">measures</span> it — a clinical, lab-grade study in your own bed — adjusts what the data shows, then measures again. You go home with a documented record and a thirty-day plan, not another guess.
              </p>
            </Reveal>
            <Reveal delay={0.25}>
              <p className="font-mono text-sm text-foreground tracking-widest max-w-[560px] mb-8 uppercase">
                Two nights. Two Level-2 clinical sleep studies. One measured difference.
              </p>
            </Reveal>
            <Reveal delay={0.3}>
              <div className="flex flex-col gap-4">
                <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-5">
                  <Button asChild className="bg-black hover:bg-black/90 text-white rounded-none h-14 px-8 font-medium text-base">
                    <a href="#book" onClick={scrollTo("book")} className="inline-flex items-center justify-center gap-2">
                      Book the Programme <ArrowRight className="w-5 h-5 shrink-0" />
                    </a>
                  </Button>
                  <a
                    href="#book"
                    onClick={scrollTo("book")}
                    className="font-mono text-xs uppercase tracking-widest text-muted-foreground hover:text-foreground transition-colors underline underline-offset-4"
                  >
                    or speak to a clinician first →
                  </a>
                </div>
                <span className="font-mono text-xs text-muted-foreground tracking-wide">
                  From ₹1,49,000++ · Two nights · Fairmont Mumbai
                </span>
              </div>
            </Reveal>
          </div>

          <div className="lg:col-span-5 relative">
            <Reveal delay={0.3} direction="none">
              <div className="aspect-[4/5] bg-black overflow-hidden border border-border">
                <img
                  src={sleepcationHero}
                  alt="A guest room at Fairmont Mumbai prepared for the night, curtains drawn and bedside lighting low"
                  className="w-full h-full object-cover"
                  style={{ filter: "grayscale(100%) contrast(1.1) brightness(0.9)" }}
                />
              </div>
            </Reveal>
          </div>
        </div>

        <Reveal delay={0.4}>
          <div className="mt-10 lg:mt-16 border-t border-border pt-8 grid grid-cols-2 md:grid-cols-4 gap-4 lg:gap-6">
            {[
              "Clinical sleep study in your own room",
              "AIWO 100+ blood panel, read during your stay",
              "Physician-led same-stay review",
              "A documented two-night comparison",
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

// ─── 2 · WHY IT MATTERS ── the stakes, structure/function + cited ────────────────
function WhyItMatters() {
  return (
    <section id="why" className="py-12 lg:py-20 bg-white border-b border-border scroll-mt-24">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          <div className="lg:col-span-5">
            <SectionLabel n="01" label="What You've Never Measured" />
            <h2 className="font-serif text-3xl lg:text-5xl leading-[1.05] text-foreground">
              The third of your life that runs the other two-thirds.
            </h2>
          </div>
          <div className="lg:col-span-6 lg:col-start-7 flex items-center">
            <div className="text-base lg:text-lg text-muted-foreground leading-relaxed space-y-5">
              <p>
                You'd never guess at your cholesterol, your body fat or your blood pressure. You'd measure them. Yet the eight hours that influence all three, you've only ever estimated.
              </p>
              <p>
                Sleep isn't downtime. It's when the work happens — your cardiovascular system recalibrates, hormones are released, your immune system does its housekeeping, and the day's memories are consolidated, all while you're unconscious.<Fn n="1" /> Large adult studies associate short or poor-quality sleep with lower cardiometabolic health and a weaker immune response.<Fn n="2" /><Fn n="3" />
              </p>
              <p className="text-foreground font-medium">
                You've optimised your training, your food and your recovery. This is the input underneath all of them — and the only one you've never actually looked at.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── 3 · THE WEDGE ── estimate vs measure, objections answered inline ────────────
function Wedge() {
  const cards = [
    { q: "Will I be wired up all night?", a: "Sensors are fitted in about 45 minutes before lights out and removed in the morning. Most guests report sleeping normally after the first hour." },
    { q: "Is anyone in my room?", a: "No. The room is yours after setup, under a strict do-not-disturb protocol until morning." },
    { q: "Isn't this just a fancy spa?", a: "The spa is the reward, not the point. Nothing that could alter your sleep is offered before your baseline is recorded." },
  ];
  return (
    <section id="wedge" className="py-12 lg:py-20 bg-white border-b border-border scroll-mt-24">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 mb-10 lg:mb-14">
          <div className="lg:col-span-5">
            <SectionLabel n="02" label="Why a Wearable Isn't Enough" />
            <h2 className="font-serif text-3xl lg:text-5xl leading-[1.05] text-foreground">
              Your ring estimates. <span className="italic text-muted-foreground">A clinical study measures.</span>
            </h2>
          </div>
          <div className="lg:col-span-6 lg:col-start-7 flex items-center">
            <div className="text-base lg:text-lg text-muted-foreground leading-relaxed space-y-5">
              <p>
                Consumer rings and watches infer sleep from movement and heart rate. Against polysomnography — the clinical gold standard for sleep measurement<Fn n="4" /> — validation studies find that sleep-<span className="italic">stage</span> estimates are a wearable's least reliable output, with REM sleep in particular substantially underestimated.<Fn n="5" /> Useful for spotting trends. Not a measurement you'd stake a decision on.
              </p>
              <p className="text-foreground font-medium">
                AIWO Sleepcation records the real thing: a Level-2 study capturing your brain activity, breathing, oxygen and sleep stages through the night — read by a physician, not an algorithm guessing from your wrist.
              </p>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-0 border border-border">
          {cards.map((c, i) => (
            <div key={c.q} className={`p-6 lg:p-8 border-border ${i < cards.length - 1 ? "border-b md:border-b-0 md:border-r" : ""}`}>
              <div className="font-mono text-[11px] uppercase tracking-widest text-foreground font-bold mb-3">{c.q}</div>
              <p className="text-[14px] text-muted-foreground leading-relaxed">{c.a}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── 4 · WHAT WE MEASURE ── the readings ─────────────────────────────────────────
function WhatWeMeasure() {
  const rows = [
    { r: "Level-2 sleep study (×2 nights)", c: "Sleep duration, efficiency, stages, breathing and oxygen — recorded in your own room" },
    { r: "AIWO 100+ blood panel", c: "More than 100 markers, read by your physician alongside your sleep data" },
    { r: "DEXA body composition", c: "Fat, lean mass and distribution, at Arthi Scans, AIWO's imaging partner" },
    { r: "Breathing assessment", c: "How you breathe at rest and through the night" },
    { r: "Forward-head-posture assessment", c: "The structural load posture places on breathing, with a 30-day correction plan" },
  ];
  return (
    <section id="measure" className="py-12 lg:py-20 bg-white border-b border-border scroll-mt-24">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="mb-10 lg:mb-14 max-w-3xl">
          <SectionLabel n="03" label="The Measurements" />
          <h2 className="font-serif text-3xl lg:text-5xl leading-[1.05] text-foreground">
            Five readings most people never get in a lifetime.
          </h2>
        </div>
        <div className="border border-border divide-y divide-border">
          {rows.map((row) => (
            <div key={row.r} className="grid grid-cols-1 md:grid-cols-12 gap-2 md:gap-8 p-6 lg:p-8">
              <div className="md:col-span-4 font-mono text-sm uppercase tracking-widest text-foreground font-bold">{row.r}</div>
              <div className="md:col-span-8 text-[15px] text-muted-foreground leading-relaxed">{row.c}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── 5 · THE PROCESS ── measured, adjusted, measured again + CTA at conviction ────
function Process() {
  const stages = [
    {
      n: "01",
      title: "Night One · Baseline",
      body: "A full Level-2 study in your own room, run by an AIWO sleep technician. Your first evening is deliberately unhurried — nothing that could change how you sleep is offered before you've been measured. An honest baseline.",
    },
    {
      n: "02",
      title: "Day Two · Assess and adjust",
      body: "Your physician reviews the study with you, alongside your AIWO 100+ blood panel. DEXA and breathing assessments follow at Arthi Scans. Your pillow is fitted to your measured neck geometry, your posture is assessed, and your room is reconfigured around what the study showed. The spa and Blu Xone cryotherapy begin here.",
    },
    {
      n: "03",
      title: "Night Two · Verify",
      body: "A second study, after the adjustments — so any difference can be seen, not assumed.",
    },
    {
      n: "04",
      title: "Then",
      body: "A summary at check-out, a full personalised report within seven days, and the AIWO clinical team with you for thirty.",
    },
  ];
  return (
    <section id="process" className="py-12 lg:py-20 bg-white border-b border-border scroll-mt-24">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 mb-8 lg:mb-12">
          <div className="lg:col-span-6">
            <SectionLabel n="04" label="How It Works" />
            <h2 className="font-serif text-3xl lg:text-5xl leading-[1.05] text-foreground">
              Measured. Adjusted.
              <br />
              <span className="italic text-muted-foreground">Measured again.</span>
            </h2>
          </div>
          <div className="lg:col-span-5 lg:col-start-8 flex items-end">
            <p className="text-base lg:text-lg text-muted-foreground leading-relaxed">
              Most sleep advice starts with a change and hopes it worked. AIWO starts with a measurement, then adjusts, then measures again. The second night is what turns a test into proof.
            </p>
          </div>
        </div>

        <Reveal direction="none">
          <div className="w-full aspect-video bg-black overflow-hidden border border-border mb-8 lg:mb-12">
            <img
              src={sleepcationStudy}
              alt="An AIWO sleep technician preparing a guest for the overnight sleep study at Fairmont Mumbai"
              className="w-full h-full object-cover"
              style={{ filter: "grayscale(100%) contrast(1.15) brightness(0.85)" }}
            />
          </div>
        </Reveal>

        <div className="space-y-0 border border-border">
          {stages.map((stage, i) => (
            <Reveal key={stage.n}>
              <div className={`grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-8 p-6 lg:p-8 ${i < stages.length - 1 ? "border-b border-border" : ""}`}>
                <div className="lg:col-span-1">
                  <div className="font-serif text-[40px] lg:text-[48px] leading-none text-muted-foreground/30">{stage.n}</div>
                </div>
                <div className="lg:col-span-11">
                  <h3 className="font-mono text-sm uppercase tracking-widest text-foreground font-bold mb-3">{stage.title}</h3>
                  <p className="text-[15px] text-muted-foreground leading-relaxed">{stage.body}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        <div className="mt-8 lg:mt-10">
          <Button asChild className="bg-black hover:bg-black/90 text-white rounded-none h-14 px-8 font-medium text-base">
            <a href="#book" onClick={scrollTo("book")} className="inline-flex items-center gap-2">
              Book the Programme <ArrowRight className="w-5 h-5" />
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
}

// ─── 6 · COMPARISON ── the value anchor (differentiation, not a price anchor) ─────
function Comparison() {
  const cols = ["Wearable ring / watch", "Home sleep test", "Hospital sleep lab", "AIWO Sleepcation"];
  const rows = [
    { label: "Clinical-grade measurement", cells: ["Estimate only", "Breathing only", "Yes", "Yes (Level-2, both nights)"] },
    { label: "Where you sleep", cells: ["Your bed", "Your bed", "Clinical ward", "Your own suite"] },
    { label: "Adjust, then re-measure", cells: ["No", "No", "No", "Yes"] },
    { label: "Blood panel + body composition", cells: ["No", "No", "No", "Yes"] },
    { label: "Physician reads your results", cells: ["No", "Sometimes", "Yes", "Yes, during your stay"] },
    { label: "Take-home plan + 30-day follow-up", cells: ["No", "No", "Rarely", "Yes"] },
  ];
  return (
    <section id="compare" className="py-12 lg:py-20 bg-black text-white border-b border-black scroll-mt-24">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="mb-10 lg:mb-14 max-w-3xl">
          <div className="font-mono text-xs uppercase tracking-widest text-white/60 mb-4">05 · Where This Sits</div>
          <h2 className="font-serif text-3xl lg:text-5xl leading-[1.05] text-white">
            Four ways to know how you sleep. <span className="italic text-white/60">Only one changes anything.</span>
          </h2>
        </div>

        <div className="overflow-x-auto border border-white/20">
          <table className="w-full min-w-[720px] border-collapse text-left">
            <thead>
              <tr className="border-b border-white/20">
                <th className="p-4 lg:p-5 font-mono text-[10px] uppercase tracking-widest text-white/40 font-normal align-bottom"></th>
                {cols.map((c) => (
                  <th
                    key={c}
                    className={`p-4 lg:p-5 font-mono text-[10px] uppercase tracking-widest align-bottom ${c === "AIWO Sleepcation" ? "text-white font-bold bg-white/[0.06]" : "text-white/50 font-normal"}`}
                  >
                    {c}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((row) => (
                <tr key={row.label} className="border-b border-white/10 last:border-b-0">
                  <td className="p-4 lg:p-5 text-[13px] text-white/70 font-medium">{row.label}</td>
                  {row.cells.map((cell, i) => (
                    <td
                      key={i}
                      className={`p-4 lg:p-5 text-[13px] ${i === row.cells.length - 1 ? "text-white font-medium bg-white/[0.06]" : "text-white/50"}`}
                    >
                      {cell}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <p className="text-white/50 text-[14px] leading-relaxed mt-6 max-w-3xl">
          The point of difference isn't the measurement alone. It's that AIWO measures, changes something, and measures again — inside a stay built for rest.
        </p>
      </div>
    </section>
  );
}

// ─── 7 · WHAT'S INCLUDED ── breadth/depth, NO à-la-carte pricing ─────────────────
function WhatsIncluded() {
  const clinical = [
    { item: "AIWO 100+ blood panel", value: "More than 100 markers, read alongside your sleep data" },
    { item: "Level-2 sleep study × 2 nights", value: "Baseline and verification, in your own room" },
    { item: "DEXA body composition scan", value: "Fat, lean mass and distribution" },
    { item: "Breathing assessment", value: "At rest and through the night" },
    { item: "Physician consultation + 7-day report", value: "Your results, read and explained by a physician" },
    { item: "Two AIWO pillows, fitted to you", value: "Made to your measured neck geometry, yours to keep" },
    { item: "Posture assessment + 30-day correction", value: "Forward-head-posture programme to take home" },
    { item: "Supplement pack + 7- & 30-day follow-up", value: "Issued post-screening; the team stays with you for a month" },
  ];
  const stay = [
    "Two nights in a quiet room prepared for sleep",
    "Two 60-minute spa treatments per guest at Fairmont Spa & Longevity",
    "One cryotherapy session at Blu Xone, with sauna and steam",
    "All meals from a sleep-supportive menu, including one at Fi'lia and one at Oryn",
    "A TWG sleep ritual each evening — 30 packs per guest to take home",
    "Complimentary airport transfers",
    "Laundry service during your stay",
    "Purified indoor air maintained below AQI 30 across the hotel",
  ];
  return (
    <section id="included" className="py-12 lg:py-20 bg-white border-b border-border scroll-mt-24">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="mb-10 lg:mb-14 max-w-3xl">
          <SectionLabel n="06" label="The Programme" />
          <h2 className="font-serif text-3xl lg:text-5xl leading-[1.05] text-foreground">
            Booked separately, this doesn't exist. <span className="italic text-muted-foreground">As a programme, it's one price.</span>
          </h2>
          <p className="text-base lg:text-lg text-muted-foreground mt-4 leading-relaxed">
            Every diagnostic, therapy and detail below is part of the single programme rate — coordinated by one clinical team, not booked across a dozen desks.
          </p>
        </div>

        <div className="font-mono text-[11px] uppercase tracking-widest text-foreground font-bold mb-4">The clinical core</div>
        <div className="border border-border divide-y divide-border mb-10">
          {clinical.map((c) => (
            <div key={c.item} className="grid grid-cols-1 md:grid-cols-12 gap-2 md:gap-6 items-start p-5 lg:p-6">
              <div className="md:col-span-4 text-[15px] text-foreground font-medium">{c.item}</div>
              <div className="md:col-span-6 text-[14px] text-muted-foreground leading-snug">{c.value}</div>
              <div className="md:col-span-2 md:text-right">
                <span className="inline-flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-widest text-foreground">
                  <Check className="w-3 h-3 shrink-0" strokeWidth={2.5} /> Included
                </span>
              </div>
            </div>
          ))}
        </div>

        <div className="font-mono text-[11px] uppercase tracking-widest text-foreground font-bold mb-4">The stay</div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 lg:gap-x-12 gap-y-4 border-t border-border pt-6">
          {stay.map((item) => (
            <div key={item} className="flex items-start gap-3 border-b border-border pb-4">
              <Check className="w-4 h-4 shrink-0 mt-0.5 text-foreground" strokeWidth={2} />
              <span className="text-foreground/80 text-[15px] leading-snug">{item}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── 8 · PRICING ── confirmed package rates + screening-first note ───────────────
function Pricing() {
  const cards = [
    { price: "₹1,49,000++", label: "Single occupancy", body: "Per programme — one guest, one room, two nights. The full programme." },
    { price: "₹2,25,000++", label: "Double occupancy", body: "Per programme — two guests sharing one room, two nights. Both complete the full programme." },
  ];
  return (
    <section id="rates" className="py-12 lg:py-20 bg-black text-white border-b border-black scroll-mt-24">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="max-w-3xl mb-10 lg:mb-14">
          <div className="font-mono text-xs uppercase tracking-widest text-white/60 mb-4">07 · Rates</div>
          <h2 className="font-serif text-3xl lg:text-5xl leading-[1.05] text-white mb-6">
            One programme. <span className="italic text-white/60">Two ways to stay.</span>
          </h2>
          <p className="text-white/60 text-base leading-relaxed">
            Rates are per programme and exclusive of applicable taxes. Taxes are calculated and shown in full — with no further charges — before any payment is taken.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8 lg:mb-10">
          {cards.map((card) => (
            <div key={card.label} className="border border-white/20 p-6 lg:p-8 flex flex-col">
              <div className="font-mono text-[10px] uppercase tracking-widest text-white/40 mb-6">{card.label}</div>
              <div className="font-serif text-[34px] sm:text-[44px] leading-none text-white mb-4 break-words">{card.price}</div>
              <p className="text-white/50 text-[14px] leading-relaxed">{card.body}</p>
            </div>
          ))}
        </div>

        <div className="border border-white/20 p-5 lg:p-6 bg-white/[0.03] mb-8">
          <div className="font-mono text-[11px] uppercase tracking-widest text-white font-bold mb-2">A short screening comes first</div>
          <p className="text-white/60 text-[14px] leading-relaxed">
            Every guest completes a brief medical screening with AIWO before a booking is confirmed. It takes a few minutes and establishes whether the programme is appropriate for you. Where it isn't, your booking is released without charge — and no payment is taken until screening clears.
          </p>
        </div>

        <Button asChild className="bg-white text-black hover:bg-white/90 rounded-none h-14 px-8 font-medium text-base">
          <a href="#book" onClick={scrollTo("book")} className="inline-flex items-center gap-2">
            Book the Programme <ArrowRight className="w-5 h-5" />
          </a>
        </Button>
      </div>
    </section>
  );
}

// ─── 9 · BOOK / ENQUIRE ── two parallel paths, verified contact ──────────────────
function BookingSection() {
  const steps = [
    "Tell us your preferred dates and complete a short AIWO medical screening.",
    "AIWO arranges your AIWO 100+ blood test, taken before you travel.",
    "Your dates are confirmed and payment is taken — only after screening clears.",
  ];
  return (
    <section id="book" className="py-16 lg:py-28 bg-black text-white border-b border-black scroll-mt-24">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="max-w-3xl mb-10 lg:mb-14">
          <div className="font-mono text-xs uppercase tracking-widest text-white/50 mb-6">08 · Book Your Programme</div>
          <h2 className="font-serif text-4xl lg:text-6xl leading-[1.03] text-white mb-6">
            You'll sleep tonight either way. <span className="italic text-white/60">The question is whether you'll know what it did.</span>
          </h2>
          <p className="text-white/70 text-lg leading-relaxed max-w-2xl">
            Two nights at Fairmont Mumbai turn your sleep from a guess into a record you can act on — whether you're ready to reserve your dates now, or want to talk it through first.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-10">
          {/* PRIMARY — ready to proceed */}
          <div className="border border-white/20 bg-white/[0.03] p-6 lg:p-8 flex flex-col">
            <div className="font-mono text-[10px] uppercase tracking-widest text-white/40 mb-4">Ready to proceed</div>
            <h3 className="font-serif text-2xl lg:text-3xl text-white mb-3">Book the Programme</h3>
            <div className="flex items-baseline gap-3 flex-wrap mb-1">
              <span className="font-serif text-3xl text-white">₹1,49,000++</span>
              <span className="font-mono text-[10px] uppercase tracking-widest text-white/50">single occupancy</span>
            </div>
            <div className="flex items-baseline gap-3 flex-wrap mb-5">
              <span className="font-serif text-xl text-white/80">₹2,25,000++</span>
              <span className="font-mono text-[10px] uppercase tracking-widest text-white/50">double occupancy</span>
            </div>
            <p className="text-white/50 text-[14px] leading-relaxed mb-6">
              Reserve your dates with the AIWO clinical team. Booking begins with a short medical screening; where the programme is not appropriate, it is released without charge, and payment is taken only once screening clears.
            </p>
            <div className="mt-auto flex flex-col sm:flex-row gap-3">
              <Button asChild className="bg-white text-black hover:bg-white/90 rounded-none h-auto min-h-14 sm:h-14 px-6 py-3 sm:py-0 font-medium text-base whitespace-normal flex-1">
                <a href={ENQUIRY_WHATSAPP} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 text-center">
                  Reserve on WhatsApp <ArrowRight className="w-5 h-5 shrink-0" />
                </a>
              </Button>
              <Button asChild className="bg-transparent text-white hover:bg-white/10 border border-white/40 rounded-none h-auto min-h-14 sm:h-14 px-6 py-3 sm:py-0 font-medium text-base whitespace-normal flex-1">
                <a href={ENQUIRY_PHONE_HREF} className="inline-flex items-center justify-center gap-2 text-center">
                  Call to reserve
                </a>
              </Button>
            </div>
          </div>

          {/* SECONDARY — help deciding */}
          <div className="border border-white/20 p-6 lg:p-8 flex flex-col">
            <div className="font-mono text-[10px] uppercase tracking-widest text-white/40 mb-4">Prefer to ask first</div>
            <h3 className="font-serif text-2xl lg:text-3xl text-white mb-3">Speak to a clinician</h3>
            <p className="text-white/50 text-[14px] leading-relaxed mb-6">
              A short call, no obligation. This is bespoke clinical medicine, and a conversation with the AIWO team is part of the service, not a hurdle before it. Ask what the two nights measure, whether it's right for you, or how the screening works.
            </p>
            <div className="mt-auto flex flex-col sm:flex-row gap-3">
              <Button asChild className="bg-transparent text-white hover:bg-white/10 border border-white/40 rounded-none h-auto min-h-14 sm:h-14 px-6 py-3 sm:py-0 font-medium text-base whitespace-normal flex-1">
                <a href={ENQUIRY_WHATSAPP} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 text-center">
                  Message on WhatsApp
                </a>
              </Button>
              <Button asChild className="bg-transparent text-white hover:bg-white/10 border border-white/40 rounded-none h-auto min-h-14 sm:h-14 px-6 py-3 sm:py-0 font-medium text-base whitespace-normal flex-1">
                <a href={ENQUIRY_PHONE_HREF} className="inline-flex items-center justify-center gap-2 text-center">
                  Call {ENQUIRY_PHONE_DISPLAY}
                </a>
              </Button>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8">
          <div className="font-mono text-[10px] uppercase tracking-widest text-white/40 mb-6">How booking works</div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {steps.map((s, i) => (
              <div key={i} className="flex items-start gap-3">
                <span className="font-serif text-2xl leading-none text-white/30">{i + 1}</span>
                <p className="text-white/60 text-[14px] leading-relaxed">{s}</p>
              </div>
            ))}
          </div>
          <p className="font-mono text-[11px] text-white/40 tracking-wide mt-8">
            Enquiries · Fairmont Spa &amp; Longevity ·{" "}
            <a href={ENQUIRY_PHONE_HREF} className="text-white/70 hover:text-white transition-colors">{ENQUIRY_PHONE_DISPLAY}</a>
          </p>
        </div>
      </div>
    </section>
  );
}

// ─── 10 · FAQ ────────────────────────────────────────────────────────────────────
function FAQ() {
  const [open, setOpen] = useState<number | null>(null);
  const faqs = [
    { q: "Is the sleep study conducted in a laboratory?", a: "No — in your own room at Fairmont Mumbai. That's the point: you're measured where you actually sleep." },
    { q: "Why two nights of testing?", a: "One measurement tells you where you are. Two tell you whether anything changed. The second night is what makes this a programme, not a test." },
    { q: "Why is there no spa on the first day?", a: "Because the first night has to be an honest baseline. A treatment or sauna beforehand would alter the result we're trying to record. Spa and Blu Xone begin on Day Two." },
    { q: "What is the AIWO 100+ blood test?", a: "A panel covering more than a hundred markers, taken before you travel so your physician can read it alongside your sleep study during your stay." },
    { q: "Do I need to leave the hotel?", a: "Once, for about 90 minutes on Day Two, for your DEXA and breathing assessments at Arthi Scans. Transfers are arranged and a coordinator accompanies you." },
    { q: "What does the report contain?", a: "Both nights' results, the comparison between them, your blood-panel findings, your body-composition and breathing results, and a thirty-day plan built around what the studies showed." },
    { q: "Is it suitable if I already have a sleep apnoea diagnosis?", a: "Please mention it at screening. The programme may still be appropriate as an assessment, but it is not a treatment and does not replace the care you're already receiving." },
    { q: "What happens if the study finds something significant?", a: "Your physician discusses it with you during your stay, and AIWO refers you to appropriate specialist care." },
  ];

  return (
    <section id="faq" className="py-12 lg:py-20 bg-white border-b border-border scroll-mt-24">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="mb-10 lg:mb-14">
          <SectionLabel n="09" label="FAQ" />
          <h2 className="font-serif text-3xl lg:text-5xl leading-[1.05] text-foreground">
            Questions about AIWO Sleepcation.
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

// ─── 11 · LEGAL / COMPLIANCE / FOOTNOTES ── structure/function, DPDP, citations ───
function LegalFootnotes() {
  const footnotes = [
    "During sleep the body regulates cardiovascular function, hormone secretion, immune activity and memory consolidation (CDC/NIOSH; peer-reviewed reviews).",
    "Short sleep duration is associated with lower odds of ideal cardiovascular health in US adults (CDC, Preventing Chronic Disease, NHANES 2013–16).",
    "Experimental sleep restriction has been associated with a reduced antibody response to influenza vaccination (CDC/NIOSH; peer-reviewed studies).",
    "Polysomnography is the clinical gold standard for sleep assessment (AASM; validation literature).",
    "Consumer wearables' sleep-stage estimates are their least reliable output, with REM commonly underestimated in validation studies against polysomnography (SLEEP Advances 2025; CHEST Physician 2025).",
  ];
  return (
    <section className="py-12 lg:py-16 bg-white border-b border-border">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="border border-border p-5 lg:p-6 bg-muted/20 mb-6">
          <div className="font-mono text-[11px] uppercase tracking-widest text-foreground font-bold mb-2">Please note</div>
          <p className="text-[14px] text-muted-foreground leading-relaxed">
            AIWO Sleepcation is a clinical assessment and wellness programme delivered by AIWO at Fairmont Mumbai. It is not a treatment for sleep apnoea or any other diagnosed condition and does not replace medical care. The comparison between your two nights reflects both the adjustments made and normal acclimatisation to a new sleeping environment. Where the assessment identifies something that needs attention, AIWO will refer you to appropriate care.
          </p>
        </div>
        <p className="font-mono text-[11px] text-muted-foreground tracking-wide leading-relaxed mb-8">
          Your health and clinical information is collected and processed by AIWO as Data Fiduciary, on the basis of your consent, for screening, delivering the programme and following up. It is held in AIWO's systems, is not placed on your hotel folio, and is not shared with Fairmont Mumbai except where necessary for your safety. Handled under the DPDP Act 2023.
        </p>
        <ol className="list-decimal pl-5 space-y-1.5 text-[12px] text-muted-foreground/80 leading-relaxed max-w-4xl">
          {footnotes.map((f, i) => (
            <li key={i}>{f}</li>
          ))}
        </ol>
      </div>
    </section>
  );
}

// ─── TERMS ── legal small print, retained for completeness ───────────────────────
function Terms() {
  const terms = [
    "Prior appointment is mandatory.",
    "A pre-arrival medical screening with AIWO is mandatory and must be completed before the booking is confirmed.",
    "The AIWO 100+ blood test is arranged by AIWO and must be completed at least seven days before arrival so that results are available during your stay.",
    "Where blood results are not received in time, the programme proceeds and the findings are included in your seven-day report.",
    "Where AIWO advises following screening that the programme is not appropriate, the booking is released without charge.",
    "The programme is available to guests aged 18 years and above.",
    "The programme is not suitable for guests who are pregnant.",
    "The programme runs over two nights and cannot be shortened.",
    "The same room is retained for both nights.",
    "DEXA and breathing assessments are conducted at Arthi Scans, AIWO's imaging partner; transfers are arranged and accompanied throughout.",
    "Spa treatments, cryotherapy, sauna and steam are scheduled from Day Two onward, following the baseline study.",
    "Cryotherapy and heat-based therapies are subject to medical clearance at screening.",
    "Airport pick-up and drop-off available from Terminal 1 & Terminal 2.",
    "Meals are served at The Merchants, with one meal at Fi'lia and one meal at Oryn during your stay.",
    "The sleep-supportive menu is offered at each venue and is prepared to order.",
    "The TWG sleep ritual is served each evening; 30 caffeine-free packs per guest are presented to take home.",
    "Supplements are supplied by AIWO and issued only following medical screening.",
    "Clinical records are held by AIWO as Data Fiduciary and are not placed on the hotel folio; processing is described in AIWO's privacy notice.",
    "AIWO Sleepcation is not a treatment for any diagnosed condition and does not replace medical care.",
    "Rates are per programme, exclusive of applicable taxes, and subject to availability.",
    "Cancellations made more than 72 hours before arrival are refunded in full.",
    "Cancellations made between 72 and 24 hours before arrival attract a charge of 50% of the programme rate, covering committed diagnostic slots and clinical setup.",
    "Cancellations made within 24 hours of arrival, and no-shows, attract the full programme rate.",
    "Where a booking is rescheduled more than 72 hours before arrival, no charge applies; one reschedule is permitted per booking, subject to availability.",
    "This offer may not be combined with other promotions or discounts.",
    "Fairmont Mumbai's booking conditions and Accor's Terms & Conditions of Services apply.",
  ];

  // The full list is long and dominates the scroll. Show a short preview by
  // default and let the guest expand the rest in place — the whole list stays on
  // the page (nothing is hidden from those who want it), it just doesn't force a
  // long scroll past legal small print to reach the footer.
  const PREVIEW_COUNT = 6;
  const [expanded, setExpanded] = useState(false);
  const visibleTerms = expanded ? terms : terms.slice(0, PREVIEW_COUNT);
  const hiddenCount = terms.length - PREVIEW_COUNT;

  return (
    <section id="terms" className="py-12 lg:py-16 bg-white border-b border-border">
      <div className="container mx-auto px-6 max-w-7xl">
        <SectionLabel n="10" label="Terms & Conditions" />
        <ol className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-2 list-decimal pl-5 text-[13px] text-muted-foreground leading-relaxed">
          {visibleTerms.map((t, i) => (
            <li key={i}>{t}</li>
          ))}
        </ol>

        {hiddenCount > 0 && (
          <button
            type="button"
            onClick={() => setExpanded((v) => !v)}
            aria-expanded={expanded}
            className="mt-6 inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-widest text-foreground border-b border-foreground/40 pb-1 transition-colors hover:border-foreground"
          >
            {expanded ? (
              <>
                Show less <ChevronUp className="w-3.5 h-3.5" />
              </>
            ) : (
              <>
                Show all {terms.length} terms <ChevronDown className="w-3.5 h-3.5" />
              </>
            )}
          </button>
        )}
      </div>
    </section>
  );
}

export default function SleepcationPage() {
  return (
    <div className="min-h-screen bg-white">
      <MetaTags
        title="AIWO Sleepcation, Fairmont Mumbai | Measure Your Sleep, Then Improve It"
        description="A two-night clinical sleep programme at Fairmont Mumbai. Your wearable estimates your sleep; AIWO measures it with a Level-2 study in your own room, adjusts, and measures again — so you leave with a documented comparison and a thirty-day plan."
      />
      <Navigation
        sections={[
          { label: "Why It Matters", href: "#why" },
          { label: "How It Works", href: "#process" },
          { label: "The Programme", href: "#included" },
          { label: "Rates", href: "#rates" },
          { label: "FAQ", href: "#faq" },
        ]}
        ctaLabel="Book the Programme"
      />
      <main className="pt-0 md:pt-[80px]">
        <Hero />
        <WhyItMatters />
        <Wedge />
        <WhatWeMeasure />
        <Process />
        <Comparison />
        <WhatsIncluded />
        <Pricing />
        <BookingSection />
        <FAQ />
        <LegalFootnotes />
        <Terms />
      </main>
      <Footer />
    </div>
  );
}
