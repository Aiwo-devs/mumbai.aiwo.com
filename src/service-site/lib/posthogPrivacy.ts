/**
 * Pure privacy primitives for PostHog analytics. Kept dependency-free (no
 * posthog-js, no import.meta) so the privacy guarantees can be unit-tested in
 * isolation. posthog.ts composes these into the live capture path.
 */

// Order-reference query keys the backend / Razorpay callback may append to
// /payment/success. Mirrors the list in metaEvents.ts. Must never reach PostHog.
export const ORDER_ID_KEYS = ["orderId", "order_id", "razorpay_order_id", "reference", "ref"] as const;

// Strict allowlist of generic funnel properties. Anything not listed here is
// dropped before an event is sent — this is what makes "no PII / no order id"
// enforceable in one place even if a caller passes extra fields.
export const SAFE_PROPERTY_KEYS = [
  "page_type",
  "cta_location",
  "method",
  "amount",
  "currency",
  "utm_source",
  "utm_medium",
  "utm_campaign",
] as const;

type SafePropertyKey = (typeof SAFE_PROPERTY_KEYS)[number];
export type SafeEventProperties = Partial<Record<SafePropertyKey, string | number>>;

/** Strict allowlist filter — keeps only known-safe, non-empty string/number values. */
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

/** Remove order-reference params from a URL so no order id can ride along on $current_url / $referrer. */
export function scrubOrderIdsFromUrl(rawUrl: unknown): unknown {
  if (typeof rawUrl !== "string" || rawUrl.length === 0) return rawUrl;
  try {
    const url = new URL(rawUrl);
    let changed = false;
    for (const key of ORDER_ID_KEYS) {
      if (url.searchParams.has(key)) {
        url.searchParams.delete(key);
        changed = true;
      }
    }
    return changed ? url.toString() : rawUrl;
  } catch {
    return rawUrl;
  }
}
