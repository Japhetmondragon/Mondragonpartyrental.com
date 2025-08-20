import { useEffect } from "react";

export default function SEO({ title, description, og = {}, jsonLd }) {
  useEffect(() => {
    if (title) document.title = title;

    const setMeta = (name, content, attr = "name") => {
      if (!content) return;
      let tag = document.head.querySelector(`meta[${attr}="${name}"]`);
      if (!tag) {
        tag = document.createElement("meta");
        tag.setAttribute(attr, name);
        document.head.appendChild(tag);
      }
      tag.setAttribute("content", content);
    };

    setMeta("description", description);
    setMeta("og:title", og.title || title, "property");
    setMeta("og:description", og.description || description, "property");
    setMeta("og:type", og.type || "website", "property");
    if (og.image) setMeta("og:image", og.image, "property");

    // JSON-LD
    const id = "route-jsonld";
    let script = document.getElementById(id);
    if (jsonLd) {
      if (!script) {
        script = document.createElement("script");
        script.type = "application/ld+json";
        script.id = id;
        document.head.appendChild(script);
      }
      script.textContent = JSON.stringify(jsonLd);
    } else if (script) {
      script.remove();
    }
  }, [title, description, og.title, og.description, og.type, og.image, jsonLd]);

  return null; // no visible UI
}
