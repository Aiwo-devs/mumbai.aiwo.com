interface IconProps {
  className?: string
}

// Path sourced from the Figma reference's exported check icon (69daac3f7ae99c5c47b337d6_icon-check.svg).
export function CheckIcon({ className }: IconProps) {
  return (
    <svg className={className} width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
      <path
        d="M15.0004 4.5L6.75037 12.75L3.00036 9"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export function ChevronDownIcon({ className }: IconProps) {
  return (
    <svg className={className} width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
      <path
        d="M4.5 6.75L9 11.25L13.5 6.75"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export function ArrowUpIcon({ className }: IconProps) {
  return (
    <svg className={className} width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M18 4L5.99997 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M12 8V20" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path
        d="M15.9999 12C15.9999 12 13.054 8.00001 11.9999 8C10.9458 7.99999 7.99994 12 7.99994 12"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export function PlusMinusIcon({ className, open }: IconProps & { open: boolean }) {
  return (
    <svg className={className} width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <path d="M4 10H16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path
        d="M10 4V16"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        style={{
          transformOrigin: 'center',
          transform: open ? 'scaleY(0)' : 'scaleY(1)',
          transition: 'transform 0.2s ease',
        }}
      />
    </svg>
  )
}

export function ArrowRightIcon({ className }: IconProps) {
  return (
    <svg className={className} width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path
        d="M3.5 8H12.5M12.5 8L8.5 4M12.5 8L8.5 12"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

// Minimal 24x24 line-icon set, ~1.6px stroke, geometric — hand-authored to keep one
// coherent icon language across the page rather than mixing external icon styles.
const iconBase = { width: 24, height: 24, viewBox: '0 0 24 24', fill: 'none', 'aria-hidden': true } as const

export function HeartPulseIcon({ className }: IconProps) {
  return (
    <svg className={className} {...iconBase}>
      <path
        d="M12 20.2c-4.6-2.86-8.4-6.1-8.4-10.2 0-2.6 2.1-4.6 4.6-4.6 1.6 0 3 .77 3.8 2 .8-1.23 2.2-2 3.8-2 2.5 0 4.6 2 4.6 4.6 0 4.1-3.8 7.34-8.4 10.2Z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
      <path
        d="M5.5 12h2.3l1.4-2.6 1.9 4.8 1.4-2.6h3.6"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export function ActivityIcon({ className }: IconProps) {
  return (
    <svg className={className} {...iconBase}>
      <path
        d="M3 12.5h3.4l1.9-6.4 3.4 12.8 2.1-9.5 1.5 3.1H21"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export function DropletIcon({ className }: IconProps) {
  return (
    <svg className={className} {...iconBase}>
      <path
        d="M12 3.5s6 6.65 6 10.9a6 6 0 1 1-12 0c0-4.25 6-10.9 6-10.9Z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export function LeafIcon({ className }: IconProps) {
  return (
    <svg className={className} {...iconBase}>
      <path
        d="M5 19c8.5 0 13.5-5.2 14-14-8.7.4-14 5.4-14 14Z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
      <path d="M5 19c0-4.6 2-8 6.5-10.6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  )
}

export function HomeIcon({ className }: IconProps) {
  return (
    <svg className={className} {...iconBase}>
      <path
        d="M4.5 11.5 12 4.5l7.5 7"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M6.5 10v8.5a1 1 0 0 0 1 1H10v-5h4v5h2.5a1 1 0 0 0 1-1V10"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export function FlaskIcon({ className }: IconProps) {
  return (
    <svg className={className} {...iconBase}>
      <path
        d="M10 3.5h4M10 3.5v5.7L5.3 18a1.6 1.6 0 0 0 1.4 2.4h10.6a1.6 1.6 0 0 0 1.4-2.4L14 9.2V3.5"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M7.8 14.5h8.4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  )
}

export function ShieldCheckIcon({ className }: IconProps) {
  return (
    <svg className={className} {...iconBase}>
      <path
        d="M12 3.5 5 6.2v5.4c0 4.6 3 7.9 7 8.9 4-1 7-4.3 7-8.9V6.2Z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
      <path
        d="M9 12.1l2 2 4-4.4"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export function CalendarIcon({ className }: IconProps) {
  return (
    <svg className={className} {...iconBase}>
      <rect x="4" y="5.5" width="16" height="14.5" rx="2" stroke="currentColor" strokeWidth="1.6" />
      <path d="M4 9.5h16M8 3.5v3.5M16 3.5v3.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  )
}

export function StethoscopeIcon({ className }: IconProps) {
  return (
    <svg className={className} {...iconBase}>
      <path
        d="M6 4v5.2a4.2 4.2 0 0 0 8.4 0V4"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M10.2 13.4v1.8a4.6 4.6 0 0 0 9.2 0v-1.3" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      <circle cx="19.4" cy="12.9" r="1.5" stroke="currentColor" strokeWidth="1.6" />
      <circle cx="6" cy="3.4" r="1.1" stroke="currentColor" strokeWidth="1.4" />
      <circle cx="14.4" cy="3.4" r="1.1" stroke="currentColor" strokeWidth="1.4" />
    </svg>
  )
}

export function FileReportIcon({ className }: IconProps) {
  return (
    <svg className={className} {...iconBase}>
      <path
        d="M7 3.5h7l4 4v12.5a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V4.5a1 1 0 0 1 1-1Z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
      <path d="M14 3.5v4h4" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
      <path d="M9 13.5h6M9 16.5h6M9 10.5h2.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  )
}

export function TrendUpIcon({ className }: IconProps) {
  return (
    <svg className={className} {...iconBase}>
      <path
        d="M4 16.5 9.5 11l3.5 3.5L20 7"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M14.5 7H20v5.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

// Path sourced from the Figma Untitled UI pricing-table reference's exported check-circle icon.
export function CheckCircleIcon({ className }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 22 22" fill="none" aria-hidden="true">
      <path
        d="M6.5 11L9.5 14L15.5 8M21 11C21 16.5228 16.5228 21 11 21C5.47715 21 1 16.5228 1 11C1 5.47715 5.47715 1 11 1C16.5228 1 21 5.47715 21 11Z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

// Plain dash — matches the Untitled UI comparison-table "not included" cell treatment.
export function MinusIcon({ className }: IconProps) {
  return (
    <svg className={className} {...iconBase}>
      <path d="M5 12h14" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  )
}

// Path sourced from the Figma Untitled UI pricing-table reference's exported help-circle icon.
export function InfoIcon({ className }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 14.6667 14.6667" fill="none" aria-hidden="true">
      <path
        d="M5.39333 5.33333C5.55007 4.88778 5.85943 4.51207 6.26664 4.27276C6.67384 4.03344 7.1526 3.94596 7.61812 4.02581C8.08364 4.10566 8.50588 4.34768 8.81005 4.70902C9.11422 5.07035 9.2807 5.52768 9.28 6C9.28 7.33333 7.28 8 7.28 8M7.33333 10.6667H7.34M14 7.33333C14 11.0152 11.0152 14 7.33333 14C3.65143 14 0.666667 11.0152 0.666667 7.33333C0.666667 3.65143 3.65143 0.666667 7.33333 0.666667C11.0152 0.666667 14 3.65143 14 7.33333Z"
        stroke="currentColor"
        strokeWidth="1.33333"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export function ClockIcon({ className }: IconProps) {
  return (
    <svg className={className} {...iconBase}>
      <circle cx="12" cy="12" r="8.5" stroke="currentColor" strokeWidth="1.6" />
      <path d="M12 7.5V12l3 2" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export function NoAlcoholIcon({ className }: IconProps) {
  return (
    <svg className={className} {...iconBase}>
      <path
        d="M7 3.5h10l-3.6 6.2a3 3 0 0 0-.4 1.5V19a1 1 0 0 0 1 1h1M12 20.5H9"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M4 4l16 16" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  )
}

export function PillIcon({ className }: IconProps) {
  return (
    <svg className={className} {...iconBase}>
      <rect
        x="3.5"
        y="8.5"
        width="17"
        height="7"
        rx="3.5"
        transform="rotate(-38 12 12)"
        stroke="currentColor"
        strokeWidth="1.6"
      />
      <path d="M10.5 8.2 13.5 15.8" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  )
}

// Corner tick-mark motif — path sourced from the reference design's Figma file, where it
// appears at the corners of nearly every bordered card, panel and divider on the site.
export function CornerTickIcon({ className }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 21 21" fill="none" aria-hidden="true">
      <path
        d="M10 4C10 7.31371 7.31371 10 4 10H0V11H4C7.31371 11 10 13.6863 10 17V21H11V17C11 13.6863 13.6863 11 17 11H21V10H17C13.6863 10 11 7.31371 11 4V0H10V4Z"
        fill="currentColor"
      />
    </svg>
  )
}

export function SunIcon({ className }: IconProps) {
  return (
    <svg className={className} {...iconBase}>
      <circle cx="12" cy="12" r="4.5" stroke="currentColor" strokeWidth="1.6" />
      <path
        d="M12 2.5v2.3M12 19.2v2.3M4.4 4.4l1.6 1.6M18 18l1.6 1.6M2.5 12h2.3M19.2 12h2.3M4.4 19.6 6 18M18 6l1.6-1.6"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </svg>
  )
}
