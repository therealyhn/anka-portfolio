// Content from the Maestro CMS, read at build time (scripts/fetch-cms-content.mjs). Components get the
// shapes and Sanity field names the former Sanity queries returned (src/hooks/use*Content.js until
// MS.11a in maestro-cms), so only the data source changes in them. CMS keys are the Sanity names in
// snake case: `title_line_one` here is `titleLineOne` there, and `_sr` is the Serbian text.
import content from '../generated/cms-content.json'
import projectPlaceholder from '../assets/images/projects/project-placeholder.svg'

// Variants of the CMS public media and their widths (contract 3.13 in maestro-cms). A variant exists
// only when the original is wider, so `urls` carries only the ones that exist.
const MEDIA_VARIANT_WIDTHS = Object.freeze([
  ['thumb', 320],
  ['medium', 768],
  ['large', 1600],
])

// Existing variants from the smallest to the largest. Without the `large` variant the original is not
// wider than 1600 px, so it joins as the largest size; with it the original is too heavy to show.
function imageSizes(image) {
  const sizes = MEDIA_VARIANT_WIDTHS.filter(([variant]) => image.urls[variant]).map(([variant, width]) => ({
    url: image.urls[variant],
    width,
  }))

  if (!image.urls.large && image.width) sizes.push({ url: image.urls.original, width: image.width })

  return sizes
}

// `srcSet` from the variants; the component sets `sizes` from its own layout.
function imageSrcSet(image) {
  if (!image?.urls) return undefined

  return imageSizes(image)
    .map((size) => `${size.url} ${size.width}w`)
    .join(', ')
}

// Single URL in place of the Sanity `w=900` and `w=1600` image URLs: the `large` variant, or the
// original when it is not wider than 1600 px. A media item deleted from the library gives no URL.
function largeImageUrl(image) {
  return image?.urls ? (image.urls.large ?? image.urls.original) : undefined
}

// Small fixed-size images (tool icons, testimonial avatars), which Sanity served as originals.
function smallImageUrl(image) {
  return image?.urls ? (image.urls.thumb ?? image.urls.original) : undefined
}

// A `textarea` with one item per line (Sanity string arrays, `as: lines` in cms/sanity-map.json).
function lines(value) {
  return typeof value === 'string'
    ? value
        .split(/\r?\n/)
        .map((line) => line.trim())
        .filter(Boolean)
    : []
}

function trimLeadingQuote(value) {
  return String(value || '').trim().replace(/^["'“”]+/, '')
}

function trimTrailingQuote(value) {
  return String(value || '').trim().replace(/["'“”]+$/, '')
}

const hero = content.uvod
const services = content.usluge
const about = content['o-meni']
const footer = content.podnozje

// As `*[_type == "project"] | order(sortOrder asc, _createdAt desc)`; a project without a sort order
// goes last. The CMS has no creation date and lists the newest publication first, so equal orders go
// from the oldest publication: after the Sanity import that is the creation order the site showed.
const projectEntries = content.projekti
  .map((entry, index) => ({ entry, index }))
  .sort((a, b) => {
    const left = typeof a.entry.data.sort_order === 'number' ? a.entry.data.sort_order : Infinity
    const right = typeof b.entry.data.sort_order === 'number' ? b.entry.data.sort_order : Infinity

    return left === right ? b.index - a.index : left - right
  })
  .map(({ entry }) => entry)

// As `*[_type == "project"]{...}` in the former useProjectsContent, with `image` the card image.
export const projects = Object.freeze(
  projectEntries.map(({ slug, data }) =>
    Object.freeze({
      id: slug,
      slug,
      title: data.title,
      title_sr: data.title_sr || null,
      client: data.client,
      client_sr: data.client_sr || null,
      role: data.role || null,
      role_sr: data.role_sr || null,
      image: largeImageUrl(data.thumbnail),
      imageSrcSet: imageSrcSet(data.thumbnail),
      overview: data.overview || null,
      overview_sr: data.overview_sr || null,
      year: data.year || null,
      location: data.location || null,
      location_sr: data.location_sr || null,
      duration: data.duration || null,
      duration_sr: data.duration_sr || null,
      stack: data.stack || null,
      stack_sr: data.stack_sr || null,
      services: lines(data.services),
      services_sr: lines(data.services_sr),
      galleryImages: (data.gallery_images ?? []).map((item) => largeImageUrl(item?.image)).filter(Boolean),
    }),
  ),
)

const projectImageBySlug = new Map(projects.map((project) => [project.slug, project.image]))

// As `*[_type == "heroSection"]{...}`.
export const heroContent = Object.freeze({
  titleLineOne: hero.title_line_one,
  titleLineOne_sr: hero.title_line_one_sr || null,
  titleAccent: hero.title_accent,
  titleAccent_sr: hero.title_accent_sr || null,
  titleLineTwo: hero.title_line_two,
  titleLineTwo_sr: hero.title_line_two_sr || null,
  description: hero.description,
  description_sr: hero.description_sr || null,
})

// As `*[_type == "servicesSection"]{...}`: `previewImage` is the item image or, without it, the card
// image of the project the item points to (the former `coalesce` in the query); an item with neither
// keeps the placeholder it had before the migration.
export const servicesContent = Object.freeze({
  eyebrowLabel: services.eyebrow_label,
  eyebrowLabel_sr: services.eyebrow_label_sr || null,
  titleLineOne: services.title_line_one,
  titleLineOne_sr: services.title_line_one_sr || null,
  titleAccent: services.title_accent,
  titleAccent_sr: services.title_accent_sr || null,
  titleLineTwo: services.title_line_two,
  titleLineTwo_sr: services.title_line_two_sr || null,
  description: services.description,
  description_sr: services.description_sr || null,
  items: Object.freeze(
    services.items.map((item, index) =>
      Object.freeze({
        id: `service-${index + 1}`,
        label: item.label,
        label_sr: item.label_sr || null,
        hoverLabel: item.hover_label || item.label,
        hoverLabel_sr: item.hover_label_sr || null,
        description: item.description || '',
        description_sr: item.description_sr || null,
        tags: lines(item.tags),
        tags_sr: lines(item.tags_sr),
        previewProjectSlug: item.preview_project?.slug ?? '',
        previewImage: largeImageUrl(item.preview_image) ?? projectImageBySlug.get(item.preview_project?.slug) ?? projectPlaceholder,
      }),
    ),
  ),
})

// As `*[_type == "aboutSection"]{...}`.
export const aboutContent = Object.freeze({
  eyebrowLabel: about.eyebrow_label,
  eyebrowLabel_sr: about.eyebrow_label_sr || null,
  titleLineOne: about.title_line_one,
  titleLineOne_sr: about.title_line_one_sr || null,
  titleAccent: about.title_accent,
  titleAccent_sr: about.title_accent_sr || null,
  titleLineTwo: about.title_line_two,
  titleLineTwo_sr: about.title_line_two_sr || null,
  description: about.description,
  description_sr: about.description_sr || null,
  experienceTitle: about.experience_title,
  experienceTitle_sr: about.experience_title_sr || null,
  experienceText: about.experience_text,
  experienceText_sr: about.experience_text_sr || null,
  locationTitle: about.location_title,
  locationTitle_sr: about.location_title_sr || null,
  locationStatus: about.location_status,
  locationStatus_sr: about.location_status_sr || null,
  yearsValue: about.years_value,
  yearsLabel: about.years_label,
  yearsLabel_sr: about.years_label_sr || null,
  assetsValue: about.assets_value,
  assetsLabel: about.assets_label,
  assetsLabel_sr: about.assets_label_sr || null,
  portraitImage: Object.freeze({
    url: largeImageUrl(about.portrait_image),
    srcSet: imageSrcSet(about.portrait_image),
    width: about.portrait_image.width,
    height: about.portrait_image.height,
  }),
  earthImage: largeImageUrl(about.earth_image),
  testimonials: Object.freeze(
    about.testimonials
      .map((item, index) => {
        const quoteLineOne = trimLeadingQuote(item.quote_line_one)
        const quoteLineTwo = trimTrailingQuote(item.quote_line_two)

        if (!quoteLineOne && !quoteLineTwo) return null

        return Object.freeze({
          id: `testimonial-${index + 1}`,
          quoteLineOne,
          quoteLineOne_sr: item.quote_line_one_sr || null,
          quoteLineTwo,
          quoteLineTwo_sr: item.quote_line_two_sr || null,
          name: item.name,
          role: item.role || '',
          role_sr: item.role_sr || null,
          avatar: smallImageUrl(item.avatar),
        })
      })
      .filter(Boolean),
  ),
  tools: Object.freeze(
    about.tools
      .filter((item) => item.title)
      .map((item, index) =>
        Object.freeze({
          id: `tool-${index + 1}`,
          title: item.title,
          description: item.description || '',
          description_sr: item.description_sr || null,
          icon: smallImageUrl(item.icon),
        }),
      ),
  ),
})

// As `*[_type == "footerSection"]{...}`; the copyright sign comes from the footer markup, not the text.
export const footerContent = Object.freeze({
  availabilityLabel: footer.availability_label,
  availabilityLabel_sr: footer.availability_label_sr || null,
  titleLineOne: footer.title_line_one,
  titleLineOne_sr: footer.title_line_one_sr || null,
  titleAccent: footer.title_accent,
  titleAccent_sr: footer.title_accent_sr || null,
  description: footer.description,
  description_sr: footer.description_sr || null,
  ctaLabel: footer.cta_label,
  ctaLabel_sr: footer.cta_label_sr || null,
  ctaHref: footer.cta_href,
  copyrightText: String(footer.copyright_text || '').replace(/^[\s©?�]+/, '').trim(),
  portfolioLabel: footer.portfolio_label,
  portfolioLabel_sr: footer.portfolio_label_sr || null,
  privacyLabel: footer.privacy_label,
  privacyLabel_sr: footer.privacy_label_sr || null,
  privacyHref: footer.privacy_href,
  socials: Object.freeze(
    footer.socials
      .map((item, index) => {
        const platform = String(item.platform || '').trim().toLowerCase()

        return platform ? Object.freeze({ id: `${platform}-${index}`, platform, url: String(item.url || '').trim() || '#' }) : null
      })
      .filter(Boolean),
  ),
})
