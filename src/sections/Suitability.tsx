import { PointList } from '../components/ui/PointList'
import type { SuitabilityPair } from '../types/service'
import './Suitability.css'

interface SuitabilityProps {
  eyebrow: string
  headline: string
  forLabel: string
  forItems: SuitabilityPair[]
  notForLabel?: string
  notForItems?: string[]
}

// "Who this is for" / "Not for you right now if" — present on every launch service
// page. Composed from the same PointList
// primitive as Differentiators (Pricing.trustNotes-derived), inside the standard
// section/eyebrow/heading shell, laid out in the same 2-column grid pattern used
// elsewhere (WhatItMeasures) for paired content blocks.
export function Suitability({ eyebrow, headline, forLabel, forItems, notForLabel, notForItems }: SuitabilityProps) {
  return (
    <section id="suitability" className="section suitability">
      <div className="container">
        <div className="section-head">
          <span className="eyebrow">{eyebrow}</span>
          <h2 className="section-heading">{headline}</h2>
        </div>
        <div className="suitability__grid">
          <div>
            <h3 className="suitability__group-label">{forLabel}</h3>
            <PointList points={forItems} tone="positive" />
          </div>
          {notForItems && notForItems.length > 0 && (
            <div>
              <h3 className="suitability__group-label">{notForLabel ?? 'Not for you right now if'}</h3>
              <PointList points={notForItems.map((item) => ({ lead: '', body: item }))} tone="negative" />
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
