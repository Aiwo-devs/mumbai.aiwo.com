import { smartQuotes } from '../lib/text'
import { visibleTestimonials } from '../data/testimonials'
import type { Testimonial } from '../types/service'
import './Testimonials.css'

interface TestimonialsProps {
  testimonials: Testimonial[]
}

export function Testimonials({ testimonials }: TestimonialsProps) {
  const visible = visibleTestimonials(testimonials)
  if (visible.length === 0) return null

  // Rendered twice back-to-back so the marquee track can loop seamlessly; the
  // duplicate half is hidden under prefers-reduced-motion and on mobile (see
  // Testimonials.css), leaving a plain scrollable row of the real quotes.
  const track = [...visible, ...visible]

  // A fixed duration was hand-tuned for one testimonial count elsewhere and
  // held a ~7s/card reading pace there. Mumbai's page-specific sets vary in
  // length (3 per service page, 5 on the homepage), so the same pace is
  // computed instead of re-tuned per page.
  const secondsPerCard = 7
  const scrollDuration = track.length * secondsPerCard

  return (
    <section id="testimonials" className="section testimonials">
      <div className="container">
        <div className="section-head testimonials__head">
          <span className="eyebrow">IN THEIR WORDS</span>
          <h2 className="section-heading">What people noticed, once it was actually measured.</h2>
        </div>
      </div>

      <div className="testimonial-marquee">
        <div
          className="testimonial-track"
          style={{ ['--testimonial-scroll-duration' as string]: `${scrollDuration}s` }}
        >
          {track.map((testimonial, index) => (
            <figure
              key={`${testimonial.displayName}-${index}`}
              className={index >= visible.length ? 'testimonial-card testimonial-card--duplicate' : 'testimonial-card'}
            >
              <div className="testimonial-card__header">
                <figcaption className="testimonial-card__author">{testimonial.displayName}</figcaption>
                <span className="testimonial-card__context">{testimonial.context}</span>
              </div>
              <blockquote className="testimonial-card__quote">{smartQuotes(`"${testimonial.quote}"`)}</blockquote>
            </figure>
          ))}
        </div>
      </div>
    </section>
  )
}
