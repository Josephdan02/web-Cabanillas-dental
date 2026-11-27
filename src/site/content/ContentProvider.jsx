import { createContext, useContext, useEffect, useMemo, useState } from "react";
import clinicFallback from "../../../content/clinic.json";
import galleryFallback from "../../../content/gallery.json";
import professionalsFallback from "../../../content/professionals.json";
import treatmentsFallback from "../../../content/treatments.json";
import videosFallback from "../../../content/videos.json";
import {
  CONTENT_PATHS,
  assertContentObject,
  normalizeClinic,
  normalizeGallery,
  normalizeProfessionals,
  normalizeTreatments,
  normalizeVideos
} from "../../../shared/content-schema.js";
import { applySeo } from "./seo.js";

const REQUEST_TIMEOUT_MS = 10000;

/**
 * Respaldo de build. No es una lista independiente: es el mismo JSON del CMS
 * copiado a dist/ en el momento de compilar. Sirve para el primer render y
 * para mantener la web usable si una petición falla.
 */
const buildFallback = {
  clinic: normalizeClinic(clinicFallback).value,
  treatments: normalizeTreatments(treatmentsFallback).items,
  professionals: normalizeProfessionals(professionalsFallback).items,
  gallery: normalizeGallery(galleryFallback).items,
  videos: normalizeVideos(videosFallback).items
};

const ContentContext = createContext({
  ...buildFallback,
  status: "loading",
  errors: []
});

async function fetchJson(path) {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);

  try {
    const response = await fetch(path, {
      cache: "no-cache",
      signal: controller.signal
    });

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }

    return assertContentObject(await response.json(), path);
  } finally {
    clearTimeout(timeoutId);
  }
}

async function fetchAll(paths) {
  const errors = [];

  const values = await Promise.all(
    paths.map(async (path) => {
      try {
        return await fetchJson(path);
      } catch (error) {
        errors.push(`${path}: ${error.message}`);
        return null;
      }
    })
  );

  return { values, errors };
}

let contentPromise;

/**
 * Carga única por sesión de página. Evita peticiones duplicadas con StrictMode
 * y con varios componentes suscritos al mismo contenido.
 */
export function loadSiteContent() {
  if (contentPromise) return contentPromise;

  contentPromise = (async () => {
    const paths = [
      CONTENT_PATHS.clinic,
      CONTENT_PATHS.treatments,
      CONTENT_PATHS.professionals,
      CONTENT_PATHS.gallery,
      CONTENT_PATHS.videos
    ];
    const { values, errors } = await fetchAll(paths);
    const [clinicRaw, treatmentsRaw, professionalsRaw, galleryRaw, videosRaw] = values;

    let clinic = buildFallback.clinic;
    if (clinicRaw) {
      const result = normalizeClinic(clinicRaw, buildFallback.clinic);
      // Se usa el valor normalizado incluso si hay campos con error: los datos
      // válidos del CMS ya se aplicaron y los ausentes usan el respaldo de build
      // (que es el mismo JSON, no una lista independiente).
      clinic = result.value;
      errors.push(...result.errors);
    }

    let treatments = buildFallback.treatments;
    if (treatmentsRaw) {
      const result = normalizeTreatments(treatmentsRaw);
      // `valid` significa que existe una lista; si está vacía se respeta:
      // una colección vacía en el CMS no debe recuperar registros del respaldo.
      if (result.valid) {
        treatments = result.items;
      }
      errors.push(...result.errors, ...(result.warnings || []));
    }

    let professionals = buildFallback.professionals;
    if (professionalsRaw) {
      const result = normalizeProfessionals(professionalsRaw);
      if (result.valid) {
        professionals = result.items;
      }
      errors.push(...result.errors, ...result.warnings);
    }

    let gallery = buildFallback.gallery;
    if (galleryRaw) {
      const result = normalizeGallery(galleryRaw);
      if (result.valid) {
        gallery = result.items;
      }
      errors.push(...result.errors, ...(result.warnings || []));
    }

    let videos = buildFallback.videos;
    if (videosRaw) {
      const result = normalizeVideos(videosRaw);
      if (result.valid) videos = result.items;
      errors.push(...result.errors, ...(result.warnings || []));
    }

    return { clinic, treatments, professionals, gallery, videos, errors };
  })();

  return contentPromise;
}

export function ContentProvider({ children }) {
  const [state, setState] = useState({
    ...buildFallback,
    status: "loading",
    errors: []
  });

  useEffect(() => {
    let active = true;

    loadSiteContent()
      .then((content) => {
        if (!active) return;

        setState({
          ...content,
          status: content.errors.length ? "degraded" : "ready"
        });

        applySeo(content.clinic, content.treatments);

        if (content.errors.length) {
          console.warn("[site content] Incidencias en el contenido del CMS.", content.errors);
        }
      })
      .catch((error) => {
        console.error("[site content] No se pudo inicializar el contenido.", error);
        if (!active) return;

        setState((current) => ({
          ...current,
          status: "degraded",
          errors: [...current.errors, error.message]
        }));
        applySeo(buildFallback.clinic, buildFallback.treatments);
      });

    return () => {
      active = false;
    };
  }, []);

  const value = useMemo(() => state, [state]);

  return <ContentContext.Provider value={value}>{children}</ContentContext.Provider>;
}

export function useContent() {
  return useContext(ContentContext);
}
