// Placeholder slot for the "Swipe to compare" hint's arrow — deliberately not an
// icon-library glyph, since a final custom arrow asset is coming. Swap the markup
// below for that asset (img/inline SVG) without needing to touch Comparison.tsx.
export function ComparisonSwipeArrow({ className }: { className?: string }) {
  return (
    <span className={className} aria-hidden="true">
      →
    </span>
  )
}
