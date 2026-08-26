import { CheckIcon, MinusIcon } from './Icons'
import './PointList.css'

export interface Point {
  lead: string
  body: string
}

interface PointListProps {
  points: Point[]
  tone?: 'positive' | 'negative'
}

// Extracted from Pricing.tsx's trustNotes treatment (check icon + muted small text
// on a divided list) per approval, adapted from a wrapped horizontal chip row to a
// stacked vertical list since each point here is a full bold-lead + sentence, not a
// short chip label — same tokens, icon, and divider styling, no new visual language.
export function PointList({ points, tone = 'positive' }: PointListProps) {
  const Icon = tone === 'positive' ? CheckIcon : MinusIcon
  return (
    <ul className="point-list">
      {points.map((point) => (
        <li key={point.lead} className="point-list__item">
          <Icon className={tone === 'positive' ? 'point-list__icon' : 'point-list__icon point-list__icon--negative'} />
          <span>
            {point.lead && <strong>{point.lead} </strong>}
            {point.body}
          </span>
        </li>
      ))}
    </ul>
  )
}
