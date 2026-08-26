import type { ServiceData } from '../../types/service'
import { getTestimonialsForService } from '../testimonials'

const ADDRESS = [
  'AIWO Longevity Clinic',
  'Level 2, Fairmont Mumbai, T2 Terminal',
  'Chhatrapati Shivaji Maharaj International Airport Road',
  'Mumbai 400 099, Maharashtra, India',
]

export const postureScreening: ServiceData = {
  slug: 'posture-screening',
  name: 'Posture Screening',
  navLinks: [
    { href: '#differentiators', label: 'What Free Includes' },
    { href: '#process', label: 'How It Works' },
    { href: '#pricing', label: 'Pricing' },
    { href: '#faq', label: 'FAQs' },
  ],
  seo: {
    title: 'Free Posture & Longevity Assessment Mumbai | AIWO Fairmont',
    description:
      'Claim a complimentary Posture & Longevity Assessment at AIWO, Fairmont Mumbai — posture, grip strength, gait and biological age, with an instant report. Book through concierge.',
    path: '/services/posture-screening',
    h1: 'Posture & Longevity Assessment at Fairmont Mumbai',
  },
  hero: {
    eyebrow: 'THE GIFT & THE CLINIC · FAIRMONT MUMBAI',
    headline: 'Find out what a desk, a phone, and a decade of sitting did to your body — free.',
    emphasizeHeadline: '',
    headlineSoft: '— free',
    subhead:
      'In 20 minutes we map your posture, test your strength, analyse your gait and estimate your biological age. Instant report. No charge, no obligation.',
    emphasizeSubhead: '',
    ctaLabel: 'Claim Assessment',
    ctaHref: '#booking-access',
    ctaContextLine: 'Complimentary · 20–25 min',
    trustChips: [
      { label: 'Complimentary' },
      { label: 'Four measured reads' },
      { label: 'Instant visual report + WhatsApp' },
      { label: 'One honest recommendation, never a list' },
      { label: 'Fairmont Mumbai' },
    ],
    image: { assetKey: 'posture-hero', label: 'TEMP IMAGE — POSTURE ASSESSMENT IN PROGRESS', aspect: '4 / 3', isPlaceholder: true },
  },
  silentProblem: {
    id: 'the-problem',
    eyebrow: 'THE SILENT PROBLEM',
    headline: "You feel it. You've just never seen it.",
    body: "The stiff neck some mornings. Shoulders that ache by mid-afternoon. A back that tightens by Friday. You blamed the pillow, the chair, a hard week — stretched, bought the ergonomic everything, and it helped for four days. None of that is the cause. The cause is upstream: small shifts your spine, shoulders and hips made, silently, for years, to absorb how you live. Some protect you; some quietly cost you strength, energy and comfort. From the inside, you can't tell which.",
  },
  // Merges 4.2 "What Free Includes" + 4.3 "Why This Is Different" into one
  // section — the four objective reads (previously buried inside a paragraph)
  // now read as an actual point list; the differentiation prose becomes the intro.
  differentiation: {
    id: 'differentiators',
    eyebrow: 'WHAT FREE INCLUDES',
    headline: 'Four objective reads. One honest recommendation.',
    body: "Posture \"feedback\" is usually one person's eye for a few seconds. This is four objective reads captured on tools, plus a clinician's read — and it's free. That's the difference between an opinion and a measurement. It ends with an instant visual report, on the spot and on WhatsApp — and where something's worth improving, your physiotherapist recommends exactly one next step, never a list.",
    points: [
      { lead: 'Digital posture mapping', body: 'how your spine, shoulders and pelvis are truly aligned.' },
      { lead: 'Grip-strength (dynamometry)', body: 'a validated marker of strength and healthy ageing.' },
      { lead: 'Video gait analysis', body: 'how you move and compensate.' },
      { lead: 'Biological-age assessment', body: 'an objective read on how your body is ageing.' },
    ],
  },
  process: {
    eyebrow: 'HOW IT WORKS',
    headline: 'From claiming it to your one next step.',
    steps: [
      { id: 'STEP 01', title: 'Claim it', body: 'Through concierge or the spa desk.' },
      { id: 'STEP 02', title: 'Arrive', body: 'In-room or Bluxone Spa — fully clothed, no prep.' },
      { id: 'STEP 03', title: 'Four reads', body: '20–25 minutes.' },
      { id: 'STEP 04', title: 'Instant report', body: 'On the spot + WhatsApp.' },
      { id: 'STEP 05', title: 'One recommendation', body: 'Yours to act on, or not.' },
    ],
  },
  experience: {
    id: 'experience',
    eyebrow: 'THE EXPERIENCE',
    headline: 'The moment you see it.',
    body: 'The posture grid lights up with your alignment. Your grip strength, on the scale. Your gait, on video. Your biological age, on screen. Most people say the same thing: I had no idea. That clarity is the gift — and it comes with one honest step, even if that step is "you\'re fine, do nothing."',
    ctaLabel: 'Claim Assessment',
    image: { assetKey: 'posture-experience', label: 'TEMP IMAGE — INSTANT VISUAL REPORT ON SCREEN', aspect: '16 / 9', isPlaceholder: true },
  },
  suitability: {
    eyebrow: 'WHO THIS IS FOR',
    headline: 'Is this the right first step for you?',
    forLabel: 'Who this is for',
    forItems: [
      { lead: 'Desk-bound professionals', body: 'with recurring neck, shoulder or back tension.' },
      { lead: 'Frequent flyers', body: 'whose bodies take the toll of travel.' },
      { lead: '45+ / parents', body: 'who want an objective read on mobility and biological age.' },
      { lead: 'Gym-goers', body: 'chasing an unseen imbalance.' },
      { lead: 'Optimisers', body: 'who want to measure biological age.' },
    ],
  },
  testimonials: getTestimonialsForService('posture-screening'),
  trustSafety: {
    id: 'trust-safety',
    eyebrow: 'CLINICAL AUTHORITY & RISK REVERSAL',
    headline: 'Free. No obligation. Delivered by the resident clinical team.',
    body: "Delivered by AIWO's resident clinical team at Fairmont Mumbai — registered, insured practitioners — in your room or the Bluxone spa room.",
    points: [
      { lead: "It's free, with Fairmont's compliments.", body: 'No charge, no obligation, and one recommendation rather than a sell.' },
      { lead: 'Free rescheduling', body: 'up to four hours ahead.' },
      { lead: 'Photo consent', body: 'photographs are handled with consent, under the DPDP Act 2023.' },
    ],
  },
  pricing: {
    eyebrow: 'THE NEXT STEP & PRICING',
    headline: 'Where the assessment leads.',
    body: "You get a full, measured picture and one clear step, with Fairmont's compliments — the only thing it costs is the twenty minutes you'd otherwise spend wondering. Your clinician recommends one path, not both. (INR, excl. GST.)",
    tiers: [
      {
        name: 'Posture Screening & Correction',
        price: '₹4,999',
        note: '20 min · digital assessment, myofascial release, corrective exercise',
      },
      { name: 'Egoscue Tower Posture Therapy', price: '₹4,999', note: '30 min' },
    ],
    trustNotes: [],
    ctaLabel: 'Claim Assessment',
    ctaSubline: 'Complimentary · 20–25 min',
  },
  faq: {
    items: [
      { question: 'Is the assessment really free?', answer: "Yes — complimentary, with Fairmont's compliments. No charge, no obligation." },
      { question: "What's the catch?", answer: "None. One honest recommendation — including 'do nothing.'" },
      { question: 'Will I be upsold a long list of treatments?', answer: 'Never a list — exactly one next step, if any.' },
      { question: 'Does it hurt / take long?', answer: 'Neither. 20–25 min, fully clothed, no needles.' },
      { question: "I don't have a posture problem.", answer: "About a third of people don't — and leave with a documented baseline." },
      { question: 'Is it just photos?', answer: "Four measured reads plus a clinician's interpretation." },
      { question: 'Can my teen/parent come?', answer: 'Yes — with an adult present for minors.' },
      { question: 'What if it finds something?', answer: 'You get one clear step: Posture Correction (₹4,999).' },
      {
        question: 'Data/photo privacy?',
        answer: 'Consent-based, handled under the DPDP Act 2023; not used for marketing without separate consent.',
      },
      { question: 'Where does it happen?', answer: 'In your room or the Bluxone spa room, inside Fairmont Mumbai.' },
    ],
    categoryByQuestion: {
      "What's the catch?": 'About the service',
      'Will I be upsold a long list of treatments?': 'About the service',
      'Is it just photos?': 'About the service',
      'Is the assessment really free?': 'Pricing / Booking',
      'What if it finds something?': 'Pricing / Booking',
      'Does it hurt / take long?': 'Before your appointment',
      'Where does it happen?': 'Before your appointment',
      "I don't have a posture problem.": 'Results / Outcomes',
      'Can my teen/parent come?': 'Safety / Eligibility',
      'Data/photo privacy?': 'Privacy',
    },
  },
  bookingAccess: {
    eyebrow: 'BOOK',
    headline: 'The easiest yes for your body this year.',
    body: 'Twenty minutes, zero cost, a clear picture of what sitting has quietly done — and one honest step to put it right.',
    ctaLabel: 'Claim Assessment',
    ctaSubline: 'Complimentary · 20–25 min',
    methods: [
      { label: 'Fairmont concierge', body: 'Ask the concierge desk to arrange your assessment.' },
      { label: 'Spa desk', body: 'Book directly through the Bluxone Spa desk.' },
      { label: 'In-room code', body: 'Use the in-room code provided in your suite to request a booking.' },
    ],
  },
  stickyCta: { label: 'Posture Screening', price: 'Complimentary', ctaLabel: 'Book Now', revealThreshold: 0.3 },
  footer: {
    tagline: 'Restore · Move · Perform · Longevity',
    trustItems: [
      { label: 'Clinical', value: 'Delivered by registered, insured clinical practitioners' },
      { label: 'Care', value: 'Every service begins with, or follows, a clinical assessment' },
    ],
    addressLines: ADDRESS,
    crossSell: [
      { label: 'See everything under one roof', href: '/' },
      { label: 'IV Therapy', href: '/services/iv-therapy' },
      { label: 'VO2 Max Testing', href: '/services/vo2-max' },
      { label: 'RMR Test', href: '/services/rmr' },
      { label: 'AIWO EMS Sculpting', href: '/services/ems-sculpting' },
    ],
  },
  disclaimer:
    'These services support recovery and wellbeing; not a substitute for emergency or specialist medical care. Photographs and data handled with consent, per DPDP Act 2023.',
}
