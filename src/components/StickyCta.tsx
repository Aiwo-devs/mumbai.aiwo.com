import { useEffect, useRef, useState } from 'react'
import { Button } from './ui/Button'
import './StickyCta.css'

interface StickyCtaProps {
  label: string
  price: string
  ctaLabel?: string
  href: string
  /** Document scroll-progress fraction (0–1) at which the bar reveals — e.g. 0.3
   * for Posture's free-offer page (earlier prompt), 0.4 for the others. Computed
   * from live scroll position, not a hardcoded pixel value, so it holds regardless
   * of page length/content changes. */
  revealThreshold?: number
}

export function StickyCta({ label, price, ctaLabel = 'Book Now', href, revealThreshold = 0.4 }: StickyCtaProps) {
  const [pastThreshold, setPastThreshold] = useState(false)
  const [nearFooter, setNearFooter] = useState(false)
  const ticking = useRef(false)

  useEffect(() => {
    function computeProgress() {
      const scrollable = document.documentElement.scrollHeight - window.innerHeight
      const progress = scrollable > 0 ? window.scrollY / scrollable : 0
      setPastThreshold(progress >= revealThreshold)
      ticking.current = false
    }

    function onScroll() {
      if (ticking.current) return
      ticking.current = true
      window.requestAnimationFrame(computeProgress)
    }

    computeProgress()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [revealThreshold])

  useEffect(() => {
    const footer = document.getElementById('footer')
    if (!footer) return
    const footerObserver = new IntersectionObserver(([entry]) => setNearFooter(entry.isIntersecting))
    footerObserver.observe(footer)
    return () => footerObserver.disconnect()
  }, [])

  const visible = pastThreshold && !nearFooter

  return (
    <div className={visible ? 'sticky-cta sticky-cta--visible' : 'sticky-cta'} aria-hidden={!visible}>
      <div className="sticky-cta__info">
        <span className="sticky-cta__label">{label}</span>
        <span className="sticky-cta__price">{price}</span>
      </div>
      <Button href={href} variant="primary" size="md" tabIndex={visible ? 0 : -1}>
        {ctaLabel}
      </Button>
    </div>
  )
}
