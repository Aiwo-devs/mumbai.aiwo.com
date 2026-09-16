import { Fragment } from "react";
import { Reveal } from "./Reveal";

export interface ContentGraphNode {
  label: string;
  body: string;
}

interface ContentGraphProps {
  eyebrow: string;
  heading: string;
  /** Four journey nodes: need/context → assessment → service → outcome/direction. Copy must be derived from existing page content. */
  nodes: [ContentGraphNode, ContentGraphNode, ContentGraphNode, ContentGraphNode];
}

function Connector() {
  return (
    <div className="flex items-center justify-center py-1 lg:py-0 lg:px-2 text-muted-foreground" aria-hidden="true">
      <svg className="lg:hidden" width="16" height="28" viewBox="0 0 16 28" fill="none">
        <line x1="8" y1="0" x2="8" y2="20" stroke="currentColor" strokeOpacity="0.25" strokeWidth="1" />
        <path d="M2 16L8 22L14 16" stroke="currentColor" strokeOpacity="0.4" strokeWidth="1" />
      </svg>
      <svg className="hidden lg:block" width="32" height="16" viewBox="0 0 32 16" fill="none">
        <line x1="0" y1="8" x2="24" y2="8" stroke="currentColor" strokeOpacity="0.25" strokeWidth="1" />
        <path d="M18 2L24 8L18 14" stroke="currentColor" strokeOpacity="0.4" strokeWidth="1" />
      </svg>
    </div>
  );
}

/** Shared, grayscale "service journey" information graph — reused across all service pages. Text/SVG only, no chart libraries. */
export function ContentGraph({ eyebrow, heading, nodes }: ContentGraphProps) {
  return (
    <section className="py-16 lg:py-24 bg-white border-b border-border">
      <div className="container mx-auto px-4 sm:px-6 max-w-7xl">
        <Reveal>
          <div className="font-mono text-[10px] sm:text-xs font-bold uppercase tracking-widest text-muted-foreground mb-4">
            {eyebrow}
          </div>
          <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl leading-[1.05] text-foreground mb-10 lg:mb-14 max-w-2xl">
            {heading}
          </h2>
        </Reveal>

        <div className="flex flex-col lg:flex-row lg:items-stretch">
          {nodes.map((node, i) => (
            <Fragment key={node.label}>
              <Reveal delay={i * 0.06} className="lg:flex-1">
                <div className="border border-border p-6 lg:p-7 h-full">
                  <div className="font-mono text-[11px] tracking-widest text-muted-foreground/60 mb-3">
                    {String(i + 1).padStart(2, "0")}
                  </div>
                  <div className="font-mono text-xs font-bold uppercase tracking-widest text-foreground mb-3">
                    {node.label}
                  </div>
                  <p className="text-[13px] lg:text-[14px] leading-relaxed text-muted-foreground">{node.body}</p>
                </div>
              </Reveal>
              {i < nodes.length - 1 && <Connector />}
            </Fragment>
          ))}
        </div>
      </div>
    </section>
  );
}
