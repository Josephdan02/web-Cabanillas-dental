import { AnimatePresence, motion } from "framer-motion";
import { useEffect } from "react";

export default function VideoDialog({ video, isOpen, onClose }) {
  useEffect(() => {
    if (!isOpen) return;
    const handleEscape = (event) => {
      if (event.key === "Escape") onClose();
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleEscape);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleEscape);
    };
  }, [isOpen, onClose]);

  if (!isOpen || !video) return null;
  const isLocalVideo = video.platform === "local" || video.videoUrl?.endsWith(".mp4");
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{
            opacity: 0,
          }}
          animate={{
            opacity: 1,
          }}
          exit={{
            opacity: 0,
          }}
          transition={{
            duration: 0.22,
          }}
          onClick={onClose}
          className="fixed inset-0 z-[999] flex min-h-[100dvh] items-start justify-center overflow-y-auto bg-black/86 px-3 py-4 pb-28 backdrop-blur-md md:items-center md:px-6 md:py-8"
        >
          <motion.div
            initial={{
              opacity: 0,
              scale: 0.94,
              y: 18,
            }}
            animate={{
              opacity: 1,
              scale: 1,
              y: 0,
            }}
            exit={{
              opacity: 0,
              scale: 0.94,
              y: 18,
            }}
            transition={{
              duration: 0.32,
              ease: "easeOut",
            }}
            onClick={(event) => event.stopPropagation()}
            className="relative w-full max-w-5xl"
          >
            <motion.button
              whileHover={{
                scale: 1.05,
              }}
              whileTap={{
                scale: 0.96,
              }}
              onClick={onClose}
              aria-label="Cerrar video"
              className="fixed right-4 top-4 z-[1002] inline-flex items-center gap-2 rounded-full border border-white/20 bg-white px-4 py-3 text-sm font-extrabold text-slate-950 shadow-2xl shadow-black/40 backdrop-blur-xl transition hover:bg-slate-950 hover:text-white md:absolute md:-right-2 md:-top-14 md:bg-slate-950/90 md:text-white md:hover:bg-white md:hover:text-slate-950"
            >
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2.4}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
              <span className="hidden sm:inline">Cerrar</span>
            </motion.button>
            <div className="relative flex max-h-[52dvh] w-full items-center justify-center overflow-hidden rounded-3xl bg-black shadow-2xl ring-1 ring-white/10 sm:max-h-[60dvh] md:max-h-[74vh]">
              {isLocalVideo ? (
                <video
                  key={video.videoUrl}
                  src={video.videoUrl}
                  poster={video.thumbnail}
                  controls
                  autoPlay
                  preload="metadata"
                  playsInline
                  className="max-h-[52dvh] w-full bg-black object-contain sm:max-h-[60dvh] md:max-h-[74vh]"
                >
                  Tu navegador no puede reproducir este video.
                </video>
              ) : (
                <iframe
                  src={video.videoUrl}
                  title={video.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="aspect-video h-full w-full"
                />
              )}
            </div>
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
                delay: 0.15,
              }}
              className="mt-4 rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-md md:mt-5 md:p-5"
            >
              <h3 className="text-lg font-bold text-white md:text-xl">{video.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-300 md:text-base">{video.description}</p>
              <div className="mt-4 flex flex-wrap items-center gap-2 md:gap-3">
                <span className="inline-block rounded-full bg-blue-500/20 px-3 py-1 text-sm text-blue-300">
                  {video.duration}
                </span>
                <span className="rounded-full bg-white/10 px-3 py-1 text-sm capitalize text-slate-300">
                  {video.category}
                </span>
                {isLocalVideo && (
                  <span className="rounded-full bg-emerald-500/15 px-3 py-1 text-sm text-emerald-200">
                    Video local MP4
                  </span>
                )}
              </div>
            </motion.div>
          </motion.div>
          <motion.button
            initial={{
              opacity: 0,
              y: 18,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            exit={{
              opacity: 0,
              y: 18,
            }}
            transition={{
              duration: 0.25,
            }}
            onClick={(event) => {
              event.stopPropagation();
              onClose();
            }}
            aria-label="Cerrar video"
            className="fixed bottom-4 left-4 right-4 z-[1001] flex items-center justify-center gap-3 rounded-2xl border border-white/20 bg-white px-5 py-4 text-base font-extrabold text-slate-950 shadow-2xl shadow-black/50 md:hidden"
          >
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.4} d="M6 18L18 6M6 6l12 12" />
            </svg>
            Cerrar video
          </motion.button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
