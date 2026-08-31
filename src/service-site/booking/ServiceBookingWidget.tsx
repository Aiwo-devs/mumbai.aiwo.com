/* eslint-disable @typescript-eslint/no-explicit-any -- the healthportal service
   catalogue shape is not typed in this project; validated at runtime. */
import { useQuery } from '@tanstack/react-query';
import { bookingService } from './bookingService';
import { ServiceBooking } from './ServiceBooking';

// Maps each live service route to the service name used to (a) resolve the real
// service_type_id from the branch catalogue and (b) determine the charge in
// BookingSummary.getServicePrice. Route detection mirrors how the page is
// mounted — one booking widget per service page.
const ROUTE_SERVICE_NAME: { match: string; serviceName: string }[] = [
  { match: '/services/vo2-max', serviceName: 'VO2 Max Test' },
  { match: '/services/rmr', serviceName: 'RMR Test' },
  { match: '/services/posture-screening', serviceName: 'Posture Screening' },
  { match: '/services/ems-sculpting', serviceName: 'EMS Sculpting' },
  { match: '/services/iv-therapy', serviceName: 'IV Therapy' },
];

function resolveServiceName(explicit?: string): string {
  if (explicit) return explicit;
  const path = typeof window !== 'undefined' ? window.location.pathname : '';
  const hit = ROUTE_SERVICE_NAME.find((r) => path.startsWith(r.match));
  return hit ? hit.serviceName : '';
}

// Fuzzy match a catalogue service to the requested service name. Ported verbatim
// from the add-booking BookingRoute resolver — do not change the scoring.
function tokenize(text: string): string[] {
  return text
    .toLowerCase()
    .replace(/[/\-_.,()&]/g, ' ')
    .split(/\s+/)
    .filter(Boolean);
}

function matchScore(query: string, candidateName: string, candidateCode?: string): number {
  const q = query.toLowerCase().trim();
  const n = candidateName.toLowerCase().trim();
  if (q === n) return 1000;
  if (n.includes(q) || q.includes(n)) return 500;

  const qWords = tokenize(query);
  const nWords = tokenize(candidateName);
  let matched = 0;
  for (const qw of qWords) {
    if (nWords.some((nw) => nw.startsWith(qw) || qw.startsWith(nw))) matched++;
  }
  let score = qWords.length > 0 ? (matched / qWords.length) * 100 : 0;

  if (candidateCode) {
    const cWords = tokenize(candidateCode);
    let codeMatched = 0;
    for (const qw of qWords) {
      if (cWords.some((cw) => cw.startsWith(qw) || qw.startsWith(cw))) codeMatched++;
    }
    const codeScore = qWords.length > 0 ? (codeMatched / qWords.length) * 50 : 0;
    score = Math.max(score, codeScore);
  }
  return score;
}

interface ServiceBookingWidgetProps {
  /** Optional explicit service name; defaults to route-based detection. */
  serviceName?: string;
  /** Kept for drop-in compatibility with the previous booking component. */
  isInline?: boolean;
}

export function ServiceBookingWidget({ serviceName: explicitName }: ServiceBookingWidgetProps) {
  const serviceName = resolveServiceName(explicitName);

  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ['booking-services'],
    queryFn: () => bookingService.getServices(),
    staleTime: 5 * 60 * 1000,
  });

  const resolved = (() => {
    if (!serviceName || !data) return null;
    let best: any = null;
    let bestScore = 0;
    for (const s of data) {
      const score = matchScore(serviceName, s.name, s.code);
      if (score > bestScore) {
        bestScore = score;
        best = s;
      }
    }
    // Require at least a 40% word overlap to avoid false positives.
    return best && bestScore >= 40 ? best : null;
  })();

  if (!serviceName) {
    return (
      <div className="service-booking-widget">
        <div className="booking-error">This booking widget is not configured for this page.</div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="service-booking-widget">
        <div className="booking-loading">Loading booking engine...</div>
      </div>
    );
  }

  if (isError || !resolved) {
    return (
      <div className="service-booking-widget">
        <div className="booking-error">
          We couldn't load availability right now. Please try again.
          <div style={{ marginTop: '1rem' }}>
            <button type="button" className="btn-primary form-submit" onClick={() => refetch()}>
              Retry
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <ServiceBooking
      serviceId={resolved.id}
      serviceName={serviceName}
      serviceCode={resolved.code}
      landingPage={typeof window !== 'undefined' ? window.location.pathname : serviceName}
    />
  );
}
