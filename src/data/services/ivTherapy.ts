import type { ServiceData, CatalogGroup } from '../../types/service'
import { getTestimonialsForService } from '../testimonials'

const ADDRESS = [
  'AIWO Longevity Clinic',
  'Level 2, Fairmont Mumbai, T2 Terminal',
  'Chhatrapati Shivaji Maharaj International Airport Road',
  'Mumbai 400 099, Maharashtra, India',
]

export const infusionBarGroup: CatalogGroup = {
  title: 'The Infusion Bar — formulations & pricing',
  rows: [
    {
      name: 'IV Mega Glow',
      description: 'Skin glow · Vitamin C 12.5g · NAC 1g · Glutathione 1800mg · RL 250mL',
      venue: 'In-room / Bluxone Suite',
      duration: '45–60 min',
      price: '₹14,999',
      status: 'live',
      cta: { label: 'Book Mega Glow', href: '#booking-access' },
    },
    {
      name: 'Metabolic Booster',
      description: 'Energy · L-Carnitine 1g · B12 · Vitamin C 12.5g · Inj. B1',
      venue: 'In-room / Bluxone Suite',
      duration: '45–60 min',
      price: '₹14,999',
      status: 'live',
      cta: { label: 'Book Metabolic', href: '#booking-access' },
    },
    {
      name: 'Immunity Booster',
      description: 'Immune support · Vitamin C 12.5g · NAC 1g · Zinc',
      venue: 'In-room / Bluxone Suite',
      duration: '45–60 min',
      price: '₹14,999',
      status: 'live',
      cta: { label: 'Book Immunity', href: '#booking-access' },
    },
    {
      name: 'IV Iron Therapy',
      description: 'Iron replacement · Ferric preparation, dosed after screening',
      venue: 'In-room / Bluxone Suite',
      duration: '45–60 min',
      price: '₹14,999',
      status: 'live',
    },
    {
      name: 'Memory Booster',
      description: 'Focus · Citicoline 1g · Piracetam 3g',
      venue: 'In-room / Bluxone Suite',
      duration: '45–60 min',
      price: '₹14,999',
      status: 'live',
    },
    {
      name: 'NAD+ Therapy',
      description: 'Cellular ageing · NAD+ 250mg',
      venue: 'Bluxone Suite',
      duration: '90 min',
      price: '₹39,999',
      status: 'live',
    },
    {
      name: 'Cerebrolysin Therapy',
      description: 'Neuro recovery · ten-dose physician-supervised course',
      venue: 'Bluxone Suite',
      duration: '45 min/dose · course',
      price: '₹39,999',
      status: 'live',
    },
    {
      name: 'Add-Ons (any infusion)',
      description: 'Boost · Zinc · Magnesium · Trace Minerals · Vitamin B-Complex · Inj. B1/Thiamine',
      venue: '—',
      duration: '—',
      price: '₹2,999 each',
      status: 'live',
    },
  ],
}

export const ivTherapy: ServiceData = {
  slug: 'iv-therapy',
  name: 'IV Therapy',
  navLinks: [
    { href: '#why-different', label: 'Vs. a Drip Lounge' },
    { href: '#catalog', label: 'Formulations' },
    { href: '#process', label: 'How It Works' },
    { href: '#faq', label: 'FAQs' },
  ],
  seo: {
    title: 'IV Therapy Mumbai | Physician-Supervised Drips | AIWO Fairmont',
    description:
      'Physician-supervised IV therapy at AIWO, Fairmont Mumbai — energy, glow, immunity, recovery, NAD+. Screened before every infusion. From ₹14,999. Book through concierge.',
    path: '/services/iv-therapy',
    h1: 'Intravenous Therapies at Fairmont Mumbai',
  },
  hero: {
    eyebrow: 'THE INFUSION BAR · FAIRMONT MUMBAI',
    headline: 'Your supplements are being flushed away. This isn’t.',
    emphasizeHeadline: '',
    headlineSoft: 'This isn’t',
    subhead:
      'Physician-supervised IV therapy at Fairmont Mumbai — nearly the full dose, straight into your bloodstream, in 45 minutes. Poured only after a clinician says yes.',
    emphasizeSubhead: '',
    ctaLabel: 'Book Consultation',
    ctaHref: '#booking-access',
    ctaContextLine: 'From ₹14,999 · 45–90 min',
    trustChips: [
      { label: 'Physician-supervised' },
      { label: 'Screened before every infusion' },
      { label: 'Nearly full-dose delivery' },
      { label: 'In-room or Bluxone Suite' },
      { label: 'Fairmont Mumbai' },
    ],
    image: { assetKey: 'iv-hero', label: 'TEMP IMAGE — IV INFUSION IN PROGRESS', aspect: '4 / 3', isPlaceholder: true },
  },
  silentProblem: {
    id: 'the-problem',
    eyebrow: 'THE SILENT PROBLEM',
    headline: "You're spending on nutrition your body never receives.",
    body: "Six supplements every morning. The bottle says 1000mg. By the time your gut is done, most of it is gone — 70–90% of some nutrients, eliminated before they ever reach your cells. Multiply that across every supplement, every day, for years. That's the gap between what you spend on your health and what your body actually uses — and you feel it as fatigue sleep doesn't fix, dullness no serum reaches, the flu you catch every time the office does.",
  },
  mechanism: {
    id: 'mechanism',
    eyebrow: 'THE MECHANISM',
    headline: 'The absorption difference — and the safety difference.',
    body: 'An oral supplement fights your digestion; an IV bypasses it, so nearly the full dose reaches your bloodstream within minutes. But absorption is only half the reason to choose carefully — the other half is who’s holding the needle. At AIWO, nothing is poured until a clinician has screened you and matched the formulation to your goal.',
  },
  whyDifferentComparison: {
    eyebrow: 'WHY THIS IS DIFFERENT',
    headline: 'The line between a wellness fad and clinical care.',
    columnLabels: ['Oral supplements', 'Typical drip lounge', 'AIWO Infusion Bar'],
    rows: [
      { feature: 'Reaches your blood', values: ['A fraction', 'High', 'High'] },
      { feature: 'Clinician screens first', values: ['—', 'Often not', 'Always'] },
      { feature: 'Supervision', values: ['—', 'Sometimes a technician', 'Physician-supervised'] },
      { feature: 'Formulation', values: ['Generic', 'Fixed menu', 'Matched & adjusted to you'] },
    ],
    ctaLabel: 'Book Consultation',
  },
  valueEquationCatalog: {
    eyebrow: 'CHOOSE YOUR OUTCOME',
    headline: 'Physician-supervised · In-room / Bluxone Suite · formulations adjusted after screening.',
    ctaLabel: 'Book Consultation',
    groups: [infusionBarGroup],
  },
  process: {
    eyebrow: 'HOW IT WORKS',
    headline: 'From consultation to infusion.',
    steps: [
      { id: 'STEP 01', title: 'Book a consultation', body: 'Through concierge or the spa desk.' },
      { id: 'STEP 02', title: 'Screening', body: 'A clinician screens you & matches the formulation.' },
      { id: 'STEP 03', title: 'Recline', body: 'In-room or Bluxone Suite.' },
      { id: 'STEP 04', title: 'The infusion', body: '45–90 min, vitals watched.' },
      { id: 'STEP 05', title: 'After', body: 'Add-ons optional; follow-on where appropriate.' },
    ],
  },
  experience: {
    id: 'experience',
    eyebrow: 'THE EXPERIENCE',
    headline: 'Forty-five minutes to lighter, clearer, done.',
    body: 'You recline — in the Infusion Bay or your own room. Your history’s been reviewed, your formulation chosen. The line goes in, your vitals are watched, and for the next 45–90 minutes you simply rest while your body receives what it’s been missing. You get up lighter, clearer, done.',
    ctaLabel: 'Book Consultation',
    image: { assetKey: 'iv-experience', label: 'TEMP IMAGE — RECLINED INFUSION, FAIRMONT SUITE', aspect: '16 / 9', isPlaceholder: true },
  },
  suitability: {
    eyebrow: 'WHO THIS IS FOR',
    headline: 'Is IV therapy right for you?',
    forLabel: 'Who this is for',
    forItems: [
      { lead: 'Running on empty', body: '→ Metabolic Booster.' },
      { lead: 'Dull skin', body: '→ IV Mega Glow.' },
      { lead: 'Always ill', body: '→ Immunity Booster.' },
      { lead: 'Slow recovery', body: '→ metabolic/recovery infusions.' },
      { lead: 'Longevity-curious', body: '→ NAD+ / advanced protocols.' },
      { lead: 'Fairmont guest', body: '→ in-room delivery.' },
    ],
    notForLabel: 'Not for you if',
    notForItems: ["Screening finds it isn't appropriate — infusions may be adapted, deferred or declined."],
  },
  testimonials: getTestimonialsForService('iv-therapy'),
  // Merges 4.9 Clinical Authority + 4.10 Risk Reversal into one section
  // (previously two consecutive plain-text blocks) — clinical-authority
  // paragraph is the intro, risk-reversal content becomes the point list.
  // Named clinician credentials pending — do not fabricate; left unset.
  trustSafety: {
    id: 'trust-safety',
    eyebrow: 'CLINICAL AUTHORITY & RISK REVERSAL',
    headline: 'Screened, supervised — and reversible.',
    body: "Every infusion is screened, matched and supervised by AIWO's resident clinical team at Fairmont Mumbai — registered, insured practitioners. Poured only after a clinician says yes.",
    points: [
      { lead: 'Screened before anything is poured.', body: 'The formulation is adjusted to you; vitals are watched throughout.' },
      { lead: 'Free rescheduling', body: 'up to four hours ahead.' },
      {
        lead: 'Not a substitute for emergency care.',
        body: 'These services support recovery and wellbeing.',
      },
    ],
  },
  pricing: {
    eyebrow: 'PRICING & OFFER',
    headline: 'One infusion, matched to you.',
    body: 'One recommended infusion is matched to your goal at consultation; add-ons ₹2,999. (INR, excl. GST; indicative and subject to clinical consultation.)',
    tiers: [{ name: 'AIWO Infusion Bar', price: 'From ₹14,999' }],
    trustNotes: [],
    ctaLabel: 'Book Consultation',
    ctaSubline: 'From ₹14,999 · 45–90 min',
  },
  faq: {
    items: [
      {
        question: 'Is IV safe?',
        answer:
          'Physician-supervised, only after screening, formulation adjusted to you; supports wellbeing, not a substitute for medical care.',
      },
      {
        question: "How's this different from a drip lounge?",
        answer: "A clinician screens you before anything's poured, supervises it, and matches the drip to you — not a fixed menu on request.",
      },
      { question: "How's my formulation chosen?", answer: 'At consultation, from your goal, history and medications; adjusted to you.' },
      { question: "I'm on medication.", answer: "Tell your clinician at screening — it's part of confirming suitability." },
      {
        question: 'Does it work / will I feel it?',
        answer: 'You absorb nearly the full dose vs a fraction orally; most feel lighter and clearer.',
      },
      {
        question: 'Too expensive?',
        answer: 'From ₹14,999 for a supervised, full-dose infusion — versus supplements your gut discards.',
      },
      { question: 'How long / where?', answer: '45–90 min, in your room or the Bluxone Suite.' },
      {
        question: 'Add-ons?',
        answer: 'Zinc, Magnesium, Trace Minerals, B-Complex or B1/Thiamine — ₹2,999 each with any infusion.',
      },
      { question: 'Data privacy?', answer: 'Handled under the DPDP Act 2023.' },
      {
        question: "What if it's not right for me?",
        answer: 'Screening may adapt, defer or decline it — that’s the safeguard.',
      },
    ],
    categoryByQuestion: {
      "How's this different from a drip lounge?": 'About the service',
      "How's my formulation chosen?": 'About the service',
      'How long / where?': 'About the service',
      'Is IV safe?': 'Safety / Eligibility',
      "I'm on medication.": 'Safety / Eligibility',
      "What if it's not right for me?": 'Safety / Eligibility',
      'Does it work / will I feel it?': 'Results / Outcomes',
      'Too expensive?': 'Pricing / Booking',
      'Add-ons?': 'Pricing / Booking',
      'Data privacy?': 'Privacy',
    },
  },
  bookingAccess: {
    eyebrow: 'BOOK',
    headline: 'Stop paying for nutrition you never absorb.',
    body: 'The gap between what you take and what your body receives has a fix — delivered safely, by a clinician, in the time it takes to answer a few emails.',
    ctaLabel: 'Book Consultation',
    ctaSubline: 'From ₹14,999 · 45–90 min',
    methods: [
      { label: 'Fairmont concierge', body: 'Ask the concierge desk to arrange your consultation and infusion.' },
      { label: 'Spa desk', body: 'Book directly through the Bluxone Spa desk.' },
      { label: 'In-room code', body: 'Use the in-room code provided in your suite to request a booking.' },
    ],
  },
  stickyCta: { label: 'IV Therapy', price: 'From ₹14,999', ctaLabel: 'Book Now', revealThreshold: 0.4 },
  footer: {
    tagline: 'Restore · Move · Perform · Longevity',
    trustItems: [
      { label: 'Clinical', value: 'Delivered by registered, insured clinical practitioners' },
      { label: 'Screening', value: 'Every infusion administered only after clinician screening' },
    ],
    addressLines: ADDRESS,
    crossSell: [
      { label: 'See everything under one roof', href: '/' },
      { label: 'Posture & Longevity Assessment', href: '/services/posture-screening' },
      { label: 'VO2 Max Testing', href: '/services/vo2-max' },
      { label: 'RMR Test', href: '/services/rmr' },
      { label: 'AIWO Sculpt', href: '/services/ems-sculpting' },
    ],
  },
  disclaimer:
    'Intravenous therapies are administered only after screening by a qualified clinician; formulations may be adjusted to individual requirement. These services support recovery and wellbeing; not a substitute for emergency or specialist medical care. Data handled per DPDP Act 2023. All prices in INR, excluding GST at the prevailing rate; indicative and subject to clinical consultation.',
}
