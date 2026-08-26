import { smartQuotes } from '../lib/text'
import { Button } from '../components/ui/Button'
import { SectionImage } from '../components/ui/SectionImage'
import type { PlaceholderImage } from '../types/service'
import './WhyItMatters.css'

interface WhyItMattersProps {
  id?: string
  eyebrow: string
  headline: string
  body: string
  /** Alternates the existing `.section--surface` modifier (already used
   * elsewhere, e.g. Pricing) so consecutive plain-text beats on the v2.0 service
   * pages read as distinct sections rather than one long unbroken block. */
  surface?: boolean
  /** Optional trailing CTA — used by narrative beats that end on a booking
   * prompt (e.g. 4.6 Experience/PEAK). Reuses the existing Button component. */
  ctaLabel?: string
  ctaHref?: string
  /** Supporting placeholder visual (e.g. 4.6 Experience/PEAK) — rendered below
   * the body text, above any case-card grid. */
  image?: PlaceholderImage
}

export function WhyItMatters({
  id = 'why-it-matters',
  eyebrow,
  headline,
  body,
  surface = true,
  ctaLabel,
  ctaHref = '#booking-access',
  image,
}: WhyItMattersProps) {
  return (
    <section id={id} className={surface ? 'section section--surface why-it-matters' : 'section why-it-matters'}>
      <div className="container">
        <div className="section-head why-it-matters__head">
          <span className="eyebrow">{eyebrow}</span>
          <h2 className="section-heading">{smartQuotes(headline)}</h2>
          <p className="section-body why-it-matters__body">{body}</p>
          {ctaLabel && (
            <Button href={ctaHref} variant="primary" size="md" className="why-it-matters__cta">
              {ctaLabel}
            </Button>
          )}
        </div>
        {image && (
          <div className="why-it-matters__image">
            <SectionImage image={image} />
          </div>
        )}
      </div>
    </section>
  )
}
