import { buildSeoModel } from "../../../shared/seo.js";

function setMeta(attribute, key, content) {
  if (!content) return;

  let element = document.head.querySelector(`meta[${attribute}="${key}"]`);
  if (!element) {
    element = document.createElement("meta");
    element.setAttribute(attribute, key);
    document.head.appendChild(element);
  }
  element.setAttribute("content", content);
}

function setLink(rel, href) {
  if (!href) return;

  let element = document.head.querySelector(`link[rel="${rel}"]`);
  if (!element) {
    element = document.createElement("link");
    element.setAttribute("rel", rel);
    document.head.appendChild(element);
  }
  element.setAttribute("href", href);
}

/**
 * Actualización en runtime de los metadatos.
 *
 * Los rastreadores y las redes sociales leen el HTML generado en build; esta
 * función mantiene la pestaña y las herramientas del navegador sincronizadas
 * cuando el CMS cambia sin reconstruir.
 */
export function applySeo(clinic, treatments = []) {
  if (typeof document === "undefined") return;

  const model = buildSeoModel(clinic, treatments);

  document.title = model.title;
  setMeta("name", "description", model.description);
  setMeta("name", "author", model.name);
  setLink("canonical", model.canonical);

  setMeta("property", "og:site_name", model.name);
  setMeta("property", "og:title", model.title);
  setMeta("property", "og:description", model.description);
  setMeta("property", "og:url", model.canonical);
  setMeta("property", "og:image", model.ogImage);
  setMeta("property", "og:image:secure_url", model.ogImage);
  setMeta("property", "og:image:alt", model.ogImageAlt);

  setMeta("name", "twitter:title", model.title);
  setMeta("name", "twitter:description", model.description);
  setMeta("name", "twitter:image", model.ogImage);
  setMeta("name", "twitter:image:alt", model.ogImageAlt);

  const jsonLd = document.head.querySelector('script[type="application/ld+json"]');
  if (jsonLd) {
    jsonLd.textContent = JSON.stringify(model.jsonLd, null, 2);
  }
}
