import type { ServiceData } from '../../types/service'
import { getTestimonialsForService } from '../testimonials'

const ADDRESS = [
  'AIWO Longevity Clinic',
  'Level 2, Fairmont Mumbai, T2 Terminal',
  'Chhatrapati Shivaji Maharaj International Airport Road',
  'Mumbai 400 099, Maharashtra, India',
]

export const vo2Max: ServiceData = {
  slug: 'vo2-max',
  name: 'VO2 Max Testing',
  navLinks: [
    { href: '#differentiators', label: 'The Test' },
    { href: '#process', label: 'How It Works' },
    { href: '#pricing', label: 'Pricing' },
    { href: '#faq', label: 'FAQs' },
  ],
  seo: {
    title: 'VO2 Max Test Mumbai | Fitness Age & Zones | AIWO Fairmont',
    description:
      'Measure your real VO2 Max and fitness age in 60 minutes at AIWO, Fairmont Mumbai. Personalised heart-rate zones. Book through concierge.',
    path: '/services/vo2-max',
    h1: 'VO2 Max Testing at Fairmont Mumbai',
  },
  hero: {
    eyebrow: 'THE LONGEVITY LAB · NEW AT FAIRMONT',
    headline: 'Your smartwatch has been guessing your fitness. In 60 minutes, know the real number.',
    emphasizeHeadline: '',
    headlineSoft: 'In 60 minutes, know the real number',
    subhead:
      'A direct, gold-standard VO2 Max test at Fairmont Mumbai — your true fitness age and personalised heart-rate training zones.',
    emphasizeSubhead: '',
    ctaLabel: 'Book VO2 Test',
    ctaHref: '#booking-access',
    ctaContextLine: '₹7,999 · 60 min',
    trustChips: [
      { label: 'Physician-screened' },
      { label: 'Gold-standard graded test' },
      { label: 'Results same hour + on WhatsApp' },
      { label: 'The Longevity Lab, Fairmont Mumbai' },
      { label: 'New at Fairmont' },
    ],
    image: { assetKey: 'vo2-hero', label: 'TEMP IMAGE — VO2 MAX TREADMILL TEST', aspect: '4 / 3', isPlaceholder: true },
  },
  silentProblem: {
    id: 'the-problem',
    eyebrow: 'THE SILENT PROBLEM',
    headline: "You train hard. But you're training blind.",
    body: "You run, you lift, you trust the number on your wrist. That number is an estimate — an algorithm's guess from heart rate and pace, never a measurement of the oxygen your body can use. So some sessions build your engine and most just make you tired, and you can't tell which. VO2 Max is one of the strongest objective markers of cardiorespiratory fitness and healthy ageing there is — and it's the one you've never actually measured. Every month it stays unmeasured is a month of decisions made in the dark.",
  },
  // Merges 4.2 "Introduce the Test" + 4.3 "Why This Is Different" — the three
  // measured outputs now read as a point list; the "wearable infers, we
  // measure" positioning becomes the intro.
  differentiation: {
    id: 'differentiators',
    eyebrow: 'INTRODUCE THE TEST',
    headline: "Measured. Not estimated. That's the whole difference.",
    body: 'Your watch never sees your oxygen use — it guesses. This is the gold-standard graded test: effort rises in stages while your body’s real response is measured throughout, up to your ceiling, delivered clinically inside Fairmont Mumbai. No inference. No assumption.',
    points: [
      { lead: 'Your VO2 Max', body: 'measured directly, not estimated.' },
      { lead: 'Your precise fitness age', body: 'an objective read you can train to improve.' },
      { lead: 'Personalised heart-rate zones', body: 'the exact ranges to train in for the next year.' },
    ],
  },
  process: {
    eyebrow: 'HOW IT WORKS',
    headline: 'From booking to your training zones.',
    steps: [
      { id: 'STEP 01', title: 'Book', body: 'Through concierge, the spa desk, or the in-room code.' },
      { id: 'STEP 02', title: 'Arrive', body: 'At the Longevity Lab — no fasting, dressed to move.' },
      { id: 'STEP 03', title: 'Screening', body: 'A clinician screens you (5 min).' },
      { id: 'STEP 04', title: 'The test', body: 'The 60-minute graded test.' },
      { id: 'STEP 05', title: 'Your results', body: 'Explained on the spot + sent to WhatsApp.' },
    ],
  },
  experience: {
    id: 'experience',
    eyebrow: 'THE EXPERIENCE',
    headline: 'Your 60 minutes, and the number at the end of them.',
    body: 'Minutes 0–10, setup. Minutes 10–45, effort rising in stages while your response is measured — building to your maximum, adapted to your level. Minutes 45–60, the reveal: your VO2 Max, your fitness age, and the exact heart-rate zones for endurance, fat-use and peak effort. Most people are surprised. All of them leave with a target that’s finally theirs.',
    ctaLabel: 'Book VO2 Test',
    image: { assetKey: 'vo2-experience', label: 'TEMP IMAGE — CLINICIAN MONITORING GRADED TEST', aspect: '16 / 9', isPlaceholder: true },
  },
  suitability: {
    eyebrow: 'WHO THIS IS FOR',
    headline: 'Is VO2 Max testing right for you?',
    forLabel: 'Who this is for',
    forItems: [
      { lead: 'You train', body: 'and want real zones, not a wrist estimate.' },
      { lead: 'You optimise', body: "and won't tolerate a blind spot in your data." },
      { lead: "You're 40+", body: "and want an objective read on cardiovascular fitness a resting check-up can't give." },
      { lead: 'You travel', body: 'and want executive-grade testing without leaving the Fairmont.' },
    ],
    notForLabel: 'Not for you right now if',
    notForItems: [
      'You have a known cardiovascular or respiratory condition without medical clearance for maximal-effort testing — speak to your clinician first.',
    ],
  },
  testimonials: getTestimonialsForService('vo2-max'),
  trustSafety: {
    id: 'trust-safety',
    eyebrow: 'CLINICAL AUTHORITY & RISK REVERSAL',
    headline: 'Interpreted for you, not emailed as a raw file.',
    body: "Delivered by AIWO's resident clinical team at the Longevity Lab, Fairmont Mumbai — registered, insured practitioners. Every test is screened first; the result is interpreted for you, not emailed as a raw file.",
    points: [
      { lead: 'Only after a clinician confirms it.', body: "You're never pushed past what's appropriate for your fitness level." },
      { lead: 'Free rescheduling', body: 'up to four hours ahead.' },
      { lead: 'No obligation', body: 'to take the follow-on.' },
    ],
  },
  pricing: {
    eyebrow: 'PRICING & OFFER',
    headline: 'VO2 Max Test — ₹7,999 · 60 min · The Longevity Lab.',
    body: 'A hospital cardiac stress test costs more and gives you none of this — no fitness age, no training zones, no plan. Recommended follow-on (optional): Longevity Training Protocol — 15 supervised sessions/month · ₹35,000. (INR, excl. GST.)',
    tiers: [
      {
        name: 'VO2 Max Test',
        price: '₹7,999',
        note: '60 min · The Longevity Lab',
        included: [
          'Screening',
          'The graded test',
          'Your VO2 Max',
          'Fitness age',
          'Personalised HR zones',
          'On-the-spot walkthrough',
          'WhatsApp report',
        ],
      },
    ],
    trustNotes: [],
    ctaLabel: 'Book VO2 Test',
    ctaSubline: '₹7,999 · 60 min',
  },
  faq: {
    items: [
      {
        question: 'My watch already gives VO2 Max.',
        answer: 'It estimates from your wrist; this measures directly and gives you the actual training zones a watch can’t.',
      },
      { question: "I'm not an athlete.", answer: 'Then it matters more — VO2 Max is a health marker first, and the test adapts to your level.' },
      { question: "It's too demanding.", answer: 'It builds to your maximum, no one else’s, and only after a clinician clears you.' },
      {
        question: "It's expensive.",
        answer: 'A hospital stress test costs more and gives you no zones or plan; this is ₹7,999 with results the same hour.',
      },
      {
        question: 'How is it different from my corporate health check?',
        answer: 'That measures you at rest; this measures you under effort, where fitness actually shows.',
      },
      { question: 'No time.', answer: '60 minutes, on-site at Fairmont, results on WhatsApp before you leave.' },
      { question: 'What if the number is bad?', answer: "Then it's the baseline you improve from — and your clinician gives you the plan." },
      { question: 'Is it safe for me?', answer: 'Screened first; adapted or deferred if not appropriate.' },
      { question: 'Data privacy?', answer: 'Handled under the DPDP Act 2023; your data is yours.' },
      { question: 'Will I know what to do with it?', answer: 'You leave with zones and a walkthrough, not a raw file.' },
    ],
    categoryByQuestion: {
      'My watch already gives VO2 Max.': 'About the service',
      'How is it different from my corporate health check?': 'About the service',
      "I'm not an athlete.": 'Safety / Eligibility',
      "It's too demanding.": 'Safety / Eligibility',
      'Is it safe for me?': 'Safety / Eligibility',
      "It's expensive.": 'Pricing / Booking',
      'No time.': 'Before your appointment',
      'What if the number is bad?': 'Results / Outcomes',
      'Will I know what to do with it?': 'Results / Outcomes',
      'Data privacy?': 'Privacy',
    },
  },
  bookingAccess: {
    eyebrow: 'BOOK',
    headline: 'Stop training to a guess.',
    body: 'The number is already inside you, waiting to be measured. Sixty minutes gets it out — and hands you the plan to move it. Slots are limited each day.',
    ctaLabel: 'Book VO2 Test',
    ctaSubline: '₹7,999 · 60 min',
    methods: [
      { label: 'Fairmont concierge', body: 'Ask the concierge desk to arrange your test.' },
      { label: 'Spa desk', body: 'Book directly through the Bluxone Spa desk.' },
      { label: 'In-room code', body: 'Use the in-room code provided in your suite to request a booking.' },
    ],
  },
  stickyCta: { label: 'VO2 Max Testing', price: '₹7,999', ctaLabel: 'Book Now', revealThreshold: 0.4 },
  footer: {
    tagline: 'Restore · Move · Perform · Longevity',
    trustItems: [
      { label: 'Clinical', value: 'Delivered by registered, insured clinical practitioners' },
      { label: 'Care', value: 'Every service begins with, or follows, a clinical assessment' },
    ],
    addressLines: ADDRESS,
    crossSell: [
      { label: 'See everything under one roof', href: '/' },
      { label: 'RMR Test', href: '/services/rmr' },
      { label: 'Posture & Longevity Assessment', href: '/services/posture-screening' },
      { label: 'AIWO EMS Sculpting', href: '/services/ems-sculpting' },
      { label: 'IV Therapy', href: '/services/iv-therapy' },
    ],
  },
  disclaimer:
    'The AIWO VO2 Max test supports the assessment of cardiorespiratory fitness and healthy ageing; not a substitute for emergency or specialist medical care. Data handled per DPDP Act 2023.',
}
