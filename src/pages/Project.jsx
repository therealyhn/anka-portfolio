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
      <section className="w-full px-4 pt-6 sm:px-8 xl:px-0">
        <div className="mx-auto w-full max-w-[1440px]">
          <Navbar hideLanguageSwitch />

          <div className="mt-28 xl:relative xl:mt-0 xl:h-[1134px]">
            <div className="xl:absolute xl:left-[72px] xl:top-[190px] xl:h-[174px] xl:w-[1179px]">
              <h1 className="font-display text-[56px] font-medium leading-[1.08] tracking-[-0.03em] sm:text-[84px] xl:text-[150px] xl:leading-[1.16] xl:tracking-[-12px]">
                {project.client}
              </h1>
            </div>

            <div className="mt-10 space-y-8 xl:absolute xl:left-0 xl:top-[384px] xl:mt-0 xl:h-[750px] xl:w-[475px] xl:space-y-0">
              <div className="xl:absolute xl:left-[72px] xl:top-[50px] xl:h-[231px] xl:w-[331px]">
                <p className="text-sm font-light leading-[1.22] text-brand-accent">overview</p>
                <p className="mt-[14px] text-base leading-[1.4] text-white xl:w-[331px]">
                  Designed the advertiser analytics dashboard for the House of Summary platform, focusing on clear data hierarchy and scannable performance insights.
                  Structured key metrics such as clicks, views, CPC, audience demographics, and geographic data into modular components, enabling advertisers to quickly understand campaign performance and identify trends.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-x-7 gap-y-7 xl:absolute xl:left-[72px] xl:top-[436px] xl:gap-y-[65px]">
                <div className="w-[152px]">
                  <p className="text-sm font-light leading-[1.22] text-brand-accent">client</p>
                  <p className="text-base leading-[1.22] text-white">{project.client}</p>
                </div>
                <div className="w-[152px]">
                  <p className="text-sm font-light leading-[1.22] text-brand-accent">year</p>
                  <p className="text-base leading-[1.22] text-white">2026</p>
                </div>
                <div className="w-[152px]">
                  <p className="text-sm font-light leading-[1.22] text-brand-accent">location</p>
                  <p className="text-base leading-[1.22] text-white">Remote</p>
                </div>
                <div className="w-[152px]">
                  <p className="text-sm font-light leading-[1.22] text-brand-accent">duration</p>
                  <p className="text-base leading-[1.22] text-white">3 weeks</p>
                </div>
                <div className="w-[152px]">
                  <p className="text-sm font-light leading-[1.22] text-brand-accent">stack</p>
                  <p className="text-base leading-[1.25] text-white">Figma</p>
                </div>
                <div className="w-[152px]">
                  <p className="text-sm font-light leading-[1.22] text-brand-accent">services</p>
                  <p className="text-base leading-[1.25] text-white">Web Design<br />UI Design</p>
                </div>
              </div>
            </div>

            <div className="no-scrollbar mt-8 space-y-[13px] xl:absolute xl:left-[475px] xl:top-[384px] xl:mt-0 xl:h-[750px] xl:w-[965px] xl:overflow-y-auto">
              <div className="overflow-hidden rounded-[15px] bg-white xl:ml-[13px] xl:w-[939px]">
                <img
                  src={project.image}
                  alt={`${project.title} cover`}
                  loading="lazy"
                  decoding="async"
                  className="h-[380px] w-full object-cover sm:h-[520px] xl:h-[550px]"
                />
              </div>

              <div className="overflow-hidden rounded-[15px] bg-black xl:ml-[13px] xl:w-[939px]">
                <img
                  src={project.image}
                  alt={`${project.title} second screen`}
                  loading="lazy"
                  decoding="async"
                  className="h-[420px] w-full object-cover sm:h-[560px] xl:h-[600px]"
                />
              </div>

              <div className="overflow-hidden rounded-[15px] bg-white xl:ml-[13px] xl:w-[939px]">
                <img
                  src={project.image}
                  alt={`${project.title} third screen`}
                  loading="lazy"
                  decoding="async"
                  className="h-[420px] w-full object-cover sm:h-[560px] xl:h-[600px]"
                />
              </div>
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
