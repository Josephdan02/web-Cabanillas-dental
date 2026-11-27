// Verifica que el asistente consume el contenido del CMS con el esquema compartido.
// Uso: node scripts/test-content-consumers.mjs (requiere `npm run build`).
import { pathToFileURL } from "node:url";
import { readFile } from "node:fs/promises";
import { resolve } from "node:path";

const ROOT = process.cwd();
const inventory = new Map();

async function loadWithInventory(relativePath) {
  const source = await readFile(resolve(ROOT, relativePath), "utf8");
  const url = "data:text/javascript;base64," + Buffer.from(source).toString("base64");
  return import(url);
}

function createFetch() {
  return async (path) => {
    const clean = path.replace(/^\//, "");
    inventory.set(path, (inventory.get(path) || 0) + 1);
    try {
      const body = await readFile(resolve(ROOT, "dist", clean), "utf8");
      return { ok: true, status: 200, json: async () => JSON.parse(body) };
    } catch {
      return { ok: false, status: 404, json: async () => null };
    }
  };
}

async function startServer(root, port) {
  const { createServer } = await import("node:http");
  const { extname } = await import("node:path");
  const types = {
    ".html": "text/html; charset=utf-8",
    ".js": "text/javascript; charset=utf-8",
    ".mjs": "text/javascript; charset=utf-8",
    ".json": "application/json; charset=utf-8",
    ".css": "text/css; charset=utf-8",
    ".svg": "image/svg+xml",
    ".webp": "image/webp",
    ".yml": "text/plain; charset=utf-8",
    ".txt": "text/plain; charset=utf-8",
    ".xml": "application/xml"
  };

  const server = createServer(async (request, response) => {
    const url = new URL(request.url, `http://localhost:${port}`);
    const pathname = decodeURIComponent(url.pathname);
    const candidates = [pathname, `${pathname}.html`, `${pathname}index.html`];

    for (const candidate of candidates) {
      try {
        const file = await readFile(resolve(root, "." + candidate));
        response.writeHead(200, { "content-type": types[extname(candidate)] || "application/octet-stream" });
        response.end(file);
        return;
      } catch {
        // siguiente candidato
      }
    }

    response.writeHead(404, { "content-type": "text/plain" });
    response.end("not found");
  });

  await new Promise((done) => server.listen(port, done));
  return server;
}

const results = [];
function check(name, condition, detail) {
  results.push({ name, ok: Boolean(condition), detail });
  console.log(`${condition ? "OK  " : "FAIL"} ${name}${detail ? " — " + detail : ""}`);
}

// 1. El cargador del asistente alimenta el motor con los datos del CMS.
async function testAssistantLoader() {
  // Resuelve el import absoluto /shared/... usado por los módulos del asistente.
  globalThis.__sharedSchema = await import(pathToFileURL(resolve(ROOT, "shared/content-schema.js")).href);

  const loaderSource = await readFile(resolve(ROOT, "public/assistant/content-loader.js"), "utf8");
  const clinicDataSource = await readFile(resolve(ROOT, "public/assistant/clinic-data.js"), "utf8");
  const schemaSource = await readFile(resolve(ROOT, "shared/content-schema.js"), "utf8");

  const loaderModule = await import(
    "data:text/javascript;base64," + Buffer.from(
      loaderSource
        .replace('"/shared/content-schema.js"', JSON.stringify(pathToFileURL(resolve(ROOT, "shared/content-schema.js")).href))
        .replace('"./clinic-data.js"', JSON.stringify(pathToFileURL(resolve(ROOT, "public/assistant/clinic-data.js")).href))
    ).toString("base64")
  );
  const clinicDataModule = await import(
    "data:text/javascript;base64," + Buffer.from(clinicDataSource).toString("base64")
  );
  void schemaSource;

  const fetchImpl = createFetch();
  const content = await loaderModule.createAssistantContentLoader(fetchImpl)();

  const clinicJson = JSON.parse(await readFile(resolve(ROOT, "dist/content/clinic.json"), "utf8"));
  const treatmentsJson = JSON.parse(await readFile(resolve(ROOT, "dist/content/treatments.json"), "utf8"));
  const professionalsJson = JSON.parse(await readFile(resolve(ROOT, "dist/content/professionals.json"), "utf8"));

  check("asistente: carga clinic.json", inventory.get("/content/clinic.json") === 1);
  check("asistente: nombre del CMS", content.clinic.name === clinicJson.name, content.clinic.name);
  check("asistente: horario del CMS", content.clinic.hours.days === clinicJson.hours.days, content.clinic.hours.days);
  check("asistente: teléfono del CMS", content.clinic.phoneDisplay === clinicJson.phoneDisplay, content.clinic.phoneDisplay);
  check(
    "asistente: WhatsApp recalculado desde clinic.json",
    content.clinic.whatsappUrl.includes(clinicJson.whatsappNumber)
  );
  check(
    "asistente: tratamientos del CMS",
    JSON.stringify(content.treatments.map((t) => t.name)) === JSON.stringify(treatmentsJson.treatments.map((t) => t.name)),
    `${content.treatments.length} tratamientos`
  );
  check(
    "asistente: profesionales del CMS",
    content.doctors.length === professionalsJson.professionals.length,
    `${content.doctors.length} profesionales`
  );
  check(
    "asistente: alias de búsqueda conservados",
    content.doctors.some((doctor) => doctor.aliases.includes("dr cabanillas"))
  );
  check("asistente: FAQ con ids obligatorios", content.faqs.some((f) => f.id === "hours"));
  check("asistente: ambientes desde la galería", content.facilities.length > 0, content.facilities.join(", "));
  check("asistente: respuestas no vacías", content.faqs.every((f) => f.answer.trim().length > 0));
  check("FAQ eliminada queda ausente para respuesta genérica", loaderModule.findFaqById(content.faqs, "faq-retirada") === null);
  check("FAQ vacía no conserva entradas previas", loaderModule.findFaqById([], "hours") === null);
  const assistantSource = await readFile(resolve(ROOT, "public/assistant/assistant.js"), "utf8");
  check(
    "FAQ ausente usa respuesta genérica con contacto",
    /if \(entry\) return getFaqResponse\(entry\);\s*return getFallbackResponse\(\);/.test(assistantSource) &&
      !assistantSource.includes("FAQ_FALLBACKS")
  );

  const failedFetch = async (path, options) => {
    if (path === "/content/treatments.json" || path === "/content/assistant-faqs.json") {
      return { ok: false, status: 503, json: async () => null };
    }
    return fetchImpl(path, options);
  };
  const originalConsoleError = console.error;
  console.error = () => {};
  let failedContent;
  try {
    failedContent = await loaderModule.createAssistantContentLoader(failedFetch)();
  } finally {
    console.error = originalConsoleError;
  }
  check("error HTTP conserva fallback de tratamientos", failedContent.treatments.length > 0);
  check("error HTTP conserva FAQ locales", failedContent.faqs.length === content.faqs.length);
  check(
    "asistente: respaldo local alineado con clinic.json",
    clinicDataModule.clinic.whatsappNumber === clinicJson.whatsappNumber
  );
}

// 2. La portada (ContentProvider) normaliza las colecciones del CMS.
async function testSiteProvider() {
  const schema = await import(pathToFileURL(resolve(ROOT, "shared/content-schema.js")).href);
  const treatments = JSON.parse(await readFile(resolve(ROOT, "dist/content/treatments.json"), "utf8"));
  const gallery = JSON.parse(await readFile(resolve(ROOT, "dist/content/gallery.json"), "utf8"));
  const videos = JSON.parse(await readFile(resolve(ROOT, "dist/content/videos.json"), "utf8"));
  const professionals = JSON.parse(await readFile(resolve(ROOT, "dist/content/professionals.json"), "utf8"));
  const clinicJson = JSON.parse(await readFile(resolve(ROOT, "dist/content/clinic.json"), "utf8"));
  const seo = await import(pathToFileURL(resolve(ROOT, "shared/seo.js")).href);
  const siteConfig = await import(pathToFileURL(resolve(ROOT, "shared/site-config.js")).href);

  const treatmentResult = schema.normalizeTreatments(treatments);
  check("portada: ids únicos en tratamientos", new Set(treatmentResult.items.map((i) => i.id)).size === treatmentResult.items.length);
  check("portada: ids estables", treatmentResult.items[0].id === schema.normalizeTreatments(treatments).items[0].id);

  const galleryResult = schema.normalizeGallery(gallery);
  const videosResult = schema.normalizeVideos(videos);
  check("portada: galería válida", galleryResult.valid && galleryResult.errors.length === 0, galleryResult.errors.join("; "));
  check(
    "portada: galería con categorías normalizadas",
    galleryResult.items.every((item) => schema.GALLERY_CATEGORIES.includes(item.category))
  );

  const professionalResult = schema.normalizeProfessionals(professionals);
  check("portada: profesionales con id", professionalResult.items.every((item) => Boolean(item.id)));

  check("site videos cargados desde el CMS", videosResult.valid && videosResult.items.length === videos.videos.length);

  const normalizedClinic = schema.normalizeClinic(clinicJson).value;
  const seoHours = seo.buildSeoModel(normalizedClinic).jsonLd.openingHoursSpecification || [];
  check(
    "horario SEO deriva del horario visible de clinic.json",
    seoHours.length === 2 && seoHours[0].opens === "08:30" && seoHours[0].closes === "13:00" &&
      seoHours[1].opens === "15:00" && seoHours[1].closes === "19:30"
  );
  check(
    "horarios inválidos o días no admitidos no generan JSON-LD",
    seo.buildReadableSpec("Lunes a sábado", "13:77 p. m. – 1:00 p. m.") === null &&
      seo.buildReadableSpec("Día inventado", "8:30 a. m. – 1:00 p. m.") === null
  );
  check(
    "dirección de mapa no duplica ciudad ni país",
    decodeURIComponent(normalizedClinic.mapEmbedUrl).includes("Jr. Aguilar 339, Huánuco, Perú") &&
      !decodeURIComponent(normalizedClinic.mapEmbedUrl).includes("Perú, Huánuco")
  );
  check(
    "beneficios y sus imágenes proceden del JSON de clínica",
    normalizedClinic.content.benefits.length === 4 &&
      normalizedClinic.content.benefits[0].title === clinicJson.content.benefits[0].title
  );
  const [aboutSource, benefitsSource, providerSource, cmsConfig] = await Promise.all([
    readFile(resolve(ROOT, "src/site/components/AboutSection.jsx"), "utf8"),
    readFile(resolve(ROOT, "src/site/components/BenefitsSection.jsx"), "utf8"),
    readFile(resolve(ROOT, "src/site/content/ContentProvider.jsx"), "utf8"),
    readFile(resolve(ROOT, "admin/config.yml"), "utf8")
  ]);
  check(
    "carrusel muestra el rótulo de la diapositiva activa",
    aboutSource.includes('label: "Área de consultoría"') &&
      aboutSource.includes("teamSlides[activeSlideIndex]?.label") &&
      aboutSource.includes("onSlideChange={(swiper) => setActiveSlideIndex(swiper.realIndex)}")
  );
  check(
    "beneficios: clinic.json es la única fuente de títulos, textos e imágenes",
    benefitsSource.includes("clinic?.content?.benefits") &&
      !benefitsSource.includes("data/benefits.js") &&
      !benefitsSource.includes("benefitImages")
  );
  const benefitsCollection = cmsConfig.match(/name: benefits\r?\n[\s\S]*?allow_reorder: true/)?.[0] || "";
  check(
    "lista CMS de beneficios permite añadir, eliminar y reordenar",
    benefitsCollection.includes("allow_add: true") &&
      benefitsCollection.includes("allow_remove: true") &&
      benefitsCollection.includes("allow_reorder: true")
  );
  const emptyBenefitsClinic = schema.normalizeClinic(
    { ...clinicJson, content: { ...clinicJson.content, benefits: [] } },
    normalizedClinic
  );
  check(
    "lista vacía de beneficios se respeta",
    emptyBenefitsClinic.value.content.benefits.length === 0
  );
  check(
    "error HTTP de clínica usa el respaldo compilado del mismo clinic.json",
    providerSource.includes('import clinicFallback from "../../../content/clinic.json"') &&
      providerSource.includes("clinic: normalizeClinic(clinicFallback).value") &&
      providerSource.includes("let clinic = buildFallback.clinic") &&
      providerSource.includes("if (clinicRaw)")
  );
  const { createServer: createViteServer } = await import("vite");
  const vite = await createViteServer({
    configFile: resolve(ROOT, "vite.config.js"),
    server: { middlewareMode: true },
    appType: "custom"
  });
  const originalFetch = globalThis.fetch;
  let failedClinicContent;
  let cmsPreview;
  let cmsPreviewEmpty;
  let cmsPreviewFallback;
  try {
    const provider = await vite.ssrLoadModule("/src/site/content/ContentProvider.jsx");
    const successfulFetch = createFetch();
    globalThis.fetch = async (path, options) => {
      if (path === "/content/clinic.json") {
        return { ok: false, status: 503, json: async () => null };
      }
      return successfulFetch(path, options);
    };
    failedClinicContent = await provider.loadSiteContent();

    const previewLoader = await vite.ssrLoadModule("/src/cms-preview/services/content.js");
    const previewFetch = createFetch();
    cmsPreview = await previewLoader.createPageContentLoader(previewFetch)();
    const emptyFetch = async (path, options) => {
      if (path === "/content/clinic.json") {
        return {
          ok: true,
          status: 200,
          json: async () => ({ ...clinicJson, content: { ...clinicJson.content, benefits: [] } })
        };
      }
      if (path === "/content/videos.json") {
        return { ok: true, status: 200, json: async () => ({ videos: [] }) };
      }
      return createFetch()(path, options);
    };
    cmsPreviewEmpty = await previewLoader.createPageContentLoader(emptyFetch)();
    const noVideosFetch = async (path, options) => {
      if (path === "/content/videos.json") return { ok: false, status: 503, json: async () => null };
      return previewFetch(path, options);
    };
    const originalWarn = console.warn;
    console.warn = () => {};
    try {
      cmsPreviewFallback = await previewLoader.createPageContentLoader(noVideosFetch)();
    } finally {
      console.warn = originalWarn;
    }
  } finally {
    globalThis.fetch = originalFetch;
    await vite.close();
  }
  check(
    "error HTTP conserva beneficios del clinic.json incluido en build",
    JSON.stringify(failedClinicContent.clinic.content.benefits) ===
      JSON.stringify(normalizedClinic.content.benefits) &&
      failedClinicContent.errors.some((error) => error.includes("/content/clinic.json: HTTP 503"))
  );
  check(
    "cms-preview: beneficios y videos proceden de los JSON compartidos",
    JSON.stringify(cmsPreview.clinic.content.benefits) === JSON.stringify(normalizedClinic.content.benefits) &&
      cmsPreview.videos.length === videosResult.items.length &&
      cmsPreview.videos[0]?.title === videosResult.items[0]?.title
  );
  check(
    "cms-preview: listas vacías válidas de beneficios y videos se respetan",
    cmsPreviewEmpty.clinic.content.benefits.length === 0 && cmsPreviewEmpty.videos.length === 0
  );
  check(
    "cms-preview: error HTTP usa el fallback JSON de videos",
    cmsPreviewFallback.videos.length === videosResult.items.length
  );
  const [previewAboutSource, previewVideoSource, previewAppSource, indexSource] = await Promise.all([
    readFile(resolve(ROOT, "src/cms-preview/components/AboutSection.jsx"), "utf8"),
    readFile(resolve(ROOT, "src/cms-preview/components/VideoGallerySection.jsx"), "utf8"),
    readFile(resolve(ROOT, "src/cms-preview/App.jsx"), "utf8"),
    readFile(resolve(ROOT, "index.html"), "utf8")
  ]);
  check(
    "cms-preview renderiza beneficios/videos recibidos como props sin listas locales",
    previewAboutSource.includes("clinic.content.benefits") &&
      !/const benefits\s*=\s*\[/.test(previewAboutSource) &&
      previewVideoSource.includes("videos = []") && !/const videos\s*=\s*\[/.test(previewVideoSource) &&
      previewAppSource.includes("videos={content.videos}")
  );
  check(
    "el dominio SEO no está duplicado en index.html fuente",
    !/(?:https?:)?\/\/dentalcabanillas\.com/i.test(indexSource)
  );
  check(
    "dominio técnico controla canonical aunque el JSON intente cambiarlo",
    seo.buildSeoModel({ ...normalizedClinic, seo: { ...normalizedClinic.seo, canonical: "https://example.invalid/" } }).canonical ===
      siteConfig.SITE_CANONICAL_URL &&
      !/name:\s*canonical/.test(cmsConfig)
  );
  const generatedRobots = await readFile(resolve(ROOT, "dist/robots.txt"), "utf8");
  const generatedSitemap = await readFile(resolve(ROOT, "dist/sitemap.xml"), "utf8");
  check(
    "robots y sitemap usan el mismo dominio técnico",
    generatedRobots === siteConfig.buildRobotsTxt() &&
      generatedSitemap === siteConfig.buildSitemapXml() &&
      generatedRobots.includes(new URL("/sitemap.xml", siteConfig.SITE_ORIGIN).href) &&
      generatedSitemap.includes(siteConfig.SITE_CANONICAL_URL)
  );
  check(
    "robots.txt y sitemap.xml se publican en dist/",
    generatedRobots.trim().length > 0 && generatedSitemap.includes("<urlset")
  );
  const imageConsumers = await Promise.all([
    readFile(resolve(ROOT, "src/site/components/HeroSection.jsx"), "utf8"),
    readFile(resolve(ROOT, "src/site/components/AboutSection.jsx"), "utf8"),
    readFile(resolve(ROOT, "src/site/components/ContactSection.jsx"), "utf8")
  ]);
  check(
    "imágenes heroReceptionClose, aboutRoom y mapImage tienen consumidores",
    imageConsumers[0].includes("heroReceptionClose") && imageConsumers[1].includes("images.aboutRoom") &&
      imageConsumers[2].includes("images.mapImage")
  );
  const invalidJsonValues = [null, false, 0].every((value) => {
    try {
      schema.assertContentObject(value, "colección de prueba");
      return false;
    } catch {
      return true;
    }
  });
  check("JSON null, false y 0 se rechazan como colección inválida", invalidJsonValues);

  // Colección vacía: válida y sin registros.
  const empty = schema.normalizeTreatments({ treatments: [] });
  check("colección vacía de tratamientos no restaura datos", empty.valid && empty.items.length === 0);
  const emptyGallery = schema.normalizeGallery({ items: [] });
  check("colección vacía de galería no restaura datos", emptyGallery.valid && emptyGallery.items.length === 0);
  const emptyVideos = schema.normalizeVideos({ videos: [] });
  check("colección vacía de videos no restaura datos", emptyVideos.valid && emptyVideos.items.length === 0);
  const emptyProfessionals = schema.normalizeProfessionals({ professionals: [] });
  check("colección vacía de profesionales no restaura datos", emptyProfessionals.valid && emptyProfessionals.items.length === 0);
  const emptyFaqs = schema.normalizeFaqs({ faqs: [] });
  check("colección vacía de FAQ es válida", emptyFaqs.valid && emptyFaqs.items.length === 0);

  // Registros inválidos: se omiten, no rompen la colección.
  const mixed = schema.normalizeTreatments({
    treatments: [{ name: "Válido", description: "d", keywords: ["v"] }, { description: "sin nombre" }]
  });
  check("un tratamiento inválido no invalida la colección", mixed.items.length === 1 && mixed.errors.length === 1);

  const badFaqs = schema.normalizeFaqs({
    faqs: [
      { id: "hours", topic: "Horario", keywords: ["horario"], answer: "A" },
      { id: "hours", topic: "Duplicada", keywords: ["x"], answer: "B" },
      { topic: "Sin id", answer: "C" }
    ]
  });
  check("FAQ duplicada/inválida se omite sin romper", badFaqs.valid && badFaqs.items.length === 1);

  // Imágenes: todas las rutas del CMS existen en assets/.
  const images = [
    ...Object.values(JSON.parse(await readFile(resolve(ROOT, "dist/content/clinic.json"), "utf8")).images || {}),
    ...normalizedClinic.content.benefits.map((item) => item.image),
    ...galleryResult.items.flatMap((item) => [item.image, item.secondaryImage]),
    ...professionalResult.items.map((item) => item.image),
    ...treatmentResult.items.map((item) => item.image),
    ...videosResult.items.flatMap((item) => [item.videoUrl, item.thumbnail])
  ].filter(Boolean);

  let missing = 0;
  for (const image of images) {
    try {
      await readFile(resolve(ROOT, "dist", image.slice(1)));
    } catch {
      missing += 1;
      console.log("  falta:", image);
    }
  }
  check(`imágenes del CMS accesibles en dist/ (${images.length})`, missing === 0);
}

const server = await startServer(resolve(ROOT, "dist"), 4179);
try {
  await testAssistantLoader();
  await testSiteProvider();
} finally {
  server.close();
}

const failed = results.filter((result) => !result.ok);
console.log(`\n${results.length - failed.length}/${results.length} comprobaciones correctas.`);
process.exitCode = failed.length ? 1 : 0;
