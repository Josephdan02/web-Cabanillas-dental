# Dominio, redirecciones y SEO — Dental Cabanillas

Dominio canónico: **https://dentalcabanillas.com/** (sin `www`, siempre HTTPS).

## 1. Tipo de despliegue identificado

El proyecto es un sitio **estático** compilado con Vite:

- `index.html` + `/assets/index-*.js` + `/assets/index-*.css`
- `/assistant/*` (asistente y datos de la clínica)
- Sin backend, sin base de datos, sin funciones.
- **No hay** `wrangler.toml` / `wrangler.jsonc`, `functions/`, `_worker.js`, `_redirects` ni `_headers` en el proyecto.

Por los archivos locales **no es posible distinguir** entre:

1. **Cloudflare Pages** con carga directa (Direct Upload) o conexión Git.
2. **Cloudflare Workers con Static Assets** gestionado desde el panel.

Ambos sirven estos mismos archivos sin cambios. Para saber cuál está en uso:

- Abrir **Cloudflare Dashboard → Workers & Pages**.
- Si el proyecto aparece en la pestaña **Pages**, es Pages.
- Si aparece como **Worker** con la sección **Static assets**, es Workers con Static Assets.

No se añadieron archivos de configuración de Cloudflare porque ninguno es necesario para este cambio de dominio.

## 2. Conectar el dominio en Cloudflare

Requisito previo: `dentalcabanillas.com` debe estar dado de alta como zona en la misma cuenta de Cloudflare y usar los nameservers asignados por Cloudflare.

### Caso A — Cloudflare Pages

1. **Workers & Pages → [proyecto] → Custom domains → Set up a custom domain**.
2. Añadir primero `dentalcabanillas.com` (será el dominio principal).
3. Añadir después `www.dentalcabanillas.com`.
4. Cloudflare crea los registros DNS necesarios. No crear manualmente un CNAME/A apuntando a Pages.
5. En **SSL/TLS → Edge Certificates**:
   - Activar **Always Use HTTPS**.
   - Activar **Automatic HTTPS Rewrites**.
   - Modo SSL: **Full (strict)**.
6. Si Pages ya redirige `www` al dominio principal, no hace falta nada más. Si no, aplicar la regla de la sección 3.

### Caso B — Cloudflare Workers con Static Assets

1. **Workers & Pages → [worker] → Settings → Domains & Routes → Add → Custom domain**.
2. Añadir `dentalcabanillas.com`.
3. Añadir `www.dentalcabanillas.com` (o dejar que la regla de redirección lo capture antes de llegar al Worker).
4. En **SSL/TLS → Edge Certificates**: activar **Always Use HTTPS**, **Automatic HTTPS Rewrites** y modo **Full (strict)**.
5. Crear la regla de redirección de la sección 3 para `www`.

> En Workers, el dominio personalizado debe pertenecer a una zona activa en Cloudflare. No se configura DNS ni dominio desde el código.

## 3. Redirección permanente de `www` al dominio principal

Cloudflare no permite hacer esta redirección desde `robots.txt`, `sitemap.xml` ni desde un archivo `_redirects` de Pages (ese archivo no puede comparar el hostname). Se hace en el panel:

**Rules → Redirect Rules → Create rule**

- **Rule name:** `www a apex`
- **When incoming requests match:**
  - Field: `Hostname`
  - Operator: `equals`
  - Value: `www.dentalcabanillas.com`
- **Then:**
  - Type: **Dynamic**
  - Expression: `concat("https://dentalcabanillas.com", http.request.uri.path)`
  - Status code: **301**
  - Preserve query string: **activado**

Con esto:

- `https://www.dentalcabanillas.com/*` → `301` → `https://dentalcabanillas.com/*`
- `http://www.dentalcabanillas.com/*` → primero HTTPS (Always Use HTTPS) → luego `301` al apex.
- `http://dentalcabanillas.com/*` → `301` a HTTPS por **Always Use HTTPS**.

La canonical de la página ya declara `https://dentalcabanillas.com/`, por lo que cualquier variante que llegue a responder consolida la indexación en el dominio correcto.

## 4. Verificación después de publicar

```bash
curl -I https://dentalcabanillas.com/
curl -I https://www.dentalcabanillas.com/
curl -I http://dentalcabanillas.com/
curl -I http://www.dentalcabanillas.com/
curl -s https://dentalcabanillas.com/robots.txt
curl -s https://dentalcabanillas.com/sitemap.xml
```

Resultados esperados:

| URL | Resultado |
|---|---|
| `https://dentalcabanillas.com/` | `200` |
| `https://www.dentalcabanillas.com/` | `301` → `https://dentalcabanillas.com/` |
| `http://dentalcabanillas.com/` | `301` → `https://dentalcabanillas.com/` |
| `http://www.dentalcabanillas.com/` | `301` → `https://dentalcabanillas.com/` |

Comprobar también que `robots.txt` y `sitemap.xml` responden en la raíz y que la canonical del HTML es `https://dentalcabanillas.com/`.

## 5. Google Search Console

1. Entrar en <https://search.google.com/search-console>.
2. Añadir una propiedad de tipo **Dominio**: `dentalcabanillas.com`.
3. Verificar mediante el registro **TXT de DNS** que indique Google (no hace falta tocar el sitio).
4. Una vez verificada, abrir **Sitemaps** y enviar: `https://dentalcabanillas.com/sitemap.xml`.
5. Usar **Inspección de URL** con `https://dentalcabanillas.com/` → **Solicitar indexación**.
6. Revisar **Indexación de páginas** para confirmar que la URL canónica se indexa y que `www` no genera duplicados.
7. Si en el futuro se dio de alta una propiedad antigua con otro dominio, no borrarla de inmediato: mantenerla hasta comprobar que ya no recibe tráfico.

## 6. Google Business Profile

1. Entrar en <https://business.google.com> y abrir el perfil de **Dental Cabanillas**.
2. Actualizar el campo **Sitio web** a `https://dentalcabanillas.com/`.
3. Confirmar que el nombre, la dirección (`Jr. Aguilar 339, Huánuco, Perú`), el teléfono (`+51 988 129 696`) y el horario coinciden exactamente con los datos del sitio y del JSON-LD.
4. Revisar los servicios publicados en el perfil; no añadir precios, reseñas ni certificaciones que no estén verificados.
5. Si el perfil aún no está verificado, completar la verificación de Google antes de cambiar masivamente la información.
6. Publicar una actualización o post con el nuevo sitio web para reforzar la señal.

## 7. Mantenimiento

- No editar los bundles de `/assets/`: cualquier cambio de interfaz requiere recompilar el proyecto original.
- Si se añaden páginas públicas nuevas, agregarlas a `sitemap.xml` con su URL canónica absoluta.
- Mantener una sola etiqueta `<link rel="canonical">` en `index.html`.
- No incluir fragmentos (`#inicio`, `#servicios`, `#contacto`) en el sitemap.
