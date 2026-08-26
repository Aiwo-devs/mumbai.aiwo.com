import type { PlaceholderImage } from '../../types/service'
import { CornerTicks } from './CornerTicks'
import './SectionImage.css'

// Neutral development placeholder — a contained-photo treatment (bordered,
// radius-lg, fixed aspect-ratio, CornerTicks) for a single standalone
// photograph. Renders ONLY dev-facing text (never real photography, never a
// fabricated image) until `assetKey` is wired to a real file — see
// PlaceholderImage type.
export function SectionImage({ image, className }: { image: PlaceholderImage; className?: string }) {
  return (
    <div
      className={className ? `section-image ${className}` : 'section-image'}
      style={{ aspectRatio: image.aspect }}
    >
      <CornerTicks />
      <span className="section-image__label">{image.label}</span>
    </div>
  )
}
