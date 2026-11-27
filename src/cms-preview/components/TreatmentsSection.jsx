import { useState } from "react";
import { getWhatsAppUrl } from "../services/links.js";
import { SectionHeading } from "./AboutSection.jsx";

const treatmentIcons = ["✦", "◇", "✧", "○", "◆", "✺", "◌", "▣", "✚", "⌁"];

export default function TreatmentsSection({ clinic, treatments }) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const selected = treatments[selectedIndex] || treatments[0];

  if (!treatments.length) {
    return (
      <section className="section treatments-section dotted-surface" id="tratamientos">
        <div className="page-container">
          <SectionHeading eyebrow="Atención odontológica" title="Nuestros tratamientos" />
          <p className="empty-state">La información de tratamientos estará disponible próximamente.</p>
        </div>
      </section>
    );
  }

  return (
    <section className="section treatments-section dotted-surface" id="tratamientos">
      <div className="page-container">
        <SectionHeading
          eyebrow="Atención odontológica"
          title="Tratamientos para cuidar tu sonrisa"
          description="Conoce las alternativas de atención disponibles en Dental Cabanillas."
        />
        <div className="treatment-layout">
          <div className="treatment-list" role="tablist" aria-label="Tratamientos">
            {treatments.map((treatment, index) => (
              <button
                type="button"
                role="tab"
                aria-selected={index === selectedIndex}
                aria-controls="selected-treatment"
                className={`treatment-tab${index === selectedIndex ? " is-selected" : ""}`}
                key={`${treatment.name}-${index}`}
                onClick={() => setSelectedIndex(index)}
              >
                <span className="treatment-icon" aria-hidden="true">{treatmentIcons[index % treatmentIcons.length]}</span>
                <span>{treatment.name}</span>
                <span aria-hidden="true">{index === selectedIndex ? "−" : "+"}</span>
              </button>
            ))}
            <a className="button button-secondary treatment-video-link" href="#multimedia">
              Ver videos de tratamientos <span aria-hidden="true">▶</span>
            </a>
          </div>
          <article className="treatment-feature" id="selected-treatment" role="tabpanel">
            <div className="treatment-image-wrap">
              {selected.image ? (
                <img src={selected.image} alt={selected.name} loading="lazy" />
              ) : (
                <img src="/assets/logo-tooth-crop-HmZWkA58.webp" alt="" loading="lazy" />
              )}
              <span className="treatment-image-label">Dental Cabanillas</span>
            </div>
            <div className="treatment-feature-copy">
              <span className="section-kicker">Tratamiento dental</span>
              <h3>{selected.name}</h3>
              <p>{selected.description?.trim() || "Consulta en la clínica para conocer más sobre este tratamiento."}</p>
              {selected.highlights?.length > 0 && (
                <ul className="highlight-list">
                  {selected.highlights.map((highlight) => <li key={highlight}>{highlight}</li>)}
                </ul>
              )}
              {selected.specialist && <p className="specialist-note">Atención: {selected.specialist}</p>}
              <a className="button button-primary" href={getWhatsAppUrl(clinic, `Hola Dental Cabanillas, quisiera consultar sobre ${selected.name}.`)} target="_blank" rel="noopener noreferrer">
                Consultar por WhatsApp <span aria-hidden="true">→</span>
              </a>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}
