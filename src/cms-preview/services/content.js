import clinicFallback from "../../../content/clinic.json";
import galleryFallback from "../../../content/gallery.json";
import professionalsFallback from "../../../content/professionals.json";
import treatmentsFallback from "../../../content/treatments.json";
import videosFallback from "../../../content/videos.json";
import {
  CONTENT_PATHS,
  normalizeClinic,
  normalizeGallery,
  normalizeProfessionals,
  normalizeTreatments,
  normalizeVideos
} from "../../../shared/content-schema.js";

const REQUEST_TIMEOUT_MS = 10000;

const fallback = {
  clinic: normalizeClinic(clinicFallback).value,
  treatments: normalizeTreatments(treatmentsFallback).items,
  professionals: normalizeProfessionals(professionalsFallback).items,
  gallery: normalizeGallery(galleryFallback).items,
  videos: normalizeVideos(videosFallback).items
};

export const FALLBACK_PAGE_CONTENT = fallback;

const COLLECTIONS = [
  {
    key: "clinic",
    path: CONTENT_PATHS.clinic,
    fallback: fallback.clinic,
    normalize: (raw) => {
      const result = normalizeClinic(raw, fallback.clinic);
      return { valid: result.valid, value: result.value, issues: result.errors };
    }
  },
  {
    key: "treatments",
    path: CONTENT_PATHS.treatments,
    fallback: fallback.treatments,
    normalize: normalizeTreatments
  },
  {
    key: "professionals",
    path: CONTENT_PATHS.professionals,
    fallback: fallback.professionals,
    normalize: normalizeProfessionals
  },
  {
    key: "gallery",
    path: CONTENT_PATHS.gallery,
    fallback: fallback.gallery,
    normalize: normalizeGallery
  },
  {
    key: "videos",
    path: CONTENT_PATHS.videos,
    fallback: fallback.videos,
    normalize: normalizeVideos
  }
];

async function loadCollection(fetchImpl, collection) {
  let timeoutId;
  try {
    const controller = new AbortController();
    timeoutId = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);
    const response = await fetchImpl(collection.path, {
      cache: "no-cache",
      signal: controller.signal
    });
    if (!response?.ok) throw new Error(`HTTP ${response?.status ?? "sin respuesta"}`);

    const raw = await response.json();
    const result = collection.normalize(raw);
    const issues = [...(result.errors || result.issues || []), ...(result.warnings || [])];
    if (!result.valid) throw new Error(issues.join(" ") || "Contenido inválido.");
    if (issues.length) console.warn(`[cms preview] Incidencias en ${collection.path}.`, issues);
    return result.value ?? result.items;
  } catch (error) {
    console.warn(`[cms preview] No se pudo cargar ${collection.path}; se usará el JSON incluido en build.`, error);
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
        COLLECTIONS.map(async (collection) => [
          collection.key,
          await loadCollection(fetchImpl, collection)
        ])
      ).then(Object.fromEntries);
    }
    return cachedPromise;
  };
}

export const loadPageContent = createPageContentLoader();
