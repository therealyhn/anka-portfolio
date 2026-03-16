import {defineArrayMember, defineField, defineType} from 'sanity'

export const aboutSection = defineType({
  name: 'aboutSection',
  title: 'About Section',
  type: 'document',
  fields: [
    defineField({
      name: 'eyebrowLabel',
      title: 'Eyebrow Label',
      type: 'string',
      initialValue: 'About me',
      validation: (Rule) => Rule.required().max(40),
    }),
    defineField({
      name: 'titleLineOne',
      title: 'Title Line One',
      type: 'string',
      initialValue: 'Why',
      validation: (Rule) => Rule.required().max(40),
    }),
    defineField({
      name: 'titleAccent',
      title: 'Title Accent (Italic Word)',
      type: 'string',
      initialValue: 'choose',
      validation: (Rule) => Rule.required().max(30),
    }),
    defineField({
      name: 'titleLineTwo',
      title: 'Title Line Two',
      type: 'string',
      initialValue: 'me',
      validation: (Rule) => Rule.required().max(40),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 3,
      initialValue: 'A practical, reliable approach focused on quality, clarity, and long-term results.',
      validation: (Rule) => Rule.required().max(220),
    }),
    defineField({
      name: 'experienceTitle',
      title: 'Experience Card Title',
      type: 'string',
      initialValue: 'My experience',
      validation: (Rule) => Rule.required().max(80),
    }),
    defineField({
      name: 'experienceText',
      title: 'Experience Card Text',
      type: 'text',
      rows: 6,
      validation: (Rule) => Rule.required().max(600),
    }),
    defineField({
      name: 'portraitImage',
      title: 'Portrait Image',
      type: 'image',
      options: {hotspot: true},
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'earthImage',
      title: 'Location Background Image',
      type: 'image',
      options: {hotspot: true},
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'locationTitle',
      title: 'Location Title',
      type: 'string',
      initialValue: 'Based in Belgrade, Serbia',
      validation: (Rule) => Rule.required().max(100),
    }),
    defineField({
      name: 'locationStatus',
      title: 'Location Status',
      type: 'string',
      initialValue: 'Working worldwide',
      validation: (Rule) => Rule.required().max(60),
    }),
    defineField({
      name: 'yearsValue',
      title: 'Years Stat Value',
      type: 'string',
      initialValue: '2.5+',
      validation: (Rule) => Rule.required().max(20),
    }),
    defineField({
      name: 'yearsLabel',
      title: 'Years Stat Label',
      type: 'string',
      initialValue: 'Years of hands-on design experience.',
      validation: (Rule) => Rule.required().max(120),
    }),
    defineField({
      name: 'assetsValue',
      title: 'Assets Stat Value',
      type: 'string',
      initialValue: '20+',
      validation: (Rule) => Rule.required().max(20),
    }),
    defineField({
      name: 'assetsLabel',
      title: 'Assets Stat Label',
      type: 'string',
      initialValue: 'Assets types (web, ads, emails, dashboards).',
      validation: (Rule) => Rule.required().max(140),
    }),
    defineField({
      name: 'tools',
      title: 'Tools Row',
      type: 'array',
      validation: (Rule) => Rule.required().min(1).max(12),
      of: [
        defineArrayMember({
          type: 'object',
          name: 'toolItem',
          fields: [
            defineField({
              name: 'title',
              title: 'Tool Name',
              type: 'string',
              validation: (Rule) => Rule.required().max(60),
            }),
            defineField({
              name: 'description',
              title: 'Tool Description',
              type: 'string',
              validation: (Rule) => Rule.required().max(160),
            }),
            defineField({
              name: 'icon',
              title: 'Tool Icon',
              type: 'image',
              options: {hotspot: true},
              validation: (Rule) => Rule.required(),
            }),
          ],
          preview: {
            select: {
              title: 'title',
              subtitle: 'description',
              media: 'icon',
            },
            prepare({title, subtitle, media}) {
              return {
                title: title || 'Tool',
                subtitle: subtitle || 'No description',
                media,
              }
            },
          },
        }),
      ],
    }),
    defineField({
      name: 'testimonials',
      title: 'Testimonials Slider',
      description: 'Each testimonial is one slide in the About section swiper.',
      type: 'array',
      validation: (Rule) => Rule.required().min(1).max(20),
      of: [
        defineArrayMember({
          type: 'object',
          name: 'testimonialItem',
          fields: [
            defineField({
              name: 'quoteLineOne',
              title: 'Quote Line One',
              type: 'text',
              rows: 3,
              validation: (Rule) => Rule.required().max(260),
            }),
            defineField({
              name: 'quoteLineTwo',
              title: 'Quote Line Two',
              type: 'text',
              rows: 4,
              validation: (Rule) => Rule.max(360),
            }),
            defineField({
              name: 'name',
              title: 'Author Name',
              type: 'string',
              validation: (Rule) => Rule.required().max(80),
            }),
            defineField({
              name: 'role',
              title: 'Author Role',
              type: 'string',
              validation: (Rule) => Rule.required().max(140),
            }),
            defineField({
              name: 'avatar',
              title: 'Author Avatar',
              type: 'image',
              options: {hotspot: true},
              validation: (Rule) => Rule.required(),
            }),
          ],
          preview: {
            select: {
              title: 'name',
              subtitle: 'role',
              media: 'avatar',
            },
            prepare({title, subtitle, media}) {
              return {
                title: title || 'Testimonial',
                subtitle: subtitle || 'No role',
                media,
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
      titleLineTwo: 'titleLineTwo',
      media: 'portraitImage',
    },
    prepare({titleLineOne, titleAccent, titleLineTwo, media}) {
      return {
        title: `${titleLineOne || ''} ${titleAccent || ''} ${titleLineTwo || ''}`.trim() || 'About Section',
        subtitle: 'Homepage About Content',
        media,
      }
    },
  },
})
