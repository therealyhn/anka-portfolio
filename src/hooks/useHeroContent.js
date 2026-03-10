import { useEffect, useState } from 'react'
import { sanityClient } from '../lib/sanityClient'

const HERO_QUERY = `
  coalesce(
    *[_type == "heroSection" && _id == "heroSection"][0],
    *[_type == "heroSection"] | order(_updatedAt desc)[0]
  ){
    "titleLineOne": coalesce(titleLineOne, headingLineOne, heroTitleLineOne),
    "titleAccent": coalesce(titleAccent, headingAccent, heroTitleAccent),
    "titleLineTwo": coalesce(titleLineTwo, headingLineTwo, heroTitleLineTwo),
    "description": coalesce(description, introText, designProductsText, heroDescription)
  }
`

const DEFAULT_HERO_CONTENT = {
  titleLineOne: "Hello I'm Anka",
  titleAccent: 'Digital',
  titleLineTwo: 'Designer',
  description: 'I design products, platforms, and everything in between, made to make sense the first time you use them.',
}

function useHeroContent() {
  const [data, setData] = useState(DEFAULT_HERO_CONTENT)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    let isMounted = true

    async function loadHeroContent() {
      try {
        setLoading(true)
        const heroData = await sanityClient.fetch(HERO_QUERY)
        if (!isMounted) return

        setData({
          titleLineOne: heroData?.titleLineOne || DEFAULT_HERO_CONTENT.titleLineOne,
          titleAccent: heroData?.titleAccent || DEFAULT_HERO_CONTENT.titleAccent,
          titleLineTwo: heroData?.titleLineTwo || DEFAULT_HERO_CONTENT.titleLineTwo,
          description: heroData?.description || DEFAULT_HERO_CONTENT.description,
        })
        setError(null)
      } catch (fetchError) {
        if (!isMounted) return
        setError(fetchError)
        setData(DEFAULT_HERO_CONTENT)
      } finally {
        if (isMounted) setLoading(false)
      }
    }

    loadHeroContent()

    return () => {
      isMounted = false
    }
  }, [])

  return { loading, error, data }
}

export default useHeroContent
