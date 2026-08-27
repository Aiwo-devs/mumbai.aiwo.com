import { Fragment } from 'react'
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
import { Faq } from './sections/Faq'
import { BookingAccess } from './sections/BookingAccess'
import { Testimonials } from './sections/Testimonials'
import { homepageTestimonials, visibleTestimonials } from './data/testimonials'
import {
  homepageHero,
  heroSegmentChips,
  silentProblem,
  allUnderOneRoof,
  measurementFirst,
  catalogGroups,
  gatewayGift,
  aiwoMethod,
  whatYoullFeel,
  whoThisIsFor,
  authority,
  bookingAccess,
  homepageFaq,
  finalCta,
  policyNotes,
  footer,
  homepageSeo,
  homepageDisclaimer,
  stickyCta,
} from './data/homepage'

const NAV_LINKS = [
  { href: '#cluster-gift', label: 'The Gift' },
  { href: '#cluster-longevity-lab', label: 'Longevity Lab' },
  { href: '#cluster-core-physio', label: 'Physiotherapy' },
  { href: '#cluster-house-signatures', label: 'AIWO Sculpt' },
  { href: '#cluster-infusion-bar', label: 'Infusion Bar' },
  { href: '#faq', label: 'FAQs' },
]

// Homepage — v2.0/v3.0 framework, IA-consolidated per the correction pass:
// 4.1/4.2/4.3 use three different visual textures (plain narrative → point-list
// → text+image) instead of three identical WhyItMatters blocks in a row. 4.5
// Gateway Gift stays a distinct early beat; 4.12's two unique sentences are
// folded into 4.11 Access & Booking and 4.14 Final CTA respectively (see the
// implementation report for the exact mapping) rather than existing as a third
// near-duplicate "claim free" section. The 8 Footer policy notes render as a
// compact numbered list, not a second interactive FAQ system — only the real
// 10-item objection map (§6) uses the categorized Faq component.
export function HomePage() {
  const sections = [
    { label: 'The Problem', node: <WhyItMatters key="problem" {...silentProblem} surface={false} /> },
    {
      label: 'All Under One Roof',
      node: (
        <Differentiators
          key="ecosystem"
          id={allUnderOneRoof.id}
          eyebrow={allUnderOneRoof.eyebrow}
          headline={allUnderOneRoof.headline}
          body={allUnderOneRoof.body}
          items={allUnderOneRoof.points}
          surface={true}
        />
      ),
    },
    {
      label: 'Measurement First',
      node: (
        <WhyItMatters
          key="measurement"
          id={measurementFirst.id}
          eyebrow={measurementFirst.eyebrow}
          headline={measurementFirst.headline}
          body={measurementFirst.body}
          image={measurementFirst.image}
          surface={false}
        />
      ),
    },
    { label: 'Service & Programme Router', node: <ServiceCatalogTable key="router" eyebrow="THE FULL CATALOGUE" headline="Every AIWO service at Fairmont Mumbai — nothing skipped." groups={catalogGroups} /> },
    {
      label: 'The Gateway Gift',
      node: (
        <WhyItMatters
          key="gift"
          id={gatewayGift.id}
          eyebrow={gatewayGift.eyebrow}
          headline={gatewayGift.headline}
          body={gatewayGift.body}
          ctaLabel={gatewayGift.ctaLabel}
          ctaHref="#booking-access"
          surface={true}
        />
      ),
    },
    { label: 'The AIWO Method', node: <ProcessSteps key="method" {...aiwoMethod} /> },
    {
      label: "What You'll Feel",
      node: <Differentiators key="feel" id={whatYoullFeel.id} eyebrow={whatYoullFeel.eyebrow} headline={whatYoullFeel.headline} body={whatYoullFeel.body} items={whatYoullFeel.points} image={whatYoullFeel.image} surface={false} />,
    },
    { label: 'Who This Is For', node: <Suitability key="persona" {...whoThisIsFor} /> },
    // Social Proof — every current entry is a development-only placeholder
    // (see src/data/testimonials.ts). Checked here (not just inside
    // Testimonials itself) so a production build never mounts an empty
    // section with a numbered divider over nothing.
    ...(visibleTestimonials(homepageTestimonials).length > 0
      ? [{ label: 'Testimonials', node: <Testimonials key="testimonials" testimonials={homepageTestimonials} /> }]
      : []),
    {
      label: 'Authority',
      node: <WhyItMatters key="authority" id={authority.id} eyebrow={authority.eyebrow} headline={authority.headline} body={authority.body} surface={true} />,
    },
    { label: 'Access & Booking', node: <BookingAccess key="access" {...bookingAccess} /> },
    { label: 'FAQs', node: <Faq key="faq" eyebrow="COMMON QUESTIONS" headline="Everything you're wondering." items={homepageFaq.items} categoryByQuestion={homepageFaq.categoryByQuestion} /> },
    {
      label: 'Final CTA',
      node: (
        <WhyItMatters
          key="final"
          id={finalCta.id}
          eyebrow={finalCta.eyebrow}
          headline={finalCta.headline}
          body={finalCta.body}
          ctaLabel={finalCta.ctaLabel}
          ctaHref="#booking-access"
          surface={false}
        />
      ),
    },
  ]

  return (
    <>
      <Seo title={homepageSeo.title} description={homepageSeo.description} path={homepageSeo.path} />
      <AnnouncementBar text="Restore · Move · Perform · Longevity" ctaLabel={homepageHero.ctaLabel} ctaHref={homepageHero.ctaHref} />
      <Header
        navLinks={NAV_LINKS}
        bookHref="#booking-access"
        ctaHref={homepageHero.ctaHref}
        ctaFullLabel={homepageHero.ctaLabel}
        ctaShortLabel="Book Now"
        mobileCtaLabel={homepageHero.ctaLabel}
      />
      <main id="main-content">
        <Hero hero={homepageHero} segmentChips={heroSegmentChips} />
        {sections.map((section, index) => (
          <Fragment key={section.label}>
            <SectionDivider index={index + 1} total={sections.length} label={section.label} borderTop={index !== 0} />
            {section.node}
          </Fragment>
        ))}

        <div className="container">
          <div className="policy-list-wrap">
            <span className="eyebrow">POLICIES</span>
            <ol className="policy-list">
              {policyNotes.map((note) => (
                <li key={note}>{note}</li>
              ))}
            </ol>
          </div>
        </div>

        <div className="section-disclaimer">
          <div className="container">
            <p className="section-disclaimer__text">{homepageDisclaimer}</p>
          </div>
        </div>
      </main>
      <Footer tagline={footer.tagline} trustItems={footer.trustItems} crossSell={footer.crossSell} addressLines={footer.addressLines} />
      <StickyCta label={stickyCta.label} price={stickyCta.price} ctaLabel={stickyCta.ctaLabel} href="#booking-access" revealThreshold={stickyCta.revealThreshold} />
      <BackToTop />
      <ConversionModal
        sessionKey="mumbai-homepage-conversion-modal-shown"
        eyebrow={homepageHero.eyebrow}
        headline={homepageHero.headline}
        bodyLine={homepageHero.ctaContextLine}
        ctaLabel={homepageHero.ctaLabel}
        ctaHref={homepageHero.ctaHref}
      />
    </>
  )
}
