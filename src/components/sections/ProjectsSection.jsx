import { useState } from 'react'
import AccentDot from '../ui/AccentDot'
import CircleArrowButton from '../ui/CircleArrowButton'
import ProjectsGrid from '../projects/ProjectsGrid'
import { projectsData } from '../../lib/projectsData'
import seeMoreArrow from '../../assets/images/arrows/See more projects (projects section).svg'
import seeMoreArrowHover from '../../assets/images/arrows/See more projects (projects section) HOVER.svg'

function ProjectsSection() {
  const INITIAL_VISIBLE_PROJECTS = 6
  const [isExpanded, setIsExpanded] = useState(false)

  const hasHiddenProjects = projectsData.length > INITIAL_VISIBLE_PROJECTS
  const visibleProjects = isExpanded ? projectsData : projectsData.slice(0, INITIAL_VISIBLE_PROJECTS)

  return (
    <section id="projects" className="rounded-frame bg-brand-paper px-4 py-14 sm:px-8 sm:py-16 lg:px-12 lg:py-20" aria-label="Projects section">
      <div className="mx-auto max-w-[1280px]">
        <div className="text-center">
          <p className="inline-flex items-center gap-3 text-sm font-medium uppercase tracking-[0.08em] text-brand-accent sm:text-base">
            <AccentDot />
            Projects
          </p>
          <h2 className="mt-4 text-4xl font-medium leading-tight text-brand-ink sm:text-5xl lg:text-6xl">
            Latest <em className="font-serif text-[1.3em] font-medium italic">projects</em> I&apos;ve delivered
          </h2>
        </div>

        <div className="mt-10 sm:mt-12">
          <ProjectsGrid projects={visibleProjects} />
        </div>

        {hasHiddenProjects ? (
          <div className="mt-10 flex justify-center sm:mt-12">
            <button
              type="button"
              onClick={() => setIsExpanded((current) => !current)}
              className="group inline-flex items-center gap-3 text-base font-semibold text-brand-ink transition-colors duration-300 ease-premium hover:text-brand-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent"
            >
              <span>{isExpanded ? 'See less projects' : 'See more projects'}</span>
              <CircleArrowButton
                iconSrc={seeMoreArrow}
                iconHoverSrc={seeMoreArrowHover}
                centerFillOnHover
                fillColorClass="bg-brand-ink"
                className={isExpanded ? 'rotate-180' : ''}
              />
            </button>
          </div>
        ) : null}
      </div>
    </section>
  )
}

export default ProjectsSection
