import { createClient } from '@sanity/client'

const projectId = import.meta.env.VITE_SANITY_PROJECT_ID || 'v69k4zml'
const dataset = import.meta.env.VITE_SANITY_DATASET || 'production'
const apiVersion = import.meta.env.VITE_SANITY_API_VERSION || '2025-01-01'
const useCdn = import.meta.env.VITE_SANITY_USE_CDN === 'true'

export const sanityClient = createClient({
  projectId,
  dataset,
  useCdn,
  apiVersion,
})
