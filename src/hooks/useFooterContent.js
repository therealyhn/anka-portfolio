import { useEffect, useState } from 'react'
import { sanityClient } from '../lib/sanityClient'

const FOOTER_QUERY = `
  coalesce(
    *[_type == "footerSection" && _id == "footerSection"][0],
    *[_type == "footerSection"] | order(_updatedAt desc)[0]
  ){
    "availabilityLabel": coalesce(availabilityLabel, badgeLabel),
    "availabilityLabel_sr": coalesce(availabilityLabel_sr, null),
    "titleLineOne": coalesce(titleLineOne, headingLineOne),
    "titleLineOne_sr": coalesce(titleLineOne_sr, null),
    "titleAccent": coalesce(titleAccent, headingAccent),
    "titleAccent_sr": coalesce(titleAccent_sr, null),
    "description": coalesce(description, subtitle),
    "description_sr": coalesce(description_sr, null),
    "ctaLabel": coalesce(ctaLabel, buttonLabel),
    "ctaLabel_sr": coalesce(ctaLabel_sr, null),
    "ctaHref": coalesce(ctaHref, buttonHref),
    "copyrightText": coalesce(copyrightText, legalText),
    "portfolioLabel": coalesce(portfolioLabel, portfolioText),
    "portfolioLabel_sr": coalesce(portfolioLabel_sr, null),
    "privacyLabel": coalesce(privacyLabel, privacyText),
    "privacyLabel_sr": coalesce(privacyLabel_sr, null),
    "privacyHref": coalesce(privacyHref, privacyUrl),
    "socials": coalesce(socials, [])[]{
      _key,
      "platform": coalesce(platform, network, name),
      "url": coalesce(url, href, link)
    }
  }
`

const DEFAULT_FOOTER_CONTENT = {
  availabilityLabel: 'Available for work',
  titleLineOne: "Let's",
  titleAccent: 'Connect',
  description: "Always open to new projects and collaborations. Let's talk about what you're building.",
  ctaLabel: 'Start a conversation',
  ctaHref: '/#contact',
  copyrightText: 'Anka Ljusic, 2026',
  portfolioLabel: 'Personal Portfolio',
  privacyLabel: 'Privacy Policy',
  privacyHref: '/privacy',
  socials: [
    { id: 'linkedin', platform: 'linkedin', url: '#' },
    { id: 'upwork', platform: 'upwork', url: '#' },
    { id: 'fiverr', platform: 'fiverr', url: '#' },
    { id: 'dribbble', platform: 'dribbble', url: '#' },
    { id: 'instagram', platform: 'instagram', url: '#' },
  ],
}

function normalizeCopyrightText(value, fallback) {
  const safeValue = String(value || fallback || '')
    .replace(/^[\s©?�]+/, '')
    .trim()

  return safeValue || fallback
}

function normalizeSocials(rawSocials, fallbackSocials) {
  if (!Array.isArray(rawSocials) || rawSocials.length === 0) return fallbackSocials

  const normalized = rawSocials
    .map((item, index) => {
      const platform = String(item?.platform || '').trim().toLowerCase()
      const url = String(item?.url || '').trim()
      if (!platform) return null

      return {
        id: item?._key || `${platform}-${index}`,
        platform,
        url: url || '#',
      }
    })
    .filter(Boolean)

  return normalized.length > 0 ? normalized : fallbackSocials
}

function normalizeFooterContent(rawContent) {
  const fallback = DEFAULT_FOOTER_CONTENT

  return {
    availabilityLabel: rawContent?.availabilityLabel || fallback.availabilityLabel,
    availabilityLabel_sr: rawContent?.availabilityLabel_sr || null,
    titleLineOne: rawContent?.titleLineOne || fallback.titleLineOne,
    titleLineOne_sr: rawContent?.titleLineOne_sr || null,
    titleAccent: rawContent?.titleAccent || fallback.titleAccent,
    titleAccent_sr: rawContent?.titleAccent_sr || null,
    description: rawContent?.description || fallback.description,
    description_sr: rawContent?.description_sr || null,
    ctaLabel: rawContent?.ctaLabel || fallback.ctaLabel,
    ctaLabel_sr: rawContent?.ctaLabel_sr || null,
    ctaHref: rawContent?.ctaHref || fallback.ctaHref,
    copyrightText: normalizeCopyrightText(rawContent?.copyrightText, fallback.copyrightText),
    portfolioLabel: rawContent?.portfolioLabel || fallback.portfolioLabel,
    portfolioLabel_sr: rawContent?.portfolioLabel_sr || null,
    privacyLabel: rawContent?.privacyLabel || fallback.privacyLabel,
    privacyLabel_sr: rawContent?.privacyLabel_sr || null,
    privacyHref: rawContent?.privacyHref || fallback.privacyHref,
    socials: normalizeSocials(rawContent?.socials, fallback.socials),
  }
}

function useFooterContent() {
  const [data, setData] = useState(DEFAULT_FOOTER_CONTENT)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    let isMounted = true

    async function loadFooterContent() {
      try {
        setLoading(true)
        const footerData = await sanityClient.fetch(FOOTER_QUERY)
        if (!isMounted) return

        setData(normalizeFooterContent(footerData))
        setError(null)
      } catch (fetchError) {
        if (!isMounted) return
        setError(fetchError)
        setData(DEFAULT_FOOTER_CONTENT)
      } finally {
        if (isMounted) setLoading(false)
      }
    }

    loadFooterContent()

    return () => {
      isMounted = false
    }
  }, [])

  return { loading, error, data }
}

export default useFooterContent
