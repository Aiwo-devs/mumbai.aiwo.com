import { proxyRequest } from "./lib/apiProxyCore.ts";

// Same-origin proxy for the auth API on non-production hosts. Target host comes
// only from AUTH_API_BASE_URL (server env) — see lib/apiProxyCore.ts.
export default async function handler(req: Request): Promise<Response> {
  return proxyRequest(req, "auth-api-proxy", "AUTH_API_BASE_URL");
}
