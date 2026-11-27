import { inlineSvgIcon } from "./inlineSvgIcon.jsx";
import { clinic } from "../data/clinic.js";

export default function SiteFooter() {
  return (
    <footer className="dental-dark-section px-6 py-12 text-white">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(59,130,246,.1),transparent_60%)] pointer-events-none" />
      <div className="relative z-10 mx-auto grid max-w-7xl gap-10 md:grid-cols-[1.3fr_1fr_1fr_1fr]">
        <div>
          <img src={clinic.logoWhite} alt="Dental Cabanillas" className="h-14 w-auto" />
          <p className="mt-5 max-w-md text-sm leading-7 text-slate-400">
            Clínica dental moderna en Huánuco. Calidad, tecnología y atención personalizada para toda la
            familia.
          </p>
        </div>
        <div>
          <p className="font-bold text-white uppercase tracking-[0.1em] text-xs">Contacto</p>
          <div className="mt-5 space-y-3 text-sm text-slate-400">
            <div className="flex items-start gap-2">
              <span className="text-blue-400 mt-0.5">📍</span>
              <p>{clinic.address}</p>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-blue-400 mt-0.5">
                {inlineSvgIcon({
                  name: "phone",
                  className: "h-4 w-4",
                })}
              </span>
              <p>{clinic.phone}</p>
            </div>
          </div>
        </div>
        <div>
          <p className="font-bold text-white uppercase tracking-[0.1em] text-xs">Horario</p>
          <div className="mt-5 space-y-2 text-sm text-slate-400">
            <p>Lunes - Sábado</p>
            <p className="text-blue-300">8:30 AM - 1:00 PM</p>
            <p className="text-blue-300">3:00 PM - 7:30 PM</p>
          </div>
        </div>
        <div>
          <p className="font-bold text-white uppercase tracking-[0.1em] text-xs">Síguenos</p>
          <div className="mt-5 flex flex-col gap-2">
            <a
              href={clinic.facebook}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 text-sm text-slate-400 hover:text-blue-400 transition-colors duration-300 w-fit"
            >
              <span>
                {inlineSvgIcon({
                  name: "facebook",
                })}
              </span>
              {" Facebook"}
            </a>
            <a
              href={clinic.instagram}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 text-sm text-slate-400 hover:text-pink-400 transition-colors duration-300 w-fit"
            >
              <span>
                {inlineSvgIcon({
                  name: "instagram",
                })}
              </span>
              {" Instagram"}
            </a>
            <a
              href={clinic.tiktok}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 text-sm text-slate-400 hover:text-white transition-colors duration-300 w-fit"
            >
              <span>
                {inlineSvgIcon({
                  name: "tiktok",
                })}
              </span>
              {" TikTok"}
            </a>
          </div>
        </div>
      </div>
      <div className="relative z-10 mx-auto mt-10 max-w-7xl border-t border-white/10 pt-6">
        <p className="text-sm text-slate-500 text-center">
          © 2026 Dental Cabanillas. Todos los derechos reservados.
        </p>
      </div>
    </footer>
  );
}
