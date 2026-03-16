import { useEffect, useState } from 'react'
import { sanityClient } from '../lib/sanityClient'
import earthImageFallback from '../assets/images/img/Background_aboutme.png'
import ankaImageFallback from '../assets/images/img/anka_4x.png'
import afterEffectsIcon from '../assets/images/icons/After Effects icon (about me).svg'
import lightroomIcon from '../assets/images/icons/Lightroom icon (about me).svg'
import davinciIcon from '../assets/images/icons/DaVinci Resolve icon (about me).svg'
import figmaIcon from '../assets/images/icons/Figma icon (about me).svg'
import photoshopIcon from '../assets/images/icons/Photoshop icon (about me).svg'

const ABOUT_QUERY = `
  coalesce(
    *[_type == "aboutSection" && _id == "aboutSection"][0],
    *[_type == "aboutSection"] | order(_updatedAt desc)[0]
  ){
    "eyebrowLabel": coalesce(eyebrowLabel, sectionLabel),
    "titleLineOne": coalesce(titleLineOne, headingLineOne),
    "titleAccent": coalesce(titleAccent, headingAccent),
    "titleLineTwo": coalesce(titleLineTwo, headingLineTwo),
    "description": coalesce(description, introText),
    "experienceTitle": coalesce(experienceTitle, experienceHeading),
    "experienceText": coalesce(experienceText, experienceDescription),
    "locationTitle": coalesce(locationTitle, locationHeading, basedIn),
    "locationStatus": coalesce(locationStatus, locationSubtitle, workingStatus),
    "yearsValue": coalesce(yearsValue, statYearsValue),
    "yearsLabel": coalesce(yearsLabel, statYearsLabel),
    "assetsValue": coalesce(assetsValue, statAssetsValue),
    "assetsLabel": coalesce(assetsLabel, statAssetsLabel),
    "quoteLineOne": coalesce(quoteLineOne, testimonialLineOne),
    "quoteLineTwo": coalesce(quoteLineTwo, testimonialLineTwo),
    "testimonialName": coalesce(testimonialName, authorName),
    "testimonialRole": coalesce(testimonialRole, authorRole),
    "portraitImage": coalesce(portraitImage.asset->url, ankaPortrait.asset->url),
    "earthImage": coalesce(earthImage.asset->url, locationImage.asset->url),
    "testimonialAvatar": coalesce(testimonialAvatar.asset->url, authorAvatar.asset->url),
    "testimonials": coalesce(testimonials, [])[]{
      _key,
      "quoteLineOne": coalesce(quoteLineOne, quote, lineOne, testimonialLineOne),
      "quoteLineTwo": coalesce(quoteLineTwo, lineTwo, testimonialLineTwo),
      "name": coalesce(name, testimonialName, authorName),
      "role": coalesce(role, testimonialRole, authorRole),
      "avatar": coalesce(avatar.asset->url, image.asset->url, testimonialAvatar.asset->url)
    },
    "tools": coalesce(tools, toolItems, [])[]{
      _key,
      "title": coalesce(title, label, name),
      "description": coalesce(description, copy, subtitle),
      "icon": coalesce(icon.asset->url, image.asset->url)
    }
  }
`

const DEFAULT_ABOUT_CONTENT = {
  eyebrowLabel: 'About me',
  titleLineOne: 'Why',
  titleAccent: 'choose',
  titleLineTwo: 'me',
  description: 'A practical, reliable approach focused on quality, clarity, and long-term results.',
  experienceTitle: 'My experience',
  experienceText:
    "I started my design career in an in-house role, where I worked closely with one international company across multiple products and channels. That's where I learned the full design process from early concepts to final delivery and the value of building systems that last.",
  locationTitle: 'Based in Belgrade, Serbia',
  locationStatus: 'Working worldwide',
  yearsValue: '2.5+',
  yearsLabel: 'Years of hands-on design experience.',
  assetsValue: '20+',
  assetsLabel: 'Assets types (web, ads, emails, dashboards).',
  quoteLineOne:
    '"Anka approached the work with no ego and a strong focus on team outcomes; she was extremely collaborative and easy to work with.',
  quoteLineTwo:
    'She owned the design process from the beginning to the end, responded quickly to feedback, and managed to respect the tight deadlines. She brought more than execution - she understood the context, suggested solutions, and improved our ideas."',
  testimonialName: 'Vida Antonijevic',
  testimonialRole: 'Head of Operations, House of Summary',
  portraitImage: ankaImageFallback,
  earthImage: earthImageFallback,
  testimonialAvatar: ankaImageFallback,
  testimonials: [
    {
      id: 'testimonial-vida',
      quoteLineOne:
        'Anka approached the work with no ego and a strong focus on team outcomes; she was extremely collaborative and easy to work with.',
      quoteLineTwo:
        'She owned the design process from the beginning to the end, responded quickly to feedback, and managed to respect the tight deadlines. She brought more than execution - she understood the context, suggested solutions, and improved our ideas.',
      name: 'Vida Antonijevic',
      role: 'Head of Operations, House of Summary',
      avatar: ankaImageFallback,
    },
  ],
  tools: [
    {
      id: 'after-effects',
      title: 'After Effects',
      description: 'Creating simple motion graphics and interface animations.',
      icon: afterEffectsIcon,
    },
    {
      id: 'lightroom',
      title: 'Lightroom',
      description: 'Color-correcting and enhancing imagery.',
      icon: lightroomIcon,
    },
    {
      id: 'davinci',
      title: 'DaVinci Resolve',
      description: 'Editing and refining video content for clear storytelling.',
      icon: davinciIcon,
    },
    {
      id: 'figma',
      title: 'Figma',
      description: 'Designing clean UI layouts and components.',
      icon: figmaIcon,
    },
    {
      id: 'photoshop',
      title: 'Photoshop',
      description: 'Creating visuals for social, ads, and campaigns.',
      icon: photoshopIcon,
    },
  ],
}

function normalizeTools(rawTools, fallbackTools) {
  if (!Array.isArray(rawTools) || rawTools.length === 0) return fallbackTools

  const normalized = rawTools
    .map((item, index) => {
      const fallback = fallbackTools[index % fallbackTools.length]
      const title = item?.title || fallback?.title || 'Tool'

      return {
        id: item?._key || fallback?.id || `${title.toLowerCase().replace(/\s+/g, '-')}-${index}`,
        title,
        description: item?.description || fallback?.description || '',
        icon: item?.icon || fallback?.icon || '',
      }
    })
    .filter((item) => item.title)

  return normalized.length > 0 ? normalized : fallbackTools
}

function trimLeadingQuote(value) {
  return String(value || '').trim().replace(/^["'“”]+/, '')
}

function trimTrailingQuote(value) {
  return String(value || '').trim().replace(/["'“”]+$/, '')
}

function normalizeTestimonials(rawTestimonials, rawContent, fallbackTestimonials) {
  if (Array.isArray(rawTestimonials) && rawTestimonials.length > 0) {
    const normalized = rawTestimonials
      .map((item, index) => {
        const fallback = fallbackTestimonials[index % fallbackTestimonials.length]
        const quoteLineOne = trimLeadingQuote(item?.quoteLineOne || fallback?.quoteLineOne || '')
        const quoteLineTwo = trimTrailingQuote(item?.quoteLineTwo || fallback?.quoteLineTwo || '')

        if (!quoteLineOne && !quoteLineTwo) return null

        return {
          id: item?._key || `testimonial-${index + 1}`,
          quoteLineOne,
          quoteLineTwo,
          name: item?.name || fallback?.name || 'Anonymous',
          role: item?.role || fallback?.role || '',
          avatar: item?.avatar || fallback?.avatar || ankaImageFallback,
        }
      })
      .filter(Boolean)

    if (normalized.length > 0) return normalized
  }

  const legacyQuoteLineOne = trimLeadingQuote(rawContent?.quoteLineOne || fallbackTestimonials[0]?.quoteLineOne || '')
  const legacyQuoteLineTwo = trimTrailingQuote(rawContent?.quoteLineTwo || fallbackTestimonials[0]?.quoteLineTwo || '')
  const legacyName = rawContent?.testimonialName || fallbackTestimonials[0]?.name || 'Anonymous'
  const legacyRole = rawContent?.testimonialRole || fallbackTestimonials[0]?.role || ''
  const legacyAvatar = rawContent?.testimonialAvatar || fallbackTestimonials[0]?.avatar || ankaImageFallback

  return [
    {
      id: 'testimonial-legacy',
      quoteLineOne: legacyQuoteLineOne,
      quoteLineTwo: legacyQuoteLineTwo,
      name: legacyName,
      role: legacyRole,
      avatar: legacyAvatar,
    },
  ]
}

function normalizeAboutContent(rawContent) {
  const fallback = DEFAULT_ABOUT_CONTENT

  return {
    eyebrowLabel: rawContent?.eyebrowLabel || fallback.eyebrowLabel,
    titleLineOne: rawContent?.titleLineOne || fallback.titleLineOne,
    titleAccent: rawContent?.titleAccent || fallback.titleAccent,
    titleLineTwo: rawContent?.titleLineTwo || fallback.titleLineTwo,
    description: rawContent?.description || fallback.description,
    experienceTitle: rawContent?.experienceTitle || fallback.experienceTitle,
    experienceText: rawContent?.experienceText || fallback.experienceText,
    locationTitle: rawContent?.locationTitle || fallback.locationTitle,
    locationStatus: rawContent?.locationStatus || fallback.locationStatus,
    yearsValue: rawContent?.yearsValue || fallback.yearsValue,
    yearsLabel: rawContent?.yearsLabel || fallback.yearsLabel,
    assetsValue: rawContent?.assetsValue || fallback.assetsValue,
    assetsLabel: rawContent?.assetsLabel || fallback.assetsLabel,
    quoteLineOne: rawContent?.quoteLineOne || fallback.quoteLineOne,
    quoteLineTwo: rawContent?.quoteLineTwo || fallback.quoteLineTwo,
    testimonialName: rawContent?.testimonialName || fallback.testimonialName,
    testimonialRole: rawContent?.testimonialRole || fallback.testimonialRole,
    portraitImage: rawContent?.portraitImage || fallback.portraitImage,
    earthImage: rawContent?.earthImage || fallback.earthImage,
    testimonialAvatar: rawContent?.testimonialAvatar || fallback.testimonialAvatar,
    testimonials: normalizeTestimonials(rawContent?.testimonials, rawContent, fallback.testimonials),
    tools: normalizeTools(rawContent?.tools, fallback.tools),
  }
}

function useAboutContent() {
  const [data, setData] = useState(DEFAULT_ABOUT_CONTENT)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    let isMounted = true

    async function loadAboutContent() {
      try {
        setLoading(true)
        const aboutData = await sanityClient.fetch(ABOUT_QUERY)
        if (!isMounted) return

        setData(normalizeAboutContent(aboutData))
        setError(null)
      } catch (fetchError) {
        if (!isMounted) return
        setError(fetchError)
        setData(DEFAULT_ABOUT_CONTENT)
      } finally {
        if (isMounted) setLoading(false)
      }
    }

    loadAboutContent()

    return () => {
      isMounted = false
    }
  }, [])

  return { loading, error, data }
}

export default useAboutContent
