import AboutSection from "./components/AboutSection.jsx";
import BenefitsSection from "./components/BenefitsSection.jsx";
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
import { ContentProvider, useContent } from "./content/ContentProvider.jsx";

/**
 * Toda la información de la clínica proviene del CMS a través de `useContent()`.
 * Los beneficios se administran en clinic.json; los videos se leen de videos.json.
 */
function SiteContent() {
  const { clinic, treatments, professionals, gallery, videos } = useContent();
  const safeGallery = Array.isArray(gallery) ? gallery : [];
  const environments = safeGallery.filter((item) => item.category === "ambientes");
  const technology = safeGallery.filter((item) => item.category === "tecnologia");

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#f8f5ef] to-white text-slate-950">
      <SiteHeader clinic={clinic} />
      <HeroSection clinic={clinic} />
      <AboutSection clinic={clinic} />
      <BenefitsSection clinic={clinic} />
      <TreatmentsSection treatments={Array.isArray(treatments) ? treatments : []} />
      <TechnologySection items={technology} />
      <VideoGallerySection videos={Array.isArray(videos) ? videos : []} />
      <EnvironmentsSection items={environments} />
      <TeamSection clinic={clinic} professionals={Array.isArray(professionals) ? professionals : []} />
      <ContactSection clinic={clinic} />
      <SiteFooter clinic={clinic} />
      <FloatingContact clinic={clinic} />
    </div>
  );
}

export default function App() {
  return (
    <ContentProvider>
      <SiteContent />
    </ContentProvider>
  );
}
