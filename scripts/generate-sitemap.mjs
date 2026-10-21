/**
 * Generates public/sitemap.xml by fetching all project slugs from Sanity.
 * Run: npm run sitemap
 * Called automatically before: npm run build
 */
import { createClient } from '@sanity/client'
import { writeFileSync } from 'fs'
import { resolve } from 'path'
import { fileURLToPath } from 'url'

const ROOT = resolve(fileURLToPath(new URL('.', import.meta.url)), '..')
const SITE_URL = process.env.VITE_SITE_URL || 'https://ljsc-design.com'

const client = createClient({
  projectId: process.env.VITE_SANITY_PROJECT_ID || 'v69k4zml',
  dataset: process.env.VITE_SANITY_DATASET || 'production',
  apiVersion: '2025-01-01',
  useCdn: true,
})

// No lastmod for these: their content has no reliable change date (client-seo 4.4).
const STATIC_PAGES = ['/', '/contact', '/privacy']

async function fetchProjects() {
  try {
    const projects = await client.fetch(
      `*[_type == "project" && defined(slug)] | order(_updatedAt desc) { "slug": slug.current, "lastmod": _updatedAt }`
    )
    return Array.isArray(projects)
      ? projects
          .filter((p) => p.slug)
          .map((p) => ({ slug: p.slug, lastmod: p.lastmod ? p.lastmod.split('T')[0] : null }))
      : []
  } catch {
    console.warn('⚠  Could not fetch Sanity projects — generating sitemap without project pages.')
    return []
  }
}

// Sanity slugs can contain & or quotes (e.g. social-posts-&-ads); XML needs them as entities.
const escapeXml = (value) => String(value).replace(/[&<>"']/g, (ch) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&apos;' })[ch])

function urlEntry({ loc, lastmod }) {
  return [
    '  <url>',
    `    <loc>${escapeXml(loc)}</loc>`,
    ...(lastmod ? [`    <lastmod>${lastmod}</lastmod>`] : []),
    '  </url>',
  ].join('\n')
}

const projects = await fetchProjects()

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
