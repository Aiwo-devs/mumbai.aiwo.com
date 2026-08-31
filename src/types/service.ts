import type {
  FaqItem,
  HowItWorksStep,
  TrustChip,
} from './shared'

// Mumbai service-page shape (v2.0 conversion framework, IA-consolidated pass).
// Reuses the shared sub-types in ./shared wherever content is structurally identical.

/** Temporary reference/placeholder imagery only — never a final production
 * asset. `assetKey` matches the eventual real-file naming convention
 * (src/assets/placeholders/<assetKey>.webp) so a later swap only touches data,
 * never component/page structure. `label` is dev-only text rendered inside a
 * neutral placeholder box (never shipped as real photography). */
export interface PlaceholderImage {
  assetKey: string
  label: string
  /** CSS aspect-ratio value, e.g. '16 / 9', '4 / 3'. */
  aspect: string
  isPlaceholder: true
}

export interface ServiceHero {
  eyebrow: string
  headline: string
  emphasizeHeadline: string
  /** Optional substring of `headline` to render de-emphasized (lighter color +
   * weight) instead of the default full-ink treatment — draws the eye to
   * whatever's left un-softened. Independent of emphasizeHeadline; not
   * designed to be combined with it on the same headline. */
  headlineSoft?: string
  subhead: string
  emphasizeSubhead: string
  /** Optional italic deck line rendered directly under the H1, above the
   * subhead — an editorial "deck" (secondary framing line), not a claim. */
  deck?: string
  ctaLabel: string
  ctaHref: string
  /** Plain, always-enabled secondary CTA. AIWO does not offer WhatsApp booking —
   * there is no WhatsApp-specific CTA type; any secondary action here must be a
   * real, working booking channel (concierge/spa desk/in-room code). */
  secondaryCta?: { label: string; href: string }
  ctaContextLine: string
  trustChips: TrustChip[]
  /** Rendered in the same slot/treatment as HeroReportPanel (.hero__visual /
   * .hero__mockup) — never both at once. */
  image?: PlaceholderImage
}

export interface DifferentiatorItem {
  lead: string
  body: string
}

/** A plain narrative beat (eyebrow/heading/body) — Silent Problem (4.1),
 * Experience/PEAK (4.6), and (IV only) Mechanism (4.2). Rendered via
 * WhyItMatters: no new visual language. */
export interface NarrativeBeat {
  id: string
  eyebrow: string
  headline: string
  body: string
  ctaLabel?: string
  image?: PlaceholderImage
}

/** A narrative beat + a short supporting point list — the IA-consolidated
 * shape used for:
 *  - "Differentiation" (non-IV pages): merges 4.2 Mechanism + 4.3 Why This Is
 *    Different into one section instead of two consecutive plain-text blocks.
 *  - "Trust & Safety" (all pages): merges 4.9 Clinical Authority + 4.10 Risk
 *    Reversal into one section instead of two consecutive plain-text blocks.
 * Rendered via the existing Differentiators/PointList components — an
 * existing pattern, not a new one. Nothing is deleted: both source beats'
 * full text survives, one as the intro body, the other(s) as PointList items. */
export interface CompositeBeat {
  id: string
  eyebrow: string
  headline: string
  body: string
  points: DifferentiatorItem[]
  /** Only used by Trust & Safety — left unset until a named clinician exists.
   * Do not fabricate; appended as an extra point only when present. */
  clinicianCredentials?: string
}

export interface ServiceProcess {
  eyebrow: string
  headline: string
  steps: HowItWorksStep[]
  prepNote?: string
}

export interface SuitabilityPair {
  lead: string
  body: string
}

export interface ServiceSuitability {
  eyebrow: string
  headline: string
  forLabel: string
  forItems: SuitabilityPair[]
  notForLabel?: string
  notForItems?: string[]
}

export interface ServiceComparison {
  eyebrow: string
  headline: string
  columnLabels: [string, string, string]
  rows: { feature: string; values: [string, string, string]; info?: string }[]
  kicker?: string
  ctaLabel: string
}

export interface ServicePricingTier {
  name: string
  price: string
  note?: string
  included?: string[]
}

export interface ServicePricing {
  eyebrow: string
  headline: string
  body: string
  tiers: ServicePricingTier[]
  trustNotes: string[]
  ctaLabel?: string
  /** Price/duration/reassurance shown in a separate line directly below the CTA
   * button — never concatenated into the button label itself. */
  ctaSubline?: string
}

export interface CatalogRow {
  name: string
  description?: string
  venue: string
  duration: string
  price: string
  status: 'live' | 'scaling'
  /** Omit entirely for 'scaling' rows — no fabricated routes for services that
   * don't have a live page yet. `href` may be a same-page anchor (e.g.
   * '#booking-access', used by IV Therapy's own page) or a cross-page route
   * (e.g. '/services/vo2-max', used by the Homepage router). */
  cta?: { label: string; href: string }
}

export interface CatalogGroup {
  title: string
  /** Anchor target for in-page navigation (e.g. Homepage's hero segmentation
   * chips scrolling to a specific cluster). Omit if nothing links to it directly. */
  id?: string
  rows: CatalogRow[]
}

export interface ServiceCatalog {
  eyebrow: string
  headline: string
  ctaLabel?: string
  groups: CatalogGroup[]
}

export interface BookingMethod {
  label: string
  body: string
}

export interface ServiceBookingAccess {
  eyebrow: string
  headline: string
  body: string
  ctaLabel: string
  /** Price/duration/reassurance shown directly below the CTA button — never
   * concatenated into the button label itself. */
  ctaSubline?: string
  methods: BookingMethod[]
  reportNote?: string
}

export interface ServiceFooter {
  tagline: string
  trustItems: { label: string; value: string }[]
  addressLines: string[]
  crossSell?: { label: string; href: string }[]
}

export interface ServiceSeo {
  title: string
  description: string
  path: string
  h1: string
}

export interface ServiceStickyCta {
  label: string
  price: string
  ctaLabel: string
  revealThreshold: number
}

/** FAQ, with the real category system — question→category map, used by
 * the existing Faq component's category sidebar/pill nav. Every question
 * must appear as a key so no FAQ silently falls back to an uncategorised state. */
export interface ServiceFaq {
  items: FaqItem[]
  categoryByQuestion: Record<string, string>
}

/** Social-proof entry. Every current entry is `isPlaceholder: true` — no
 * verified, consented testimonial has been supplied for any Mumbai page yet.
 * `displayName` must be an internal placeholder label (e.g. "Persona A —
 * Practical, data-focused"), never a realistic-sounding fake name — the
 * Testimonials component also strips isPlaceholder entries from production
 * builds, but the label itself must be unmistakably non-real too, as a
 * second line of defense against shipping fabricated social proof. */
export interface Testimonial {
  quote: string
  displayName: string
  /** Short service/role framing shown under the name — never a location claim
   * (the Mumbai clinic is new; nothing here happened "at Fairmont Mumbai"). */
  context: string
  service: 'iv-therapy' | 'posture-screening' | 'rmr' | 'ems-sculpting' | 'vo2-max' | 'sleepcation'
  /** Internal note on where this came from — not rendered. */
  source: string
  verified: boolean
  permission: boolean
  isPlaceholder: true
}

export interface ServiceData {
  slug: string
  name: string
  navLinks: { href: string; label: string }[]
  seo: ServiceSeo
  hero: ServiceHero
  silentProblem: NarrativeBeat
  /** IV only — Why Different is its own rich Comparison table right after, so
   * Mechanism stays a standalone beat (no redundancy to merge away). */
  mechanism?: NarrativeBeat
  /** IV only — the real feature-comparison table. */
  whyDifferentComparison?: ServiceComparison
  /** Non-IV pages only — 4.2 Mechanism + 4.3 Why Different merged into one
   * text+points section (see CompositeBeat doc above). */
  differentiation?: CompositeBeat
  /** IV only — the real Infusion Bar pricing/menu table. Non-IV pages fold
   * their 4.4 Value Equation prose into `pricing.body` instead (it was
   * otherwise duplicating the price already stated in Pricing/4.11). */
  valueEquationCatalog?: ServiceCatalog
  process: ServiceProcess
  experience: NarrativeBeat
  suitability: ServiceSuitability
  /** 4.8 Social Proof. Currently all-placeholder on every page (see Testimonial
   * doc) — rendered in development for review, stripped in production. */
  testimonials: Testimonial[]
  /** 4.9 Clinical Authority + 4.10 Risk Reversal, merged (see CompositeBeat doc). */
  trustSafety: CompositeBeat
  pricing: ServicePricing
  faq: ServiceFaq
  bookingAccess: ServiceBookingAccess
  stickyCta: ServiceStickyCta
  footer: ServiceFooter
  disclaimer: string
}
