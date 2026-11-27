import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { normalizeClinic, normalizeTreatments } from "../shared/content-schema.js";
import { buildSeoModel, injectSeo } from "../shared/seo.js";

const repositoryRoot = fileURLToPath(new URL("../", import.meta.url));
const clinicPath = `${repositoryRoot}content/clinic.json`;
const treatmentsPath = `${repositoryRoot}content/treatments.json`;

function readJson(path, fallback) {
  try {
    return JSON.parse(readFileSync(path, "utf8"));
  } catch (error) {
    console.warn(`[seo] No se pudo leer ${path}; se mantiene el HTML actual.`, error.message);
    return fallback;
  }
}

/**
 * Inyecta en index.html los metadatos que se pueden resolver en build.
 *
 * Se usan los normalizadores compartidos para que el HTML inicial use
 * exactamente los mismos datos (e identificadores) que la SPA y el asistente.
 * Nunca se generan datos estructurados con tratamientos eliminados: la lista
 * proviene del JSON vigente, y si está vacía no se publica `hasOfferCatalog`.
 * La vista CMS (`/cms-preview/`) y el panel (`/admin/`) no reciben SEO.
 */
export function seoPlugin() {
  return {
    name: "dental-cabanillas-seo",
    transformIndexHtml: {
      order: "post",
      handler(html, context = {}) {
        const filename = String(context.filename || "").replace(/\\/g, "/");
        const pathname = String(context.path || "");

        if (
          filename.includes("/cms-preview/") ||
          filename.includes("/admin/") ||
          pathname.startsWith("/cms-preview") ||
          pathname.startsWith("/admin")
        ) {
          return html;
        }

        const clinicRaw = readJson(clinicPath, null);
        if (!clinicRaw) return html;

        const clinic = normalizeClinic(clinicRaw).value;
        const treatmentsRaw = readJson(treatmentsPath, { treatments: [] });
        const treatments = normalizeTreatments(treatmentsRaw).items;
        const model = buildSeoModel(clinic, treatments);
        const output = injectSeo(html, model);

        // Salvaguarda: el HTML final debe seguir conteniendo el punto de montaje
        // y los scripts del bundle. Si un reemplazo de meta lo rompiera, se
        // publica el HTML original antes que una SPA que nunca arranca.
        const keepsDocument =
          (output.match(/<script/g) || []).length === (html.match(/<script/g) || []).length &&
          output.includes('id="root"') === html.includes('id="root"');

        if (!keepsDocument) {
          console.error("[seo] La inyección de metadatos alteró los scripts del HTML; se mantiene el HTML original.");
          return html;
        }

        return output;
      }
    }
  };
}
