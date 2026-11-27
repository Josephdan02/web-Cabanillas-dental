import { useEffect, useRef, useState } from "react";
import { getWhatsAppUrl } from "../services/links.js";
import { WhatsAppIcon } from "./SiteHeader.jsx";

const networks = [
  ["facebook", "Facebook"],
  ["instagram", "Instagram"],
  ["tiktok", "TikTok"]
];

export default function FloatingContact({ clinic }) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef(null);
  const links = [
    ["whatsapp", "WhatsApp", getWhatsAppUrl(clinic, "Hola Dental Cabanillas, tengo una consulta.")],
    ...networks.map(([name, label]) => [name, label, clinic.social[name]])
  ];

  useEffect(() => {
    function handlePointerDown(event) {
      if (!rootRef.current?.contains(event.target)) setOpen(false);
    }

    function handleKeyDown(event) {
      if (event.key === "Escape") setOpen(false);
    }

    document.addEventListener("pointerdown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <div className={`floating-contact${open ? " is-open" : ""}`} ref={rootRef}>
      <section
        className="contact-popover"
        id="dcb-ui-menu"
        aria-labelledby="contact-menu-title"
        aria-hidden={!open}
        hidden={!open}
      >
        <h2 id="contact-menu-title">Contacto</h2>
        <p>Elige cómo quieres comunicarte con nosotros.</p>
        <div className="contact-links">
          {links.map(([name, label, href]) => (
            <a
              key={name}
              className={`contact-link contact-link--${name}`}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Abrir ${label} de Dental Cabanillas`}
              onClick={() => setOpen(false)}
            >
              <span className="contact-link-icon" aria-hidden="true">
                {name === "whatsapp" ? <WhatsAppIcon /> : label.slice(0, 1)}
              </span>
              <span>{label}</span>
            </a>
          ))}
        </div>
      </section>
      <button
        className="contact-toggle"
        id="dcb-ui-toggle"
        type="button"
        aria-label={open ? "Cerrar menú de contacto" : "Abrir menú de redes sociales"}
        aria-controls="dcb-ui-menu"
        aria-expanded={open}
        onClick={() => setOpen((value) => !value)}
      >
        <span className="contact-toggle-icon" aria-hidden="true">
          {open ? "×" : "↗"}
        </span>
        <span className="contact-toggle-label">Contacto</span>
      </button>
    </div>
  );
}
