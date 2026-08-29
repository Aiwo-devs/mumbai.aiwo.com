import { proxyRequest } from "./lib/apiProxyCore.ts";

// Same-origin proxy for the booking API on non-production hosts. Target host comes
// only from BOOKING_API_BASE_URL (server env) — see lib/apiProxyCore.ts.
export default async function handler(req: Request): Promise<Response> {
  return proxyRequest(req, "booking-api-proxy", "BOOKING_API_BASE_URL");
}
