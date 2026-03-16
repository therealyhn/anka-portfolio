import ProjectCard from './ProjectCard'

function ProjectsGrid({ projects }) {
  return (
    <div className="grid gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3 2xl:grid-cols-[repeat(3,1fr)] 2xl:gap-x-6 2xl:gap-y-7 min-[1920px]:gap-x-7">
      {projects.map((project) => (
        <ProjectCard key={project.id} project={project} />
      ))}
    </div>
  )
}

export default ProjectsGrid
