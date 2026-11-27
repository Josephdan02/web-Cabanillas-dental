import { useState } from "react";
import { getWhatsAppUrl } from "../services/links.js";
import { WhatsAppIcon } from "./SiteHeader.jsx";
import { SectionHeading } from "./AboutSection.jsx";

export default function TeamSection({ clinic, professionals }) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [mobileIndex, setMobileIndex] = useState(0);
  const selected = professionals[selectedIndex] || professionals[0];

  return (
    <section className="section team-section dark-section" id="equipo">
      <div className="page-container">
        <SectionHeading
          light
          eyebrow="Profesionales de Dental Cabanillas"
          title="Profesionales dedicados a tu sonrisa y bienestar"
          description="Un equipo preparado para acompañarte con trato cercano, criterio clínico y una experiencia dental más humana."
        />
        {selected ? (
          <>
            <div className="team-layout">
            <article className="team-feature">
              <div className="team-feature-image">
                {selected.image && <img src={selected.image} alt={selected.name} loading="lazy" />}
              </div>
              <div className="team-feature-copy">
                <span className="team-label">Equipo profesional</span>
                <h3>{selected.name}</h3>
                <p className="team-role">{selected.role}</p>
                {selected.registry && <p className="team-registry">{selected.registry}</p>}
                {selected.bio && <p className="team-bio">{selected.bio}</p>}
                <blockquote className="team-quote">
                  “Cada tratamiento debe sentirse claro, seguro y pensado para tu sonrisa.”
                </blockquote>
                <div className="team-actions">
                  <a className="button button-primary" href={getWhatsAppUrl(clinic)} target="_blank" rel="noopener noreferrer">
                    <WhatsAppIcon /> Agendar consulta
                  </a>
                  <a href={clinic.social.facebook} target="_blank" rel="noopener noreferrer">Facebook</a>
                  <a href={clinic.social.instagram} target="_blank" rel="noopener noreferrer">Instagram</a>
                </div>
              </div>
            </article>
            <div className="team-roster" role="tablist" aria-label="Profesionales">
              {professionals.map((person, index) => (
                <button
                  type="button"
                  role="tab"
                  aria-selected={index === selectedIndex}
                  className={`team-person${index === selectedIndex ? " is-selected" : ""}`}
                  key={`${person.name}-${index}`}
                  onClick={() => setSelectedIndex(index)}
                >
                  {person.image && <img src={person.image} alt="" loading="lazy" />}
                  <span>
                    <strong>{person.name}</strong>
                    <small>{person.role}</small>
                  </span>
                  <span className="team-person-arrow" aria-hidden="true">↗</span>
                </button>
              ))}
            </div>
            </div>
            <div className="team-mobile-list">
              {professionals.map((person, index) => {
                const isOpen = index === mobileIndex;

                return (
                  <article className="team-mobile-card" key={`mobile-${person.name}-${index}`}>
                    <button
                      className="team-mobile-toggle"
                      type="button"
                      aria-expanded={isOpen}
                      onClick={() => {
                        setMobileIndex((current) => current === index ? -1 : index);
                        setSelectedIndex(index);
                      }}
                    >
                      {person.image && (
                        <span className="team-mobile-avatar">
                          <img src={person.image} alt="" loading="lazy" />
                        </span>
                      )}
                      <span className="team-mobile-person">
                        <strong>{person.name}</strong>
                        <small>{person.role}</small>
                        {person.registry && <small>{person.registry}</small>}
                      </span>
                      <span className="team-mobile-toggle-icon" aria-hidden="true">{isOpen ? "−" : "+"}</span>
                    </button>
                    {isOpen && (
                      <div className="team-mobile-details">
                        {person.image && (
                          <div className="team-mobile-portrait">
                            <img src={person.image} alt={person.name} loading="lazy" />
                            {index === 0 && (
                              <div className="team-mobile-proof">
                                <p>+ pacientes atendidos con confianza</p>
                                <p>Atención personalizada · Experiencia clínica</p>
                              </div>
                            )}
                          </div>
                        )}
                        <div className="team-mobile-copy">
                          <span className="team-label">Equipo profesional</span>
                          <h3>{person.name}</h3>
                          <p className="team-role">{person.role}</p>
                          {person.registry && <p className="team-registry">{person.registry}</p>}
                          {person.bio && <p className="team-bio">{person.bio}</p>}
                          {index === 0 && (
                            <blockquote className="team-quote">
                              “Cada tratamiento debe sentirse claro, seguro y pensado para tu sonrisa.”
                            </blockquote>
                          )}
                          <div className="team-actions">
                            <a className="button button-primary" href={getWhatsAppUrl(clinic)} target="_blank" rel="noopener noreferrer">
                              <WhatsAppIcon /> Agendar consulta
                            </a>
                            <a href={clinic.social.facebook} target="_blank" rel="noopener noreferrer">Facebook</a>
                            <a href={clinic.social.instagram} target="_blank" rel="noopener noreferrer">Instagram</a>
                          </div>
                        </div>
                      </div>
                    )}
                  </article>
                );
              })}
            </div>
          </>
        ) : (
          <p className="empty-state empty-state-light">La información del equipo estará disponible próximamente.</p>
        )}
      </div>
    </section>
  );
}
