import { HeroSection } from "@/components/hero/HeroSection";
import { AboutMeSection } from "@/components/about/AboutMeSection";
import { PortfolioShowcase } from "@/components/showcase/PortfolioShowcase";
import { ExperienceSection } from "@/components/sections/ExperienceSection";
import { ContactSection } from "@/components/contact/ContactSection";
import { AmbientAtmosphere } from "@/components/background/AmbientAtmosphere";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { WelcomeSplash } from "@/components/intro/WelcomeSplash";
import { SectionSlide } from "@/components/ui/SectionSlide";
import { SectionDivider } from "@/components/ui/SectionDivider";

export default function Home() {
  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-lg focus:bg-purple-600 focus:p-3 focus:text-white"
      >
        Langsung ke konten
      </a>

      {/* Cinematic Welcome Splash (replicating intro in reference video) */}
      <WelcomeSplash />

      <div className="relative min-h-screen bg-[#030014] text-slate-100 overflow-x-hidden">
        {/* Floating Glass Pill Navbar */}
        <SiteHeader />

        <main id="main">
          <div className="relative isolate">
            <AmbientAtmosphere />
            <div className="relative z-10">
              <HeroSection />

              <SectionDivider label="✦ 01 / ARSITEKTUR & PROFIL" accentColor="purple" />

              <SectionSlide>
                <AboutMeSection />
              </SectionSlide>

              <SectionDivider label="✦ 02 / REKAYASA & KARYA TERUJI" accentColor="cyan" />

              <SectionSlide>
                <PortfolioShowcase />
              </SectionSlide>

              <SectionDivider label="✦ 03 / REKAM JEJAK ENTERPRISE" accentColor="purple" />

              <SectionSlide>
                <ExperienceSection />
              </SectionSlide>

              <SectionDivider label="✦ 04 / HUBUNGI & KONSULTASI" accentColor="emerald" />

              <SectionSlide>
                <ContactSection />
              </SectionSlide>
            </div>
          </div>
        </main>

        <SiteFooter />
      </div>
    </>
  );
}
