import { useEffect, useState } from 'react'
import { Button } from './ui/Button'
import './ConversionModal.css'

const DELAY_MS = 26000

interface ConversionModalProps {
  sessionKey: string
  eyebrow: string
  headline: string
  bodyLine: string
  ctaLabel: string
  ctaHref: string
}

export function ConversionModal({ sessionKey, eyebrow, headline, bodyLine, ctaLabel, ctaHref }: ConversionModalProps) {
  const [open, setOpen] = useState(false)

  useEffect(() => {
    if (sessionStorage.getItem(sessionKey)) return

    let shown = false
    function reveal() {
      if (shown) return
      const pricing = document.getElementById('pricing')
      const bookingAccess = document.getElementById('booking-access')
      const nearConversion = [pricing, bookingAccess].some((el) => {
        if (!el) return false
        const rect = el.getBoundingClientRect()
        return rect.top < window.innerHeight && rect.bottom > 0
      })
      if (nearConversion) return
      shown = true
      sessionStorage.setItem(sessionKey, '1')
      setOpen(true)
    }

    const timer = window.setTimeout(reveal, DELAY_MS)

    function onExitIntent(event: MouseEvent) {
      if (event.clientY <= 0) reveal()
    }
    document.addEventListener('mouseout', onExitIntent)

    return () => {
      window.clearTimeout(timer)
      document.removeEventListener('mouseout', onExitIntent)
    }
  }, [sessionKey])

  useEffect(() => {
    document.documentElement.style.overflow = open ? 'hidden' : ''
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.documentElement.style.overflow = ''
      document.body.style.overflow = ''
    }
  }, [open])

  useEffect(() => {
    if (!open) return
    function onKey(event: KeyboardEvent) {
      if (event.key === 'Escape') setOpen(false)
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [open])

  if (!open) return null

  return (
    <div className="conversion-modal" role="presentation" onClick={() => setOpen(false)}>
      <div
        className="conversion-modal__card"
        role="dialog"
        aria-modal="true"
        aria-labelledby="conversion-modal-title"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          className="conversion-modal__close"
          aria-label="Close"
          onClick={() => setOpen(false)}
        >
          ×
        </button>
        <span className="eyebrow eyebrow--on-dark">{eyebrow}</span>
        <h2 id="conversion-modal-title" className="conversion-modal__title">
          Still deciding? {headline}
        </h2>
        <p className="conversion-modal__body">{bodyLine}</p>
        <div className="conversion-modal__actions">
          <Button href={ctaHref} variant="primary" size="lg" onClick={() => setOpen(false)}>
            {ctaLabel}
          </Button>
          <button type="button" className="conversion-modal__dismiss" onClick={() => setOpen(false)}>
            Not right now
          </button>
        </div>
      </div>
    </div>
  )
}
