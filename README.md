# AIWO Longevity Clinic — Fairmont Mumbai

Frontend for the Mumbai clinic site: homepage plus five service landing pages
(IV Therapy, Posture Screening, RMR, EMS Sculpting, VO2 Max).

## Stack

- React 19 + TypeScript, built with Vite
- `react-router-dom` for client-side routing
- Plain CSS with a shared design-token system (`src/styles/`) — no CSS
  framework or component library

## Local development

```bash
npm install
npm run dev       # starts the dev server
npm run build      # typecheck + production build
npm run lint       # eslint
npm run preview    # preview a production build locally
```

## Environment variables

None currently required. If any are introduced, document them in
`.env.example` (names only, no real values) and never commit a `.env` file —
see `.gitignore`.

## Branches / deployment

- `main` — reserved for the production build. Not connected to
  `mumbai.aiwo.com` yet.
- `staging/content-review` — current review branch, deployed via a Netlify
  branch/preview deploy for content, UI, and responsive review. This
  deployment intentionally ships without final service photography.

Backend integration (booking APIs, payments) is out of scope for the current
release — all pages are reviewable and functional without it.

See `docs/GIT_GUARDRAILS.md` for repository/commit hygiene rules.
