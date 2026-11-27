import {
  clinic as fallbackClinic,
  treatments as fallbackTreatments,
  doctors as fallbackDoctors,
  technology as fallbackTechnology,
  facilities as fallbackFacilities,
  faqs as fallbackFaqs
} from "./clinic-data.js";

const REQUIRED_FAQ_IDS = [
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

// These IDs are used by assistant.js to attach specific actions.
const REQUEST_TIMEOUT_MS = 10000;

function isRecord(value) {
  return value !== null && typeof value === "object" && !Array.isArray(value);
}

function isNonEmptyString(value) {
  return typeof value === "string" && value.trim().length > 0;
}

function isOptionalString(value) {
  return value === undefined || typeof value === "string";
}

function isSafeAssetPath(value) {
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

function isOptionalAssetPath(value) {
  return value === undefined || value === "" || isSafeAssetPath(value);
}

function isStringList(value, allowEmpty) {
  return Array.isArray(value) &&
    (allowEmpty || value.length > 0) &&
    value.every(isNonEmptyString);
}

function hasUniqueBy(items, getIdentity) {
  const identities = new Set();

  for (const item of items) {
    const identity = getIdentity(item);
    if (!identity || identities.has(identity)) return false;
    identities.add(identity);
  }

  return true;
}

function isHttpsUrl(value) {
  if (!isNonEmptyString(value)) return false;

  try {
    return new URL(value).protocol === "https:";
  } catch {
    return false;
  }
}

function isClinicContent(value) {
  if (!isRecord(value)) return false;

  const clinicFields = [
    "name",
    "city",
    "country",
    "address",
    "phoneDisplay",
    "phoneRaw",
    "whatsappNumber",
    "audience"
  ];

  if (!clinicFields.every((field) => isNonEmptyString(value[field]))) return false;
  if (!/^\+?[\d\s()-]+$/.test(value.phoneRaw) || !/^\d+$/.test(value.whatsappNumber)) return false;
  if (!isHttpsUrl(value.mapsUrl)) return false;
  if (!isRecord(value.hours) || !["days", "morning", "afternoon"].every((field) => isNonEmptyString(value.hours[field]))) {
    return false;
  }

  return isRecord(value.social) &&
    ["facebook", "instagram", "tiktok"].every((field) => isHttpsUrl(value.social[field]));
}

function isTreatmentsContent(value) {
  return isRecord(value) &&
    Array.isArray(value.treatments) &&
    value.treatments.length > 0 &&
    value.treatments.every((item) =>
      isRecord(item) &&
      isNonEmptyString(item.name) &&
      isNonEmptyString(item.description) &&
      isStringList(item.highlights, false) &&
      isStringList(item.keywords, false) &&
      isOptionalString(item.specialist) &&
      isOptionalAssetPath(item.image)
    ) &&
    hasUniqueBy(value.treatments, (item) => normalizeIdentity(item.name));
}

function isProfessionalsContent(value) {
  if (
    !isRecord(value) ||
    !Array.isArray(value.professionals) ||
    value.professionals.length === 0 ||
    !value.professionals.every((item) =>
      isRecord(item) &&
      isNonEmptyString(item.name) &&
      isNonEmptyString(item.role) &&
      isNonEmptyString(item.bio) &&
      isOptionalString(item.registry) &&
      isOptionalAssetPath(item.image)
    )
  ) {
    return false;
  }

  const professionals = value.professionals;
  return hasUniqueBy(professionals, (item) => professionalNameIdentity(item.name)) &&
    hasUniqueBy(
      professionals.filter((item) => isNonEmptyString(item.registry)),
      (item) => normalizeIdentity(item.registry)
    );
}

function isGalleryContent(value) {
  const optionalStrings = [
    "subtitle",
    "label",
    "number",
    "imageAlt",
    "description"
  ];

  return isRecord(value) &&
    Array.isArray(value.items) &&
    value.items.length > 0 &&
    value.items.every((item) =>
      isRecord(item) &&
      isNonEmptyString(item.title) &&
      (item.category === "ambientes" || item.category === "tecnologia") &&
      optionalStrings.every((field) => isOptionalString(item[field])) &&
      isOptionalAssetPath(item.image) &&
      isOptionalAssetPath(item.secondaryImage) &&
      (item.benefits === undefined || isStringList(item.benefits, true))
    ) &&
    hasUniqueBy(
      value.items,
      (item) => {
        const title = normalizeIdentity(item.title);
        return title ? `${item.category}:${title}` : "";
      }
    );
}

function isFaqContent(value) {
  if (!isRecord(value) || !Array.isArray(value.faqs) || value.faqs.length === 0) return false;

  const ids = new Set();
  for (const item of value.faqs) {
    if (
      !isRecord(item) ||
      !isNonEmptyString(item.id) ||
      !isNonEmptyString(item.topic) ||
      !isStringList(item.keywords, false) ||
      !isNonEmptyString(item.answer) ||
      ids.has(item.id)
    ) {
      return false;
    }

    ids.add(item.id);
  }

  return REQUIRED_FAQ_IDS.every((id) => ids.has(id));
}

async function fetchValidatedJson(fetchImpl, path, validator) {
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
      const status = response ? response.status : "no response";
      throw new Error(`HTTP ${status}`);
    }

    const value = await response.json();
    if (!validator(value)) {
      const message = path === "/content/assistant-faqs.json"
        ? "JSON is invalid, contains duplicate IDs, or is missing a required FAQ ID"
        : "JSON does not match the expected content structure";
      throw new Error(message);
    }

    return value;
  } catch (error) {
    console.error(`[assistant content] Could not load ${path}; using clinic-data.js backup.`, error);
    return null;
  } finally {
    if (timeoutId) clearTimeout(timeoutId);
  }
}

function normalizeIdentity(value) {
  return String(value || "")
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9ñ\s]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function professionalNameIdentity(value) {
  return normalizeIdentity(value)
    .replace(/^(?:(?:dr|dra|doctor|doctora|od|odontologo|odontologa|lic|licenciado|licenciada|sr|sra|senor|senora|mtro|mtra|maestro|maestra)\s+)+/, "")
    .trim();
}

function adaptProfessionals(professionals) {
  return professionals.map((professional) => {
    const normalizedName = professionalNameIdentity(professional.name);
    const normalizedRegistry = normalizeIdentity(professional.registry);
    const fallback = fallbackDoctors.find((doctor) =>
      professionalNameIdentity(doctor.name) === normalizedName ||
      (normalizedRegistry && normalizeIdentity(doctor.registry) === normalizedRegistry)
    );
    const aliases = fallback ? fallback.aliases : [];
    const uniqueAliases = [];
    const aliasIdentities = new Set();

    for (const alias of [professional.name, normalizedName, ...aliases]) {
      const identity = normalizeIdentity(alias);
      if (identity && !aliasIdentities.has(identity)) {
        aliasIdentities.add(identity);
        uniqueAliases.push(alias);
      }
    }

    return {
      ...professional,
      registry: professional.registry || "",
      aliases: uniqueAliases
    };
  });
}

function adaptGallery(items) {
  const environmentItems = items.filter((item) => item.category === "ambientes");
  const technologyItems = items.filter((item) => item.category === "tecnologia");

  const facilities = environmentItems.length > 0
    ? environmentItems.map((item) => item.title)
    : fallbackFacilities;

  const technology = technologyItems.length > 0
    ? technologyItems.map((item) => {
      const normalizedTitle = normalizeIdentity(item.title);
      const fallback = fallbackTechnology.find((entry) => normalizeIdentity(entry.name) === normalizedTitle);
      const benefits = isStringList(item.benefits, false) ? item.benefits : [];

      return {
        name: item.title,
        description: isNonEmptyString(item.description)
          ? item.description
          : (fallback && fallback.description) || "",
        features: benefits.length > 0 ? benefits : (fallback ? fallback.features : []),
        keywords: fallback ? fallback.keywords : [item.title]
      };
    })
    : fallbackTechnology;

  return { facilities, technology };
}

function mergeFaqs(cmsFaqs, facilities) {
  const faqSource = cmsFaqs || fallbackFaqs;
  const mergedFaqs = faqSource.map((item) => ({ ...item, keywords: [...item.keywords] }));

  const facilitiesFaq = mergedFaqs.find((item) => item.id === "facilities");
  const fallbackFacilitiesFaq = fallbackFaqs.find((item) => item.id === "facilities");
  const previousList = fallbackFacilities.map((name) => `• ${name}`).join("\n");

  if (
    facilitiesFaq &&
    fallbackFacilitiesFaq &&
    facilitiesFaq.answer === fallbackFacilitiesFaq.answer &&
    facilities.length > 0
  ) {
    const nextList = facilities.map((name) => `• ${name}`).join("\n");
    facilitiesFaq.answer = facilitiesFaq.answer.replace(previousList, nextList);
  }

  return mergedFaqs;
}

async function loadContent(fetchImpl) {
  const [clinicContent, treatmentsContent, professionalsContent, galleryContent, faqContent] = await Promise.all([
    fetchValidatedJson(fetchImpl, "/content/clinic.json", isClinicContent),
    fetchValidatedJson(fetchImpl, "/content/treatments.json", isTreatmentsContent),
    fetchValidatedJson(fetchImpl, "/content/professionals.json", isProfessionalsContent),
    fetchValidatedJson(fetchImpl, "/content/gallery.json", isGalleryContent),
    fetchValidatedJson(fetchImpl, "/content/assistant-faqs.json", isFaqContent)
  ]);
  const gallery = adaptGallery(galleryContent ? galleryContent.items : []);

  return {
    clinic: clinicContent || fallbackClinic,
    treatments: treatmentsContent ? treatmentsContent.treatments : fallbackTreatments,
    doctors: professionalsContent ? adaptProfessionals(professionalsContent.professionals) : fallbackDoctors,
    facilities: gallery.facilities,
    technology: gallery.technology,
    faqs: mergeFaqs(faqContent ? faqContent.faqs : null, gallery.facilities)
  };
}

export function createAssistantContentLoader(fetchImpl = globalThis.fetch) {
  let cachedPromise;

  return function loadAssistantContent() {
    if (!cachedPromise) {
      cachedPromise = loadContent(fetchImpl);
    }

    return cachedPromise;
  };
}

export const loadAssistantContent = createAssistantContentLoader();
