import { useEffect, useState } from 'react'
import { ArrowUpIcon } from './ui/Icons'

// Doubles as an accessibility aid: a keyboard-operable way back to the top of
// a long page without scrolling.
export function BackToTop() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    let ticking = false
    function onScroll() {
      if (ticking) return
      ticking = true
      window.requestAnimationFrame(() => {
        setVisible(window.scrollY > window.innerHeight * 0.75)
        ticking = false
      })
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  function handleClick() {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    window.scrollTo({ top: 0, behavior: reduceMotion ? 'auto' : 'smooth' })
  }

  return (
    <button
      type="button"
      className={visible ? 'back-to-top back-to-top--visible' : 'back-to-top'}
      onClick={handleClick}
      aria-label="Back to top"
      tabIndex={visible ? 0 : -1}
    >
      <ArrowUpIcon className="back-to-top__icon" />
    </button>
  )
}
