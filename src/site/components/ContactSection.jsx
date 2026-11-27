import { clinic } from "../data/clinic.js";

export default function ContactSection() {
  const mapEmbedUrl = `https://www.google.com/maps?q=${encodeURIComponent(clinic.address + ", Huánuco, Perú")}&output=embed`;
  return (
    <section id="contacto" className="dental-light-section px-6 py-24 text-slate-950 md:py-32">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_10%,rgba(59,130,246,.10),transparent_35%),radial-gradient(circle_at_80%_90%,rgba(14,165,233,.10),transparent_35%)] pointer-events-none" />
      <div className="relative z-10 mx-auto max-w-7xl">
        <div className="mx-auto mb-14 max-w-3xl text-center">
          <p className="mb-4 inline-flex rounded-full border border-blue-200 bg-blue-50 px-5 py-2 text-xs font-extrabold uppercase tracking-[0.22em] text-blue-700">
            Cómo llegar
          </p>
          <h2 className="text-4xl font-black leading-tight tracking-tight md:text-6xl">
            {"Encuéntranos "}
            <span className="text-blue-600">fácilmente</span>
          </h2>
          <p className="mt-5 text-base leading-8 text-slate-600 md:text-lg">
            Estamos en una zona accesible de Huánuco. Puedes abrir la ruta en Google Maps o escribirnos
            directamente por WhatsApp.
          </p>
        </div>
        <div className="grid gap-8 lg:grid-cols-[0.82fr_1.18fr] lg:items-stretch">
          <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-2xl shadow-slate-900/10 md:p-8">
            <div className="space-y-4">
              <div className="rounded-3xl bg-blue-50 p-5">
                <p className="text-xs font-extrabold uppercase tracking-[0.18em] text-blue-700">Dirección</p>
                <p className="mt-2 text-xl font-black text-slate-950">{clinic.address}</p>
              </div>
              <div className="rounded-3xl bg-slate-50 p-5">
                <p className="text-xs font-extrabold uppercase tracking-[0.18em] text-blue-700">Horario</p>
                <p className="mt-2 text-base font-bold text-slate-800">Lunes a Sábado</p>
                <p className="text-slate-600">8:30 AM - 1:00 PM / 3:00 PM - 7:30 PM</p>
              </div>
              <div className="rounded-3xl bg-slate-50 p-5">
                <p className="text-xs font-extrabold uppercase tracking-[0.18em] text-blue-700">WhatsApp</p>
                <p className="mt-2 text-xl font-black text-slate-950">{clinic.phone}</p>
              </div>
            </div>
            <div className="mt-7 grid gap-3">
              <a
                href={clinic.whatsapp}
                target="_blank"
                rel="noreferrer"
                className="rounded-full bg-gradient-to-r from-emerald-500 to-green-600 px-7 py-4 text-center text-base font-extrabold text-white shadow-xl shadow-emerald-500/25 transition-all duration-300 hover:-translate-y-1"
              >
                Contactar por WhatsApp
              </a>
              <a
                href="https://maps.app.goo.gl/nDwvGHE5unogBmuo7"
                target="_blank"
                rel="noreferrer"
                className="rounded-full border border-blue-200 bg-white px-7 py-4 text-center text-base font-extrabold text-blue-700 transition-all duration-300 hover:border-blue-600 hover:bg-blue-600 hover:text-white"
              >
                Abrir ruta en Google Maps
              </a>
            </div>
            <div className="mt-7 flex flex-wrap gap-3">
              <a
                href={clinic.facebook}
                target="_blank"
                rel="noreferrer"
                className="rounded-full bg-slate-100 px-5 py-3 text-sm font-extrabold text-slate-800 hover:bg-blue-600 hover:text-white"
              >
                Facebook
              </a>
              <a
                href={clinic.instagram}
                target="_blank"
                rel="noreferrer"
                className="rounded-full bg-slate-100 px-5 py-3 text-sm font-extrabold text-slate-800 hover:bg-blue-600 hover:text-white"
              >
                Instagram
              </a>
              <a
                href={clinic.tiktok}
                target="_blank"
                rel="noreferrer"
                className="rounded-full bg-slate-100 px-5 py-3 text-sm font-extrabold text-slate-800 hover:bg-blue-600 hover:text-white"
              >
                TikTok
              </a>
            </div>
          </div>
          <div className="overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-2xl shadow-slate-900/12">
            <iframe
              title="Ubicación Dental Cabanillas en Google Maps"
              src={mapEmbedUrl}
              className="h-[460px] w-full border-0 md:h-[620px]"
              loading="lazy"
              allowFullScreen
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
