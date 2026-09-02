// Meta Pixel (browser) helpers — the single canonical wrapper around window.fbq.
// The Pixel bootstrap (loader + fbq('init', ID), no PageView) lives in
// index.html; PageView and all conversion events are fired through the helpers
// below so there is exactly one code path to Meta. Every helper is a safe no-op
// when window.fbq is absent (ad blocker / not yet loaded / SSR), so tracking can
// never crash the UI or the booking flow. Each call also mirrors into PostHog
// (see posthog.ts) independently of fbq availability, so an ad blocker on one
// tool doesn't suppress the other.
import { mirrorMetaEventToPostHog } from "./posthog.ts";

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
  }
}

/** Optional per-call options. `eventID` is Meta's dedup key (also the future CAPI join key); it is opaque and must never carry PII. */
export interface MetaEventOptions {
  eventID?: string;
}

function fire(method: "track" | "trackCustom", event: string, params?: Record<string, unknown>, options?: MetaEventOptions): void {
  if (typeof window !== "undefined" && typeof window.fbq === "function") {
    try {
      if (options?.eventID) {
        window.fbq(method, event, params || {}, { eventID: options.eventID });
      } else {
        window.fbq(method, event, params || {});
      }
    } catch {
      /* never let tracking break the UI */
    }
  }
  // Mirror standard-event names into PostHog (custom names are ignored by the map).
  mirrorMetaEventToPostHog(event, params);
}

/** Fire a Meta STANDARD event (PageView, ViewContent, Contact, InitiateCheckout, …). */
export function trackMetaStandard(event: string, params?: Record<string, unknown>, options?: MetaEventOptions): void {
  fire("track", event, params, options);
}

/** Fire a Meta CUSTOM event (BookingCTA, BookingFormStart, PaymentReturn, …) via fbq('trackCustom'). */
export function trackMetaCustom(event: string, params?: Record<string, unknown>, options?: MetaEventOptions): void {
  fire("trackCustom", event, params, options);
}

/** Fire a PageView. Called once per rendered route by the SPA route tracker. */
export function trackMetaPageView(): void {
  fire("track", "PageView");
}

/**
 * Backward-compatible standard-event alias. Retained so existing importers keep
 * working; new code should call trackMetaStandard / trackMetaCustom directly.
 */
export function trackMeta(event: string, params?: Record<string, unknown>): void {
  trackMetaStandard(event, params);
}

/** Read a cookie value by name (browser only). Name is regex-escaped. */
function readCookie(name: string): string | undefined {
  if (typeof document === "undefined") return undefined;
  const safe = name.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const match = document.cookie.match(new RegExp("(?:^|; )" + safe + "=([^;]*)"));
  return match ? decodeURIComponent(match[1]) : undefined;
}

// Meta _fbp / _fbc format: fb.<subdomainIndex>.<creationTime>.<payload>
const FB_COOKIE_RE = /^fb\.\d\.\d+\.[\w-]+$/;

function validFbCookie(value: string | undefined): string | undefined {
  return value && FB_COOKIE_RE.test(value) ? value : undefined;
}

/**
 * Meta browser cookies used for Conversions API match quality.
 * `_fbp` is set by the pixel; `_fbc` is set when the visitor arrives with an
 * fbclid query param. Forwarded to the backend so the server-side Purchase can
 * be attributed to the same browser. Validated against the known format so a
 * tampered cookie can't inject arbitrary data into the order notes / Graph call.
 */
export function getFbCookies(): { fbp?: string; fbc?: string } {
  return {
    fbp: validFbCookie(readCookie("_fbp")),
    fbc: validFbCookie(readCookie("_fbc")),
  };
}
