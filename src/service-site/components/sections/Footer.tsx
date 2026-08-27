import { Link } from "react-router-dom";

interface FooterProps {
  brand?: string;
}

export function Footer({ brand = "AIWO Longevity Clinic" }: FooterProps) {
  return (
    <footer className="bg-white border-t border-border pt-12 md:pt-16 pb-8">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 md:gap-12 mb-12 text-center md:text-left">

          {/* Links — only the 5 launched Mumbai services, correct routes */}
          <div className="sm:col-span-2">
            <h4 className="font-mono text-xs font-bold uppercase tracking-widest text-foreground mb-4">
              Links
            </h4>
            <div className="grid grid-cols-2 gap-x-8 gap-y-3 text-sm text-muted-foreground">
              <Link to="/" className="hover:text-foreground transition-colors">Home</Link>
              <Link to="/services/iv-therapy" className="hover:text-foreground transition-colors">IV Therapy</Link>
              <Link to="/services/posture-screening" className="hover:text-foreground transition-colors">Posture Screening</Link>
              <Link to="/services/rmr" className="hover:text-foreground transition-colors">RMR Test</Link>
              <Link to="/services/ems-sculpting" className="hover:text-foreground transition-colors">EMS Sculpting</Link>
              <Link to="/services/vo2-max" className="hover:text-foreground transition-colors">VO2 Max Test</Link>
            </div>
          </div>

          {/* Location */}
          <div>
            <h4 className="font-mono text-xs font-bold uppercase tracking-widest text-foreground mb-4">
              Location
            </h4>
            <address className="not-italic text-sm text-muted-foreground leading-relaxed">
              AIWO Longevity Clinic
              <br />
              Level 2, Fairmont Mumbai, T2 Terminal
              <br />
              Chhatrapati Shivaji Maharaj International Airport Road
              <br />
              Mumbai 400 099, Maharashtra, India
            </address>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-mono text-xs font-bold uppercase tracking-widest text-foreground mb-4">
              Contact
            </h4>
            <div className="text-sm text-muted-foreground space-y-2">
              <p>
                <a
                  href="mailto:orders@aiwo.com"
                  className="hover:text-foreground transition-colors break-all"
                >
                  orders@aiwo.com
                </a>
              </p>

              <p className="font-mono text-xs mt-4">
                MON-SAT / 08:00 - 19:00
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 pt-8 border-t border-border font-mono text-[10px] text-muted-foreground uppercase tracking-widest text-center md:text-left">
          <p>© {new Date().getFullYear()} {brand}</p>

          <div className="flex flex-wrap justify-center md:justify-end gap-4">
            <span className="cursor-pointer hover:text-foreground transition-colors">
              Privacy Policy
            </span>
            <span className="cursor-pointer hover:text-foreground transition-colors">
              Terms of Service
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
