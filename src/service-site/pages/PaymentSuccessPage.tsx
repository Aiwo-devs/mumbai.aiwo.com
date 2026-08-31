import { useState } from "react";
import { Link } from "react-router-dom";
import { CircleCheck } from "lucide-react";
import { MetaTags } from "@/components/MetaTags";
import { Navigation } from "@/components/sections/Navigation";
import { Footer } from "@/components/sections/Footer";
import { Button } from "@/components/ui/button";

// Order-reference query keys the backend/Razorpay callback may append. We only
// ever READ and DISPLAY whatever is actually present — never fabricate one.
const ORDER_ID_KEYS = ["orderId", "order_id", "razorpay_order_id", "reference", "ref"];

interface PurchaseMeta {
  serviceName?: string;
}

/**
 * Post-payment landing page. The client is redirected here by the payment
 * provider/backend after checkout. There is no client-side payment-verification
 * contract, so this page makes NO claim that the booking is confirmed — it only
 * acknowledges the payment was received and preserves any order reference passed
 * in the URL. It is fully standalone: it reads from the URL query string and
 * localStorage only, so a direct load or hard refresh renders identically.
 */
// Read a real order reference from the URL if the backend provided one. Runs
// once at mount (client-only SPA), so a direct load or hard refresh is identical.
function readOrderId(): string {
  if (typeof window === "undefined") return "";
  const params = new URLSearchParams(window.location.search);
  for (const key of ORDER_ID_KEYS) {
    const value = params.get(key);
    if (value) return value;
  }
  return "";
}

// Optional context stored by the booking form before redirect. Absent on a
// fresh device/refresh — the page still renders without it.
function readServiceName(): string {
  if (typeof window === "undefined") return "";
  try {
    const raw = localStorage.getItem("aiwo_purchase_meta");
    if (raw) {
      const meta = JSON.parse(raw) as PurchaseMeta;
      if (meta?.serviceName) return String(meta.serviceName);
    }
  } catch {
    // Ignore malformed/unavailable storage — display falls back gracefully.
  }
  return "";
}

export default function PaymentSuccessPage() {
  const [orderId] = useState<string>(readOrderId);
  const [serviceName] = useState<string>(readServiceName);

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <MetaTags
        title="Payment Received | AIWO Longevity Clinic"
        description="Your payment has been processed. Your AIWO booking confirmation will be shared shortly."
      />
      <Navigation ctaLabel="Explore Services" ctaTarget="#explore" />

      <main className="flex-1 flex items-center justify-center px-4 sm:px-6 py-20 md:py-28">
        <div className="w-full max-w-xl text-center">
          <div className="mx-auto mb-8 flex h-16 w-16 items-center justify-center rounded-full border border-foreground/15 bg-muted">
            <CircleCheck className="h-8 w-8 text-foreground" strokeWidth={1.5} />
          </div>

          <p className="font-mono text-xs font-bold uppercase tracking-widest text-muted-foreground mb-4">
            Payment Received
          </p>

          <h1 className="text-3xl md:text-4xl font-semibold tracking-tight text-foreground mb-5">
            Thank you{serviceName ? <> — {serviceName}</> : null}
          </h1>

          <p className="text-base md:text-lg text-muted-foreground leading-relaxed mb-8">
            Your payment has been processed. Your booking confirmation will be
            shared with you shortly by the AIWO team.
          </p>

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
