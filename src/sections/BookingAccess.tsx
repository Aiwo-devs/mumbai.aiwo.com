import { CornerTicks } from '../components/ui/CornerTicks'
import { Button } from '../components/ui/Button'
import type { BookingMethod } from '../types/service'
import './BookingAccess.css'

interface BookingAccessProps {
  eyebrow: string
  headline: string
  body: string
  /** 4.13's exact final-CTA button wording. Optional — Homepage doesn't set this. */
  ctaLabel?: string
  /** Price/duration/reassurance — its own line directly below the button, never
   * concatenated into the button label. */
  ctaSubline?: string
  methods: BookingMethod[]
  reportNote?: string
  serviceName?: string
}

// Replaces Intake.tsx for Mumbai — that component's self-serve date/slot/name/
// phone form with a fake "You're booked" confirmation does not match how Mumbai
// bookings actually work (through concierge, the spa desk, or the in-room code;
// see Phase 2 §14.5 / Phase 3 Approval 5). This reuses Intake's exact visual shell
// (.intake__layout grid, .intake-card panel, CornerTicks) with the form replaced by
// a static list of the real booking-access methods — no fake confirmation state,
// no invented contact details.
export function BookingAccess({ eyebrow, headline, body, ctaLabel, ctaSubline, methods, reportNote, serviceName }: BookingAccessProps) {
  return (
    <section id="booking-access" className="section section--surface booking-access">
      <div className="container booking-access__layout">
        <div className="booking-access__intro">
          <span className="eyebrow">{eyebrow}</span>
          <h2 className="section-heading">{headline}</h2>
          <p className="section-body booking-access__body">{body}</p>
          {ctaLabel && (
            <>
              <Button href={`/book?serviceName=${encodeURIComponent(serviceName || headline)}`} variant="primary" size="lg" className="booking-access__cta">
                {ctaLabel}
              </Button>
              {ctaSubline && <p className="booking-access__cta-subline">{ctaSubline}</p>}
            </>
          )}
        </div>

        <div className="booking-access-card">
          <CornerTicks />
          <ul className="booking-access__methods">
            {methods.map((method) => (
              <li key={method.label} className="booking-access__method">
                <span className="booking-access__method-label">{method.label}</span>
                <span className="booking-access__method-body">{method.body}</span>
              </li>
            ))}
          </ul>
          {reportNote && <p className="booking-access__note">{reportNote}</p>}
        </div>
      </div>
    </section>
  )
}
