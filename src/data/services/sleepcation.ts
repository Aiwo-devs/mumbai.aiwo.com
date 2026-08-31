import type { ServiceData } from '../../types/service'
import { getTestimonialsForService } from '../testimonials'

const ADDRESS = [
  'AIWO Longevity Clinic',
  'Level 2, Fairmont Mumbai, T2 Terminal',
  'Chhatrapati Shivaji Maharaj International Airport Road',
  'Mumbai 400 099, Maharashtra, India',
]

export const sleepcation: ServiceData = {
  slug: 'sleepcation',
  name: 'Sleepcation',
  navLinks: [
    { href: '#why-it-matters', label: 'Why It Matters' },
    { href: '#the-method', label: 'The Method' },
    { href: '#process', label: 'Your Two Nights' },
    { href: '#faq', label: 'FAQs' },
  ],
  seo: {
    title: 'AIWO Sleepcation, Fairmont Mumbai | Measure Your Sleep, Then Improve It',
    description: 'A two-night clinical sleep programme at Fairmont Mumbai. AIWO measures how you actually sleep in your own room, adjusts, and measures again — so you leave with a documented comparison and a thirty-day plan.',
    path: '/services/sleepcation',
    h1: 'AIWO Sleepcation · Fairmont Mumbai',
  },
  hero: {
    eyebrow: 'AIWO SLEEPCATION · FAIRMONT MUMBAI',
    headline: 'Know how you sleep.',
    headlineSoft: 'Then improve it — measured, not guessed.',
    subhead: 'A two-night clinical sleep programme at Fairmont Mumbai — so your rest becomes something you can see.',
    emphasizeHeadline: '',
    emphasizeSubhead: '',
    ctaLabel: 'Book the Offer',
    ctaHref: '#booking-access',
    ctaContextLine: 'From ₹1,49,000++ · Two nights · three days · one guest',
    trustChips: [
      { label: 'Clinical sleep study in your own room' },
      { label: 'AIWO 100+ blood panel' },
      { label: 'Physician-led same-stay review' },
      { label: 'A documented two-night comparison' }
    ],
    image: { assetKey: 'sleepcation-hero', label: 'TEMP IMAGE — GUEST ROOM AT FAIRMONT MUMBAI', aspect: '4 / 5', isPlaceholder: true },
  },
  silentProblem: {
    id: 'why-it-matters',
    eyebrow: 'WHY IT MATTERS',
    headline: 'You measure everything that matters. Sleep isn\'t one of them — yet.',
    body: 'A third of your life is spent asleep. It is when your body repairs, your memory settles and your metabolism resets. Yet it is the one system most people never actually measure. A wearable estimates it from your wrist. An annual check-up ignores it entirely. Every night that goes unmeasured is another night you can\'t improve.',
  },
  mechanism: {
    id: 'the-method',
    eyebrow: 'THE METHOD',
    headline: 'Measured. Adjusted. Measured again.',
    body: 'Most sleep advice starts with a change and hopes it worked. AIWO starts with a measurement — a clinical study in your own room, not a lab — then adjusts, then measures again. The second night is what turns a test into proof.',
  },
  differentiation: {
    id: 'what-you-leave-with',
    eyebrow: 'WHAT YOU LEAVE WITH',
    headline: 'You arrive guessing. You leave with the record.',
    body: 'This is the point of the two nights: not a spa memory, but a document. You stop optimising around a guess and start from a number that is actually yours.',
    points: [
      { lead: 'A measured picture', body: 'of how you actually sleep — duration, efficiency, stages, breathing and oxygen.' },
      { lead: 'The difference your adjustments made,', body: 'seen side by side — not assumed.' },
      { lead: 'Your sleep read against a 100+ marker blood panel,', body: 'body composition and breathing — by a physician, in one place.' },
      { lead: 'A sleep system fitted to you', body: '— pillows made to your own measurements — that travels home with you.' },
      { lead: 'A thirty-day plan', body: 'built around what your studies showed, with the AIWO team alongside you for the month.' },
    ],
  },
  process: {
    eyebrow: 'YOUR TWO NIGHTS',
    headline: 'The clinical part is ours. The rest is a stay.',
    steps: [
      { id: 'DAY 01', title: 'Day One — arrive and be measured', body: 'Airport transfer, check-in to a quiet room prepared for the night, and a welcome briefing with your AIWO clinician. Dinner is served at Fi\'lia, the Italian restaurant, from the sleep-supportive menu. Your baseline study begins at lights out.' },
      { id: 'DAY 02', title: 'Day Two — understand and adjust', body: 'Breakfast at The Merchants, then your DEXA and breathing assessments at Arthi Scans. Your physician consultation follows, drawing together your sleep study, your blood results and the morning\'s assessments. The afternoon brings your pillow fitting, posture assessment, and spa treatments. Dinner returns to The Merchants before your second study begins that evening.' },
      { id: 'DAY 03', title: 'Day Three — leave with the record', body: 'Breakfast at The Merchants, your second spa treatment, and a summary of what the two nights showed. Your take-home sleep system travels with you, and your airport transfer is waiting.' },
    ],
  },
  experience: {
    id: 'experience',
    eyebrow: 'WHAT\'S INCLUDED',
    headline: 'One programme. Nothing assembled piecemeal.',
    body: 'Every diagnostic, therapy and detail below is part of the single programme rate — coordinated by one clinical team, not booked across a dozen desks. This includes AIWO 100+ blood tests, two nights in a designated quiet room, DEXA scans, cryotherapy, two spa treatments per guest, all meals from a sleep-supportive menu, fitted AIWO pillows, airport transfers, and more.',
    ctaLabel: 'Book the Offer',
    image: { assetKey: 'sleepcation-study', label: 'TEMP IMAGE — AIWO SLEEP TECHNICIAN PREPARING GUEST', aspect: '16 / 9', isPlaceholder: true },
  },
  suitability: {
    eyebrow: 'WHO THIS IS FOR',
    headline: 'For people who\'d rather know.',
    forLabel: 'Who this is for',
    forItems: [
      { lead: 'You optimise everything else.', body: 'Your diet, your training and your work are measured and managed. Sleep is the last black box — and the one with the most leverage.' },
      { lead: 'You wake tired without knowing why.', body: 'You want a reason, not another supplement. A measurement tells you what a feeling can\'t.' },
      { lead: 'You travel and perform on demand.', body: 'Recovery you can rely on, rather than hope for — read once, so the next months are built on fact.' },
      { lead: 'You\'re in it for the long game.', body: 'You treat healthspan as something to invest in, with data — and you\'d rather see the number than assume it.' },
    ],
    notForLabel: 'And who it isn\'t',
    notForItems: ["AIWO Sleepcation is a clinical assessment, not a treatment. If you already have a diagnosed sleep condition, the programme can still measure and inform — but it does not replace the care you are receiving. Please mention it at screening."],
  },
  testimonials: getTestimonialsForService('sleepcation'),
  trustSafety: {
    id: 'before-you-book',
    eyebrow: 'BEFORE YOU BOOK',
    headline: 'A short screening comes first.',
    body: 'Every guest completes a short medical screening with AIWO before the booking is confirmed. It takes a few minutes and establishes whether the programme is appropriate for you.',
    points: [
      { lead: 'Medical screening.', body: 'Certain conditions, medications and circumstances make parts of the programme unsuitable. Where the programme is not appropriate, your booking is released without charge.' },
      { lead: 'Your AIWO 100+ blood test.', body: 'Once screening is complete, AIWO arranges your AIWO 100+ blood test, taken before you travel so that your results are available to your physician during your stay.' },
      { lead: 'Not a substitute for emergency care.', body: 'AIWO Sleepcation is a clinical assessment and wellness programme. Where the assessment identifies something that needs attention, AIWO will refer you to appropriate care.' },
    ],
  },
  pricing: {
    eyebrow: 'RATES',
    headline: 'One programme. Two ways to stay.',
    body: 'Rates are per programme and exclusive of applicable taxes, which are shown in full before any payment is taken.',
    tiers: [
      { name: 'Single occupancy (One guest, one room, two nights)', price: '₹1,49,000++' },
      { name: 'Double occupancy (Two guests sharing one room)', price: '₹2,25,000++' }
    ],
    trustNotes: [],
    ctaLabel: 'Book the Offer',
    ctaSubline: 'From ₹1,49,000++',
  },
  faq: {
    items: [
      { question: "My smartwatch already tracks my sleep — why measure it clinically?", answer: "A wrist wearable estimates sleep from movement and heart rate — a nightly guess, refined but never confirmed. A clinical study measures it directly: brain activity, breathing, oxygen and sleep stages, in your own bed, across two nights, read by a physician. One is an approximation; the other is a measurement you can act on." },
      { question: "I feel fine — is this really for me?", answer: "Feeling fine is a good baseline to record, not a reason to skip measuring. The point is not to find something wrong; it is to see how you actually sleep, keep what's working, and improve what isn't — with a number rather than an impression." },
      { question: "Is the sleep study conducted in a laboratory?", answer: "No. It takes place in your own room at Fairmont Mumbai, which is the point — you are measured where you are actually sleeping." },
      { question: "Will I be wired up all night?", answer: "Sensors are applied by an AIWO technician before lights out. Most guests report sleeping normally after the first hour, and everything is removed in the morning." },
      { question: "Will anyone be in my room overnight?", answer: "No. Setup takes around 45 minutes before lights out, and the room is yours after that. A strict do-not-disturb protocol is in place until morning." },
      { question: "Why two nights of testing?", answer: "One measurement tells you where you are. Two tell you whether anything changed. The second night is what makes AIWO Sleepcation a programme rather than a test." },
      { question: "Should I prepare in any way?", answer: "Two things happen before you travel: your medical screening and your AIWO 100+ blood test, both arranged by AIWO. Beyond that, keep to your ordinary routine. The first night is intended to record how you genuinely sleep, so there is nothing to improve upon in advance." },
      { question: "Do I need to leave the hotel?", answer: "Once, for approximately 90 minutes on Day Two, for your DEXA and breathing assessments at Arthi Scans, AIWO's imaging partner. Transfers are arranged and a coordinator accompanies you throughout." },
      { question: "Is the programme suitable if I already have a sleep apnoea diagnosis?", answer: "Please mention it at screening. The programme may still be appropriate as an assessment, but it is not a treatment and does not replace the care you are already receiving." },
    ],
    categoryByQuestion: {
      "My smartwatch already tracks my sleep — why measure it clinically?": 'About the service',
      "I feel fine — is this really for me?": 'About the service',
      "Is the sleep study conducted in a laboratory?": 'About the service',
      "Will I be wired up all night?": 'About the service',
      "Will anyone be in my room overnight?": 'About the service',
      "Why two nights of testing?": 'About the service',
      "Should I prepare in any way?": 'Preparation',
      "Do I need to leave the hotel?": 'Preparation',
      "Is the programme suitable if I already have a sleep apnoea diagnosis?": 'Safety / Eligibility',
    },
  },
  bookingAccess: {
    eyebrow: 'BEGIN',
    headline: 'You\'ll sleep tonight either way.',
    body: 'The question is whether you\'ll know what it did. Two nights at Fairmont Mumbai turn your sleep from a guess into a record you can act on. Booking begins with a short medical screening; where the programme is not appropriate, it is released without charge.',
    ctaLabel: 'Book the Offer',
    ctaSubline: 'From ₹1,49,000++ · two nights, three days',
    methods: [
      { label: 'Direct Booking', body: 'Proceed below to reserve your Sleepcation dates.' },
    ],
  },
  stickyCta: { label: 'Sleepcation', price: 'From ₹1,49,000++', ctaLabel: 'Book Now', revealThreshold: 0.4 },
  footer: {
    tagline: 'Restore · Move · Perform · Longevity',
    trustItems: [
      { label: 'Clinical', value: 'Delivered by registered, insured clinical practitioners' },
      { label: 'Screening', value: 'Conducted only after pre-arrival clinician screening' },
    ],
    addressLines: ADDRESS,
    crossSell: [
      { label: 'See everything under one roof', href: '/' },
      { label: 'Posture & Longevity Assessment', href: '/services/posture-screening' },
      { label: 'VO2 Max Testing', href: '/services/vo2-max' },
      { label: 'RMR Test', href: '/services/rmr' },
      { label: 'IV Therapy', href: '/services/iv-therapy' },
    ],
  },
  disclaimer:
    'AIWO Sleepcation is a clinical assessment and wellness programme; it is not a treatment for sleep apnoea or any other diagnosed condition and does not replace medical care. Where the assessment identifies something that needs attention, AIWO will refer you to appropriate care. Your clinical information is held by AIWO as Data Fiduciary and handled under the DPDP Act 2023. Cancellations made more than 72 hours before arrival are refunded in full. All prices in INR, exclusive of applicable taxes.',
}
