import { useMemo, useState } from 'react'
import AccentDot from '../ui/AccentDot'
import useProjectsContent from '../../hooks/useProjectsContent'
import projectPlaceholder from '../../assets/images/projects/project-placeholder.svg'

const SERVICES_ITEMS = [
  {
    id: 'brand-visual',
    label: 'Brand & Visual Design',
    hoverLabel: 'Logos, colors, and visuals that actually get along.',
    description:
      'Creating cohesive visual identities, from logos to colors and graphics, that feel intentional, polished, and just... right.',
    tags: ['Logo Design', 'Brand Identity', 'Visual Identity', 'Graphic Design'],
    previewSlug: 'logo-design',
  },
  {
    id: 'web-product',
    label: 'Web & Product Design',
    hoverLabel: 'Websites and products that feel clear from the first click.',
    description:
      'Designing interfaces and product flows that reduce friction, support business goals, and make complex actions feel simple.',
    tags: ['UX Design', 'UI Systems', 'Landing Pages', 'Product Flows'],
    previewSlug: 'media-website',
  },
  {
    id: 'marketing',
    label: 'Marketing Design',
    hoverLabel: 'Campaign visuals that stay on-brand and easy to scale.',
    description:
      'Building campaign-ready assets across channels, keeping messaging consistent while adapting visuals for each platform.',
    tags: ['Campaign Assets', 'Social Creatives', 'Ad Visuals', 'Email Banners'],
    previewSlug: 'instagram-posts',
  },
  {
    id: 'presentations',
    label: 'Presentations & Decks',
    hoverLabel: 'Decks that tell complex stories in a simple flow.',
    description:
      'Structuring and designing decks that communicate clearly, hold attention, and help teams present ideas with confidence.',
    tags: ['Pitch Decks', 'Sales Decks', 'Case Studies', 'Narrative Design'],
    previewSlug: 'newsletter',
  },
]

function ServicesSection() {
  const { data: projects } = useProjectsContent()
  const [openServiceId, setOpenServiceId] = useState(null)

  const projectImageBySlug = useMemo(() => (
    projects.reduce((acc, project) => {
      if (project?.slug && project?.image) {
        acc[project.slug] = project.image
      }
      return acc
    }, {})
  ), [projects])

  const resolvePreviewImage = (previewSlug) => {
    return projectImageBySlug[previewSlug] || projectPlaceholder
  }

  const handleToggleService = (serviceId) => {
    setOpenServiceId((current) => (current === serviceId ? null : serviceId))
  }

  return (
    <section id="services" className="rounded-frame bg-brand-paper px-4 py-14 sm:px-8 sm:py-16 lg:px-12 lg:py-20 min-[1920px]:px-[72px] min-[1920px]:pt-[86px] min-[1920px]:pb-[118px]" aria-label="Services section">
      <div className="mx-auto max-w-[1295px] min-[1920px]:max-w-[1776px]">
        <div className="flex flex-col gap-8 min-[1200px]:flex-row min-[1200px]:items-start min-[1200px]:justify-between">
          <div className="min-[1200px]:w-[55%] min-[1920px]:w-[1040px]">
            <p className="inline-flex items-center gap-3 text-[15px] font-normal uppercase tracking-[0.01em] text-brand-accent min-[1920px]:text-[24px]">
              <AccentDot className="h-4 w-4 min-[1920px]:h-2.5 min-[1920px]:w-2.5" />
              Services
            </p>
            <h2 className="mt-4 max-w-[620px] text-4xl leading-tight text-brand-ink sm:text-5xl lg:text-6xl min-[1920px]:mt-[18px] min-[1920px]:max-w-[600px] min-[1920px]:text-[68px] min-[1920px]:leading-[1.1] min-[1920px]:tracking-[-0.04em]">
              What I can <em className="font-serif text-[1.3em] font-normal italic">design</em> for your team
            </h2>
          </div>

          <p className="max-w-[1000px] text-base leading-relaxed font-thin text-black min-[1200px]:w-[42%] min-[1920px]:w-[640px] min-[1920px]:pt-[56px] min-[1920px]:text-[24px] min-[1920px]:leading-[1.5]">
            Delivering thoughtful and engaging design across brands, websites, and marketing assets - all created to be clear, consistent, and just a bit fun along the way.
          </p>
        </div>

        <ul className="mt-10 border-t border-black/35 min-[1920px]:mt-[62px]">
          {SERVICES_ITEMS.map((item) => {
            const isOpen = openServiceId === item.id

            return (
              <li key={item.id} className="border-b border-black/35">
                <div className="px-4 py-5 sm:px-5 min-[1920px]:px-[60px] min-[1920px]:py-[33px]">
                  <button
                    type="button"
                    onClick={() => handleToggleService(item.id)}
                    className={`group flex w-full justify-between text-left ${isOpen ? 'items-start' : 'items-center'}`}
                    aria-expanded={isOpen}
                    aria-label={item.label}
                  >
                    {isOpen ? (
                      <span className="block flex-1 pr-6 text-lg leading-[1.1] text-brand-ink sm:pr-8 sm:text-xl lg:text-[42px] xl:text-[50px] min-[1920px]:pr-[72px] min-[1920px]:text-[32px]">
                        {item.label}
                      </span>
                    ) : (
                      <span className="relative block h-[1.34em] flex-1 overflow-hidden pr-6 text-lg leading-[1.1] text-brand-ink sm:pr-8 sm:text-xl lg:text-[42px] xl:text-[50px] min-[1920px]:pr-[72px] min-[1920px]:text-[32px]">
                        <span className="absolute left-0 top-0 block -translate-y-[-5px] whitespace-nowrap transition-transform duration-500 ease-premium group-hover:-translate-y-[122%]">
                          {item.label}
                        </span>
                        <span
                          aria-hidden="true"
                          className="absolute left-0 top-[108%] block -translate-y-[1px] whitespace-nowrap text-brand-ink transition-transform duration-500 ease-premium group-hover:-translate-y-[150%]"
                        >
                          {item.hoverLabel}
                        </span>
                      </span>
                    )}

                    <span
                      aria-hidden="true"
                      className="inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-brand-ink/10 text-black transition-colors duration-300 ease-premium min-[1920px]:h-10 min-[1920px]:w-10"
                    >
                      <span className="relative block h-3 w-3 min-[1920px]:h-[16px] min-[1920px]:w-[16px]">
                        <span className="absolute left-1/2 top-1/2 h-[1.6px] w-full -translate-x-1/2 -translate-y-1/2 rounded-full bg-current" />
                        <span className={`absolute left-1/2 top-1/2 h-full w-[1.6px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-current transition-opacity duration-300 ease-premium ${isOpen ? 'opacity-0' : 'opacity-100'}`} />
                      </span>
                    </span>
                  </button>

                  {isOpen ? (
                    <div className="mt-5 grid gap-6 min-[1200px]:grid-cols-[minmax(0,1fr)_minmax(260px,520px)] min-[1920px]:mt-[34px] min-[1920px]:gap-x-[30px] min-[1920px]:pb-[4px]">
                      <div>
                        <p className="max-w-[860px] text-base leading-[1.45] text-brand-ink sm:text-lg min-[1920px]:text-[21px] min-[1920px]:leading-[1.36]">
                          {item.description}
                        </p>

                        <div className="mt-4 flex flex-wrap gap-2.5 min-[1920px]:mt-[24px] min-[1920px]:gap-[14px]">
                          {item.tags.map((tag) => (
                            <span
                              key={`${item.id}-${tag}`}
                              className="inline-flex items-center justify-center rounded-full border border-black px-3.5 py-1.5 text-center text-sm leading-[1.05] text-brand-ink sm:text-base min-[1920px]:rounded-[999px] min-[1920px]:px-[20px] min-[1920px]:py-[11px] min-[1920px]:text-[24px]"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div className="overflow-hidden rounded-[12px] bg-brand-ink/6 min-[1920px]:h-[352px] min-[1920px]:w-[574px]">
                        <img
                          src={resolvePreviewImage(item.previewSlug)}
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
