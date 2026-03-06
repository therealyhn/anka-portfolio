import { useEffect } from 'react'
import { Link, Navigate, useParams } from 'react-router-dom'
import CircleArrowButton from '../components/ui/CircleArrowButton'
import { getProjectBySlug, projectsData } from '../lib/projectsData'
import navArrow from '../assets/images/arrows/Nav bar.svg'
import navArrowHover from '../assets/images/arrows/Nav bar HOVER.svg'
import Navbar from '../components/layout/Navbar'

function Project() {
  const { slug } = useParams()
  const project = getProjectBySlug(slug)
  const relatedProjects = projectsData.filter((item) => item.slug !== slug).slice(0, 2)

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' })
  }, [slug])

  if (!project) {
    return <Navigate to="/" replace />
  }

  return (
    <main className="min-h-screen bg-brand-charcoal text-white">
      <section className="w-full px-4 sm:px-6 lg:pl-[56px] lg:pr-[14px]">
        <div className="w-full">
          <Navbar hideLanguageSwitch />

          <h1 className="mt-[250px] w-full font-display text-[clamp(96px,11.3vw,225px)] font-semibold leading-[0.92] tracking-tighter xl:whitespace-nowrap">
            {project.client}
          </h1>

          <div className="mt-[38px] grid items-start gap-8 xl:grid-cols-[430px_minmax(0,1fr)] xl:gap-[30px]">
            <aside className="xl:pt-[100px] max-w-[420px]">
              <p className="text-md font-thin leading-none text-brand-accent xl:text-[18px]">overview</p>
              <p className="mt-5 max-w-[420px] text-[18px] leading-[1.34] text-white/92 xl:leading-[1.36]">
                Designed the advertiser analytics dashboard for the House of Summary platform, focusing on clear data hierarchy and scannable performance insights.
                Structured key metrics such as clicks, views, CPC, audience demographics,
                and geographic data into modular components, enabling advertisers to quickly understand campaign performance and identify trends.
              </p>
            </aside>

            <div className="no-scrollbar space-y-[10px] xl:max-h-[92vh] xl:overflow-y-auto xl:pr-[2px]">
              <div className="overflow-hidden rounded-[2px] border border-white/15 bg-[#050B1A]">
                <img
                  src={project.image}
                  alt={`${project.title} cover`}
                  loading="lazy"
                  decoding="async"
                  className="h-[420px] w-full object-cover sm:h-[560px] xl:h-[852px]"
                />
              </div>

              <div className="overflow-hidden rounded-[2px] border border-white/15 bg-[#050B1A]">
                <img
                  src={project.image}
                  alt={`${project.title} second screen`}
                  loading="lazy"
                  decoding="async"
                  className="h-[420px] w-full object-cover sm:h-[560px] xl:h-[852px]"
                />
              </div>

              <div className="overflow-hidden rounded-[2px] border border-white/15 bg-[#050B1A]">
                <img
                  src={project.image}
                  alt={`${project.title} third screen`}
                  loading="lazy"
                  decoding="async"
                  className="h-[420px] w-full object-cover sm:h-[560px] xl:h-[852px]"
                />
              </div>

              <div className="overflow-hidden rounded-[2px] border border-white/15 bg-[#050B1A]">
                <img
                  src={project.image}
                  alt={`${project.title} fourth screen`}
                  loading="lazy"
                  decoding="async"
                  className="h-[420px] w-full object-cover sm:h-[560px] xl:h-[852px]"
                />
              </div>
            </div>
          </div>

          <div className="mt-16 grid grid-cols-2 gap-x-8 gap-y-8 xl:max-w-[760px] xl:gap-x-10 xl:gap-y-10">
            <div>
              <p className="text-xl font-medium leading-none text-brand-accent xl:text-[34px]">client</p>
              <p className="mt-2 text-xl leading-tight text-white/90 sm:text-2xl xl:text-[34px]">{project.client}</p>
            </div>
            <div>
              <p className="text-xl font-medium leading-none text-brand-accent xl:text-[34px]">year</p>
              <p className="mt-2 text-xl leading-tight text-white/90 sm:text-2xl xl:text-[34px]">2026</p>
            </div>
            <div>
              <p className="text-xl font-medium leading-none text-brand-accent xl:text-[34px]">location</p>
              <p className="mt-2 text-xl leading-tight text-white/90 sm:text-2xl xl:text-[34px]">Remote</p>
            </div>
            <div>
              <p className="text-xl font-medium leading-none text-brand-accent xl:text-[34px]">duration</p>
              <p className="mt-2 text-xl leading-tight text-white/90 sm:text-2xl xl:text-[34px]">3 weeks</p>
            </div>
            <div>
              <p className="text-xl font-medium leading-none text-brand-accent xl:text-[34px]">stack</p>
              <p className="mt-2 text-xl leading-tight text-white/90 sm:text-2xl xl:text-[34px]">Figma</p>
            </div>
            <div>
              <p className="text-xl font-medium leading-none text-brand-accent xl:text-[34px]">services</p>
              <p className="mt-2 text-xl leading-[1.08] text-white/90 sm:text-2xl xl:text-[34px]">UI Design<br />Dashboard Design<br />Data Visualization</p>
            </div>
          </div>
        </div>
      </section>

      <section className="px-4 pb-10 pt-2 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-[1280px]">
          <h2 className="text-5xl tracking-tight font-medium">More projects like this</h2>
          <div className="mt-8 grid gap-6 md:grid-cols-2">
            {relatedProjects.map((item) => (
              <Link
                key={item.id}
                to={`/projects/${item.slug}`}
                className="group block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent"
              >
                <div className="overflow-hidden rounded-2xl">
                  <img
                    src={item.image}
                    alt={`${item.title} preview`}
                    loading="lazy"
                    decoding="async"
                    className="h-[220px] w-full object-cover transition-transform duration-500 ease-premium group-hover:scale-[1.03] sm:h-[300px]"
                  />
                </div>
                <h3 className="mt-3 text-xl font-semibold text-white sm:text-2xl">
                  {item.title} <span className="font-medium text-white/55">| {item.client}</span>
                </h3>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="rounded-frame bg-brand-charcoal px-4 py-16 text-white sm:px-8 lg:px-12">
        <div className="mx-auto max-w-[1280px] text-center">
          <p className="text-sm font-medium uppercase tracking-[0.08em] text-brand-accent">Available for work</p>
          <h2 className="mt-3 text-5xl font-semibold sm:text-6xl lg:text-7xl">
            Let&apos;s <em className="font-serif text-[1.08em] font-normal italic">Connect</em>
          </h2>
          <p className="mx-auto mt-5 max-w-[560px] text-2xl leading-relaxed text-white/80">
            Always open to new projects and collaborations. Let&apos;s talk about what you&apos;re building.
          </p>
          <Link
            to="/#contact"
            className="group mt-8 inline-flex items-center gap-3 text-2xl font-semibold text-white transition-colors duration-300 ease-premium hover:text-brand-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent"
          >
            <span>Start a conversation</span>
            <CircleArrowButton iconSrc={navArrow} iconHoverSrc={navArrowHover} centerFillOnHover fillColorClass="bg-brand-ink" />
          </Link>

          <div className="mt-16 flex flex-wrap items-center justify-between gap-6 border-t border-white/15 pt-8 text-lg text-white/70">
            <p>&copy; Anka Ljusic, 2026 | Personal Portfolio</p>
            <p>Privacy Policy</p>
          </div>
        </div>
      </section>
    </main>
  )
}

export default Project
