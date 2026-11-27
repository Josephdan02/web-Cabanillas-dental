import { motion } from "framer-motion";
import { environments } from "../data/environments.js";

export default function EnvironmentsSection() {
  return (
    <motion.section
      id="ambientes"
      className="dental-light-section scroll-mt-28 px-6 py-24 md:py-28"
      initial={{
        opacity: 0,
        y: 40,
      }}
      whileInView={{
        opacity: 1,
        y: 0,
      }}
      viewport={{
        once: true,
        amount: 0.2,
      }}
      transition={{
        duration: 0.9,
        ease: "easeOut",
      }}
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_15%_15%,rgba(37,99,235,.10),transparent_32%),radial-gradient(circle_at_85%_20%,rgba(14,165,233,.10),transparent_34%)]" />
      <div className="relative z-10 mx-auto max-w-7xl">
        <div className="mx-auto mb-12 max-w-3xl text-center">
          <p className="mb-4 text-sm font-black uppercase tracking-[0.35em] text-blue-600">Ambientes</p>
          <h2 className="font-playfair text-4xl font-bold leading-tight text-slate-950 md:text-6xl">
            Espacios diseñados para generar confianza.
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-base leading-8 text-slate-600 md:text-lg">
            Conoce ambientes reales de Dental Cabanillas: áreas de tratamiento, sala de espera, ingreso y
            espacios pensados para la comodidad del paciente.
          </p>
        </div>
        <div className="grid auto-rows-fr gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {environments.map((environment, index) => (
            <motion.figure
              key={environment.title}
              initial={{
                opacity: 0,
                y: 24,
              }}
              whileInView={{
                opacity: 1,
                y: 0,
              }}
              viewport={{
                once: true,
                amount: 0.2,
              }}
              transition={{
                duration: 0.75,
                ease: "easeOut",
                delay: index * 0.05,
              }}
              className="group overflow-hidden rounded-[1.75rem] border border-white/80 bg-white shadow-lg shadow-slate-900/8 transition-all duration-500 hover:-translate-y-1 hover:shadow-2xl hover:shadow-blue-950/15"
            >
              <div className="relative aspect-[4/3] overflow-hidden bg-slate-100">
                <img
                  src={environment.image}
                  alt={environment.title}
                  className="h-full w-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/55 via-slate-950/5 to-transparent opacity-80" />
                <div className="absolute left-5 top-5 rounded-full border border-white/30 bg-white/20 px-4 py-2 text-xs font-black uppercase tracking-[0.22em] text-white backdrop-blur-md">
                  {String(index + 1).padStart(2, "0")}
                </div>
              </div>
              <figcaption className="flex min-h-[96px] items-center justify-between gap-4 px-6 py-5">
                <div>
                  <h3 className="text-lg font-black text-slate-950">{environment.title}</h3>
                  <p className="mt-1 text-sm leading-6 text-slate-500">Ambiente real de la clínica</p>
                </div>
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-blue-50 text-lg font-black text-blue-600 transition-colors duration-300 group-hover:bg-blue-600 group-hover:text-white">
                  +
                </span>
              </figcaption>
            </motion.figure>
          ))}
        </div>
        <div className="mt-10 text-center">
          <button
            type="button"
            onClick={() => {
              window.dispatchEvent(
                new CustomEvent("selectVideoCategory", {
                  detail: "ambientes",
                }),
              );
              document.getElementById("multimedia")?.scrollIntoView({
                behavior: "smooth",
                block: "start",
              });
            }}
            className="inline-flex items-center gap-3 rounded-full bg-gradient-to-r from-blue-600 to-cyan-500 px-6 py-3 text-sm font-extrabold text-white shadow-xl shadow-blue-500/25 transition hover:-translate-y-0.5 hover:shadow-blue-500/40"
          >
            Ver videos de ambientes<span>▶</span>
          </button>
        </div>
      </div>
    </motion.section>
  );
}
