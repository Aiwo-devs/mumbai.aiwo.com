/**
 * BOOKING/API INTEGRATION POINT — ported UI only, not live for Mumbai yet.
 *
 * On submit this form calls a real backend flow: fetch available slots,
 * register/find a patient account, book the appointment, then (on success)
 * redirect to a Razorpay checkout URL. All of it goes through BASE_API/AUTH_API
 * below, which on any non-production hostname (this review deploy included)
 * route through /.netlify/functions/booking-api-proxy and auth-api-proxy —
 * neither of which is deployed on this Mumbai site. Every call therefore
 * fails closed (caught, shown as a normal user-facing error message) rather
 * than faking success or reaching a live backend/Razorpay. Wiring this up to
 * Mumbai's real backend is the next phase, not this port.
 */
/* eslint-disable @typescript-eslint/no-explicit-any -- response shapes for this
   not-yet-integrated backend aren't typed anywhere in this project; real types
   land with the booking/API integration phase referenced above. */
import { useState, useEffect, useRef } from "react";
import { useQuery } from "@tanstack/react-query";
import { Reveal } from "@/components/Reveal";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { format, addDays } from "date-fns";
import { Loader2, AlertCircle } from "lucide-react";
import { trackMeta, getFbCookies } from "@/lib/meta";
import { captureBookingLead, markBookingApiFailed, markBookingPaymentInitiated, type BookingLeadInput } from "@/lib/bookingSheet";
import { capturePostHogEvent } from "@/lib/posthog";

declare global {
  interface Window {
    gtag?: (...args: any[]) => void;
  }
}

// PORT NOTE: the source project's real Meta Pixel / Google Ads IDs were here
// — left blank rather than carried over, since those belong to a different
// product/account. trackMeta()/gtag() both already no-op when these are
// falsy/absent, so this is safe as-is; fill in AIWO's own IDs when this
// booking flow is actually wired up for Mumbai.
const META_PIXEL_ID = '';
const GOOGLE_ADS_CONVERSION_SEND_TO = '';
// Gates production-only behavior (Google Ads conversion firing, TEST vs
// PRODUCTION lead environment). Mumbai's own eventual production domain —
// on any other host (including this review deploy) these stay gated off.
const GOOGLE_ADS_PRODUCTION_HOSTNAME = 'mumbai.aiwo.com';

// Per-funnel display name + advertised price, used for Meta browser events
// (ViewContent / Lead). The actual charged amount for the order and the
// server-side Purchase use the real captured amount from Razorpay.
// Trimmed to the 5 services Mumbai is actually launching — the source
// project's other funnels (sleep, dexa, bodyIntel, skinAnalysis, omegaIndex)
// don't have routes here. Amounts are tracking-metadata labels only (see
// comment above), not live pricing — real per-service Mumbai pricing is
// wired up in the booking/API integration phase, not this port.
// Single authoritative Mumbai service config (display name + charge amount, INR).
// `amount` IS the value sent to InsertAppointmentWithPayment (the actual charge),
// so it must equal the price shown on each page. These match the developer's
// backend-tested Mumbai amounts (add-booking BookingSummary.getServicePrice):
// RMR ₹4,999 (explicit override), VO2 ₹7,999 and AIWO Sculpt ₹3,500 (Fairmont
// brochure), Posture ₹4,999 (the paid "Posture Screening & Correction" service
// this route represents — see homepage catalogue mapping), IV ₹14,999 (base
// infusion; the IV page is multi-option so its displayed price vs this base
// charge is flagged for product review in the integration report).
const ROUTE_META: Record<string, { name: string; amount: number }> = {
  posture: { name: 'Posture Screening', amount: 4999 },
  rmr: { name: 'RMR Test', amount: 4999 },
  vo2: { name: 'VO2 Max Test', amount: 7999 },
  sculpt: { name: 'AIWO Sculpt', amount: 3500 },
  ivTherapy: { name: 'IV Therapy Consultation', amount: 14999 },
};

const isProductionHost = typeof window !== 'undefined' && window.location.hostname === GOOGLE_ADS_PRODUCTION_HOSTNAME;

// Mumbai branch scoping, ported from add-booking (src/api/bookingService.ts).
// These identify the AIWO Mumbai (Fairmont) branch to the healthportal backend so
// service/slot/appointment calls resolve to Mumbai — NOT a default/other branch.
// Not secrets (public branch identifiers; the developer committed them plainly).
export const BRANCH_ID = 'b0a11c00-0000-4000-8000-000000000002';
export const BRANCH_CODE = 'MUM';

// URL resolution: prefer the add-booking env-var config (VITE_API_BASE_URL /
// VITE_AUTH_BASE_URL) when provided — that's the developer's Mumbai backend wiring.
// When unset, fall back to this port's same-origin strategy: real /api|/auth-api on
// the production host, else undeployed Netlify Function proxies that fail closed
// (caught → user-facing error, never a fake success or a live/wrong-branch call).
// Any real backend host / key stays in these env vars, never in committed source.
const ENV_API = import.meta.env.VITE_API_BASE_URL as string | undefined;
const ENV_AUTH = import.meta.env.VITE_AUTH_BASE_URL as string | undefined;
const BASE_API = ENV_API || (isProductionHost ? '/api' : '/.netlify/functions/booking-api-proxy');
const AUTH_API = ENV_AUTH || (isProductionHost ? '/auth-api' : '/.netlify/functions/auth-api-proxy');

const normalizeServiceCode = (code?: string) =>
  String(code ?? "").replace(/\s+/g, "").toUpperCase();

const ALLOWED_SERVICES = [
  "pap smear", "daily routine exercise by physio", "physiotheraphy", "diet counselling",
  "general physician doctor consultation", "psycological councelling", "psychological assessment",
  "iv therapy with vitamins", "hyperbaric oxygen therapy", "cosmetology", "dental",
  "massage therapy", "yoga session", "sauna", "foot reflexology", "egoscue tower",
  "sleep study", "easy flexibility", "stability dance", "4x4 norwegian run", "zone-2 training",
  "vo2 max test/ rmrt test", "ultra scound", "ct", "tmt", "echo", "ecg", "chest x ray",
  "mri", "gym", "daily routine", "stretching", "pilates", "aiwosculpt- abdomen and pfms",
  "myofascial release(mfr)", "posture block", "cerivical flexibility", "foot stability",
  "tibialis raise", "dexa scan", "posture screening", "posture screening and correction(mfr)", "physical assessment",
  "epigenetic age test", "cold adaptation", "breathing theraphy", "biological age test",
  "gene test", "gut microbiome test", "food intolerance", "amino acids", "aiwo 181", "rmr test", "vo2 max test",
  "facial analysis", "omega-3 index test"
];

function generatePassword() {
  const chars = 'abcdefghijklmnopqrstuvwxyz';
  const specials = '!@#$%^&*';
  return `A${chars[Math.floor(Math.random() * chars.length)]}wo${specials[Math.floor(Math.random() * specials.length)]}20${Math.floor(Math.random() * 1000).toString().padStart(3, '0')}`;
}

export function BookingForm({ isInline = false }: { isInline?: boolean }) {
  const [step, setStep] = useState(1);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isBooking, setIsBooking] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [confirmedRef, setConfirmedRef] = useState("");
  const [routeType, setRouteType] = useState<"posture" | "rmr" | "vo2" | "sculpt" | "ivTherapy" | "none">("none");

  const { data: servicesData, isLoading: isServicesLoading, isError: isServicesError, refetch: refetchServices } = useQuery({
    queryKey: ['service-types'],
    queryFn: async () => {
      const res = await fetch(`${BASE_API}/doctor/service-types/list?pageNo=1&pagesize=100&pagination_required=false&search=&branch_code=${BRANCH_CODE}`, {
        headers: { 'Content-Type': 'application/json', 'x-application-name': 'healthportal' }
      });
      if (!res.ok) {
        throw new Error(`Service API failed with status ${res.status}`);
      }
      const json = await res.json();
      const servicesArray = json.data || [];
      const rawSculptMatch = servicesArray.find((s: any) =>
        normalizeServiceCode(s.code) === "AIWO_SCULPT_CONSULTATION"
      );
      const sculptNoResources = !!(rawSculptMatch && (!rawSculptMatch.ServiceResourceAssignments || rawSculptMatch.ServiceResourceAssignments.length === 0));
      return {
        items: servicesArray.filter((s: any) => {
          const isAllowed = ALLOWED_SERVICES.includes(s.name.toLowerCase().trim())
            || normalizeServiceCode(s.code) === "AIWO_SCULPT_CONSULTATION";
          return isAllowed && !s.is_third_party && s.ServiceResourceAssignments?.length > 0;
        }),
        sculptNoResources,
      };
    }
  });

  const services = servicesData?.items;
  const sculptNoResources = servicesData?.sculptNoResources ?? false;

  const [formData, setFormData] = useState({
    date: "",
    timeSlot: "",
    firstName: "",
    lastName: "",
    whatsapp: "",
    age: "",
    goals: [] as string[]
  });

  const [minDate, setMinDate] = useState("");

  // Matched against Mumbai's exact 5 live routes (not the source project's
  // fuzzy endsWith/includes matching against its own 10 routes, two of which
  // — /vo2 and /sculpt — would never have matched Mumbai's actual
  // /services/vo2-max and /services/ems-sculpting paths at all).
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const path = window.location.pathname.replace(/\/$/, '').toLowerCase();
      if (path === '/services/posture-screening') {
        // eslint-disable-next-line react-hooks/set-state-in-effect -- derived from window.location, not available during render
        setRouteType("posture");
      } else if (path === '/services/rmr') {
        setRouteType("rmr");
      } else if (path === '/services/vo2-max') {
        setRouteType("vo2");
      } else if (path === '/services/ems-sculpting') {
        setRouteType("sculpt");
      } else if (path === '/services/iv-therapy') {
        setRouteType("ivTherapy");
      }
    }
  }, []);

  // Meta Pixel: ViewContent once the funnel is known (one per page view).
  const viewContentFired = useRef(false);
  useEffect(() => {
    if (viewContentFired.current) return;
    const rm = ROUTE_META[routeType];
    if (!rm) return;
    viewContentFired.current = true;
    trackMeta('ViewContent', {
      content_name: rm.name,
      content_category: routeType,
      value: rm.amount,
      currency: 'INR',
    });
    // PostHog: booking form opened (mirrors ViewContent's timing, not its data).
    capturePostHogEvent('booking_form_opened', {
      route_type: routeType,
      service_name: rm.name,
    });
  }, [routeType]);

  useEffect(() => {
    if (services && services.length > 0) {
      if (routeType === "posture") {
        const s = services.find((s: any) => s.name.toLowerCase().includes('posture screening'));
        // eslint-disable-next-line react-hooks/set-state-in-effect -- preselects the goal once the async service list resolves, not derivable during render
        if (s) setFormData(prev => ({ ...prev, goals: [s.id] }));
      } else if (routeType === "rmr") {
        const s = services.find((s: any) => s.name.toLowerCase().includes('rmr') && !s.name.toLowerCase().includes('vo2'));
        if (s) setFormData(prev => ({ ...prev, goals: [s.id] }));
      } else if (routeType === "vo2") {
        const s = services.find((s: any) => s.name.toLowerCase().includes('vo2'));
        if (s) setFormData(prev => ({ ...prev, goals: [s.id] }));
      } else if (routeType === "sculpt") {
        const s = services.find((s: any) => normalizeServiceCode(s.code) === "AIWO_SCULPT_CONSULTATION");
        if (s) setFormData(prev => ({ ...prev, goals: [s.id] }));
      } else if (routeType === "ivTherapy") {
        const s = services.find((s: any) => s.name.toLowerCase().includes('iv therapy'));
        if (s) setFormData(prev => ({ ...prev, goals: [s.id] }));
      }
    }
  }, [routeType, services]);

  useEffect(() => {
    const tomorrow = addDays(new Date(), 1);
    // eslint-disable-next-line react-hooks/set-state-in-effect -- defaults the date picker to tomorrow once on mount; Date() during render would risk an SSR/CSR mismatch
    setMinDate(format(tomorrow, "yyyy-MM-dd"));
    setFormData(prev => ({ ...prev, date: format(tomorrow, "yyyy-MM-dd") }));
  }, []);

  const handleNext = () => {
    if (step === 1 && formData.date && formData.timeSlot) {
      setStep(2);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.goals.length || !formData.date || !formData.timeSlot) return;

    const customerName = `${formData.firstName} ${formData.lastName}`.trim();
    let formattedPhone = formData.whatsapp.trim();
    if (!formattedPhone.startsWith('+91')) formattedPhone = '+91' + formattedPhone.replace(/^\+?91/, '');
    const username = (formData.firstName + formData.lastName).toLowerCase().replace(/[^a-z0-9]/g, '') + Math.floor(Math.random() * 1000);
    const generatedPassword = generatePassword();
    const today = new Date().toISOString().split('T')[0];
    const dummyEmail = `${username}@aiwowellness.com`;
    const serviceName = formData.goals
      .map(gId => services?.find((s: any) => s.id === gId)?.name)
      .filter(Boolean)
      .join(', ') || ROUTE_META[routeType]?.name || '';
    const bookingSheetEnvironment: 'PRODUCTION' | 'TEST' =
      typeof window !== 'undefined' && window.location.hostname === GOOGLE_ADS_PRODUCTION_HOSTNAME ? 'PRODUCTION' : 'TEST';

    // ── Google Sheet: one safe lead payload for this attempt, reused by every capture/update call ──
    const leadInput: BookingLeadInput = {
      customerName,
      phone: formattedPhone,
      email: dummyEmail,
      age: formData.age,
      landingPage: routeType,
      serviceName,
      serviceCode: services?.find((s: any) => s.id === formData.goals[0])?.code,
      serviceId: formData.goals[0],
      appointmentDate: formData.date,
      preferredTime: formData.timeSlot,
      environment: bookingSheetEnvironment,
    };

    // ── Google Sheet: capture the lead immediately on a valid submit, before payment starts ──
    const leadReference = captureBookingLead(leadInput);

    // PostHog: Confirm Booking clicked (fires alongside lead capture, before the API call).
    capturePostHogEvent('booking_confirm_clicked', {
      route_type: routeType,
      service_name: serviceName,
      environment: bookingSheetEnvironment,
    });

    setIsBooking(true);
    setErrorMsg("");

    try {
      // 1. Fetch slots for all selected services
      const slotPromises = formData.goals.map(async (gId) => {
        const res = await fetch(`${BASE_API}/doctor/availability/service-available-slots?service_type_id=${gId}&date=${formData.date}`, {
          headers: { 'Content-Type': 'application/json', 'x-application-name': 'healthportal' }
        });
        const data = await res.json();
        const slots = data.slots || [];
        return { gId, slots: slots.map((s: any) => ({ ...s, service_id: gId })) };
      });

      const serviceSlotsData = await Promise.all(slotPromises);
      const [prefStartH, prefEndH] = formData.timeSlot.split('-'); // e.g., "8-10"

      const servicesReqs = serviceSlotsData.map(ssd => {
        const reqTypes = Array.from(new Set(ssd.slots.map((s: any) => s.resource_type))).filter(Boolean) as string[];
        const slotsByTime: Record<string, { startTime: string, endTime: string, slotsByReq: Record<string, any[]> }> = {};
        ssd.slots.forEach((slot: any) => {
          const key = slot.start_time;
          if (!slotsByTime[key]) {
            slotsByTime[key] = { startTime: slot.start_time, endTime: slot.end_time, slotsByReq: {} };
          }
          const rt = slot.resource_type || 'Unknown';
          if (!slotsByTime[key].slotsByReq[rt]) slotsByTime[key].slotsByReq[rt] = [];
          slotsByTime[key].slotsByReq[rt].push(slot);
        });
        return { gId: ssd.gId, reqTypes, slotsByTime };
      });

      const firstServiceReqs = servicesReqs[0];
      let possibleStartTimes = Object.keys(firstServiceReqs.slotsByTime).sort();

      possibleStartTimes = possibleStartTimes.filter(st => {
        const hour = parseInt(st.split(':')[0], 10);
        return hour >= parseInt(prefStartH, 10) && hour < parseInt(prefEndH, 10);
      });

      let chosenSequence: any[] = [];
      for (const st of possibleStartTimes) {
        let currentStartTime = st;
        const currentSequence: any[] = [];
        let sequenceValid = true;

        for (let i = 0; i < servicesReqs.length; i++) {
          const sReq = servicesReqs[i];
          const timeGroup = sReq.slotsByTime[currentStartTime];

          if (!timeGroup) {
            sequenceValid = false;
            break;
          }

          let serviceValid = true;
          const selectedForService: any[] = [];

          for (const rt of sReq.reqTypes) {
            const availableSlot = timeGroup.slotsByReq[rt]?.find((s: any) => s.available && !s.booked);
            if (availableSlot) {
              selectedForService.push(availableSlot);
            } else {
              serviceValid = false;
              break;
            }
          }

          if (!serviceValid) {
            sequenceValid = false;
            break;
          }

          currentSequence.push(...selectedForService);
          currentStartTime = timeGroup.endTime; // next service starts when this one ends
        }

        if (sequenceValid) {
          chosenSequence = currentSequence;
          break;
        }
      }

      if (chosenSequence.length === 0) {
        throw new Error(`No available consecutive slots found for your time preference (${formData.timeSlot}). Please try another date or time.`);
      }

      const selectedSlots = chosenSequence;

      // 2. Register User
      const registerRes = await fetch(`${AUTH_API}/public/register/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'x-application-name': 'healthportal' },
        body: JSON.stringify({
          username, email: dummyEmail,
          first_name: formData.firstName, last_name: formData.lastName,
          country_code: '90', phone_number: formattedPhone, gender: 'male',
          family_member: false, referred_by: '', dob: today,
          height: '', weight: '', address_line1: '', city: '', postal_code: '',
          password: generatedPassword, password2: generatedPassword, groups: ['customer']
        })
      });
      const registerData = await registerRes.json();

      let patientId: string | null = null;

      if (!registerData.success) {
        // Check if it's a phone-already-exists error with an encrypted_user_id we can resolve
        const isPhoneDuplicate =
          registerData.error === 'validation_error' &&
          registerData.errors?.phone_number &&
          String(registerData.errors.phone_number).toLowerCase().includes('already exists') &&
          registerData.encrypted_user_id;

        if (isPhoneDuplicate) {
          // Step A: decrypt the encrypted_user_id to get the numeric user_id
          const decryptRes = await fetch(`${BASE_API}/user/user-id-crypto/encrypt`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'x-application-name': 'healthportal' },
            body: JSON.stringify({ user_id: registerData.encrypted_user_id })
          });
          const decryptData = await decryptRes.json();
          if (!decryptData.success || !decryptData.user_id) {
            throw new Error('User already registered but could not retrieve account. Please contact support.');
          }
          const resolvedUserId = decryptData.user_id;

          // Step B: fetch existing patient record by user_id
          const patientRes = await fetch(`${BASE_API}/doctor/patient/GetPatientsByUserId/${resolvedUserId}`, {
            headers: { 'Content-Type': 'application/json', 'x-application-name': 'healthportal' }
          });
          const patientData = await patientRes.json();
          const existingPatient = patientData?.patients?.[0];
          if (existingPatient?.id) {
            // Patient record already exists — use it directly
            patientId = existingPatient.id;
          } else {
            // User exists but has no patient record yet — create one via webhook
            const webhookRes = await fetch(`${BASE_API}/doctor/webhooks/user-created`, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json', 'x-application-name': 'healthportal' },
              body: JSON.stringify({
                user_id: resolvedUserId, email: dummyEmail, first_name: formData.firstName, last_name: formData.lastName,
                username, password: generatedPassword, phone_number: formattedPhone,
                referred_by: '', gender: 'male', address_line1: '', city: '', postal_code: '', user_type: 2,
                branch_id: BRANCH_ID
              })
            });
            const webhookData = await webhookRes.json();
            patientId = webhookData?.data?.patient_id;
            if (!patientId) throw new Error('User already registered but could not create patient record. Please contact support.');
          }
        } else {
          // Other registration errors — surface them
          if (registerData.error === 'validation_error' && registerData.errors) {
            const errorMsgs = Object.values(registerData.errors).flat().join(' ');
            throw new Error(errorMsgs || registerData.message || 'Registration failed');
          }
          throw new Error(registerData.message || 'Registration failed');
        }
      }

      // New user path: create patient via webhook
      if (!patientId) {
        const userId = registerData.data?.user?.id;

        // 3. Webhook Patient Creation
        const webhookRes = await fetch(`${BASE_API}/doctor/webhooks/user-created`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', 'x-application-name': 'healthportal' },
          body: JSON.stringify({
            user_id: userId, email: dummyEmail, first_name: formData.firstName, last_name: formData.lastName,
            username, password: generatedPassword, phone_number: formattedPhone,
            referred_by: '', gender: 'male', address_line1: '', city: '', postal_code: '', user_type: 2,
            branch_id: BRANCH_ID
          })
        });
        const webhookData = await webhookRes.json();
        patientId = webhookData?.data?.patient_id;
        if (!patientId) throw new Error("Failed to create patient record");
      }

      // 4. Book Appointment
      const sorted = [...selectedSlots].sort((a, b) => a.start_time.localeCompare(b.start_time));
      const startTime = sorted[0].start_time;
      const endTime = sorted[sorted.length - 1].end_time;

      const servicesPayload = formData.goals.map((gId, index) => {
        const serviceSlots = selectedSlots.filter(s => s.service_id === gId);
        const resourceMap = new Map<string, string[]>();

        serviceSlots.forEach(s => {
          if (!s.resource_id) return;
          if (!resourceMap.has(s.resource_id)) resourceMap.set(s.resource_id, []);
          resourceMap.get(s.resource_id)!.push(s.slot_id);
        });

        const resourcesPayload = Array.from(resourceMap.entries()).map(([resId, slotIds]) => ({
          resource_id: resId,
          resource_slot_ids: slotIds
        }));

        return {
          service_type_id: gId,
          sequence_order: index,
          resources: resourcesPayload
        };
      });

      // Charge amount = the authoritative Mumbai price from ROUTE_META (single
      // source of truth; must match the price shown on the page). For the generic
      // services picker (routeType "none", homepage) map by the fetched service
      // name to the same Mumbai values.
      let amount = ROUTE_META[routeType]?.amount ?? 0;
      if (routeType === "none") {
        const selectedServiceObj = services?.find((s: any) => s.id === formData.goals[0]);
        if (selectedServiceObj) {
          const sName = selectedServiceObj.name.toLowerCase();
          if (sName.includes('vo2')) amount = 7999;
          else if (sName.includes('rmr')) amount = 4999;      // explicit override
          else if (sName.includes('sculpt')) amount = 3500;
          else if (sName.includes('posture')) amount = 4999;
          else if (sName.includes('iv') || sName.includes('infusion')) amount = 14999;
        }
      }

      // Format date for notes (DD-MM-YYYY)
      const [yr, mo, dy] = formData.date.split('-');
      const formattedDate = `${dy}-${mo}-${yr}`;

      const payload = {
        amount,
        customer_name: customerName,
        customer_email: dummyEmail,
        customer_phone: formattedPhone,
        // Razorpay order notes (backend forwards these via order-create). Carries
        // finance/reconciliation fields + Meta scoping/match data (pixel id, fbp/fbc,
        // source) for the server-side Purchase (CAPI dedupes via event_id=purchase_<orderId>).
        notes: {
          customer_name: customerName,
          customer_email: dummyEmail,
          customer_phone: formattedPhone,
          service_name: serviceName,
          date: formattedDate,
          source: routeType === "sculpt" ? 'AIWO Sculpt - Landing Page' : routeType === "ivTherapy" ? 'AIWO IV Therapy - Landing Page' : routeType === "rmr" ? 'AIWO RMR Test - Landing Page' : routeType === "vo2" ? 'AIWO VO2 Max Test - Landing Page' : routeType === "posture" ? 'AIWO Posture Screening - Landing Page' : 'AIWO Mumbai Website payment',
          meta_pixel_id: META_PIXEL_ID,
          meta_event_source_url: typeof window !== 'undefined' ? window.location.href : '',
          ...getFbCookies(),
        },
        patient_id: patientId,
        date: formData.date,
        start_time: startTime,
        end_time: endTime,
        slot_id: sorted.map(s => s.slot_id),
        doctor_id: '',
        service_id: formData.goals[0],
        service_name: serviceName,
        services: servicesPayload,
        service_type_id: formData.goals[0],
        service_type_ids: formData.goals,
        resource_slot_ids: sorted.map(s => s.slot_id),
        booking_source: (routeType === "sculpt" || routeType === "ivTherapy") ? "online" : 'walk_in',
        // Mumbai branch scoping + appointment metadata, ported from add-booking
        // (BookingSummary appointment payload) so the appointment lands in the
        // Mumbai (Fairmont) branch and matches the developer's tested contract.
        branch_id: BRANCH_ID,
        appointment_type: 1,
        consustant_type: (routeType === "sculpt" || routeType === "ivTherapy") ? 2 : 1,
        redirect_url: typeof window !== 'undefined' ? window.location.origin + window.location.pathname : '',
      };

      const res = await fetch(`${BASE_API}/appointment/appointments/InsertAppointmentWithPayment`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'x-application-name': 'healthportal' },
        body: JSON.stringify(payload)
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok || !data.success) {
        throw new Error(data?.message || 'Booking failed');
      }

      // PostHog: booking API call succeeded.
      capturePostHogEvent('booking_api_success', {
        route_type: routeType,
        service_name: serviceName,
        amount,
        currency: 'INR',
        environment: bookingSheetEnvironment,
      });

      // ── Google Sheet: mark the lead as payment-initiated, fire-and-forget ──
      if (data.order_id) {
        markBookingPaymentInitiated(leadReference, leadInput, data.order_id);
      }

      // ── Google Ads: booking-initiated conversion (production host only, fire-and-forget) ──
      if (data.order_id && window.location.hostname === GOOGLE_ADS_PRODUCTION_HOSTNAME) {
        try {
          if (typeof window.gtag === 'function') {
            window.gtag('event', 'conversion', {
              send_to: GOOGLE_ADS_CONVERSION_SEND_TO,
            });
          }
        } catch {
          /* analytics must never block booking or the redirect */
        }
      }

      // ── Meta Pixel: CompleteRegistration — booking form completed, payment order confirmed ──
      trackMeta('CompleteRegistration', {
        content_name: serviceName,
        content_category: routeType,
        value: amount,
        currency: 'INR',
        status: true,
        num_items: formData.goals.length,
      });

      if (data.checkout_url) {
        // PostHog: Razorpay checkout is about to open (redirect below is unchanged).
        capturePostHogEvent('razorpay_checkout_opened', {
          route_type: routeType,
          service_name: serviceName,
          amount,
          currency: 'INR',
          environment: bookingSheetEnvironment,
        });
        // Persist purchase context so PaymentSuccess can send a complete Purchase event
        localStorage.setItem('aiwo_purchase_meta', JSON.stringify({
          amount,
          serviceName,
          routeType,
          ts: Date.now(),
        }));
        // Add a short delay so tracking pixels (Meta, etc.) have time to fire their network requests before the page unloads
        setTimeout(() => {
          window.location.href = data.checkout_url;
        }, 500);
        return; // Prevent showing local success state since we are redirecting
      }

      setConfirmedRef(`DX-${Math.floor(Math.random() * 9000) + 1000}`);
      setIsSuccess(true);
    } catch (err: any) {
      // ── Google Sheet: mark the lead as failed, fire-and-forget ──
      markBookingApiFailed(leadReference, leadInput);
      // PostHog: booking API call failed.
      capturePostHogEvent('booking_api_failed', {
        route_type: routeType,
        service_name: serviceName,
        environment: bookingSheetEnvironment,
      });
      setErrorMsg(err.message || 'An error occurred during booking.');
    } finally {
      setIsBooking(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const sculptServiceFound = !!(services?.find((s: any) =>
    normalizeServiceCode(s.code) === "AIWO_SCULPT_CONSULTATION"
  ));

  const sculptStatus: 'idle' | 'loading' | 'error' | 'no_resources' | 'not_found' | 'ok' =
    routeType !== 'sculpt' ? 'idle'
    : isServicesLoading ? 'loading'
    : isServicesError ? 'error'
    : sculptNoResources ? 'no_resources'
    : !sculptServiceFound ? 'not_found'
    : 'ok';

  const formContent = (
    <div className="bg-white text-black border border-border p-8 md:p-12 relative overflow-hidden h-full">
      <div className="absolute top-0 left-0 w-full h-1 bg-secondary">
        <div
          className="h-full bg-primary transition-all duration-500 ease-out"
          style={{ width: isSuccess ? '100%' : step === 1 ? '50%' : '100%' }}
        ></div>
      </div>

      {isSuccess ? (
        <div className="text-center py-12">
          <div className="font-mono text-sm font-bold text-primary mb-6">STATUS: CONFIRMED</div>
          <h3 className="font-serif text-3xl text-foreground mb-4">Intake Complete</h3>
          <p className="text-muted-foreground max-w-md mx-auto mb-8">
            Your appointment request has been logged. Our clinical team will send a WhatsApp message within 30 minutes to finalize your slot.
          </p>
          <div className="inline-block border border-border px-4 py-2 font-mono text-xs text-muted-foreground">
            REF: {confirmedRef}
          </div>
        </div>
      ) : (
        <>
          <div className="flex justify-between items-center mb-8 pb-4 border-b border-border font-mono text-xs font-bold uppercase">
            <span className={step === 1 ? "text-primary" : "text-muted-foreground"}>01. Time & Date</span>
            <span className={step === 2 ? "text-primary" : "text-muted-foreground"}>02. Patient Data</span>
          </div>

          {step === 1 && (
            <div className="space-y-8 animate-in fade-in">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <Label className="font-mono text-xs text-muted-foreground uppercase">Date Selection</Label>
                  <Input
                    type="date"
                    name="date"
                    min={minDate}
                    value={formData.date}
                    onChange={handleInputChange}
                    className="rounded-none border-border h-12 font-sans relative pr-10 [&::-webkit-calendar-picker-indicator]:absolute [&::-webkit-calendar-picker-indicator]:right-3 [&::-webkit-calendar-picker-indicator]:top-1/2 [&::-webkit-calendar-picker-indicator]:-translate-y-1/2 [&::-webkit-calendar-picker-indicator]:m-0 [&::-webkit-calendar-picker-indicator]:cursor-pointer"
                  />
                </div>
                <div className="space-y-3">
                  <Label className="font-mono text-xs text-muted-foreground uppercase">Time Preference</Label>
                  <Select
                    value={formData.timeSlot}
                    onValueChange={(val) => setFormData(prev => ({ ...prev, timeSlot: val }))}
                  >
                    <SelectTrigger className="rounded-none border-border h-12">
                      <SelectValue placeholder="Select available window" />
                    </SelectTrigger>
                    <SelectContent className="rounded-none border-border">
                      <SelectItem value="8-10">08:00 - 10:00 (Morning)</SelectItem>
                      <SelectItem value="10-13">10:00 - 13:00 (Mid-day)</SelectItem>
                      <SelectItem value="13-16">13:00 - 16:00 (Afternoon)</SelectItem>
                      <SelectItem value="16-19">16:00 - 19:00 (Evening)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <Button
                onClick={handleNext}
                disabled={!formData.date || !formData.timeSlot}
                className="w-full bg-foreground hover:bg-foreground/90 text-white rounded-none h-14"
              >
                Proceed to Details
              </Button>
            </div>
          )}

          {step === 2 && (
            <form onSubmit={handleSubmit} className="space-y-8 animate-in fade-in">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <Label className="font-mono text-xs text-muted-foreground uppercase">First Name</Label>
                  <Input
                    required
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    className="rounded-none border-border h-12"
                  />
                </div>
                <div className="space-y-3">
                  <Label className="font-mono text-xs text-muted-foreground uppercase">Last Name</Label>
                  <Input
                    required
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    className="rounded-none border-border h-12"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <Label className="font-mono text-xs text-muted-foreground uppercase">WhatsApp / Contact</Label>
                  <Input
                    required
                    type="tel"
                    name="whatsapp"
                    value={formData.whatsapp}
                    onChange={handleInputChange}
                    placeholder="+91"
                    className="rounded-none border-border h-12"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-3">
                    <Label className="font-mono text-xs text-muted-foreground uppercase">Age</Label>
                    <Input
                      required
                      type="number"
                      name="age"
                      min="18"
                      max="100"
                      value={formData.age}
                      onChange={handleInputChange}
                      className="rounded-none border-border h-12"
                    />
                  </div>
                  <div className="space-y-3">
                    <Label className="font-mono text-xs text-muted-foreground uppercase">Service</Label>
                    {routeType !== "none" ? (
                      <div className="rounded-none border border-border h-12 bg-muted/50 flex items-center px-3 text-sm text-foreground overflow-hidden whitespace-nowrap text-ellipsis">
                        {routeType === "posture"
                          ? "Posture Screening"
                          : routeType === "rmr"
                            ? "RMR Test"
                            : routeType === "vo2"
                              ? "VO2 Max Test"
                              : routeType === "sculpt"
                                ? "AIWO Sculpt"
                                : routeType === "ivTherapy"
                                  ? "IV Therapy Consultation"
                                  : ""}
                      </div>
                    ) : (
                      <Select
                        value={formData.goals[0] || ""}
                        onValueChange={(val) => setFormData(prev => ({ ...prev, goals: [val] }))}
                        required
                      >
                        <SelectTrigger className="rounded-none border-border h-12">
                          <SelectValue placeholder={isServicesLoading ? "Loading services..." : "Select a service"} />
                        </SelectTrigger>
                        <SelectContent className="rounded-none border-border">
                          {services?.map((service: any) => (
                            <SelectItem key={service.id} value={service.id}>
                              {service.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    )}
                  </div>
                </div>
              </div>

              {routeType === 'sculpt' && sculptStatus !== 'idle' && sculptStatus !== 'ok' && (
                <div
                  role={sculptStatus === 'loading' ? 'status' : 'alert'}
                  className={`flex items-start gap-2 p-3 border rounded text-sm ${
                    sculptStatus === 'loading'
                      ? 'text-muted-foreground bg-muted/50 border-border'
                      : sculptStatus === 'no_resources'
                        ? 'text-amber-700 bg-amber-50 border-amber-200'
                        : 'text-destructive bg-destructive/10 border-destructive/20'
                  }`}
                >
                  {sculptStatus === 'loading' ? (
                    <>
                      <Loader2 className="w-4 h-4 mt-0.5 shrink-0 animate-spin" />
                      Loading consultation availability…
                    </>
                  ) : sculptStatus === 'error' ? (
                    <>
                      <AlertCircle className="w-4 h-4 mt-0.5 shrink-0" />
                      <span>
                        We couldn't load consultation availability. Please try again.{' '}
                        <button
                          type="button"
                          onClick={() => refetchServices()}
                          className="underline font-medium hover:no-underline"
                        >
                          Retry
                        </button>
                      </span>
                    </>
                  ) : sculptStatus === 'not_found' ? (
                    <>
                      <AlertCircle className="w-4 h-4 mt-0.5 shrink-0" />
                      <span>
                        Consultation booking is temporarily unavailable. Please try again or contact AIWO.{' '}
                        <button
                          type="button"
                          onClick={() => refetchServices()}
                          className="underline font-medium hover:no-underline"
                        >
                          Retry
                        </button>
                      </span>
                    </>
                  ) : (
                    <>
                      <AlertCircle className="w-4 h-4 mt-0.5 shrink-0" />
                      Consultation slots are currently unavailable. Please contact AIWO.
                    </>
                  )}
                </div>
              )}

              {errorMsg && (
                <div className="flex items-start gap-2 text-destructive bg-destructive/10 border border-destructive/20 rounded p-3 text-sm">
                  <AlertCircle className="w-4 h-4 mt-0.5 shrink-0" />
                  {errorMsg}
                </div>
              )}

              <div className="flex gap-4 pt-4 border-t border-border">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setStep(1)}
                  className="rounded-none border-border h-14 px-8"
                  disabled={isBooking}
                >
                  Back
                </Button>
                <Button
                  type="submit"
                  disabled={isBooking || formData.goals.length === 0}
                  className="flex-1 bg-primary hover:bg-primary/90 text-white rounded-none h-14"
                >
                  {isBooking ? (
                    <span className="flex items-center gap-2">
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Processing Booking...
                    </span>
                  ) : (
                    "Confirm Booking"
                  )}
                </Button>
              </div>
            </form>
          )}
        </>
      )}
    </div>
  );

  if (isInline) {
    return formContent;
  }

  return (
    <section id="book" className="py-24 bg-background border-t border-border">
      <div className="container mx-auto px-6 max-w-4xl">
        <Reveal delay={0}>
          <div className="text-center mb-12">
            <span className="font-mono text-xs font-bold text-primary uppercase tracking-widest block mb-4">Intake</span>
            <h2 className="font-serif text-3xl md:text-4xl text-foreground">Secure your baseline.</h2>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          {formContent}
        </Reveal>
      </div>
    </section>
  );
}
