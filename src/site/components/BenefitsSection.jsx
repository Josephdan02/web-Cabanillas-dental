import { motion } from "framer-motion";
import { useState } from "react";

const benefitSymbols = ["✦", "✓", "⌂", "❤"];

export default function BenefitsSection({ clinic }) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const sourceBenefits = clinic?.content?.benefits;
  const entries = Array.isArray(sourceBenefits) ? sourceBenefits : [];
  const activeIndex = entries.length ? Math.min(selectedIndex, entries.length - 1) : 0;
  const selected = entries[activeIndex];
  return (
    <motion.section
      className="dental-light-section px-6 py-14 md:py-16"
      initial={{
        opacity: 0,
        y: 35,
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
        duration: 0.8,
        ease: "easeOut",
      }}
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_12%_20%,rgba(37,99,235,.10),transparent_32%),radial-gradient(circle_at_88%_88%,rgba(14,165,233,.10),transparent_36%)]" />
      <div className="relative z-10 mx-auto max-w-7xl">
        <div className="mb-8 max-w-4xl">
          <p className="mb-3 text-sm font-black uppercase tracking-[0.38em] text-blue-600">
            Por qué elegirnos
          </p>
          <h2 className="font-display text-4xl font-black leading-[1.06] tracking-tight text-slate-950 md:text-6xl">
            {clinic?.content?.benefitsTitle || "Una experiencia dental cómoda y confiable."}
          </h2>
          <p className="font-manrope mt-4 max-w-2xl text-base leading-8 text-slate-600 md:text-lg">
            {clinic?.content?.benefitsIntro ||
              "Mantenemos la atención personalizada, la tecnología moderna, los ambientes cómodos y el trato familiar como pilares de nuestra clínica."}
          </p>
        </div>
        {selected && (
        <div className="grid items-stretch gap-7 lg:grid-cols-[0.95fr_1.05fr]">
          <motion.div
            className="relative min-h-[390px] overflow-hidden rounded-[2rem] border border-slate-200 bg-slate-950 shadow-2xl shadow-blue-950/10 md:min-h-[460px]"
            initial={{
              opacity: 0,
              x: -30,
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
              duration: 0.85,
              ease: "easeOut",
            }}
          >
            <motion.img
              key={activeIndex}
              src={selected.image}
              alt={selected.title}
              className="absolute inset-0 h-full w-full object-cover opacity-95"
              style={{
                objectPosition:
                  activeIndex === 0
                    ? "center 35%"
                    : activeIndex === 1
                      ? "center 40%"
                      : activeIndex === 2
                        ? "center 48%"
                        : "center 42%",
              }}
              initial={{
                scale: 1.06,
                opacity: 0,
              }}
              animate={{
                scale: 1,
                opacity: 1,
              }}
              transition={{
                duration: 0.45,
                ease: "easeOut",
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/28 to-transparent" />
            <div className="absolute left-6 top-6 rounded-full border border-white/20 bg-white/15 px-5 py-2 text-xs font-black uppercase tracking-[0.22em] text-white backdrop-blur-xl">
              Experiencia Cabanillas
            </div>
            <div className="absolute bottom-7 left-7 right-7">
              <h3 className="font-display mt-2 max-w-xl text-3xl font-black leading-tight text-white md:text-4xl">
                {selected.title}
              </h3>
              <p className="font-manrope mt-3 max-w-xl text-base leading-7 text-white/82">
                {selected.description}
              </p>
            </div>
          </motion.div>
          <div className="grid gap-5 sm:grid-cols-2">
            {entries.map(({ title, description, image }, index) => {
              const isSelected = activeIndex === index;
              return (
                <motion.button
                  key={title}
                  type="button"
                  onClick={() => setSelectedIndex(index)}
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
                    delay: index * 0.07,
                  }}
                  className={`group relative min-h-[230px] overflow-hidden rounded-[1.5rem] border bg-white text-left shadow-lg shadow-blue-950/5 transition-all duration-500 hover:-translate-y-1 hover:shadow-2xl hover:shadow-blue-950/12 ${isSelected ? "border-blue-500 ring-2 ring-blue-500/20" : "border-slate-200 hover:border-blue-400/60"}`}
                >
                  <div className="relative h-28 overflow-hidden bg-slate-100">
                    <img
                      src={image}
                      alt={title}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                      style={{
                        objectPosition:
                          index === 0
                            ? "center 35%"
                            : index === 1
                              ? "center 38%"
                              : index === 2
                                ? "center 48%"
                                : "center 42%",
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/50 to-transparent" />
                    <div
                      className={`absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-2xl text-lg font-black transition-all duration-500 ${isSelected ? "bg-blue-600 text-white" : "bg-white/90 text-blue-600 group-hover:bg-blue-600 group-hover:text-white"}`}
                    >
                      {benefitSymbols[index % benefitSymbols.length]}
                    </div>
                    <span className="absolute bottom-3 left-4 rounded-full bg-white/90 px-3 py-1 text-xs font-black uppercase tracking-[0.16em] text-blue-700">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                  </div>
                  <div className="p-5">
                    <h3 className="text-xl font-black leading-tight text-slate-950 md:text-2xl">{title}</h3>
                    <div
                      className={`my-3 h-[3px] rounded-full transition-all duration-500 ${isSelected ? "w-24 bg-blue-500" : "w-14 bg-slate-200 group-hover:w-24 group-hover:bg-blue-500"}`}
                    />
                    <p className="font-manrope text-sm leading-6 text-slate-600">{description}</p>
                  </div>
                </motion.button>
              );
            })}
          </div>
        </div>
        )}
        <div className="mt-10 text-center">
          <button
            type="button"
            onClick={() => {
              window.dispatchEvent(
                new CustomEvent("selectVideoCategory", {
                  detail: "eventos",
                }),
              );
              document.getElementById("multimedia")?.scrollIntoView({
                behavior: "smooth",
                block: "start",
              });
            }}
            className="inline-flex items-center gap-3 rounded-full border border-blue-200 bg-white px-6 py-3 text-sm font-extrabold text-blue-700 shadow-xl shadow-blue-950/10 transition hover:-translate-y-0.5 hover:border-blue-400 hover:bg-blue-50"
          >
            Ver videos de experiencias<span>▶</span>
          </button>
        </div>
      </div>
    </motion.section>
  );
}
