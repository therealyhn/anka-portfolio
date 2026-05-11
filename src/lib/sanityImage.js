const SANITY_CDN = 'cdn.sanity.io'

export function sanityImg(url, { w = 800, q = 80 } = {}) {
  if (!url || !url.includes(SANITY_CDN)) return url
  const base = url.split('?')[0]
  return `${base}?auto=format&w=${w}&q=${q}&fit=max`
}
