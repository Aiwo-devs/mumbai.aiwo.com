import type { HowItWorksStep } from '../types/shared'
import { CornerTicks } from '../components/ui/CornerTicks'
import './ProcessSteps.css'

interface ProcessStepsProps {
  eyebrow: string
  headline: string
  steps: HowItWorksStep[]
  prepNote?: string
}

// Renders each page's `process` (how-it-works) steps. Composed entirely from
// existing visual primitives: the section/eyebrow/heading/body typography
// (base.css), a bordered card-grid treatment (border, radius-xl, per-card
// divider, 4→2 col collapse at 960px), and the "[ 01 ]" bracket-numeral
// treatment from SectionDivider — composition of existing patterns, not new design.
export function ProcessSteps({ eyebrow, headline, steps, prepNote }: ProcessStepsProps) {
  return (
    <section id="process" className="section process">
      <div className="container">
        <div className="section-head">
          <span className="eyebrow">{eyebrow}</span>
          <h2 className="section-heading">{headline}</h2>
        </div>

        <div className="process-grid">
          {steps.map((step, index) => (
            <article key={step.id} className="process-card">
              <span className="process-card__index">[ {String(index + 1).padStart(2, '0')} ]</span>
              <h3 className="process-card__title">{step.title}</h3>
              <p className="process-card__body">{step.body}</p>
            </article>
          ))}
          <CornerTicks />
        </div>

        {prepNote && <p className="process__prep-note">{prepNote}</p>}
      </div>
    </section>
  )
}
