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

export default function App() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#f8f5ef] to-white text-slate-950">
      <SiteHeader />
      <HeroSection />
      <AboutSection />
      <BenefitsSection />
      <TreatmentsSection />
      <TechnologySection />
      <VideoGallerySection />
      <EnvironmentsSection />
      <TeamSection />
      <ContactSection />
      <SiteFooter />
      <FloatingContact />
    </div>
  );
}
