import { getWhatsAppUrl } from "../services/links.js";

const highlights = [
  ["technology", "Tecnología avanzada"],
  ["personalized", "Atención personalizada"],
  ["security", "Seguridad y confianza"]
];

export default function HeroSection({ clinic }) {
  return (
    <section className="hero-section dotted-surface" id="inicio">
      <div className="hero-inner page-container">
        <div className="hero-copy">
          <img
            className="hero-wordmark"
            src="/assets/logo-text-crop-Bpts9NDU.webp"
            alt="Dental Cabanillas. Consigue tu sonrisa perfecta."
            fetchPriority="high"
          />
          <h1>
            <span>Clínica dental en {clinic.city}.</span> Atención integral en todas las
            especialidades odontológicas, respaldada por tecnología moderna,
            tratamientos personalizados y ambientes diseñados para brindarte
            comodidad, confianza y una experiencia única.
          </h1>
          <div className="hero-actions">
            <a className="button button-primary" href={getWhatsAppUrl(clinic)} target="_blank" rel="noopener noreferrer">
              <CalendarIcon />
              <span>Reservar cita</span>
              <span aria-hidden="true">→</span>
            </a>
            <a className="button button-secondary" href="#tratamientos">
              <span aria-hidden="true">♧</span>
              <span>Ver tratamientos</span>
              <span aria-hidden="true">›</span>
            </a>
          </div>
          <ul className="hero-highlights" aria-label="Características de la clínica">
            {highlights.map(([icon, label]) => (
              <li key={label}>
                <HighlightIcon name={icon} />
                <span>{label}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="hero-art" aria-hidden="true">
        <img src="/assets/logo-tooth-crop-HmZWkA58.webp" alt="" />
      </div>
      <a className="hero-scroll" href="#about" aria-label="Desplazarse a Nosotros">
        <span />
      </a>
    </section>
  );
}

function HighlightIcon({ name }) {
  const paths = {
    technology: <path d="m5 12.5 4.5 4.5L19 7" />,
    personalized: (
      <>
        <circle cx="9" cy="8" r="3" />
        <path d="M3.5 19v-1a5.5 5.5 0 0 1 11 0v1zM16 5.3a3 3 0 0 1 0 5.8M17 14a5 5 0 0 1 3.5 4.8v.2" />
      </>
    ),
    security: (
      <>
        <path d="M12 3 20 6v5c0 5-3.4 8.4-8 10-4.6-1.6-8-5-8-10V6z" />
        <path d="m8.5 12 2.3 2.3 4.8-4.8" />
      </>
    )
  };

  return (
    <svg className="hero-highlight-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      {paths[name]}
    </svg>
  );
}

function CalendarIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <rect x="3.5" y="5" width="17" height="15" rx="2" stroke="currentColor" strokeWidth="1.7" />
      <path d="M7.5 3.5v3M16.5 3.5v3M3.5 9h17" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
    </svg>
  );
}
