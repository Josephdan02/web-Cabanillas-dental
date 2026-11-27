/**
 * Esquema compartido de contenido de Dental Cabanillas.
 *
 * Este módulo lo consumen:
 *  - la portada React (src/site),
 *  - la vista de QA (src/cms-preview),
 *  - el asistente (public/assistant).
 *
 * Reglas de diseño:
 *  - Un registro inválido no invalida toda la colección.
 *  - Los campos opcionales se normalizan con valores seguros.
 *  - Las colecciones vacías son válidas y no se rellenan con datos antiguos.
 *  - Los identificadores se derivan de forma estable a partir del contenido.
 */

export const CONTENT_PATHS = {
  clinic: "/content/clinic.json",
  treatments: "/content/treatments.json",
  professionals: "/content/professionals.json",
  gallery: "/content/gallery.json",
  videos: "/content/videos.json",
  faqs: "/content/assistant-faqs.json"
};

export const GALLERY_CATEGORIES = ["ambientes", "tecnologia"];
export const VIDEO_CATEGORIES = ["tratamientos", "ambientes", "tecnologia", "eventos"];

/** Variantes que puede escribir un humano en el CMS (mayúsculas/acentos). */
export function normalizeCategory(value) {
  const identity = normalizeIdentity(value).replace(/\s+/g, "");
  return GALLERY_CATEGORIES.find((category) => normalizeIdentity(category).replace(/\s+/g, "") === identity) || "";
}

export const REQUIRED_FAQ_IDS = [
  "hours",
  "location",
  "contact",
  "social",
  "videos",
  "team",
  "technology",
  "facilities",
  "children"
];

const IMAGE_EXTENSION = /\.(?:avif|bmp|gif|jpe?g|png|svg|webp)(?:[?#].*)?$/i;

export function isRecord(value) {
  return value !== null && typeof value === "object" && !Array.isArray(value);
}

export function assertContentObject(value, label = "contenido") {
  if (!isRecord(value)) throw new TypeError(`${label} debe ser un objeto JSON.`);
  return value;
}

export function isNonEmptyString(value) {
  return typeof value === "string" && value.trim().length > 0;
}

export function normalizeIdentity(value) {
  return String(value || "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    // Se elimina la ñ antes de filtrar para no depender del carácter literal.
    .replace(/n~/g, "n")
    .replace(/[^a-z0-9\s]+/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

export function slugify(value) {
  return normalizeIdentity(value).replace(/\s+/g, "-").replace(/^-+|-+$/g, "") || "item";
}

/**
 * Identidad para comparar personas: quita títulos (Dr., Dra., Od., ...) para que
 * "Dr. Juan Pérez" y "Juan Perez" se reconozcan como la misma persona.
 */
export function personIdentity(value) {
  return normalizeIdentity(value).replace(
    /^(?:(?:dr|dra|doctor|doctora|od|odontologo|odontologa|lic|licenciado|licenciada|sr|sra|senor|senora|mtro|mtra|maestro|maestra)\s+)+/,
    ""
  );
}

export function asString(value, fallback = "") {
  return typeof value === "string" ? value.trim() : fallback;
}

export function stringOr(value, fallback = "") {
  return typeof value === "string" ? value.trim() : fallback;
}

export function asStringArray(value) {
  if (!Array.isArray(value)) return [];
  return value
    .map((item) => (typeof item === "string" ? item.trim() : ""))
    .filter(Boolean);
}

export function isHttpsUrl(value) {
  if (!isNonEmptyString(value)) return false;

  try {
    return new URL(value).protocol === "https:";
  } catch {
    return false;
  }
}

/**
 * Acepta rutas locales /assets/... o URLs https absolutas.
 * No exige nombres "limpios": Decap puede guardar espacios, acentos o %20.
 */
export function safeAssetPath(value) {
  if (value === undefined || value === null || value === "") return "";

  const path = typeof value === "string" ? value.trim().replace(/\\/g, "/") : "";
  if (!path) return "";

  if (path.startsWith("https://")) {
    return IMAGE_EXTENSION.test(path) ? path : "";
  }

  // Decap puede devolver la ruta con prefijo de sitio; se normaliza a /assets/...
  const local = path.startsWith("/assets/") || path.startsWith("/video-posters/")
    ? path
    : path.startsWith("assets/") || path.startsWith("video-posters/")
      ? `/${path}`
      : "";
  if (!local) return "";
  if (/[?#]/.test(local)) return "";
  if (local.split("/").some((segment) => segment === ".." || segment === ".")) return "";

  return IMAGE_EXTENSION.test(local) ? local : "";
}

export function safeVideoPath(value) {
  if (value === undefined || value === null || value === "") return "";
  const path = typeof value === "string" ? value.trim().replace(/\\/g, "/") : "";
  if (!path || /[?#]/.test(path) || path.split("/").some((segment) => segment === ".." || segment === ".")) return "";
  if (/^https:\/\//i.test(path)) return /\.(?:mp4|webm|ogv|ogg)$/i.test(path) ? path : "";
  const local = path.startsWith("/videos/") || path.startsWith("/assets/")
    ? path
    : path.startsWith("videos/") || path.startsWith("assets/")
      ? `/${path}`
      : "";
  return local && /\.(?:mp4|webm|ogv|ogg)$/i.test(local) ? local : "";
}

export function toOrder(value) {
  const number = typeof value === "number" ? value : Number(value);
  return Number.isFinite(number) ? number : undefined;
}

export function sortByOrder(items) {
  return items
    .map((item, index) => ({ item, index }))
    .sort((a, b) => {
      const orderA = Number.isFinite(a.item.order) ? a.item.order : Number.POSITIVE_INFINITY;
      const orderB = Number.isFinite(b.item.order) ? b.item.order : Number.POSITIVE_INFINITY;
      return orderA === orderB ? a.index - b.index : orderA - orderB;
    })
    .map(({ item }) => item);
}

export function assignIds(items, baseOf, prefix = "") {
  const used = new Set();

  return items.map((item, index) => {
    const provided = asString(item.id);
    const base = provided ? slugify(provided) : slugify(baseOf(item, index));
    const withPrefix = prefix ? `${prefix}-${base}` : base;
    let id = withPrefix;
    let suffix = 2;

    while (used.has(id)) {
      id = `${withPrefix}-${suffix}`;
      suffix += 1;
    }

    used.add(id);
    return { ...item, id };
  });
}

export function buildWhatsAppUrl(clinic, message) {
  const phone = String(clinic?.whatsappNumber || clinic?.phoneRaw || "").replace(/\D/g, "");
  const text = message || "Hola Dental Cabanillas, quiero reservar una cita";
  const query = new URLSearchParams({ phone, text });
  return `https://api.whatsapp.com/send/?${query.toString()}&type=phone_number&app_absent=0`;
}

export function buildMapEmbedUrl(clinic) {
  const addressParts = asString(clinic?.address).split(",").map((part) => part.trim()).filter(Boolean);
  const normalizePart = (part) => part.normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[.\s]+$/g, "").toLowerCase();
  const existing = new Set(addressParts.map(normalizePart));
  const location = [
    ...addressParts,
    ...[clinic?.city, clinic?.country]
      .map(asString)
      .filter((part) => part && !existing.has(normalizePart(part)))
  ].join(", ");
  return `https://www.google.com/maps?q=${encodeURIComponent(location)}&output=embed`;
}

function normalizeHours(raw, fallback) {
  const source = isRecord(raw) ? raw : {};
  const base = isRecord(fallback) ? fallback : {};

  return {
    days: stringOr(source.days, stringOr(base.days)),
    morning: stringOr(source.morning, stringOr(base.morning)),
    afternoon: stringOr(source.afternoon, stringOr(base.afternoon))
  };
}

function normalizeSocial(raw, fallback) {
  const source = isRecord(raw) ? raw : {};
  const base = isRecord(fallback) ? fallback : {};

  return {
    facebook: isHttpsUrl(source.facebook) ? source.facebook.trim() : stringOr(base.facebook),
    instagram: isHttpsUrl(source.instagram) ? source.instagram.trim() : stringOr(base.instagram),
    tiktok: isHttpsUrl(source.tiktok) ? source.tiktok.trim() : stringOr(base.tiktok)
  };
}

function normalizeImages(raw, fallback) {
  const source = isRecord(raw) ? raw : {};
  const base = isRecord(fallback) ? fallback : {};
  const keys = [
    "logo",
    "logoWhite",
    "logoNavbar",
    "logoText",
    "logoTooth",
    "heroReceptionWide",
    "heroReceptionClose",
    "aboutRoom",
    "mapImage",
    "teamGroupClinic",
    "teamGroupEvent",
    "teamGroupFront"
  ];

  return Object.fromEntries(
    keys.map((key) => [key, safeAssetPath(source[key]) || safeAssetPath(base[key])])
  );
}

function normalizeStats(raw, fallback) {
  const source = Array.isArray(raw) ? raw : Array.isArray(fallback) ? fallback : [];

  return source
    .filter((item) => isRecord(item))
    .map((item) => ({
      value: asString(item.value),
      label: asString(item.label)
    }))
    .filter((item) => item.value && item.label);
}

function normalizeBenefits(raw, fallback) {
  const source = Array.isArray(raw) ? raw : Array.isArray(fallback) ? fallback : [];
  return source
    .filter((item) => isRecord(item))
    .map((item) => ({
      title: asString(item.title),
      description: asString(item.description),
      image: safeAssetPath(item.image)
    }))
    .filter((item) => item.title && item.description && item.image);
}

/**
 * Normaliza la información general. Si el registro no es válido, `valid` es false
 * y el consumidor puede usar su respaldo local. Los campos opcionales se completan.
 */
export function normalizeClinic(raw, fallback = {}) {
  const source = isRecord(raw) ? raw : {};
  const base = isRecord(fallback) ? fallback : {};
  const errors = [];

  const value = {
    name: asString(source.name) || asString(base.name),
    city: asString(source.city) || asString(base.city),
    country: asString(source.country) || asString(base.country),
    address: asString(source.address) || asString(base.address),
    phoneDisplay: asString(source.phoneDisplay) || asString(base.phoneDisplay),
    phoneRaw: asString(source.phoneRaw) || asString(base.phoneRaw),
    whatsappNumber: (asString(source.whatsappNumber) || asString(base.whatsappNumber)).replace(/\D/g, ""),
    mapsUrl: isHttpsUrl(source.mapsUrl) ? source.mapsUrl.trim() : asString(base.mapsUrl),
    audience: asString(source.audience) || asString(base.audience),
    hours: normalizeHours(source.hours, base.hours),
    social: normalizeSocial(source.social, base.social),
    images: normalizeImages(source.images, base.images),
    content: {
      heroTitle: stringOr(source.content?.heroTitle, stringOr(base.content?.heroTitle)),
      aboutTitle: stringOr(source.content?.aboutTitle, stringOr(base.content?.aboutTitle)),
      aboutText: stringOr(source.content?.aboutText, stringOr(base.content?.aboutText)),
      benefitsTitle: stringOr(source.content?.benefitsTitle, stringOr(base.content?.benefitsTitle)),
      benefitsIntro: stringOr(source.content?.benefitsIntro, stringOr(base.content?.benefitsIntro)),
      benefits: normalizeBenefits(source.content?.benefits, base.content?.benefits),
      teamIntro: stringOr(source.content?.teamIntro, stringOr(base.content?.teamIntro)),
      contactIntro: stringOr(source.content?.contactIntro, stringOr(base.content?.contactIntro)),
      footerText: stringOr(source.content?.footerText, stringOr(base.content?.footerText)),
      aboutStats: normalizeStats(source.content?.aboutStats, base.content?.aboutStats)
    },
    seo: {
      title: stringOr(source.seo?.title, stringOr(base.seo?.title)),
      description: stringOr(source.seo?.description, stringOr(base.seo?.description)),
      ogImage: safeAssetPath(source.seo?.ogImage) || safeAssetPath(base.seo?.ogImage),
      ogImageAlt: stringOr(source.seo?.ogImageAlt, stringOr(base.seo?.ogImageAlt)),
      keywords: stringOr(source.seo?.keywords, stringOr(base.seo?.keywords))
    }
  };

  if (!value.name) errors.push("clinic.name es obligatorio.");
  if (!value.city) errors.push("clinic.city es obligatorio.");
  if (!value.country) errors.push("clinic.country es obligatorio.");
  if (!value.address) errors.push("clinic.address es obligatorio.");
  if (!value.phoneDisplay) errors.push("clinic.phoneDisplay es obligatorio.");
  if (!value.phoneRaw) errors.push("clinic.phoneRaw es obligatorio.");
  if (!value.whatsappNumber) errors.push("clinic.whatsappNumber es obligatorio.");
  if (!isHttpsUrl(value.mapsUrl)) errors.push("clinic.mapsUrl debe ser una URL https.");
  if (!value.hours.days || !value.hours.morning || !value.hours.afternoon) {
    errors.push("clinic.hours requiere days, morning y afternoon.");
  }
  if (!isHttpsUrl(value.social.facebook) || !isHttpsUrl(value.social.instagram) || !isHttpsUrl(value.social.tiktok)) {
    errors.push("clinic.social requiere Facebook, Instagram y TikTok con URL https.");
  }

  const explicitWhatsApp = isHttpsUrl(source.whatsappUrl)
    ? source.whatsappUrl.trim()
    : isHttpsUrl(base.whatsappUrl)
      ? base.whatsappUrl.trim()
      : "";

  const whatsappUrl = explicitWhatsApp || buildWhatsAppUrl(value);

  return {
    value: {
      ...value,
      whatsappUrl,
      whatsapp: whatsappUrl,
      mapEmbedUrl: buildMapEmbedUrl(value),
      // Compatibilidad con los nombres que ya usan los componentes actuales.
      phone: value.phoneDisplay,
      facebook: value.social.facebook,
      instagram: value.social.instagram,
      tiktok: value.social.tiktok,
      ...value.images
    },
    errors,
    valid: errors.length === 0
  };
}

export function normalizeTreatments(raw) {
  const errors = [];

  if (!isRecord(raw) || !Array.isArray(raw.treatments)) {
    return { items: [], errors: ["treatments.treatments debe ser una lista."], valid: false };
  }

  const items = [];

  raw.treatments.forEach((entry, index) => {
    if (!isRecord(entry) || !isNonEmptyString(entry.name)) {
      errors.push(`Tratamiento ${index + 1}: falta el nombre; se omite.`);
      return;
    }

    const image = safeAssetPath(entry.image);
    if (entry.image && !image) {
      errors.push(`Tratamiento ${entry.name}: la imagen no es una ruta válida; se omite la imagen.`);
    }

    items.push({
      id: asString(entry.id),
      name: entry.name.trim(),
      description: asString(entry.description),
      image,
      highlights: asStringArray(entry.highlights),
      keywords: asStringArray(entry.keywords),
      specialist: asString(entry.specialist),
      order: toOrder(entry.order)
    });
  });

  return {
    // `sortByOrder` es estable: sin `order` se conserva el orden del CMS.
    items: sortByOrder(assignIds(items, (item) => item.name, "tratamiento")),
    errors,
    warnings: [],
    valid: true
  };
}

export function normalizeProfessionals(raw) {
  const errors = [];
  const warnings = [];

  if (!isRecord(raw) || !Array.isArray(raw.professionals)) {
    return {
      items: [],
      errors: ["professionals.professionals debe ser una lista."],
      warnings,
      valid: false
    };
  }

  const items = [];

  raw.professionals.forEach((entry, index) => {
    if (!isRecord(entry) || !isNonEmptyString(entry.name) || !isNonEmptyString(entry.role)) {
      errors.push(`Profesional ${index + 1}: requiere nombre y rol; se omite.`);
      return;
    }

    const image = safeAssetPath(entry.image);
    if (entry.image && !image) {
      errors.push(`Profesional ${entry.name}: la imagen no es una ruta válida; se omite la imagen.`);
    }

    items.push({
      id: asString(entry.id),
      name: entry.name.trim(),
      role: entry.role.trim(),
      registry: asString(entry.registry),
      bio: asString(entry.bio),
      quote: asString(entry.quote),
      image,
      order: toOrder(entry.order)
    });
  });

  const names = new Map();
  const registries = new Map();

  for (const item of items) {
    const nameIdentity = normalizeIdentity(item.name);
    const registryIdentity = normalizeIdentity(item.registry);

    if (names.has(nameIdentity)) {
      warnings.push(`Profesional duplicado: ${item.name}. Se conserva, pero conviene revisar el CMS.`);
    } else {
      names.set(nameIdentity, item);
    }

    if (registryIdentity && registries.has(registryIdentity)) {
      warnings.push(`Registro profesional duplicado: ${item.registry}. Se conserva, pero conviene revisar el CMS.`);
    } else if (registryIdentity) {
      registries.set(registryIdentity, item);
    }
  }

  return {
    items: sortByOrder(assignIds(items, (item) => item.name, "profesional")),
    errors,
    warnings,
    valid: true
  };
}

export function normalizeGallery(raw) {
  const errors = [];

  if (!isRecord(raw) || !Array.isArray(raw.items)) {
    return { items: [], errors: ["gallery.items debe ser una lista."], valid: false };
  }

  const items = [];

  raw.items.forEach((entry, index) => {
    if (!isRecord(entry) || !isNonEmptyString(entry.title)) {
      errors.push(`Galería ${index + 1}: falta el título; se omite.`);
      return;
    }

    // El campo es el de la entrada (`entry.category`), no el elemento normalizado.
    const category = normalizeCategory(entry.category);
    if (!category) {
      errors.push(`Galería ${entry.title}: categoría no válida (usa "ambientes" o "tecnologia"); se omite.`);
      return;
    }

    const image = safeAssetPath(entry.image);
    const secondaryImage = safeAssetPath(entry.secondaryImage);

    if (entry.image && !image) {
      errors.push(`Galería ${entry.title}: la imagen principal no es válida; se omite la imagen.`);
    }
    if (entry.secondaryImage && !secondaryImage) {
      errors.push(`Galería ${entry.title}: la segunda imagen no es válida; se omite la imagen.`);
    }

    items.push({
      id: asString(entry.id),
      title: entry.title.trim(),
      category,
      subtitle: asString(entry.subtitle),
      label: asString(entry.label),
      number: asString(entry.number),
      image,
      secondaryImage,
      imageAlt: asString(entry.imageAlt),
      description: asString(entry.description),
      benefits: asStringArray(entry.benefits),
      order: toOrder(entry.order)
    });
  });

  return {
    // El identificador incluye la categoría para que "Sala de espera" (ambiente)
    // y un equipo homónimo (tecnología) no compartan id.
    items: sortByOrder(assignIds(items, (item) => `${item.category}-${item.title}`)),
    errors,
    warnings: [],
    valid: true
  };
}

export function normalizeVideos(raw) {
  const errors = [];
  if (!isRecord(raw) || !Array.isArray(raw.videos)) {
    return { items: [], errors: ["videos.videos debe ser una lista."], warnings: [], valid: false };
  }

  const items = [];
  raw.videos.forEach((entry, index) => {
    if (!isRecord(entry) || !isNonEmptyString(entry.title) || !safeVideoPath(entry.videoUrl)) {
      errors.push(`Video ${index + 1}: requiere título y una ruta de video válida; se omite.`);
      return;
    }
    const category = asString(entry.category).toLowerCase();
    if (!VIDEO_CATEGORIES.includes(category)) {
      errors.push(`Video ${entry.title}: categoría no válida; se omite.`);
      return;
    }
    const thumbnail = safeAssetPath(entry.thumbnail);
    if (entry.thumbnail && !thumbnail) {
      errors.push(`Video ${entry.title}: la miniatura no es válida; se omite la miniatura.`);
    }
    items.push({
      id: asString(entry.id),
      title: entry.title.trim(),
      description: asString(entry.description),
      thumbnail,
      platform: asString(entry.platform) || "local",
      videoUrl: safeVideoPath(entry.videoUrl),
      duration: asString(entry.duration),
      category,
      order: toOrder(entry.order)
    });
  });

  return {
    items: sortByOrder(assignIds(items, (item) => item.title, "video")),
    errors,
    warnings: [],
    valid: true
  };
}

export function normalizeFaqs(raw) {
  const errors = [];
  const warnings = [];

  if (!isRecord(raw) || !Array.isArray(raw.faqs)) {
    return {
      items: [],
      errors: ["assistant-faqs.faqs debe ser una lista."],
      warnings,
      missingRequired: [...REQUIRED_FAQ_IDS],
      valid: false
    };
  }

  const seen = new Set();
  const items = [];

  raw.faqs.forEach((entry, index) => {
    if (!isRecord(entry) || !isNonEmptyString(entry.id) || !isNonEmptyString(entry.topic) || !isNonEmptyString(entry.answer)) {
      errors.push(`FAQ ${index + 1}: requiere id, topic y answer; se omite.`);
      return;
    }

    if (seen.has(entry.id)) {
      warnings.push(`FAQ duplicada: ${entry.id}. Se conserva la primera.`);
      return;
    }

    seen.add(entry.id);
    items.push({
      id: entry.id.trim(),
      topic: entry.topic.trim(),
      keywords: asStringArray(entry.keywords),
      answer: entry.answer.trim()
    });
  });

  const missingRequired = REQUIRED_FAQ_IDS.filter((id) => !seen.has(id));
  if (missingRequired.length > 0) {
    warnings.push(`Faltan IDs de FAQ obligatorios: ${missingRequired.join(", ")}.`);
  }

  return { items, errors, warnings, missingRequired, valid: true };
}

export function describeIssues(label, result) {
  const lines = [];
  for (const error of result.errors || []) lines.push(`[${label}] ${error}`);
  for (const warning of result.warnings || []) lines.push(`[${label}] ${warning}`);
  return lines;
}
