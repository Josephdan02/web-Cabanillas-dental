import { useState } from "react";
import { SectionHeading } from "./AboutSection.jsx";

export default function TechnologySection({ items }) {
  return (
    <section className="section technology-section dark-section" id="tecnologia">
      <div className="page-container">
        <SectionHeading
          light
          eyebrow="Tecnología dental"
          title="Tecnología avanzada para diagnósticos más precisos y tratamientos más seguros."
          description="En Dental Cabanillas incorporamos herramientas digitales, inteligencia artificial y sistemas modernos de bioseguridad para ofrecer una atención más eficiente, cómoda y confiable."
        />
        <a className="button button-secondary technology-video-link" href="#multimedia">
          Ver videos de tecnología <span aria-hidden="true">▶</span>
        </a>
        <div className="technology-list">
          {items.map((item, index) => (
            <TechnologyCard item={item} index={index} key={`${item.title}-${index}`} />
          ))}
          {!items.length && (
            <p className="empty-state empty-state-light">La información de tecnología estará disponible próximamente.</p>
          )}
        </div>
      </div>
    </section>
  );
}

function TechnologyCard({ item, index }) {
  const [showSecondary, setShowSecondary] = useState(false);
  const image = showSecondary && item.secondaryImage ? item.secondaryImage : item.image;

  return (
    <article className={`technology-card${index % 2 ? " technology-card-reverse" : ""}`} key={`${item.title}-${index}`}>
      <div className="technology-visual">
        <img
          className="technology-main-image"
          src={image}
          alt={showSecondary ? `Vista secundaria de ${item.title}` : item.imageAlt || item.title}
          loading="lazy"
        />
        {item.secondaryImage && (
          <button
            type="button"
            className="technology-detail-button"
            aria-label={`Ver otra imagen de ${item.title}`}
            onClick={() => setShowSecondary((current) => !current)}
          >
            <img className="technology-detail-image" src={showSecondary ? item.image : item.secondaryImage} alt="" />
            <span>Cambiar foto</span>
          </button>
        )}
        {item.number && <span className="technology-number">{item.number}</span>}
      </div>
      <div className="technology-copy">
        {item.label && <span className="technology-label">{item.label}</span>}
        <span className="technology-index">Tecnología {item.number || `0${index + 1}`}</span>
        <h3>{item.title}</h3>
        {item.subtitle && <p className="technology-subtitle">{item.subtitle}</p>}
        {item.description && <p className="technology-description">{item.description}</p>}
        {item.benefits?.length > 0 && (
          <ul className="technology-benefits">
            {item.benefits.map((benefit) => (
              <li key={benefit}><span aria-hidden="true">✓</span>{benefit}</li>
            ))}
          </ul>
        )}
      </div>
    </article>
  );
}
