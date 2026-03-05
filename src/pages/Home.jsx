import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import SiteShell from '../components/layout/SiteShell'
import HeroSection from '../components/sections/HeroSection'
import ProjectsSection from '../components/sections/ProjectsSection'
import ServicesSection from '../components/sections/ServicesSection'
import AboutSection from '../components/sections/AboutSection'
import ContactSection from '../components/sections/ContactSection'
import FooterSection from '../components/sections/FooterSection'

function Home() {
  const { hash } = useLocation()

  useEffect(() => {
    if (!hash) return

    const targetId = hash.replace('#', '')
    const scrollToSection = () => {
      const targetElement = document.getElementById(targetId)
      if (targetElement) {
        targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }
    }

    // Wait for layout/sections to mount before scrolling.
    const timeoutId = setTimeout(scrollToSection, 50)
    return () => clearTimeout(timeoutId)
  }, [hash])

  return (
    <SiteShell>
      <main className="">
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
