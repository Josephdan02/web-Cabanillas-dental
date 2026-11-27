import { useEffect, useState } from "react";
import AboutSection from "./components/AboutSection.jsx";
import ContactSection from "./components/ContactSection.jsx";
import EnvironmentsSection from "./components/EnvironmentsSection.jsx";
import FloatingContact from "./components/FloatingContact.jsx";
import HeroSection from "./components/HeroSection.jsx";
import SiteFooter from "./components/SiteFooter.jsx";
import SiteHeader from "./components/SiteHeader.jsx";
import TeamSection from "./components/TeamSection.jsx";
import TechnologySection from "./components/TechnologySection.jsx";
import TreatmentsSection from "./components/TreatmentsSection.jsx";
import VideoGallerySection from "./components/VideoGallerySection.jsx";
import { FALLBACK_PAGE_CONTENT, loadPageContent } from "./services/content.js";

const sectionIds = ["inicio", "about", "tratamientos", "tecnologia", "ambientes", "equipo", "contacto"];

export default function App() {
  const [content, setContent] = useState(FALLBACK_PAGE_CONTENT);
  const [activeSection, setActiveSection] = useState("inicio");

  useEffect(() => {
    let active = true;

    loadPageContent()
      .then((cmsContent) => {
        if (active) setContent(cmsContent);
      })
      .catch((error) => {
        console.error("[page content] Could not initialize CMS content; keeping local JSON backups.", error);
      });

    return () => {
      active = false;
    };
  }, []);

  useEffect(() => {
    const sections = sectionIds
      .map((id) => document.getElementById(id))
      .filter(Boolean);

    if (!("IntersectionObserver" in window) || !sections.length) return undefined;

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleSections = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visibleSections[0]) setActiveSection(visibleSections[0].target.id);
      },
      {
        rootMargin: "-25% 0px -58% 0px",
        threshold: [0, 0.15, 0.35, 0.6]
      }
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  const technology = content.gallery.filter((item) => item.category === "tecnologia");

  return (
    <>
      <a className="skip-link" href="#main-content">Saltar al contenido</a>
      <SiteHeader clinic={content.clinic} activeSection={activeSection} />
      <main id="main-content">
        <HeroSection clinic={content.clinic} />
        <AboutSection clinic={content.clinic} />
        <TreatmentsSection clinic={content.clinic} treatments={content.treatments} />
        <TechnologySection items={technology} />
        <VideoGallerySection clinic={content.clinic} videos={content.videos} />
        <EnvironmentsSection items={content.gallery} />
        <TeamSection clinic={content.clinic} professionals={content.professionals} />
        <ContactSection clinic={content.clinic} />
      </main>
      <SiteFooter clinic={content.clinic} />
      <FloatingContact clinic={content.clinic} />
    </>
  );
}
