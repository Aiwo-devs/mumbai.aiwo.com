/**
 * Fire-and-forget lead capture to the Google Sheet backing BookingForm.
 *
 * Flow: a valid submit immediately captures a LEAD_SUBMITTED row (before any
 * payment call), then the same row is updated in place to PAYMENT_INITIATED
 * (on API success) or BOOKING_API_FAILED (on error) by Booking Reference.
 * The PAYMENT_INITIATED/BOOKING_API_FAILED updates resend the full original
 * safe lead payload (not just the status/order-id delta) so that if the
 * initial LEAD_SUBMITTED write was lost or lost the race against the update,
 * the update itself can still land a complete row instead of a blank one.
 * Never awaited by callers; never allowed to block the booking/payment flow
 * or the checkout_url redirect; never sent checkout_url, a test token, or
 * Google credentials — none of these types carry such fields.
 *
 * PORT NOTE: posts to /.netlify/functions/booking-sheet-background, which is
 * not deployed on this Mumbai site. On this build it fails harmlessly (the
 * fetch's own .catch swallows the error) — by design, this call was always
 * meant to never block or surface errors to the booking flow. Real Mumbai
 * backend wiring is a separate, later phase.
 */

export type BookingStatus = "LEAD_SUBMITTED" | "PAYMENT_INITIATED" | "BOOKING_API_FAILED";
export type PaymentStatus = "NOT_STARTED" | "PENDING";
export type BookingSheetEnvironment = "PRODUCTION" | "TEST";

export interface BookingLeadInput {
  customerName: string;
  phone: string;
  email: string;
  age: string;
  landingPage: string;
  serviceName: string;
  serviceCode?: string;
  serviceId: string;
  appointmentDate: string;
  preferredTime: string;
  environment: BookingSheetEnvironment;
}

interface LeadDetailFields {
  customerName: string;
  phone: string;
  email: string;
  age: string;
  landingPage: string;
  pagePath: string;
  pageUrl: string;
  serviceName: string;
  serviceCode?: string;
  serviceId: string;
  appointmentDate: string;
  preferredTime: string;
  utmSource: string;
  utmMedium: string;
  utmCampaign: string;
  referrer: string;
  environment: BookingSheetEnvironment;
}

interface CreateLeadPayload extends LeadDetailFields {
  bookingReference: string;
  razorpayOrderId: "";
  bookingStatus: "LEAD_SUBMITTED";
  paymentStatus: "NOT_STARTED";
}

interface PaymentInitiatedPatch extends LeadDetailFields {
  bookingReference: string;
  bookingStatus: "PAYMENT_INITIATED";
  paymentStatus: "PENDING";
  razorpayOrderId: string;
}

interface BookingApiFailedPatch extends LeadDetailFields {
  bookingReference: string;
  bookingStatus: "BOOKING_API_FAILED";
  paymentStatus: "NOT_STARTED";
  razorpayOrderId: "";
}

function generateLeadReference(): string {
  const uuid =
    typeof crypto !== "undefined" && typeof crypto.randomUUID === "function"
      ? crypto.randomUUID()
      : `${Date.now().toString(36)}-${Math.random().toString(36).slice(2)}`;
  return `LEAD-${uuid}`;
}

function getUtmParams(): { utmSource: string; utmMedium: string; utmCampaign: string } {
  if (typeof window === "undefined") return { utmSource: "", utmMedium: "", utmCampaign: "" };
  const params = new URLSearchParams(window.location.search);
  return {
    utmSource: params.get("utm_source") || "",
    utmMedium: params.get("utm_medium") || "",
    utmCampaign: params.get("utm_campaign") || "",
  };
}

function getReferrer(): string {
  return typeof document !== "undefined" ? document.referrer || "" : "";
}

function buildLeadDetailFields(input: BookingLeadInput): LeadDetailFields {
  const { utmSource, utmMedium, utmCampaign } = getUtmParams();
  return {
    customerName: input.customerName,
    phone: input.phone,
    email: input.email,
    age: input.age,
    landingPage: input.landingPage,
    pagePath: typeof window !== "undefined" ? window.location.pathname : "",
    pageUrl: typeof window !== "undefined" ? window.location.href : "",
    serviceName: input.serviceName,
    serviceCode: input.serviceCode,
    serviceId: input.serviceId,
    appointmentDate: input.appointmentDate,
    preferredTime: input.preferredTime,
    utmSource,
    utmMedium,
    utmCampaign,
    referrer: getReferrer(),
    environment: input.environment,
  };
}

export function buildLeadCapturePayload(leadReference: string, input: BookingLeadInput): CreateLeadPayload {
  return {
    bookingReference: leadReference,
    razorpayOrderId: "",
    ...buildLeadDetailFields(input),
    bookingStatus: "LEAD_SUBMITTED",
    paymentStatus: "NOT_STARTED",
  };
}

const BOOKING_SHEET_ENDPOINT = "/.netlify/functions/booking-sheet-background";

/** Never awaited by design — a Sheet outage must never delay booking, payment, or the redirect. */
function sendBookingSheetSync(payload: CreateLeadPayload | PaymentInitiatedPatch | BookingApiFailedPatch): void {
  try {
    fetch(BOOKING_SHEET_ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
      keepalive: true,
    }).catch(() => {
      /* Sheet sync failures must never surface to the booking flow */
    });
  } catch {
    /* never let Sheet sync throw into the booking flow */
  }
}

/** Call immediately on a valid BookingForm submit, before payment initiation. Returns the generated leadReference for later updates. */
export function captureBookingLead(input: BookingLeadInput): string {
  const leadReference = generateLeadReference();
  sendBookingSheetSync(buildLeadCapturePayload(leadReference, input));
  return leadReference;
}

/**
 * Call after InsertAppointmentWithPayment succeeds and data.order_id exists.
 * Resends the full original safe lead payload alongside the status update so
 * that if the initial LEAD_SUBMITTED write never landed, this update can
 * still create a complete row instead of a blank fallback one.
 */
export function markBookingPaymentInitiated(leadReference: string, input: BookingLeadInput, razorpayOrderId: string): void {
  if (!leadReference || !razorpayOrderId) return;
  sendBookingSheetSync({
    bookingReference: leadReference,
    ...buildLeadDetailFields(input),
    bookingStatus: "PAYMENT_INITIATED",
    paymentStatus: "PENDING",
    razorpayOrderId,
  });
}

/**
 * Call when the booking attempt fails after a lead was already captured.
 * Resends the full original safe lead payload for the same reason as
 * markBookingPaymentInitiated above.
 */
export function markBookingApiFailed(leadReference: string, input: BookingLeadInput): void {
  if (!leadReference) return;
  sendBookingSheetSync({
    bookingReference: leadReference,
    ...buildLeadDetailFields(input),
    bookingStatus: "BOOKING_API_FAILED",
    paymentStatus: "NOT_STARTED",
    razorpayOrderId: "",
  });
}
