import { defineConfig, type Plugin } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from 'path'

// Tailwind v4's @theme block (both its own default theme.css and the
// service-site's `@theme inline` overrides) always compiles to a bare
// `:root,:host { ... }` rule — there's no Tailwind config knob to scope it
// to a custom selector. Left as-is, that rule would redefine --font-sans,
// --font-mono and --radius-* at the document root once a service-page route
// lazy-loads this stylesheet, silently overriding Mumbai's own :root tokens
// (src/styles/tokens.css) for the rest of the SPA session — including after
// navigating back to the untouched Homepage. Rescoping it to .service-site
// keeps inheritance working for everything ported (still resolves top-down
// from .service-site to its descendants) without ever touching real :root.
const rescope = (css: string) => css.replace(/:root\s*,\s*:host\s*\{/g, '.service-site{')
// Matched by a marker custom property unique to service-site/styles/index.css
// (--opaque-button-border-intensity) — Tailwind's compiled output doesn't
// carry reliable source-file provenance through either pipeline below.
const isServiceSiteTheme = (css: string) => css.includes('--opaque-button-border-intensity')

function scopeServiceSiteTheme(): Plugin {
  return {
    name: 'scope-service-site-theme',
    // Production build: Tailwind's real compiled CSS only exists once Rollup
    // has emitted it as a bundle asset — a plain per-module transform hook
    // (even enforce:'post') still sees pre-compiled content.
    generateBundle(_options, bundle) {
      for (const asset of Object.values(bundle)) {
        if (asset.type !== 'asset' || !asset.fileName.endsWith('.css')) continue
        const source = String(asset.source)
        if (!isServiceSiteTheme(source)) continue
        asset.source = rescope(source)
      }
    },
    // Dev server: Tailwind serves its compiled CSS through its own request
    // handling rather than the normal transform chain, so this rewrites the
    // final HTTP response body instead of trying to hook a transform stage.
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        // Only intercept the one request this fix targets — buffering every
        // dev-server response (JS bundles, images, HMR pings) would be wasteful.
        if (!req.url?.includes('service-site/styles/index.css')) return next()
        const originalEnd = res.end.bind(res)
        const originalWrite = res.write.bind(res)
        const chunks: Buffer[] = []
        const toBuffer = (chunk: unknown) =>
          Buffer.isBuffer(chunk) ? chunk : Buffer.from(typeof chunk === 'string' ? chunk : '')

        res.write = ((chunk: unknown, ...args: unknown[]) => {
          if (chunk) chunks.push(toBuffer(chunk))
          return (originalWrite as (...a: unknown[]) => boolean)(chunk, ...args)
        }) as typeof res.write
        res.end = ((chunk?: unknown, ...args: unknown[]) => {
          if (chunk) chunks.push(toBuffer(chunk))
          const body = Buffer.concat(chunks).toString('utf-8')
          res.write = originalWrite
          res.end = originalEnd
          if (isServiceSiteTheme(body)) return originalEnd(rescope(body))
          return (originalEnd as (...a: unknown[]) => typeof res)(chunk, ...args)
        }) as typeof res.end
        next()
      })
    },
  }
}

// https://vite.dev/config/
export default defineConfig({
  // Tailwind's Vite plugin only transforms CSS files that actually contain a
  // Tailwind @import (src/service-site/styles/index.css) — it doesn't affect
  // Mumbai's own plain-CSS files.
  plugins: [react(), tailwindcss(), scopeServiceSiteTheme()],
  resolve: {
    alias: {
      // Matches the source project's own alias convention, scoped to the
      // ported subtree only (src/service-site/lib, src/service-site/components, ...).
      '@': path.resolve(import.meta.dirname, './src/service-site'),
    },
  },
})
