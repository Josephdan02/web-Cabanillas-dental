import {
  clinic as fallbackClinic,
  treatments as fallbackTreatments,
  doctors as fallbackDoctors,
  technology as fallbackTechnology,
  facilities as fallbackFacilities,
  faqs as fallbackFaqs
} from "./clinic-data.js";
import {
  GALLERY_CATEGORIES,
  buildMapEmbedUrl,
  buildWhatsAppUrl,
  normalizeIdentity,
  normalizeClinic,
  normalizeFaqs,
  assertContentObject,
  normalizeGallery,
  normalizeProfessionals,
  normalizeTreatments,
  personIdentity
} from "/shared/content-schema.js";

/**
 * Carga del contenido administrable del asistente.
 *
 * Usa exactamente el mismo esquema normalizador que la portada React
 * (`shared/content-schema.js`), publicado en `/shared/` durante el build.
 *
 * Reglas:
 *  - Cada colección se resuelve por separado: si una falla o es inválida se
 *    usa el respaldo local de `clinic-data.js` solo para esa colección.
 *  - Una colección vacía es válida y se respeta (no se restaura lo eliminado).
 *  - Una FAQ inválida se omite sin detener el asistente.
 */

const REQUEST_TIMEOUT_MS = 10000;

const CONTENT = {
  clinic: "/content/clinic.json",
  treatments: "/content/treatments.json",
  professionals: "/content/professionals.json",
  gallery: "/content/gallery.json",
  faqs: "/content/assistant-faqs.json"
};

async function fetchJson(fetchImpl, path) {
  let timeoutId;
  let controller;

  try {
    controller = new AbortController();
    timeoutId = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);
    const response = await fetchImpl(path, {
      cache: "no-cache",
      signal: controller.signal
    });

    if (!response || !response.ok) {
      throw new Error(`HTTP ${response ? response.status : "sin respuesta"}`);
    }

    return assertContentObject(await response.json(), path);
  } catch (error) {
    console.error(`[assistant content] No se pudo cargar ${path}; se usa clinic-data.js.`, error);
    return null;
  } finally {
    if (timeoutId) clearTimeout(timeoutId);
  }
}

export function findFaqById(faqs, id) {
  return Array.isArray(faqs) ? faqs.find((item) => item.id === id) || null : null;
}

/** Alias de búsqueda que el CMS no administra (se conservan los existentes). */
function adaptProfessionals(professionals) {
  return professionals.map((professional) => {
    const identity = personIdentity(professional.name);
    const registry = normalizeIdentity(professional.registry);
    const fallback = fallbackDoctors.find(
      (doctor) =>
        personIdentity(doctor.name) === identity ||
        (registry && normalizeIdentity(doctor.registry) === registry)
    );
    const aliases = [];
    const seen = new Set();

    for (const alias of [professional.name, identity, ...(fallback ? fallback.aliases : [])]) {
      const normalized = normalizeIdentity(alias);
      if (normalized && !seen.has(normalized)) {
        seen.add(normalized);
        aliases.push(alias);
      }
    }

    return { ...professional, aliases };
  });
}

/** La ambientes/tecnología de la galería alimentan ambientes y equipos. */
function adaptGallery(items) {
  const environments = items.filter((item) => item.category === "ambientes");
  const techItems = items.filter((item) => item.category === "tecnologia");

  const facilities = environments.map((item) => item.title);

  const technology = techItems.map((item) => {
    const title = normalizeIdentity(item.title);
    const fallback = fallbackTechnology.find((entry) => normalizeIdentity(entry.name) === title);

    return {
      name: item.title,
      description: item.description || (fallback ? fallback.description : ""),
      features: item.benefits.length > 0 ? item.benefits : fallback ? fallback.features : [],
      keywords: fallback ? fallback.keywords : [item.title]
    };
  });

  return { facilities, technology };
}

/**
 * Si la respuesta FAQ de "facilities" sigue siendo el texto original del
 * respaldo, se actualiza la lista con los ambientes vigentes del CMS.
 */
function syncFacilitiesAnswer(faqs, facilities) {
  const facilitiesFaq = faqs.find((item) => item.id === "facilities");
  const fallbackFaq = fallbackFaqs.find((item) => item.id === "facilities");

  if (!facilitiesFaq || !fallbackFaq || facilitiesFaq.answer !== fallbackFaq.answer) {
    return faqs;
  }

  const previousList = fallbackFacilities.map((name) => `• ${name}`).join("\n");
  if (!facilitiesFaq.answer.includes(previousList)) {
    return faqs;
  }

  const nextList = facilities.length
    ? facilities.map((name) => `• ${name}`).join("\n")
    : "• La información de ambientes se actualizará próximamente.";

  return faqs.map((item) =>
    item.id === "facilities" ? { ...item, answer: item.answer.replace(previousList, nextList) } : item
  );
}

async function loadContent(fetchImpl) {
  const [clinicRaw, treatmentsRaw, professionalsRaw, galleryRaw, faqsRaw] = await Promise.all([
    fetchJson(fetchImpl, CONTENT.clinic),
    fetchJson(fetchImpl, CONTENT.treatments),
    fetchJson(fetchImpl, CONTENT.professionals),
    fetchJson(fetchImpl, CONTENT.gallery),
    fetchJson(fetchImpl, CONTENT.faqs)
  ]);

  // Información general: los campos válidos del CMS prevalecen; los ausentes
  // conservan el respaldo local y los enlaces se recalculan con el CMS.
  let clinic = {
    ...fallbackClinic,
    whatsappUrl: buildWhatsAppUrl(fallbackClinic),
    mapEmbedUrl: buildMapEmbedUrl(fallbackClinic)
  };

  if (clinicRaw) {
    const result = normalizeClinic(clinicRaw, fallbackClinic);
    clinic = { ...clinic, ...result.value };
    if (!result.valid) {
      console.warn("[assistant content] clinic.json tiene campos incompletos.", result.errors);
    }
  }

  let treatments = fallbackTreatments;
  if (treatmentsRaw) {
    const result = normalizeTreatments(treatmentsRaw);
    if (result.valid) {
      treatments = result.items.filter((item) => item.description && item.keywords.length > 0);
    }
    if (result.errors.length) console.warn("[assistant content] treatments:", result.errors);
  }

  let doctors = fallbackDoctors;
  if (professionalsRaw) {
    const result = normalizeProfessionals(professionalsRaw);
    if (result.valid) {
      doctors = adaptProfessionals(result.items);
    }
    if (result.errors.length) console.warn("[assistant content] professionals:", result.errors);
  }

  let facilities = fallbackFacilities;
  let technology = fallbackTechnology;
  if (galleryRaw) {
    const result = normalizeGallery(galleryRaw);
    if (result.valid) {
      const adapted = adaptGallery(result.items);
      facilities = adapted.facilities;
      technology = adapted.technology;
    }
  }

  let faqs = fallbackFaqs;
  if (faqsRaw) {
    const result = normalizeFaqs(faqsRaw);
    if (result.valid) {
      // Una FAQ inválida ya se omitió individualmente: el asistente sigue vivo.
      faqs = result.items;
    }
    if (result.errors.length) console.warn("[assistant content] faqs:", result.errors);
    if (result.warnings.length) console.warn("[assistant content] faqs:", result.warnings);
  }

  return {
    clinic,
    treatments,
    doctors,
    technology,
    facilities,
    faqs: syncFacilitiesAnswer(faqs, facilities),
    galleryCategories: GALLERY_CATEGORIES
  };
}

export function createAssistantContentLoader(fetchImpl = globalThis.fetch) {
  let cachedPromise;

  return function loadAssistantContent() {
    if (!cachedPromise) {
      cachedPromise = loadContent(fetchImpl).catch((error) => {
        console.error("[assistant content] Falló la carga; se mantiene clinic-data.js.", error);
        return {
          clinic: fallbackClinic,
          treatments: fallbackTreatments,
          doctors: fallbackDoctors,
          technology: fallbackTechnology,
          facilities: fallbackFacilities,
          faqs: fallbackFaqs,
          galleryCategories: GALLERY_CATEGORIES
        };
      });
    }

    return cachedPromise;
  };
}

export const loadAssistantContent = createAssistantContentLoader();
