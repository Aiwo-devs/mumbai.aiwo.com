/**
 * Canonical Meta funnel taxonomy for the Mumbai landing pages.
 *
 * ONE place defines every event name, its Meta type (standard vs custom), and
 * its parameters. Callers (MetaAnalytics route tracker, ServiceBooking,
 * BookingSummary) only ever call the helpers here — they never touch fbq or
 * event names directly. This keeps the funnel clean and auditable and makes the
 * privacy guarantees below enforceable in one file.
 *
 * PRIVACY (health/longevity advertiser rules): NO PII or health/order data ever
 * reaches Meta as an event parameter — no name, email, phone, age, patient/
 * appointment/order/Razorpay id, slot date/time, or health condition/service
 * diagnosis. Custom parameters are limited to generic funnel metadata
 * (funnel_stage, page_type, contact_method) plus, only where it is a proven
 * booking amount, value + currency. Advanced Matching is OFF (see index.html).
 */
import { trackMetaStandard, trackMetaCustom, trackMetaPageView } from "./meta.ts";

// Order-reference query keys the backend / Razorpay callback may append to
// /payment/success (mirrors PaymentSuccessPage's own list). These must never be
// transmitted to Meta — not even implicitly via the pixel's automatic document-
// location (dl) parameter — so we strip them from the URL before any event fires.
const ORDER_ID_KEYS = ["orderId", "order_id", "razorpay_order_id", "reference", "ref"];

/**
 * Strip order-reference identifiers from the current URL (in place, via
 * history.replaceState) so the pixel's automatic `dl` parameter can't leak them.
 * Marketing-attribution params (fbclid, utm_*, everything else) are preserved.
 * Safe no-op on SSR or if nothing sensitive is present. Must run BEFORE the
 * first Meta event on a route — but AFTER the page has read what it needs from
 * the URL (PaymentSuccessPage reads order id in a render-phase useState
 * initializer, which runs before this effect-time call).
 */
export function sanitizeUrlForMeta(): void {
  if (typeof window === "undefined" || !window.history?.replaceState) return;
  try {
    const url = new URL(window.location.href);
    let changed = false;
    for (const key of ORDER_ID_KEYS) {
      if (url.searchParams.has(key)) {
        url.searchParams.delete(key);
        changed = true;
      }
    }
    if (changed) {
      window.history.replaceState(
        window.history.state,
        "",
        url.pathname + url.search + url.hash
      );
    }
  } catch {
    /* URL sanitisation must never break navigation or tracking */
  }
}

/** Opaque dedup / future-CAPI-join id. Never derived from an order/patient id, so it carries no PII. */
export function newEventId(): string {
  if (typeof crypto !== "undefined" && typeof crypto.randomUUID === "function") {
    return crypto.randomUUID();
  }
  // Non-crypto fallback is fine: this is only a dedup key, not a security token.
  return `evt-${Date.now().toString(36)}-${Math.random().toString(36).slice(2)}`;
}

/** A → PageView. Fired once per rendered route (initial load + every SPA navigation). */
export function trackPageView(): void {
  trackMetaPageView();
}

/** B → ViewContent. Fired once per landing-page view (home + service pages). Generic category only. */
export function trackViewContent(pageType: string): void {
  trackMetaStandard("ViewContent", { funnel_stage: "view_content", page_type: pageType });
}

/** C → BookingCTA (custom). Fired on a Book CTA click. Intent, NOT a conversion. */
export function trackBookingCTA(): void {
  trackMetaCustom("BookingCTA", { funnel_stage: "booking_cta" });
}

/** D → Contact (standard). Fired on a phone/WhatsApp click. The phone number is NEVER sent — only the method. */
export function trackContact(method: "call" | "whatsapp"): void {
  trackMetaStandard("Contact", { funnel_stage: "contact", contact_method: method });
}

/** F → BookingFormStart (custom). Fired once when the user genuinely begins the booking widget (first slot pick). */
export function trackBookingFormStart(): void {
  trackMetaCustom("BookingFormStart", { funnel_stage: "booking_form_start" });
}

/**
 * I → InitiateCheckout (standard). Fired only after the backend returns a valid
 * checkout_url, immediately before the Razorpay redirect. `amount` is the proven
 * booking charge (getServicePrice), never inferred from UI text. eventID dedups
 * refresh/back/double-click and seeds future CAPI dedup.
 */
export function trackInitiateCheckout(amount: number, eventID: string): void {
  trackMetaStandard(
    "InitiateCheckout",
    { value: amount, currency: "INR", funnel_stage: "checkout" },
    { eventID }
  );
}

/**
 * K (diagnostic) → PaymentReturn (custom). Fired when /payment/success renders.
 * This is NOT Purchase: this build has no client- or backend-side payment-
 * verification contract, so a captured payment cannot be proven here. Carries no
 * value, order id, or amount — purely a return-to-site funnel signal.
 */
export function trackPaymentReturn(): void {
  trackMetaCustom("PaymentReturn", { funnel_stage: "payment_return" });
}
