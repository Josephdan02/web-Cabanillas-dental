/**
 * Construcción e inyección de metadatos SEO a partir del contenido del CMS.
 *
 * Se usa en dos momentos:
 *  - build: un plugin de Vite inyecta los valores en index.html para que los
 *    rastreadores y las redes sociales lean el HTML inicial.
 *  - runtime: la portada actualiza los mismos valores tras cargar el JSON.
 *
 * El HTML inicial sigue siendo la fuente autoritativa para SEO.
 */

import { asString, isHttpsUrl, isRecord } from "./content-schema.js";
import { SITE_CANONICAL_URL } from "./site-config.js";

const COUNTRY_CODES = {
  peru: "PE",
  "perú": "PE",
  espana: "ES",
  "españa": "ES",
  mexico: "MX",
  "méxico": "MX",
  colombia: "CO",
  chile: "CL",
  argentina: "AR",
  ecuador: "EC",
  bolivia: "BO"
};

export function absoluteUrl(value, base = SITE_CANONICAL_URL) {
  const path = asString(value);
  if (!path) return "";
  if (/^https?:\/\//i.test(path)) return path;

  try {
    return new URL(path, base).href;
  } catch {
    return path;
  }
}

function countryCode(country) {
  const key = asString(country).toLowerCase();
  return COUNTRY_CODES[key] || asString(country) || "PE";
}

const READABLE_DAY_GROUPS = [
  {
    pattern: /^lunes?\s*(?:a|–|-|hasta)\s*s[áa]bados?$/i,
    days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
  },
  {
    pattern: /^lunes?\s*(?:a|–|-|hasta)\s*viernes$/i,
    days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"]
  },
  {
    pattern: /^lunes?\s*(?:a|–|-|hasta)\s*domingos?$/i,
    days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]
  }
];

function to24Hour(hour, minutes, marker) {
  let hours = Number(hour);
  const value = asString(marker);

  if (/p/i.test(value) && hours < 12) hours += 12;
  if (/a/i.test(value) && hours === 12) hours = 0;

  return `${String(hours).padStart(2, "0")}:${minutes}`;
}

/**
 * Convierte un texto legible ("Lunes a sábado" + "8:30 a. m. – 1:00 p. m.")
 * en una especificación schema.org. Si no se puede interpretar devuelve null:
 * es preferible no publicar horarios a inventarlos.
 */
export function buildReadableSpec(days, range) {
  const dayText = asString(days);
  const rangeText = asString(range);
  if (!dayText || !rangeText) return null;

  const dayGroup = READABLE_DAY_GROUPS.find((group) => group.pattern.test(dayText));
  if (!dayGroup) return null;

  const validMatch = rangeText.trim().replace(/[\u2010-\u2015\u2212]/g, "-").match(
    /^(\d{1,2}):(\d{2})\s*([ap])\.?\s?m\.?\s*-\s*(\d{1,2}):(\d{2})\s*([ap])\.?\s?m\.?$/i
  );
  if (!validMatch) return null;

  const [, openHourText, openMinuteText, openMarker, closeHourText, closeMinuteText, closeMarker] = validMatch;
  const validClock = (hourText, minuteText) => {
    const hour = Number(hourText);
    const minute = Number(minuteText);
    return hour >= 1 && hour <= 12 && minute >= 0 && minute <= 59;
  };
  if (!validClock(openHourText, openMinuteText) || !validClock(closeHourText, closeMinuteText)) return null;

  const opens = to24Hour(openHourText, openMinuteText, openMarker);
  const closes = to24Hour(closeHourText, closeMinuteText, closeMarker);
  const toMinutes = (time) => Number(time.slice(0, 2)) * 60 + Number(time.slice(3));
  if (toMinutes(opens) >= toMinutes(closes)) return null;

  return {
    "@type": "OpeningHoursSpecification",
    dayOfWeek: dayGroup.days,
    opens,
    closes
  };
}

export function buildSeoModel(clinic = {}, treatments = []) {
  const source = isRecord(clinic) ? clinic : {};
  const seo = isRecord(source.seo) ? source.seo : {};
  const images = isRecord(source.images) ? source.images : {};
  const social = isRecord(source.social) ? source.social : {};

  const name = asString(source.name, "Dental Cabanillas");
  const city = asString(source.city, "Huánuco");
  const country = asString(source.country, "Perú");

  const canonical = SITE_CANONICAL_URL;
  const title = asString(seo.title) || `${name} | Clínica Dental en ${city}`;
  const description =
    asString(seo.description) ||
    `Clínica dental en ${city} con ortodoncia, implantes, endodoncia, estética dental y atención para niños, jóvenes y adultos. Reserva tu cita por WhatsApp.`;

  const ogImagePath =
    asString(seo.ogImage) ||
    asString(images.heroReceptionWide) ||
    "/assets/hero_reception_wide-DLcoYUy6.webp";
  const ogImage = absoluteUrl(ogImagePath, canonical);
  const ogImageAlt =
    asString(seo.ogImageAlt) ||
    `Recepción de la clínica ${name} en ${city}`;
  const logo = absoluteUrl(
    asString(images.logo) || "/assets/logo-Dpx6q6rQ.webp",
    canonical
  );

  const treatmentNames = (Array.isArray(treatments) ? treatments : [])
    .map((item) => asString(item?.name))
    .filter(Boolean);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Dentist",
    "@id": `${canonical}#clinic`,
    name,
    url: canonical,
    image: ogImage,
    logo,
    description,
    telephone: asString(source.phoneDisplay),
    address: {
      "@type": "PostalAddress",
      streetAddress: asString(source.address),
      addressLocality: city,
      addressRegion: city,
      addressCountry: countryCode(country)
    },
    areaServed: {
      "@type": "City",
      name: city
    },
    medicalSpecialty: "Dentistry",
    hasMap: isHttpsUrl(source.mapsUrl) ? source.mapsUrl : undefined,
    sameAs: [social.facebook, social.instagram, social.tiktok]
      .filter((url) => isHttpsUrl(url))
  };

  // El horario visible es la única fuente: los datos SEO se derivan de `hours`.
  const readableHours = isRecord(source.hours)
    ? [
        buildReadableSpec(source.hours.days, source.hours.morning),
        buildReadableSpec(source.hours.days, source.hours.afternoon)
      ].filter(Boolean)
    : [];
  if (readableHours.length) {
    jsonLd.openingHoursSpecification = readableHours;
  }

  if (treatmentNames.length) {
    jsonLd.hasOfferCatalog = {
      "@type": "OfferCatalog",
      name: "Servicios odontológicos",
      itemListElement: treatmentNames.map((name) => ({
        "@type": "Offer",
        itemOffered: { "@type": "MedicalProcedure", name }
      }))
    };
  }

  return {
    name,
    title,
    description,
    canonical,
    ogImage,
    ogImageAlt,
    logo,
    keywords: asString(seo.keywords),
    jsonLd
  };
}

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function escapeRegExp(value) {
  return String(value).replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function replaceMeta(html, attribute, key, value) {
  const keyPattern = escapeRegExp(key);
  // Los grupos de reemplazo respetan comillas dobles o simples por separado
  // para no alterar el resto del documento.
  const patterns = [
    new RegExp(
      `(<meta\\s+[^>]*?${attribute}=["']${keyPattern}["'][^>]*?content=)(["'])[^"']*\\2`,
      "i"
    ),
    new RegExp(
      `(<meta\\s+[^>]*?content=)(["'])[^"']*\\2([^>]*?${attribute}=["']${keyPattern}["'])`,
      "i"
    )
  ];

  for (const pattern of patterns) {
    if (pattern.test(html)) {
      return html.replace(pattern, (_match, start, quote, tail) =>
        `${start}${quote}${escapeHtml(value)}${quote}${tail || ""}`
      );
    }
  }

  return html;
}

function replaceCanonical(html, canonical) {
  return html.replace(
    /(<link\s+[^>]*rel=["']canonical["'][^>]*?href=)(["'])[^"']*\2/i,
    (_match, start, quote) => `${start}${quote}${escapeHtml(canonical)}${quote}`
  );
}

function replaceOgUrl(html, canonical) {
  return html.replace(
    /(<meta\s+[^>]*property=["']og:url["'][^>]*?content=)(["'])[^"']*\2/i,
    (_match, start, quote) => `${start}${quote}${escapeHtml(canonical)}${quote}`
  );
}

function replacePreloadImage(html, image) {
  // La precarga usa la ruta local (la misma que sirve Vite y que usan los <img>);
  // las meta de Open Graph/Twitter sí usan la URL absoluta.
  const localPath = image.replace(/^https:\/\/[^/]+/, "") || image;
  // Solo la etiqueta <link> de precarga: `[^>]` evita cruzar el cierre de la
  // etiqueta (y por tanto tocar el <script> del bundle).
  return html.replace(
    /(<link(?=[^>]*rel=["']preload["'])[^>]*href=)(["'])[^"']*\2/i,
    (_match, start, quote) => `${start}${quote}${escapeHtml(localPath)}${quote}`
  );
}

function replaceJsonLd(html, jsonLd) {
  const serialized = JSON.stringify(jsonLd, null, 2).replace(/<\//g, "<\\/");
  return html.replace(
    /<script\s+type=["']application\/ld\+json["'][^>]*>[\s\S]*?<\/script>/i,
    `<script type="application/ld+json">\n${serialized}\n    </script>`
  );
}

export function injectSeo(html, model) {
  let output = html;

  output = output.replace(/<title>[\s\S]*?<\/title>/i, `<title>${escapeHtml(model.title)}</title>`);
  output = replaceMeta(output, "name", "description", model.description);
  output = replaceMeta(output, "name", "author", model.name);
  output = replaceCanonical(output, model.canonical);

  output = replaceMeta(output, "property", "og:site_name", model.name);
  output = replaceMeta(output, "property", "og:title", model.title);
  output = replaceMeta(output, "property", "og:description", model.description);
  output = replaceOgUrl(output, model.canonical);
  output = replaceMeta(output, "property", "og:image", model.ogImage);
  output = replaceMeta(output, "property", "og:image:secure_url", model.ogImage);
  output = replaceMeta(output, "property", "og:image:alt", model.ogImageAlt);
  output = replaceMeta(output, "name", "keywords", model.keywords);

  output = replaceMeta(output, "name", "twitter:title", model.title);
  output = replaceMeta(output, "name", "twitter:description", model.description);
  output = replaceMeta(output, "name", "twitter:image", model.ogImage);
  output = replaceMeta(output, "name", "twitter:image:alt", model.ogImageAlt);

  output = replacePreloadImage(output, model.ogImage);
  output = replaceJsonLd(output, model.jsonLd);

  return output;
}
