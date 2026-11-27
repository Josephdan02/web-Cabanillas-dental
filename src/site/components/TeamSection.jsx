import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { clinic } from "../data/clinic.js";
import { professionals } from "../data/team.js";

const professionalQuotes = [
  "“Cada tratamiento debe sentirse claro, seguro y pensado para tu sonrisa.”",
  "“La estética dental también es equilibrio, naturalidad y confianza.”",
  "“Con precisión y tecnología podemos conservar piezas dentales con mayor seguridad.”",
  "“Una atención integral empieza escuchando las necesidades de cada paciente.”",
  "“Restaurar una sonrisa es devolver función, armonía y comodidad.”",
  "“Tu sonrisa puede verse natural, saludable y alineada con tu personalidad.”",
  "“Cirugía especializada con precisión, seguridad y cuidado en cada procedimiento.”",
  "“Restauramos función y estética para que tu sonrisa se vea natural, cómoda y saludable.”",
];

export default function TeamSection() {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const selectedProfessional = professionals[selectedIndex];
  const renderMobileProfessional = (professional, index) => {
    const expanded = selectedIndex === index;
    return (
      <div
        key={professional.name}
        className="overflow-hidden rounded-[1.75rem] border border-white/12 bg-white/8 shadow-xl shadow-black/20 backdrop-blur-xl"
      >
        <button
          type="button"
          onClick={() => setSelectedIndex(index)}
          className="flex w-full items-center gap-4 px-4 py-4 text-left"
          aria-expanded={expanded}
        >
          <span
            className={`h-16 w-16 shrink-0 overflow-hidden rounded-2xl border-2 ${expanded ? "border-blue-300 shadow-lg shadow-blue-500/20" : "border-white/15"}`}
          >
            <img
              src={professional.image}
              alt={professional.name}
              className="h-full w-full object-cover"
              style={{
                objectPosition: "center 12%",
              }}
            />
          </span>
          <span className="min-w-0 flex-1">
            <span className="block text-lg font-black leading-tight text-white">{professional.name}</span>
            <span className="mt-1 block text-sm font-bold text-blue-300">{professional.role}</span>
            {professional.cop && (
              <span className="mt-1 block text-xs font-semibold text-slate-300">{professional.cop}</span>
            )}
          </span>
          <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-white/15 bg-white/10 text-xl font-black text-white">
            {expanded ? "−" : "+"}
          </span>
        </button>
        <AnimatePresence initial={false}>
          {expanded && (
            <motion.div
              initial={{
                height: 0,
                opacity: 0,
              }}
              animate={{
                height: "auto",
                opacity: 1,
              }}
              exit={{
                height: 0,
                opacity: 0,
              }}
              transition={{
                duration: 0.35,
              }}
              className="overflow-hidden"
            >
              <div className="px-4 pb-5">
                <div className="relative h-[430px] overflow-hidden rounded-[1.5rem] bg-slate-900 sm:h-[520px]">
                  <img
                    src={professional.image}
                    alt={professional.name}
                    className="h-full w-full object-cover"
                    style={{
                      objectPosition: "center 9%",
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/92 via-slate-950/20 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <div className="rounded-2xl border border-white/15 bg-slate-950/65 p-4 backdrop-blur-xl">
                      <p className="text-sm font-extrabold text-blue-200">
                        + pacientes atendidos con confianza
                      </p>
                      <p className="mt-1 text-xs font-medium text-slate-300">
                        Atención personalizada · Experiencia clínica
                      </p>
                    </div>
                  </div>
                </div>
                <p className="mt-5 text-base leading-8 text-slate-200">{professional.text}</p>
                <blockquote className="mt-6 border-l-4 border-blue-300 pl-5 text-lg font-black italic leading-8 text-white">
                  {professionalQuotes[index] ||
                    "“Atención profesional con trato humano y enfoque personalizado.”"}
                </blockquote>
                <div className="mt-6 grid gap-3 sm:grid-cols-3">
                  <a
                    href={clinic.whatsapp}
                    target="_blank"
                    rel="noreferrer"
                    className="rounded-2xl bg-gradient-to-r from-blue-600 to-cyan-500 px-5 py-4 text-center text-sm font-extrabold text-white shadow-xl shadow-blue-600/25"
                  >
                    Agendar consulta
                  </a>
                  <a
                    href={clinic.facebook}
                    target="_blank"
                    rel="noreferrer"
                    className="rounded-2xl border border-white/16 bg-white/8 px-5 py-4 text-center text-sm font-extrabold text-white backdrop-blur-xl"
                  >
                    Facebook
                  </a>
                  <a
                    href={clinic.instagram}
                    target="_blank"
                    rel="noreferrer"
                    className="rounded-2xl border border-white/16 bg-white/8 px-5 py-4 text-center text-sm font-extrabold text-white backdrop-blur-xl"
                  >
                    Instagram
                  </a>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  };
  return (
    <section id="equipo" className="dental-dark-section px-6 py-24 text-white md:py-32">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_10%,rgba(37,99,235,.24),transparent_34%),radial-gradient(circle_at_80%_85%,rgba(14,165,233,.16),transparent_36%)] pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-b from-slate-950/25 via-transparent to-slate-950/45 pointer-events-none" />
      <div className="relative z-10 mx-auto max-w-7xl">
        <div className="mx-auto mb-16 max-w-3xl text-center">
          <p className="mb-4 inline-flex rounded-full border border-blue-300/35 bg-blue-400/10 px-5 py-2 text-xs font-extrabold uppercase tracking-[0.22em] text-blue-200">
            Conoce al equipo
          </p>
          <h2 className="text-4xl font-black leading-tight tracking-tight md:text-6xl">
            {"Profesionales dedicados a tu "}
            <span className="text-blue-300">sonrisa y bienestar</span>
          </h2>
          <p className="mt-5 text-base leading-8 text-slate-300 md:text-lg">
            Un equipo preparado para acompañarte con trato cercano, criterio clínico y una experiencia dental
            más humana.
          </p>
        </div>
        <div className="space-y-4 lg:hidden">
          {professionals.map((professional, index) => renderMobileProfessional(professional, index))}
        </div>
        <div className="hidden gap-10 lg:grid lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
          <motion.div
            key={selectedProfessional.name}
            initial={{
              opacity: 0,
              x: -22,
            }}
            animate={{
              opacity: 1,
              x: 0,
            }}
            transition={{
              duration: 0.55,
            }}
            className="relative overflow-hidden rounded-[2rem] border border-white/12 bg-white/8 p-3 shadow-2xl shadow-black/35 backdrop-blur-xl"
          >
            <div className="relative h-[520px] overflow-hidden rounded-[1.6rem] bg-slate-900 md:h-[600px]">
              <img
                src={selectedProfessional.image}
                alt={selectedProfessional.name}
                className="h-full w-full object-cover"
                style={{
                  objectPosition: "center 9%",
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/92 via-transparent to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <div className="rounded-3xl border border-white/15 bg-slate-950/60 p-5 backdrop-blur-xl">
                  <p className="text-sm font-extrabold text-blue-200">+ pacientes atendidos con confianza</p>
                  <p className="mt-1 text-xs font-medium text-slate-300">
                    Atención personalizada · Experiencia clínica
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
          <motion.div
            key={`${selectedProfessional.name}-info`}
            initial={{
              opacity: 0,
              x: 22,
            }}
            animate={{
              opacity: 1,
              x: 0,
            }}
            transition={{
              duration: 0.55,
            }}
            className="lg:pl-4"
          >
            <div className="mb-7 max-w-md rounded-3xl border border-white/14 bg-white/10 p-6 shadow-xl shadow-black/20 backdrop-blur-xl">
              <h3 className="text-2xl font-black text-white">{selectedProfessional.name}</h3>
              <p className="mt-2 font-bold text-blue-300">{selectedProfessional.role}</p>
              {selectedProfessional.cop && (
                <p className="mt-1 text-sm font-semibold text-slate-300">{selectedProfessional.cop}</p>
              )}
            </div>
            <p className="max-w-2xl text-base leading-8 text-slate-300 md:text-lg">
              {selectedProfessional.text}
            </p>
            <blockquote className="mt-8 border-l-4 border-blue-300 pl-6 text-xl font-black italic text-white">
              {professionalQuotes[selectedIndex] ||
                "“Atención profesional con trato humano y enfoque personalizado.”"}
            </blockquote>
            <div className="mt-8 flex flex-wrap gap-4">
              <a
                href={clinic.whatsapp}
                target="_blank"
                rel="noreferrer"
                className="rounded-2xl bg-gradient-to-r from-blue-600 to-cyan-500 px-7 py-4 text-sm font-extrabold text-white shadow-xl shadow-blue-600/25 transition-all duration-300 hover:-translate-y-1"
              >
                Agendar consulta
              </a>
              <a
                href={clinic.facebook}
                target="_blank"
                rel="noreferrer"
                className="rounded-2xl border border-white/16 bg-white/8 px-6 py-4 text-sm font-extrabold text-white backdrop-blur-xl transition-all duration-300 hover:bg-white hover:text-slate-950"
              >
                Facebook
              </a>
              <a
                href={clinic.instagram}
                target="_blank"
                rel="noreferrer"
                className="rounded-2xl border border-white/16 bg-white/8 px-6 py-4 text-sm font-extrabold text-white backdrop-blur-xl transition-all duration-300 hover:bg-white hover:text-slate-950"
              >
                Instagram
              </a>
            </div>
            <div className="mt-10 flex flex-wrap gap-3">
              {professionals.map((professional, index) => (
                <button
                  key={professional.name}
                  onClick={() => setSelectedIndex(index)}
                  className={`h-14 w-14 overflow-hidden rounded-full border-2 transition-all duration-300 ${selectedIndex === index ? "border-blue-300 scale-110 shadow-xl shadow-blue-500/25" : "border-white/20 opacity-70 hover:opacity-100"}`}
                  aria-label={`Ver ${professional.name}`}
                >
                  <img
                    src={professional.image}
                    alt={professional.name}
                    className="h-full w-full object-cover"
                    style={{
                      objectPosition: "center 12%",
                    }}
                  />
                </button>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
