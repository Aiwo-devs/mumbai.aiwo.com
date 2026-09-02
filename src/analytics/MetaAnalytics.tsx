import { useEffect, useLayoutEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import {
  sanitizeUrlForMeta,
  trackPageView,
  trackViewContent,
  trackPaymentReturn,
  trackBookingCTA,
  trackContact,
} from "../service-site/lib/metaEvents";

/**
 * App-level Meta funnel tracker. Rendered once, inside <BrowserRouter>, above the
 * routes. It owns two responsibilities and nothing else — it renders no UI and
 * mutates no DOM, so it cannot affect layout, the frozen homepage CSS, or the
 * booking flow:
 *
 *  1. ROUTE TRACKING — on the initial render and every client-side navigation:
 *     sanitize the URL (strip order-reference ids), fire exactly one PageView,
 *     then the route-appropriate content event (ViewContent for the home and
 *     service landing pages; PaymentReturn — a diagnostic, NOT Purchase — for
 *     /payment/success). Deduped per pathname so React re-renders and StrictMode's
 *     dev double-invoke can't produce a second PageView/ViewContent.
 *
 *  2. CTA ENGAGEMENT — a single passive, capture-phase document click listener
 *     classifies Book CTAs (#book / #begin scroll anchors used across the service
 *     pages, Sleepcation, and the nav CTA) as BookingCTA, and phone/WhatsApp
 *     links as Contact. Observational only: it never calls preventDefault, never
 *     sends the phone number, and is fully wrapped in try/catch.
 */

function classifyRoute(pathname: string): { pageType: string } | "payment_return" | null {
  if (pathname === "/") return { pageType: "home" };
  if (pathname === "/payment/success") return "payment_return";
  if (pathname.startsWith("/services/")) return { pageType: "service_page" };
  return null;
}

function hashOf(href: string): string {
  const i = href.indexOf("#");
  return i === -1 ? "" : href.slice(i);
}

export function MetaAnalytics() {
  const { pathname } = useLocation();
  const lastTrackedPath = useRef<string | null>(null);

  // Route tracking. useLayoutEffect so URL sanitisation + the first event run as
  // early as possible after the route commits (still after render-phase reads).
  useLayoutEffect(() => {
    if (lastTrackedPath.current === pathname) return; // dedup StrictMode / re-render
    lastTrackedPath.current = pathname;

    sanitizeUrlForMeta();
    trackPageView();

    const route = classifyRoute(pathname);
    if (route === "payment_return") {
      trackPaymentReturn();
    } else if (route) {
      trackViewContent(route.pageType);
    }
  }, [pathname]);

  // Delegated CTA click listener — installed once.
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      try {
        const start = e.target as Element | null;
        const anchor = start?.closest?.("a");
        if (!anchor) return;
        const href = anchor.getAttribute("href") || "";
        if (!href) return;

        if (href.startsWith("tel:")) {
          trackContact("call");
          return;
        }
        if (/wa\.me|whatsapp/i.test(href)) {
          trackContact("whatsapp");
          return;
        }
        const hash = hashOf(href);
        if (hash === "#book" || hash === "#begin") {
          trackBookingCTA();
        }
      } catch {
        /* CTA tracking must never interfere with the click */
      }
    };

    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, []);

  return null;
}
