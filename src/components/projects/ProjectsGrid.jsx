import ProjectCard from './ProjectCard'

function ProjectsGrid({ projects }) {
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-[repeat(3,413px)] 2xl:justify-between 2xl:gap-y-7">
      {projects.map((project) => (
        <ProjectCard key={project.id} project={project} />
      ))}
    </div>
  )
}

export default ProjectsGrid
