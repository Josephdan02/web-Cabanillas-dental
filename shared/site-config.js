/** Configuración técnica del dominio público del sitio. */
export const SITE_ORIGIN = "https://dentalcabanillas.com";
export const SITE_CANONICAL_URL = new URL("/", SITE_ORIGIN).href;

export function buildSitemapXml() {
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${SITE_CANONICAL_URL}</loc>
  </url>
</urlset>
`;
}

export function buildRobotsTxt() {
  return `User-agent: *
Allow: /

# El panel de administración y la vista previa del CMS no son páginas públicas.
Disallow: /admin/
Disallow: /cms-preview/

# El asistente es una pieza de interfaz (no genera URLs propias).
# Las imágenes y los videos de la portada sí pueden indexarse.
Sitemap: ${new URL("/sitemap.xml", SITE_ORIGIN).href}
`;
}
