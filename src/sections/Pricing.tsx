import { Button } from '../components/ui/Button'
import { CheckIcon } from '../components/ui/Icons'
import { CornerTicks } from '../components/ui/CornerTicks'
import { smartQuotes } from '../lib/text'
import type { ServicePricingTier } from '../types/service'
import './Pricing.css'

// Splits a price string into a leading currency symbol + amount via a
// [currency, ...amount] destructure — but only when the string actually opens
// with a currency symbol. Non-numeric prices ("At consultation") render as
// plain text instead of forcing the big-number treatment onto them.
function PriceDisplay({ price }: { price: string }) {
  const isCurrency = /^[₹$€£]/.test(price)
  if (!isCurrency) {
    return <p className="pricing-card__price pricing-card__price--text">{price}</p>
  }
  const [currency, ...amount] = price
  return (
    <p className="pricing-card__price">
      <span className="pricing-card__currency">{currency}</span>
      {amount.join('')}
    </p>
  )
}

interface PricingProps {
  eyebrow: string
  headline: string
  body: string
  tiers: ServicePricingTier[]
  trustNotes: string[]
  primaryCtaLabel: string
  primaryCtaHref: string
  /** Price/duration/reassurance — rendered as its own line directly below the
   * CTA button, never merged into the button label. */
  primaryCtaSubline?: string
}

export function Pricing({
  eyebrow,
  headline,
  body,
  tiers,
  trustNotes,
  primaryCtaLabel,
  primaryCtaHref,
  primaryCtaSubline,
}: PricingProps) {
  const [primary, ...rest] = tiers

  return (
    <section id="pricing" className="section section--surface pricing">
      <div className="container pricing__intro">
        <span className="eyebrow">{eyebrow}</span>
        <h2 className="section-heading">{headline}</h2>
        <p className="section-body">{smartQuotes(body)}</p>
      </div>

      <div className="container pricing__card-wrap">
        <div className="pricing-card">
          <CornerTicks />
          <PriceDisplay price={primary.price} />
          {primary.note && <p className="pricing-card__price-note">{primary.note}</p>}

          {primary.included && primary.included.length > 0 && (
            <ul className="pricing-card__included">
              {primary.included.map((item) => (
                <li key={item}>
                  <span>{item}</span>
                  <CheckIcon className="pricing-card__check" />
                </li>
              ))}
            </ul>
          )}

          <Button href={primaryCtaHref} variant="primary" size="lg" className="pricing-card__button">
            {primaryCtaLabel}
          </Button>
          {primaryCtaSubline && <p className="pricing-card__cta-subline">{primaryCtaSubline}</p>}

          {trustNotes.length > 0 && (
            <ul className="pricing-card__trust-row">
              {trustNotes.map((note) => (
                <li key={note}>
                  <CheckIcon className="pricing-card__trust-icon" />
                  {note}
                </li>
              ))}
            </ul>
          )}

          {/* Additional supplied tiers (e.g. Posture Screening's Assessment / Egoscue
              cross-references) — the original single-price card had no slot for this,
              so this activates the existing lowerTiers concept as a plain list using
              the same typography/divider system as .pricing-card__included, rather
              than inventing a new card design. */}
          {rest.length > 0 && (
            <ul className="pricing-card__tiers">
              {rest.map((tier) => (
                <li key={tier.name}>
                  <span className="pricing-card__tier-name">{tier.name}</span>
                  <span className="pricing-card__tier-price">{tier.price}</span>
                  {tier.note && <span className="pricing-card__tier-note">{tier.note}</span>}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </section>
  )
}
