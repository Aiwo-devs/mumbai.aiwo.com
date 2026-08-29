import type { CatalogGroup } from '../types/service'
import { infusionBarGroup } from './services/ivTherapy'

export const ADDRESS = [
  'AIWO Longevity Clinic',
  'Level 2, Fairmont Mumbai, T2 Terminal',
  'Chhatrapati Shivaji Maharaj International Airport Road',
  'Mumbai 400 099, Maharashtra, India',
]

// ─── Hero (§3) ───────────────────────────────────────────────────────────────
export const homepageHero = {
  eyebrow: 'AIWO LONGEVITY CLINIC AT FAIRMONT MUMBAI',
  headline: 'Know your body. Then improve it.',
  emphasizeHeadline: '',
  headlineSoft: 'Then improve it',
  deck: 'A quiet little clinic, between the pool and the pillow menu.',
  subhead:
    'Movement health and longevity medicine — physiotherapy, diagnostics, aesthetics and IV, all under one roof inside Fairmont Mumbai. Measured first. Matched second.',
  emphasizeSubhead: '',
  ctaLabel: 'Claim Free Slot',
  ctaHref: '#booking-access',
  ctaContextLine: 'Posture & Longevity Assessment · complimentary · 20–25 min',
  trustChips: [
    { label: 'Resident clinical team' },
    { label: 'Measured, not guessed' },
    { label: 'One shared record' },
    { label: 'Reports on the spot' },
    { label: 'Fairmont Mumbai, T2' },
  ],
  image: { assetKey: 'home-hero', label: 'TEMP IMAGE — PHYSIOTHERAPIST REVIEWING REPORT WITH GUEST', aspect: '4 / 3', isPlaceholder: true as const },
}

// Segmentation entry — exactly the 4 chips supplied, no more. Each scrolls to
// the cluster/CTA the source document maps that persona to.
export const heroSegmentChips = [
  { label: 'Start free', href: '#gateway-gift' },
  { label: 'For 40+', href: '#cluster-longevity-lab' },
  { label: 'Optimising already?', href: '#cluster-longevity-lab' },
  { label: 'Staying at the Fairmont?', href: '#cluster-concierge-menu' },
]

// ─── 4.1 Silent Problem/Reframe ──────────────────────────────────────────────
export const silentProblem = {
  id: 'the-problem',
  eyebrow: 'THE REFRAME',
  headline: 'Your health is scattered. Nothing is measuring the drift.',
  body: "You have a doctor for one thing, a gym for another, a dermatologist for a third — and none of them share a record or a plan. Meanwhile \"normal\" on an annual test isn't the same as optimal, and most decline begins quietly, in the years you feel fine. The cost isn't dramatic; it's the slow drift you can't see because nothing is measuring it.",
}

// ─── 4.2 All Under One Roof — distilled to a point-list so 4.1/4.2/4.3 don't
// read as three identical plain-text blocks in a row. ────────────────────────
export const allUnderOneRoof = {
  id: 'ecosystem',
  eyebrow: 'ALL UNDER ONE ROOF',
  headline: 'One resident clinical team. One shared record. One plan.',
  body: 'AIWO brings it together inside Fairmont Mumbai: objective diagnostics, physiotherapy, movement and recovery, aesthetics, and physician-supervised IV. Diagnostics translate your body into data; everything else translates that data into a result you can feel. Nothing is poured, pressed or prescribed until a clinician says yes.',
  points: [
    { lead: 'One resident clinical team.', body: 'Not five different providers who never share a record.' },
    { lead: 'One shared record.', body: 'Every result feeds the same plan, not a new file each time.' },
    { lead: 'One plan you can feel.', body: 'A coherent recommendation, not a menu you choose from cold.' },
  ],
}

// ─── 4.3 Measurement-First — paired with an image rather than more text, so
// this reads as a distinct visual moment, not a third stacked paragraph. ─────
export const measurementFirst = {
  id: 'measurement-first',
  eyebrow: 'MEASUREMENT-FIRST',
  headline: 'Measured first. Matched second.',
  body: "The order is the point. We don't sell you a treatment and hope; we assess, then recommend exactly one next step, and a longer programme only where it's warranted. That's the line between clinical care and a wellness menu.",
  image: { assetKey: 'home-measurement', label: 'TEMP IMAGE — DIAGNOSTIC ASSESSMENT IN PROGRESS', aspect: '16 / 9', isPlaceholder: true as const },
}

// ─── 4.4 Service & Programme Router — full 7-cluster catalogue, nothing
// skipped. IDs are the segmentation-chip anchor targets; `cta` on ●Live rows
// links to the real /services/* route (never fabricated for ○Scaling rows).
const homepageInfusionRows = infusionBarGroup.rows.map((row, index) =>
  index === 0 ? { ...row, cta: { label: 'Book Consult', href: '/services/iv-therapy' } } : { ...row, cta: undefined },
)

export const catalogGroups: CatalogGroup[] = [
  {
    id: 'cluster-gift',
    title: 'One · Our Gift',
    rows: [
      {
        name: 'Posture & Longevity Assessment',
        description: 'Digital posture mapping, grip strength (dynamometry), video gait, biological-age; instant visual report',
        venue: 'In-room / Bluxone Spa',
        duration: '20–25 min',
        price: 'Complimentary',
        status: 'live',
        cta: { label: 'Claim Free Slot', href: '#booking-access' },
      },
    ],
  },
  {
    id: 'cluster-concierge-menu',
    title: 'Two · The Concierge Menu — Recovery & Wellness Rituals',
    rows: [
      {
        name: 'Travel Back Reset',
        description: 'Manual therapy, mobilisation and corrective stretch for the long-haul traveller',
        venue: 'In-room',
        duration: '30 min',
        price: '₹3,499',
        status: 'scaling',
      },
      {
        name: 'Executive Desk-Body Tune-Up',
        description: 'Targeted release for neck, shoulders and lower back',
        venue: 'In-room / Bluxone Spa',
        duration: '30 min',
        price: '₹2,999',
        status: 'scaling',
      },
      {
        name: 'Sports Recovery Ritual',
        description: 'Assisted stretching, compression recovery boots, cryo-compression',
        venue: 'Bluxone Spa',
        duration: '30 min',
        price: '₹3,499',
        status: 'scaling',
      },
      {
        name: 'In-Room Premium Physiotherapy Visit',
        description: 'Full assessment, manual therapy, exercise and ergonomic guidance in the guest room',
        venue: 'In-room',
        duration: '45–60 min',
        price: '₹5,499',
        status: 'scaling',
      },
    ],
  },
  {
    id: 'cluster-core-physio',
    title: 'Three · The Clinic — Core Physiotherapy',
    rows: [
      {
        name: 'Posture Screening & Correction',
        description: 'Digital assessment, myofascial release, corrective exercise',
        venue: 'Bluxone Spa / In-room',
        duration: '20 min',
        price: '₹4,999',
        status: 'live',
        cta: { label: 'Book Session', href: '/services/posture-screening' },
      },
      {
        name: 'Full-Body Mobility & Movement Screening',
        description: 'Spine, hip, shoulder and ankle mobility with full movement & stability screening and a personalised exercise prescription',
        venue: 'Bluxone Spa',
        duration: '20–30 min',
        price: '₹4,999',
        status: 'scaling',
      },
      {
        name: 'Kinesiology Stretch Therapy',
        description: 'Assisted stretching: hamstrings, hip flexors, adductors, calves, thoracic',
        venue: 'Bluxone Spa',
        duration: '20 min',
        price: '₹4,999',
        status: 'scaling',
      },
      {
        name: 'Foot Stability & Balance Training',
        description: 'Intrinsic strengthening, balance training, fall prevention, gait work',
        venue: 'Bluxone Spa / Gym',
        duration: '20 min',
        price: '₹4,999',
        status: 'scaling',
      },
      {
        name: 'Pain & Inflammation Management',
        description: 'Cryo-compression, manual therapy, trigger-point work, mobilisation',
        venue: 'Bluxone Spa',
        duration: '20–30 min',
        price: '₹4,999',
        status: 'scaling',
      },
      {
        name: 'Core Stability & Back Care',
        description: 'Core activation, pelvic alignment, low-back rehab, neck strengthening',
        venue: 'Bluxone Spa / Gym',
        duration: '30 min',
        price: '₹4,999',
        status: 'scaling',
      },
      {
        name: 'Senior Mobility & Fall Prevention',
        description: 'Functional strength, balance, walking assessment, home program',
        venue: 'Bluxone Spa / In-room',
        duration: '30 min',
        price: '₹4,999',
        status: 'scaling',
      },
    ],
  },
  {
    id: 'cluster-house-signatures',
    title: 'Three · The House Signatures',
    rows: [
      {
        name: 'Mashing · Ashiatsu',
        description:
          "Barefoot back-walking massage, steadied by overhead bars, for deep, broad release; an AIWO signature technique",
        venue: 'Bluxone Spa',
        duration: '60 min',
        price: '₹7,999',
        status: 'scaling',
      },
      {
        name: 'AIWO Sculpt',
        description: 'A supervised whole-body electro-muscle-stimulation suit session; twenty minutes equal to hours in the gym',
        venue: 'Bluxone Spa / Gym',
        duration: '20 min',
        price: '₹3,500',
        status: 'live',
        cta: { label: 'Book Session', href: '/services/ems-sculpting' },
      },
      {
        name: 'Egoscue Tower Posture Therapy',
        description: 'Tower-assisted postural realignment, made for the desk-bound and the frequent flyer',
        venue: 'Bluxone Spa / Gym',
        duration: '30 min',
        price: '₹4,999',
        status: 'scaling',
      },
    ],
  },
  {
    id: 'cluster-longevity-lab',
    title: 'Four · Measured Wellness — The Longevity Lab',
    rows: [
      {
        name: 'VO2 Max Testing',
        description:
          'The gold-standard measure of cardiorespiratory fitness and biological longevity; a graded maximal-effort test returning your precise fitness age and personalised heart-rate training zones',
        venue: 'Bluxone Spa / Gym',
        duration: '60 min',
        price: '₹7,999',
        status: 'live',
        cta: { label: 'Book My Test', href: '/services/vo2-max' },
      },
      {
        name: 'Resting Metabolic Rate (RMR)',
        description: 'A short breath test measuring the exact calories your body burns at rest, to anchor nutrition to your real metabolism',
        venue: 'Bluxone Spa',
        duration: '~10 min',
        price: '₹4,999',
        status: 'live',
        cta: { label: 'Book My Test', href: '/services/rmr' },
      },
      {
        name: 'Comprehensive Movement, Strength & Pain Assessment',
        description:
          'Full-body strength testing, posture, gait and movement analysis and a clinical pain assessment in one deep-dive, concluding with a written comprehensive treatment protocol',
        venue: 'Bluxone Spa',
        duration: '45–60 min',
        price: '₹2,999',
        status: 'scaling',
      },
    ],
  },
  {
    id: 'cluster-structured-care',
    title: 'Five · Structured Care — Specialist Clinical Programs',
    rows: [
      {
        name: 'Post-Surgical Rehabilitation',
        description: 'Knee & hip replacement, ACL and rotator-cuff protocols with surgeon progress reports',
        venue: 'Bluxone Spa',
        duration: '12 sessions',
        price: '₹2,667/session · ₹31,999 package',
        status: 'scaling',
      },
      {
        name: "Women's Health Physiotherapy",
        description: 'Pre- and postnatal care, pelvic-floor rehab, diastasis recti; female-led',
        venue: 'Bluxone Spa',
        duration: '8 sessions',
        price: '₹2,687/session · ₹21,499 package',
        status: 'scaling',
      },
      {
        name: 'Vestibular & Vertigo Rehabilitation',
        description: 'BPPV repositioning and balance retraining',
        venue: 'Bluxone Spa',
        duration: '6 sessions',
        price: '₹2,917/session · ₹17,499 package',
        status: 'scaling',
      },
      {
        name: 'TMJ & Headache Clinic',
        description: 'Jaw dysfunction and cervicogenic headache care',
        venue: 'Bluxone Spa',
        duration: '6 sessions',
        price: '₹2,667/session · ₹15,999 package',
        status: 'scaling',
      },
      {
        name: 'Longevity Training Protocol',
        description:
          'Monthly supervised program for VO2 max improvement, strength, mobility, stability and endurance; the structured follow-on to the VO2 Max Test',
        venue: 'Fitness Centre / Gym',
        duration: '15 / month',
        price: '₹2,333/session · ₹35,000 package',
        status: 'scaling',
      },
      {
        name: 'Corporate Ergonomics & Desk Wellness',
        description: 'On-site posture screening and workshops for corporate groups and events hosted at Fairmont',
        venue: 'On-site / Meeting rooms',
        duration: 'Per event/day',
        price: 'from ₹48,999',
        status: 'scaling',
      },
    ],
  },
  {
    id: 'cluster-skin-aesthetics',
    title: 'Six · Skin & Aesthetics — Facial Services',
    rows: [
      {
        name: 'Facial Analysis',
        description: 'Diagnostic skin mapping and a tailored treatment recommendation',
        venue: 'Bluxone Spa',
        duration: '30 min',
        price: '₹2,999',
        status: 'scaling',
      },
      {
        name: 'HydraFacial',
        description: 'Deep cleanse, exfoliation and hydration in a single restorative session',
        venue: 'Bluxone Spa',
        duration: '60 min',
        price: '₹9,999',
        status: 'scaling',
      },
      {
        name: 'Laser Facial',
        description: 'Non-invasive laser resurfacing for tone, clarity and luminosity',
        venue: 'Bluxone Spa',
        duration: '45 min',
        price: '₹9,999',
        status: 'scaling',
      },
      {
        name: 'Carbon Laser Facial',
        description: 'The carbon peel: refined pores, even texture and a lit-from-within finish',
        venue: 'Bluxone Spa',
        duration: '45 min',
        price: '₹9,999',
        status: 'scaling',
      },
    ],
  },
  { ...infusionBarGroup, id: 'cluster-infusion-bar', title: 'Seven · The Infusion Bar — Intravenous Therapies', rows: homepageInfusionRows },
]

// ─── 4.5 The Gateway Gift — kept as its own early conversion beat (not merged
// with 4.12; see accessBooking/finalCta below for where 4.12's unique content went). ─
export const gatewayGift = {
  id: 'gateway-gift',
  eyebrow: 'THE GATEWAY GIFT',
  headline: "Every journey begins with a complimentary assessment.",
  body: "You don't choose from the catalogue cold. Every journey begins with a complimentary Posture & Longevity Assessment — 20 minutes, four measured reads, an instant report — after which a clinician recommends exactly one next step. It's the easiest, lowest-risk way in, and it's free.",
  ctaLabel: 'Claim Free Slot',
}

// ─── 4.6 The AIWO Method — 5-step loop, same shape as the service pages'
// "How It Works" (ProcessSteps), reused as-is. ────────────────────────────────
export const aiwoMethod = {
  eyebrow: 'THE AIWO METHOD',
  headline: 'The loop that makes results compound.',
  steps: [
    { id: 'STEP 01', title: 'Measure', body: 'The assessment, or a diagnostic.' },
    { id: 'STEP 02', title: 'Interpret', body: 'A clinician, not an algorithm.' },
    { id: 'STEP 03', title: 'Personalise', body: 'Exactly one next step.' },
    { id: 'STEP 04', title: 'Recalibrate', body: 'Re-measure on a cadence.' },
    { id: 'STEP 05', title: 'Maintain', body: 'Results that compound, not reset.' },
  ],
}

// ─── 4.7 What You'll Feel — 5 outcome bullets, paired with a human/lifestyle
// image to break the clinical rhythm before the persona section. ─────────────
export const whatYoullFeel = {
  id: 'what-youll-feel',
  eyebrow: 'WHAT YOU’LL FEEL',
  headline: 'Measurable outcomes, not vague wellness.',
  body: 'Each framed as measured — because here, it is.',
  points: [
    { lead: 'More energy', body: 'that sleep alone wasn’t giving you.' },
    { lead: 'Strength and mobility', body: 'you can measure, not guess.' },
    { lead: 'Skin treated', body: 'to what it actually asked for.' },
    { lead: 'A fitness age and metabolism', body: 'you can move.' },
    { lead: 'Recovery', body: 'that keeps up with how you live.' },
  ],
  image: { assetKey: 'home-outcome', label: 'TEMP IMAGE — GUEST, POST-SESSION, FAIRMONT CONTEXT', aspect: '16 / 9', isPlaceholder: true as const },
}

// ─── 4.8 Who This Is For — 6-persona self-selection. ─────────────────────────
export const whoThisIsFor = {
  eyebrow: 'WHO THIS IS FOR',
  headline: 'Find yourself below.',
  forLabel: 'Self-select',
  forItems: [
    { lead: 'Staying at the Fairmont', body: '→ start with the gift; add recovery or an in-room IV.' },
    { lead: 'A time-poor Mumbai professional', body: '→ Posture, EMS, VO2, an energy IV.' },
    { lead: 'Proactive 40+', body: '→ VO2, RMR, the Longevity Training Protocol, NAD+.' },
    { lead: 'Chasing performance', body: '→ VO2 + EMS + training.' },
    { lead: 'After glow', body: '→ Facial Analysis + IV Mega Glow.' },
    { lead: 'In pain or recovering', body: '→ Core Physiotherapy, Structured Care.' },
  ],
}

// ─── 4.10 Authority — no fabricated clinician name/credentials. ──────────────
export const authority = {
  id: 'authority',
  eyebrow: 'AUTHORITY',
  headline: 'A resident clinical team, not a spa menu.',
  body: "Delivered by AIWO's resident clinical team at Fairmont Mumbai — registered, insured practitioners. Every service begins with, or follows, a clinical assessment; treatments may be adapted, deferred or declined where not appropriate.",
  // Named clinician credentials/accreditation pending — do not fabricate.
}

// ─── 4.11 Access & Booking — verified channels only, no WhatsApp. The unique
// 4.12 "one obvious first move" sentence is folded into this body (see the
// implementation report for the full sentence-by-sentence 4.12 mapping). ─────
export const bookingAccess = {
  eyebrow: 'ACCESS & BOOKING',
  headline: 'One location, one shared record.',
  body: "Bookable through concierge, the spa desk, or the in-room code — without stepping beyond the Fairmont's doors. There's one obvious first move, and it costs nothing: the complimentary assessment.",
  methods: [
    { label: 'Fairmont concierge', body: 'Ask the concierge desk to arrange any AIWO service.' },
    { label: 'Spa desk', body: 'Book directly through the Bluxone Spa desk.' },
    { label: 'In-room code', body: 'Use the in-room code provided in your suite to request a booking.' },
  ],
}

// ─── 4.13 FAQ — the real, categorized 10-item objection map (§6). Distinct
// from the Footer's 8 operational policy notes below. ────────────────────────
export const homepageFaq = {
  items: [
    { question: 'Is this just a fancy hotel spa?', answer: 'No — measured first, matched by a clinician; nothing poured or prescribed until a clinician says yes.' },
    { question: 'It looks like you do everything — is any of it deep?', answer: 'One resident clinical team, one shared record; diagnostics drive every recommendation.' },
    { question: 'Which service do I even need?', answer: 'Start with the free assessment; a clinician recommends exactly one next step — never a list.' },
    { question: 'I feel fine — why now?', answer: "Normal isn't the same as optimal, and most decline begins quietly. The assessment is free." },
    { question: 'Is it only for hotel guests?', answer: 'No — Mumbai members and visitors are welcome; the airport-corridor location is convenient either way.' },
    { question: 'Is it expensive?', answer: 'The front door is complimentary; paid services are priced per the catalogue and confirmed at consultation.' },
    { question: 'No time.', answer: 'In-house, in-room where possible; the assessment is 20 minutes.' },
    { question: 'Data privacy?', answer: 'Handled under the DPDP Act 2023; your record is yours.' },
    { question: 'Will I be upsold?', answer: 'One recommendation at a time — a longer programme only where warranted.' },
    { question: 'Is it safe / clinical?', answer: 'Registered, insured practitioners; every service assessment-led; IV screened before it’s poured.' },
  ],
  categoryByQuestion: {
    'Is this just a fancy hotel spa?': 'About AIWO',
    'It looks like you do everything — is any of it deep?': 'About AIWO',
    'Which service do I even need?': 'About AIWO',
    'I feel fine — why now?': 'About AIWO',
    'Will I be upsold?': 'About AIWO',
    'Is it only for hotel guests?': 'Safety / Eligibility',
    'Is it safe / clinical?': 'Safety / Eligibility',
    'Is it expensive?': 'Pricing / Booking',
    'No time.': 'Pricing / Booking',
    'Data privacy?': 'Privacy',
  },
}

// ─── 4.14 Final CTA — distinct closing beat, after FAQ. Carries 4.12's other
// unique sentence ("it measures you, matches you, and turns a menu into a
// plan"). No WhatsApp. ────────────────────────────────────────────────────────
export const finalCta = {
  id: 'final-cta',
  eyebrow: 'BEGIN HERE',
  headline: 'One roof. One clinical team. One measured plan.',
  body: 'Begin where every AIWO journey begins — free. It measures you, matches you, and turns a menu into a plan.',
  ctaLabel: 'Claim Free Slot',
}

// ─── Footer — 8 operational/legal policy notes (verbatim, unchanged content).
// Rendered as a compact numbered list near the Footer, NOT a second FAQ
// accordion — none of these map cleanly onto a supplied FAQ question without
// inventing one, and duplicating the same claims across two interactive
// systems was the thing being corrected. ──────────────────────────────────────
export const policyNotes = [
  'Prices in INR, excl. GST; indicative and subject to clinical consultation.',
  'Every service begins with, or follows, a clinical assessment; may be adapted, deferred or declined.',
  'IV only after clinician screening; formulations adjusted to requirement.',
  'Supports recovery and wellbeing; not a substitute for emergency or specialist medical care.',
  'Free reschedule/cancel up to four hours ahead.',
  'Multi-session programs valid six months, personal to the guest, non-transferable.',
  'Corporate engagements from ₹48,999 per event/day.',
  'Delivered by registered, insured practitioners; hours and offerings may vary without notice.',
]

export const footer = {
  tagline: 'Restore · Move · Perform · Longevity',
  trustItems: [
    { label: 'Clinical', value: 'Delivered by registered, insured clinical practitioners' },
    { label: 'Care', value: 'Every service begins with, or follows, a clinical assessment' },
  ],
  addressLines: ADDRESS,
  crossSell: [
    { label: 'Posture & Longevity Assessment', href: '/services/posture-screening' },
    { label: 'VO2 Max Testing', href: '/services/vo2-max' },
    { label: 'RMR Test', href: '/services/rmr' },
    { label: 'AIWO Sculpt', href: '/services/ems-sculpting' },
    { label: 'IV Therapy', href: '/services/iv-therapy' },
  ],
}

export const homepageSeo = {
  title: 'AIWO Longevity Clinic, Fairmont Mumbai | Diagnostics · Physio · IV · Aesthetics',
  description:
    'Movement health and longevity, all under one roof at Fairmont Mumbai — VO2 Max, RMR, physiotherapy, AIWO Sculpt, IV therapy and more. Start with a free assessment.',
  path: '/',
  h1: 'AIWO Longevity Clinic at Fairmont Mumbai',
}

export const homepageDisclaimer = 'Data handled per DPDP Act 2023.'

export const stickyCta = { label: 'AIWO Longevity Clinic', price: 'Complimentary', ctaLabel: 'Claim Free', revealThreshold: 0.3 }
