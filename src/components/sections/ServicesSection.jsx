import { useMemo, useState } from 'react'
import AccentDot from '../ui/AccentDot'
import useServicesContent from '../../hooks/useServicesContent'
import useProjectsContent from '../../hooks/useProjectsContent'

const SERVICE_PREVIEW_SLUGS = {
  'brand-visual': 'logo-design',
  'web-product': 'media-website',
  marketing: 'instagram-posts',
  presentations: 'newsletter',
}

function ServicesSection() {
  const { data: servicesContent } = useServicesContent()
  const { data: projects } = useProjectsContent()
  const [openServiceId, setOpenServiceId] = useState(null)
  const serviceItems = servicesContent?.items || []

  const projectImageBySlug = useMemo(() => (
    projects.reduce((acc, project) => {
      if (project?.slug && project?.image) {
        acc[project.slug] = project.image
      }
      return acc
    }, {})
  ), [projects])

  const resolvePreviewImage = (item) => {
    const hasRealImage = typeof item?.previewImage === 'string' && !item.previewImage.includes('project-placeholder')
    if (hasRealImage) return item.previewImage

    const previewProjectImage = item?.previewProjectSlug ? projectImageBySlug[item.previewProjectSlug] : null
    if (previewProjectImage) return previewProjectImage

    const fallbackSlug = SERVICE_PREVIEW_SLUGS[item?.id]
    const fallbackImage = fallbackSlug ? projectImageBySlug[fallbackSlug] : null
    return fallbackImage || item?.previewImage
  }

  const handleToggleService = (serviceId) => {
    setOpenServiceId((current) => (current === serviceId ? null : serviceId))
  }

  return (
    <section id="services" className="rounded-frame bg-brand-paper px-4 py-10 sm:px-6 sm:py-12 md:px-8 md:py-14 lg:px-12 lg:py-16 xl:px-[48px] xl:py-[80px] 2xl:px-[60px] 2xl:py-[100px] min-[1920px]:px-[72px] min-[1920px]:pt-[86px] min-[1920px]:pb-[118px]" aria-label="Services section">
      <div className="mx-auto max-w-[600px] sm:max-w-[700px] md:max-w-[900px] lg:max-w-[1100px] xl:max-w-[1300px] 2xl:max-w-[1500px] min-[1920px]:max-w-[1776px]">
        <div className="flex flex-col gap-5 sm:gap-6 md:gap-8 min-[1200px]:flex-row min-[1200px]:items-start min-[1200px]:justify-between">
          <div className="min-[1200px]:w-[55%] xl:w-[50%] 2xl:w-[55%] min-[1920px]:w-[1040px]">
            <p className="inline-flex items-center gap-2 text-[13px] font-normal uppercase tracking-[0.01em] text-brand-accent sm:gap-3 sm:text-[15px] xl:text-[20px] 2xl:text-[22px] min-[1920px]:text-[22px]">
              <AccentDot className="h-4 w-4 xl:h-2 xl:w-2 min-[1920px]:h-2.5 min-[1920px]:w-2.5" />
              {servicesContent?.eyebrowLabel || 'Services'}
            </p>
            <h2 className="mt-3 max-w-[620px] text-[28px] leading-tight text-brand-ink sm:mt-4 sm:text-4xl md:text-5xl lg:text-6xl xl:mt-[12px] xl:max-w-[700px] xl:text-[56px] 2xl:mt-[16px] 2xl:text-[60px] min-[1920px]:mt-[18px] min-[1920px]:max-w-[600px] min-[1920px]:text-[56px] min-[1920px]:leading-[1.1] min-[1920px]:tracking-[-0.04em]">
              {servicesContent?.titleLineOne || 'What I can'}{' '}
              <em className="font-serif text-[1.3em] font-normal italic">{servicesContent?.titleAccent || 'design'}</em>{' '}
              {servicesContent?.titleLineTwo || 'for your team'}
            </h2>
          </div>

          <p className="max-w-[1000px] text-sm leading-relaxed font-thin text-black sm:text-base min-[1200px]:w-[42%] min-[1200px]:self-end xl:w-[45%] xl:text-[18px] 2xl:w-[42%] 2xl:text-[20px] min-[1920px]:w-[640px] min-[1920px]:text-[20px] min-[1920px]:leading-[1.6] pb-2">
            {servicesContent?.description}
          </p>
        </div>

        <ul className="mt-8 border-t border-black/35 sm:mt-10 xl:mt-[48px] 2xl:mt-[56px] min-[1920px]:mt-[62px]">
          {serviceItems.map((item) => {
            const isOpen = openServiceId === item.id

            return (
              <li key={item.id} className="border-b border-black/35">
                <div className="px-2 py-4 sm:px-4 sm:py-5 xl:px-[40px] xl:py-[24px] 2xl:px-[50px] 2xl:py-[28px] min-[1920px]:px-[60px] min-[1920px]:py-[32px]">
                  <button
                    type="button"
                    onClick={() => handleToggleService(item.id)}
                    className={`group flex w-full justify-between text-left ${isOpen ? 'items-start' : 'items-center'}`}
                    aria-expanded={isOpen}
                    aria-label={item.label}
                  >
                    {isOpen ? (
                      <span className="block flex-1 pr-4 text-base leading-[1.1] text-brand-ink sm:pr-6 sm:text-lg md:text-xl lg:text-[24px] xl:pr-[60px] xl:text-[30px] 2xl:text-[34px] min-[1920px]:pr-[72px] min-[1920px]:text-[38px]">
                        {item.label}
                      </span>
                    ) : (
                      <span className="relative flex h-[1.3em] flex-1 flex-col overflow-hidden pr-4 text-base leading-[1.3] text-brand-ink sm:pr-6 sm:text-lg md:text-xl lg:text-[24px] xl:pr-[60px] xl:text-[30px] 2xl:text-[34px] min-[1920px]:pr-[72px] min-[1920px]:text-[38px]">
                        <span className="flex h-full w-full shrink-0 items-center whitespace-nowrap transition-transform duration-500 ease-premium group-hover:-translate-y-full">
                          {item.label}
                        </span>
                        <span
                          aria-hidden="true"
                          className="flex h-full w-full shrink-0 items-center whitespace-nowrap font-light text-brand-ink/80 transition-transform duration-500 ease-premium group-hover:-translate-y-full"
                        >
                          {item.hoverLabel}
                        </span>
                      </span>
                    )}

                    <span
                      aria-hidden="true"
                      className="inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-brand-ink/10 text-black transition-colors duration-300 ease-premium sm:h-6 sm:w-6 xl:h-8 xl:w-8 2xl:h-9 2xl:w-9 min-[1920px]:h-10 min-[1920px]:w-10"
                    >
                      <span className="relative block h-2.5 w-2.5 sm:h-3 sm:w-3 xl:h-4 xl:w-4 2xl:h-[14px] 2xl:w-[14px] min-[1920px]:h-[16px] min-[1920px]:w-[16px]">
                        <span className="absolute left-1/2 top-1/2 h-[1.6px] w-full -translate-x-1/2 -translate-y-1/2 rounded-full bg-current" />
                        <span className={`absolute left-1/2 top-1/2 h-full w-[1.6px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-current transition-opacity duration-300 ease-premium ${isOpen ? 'opacity-0' : 'opacity-100'}`} />
                      </span>
                    </span>
                  </button>

                  {isOpen ? (
                    <div className="mt-4 grid gap-5 sm:mt-5 sm:gap-6 min-[1200px]:grid-cols-[minmax(0,1fr)_minmax(260px,560px)] xl:mt-[24px] xl:gap-x-[32px] 2xl:mt-[30px] 2xl:gap-x-[38px] min-[1920px]:mt-[34px] min-[1920px]:gap-x-[42px] min-[1920px]:pb-[4px]">
                      <div>
                        <p className="max-w-[860px] text-sm leading-[1.45] text-brand-ink sm:text-base lg:text-lg xl:text-[18px] 2xl:text-[20px] min-[1920px]:text-[18px] min-[1920px]:leading-[1.4]">
                          {item.description}
                        </p>

                        <div className="mt-3 flex flex-wrap gap-2 sm:mt-4 sm:gap-2.5 xl:mt-[18px] xl:gap-[12px] min-[1920px]:mt-[24px] min-[1920px]:gap-[14px]">
                          {item.tags.map((tag) => (
                            <span
                              key={`${item.id}-${tag}`}
                              className="inline-flex items-center justify-center rounded-full border border-black px-3 py-1 text-xs leading-[1.05] text-brand-ink sm:px-3.5 sm:py-1.5 sm:text-sm md:text-base xl:px-[16px] xl:py-[8px] xl:text-[16px] 2xl:px-[18px] 2xl:py-[10px] 2xl:text-[20px] min-[1920px]:rounded-[999px] min-[1920px]:px-[18px] min-[1920px]:py-[9px] min-[1920px]:text-[18px]"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div className="overflow-hidden rounded-[8px] bg-brand-ink/6 sm:rounded-[12px] min-[1200px]:mr-auto xl:h-[240px] xl:w-[400px] 2xl:h-[280px] 2xl:w-[450px] min-[1920px]:h-[304px] min-[1920px]:w-[500px]">
                        <img
                          src={resolvePreviewImage(item)}
                          alt={`${item.label} preview`}
                          loading="lazy"
                          decoding="async"
                          className="h-full w-full object-cover"
                        />
                      </div>
                    </div>
                  ) : null}
                </div>
              </li>
            )
          })}
        </ul>
      </div>
    </section>
  )
}

export default ServicesSection
