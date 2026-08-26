import logoWhite from '../assets/brand/aiwo-logo-white.svg'
import './Footer.css'

interface FooterProps {
  tagline: string
  trustItems: { label: string; value: string }[]
  crossSell: { label: string; href: string }[]
  addressLines: string[]
}

export function Footer({ tagline, trustItems, crossSell, addressLines }: FooterProps) {
  return (
    <footer id="footer" className="site-footer section--dark">
      <div className="container site-footer__watermark">FOOTER</div>

      <div className="container site-footer__top">
        <div className="site-footer__brand">
          <img src={logoWhite} alt="AIWO" className="site-footer__logo" />
          <p className="site-footer__tagline">{tagline}</p>
        </div>

        <div className="site-footer__trust">
          {trustItems.map((item) => (
            <div className="site-footer__trust-item" key={item.label}>
              <span className="site-footer__trust-label">{item.label}</span>
              {item.value}
            </div>
          ))}
        </div>
      </div>

      <nav className="container site-footer__nav" aria-label="Footer">
        <div className="site-footer__nav-col">
          <h3>Explore</h3>
          <ul>
            {crossSell.map((item) => (
              <li key={item.label}>
                <a href={item.href}>{item.label}</a>
              </li>
            ))}
          </ul>
        </div>

        <div className="site-footer__nav-col">
          <h3>Contact</h3>
          <ul>
            {addressLines.map((line) => (
              <li key={line}>{line}</li>
            ))}
          </ul>
        </div>
      </nav>

      <div className="container site-footer__legal">
        <span>
          © {new Date().getFullYear()} AIWO. All rights reserved. Privacy Policy &amp; Terms of Service at{' '}
          <a href="https://aiwo.com" target="_blank" rel="noopener noreferrer" className="site-footer__fineprint-link">
            aiwo.com
          </a>
          .
        </span>
        <div className="site-footer__social">
          <a
            href="https://www.instagram.com/aiwohealth"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="AIWO on Instagram"
          >
            Instagram
          </a>
          <a
            href="https://www.linkedin.com/company/aiwohealth"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="AIWO on LinkedIn"
          >
            LinkedIn
          </a>
        </div>
      </div>
    </footer>
  )
}
