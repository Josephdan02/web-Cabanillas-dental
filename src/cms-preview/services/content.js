import clinicFallback from "../../../content/clinic.json" with { type: "json" };
import treatmentsFallback from "../../../content/treatments.json" with { type: "json" };
import professionalsFallback from "../../../content/professionals.json" with { type: "json" };
import galleryFallback from "../../../content/gallery.json" with { type: "json" };

const REQUEST_TIMEOUT_MS = 10000;

const COLLECTIONS = [
  {
    key: "clinic",
    path: "/content/clinic.json",
    fallback: clinicFallback,
    validate: isClinic
  },
  {
    key: "treatments",
    path: "/content/treatments.json",
    fallback: treatmentsFallback,
    validate: isTreatments
  },
  {
    key: "professionals",
    path: "/content/professionals.json",
    fallback: professionalsFallback,
    validate: isProfessionals
  },
  {
    key: "gallery",
    path: "/content/gallery.json",
    fallback: galleryFallback,
    validate: isGallery
  }
];

export const FALLBACK_PAGE_CONTENT = {
  clinic: clinicFallback,
  treatments: treatmentsFallback,
  professionals: professionalsFallback,
  gallery: galleryFallback
};

function isRecord(value) {
  return value !== null && typeof value === "object" && !Array.isArray(value);
}

function isNonEmptyString(value) {
  return typeof value === "string" && value.trim().length > 0;
}

function isOptionalString(value) {
  return value === undefined || typeof value === "string";
}

function isStringList(value) {
  return value === undefined ||
    (Array.isArray(value) && value.every(isNonEmptyString));
}

function isSafeAssetPath(value) {
  if (value === undefined || value === "") return true;
  if (!isNonEmptyString(value) || value !== value.trim()) return false;
  if (!value.startsWith("/assets/") || value.includes("\\") || /[?#%]/.test(value)) return false;

  const segments = value.slice("/assets/".length).split("/");
  return segments.length > 0 &&
    segments.every((segment) =>
      segment &&
      segment !== "." &&
      segment !== ".." &&
      segment === segment.trim() &&
      /^[\p{L}\p{N}._ -]+$/u.test(segment)
    ) &&
    /\.(?:avif|bmp|gif|jpe?g|png|svg|webp)$/i.test(value);
}

function normalizeIdentity(value) {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^\p{L}\p{N}]+/gu, " ")
    .trim();
}

function hasUniqueItems(items, identityOf) {
  const identities = new Set();

  return items.every((item) => {
    const identity = identityOf(item);
    if (!identity || identities.has(identity)) return false;
    identities.add(identity);
    return true;
  });
}

function isHttpsUrl(value) {
  if (!isNonEmptyString(value)) return false;

  try {
    return new URL(value).protocol === "https:";
  } catch {
    return false;
  }
}

function isClinic(value) {
  if (!isRecord(value)) return false;

  const requiredFields = [
    "name",
    "city",
    "country",
    "address",
    "phoneDisplay",
    "phoneRaw",
    "whatsappNumber",
    "audience"
  ];

  return requiredFields.every((field) => isNonEmptyString(value[field])) &&
    /^\+?[\d\s()-]+$/.test(value.phoneRaw) &&
    /^\d+$/.test(value.whatsappNumber) &&
    isHttpsUrl(value.mapsUrl) &&
    isRecord(value.hours) &&
    ["days", "morning", "afternoon"].every((field) => isNonEmptyString(value.hours[field])) &&
    isRecord(value.social) &&
    ["facebook", "instagram", "tiktok"].every((field) => isHttpsUrl(value.social[field]));
}

function isTreatments(value) {
  return isRecord(value) &&
    Array.isArray(value.treatments) &&
    value.treatments.every((item) =>
      isRecord(item) &&
      isNonEmptyString(item.name) &&
      isOptionalString(item.description) &&
      isStringList(item.highlights) &&
      isStringList(item.keywords) &&
      isOptionalString(item.specialist) &&
      isSafeAssetPath(item.image)
    ) &&
    hasUniqueItems(value.treatments, (item) => normalizeIdentity(item.name));
}

function isProfessionals(value) {
  return isRecord(value) &&
    Array.isArray(value.professionals) &&
    value.professionals.every((item) =>
      isRecord(item) &&
      isNonEmptyString(item.name) &&
      isNonEmptyString(item.role) &&
      isOptionalString(item.registry) &&
      isOptionalString(item.bio) &&
      isSafeAssetPath(item.image)
    ) &&
    hasUniqueItems(value.professionals, (item) => {
      const identity = normalizeIdentity(item.name);
      return identity.replace(/^(?:(?:dr|dra|doctor|doctora|od|odontologo|odontologa)\s+)+/, "");
    });
}

function isGallery(value) {
  const optionalStrings = [
    "subtitle",
    "label",
    "number",
    "imageAlt",
    "description"
  ];

  return isRecord(value) &&
    Array.isArray(value.items) &&
    value.items.every((item) =>
      isRecord(item) &&
      isNonEmptyString(item.title) &&
      (item.category === "ambientes" || item.category === "tecnologia") &&
      optionalStrings.every((field) => isOptionalString(item[field])) &&
      isSafeAssetPath(item.image) &&
      isSafeAssetPath(item.secondaryImage) &&
      isStringList(item.benefits)
    ) &&
    hasUniqueItems(value.items, (item) => `${item.category}:${normalizeIdentity(item.title)}`);
}

async function loadCollection(fetchImpl, collection) {
  let timeoutId;
  let controller;

  try {
    controller = new AbortController();
    timeoutId = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);
    const response = await fetchImpl(collection.path, {
      cache: "no-cache",
      signal: controller.signal
    });

    if (!response || !response.ok) {
      throw new Error(`HTTP ${response ? response.status : "sin respuesta"}`);
    }

    const value = await response.json();
    if (!collection.validate(value)) {
      throw new Error("El contenido no coincide con el esquema esperado.");
    }

    return value;
  } catch (error) {
    console.warn(
      `[page content] No se pudo cargar ${collection.path}; se usará el respaldo local.`,
      error
    );
    return collection.fallback;
  } finally {
    if (timeoutId) clearTimeout(timeoutId);
  }
}

export function createPageContentLoader(fetchImpl = globalThis.fetch) {
  let cachedPromise;

  return function loadPageContent() {
    if (!cachedPromise) {
      cachedPromise = Promise.all(
        COLLECTIONS.map((collection) => loadCollection(fetchImpl, collection))
      ).then(([clinic, treatments, professionals, gallery]) => ({
        clinic,
        treatments,
        professionals,
        gallery
      }));
    }

    return cachedPromise;
  };
}

export const loadPageContent = createPageContentLoader();
