import { Link, Navigate, useParams } from 'react-router-dom'
import CircleArrowButton from '../components/ui/CircleArrowButton'
import { getProjectBySlug } from '../lib/projectsData'
import navArrow from '../assets/images/arrows/Nav bar.svg'
import navArrowHover from '../assets/images/arrows/Nav bar HOVER.svg'

function Project() {
  const { slug } = useParams()
  const project = getProjectBySlug(slug)

  if (!project) {
    return <Navigate to="/" replace />
  }

  return (
    <main className="min-h-screen bg-brand-paper p-2 sm:p-3 md:p-4">
      <section className="rounded-frame bg-brand-charcoal px-4 py-10 text-white sm:px-8 sm:py-12 lg:px-12">
        <div className="mx-auto max-w-[1100px]">
          <Link
            to="/"
            className="group inline-flex items-center gap-2 text-sm font-medium text-white/80 transition-colors duration-300 ease-premium hover:text-brand-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent"
          >
            <span>Back to home</span>
            <CircleArrowButton iconSrc={navArrow} iconHoverSrc={navArrowHover} centerFillOnHover fillColorClass="bg-black opacity-50" />
          </Link>

          <h1 className="mt-6 text-4xl font-semibold tracking-tight sm:text-5xl lg:text-6xl">{project.title}</h1>
          <p className="mt-2 text-lg text-white/80">Client: {project.client}</p>
        </div>
      </section>

      <section className="mt-3 rounded-frame border border-brand-line/50 bg-brand-paper px-4 py-10 sm:px-8 sm:py-12 lg:px-12">
        <div className="mx-auto max-w-[1100px] space-y-8">
          <div className="overflow-hidden rounded-2xl border border-brand-line/30 bg-brand-ink/5">
            <img
              src={project.image}
              alt={`${project.title} cover`}
              loading="lazy"
              decoding="async"
              className="h-[220px] w-full object-cover sm:h-[320px] lg:h-[420px]"
            />
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <div className="rounded-2xl border border-brand-line/40 bg-white p-6">
              <h2 className="text-2xl font-semibold text-brand-ink">Project summary</h2>
              <p className="mt-3 text-base leading-relaxed text-brand-muted">
                This is the project page template. Once you send screenshots for each project detail page, I will implement the exact Figma layout and connect editable fields in Sanity.
              </p>
            </div>
            <div className="rounded-2xl border border-brand-line/40 bg-white p-6">
              <h2 className="text-2xl font-semibold text-brand-ink">Media gallery</h2>
              <p className="mt-3 text-base leading-relaxed text-brand-muted">
                Gallery and case study blocks are prepared in structure and will be styled per your upcoming screenshots.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}

export default Project