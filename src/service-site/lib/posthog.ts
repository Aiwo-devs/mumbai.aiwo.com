/**
 * PostHog web analytics — isolated wrapper around the official HTML snippet.
 * PORT NOTE: the snippet itself is NOT included in this Mumbai build's
 * index.html, so window.posthog is always undefined here and every export
 * below is a safe no-op (each checks for window.posthog before calling).
 * This module does no initialization of its own — the snippet's inline stub
 * means window.posthog.capture is safe to call immediately, even before the
 * real script has finished loading. Every capture call is sanitized through
 * an allowlist so no customer PII (name/email/phone/age/raw form values) or
 * payment identifiers (Razorpay/order/customer IDs) can reach PostHog, even
 * if a caller passes extra fields.
 */

declare global {
  interface Window {
    posthog?: {
      capture: (event: string, properties?: Record<string, unknown>) => void;
    };
  }
}

const SAFE_PROPERTY_KEYS = [
  "page_path",
  "page_url",
  "landing_page",
  "route_type",
  "service_name",
  "service_code",
  "amount",
  "currency",
  "payment_status",
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "referrer",
  "environment",
] as const;

type SafePropertyKey = (typeof SAFE_PROPERTY_KEYS)[number];
export type SafeEventProperties = Partial<Record<SafePropertyKey, string | number>>;

/** Strict allowlist filter — drops any key not in SAFE_PROPERTY_KEYS (e.g. name, email, phone, order_id). */
export function sanitizeEventProperties(input?: Record<string, unknown> | null): SafeEventProperties {
  const safe: SafeEventProperties = {};
  if (!input) return safe;
  for (const key of SAFE_PROPERTY_KEYS) {
    const value = input[key];
    if (typeof value === "string" && value.length > 0) safe[key] = value;
    else if (typeof value === "number" && Number.isFinite(value)) safe[key] = value;
  }
  return safe;
}

const META_EVENT_TO_POSTHOG_EVENT: Record<string, string> = {
  ViewContent: "meta_view_content",
  Lead: "meta_lead",
  CompleteRegistration: "meta_complete_registration",
  Purchase: "meta_purchase",
};

/** Maps a Meta Pixel event's own param shape (value/content_name/content_category) to the safe schema. */
export function mapMetaParamsToSafeProperties(params?: Record<string, unknown>): SafeEventProperties {
  if (!params) return {};
  const mapped: Record<string, unknown> = {};
  if (params.value !== undefined) mapped.amount = params.value;
  if (params.currency !== undefined) mapped.currency = params.currency;
  if (params.content_name !== undefined) mapped.service_name = params.content_name;
  if (params.content_category !== undefined) mapped.route_type = params.content_category;
  return sanitizeEventProperties(mapped);
}

export function getPostHogEventNameForMetaEvent(metaEvent: string): string | undefined {
  return META_EVENT_TO_POSTHOG_EVENT[metaEvent];
}

/** Fires a capture with properties passed through the safe allowlist. No-op if the snippet hasn't loaded (or isn't present). */
export function capturePostHogEvent(event: string, properties?: Record<string, unknown>): void {
  if (typeof window === "undefined" || typeof window.posthog?.capture !== "function") return;
  try {
    window.posthog.capture(event, sanitizeEventProperties(properties));
  } catch {
    /* analytics must never break the app */
  }
}

/** Mirrors an existing Meta Pixel event into PostHog. Called from the same trackMeta() call path; never alters Meta Pixel behavior. */
export function mirrorMetaEventToPostHog(metaEvent: string, params?: Record<string, unknown>): void {
  const posthogEvent = getPostHogEventNameForMetaEvent(metaEvent);
  if (!posthogEvent) return;
  capturePostHogEvent(posthogEvent, mapMetaParamsToSafeProperties(params));
}

/** Fires the standard $pageview event for the current location (initial load or SPA route change). */
export function trackPostHogPageview(): void {
  if (typeof window === "undefined") return;
  capturePostHogEvent("$pageview", {
    page_path: window.location.pathname,
    page_url: window.location.href,
    referrer: typeof document !== "undefined" ? document.referrer : "",
  });
}
