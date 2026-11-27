import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Autoplay, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import VideoDialog from "./VideoDialog.jsx";

const categories = [
  {
    id: "all",
    label: "Todos",
  },
  {
    id: "tratamientos",
    label: "Tratamientos",
  },
  {
    id: "ambientes",
    label: "Ambientes",
  },
  {
    id: "tecnologia",
    label: "Tecnología",
  },
  {
    id: "eventos",
    label: "Eventos",
  },
];

export default function VideoGallerySection({ videos = [] }) {
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [category, setCategory] = useState("all");
  useEffect(() => {
    const selectCategory = (event) => {
      const requestedCategory = event.detail;
      if (categories.some((option) => option.id === requestedCategory)) setCategory(requestedCategory);
    };
    window.addEventListener("selectVideoCategory", selectCategory);
    return () => window.removeEventListener("selectVideoCategory", selectCategory);
  }, []);
  const filteredVideos = category === "all" ? videos : videos.filter((video) => video.category === category);
  return (
    <>
      <section id="multimedia" className="dental-dark-section px-6 py-20 text-white md:py-28">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,.08),transparent_60%)] pointer-events-none" />
        <div className="relative z-10 mx-auto max-w-7xl">
          <motion.div
            initial={{
              opacity: 0,
              y: 20,
            }}
            whileInView={{
              opacity: 1,
              y: 0,
            }}
            viewport={{
              once: true,
              amount: 0.3,
            }}
            transition={{
              duration: 0.7,
            }}
            className="mb-10 text-center"
          >
            <p className="mb-2 text-sm font-bold uppercase tracking-widest text-blue-200">
              Contenido audiovisual
            </p>
            <h2 className="font-playfair text-3xl font-bold leading-tight md:text-4xl lg:text-5xl">
              Videos reales de nuestra experiencia clínica.
            </h2>
            <p className="mt-4 max-w-2xl mx-auto text-slate-300">
              Explora videos reales de tratamientos, tecnología, ambientes y momentos de Dental Cabanillas.
            </p>
          </motion.div>
          <motion.div
            initial={{
              opacity: 0,
              y: 12,
            }}
            whileInView={{
              opacity: 1,
              y: 0,
            }}
            viewport={{
              once: true,
            }}
            transition={{
              delay: 0.15,
            }}
            className="mb-10 flex flex-wrap justify-center gap-3"
          >
            {categories.map((option) => (
              <button
                key={option.id}
                onClick={() => setCategory(option.id)}
                className={`rounded-full px-4 py-2 text-sm font-semibold transition transform ${category === option.id ? "bg-blue-600 text-white shadow-lg shadow-blue-500/30" : "bg-white/5 text-slate-300 border border-white/10 hover:bg-white/10"}`}
              >
                {option.label}
              </button>
            ))}
          </motion.div>
          <div className="relative">
            <Swiper
              modules={[Autoplay, Pagination]}
              autoplay={{
                delay: 5e3,
                disableOnInteraction: false,
                pauseOnMouseEnter: true,
              }}
              pagination={{
                clickable: true,
              }}
              slidesPerView={1.15}
              spaceBetween={16}
              breakpoints={{
                640: {
                  slidesPerView: 1.4,
                },
                768: {
                  slidesPerView: 2.1,
                },
                1024: {
                  slidesPerView: 3,
                },
              }}
              className="py-4"
            >
              {filteredVideos.length > 0 ? (
                filteredVideos.map((video, index) => (
                  <SwiperSlide key={video.id}>
                    <motion.div
                      initial={{
                        opacity: 0,
                        y: 12,
                      }}
                      animate={{
                        opacity: 1,
                        y: 0,
                      }}
                      transition={{
                        delay: index * 0.05,
                      }}
                      onClick={() => setSelectedVideo(video)}
                      className="group cursor-pointer h-full"
                    >
                      <div className="relative h-56 overflow-hidden rounded-2xl bg-gradient-to-br from-slate-800 to-black shadow-lg transition-shadow hover:shadow-2xl">
                        <img
                          src={video.thumbnail}
                          alt={video.title}
                          className="h-full w-full object-cover object-center transition-transform duration-500 group-hover:scale-110"
                          style={{
                            objectPosition: "center 40%",
                          }}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                        <motion.div
                          whileHover={{
                            scale: 1.1,
                          }}
                          whileTap={{
                            scale: 0.95,
                          }}
                          className="absolute inset-0 flex items-center justify-center"
                        >
                          <div className="rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 p-4 shadow-lg shadow-blue-500/30 group-hover:shadow-blue-500/50 transition-shadow">
                            <svg className="h-8 w-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                              <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
                            </svg>
                          </div>
                        </motion.div>
                        <div className="absolute bottom-3 right-3 rounded-full bg-black/60 px-2 py-1 text-xs font-semibold text-white">
                          {video.duration}
                        </div>
                      </div>
                      <div className="mt-3">
                        <h4 className="font-bold text-white line-clamp-2 group-hover:text-blue-300 transition">
                          {video.title}
                        </h4>
                        <p className="mt-1 text-xs text-slate-400">{video.description}</p>
                        <div className="mt-2 flex items-center gap-2">
                          <span className="text-xs font-semibold text-blue-300 capitalize">
                            {video.category}
                          </span>
                        </div>
                      </div>
                    </motion.div>
                  </SwiperSlide>
                ))
              ) : (
                <div className="col-span-full py-12 text-center text-slate-400">
                  No hay videos en esta categoría
                </div>
              )}
            </Swiper>
          </div>
          <motion.div
            initial={{
              opacity: 0,
              y: 16,
            }}
            whileInView={{
              opacity: 1,
              y: 0,
            }}
            viewport={{
              once: true,
            }}
            transition={{
              delay: 0.25,
            }}
            className="mt-12 text-center"
          >
            <p className="text-slate-300 mb-4">
              ¿Quieres ver más contenido? También puedes seguirnos en redes sociales.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <a
                href="https://www.instagram.com/dental.cabanillas/"
                target="_blank"
                rel="noreferrer"
                className="rounded-full bg-gradient-to-r from-pink-500 to-violet-600 px-5 py-2 text-sm font-semibold text-white shadow-lg hover:shadow-xl transition"
              >
                Instagram
              </a>
              <a
                href="https://www.tiktok.com/@dental.cabanillas"
                target="_blank"
                rel="noreferrer"
                className="rounded-full bg-black/60 border border-white/20 px-5 py-2 text-sm font-semibold text-white backdrop-blur-sm hover:bg-black/80 transition"
              >
                TikTok
              </a>
              <a
                href="https://www.facebook.com/Clinica.Cabanillas/"
                target="_blank"
                rel="noreferrer"
                className="rounded-full bg-gradient-to-r from-blue-600 to-sky-600 px-5 py-2 text-sm font-semibold text-white shadow-lg hover:shadow-xl transition"
              >
                Facebook
              </a>
            </div>
          </motion.div>
        </div>
      </section>
      <VideoDialog video={selectedVideo} isOpen={!!selectedVideo} onClose={() => setSelectedVideo(null)} />
    </>
  );
}
