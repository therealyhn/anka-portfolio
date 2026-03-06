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

  if (!project) {
    return <Navigate to="/" replace />
  }

  return (
    <main className="min-h-screen bg-brand-charcoal p-2 text-white sm:p-3  md:py-[200px] md:p-4">
      <section className="rounded-frame bg-brand-charcoal px-4 py-10 sm:px-8 sm:py-12 lg:px-12">
        <div className="mx-auto max-w-[1440px]">
          <Navbar />
          <Link
            to="/#projects"
            className="group mb-6 inline-flex items-center gap-2 text-sm font-medium text-white/80 transition-colors duration-300 ease-premium hover:text-brand-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent"
          >
            <span>Go Back</span>
            <CircleArrowButton iconSrc={navArrow} iconHoverSrc={navArrowHover} centerFillOnHover fillColorClass="bg-brand-ink" />
          </Link>
          <h1 className="text-5xl font-semibold tracking-tight sm:text-6xl lg:text-8xl">{project.client}</h1>

          <div className="mt-8 grid gap-8 lg:grid-cols-[380px_minmax(0,1fr)] lg:gap-10">
            <aside className="space-y-10 lg:pt-6">
              <div>
                <p className="text-sm font-medium uppercase tracking-[0.08em] text-brand-accent">overview</p>
                <p className="mt-3 max-w-[320px] text-lg leading-relaxed text-white/90">
                  Designed the core user interface and visual system for this project, with focus on clear hierarchy and scalable components.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-x-6 gap-y-10">
                <div>
                  <p className="text-sm font-medium uppercase tracking-[0.08em] text-brand-accent">client</p>
                  <p className="mt-2 text-lg text-white/90">{project.client}</p>
                </div>
                <div>
                  <p className="text-sm font-medium uppercase tracking-[0.08em] text-brand-accent">year</p>
                  <p className="mt-2 text-lg text-white/90">2026</p>
                </div>
                <div>
                  <p className="text-sm font-medium uppercase tracking-[0.08em] text-brand-accent">location</p>
                  <p className="mt-2 text-lg text-white/90">Remote</p>
                </div>
                <div>
                  <p className="text-sm font-medium uppercase tracking-[0.08em] text-brand-accent">duration</p>
                  <p className="mt-2 text-lg text-white/90">3 weeks</p>
                </div>
                <div>
                  <p className="text-sm font-medium uppercase tracking-[0.08em] text-brand-accent">stack</p>
                  <p className="mt-2 text-lg text-white/90">Figma</p>
                </div>
                <div>
                  <p className="text-sm font-medium uppercase tracking-[0.08em] text-brand-accent">services</p>
                  <p className="mt-2 text-lg leading-tight text-white/90">UI Design<br />Dashboard Design<br />Data Visualization</p>
                </div>
              </div>
            </aside>

            <div className="no-scrollbar space-y-3 lg:max-h-[86vh] lg:overflow-y-auto lg:pr-2">
              <div className="overflow-hidden rounded-2xl">
                <img
                  src={project.image}
                  alt={`${project.title} cover`}
                  loading="lazy"
                  decoding="async"
                  className="h-[280px] w-full object-cover sm:h-[380px] lg:h-[520px]"
                />
              </div>
              <div className="overflow-hidden rounded-2xl border border-white/10 bg-white/5">
                <img
                  src={project.image}
                  alt={`${project.title} second screen`}
                  loading="lazy"
                  decoding="async"
                  className="h-[280px] w-full object-cover sm:h-[380px] lg:h-[520px]"
                />
              </div>
              <div className="overflow-hidden rounded-2xl border border-white/10 bg-white/5">
                <img
                  src={project.image}
                  alt={`${project.title} third screen`}
                  loading="lazy"
                  decoding="async"
                  className="h-[280px] w-full object-cover sm:h-[380px] lg:h-[520px]"
                />
              </div>
              <div className="overflow-hidden rounded-2xl border border-white/10 bg-white/5">
                <img
                  src={project.image}
                  alt={`${project.title} fourth screen`}
                  loading="lazy"
                  decoding="async"
                  className="h-[280px] w-full object-cover sm:h-[380px] lg:h-[520px]"
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
            <p>©Anka Ljusic, 2026 | Personal Portfolio</p>
            <p>Privacy Policy</p>
          </div>
        </div>
      </section>
    </main>
  )
}

export default Project
