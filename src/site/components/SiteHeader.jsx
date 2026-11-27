import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const defaultNavbarLogo = "/assets/logo-navbar-crop-vllf1U4W.webp";

const navigationLinks = [
  ["Inicio", "#inicio"],
  ["Nosotros", "#about"],
  ["Tratamientos", "#tratamientos"],
  ["Tecnología", "#tecnologia"],
  ["Ambientes", "#ambientes"],
  ["Equipo", "#equipo"],
  ["Contacto", "#contacto"],
];

export default function SiteHeader({ clinic }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeLink, setActiveLink] = useState("#inicio");
  useEffect(() => {
    const trackScroll = () => setScrolled(window.scrollY > 16);
    trackScroll();
    window.addEventListener("scroll", trackScroll);
    return () => window.removeEventListener("scroll", trackScroll);
  }, []);
  useEffect(() => {
    const sectionIds = navigationLinks.map(([, href]) => href.replace("#", ""));
    const updateActiveLink = () => {
      const scrollPosition = window.scrollY + 180;
      let currentLink = "#inicio";
      sectionIds.forEach((sectionId) => {
        const section = document.getElementById(sectionId);
        if (section && section.offsetTop <= scrollPosition) currentLink = `#${sectionId}`;
      });
      setActiveLink(currentLink);
    };
    updateActiveLink();
    window.addEventListener("scroll", updateActiveLink, {
      passive: true,
    });
    window.addEventListener("resize", updateActiveLink);
    return () => {
      window.removeEventListener("scroll", updateActiveLink);
      window.removeEventListener("resize", updateActiveLink);
    };
  }, []);
  return (
    <motion.header
      initial={{
        y: -18,
        opacity: 0,
      }}
      animate={{
        y: 0,
        opacity: 1,
      }}
      transition={{
        duration: 0.45,
        ease: "easeOut",
      }}
      className="fixed left-0 top-0 z-50 w-full px-3 pt-4 sm:px-5 sm:pt-6"
    >
      <div
        className={`mx-auto max-w-7xl rounded-3xl border px-4 py-3 transition-all duration-300 md:px-6 ${scrolled ? "border-blue-200/25 bg-[#050b1d]/96 shadow-2xl shadow-blue-950/30 backdrop-blur-2xl" : "border-blue-200/25 bg-[#070d20]/94 shadow-2xl shadow-blue-950/25 backdrop-blur-2xl"}`}
      >
        <div className="flex items-center justify-between gap-4">
          <a href="#inicio" className="flex min-w-0 items-center gap-3" onClick={() => setMenuOpen(false)}>
            <img
              src={clinic?.images?.logoNavbar || clinic?.logoNavbar || defaultNavbarLogo}
              alt={clinic?.name || "Dental Cabanillas"}
              className="h-14 w-auto object-contain md:h-16"
            />
          </a>
          <nav className="hidden items-center gap-1 rounded-full border border-white/8 bg-white/10 p-1 text-sm font-bold text-white shadow-inner shadow-white/5 lg:flex">
            {navigationLinks.map(([label, href]) => (
              <a
                key={label}
                href={href}
                onClick={() => setActiveLink(href)}
                className={`rounded-full px-4 py-2.5 transition-all duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-300 ${activeLink === href ? "bg-gradient-to-r from-blue-600 to-cyan-500 text-white shadow-lg shadow-blue-500/25 ring-1 ring-cyan-200/30" : "text-white/92 hover:bg-white hover:text-slate-950"}`}
              >
                {label}
              </a>
            ))}
          </nav>
          <div className="flex items-center gap-2">
            <a
              href={clinic.whatsapp}
              target="_blank"
              rel="noreferrer"
              className="hidden rounded-full bg-gradient-to-r from-emerald-500 to-green-600 px-7 py-3 text-sm font-extrabold text-white shadow-xl shadow-emerald-500/35 ring-1 ring-emerald-300/20 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-emerald-500/50 sm:inline-flex"
            >
              Whatsapp
            </a>
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Abrir menú"
              className="rounded-full border border-white/30 bg-white/14 px-4 py-3 text-sm font-extrabold text-white shadow-lg transition-all duration-300 hover:bg-white hover:text-slate-950 lg:hidden"
            >
              {menuOpen ? "✕" : "☰"}
            </button>
          </div>
        </div>
        {menuOpen && (
          <nav className="mt-4 grid gap-2 border-t border-white/15 pt-4 text-white lg:hidden">
            {navigationLinks.map(([label, href], index) => (
              <a
                key={label}
                href={href}
                onClick={() => {
                  setActiveLink(href);
                  setMenuOpen(false);
                }}
                className={`rounded-2xl px-4 py-3 text-sm font-bold transition-all duration-300 ${activeLink === href ? "bg-blue-600 text-white shadow-lg shadow-blue-500/25" : "bg-white/8 text-white hover:bg-white hover:text-slate-950"}`}
                style={{
                  animation: `fadeInUp 0.25s ease-out ${index * 0.04}s both`,
                }}
              >
                {label}
              </a>
            ))}
            <a
              href={clinic.whatsapp}
              target="_blank"
              rel="noreferrer"
              className="mt-1 rounded-2xl bg-gradient-to-r from-emerald-500 to-green-600 px-4 py-3 text-center text-sm font-extrabold text-white shadow-lg shadow-emerald-500/30"
            >
              Reservar por WhatsApp
            </a>
          </nav>
        )}
      </div>
    </motion.header>
  );
}
