import { Link } from 'react-router-dom'
import CircleArrowButton from '../ui/CircleArrowButton'
import navArrow from '../../assets/images/arrows/Nav bar.svg'
import navArrowHover from '../../assets/images/arrows/Nav bar HOVER.svg'

function ProjectCard({ project }) {
  return (
    <Link
      to={`/projects/${project.slug}`}
      className="group/project block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent focus-visible:ring-offset-2 focus-visible:ring-offset-brand-paper"
    >
      <article>
        <div className="relative overflow-hidden rounded-[8px] sm:rounded-[10px]">
          <img
            src={project.image}
            alt={`${project.title} project preview`}
            loading="lazy"
            decoding="async"
            className="h-[200px] w-full object-cover transition-transform duration-500 ease-premium group-hover/project:scale-[1.03] sm:h-[220px] md:h-[250px] lg:h-[240px] xl:h-[285px] 2xl:h-[306px] min-[1920px]:h-[364px]"
          />
          <div className="pointer-events-none absolute inset-0 bg-brand-ink/45 opacity-0 transition-opacity duration-300 ease-premium group-hover/project:opacity-100" />
          <div className="pointer-events-none absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-300 ease-premium group-hover/project:opacity-100">
            <span className="pointer-events-auto">
              <CircleArrowButton
                className="group !h-12 !w-12 sm:!h-16 sm:!w-16"
                iconClassName="!h-4 !w-4 sm:!h-5 sm:!w-5"
                iconSrc={navArrow}
                iconHoverSrc={navArrowHover}
                centerFillOnHover
                fillClassName="!-inset-px group-hover:scale-110"
              />
            </span>
          </div>
          <p className="pointer-events-none absolute bottom-2 left-2 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.08em] text-white opacity-0 transition-opacity duration-300 ease-premium group-hover/project:opacity-100 sm:bottom-3 sm:left-3 sm:px-2.5 sm:py-1 sm:text-xs">
            {project.role}
          </p>
        </div>

        <h3 className="mt-2 text-sm font-semibold text-brand-ink sm:mt-3 sm:text-base md:text-lg xl:text-xl 2xl:mt-[8px] 2xl:text-[21px] 2xl:leading-[1.26]">
          {project.title} <span className="font-medium text-brand-muted">| {project.client}</span>
        </h3>
      </article>
    </Link>
  )
}

export default ProjectCard
