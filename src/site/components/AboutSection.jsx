import { motion } from "framer-motion";
import { useState } from "react";
import { Autoplay, EffectFade, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

const defaultTeamImages = {
  teamGroupClinic: "/assets/team_group_clinic-D8A5Mlj6.webp",
  teamGroupEvent: "/assets/team_group_event-Dd9tQSn9.webp",
  teamGroupFront: "/assets/team_group_front-a_8AnI1G.webp",
};

const defaultStats = [
  ["10+", "Tratamientos dentales"],
  ["100%", "Atención personalizada"],
  ["Huánuco", "Ubicación céntrica"],
];

export default function AboutSection({ clinic }) {
  const [activeSlideIndex, setActiveSlideIndex] = useState(0);
  const images = { ...defaultTeamImages, ...(clinic?.images || {}) };
  const teamSlides = [
    {
      image: images.teamGroupClinic || defaultTeamImages.teamGroupClinic,
      alt: `Equipo profesional ${clinic?.name || "Dental Cabanillas"} en clínica`,
      label: "Equipo Cabanillas",
      position: "center 42%",
    },
    {
      image: images.teamGroupEvent || defaultTeamImages.teamGroupEvent,
      alt: `Equipo ${clinic?.name || "Dental Cabanillas"} en evento institucional`,
      label: "Equipo Cabanillas",
      position: "center 48%",
    },
    {
      image: images.teamGroupFront || defaultTeamImages.teamGroupFront,
      alt: `Equipo ${clinic?.name || "Dental Cabanillas"} en el ingreso de la clínica`,
      label: "Equipo Cabanillas",
      position: "center 42%",
    },
    ...(images.aboutRoom
      ? [{ image: images.aboutRoom, alt: `Área de consultoría de ${clinic?.name || "Dental Cabanillas"}`, label: "Área de consultoría", position: "center" }]
      : []),
  ];
  const sourceStats = clinic?.content?.aboutStats;
  const stats = (Array.isArray(sourceStats) ? sourceStats : defaultStats).map((stat) =>
    Array.isArray(stat) ? { value: stat[0], label: stat[1] } : stat,
  );

  return (
    <motion.section
      id="about"
      className="dental-light-section px-6 py-20 text-slate-950 md:py-28"
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
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_100%_20%,rgba(37,99,235,.1),transparent_40%)] pointer-events-none" />
      <div className="relative z-10 mx-auto grid max-w-7xl items-center gap-10 lg:grid-cols-[0.82fr_1.18fr] xl:gap-16">
        <div className="min-w-0">
          <p className="mb-4 text-sm font-extrabold uppercase tracking-[0.35em] text-blue-600">
            Sobre nosotros
          </p>
          <h2 className="font-display mb-7 max-w-2xl text-4xl font-black leading-[1.08] tracking-tight md:text-5xl xl:text-6xl">
            {clinic?.content?.aboutTitle || "Odontología moderna y profesional para toda la familia."}
          </h2>
          <p className="font-manrope max-w-xl text-base leading-8 text-slate-700 md:text-lg">
            {clinic?.content?.aboutText ||
              "En Dental Cabanillas cuidamos cada detalle para brindar una experiencia dental excepcional. Combinamos calidad profesional, tecnología moderna y una atención humana para que cada paciente se sienta seguro desde la primera evaluación."}
          </p>
          <div className="mt-8 grid max-w-xl gap-4 sm:grid-cols-3">
            {stats.map(({ value, label }, index) => (
              <motion.div
                key={value}
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
                  amount: 0.25,
                }}
                transition={{
                  duration: 0.7,
                  ease: "easeOut",
                  delay: index * 0.08,
                }}
                className="rounded-2xl border border-slate-300/60 bg-gradient-to-br from-blue-50 to-white p-5 transition-all duration-500 hover:border-blue-400 hover:shadow-lg hover:shadow-blue-950/10"
              >
                <h3 className="font-manrope text-2xl font-black text-blue-600 md:text-3xl">{value}</h3>
                <p className="mt-2 text-xs font-bold text-slate-600 md:text-sm">{label}</p>
              </motion.div>
            ))}
          </div>
        </div>
        <motion.div
          className="relative min-w-0"
          initial={{
            opacity: 0,
            x: 30,
          }}
          whileInView={{
            opacity: 1,
            x: 0,
          }}
          viewport={{
            once: true,
            amount: 0.3,
          }}
          transition={{
            duration: 0.9,
            ease: "easeOut",
            delay: 0.1,
          }}
        >
          <div className="absolute -left-8 -top-8 h-40 w-40 rounded-full bg-blue-200 blur-3xl opacity-60" />
          <div className="absolute -bottom-8 -right-8 h-40 w-40 rounded-full bg-cyan-200 blur-3xl opacity-60" />
          <div className="relative overflow-hidden rounded-[2rem] border border-white bg-slate-950 shadow-2xl shadow-slate-900/20">
            <Swiper
              modules={[Autoplay, EffectFade, Pagination]}
              effect="fade"
              speed={1100}
              autoplay={{
                delay: 4200,
                disableOnInteraction: false,
              }}
              onSwiper={(swiper) => setActiveSlideIndex(swiper.realIndex)}
              onSlideChange={(swiper) => setActiveSlideIndex(swiper.realIndex)}
              pagination={{
                clickable: true,
              }}
              className="about-swiper h-[320px] sm:h-[420px] lg:h-[520px]"
            >
              {teamSlides.map((slide) => (
                <SwiperSlide key={slide.alt}>
                  <img
                    src={slide.image}
                    alt={slide.alt}
                    className="h-full w-full object-cover"
                    style={{
                      objectPosition: slide.position,
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/45 via-transparent to-transparent" />
                </SwiperSlide>
              ))}
            </Swiper>
            <div className="absolute bottom-5 left-5 z-10 rounded-full border border-white/20 bg-slate-950/50 px-4 py-2 text-xs font-bold uppercase tracking-[0.18em] text-white backdrop-blur-xl">
              {teamSlides[activeSlideIndex]?.label || teamSlides[0].label}
            </div>
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
}
