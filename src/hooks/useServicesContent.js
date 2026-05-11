import { useEffect, useState } from 'react'
import projectPlaceholder from '../assets/images/projects/project-placeholder.svg'

const SERVICES_QUERY = `
  coalesce(
    *[_type == "servicesSection" && _id == "servicesSection"][0],
    *[_type == "servicesSection"] | order(_updatedAt desc)[0]
  ){
    "eyebrowLabel": coalesce(eyebrowLabel, sectionLabel),
    "eyebrowLabel_sr": coalesce(eyebrowLabel_sr, null),
    "titleLineOne": coalesce(titleLineOne, headingLineOne),
    "titleLineOne_sr": coalesce(titleLineOne_sr, null),
    "titleAccent": coalesce(titleAccent, headingAccent),
    "titleAccent_sr": coalesce(titleAccent_sr, null),
    "titleLineTwo": coalesce(titleLineTwo, headingLineTwo),
    "titleLineTwo_sr": coalesce(titleLineTwo_sr, null),
    "description": coalesce(description, introText),
    "description_sr": coalesce(description_sr, null),
    "items": coalesce(items, serviceItems, [])[]{
      _key,
      "label": coalesce(label, title, name),
      "label_sr": coalesce(label_sr, null),
      "hoverLabel": coalesce(hoverLabel, teaser, subtitle),
      "hoverLabel_sr": coalesce(hoverLabel_sr, null),
      "description": coalesce(description, details, copy),
      "description_sr": coalesce(description_sr, null),
      "tags": array::compact(coalesce(tags, keywords, [])),
      "tags_sr": array::compact(coalesce(tags_sr, [])),
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
      tags_sr: null,
      previewImage: projectPlaceholder,
    },
    {
      id: 'web-product',
      label: 'Web & Product Design',
      hoverLabel: 'Websites and products that feel clear from the first click.',
      description:
        'Designing interfaces and product flows that reduce friction, support business goals, and make complex actions feel simple.',
      tags: ['UX Design', 'UI Systems', 'Landing Pages', 'Product Flows'],
      tags_sr: null,
      previewImage: projectPlaceholder,
    },
    {
      id: 'marketing',
      label: 'Marketing Design',
      hoverLabel: 'Campaign visuals that stay on-brand and easy to scale.',
      description:
        'Building campaign-ready assets across channels, keeping messaging consistent while adapting visuals for each platform.',
      tags: ['Campaign Assets', 'Social Creatives', 'Ad Visuals', 'Email Banners'],
      tags_sr: null,
      previewImage: projectPlaceholder,
    },
    {
      id: 'presentations',
      label: 'Presentations & Decks',
      hoverLabel: 'Decks that tell complex stories in a simple flow.',
      description:
        'Structuring and designing decks that communicate clearly, hold attention, and help teams present ideas with confidence.',
      tags: ['Pitch Decks', 'Sales Decks', 'Case Studies', 'Narrative Design'],
      tags_sr: null,
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
    label_sr: rawItem?.label_sr || null,
    hoverLabel,
    hoverLabel_sr: rawItem?.hoverLabel_sr || null,
    description: rawItem?.description || fallback.description || '',
    description_sr: rawItem?.description_sr || null,
    tags: normalizeTags(rawItem?.tags, fallback.tags || []),
    tags_sr: normalizeTags(rawItem?.tags_sr, fallback.tags_sr || []),
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
    eyebrowLabel_sr: rawContent?.eyebrowLabel_sr || null,
    titleLineOne: rawContent?.titleLineOne || fallback.titleLineOne,
    titleLineOne_sr: rawContent?.titleLineOne_sr || null,
    titleAccent: rawContent?.titleAccent || fallback.titleAccent,
    titleAccent_sr: rawContent?.titleAccent_sr || null,
    titleLineTwo: rawContent?.titleLineTwo || fallback.titleLineTwo,
    titleLineTwo_sr: rawContent?.titleLineTwo_sr || null,
    description: rawContent?.description || fallback.description,
    description_sr: rawContent?.description_sr || null,
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
        const { sanityClient } = await import('../lib/sanityClient')
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
