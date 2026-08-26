import { CornerTicks } from './ui/CornerTicks'
import './AnnouncementBar.css'

interface AnnouncementBarProps {
  text: string
  ctaLabel: string
  ctaHref: string
}

// The reference design's announcement banner (confirmed via Figma, node 2643:9387): an inset
// rounded pill within the standard 1112px content column — not a full-bleed strip —
// with a single centered line and an inline underlined CTA, no dismiss control, and a
// full-bleed hairline divider beneath it.
export function AnnouncementBar({ text, ctaLabel, ctaHref }: AnnouncementBarProps) {
  return (
    <div className="announcement-bar-wrap">
      <div className="container announcement-bar__container">
        <div className="announcement-bar">
          <CornerTicks corners={['bl', 'br']} />
          <span className="announcement-bar__text">
            {text}{' '}
            <a href={ctaHref} className="announcement-bar__cta">
              {ctaLabel}
            </a>
          </span>
        </div>
      </div>
      <div className="announcement-bar__divider" aria-hidden="true" />
    </div>
  )
}
