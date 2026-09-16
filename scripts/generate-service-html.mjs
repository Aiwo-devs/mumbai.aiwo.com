// Postbuild step: writes a static index.html per service route so crawlers
// (Facebook/Twitter/WhatsApp/Slack unfurlers, which don't execute JS) see
// route-specific <title>/description/canonical/OG/Twitter tags in the raw
// response. The SPA's MetaTags component (src/service-site/components/MetaTags.tsx)
// only patches these tags client-side after hydration, so a bare `vite build`
// serves every route the same generic homepage <head>. Each generated page
// still loads the same hashed app bundle from dist/index.html and hydrates
// into the normal SPA — this only changes what's in the initial HTML <head>.
import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const distDir = join(__dirname, "..", "dist");
const siteUrl = "https://mumbai.aiwo.com";

const services = [
  {
    slug: "iv-therapy",
    title: "IV Therapy in Mumbai | Immunity, Energy & Skin Glow | AIWO",
    description:
      "Experience personalized IV Therapy in Mumbai for immunity, hydration, energy, recovery, anti-aging and glowing skin. Book your IV drip at AIWO today.",
    image: "/og/iv-therapy.jpg",
  },
  {
    slug: "posture-screening",
    title: "Posture Screening Mumbai | Neck & Back Pain Relief | AIWO",
    description:
      "Correct posture issues with AI-powered screening at AIWO Mumbai. Identify imbalances, alignment issues & movement restrictions. Reduce pain, improve mobility. Book your assessment today.",
    image: "/og/posture-screening.jpg",
  },
  {
    slug: "rmr",
    title: "RMR Test in Mumbai | Resting Metabolic Rate Analysis Clinic",
    description:
      "Measure your metabolism with an advanced RMR test in Mumbai. Get accurate resting metabolic rate analysis for weight loss, fitness, and personalized nutrition plans.",
    image: "/og/rmr.jpg",
  },
  {
    slug: "ems-sculpting",
    title: "Body Sculpting in Mumbai | Non-Surgical Fat Reduction | AIWO",
    description:
      "Transform your body with AIWO Sculpt. Non-surgical body contouring helps reduce stubborn fat, tone muscles and improve body shape. Book today.",
    image: "/og/ems-sculpting.jpg",
  },
  {
    slug: "vo2-max",
    title: "VO2 Max Test in Mumbai | Cardiorespiratory Fitness Assessment",
    description:
      "Improve endurance and heart health with a VO2 Max test in Mumbai. Get precise cardiorespiratory fitness analysis for athletes, runners, and health-conscious individuals.",
    image: "/og/vo2-max.jpg",
  },
];

function escapeAttr(value) {
  return value.replace(/"/g, "&quot;");
}

function renderHtml(base, service) {
  const path = `/services/${service.slug}`;
  const url = `${siteUrl}${path}`;
  const imageUrl = `${siteUrl}${service.image}`;
  const title = escapeAttr(service.title);
  const description = escapeAttr(service.description);

  let html = base;

  html = html.replace(/<title>[^<]*<\/title>/, `<title>${title}</title>`);

  html = html.replace(
    /<meta\s+name="description"\s+content="[^"]*"\s*\/>/,
    `<meta name="description" content="${description}" />`
  );

  html = html.replace(
    /<link rel="canonical" href="[^"]*" \/>/,
    `<link rel="canonical" href="${url}" />`
  );

  html = html.replace(
    /<meta property="og:title" content="[^"]*" \/>/,
    `<meta property="og:title" content="${title}" />`
  );

  html = html.replace(
    /<meta\s+property="og:description"\s+content="[^"]*"\s*\/>/,
    `<meta property="og:description" content="${description}" />`
  );

  html = html.replace(
    /<meta property="og:url" content="[^"]*" \/>/,
    `<meta property="og:url" content="${url}" />\n    <meta property="og:image" content="${imageUrl}" />\n    <meta name="twitter:card" content="summary_large_image" />\n    <meta name="twitter:title" content="${title}" />\n    <meta name="twitter:description" content="${description}" />\n    <meta name="twitter:image" content="${imageUrl}" />`
  );

  return html;
}

const basePath = join(distDir, "index.html");
const base = readFileSync(basePath, "utf-8");

// Flat `<slug>.html` (Netlify's built-in pretty-URL rewrite serves this at
// /services/<slug> with no redirect) rather than `<slug>/index.html`, which
// Netlify instead 301s to the trailing-slash form before serving.
const servicesDir = join(distDir, "services");
mkdirSync(servicesDir, { recursive: true });

for (const service of services) {
  const html = renderHtml(base, service);
  writeFileSync(join(servicesDir, `${service.slug}.html`), html);
  console.log(`wrote dist/services/${service.slug}.html`);
}
