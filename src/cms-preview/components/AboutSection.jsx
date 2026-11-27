import { useEffect, useState } from "react";

export default function AboutSection({ clinic }) {
  const [activePhoto, setActivePhoto] = useState(0);
  const [activeBenefit, setActiveBenefit] = useState(0);
  const photos = [
    [clinic.images.teamGroupClinic, "Equipo profesional Dental Cabanillas en clínica"],
    [clinic.images.teamGroupEvent, "Equipo Dental Cabanillas en evento institucional"],
    [clinic.images.teamGroupFront, "Equipo Dental Cabanillas en el ingreso de la clínica"]
  ].filter(([src]) => src);
  const benefits = clinic.content.benefits;

  useEffect(() => {
    if (activePhoto >= photos.length) setActivePhoto(0);
    if (activeBenefit >= benefits.length) setActiveBenefit(0);
  }, [activePhoto, activeBenefit, benefits.length, photos.length]);

  useEffect(() => {
    const timer = window.setInterval(
      () => setActivePhoto((current) => photos.length ? (current + 1) % photos.length : 0),
      6000
    );
    return () => window.clearInterval(timer);
  }, []);

  return (
    <>
      <section className="section about-section dotted-surface" id="about">
        <div className="page-container">
          <div className="about-layout">
            <div className="about-copy">
              <span className="section-kicker">Sobre nosotros</span>
              <h2>{clinic.content.aboutTitle}</h2>
              <p>{clinic.content.aboutText}</p>
              <div className="about-stats">
                {clinic.content.aboutStats.map((stat) => (
                  <article key={`${stat.value}-${stat.label}`}><strong>{stat.value}</strong><span>{stat.label}</span></article>
                ))}
              </div>
            </div>
            <div className="about-photo-wrap">
              <div className="about-photo-stack" aria-live="polite">
                {photos.map(([src, alt], index) => (
                  <img
                    className={index === activePhoto ? "is-active" : ""}
                    key={src}
                    src={src}
                    alt={alt}
                    loading="lazy"
                  />
                ))}
                <div className="about-photo-caption">
                  <span className="section-kicker">Equipo Cabanillas</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="section benefits-section dotted-surface">
        <div className="page-container">
          <SectionHeading
            eyebrow="Por qué elegirnos"
            title={clinic.content.benefitsTitle}
            description={clinic.content.benefitsIntro}
          />
          {benefits.length > 0 ? (
          <div className="benefits-layout">
            <article className="benefit-feature">
              <img src={benefits[activeBenefit]?.image} alt="" loading="lazy" />
              <div className="benefit-feature-copy">
                <span className="section-kicker">Experiencia Cabanillas</span>
                <h3>{benefits[activeBenefit]?.title}</h3>
                <p>{benefits[activeBenefit]?.description}</p>
              </div>
            </article>
            <div className="benefit-options" role="tablist" aria-label="Beneficios de Dental Cabanillas">
              {benefits.map((benefit, index) => (
                <button
                  type="button"
                  role="tab"
                  aria-selected={index === activeBenefit}
                  className={`benefit-option${index === activeBenefit ? " is-selected" : ""}`}
                  key={benefit.title}
                  onClick={() => setActiveBenefit(index)}
                >
                  <span className="benefit-option-media" aria-hidden="true">
                    <img src={benefit.image} alt="" loading="lazy" />
                    <span className="benefit-option-icon" aria-hidden="true">✦</span>
                    <span className="benefit-option-index">0{index + 1}</span>
                  </span>
                  <span className="benefit-option-copy">
                    <strong>{benefit.title}</strong>
                    <small>{benefit.description}</small>
                  </span>
                  <span className="benefit-option-arrow" aria-hidden="true">↗</span>
                </button>
              ))}
              <a className="button button-secondary" href="#multimedia">
                Ver videos de experiencias <span aria-hidden="true">▶</span>
              </a>
            </div>
          </div>
          ) : <p className="empty-state">No hay beneficios publicados actualmente.</p>}
        </div>
      </section>
    </>
  );
}

export function SectionHeading({ eyebrow, title, description, light = false }) {
  return (
    <div className={`section-heading${light ? " section-heading-light" : ""}`}>
      {eyebrow && <span className="section-kicker">{eyebrow}</span>}
      <h2>{title}</h2>
      {description && <p>{description}</p>}
    </div>
  );
}
