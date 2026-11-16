/**
 * Generates public/sitemap.xml from the project entries of the Maestro CMS, which
 * scripts/fetch-cms-content.mjs wrote to src/generated/cms-content.json.
 * Run: npm run sitemap
 * Called automatically before: npm run build
 */
import { readFileSync, writeFileSync } from 'fs'
import { resolve } from 'path'
import { fileURLToPath } from 'url'

const ROOT = resolve(fileURLToPath(new URL('.', import.meta.url)), '..')
const SITE_URL = process.env.VITE_SITE_URL || 'https://ljsc-design.com'
const CONTENT = resolve(ROOT, 'src/generated/cms-content.json')

// No lastmod for these: their content has no reliable change date (client-seo 4.4).
const STATIC_PAGES = ['/', '/contact', '/privacy']

// `publishedAt` of the CMS public API is `YYYY-MM-DD HH:MM:SS`; the newest publication comes first.
function readProjects() {
  let content
  try {
    content = JSON.parse(readFileSync(CONTENT, 'utf8'))
  } catch {
    throw new Error('src/generated/cms-content.json is missing or invalid: run node scripts/fetch-cms-content.mjs first.')
  }

  return content.projekti.map(({ slug, publishedAt }) => ({
    slug,
    lastmod: /^\d{4}-\d{2}-\d{2}/.test(publishedAt ?? '') ? publishedAt.slice(0, 10) : null,
  }))
}

// CMS slugs are lowercase letters, digits and hyphens; escaping still keeps any other value valid XML.
const escapeXml = (value) => String(value).replace(/[&<>"']/g, (ch) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&apos;' })[ch])

function urlEntry({ loc, lastmod }) {
  return [
    '  <url>',
    `    <loc>${escapeXml(loc)}</loc>`,
    ...(lastmod ? [`    <lastmod>${lastmod}</lastmod>`] : []),
    '  </url>',
  ].join('\n')
}

const projects = readProjects()

const entries = [
  ...STATIC_PAGES.map((url) => urlEntry({ loc: `${SITE_URL}${url}` })),
  ...projects.map(({ slug, lastmod }) => urlEntry({ loc: `${SITE_URL}/projects/${slug}`, lastmod })),
]

const xml = [
  '<?xml version="1.0" encoding="UTF-8"?>',
  '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
  ...entries,
  '</urlset>',
].join('\n')

const outPath = resolve(ROOT, 'public/sitemap.xml')
writeFileSync(outPath, xml, 'utf8')
console.log(`✓  sitemap.xml → ${projects.length} project(s) + ${STATIC_PAGES.length} static pages`)
