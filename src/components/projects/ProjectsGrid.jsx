import ProjectCard from './ProjectCard'

function ProjectsGrid({ projects, cardDisplay }) {
  return (
    <div className="grid gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3 2xl:grid-cols-[repeat(3,1fr)] 2xl:gap-x-6 2xl:gap-y-7 min-[1920px]:gap-x-7">
      {projects.map((project, index) => (
        <ProjectCard key={project.id} project={project} displayClass={cardDisplay?.(index)} />
      ))}
    </div>
  )
}

export default ProjectsGrid
