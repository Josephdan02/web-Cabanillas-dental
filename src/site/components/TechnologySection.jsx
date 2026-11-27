import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { technologyItems } from "../data/technology.js";

const technologyCardVariants = {
  hidden: {
    opacity: 0,
    y: 28,
  },
  show: {
    opacity: 1,
    y: 0,
  },
};

function TechnologyImageCard({ item, reverse }) {
  const images = [
    {
      src: item.image,
      alt: item.imageAlt,
    },
    {
      src: item.secondaryImage,
      alt: `Vista secundaria de ${item.title}`,
    },
  ];
  const [activeImage, setActiveImage] = useState(0);
  const nextImageIndex = activeImage === 0 ? 1 : 0;
  return (
    <motion.div variants={technologyCardVariants} className={`relative ${reverse ? "lg:order-2" : ""}`}>
      <div className="absolute -inset-4 rounded-[2.5rem] bg-cyan-300/10 blur-3xl" />
      <div className="group relative overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.06] p-3 shadow-2xl shadow-black/30 backdrop-blur-xl">
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-200/10 via-transparent to-teal-300/10 opacity-70" />
        <div className="relative h-[330px] overflow-hidden rounded-[1.5rem] sm:h-[430px] lg:h-[500px]">
          <AnimatePresence mode="wait">
            <motion.img
              key={images[activeImage].src}
              src={images[activeImage].src}
              alt={images[activeImage].alt}
              className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
              loading="lazy"
              initial={{
                opacity: 0,
                scale: 1.03,
              }}
              animate={{
                opacity: 1,
                scale: 1,
              }}
              exit={{
                opacity: 0,
                scale: 0.98,
              }}
              transition={{
                duration: 0.35,
                ease: "easeOut",
              }}
            />
          </AnimatePresence>
          <div className="absolute inset-0 bg-gradient-to-t from-[#061522]/80 via-transparent to-transparent" />
          <div className="absolute left-5 top-5 rounded-full border border-cyan-100/25 bg-slate-950/45 px-4 py-2 text-xs font-bold uppercase tracking-[0.22em] text-cyan-100 backdrop-blur-md">
            {item.label}
          </div>
          <div className="absolute bottom-5 left-5 right-5 flex items-end justify-between gap-4">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-cyan-100/80">
                {"Tecnología "}
                {item.number}
              </p>
              <p className="mt-1 text-2xl font-bold text-white">{item.title}</p>
            </div>
            <button
              type="button"
              onClick={() => setActiveImage(nextImageIndex)}
              className="hidden h-24 w-24 shrink-0 overflow-hidden rounded-2xl border border-white/25 bg-white/10 p-1 shadow-xl outline-none ring-cyan-200/70 transition hover:scale-105 hover:border-cyan-200/70 focus-visible:ring-4 sm:block"
              aria-label={`Ver otra imagen de ${item.title}`}
              title="Clic para cambiar imagen"
            >
              <img
                src={images[nextImageIndex].src}
                alt={images[nextImageIndex].alt}
                className="h-full w-full rounded-xl object-cover"
                loading="lazy"
              />
            </button>
          </div>
          <div className="absolute right-5 top-5 rounded-full border border-white/15 bg-slate-950/45 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.18em] text-white/80 backdrop-blur-md sm:hidden">
            1 / 2
          </div>
          <button
            type="button"
            onClick={() => setActiveImage(nextImageIndex)}
            className="absolute bottom-5 right-5 rounded-full border border-white/20 bg-slate-950/55 px-4 py-2 text-xs font-bold uppercase tracking-[0.14em] text-white shadow-lg backdrop-blur-md transition hover:border-cyan-200/70 hover:bg-cyan-300/15 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-cyan-200/70 sm:hidden"
          >
            Cambiar foto
          </button>
        </div>
      </div>
    </motion.div>
  );
}

function TechnologyDetails({ item, reverse }) {
  return (
    <motion.article
      variants={technologyCardVariants}
      className={`relative overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.07] p-6 shadow-xl shadow-black/20 backdrop-blur-xl sm:p-8 lg:p-10 ${reverse ? "lg:order-1" : ""}`}
    >
      <div className="absolute right-0 top-0 h-32 w-32 rounded-bl-full bg-cyan-300/10" />
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan-200/70 to-transparent" />
      <p className="text-xs font-bold uppercase tracking-[0.28em] text-cyan-200">{item.subtitle}</p>
      <h3 className="mt-4 text-3xl font-bold leading-tight text-white md:text-4xl">{item.title}</h3>
      <p className="mt-6 text-base leading-8 text-slate-300 md:text-lg">{item.description}</p>
      <div className="mt-8 grid gap-3 sm:grid-cols-2">
        {item.benefits.map((benefit) => (
          <div
            key={benefit}
            className="flex items-center gap-3 rounded-2xl border border-white/10 bg-slate-950/30 px-4 py-3 text-sm font-semibold text-slate-100"
          >
            <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-cyan-300/15 text-cyan-100">
              ✓
            </span>
            <span>{benefit}</span>
          </div>
        ))}
      </div>
    </motion.article>
  );
}

export default function TechnologySection() {
  return (
    <section id="tecnologia" className="dental-dark-section px-5 py-24 text-white md:px-8 md:py-32">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_18%_10%,rgba(56,189,248,0.22),transparent_30%),radial-gradient(circle_at_82%_45%,rgba(20,184,166,0.18),transparent_32%),linear-gradient(135deg,#061522_0%,#0b2033_48%,#07111d_100%)]" />
      <div className="absolute left-1/2 top-0 -z-10 h-px w-[80%] -translate-x-1/2 bg-gradient-to-r from-transparent via-cyan-300/60 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 -z-10 h-36 bg-gradient-to-t from-black/30 to-transparent" />
      <div className="mx-auto max-w-7xl">
        <div className="mb-16 grid gap-8 lg:grid-cols-[1fr_0.9fr] lg:items-end">
          <div>
            <motion.p
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
              className="mb-4 inline-flex rounded-full border border-cyan-300/30 bg-cyan-300/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.28em] text-cyan-200"
            >
              Tecnología dental
            </motion.p>
            <motion.h2
              initial={{
                opacity: 0,
                y: 18,
              }}
              whileInView={{
                opacity: 1,
                y: 0,
              }}
              viewport={{
                once: true,
              }}
              transition={{
                delay: 0.08,
              }}
              className="font-playfair text-4xl font-bold leading-tight md:text-6xl"
            >
              Tecnología avanzada para diagnósticos más precisos y tratamientos más seguros.
            </motion.h2>
          </div>
          <motion.p
            initial={{
              opacity: 0,
              y: 18,
            }}
            whileInView={{
              opacity: 1,
              y: 0,
            }}
            viewport={{
              once: true,
            }}
            transition={{
              delay: 0.16,
            }}
            className="max-w-2xl text-lg leading-8 text-slate-300"
          >
            En Dental Cabanillas incorporamos herramientas digitales, inteligencia artificial y sistemas
            modernos de bioseguridad para ofrecer una atención más eficiente, cómoda y confiable.
          </motion.p>
        </div>
        <div className="mb-12">
          <button
            type="button"
            onClick={() => {
              window.dispatchEvent(
                new CustomEvent("selectVideoCategory", {
                  detail: "tecnologia",
                }),
              );
              document.getElementById("multimedia")?.scrollIntoView({
                behavior: "smooth",
                block: "start",
              });
            }}
            className="inline-flex items-center gap-3 rounded-full border border-cyan-200/25 bg-cyan-300/10 px-6 py-3 text-sm font-extrabold text-cyan-100 shadow-xl shadow-cyan-950/20 backdrop-blur-xl transition hover:-translate-y-0.5 hover:bg-cyan-300/20"
          >
            Ver videos de tecnología<span>▶</span>
          </button>
        </div>
        <div className="space-y-10 lg:space-y-14">
          {technologyItems.map((item, index) => {
            const reverse = index % 2 === 1;
            return (
              <motion.div
                key={item.title}
                initial="hidden"
                whileInView="show"
                viewport={{
                  once: true,
                  amount: 0.22,
                }}
                transition={{
                  staggerChildren: 0.12,
                }}
                className="grid gap-6 lg:grid-cols-2 lg:items-center"
              >
                <TechnologyImageCard item={item} reverse={reverse} />
                <TechnologyDetails item={item} reverse={reverse} />
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
