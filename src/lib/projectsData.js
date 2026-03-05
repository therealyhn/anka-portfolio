import projectPlaceholder from '../assets/images/projects/project-placeholder.svg'

export const projectsData = [
  { id: 'analytics-platform', slug: 'analytics-platform', title: 'Analytics Platform', client: 'House of Summary', role: 'UI Design', image: projectPlaceholder },
  { id: 'newsletter', slug: 'newsletter', title: 'Newsletter', client: 'London Summary', role: 'Product Design', image: projectPlaceholder },
  { id: 'media-kit', slug: 'media-kit', title: 'Media Kit', client: 'House of Summary', role: 'Visual Design', image: projectPlaceholder },
  { id: 'media-website', slug: 'media-website', title: 'Media Website', client: 'Sagravia', role: 'Web Design', image: projectPlaceholder },
  { id: 'instagram-posts', slug: 'instagram-posts', title: 'Instagram Posts', client: 'Multiple Brands', role: 'Social Design', image: projectPlaceholder },
  { id: 'logo-design', slug: 'logo-design', title: 'Logo Design', client: 'Movie Suggestions', role: 'Brand Identity', image: projectPlaceholder },
  { id: 'dashboard-redesign', slug: 'dashboard-redesign', title: 'Dashboard Redesign', client: 'B2B SaaS', role: 'UI Design', image: projectPlaceholder },
  { id: 'campaign-landing', slug: 'campaign-landing', title: 'Campaign Landing', client: 'E-commerce Brand', role: 'Web Design', image: projectPlaceholder },
  { id: 'mobile-app-flow', slug: 'mobile-app-flow', title: 'Mobile App Flow', client: 'Fintech Startup', role: 'Product Design', image: projectPlaceholder },
]

export function getProjectBySlug(slug) {
  return projectsData.find((project) => project.slug === slug)
}
