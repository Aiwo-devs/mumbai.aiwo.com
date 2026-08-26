import { Fragment } from 'react'
import { CheckCircleIcon, MinusIcon } from '../components/ui/Icons'
import { InfoTooltip } from '../components/ui/InfoTooltip'
import { Button } from '../components/ui/Button'
import { ComparisonSwipeArrow } from '../components/ui/ComparisonSwipeArrow'
import type { ServiceComparison } from '../types/service'
import './Comparison.css'

function Cell({ value, emphasis }: { value: string; emphasis?: boolean }) {
  if (value === 'Yes') {
    return (
      <span className="comparison__cell comparison__cell--yes">
        <CheckCircleIcon className="comparison__check" />
      </span>
    )
  }
  if (value === 'No' || value === '—') {
    return (
      <span className="comparison__cell comparison__cell--no">
        <MinusIcon className="comparison__minus" />
      </span>
    )
  }
  return <span className={emphasis ? 'comparison__cell comparison__cell--emphasis' : 'comparison__cell'}>{value}</span>
}

interface ComparisonProps extends ServiceComparison {
  featureColumnLabel?: string
  badgeLabel?: string
  ctaHref: string
}

// Prop-driven — eyebrow/headline/rows/icons/CTA are all supplied by the
// caller, so each service page can populate its own comparison table.
export function Comparison({
  eyebrow,
  headline,
  columnLabels,
  rows,
  kicker,
  ctaLabel,
  featureColumnLabel = 'What you get',
  badgeLabel,
  ctaHref,
}: ComparisonProps) {
  return (
    <section id="comparison" className="section comparison">
      <div className="container">
        <div className="section-head">
          <span className="eyebrow">{eyebrow}</span>
          <h2 className="section-heading">{headline}</h2>
        </div>

        <span className="comparison__scroll-hint">
          Swipe to compare <ComparisonSwipeArrow className="comparison__scroll-hint-arrow" />
        </span>
        <div className="comparison__scroll">
          <div className="comparison__frame">
            <div className="comparison__matrix" role="table" aria-label={headline}>
              <div className="comparison__row comparison__row--header" role="row">
                <div role="columnheader" className="comparison__label-col comparison__header-cell comparison__header-cell--feature">
                  <span className="comparison__header-label comparison__header-label--feature">{featureColumnLabel}</span>
                </div>
                {columnLabels.slice(0, 2).map((label) => (
                  <div key={label} role="columnheader" className="comparison__header-cell">
                    <span className="comparison__header-label">{label}</span>
                  </div>
                ))}
                <div
                  role="columnheader"
                  className="comparison__header-cell comparison__aiwo-col comparison__aiwo-col--head"
                >
                  {badgeLabel && <span className="comparison__aiwo-badge">{badgeLabel}</span>}
                  <span className="comparison__header-label">{columnLabels[2]}</span>
                </div>
              </div>

              {rows.map((row, index) => {
                const shaded = index % 2 === 0
                return (
                  <Fragment key={row.feature}>
                    <div className={shaded ? 'comparison__row comparison__row--shaded' : 'comparison__row'} role="row">
                      <div
                        role="rowheader"
                        className={[
                          'comparison__label-col',
                          index === 0 ? 'comparison__label-col--first' : '',
                          index === rows.length - 1 ? 'comparison__label-col--last' : '',
                        ]
                          .filter(Boolean)
                          .join(' ')}
                      >
                        <span className="comparison__row-label">
                          {row.feature}
                          {row.info && <InfoTooltip text={row.info} />}
                        </span>
                      </div>
                      <div role="cell">
                        <Cell value={row.values[0]} />
                      </div>
                      <div role="cell">
                        <Cell value={row.values[1]} />
                      </div>
                      <div role="cell" className="comparison__aiwo-col">
                        <Cell value={row.values[2]} emphasis />
                      </div>
                    </div>
                  </Fragment>
                )
              })}

              <div className="comparison__row comparison__row--cta" role="row">
                <div role="cell" className="comparison__aiwo-col comparison__cta-cell">
                  <Button href={ctaHref} variant="primary" size="md">
                    {ctaLabel}
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {kicker && <p className="comparison__kicker">{kicker}</p>}
      </div>
    </section>
  )
}
