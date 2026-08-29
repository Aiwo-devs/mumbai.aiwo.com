import { useState, useEffect } from "react";
import { Reveal } from "@/components/Reveal";
import { Button } from "@/components/ui/button";
import { Navigation } from "@/components/sections/Navigation";
import { Footer } from "@/components/sections/Footer";
import { MetaTags } from "@/components/MetaTags";
import { ArrowRight, Gauge, Layers, Zap, RefreshCw } from "lucide-react";
import homeHero from "@/assets/home-hero.webp";
import homeMeasurement from "@/assets/home-measurement.webp";
import homeOutcome from "@/assets/home-outcome.webp";
import {
  CONTACT,
  CTA,
  homeMeta,
  hero,
  difference,
  method,
  name,
  begin,
} from "../../data/homepageContent";

const scrollTo = (id: string) => (e: React.MouseEvent<HTMLAnchorElement>) => {
  e.preventDefault();
  document.getElementById(id.replace(/^#/, ""))?.scrollIntoView({ behavior: "smooth" });
};

// The shared image language across the service pages: a bordered box, object-cover,
// desaturated to a single clinical monochrome so every photo reads as one system.
function ClinicalImage({ src, alt, aspect, eager = false }: { src: string; alt: string; aspect: string; eager?: boolean }) {
  return (
    <div className="w-full bg-black overflow-hidden border border-border" style={{ aspectRatio: aspect }}>
      <img
        src={src}
        alt={alt}
        loading={eager ? "eager" : "lazy"}
        fetchPriority={eager ? "high" : "auto"}
        decoding="async"
        className="w-full h-full object-cover"
        style={{ filter: "grayscale(100%) contrast(1.2) brightness(0.85)" }}
      />
    </div>
  );
}

function SectionLabel({ n, label }: { n: string; label: string }) {
  return (
    <div className="flex items-center gap-3 mb-6">
      <span className="font-mono text-xs text-muted-foreground tracking-widest">{n}</span>
      <span className="w-12 h-px bg-border" />
      <span className="font-mono text-xs uppercase tracking-widest text-foreground font-bold">{label}</span>
    </div>
  );
}

function SectionLabelDark({ n, label }: { n: string; label: string }) {
  return (
    <div className="flex items-center gap-3 mb-6">
      <span className="font-mono text-xs text-white/40 tracking-widest">{n}</span>
      <span className="w-12 h-px bg-white/20" />
      <span className="font-mono text-xs uppercase tracking-widest text-white font-bold">{label}</span>
    </div>
  );
}

// Primary black CTA — the multi-line-safe hero pattern (matches Sculpt/booking CTAs).
const primaryCta =
  "bg-black hover:bg-black/90 text-white rounded-none h-auto min-h-14 sm:h-14 px-8 py-3 sm:py-0 font-medium text-base whitespace-normal w-full sm:w-auto";

// ─── HERO ─────────────────────────────────────────────────────────────────────
function Hero() {
  return (
    <section className="relative bg-white border-b border-border overflow-hidden">
      <div className="absolute inset-0 clinical-grid opacity-50" />
      <div className="container mx-auto px-6 max-w-7xl relative py-12 lg:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          <div className="lg:col-span-7">
            <Reveal>
              <span className="font-mono text-xs font-bold text-foreground uppercase tracking-widest block mb-4">
                {hero.eyebrow}
              </span>
            </Reveal>
            <Reveal delay={0.06}>
              <span className="font-mono text-[11px] uppercase tracking-widest text-muted-foreground block mb-5">
                {hero.brandLine}
              </span>
            </Reveal>
            <Reveal delay={0.12}>
              <h1 className="font-serif text-[34px] sm:text-[50px] lg:text-[62px] leading-[1.02] tracking-tight text-foreground mb-6">
                {hero.headline}
              </h1>
            </Reveal>
            <Reveal delay={0.18}>
              <p className="font-serif italic text-xl lg:text-2xl text-muted-foreground leading-snug max-w-[620px] mb-6">
                {hero.lede}
              </p>
            </Reveal>
            <Reveal delay={0.24}>
              <p className="text-base lg:text-xl text-muted-foreground leading-relaxed max-w-[600px] mb-8">
                {hero.body}
              </p>
            </Reveal>
            <Reveal delay={0.3}>
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4">
                <Button asChild className={primaryCta}>
                  <a href={CONTACT.beginAnchor} onClick={scrollTo(CONTACT.beginAnchor)} className="inline-flex items-center justify-center gap-2 text-center">
                    {CTA.book} <ArrowRight className="w-5 h-5 shrink-0" />
                  </a>
                </Button>
              </div>
              <p className="font-mono text-[11px] text-muted-foreground tracking-widest mt-4">{hero.tagline}</p>
            </Reveal>
          </div>
          <div className="lg:col-span-5">
            <Reveal delay={0.2} direction="none">
              <ClinicalImage src={homeHero} alt={hero.image.alt} aspect="4 / 3" eager />
            </Reveal>
          </div>
        </div>
        {/* Trust strip — Mumbai-only (Chennai stripped from source) */}
        <Reveal delay={0.1}>
          <div className="mt-12 lg:mt-16 pt-8 border-t border-border grid grid-cols-2 md:grid-cols-4 gap-4">
            {hero.trust.map((label) => (
              <div key={label} className="font-mono text-[11px] uppercase tracking-widest text-muted-foreground flex items-center gap-2">
                <span className="w-1 h-1 rounded-full bg-foreground shrink-0" />
                {label}
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

// ─── THE DIFFERENCE — Normal vs Optimal (black) ────────────────────────────────
function Difference() {
  return (
    <section id={difference.id} className="py-12 lg:py-20 bg-black text-white border-b border-black scroll-mt-24">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          <div className="lg:col-span-6">
            <SectionLabelDark n="01" label={difference.kicker} />
            <Reveal>
              <h2 className="font-serif text-3xl lg:text-5xl leading-[1.05] mb-6">
                {difference.headlineLead}{" "}
                <span className="italic text-white/60">{difference.headlineEmphasis}</span>
              </h2>
              <p className="text-white/70 text-base lg:text-xl leading-relaxed max-w-[560px] mb-8">
                {difference.body}
              </p>
              <a
                href={method.id ? `#${method.id}` : "#method"}
                onClick={scrollTo(`#${method.id}`)}
                className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-white hover:text-white/60 transition-colors"
              >
                {difference.linkLabel} <ArrowRight className="w-4 h-4 shrink-0" />
              </a>
            </Reveal>
          </div>
          <div className="lg:col-span-6">
            <Reveal delay={0.15} direction="none">
              <ClinicalImage src={homeMeasurement} alt={difference.image.alt} aspect="16 / 9" />
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── THE METHOD — One system. Four movements. (white) ──────────────────────────
// Thin monochrome line icons, one per movement, in the same clinical register as
// the rest of the page (no colour, hairline stroke).
const methodIcons = [Gauge, Layers, Zap, RefreshCw];

function Method() {
  return (
    <section id={method.id} className="py-12 lg:py-20 bg-white border-b border-border scroll-mt-24">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="max-w-3xl mb-10 lg:mb-14">
          <SectionLabel n="02" label={method.kicker} />
          <Reveal>
            <h2 className="font-serif text-3xl lg:text-5xl leading-[1.05] text-foreground">{method.headline}</h2>
          </Reveal>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 divide-y sm:divide-y-0 border-t border-border">
          {method.movements.map((m, i) => {
            const Icon = methodIcons[i];
            return (
            <Reveal key={m.lead} delay={i * 0.07}>
              <div className="py-6 lg:py-8 lg:px-6 lg:border-r border-border last:border-r-0 h-full">
                <div className="flex items-center gap-3 mb-4">
                  {Icon && <Icon className="w-6 h-6 text-foreground shrink-0" strokeWidth={1.25} aria-hidden="true" />}
                  <span className="font-mono text-[11px] text-muted-foreground tracking-widest">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </div>
                <div className="font-serif text-2xl text-foreground mb-2">{m.lead}</div>
                <p className="text-muted-foreground text-[15px] leading-relaxed">{m.body}</p>
              </div>
            </Reveal>
            );
          })}
        </div>
        <div className="mt-10">
          <a
            href={CONTACT.beginAnchor}
            onClick={scrollTo(CONTACT.beginAnchor)}
            className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-foreground hover:text-muted-foreground transition-colors"
          >
            {method.linkLabel} <ArrowRight className="w-4 h-4 shrink-0" />
          </a>
        </div>
      </div>
    </section>
  );
}

// ─── THE NAME — Why we're called AIWO (black) ──────────────────────────────────
function Name() {
  return (
    <section id={name.id} className="py-16 lg:py-28 bg-black text-white border-b border-black">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="max-w-3xl mx-auto text-center">
          <div className="font-mono text-xs uppercase tracking-widest text-white/50 mb-8">{name.kicker}</div>
          <Reveal>
            <div className="font-serif text-6xl lg:text-8xl leading-none mb-4">{name.characters}</div>
            <div className="font-serif italic text-2xl lg:text-3xl text-white/60 mb-8">{name.gloss}</div>
            <p className="text-white/80 text-lg lg:text-2xl leading-relaxed max-w-2xl mx-auto">
              {name.bodyBefore}
              <span className="text-white font-medium">{name.bodyEmphasis}</span>
              {name.bodyAfter}
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

// ─── BEGIN IN MUMBAI (white) — the consultation entry point ─────────────────────
function Begin() {
  return (
    <section id={begin.id} className="py-16 lg:py-24 bg-white border-b border-border scroll-mt-24">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          <div className="lg:col-span-6">
            <SectionLabel n="03" label={begin.kicker} />
            <Reveal>
              <h2 className="font-serif text-3xl lg:text-5xl leading-[1.05] text-foreground mb-6">{begin.headline}</h2>
              <p className="text-base lg:text-xl text-muted-foreground leading-relaxed max-w-[560px] mb-8">
                {begin.body}
              </p>
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4">
                <Button asChild className={primaryCta}>
                  <a href={CONTACT.phoneHref} className="inline-flex items-center justify-center gap-2 text-center">
                    {CTA.book} <ArrowRight className="w-5 h-5 shrink-0" />
                  </a>
                </Button>
              </div>
              <div className="mt-6 space-y-2">
                <a
                  href={CONTACT.phoneHref}
                  className="font-mono text-sm tracking-widest text-foreground hover:text-muted-foreground transition-colors inline-block"
                >
                  {CONTACT.phoneDisplay}
                </a>
                <p className="font-mono text-[11px] text-muted-foreground tracking-wide leading-relaxed">{begin.address}</p>
              </div>
              <p className="font-serif italic text-xl lg:text-2xl text-foreground/80 leading-snug mt-8 max-w-[520px]">
                {begin.closing}
              </p>
            </Reveal>
          </div>
          <div className="lg:col-span-6">
            <Reveal delay={0.15} direction="none">
              <ClinicalImage src={homeOutcome} alt={begin.image.alt} aspect="16 / 9" />
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}

// Sticky mobile CTA — appears after scroll; reuses the black-button language.
function StickyCta() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      const h = document.body.scrollHeight - window.innerHeight;
      setShow(h > 0 && y / h > 0.3);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <div
      className={`xl:hidden fixed inset-x-0 bottom-0 z-40 border-t border-border bg-white/95 backdrop-blur p-3 transition-transform duration-300 ${
        show ? "translate-y-0" : "translate-y-full"
      }`}
    >
      <Button asChild className="w-full bg-black hover:bg-black/90 text-white rounded-none h-12 font-medium">
        <a href={CONTACT.beginAnchor} onClick={scrollTo(CONTACT.beginAnchor)}>{CTA.book}</a>
      </Button>
    </div>
  );
}

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white text-foreground font-sans">
      <MetaTags title={homeMeta.title} description={homeMeta.description} />
      <Navigation ctaLabel={CTA.book} ctaTarget={CONTACT.beginAnchor} ctaVariant="solid" />
      <main className="pt-0">
        <Hero />
        <Difference />
        <Method />
        <Name />
        <Begin />
      </main>
      <Footer />
      <StickyCta />
    </div>
  );
}
