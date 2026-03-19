import {defineArrayMember, defineField, defineType} from 'sanity'

export const servicesSection = defineType({
  name: 'servicesSection',
  title: 'Services Section',
  type: 'document',
  fields: [
    defineField({
      name: 'eyebrowLabel',
      title: 'Eyebrow Label',
      type: 'string',
      initialValue: 'Services',
      validation: (Rule) => Rule.required().max(40),
    }),
    defineField({
      name: 'titleLineOne',
      title: 'Title Line One',
      type: 'string',
      initialValue: 'What I can',
      validation: (Rule) => Rule.required().max(40),
    }),
    defineField({
      name: 'titleAccent',
      title: 'Title Accent (Italic Word)',
      type: 'string',
      initialValue: 'design',
      validation: (Rule) => Rule.required().max(30),
    }),
    defineField({
      name: 'titleLineTwo',
      title: 'Title Line Two',
      type: 'string',
      initialValue: 'for your team',
      validation: (Rule) => Rule.required().max(60),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 4,
      initialValue:
        'Delivering thoughtful and engaging design across brands, websites, and marketing assets - all created to be clear, consistent, and just a bit fun along the way.',
      validation: (Rule) => Rule.required().max(260),
    }),
    defineField({
      name: 'items',
      title: 'Service Items',
      type: 'array',
      validation: (Rule) => Rule.required().min(1).max(8),
      of: [
        defineArrayMember({
          type: 'object',
          name: 'serviceItem',
          title: 'Service Item',
          validation: (Rule) =>
            Rule.custom((value) => {
              const hasPreviewImage = Boolean(value?.previewImage?.asset?._ref || value?.previewImage?.asset?._id)
              const hasPreviewProject = Boolean(value?.previewProject?._ref)

              if (hasPreviewImage || hasPreviewProject) return true
              return 'Set Preview Image or Preview Project for this service item.'
            }),
          fields: [
            defineField({
              name: 'label',
              title: 'Label',
              type: 'string',
              validation: (Rule) => Rule.required().max(80),
            }),
            defineField({
              name: 'hoverLabel',
              title: 'Hover Label',
              type: 'string',
              validation: (Rule) => Rule.required().max(120),
            }),
            defineField({
              name: 'description',
              title: 'Expanded Description',
              type: 'text',
              rows: 4,
              validation: (Rule) => Rule.required().max(320),
            }),
            defineField({
              name: 'tags',
              title: 'Tags',
              type: 'array',
              of: [{type: 'string'}],
              validation: (Rule) => Rule.max(8),
            }),
            defineField({
              name: 'previewProject',
              title: 'Preview Project (Optional)',
              description:
                'If selected, preview image is pulled from this project thumbnail.',
              type: 'reference',
              to: [{type: 'project'}],
            }),
            defineField({
              name: 'previewImage',
              title: 'Preview Image Override (Optional)',
              description:
                'If set, this image is used before Preview Project image.',
              type: 'image',
              options: {hotspot: true},
            }),
          ],
          preview: {
            select: {
              title: 'label',
              subtitle: 'hoverLabel',
              media: 'previewImage',
            },
            prepare({title, subtitle, media}) {
              return {
                title: title || 'Untitled service item',
                subtitle: subtitle || 'No hover label',
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
    },
    prepare({titleLineOne, titleAccent, titleLineTwo}) {
      return {
        title: `${titleLineOne || ''} ${titleAccent || ''} ${titleLineTwo || ''}`.trim() || 'Services Section',
        subtitle: 'Homepage Services Content',
      }
    },
  },
})
