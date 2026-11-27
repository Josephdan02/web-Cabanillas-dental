import { useEffect, useState } from "react";

const photos = [
  ["/assets/team_group_clinic-D8A5Mlj6.webp", "Equipo profesional Dental Cabanillas en clínica"],
  ["/assets/team_group_event-Dd9tQSn9.webp", "Equipo Dental Cabanillas en evento institucional"],
  ["/assets/team_group_front-a_8AnI1G.webp", "Equipo Dental Cabanillas en el ingreso de la clínica"]
];

const benefits = [
  {
    image: "/assets/benefit_personalizada-CU50y-C1.webp",
    title: "Atención personalizada",
    description: "Cada paciente recibe una evaluación clara y un plan de tratamiento adaptado a sus necesidades.",
    icon: "✦"
  },
  {
    image: "/assets/benefit_tecnologia-B6zLFaQy.webp",
    title: "Tecnología moderna",
    description: "Trabajamos con apoyo digital para diagnósticos más precisos y experiencias más cómodas.",
    icon: "✓"
  },
  {
    image: "/assets/benefit_ambientes-7Oqi4O_B.webp",
    title: "Ambientes cómodos",
    description: "Espacios diseñados para transmitir tranquilidad, limpieza y confianza desde cada visita.",
    icon: "⌂"
  },
  {
    image: "/assets/benefit_familia-Bb91nBaJ.webp",
    title: "Para toda la familia",
    description: "Atención odontológica para niños, jóvenes y adultos en un solo lugar.",
    icon: "♡"
  }
];

export default function AboutSection({ clinic }) {
  const [activePhoto, setActivePhoto] = useState(0);
  const [activeBenefit, setActiveBenefit] = useState(0);

  useEffect(() => {
    const timer = window.setInterval(
      () => setActivePhoto((current) => (current + 1) % photos.length),
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
              <h2>Odontología moderna y profesional para toda la familia.</h2>
              <p>
                En Dental Cabanillas cuidamos cada detalle para brindar una
                experiencia dental excepcional. Combinamos calidad profesional,
                tecnología moderna y una atención humana para que cada paciente
                se sienta seguro desde la primera evaluación.
              </p>
              <div className="about-stats">
                <article><strong>10+</strong><span>Tratamientos dentales</span></article>
                <article><strong>100%</strong><span>Atención personalizada</span></article>
                <article><strong>{clinic.city}</strong><span>Ubicación céntrica</span></article>
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
            title="Una experiencia dental cómoda y confiable."
            description="Mantenemos la atención personalizada, la tecnología moderna, los ambientes cómodos y el trato familiar como pilares de nuestra clínica."
          />
          <div className="benefits-layout">
            <article className="benefit-feature">
              <img src={benefits[activeBenefit].image} alt="" loading="lazy" />
              <div className="benefit-feature-copy">
                <span className="section-kicker">Experiencia Cabanillas</span>
                <h3>{benefits[activeBenefit].title}</h3>
                <p>{benefits[activeBenefit].description}</p>
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
                    <span className="benefit-option-icon">{benefit.icon}</span>
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
