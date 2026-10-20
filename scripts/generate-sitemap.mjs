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
const TODAY = new Date().toISOString().split('T')[0]
const CONTENT = resolve(ROOT, 'src/generated/cms-content.json')

const STATIC_PAGES = [
  { url: '/',        priority: '1.0', changefreq: 'weekly'  },
  { url: '/contact', priority: '0.8', changefreq: 'monthly' },
  { url: '/privacy', priority: '0.3', changefreq: 'yearly'  },
]

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
    lastmod: /^\d{4}-\d{2}-\d{2}/.test(publishedAt ?? '') ? publishedAt.slice(0, 10) : TODAY,
  }))
}

// CMS slugs are lowercase letters, digits and hyphens; escaping still keeps any other value valid XML.
const escapeXml = (value) => String(value).replace(/[&<>"']/g, (ch) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&apos;' })[ch])

function urlEntry({ loc, lastmod, changefreq, priority }) {
  return [
    '  <url>',
    `    <loc>${escapeXml(loc)}</loc>`,
    `    <lastmod>${lastmod}</lastmod>`,
    `    <changefreq>${changefreq}</changefreq>`,
    `    <priority>${priority}</priority>`,
    '  </url>',
  ].join('\n')
}

const projects = readProjects()

const entries = [
  ...STATIC_PAGES.map((p) =>
    urlEntry({ loc: `${SITE_URL}${p.url}`, lastmod: TODAY, changefreq: p.changefreq, priority: p.priority })
  ),
  ...projects.map(({ slug, lastmod }) =>
    urlEntry({ loc: `${SITE_URL}/projects/${slug}`, lastmod, changefreq: 'monthly', priority: '0.7' })
  ),
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
