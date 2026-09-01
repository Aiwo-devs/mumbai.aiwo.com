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
//   2. Speak to AIWO — an enquiry path for guests who want help deciding first.
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

// ─── HERO ── AIDA: Attention · PAS spine · single primary CTA ────────────────────
function Hero() {
  return (
    <section className="relative bg-white border-b border-border overflow-hidden">
      <div className="absolute inset-0 clinical-grid opacity-50" />
      <div className="container mx-auto px-6 max-w-7xl relative py-12 lg:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          <div className="lg:col-span-7">
            <Reveal>
              <Eyebrow>AIWO Sleepcation · Fairmont Mumbai</Eyebrow>
            </Reveal>
            <Reveal delay={0.1}>
              <h1 className="font-serif text-[36px] sm:text-[52px] lg:text-[66px] leading-[1.0] tracking-tight text-foreground mb-6 lg:mb-8">
                Know how you sleep.
                <br />
                <span className="italic text-muted-foreground">Then improve it — measured, not guessed.</span>
              </h1>
            </Reveal>
            <Reveal delay={0.15}>
              <p className="font-mono text-sm text-muted-foreground tracking-widest max-w-[560px] mb-5 uppercase">
                A two-night clinical sleep programme at Fairmont Mumbai — so your rest becomes something you can see.
              </p>
            </Reveal>
            <Reveal delay={0.2}>
              <p className="text-base lg:text-xl text-muted-foreground leading-relaxed max-w-[560px] mb-8 lg:mb-10">
                You track your steps, your training, your calories. But the eight hours that actually repair you stay a black box — a wearable's estimate, never a measurement. Over two nights, AIWO measures your sleep in your own room, adjusts what the study shows, and measures again — so you leave with a documented comparison and a thirty-day plan, not an impression.
              </p>
            </Reveal>
            <Reveal delay={0.3}>
              <div className="flex flex-col gap-5">
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4">
                  <Button asChild className="bg-black hover:bg-black/90 text-white rounded-none h-14 px-8 font-medium text-base">
                    <a href="#book" onClick={scrollTo("book")} className="inline-flex items-center justify-center gap-2">
                      Book the Programme <ArrowRight className="w-5 h-5 shrink-0" />
                    </a>
                  </Button>
                  <Button asChild className="bg-white hover:bg-muted text-foreground border border-foreground rounded-none h-14 px-8 font-medium text-base">
                    <a href={ENQUIRY_WHATSAPP} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2">
                      Speak to AIWO
                    </a>
                  </Button>
                </div>
                <div className="flex flex-col">
                  <div className="flex items-baseline gap-3 flex-wrap">
                    <span className="font-serif text-3xl text-foreground">₹1,49,000++</span>
                    <span className="font-mono text-xs font-bold border border-foreground px-2 py-1">PER PROGRAMME</span>
                  </div>
                  <span className="text-xs text-muted-foreground mt-1 font-mono tracking-wide">
                    Two nights · three days · one guest · double occupancy from ₹2,25,000++
                  </span>
                </div>
              </div>
            </Reveal>
            <Reveal delay={0.35}>
              <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-2">
                <span className="font-mono text-[11px] uppercase tracking-widest text-muted-foreground">
                  Reserve your dates, or talk it through with a clinician first.
                </span>
                <a
                  href={ENQUIRY_PHONE_HREF}
                  className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-foreground hover:opacity-60 transition-opacity"
                >
                  Call {ENQUIRY_PHONE_DISPLAY} <ArrowRight className="w-3.5 h-3.5 shrink-0" />
                </a>
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

// ─── WHY IT MATTERS ── PAS + Loss Aversion (the purpose the page was missing) ────
function WhyItMatters() {
  return (
    <section id="why" className="py-12 lg:py-20 bg-white border-b border-border scroll-mt-24">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          <div className="lg:col-span-5">
            <SectionLabel n="01" label="Why It Matters" />
            <h2 className="font-serif text-3xl lg:text-5xl leading-[1.05] text-foreground">
              You measure everything that matters.
              <br />
              <span className="italic text-muted-foreground">Sleep isn't one of them — yet.</span>
            </h2>
          </div>
          <div className="lg:col-span-6 lg:col-start-7 flex items-center">
            <div className="text-base lg:text-lg text-muted-foreground leading-relaxed space-y-5">
              <p>
                A third of your life is spent asleep. It is when your body repairs, your memory settles and your metabolism resets — the quiet engine behind every waking gain you work for.
              </p>
              <p>
                Yet it is the one system most people never actually measure. A wearable estimates it from your wrist. An annual check-up ignores it entirely. So the choices you make about energy, recovery and focus rest on a guess about the very hours meant to restore you.
              </p>
              <p className="text-foreground font-medium">
                Every night that goes unmeasured is another night you can't improve.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── THE METHOD ── Unique Mechanism (Schwartz Stage 3) + contrarian ──────────────
function TheMethod() {
  const stages = [
    {
      n: "01",
      title: "Night One · Baseline",
      body: "A full Level-2 sleep study — clinical polysomnography — conducted in your own room by an AIWO sleep technician. Sleep duration, efficiency, stages, breathing and oxygen are recorded through the night. Your first evening is deliberately unhurried: nothing that could alter how you sleep is offered before you have been measured.",
    },
    {
      n: "02",
      title: "Day Two · Assess and adjust",
      body: "Your physician reviews the results with you, alongside your AIWO 100+ blood test completed before you travelled. A DEXA body composition scan and a breathing assessment are completed at Arthi Scans, AIWO's imaging partner, with transfers arranged and accompanied. Your pillow is then fitted to your measured neck geometry, your posture is assessed, and your room and evening are configured around what the study showed.",
    },
    {
      n: "03",
      title: "Night Two · Verify",
      body: "A second study, taken after the adjustments, so any difference can be seen rather than assumed.",
    },
  ];

  return (
    <section id="method" className="py-12 lg:py-20 bg-white border-b border-border scroll-mt-24">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 mb-8 lg:mb-12">
          <div className="lg:col-span-6">
            <SectionLabel n="02" label="The Method" />
            <h2 className="font-serif text-3xl lg:text-5xl leading-[1.05] text-foreground">
              Measured. Adjusted.
              <br />
              <span className="italic text-muted-foreground">Measured again.</span>
            </h2>
          </div>
          <div className="lg:col-span-5 lg:col-start-8 flex items-end">
            <p className="text-base lg:text-lg text-muted-foreground leading-relaxed">
              Most sleep advice starts with a change and hopes it worked. AIWO starts with a measurement — a clinical study in your own room, not a lab — then adjusts, then measures again. The second night is what turns a test into proof.
            </p>
          </div>
        </div>

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
      </div>
    </section>
  );
}

// ─── WHAT YOU LEAVE WITH ── BAB + Peak-End (the benefit the page was missing) ─────
function WhatYouLeaveWith() {
  const outcomes = [
    "A measured picture of how you actually sleep — duration, efficiency, stages, breathing and oxygen, across two nights.",
    "The difference your adjustments made, seen side by side — not assumed.",
    "Your sleep read against a 100+ marker blood panel, your body composition and your breathing — by a physician, in one place.",
    "A sleep system fitted to you — pillows made to your own measurements — that travels home with you.",
    "A thirty-day plan built around what your studies showed, with the AIWO team alongside you for the month.",
  ];
  return (
    <section className="py-12 lg:py-20 bg-black text-white border-b border-black">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          <div className="lg:col-span-5">
            <div className="font-mono text-xs uppercase tracking-widest text-white/60 mb-4">03 · What You Leave With</div>
            <h2 className="font-serif text-3xl lg:text-6xl leading-[1.02] text-white mb-6 lg:mb-8">
              You arrive guessing.
              <br />
              <span className="italic text-white/60">You leave with the record.</span>
            </h2>
            <p className="text-white/60 text-base lg:text-lg leading-relaxed">
              This is the point of the two nights: not a spa memory, but a document. You stop optimising around a guess and start from a number that is actually yours.
            </p>
          </div>
          <div className="lg:col-span-6 lg:col-start-7">
            <div className="space-y-4">
              {outcomes.map((item) => (
                <div key={item} className="flex items-start gap-3 border-b border-white/10 pb-4">
                  <Check className="w-4 h-4 shrink-0 mt-1 text-white" strokeWidth={2} />
                  <span className="text-white/80 text-[15px] lg:text-base leading-relaxed">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── WHAT'S INCLUDED ── Value stack (Hormozi / Kennedy) ──────────────────────────
function WhatsIncluded() {
  const items = [
    "AIWO 100+ blood test, completed before you travel, with results reviewed by your physician during your stay",
    "Two nights in a designated quiet room, prepared for sleep, with sleep-supportive turndown",
    "Night One baseline sleep study, conducted in your room by an AIWO sleep technician",
    "Night Two verification study and a documented comparison of both nights",
    "DEXA body composition scan and breathing assessment at Arthi Scans, AIWO's imaging partner, with accompanied transfers",
    "Physician consultation and a personalised report within seven days",
    "Two 60-minute spa treatments per guest at Fairmont Spa & Longevity",
    "One cryotherapy session per guest at Blu Xone, with sauna and steam access",
    "All meals from a sleep-supportive menu, including one meal at Fi'lia and one at Oryn",
    "Two AIWO pillows fitted to your own measurements, with sleepwear",
    "A sleep-support supplement pack, issued following medical screening",
    "Forward head posture assessment and a thirty-day correction programme",
    "A TWG sleep ritual each evening, with 30 packs per guest to take home",
    "Complimentary airport transfers from Terminal 1 & Terminal 2",
    "Laundry service during your stay",
    "Seven-day and thirty-day follow-up with the AIWO clinical team",
    "Purified indoor air maintained below AQI 30 across Fairmont Mumbai",
  ];

  return (
    <section id="included" className="py-12 lg:py-20 bg-white border-b border-border scroll-mt-24">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="mb-10 lg:mb-14 max-w-3xl">
          <SectionLabel n="04" label="What's Included" />
          <h2 className="font-serif text-3xl lg:text-5xl leading-[1.05] text-foreground">
            One programme. <span className="italic text-muted-foreground">Nothing assembled piecemeal.</span>
          </h2>
          <p className="text-base lg:text-lg text-muted-foreground mt-4 leading-relaxed">
            Every diagnostic, therapy and detail below is part of the single programme rate — coordinated by one clinical team, not booked across a dozen desks.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 lg:gap-x-12 gap-y-4 border-t border-border pt-8">
          {items.map((item) => (
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

// ─── YOUR TWO NIGHTS ── Fogg Ability: the experience, made effortless ────────────
function YourTwoNights() {
  const days = [
    {
      n: "01",
      title: "Day One — arrive and be measured",
      body: "Airport transfer, check-in to a quiet room prepared for the night, and a welcome briefing with your AIWO clinician. Dinner is served at Fi'lia, the Italian restaurant, from the sleep-supportive menu. Your baseline study begins at lights out.",
    },
    {
      n: "02",
      title: "Day Two — understand and adjust",
      body: "Breakfast at The Merchants, then your DEXA and breathing assessments at Arthi Scans, AIWO's imaging partner, with transfers arranged and accompanied. Your physician consultation follows, drawing together your sleep study, your blood results and the morning's assessments, and lunch is served at Oryn. The afternoon brings your pillow fitting, posture assessment, the first of your two spa treatments, and cryotherapy at Blu Xone. Dinner returns to The Merchants before your second study begins that evening.",
    },
    {
      n: "03",
      title: "Day Three — leave with the record",
      body: "Breakfast at The Merchants, your second spa treatment, and a summary of what the two nights showed. Your take-home sleep system travels with you, and your airport transfer is waiting. The full report follows within seven days, and the AIWO team stays with you for thirty.",
    },
  ];

  return (
    <section className="py-12 lg:py-20 bg-white border-b border-border">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="mb-8 lg:mb-12 max-w-3xl">
          <SectionLabel n="05" label="Your Two Nights" />
          <h2 className="font-serif text-3xl lg:text-5xl leading-[1.05] text-foreground">
            The clinical part is ours. <span className="italic text-muted-foreground">The rest is a stay.</span>
          </h2>
          <p className="text-base lg:text-lg text-muted-foreground mt-4 leading-relaxed">
            Transfers, testing, meals and recovery are arranged and accompanied throughout — your only job is to rest, and be measured.
          </p>
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
          {days.map((day, i) => (
            <Reveal key={day.n}>
              <div className={`grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-8 p-6 lg:p-8 ${i < days.length - 1 ? "border-b border-border" : ""}`}>
                <div className="lg:col-span-1">
                  <div className="font-serif text-[40px] lg:text-[48px] leading-none text-muted-foreground/30">{day.n}</div>
                </div>
                <div className="lg:col-span-11">
                  <h3 className="font-mono text-sm uppercase tracking-widest text-foreground font-bold mb-3">{day.title}</h3>
                  <p className="text-[15px] text-muted-foreground leading-relaxed">{day.body}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── WHO IT'S FOR ── Cialdini Unity + Identity (self-selection) ──────────────────
function WhoItsFor() {
  const tiles = [
    { label: "You optimise everything else", body: "Your diet, your training and your work are measured and managed. Sleep is the last black box — and the one with the most leverage." },
    { label: "You wake tired without knowing why", body: "You want a reason, not another supplement. A measurement tells you what a feeling can't." },
    { label: "You travel and perform on demand", body: "Recovery you can rely on, rather than hope for — read once, so the next months are built on fact." },
    { label: "You're in it for the long game", body: "You treat healthspan as something to invest in, with data — and you'd rather see the number than assume it." },
  ];
  return (
    <section className="py-12 lg:py-20 bg-white border-b border-border">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="mb-10 lg:mb-14 max-w-3xl">
          <SectionLabel n="06" label="Who It's For" />
          <h2 className="font-serif text-3xl lg:text-5xl leading-[1.05] text-foreground">
            For people who'd rather know.
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-0 border border-border mb-8">
          {tiles.map((tile) => (
            <Reveal key={tile.label}>
              <div className="border-r border-b border-border p-6 lg:p-8 bg-white h-full">
                <div className="font-mono text-[11px] uppercase tracking-widest text-foreground font-bold mb-3">{tile.label}</div>
                <p className="text-[14px] text-muted-foreground leading-relaxed">{tile.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
        <div className="border border-border p-5 bg-muted/20">
          <p className="text-[14px] text-muted-foreground leading-relaxed">
            <span className="font-mono text-[11px] uppercase tracking-widest text-foreground font-bold block mb-2">And who it isn't</span>
            AIWO Sleepcation is a clinical assessment, not a treatment. If you already have a diagnosed sleep condition, the programme can still measure and inform — but it does not replace the care you are receiving. Please mention it at screening, and AIWO will advise whether it's right for you.
          </p>
        </div>
      </div>
    </section>
  );
}

// ─── RATES ── Price anchoring (Ariely) + Paradox of Choice ───────────────────────
function Rates() {
  const cards = [
    {
      price: "₹1,49,000++",
      label: "Single occupancy",
      body: "One guest, one room, two nights. The full programme.",
    },
    {
      price: "₹2,25,000++",
      label: "Double occupancy",
      body: "Two guests sharing one room, two nights. Both guests complete the full programme.",
    },
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
            Assembled separately — a private overnight sleep study, a 100+ marker blood panel, a DEXA scan, a physician's review, and two nights at Fairmont Mumbai — this is a dozen disconnected appointments and bills. Here it is one programme, one clinical team, one plan. Rates are per programme and exclusive of applicable taxes, which are shown in full before any payment is taken.
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

        <Button asChild className="bg-white text-black hover:bg-white/90 rounded-none h-14 px-8 font-medium text-base">
          <a href="#book" onClick={scrollTo("book")} className="inline-flex items-center gap-2">
            Book the Programme <ArrowRight className="w-5 h-5" />
          </a>
        </Button>
      </div>
    </section>
  );
}

// ─── BEFORE YOU BOOK ── Anxiety reduction + compliance + DPDP (LIFT: ↓anxiety) ────
function BeforeYouBook() {
  return (
    <section className="py-12 lg:py-20 bg-white border-b border-border">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="mb-10 lg:mb-14 max-w-3xl">
          <SectionLabel n="08" label="Before You Book" />
          <h2 className="font-serif text-3xl lg:text-5xl leading-[1.05] text-foreground">
            A short screening comes first.
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-0 border border-border mb-8">
          <div className="border-b md:border-b-0 md:border-r border-border p-6 lg:p-8">
            <div className="font-mono text-[11px] uppercase tracking-widest text-foreground font-bold mb-3">Medical screening</div>
            <p className="text-[15px] text-muted-foreground leading-relaxed">
              Every guest completes a short medical screening with AIWO before the booking is confirmed. It takes a few minutes and establishes whether the programme is appropriate for you. Certain conditions, medications and circumstances make parts of the programme unsuitable, and AIWO will advise you before any payment is taken. Where the programme is not appropriate, your booking is released without charge.
            </p>
          </div>
          <div className="p-6 lg:p-8">
            <div className="font-mono text-[11px] uppercase tracking-widest text-foreground font-bold mb-3">Your AIWO 100+ blood test</div>
            <p className="text-[15px] text-muted-foreground leading-relaxed">
              Once screening is complete, AIWO arranges your AIWO 100+ blood test, taken before you travel so that your results are available to your physician during your stay. AIWO coordinates the sample collection, advises on any fasting requirement, and confirms when your results have been received.
            </p>
          </div>
        </div>

        <div className="border border-border p-5 bg-muted/20 mb-4">
          <p className="text-[14px] text-muted-foreground leading-relaxed">
            <span className="font-mono text-[11px] uppercase tracking-widest text-foreground font-bold block mb-2">Please note</span>
            AIWO Sleepcation is a clinical assessment and wellness programme. It supports your understanding of how you sleep; it is not a treatment for sleep apnoea or any other diagnosed condition and does not replace medical care. The comparison between your two nights reflects both the adjustments made and normal acclimatisation to a new sleeping environment. Where the assessment identifies something that needs attention, AIWO will refer you to appropriate care.
          </p>
        </div>
        <p className="font-mono text-[11px] text-muted-foreground tracking-wide leading-relaxed">
          Your clinical information is held by AIWO as Data Fiduciary, processed on the basis of your consent, and is not placed on your hotel folio. Handled under the DPDP Act 2023.
        </p>
      </div>
    </section>
  );
}

// ─── GOOD TO KNOW ── Clarity + Ability (practical friction removed) ──────────────
function GoodToKnow() {
  const info = [
    { label: "Programme duration", value: "Two nights, three days. The programme cannot be shortened." },
    { label: "Occupancy", value: "One guest, or two guests sharing one room." },
    { label: "Pre-arrival", value: "Medical screening and the AIWO 100+ blood test are completed before you travel." },
    { label: "Eligibility", value: "For guests aged 18 and above. Not suitable during pregnancy." },
    { label: "Cancellation", value: "Free more than 72 hours before arrival; 50% between 72 and 24 hours; full rate within 24 hours or no-show. One reschedule permitted, more than 72 hours before arrival, subject to availability." },
    { label: "Enquiries", value: `Fairmont Spa & Longevity — ${ENQUIRY_PHONE_DISPLAY}` },
  ];

  return (
    <section className="py-12 lg:py-20 bg-white border-b border-border">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="mb-10 lg:mb-14 max-w-3xl">
          <SectionLabel n="09" label="Good to Know" />
          <h2 className="font-serif text-3xl lg:text-5xl leading-[1.05] text-foreground">
            The practical details.
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-0 border border-border">
          {info.map((item) => (
            <div key={item.label} className="border-r border-b border-border p-6 lg:p-8">
              <div className="font-mono text-[11px] uppercase tracking-widest text-foreground font-bold mb-3">{item.label}</div>
              <p className="text-[14px] text-muted-foreground leading-relaxed">{item.value}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── FAQ ── Objection demolition + Cognitive fluency ─────────────────────────────
function FAQ() {
  const [open, setOpen] = useState<number | null>(null);
  const faqs = [
    { q: "My smartwatch already tracks my sleep — why measure it clinically?", a: "A wrist wearable estimates sleep from movement and heart rate — a nightly guess, refined but never confirmed. A clinical study measures it directly: brain activity, breathing, oxygen and sleep stages, in your own bed, across two nights, read by a physician. One is an approximation; the other is a measurement you can act on." },
    { q: "I feel fine — is this really for me?", a: "Feeling fine is a good baseline to record, not a reason to skip measuring. The point is not to find something wrong; it is to see how you actually sleep, keep what's working, and improve what isn't — with a number rather than an impression." },
    { q: "Is the sleep study conducted in a laboratory?", a: "No. It takes place in your own room at Fairmont Mumbai, which is the point — you are measured where you are actually sleeping." },
    { q: "Will I be wired up all night?", a: "Sensors are applied by an AIWO technician before lights out. Most guests report sleeping normally after the first hour, and everything is removed in the morning." },
    { q: "Will anyone be in my room overnight?", a: "No. Setup takes around 45 minutes before lights out, and the room is yours after that. A strict do-not-disturb protocol is in place until morning." },
    { q: "Why two nights of testing?", a: "One measurement tells you where you are. Two tell you whether anything changed. The second night is what makes AIWO Sleepcation a programme rather than a test." },
    { q: "Why is there no spa on the first day?", a: "Because the first night needs to be an honest baseline. A treatment or a sauna beforehand would alter the result we are trying to record. Your spa and Blu Xone experiences are scheduled from Day Two." },
    { q: "Should I prepare in any way?", a: "Two things happen before you travel: your medical screening and your AIWO 100+ blood test, both arranged by AIWO. Beyond that, keep to your ordinary routine. The first night is intended to record how you genuinely sleep, so there is nothing to improve upon in advance." },
    { q: "What is the AIWO 100+ blood test?", a: "A blood panel covering more than a hundred markers, taken before you travel so your physician can read it alongside your sleep study during your stay. AIWO arranges the collection and advises on any fasting requirement." },
    { q: "Do I need to leave the hotel?", a: "Once, for approximately 90 minutes on Day Two, for your DEXA and breathing assessments at Arthi Scans, AIWO's imaging partner. Transfers are arranged and a coordinator accompanies you throughout." },
    { q: "What does the report contain?", a: "Your measured results from both nights, the comparison between them, your AIWO 100+ blood test findings, your body composition and breathing results, and a thirty-day plan built around what the studies showed." },
    { q: "Is the programme suitable if I already have a sleep apnoea diagnosis?", a: "Please mention it at screening. The programme may still be appropriate as an assessment, but it is not a treatment and does not replace the care you are already receiving." },
    { q: "What happens if the study finds something significant?", a: "Your physician will discuss it with you during your stay, and AIWO will refer you to appropriate specialist care." },
    { q: "Can two guests share the programme?", a: "Yes. The two-guest rate covers a shared room, and each guest completes the full programme individually." },
    { q: "Who has access to my results?", a: "AIWO holds your clinical information as Data Fiduciary. It is not placed on your hotel bill and is not shared with the hotel except where necessary for your safety." },
    { q: "When do I receive my report?", a: "A summary is provided at check-out and your full personalised report follows within seven days." },
    { q: "What happens after I leave?", a: "Your fitted pillows and sleep system travel with you, you follow a thirty-day plan, and the AIWO team is in touch at seven days and thirty days." },
    { q: "Can I extend my stay?", a: "Yes. Additional nights may be added at the time of booking or during your stay." },
  ];

  return (
    <section id="faq" className="py-12 lg:py-20 bg-white border-b border-border scroll-mt-24">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="mb-10 lg:mb-14">
          <SectionLabel n="10" label="FAQ" />
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

// ─── BOOKING ── Two parallel paths: Book (ready to proceed) + Speak to AIWO (help) ─
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
          <div className="font-mono text-xs uppercase tracking-widest text-white/50 mb-6">Begin</div>
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
            <div className="font-mono text-[10px] uppercase tracking-widest text-white/40 mb-4">Talk to a clinician first</div>
            <h3 className="font-serif text-2xl lg:text-3xl text-white mb-3">Speak to AIWO</h3>
            <p className="text-white/50 text-[14px] leading-relaxed mb-6">
              This is bespoke clinical medicine, and a conversation with the AIWO team is part of the service, not a hurdle before it. Ask what the two nights measure, whether it's right for you, or how the screening works — and we'll tailor the programme around your answers.
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

        {/* How booking works — screening-first, dignified */}
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
            From ₹1,49,000++ per programme · two nights, three days · Fairmont Mumbai · exclusive of applicable taxes, shown in full before any payment is taken.
          </p>
        </div>
      </div>
    </section>
  );
}

// ─── TERMS ───────────────────────────────────────────────────────────────────────
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

  return (
    <section className="py-12 lg:py-16 bg-white border-b border-border">
      <div className="container mx-auto px-6 max-w-7xl">
        <SectionLabel n="11" label="Terms & Conditions" />
        <ol className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-2 list-decimal pl-5 text-[13px] text-muted-foreground leading-relaxed">
          {terms.map((t, i) => (
            <li key={i}>{t}</li>
          ))}
        </ol>
      </div>
    </section>
  );
}

export default function SleepcationPage() {
  return (
    <div className="min-h-screen bg-white">
      <MetaTags
        title="AIWO Sleepcation, Fairmont Mumbai | Measure Your Sleep, Then Improve It"
        description="A two-night clinical sleep programme at Fairmont Mumbai. AIWO measures how you actually sleep in your own room, adjusts, and measures again — so you leave with a documented comparison and a thirty-day plan."
      />
      <Navigation
        sections={[
          { label: "Why It Matters", href: "#why" },
          { label: "The Method", href: "#method" },
          { label: "What's Included", href: "#included" },
          { label: "Rates", href: "#rates" },
          { label: "FAQ", href: "#faq" },
        ]}
        ctaLabel="Book the Programme"
      />
      <main className="pt-0 md:pt-[80px]">
        <Hero />
        <WhyItMatters />
        <TheMethod />
        <WhatYouLeaveWith />
        <WhatsIncluded />
        <YourTwoNights />
        <WhoItsFor />
        <Rates />
        <BeforeYouBook />
        <GoodToKnow />
        <FAQ />
        <BookingSection />
        <Terms />
      </main>
      <Footer />
    </div>
  );
}
