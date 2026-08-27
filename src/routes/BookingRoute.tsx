import { useEffect, useState } from 'react'
import { useSearchParams, useNavigate } from 'react-router-dom'
import { Header } from '../components/Header'
import { Footer } from '../components/Footer'
import { AnnouncementBar } from '../components/AnnouncementBar'
import { ServiceBooking } from '../components/ServiceBooking/ServiceBooking'
import { footer } from '../data/homepage'
import { bookingService } from '../api/bookingService'

import { ivTherapy } from '../data/services/ivTherapy'
import { postureScreening } from '../data/services/postureScreening'
import { rmr } from '../data/services/rmr'
import { emsSculpting } from '../data/services/emsSculpting'
import { vo2Max } from '../data/services/vo2Max'

function getServiceData(serviceName: string) {
  const name = (serviceName || '').toLowerCase()
  if (name.includes('vo2 max')) return vo2Max
  if (name.includes('sculpting')) return emsSculpting
  if (name.includes('posture')) return postureScreening
  if (name.includes('iv iron') || name.includes('mega glow') || name.includes('iv therapy')) return ivTherapy
  if (name.includes('rmr')) return rmr
  return null
}

/**
 * Normalize a string for fuzzy comparison: lowercase, strip punctuation/slashes,
 * collapse whitespace, and return a set of unique words.
 */
function tokenize(text: string): string[] {
  return text
    .toLowerCase()
    .replace(/[\/\-_.,()&]/g, ' ')   // treat punctuation as word separators
    .split(/\s+/)
    .filter(Boolean)
}

/**
 * Score how well `candidate` (an API service name or code) matches `query`
 * (the serviceName from the URL). Higher = better match.
 *
 * Strategy:
 *  1. Exact match (case-insensitive) → 1000
 *  2. One fully contains the other → 500
 *  3. Word-overlap: count how many query words appear (even partially) in the
 *     candidate's word list, weighted by the ratio of matched words.
 */
function matchScore(query: string, candidateName: string, candidateCode?: string): number {
  const q = query.toLowerCase().trim()
  const n = candidateName.toLowerCase().trim()

  // 1. Exact name match
  if (q === n) return 1000

  // 2. Full containment
  if (n.includes(q) || q.includes(n)) return 500

  // 3. Word-overlap scoring
  const qWords = tokenize(query)
  const nWords = tokenize(candidateName)

  let matched = 0
  for (const qw of qWords) {
    // A query word matches if any candidate word starts with it or vice-versa
    // e.g. "rmr" matches "rmrt", "vo2" matches "vo2", "testing" matches "test"
    if (nWords.some(nw => nw.startsWith(qw) || qw.startsWith(nw))) {
      matched++
    }
  }

  let score = qWords.length > 0 ? (matched / qWords.length) * 100 : 0

  // 4. Bonus: check code field (e.g. RMRT_TEST matches "RMR Test")
  if (candidateCode) {
    const cWords = tokenize(candidateCode)
    let codeMatched = 0
    for (const qw of qWords) {
      if (cWords.some(cw => cw.startsWith(qw) || qw.startsWith(cw))) {
        codeMatched++
      }
    }
    const codeScore = qWords.length > 0 ? (codeMatched / qWords.length) * 50 : 0
    score = Math.max(score, codeScore)
  }

  return score
}

export default function BookingRoute() {
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  
  const paramServiceId = searchParams.get('serviceId')
  const serviceName = searchParams.get('serviceName')

  const [serviceId, setServiceId] = useState<string | null>(paramServiceId)
  const [loading, setLoading] = useState(!paramServiceId)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!serviceName) {
      navigate('/')
      return
    }

    if (!paramServiceId) {
      const fetchServiceId = async () => {
        try {
          const services = await bookingService.getServices()

          // Score every service and pick the best match
          let bestService: any = null
          let bestScore = 0

          for (const s of services) {
            const score = matchScore(serviceName, s.name, s.code)
            if (score > bestScore) {
              bestScore = score
              bestService = s
            }
          }

          // Require at least a 40% word overlap to avoid false positives
          if (bestService && bestScore >= 40) {
            setServiceId(bestService.id)
          } else {
            setError('Service not found in the booking system.')
          }
        } catch (err: any) {
          setError('Failed to load services.')
        } finally {
          setLoading(false)
        }
      }
      fetchServiceId()
    } else {
      setServiceId(paramServiceId)
      setLoading(false)
    }
  }, [paramServiceId, serviceName, navigate])

  if (!serviceName) {
    return null // Redirects
  }

  const serviceData = getServiceData(serviceName)

  return (
    <>
      <AnnouncementBar
        text="Restore · Move · Perform · Longevity"
        ctaLabel={serviceData ? serviceData.hero.ctaLabel : "Book Consultation"}
        ctaHref={serviceData ? serviceData.hero.ctaHref : "/"}
      />
      <Header
        navLinks={serviceData ? serviceData.navLinks : []}
        bookHref="#main-content"
        ctaHref={serviceData ? serviceData.hero.ctaHref : "/"}
        ctaFullLabel={serviceData ? serviceData.hero.ctaLabel : "Book Now"}
        ctaShortLabel="Book Now"
        mobileCtaLabel={serviceData ? serviceData.hero.ctaLabel : "Book Now"}
      />
      
      <main id="main-content" style={{ padding: '6rem 1rem 4rem', minHeight: '80vh', backgroundColor: 'var(--background)' }}>
        <div className="container">
          <h1 className="section-heading" style={{ textAlign: 'center', marginBottom: '2rem' }}>Book Your Session</h1>
          
          {loading && <div style={{ textAlign: 'center', padding: '2rem' }}>Loading booking engine...</div>}
          {error && <div style={{ textAlign: 'center', padding: '2rem', color: 'red' }}>{error}</div>}
          
          {!loading && !error && serviceId && (
            <ServiceBooking serviceId={serviceId} serviceName={serviceName} />
          )}
        </div>
      </main>

      <Footer 
        tagline={footer.tagline} 
        trustItems={footer.trustItems} 
        crossSell={footer.crossSell} 
        addressLines={footer.addressLines} 
      />
    </>
  )
}
