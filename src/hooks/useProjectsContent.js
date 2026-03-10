import { useEffect, useState } from 'react'
import { sanityClient } from '../lib/sanityClient'
import { projectsData } from '../lib/projectsData'

const PROJECTS_QUERY = `
  *[_type in ["project", "projects"]] | order(sortOrder asc, _createdAt desc){
    _id,
    "slug": coalesce(slug.current, slug),
    "title": coalesce(title, projectTitle, name),
    "client": coalesce(client, clientName, brand),
    "role": coalesce(role, projectRole, category),
    "image": coalesce(thumbnail.asset->url, image.asset->url, coverImage.asset->url),
    "overview": coalesce(overview, description, summary),
    "year": coalesce(year, projectYear),
    "location": coalesce(location, projectLocation),
    "duration": coalesce(duration, projectDuration),
    "stack": coalesce(stack, tool, tools),
    "services": array::compact(
      coalesce(services[]->title, []) +
      coalesce(services[], []) +
      coalesce(projectServices[], [])
    ),
    "galleryImages": coalesce(galleryImages[].asset->url, gallery[].asset->url, images[].asset->url)
  }
`

function slugify(value) {
  if (!value) return ''

  return String(value)
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\\s-]/g, '')
    .replace(/\\s+/g, '-')
    .replace(/-+/g, '-')
}

function normalizeServices(services) {
  if (!Array.isArray(services)) return undefined

  const normalized = services
    .map((item) => {
      if (typeof item === 'string') return item
      if (item && typeof item === 'object') return item.title || item.label || item.name
      return ''
    })
    .filter(Boolean)

  return normalized.length > 0 ? normalized : undefined
}

function normalizeProject(rawProject, fallbackProject) {
  const fallback = fallbackProject || {}
  const normalizedTitle = rawProject?.title || fallback.title || 'Untitled Project'
  const normalizedSlug = rawProject?.slug || fallback.slug || slugify(normalizedTitle) || slugify(rawProject?._id) || `project-${fallback.id || 'item'}`

  return {
    id: rawProject?._id || fallback.id || normalizedSlug,
    slug: normalizedSlug,
    title: normalizedTitle,
    client: rawProject?.client || fallback.client || 'Unknown Client',
    role: rawProject?.role || fallback.role || 'Design',
    image: rawProject?.image || fallback.image || projectsData[0]?.image,
    overview: rawProject?.overview || fallback.overview,
    year: rawProject?.year || fallback.year,
    location: rawProject?.location || fallback.location,
    duration: rawProject?.duration || fallback.duration,
    stack: rawProject?.stack || fallback.stack,
    services: normalizeServices(rawProject?.services) || fallback.services,
    galleryImages: Array.isArray(rawProject?.galleryImages) && rawProject.galleryImages.length > 0
      ? rawProject.galleryImages
      : fallback.galleryImages,
  }
}

function useProjectsContent() {
  const [data, setData] = useState(projectsData)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    let isMounted = true

    async function loadProjects() {
      try {
        setLoading(true)
        const sanityProjects = await sanityClient.fetch(PROJECTS_QUERY)
        if (!isMounted) return

        const normalizedProjects = Array.isArray(sanityProjects) && sanityProjects.length > 0
          ? sanityProjects.map((project, index) => normalizeProject(project, projectsData[index]))
          : projectsData

        setData(normalizedProjects)
        setError(null)
      } catch (fetchError) {
        if (!isMounted) return
        setError(fetchError)
        setData(projectsData)
      } finally {
        if (isMounted) setLoading(false)
      }
    }

    loadProjects()

    return () => {
      isMounted = false
    }
  }, [])

  return { loading, error, data }
}

export default useProjectsContent
