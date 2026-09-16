import { useEffect } from "react";

interface MetaTagsProps {
  title: string;
  description: string;
  /** Route path (e.g. "/services/iv-therapy") — sets canonical + og:url. Omit to leave them untouched (existing pages). */
  path?: string;
  /** Absolute or root-relative URL of a truthful, service-specific image — sets og:image + twitter:image. Omit if none exists yet. */
  image?: string;
}

function setMeta(content: string, selector: string, attr: string, value: string) {
  let el = document.head.querySelector<HTMLMetaElement>(selector);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, value);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
}

export function MetaTags({ title, description, path, image }: MetaTagsProps) {
  useEffect(() => {
    document.title = title;

    setMeta(description, 'meta[name="description"]', "name", "description");
    setMeta(title, 'meta[property="og:title"]', "property", "og:title");
    setMeta(description, 'meta[property="og:description"]', "property", "og:description");
    setMeta(title, 'meta[name="twitter:title"]', "name", "twitter:title");
    setMeta(description, 'meta[name="twitter:description"]', "name", "twitter:description");
    setMeta("website", 'meta[property="og:type"]', "property", "og:type");

    if (path) {
      const url = `${window.location.origin}${path}`;
      setMeta(url, 'meta[property="og:url"]', "property", "og:url");

      let canonical = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
      if (!canonical) {
        canonical = document.createElement("link");
        canonical.setAttribute("rel", "canonical");
        document.head.appendChild(canonical);
      }
      canonical.setAttribute("href", url);
    }

    if (image) {
      const imageUrl = image.startsWith("http") ? image : `${window.location.origin}${image}`;
      setMeta(imageUrl, 'meta[property="og:image"]', "property", "og:image");
      setMeta(imageUrl, 'meta[name="twitter:image"]', "name", "twitter:image");
      setMeta("summary_large_image", 'meta[name="twitter:card"]', "name", "twitter:card");
    }
  }, [title, description, path, image]);

  return null;
}
