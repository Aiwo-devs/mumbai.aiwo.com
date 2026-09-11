import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { CircleCheck, CircleAlert } from "lucide-react";
import { MetaTags } from "@/components/MetaTags";
import { Navigation } from "@/components/sections/Navigation";
import { Footer } from "@/components/sections/Footer";
import { Button } from "@/components/ui/button";
import { trackPurchase } from "@/lib/metaEvents";

/**
 * Post-payment landing page.
 *
 * BACKEND SUCCESS CONTRACT (confirmed by the backend developer):
 *   - The backend redirects here (`/payment/success?orderId=<id>`) ONLY after it
 *     has confirmed a successful/captured payment. Failed, cancelled, incomplete
 *     or unsuccessful payments do NOT reach this route. So arrival here — with the
 *     backend-appended `orderId` — IS the authoritative success boundary. There is
 *     no status param, no verification endpoint, and no client-side signature
 *     check (and we must not invent any).
 *
 * The `orderId` in the URL is the same `order_id` returned by
 * InsertAppointmentWithPayment and stored in `aiwo_purchase_meta` at checkout
 * (BookingSummary.tsx). We display the booked service / use the paid amount ONLY
 * when the URL orderId matches the stored order — so a stale previous booking can
 * never mislabel this one. The Meta Purchase conversion fires exactly once under
 * that same match, deduped by event_id = `purchase_<orderId>` (shared with the
 * backend CAPI Purchase) and persisted so a refresh/back never refires.
 *
 * The page reads the URL orderId in a render-phase initializer (below), which runs
 * before MetaAnalytics' effect-time sanitizeUrlForMeta() strips `orderId` from the
 * URL — so capture is reliable and the id is never leaked to the pixel afterwards.
 */

interface PurchaseMeta {
  amount?: number;
  serviceName?: string;
  orderId?: string;
}

// The backend's confirmed redirect key is `orderId`. We match strictly on it.
function readUrlOrderId(): string {
  if (typeof window === "undefined") return "";
  const params = new URLSearchParams(window.location.search);
  return params.get("orderId") || "";
}

// Transaction context stored by the booking flow right before the Razorpay
// redirect. Absent on a fresh device / cleared storage — handled gracefully.
function readPurchaseMeta(): PurchaseMeta | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem("aiwo_purchase_meta");
    if (!raw) return null;
    const meta = JSON.parse(raw) as PurchaseMeta;
    return meta && typeof meta === "object" ? meta : null;
  } catch {
    return null;
  }
}

type Resolution =
  | { kind: "success_detailed"; orderId: string; serviceName: string; amount: number }
  | { kind: "success_generic"; orderId: string }
  | { kind: "unverified" };

// Resolve the page state synchronously from the URL + stored transaction. No async
// verification exists in the contract, so there is no VERIFYING wait to perform.
function resolve(): Resolution {
  const urlOrderId = readUrlOrderId();
  const meta = readPurchaseMeta();

  // No backend-appended orderId → this was not reached via the documented
  // success redirect. Do not claim success, do not fire Purchase.
  if (!urlOrderId) return { kind: "unverified" };

  const storedOrderId = meta?.orderId ? String(meta.orderId) : "";
  const amount = typeof meta?.amount === "number" ? meta.amount : NaN;
  const serviceName = meta?.serviceName ? String(meta.serviceName) : "";

  // The transaction metadata must belong to THIS order, with a real amount and a
  // service name, before we show the service or fire a valued Purchase.
  const matched =
    storedOrderId !== "" &&
    storedOrderId === urlOrderId &&
    Number.isFinite(amount) &&
    amount > 0 &&
    serviceName !== "";

  if (matched) {
    return { kind: "success_detailed", orderId: urlOrderId, serviceName, amount };
  }

  // Payment succeeded (backend redirected), but the local metadata does not match
  // this order — never show a stale service or use a stale amount. Acknowledge the
  // payment generically; the conversion is still captured server-side via CAPI.
  if (storedOrderId && storedOrderId !== urlOrderId) {
    // Report the exact mismatch for diagnostics (ids only, no PII).
    console.warn(
      `[payment/success] orderId mismatch — url=${urlOrderId} stored=${storedOrderId}; ` +
        `suppressing service display + Purchase (possible stale transaction).`
    );
  }
  return { kind: "success_generic", orderId: urlOrderId };
}

export default function PaymentSuccessPage() {
  const [resolution] = useState<Resolution>(resolve);
  const firedRef = useRef(false);

  // Fire the Meta Purchase conversion exactly once, only on a validated match.
  useEffect(() => {
    if (resolution.kind !== "success_detailed") return;
    if (firedRef.current) return; // StrictMode / re-render guard (same mount)

    const dedupKey = `aiwo_purchase_fired_${resolution.orderId}`;
    try {
      if (localStorage.getItem(dedupKey)) return; // refresh / back / revisit
    } catch {
      /* storage unavailable — in-memory guard below still prevents same-mount dupes */
    }

    firedRef.current = true;
    try {
      localStorage.setItem(dedupKey, "1"); // persist BEFORE firing so a crash can't refire
    } catch {
      /* non-fatal */
    }
    // eventID = purchase_<orderId> → dedups against the backend CAPI Purchase.
    trackPurchase(resolution.amount, `purchase_${resolution.orderId}`);
  }, [resolution]);

  const isSuccess = resolution.kind !== "unverified";
  const serviceName =
    resolution.kind === "success_detailed" ? resolution.serviceName : "";
  const orderId = resolution.kind === "unverified" ? "" : resolution.orderId;

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <MetaTags
        title={
          isSuccess
            ? "Payment Successful | AIWO Longevity Clinic"
            : "Payment | AIWO Longevity Clinic"
        }
        description="Your payment status for your AIWO booking."
      />
      <Navigation ctaLabel="Explore Services" ctaTarget="#explore" />

      <main className="flex-1 flex items-center justify-center px-4 sm:px-6 py-20 md:py-28">
        <div className="w-full max-w-xl text-center">
          <div className="mx-auto mb-8 flex h-16 w-16 items-center justify-center rounded-full border border-foreground/15 bg-muted">
            {isSuccess ? (
              <CircleCheck className="h-8 w-8 text-foreground" strokeWidth={1.5} />
            ) : (
              <CircleAlert className="h-8 w-8 text-foreground" strokeWidth={1.5} />
            )}
          </div>

          <p className="font-mono text-xs font-bold uppercase tracking-widest text-muted-foreground mb-4">
            {isSuccess ? "Payment Successful" : "Payment"}
          </p>

          {isSuccess ? (
            <>
              <h1 className="text-3xl md:text-4xl font-semibold tracking-tight text-foreground mb-5">
                Thank you{serviceName ? <> — {serviceName}</> : null}
              </h1>
              <p className="text-base md:text-lg text-muted-foreground leading-relaxed mb-8">
                Your payment has been processed successfully. Your booking
                confirmation will be shared with you shortly by the AIWO team.
              </p>
            </>
          ) : (
            <>
              <h1 className="text-3xl md:text-4xl font-semibold tracking-tight text-foreground mb-5">
                We couldn&rsquo;t verify this payment
              </h1>
              <p className="text-base md:text-lg text-muted-foreground leading-relaxed mb-8">
                If you completed a payment, your booking confirmation will still be
                shared by the AIWO team. Please contact us if you have any concerns.
              </p>
            </>
          )}

          {orderId && (
            <div className="inline-block border border-border bg-muted/40 px-5 py-3 mb-10">
              <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground block mb-1">
                Order Reference
              </span>
              <span className="font-mono text-sm text-foreground break-all">{orderId}</span>
            </div>
          )}

          <div
            id="explore"
            className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2"
          >
            <Button
              asChild
              className="w-full sm:w-auto bg-black hover:bg-black/90 text-white rounded-none h-11 px-6 font-medium"
            >
              <Link to="/">Back to Home</Link>
            </Button>
            <Button
              asChild
              className="w-full sm:w-auto bg-white hover:bg-muted text-foreground border border-foreground rounded-none h-11 px-6 font-medium"
            >
              <Link to="/services/iv-therapy">Explore Services</Link>
            </Button>
          </div>

          <p className="mt-10 font-mono text-[11px] text-muted-foreground">
            Questions? Email{" "}
            <a href="mailto:orders@aiwo.com" className="underline hover:text-foreground">
              orders@aiwo.com
            </a>
          </p>
        </div>
      </main>

      <Footer />
    </div>
  );
}
