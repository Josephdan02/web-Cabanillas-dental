import { useEffect, useMemo, useRef, useState } from "react";
import { SectionHeading } from "./AboutSection.jsx";

const videos = [
  {
    title: "Tratamientos dentales personalizados",
    description: "Atención odontológica orientada a recuperar salud, estética y seguridad en cada sonrisa.",
    category: "Tratamientos",
    file: "tratamientos-1",
    duration: "0:14"
  },
  {
    title: "Resultados y cuidado dental",
    description: "Contenido relacionado con procedimientos clínicos y el cuidado profesional de nuestros pacientes.",
    category: "Tratamientos",
    file: "tratamientos-2",
    duration: "0:29"
  },
  {
    title: "Tecnología dental en acción",
    description: "Equipos modernos que apoyan diagnósticos más precisos y tratamientos más cómodos para el paciente.",
    category: "Tecnología",
    file: "tecnologia-1",
    duration: "0:29"
  },
  {
    title: "Equipos modernos de atención",
    description: "Muestra de las herramientas tecnológicas utilizadas para mejorar cada etapa del tratamiento.",
    category: "Tecnología",
    file: "tecnologia-2",
    duration: "0:20"
  },
  {
    title: "Innovación para tu sonrisa",
    description: "Tecnología aplicada a la atención odontológica para brindar mayor seguridad, precisión y confianza.",
    category: "Tecnología",
    file: "tecnologia-3",
    duration: "0:39"
  },
  {
    title: "Ambientes cómodos y modernos",
    description: "Un vistazo a nuestras áreas clínicas preparadas para una atención segura y confortable.",
    category: "Ambientes",
    file: "ambientes-1",
    duration: "0:28"
  },
  {
    title: "Recorrido por nuestros ambientes",
    description: "Conoce los espacios de atención diseñados para comodidad, confianza y una experiencia dental más cercana.",
    category: "Ambientes",
    file: "ambientes-2",
    duration: "0:20"
  },
  {
    title: "Momentos Dental Cabanillas",
    description: "Registro audiovisual de actividades y experiencias compartidas con nuestros pacientes.",
    category: "Eventos",
    file: "eventos-1",
    duration: "0:51"
  },
  {
    title: "Experiencias en la clínica",
    description: "Contenido institucional que muestra la atención cercana y el ambiente familiar de Dental Cabanillas.",
    category: "Eventos",
    file: "eventos-2",
    duration: "0:29"
  },
  {
    title: "Actividades y experiencias",
    description: "Momentos destacados que reflejan el compromiso y la calidez de nuestro equipo odontológico.",
    category: "Eventos",
    file: "eventos-3",
    duration: "1:09"
  }
];

const filters = ["Todos", "Tratamientos", "Ambientes", "Tecnología", "Eventos"];

export default function VideoGallerySection({ clinic }) {
  const [activeFilter, setActiveFilter] = useState("Todos");
  const [selectedVideo, setSelectedVideo] = useState(null);
  const filteredVideos = useMemo(
    () => activeFilter === "Todos" ? videos : videos.filter((video) => video.category === activeFilter),
    [activeFilter]
  );

  return (
    <section className="section video-section dark-section" id="multimedia">
      <div className="page-container">
        <SectionHeading
          light
          eyebrow="Contenido audiovisual"
          title="Videos reales de nuestra experiencia clínica."
          description="Explora videos reales de tratamientos, tecnología, ambientes y momentos de Dental Cabanillas."
        />
        <div className="filter-row" role="group" aria-label="Filtrar videos por categoría">
          {filters.map((filter) => (
            <button
              type="button"
              key={filter}
              className={`filter-chip${activeFilter === filter ? " is-active" : ""}`}
              aria-pressed={activeFilter === filter}
              onClick={() => setActiveFilter(filter)}
            >
              {filter}
            </button>
          ))}
        </div>
        <div className="video-grid">
          {filteredVideos.map((video) => (
            <article className="video-card" key={video.file}>
              <button
                type="button"
                className="video-poster"
                onClick={() => setSelectedVideo(video)}
                aria-label={`Reproducir ${video.title}`}
              >
                <img
                  src={`/video-posters/${video.file}.jpg`}
                  alt={video.title}
                  loading="lazy"
                />
                <span className="video-play" aria-hidden="true">▶</span>
                <span className="video-duration">{video.duration}</span>
              </button>
              <div className="video-card-copy">
                <h3>{video.title}</h3>
                <p>{video.description}</p>
                <span className="video-category">{video.category}</span>
              </div>
            </article>
          ))}
        </div>
        {clinic && (
          <div className="video-social-cta">
            <p>¿Quieres ver más contenido? También puedes seguirnos en redes sociales.</p>
            <div className="video-social-links" aria-label="Redes sociales">
              {[
                ["Instagram", clinic.social.instagram],
                ["TikTok", clinic.social.tiktok],
                ["Facebook", clinic.social.facebook]
              ].filter(([, href]) => href).map(([name, href]) => (
                <a key={name} href={href} target="_blank" rel="noopener noreferrer">{name}</a>
              ))}
            </div>
          </div>
        )}
      </div>
      {selectedVideo && (
        <VideoDialog video={selectedVideo} onClose={() => setSelectedVideo(null)} />
      )}
    </section>
  );
}

function VideoDialog({ video, onClose }) {
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
      className="video-dialog"
      ref={dialogRef}
      aria-label={video.title}
      onClose={onClose}
      onClick={(event) => {
        if (event.target === dialogRef.current) dialogRef.current.close();
      }}
    >
      <button className="dialog-close" type="button" aria-label="Cerrar video" onClick={() => dialogRef.current.close()}>
        ×
      </button>
      <video controls autoPlay playsInline poster={`/video-posters/${video.file}.jpg`}>
        <source src={`/videos/${video.file}.mp4`} type="video/mp4" />
        Tu navegador no admite la reproducción de video.
      </video>
      <div className="video-dialog-copy">
        <h2>{video.title}</h2>
        <p>{video.description}</p>
      </div>
    </dialog>
  );
}
