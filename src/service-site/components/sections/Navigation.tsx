import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";

export interface NavSection {
  label: string;
  href: string;
}

interface NavigationProps {
  /** Page-specific in-page section anchors (e.g. "#process"). Falls back to the global site links when omitted. */
  sections?: NavSection[];
  ctaLabel?: string;
  /** In-page anchor the CTA button scrolls to. */
  ctaTarget?: string;
  ctaVariant?: "solid" | "outline";
}

const defaultLinks: NavSection[] = [
  { label: "IV Therapy", href: "/services/iv-therapy" },
  { label: "Posture Screening", href: "/services/posture-screening" },
  { label: "RMR Test", href: "/services/rmr" },
  { label: "AIWO Sculpt", href: "/services/ems-sculpting" },
  { label: "VO2 Max Test", href: "/services/vo2-max" },
];

export function Navigation({
  sections,
  ctaLabel = "Book",
  ctaTarget = "#book",
  ctaVariant = "solid",
}: NavigationProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const { pathname: location } = useLocation();

  // Close mobile menu on route change (back/forward navigation too)
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- syncing UI state to a route change, not derivable during render
    setMenuOpen(false);
  }, [location]);

  const closeMenu = () => setMenuOpen(false);

  const scrollToCta = (
    e: React.MouseEvent<HTMLAnchorElement>,
    closeMenuFn?: () => void
  ) => {
    e.preventDefault();
    document.querySelector(ctaTarget)?.scrollIntoView({ behavior: "smooth" });
    closeMenuFn?.();
  };

  const scrollToSection = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string,
    closeMenuFn?: () => void
  ) => {
    e.preventDefault();
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
    closeMenuFn?.();
  };

  const isPageSections = Boolean(sections);
  const navItems = sections ?? defaultLinks;

  const routeLinkClass = (path: string) =>
    `whitespace-nowrap font-mono text-xs uppercase tracking-widest transition-colors hover:text-foreground ${
      location === path ? "text-foreground font-bold" : "text-muted-foreground"
    }`;

  const sectionLinkClass =
    "whitespace-nowrap font-mono text-xs uppercase tracking-widest transition-colors text-muted-foreground hover:text-foreground";

  const ctaClass =
    ctaVariant === "outline"
      ? "shrink-0 bg-white hover:bg-muted text-foreground border border-foreground rounded-none h-10 px-5 font-medium"
      : "shrink-0 bg-black hover:bg-black/90 text-white rounded-none h-10 px-5 font-medium";

  const ctaClassMobile =
    ctaVariant === "outline"
      ? "w-full bg-white hover:bg-muted text-foreground border border-foreground rounded-none h-11 font-medium"
      : "w-full bg-black hover:bg-black/90 text-white rounded-none h-11 font-medium";

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-white">
      <div className="mx-auto flex h-[88px] w-full max-w-[1440px] items-center px-4 sm:px-6 lg:px-8">

        {/* Logo — always routes home, regardless of which service page it's clicked from */}
        <Link to="/" className="shrink-0 flex items-center no-underline" onClick={closeMenu}>
          <img
            src="/aiwologo.jpg"
            srcSet="/aiwologo-v1-368.webp 368w, /aiwologo-v1-736.webp 736w"
            sizes="(max-width: 767px) 74px, 104px"
            alt="AIWO"
            className="h-10 w-auto md:h-14 object-contain mix-blend-multiply"
            width={3132}
            height={1700}
          />
        </Link>

        {/* Desktop nav — hidden below xl */}
        <nav className="ml-auto hidden min-w-0 items-center gap-5 xl:flex xl:gap-7 2xl:gap-10">
          {isPageSections
            ? navItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={(e) => scrollToSection(e, item.href)}
                  className={sectionLinkClass}
                >
                  {item.label}
                </a>
              ))
            : navItems.map((item) => (
                <Link key={item.href} to={item.href} className={routeLinkClass(item.href)}>
                  {item.label}
                </Link>
              ))}
          <Button asChild className={ctaClass}>
            <a href={ctaTarget} onClick={scrollToCta}>{ctaLabel}</a>
          </Button>
        </nav>

        {/* Hamburger — visible below xl */}
        <button
          type="button"
          className="ml-auto xl:hidden p-2 -mr-2 text-foreground"
          onClick={() => setMenuOpen((prev) => !prev)}
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
        >
          {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile menu panel */}
      {menuOpen && (
        <div className="xl:hidden border-t border-border bg-white">
          <nav className="mx-auto max-w-[1440px] px-4 sm:px-6 py-6 flex flex-col gap-5">
            {isPageSections
              ? navItems.map((item) => (
                  <a
                    key={item.href}
                    href={item.href}
                    onClick={(e) => scrollToSection(e, item.href, closeMenu)}
                    className={sectionLinkClass}
                  >
                    {item.label}
                  </a>
                ))
              : navItems.map((item) => (
                  <Link key={item.href} to={item.href} className={routeLinkClass(item.href)} onClick={closeMenu}>
                    {item.label}
                  </Link>
                ))}
            <div className="pt-2 border-t border-border">
              <Button asChild className={ctaClassMobile}>
                <a href={ctaTarget} onClick={(e) => scrollToCta(e, closeMenu)}>{ctaLabel}</a>
              </Button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
