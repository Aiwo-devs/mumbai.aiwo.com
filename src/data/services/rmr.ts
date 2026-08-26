import type { ServiceData } from '../../types/service'
import { getTestimonialsForService } from '../testimonials'

const ADDRESS = [
  'AIWO Longevity Clinic',
  'Level 2, Fairmont Mumbai, T2 Terminal',
  'Chhatrapati Shivaji Maharaj International Airport Road',
  'Mumbai 400 099, Maharashtra, India',
]

export const rmr: ServiceData = {
  slug: 'rmr',
  name: 'RMR Test',
  navLinks: [
    { href: '#differentiators', label: 'The Test' },
    { href: '#process', label: 'How It Works' },
    { href: '#pricing', label: 'Pricing' },
    { href: '#faq', label: 'FAQs' },
  ],
  seo: {
    title: 'RMR / Metabolism Test Mumbai | Real Calorie Targets | AIWO Fairmont',
    description:
      'Measure your actual resting metabolism at AIWO, Fairmont Mumbai, and get calorie targets built for your body — not a formula. Book through concierge.',
    path: '/services/rmr',
    h1: 'Resting Metabolic Rate (RMR) Testing at Fairmont Mumbai',
  },
  hero: {
    eyebrow: 'THE LONGEVITY LAB · FAIRMONT MUMBAI',
    headline: 'Your diet is built on a number your body never agreed to.',
    emphasizeHeadline: '',
    headlineSoft: 'your body never agreed to',
    subhead:
      'AIWO measures your actual resting metabolism at Fairmont Mumbai — then builds your real calorie targets. No more eating to a formula.',
    emphasizeSubhead: '',
    ctaLabel: 'Book RMR Test',
    ctaHref: '#booking-access',
    ctaContextLine: 'Price confirmed at consultation',
    trustChips: [
      { label: 'Physician-supervised' },
      { label: 'Direct measurement, not a formula' },
      { label: 'A few minutes, no needles' },
      { label: 'Results same hour + WhatsApp' },
      { label: 'The Longevity Lab, Fairmont Mumbai' },
    ],
    image: { assetKey: 'rmr-hero', label: 'TEMP IMAGE — RMR BREATH TEST IN PROGRESS', aspect: '4 / 3', isPlaceholder: true },
  },
  silentProblem: {
    id: 'the-problem',
    eyebrow: 'THE SILENT PROBLEM',
    headline: "You're doing everything right. So why isn't it working?",
    body: "You count. You're consistent. You hit the target the app gave you — and the scale won't move, or your energy is on the floor, and you've started to wonder if something's wrong with you. Nothing's wrong with you. The number is wrong. That target came from a formula for \"the average person,\" and your metabolism isn't average — it's shaped by your muscle, hormones, training history and genetics. The gap can be a full meal a day. It's the quiet reason disciplined people stall.",
  },
  // Merges 4.2 "Introduce the Test" + 4.3 "Why This Is Different" — the two
  // measured outputs (previously a single dense sentence) now read as a point
  // list; the "app estimates, this measures" positioning becomes the intro.
  differentiation: {
    id: 'differentiators',
    eyebrow: 'INTRODUCE THE TEST',
    headline: 'Measured, not assumed.',
    body: 'Your app runs a formula. This reads your actual physiology — the difference between a guess that can be a meal off and a number that’s genuinely yours, delivered clinically inside Fairmont Mumbai. Every calorie your body burns needs oxygen, in a fixed ratio — so AIWO measures the oxygen and reads the calories directly, in a few quiet minutes.',
    points: [
      { lead: 'Your resting metabolic rate', body: 'the exact calories your body burns at rest.' },
      { lead: 'Your daily calorie targets', body: 'maintenance and management targets built from your measured rate, not a formula.' },
    ],
  },
  process: {
    eyebrow: 'HOW IT WORKS',
    headline: 'From booking to your calorie targets.',
    steps: [
      { id: 'STEP 01', title: 'Book', body: 'Through concierge or the spa desk.' },
      { id: 'STEP 02', title: 'Short prep', body: 'A brief fast, no caffeine — confirmed at booking.' },
      { id: 'STEP 03', title: 'Recline', body: 'Breathe quietly a few minutes.' },
      { id: 'STEP 04', title: 'Your number', body: 'Your number + targets, explained.' },
      { id: 'STEP 05', title: 'Sent to WhatsApp', body: 'Your results, kept for reference.' },
    ],
  },
  experience: {
    id: 'experience',
    eyebrow: 'THE EXPERIENCE',
    headline: 'Your number — and the moment the guessing ends.',
    body: "You breathe. The screen fills in. There it is: the exact calories your body burns at rest, and your maintenance and management targets built from it — not a formula, yours. Most people's first reaction is relief: that's why. And your clinician turns the number into a next step you can actually follow.",
    ctaLabel: 'Book RMR Test',
    image: { assetKey: 'rmr-experience', label: 'TEMP IMAGE — CLINICIAN REVIEWING METABOLIC DATA', aspect: '16 / 9', isPlaceholder: true },
  },
  suitability: {
    eyebrow: 'WHO THIS IS FOR',
    headline: 'Is RMR right for you?',
    forLabel: 'Who this is for',
    forItems: [
      { lead: "You've plateaued", body: 'and want to know why.' },
      { lead: 'You train', body: 'and want fuelling matched to your real metabolism.' },
      { lead: "You're 40+", body: 'and want an objective read on how you burn.' },
      { lead: 'You optimise', body: 'and want your true baseline.' },
    ],
    notForLabel: 'Not for you right now if',
    notForItems: [
      'You are pregnant or have a condition that makes breath-based testing inadvisable — speak to your clinician first.',
    ],
  },
  testimonials: getTestimonialsForService('rmr'),
  trustSafety: {
    id: 'trust-safety',
    eyebrow: 'CLINICAL AUTHORITY & RISK REVERSAL',
    headline: 'A plan, not a raw file.',
    body: "Delivered and interpreted by AIWO's resident clinical team at Fairmont Mumbai — registered, insured practitioners. You get a plan, not a raw file.",
    points: [
      { lead: 'Reviewed with a clinician first.', body: 'The test is simple and non-invasive.' },
      { lead: 'Free rescheduling', body: 'up to four hours ahead.' },
      { lead: 'No obligation', body: 'to take the next step.' },
    ],
  },
  pricing: {
    eyebrow: 'PRICING & OFFER',
    headline: 'RMR test — price confirmed at consultation.',
    body: 'Every meal, every plan, every target you set this year rests on one number. Measure it once and everything downstream is built on fact instead of a formula. Your price is confirmed at consultation, where a clinician also reviews your goals. (INR, excl. GST; indicative and subject to clinical consultation.)',
    tiers: [
      {
        name: 'RMR test',
        price: 'At consultation',
        note: 'Includes the test, your number, your targets, walkthrough + WhatsApp report',
      },
    ],
    trustNotes: [],
    ctaLabel: 'Book RMR Test',
    ctaSubline: 'Price confirmed at consultation',
  },
  faq: {
    items: [
      { question: 'My app already gives calories.', answer: 'A formula off by up to a meal a day; this measures your actual burn.' },
      { question: 'Does it hurt?', answer: 'No needles, no effort — you breathe quietly for a few minutes.' },
      { question: 'Will it take long?', answer: 'The measurement is short; allow a little longer for setup and results.' },
      { question: 'Do I need to prep?', answer: 'Best after a short fast, no caffeine or hard exercise; confirmed at booking.' },
      { question: 'Is my metabolism really the problem?', answer: 'Measure it and know, instead of guessing.' },
      { question: 'Too expensive?', answer: 'One measurement corrects a year of decisions; price confirmed at consultation.' },
      { question: "What if the number's discouraging?", answer: "It's the baseline you build from — with a clinician's plan." },
      { question: 'Data privacy?', answer: 'Handled under the DPDP Act 2023.' },
      { question: 'Is it safe for me?', answer: 'Reviewed first; adapted or deferred if not appropriate (e.g., pregnancy).' },
      { question: 'What do I actually get?', answer: 'Your number, your targets, and a plan — not a raw file.' },
    ],
    categoryByQuestion: {
      'My app already gives calories.': 'About the service',
      'What do I actually get?': 'About the service',
      'Does it hurt?': 'Before your appointment',
      'Will it take long?': 'Before your appointment',
      'Do I need to prep?': 'Before your appointment',
      'Is my metabolism really the problem?': 'Results / Outcomes',
      "What if the number's discouraging?": 'Results / Outcomes',
      'Too expensive?': 'Pricing / Booking',
      'Data privacy?': 'Privacy',
      'Is it safe for me?': 'Safety / Eligibility',
    },
  },
  bookingAccess: {
    eyebrow: 'BOOK',
    headline: 'Stop feeding a formula. Feed your body.',
    body: "One short test replaces a number you were never meant to trust with one that's actually yours.",
    ctaLabel: 'Book RMR Test',
    ctaSubline: 'Price confirmed at consultation',
    methods: [
      { label: 'Fairmont concierge', body: 'Ask the concierge desk to arrange your test.' },
      { label: 'Spa desk', body: 'Book directly through the Bluxone Spa desk.' },
      { label: 'In-room code', body: 'Use the in-room code provided in your suite to request a booking.' },
    ],
  },
  stickyCta: { label: 'RMR Test', price: 'At consultation', ctaLabel: 'Book Now', revealThreshold: 0.4 },
  footer: {
    tagline: 'Restore · Move · Perform · Longevity',
    trustItems: [
      { label: 'Clinical', value: 'Delivered by registered, insured clinical practitioners' },
      { label: 'Care', value: 'Every service begins with, or follows, a clinical assessment' },
    ],
    addressLines: ADDRESS,
    crossSell: [
      { label: 'See everything under one roof', href: '/' },
      { label: 'VO2 Max Testing', href: '/services/vo2-max' },
      { label: 'Posture & Longevity Assessment', href: '/services/posture-screening' },
      { label: 'IV Therapy', href: '/services/iv-therapy' },
      { label: 'AIWO EMS Sculpting', href: '/services/ems-sculpting' },
    ],
  },
  disclaimer:
    'The AIWO RMR test supports the assessment of metabolism and healthy ageing; not a substitute for emergency or specialist medical care. Data handled per DPDP Act 2023. RMR pricing/venue is not in the Fairmont Mumbai catalogue and remains pending confirmation — shown here as price confirmed at consultation, not invented.',
}
