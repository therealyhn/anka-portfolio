import { Helmet } from 'react-helmet-async'

export const SITE_URL = 'https://ljsc-design.com'
export const SITE_NAME = 'Anka Ljusic'
const DEFAULT_DESCRIPTION =
  'Digital designer based in Belgrade, specializing in brand identity, web & product UI, and marketing visuals. Available for freelance projects worldwide.'
const DEFAULT_IMAGE = `${SITE_URL}/images/og-cover.jpg`

function SEO({
  title,
  description = DEFAULT_DESCRIPTION,
  image = DEFAULT_IMAGE,
  url = '/',
  type = 'website',
  noIndex = false,
}) {
  const fullTitle = title ? `${title} | ${SITE_NAME}` : `${SITE_NAME} — Digital Designer`
  const fullUrl = url.startsWith('http') ? url : `${SITE_URL}${url}`

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta name="robots" content={noIndex ? 'noindex, nofollow' : 'index, follow'} />
      <link rel="canonical" href={fullUrl} />

      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:url" content={fullUrl} />
      <meta property="og:type" content={type} />
      <meta property="og:site_name" content={SITE_NAME} />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
    </Helmet>
  )
}

export default SEO
