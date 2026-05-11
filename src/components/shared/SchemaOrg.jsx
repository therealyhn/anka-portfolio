import { SITE_URL, SITE_NAME } from './SEO'

export function PersonSchema() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Anka Ljusic',
    jobTitle: 'Digital Designer',
    url: SITE_URL,
    image: `${SITE_URL}/images/og-cover.jpg`,
    email: 'hello@ljsc-design.com',
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
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}

export function WebSiteSchema() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: SITE_NAME,
    url: SITE_URL,
    description:
      'Portfolio of Anka Ljusic — digital designer based in Belgrade, Serbia.',
    author: {
      '@type': 'Person',
      name: 'Anka Ljusic',
    },
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
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
      name: 'Anka Ljusic',
      url: SITE_URL,
    },
    ...(client && { contributor: { '@type': 'Organization', name: client } }),
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
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

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}
