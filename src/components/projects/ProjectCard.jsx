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
        <div className="relative overflow-hidden rounded-[10px]">
          <img
            src={project.image}
            alt={`${project.title} project preview`}
            loading="lazy"
            decoding="async"
            className="h-[220px] w-full object-cover transition-transform duration-500 ease-premium group-hover/project:scale-[1.03] sm:h-[250px] lg:h-[285px] 2xl:h-[306px]"
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
          <p className="pointer-events-none absolute bottom-3 left-3 px-2.5 py-1 text-xs font-semibold uppercase tracking-[0.08em] text-white opacity-0 transition-opacity duration-300 ease-premium group-hover/project:opacity-100">
            {project.role}
          </p>
        </div>

        <h3 className="mt-3 text-md font-semibold text-brand-ink sm:text-xl 2xl:mt-[8px] 2xl:text-[21px] 2xl:leading-[1.26]">
          {project.title} <span className="font-medium text-brand-muted">| {project.client}</span>
        </h3>
      </article>
    </Link>
  )
}

export default ProjectCard
