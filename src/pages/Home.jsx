import { lazy, Suspense, useEffect, useRef, useState } from 'react'
import { useLocation } from 'react-router-dom'
import SiteShell from '../components/layout/SiteShell'
import HeroSection from '../components/sections/HeroSection'
import SEO from '../components/shared/SEO'
import { PersonSchema, WebSiteSchema } from '../components/shared/SchemaOrg'
import { useLang } from '../context/LangContext'

const ProjectsSection = lazy(() => import('../components/sections/ProjectsSection'))
const ServicesSection = lazy(() => import('../components/sections/ServicesSection'))
const AboutSection = lazy(() => import('../components/sections/AboutSection'))
const Footer = lazy(() => import('../components/layout/Footer'))

const SEO_COPY = {
  en: {
    title: 'Anka Ljusic - Digital Designer | Brand, Web & UI Design',
    description:
      'Anka Ljusic is a digital designer based in Belgrade, specializing in brand identity, web & product UI, and marketing visuals. Available for freelance projects worldwide.',
  },
  sr: {
    title: 'Anka Ljusić - Digitalni dizajner | Brand, web i UI dizajn',
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
    let attempts = 0
    let timeoutId

    const scrollToSection = () => {
      const targetElement = document.getElementById(targetId)
      if (targetElement) {
        targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' })
        return
      }

      attempts += 1
      if (attempts < 20) {
        timeoutId = setTimeout(scrollToSection, 75)
      }
    }

    timeoutId = setTimeout(scrollToSection, 50)
    return () => {
      clearTimeout(timeoutId)
    }
  }, [hash])

  return (
    <>
      <SEO title={null} description={copy.description} url="/" />
      <PersonSchema />
      <WebSiteSchema />
      <SiteShell>
        <main>
          <HeroSection />
          <LazyVisibleSection
            id="projects"
            forceLoad={hash === '#projects'}
            placeholderClassName="min-h-[900px]"
            rootMargin="500px 0px"
          >
            <Suspense fallback={<SectionPlaceholder />}>
              <ProjectsSection />
            </Suspense>
          </LazyVisibleSection>
          <LazyVisibleSection
            id="services"
            forceLoad={hash === '#services'}
            placeholderClassName="min-h-[760px]"
          >
            <Suspense fallback={<SectionPlaceholder />}>
              <ServicesSection />
            </Suspense>
          </LazyVisibleSection>
          <LazyVisibleSection
            id="about"
            forceLoad={hash === '#about'}
            placeholderClassName="min-h-[1100px]"
          >
            <Suspense fallback={<SectionPlaceholder />}>
              <AboutSection />
            </Suspense>
          </LazyVisibleSection>
          <LazyVisibleSection placeholderClassName="min-h-[520px]">
            <Suspense fallback={null}>
              <Footer />
            </Suspense>
          </LazyVisibleSection>
        </main>
      </SiteShell>
    </>
  )
}

export default Home

function LazyVisibleSection({
  id,
  forceLoad = false,
  children,
  placeholderClassName = 'min-h-24',
  rootMargin = '300px 0px',
}) {
  const [shouldRender, setShouldRender] = useState(forceLoad)
  const ref = useRef(null)
  const isRendered = forceLoad || shouldRender

  useEffect(() => {
    if (forceLoad) {
      return undefined
    }

    const element = ref.current
    if (!element) return undefined

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShouldRender(true)
          observer.disconnect()
        }
      },
      { rootMargin },
    )

    observer.observe(element)
    return () => observer.disconnect()
  }, [forceLoad, rootMargin])

  if (isRendered) return children

  return <section ref={ref} id={id} className={`${placeholderClassName} bg-brand-paper`} aria-hidden="true" />
}

function SectionPlaceholder() {
  return <section className="min-h-24 bg-brand-paper" aria-hidden="true" />
}
