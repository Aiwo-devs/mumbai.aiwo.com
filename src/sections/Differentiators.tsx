import { PointList } from '../components/ui/PointList'
import { SectionImage } from '../components/ui/SectionImage'
import type { DifferentiatorItem, PlaceholderImage } from '../types/service'
import './Differentiators.css'

interface DifferentiatorsProps {
  id?: string
  eyebrow: string
  headline: string
  /** Intro paragraph before the point list — used when this section merges two
   * source beats (e.g. Mechanism + Why Different, or Clinical Authority + Risk
   * Reversal) so the narrative lead-in survives, not just the bullets. */
  body?: string
  items: DifferentiatorItem[]
  surface?: boolean
  /** Optional supporting visual, rendered after the point list. */
  image?: PlaceholderImage
}

// "The AIWO difference" / merged narrative+points beats. Uses PointList
// (extracted from Pricing.trustNotes) inside the standard section/eyebrow/
// heading shell — the same existing pattern, reused for IA consolidation.
export function Differentiators({ id = 'differentiators', eyebrow, headline, body, items, surface = true, image }: DifferentiatorsProps) {
  return (
    <section id={id} className={surface ? 'section section--surface differentiators' : 'section differentiators'}>
      <div className="container differentiators__inner">
        <div className="section-head differentiators__head">
          <span className="eyebrow">{eyebrow}</span>
          <h2 className="section-heading">{headline}</h2>
          {body && <p className="section-body differentiators__body">{body}</p>}
        </div>
        <PointList points={items} tone="positive" />
        {image && (
          <div className="differentiators__image">
            <SectionImage image={image} />
          </div>
        )}
      </div>
    </section>
  )
}
