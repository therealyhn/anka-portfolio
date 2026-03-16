import { useState } from 'react'
import AccentDot from '../ui/AccentDot'
import CircleArrowButton from '../ui/CircleArrowButton'
import ProjectsGrid from '../projects/ProjectsGrid'
import useProjectsContent from '../../hooks/useProjectsContent'
import seeMoreArrow from '../../assets/images/arrows/See more projects (projects section).svg'
import seeMoreArrowHover from '../../assets/images/arrows/See more projects (projects section) HOVER.svg'

function ProjectsSection() {
  const INITIAL_VISIBLE_PROJECTS = 6
  const [isExpanded, setIsExpanded] = useState(false)
  const { data: projects } = useProjectsContent()

  const hasHiddenProjects = projects.length > INITIAL_VISIBLE_PROJECTS
  const visibleProjects = isExpanded ? projects : projects.slice(0, INITIAL_VISIBLE_PROJECTS)

  return (
    <section id="projects" className="rounded-frame bg-brand-paper px-4 py-10 sm:px-6 sm:py-12 md:px-8 md:py-14 lg:px-12 lg:py-16 xl:py-20 2xl:pt-[80px] 2xl:pb-[100px] min-[1920px]:pt-[102px] min-[1920px]:pb-[132px]" aria-label="Projects section">
      <div className="mx-auto max-w-[600px] sm:max-w-[700px] md:max-w-[900px] lg:max-w-[1100px] xl:max-w-[1295px] min-[1920px]:max-w-[1728px]">
        <div className="text-center">
          <p className="inline-flex items-center gap-2 text-[13px] font-normal uppercase tracking-[0.01em] text-brand-accent sm:gap-3 sm:text-[15px] min-[1920px]:text-[24px]">
            <AccentDot />
            Projects
          </p>
          <h2 className="mt-3 text-[28px] font-normal leading-tight text-brand-ink sm:mt-4 sm:text-4xl md:text-5xl lg:text-6xl 2xl:text-[51px] 2xl:leading-[1.26] 2xl:tracking-[-0.04em]">
            Latest <em className="font-serif text-[1.3em] font-normal italic">projects</em> I&apos;ve delivered
          </h2>
        </div>

        <div className="mt-8 sm:mt-10 md:mt-12 2xl:mt-[53px]">
          <ProjectsGrid projects={visibleProjects} />
        </div>

        {hasHiddenProjects ? (
          <div className="mt-8 flex justify-center sm:mt-10 md:mt-12 2xl:mt-[74px]">
            <button
              type="button"
              onClick={() => setIsExpanded((current) => !current)}
              className="group inline-flex items-center gap-2 text-sm font-semibold text-brand-ink transition-colors duration-300 ease-premium hover:text-brand-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent sm:gap-3 sm:text-base 2xl:gap-[8px]"
            >
              <span className="2xl:text-[18px]">{isExpanded ? 'See less projects' : 'See more projects'}</span>
              <CircleArrowButton
                iconSrc={seeMoreArrow}
                iconHoverSrc={seeMoreArrowHover}
                centerFillOnHover
                fillColorClass="bg-brand-ink"
                className={`!h-7 !w-7 sm:!h-8 sm:!w-8 2xl:!h-[34px] 2xl:!w-[34px] ${isExpanded ? 'rotate-180' : ''}`}
                iconClassName="2xl:!h-[10px] 2xl:!w-[10px]"
              />
            </button>
          </div>
        ) : null}
      </div>
    </section>
  )
}

export default ProjectsSection
