import { useEffect, useRef, useState } from "react";
import { SectionHeading } from "./AboutSection.jsx";

export default function EnvironmentsSection({ items }) {
  const [selected, setSelected] = useState(null);
  const visibleItems = items.filter((item) => item.category === "ambientes");

  return (
    <section className="section environments-section dotted-surface" id="ambientes">
      <div className="page-container">
        <SectionHeading
          eyebrow="Ambientes"
          title="Espacios diseñados para generar confianza."
          description="Conoce ambientes reales de Dental Cabanillas: áreas de tratamiento, sala de espera, ingreso y espacios pensados para la comodidad del paciente."
        />
        {visibleItems.length ? (
          <div className="environment-grid">
            {visibleItems.map((item, index) => (
              <button
                className={`environment-card environment-card-${index % 5}`}
                type="button"
                key={`${item.category}-${item.title}`}
                onClick={() => setSelected(item)}
                aria-label={`Ampliar imagen: ${item.title}`}
              >
                <img src={item.image} alt={item.imageAlt || item.title} loading="lazy" />
                <span className="environment-caption">
                  <span>{item.title}</span>
                  <span aria-hidden="true">↗</span>
                </span>
              </button>
            ))}
          </div>
        ) : (
          <p className="empty-state">No hay imágenes publicadas en esta categoría.</p>
        )}
        <a className="button button-secondary environments-video-link" href="#multimedia">
          Ver videos de ambientes <span aria-hidden="true">▶</span>
        </a>
      </div>
      {selected && <ImageDialog item={selected} onClose={() => setSelected(null)} />}
    </section>
  );
}

function ImageDialog({ item, onClose }) {
  const dialogRef = useRef(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return undefined;
    if (!dialog.open) dialog.showModal();
    return () => {
      if (dialog.open) dialog.close();
    };
  }, []);

  return (
    <dialog
      className="image-dialog"
      ref={dialogRef}
      aria-label={item.title}
      onClose={onClose}
      onClick={(event) => {
        if (event.target === dialogRef.current) dialogRef.current.close();
      }}
    >
      <button className="dialog-close" type="button" aria-label="Cerrar imagen" onClick={() => dialogRef.current.close()}>
        ×
      </button>
      <img src={item.image} alt={item.imageAlt || item.title} />
      <p>{item.title}</p>
    </dialog>
  );
}
