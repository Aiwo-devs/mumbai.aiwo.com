import { Fragment, type ReactNode } from 'react'
import { AnnouncementBar } from './components/AnnouncementBar'
import { Header } from './components/Header'
import { Footer } from './components/Footer'
import { StickyCta } from './components/StickyCta'
import { ConversionModal } from './components/ConversionModal'
import { BackToTop } from './components/BackToTop'
import { Seo } from './components/Seo'
import { SectionDivider } from './components/ui/SectionDivider'
import { Hero } from './sections/Hero'
import { WhyItMatters } from './sections/WhyItMatters'
import { Differentiators } from './sections/Differentiators'
import { ServiceCatalogTable } from './sections/ServiceCatalogTable'
import { ProcessSteps } from './sections/ProcessSteps'
import { Suitability } from './sections/Suitability'
import { Comparison } from './sections/Comparison'
import { Pricing } from './sections/Pricing'
import { Faq } from './sections/Faq'
import { BookingAccess } from './sections/BookingAccess'
import { Testimonials } from './sections/Testimonials'
import { visibleTestimonials } from './data/testimonials'
import type { CompositeBeat, NarrativeBeat, ServiceData } from './types/service'

function Narrative({ beat, surface }: { beat: NarrativeBeat; surface: boolean }) {
  return (
    <WhyItMatters
      id={beat.id}
      eyebrow={beat.eyebrow}
      headline={beat.headline}
      body={beat.body}
      surface={surface}
      ctaLabel={beat.ctaLabel}
      image={beat.image}
    />
  )
}

function Composite({ beat, surface }: { beat: CompositeBeat; surface: boolean }) {
  const points = beat.clinicianCredentials ? [...beat.points, { lead: '', body: beat.clinicianCredentials }] : beat.points
  return (
    <Differentiators id={beat.id} eyebrow={beat.eyebrow} headline={beat.headline} body={beat.body} items={points} surface={surface} />
  )
}

// Shared shell for all five v2.0 service landing pages, IA-consolidated per the
// correction pass: 4.2 Mechanism + 4.3 Why Different are merged into one
// "Differentiation" beat for the four pages that don't have a real comparison
// table (IV Therapy keeps both distinct, since its Why-Different IS a real
// table — no redundancy to merge there). 4.9 Clinical Authority + 4.10 Risk
// Reversal are merged into one "Trust & Safety" beat on every page. 4.4 Value
// Equation's prose (where it existed) is folded into Pricing's body instead of
// a standalone section, since it was otherwise just repeating the price stated
// again two sections later. Nothing supplied is deleted — everything moved
// into an existing section or an existing composite pattern (Differentiators/
// PointList), never dropped.
export function ServicePage({ data }: { data: ServiceData }) {
  const sections: { label: string; node: ReactNode }[] = [
    { label: 'The Problem', node: <Narrative beat={data.silentProblem} surface={false} /> },
  ]

  if (data.mechanism) {
    sections.push({ label: 'The Mechanism', node: <Narrative beat={data.mechanism} surface={true} /> })
  }
  if (data.whyDifferentComparison) {
    sections.push({
      label: 'Why This Is Different',
      node: <Comparison key="comparison" {...data.whyDifferentComparison} ctaHref="#booking-access" />,
    })
  } else if (data.differentiation) {
    sections.push({ label: 'The Difference', node: <Composite beat={data.differentiation} surface={true} /> })
  }

  if (data.valueEquationCatalog) {
    sections.push({ label: 'Choose Your Outcome', node: <ServiceCatalogTable key="catalog" {...data.valueEquationCatalog} /> })
  }

  sections.push({ label: 'How It Works', node: <ProcessSteps key="process" {...data.process} /> })
  sections.push({ label: 'The Experience', node: <Narrative beat={data.experience} surface={false} /> })
  sections.push({ label: 'Who This Is For', node: <Suitability key="suitability" {...data.suitability} /> })
  // 4.8 Social Proof — every current entry is a development-only placeholder
  // (see src/data/testimonials.ts). Checked here (not just inside
  // Testimonials itself) so a production build never mounts an empty
  // section with a numbered divider over nothing.
  if (visibleTestimonials(data.testimonials).length > 0) {
    sections.push({
      label: 'Testimonials',
      node: <Testimonials key="testimonials" testimonials={data.testimonials} />,
    })
  }
  sections.push({ label: 'Trust & Safety', node: <Composite beat={data.trustSafety} surface={false} /> })
  sections.push({
    label: 'Pricing',
    node: (
      <Pricing
        key="pricing"
        eyebrow={data.pricing.eyebrow}
        headline={data.pricing.headline}
        body={data.pricing.body}
        tiers={data.pricing.tiers}
        trustNotes={data.pricing.trustNotes}
        primaryCtaLabel={data.pricing.ctaLabel ?? data.hero.ctaLabel}
        primaryCtaHref="#booking-access"
        primaryCtaSubline={data.pricing.ctaSubline}
      />
    ),
  })
  if (data.faq.items.length > 0) {
    sections.push({
      label: 'FAQs',
      node: <Faq key="faq" items={data.faq.items} categoryByQuestion={data.faq.categoryByQuestion} />,
    })
  }
  sections.push({ label: 'Final CTA', node: <BookingAccess key="booking-access" {...data.bookingAccess} serviceName={data.name} /> })

  return (
    <>
      <Seo title={data.seo.title} description={data.seo.description} path={data.seo.path} />
      <AnnouncementBar
        text="Restore · Move · Perform · Longevity"
        ctaLabel={data.hero.ctaLabel}
        ctaHref={data.hero.ctaHref}
      />
      <Header
        navLinks={data.navLinks}
        bookHref="#booking-access"
        ctaHref={data.hero.ctaHref}
        ctaFullLabel={data.hero.ctaLabel}
        ctaShortLabel="Book Now"
        mobileCtaLabel={data.hero.ctaLabel}
      />
      <main id="main-content">
        <Hero hero={data.hero} />
        {sections.map((section, index) => (
          <Fragment key={section.label}>
            <SectionDivider index={index + 1} total={sections.length} label={section.label} borderTop={index !== 0} />
            {section.node}
          </Fragment>
        ))}
        <div className="section-disclaimer">
          <div className="container">
            <p className="section-disclaimer__text">{data.disclaimer}</p>
          </div>
        </div>
      </main>
      <Footer
        tagline={data.footer.tagline}
        trustItems={data.footer.trustItems}
        crossSell={data.footer.crossSell ?? []}
        addressLines={data.footer.addressLines}
      />
      <StickyCta
        label={data.name}
        price={data.stickyCta.price}
        ctaLabel={data.stickyCta.ctaLabel}
        href="#booking-access"
        revealThreshold={data.stickyCta.revealThreshold}
      />
      <BackToTop />
      <ConversionModal
        sessionKey={`mumbai-${data.slug}-conversion-modal-shown`}
        eyebrow={data.hero.eyebrow}
        headline={data.hero.headline}
        bodyLine={data.hero.ctaContextLine}
        ctaLabel={data.hero.ctaLabel}
        ctaHref={data.hero.ctaHref}
      />
    </>
  )
}
