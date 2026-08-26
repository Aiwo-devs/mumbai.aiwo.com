import { Button } from '../components/ui/Button'
import {
  ArrowRightIcon,
  CornerTickIcon,
  FlaskIcon,
  HomeIcon,
  ShieldCheckIcon,
  StethoscopeIcon,
} from '../components/ui/Icons'
import { CornerTicks } from '../components/ui/CornerTicks'
import { SectionImage } from '../components/ui/SectionImage'
import { smartQuotes, withEmphasis, withSoftClause } from '../lib/text'
import type { ServiceHero } from '../types/service'
import './Hero.css'

const trustIcons = [FlaskIcon, StethoscopeIcon, HomeIcon, ShieldCheckIcon]

// Sparse technical marks scattered left/right of the content column — not a dense
// repeated pattern, and never centered behind the headline/report card. Reuses the
// same small crosshair glyph as CornerTicks elsewhere in the project rather than a
// new icon, so the "technical construction mark" language stays consistent site-wide.
const HERO_MARKS = [
  { top: '14%', left: '6%' },
  { top: '30%', right: '9%' },
  { top: '62%', left: '11%' },
  { top: '78%', right: '7%' },
]

interface HeroProps {
  hero: ServiceHero
  /** Homepage-only self-select entry points ("Start free" / "For 40+" / ...),
   * each scrolling to a matching section. Reuses the exact existing
   * .hero__badge pill treatment — no new visual language. */
  segmentChips?: { label: string; href: string }[]
}

export function Hero({ hero, segmentChips }: HeroProps) {
  return (
    <section id="hero" className="hero">
      <div className="hero__field" aria-hidden="true">
        <div className="hero__grid" />
        <div className="hero__grain" />
        <div className="hero__clear" />
        {HERO_MARKS.map((pos, i) => (
          <span key={i} className="hero__mark" style={pos}>
            <CornerTickIcon className="hero__mark-icon" />
          </span>
        ))}
      </div>

      <div className="container hero__inner">
        <span className="hero__badge">
          {hero.eyebrow}
          <span className="hero__badge-icon">
            <ArrowRightIcon />
          </span>
        </span>
        <h1 className="hero__headline">
          {hero.headlineSoft
            ? withSoftClause(hero.headline.replace(/\.$/, ''), hero.headlineSoft)
            : withEmphasis(hero.headline.replace(/\.$/, ''), hero.emphasizeHeadline)}
          .
        </h1>
        {hero.deck && <p className="hero__deck">{hero.deck}</p>}
        <p className="hero__subhead">{withEmphasis(smartQuotes(hero.subhead), hero.emphasizeSubhead)}</p>

        {segmentChips && segmentChips.length > 0 && (
          <nav className="hero__chips" aria-label="Jump to what applies to you">
            {segmentChips.map((chip) => (
              <a key={chip.label} href={chip.href} className="hero__chip">
                {chip.label}
              </a>
            ))}
          </nav>
        )}

        <div className="hero__cta-row">
          <Button href={hero.ctaHref} variant="primary" size="lg">
            {hero.ctaLabel}
          </Button>
          {hero.secondaryCta && (
            <Button href={hero.secondaryCta.href} variant="secondary" size="lg">
              {hero.secondaryCta.label}
            </Button>
          )}
        </div>
        {hero.ctaContextLine && <p className="hero__cta-context">{hero.ctaContextLine}</p>}

        {hero.image && (
          <div className="hero__visual">
            <SectionImage image={hero.image} className="hero__mockup" />
          </div>
        )}
      </div>

      <div className="hero__trust container">
        {hero.trustChips.map((chip, index) => {
          const Icon = trustIcons[index] ?? ShieldCheckIcon
          return (
            <div key={chip.label} className="hero__trust-item">
              <Icon className="hero__trust-icon" />
              <span>{chip.label}</span>
            </div>
          )
        })}
        <CornerTicks />
      </div>
    </section>
  )
}
