import { SITE_URL, SITE_NAME } from './SEO'
import {
  OWNER_ALTERNATE_NAME,
  OWNER_EMAIL,
  OWNER_JOB_TITLE,
  OWNER_NAME,
  PROFILE_LINKS,
} from '../../lib/siteProfileData'

const HOME_URL = `${SITE_URL}/`
const PERSON_ID = `${SITE_URL}/#person`
const WEBSITE_ID = `${SITE_URL}/#website`
const WEBPAGE_ID = `${SITE_URL}/#webpage`

function JsonLd({ schema }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}

// Home page: one @graph with the site, the profile page and the person it is about (client-seo 4.7).
export function HomeSchema() {
  const schema = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebSite',
        '@id': WEBSITE_ID,
        name: SITE_NAME,
        url: HOME_URL,
        description: 'Portfolio of Anka Ljusic - digital designer based in Belgrade, Serbia.',
        publisher: { '@id': PERSON_ID },
      },
      {
        '@type': 'ProfilePage',
        '@id': WEBPAGE_ID,
        name: `${SITE_NAME} - ${OWNER_JOB_TITLE}`,
        url: HOME_URL,
        isPartOf: { '@id': WEBSITE_ID },
        mainEntity: { '@id': PERSON_ID },
      },
      {
        '@type': 'Person',
        '@id': PERSON_ID,
        name: OWNER_NAME,
        alternateName: OWNER_ALTERNATE_NAME,
        jobTitle: OWNER_JOB_TITLE,
        url: HOME_URL,
        image: `${SITE_URL}/images/og-cover.jpg`,
        email: OWNER_EMAIL,
        address: {
          '@type': 'PostalAddress',
          addressLocality: 'Belgrade',
          addressCountry: 'RS',
        },
        knowsAbout: [
          'Brand Identity Design',
          'UI/UX Design',
          'Web Design',
          'Product Design',
          'Marketing Design',
          'Presentation Design',
        ],
        sameAs: PROFILE_LINKS,
      },
    ],
  }

  return <JsonLd schema={schema} />
}

export function ProjectSchema({ title, client, description, image, slug }) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'CreativeWork',
    name: title,
    description,
    image,
    url: `${SITE_URL}/projects/${slug}`,
    creator: {
      '@type': 'Person',
      '@id': PERSON_ID,
      name: OWNER_NAME,
      url: HOME_URL,
    },
    ...(client && { contributor: { '@type': 'Organization', name: client } }),
  }

  return <JsonLd schema={schema} />
}

export function BreadcrumbSchema({ items }) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: `${SITE_URL}${item.url}`,
    })),
  }

  return <JsonLd schema={schema} />
}
