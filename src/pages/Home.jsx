import SiteShell from '../components/layout/SiteShell'
import HeroSection from '../components/sections/HeroSection'
import ProjectsSection from '../components/sections/ProjectsSection'
import ServicesSection from '../components/sections/ServicesSection'
import AboutSection from '../components/sections/AboutSection'
import ContactSection from '../components/sections/ContactSection'
import FooterSection from '../components/sections/FooterSection'

function Home() {
  return (
    <SiteShell>
      <main className="space-y-3 p-2 sm:space-y-4 sm:p-3 md:p-4">
        <HeroSection />
        <ProjectsSection />
        <ServicesSection />
        <AboutSection />
        <ContactSection />
        <FooterSection />
      </main>
    </SiteShell>
  )
}

export default Home
