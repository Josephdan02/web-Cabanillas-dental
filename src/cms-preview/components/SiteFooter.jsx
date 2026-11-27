export default function SiteFooter({ clinic }) {
  return (
    <footer className="site-footer">
      <div className="page-container">
        <div className="footer-main">
          <div className="footer-clinic">
            <a className="footer-brand" href="#inicio">
              <img src={clinic.images.logoWhite} alt={clinic.name} loading="lazy" />
            </a>
            <p>{clinic.content.footerText}</p>
          </div>
          <div className="footer-column">
            <h2>Contacto</h2>
            <span>⌖ {clinic.address}</span>
            <a href={`tel:${clinic.phoneRaw}`}>{clinic.phoneDisplay}</a>
          </div>
          <div className="footer-column">
            <h2>Horario</h2>
            <span>{clinic.hours.days}</span>
            <span>{clinic.hours.morning}</span>
            <span>{clinic.hours.afternoon}</span>
          </div>
          <div className="footer-column footer-follow">
            <h2>Síguenos</h2>
          <div className="footer-socials" aria-label="Redes sociales">
            {Object.entries(clinic.social).map(([name, href]) => (
              <a href={href} target="_blank" rel="noopener noreferrer" aria-label={name} key={name}>
                {name}
              </a>
            ))}
          </div>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} {clinic.name}. Todos los derechos reservados.</span>
          <a href="#inicio">Volver arriba ↑</a>
        </div>
      </div>
    </footer>
  );
}
