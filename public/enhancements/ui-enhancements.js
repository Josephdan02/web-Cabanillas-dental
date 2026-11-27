/**
 * Dental Cabanillas — mejoras de interfaz (JavaScript independiente)
 * ---------------------------------------------------------------------------
 * No modifica el bundle React ni el CSS compilado.
 *
 *  1. Navbar: el enlace «Whatsapp» se presenta como «Reserva ahora» con icono
 *     oficial de WhatsApp (SVG local, trazado original embebido). Solo cambia
 *     el contenido visual: el href, target y rel del React no se tocan.
 *  2. Menú flotante «Contacto» (esquina inferior derecha) + botón
 *     independiente «Asistente» situado justo encima:
 *     - El menú reutiliza el estado del botón original de React para los
 *       enlaces sociales (mismo estado → mismos enlaces originales).
 *     - Cierra el asistente al abrir el menú y viceversa.
 *  3. El icono 3D del diente NO se modifica: la figura del bracket es parte del
 *     diseño original y se conserva exactamente como está.
 *
 * Todo es progresivo: si algo no se encuentra, no falla nada más.
 */
(function () {
  "use strict";

  var doc = document;
  var root = doc.getElementById("root");
  if (!root) return;

  var SVG_NS = "http://www.w3.org/2000/svg";

  /* Icono oficial de WhatsApp (mismo trazado que usa el propio sitio). */
  var WHATSAPP_PATH =
    "M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z";

  /* Trazados de redes del propio sitio (SVG local, sin API externa). */
  var WHATSAPP_SVG_MARKUP =
    '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" focusable="false"><path d="' +
    WHATSAPP_PATH +
    '"></path></svg>';

  var SOCIAL_PATHS = {
    facebook:
      '<path fill="currentColor" d="M23.998 12.078C23.998 4.911 18.627 0 12 0S0 4.911 0 12.078C0 18.478 4.388 23.746 10.125 24v-8.437H7.078v-3.485h3.047v-2.66c0-3.025 1.792-4.697 4.533-4.697 1.312 0 2.686.235 2.686.235v2.971H15.83c-1.491 0-1.956.93-1.956 1.886v2.265h3.328l-.532 3.485h-2.796V24C19.612 23.746 24 18.478 24 12.078Z"/>',
    instagram:
      '<path fill="currentColor" d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069ZM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0Zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324ZM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8Zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881Z"/>',
    tiktok:
      '<path fill="currentColor" d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07Z"/>'
  };

  function whatsappSvg(className) {
    var svg = doc.createElementNS(SVG_NS, "svg");
    svg.setAttribute("viewBox", "0 0 24 24");
    svg.setAttribute("fill", "currentColor");
    svg.setAttribute("aria-hidden", "true");
    svg.setAttribute("focusable", "false");
    if (className) svg.setAttribute("class", className);
    var path = doc.createElementNS(SVG_NS, "path");
    path.setAttribute("d", WHATSAPP_PATH);
    svg.appendChild(path);
    return svg;
  }

  /* ======================================================================== */
  /* 1. Navbar: enlace «Whatsapp» → «Reserva ahora» con icono                */
  /* ======================================================================== */

  var NAV_TEXT = "Reserva ahora";

  function decorateNavCta() {
    var header = root.querySelector(":scope > div > header");
    if (!header) return;

    var candidates = header.querySelectorAll("a[target='_blank']");
    for (var i = 0; i < candidates.length; i += 1) {
      var link = candidates[i];
      if (link.classList.contains("dcb-nav-cta")) continue;
      if (link.closest("nav") && link.closest("nav").closest("header") === header) continue;

      var label = (link.textContent || "").replace(/\s+/g, " ").trim().toLowerCase();
      if (label !== "whatsapp" && label !== "whatsapp ") continue;

      link.classList.add("dcb-nav-cta");
      link.textContent = "";
      var icon = doc.createElement("span");
      icon.className = "dcb-nav-cta__icon";
      icon.setAttribute("aria-hidden", "true");
      icon.appendChild(whatsappSvg());
      link.appendChild(icon);
      link.appendChild(doc.createTextNode(NAV_TEXT));
      if (!link.getAttribute("aria-label")) {
        link.setAttribute("aria-label", "Reserva ahora por WhatsApp");
      }
      return;
    }
  }

  /* ======================================================================== */
  /* 2. Menú flotante unificado                                              */
  /* ======================================================================== */

  var menu = null;
  var toggle = null;
  var items = {};
  var isMenuOpen = false;
  var lastFocused = null;

  function getOriginalContactToggle() {
    return root.querySelector("button[aria-label='Abrir menú de redes sociales']");
  }

  function getAssistantLauncher() {
    return doc.getElementById("dcb-launcher");
  }

  function isAssistantOpen() {
    var launcher = getAssistantLauncher();
    return !!launcher && launcher.getAttribute("aria-expanded") === "true";
  }

  function getAssistantClose() {
    return doc.getElementById("dcb-close");
  }

  /* Enlaces oficiales verificados (los mismos que ya publica el sitio).
     Se usan únicamente como respaldo si el widget de React no está disponible. */
  var OFFICIAL_LINKS = [
    {
      network: "whatsapp",
      href: "https://api.whatsapp.com/send/?phone=51988129696&text=Hola%20Dental%20Cabanillas,%20quiero%20reservar%20una%20cita&type=phone_number&app_absent=0"
    },
    { network: "facebook", href: "https://www.facebook.com/Clinica.Cabanillas/" },
    { network: "instagram", href: "https://www.instagram.com/dental.cabanillas/" },
    { network: "tiktok", href: "https://www.tiktok.com/discover/clinica-dental-cabanillas-huanuco" }
  ];
  var NETWORK_ORDER = ["whatsapp", "facebook", "instagram", "tiktok"];

  /**
   * Lee los enlaces del menú social original de React.
   * El botón original hace toggle del panel, por lo que se abre y se cierra
   * en la misma llamada síncrona: el usuário nunca ve el panel destello.
   */
  function collectSocialLinks() {
    var original = getOriginalContactToggle();
    if (!original) return OFFICIAL_LINKS.slice();

    var wasExpanded = original.getAttribute("aria-expanded") === "true";
    if (!wasExpanded) original.click();

    var panel = original.parentElement;
    var links = panel ? Array.prototype.slice.call(panel.querySelectorAll("a[href]")) : [];

    if (!wasExpanded) original.click();

    var social = [];
    links.forEach(function (link) {
      var text = (link.textContent || "").replace(/\s+/g, " ").trim().toLowerCase();
      var href = link.getAttribute("href");
      if (!href) return;
      for (var i = 0; i < NETWORK_ORDER.length; i += 1) {
        var name = NETWORK_ORDER[i];
        if (text.indexOf(name) === 0 && !social.some(function (entry) { return entry.network === name; })) {
          social.push({ network: name, href: href });
          return;
        }
      }
    });

    if (social.length < NETWORK_ORDER.length) {
      // Completa con los enlaces oficiales lo que no se haya podido leer.
      OFFICIAL_LINKS.forEach(function (entry) {
        if (!social.some(function (item) { return item.network === entry.network; })) {
          social.push(entry);
        }
      });
    }

    social.sort(function (a, b) {
      return NETWORK_ORDER.indexOf(a.network) - NETWORK_ORDER.indexOf(b.network);
    });

    return social;
  }

  function buildMenu() {
    var wrapper = doc.createElement("div");
    wrapper.className = "dcb-ui-menu-root";
    wrapper.id = "dcb-ui-menu-root";

    wrapper.innerHTML =
      '<section class="dcb-ui-menu" id="dcb-ui-menu" role="dialog" aria-modal="false" aria-labelledby="dcb-ui-menu-title" hidden>' +
      '  <h2 class="dcb-ui-menu__title" id="dcb-ui-menu-title">Contacto</h2>' +
      '  <p class="dcb-ui-menu__hint">Elige cómo quieres comunicarte con nosotros.</p>' +
      '  <div class="dcb-ui-menu__list" role="list">' +
      '    <a class="dcb-ui-item dcb-ui-item--whatsapp" role="listitem" data-dcb-item="whatsapp" target="_blank" rel="noopener noreferrer">' +
      '      <span class="dcb-ui-item__icon dcb-ui-item__icon--whatsapp">' + WHATSAPP_SVG_MARKUP + "</span>" +
      '      <span class="dcb-ui-item__text"><span class="dcb-ui-item__label">WhatsApp</span><span class="dcb-ui-item__meta">Reserva y consultas directas</span></span>' +
      "    </a>" +
      '    <a class="dcb-ui-item dcb-ui-item--facebook" role="listitem" data-dcb-item="facebook" target="_blank" rel="noopener noreferrer">' +
      '      <span class="dcb-ui-item__icon dcb-ui-item__icon--facebook"></span>' +
      '      <span class="dcb-ui-item__text"><span class="dcb-ui-item__label">Facebook</span></span>' +
      "    </a>" +
      '    <a class="dcb-ui-item dcb-ui-item--instagram" role="listitem" data-dcb-item="instagram" target="_blank" rel="noopener noreferrer">' +
      '      <span class="dcb-ui-item__icon dcb-ui-item__icon--instagram"></span>' +
      '      <span class="dcb-ui-item__text"><span class="dcb-ui-item__label">Instagram</span></span>' +
      "    </a>" +
      '    <a class="dcb-ui-item dcb-ui-item--tiktok" role="listitem" data-dcb-item="tiktok" target="_blank" rel="noopener noreferrer">' +
      '      <span class="dcb-ui-item__icon dcb-ui-item__icon--tiktok"></span>' +
      '      <span class="dcb-ui-item__text"><span class="dcb-ui-item__label">TikTok</span></span>' +
      "    </a>" +
      "  </div>" +
      "</section>" +
      '<button type="button" class="dcb-ui-toggle" id="dcb-ui-toggle" aria-controls="dcb-ui-menu" aria-expanded="false">' +
      '  <span class="dcb-ui-toggle__icon" aria-hidden="true">' +
      '    <span class="dcb-ui-toggle__phone"><svg viewBox="0 0 24 24" fill="none" aria-hidden="true" focusable="false"><path d="M6.3 3.6 9 3c.5-.1 1 .2 1.2.7l1.1 3c.1.4 0 .8-.3 1.1l-1.5 1.4a14 14 0 0 0 4.5 4.5l1.4-1.5c.3-.3.7-.4 1.1-.3l3 1.1c.5.2.8.7.7 1.2l-.6 2.7c-.1.7-.7 1.2-1.4 1.2C9.6 18.1 5.9 14.4 5.1 5c0-.7.5-1.3 1.2-1.4Z" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg></span>' +
      '    <span class="dcb-ui-toggle__close"><svg viewBox="0 0 24 24" fill="none" aria-hidden="true" focusable="false"><path d="m6 6 12 12M18 6 6 18" stroke="currentColor" stroke-width="2.1" stroke-linecap="round"/></svg></span>' +
      "  </span>" +
      '  <span class="dcb-ui-toggle__label">Contacto</span>' +
      "</button>";

    doc.body.appendChild(wrapper);

    menu = wrapper.querySelector("#dcb-ui-menu");
    toggle = wrapper.querySelector("#dcb-ui-toggle");

    items.whatsapp = wrapper.querySelector("[data-dcb-item='whatsapp']");
    items.facebook = wrapper.querySelector("[data-dcb-item='facebook']");
    items.instagram = wrapper.querySelector("[data-dcb-item='instagram']");
    items.tiktok = wrapper.querySelector("[data-dcb-item='tiktok']");

    // Iconos SVG locales: redes del sitio (el de WhatsApp ya viene en el HTML).
    ["facebook", "instagram", "tiktok"].forEach(function (name) {
      var host = items[name].querySelector(".dcb-ui-item__icon");
      if (!host) return;
      host.innerHTML =
        '<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">' + SOCIAL_PATHS[name] + "</svg>";
    });

    items.whatsapp.setAttribute("aria-label", "Escribir a Dental Cabanillas por WhatsApp");
    items.facebook.setAttribute("aria-label", "Abrir Facebook de Dental Cabanillas");
    items.instagram.setAttribute("aria-label", "Abrir Instagram de Dental Cabanillas");
    items.tiktok.setAttribute("aria-label", "Abrir TikTok de Dental Cabanillas");
  }

  function syncSocialLinks() {
    var links = collectSocialLinks();
    links.forEach(function (entry) {
      var item = items[entry.network];
      if (item && entry.href) {
        item.setAttribute("href", entry.href);
      }
    });
  }

  function focusables() {
    return Array.prototype.slice.call(menu.querySelectorAll("a[href], button:not([disabled])"));
  }

  function setExpanded(open) {
    toggle.setAttribute("aria-expanded", open ? "true" : "false");
    toggle.setAttribute("aria-label", open ? "Cerrar el menú de contacto" : "Abrir el menú de contacto");
    var host = doc.getElementById("dcb-ui-menu-root");
    if (host) host.classList.toggle("is-open", !!open);
  }

  /**
   * Atributos dialog/aria-hidden deben cambiar ANTES del toggle `hidden`.
   * Chromium descarta aria-hidden sobre un elemento que acaba de perder el
   * foco dentro de un diálogo, así que ocultar y marcar son un solo paso.
   */
  function openMenu(options) {
    if (!menu || isMenuOpen) return;

    if (isAssistantOpen()) {
      var closeBtn = getAssistantClose();
      if (closeBtn) closeBtn.click();
    }

    syncSocialLinks();

    isMenuOpen = true;
    lastFocused = options && options.trigger ? options.trigger : doc.activeElement;
    menu.setAttribute("aria-hidden", "false");
    menu.hidden = false;
    setExpanded(true);

    // El widget original de React queda oculto visualmente y con aria-hidden.
    var original = getOriginalContactToggle();
    if (original) original.setAttribute("aria-hidden", "true");

    var list = focusables();
    if (list.length) {
      window.requestAnimationFrame(function () {
        list[0].focus({ preventScroll: true });
      });
    }
  }

  function closeMenu(options) {
    if (!menu || !isMenuOpen) return;
    isMenuOpen = false;

    if (menu.contains(doc.activeElement) && doc.activeElement.blur) {
      doc.activeElement.blur();
    }

    menu.setAttribute("aria-hidden", "true");
    menu.hidden = true;
    setExpanded(false);

    var original = getOriginalContactToggle();
    if (original) original.removeAttribute("aria-hidden");

    var restore = !options || options.restoreFocus !== false;
    if (restore) {
      var target = lastFocused && doc.contains(lastFocused) ? lastFocused : toggle;
      target.focus({ preventScroll: true });
    }
  }

  function onMenuKeydown(event) {
    if (event.key === "Escape") {
      event.preventDefault();
      closeMenu();
      return;
    }
    if (event.key !== "Tab") return;

    var list = focusables();
    if (!list.length) return;
    var first = list[0];
    var last = list[list.length - 1];

    // Foco circular dentro del menú (patrón de diálogo no modal).
    if (event.shiftKey && doc.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && doc.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  }

  function bindMenu() {
    if (!menu) return;

    toggle.addEventListener("click", function () {
      if (isMenuOpen) closeMenu();
      else openMenu({ trigger: toggle });
    });

    // Al abrir el asistente (botón propio, ahora independiente) se cierra el
    // menú de contacto. Se escucha en captura para actuar antes del listener
    // de assistant.js, sin interferir con él.
    var assistantLauncher = getAssistantLauncher();
    if (assistantLauncher) {
      assistantLauncher.addEventListener(
        "click",
        function () {
          if (isMenuOpen) closeMenu({ restoreFocus: false });
        },
        true
      );
    }

    ['whatsapp', 'facebook', 'instagram', 'tiktok'].forEach(function (name) {
      items[name].addEventListener("click", function () {
        closeMenu({ restoreFocus: false });
      });
    });

    menu.addEventListener("keydown", onMenuKeydown);

    // Clic fuera del menú: cierre discreto sin robar el foco.
    doc.addEventListener("pointerdown", function (event) {
      if (!isMenuOpen) return;
      if (menu.contains(event.target) || toggle.contains(event.target)) return;
      if (event.target && event.target.closest && event.target.closest("#dcb-launcher")) return;
      closeMenu({ restoreFocus: false });
    });
  }

  /* ======================================================================== */
  /* Arranque                                                               */
  /* ======================================================================== */

  function boot() {
    decorateNavCta();
    if (!menu) {
      buildMenu();
      bindMenu();
    }
    syncSocialLinks();
    var original = getOriginalContactToggle();
    if (original) original.setAttribute("aria-hidden", "true");
  }

  function start() {
    boot();
    if (doc.querySelector(".dcb-nav-cta")) return;
    var tries = 0;
    var timer = window.setInterval(function () {
      tries += 1;
      decorateNavCta();
      if (doc.querySelector(".dcb-nav-cta") || tries >= 40) window.clearInterval(timer);
    }, 250);
  }

  if (doc.readyState === "loading") {
    doc.addEventListener("DOMContentLoaded", start, { once: true });
  } else {
    start();
  }
})();
