import { getWhatsAppUrl } from "../services/links.js";
import { SectionHeading } from "./AboutSection.jsx";

export default function ContactSection({ clinic }) {
  const whatsappUrl = getWhatsAppUrl(clinic, "Hola Dental Cabanillas, quiero solicitar una cita.");

  return (
    <section className="section contact-section dotted-surface" id="contacto">
      <div className="page-container">
        <SectionHeading
          eyebrow="Cómo llegar"
          title="Encuéntranos fácilmente"
          description={clinic.content.contactIntro}
        />
        <div className="contact-layout">
          <div className="contact-details">
            <article className="contact-detail-card">
              <span className="detail-icon" aria-hidden="true">⌖</span>
              <div>
                <span className="contact-label">Dirección</span>
                <p>{clinic.address}</p>
              </div>
            </article>
            <article className="contact-detail-card">
              <span className="detail-icon" aria-hidden="true">◷</span>
              <div>
                <span className="contact-label">Horario</span>
                <p>{clinic.hours.days}</p>
                <p>{clinic.hours.morning} / {clinic.hours.afternoon}</p>
              </div>
            </article>
            <article className="contact-detail-card">
              <span className="detail-icon" aria-hidden="true">⌕</span>
              <div>
                <span className="contact-label">WhatsApp</span>
                <a href={`tel:${clinic.phoneRaw}`}>{clinic.phoneDisplay}</a>
              </div>
            </article>
            <div className="contact-actions">
              <a className="button button-primary contact-cta" href={whatsappUrl} target="_blank" rel="noopener noreferrer">
                Contactar por WhatsApp <span aria-hidden="true">→</span>
              </a>
              <a className="button button-secondary" href={clinic.mapsUrl} target="_blank" rel="noopener noreferrer">
                Abrir ruta en Google Maps <span aria-hidden="true">↗</span>
              </a>
            </div>
            <div className="contact-socials" aria-label="Redes sociales">
              {Object.entries(clinic.social).map(([name, href]) => (
                <a key={name} href={href} target="_blank" rel="noopener noreferrer">{name}</a>
              ))}
            </div>
          </div>
          <div className="map-card">
            <iframe
              title={`Ubicación Dental Cabanillas en ${clinic.city}`}
              src={`https://www.google.com/maps?q=${encodeURIComponent(clinic.address)}&output=embed`}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
            <span className="map-caption">
              <span className="map-pin" aria-hidden="true">⌖</span>
              <span><strong>Dental Cabanillas</strong><small>{clinic.city}, {clinic.country}</small></span>
              <a className="map-open" href={clinic.mapsUrl} target="_blank" rel="noopener noreferrer" aria-label="Abrir ubicación en Google Maps">↗</a>
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
