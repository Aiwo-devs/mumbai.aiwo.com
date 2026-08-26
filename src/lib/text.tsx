import { Fragment } from 'react'

// Splits `text` on `emphasize` and wraps matches in <strong>, preserving the rest verbatim.
export function withEmphasis(text: string, emphasize: string) {
  if (!emphasize) return text
  const parts = text.split(emphasize)
  return parts.map((part, i) => (
    <Fragment key={i}>
      {part}
      {i < parts.length - 1 && <strong>{emphasize}</strong>}
    </Fragment>
  ))
}

// Splits `text` on `soft` and wraps matches in a lighter-weight/lighter-color span —
// a visual de-emphasis (draws the eye to what's left unwrapped), the inverse of
// withEmphasis's bold treatment. Styling lives in .hero__headline-soft (Hero.css).
export function withSoftClause(text: string, soft: string) {
  if (!soft) return text
  const parts = text.split(soft)
  return parts.map((part, i) => (
    <Fragment key={i}>
      {part}
      {i < parts.length - 1 && <span className="hero__headline-soft">{soft}</span>}
    </Fragment>
  ))
}

// Renders straight "quotes" as typographic curly quotes. Punctuation only — no words change.
export function smartQuotes(text: string) {
  let open = true
  return text.replace(/"/g, () => {
    const glyph = open ? '“' : '”'
    open = !open
    return glyph
  })
}
