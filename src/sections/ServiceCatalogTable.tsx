import type { CatalogGroup } from '../types/service'
import { ComparisonSwipeArrow } from '../components/ui/ComparisonSwipeArrow'
import { Button } from '../components/ui/Button'
import './ServiceCatalogTable.css'

interface ServiceCatalogTableProps {
  eyebrow: string
  headline: string
  /** Lead-in CTA shown above the table (e.g. IV Therapy's "Choose your outcome →
   * Book"). Omit for catalogues with no single lead-in action (e.g. Homepage). */
  ctaLabel?: string
  ctaHref?: string
  groups: CatalogGroup[]
}

// Reuses Comparison.tsx's exact visual system (border/divider treatment, row
// shading, mobile horizontal scroll + sticky first column + scroll-snap, the small
// rounded-pill badge typography) reshaped for a service directory (name/venue/
// duration/price/status) instead of a feature-vs-competitor matrix — there is no
// "highlighted AIWO column" here, so that specific tint/badge-float logic is
// dropped, but every other visual/responsive pattern is carried over unchanged.
export function ServiceCatalogTable({ eyebrow, headline, ctaLabel, ctaHref = '#booking-access', groups }: ServiceCatalogTableProps) {
  // Optional per-row outcome CTA (IV Therapy). Adding the Action column only when
  // at least one row actually uses it keeps every other catalogue (Homepage)
  // visually identical to before — the column simply doesn't exist for them.
  const hasRowCta = groups.some((group) => group.rows.some((row) => row.cta))

  return (
    <section id="catalog" className="section catalog">
      <div className="container">
        <div className="section-head">
          <span className="eyebrow">{eyebrow}</span>
          <h2 className="section-heading">{headline}</h2>
          {ctaLabel && (
            <Button href={ctaHref} variant="primary" size="md" className="catalog__lead-cta">
              {ctaLabel}
            </Button>
          )}
        </div>

        {groups.map((group) => (
          <div key={group.title} id={group.id} className="catalog__group">
            <h3 className="catalog__group-title">{group.title}</h3>
            <span className="catalog__scroll-hint">
              Swipe to see all <ComparisonSwipeArrow className="catalog__scroll-hint-arrow" />
            </span>
            <div className="catalog__scroll">
              <div className="catalog__frame">
                <div className={hasRowCta ? 'catalog__matrix catalog__matrix--with-cta' : 'catalog__matrix'} role="table" aria-label={group.title}>
                  <div className="catalog__row catalog__row--header" role="row">
                    <div role="columnheader" className="catalog__label-col catalog__header-cell">
                      Service
                    </div>
                    <div role="columnheader" className="catalog__header-cell">
                      Venue
                    </div>
                    <div role="columnheader" className="catalog__header-cell">
                      Duration
                    </div>
                    <div role="columnheader" className="catalog__header-cell catalog__cell--price">
                      Price
                    </div>
                    <div role="columnheader" className="catalog__header-cell">
                      Status
                    </div>
                    {hasRowCta && (
                      <div role="columnheader" className="catalog__header-cell">
                        Book
                      </div>
                    )}
                  </div>

                  {group.rows.map((row, index) => {
                    const shaded = index % 2 === 0
                    return (
                      <div
                        key={row.name}
                        className={shaded ? 'catalog__row catalog__row--shaded' : 'catalog__row'}
                        role="row"
                      >
                        <div
                          role="rowheader"
                          className={[
                            'catalog__label-col',
                            index === 0 ? 'catalog__label-col--first' : '',
                            index === group.rows.length - 1 ? 'catalog__label-col--last' : '',
                          ]
                            .filter(Boolean)
                            .join(' ')}
                        >
                          <span className="catalog__row-label">{row.name}</span>
                          {row.description && <span className="catalog__row-description">{row.description}</span>}
                        </div>
                        <div role="cell">{row.venue}</div>
                        <div role="cell">{row.duration}</div>
                        <div role="cell" className="catalog__cell--price">
                          {row.price}
                        </div>
                        <div role="cell">
                          <span className={row.status === 'live' ? 'catalog__badge catalog__badge--live' : 'catalog__badge'}>
                            {row.status === 'live' ? '● Live' : '○ Scaling'}
                          </span>
                        </div>
                        {hasRowCta && (
                          <div role="cell" className="catalog__cell--cta">
                            {row.cta && (
                              <Button href={row.cta.href} variant="secondary" size="md">
                                {row.cta.label}
                              </Button>
                            )}
                          </div>
                        )}
                      </div>
                    )
                  })}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
