import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import SiteShell from '../components/layout/SiteShell'
import HeroSection from '../components/sections/HeroSection'
import ProjectsSection from '../components/sections/ProjectsSection'
import ServicesSection from '../components/sections/ServicesSection'
import AboutSection from '../components/sections/AboutSection'
import Footer from '../components/layout/Footer'
import SEO from '../components/shared/SEO'
import { PersonSchema, WebSiteSchema } from '../components/shared/SchemaOrg'
import { useLang } from '../context/LangContext'

const SEO_COPY = {
  en: {
    title: 'Anka Ljusic — Digital Designer | Brand, Web & UI Design',
    description:
      'Anka Ljusic is a digital designer based in Belgrade, specializing in brand identity, web & product UI, and marketing visuals. Available for freelance projects worldwide.',
  },
  sr: {
    title: 'Anka Ljusić — Digitalni dizajner | Brand, web i UI dizajn',
    description:
      'Anka Ljusić je digitalni dizajner iz Beograda. Specijalizovana za brand identitet, web i UI dizajn i marketing materijale. Dostupna za projekte širom sveta.',
  },
}

function Home() {
  const { hash } = useLocation()
  const { lang } = useLang()
  const copy = SEO_COPY[lang] || SEO_COPY.en

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
    <>
      <SEO title={null} description={copy.description} url="/" />
      <PersonSchema />
      <WebSiteSchema />
      <SiteShell>
        <main>
          <HeroSection />
          <ProjectsSection />
          <ServicesSection />
          <AboutSection />
          <Footer />
        </main>
      </SiteShell>
    </>
  )
}

export default Home
