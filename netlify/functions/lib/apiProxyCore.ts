// Same-origin proxy for the booking/auth APIs, used by non-production hosts so the
// browser never calls a cross-origin dev/QA API directly (which gets CORS-blocked).
// The upstream host is resolved from a server-only env var, never from client input,
// so this cannot be used as an open/arbitrary-URL proxy — only path + query + method
// + a small allowlisted set of headers/body are forwarded onto that fixed host.

export type ApiProxyErrorCategory = "method_not_allowed" | "origin_rejected" | "configuration_error" | "upstream_error";

const CATEGORY_STATUS: Record<ApiProxyErrorCategory, number> = {
  method_not_allowed: 405,
  origin_rejected: 403,
  configuration_error: 500,
  upstream_error: 502,
};

const CATEGORY_MESSAGE: Record<ApiProxyErrorCategory, string> = {
  method_not_allowed: "Method not allowed.",
  origin_rejected: "This proxy is not available on production.",
  configuration_error: "API is not configured for this environment.",
  upstream_error: "Failed to reach the upstream API.",
};

export class ApiProxyError extends Error {
  readonly category: ApiProxyErrorCategory;

  constructor(category: ApiProxyErrorCategory) {
    super(CATEGORY_MESSAGE[category]);
    this.name = "ApiProxyError";
    this.category = category;
  }
}

// This proxy exists only for non-production hosts — production always uses /api and
// /auth-api. Refuse outright if somehow invoked with the production host header, so a
// misconfigured server env var can never turn this into a production-reachable proxy.
const PRODUCTION_HOSTNAME = "mumbai.aiwo.com";

const ALLOWED_METHODS = new Set(["GET", "POST"]);

// Only headers the upstream booking/auth APIs actually read. Everything else
// (cookies, Netlify-internal headers, this site's own auth) is dropped.
const FORWARD_REQUEST_HEADERS = ["content-type", "x-application-name", "accept"];

export function safeLog(event: string, fields?: Record<string, string | number | boolean>): void {
  console.log(JSON.stringify({ event, ...fields }));
}

export function loadProxyTarget(env: Record<string, string | undefined>, varName: string): string {
  const base = env[varName];
  if (!base) {
    throw new ApiProxyError("configuration_error");
  }
  return base.replace(/\/+$/, "");
}

function buildTargetUrl(targetBaseUrl: string, requestUrl: URL, functionPath: string): string {
  const prefix = `/.netlify/functions/${functionPath}`;
  const subPath = requestUrl.pathname.startsWith(prefix) ? requestUrl.pathname.slice(prefix.length) : "";
  return `${targetBaseUrl}${subPath}${requestUrl.search}`;
}

function errorResponse(category: ApiProxyErrorCategory): Response {
  return new Response(JSON.stringify({ success: false, error: category, message: CATEGORY_MESSAGE[category] }), {
    status: CATEGORY_STATUS[category],
    headers: { "Content-Type": "application/json" },
  });
}

/**
 * Proxies `req` to `${env[envVarName]}${subPathAfterFunctionName}` — preserving method,
 * an allowlisted set of headers, and (for POST) the raw request body — and relays the
 * upstream status/body back verbatim. Fails closed (never falls back to a hardcoded
 * host) if envVarName is unset, the host is production, or the method isn't allowed.
 */
export async function proxyRequest(req: Request, functionPath: string, envVarName: string): Promise<Response> {
  try {
    const requestUrl = new URL(req.url);

    if (requestUrl.hostname === PRODUCTION_HOSTNAME) {
      throw new ApiProxyError("origin_rejected");
    }

    if (!ALLOWED_METHODS.has(req.method)) {
      throw new ApiProxyError("method_not_allowed");
    }

    const targetBaseUrl = loadProxyTarget(process.env, envVarName);
    const targetUrl = buildTargetUrl(targetBaseUrl, requestUrl, functionPath);

    safeLog("proxy_request", { method: req.method, path: requestUrl.pathname });

    const headers: Record<string, string> = {};
    for (const name of FORWARD_REQUEST_HEADERS) {
      const value = req.headers.get(name);
      if (value) headers[name] = value;
    }

    const body = req.method === "POST" ? await req.text() : undefined;

    let upstreamResponse: Response;
    try {
      upstreamResponse = await fetch(targetUrl, { method: req.method, headers, body });
    } catch {
      throw new ApiProxyError("upstream_error");
    }

    const responseBody = await upstreamResponse.text();
    safeLog("proxy_response", { status: upstreamResponse.status });

    return new Response(responseBody, {
      status: upstreamResponse.status,
      headers: { "Content-Type": upstreamResponse.headers.get("content-type") || "application/json" },
    });
  } catch (err) {
    const category = err instanceof ApiProxyError ? err.category : "upstream_error";
    safeLog("proxy_failed", { category });
    return errorResponse(category);
  }
}
