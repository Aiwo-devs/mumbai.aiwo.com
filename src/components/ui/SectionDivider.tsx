import './SectionDivider.css'

// The reference design's recurring inter-section breadcrumb band — confirmed via Figma at
// multiple points in the reference file ("[ 01 / 06 ] · Main Features", "[ 02 / 03 ] ·
// Testimonials"): a slim divider row with 4 corner-ticks and a bracketed section index.
export function SectionDivider({
  index,
  total,
  label,
  borderTop = true,
}: {
  index: number
  total: number
  label: string
  // False when the immediately preceding element already closes with its own
  // border — avoids a doubled hairline at the seam (e.g. Hero's trust band,
  // CredibilityStrip, and the testimonial marquee all close their own border).
  borderTop?: boolean
}) {
  return (
    <div className={borderTop ? 'section-divider' : 'section-divider section-divider--no-top'} aria-hidden="true">
      <div className="container section-divider__inner">
        <span className="section-divider__index">
          [ {String(index).padStart(2, '0')} / {String(total).padStart(2, '0')} ]
        </span>
        <span className="section-divider__dot">·</span>
        <span className="section-divider__label">{label}</span>
      </div>
    </div>
  )
}
