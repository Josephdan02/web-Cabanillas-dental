import { motion } from "framer-motion";
import { useState } from "react";
import { treatments } from "../data/treatments.js";

const featuredSymbols = ["✦", "◇", "✧", "○", "◆", "✺", "◌", "▣", "✚", "⌁"];

export default function TreatmentsSection() {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const selectedTreatment = treatments[selectedIndex];
  const showTreatmentVideos = () => {
    window.dispatchEvent(
      new CustomEvent("selectVideoCategory", {
        detail: "tratamientos",
      }),
    );
    document.getElementById("multimedia")?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };
  const getHighlights = (title) =>
    ({
      Ortodoncia: ["Alineación progresiva", "Mejor mordida", "Sonrisa armónica", "Plan personalizado"],
      "Limpieza dental profunda": [
        "Prevención de sarro",
        "Encías saludables",
        "Sensación de frescura",
        "Cuidado preventivo",
      ],
      "Blanqueamiento dental": [
        "Tono más claro",
        "Resultado estético",
        "Procedimiento controlado",
        "Sonrisa renovada",
      ],
      "Carillas dentales": ["Diseño de sonrisa", "Forma y color", "Acabado natural", "Alta estética"],
      Endodoncia: ["Alivio del dolor", "Conserva la pieza", "Sistema moderno", "Mayor precisión"],
    })[title] || [
      "Evaluación profesional",
      "Tecnología moderna",
      "Trato personalizado",
      "Resultados naturales",
    ];
  const renderTreatmentCard = (treatment, compact = false) => (
    <div
      className={`overflow-hidden bg-slate-950 shadow-2xl shadow-slate-900/20 ${compact ? "mt-3 rounded-[1.6rem]" : "rounded-[2rem]"}`}
    >
      <div className={`relative overflow-hidden ${compact ? "min-h-[360px]" : "h-[330px] md:h-[460px]"}`}>
        <img
          src={treatment.image}
          alt={treatment.title}
          className="absolute inset-0 h-full w-full object-cover"
          style={{
            objectPosition: "center 42%",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/35 to-transparent" />
        <div className={`absolute bottom-0 left-0 right-0 ${compact ? "p-5" : "p-6 md:p-8"}`}>
          <p className="mb-3 inline-flex rounded-full border border-white/20 bg-white/15 px-4 py-2 text-xs font-bold text-blue-100 backdrop-blur-xl">
            Tratamiento destacado
          </p>
          <h3 className={`font-display font-black text-white ${compact ? "text-3xl" : "text-3xl md:text-5xl"}`}>
            {treatment.title}
          </h3>
          <p className="mt-3 max-w-2xl font-manrope text-sm leading-7 text-slate-200 md:text-base">
            {treatment.text}
          </p>
          <div className="mt-5 flex flex-wrap gap-2 md:gap-3">
            {getHighlights(treatment.title)
              .slice(0, 3)
              .map((highlight) => (
                <span
                  key={highlight}
                  className="rounded-full border border-white/18 bg-white/12 px-3 py-2 text-xs font-bold text-white backdrop-blur-xl md:px-4 md:text-sm"
                >
                  {highlight}
                </span>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
  return (
    <section id="tratamientos" className="dental-light-section px-6 py-16 text-slate-950 md:py-20">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_20%,rgba(59,130,246,.11),transparent_32%),radial-gradient(circle_at_90%_85%,rgba(14,165,233,.09),transparent_34%)] pointer-events-none" />
      <div className="relative z-10 mx-auto max-w-7xl">
        <div className="mx-auto mb-8 max-w-3xl text-center">
          <p className="mb-4 inline-flex rounded-full border border-blue-200 bg-blue-50 px-5 py-2 text-xs font-extrabold uppercase tracking-[0.22em] text-blue-700">
            Tratamientos
          </p>
          <h2 className="font-display text-4xl font-black leading-tight tracking-tight md:text-5xl">
            {"Conoce nuestros "}
            <span className="text-blue-600">servicios integrales</span>
          </h2>
          <p className="mt-4 font-manrope text-base leading-7 text-slate-600 md:text-lg">
            Explora nuestros servicios de forma clara, visual y ordenada.
          </p>
        </div>
        <div className="grid gap-7 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
          <motion.div
            initial={{
              opacity: 0,
              x: -24,
            }}
            whileInView={{
              opacity: 1,
              x: 0,
            }}
            viewport={{
              once: true,
              amount: 0.25,
            }}
            transition={{
              duration: 0.7,
            }}
            className="grid gap-3 lg:grid-cols-2"
          >
            {treatments.map((treatment, index) => {
              const selected = selectedIndex === index;
              return (
                <div key={treatment.title} className="min-w-0">
                  <button
                    onClick={() => setSelectedIndex(index)}
                    className={`flex min-h-[76px] w-full items-center gap-3 rounded-3xl border px-4 py-3 text-left transition-all duration-300 ${selected ? "border-blue-500 bg-blue-50 shadow-xl shadow-blue-200/70" : "border-slate-200 bg-white/95 shadow-lg shadow-slate-900/5 hover:-translate-y-0.5 hover:border-blue-300"}`}
                    aria-expanded={selected}
                  >
                    <span
                      className={`grid h-10 w-10 shrink-0 place-items-center rounded-2xl text-base font-black ${selected ? "bg-blue-600 text-white" : "bg-blue-50 text-blue-500"}`}
                    >
                      {featuredSymbols[index % featuredSymbols.length]}
                    </span>
                    <span className="flex-1 text-sm font-extrabold leading-snug text-slate-950 md:text-base">
                      {treatment.title}
                    </span>
                    <span className="text-lg font-black text-slate-400">{selected ? "−" : "+"}</span>
                  </button>
                  {selected && (
                    <motion.div
                      initial={{
                        opacity: 0,
                        y: -8,
                      }}
                      animate={{
                        opacity: 1,
                        y: 0,
                      }}
                      transition={{
                        duration: 0.35,
                      }}
                      className="lg:hidden"
                    >
                      {renderTreatmentCard(treatment, true)}
                    </motion.div>
                  )}
                </div>
              );
            })}
          </motion.div>
          <motion.div
            key={selectedTreatment.title}
            initial={{
              opacity: 0,
              x: 24,
            }}
            animate={{
              opacity: 1,
              x: 0,
            }}
            transition={{
              duration: 0.55,
            }}
            className="hidden lg:block"
          >
            {renderTreatmentCard(selectedTreatment)}
          </motion.div>
        </div>
        <div className="mt-10 text-center">
          <button
            type="button"
            onClick={showTreatmentVideos}
            className="inline-flex items-center gap-3 rounded-full bg-gradient-to-r from-blue-600 to-cyan-500 px-6 py-3 text-sm font-extrabold text-white shadow-xl shadow-blue-500/25 transition hover:-translate-y-0.5 hover:shadow-blue-500/40"
          >
            Ver videos de tratamientos<span>▶</span>
          </button>
        </div>
      </div>
    </section>
  );
}
