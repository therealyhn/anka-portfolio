import { useEffect, useState } from 'react'
import { sanityClient } from '../lib/sanityClient'
import projectPlaceholder from '../assets/images/projects/project-placeholder.svg'

const SERVICES_QUERY = `
  coalesce(
    *[_type == "servicesSection" && _id == "servicesSection"][0],
    *[_type == "servicesSection"] | order(_updatedAt desc)[0]
  ){
    "eyebrowLabel": coalesce(eyebrowLabel, sectionLabel),
    "titleLineOne": coalesce(titleLineOne, headingLineOne),
    "titleAccent": coalesce(titleAccent, headingAccent),
    "titleLineTwo": coalesce(titleLineTwo, headingLineTwo),
    "description": coalesce(description, introText),
    "items": coalesce(items, serviceItems, [])[]{
      _key,
      "label": coalesce(label, title, name),
      "hoverLabel": coalesce(hoverLabel, teaser, subtitle),
      "description": coalesce(description, details, copy),
      "tags": array::compact(coalesce(tags, keywords, [])),
      "previewProjectSlug": coalesce(
        previewProject->slug.current,
        previewProject->slug
      ),
      "previewImage": coalesce(
        previewImage.asset->url,
        image.asset->url,
        media.asset->url,
        previewProject->thumbnail.asset->url,
        previewProject->image.asset->url,
        previewProject->coverImage.asset->url
      )
    }
  }
`

const DEFAULT_SERVICES_CONTENT = {
  eyebrowLabel: 'Services',
  titleLineOne: 'What I can',
  titleAccent: 'design',
  titleLineTwo: 'for your team',
  description:
    'Delivering thoughtful and engaging design across brands, websites, and marketing assets - all created to be clear, consistent, and just a bit fun along the way.',
  items: [
    {
      id: 'brand-visual',
      label: 'Brand & Visual Design',
      hoverLabel: 'Logos, colors, and visuals that actually get along.',
      description:
        'Creating cohesive visual identities, from logos to colors and graphics, that feel intentional, polished, and just... right.',
      tags: ['Logo Design', 'Brand Identity', 'Visual Identity', 'Graphic Design'],
      previewImage: projectPlaceholder,
    },
    {
      id: 'web-product',
      label: 'Web & Product Design',
      hoverLabel: 'Websites and products that feel clear from the first click.',
      description:
        'Designing interfaces and product flows that reduce friction, support business goals, and make complex actions feel simple.',
      tags: ['UX Design', 'UI Systems', 'Landing Pages', 'Product Flows'],
      previewImage: projectPlaceholder,
    },
    {
      id: 'marketing',
      label: 'Marketing Design',
      hoverLabel: 'Campaign visuals that stay on-brand and easy to scale.',
      description:
        'Building campaign-ready assets across channels, keeping messaging consistent while adapting visuals for each platform.',
      tags: ['Campaign Assets', 'Social Creatives', 'Ad Visuals', 'Email Banners'],
      previewImage: projectPlaceholder,
    },
    {
      id: 'presentations',
      label: 'Presentations & Decks',
      hoverLabel: 'Decks that tell complex stories in a simple flow.',
      description:
        'Structuring and designing decks that communicate clearly, hold attention, and help teams present ideas with confidence.',
      tags: ['Pitch Decks', 'Sales Decks', 'Case Studies', 'Narrative Design'],
      previewImage: projectPlaceholder,
    },
  ],
}

function slugify(value) {
  if (!value) return ''

  return String(value)
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\\s-]/g, '')
    .replace(/\\s+/g, '-')
    .replace(/-+/g, '-')
}

function normalizeTags(tags, fallbackTags) {
  if (!Array.isArray(tags) || tags.length === 0) return fallbackTags

  const normalized = tags
    .map((tag) => {
      if (typeof tag === 'string') return tag
      if (tag && typeof tag === 'object') return tag.title || tag.label || tag.name
      return ''
    })
    .filter(Boolean)

  return normalized.length > 0 ? normalized : fallbackTags
}

function normalizeItem(rawItem, fallbackItem) {
  const fallback = fallbackItem || {}
  const label = rawItem?.label || fallback.label || 'Service'
  const hoverLabel = rawItem?.hoverLabel || fallback.hoverLabel || label

  return {
    id: rawItem?._key || fallback.id || slugify(label) || 'service-item',
    label,
    hoverLabel,
    description: rawItem?.description || fallback.description || '',
    tags: normalizeTags(rawItem?.tags, fallback.tags || []),
    previewProjectSlug: rawItem?.previewProjectSlug || '',
    previewImage: rawItem?.previewImage || fallback.previewImage || projectPlaceholder,
  }
}

function normalizeServicesContent(rawContent) {
  const fallback = DEFAULT_SERVICES_CONTENT

  const rawItems = Array.isArray(rawContent?.items) ? rawContent.items : []
  const normalizedItems = rawItems.length > 0
    ? rawItems.map((item, index) => normalizeItem(item, fallback.items[index]))
    : fallback.items

  return {
    eyebrowLabel: rawContent?.eyebrowLabel || fallback.eyebrowLabel,
    titleLineOne: rawContent?.titleLineOne || fallback.titleLineOne,
    titleAccent: rawContent?.titleAccent || fallback.titleAccent,
    titleLineTwo: rawContent?.titleLineTwo || fallback.titleLineTwo,
    description: rawContent?.description || fallback.description,
    items: normalizedItems,
  }
}

function useServicesContent() {
  const [data, setData] = useState(DEFAULT_SERVICES_CONTENT)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    let isMounted = true

    async function loadServicesContent() {
      try {
        setLoading(true)
        const servicesData = await sanityClient.fetch(SERVICES_QUERY)
        if (!isMounted) return

        setData(normalizeServicesContent(servicesData))
        setError(null)
      } catch (fetchError) {
        if (!isMounted) return
        setError(fetchError)
        setData(DEFAULT_SERVICES_CONTENT)
      } finally {
        if (isMounted) setLoading(false)
      }
    }

    loadServicesContent()

    return () => {
      isMounted = false
    }
  }, [])

  return { loading, error, data }
}

export default useServicesContent
