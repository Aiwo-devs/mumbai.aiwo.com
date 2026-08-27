export interface ServiceNavItem {
  label: string
  href: string
  /** Reserved for a future mega-menu (e.g. "Assess" / "Treat") — every item is
   * ungrouped today, so the menu renders as one flat list. Adding a group to
   * an item later is enough to make the menu render grouped; no component
   * changes required. */
  group?: string
}

// Deliberately NOT derived from each service's own ServiceData object.
// Header.tsx (and therefore this file) is imported by every route, including
// the lazy-loaded per-service chunks — importing the full ivTherapy.ts etc.
// data files just for their name/slug would pull each service's entire
// content (FAQ, pricing, testimonials) into a shared chunk and defeat route
// splitting. This is a small, intentional duplication of two fields (label
// text, route slug) that change rarely; keep these in sync with each
// service's own `name`/`slug` (src/data/services/*.ts) if either changes.
// Only services with a real, live route belong here — this list renders as
// normal clickable navigation, so anything scaling/not-yet-launched must
// stay out of it (add it here only once its route actually exists in
// App.tsx).
export const serviceNavigation: ServiceNavItem[] = [
  { label: 'IV Therapy', href: '/services/iv-therapy' },
  { label: 'Posture Screening', href: '/services/posture-screening' },
  { label: 'RMR Test', href: '/services/rmr' },
  { label: 'AIWO Sculpt', href: '/services/ems-sculpting' },
  { label: 'VO2 Max Testing', href: '/services/vo2-max' },
]
