import { useEffect } from 'react'

interface SeoProps {
  title: string
  description: string
  path: string
}

function setMeta(name: string, content: string, attr: 'name' | 'property' = 'name') {
  let el = document.head.querySelector<HTMLMetaElement>(`meta[${attr}="${name}"]`)
  if (!el) {
    el = document.createElement('meta')
    el.setAttribute(attr, name)
    document.head.appendChild(el)
  }
  el.setAttribute('content', content)
}

function setCanonical(href: string) {
  let el = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]')
  if (!el) {
    el = document.createElement('link')
    el.setAttribute('rel', 'canonical')
    document.head.appendChild(el)
  }
  el.setAttribute('href', href)
}

// Technical SEO plumbing only (document title, meta description, canonical, OG
// tags) — no marketing copy is authored here. Per Phase 3 instructions, page
// title/description are supplied by each route's data and must be confirmed
// separately before they're treated as final marketing copy.
export function Seo({ title, description, path }: SeoProps) {
  useEffect(() => {
    document.title = title
    setMeta('description', description)
    setMeta('og:title', title, 'property')
    setMeta('og:description', description, 'property')
    setMeta('og:type', 'website', 'property')
    const canonicalHref = `${window.location.origin}${path}`
    setMeta('og:url', canonicalHref, 'property')
    setCanonical(canonicalHref)
  }, [title, description, path])

  return null
}
