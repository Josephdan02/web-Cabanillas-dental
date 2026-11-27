# Dental Cabanillas

La portada de la clínica se edita en `src/site/`. Está reconstruida en React a partir de la versión compilada que venía en el repositorio.

| Ruta en el repositorio | Contenido |
| --- | --- |
| `index.html` | Entrada de la portada y metadatos SEO. |
| `src/site/components/` | Un componente JSX por sección de la web. |
| `src/site/data/` | Textos, enlaces y referencias a imágenes de la portada. |
| `public/styles/` | Estilos de la portada, tipografía, utilidades y carruseles. |
| `public/assistant/` | JavaScript, CSS y carga de contenido del asistente dental. |
| `public/enhancements/` | Ajustes de navegación, accesos flotantes y encabezado principal. |
| `assets/`, `public/videos/`, `public/video-posters/` | Imágenes, videos y miniaturas. |
| `admin/`, `content/` | Panel Decap CMS y archivos JSON que edita. |
| `src/cms-preview/` | Vista previa de la integración de la portada con el CMS. |

## Ejecutar el sitio

Usa Node.js 22.12 o superior.

```sh
npm ci
npm run dev
```

Abre la URL que indique Vite. La portada está en `/`, el panel en `/admin/` y la vista de integración en `/cms-preview/`. El asistente de la portada sigue leyendo el contenido de `content/`.

## Compilar

```sh
npm run build
npm run check:build
npm run preview
```

La carpeta `dist/` se genera para publicar. Edita los archivos fuente del repositorio y vuelve a ejecutar la compilación para actualizarla.
