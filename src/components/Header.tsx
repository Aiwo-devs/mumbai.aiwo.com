import { useEffect, useRef, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import logoBlack from '../assets/brand/aiwo-logo-black.svg'
import { Button } from './ui/Button'
import { ServicesMenu } from './ServicesMenu'
import { ChevronDownIcon } from './ui/Icons'
import { serviceNavigation } from '../data/serviceNavigation'
import './Header.css'

interface HeaderProps {
  navLinks: { href: string; label: string }[]
  bookHref: string
  bookLabel?: string
  ctaHref: string
  ctaFullLabel: string
  ctaShortLabel: string
  mobileCtaLabel: string
}

export function Header({
  navLinks,
  bookHref,
  bookLabel = 'Book a call',
  ctaHref,
  ctaFullLabel,
  ctaShortLabel,
  mobileCtaLabel,
}: HeaderProps) {
  const [menuOpen, setMenuOpen] = useState(false)
  const [servicesOpen, setServicesOpen] = useState(false)
  const [drawerTop, setDrawerTop] = useState(0)
  const headerRef = useRef<HTMLElement>(null)
  const burgerRef = useRef<HTMLButtonElement>(null)
  const firstDrawerLinkRef = useRef<HTMLButtonElement>(null)
  const { pathname } = useLocation()
  const isServicesActive = pathname.startsWith('/services/')

  useEffect(() => {
    document.documentElement.style.overflow = menuOpen ? 'hidden' : ''
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => {
      document.documentElement.style.overflow = ''
      document.body.style.overflow = ''
    }
  }, [menuOpen])

  useEffect(() => {
    function onResize() {
      if (window.innerWidth > 1080) setMenuOpen(false)
    }
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  // The drawer must begin below the announcement bar + header, whatever their
  // combined height happens to be (it changes if the banner text wraps) — so
  // this is measured live via getBoundingClientRect rather than a fixed
  // --nav-height offset, which only ever accounted for the header itself.
  useEffect(() => {
    if (!menuOpen) return
    function updateOffset() {
      if (headerRef.current) setDrawerTop(headerRef.current.getBoundingClientRect().bottom)
    }
    updateOffset()
    window.addEventListener('resize', updateOffset)
    return () => window.removeEventListener('resize', updateOffset)
  }, [menuOpen])

  useEffect(() => {
    if (!menuOpen) return
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') setMenuOpen(false)
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [menuOpen])

  // Accessibility: move focus into the drawer when it opens (previously focus
  // stayed on the burger button, so keyboard/screen-reader users had no signal
  // the drawer had opened) — mirrors closeMenu's existing focus-return-to-burger.
  useEffect(() => {
    if (menuOpen) firstDrawerLinkRef.current?.focus()
  }, [menuOpen])

  // Resets the mobile Services accordion whenever the drawer itself closes,
  // regardless of which path closed it (explicit close, resize auto-close,
  // Escape, or route navigation) — so it never reopens already-expanded.
  // Adjusted during render (React's recommended pattern for "reset state
  // when a prop changes") rather than via an effect calling setState after
  // an extra render.
  const [prevMenuOpen, setPrevMenuOpen] = useState(menuOpen)
  if (menuOpen !== prevMenuOpen) {
    setPrevMenuOpen(menuOpen)
    if (!menuOpen) setServicesOpen(false)
  }

  function closeMenu() {
    setMenuOpen(false)
    burgerRef.current?.focus()
  }

  return (
    <header className="site-nav" ref={headerRef}>
      {/* Accessibility: lets keyboard users jump straight past the header/nav
          on every page instead of tabbing through it each time. Visually
          hidden until focused. */}
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>
      <div className="container site-nav__bar">
        {/* Always navigates to the homepage, regardless of which page it's
            clicked from — previously this was an in-page "#hero" anchor, which
            on a service page just scrolled to that page's own top instead of
            going home. */}
        <Link to="/" className="site-nav__logo" aria-label="AIWO home">
          <img src={logoBlack} alt="AIWO" />
        </Link>

        <nav className="site-nav__links" aria-label="Primary">
          <ServicesMenu items={serviceNavigation} />
          {navLinks.map((link) => (
            <a key={link.href} href={link.href}>
              {link.label}
            </a>
          ))}
        </nav>

        <div className="site-nav__actions">
          <a href={bookHref} className="site-nav__login">
            {bookLabel}
          </a>
          <Button href={ctaHref} variant="secondary" size="md" className="site-nav__cta">
            <span className="site-nav__cta-full">{ctaFullLabel}</span>
            <span className="site-nav__cta-short">{ctaShortLabel}</span>
          </Button>
        </div>

        <button
          type="button"
          ref={burgerRef}
          className={menuOpen ? 'site-nav__burger site-nav__burger--open' : 'site-nav__burger'}
          aria-expanded={menuOpen}
          aria-controls="site-nav-mobile"
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          onClick={() => setMenuOpen((v) => !v)}
        >
          <span />
          <span />
        </button>
      </div>

      {menuOpen && (
        <div id="site-nav-mobile" className="site-nav__mobile" style={{ top: drawerTop || undefined }}>
          <div className="site-nav__mobile-services">
            <button
              type="button"
              ref={firstDrawerLinkRef}
              className={
                isServicesActive
                  ? 'site-nav__mobile-services-trigger site-nav__mobile-services-trigger--active'
                  : 'site-nav__mobile-services-trigger'
              }
              aria-expanded={servicesOpen}
              aria-controls="site-nav-mobile-services-panel"
              onClick={() => setServicesOpen((v) => !v)}
            >
              Services
              <ChevronDownIcon
                className={
                  servicesOpen
                    ? 'site-nav__mobile-services-chevron site-nav__mobile-services-chevron--open'
                    : 'site-nav__mobile-services-chevron'
                }
              />
            </button>
            {servicesOpen && (
              <div id="site-nav-mobile-services-panel" className="site-nav__mobile-services-panel">
                {serviceNavigation.map((service) => {
                  const isActive = pathname === service.href
                  return (
                    <Link
                      key={service.href}
                      to={service.href}
                      className={
                        isActive
                          ? 'site-nav__mobile-services-link site-nav__mobile-services-link--active'
                          : 'site-nav__mobile-services-link'
                      }
                      aria-current={isActive ? 'page' : undefined}
                      onClick={closeMenu}
                    >
                      {service.label}
                    </Link>
                  )
                })}
              </div>
            )}
          </div>
          {navLinks.map((link) => (
            <a key={link.href} href={link.href} onClick={closeMenu}>
              {link.label}
            </a>
          ))}
          <Button
            href={ctaHref}
            variant="primary"
            size="lg"
            className="site-nav__mobile-cta"
            onClick={closeMenu}
          >
            {mobileCtaLabel}
          </Button>
          <a href={bookHref} className="site-nav__mobile-login" onClick={closeMenu}>
            {bookLabel}
          </a>
        </div>
      )}
    </header>
  )
}
