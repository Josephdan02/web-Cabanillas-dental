/**
 * Directorios que se publican tal cual dentro de dist/.
 *
 * - admin:        panel de Decap CMS (/admin/).
 * - assets:       imágenes servidas como /assets/... (incluye las que sube el CMS).
 * - content:      JSON administrables que consume la portada y el asistente.
 * - shared:       esquema compartido que importa el asistente en tiempo de ejecución.
 *
 * `assets/uploads` se excluye porque Decap escribe ahí los archivos recién
 * subidos; su contenido se publica en `assets/` (media_folder + public_folder).
 * La declaración vive solo aquí: copy-public-assets.mjs y verify-build.mjs la
 * importan para no duplicarla.
 */
export const cmsDirectories = ["admin", "assets", "content", "shared"];

export function isPublishedAsset(relativePath) {
  return relativePath !== "assets/uploads" && !relativePath.startsWith("assets/uploads/");
}
