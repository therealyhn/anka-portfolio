// Runs before `vite`, `vite build` and the sitemap (package.json): reads the published content from the
// Maestro CMS public API and writes src/generated/cms-content.json, which the site imports through
// src/lib/cms.js and scripts/generate-sitemap.mjs reads for the project routes (card MS.11a in
// maestro-cms). Text enters the site at build time; the browser loads only the images, from the CMS
// public media URLs. Without CMS_API_URL, without a response or without a published entry the build
// stops: a site without projects or sections is never published.
import { existsSync } from 'node:fs'
import { mkdir, writeFile } from 'node:fs/promises'
import path from 'node:path'

const OUTPUT = path.resolve('src/generated/cms-content.json')
const TIMEOUT_MS = 20000
const EXAMPLE_URL = 'http://127.0.0.1:8095/dashboard/api/v1'
// The public API returns at most 100 entries per page (`perPage` above that is reduced).
const PER_PAGE = 100

const isText = (value) => typeof value === 'string' && value.trim() !== ''
const isImage = (value) => typeof value?.urls?.original === 'string'
const isList = (value) => Array.isArray(value) && value.length > 0
const firstMissing = (data, fields) => fields.find((field) => !isText(data[field]))

// Types from cms/content-schema.php. The four sections are `single`, so the site reads the newest
// published entry of each; `projekti` is a collection and the site reads all of its entries.
const SECTIONS = [
  {
    key: 'uvod',
    name: 'Uvod',
    invalidField: (data) => firstMissing(data, ['title_line_one', 'title_accent', 'title_line_two', 'description']),
  },
  {
    key: 'usluge',
    name: 'Usluge',
    invalidField: (data) =>
      firstMissing(data, ['eyebrow_label', 'title_line_one', 'title_accent', 'title_line_two', 'description']) ??
      (isList(data.items) && data.items.every((item) => isText(item?.label)) ? undefined : 'items'),
  },
  {
    key: 'o-meni',
    name: 'O meni',
    invalidField: (data) =>
      firstMissing(data, ['eyebrow_label', 'title_line_one', 'experience_title', 'location_title', 'years_value', 'assets_value']) ??
      ['portrait_image', 'earth_image'].find((field) => !isImage(data[field])) ??
      ['tools', 'testimonials'].find((field) => !isList(data[field])),
  },
  {
    key: 'podnozje',
    name: 'Podnožje',
    invalidField: (data) =>
      firstMissing(data, ['title_line_one', 'title_accent', 'cta_label', 'cta_href', 'privacy_href']) ??
      (isList(data.socials) ? undefined : 'socials'),
  },
]

const PROJECTS = {
  key: 'projekti',
  name: 'Projekti',
  invalidField: (entry) => (isText(entry.data?.title) ? (isImage(entry.data.thumbnail) ? undefined : 'thumbnail') : 'title'),
}

function apiBase() {
  // Locally CMS_API_URL may sit in .env.local; in CI the workflow sets it from a repository variable.
  if (!process.env.CMS_API_URL && existsSync('.env.local')) process.loadEnvFile('.env.local')

  const raw = process.env.CMS_API_URL?.trim()
  if (!raw) {
    throw new Error(
      `CMS_API_URL nije postavljen. Izrada čita sadržaj iz Maestro CMS-a: upiši adresu javnog API-ja instance, na primer CMS_API_URL=${EXAMPLE_URL} (lokalno u .env.local, u GitHub-u kao promenljivu repoa).`,
    )
  }

  let url
  try {
    url = new URL(raw)
  } catch {
    url = null
  }
  if (!url || (url.protocol !== 'http:' && url.protocol !== 'https:')) {
    throw new Error(`CMS_API_URL mora biti puna http ili https adresa javnog API-ja, na primer ${EXAMPLE_URL}.`)
  }

  return url.href.replace(/\/+$/, '')
}

async function readPage(base, typeKey, page, perPage) {
  const url = `${base}/public/content/${typeKey}?page=${page}&perPage=${perPage}`
  let response
  try {
    response = await fetch(url, { headers: { Accept: 'application/json' }, signal: AbortSignal.timeout(TIMEOUT_MS) })
  } catch (error) {
    throw new Error(`CMS ne odgovara na ${url} (${error.name}).`)
  }
  if (!response.ok) {
    throw new Error(`CMS je vratio HTTP ${response.status} za ${url}.`)
  }

  let body
  try {
    body = await response.json()
  } catch {
    throw new Error(`CMS nije vratio JSON za ${url}.`)
  }
  if (body?.success !== true || !Array.isArray(body.data) || !Number.isInteger(body.meta?.totalPages)) {
    throw new Error(`CMS je vratio neočekivan odgovor za ${url}.`)
  }

  return body
}

async function readNewestEntry(base, type) {
  const entry = (await readPage(base, type.key, 1, 1)).data[0]
  if (!entry) {
    throw new Error(`CMS nema objavljen unos tipa „${type.name}” (${type.key}). Objavi ga u dashboard-u, pa ponovi izradu.`)
  }

  const invalid = type.invalidField(entry.data ?? {})
  if (invalid) {
    throw new Error(`Objavljen unos tipa „${type.name}” (${type.key}) nema ispravno polje ${invalid}.`)
  }

  return entry.data
}

async function readAllEntries(base, type) {
  const entries = []
  for (let page = 1, totalPages = 1; page <= totalPages; page++) {
    const body = await readPage(base, type.key, page, PER_PAGE)
    totalPages = body.meta.totalPages
    entries.push(...body.data)
  }
  if (entries.length === 0) {
    throw new Error(`CMS nema nijedan objavljen unos tipa „${type.name}” (${type.key}). Objavi bar jedan u dashboard-u, pa ponovi izradu.`)
  }

  for (const entry of entries) {
    const invalid = type.invalidField(entry)
    if (invalid) {
      throw new Error(`Objavljen unos tipa „${type.name}” (${type.key}) sa adresom ${entry.slug} nema ispravno polje ${invalid}.`)
    }
  }

  return entries.map(({ slug, publishedAt, data }) => ({ slug, publishedAt, data }))
}

async function main() {
  const base = apiBase()
  const content = {}

  for (const type of SECTIONS) {
    content[type.key] = await readNewestEntry(base, type)
  }
  content[PROJECTS.key] = await readAllEntries(base, PROJECTS)

  await mkdir(path.dirname(OUTPUT), { recursive: true })
  await writeFile(OUTPUT, `${JSON.stringify(content, null, 2)}\n`, 'utf8')

  const names = SECTIONS.map((type) => type.name).join(', ')
  console.log(`CMS sadržaj upisan u ${path.relative(process.cwd(), OUTPUT)} (${names}; projekata: ${content.projekti.length}).`)
}

main().catch((error) => {
  console.error(`Sadržaj iz CMS-a nije učitan: ${error.message}`)
  process.exit(1)
})
