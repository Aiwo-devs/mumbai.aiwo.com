import { useEffect } from "react";

interface StructuredDataProps {
  /** Unique id so multiple schema blocks (Service, FAQPage, BreadcrumbList) can coexist on one page without clobbering each other. */
  id: string;
  data: Record<string, unknown>;
}

/** Injects a single JSON-LD <script> block into <head>, keyed by id, and removes it on unmount. */
export function StructuredData({ id, data }: StructuredDataProps) {
  useEffect(() => {
    const scriptId = `ld-json-${id}`;
    let el = document.getElementById(scriptId) as HTMLScriptElement | null;
    if (!el) {
      el = document.createElement("script");
      el.id = scriptId;
      el.type = "application/ld+json";
      document.head.appendChild(el);
    }
    el.textContent = JSON.stringify(data);

    return () => {
      el?.remove();
    };
  }, [id, data]);

  return null;
}
