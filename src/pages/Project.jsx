import { useEffect, useRef } from 'react'
import { Link, Navigate, useParams } from 'react-router-dom'
import CircleArrowButton from '../components/ui/CircleArrowButton'
import Footer from '../components/layout/Footer'
import Navbar from '../components/layout/Navbar'
import useProjectsContent from '../hooks/useProjectsContent'
import navArrow from '../assets/images/arrows/Nav bar.svg'
import navArrowHover from '../assets/images/arrows/Nav bar HOVER.svg'

const DEFAULT_OVERVIEW =
  'Designed the advertiser analytics dashboard for the House of Summary platform, focusing on clear data hierarchy and scannable performance insights. Structured key metrics such as clicks, views, CPC, audience demographics, and geographic data into modular components, enabling advertisers to quickly understand campaign performance and identify trends.'

function Project() {
  const { slug } = useParams()
  const { loading, data: projects } = useProjectsContent()

  const project = projects.find((item) => item.slug === slug)
  const relatedProjects = projects.filter((item) => item.slug !== slug).slice(0, 2)

  const galleryRef = useRef(null)

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' })
  }, [slug])

  useEffect(() => {
    const handleWheel = (e) => {
      if (window.innerWidth < 1024) return

      const gallery = galleryRef.current
      if (!gallery) return

      const rect = gallery.getBoundingClientRect()
      if (rect.top >= window.innerHeight || rect.bottom <= 0) return

      const { scrollTop, scrollHeight, clientHeight } = gallery
      const atBottom = scrollTop + clientHeight >= scrollHeight - 2
      const atTop = scrollTop <= 0

      if ((e.deltaY > 0 && !atBottom) || (e.deltaY < 0 && !atTop)) {
        e.preventDefault()
        gallery.scrollBy({ top: e.deltaY })
      }
    }

    window.addEventListener('wheel', handleWheel, { passive: false })
    return () => window.removeEventListener('wheel', handleWheel)
  }, [])

  if (!project && loading) {
    return <main className="min-h-screen bg-brand-charcoal" />
  }

  if (!project) {
    return <Navigate to="/" replace />
  }

  const overview = project.overview || DEFAULT_OVERVIEW
  const year = project.year || '2026'
  const location = project.location || 'Remote'
  const duration = project.duration || '3 weeks'
  const stack = project.stack || 'Figma'
  const services = Array.isArray(project.services) && project.services.length > 0
    ? project.services
    : ['UI Design', 'Dashboard Design', 'Data Visualization']

  const galleryImages = Array.isArray(project.galleryImages) && project.galleryImages.length > 0
    ? project.galleryImages
    : [project.image, project.image, project.image]

  return (
    <main className="min-h-screen overflow-x-clip bg-brand-charcoal text-white">
      <section className="w-full overflow-x-clip px-4 pt-6 sm:px-8">
        <div className="mx-auto w-full max-w-[1920px]">
          <Navbar hideLanguageSwitch />

          <div className="mt-28 sm:hidden">
            <div className="project-title-marquee" aria-label={project.client}>
              <div className="project-title-track">
                <span aria-hidden="true" className="whitespace-nowrap pr-16 font-display text-[80px] font-medium leading-[1.03] tracking-[-0.03em]">{project.client}</span>
                <span aria-hidden="true" className="whitespace-nowrap pr-16 font-display text-[80px] font-medium leading-[1.03] tracking-[-0.03em]">{project.client}</span>
              </div>
            </div>

            <div className="mt-8 space-y-6">
              <div>
                <p className="text-sm font-light leading-[1.22] text-brand-accent">overview</p>
                <p className="mt-2 text-base leading-[1.4]">{overview}</p>
              </div>
              <div>
                <p className="text-sm font-light leading-[1.22] text-brand-accent">client</p>
                <p className="mt-1 text-base leading-[1.22]">{project.client}</p>
              </div>
              <div>
                <p className="text-sm font-light leading-[1.22] text-brand-accent">services</p>
                <p className="mt-1 text-base leading-[1.25]">{services.join(', ')}</p>
              </div>
              <div>
                <p className="text-sm font-light leading-[1.22] text-brand-accent">stack</p>
                <p className="mt-1 text-base leading-[1.25]">{stack}</p>
              </div>
              <div>
                <p className="text-sm font-light leading-[1.22] text-brand-accent">duration</p>
                <p className="mt-1 text-base leading-[1.22]">{duration}</p>
              </div>
              <div>
                <p className="text-sm font-light leading-[1.22] text-brand-accent">location</p>
                <p className="mt-1 text-base leading-[1.22]">{location}</p>
              </div>
              <div>
                <p className="text-sm font-light leading-[1.22] text-brand-accent">year</p>
                <p className="mt-1 text-base leading-[1.22]">{year}</p>
              </div>
            </div>

            <div className="mt-8 space-y-[13px]">
              {galleryImages.map((image, index) => (
                <div key={`${project.slug}-gallery-mobile-${index}`}>
                  <img
                    src={image}
                    alt={`${project.title} screen ${index + 1}`}
                    loading="lazy"
                    decoding="async"
                    className={`w-full h-auto block ${index === 0 ? 'rounded-b-[15px]' : 'rounded-[15px]'}`}
                  />
                </div>
              ))}
            </div>
          </div>

          <div className="mt-[100px] lg:mt-[150px] xl:mt-[168px] hidden sm:block pb-24 lg:ml-[32px] xl:ml-[64px] lg:mr-[16px] xl:mr-[-8px]">
            <h1 className="max-w-full font-display text-[80px] md:text-[120px] lg:text-[160px] xl:text-[200px] font-medium leading-[1.16] tracking-[-0.04em] xl:tracking-[-16px]">
              {project.client}
            </h1>

            <div className="mt-12 lg:mt-[16px] xl:mt-[26px] flex flex-col lg:flex-row gap-12 lg:gap-[64px] xl:gap-[96px] items-start">
              <div className="w-full lg:w-[360px] xl:w-[441px] shrink-0 lg:sticky lg:top-[120px] pt-0 lg:pt-[67px]">
                <div className="mb-12 xl:mb-[87px]">
                  <p className="text-base xl:text-[19px] font-light leading-[1.22] text-brand-accent">overview</p>
                  <p className="mt-4 xl:mt-[19px] text-lg xl:text-[21px] leading-[1.4] text-white lg:pr-0">
                    {overview}
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-x-6 gap-y-10 xl:gap-x-9 xl:gap-y-[87px]">
                  <div>
                    <p className="text-base xl:text-[19px] font-light leading-[1.22] text-brand-accent">client</p>
                    <p className="mt-2 xl:mt-0 text-lg xl:text-[21px] leading-[1.22] text-white break-words">{project.client}</p>
                  </div>
                  <div>
                    <p className="text-base xl:text-[19px] font-light leading-[1.22] text-brand-accent">year</p>
                    <p className="mt-2 xl:mt-0 text-lg xl:text-[21px] leading-[1.22] text-white">{year}</p>
                  </div>
                  <div>
                    <p className="text-base xl:text-[19px] font-light leading-[1.22] text-brand-accent">location</p>
                    <p className="mt-2 xl:mt-0 text-lg xl:text-[21px] leading-[1.22] text-white">{location}</p>
                  </div>
                  <div>
                    <p className="text-base xl:text-[19px] font-light leading-[1.22] text-brand-accent">duration</p>
                    <p className="mt-2 xl:mt-0 text-lg xl:text-[21px] leading-[1.22] text-white">{duration}</p>
                  </div>
                  <div>
                    <p className="text-base xl:text-[19px] font-light leading-[1.22] text-brand-accent">stack</p>
                    <p className="mt-2 xl:mt-0 text-lg xl:text-[21px] leading-[1.25] text-white break-words">{stack}</p>
                  </div>
                  <div>
                    <p className="text-base xl:text-[19px] font-light leading-[1.22] text-brand-accent">services</p>
                    <p className="mt-2 xl:mt-0 text-lg xl:text-[21px] leading-[1.25] text-white break-words">
                      {services.map((service, index) => (
                        <span key={`${project.slug}-service-desktop-${index}`}>
                          {service}
                          {index < services.length - 1 ? <br /> : null}
                        </span>
                      ))}
                    </p>
                  </div>
                </div>
              </div>

              <div ref={galleryRef} className="flex-1 w-full min-w-0 flex flex-col gap-[13px] lg:h-[calc(100vh-140px)] overflow-y-auto no-scrollbar lg:sticky lg:top-[120px]">
                {galleryImages.map((image, index) => (
                  <div key={`${project.slug}-gallery-desktop-${index}`} className="w-full shrink-0 bg-brand-charcoal">
                    <img
                      src={image}
                      alt={`${project.title} screen ${index + 1}`}
                      loading="lazy"
                      decoding="async"
                      className={`w-full h-auto block ${index === 0 ? 'rounded-b-[20px]' : 'rounded-[20px]'}`}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="w-full overflow-x-clip px-4 pb-14 pt-16 sm:px-8">
        <div className="mx-auto w-full max-w-[1920px]">
          <div className="lg:ml-[32px] xl:ml-[64px] max-w-[900px]">
            <h2 className="text-4xl sm:text-5xl font-medium tracking-tight">More projects like this</h2>
            <div className="mt-8 grid grid-cols-2 gap-3 md:gap-6">
              {relatedProjects.map((item) => (
                <Link
                  key={item.id}
                  to={`/projects/${item.slug}`}
                  className="group/project block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent"
                >
                  <div className="relative overflow-hidden rounded-[10px]">
                    <img
                      src={item.image}
                      alt={`${item.title} preview`}
                      loading="lazy"
                      decoding="async"
                      className="h-[160px] w-full object-cover transition-transform duration-500 ease-premium group-hover/project:scale-[1.03] sm:h-[300px]"
                    />
                    <div className="pointer-events-none absolute inset-0 bg-brand-ink/45 opacity-0 transition-opacity duration-300 ease-premium group-hover/project:opacity-100" />
                    <div className="pointer-events-none absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-300 ease-premium group-hover/project:opacity-100">
                      <span className="pointer-events-auto">
                        <CircleArrowButton
                          className="group !h-16 !w-16"
                          iconClassName="!h-5 !w-5"
                          iconSrc={navArrow}
                          iconHoverSrc={navArrowHover}
                          centerFillOnHover
                          fillClassName="!-inset-px group-hover:scale-110"
                        />
                      </span>
                    </div>
                    <p className="pointer-events-none absolute bottom-3 left-3 rounded-[3px] bg-white/10 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.08em] text-white backdrop-blur-sm transition-opacity duration-300 ease-premium sm:opacity-0 sm:group-hover/project:opacity-100">
                      {item.role}
                    </p>
                  </div>
                  <div className="mt-2 sm:mt-3">
                    <p className="text-sm font-semibold text-white sm:text-xl">{item.title}</p>
                    <p className="mt-0.5 text-xs font-medium text-white/50 sm:text-base">{item.client}</p>
                  </div>
                </Link>
              ))}
            </div>

            <Link
              to="/projects"
              className="group mt-8 inline-flex items-center gap-2.5 sm:hidden"
            >
              <span className="text-base font-medium">See all projects</span>
              <CircleArrowButton
                iconSrc={navArrow}
                iconHoverSrc={navArrowHover}
                centerFillOnHover
                fillColorClass="bg-brand-ink"
                className="!h-8 !w-8"
              />
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}

export default Project
