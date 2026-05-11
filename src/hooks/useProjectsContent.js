import { useEffect, useState } from 'react'
import { projectsData } from '../lib/projectsData'
import { sanityImg } from '../lib/sanityImage'

const PROJECTS_QUERY = `
  *[_type in ["project", "projects"]] | order(sortOrder asc, _createdAt desc){
    _id,
    "slug": coalesce(slug.current, slug),
    "title": coalesce(title, projectTitle, name),
    "title_sr": coalesce(title_sr, null),
    "client": coalesce(client, clientName, brand),
    "client_sr": coalesce(client_sr, null),
    "role": coalesce(role, projectRole, category),
    "role_sr": coalesce(role_sr, null),
    "image": coalesce(thumbnail.asset->url, image.asset->url, coverImage.asset->url),
    "overview": coalesce(overview, description, summary),
    "overview_sr": coalesce(overview_sr, null),
    "year": coalesce(year, projectYear),
    "location": coalesce(location, projectLocation),
    "location_sr": coalesce(location_sr, null),
    "duration": coalesce(duration, projectDuration),
    "duration_sr": coalesce(duration_sr, null),
    "stack": coalesce(stack, tool, tools),
    "stack_sr": coalesce(stack_sr, null),
    "services": array::compact(
      coalesce(services[]->title, []) +
      coalesce(services[], []) +
      coalesce(projectServices[], [])
    ),
    "services_sr": array::compact(
      coalesce(services_sr[]->title_sr, []) +
      coalesce(services_sr[]->title, []) +
      coalesce(services_sr[], [])
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
    title_sr: rawProject?.title_sr || null,
    client: rawProject?.client || fallback.client || 'Unknown Client',
    client_sr: rawProject?.client_sr || null,
    role: rawProject?.role || fallback.role || 'Design',
    role_sr: rawProject?.role_sr || null,
    image: sanityImg(rawProject?.image || fallback.image || projectsData[0]?.image, { w: 900 }),
    overview: rawProject?.overview || fallback.overview,
    overview_sr: rawProject?.overview_sr || null,
    year: rawProject?.year || fallback.year,
    location: rawProject?.location || fallback.location,
    location_sr: rawProject?.location_sr || null,
    duration: rawProject?.duration || fallback.duration,
    duration_sr: rawProject?.duration_sr || null,
    stack: rawProject?.stack || fallback.stack,
    stack_sr: rawProject?.stack_sr || null,
    services: normalizeServices(rawProject?.services) || fallback.services,
    services_sr: normalizeServices(rawProject?.services_sr) || null,
    galleryImages: Array.isArray(rawProject?.galleryImages) && rawProject.galleryImages.length > 0
      ? rawProject.galleryImages.map((img) => sanityImg(img, { w: 1600, q: 85 }))
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
        const { sanityClient } = await import('../lib/sanityClient')
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
