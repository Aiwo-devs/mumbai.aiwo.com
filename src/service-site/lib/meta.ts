// Meta Pixel (browser) helpers.
// PORT NOTE: the Meta Pixel bootstrap script (fbq init + PageView) is NOT
// included in this Mumbai build's index.html, so window.fbq is always
// undefined here and trackMeta's pixel call is always a no-op — only the
// PostHog mirror (itself also a no-op on this build, see posthog.ts) runs.
import { mirrorMetaEventToPostHog } from "./posthog.ts";

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
  }
}

/**
 * Fire a standard Meta Pixel event. No-op (for the pixel call) if fbq isn't
 * present. Every call also mirrors into PostHog (see posthog.ts) — mirroring
 * runs independently of fbq's own availability so an ad blocker on one tool
 * doesn't suppress the other. Meta Pixel behavior itself is unchanged.
 */
export function trackMeta(event: string, params?: Record<string, unknown>): void {
  if (typeof window !== "undefined" && typeof window.fbq === "function") {
    try {
      window.fbq("track", event, params || {});
    } catch {
      /* never let tracking break the UI */
    }
  }
  mirrorMetaEventToPostHog(event, params);
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
