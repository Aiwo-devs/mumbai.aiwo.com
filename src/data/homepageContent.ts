// ─────────────────────────────────────────────────────────────────────────────
// AIWO Mumbai homepage — brand/longevity content.
// Source of truth: AIWO_Mumbai_Homepage.md. Mumbai-only: every visitor-facing
// Chennai reference in the source (trust strip "Chennai & Mumbai"; footer Chennai
// address) is intentionally stripped here. Phone +91 86820 86820 is the confirmed
// AIWO number. The single CTA verb is "Book a Consultation".
// This module is consumed only by src/service-site/pages/HomePage.tsx.
// ─────────────────────────────────────────────────────────────────────────────

// Consultation is by first call — the "we can usually tell you something on the
// first call" mechanism. No booking route is fabricated; the homepage routes to
// the phone, and the frozen service pages keep their own online booking.
export const CONTACT = {
  phoneDisplay: '+91 86820 86820',
  phoneHref: 'tel:+918682086820',
  beginAnchor: '#begin',
}

export const CTA = {
  book: 'Book a Consultation',
}

export const homeMeta = {
  title: 'AIWO Longevity Clinic, Mumbai — Live Longer. Live Younger.',
  description:
    'AIWO is an integrated longevity clinic, now in Mumbai inside Fairmont Mumbai. We measure how fast you are actually ageing, read it as one picture, and build the system that slows it down. Book a consultation.',
}

// ─── Hero (§ masthead + hero) ────────────────────────────────────────────────
export const hero = {
  eyebrow: 'An Integrated Longevity Clinic · Now in Mumbai',
  brandLine: 'AIWO — Live Longer. Live Younger.',
  headline: 'Know your body. Then improve it.',
  lede: 'The most expensive thing you own is running down at a rate nobody has measured.',
  body: "AIWO measures how fast you're actually ageing, reads it as one picture, and builds the system that slows it down.",
  tagline: 'Beyond Blood and Performance.',
  image: { alt: 'A clinician and guest reviewing a longevity assessment report at AIWO, Mumbai' },
  trust: [
    '10+ years in longevity',
    'Named clinical team',
    'Title Sponsor, Longevity Summit India 2026',
    'Mumbai',
  ],
}

// ─── The Difference — Normal vs Optimal ──────────────────────────────────────
export const difference = {
  id: 'difference',
  kicker: 'The Difference',
  headlineLead: 'Normal is where most people are.',
  headlineEmphasis: 'Optimal is where you’d want to be.',
  body: 'A standard health check compares you to a drifting population and reports back normal. AIWO looks for drift years earlier, in your optimal range — and reads the rate you’re moving, not just a number today.',
  linkLabel: 'See the difference',
  image: { alt: 'A calm, non-invasive biological-age assessment in progress at AIWO, Mumbai' },
}

// ─── The Method — One system. Four movements. ────────────────────────────────
export const method = {
  id: 'method',
  kicker: 'The Method',
  headline: 'One system. Four movements.',
  movements: [
    { lead: 'Measure', body: 'The signals that move before symptoms do.' },
    { lead: 'Understand', body: 'A specialist panel reads the whole picture, not one organ each.' },
    { lead: 'Act', body: 'Protocols that move several systems at once.' },
    { lead: 'Sustain', body: 'Retested quarterly, so results build instead of resetting.' },
  ],
  linkLabel: 'How the method works',
}

// ─── The Name — Why we're called AIWO ────────────────────────────────────────
export const name = {
  id: 'name',
  kicker: 'The Name',
  headline: 'Why we’re called AIWO',
  characters: '爱我',
  gloss: 'Love me.',
  bodyBefore: 'Your body is the only asset you can’t replace. We don’t just add years to your life — we build ',
  bodyEmphasis: 'Joyspan',
  bodyAfter: ', the years you’d choose to live again.',
}

// ─── Begin in Mumbai ─────────────────────────────────────────────────────────
export const begin = {
  id: 'begin',
  kicker: 'Begin',
  headline: 'Begin in Mumbai',
  body: 'The AIWO system, now inside Fairmont Mumbai. Start with a consultation — we can usually tell you something on the first call.',
  closing: 'Why settle for normal when you’re built to thrive?',
  image: { alt: 'A guest, renewed and at ease, looking out over Mumbai after an AIWO session' },
  address: 'Level 2, Fairmont Mumbai, T2 Terminal · CSMI Airport Road · Mumbai 400 099',
}
