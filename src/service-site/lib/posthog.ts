/**
 * PostHog web analytics — the single, self-contained analytics layer for the
 * Mumbai site. This module owns PostHog end to end:
 *   - initialisation (initPostHog, called once from main.tsx)
 *   - a strict, allowlist-sanitised capture path (no raw posthog.capture is
 *     called anywhere else in the app)
 *   - the seven agreed funnel events, exposed as small named functions
 *   - privacy-safe session replay (10% sampled, all text + inputs masked)
 *
 * It runs INDEPENDENTLY of the Meta Pixel: the funnel helpers in metaEvents.ts
 * call these functions right next to their fbq calls, but a PostHog capture is
 * never gated on fbq availability (an ad blocker on one tool can't suppress the
 * other). No identify() is ever called — every visitor stays anonymous.
 *
 * PRIVACY GUARANTEES (health/longevity site):
 *   - autocapture OFF — only the seven intentional events below are sent.
 *   - Only a small allowlist of generic funnel properties can leave (see
 *     SAFE_PROPERTY_KEYS); name/email/phone/age, order/Razorpay/patient ids,
 *     slot date/time, health conditions and raw form values are all dropped
 *     even if a caller passes them.
 *   - Order-reference query params (orderId, …) are scrubbed from $current_url
 *     on EVERY event via before_send, so /payment/success?orderId=… never
 *     leaks the id — regardless of capture timing.
 *   - Session replay masks every input value and all rendered text, and the
 *     whole booking widget subtree is blocked (ph-no-capture); replay is not
 *     started on /payment/success.
 */
import posthog from "posthog-js";
import { sanitizeEventProperties, scrubOrderIdsFromUrl } from "./posthogPrivacy.ts";

// Public frontend config. The PostHog project API key is NOT a secret (it only
// permits sending events), so a hardcoded default is safe and keeps one
// canonical source; VITE_POSTHOG_* env vars override it when present.
const POSTHOG_KEY =
  (import.meta.env.VITE_POSTHOG_KEY as string | undefined) ||
  "phc_yqfiJwyTd4BDfXyEdTXxs7YJhgxYptGYTHmug2xdFuiD";
const POSTHOG_HOST =
  (import.meta.env.VITE_POSTHOG_HOST as string | undefined) ||
  "https://us.i.posthog.com";

// Fraction of sessions to record for privacy-safe session replay.
const SESSION_REPLAY_SAMPLE_RATE = 0.1;

// Routes where session replay must never run (payment confirmation).
const REPLAY_EXCLUDED_PATHS = ["/payment/success"];

let initialized = false;

/**
 * Initialise PostHog once, as early as possible (main.tsx). Autocapture and
 * automatic pageviews are OFF — every event is fired intentionally through the
 * helpers below. Session replay is configured fully masked but left disabled
 * here; startReplayIfSampled() decides per session whether to record.
 */
export function initPostHog(): void {
  if (typeof window === "undefined" || initialized || !POSTHOG_KEY) return;
  initialized = true;
  try {
    posthog.init(POSTHOG_KEY, {
      api_host: POSTHOG_HOST,
      defaults: "2026-05-30",
      // Intentional events only — no automatic click/form/pageview capture.
      autocapture: false,
      capture_pageview: false,
      capture_pageleave: false,
      // Anonymous analytics only — never build person profiles / call identify().
      person_profiles: "identified_only",
      // Replay starts disabled; startReplayIfSampled() enables it for the sample.
      disable_session_recording: true,
      session_recording: {
        // Mask every input value and all rendered text — nothing a patient
        // types or the page renders (order refs, names) is ever recorded.
        maskAllInputs: true,
        maskTextSelector: "*",
        // Elements with class "ph-no-capture" (the booking widget) are blocked.
        blockClass: "ph-no-capture",
      },
      // Final privacy backstop: strip order-reference ids from $current_url on
      // every event, whatever the capture timing.
      before_send: (event) => {
        if (event?.properties) {
          if (event.properties.$current_url) {
            event.properties.$current_url = scrubOrderIdsFromUrl(event.properties.$current_url);
          }
          if (event.properties.$referrer) {
            event.properties.$referrer = scrubOrderIdsFromUrl(event.properties.$referrer);
          }
        }
        return event;
      },
    });
    startReplayIfSampled();
  } catch {
    /* analytics must never break app startup */
  }
}

/** True for the ~10% of sessions selected for replay; decided once per session and persisted. */
function isSessionSampledForReplay(): boolean {
  try {
    const stored = sessionStorage.getItem("aiwo_ph_replay");
    if (stored === "1") return true;
    if (stored === "0") return false;
    const sampled = Math.random() < SESSION_REPLAY_SAMPLE_RATE;
    sessionStorage.setItem("aiwo_ph_replay", sampled ? "1" : "0");
    return sampled;
  } catch {
    // No storage → fall back to a per-load roll (still ~10%, just not sticky).
    return Math.random() < SESSION_REPLAY_SAMPLE_RATE;
  }
}

/** Start session replay for sampled sessions, unless on an excluded (payment) route. */
function startReplayIfSampled(): void {
  try {
    const path = window.location.pathname;
    if (REPLAY_EXCLUDED_PATHS.includes(path)) return;
    if (isSessionSampledForReplay()) posthog.startSessionRecording();
  } catch {
    /* non-fatal */
  }
}

/** Fire a capture with properties passed through the safe allowlist. Never throws. */
function safeCapture(event: string, properties?: Record<string, unknown>): void {
  if (typeof window === "undefined") return;
  try {
    posthog.capture(event, sanitizeEventProperties(properties));
  } catch {
    /* analytics must never break the app */
  }
}

// ── The seven agreed funnel events ──────────────────────────────────────────
// Each is a thin, no-PII wrapper. Called from the funnel helpers in
// metaEvents.ts at the exact same (already deduped/validated) boundaries as the
// Meta Pixel events.

/** 1 · $pageview — once per route (initial load + every SPA navigation). URL scrubbed by before_send. */
export function trackPageview(): void {
  // On the payment route, ensure replay is stopped before we record the view.
  try {
    if (REPLAY_EXCLUDED_PATHS.includes(window.location.pathname)) {
      posthog.stopSessionRecording();
    }
  } catch {
    /* non-fatal */
  }
  safeCapture("$pageview");
}

/** 2 · service_viewed — once when a service landing page renders. No service name (privacy). */
export function trackServiceView(): void {
  safeCapture("service_viewed", { page_type: "service" });
}

/** 3 · booking_cta_clicked — a real booking CTA was clicked. Generic location only. */
export function trackBookingCTA(ctaLocation = "booking_anchor"): void {
  safeCapture("booking_cta_clicked", { cta_location: ctaLocation });
}

/** 4 · contact_clicked — a phone/WhatsApp/enquiry action. The number is never sent. */
export function trackContact(method: "phone" | "whatsapp"): void {
  safeCapture("contact_clicked", { method });
}

/** 5 · booking_started — the user genuinely began the booking widget (first slot pick). */
export function trackBookingStarted(): void {
  safeCapture("booking_started");
}

/** 6 · checkout_started — backend returned a valid checkout_url, just before redirect. Proven amount only, no order id. */
export function trackCheckoutStarted(amount: number): void {
  safeCapture("checkout_started", { amount, currency: "INR" });
}

/** 7 · payment_success — validated captured payment reached /payment/success. Deduped by caller. No order id. */
export function trackPaymentSuccess(amount: number): void {
  safeCapture("payment_success", { amount, currency: "INR" });
}
