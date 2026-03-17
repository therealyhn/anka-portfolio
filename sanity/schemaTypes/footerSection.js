import {defineArrayMember, defineField, defineType} from 'sanity'

export const footerSection = defineType({
  name: 'footerSection',
  title: 'Footer Section',
  type: 'document',
  fields: [
    defineField({
      name: 'availabilityLabel',
      title: 'Availability Label',
      type: 'string',
      initialValue: 'Available for work',
      validation: (Rule) => Rule.required().max(60),
    }),
    defineField({
      name: 'titleLineOne',
      title: 'Title Line One',
      type: 'string',
      initialValue: "Let's",
      validation: (Rule) => Rule.required().max(30),
    }),
    defineField({
      name: 'titleAccent',
      title: 'Title Accent (Italic Word)',
      type: 'string',
      initialValue: 'Connect',
      validation: (Rule) => Rule.required().max(30),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 3,
      initialValue: "Always open to new projects and collaborations. Let's talk about what you're building.",
      validation: (Rule) => Rule.required().max(220),
    }),
    defineField({
      name: 'ctaLabel',
      title: 'CTA Label',
      type: 'string',
      initialValue: 'Start a conversation',
      validation: (Rule) => Rule.required().max(60),
    }),
    defineField({
      name: 'ctaHref',
      title: 'CTA URL',
      description: 'Use /#contact for internal anchor, or full https:// for external links.',
      type: 'string',
      initialValue: '/#contact',
      validation: (Rule) => Rule.required().max(200),
    }),
    defineField({
      name: 'copyrightText',
      title: 'Copyright Text',
      type: 'string',
      initialValue: '©Anka Ljusic, 2026',
      validation: (Rule) => Rule.required().max(120),
    }),
    defineField({
      name: 'portfolioLabel',
      title: 'Portfolio Label',
      type: 'string',
      initialValue: 'Personal Portfolio',
      validation: (Rule) => Rule.required().max(80),
    }),
    defineField({
      name: 'privacyLabel',
      title: 'Privacy Label',
      type: 'string',
      initialValue: 'Privacy Policy',
      validation: (Rule) => Rule.required().max(80),
    }),
    defineField({
      name: 'privacyHref',
      title: 'Privacy URL',
      type: 'string',
      initialValue: '/privacy',
      validation: (Rule) => Rule.required().max(200),
    }),
    defineField({
      name: 'socials',
      title: 'Social Links',
      type: 'array',
      validation: (Rule) => Rule.required().min(1).max(8),
      of: [
        defineArrayMember({
          type: 'object',
          name: 'socialItem',
          fields: [
            defineField({
              name: 'platform',
              title: 'Platform',
              type: 'string',
              options: {
                list: [
                  {title: 'LinkedIn', value: 'linkedin'},
                  {title: 'Upwork', value: 'upwork'},
                  {title: 'Fiverr', value: 'fiverr'},
                  {title: 'Dribbble', value: 'dribbble'},
                  {title: 'Instagram', value: 'instagram'},
                ],
              },
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'url',
              title: 'URL',
              type: 'string',
              validation: (Rule) => Rule.required().max(300),
            }),
          ],
          preview: {
            select: {
              title: 'platform',
              subtitle: 'url',
            },
            prepare({title, subtitle}) {
              return {
                title: title || 'Social',
                subtitle: subtitle || 'No URL',
              }
            },
          },
        }),
      ],
    }),
  ],
  preview: {
    select: {
      titleLineOne: 'titleLineOne',
      titleAccent: 'titleAccent',
    },
    prepare({titleLineOne, titleAccent}) {
      return {
        title: `${titleLineOne || ''} ${titleAccent || ''}`.trim() || 'Footer Section',
        subtitle: 'Homepage Footer Content',
      }
    },
  },
})
