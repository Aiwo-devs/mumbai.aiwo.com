import type { Testimonial } from '../types/service'

// Development-only placeholder testimonials. NONE of these are verified, real,
// or consented — no genuine testimonial has been supplied for any Mumbai page
// yet. Every entry is isPlaceholder: true; the Testimonials component (and
// every page composer, before even mounting the section) strips these from
// production builds — that filter, not the label text, is what actually keeps
// fabricated social proof off a production build. displayNames are plausible
// placeholder names, chosen so a development preview reads the way the
// finished section will, not a generic-string mockup. None of these claim the
// experience happened at the Mumbai clinic (it's new — nothing has happened
// there yet to quote).
//
// Persona variety follows the principle that testimonials shouldn't all read
// like the same marketing writer: practical/analytical, busy professional,
// fitness-oriented, wellness-oriented, initially skeptical, and
// first-time-diagnostic-user tones are mixed across entries, not one persona
// locked to one service.
const PLACEHOLDER_SOURCE = 'Development placeholder — no verified testimonial supplied yet'

export const testimonials: Testimonial[] = [
  // IV Therapy — supervised experience, comfort/safety, vs. casual drip lounges
  {
    quote:
      "I've done drip lounges before where nobody really looks at you first. Here they actually screened me before starting anything — slowed things down, but I got why once they explained it.",
    displayName: 'Rohan Kulkarni',
    context: 'IV Therapy guest',
    service: 'iv-therapy',
    source: PLACEHOLDER_SOURCE,
    verified: false,
    permission: false,
    isPlaceholder: true,
  },
  {
    quote:
      "What stood out was how supervised it felt — someone was actually checking on me the whole time, not just plugging me in and leaving. Felt more like a clinic than a spa treatment, which is what I wanted.",
    displayName: 'Ananya Desai',
    context: 'IV Therapy guest',
    service: 'iv-therapy',
    source: PLACEHOLDER_SOURCE,
    verified: false,
    permission: false,
    isPlaceholder: true,
  },
  {
    quote:
      "Booked between two meetings. They still went through my history first — appreciated that they didn't rush it even though I was watching the clock.",
    displayName: 'Vivek Chandran',
    context: 'IV Therapy guest',
    service: 'iv-therapy',
    source: PLACEHOLDER_SOURCE,
    verified: false,
    permission: false,
    isPlaceholder: true,
  },

  // Posture Screening — alignment/movement discovery, assessment clarity, actionable next step
  {
    quote:
      "Didn't expect the grip strength part — didn't think that had anything to do with posture. They explained the connection and it actually made sense by the end.",
    displayName: 'Simran Kaur',
    context: 'Posture Screening guest',
    service: 'posture-screening',
    source: PLACEHOLDER_SOURCE,
    verified: false,
    permission: false,
    isPlaceholder: true,
  },
  {
    quote:
      "Good breakdown of what's actually wrong versus what's just tight. I left with one clear thing to work on instead of a list of ten exercises I'd never do.",
    displayName: 'Aditya Bhatt',
    context: 'Posture Screening guest',
    service: 'posture-screening',
    source: PLACEHOLDER_SOURCE,
    verified: false,
    permission: false,
    isPlaceholder: true,
  },
  {
    quote:
      "It wasn't just numbers — they walked me through what it actually meant for how I sit at my desk all day. Felt less like a test, more like someone explaining my own body to me.",
    displayName: 'Priya Nair',
    context: 'Posture Screening guest',
    service: 'posture-screening',
    source: PLACEHOLDER_SOURCE,
    verified: false,
    permission: false,
    isPlaceholder: true,
  },

  // RMR — measured metabolism vs. assumed, calorie/training clarity
  {
    quote: "I'd been eating to a number from an app for years. Turns out it was off by a few hundred calories. Explains a lot, honestly.",
    displayName: 'Kabir Sethi',
    context: 'RMR Test guest',
    service: 'rmr',
    source: PLACEHOLDER_SOURCE,
    verified: false,
    permission: false,
    isPlaceholder: true,
  },
  {
    quote: 'Quick test, no needles like they said. Got a number I could actually hand to my trainer instead of guessing.',
    displayName: 'Neha Agarwal',
    context: 'RMR Test guest',
    service: 'rmr',
    source: PLACEHOLDER_SOURCE,
    verified: false,
    permission: false,
    isPlaceholder: true,
  },
  {
    quote: "Wasn't sure a breath test could tell me anything an app couldn't. It could. Ten minutes for an actual number instead of an estimate.",
    displayName: 'Arjun Pillai',
    context: 'RMR Test guest',
    service: 'rmr',
    source: PLACEHOLDER_SOURCE,
    verified: false,
    permission: false,
    isPlaceholder: true,
  },

  // AIWO Sculpt — time efficiency, supervised session, fitting a busy schedule
  {
    quote: "Fit it in before a meeting, was in and out in under 30 minutes. Felt like I'd actually worked out, which surprised me.",
    displayName: 'Sanjana Rao',
    context: 'AIWO Sculpt guest',
    service: 'ems-sculpting',
    source: PLACEHOLDER_SOURCE,
    verified: false,
    permission: false,
    isPlaceholder: true,
  },
  {
    quote:
      'Was expecting it to feel gimmicky. It did not — someone was adjusting the intensity through the whole session, not just strapping me in and walking off.',
    displayName: 'Rahul Mehta',
    context: 'AIWO Sculpt guest',
    service: 'ems-sculpting',
    source: PLACEHOLDER_SOURCE,
    verified: false,
    permission: false,
    isPlaceholder: true,
  },
  {
    quote:
      'Went in curious more than committed. The trainer adjusted things as we went based on how I was responding, which I was not expecting from something that sounded so automated.',
    displayName: 'Divya Krishnan',
    context: 'AIWO Sculpt guest',
    service: 'ems-sculpting',
    source: PLACEHOLDER_SOURCE,
    verified: false,
    permission: false,
    isPlaceholder: true,
  },

  // VO2 Max — objective fitness level, training zones, value of measured data
  {
    quote:
      'Been training by feel for years. Having actual zones to train in instead of guessing heart rate ranges changed how I structure my week.',
    displayName: 'Karan Malhotra',
    context: 'VO2 Max Test guest',
    service: 'vo2-max',
    source: PLACEHOLDER_SOURCE,
    verified: false,
    permission: false,
    isPlaceholder: true,
  },
  {
    quote: 'Never done a treadmill test like this before. Was harder than I expected, but the breakdown afterward was worth it.',
    displayName: 'Ishaan Verma',
    context: 'VO2 Max Test guest',
    service: 'vo2-max',
    source: PLACEHOLDER_SOURCE,
    verified: false,
    permission: false,
    isPlaceholder: true,
  },
  {
    quote: 'Straightforward test, clear printout afterward. I could actually see where my zones were instead of trusting whatever my watch was calculating.',
    displayName: 'Meera Iyer',
    context: 'VO2 Max Test guest',
    service: 'vo2-max',
    source: PLACEHOLDER_SOURCE,
    verified: false,
    permission: false,
    isPlaceholder: true,
  },
]

export function getTestimonialsForService(service: Testimonial['service']): Testimonial[] {
  return testimonials.filter((t) => t.service === service)
}

// Homepage mix — one entry per service, for variety across the ecosystem
// rather than a single-service set. Reuses the same authored entries a
// service page shows (expected overlap, not the "same three quotes on every
// page" anti-pattern — each service page's own set is otherwise disjoint).
export const homepageTestimonials: Testimonial[] = [
  testimonials.find((t) => t.service === 'iv-therapy')!,
  testimonials.find((t) => t.service === 'posture-screening')!,
  testimonials.find((t) => t.service === 'rmr')!,
  testimonials.find((t) => t.service === 'ems-sculpting')!,
  testimonials.find((t) => t.service === 'vo2-max')!,
]

// Production-safety guard: no verified, consented testimonial has been
// supplied for any Mumbai page yet, so every current entry is
// isPlaceholder: true. This filter is what actually keeps fabricated social
// proof off a production build — not just the data label — regardless of
// what gets passed in from a page's data file. A page composer can also call
// this directly to decide whether to mount the Testimonials section (and its
// numbered divider) at all, rather than rendering a divider over an empty one.
export function visibleTestimonials(items: Testimonial[]) {
  if (import.meta.env.PROD) return items.filter((t) => !t.isPlaceholder)
  return items
}
