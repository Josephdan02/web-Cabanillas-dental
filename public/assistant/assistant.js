/**
 * Asistente Dental Cabanillas
 * Componente independiente en JavaScript vanilla.
 *
 * No usa React, backend, APIs externas, bases de datos ni claves.
 * Carga el contenido del CMS y usa clinic-data.js como respaldo local.
 */

import {
  clinic,
  buildWhatsAppUrl,
  treatments as fallbackTreatments,
  doctors as fallbackDoctors,
  technology as fallbackTechnology,
  facilities as fallbackFacilities,
  quickQuestions,
  faqs as fallbackFaqs
} from "./clinic-data.js";
import { findFaqById, loadAssistantContent } from "./content-loader.js";
import { normalizeIdentity } from "/shared/content-schema.js";

const ASSISTANT_NAME = "Asistente Dental Cabanillas";
const GENERIC_MESSAGE = "Hola Dental Cabanillas, tengo una consulta. Vengo del asistente virtual.";
const APPOINTMENT_MESSAGE = "Hola Dental Cabanillas, quiero solicitar una cita. Vengo del asistente virtual.";
const EVALUATION_MESSAGE = "Hola Dental Cabanillas, necesito orientación para una evaluación. Vengo del asistente virtual.";
const cmsContentPromise = loadAssistantContent();

let treatments = fallbackTreatments;
let doctors = fallbackDoctors;
let technology = fallbackTechnology;
let facilities = fallbackFacilities;
let faqs = fallbackFaqs;

const ICONS = {
  chat: '<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M21 11.5a8.4 8.4 0 0 1-8.5 8.4 8.9 8.9 0 0 1-3.8-.8L3 21l1.7-4.6a8.4 8.4 0 1 1 16.3-4.9Z" stroke="currentColor" stroke-width="1.9" stroke-linejoin="round"/><path d="M8.2 11.8h.01M12 11.8h.01M15.8 11.8h.01" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"/></svg>',
  close: '<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="m6 6 12 12M18 6 6 18" stroke="currentColor" stroke-width="2.1" stroke-linecap="round"/></svg>',
  tooth: '<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M12 3.6c-1.7-1-3.4-1.3-4.7-.5C5.7 4 5 6.2 5.3 8.8c.2 1.5.5 2.7.9 4.1.3 1 .5 2.1.7 3.3.2 1.4.5 2.5 1.1 3.2.7.8 1.6.7 2.1-.2.4-.7.6-1.6.8-2.6l.3-1.4c.2-.9.6-1.4 1.3-1.4.8 0 1.2.5 1.4 1.4l.3 1.4c.2 1 .4 1.9.8 2.6.5.9 1.4 1 2.1.2.6-.7.9-1.8 1.1-3.2.2-1.2.4-2.3.7-3.3.4-1.4.7-2.6.9-4.1.3-2.6-.4-4.8-2-5.7-1.3-.8-3-.5-4.7.5-.4.2-.9.2-1.3 0Z" stroke="currentColor" stroke-width="1.7" stroke-linejoin="round"/></svg>',
  whatsapp: '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12.04 2.5a9.4 9.4 0 0 0-8.1 14.1L2.5 21.5l5.1-1.4a9.4 9.4 0 1 0 4.44-17.6Zm0 1.7a7.7 7.7 0 1 1-3.9 14.3l-.3-.2-3 .8.8-2.9-.2-.31A7.7 7.7 0 0 1 12.04 4.2Zm-3.5 3.7c-.2 0-.5.1-.7.4-.3.3-.9.9-.9 2.1s.9 2.4 1 2.5c.1.2 1.7 2.8 4.2 3.8 2.1.8 2.5.7 3 .6.5 0 1.5-.6 1.7-1.2.2-.6.2-1.1.1-1.2-.1-.1-.3-.2-.6-.3l-1.5-.7c-.2-.1-.4-.1-.5.1l-.7.9c-.1.1-.3.2-.5.1-.2-.1-1-.4-1.9-1.2-.7-.6-1.2-1.4-1.3-1.6-.1-.2 0-.3.1-.4l.4-.5c.1-.2.1-.3.2-.5.1-.2 0-.3 0-.5l-.6-1.4c-.2-.5-.4-.4-.6-.4h-.3Z"/></svg>',
  phone: '<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M6.3 3.6 9 3c.5-.1 1 .2 1.2.7l1.1 3c.1.4 0 .8-.3 1.1l-1.5 1.4a14 14 0 0 0 4.5 4.5l1.4-1.5c.3-.3.7-.4 1.1-.3l3 1.1c.5.2.8.7.7 1.2l-.6 2.7c-.1.7-.7 1.2-1.4 1.2C9.6 18.1 5.9 14.4 5.1 5c0-.7.5-1.3 1.2-1.4Z" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>',
  maps: '<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M12 21s7-5.1 7-11a7 7 0 1 0-14 0c0 5.9 7 11 7 11Z" stroke="currentColor" stroke-width="1.8"/><circle cx="12" cy="10" r="2.6" stroke="currentColor" stroke-width="1.8"/></svg>',
  send: '<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M21 3 10.5 13.5M21 3l-6.8 18-3.7-7.5L3 9.8 21 3Z" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"/></svg>',
  arrow: '<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>',
  down: '<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="m6 9 6 6 6-6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>',
  external: '<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M14 4h6v6M20 4l-9 9M19 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1h5" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>'
};

const root = document.createElement("div");
root.id = "dcb-assistant";
root.innerHTML = `
  <!--
    Botón flotante «Asistente»: independiente y siempre visible, justo encima
    del botón «Contacto» en la esquina inferior derecha.
    Se ocultó durante el menú unificado; ahora recupera su comportamiento
    original (aria-expanded + apertura/cierre del panel).
  -->
  <button
    type="button"
    class="dcb-launcher"
    id="dcb-launcher"
    aria-controls="dcb-panel"
    aria-expanded="false"
    aria-label="Abrir ${ASSISTANT_NAME}"
  >
    <span class="dcb-launcher-icon" aria-hidden="true">
      <span class="dcb-icon-chat">${ICONS.chat}</span>
      <span class="dcb-icon-close">${ICONS.close}</span>
    </span>
    <span class="dcb-launcher-label">Asistente</span>
  </button>

  <section
    class="dcb-panel"
    id="dcb-panel"
    role="dialog"
    aria-modal="false"
    aria-labelledby="dcb-title"
    tabindex="-1"
    hidden
  >
    <header class="dcb-header">
      <span class="dcb-avatar" aria-hidden="true">${ICONS.tooth}</span>
      <div class="dcb-heading">
        <div class="dcb-title" id="dcb-title">${ASSISTANT_NAME}</div>
        <div class="dcb-subtitle">
          <span class="dcb-status-dot" aria-hidden="true"></span>
          Asistente virtual · Información de la clínica
        </div>
      </div>
      <div class="dcb-header-actions">
        <a
          class="dcb-icon-btn dcb-header-wa"
          id="dcb-header-wa"
          href="${buildWhatsAppUrl(GENERIC_MESSAGE)}"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Escribir a Dental Cabanillas por WhatsApp"
          title="WhatsApp"
        >${ICONS.whatsapp}</a>
        <button type="button" class="dcb-icon-btn" id="dcb-close" aria-label="Cerrar ${ASSISTANT_NAME}">
          ${ICONS.close}
        </button>
      </div>
    </header>

    <div class="dcb-log-wrap" id="dcb-log-wrap">
      <div
        class="dcb-log"
        id="dcb-log"
        role="log"
        aria-live="polite"
        aria-relevant="additions"
        aria-label="Conversación con el ${ASSISTANT_NAME}"
      ></div>
      <button
        type="button"
        class="dcb-scroll-more"
        id="dcb-scroll-more"
        aria-controls="dcb-log"
        aria-label="Bajar para leer más mensajes"
        title="Hay más mensajes abajo"
        hidden
      >${ICONS.down}</button>
    </div>

    <div class="dcb-quick-wrap">
      <span class="dcb-quick-label">Preguntas frecuentes</span>
      <div class="dcb-quick" id="dcb-quick"></div>
    </div>

    <form class="dcb-composer" id="dcb-form" autocomplete="off">
      <label class="dcb-sr-only" for="dcb-input">Escribe tu pregunta</label>
      <input
        class="dcb-input"
        id="dcb-input"
        name="question"
        type="text"
        maxlength="300"
        placeholder="Escribe tu pregunta..."
        enterkeyhint="send"
      />
      <button type="submit" class="dcb-send" aria-label="Enviar pregunta">
        ${ICONS.send}
      </button>
    </form>

    <div class="dcb-note">
      <span>Asistente informativo. No brinda diagnósticos.</span>
      <a href="${buildWhatsAppUrl(GENERIC_MESSAGE)}" target="_blank" rel="noopener noreferrer">WhatsApp</a>
    </div>
  </section>
`;

document.body.appendChild(root);

const launcher = root.querySelector("#dcb-launcher");
const panel = root.querySelector("#dcb-panel");
const MENU_TOGGLE_SELECTOR = "#dcb-ui-toggle";
const closeButton = root.querySelector("#dcb-close");
const log = root.querySelector("#dcb-log");
const scrollMoreButton = root.querySelector("#dcb-scroll-more");
const form = root.querySelector("#dcb-form");
const input = root.querySelector("#dcb-input");
const sendButton = root.querySelector(".dcb-send");
const quickContainer = root.querySelector("#dcb-quick");
const launcherLabel = root.querySelector(".dcb-launcher-label");

let isOpen = false;
let hasWelcomed = false;
let isQuickReplyPending = false;

const assistantContentReady = cmsContentPromise
  .then((content) => {
    Object.assign(clinic, content.clinic);
    treatments = Array.isArray(content.treatments) ? content.treatments : fallbackTreatments;
    doctors = Array.isArray(content.doctors) ? content.doctors : fallbackDoctors;
    technology = Array.isArray(content.technology) ? content.technology : fallbackTechnology;
    facilities = Array.isArray(content.facilities) ? content.facilities : fallbackFacilities;
    faqs = Array.isArray(content.faqs) ? content.faqs : fallbackFaqs;

    const whatsappHref = buildWhatsAppUrl(GENERIC_MESSAGE);
    root.querySelector("#dcb-header-wa").href = whatsappHref;
    root.querySelector(".dcb-note a").href = whatsappHref;
  })
  .catch((error) => {
    console.error("[assistant content] Initialization failed; retaining clinic-data.js backup.", error);
  });

/* -------------------------------------------------------------------------- */
/* Utilidades                                                                 */
/* -------------------------------------------------------------------------- */

function normalize(value) {
  return normalizeIdentity(value);
}

function escapeRegExp(value) {
  return String(value).replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function hasTerm(text, term) {
  const normalizedTerm = normalize(term);
  if (!normalizedTerm) return false;

  if (normalizedTerm.includes(" ")) {
    return text.includes(normalizedTerm);
  }

  return new RegExp("\\b" + escapeRegExp(normalizedTerm) + "\\b").test(text);
}

function hasAny(text, terms) {
  return terms.some((term) => hasTerm(text, term));
}

function scrollToBottom() {
  window.requestAnimationFrame(() => {
    log.scrollTop = log.scrollHeight;
    updateScrollIndicator();
  });
}

function updateScrollIndicator() {
  const hasMore = log.scrollHeight - log.clientHeight - log.scrollTop > 12;
  scrollMoreButton.hidden = !hasMore;
}

function scrollToMessage(row, verticalPosition) {
  window.requestAnimationFrame(() => {
    const rowTop = row.getBoundingClientRect().top - log.getBoundingClientRect().top + log.scrollTop;
    log.scrollTop = Math.max(0, rowTop - log.clientHeight * verticalPosition);
    updateScrollIndicator();
  });
}

function createIcon(name, className) {
  const wrapper = document.createElement("span");
  wrapper.className = className || "";
  wrapper.setAttribute("aria-hidden", "true");
  wrapper.innerHTML = ICONS[name] || "";
  return wrapper;
}

function createAction(action) {
  const link = document.createElement("a");
  link.className = "dcb-action" + (action.kind === "whatsapp" ? " dcb-action-wa" : "");
  link.href = action.href;
  link.textContent = "";

  const icon = createIcon(action.kind === "whatsapp" ? "whatsapp" : action.kind === "phone" ? "phone" : action.kind === "maps" ? "maps" : "arrow");
  link.appendChild(icon);

  const label = document.createElement("span");
  label.textContent = action.label;
  link.appendChild(label);

  if (action.href.startsWith("#")) {
    link.addEventListener("click", () => {
      // Deja que el navegador haga el scroll; el panel permanece disponible.
    });
  } else if (action.href.startsWith("tel:")) {
    link.setAttribute("aria-label", action.label);
  } else {
    link.target = "_blank";
    link.rel = "noopener noreferrer";
    link.appendChild(createIcon("external"));
  }

  return link;
}

function addMessage(text, role, options) {
  const config = options || {};
  const row = document.createElement("div");
  row.className = "dcb-msg " + (role === "user" ? "dcb-msg-user" : "dcb-msg-bot");

  if (role !== "user") {
    const avatar = document.createElement("span");
    avatar.className = "dcb-msg-avatar";
    avatar.setAttribute("aria-hidden", "true");
    avatar.innerHTML = ICONS.tooth;
    row.appendChild(avatar);
  }

  const bubble = document.createElement("div");
  bubble.className = "dcb-bubble";
  bubble.textContent = text;
  row.appendChild(bubble);

  if (config.actions && config.actions.length) {
    const actions = document.createElement("div");
    actions.className = "dcb-actions";
    config.actions.forEach((action) => actions.appendChild(createAction(action)));
    bubble.appendChild(actions);
  }

  log.appendChild(row);
  if (config.scroll !== false) {
    scrollToBottom();
  }
  return row;
}

function addTypingIndicator() {
  const row = document.createElement("div");
  row.className = "dcb-msg dcb-msg-bot dcb-msg-typing";
  row.setAttribute("role", "status");
  row.setAttribute("aria-label", "El asistente está escribiendo");
  row.appendChild(createIcon("tooth", "dcb-msg-avatar"));

  const bubble = document.createElement("div");
  bubble.className = "dcb-bubble dcb-typing-bubble";

  const label = document.createElement("span");
  label.className = "dcb-sr-only";
  label.textContent = "El asistente está escribiendo";
  bubble.appendChild(label);

  const dots = document.createElement("span");
  dots.className = "dcb-typing-dots";
  dots.setAttribute("aria-hidden", "true");
  dots.innerHTML = "<span></span><span></span><span></span>";
  bubble.appendChild(dots);

  row.appendChild(bubble);
  log.appendChild(row);
  scrollToBottom();
  return row;
}

function setQuickReplyPending(pending) {
  isQuickReplyPending = pending;
  quickContainer.querySelectorAll("button").forEach((button) => {
    button.disabled = pending;
  });
  input.disabled = pending;
  sendButton.disabled = pending;
}

function whatsappAction(label, message) {
  return { label: label || "Escribir por WhatsApp", href: buildWhatsAppUrl(message || GENERIC_MESSAGE), kind: "whatsapp" };
}

function phoneAction() {
  return { label: "Llamar a la clínica", href: "tel:" + clinic.phoneRaw, kind: "phone" };
}

function mapsAction() {
  return { label: "Abrir en Google Maps", href: clinic.mapsUrl, kind: "maps" };
}

function sectionAction(label, href) {
  return { label, href, kind: "section" };
}

function response(text, actions) {
  return { text, actions: actions || [] };
}

/* -------------------------------------------------------------------------- */
/* Motor de respuestas                                                        */
/* -------------------------------------------------------------------------- */

const MEDICAL_PATTERNS = [
  /\bme duele\b/,
  /\bme duelen\b/,
  /\btengo dolor\b/,
  /\bdolor (fuerte|intenso|severo|de|en)\b/,
  /\bsangra\b/,
  /\bsangrado\b/,
  /\binfeccion\b/,
  /\binflamad[oa]\b/,
  /\bhinchad[oa]\b/,
  /\bfiebre\b/,
  /\bse me (rompio|rompe|cayo|salio|movio)\b/,
  /\b(muela|diente)\b.*\b(roto|rota|duele|sangra|inflamad[oa]|movid[oa])\b/,
  /\b(roto|rota|duele|sangra|inflamad[oa]|movid[oa])\b.*\b(muela|diente)\b/,
  /\burgente\b/,
  /\burgia\b/,
  /\bemergencia\b/,
  /\bmedicamento\b/,
  /\bmedicamentos\b/,
  /\bantibiotico\b/,
  /\bpastilla\b/,
  /\breceta\b/,
  /\bpuedo tomar\b/,
  /\bdiagnostico\b/,
  /\bque tengo\b/,
  /\bes grave\b/,
  /\bembarazad[ao]\b/,
  /\bcuanto dolor\b/
];

const APPOINTMENT_PATTERNS = [
  /\bcita\b/,
  /\bcitas\b/,
  /\breservar\b/,
  /\breserva\b/,
  /\bagendar\b/,
  /\bagenda\b/,
  /\bturno\b/,
  /\bturnos\b/,
  /\bdisponibilidad\b/,
  /\bcancelar\b/,
  /\bcancelo\b/,
  /\breprogramar\b/,
  /\breagendar\b/
];

const PRICE_PATTERNS = [
  /\bprecio\b/,
  /\bprecios\b/,
  /\bcosto\b/,
  /\bcostos\b/,
  /\bcuanto cuesta\b/,
  /\bcuanto sale\b/,
  /\bcuanto vale\b/,
  /\bcuanto por\b/,
  /\bcuanto es\b/,
  /\btarifa\b/,
  /\btarifas\b/,
  /\bpresupuesto\b/,
  /\bpromocion\b/,
  /\bpromociones\b/,
  /\bdescuento\b/,
  /\bdescuentos\b/,
  /\bgratis\b/,
  /\bpago\b/,
  /\bpagos\b/,
  /\bforma de pago\b/,
  /\btarjeta\b/,
  /\befectivo\b/,
  /\byape\b/,
  /\bplin\b/,
  /\bseguro\b/,
  /\bseguros\b/,
  /\bconvenio\b/,
  /\bcobertura\b/
];

const CHILDREN_TERMS = ["ninos", "ninas", "menores", "infantil", "mi hijo", "mi hija", "odontopediatria", "odontopediatra", "edad escolar"];

const SOCIAL_TERMS = ["facebook", "instagram", "tiktok", "redes sociales", "redes"];

const HUMAN_PATTERNS = [
  /\bhablar con (alguien|una persona|un humano|un asesor|una asesora)\b/,
  /\bpersona real\b/,
  /\bhumano\b/,
  /\basesor\b/,
  /\basesora\b/,
  /\brecepcionista\b/,
  /\boperador\b/
];

const TREATMENT_LIST_PATTERNS = [/\btratamiento\b/, /\btratamientos\b/, /\bservicio\b/, /\bservicios\b/, /\bque hacen\b/, /\bque ofrecen\b/];

const RESPONSE_WORD_PATTERN = /\b(respuesta|respuestas|dijiste|dices|informacion|actualiza|actualizado|actualizacion|cambio|cambiaste|cambiaron|ahora)\b/;

function matchesAnyPattern(text, patterns) {
  return patterns.some((pattern) => pattern.test(text));
}

function buildTreatmentAnswer(treatment) {
  const specialist = treatment.specialist
    ? "\n\nEspecialista del área: " + treatment.specialist + "."
    : "";

  return response(
    treatment.name +
      "\n\n" +
      treatment.description +
      "\n\nAspectos que se destacan en la web:\n• " +
      treatment.highlights.join("\n• ") +
      specialist +
      "\n\nPara saber si este tratamiento es adecuado para tu caso, se necesita una evaluación profesional.",
    [whatsappAction("Consultar por WhatsApp", "Hola Dental Cabanillas, quiero consultar sobre " + treatment.name + ". Vengo del asistente virtual.")]
  );
}

function buildDoctorAnswer(doctor) {
  const registry = doctor.registry ? "\n" + doctor.registry : "";
  return response(
    doctor.name +
      "\n" +
      doctor.role +
      registry +
      "\n\n" +
      doctor.bio,
    [whatsappAction("Consultar por WhatsApp", "Hola Dental Cabanillas, quiero consultar por la atención con " + doctor.name + ". Vengo del asistente virtual.")]
  );
}

function buildTechnologyAnswer(item) {
  const details = [];
  const description = typeof item.description === "string" ? item.description.trim() : "";
  const features = Array.isArray(item.features)
    ? item.features.filter((feature) => typeof feature === "string" && feature.trim())
    : [];

  if (description) details.push(description);
  if (features.length > 0) {
    details.push("Aspectos destacados:\n• " + features.join("\n• "));
  }

  const text = details.length > 0
    ? item.name + "\n\n" + details.join("\n\n")
    : item.name + "\n\nNo tengo más detalles disponibles sobre este equipo. Puedes consultar directamente con la clínica.";

  return response(
    text,
    [whatsappAction("Consultar por WhatsApp", "Hola Dental Cabanillas, quiero consultar sobre " + item.name + ". Vengo del asistente virtual.")]
  );
}

function findTreatment(text) {
  let best = null;
  let bestLength = 0;

  treatments.forEach((treatment) => {
    treatment.keywords.forEach((keyword) => {
      const normalizedKeyword = normalize(keyword);
      if (normalizedKeyword.length > bestLength && hasTerm(text, normalizedKeyword)) {
        best = treatment;
        bestLength = normalizedKeyword.length;
      }
    });
  });

  return best;
}

function findDoctor(text) {
  let best = null;
  let bestLength = 0;
  let isAmbiguous = false;

  doctors.forEach((doctor) => {
    doctor.aliases.forEach((alias) => {
      const normalizedAlias = normalize(alias);
      if (!hasTerm(text, normalizedAlias)) return;

      if (normalizedAlias.length > bestLength) {
        best = doctor;
        bestLength = normalizedAlias.length;
        isAmbiguous = false;
      } else if (normalizedAlias.length === bestLength && best !== doctor) {
        isAmbiguous = true;
      }
    });
  });

  return isAmbiguous ? null : best;
}

function findTechnology(text) {
  let best = null;
  let bestLength = 0;

  technology.forEach((item) => {
    item.keywords.forEach((keyword) => {
      const normalizedKeyword = normalize(keyword);
      if (normalizedKeyword.length > bestLength && hasTerm(text, normalizedKeyword)) {
        best = item;
        bestLength = normalizedKeyword.length;
      }
    });
  });

  return best;
}

function findFaq(text) {
  let best = null;
  let bestScore = 0;

  faqs.forEach((entry) => {
    let score = 0;
    entry.keywords.forEach((keyword) => {
      if (hasTerm(text, keyword)) {
        score += keyword.includes(" ") ? 3 : 1;
      }
    });

    if (score > bestScore) {
      best = entry;
      bestScore = score;
    }
  });

  return bestScore > 0 ? best : null;
}

/* Rastrea la última FAQ respondida: si el CMS cambia su texto, el asistente
   devuelve la respuesta vigente en lugar de repetir la anterior. */
let lastFaqId = null;

function getFaqResponse(entry) {
  if (!entry) return getFallbackResponse();
  lastFaqId = entry.id;
  return buildFaqResponse(entry);
}

/**
 * Respaldo de respuestas construidas a partir del contenido.
 * Si el CMS deja una colección vacía, las respuestas que dependen de una lista
 * (equipo, tecnología, ambientes) se generan con los datos vigentes en lugar de
 * mostrar una tabla vacía.
 */
function buildHoursAnswer() {
  return response(
    "Atendemos de " +
      String(clinic.hours?.days || "").toLowerCase() +
      ":\n• Mañana: " +
      clinic.hours?.morning +
      "\n• Tarde: " +
      clinic.hours?.afternoon +
      "\n\nSi deseas coordinar una atención, puedes escribirnos por WhatsApp.",
    [whatsappAction("Coordinar por WhatsApp", APPOINTMENT_MESSAGE)]
  );
}

function buildLocationAnswer() {
  return response(
    "Estamos en " +
      clinic.address +
      ". Puedes abrir la ruta en Google Maps o escribirnos por WhatsApp si necesitas orientación.",
    [mapsAction(), whatsappAction("Consultar por WhatsApp", GENERIC_MESSAGE)]
  );
}

function buildContactAnswer() {
  return response(
    "Puedes contactar a " +
      clinic.name +
      " por WhatsApp al " +
      clinic.phoneDisplay +
      ". También contamos con Facebook, Instagram y TikTok.",
    [whatsappAction("Escribir por WhatsApp", GENERIC_MESSAGE), phoneAction()]
  );
}

function buildSocialAnswer() {
  return response(
    "Puedes encontrar a " + clinic.name + " en Facebook, Instagram y TikTok. Desde aquí puedo mostrarte los enlaces.",
    [
      { label: "Facebook", href: clinic.social.facebook, kind: "external" },
      { label: "Instagram", href: clinic.social.instagram, kind: "external" },
      { label: "TikTok", href: clinic.social.tiktok, kind: "external" }
    ]
  );
}

function buildTeamAnswer() {
  const roles = [...new Set(doctors.map((doctor) => doctor.role).filter(Boolean))];
  if (!roles.length) return buildTeamList();
  return response(
    "El equipo de " +
      clinic.name +
      " está formado por profesionales en " +
      roles.join(", ").replace(/, ([^,]*)$/, " y $1") +
      ". Puedo darte más detalle si me preguntas por un área o por el nombre de un profesional.",
    [whatsappAction("Consultar por WhatsApp", GENERIC_MESSAGE)]
  );
}

function buildTechnologyAnswerText() {
  const names = technology.map((item) => item.name).filter(Boolean);
  if (!names.length) {
    return response(
      "Puedo ampliarte la información de la tecnología de la clínica si me preguntas por un equipo en concreto.",
      [whatsappAction("Consultar por WhatsApp", GENERIC_MESSAGE)]
    );
  }
  return response(
    clinic.name +
      " utiliza " +
      names.join(", ").replace(/, ([^,]*)$/, " y $1") +
      ". Puedo ampliarte la información de cualquiera de estos puntos.",
    [whatsappAction("Consultar por WhatsApp", GENERIC_MESSAGE)]
  );
}

function buildFacilitiesAnswer() {
  if (!facilities.length) {
    return response("La información de ambientes se actualizará próximamente.", [
      whatsappAction("Consultar por WhatsApp", GENERIC_MESSAGE)
    ]);
  }
  return response(
    "La clínica cuenta con estos ambientes:\n" + facilities.map((name) => "• " + name).join("\n"),
    [whatsappAction("Consultar por WhatsApp", GENERIC_MESSAGE)]
  );
}

function buildChildrenAnswer() {
  const pediatric = treatments.some((treatment) => normalize(treatment.name).includes("odontopediatria"));
  return response(
    "Sí, " +
      clinic.name +
      " atiende a " +
      (clinic.audience || "niños, jóvenes y adultos") +
      "." +
      (pediatric ? " La clínica también ofrece odontopediatría." : "") +
      " Si quieres coordinar la atención de un menor, puedes escribirnos por WhatsApp.",
    [whatsappAction("Consultar por WhatsApp", GENERIC_MESSAGE)]
  );
}

/**
 * Devuelve la FAQ presente; si se eliminó del CMS, ofrece la respuesta genérica
 * con contacto. Ante fallo de red, content-loader conserva las FAQ locales.
 */
function getFaqOrFallback(id) {
  const entry = findFaqById(faqs, id);
  if (entry) return getFaqResponse(entry);
  return getFallbackResponse();
}

function getLastFaqRefresh() {
  const entry = faqs.find((item) => item.id === lastFaqId);
  if (!entry) return null;
  return buildFaqResponse(entry);
}

function buildFaqResponse(entry) {
  const actions = [];

  if (entry.id === "hours") {
    actions.push(whatsappAction("Coordinar por WhatsApp", APPOINTMENT_MESSAGE));
  } else if (entry.id === "location") {
    actions.push(mapsAction(), whatsappAction("Consultar por WhatsApp", GENERIC_MESSAGE));
  } else if (entry.id === "contact") {
    actions.push(whatsappAction("Escribir por WhatsApp", GENERIC_MESSAGE), phoneAction());
  } else if (entry.id === "social") {
    actions.push(
      { label: "Facebook", href: clinic.social.facebook, kind: "external" },
      { label: "Instagram", href: clinic.social.instagram, kind: "external" },
      { label: "TikTok", href: clinic.social.tiktok, kind: "external" }
    );
  } else if (entry.id === "videos") {
    actions.push(sectionAction("Ver videos", "#multimedia"));
  } else if (entry.id === "treatments" || entry.id === "team" || entry.id === "technology" || entry.id === "facilities" || entry.id === "children") {
    actions.push(whatsappAction("Consultar por WhatsApp", GENERIC_MESSAGE));
  }

  return response(entry.answer, actions);
}

function buildTreatmentsList() {
  if (treatments.length === 0) {
    return response(
      "La información de tratamientos se actualizará próximamente. Puedes escribirnos por WhatsApp para consultar directamente con la clínica.",
      [whatsappAction("Consultar por WhatsApp", GENERIC_MESSAGE)]
    );
  }
  const list = treatments.map((treatment) => "• " + treatment.name).join("\n");
  return response(
    "Estos son los tratamientos que se informan en la web:\n\n" +
      list +
      "\n\nPuedo darte más detalle de cualquiera de ellos. Para una valoración personalizada se necesita una evaluación profesional.",
    [whatsappAction("Consultar por WhatsApp", GENERIC_MESSAGE)]
  );
}

function buildTeamList() {
  if (doctors.length === 0) {
    return response(
      "La presentación del equipo se actualizará próximamente. Puedes escribirnos por WhatsApp para conocer quién atiende en cada área.",
      [whatsappAction("Consultar por WhatsApp", GENERIC_MESSAGE)]
    );
  }
  const list = doctors
    .map((doctor) => "• " + doctor.name + " — " + doctor.role + (doctor.registry ? " (" + doctor.registry + ")" : ""))
    .join("\n");
  return response(
    "Estos son los profesionales que se presentan en la web:\n\n" + list + "\n\nPuedo darte más detalle si me indicas el nombre del profesional.",
    [whatsappAction("Consultar por WhatsApp", GENERIC_MESSAGE)]
  );
}

function getMedicalResponse() {
  return response(
    "No puedo diagnosticar ni recomendarte medicamentos o tratamientos personalizados. Los síntomas y las emergencias necesitan una evaluación profesional.\n\nPor favor, contacta directamente con Dental Cabanillas para coordinar una atención.",
    [whatsappAction("Contactar por WhatsApp", EVALUATION_MESSAGE), phoneAction()]
  );
}

function getAppointmentResponse() {
  return response(
    "Puedo ayudarte a contactar con la clínica, pero no puedo confirmar, reservar ni modificar citas desde este chat.\n\nEscríbenos por WhatsApp y el equipo de Dental Cabanillas podrá orientarte sobre la disponibilidad.",
    [whatsappAction("Solicitar cita por WhatsApp", APPOINTMENT_MESSAGE), phoneAction()]
  );
}

function getPriceResponse() {
  return response(
    "No tengo publicados precios, promociones, formas de pago ni coberturas de seguros. Para conocer el costo de una evaluación o de un tratamiento, consulta directamente con la clínica.\n\nNo puedo inventar ni estimar tarifas.",
    [whatsappAction("Consultar por WhatsApp", GENERIC_MESSAGE), phoneAction()]
  );
}

function formatHourRange(value) {
  return value.replace(/\s*[–—-]\s*/, " a ");
}

function getHumanResponse() {
  return response(
    "Para hablar con una persona del equipo de Dental Cabanillas, puedes escribirnos por WhatsApp o llamar al " +
      clinic.phoneDisplay +
      ".\n\nEl horario de atención es de " +
      clinic.hours.days.toLowerCase() +
      ", de " +
      formatHourRange(clinic.hours.morning) +
      " y de " +
      formatHourRange(clinic.hours.afternoon) +
      ".",
    [whatsappAction("Escribir por WhatsApp", GENERIC_MESSAGE), phoneAction()]
  );
}

function getFallbackResponse() {
  return response(
    "No encontré información sobre eso en la web de la clínica. Puedo ayudarte con horarios, ubicación, tratamientos, equipo, tecnología, ambientes o cómo solicitar una cita.\n\nSi necesitas algo más específico, escríbenos por WhatsApp.",
    [whatsappAction("Escribir por WhatsApp", GENERIC_MESSAGE)]
  );
}

function answerQuestion(rawQuestion) {
  const text = normalize(rawQuestion);

  if (!text) {
    return response("Escribe una pregunta y con gusto te ayudo con la información de Dental Cabanillas.", []);
  }

  // Saludos y cortesías: solo si el mensaje es breve y no contiene otra intención.
  if (/^(hola|holi|buenas|buenos dias|buenas tardes|buenas noches|hey|saludos|hola buenas|hola buenos dias|hola buenas tardes)$/.test(text)) {
    return response(
      "Hola, soy el " + ASSISTANT_NAME + ". Puedo ayudarte con horarios, ubicación, tratamientos, equipo, tecnología, ambientes o cómo solicitar una cita.\n\n¿Qué deseas saber?",
      []
    );
  }

  if (/^(gracias|muchas gracias|gracias por la informacion|te agradezco|muy amable)$/.test(text)) {
    return response("Con gusto. Si necesitas algo más, aquí estoy. También puedes escribirnos por WhatsApp si deseas contactar directamente con la clínica.", [whatsappAction()]);
  }

  if (/^(adios|hasta luego|nos vemos|chao|bye|hasta pronto)$/.test(text)) {
    return response("Gracias por escribirnos. Que tengas un buen día.", []);
  }

  // Prioridad alta: seguridad clínica.
  if (matchesAnyPattern(text, MEDICAL_PATTERNS)) {
    return getMedicalResponse();
  }

  // Prioridad alta: citas.
  if (matchesAnyPattern(text, APPOINTMENT_PATTERNS)) {
    return getAppointmentResponse();
  }

  // Prioridad alta: precios y condiciones no publicadas.
  if (matchesAnyPattern(text, PRICE_PATTERNS)) {
    return getPriceResponse();
  }

  // Redes sociales: se evalúa antes de las FAQ para evitar que "donde" active ubicación.
  if (hasAny(text, SOCIAL_TERMS)) {
    return getFaqOrFallback("social");
  }

  // Niños: se evalúa antes de las FAQ para evitar que "atienden" active horario.
  if (hasAny(text, CHILDREN_TERMS)) {
    return getFaqOrFallback("children");
  }

  // Videos: se evalúa antes de tratamientos para no responder con la lista.
  if (hasAny(text, ["videos", "video", "multimedia", "galeria"])) {
    return getFaqOrFallback("videos");
  }

  // Cambio de contenido: si el CMS actualizó la respuesta de la última FAQ de la
  // conversación, se responde con el texto vigente.
  if (lastFaqId && RESPONSE_WORD_PATTERN.test(text)) {
    const refreshed = getLastFaqRefresh();
    if (refreshed) return refreshed;
  }

  // Tratamientos concretos.
  const treatment = findTreatment(text);
  if (treatment) {
    return buildTreatmentAnswer(treatment);
  }

  // Profesionales concretos.
  const doctor = findDoctor(text);
  if (doctor) {
    return buildDoctorAnswer(doctor);
  }

  // Tecnología concreta.
  const tech = findTechnology(text);
  if (tech) {
    return buildTechnologyAnswer(tech);
  }

  // Lista general de tratamientos.
  if (matchesAnyPattern(text, TREATMENT_LIST_PATTERNS)) {
    return buildTreatmentsList();
  }

  // Lista general del equipo.
  if (hasAny(text, ["equipo", "doctores", "doctor", "dentistas", "dentista", "especialistas", "especialidades", "profesionales", "staff"]) || text.includes("quien atiende")) {
    return buildTeamList();
  }

  // Contacto humano.
  if (matchesAnyPattern(text, HUMAN_PATTERNS)) {
    return getHumanResponse();
  }

  // FAQ generales.
  const faq = findFaq(text);
  if (faq) {
    return getFaqResponse(faq);
  }

  return getFallbackResponse();
}

/* -------------------------------------------------------------------------- */
/* Conversación                                                               */
/* -------------------------------------------------------------------------- */

async function handleQuestion(question, options) {
  const clean = String(question || "").trim();
  if (!clean) return;

  const config = options || {};
  if (config.delayed && isQuickReplyPending) return;

  const questionRow = addMessage(clean, "user");
  if (config.delayed) setQuickReplyPending(true);
  const typingRow = config.delayed ? addTypingIndicator() : null;

  await assistantContentReady;
  const reply = answerQuestion(clean);

  if (!config.delayed) {
    addMessage(reply.text, "bot", { actions: reply.actions });
    return;
  }

  window.setTimeout(() => {
    typingRow.remove();
    addMessage(reply.text, "bot", { actions: reply.actions, scroll: false });
    setQuickReplyPending(false);
    scrollToMessage(questionRow, 0.4);
  }, 650);
}

function addWelcome() {
  addMessage(
    "Hola, soy el " + ASSISTANT_NAME + ". Puedo ayudarte con horarios, ubicación, tratamientos, equipo, tecnología, ambientes o cómo solicitar una cita.\n\nNo realizo diagnósticos ni reemplazo una consulta profesional.",
    "bot"
  );
}

function renderQuickQuestions() {
  quickQuestions.forEach((item) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "dcb-chip";
    button.textContent = item.label;
    button.addEventListener("click", () => handleQuestion(item.query, { delayed: true }));
    quickContainer.appendChild(button);
  });
}

/* -------------------------------------------------------------------------- */
/* Abrir / cerrar                                                             */
/* -------------------------------------------------------------------------- */

function openPanel() {
  if (isOpen) return;

  // Evita que el menú flotante "Contacto" quede detrás del asistente:
  // cierra el menú social original de React si estuviera abierto…
  const contactToggle = document.querySelector('[aria-label="Abrir menú de redes sociales"]');
  if (contactToggle && contactToggle.getAttribute("aria-expanded") === "true") {
    contactToggle.click();
  }
  // …y el menú flotante unificado.
  const unifiedToggle = document.querySelector(MENU_TOGGLE_SELECTOR);
  if (unifiedToggle && unifiedToggle.getAttribute("aria-expanded") === "true") {
    unifiedToggle.click();
  }

  root.classList.add("is-open");
  isOpen = true;
  panel.hidden = false;
  launcher.setAttribute("aria-expanded", "true");
  launcher.setAttribute("aria-label", "Cerrar " + ASSISTANT_NAME);
  launcherLabel.textContent = "Cerrar";

  if (!hasWelcomed) {
    hasWelcomed = true;
    addWelcome();
  }

  window.requestAnimationFrame(() => {
    panel.focus({ preventScroll: true });
  });
}

function closePanel(options) {
  if (!isOpen) return;
  isOpen = false;
  panel.hidden = true;
  root.classList.remove("is-open");
  launcher.setAttribute("aria-expanded", "false");
  launcher.setAttribute("aria-label", "Abrir " + ASSISTANT_NAME);
  launcherLabel.textContent = "Asistente";

  if (!options || options.restoreFocus !== false) {
    launcher.focus({ preventScroll: true });
  }
}

launcher.addEventListener("click", () => {
  if (isOpen) {
    closePanel();
  } else {
    openPanel();
  }
});

closeButton.addEventListener("click", () => closePanel());

log.addEventListener("scroll", updateScrollIndicator, { passive: true });

scrollMoreButton.addEventListener("click", () => {
  log.scrollBy({ top: Math.max(log.clientHeight * 0.75, 120), behavior: "smooth" });
});

window.addEventListener("resize", updateScrollIndicator);

// Si el visitante abre el widget "Contacto", cerramos el asistente para que
// el menú social existente quede completamente visible y utilizable.
document.addEventListener(
  "click",
  (event) => {
    const contactToggle = event.target instanceof Element
      ? event.target.closest('[aria-label="Abrir menú de redes sociales"]')
      : null;

    if (contactToggle && isOpen) {
      closePanel({ restoreFocus: false });
    }
  },
  true
);

panel.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    event.preventDefault();
    closePanel();
  }
});

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const question = input.value.trim();
  if (!question) {
    input.focus();
    return;
  }
  input.value = "";
  handleQuestion(question);
  input.focus();
});

// Mantiene la conversación enfocada y evita zoom automático en iOS.
input.addEventListener("focus", () => {
  if (window.innerWidth < 640) {
    window.setTimeout(scrollToBottom, 250);
  }
});

renderQuickQuestions();
