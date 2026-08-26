import type { ServiceData } from '../../types/service'
import { getTestimonialsForService } from '../testimonials'

const ADDRESS = [
  'AIWO Longevity Clinic',
  'Level 2, Fairmont Mumbai, T2 Terminal',
  'Chhatrapati Shivaji Maharaj International Airport Road',
  'Mumbai 400 099, Maharashtra, India',
]

export const emsSculpting: ServiceData = {
  slug: 'ems-sculpting',
  name: 'AIWO EMS Sculpting',
  navLinks: [
    { href: '#differentiators', label: 'How It Works' },
    { href: '#process', label: 'The Steps' },
    { href: '#pricing', label: 'Pricing' },
    { href: '#faq', label: 'FAQs' },
  ],
  seo: {
    title: 'EMS Sculpting Mumbai | 20-Min Whole-Body Workout | AIWO Fairmont',
    description:
      'AIWO EMS Sculpting at Fairmont Mumbai — a supervised whole-body EMS session, 20 minutes, ₹3,500. Strength, sculpted on a schedule. Book through concierge.',
    path: '/services/ems-sculpting',
    h1: 'AIWO EMS Sculpting at Fairmont Mumbai',
  },
  hero: {
    eyebrow: 'THE HOUSE SIGNATURES · FAIRMONT MUMBAI',
    headline: '20 minutes. The work of hours in the gym.',
    emphasizeHeadline: '',
    headlineSoft: 'The work of hours in the gym',
    subhead:
      'A supervised whole-body EMS suit session at Fairmont Mumbai — a concentrated strength-and-sculpting workout, in and out in twenty minutes.',
    emphasizeSubhead: '',
    ctaLabel: 'Book Session',
    ctaHref: '#booking-access',
    ctaContextLine: '₹3,500 · 20 min',
    trustChips: [
      { label: 'Supervised by the resident clinical team' },
      { label: 'Whole-body activation' },
      { label: '20 minutes' },
      { label: 'Bluxone Spa/Gym' },
      { label: 'A Fairmont Mumbai House Signature' },
    ],
    image: { assetKey: 'sculpt-hero', label: 'TEMP IMAGE — EMS SUIT SESSION', aspect: '4 / 3', isPlaceholder: true },
  },
  silentProblem: {
    id: 'the-problem',
    eyebrow: 'THE SILENT PROBLEM',
    headline: "The problem isn't discipline. It's time.",
    body: "You know what to do. You just don't have ninety free minutes, five days a week — not with the travel, the meetings, the life. So training becomes the thing you keep meaning to restart, and the strength you built quietly slips. Here's what most people never learn: voluntary exercise only recruits so much muscle, and only when you can give it the hours. There's a faster route to a real strength stimulus.",
  },
  // Merges 4.2 "How 20 Minutes Does the Work" + 4.3 "Why This Is Different".
  differentiation: {
    id: 'differentiators',
    eyebrow: 'HOW 20 MINUTES DOES THE WORK',
    headline: 'Whole-body muscle, activated at once.',
    body: "You can't out-hour a busy life. You can out-recruit it. You wear a whole-body electro-muscle-stimulation suit while a clinician guides the session. Twenty supervised minutes delivers a concentrated strength-and-sculpting stimulus. Strength, sculpted on a schedule.",
    points: [
      {
        lead: 'Whole-body recruitment.',
        body: 'The suit activates muscle across your entire body simultaneously — far more, far faster, than you can activate on your own.',
      },
      {
        lead: 'An AIWO signature.',
        body: 'Found nowhere else on the property, delivered by the resident clinical team.',
      },
    ],
  },
  process: {
    eyebrow: 'HOW IT WORKS',
    headline: 'From booking to back to your day.',
    steps: [
      { id: 'STEP 01', title: 'Book', body: 'Through concierge or the spa desk.' },
      { id: 'STEP 02', title: 'Suitability check', body: 'A quick check before your session.' },
      { id: 'STEP 03', title: 'Suit up', body: 'A clinician sets intensity to you.' },
      { id: 'STEP 04', title: '20 minutes', body: 'Supervised throughout.' },
      { id: 'STEP 05', title: 'Back to your day', body: 'No downtime.' },
    ],
  },
  experience: {
    id: 'experience',
    eyebrow: 'THE EXPERIENCE',
    headline: "Twenty minutes you'll actually feel.",
    body: 'You suit up. The clinician sets the intensity to you and starts. You feel strong, rhythmic, whole-body contractions — intense, controlled, never a strain you fight alone. Twenty minutes later you’re done, changed, and back to your day: no hour lost, no recovery day gone.',
    ctaLabel: 'Book Session',
    image: { assetKey: 'sculpt-experience', label: 'TEMP IMAGE — SUPERVISED EMS SESSION, CLINICIAN ADJUSTING INTENSITY', aspect: '16 / 9', isPlaceholder: true },
  },
  suitability: {
    eyebrow: 'WHO THIS IS FOR',
    headline: 'Is EMS Sculpting right for you?',
    forLabel: 'Who this is for',
    forItems: [
      { lead: 'Time-poor professionals', body: 'who want a real stimulus in twenty minutes.' },
      { lead: 'Plateaued gym-goers', body: 'wanting more recruitment.' },
      { lead: 'Returning exercisers', body: 'rebuilding strength efficiently.' },
      { lead: 'Travellers', body: 'who want an on-site workout.' },
    ],
    notForLabel: 'Not for you right now if',
    notForItems: [
      'You have a pacemaker/implanted electronic device, or are pregnant — a clinician will advise an alternative.',
    ],
  },
  testimonials: getTestimonialsForService('ems-sculpting'),
  trustSafety: {
    id: 'trust-safety',
    eyebrow: 'CLINICAL AUTHORITY & RISK REVERSAL',
    headline: 'Supervised, not self-service.',
    body: "Every session is supervised by AIWO's resident clinical team at Fairmont Mumbai — registered, insured practitioners. Not a self-service machine.",
    points: [
      { lead: 'Confirmed appropriate before you begin.', body: 'A clinician sets intensity to your comfort.' },
      { lead: 'Free rescheduling', body: 'up to four hours ahead.' },
    ],
  },
  pricing: {
    eyebrow: 'PRICING & OFFER',
    headline: 'AIWO EMS Sculpting — ₹3,500 · 20 min · Bluxone Spa/Gym.',
    body: 'Hours in the gym you don’t have; a stack of sessions at a fraction of the time cost. Best on a schedule; your clinician recommends a cadence. Pairs with AIWO diagnostics and the Longevity Training Protocol for strength you can then measure. (INR, excl. GST.)',
    tiers: [{ name: 'AIWO EMS Sculpting', price: '₹3,500', note: '20 min · Bluxone Spa / Gym' }],
    trustNotes: [],
    ctaLabel: 'Book Session',
    ctaSubline: '₹3,500 · 20 min',
  },
  faq: {
    items: [
      { question: 'Equal to hours in the gym — really?', answer: 'That’s the catalogue’s positioning: EMS recruits whole-body muscle at once, so 20 supervised minutes concentrate the stimulus.' },
      { question: 'Does it hurt?', answer: 'Strong, rhythmic contractions — intense but controlled and set to you.' },
      { question: 'How often?', answer: 'It works best on a schedule; your clinician recommends a cadence.' },
      { question: "Who can't do it?", answer: 'Pacemaker/implant or pregnancy — a clinician confirms suitability first.' },
      { question: 'Is it a gimmick?', answer: "It's a supervised clinical session, not a self-service machine." },
      { question: 'Do I need to prep?', answer: 'No special prep; come ready to move.' },
      { question: 'Will it replace the gym?', answer: "It's an efficient stimulus that fits when the gym can't; pair it with training." },
      { question: 'Too expensive?', answer: '₹3,500 for a whole-body session that fits the busiest day — a fraction of the time cost of the gym hours it stands in for.' },
      { question: 'Data privacy?', answer: 'Handled under the DPDP Act 2023.' },
      { question: 'Where?', answer: 'Bluxone Spa/Gym, inside Fairmont Mumbai.' },
    ],
    categoryByQuestion: {
      'Equal to hours in the gym — really?': 'About the service',
      'Is it a gimmick?': 'About the service',
      'Will it replace the gym?': 'About the service',
      'Does it hurt?': 'Before your appointment',
      'Do I need to prep?': 'Before your appointment',
      'Where?': 'Before your appointment',
      "Who can't do it?": 'Safety / Eligibility',
      'How often?': 'Results / Outcomes',
      'Too expensive?': 'Pricing / Booking',
      'Data privacy?': 'Privacy',
    },
  },
  bookingAccess: {
    eyebrow: 'BOOK',
    headline: "The workout for people who don't have time to work out.",
    body: 'Twenty minutes. Whole-body. Supervised. Done. Build the strength you keep meaning to — on a schedule that fits your life.',
    ctaLabel: 'Book Session',
    ctaSubline: '₹3,500 · 20 min',
    methods: [
      { label: 'Fairmont concierge', body: 'Ask the concierge desk to arrange your session.' },
      { label: 'Spa desk', body: 'Book directly through the Bluxone Spa desk.' },
      { label: 'In-room code', body: 'Use the in-room code provided in your suite to request a booking.' },
    ],
  },
  stickyCta: { label: 'AIWO EMS Sculpting', price: '₹3,500', ctaLabel: 'Book Now', revealThreshold: 0.4 },
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
      { label: 'RMR Test', href: '/services/rmr' },
      { label: 'IV Therapy', href: '/services/iv-therapy' },
    ],
  },
  disclaimer:
    'This service supports recovery, strength and wellbeing; not a substitute for emergency or specialist medical care. Data handled per DPDP Act 2023. Package/cadence pricing is not yet supplied and is not shown — only the verified single-session price above.',
}
