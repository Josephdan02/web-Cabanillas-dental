import { motion } from "framer-motion";
import { clinic } from "../data/clinic.js";

const clinicWordmark = "/assets/logo-text-crop-Bpts9NDU.webp";

const toothLogo = "/assets/logo-tooth-crop-HmZWkA58.webp";

const heroHighlights = [
  ["Tecnología", "Avanzada", "M11 15.5h7 18l3-2.6M5.5 9.8l3.1 2.6L18.5 5"],
  [
    "Atención",
    "Personalizada",
    "M16 11c1.7 0 3-1.3 3-3s-1.3-3-3-3-3 1.3-3 3 1.3 3 3 3ZM8 12c1.4 0 2.5-1.1 2.5-2.5S9.4 7 8 7 5.5 8.1 5.5 9.5 6.6 12 8 12Zm8 2c-2.7 0-5 1.4-5 3.2V19h10v-1.8c0-1.8-2.3-3.2-5-3.2Zm-8 .5c-2.2 0-4 1.1-4 2.6V19h5v-1.8c0-.9.4-1.8 1-2.5-.6-.1-1.3-.2-2-.2Z",
  ],
  [
    "Seguridad y",
    "Confianza",
    "M12 3l7 3v5c0 4.4-2.9 8.4-7 9.8-4.1-1.4-7-5.4-7-9.8V6l7-3Zm3.4 6.7-4.2 4.2-1.8-1.8L8 13.5l3.2 3.2 5.6-5.6-1.4-1.4Z",
  ],
];

export default function HeroSection() {
  return (
    <section id="inicio" className="relative min-h-screen overflow-hidden bg-[#f7faff] text-slate-950">
      <div className="absolute inset-0">
        <img
          src={clinic.heroReceptionWide}
          alt="Recepción de Dental Cabanillas"
          className="absolute right-0 top-0 h-full w-[58%] object-cover object-center opacity-35 mix-blend-multiply"
        />
        <div className="absolute inset-0 bg-[linear-gradient(110deg,#ffffff_0%,#f7fbff_38%,rgba(236,244,255,0.92)_62%,rgba(206,224,255,0.78)_100%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_78%_42%,rgba(37,99,235,0.26),transparent_34%),radial-gradient(circle_at_9%_18%,rgba(147,197,253,0.32),transparent_26%)]" />
        <div className="absolute right-0 top-0 h-full w-[45%] bg-gradient-to-l from-blue-700/18 via-blue-400/8 to-transparent" />
      </div>
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -left-28 bottom-[-12rem] h-[23rem] w-[45rem] rounded-[50%] border-4 border-blue-600/70" />
        <div className="absolute right-[18%] top-[6%] h-[58rem] w-[58rem] rounded-full border border-blue-700/15" />
        <div className="absolute left-8 top-56 grid grid-cols-7 gap-4 opacity-35">
          {Array.from({
            length: 42,
          }).map((particle, index) => (
            <span key={index} className="h-1.5 w-1.5 rounded-full bg-blue-500/45" />
          ))}
        </div>
        <div className="absolute right-[26%] top-[21%] h-24 w-[1px] rotate-45 bg-gradient-to-b from-transparent via-blue-600/35 to-transparent" />
      </div>
      <div className="relative z-10 mx-auto flex min-h-screen w-full max-w-[92rem] items-center px-6 pb-14 pt-36 md:px-10 lg:pt-32">
        <motion.div
          initial={{
            opacity: 0,
            y: 28,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 0.85,
            ease: "easeOut",
          }}
          className="grid w-full grid-cols-1 items-center gap-8 lg:grid-cols-[1.02fr_0.98fr]"
        >
          <div className="flex flex-col items-center text-center lg:items-start lg:text-left">
            <img
              src={clinicWordmark}
              alt="Dental Cabanillas - Consigue tu sonrisa perfecta"
              className="w-[92vw] max-w-[760px] drop-shadow-[0_12px_28px_rgba(37,99,235,0.18)] sm:w-[700px] lg:w-[760px] xl:w-[820px]"
            />
            <p className="mt-7 max-w-[690px] font-manrope text-base font-extrabold leading-8 text-slate-900 md:text-lg lg:text-xl">
              Atención integral en todas las especialidades odontológicas, respaldada por tecnología moderna,
              tratamientos personalizados y ambientes diseñados para brindarte{" "}
              <span className="text-blue-700">comodidad</span>
              {", "}
              <span className="text-violet-700">confianza</span>
              {" y una"} <span className="text-blue-700">experiencia única.</span>
            </p>
            <div className="mt-8 flex w-full flex-col justify-center gap-4 sm:flex-row lg:justify-start">
              <a
                href={clinic.whatsapp}
                target="_blank"
                rel="noreferrer"
                className="group inline-flex items-center justify-center gap-3 rounded-full bg-gradient-to-r from-blue-600 via-blue-600 to-violet-700 px-8 py-4 text-sm font-extrabold text-white shadow-2xl shadow-blue-700/30 transition-all duration-300 hover:-translate-y-1 hover:shadow-blue-500/45"
              >
                <svg
                  viewBox="0 0 24 24"
                  className="h-5 w-5"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M7 3v3M17 3v3M4 9h16M5 5h14a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1Z" />
                </svg>
                Reservar cita
                <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
              </a>
              <a
                href="#tratamientos"
                className="inline-flex items-center justify-center gap-3 rounded-full border border-blue-600/35 bg-white/72 px-8 py-4 text-sm font-extrabold text-slate-950 shadow-xl shadow-blue-950/5 backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:border-blue-600 hover:bg-white hover:text-blue-700"
              >
                <svg
                  viewBox="0 0 24 24"
                  className="h-5 w-5"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M12 21c-3.5-4.5-6-8-6-12.2C6 5.6 8.3 3 11 3c.8 0 1.5.2 2 .7.5-.5 1.2-.7 2-.7 2.7 0 5 2.6 5 5.8 0 4.2-2.5 7.7-6 12.2-.5.7-1.5.7-2 0Z" />
                </svg>
                Ver tratamientos<span>›</span>
              </a>
            </div>
            <div className="mt-10 grid w-full max-w-[700px] grid-cols-1 gap-4 sm:grid-cols-3">
              {heroHighlights.map(([firstLine, secondLine, iconPath]) => (
                <div
                  key={`${firstLine}-${secondLine}`}
                  className="flex items-center justify-center gap-3 rounded-3xl bg-white/55 px-4 py-3 text-left shadow-sm shadow-blue-950/5 backdrop-blur-sm lg:justify-start"
                >
                  <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-blue-200/70 bg-white text-blue-700 shadow-sm">
                    <svg
                      viewBox="0 0 24 24"
                      className="h-7 w-7"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d={iconPath} />
                    </svg>
                  </span>
                  <span className="font-manrope text-sm font-extrabold leading-5 text-slate-900">
                    {firstLine}
                    <br />
                    {secondLine}
                  </span>
                </div>
              ))}
            </div>
          </div>
          <div className="hidden items-center justify-center lg:flex">
            <motion.div
              initial={{
                opacity: 0,
                scale: 0.92,
                x: 35,
              }}
              animate={{
                opacity: 1,
                scale: 1,
                x: 0,
              }}
              transition={{
                duration: 0.9,
                ease: "easeOut",
                delay: 0.1,
              }}
              className="relative flex min-h-[620px] w-full items-center justify-center"
            >
              <div className="absolute inset-x-10 bottom-14 h-24 rounded-[50%] bg-blue-700/18 blur-2xl" />
              <div className="absolute h-[610px] w-[610px] rounded-full border border-blue-600/10" />
              <div className="absolute h-[470px] w-[470px] rounded-full bg-white/40 blur-3xl" />
              <img
                src={toothLogo}
                alt="Ícono Dental Cabanillas"
                className="relative z-10 w-[540px] max-w-full object-contain xl:w-[625px]"
                style={{
                  filter:
                    "drop-shadow(0 0 12px rgba(255,255,255,0.95)) drop-shadow(0 0 26px rgba(37,99,235,0.7)) drop-shadow(0 34px 45px rgba(30,64,175,0.26))",
                }}
              />
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
