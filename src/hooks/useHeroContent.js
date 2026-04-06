import { useEffect, useState } from 'react'
import { sanityClient } from '../lib/sanityClient'

const HERO_QUERY = `
  coalesce(
    *[_type == "heroSection" && _id == "heroSection"][0],
    *[_type == "heroSection"] | order(_updatedAt desc)[0]
  ){
    "titleLineOne": coalesce(titleLineOne, headingLineOne, heroTitleLineOne),
    "titleLineOne_sr": coalesce(titleLineOne_sr, null),
    "titleAccent": coalesce(titleAccent, headingAccent, heroTitleAccent),
    "titleAccent_sr": coalesce(titleAccent_sr, null),
    "titleLineTwo": coalesce(titleLineTwo, headingLineTwo, heroTitleLineTwo),
    "titleLineTwo_sr": coalesce(titleLineTwo_sr, null),
    "description": coalesce(description, introText, designProductsText, heroDescription),
    "description_sr": coalesce(description_sr, null)
  }
`

const DEFAULT_HERO_CONTENT = {
  titleLineOne: "Hello I'm Anka",
  titleLineOne_sr: null,
  titleAccent: 'Digital',
  titleAccent_sr: null,
  titleLineTwo: 'Designer',
  titleLineTwo_sr: null,
  description: 'I design products, platforms, and everything in between, made to make sense the first time you use them.',
  description_sr: null,
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
          titleLineOne_sr: heroData?.titleLineOne_sr || null,
          titleAccent: heroData?.titleAccent || DEFAULT_HERO_CONTENT.titleAccent,
          titleAccent_sr: heroData?.titleAccent_sr || null,
          titleLineTwo: heroData?.titleLineTwo || DEFAULT_HERO_CONTENT.titleLineTwo,
          titleLineTwo_sr: heroData?.titleLineTwo_sr || null,
          description: heroData?.description || DEFAULT_HERO_CONTENT.description,
          description_sr: heroData?.description_sr || null,
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
