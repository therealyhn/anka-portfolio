import { useEffect, useRef } from 'react'
import { Link, Navigate, useParams } from 'react-router-dom'
import CircleArrowButton from '../components/ui/CircleArrowButton'
import Footer from '../components/layout/Footer'
import Navbar from '../components/layout/Navbar'
import useProjectsContent from '../hooks/useProjectsContent'
import useTranslation from '../hooks/useTranslation'
import { useLang } from '../context/LangContext'
import navArrow from '../assets/images/arrows/Nav bar.svg'
import navArrowHover from '../assets/images/arrows/Nav bar HOVER.svg'
import SEO from '../components/shared/SEO'
import { ProjectSchema, BreadcrumbSchema } from '../components/shared/SchemaOrg'

const DEFAULT_OVERVIEW =
  'Designed the advertiser analytics dashboard for the House of Summary platform, focusing on clear data hierarchy and scannable performance insights. Structured key metrics such as clicks, views, CPC, audience demographics, and geographic data into modular components, enabling advertisers to quickly understand campaign performance and identify trends.'

function Project() {
  const { slug } = useParams()
  const { loading, data: projects } = useProjectsContent()
  const { t } = useTranslation()
  const { lang } = useLang()

  const sr = (en, srVal) => lang === 'sr' ? (srVal || en) : en

  const project = projects.find((item) => item.slug === slug)
  const relatedProjects = projects.filter((item) => item.slug !== slug).slice(0, 2)

  const mobileGalleryRef = useRef(null)

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' })

    requestAnimationFrame(() => {
      if (mobileGalleryRef.current) {
        mobileGalleryRef.current.scrollTop = 0
      }
    })
  }, [slug])


  if (!project && loading) {
    return <main className="min-h-screen bg-brand-charcoal" />
  }

  if (!project) {
    return <Navigate to="/" replace />
  }

  const projectTitle = sr(project.title, project.title_sr) || project.title
  const projectClient = sr(project.client, project.client_sr) || project.client
  const overview = sr(project.overview, project.overview_sr) || t('project.fallback.overview') || DEFAULT_OVERVIEW
  const year = project.year || t('project.fallback.year')
  const location = sr(project.location, project.location_sr) || t('project.fallback.location')
  const duration = sr(project.duration, project.duration_sr) || t('project.fallback.duration')
  const stack = sr(project.stack, project.stack_sr) || t('project.fallback.stack')
  const localizedServices = lang === 'sr' ? project.services_sr : project.services
  const services = Array.isArray(localizedServices) && localizedServices.length > 0
    ? localizedServices
    : [
        t('project.fallback.service.ui'),
        t('project.fallback.service.dashboard'),
        t('project.fallback.service.data'),
      ]
  const galleryAltLabel = lang === 'sr' ? 'prikaz' : 'screen'
  const previewAltLabel = lang === 'sr' ? 'pregled' : 'preview'

  const galleryImages = Array.isArray(project.galleryImages) && project.galleryImages.length > 0
    ? project.galleryImages
    : [project.image, project.image, project.image]

  const seoDescription = overview
    ? overview.slice(0, 155).trimEnd() + (overview.length > 155 ? '…' : '')
    : `${projectClient} project by Anka Ljusic - digital designer based in Belgrade.`

  return (
    <>
      <SEO
        title={`${projectClient} - ${projectTitle}`}
        description={seoDescription}
        image={project.image}
        url={`/projects/${project.slug}`}
        type="article"
      />
      <ProjectSchema
        title={projectTitle}
        client={projectClient}
        description={seoDescription}
        image={project.image}
        slug={project.slug}
      />
      <BreadcrumbSchema
        items={[
          { name: 'Home', url: '/' },
          { name: projectClient, url: `/projects/${project.slug}` },
        ]}
      />
    <main className="min-h-screen overflow-x-clip bg-brand-charcoal text-white">
      <section className="w-full overflow-x-clip px-4 sm:px-8">
        <div className="mx-auto w-full max-w-[1920px]">
          <Navbar hideLanguageSwitch />

          <div className="mt-20 sm:hidden">
            <div className="project-title-marquee" aria-label={projectClient}>
              <div className="project-title-track">
                <span aria-hidden="true" className="whitespace-nowrap pr-16 font-display text-[80px] font-medium leading-[1.03] tracking-[-0.03em]">{projectClient}</span>
                <span aria-hidden="true" className="whitespace-nowrap pr-16 font-display text-[80px] font-medium leading-[1.03] tracking-[-0.03em]">{projectClient}</span>
              </div>
            </div>

            <div className="mt-8 space-y-6">
              <div>
                <p className="text-sm font-light leading-[1.22] text-brand-accent">{t('project.meta.overview')}</p>
                <p className="mt-2 text-base leading-[1.4]">{overview}</p>
              </div>
              <div>
                <p className="text-sm font-light leading-[1.22] text-brand-accent">{t('project.meta.client')}</p>
                <p className="mt-1 text-base leading-[1.22]">{projectClient}</p>
              </div>
              <div>
                <p className="text-sm font-light leading-[1.22] text-brand-accent">{t('project.meta.services')}</p>
                <p className="mt-1 text-base leading-[1.25]">{services.join(', ')}</p>
              </div>
              <div>
                <p className="text-sm font-light leading-[1.22] text-brand-accent">{t('project.meta.stack')}</p>
                <p className="mt-1 text-base leading-[1.25]">{stack}</p>
              </div>
              <div>
                <p className="text-sm font-light leading-[1.22] text-brand-accent">{t('project.meta.duration')}</p>
                <p className="mt-1 text-base leading-[1.22]">{duration}</p>
              </div>
              <div>
                <p className="text-sm font-light leading-[1.22] text-brand-accent">{t('project.meta.location')}</p>
                <p className="mt-1 text-base leading-[1.22]">{location}</p>
              </div>
              <div>
                <p className="text-sm font-light leading-[1.22] text-brand-accent">{t('project.meta.year')}</p>
                <p className="mt-1 text-base leading-[1.22]">{year}</p>
              </div>
            </div>

            <div
              ref={mobileGalleryRef}
              className="mt-8 h-[calc(100vh-140px)] overflow-y-auto no-scrollbar space-y-[13px]"
            >
              {galleryImages.map((image, index) => (
                <div key={`${project.slug}-gallery-mobile-${index}`} className="w-full shrink-0 bg-brand-charcoal">
                  <img
                    src={image}
                    alt={`${projectTitle} ${galleryAltLabel} ${index + 1}`}
                    loading="lazy"
                    decoding="async"
                    className={`w-full h-auto block ${index === 0 ? 'rounded-b-[15px]' : 'rounded-[15px]'}`}
                  />
                </div>
              ))}
            </div>
          </div>

          <div className="mt-[64px] lg:mt-[96px] xl:mt-[96px] hidden sm:block pb-24 xl:pb-0 lg:ml-[32px] xl:ml-[64px] lg:mr-[16px] xl:mr-[-8px]">
            <h1 className="max-w-full font-display text-[80px] md:text-[120px] lg:text-[160px] xl:text-[150px] 2xl:text-[200px] font-medium leading-[1.16] tracking-[-0.04em] xl:font-sans xl:leading-[1.26] xl:tracking-[-0.08em]">
              {projectClient}
            </h1>

            <div className="mt-12 lg:mt-[16px] xl:mt-[26px] flex flex-col lg:flex-row gap-12 lg:gap-[64px] xl:gap-[96px] items-start">
              <div className="w-full lg:w-[360px] xl:w-[441px] shrink-0 lg:sticky lg:top-[120px] xl:top-[96px] 2xl:top-[80px] pt-0 lg:pt-[24px]">
                <div className="mb-12 xl:mb-[87px]">
                  <p className="text-base font-light leading-[1.22] text-brand-accent xl:font-rounded xl:text-[14px] xl:font-light xl:leading-[1.22]">{t('project.meta.overview')}</p>
                  <p className="mt-4 xl:mt-[19px] text-lg xl:text-[16px] leading-[1.4] text-white xl:font-normal lg:pr-0">
                    {overview}
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-x-6 gap-y-10 xl:gap-x-[27px] xl:gap-y-[65px]">
                  <div>
                    <p className="text-base font-light leading-[1.22] text-brand-accent xl:font-rounded xl:text-[14px] xl:leading-[1.22]">{t('project.meta.client')}</p>
                    <p className="mt-2 xl:mt-0 text-lg xl:text-[16px] leading-[1.22] xl:leading-[1.4] text-white xl:font-normal break-words">{projectClient}</p>
                  </div>
                  <div>
                    <p className="text-base font-light leading-[1.22] text-brand-accent xl:font-rounded xl:text-[14px] xl:leading-[1.22]">{t('project.meta.year')}</p>
                    <p className="mt-2 xl:mt-0 text-lg xl:text-[16px] leading-[1.22] xl:leading-[1.4] text-white xl:font-normal">{year}</p>
                  </div>
                  <div>
                    <p className="text-base font-light leading-[1.22] text-brand-accent xl:font-rounded xl:text-[14px] xl:leading-[1.22]">{t('project.meta.location')}</p>
                    <p className="mt-2 xl:mt-0 text-lg xl:text-[16px] leading-[1.22] xl:leading-[1.4] text-white xl:font-normal">{location}</p>
                  </div>
                  <div>
                    <p className="text-base font-light leading-[1.22] text-brand-accent xl:font-rounded xl:text-[14px] xl:leading-[1.22]">{t('project.meta.duration')}</p>
                    <p className="mt-2 xl:mt-0 text-lg xl:text-[16px] leading-[1.22] xl:leading-[1.4] text-white xl:font-normal">{duration}</p>
                  </div>
                  <div>
                    <p className="text-base font-light leading-[1.22] text-brand-accent xl:font-rounded xl:text-[14px] xl:leading-[1.22]">{t('project.meta.stack')}</p>
                    <p className="mt-2 xl:mt-0 text-lg xl:text-[16px] leading-[1.25] xl:leading-[1.4] text-white xl:font-normal break-words">{stack}</p>
                  </div>
                  <div>
                    <p className="text-base font-light leading-[1.22] text-brand-accent xl:font-rounded xl:text-[14px] xl:leading-[1.22]">{t('project.meta.services')}</p>
                    <p className="mt-2 xl:mt-0 text-lg xl:text-[16px] leading-[1.25] xl:leading-[1.4] text-white xl:font-normal break-words">
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

              <div className="flex-1 w-full min-w-0 flex flex-col gap-[13px]">
                {galleryImages.map((image, index) => (
                  <div key={`${project.slug}-gallery-desktop-${index}`} className="w-full shrink-0 bg-brand-charcoal">
                    <img
                      src={image}
                      alt={`${projectTitle} ${galleryAltLabel} ${index + 1}`}
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

      <section className="w-full overflow-x-clip px-4 pb-14 pt-16 sm:px-8 xl:pt-[80px] xl:pb-[80px]">
        <div className="mx-auto w-full max-w-[1920px]">
          <div className="lg:ml-[32px] xl:ml-[64px] max-w-[900px]">
            <h2 className="text-4xl sm:text-5xl font-medium tracking-tight">{t('project.meta.relatedProjects')}</h2>
            <div className="mt-8 grid grid-cols-2 gap-3 md:gap-6">
              {relatedProjects.map((item) => {
                const itemTitle = sr(item.title, item.title_sr) || item.title
                const itemClient = sr(item.client, item.client_sr) || item.client
                const itemRole = sr(item.role, item.role_sr) || item.role

                return (
                <Link
                  key={item.id}
                  to={`/projects/${item.slug}`}
                  className="group/project block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent"
                >
                  <div className="relative overflow-hidden rounded-[10px]">
                    <img
                      src={item.image}
                      alt={`${itemTitle} ${previewAltLabel}`}
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
                      {itemRole}
                    </p>
                  </div>
                  <div className="mt-2 sm:mt-3">
                    <p className="text-sm font-semibold text-white sm:text-base md:text-lg xl:text-[21px] xl:font-normal xl:leading-[1.26] xl:tracking-normal">
                      {itemTitle} <span className="font-medium xl:font-light xl:text-[17px] xl:leading-[1.26] text-white/50">| {itemClient}</span>
                    </p>
                  </div>
                </Link>
                )
              })}
            </div>

            <Link
              to="/projects"
              className="group mt-8 inline-flex items-center gap-2.5 sm:hidden"
            >
              <span className="text-base font-medium">{t('project.meta.seeAll')}</span>
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
    </>
  )
}

export default Project
