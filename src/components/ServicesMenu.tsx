import { useEffect, useRef, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { ChevronDownIcon } from './ui/Icons'
import type { ServiceNavItem } from '../data/serviceNavigation'
import './ServicesMenu.css'

interface ServicesMenuProps {
  items: ServiceNavItem[]
}

// Desktop-only persistent service-discovery dropdown, mounted inside
// .site-nav__links (hidden below 1080px by that container's own existing
// media query — no new breakpoint introduced). A disclosure control, not an
// ARIA menu: real <Link>s in normal Tab order, no menu/menuitem roving-focus
// model, matching how the rest of this header's navigation already works.
//
// Open state has two independent sources, both driving the same CSS classes:
//  - :hover / :focus-within — instant, zero-JS pointer/keyboard preview. The
//    panel sits flush against the trigger (no gap) inside one continuously-
//    hoverable wrapper, so moving the cursor from trigger to panel never
//    drops out of :hover and closes prematurely.
//  - the `open` JS state — set by clicking/tapping the trigger, for touch
//    devices and users who click rather than hover. Closed explicitly on
//    Escape, outside click, and route change.
export function ServicesMenu({ items }: ServicesMenuProps) {
  const [open, setOpen] = useState(false)
  const { pathname } = useLocation()
  const rootRef = useRef<HTMLDivElement>(null)
  const triggerRef = useRef<HTMLButtonElement>(null)
  const panelId = 'services-menu-panel'
  const isServicesActive = pathname.startsWith('/services/')

  // Reset on route change, adjusted during render (React's recommended
  // pattern for "reset state when a prop changes") rather than via an effect
  // that would call setState after an extra render.
  const [prevPathname, setPrevPathname] = useState(pathname)
  if (pathname !== prevPathname) {
    setPrevPathname(pathname)
    setOpen(false)
  }

  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if (e.key !== 'Escape') return
      if (!rootRef.current) return
      const relevant = open || rootRef.current.contains(document.activeElement)
      if (!relevant) return
      setOpen(false)
      triggerRef.current?.focus()
    }
    function onPointerDown(e: MouseEvent) {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener('keydown', onKeyDown)
    document.addEventListener('mousedown', onPointerDown)
    return () => {
      document.removeEventListener('keydown', onKeyDown)
      document.removeEventListener('mousedown', onPointerDown)
    }
  }, [open])

  return (
    <div ref={rootRef} className={open ? 'services-menu services-menu--open' : 'services-menu'}>
      <button
        type="button"
        ref={triggerRef}
        className={
          isServicesActive ? 'services-menu__trigger services-menu__trigger--active' : 'services-menu__trigger'
        }
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => setOpen((v) => !v)}
      >
        Services
        <ChevronDownIcon className="services-menu__chevron" />
      </button>

      <div id={panelId} className="services-menu__panel">
        {items.map((item) => {
          const isActive = pathname === item.href
          return (
            <Link
              key={item.href}
              to={item.href}
              className={isActive ? 'services-menu__link services-menu__link--active' : 'services-menu__link'}
              aria-current={isActive ? 'page' : undefined}
              onClick={() => setOpen(false)}
            >
              {item.label}
            </Link>
          )
        })}
      </div>
    </div>
  )
}
