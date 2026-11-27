import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { inlineSvgIcon } from "./inlineSvgIcon.jsx";
import { clinic } from "../data/clinic.js";

const contactLinks = [
  {
    label: "WhatsApp",
    href: clinic.whatsapp,
    bg: "from-green-500 to-emerald-600",
    icon: inlineSvgIcon({
      name: "whatsapp",
    }),
  },
  {
    label: "Facebook",
    href: clinic.facebook,
    bg: "from-blue-600 to-sky-600",
    icon: inlineSvgIcon({
      name: "facebook",
    }),
  },
  {
    label: "Instagram",
    href: clinic.instagram,
    bg: "from-indigo-500 to-pink-500",
    icon: inlineSvgIcon({
      name: "instagram",
    }),
  },
  {
    label: "TikTok",
    href: clinic.tiktok,
    bg: "from-black to-slate-800",
    icon: inlineSvgIcon({
      name: "tiktok",
    }),
  },
];

export default function FloatingContact() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const trackScroll = () => setScrolled(window.scrollY > 100);
    window.addEventListener("scroll", trackScroll);
    return () => window.removeEventListener("scroll", trackScroll);
  }, []);
  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end gap-3 sm:bottom-8 sm:right-8">
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{
              opacity: 0,
              scale: 0.92,
              y: 16,
            }}
            animate={{
              opacity: 1,
              scale: 1,
              y: 0,
            }}
            exit={{
              opacity: 0,
              scale: 0.92,
              y: 16,
            }}
            transition={{
              duration: 0.3,
              ease: "easeOut",
            }}
            className="rounded-3xl border border-white/10 bg-white/8 p-4 shadow-xl backdrop-blur-xl"
          >
            <div className="min-w-[240px] flex flex-col gap-3">
              {contactLinks.map((link, index) => (
                <motion.a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noreferrer"
                  initial={{
                    opacity: 0,
                    x: 12,
                  }}
                  animate={{
                    opacity: 1,
                    x: 0,
                  }}
                  transition={{
                    delay: index * 0.05,
                  }}
                  whileHover={{
                    scale: 1.04,
                    x: 4,
                  }}
                  whileTap={{
                    scale: 0.98,
                  }}
                  className={`inline-flex w-full items-center justify-between gap-3 rounded-2xl bg-gradient-to-r ${link.bg} px-4 py-3 text-sm font-semibold text-white shadow-lg transition`}
                >
                  <span className="flex items-center gap-3">
                    <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/15 text-base">
                      {link.icon}
                    </span>
                    {link.label}
                  </span>
                  <span className="text-[10px] uppercase tracking-wider text-white/80">→</span>
                </motion.a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      <motion.button
        type="button"
        onClick={() => setMenuOpen((open) => !open)}
        aria-expanded={menuOpen}
        aria-label="Abrir menú de redes sociales"
        whileHover={{
          scale: 1.08,
        }}
        whileTap={{
          scale: 0.94,
        }}
        animate={{
          y: scrolled ? 0 : [0, -8, 0],
        }}
        transition={{
          y: {
            repeat: scrolled ? 0 : 1 / 0,
            duration: 2,
            ease: "easeInOut",
          },
        }}
        className="inline-flex items-center gap-3 rounded-full border border-blue-400/30 bg-slate-900/95 px-4 py-3 text-sm font-semibold text-white shadow-2xl backdrop-blur-md transition hover:bg-slate-800"
      >
        <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 text-base text-white shadow-md">
          {menuOpen
            ? inlineSvgIcon({
                name: "close",
                className: "h-5 w-5",
              })
            : inlineSvgIcon({
                name: "phone",
                className: "h-5 w-5",
              })}
        </span>
        <span className="hidden sm:inline">Contacto</span>
      </motion.button>
    </div>
  );
}
