import { useEffect, useMemo, useRef, useState } from "react";
import { SectionHeading } from "./AboutSection.jsx";

const FILTERS = [
  ["Todos", ""],
  ["Tratamientos", "tratamientos"],
  ["Ambientes", "ambientes"],
  ["Tecnología", "tecnologia"],
  ["Eventos", "eventos"]
];

export default function VideoGallerySection({ clinic, videos = [] }) {
  const [activeFilter, setActiveFilter] = useState("");
  const [selectedVideo, setSelectedVideo] = useState(null);
  const filteredVideos = useMemo(
    () => activeFilter ? videos.filter((video) => video.category === activeFilter) : videos,
    [activeFilter, videos]
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
          {FILTERS.map(([label, category]) => (
            <button
              type="button"
              key={label}
              className={`filter-chip${activeFilter === category ? " is-active" : ""}`}
              aria-pressed={activeFilter === category}
              onClick={() => setActiveFilter(category)}
            >
              {label}
            </button>
          ))}
        </div>
        {filteredVideos.length ? (
          <div className="video-grid">
            {filteredVideos.map((video) => (
              <article className="video-card" key={video.id}>
                <button
                  type="button"
                  className="video-poster"
                  onClick={() => setSelectedVideo(video)}
                  aria-label={`Reproducir ${video.title}`}
                >
                  {video.thumbnail && <img src={video.thumbnail} alt={video.title} loading="lazy" />}
                  <span className="video-play" aria-hidden="true">▶</span>
                  {video.duration && <span className="video-duration">{video.duration}</span>}
                </button>
                <div className="video-card-copy">
                  <h3>{video.title}</h3>
                  {video.description && <p>{video.description}</p>}
                  <span className="video-category">{FILTERS.find(([, category]) => category === video.category)?.[0] || video.category}</span>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <p className="empty-state empty-state-light">No hay videos publicados en esta categoría.</p>
        )}
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
      {selectedVideo && <VideoDialog video={selectedVideo} onClose={() => setSelectedVideo(null)} />}
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

  const isLocalVideo = video.platform === "local" || /\.(?:mp4|webm|ogv|ogg)$/i.test(video.videoUrl);

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
      {isLocalVideo ? (
        <video controls autoPlay playsInline poster={video.thumbnail || undefined}>
          <source src={video.videoUrl} />
          Tu navegador no admite la reproducción de video.
        </video>
      ) : (
        <iframe src={video.videoUrl} title={video.title} allow="autoplay; encrypted-media; picture-in-picture" allowFullScreen />
      )}
      <div className="video-dialog-copy">
        <h2>{video.title}</h2>
        <p>{video.description}</p>
      </div>
    </dialog>
  );
}
