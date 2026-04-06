import {defineField, defineType} from 'sanity'

export const project = defineType({
  name: 'project',
  title: 'Project',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required().min(2).max(80),
    }),
    defineField({
      name: 'title_sr',
      title: 'Title (Srpski)',
      type: 'string',
      validation: (Rule) => Rule.max(80),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'client',
      title: 'Client',
      type: 'string',
      validation: (Rule) => Rule.required().min(2).max(80),
    }),
    defineField({
      name: 'client_sr',
      title: 'Client (Srpski)',
      type: 'string',
      validation: (Rule) => Rule.max(80),
    }),
    defineField({
      name: 'role',
      title: 'Role',
      type: 'string',
      initialValue: 'UI Design',
      validation: (Rule) => Rule.max(60),
    }),
    defineField({
      name: 'role_sr',
      title: 'Role (Srpski)',
      type: 'string',
      validation: (Rule) => Rule.max(60),
    }),
    defineField({
      name: 'thumbnail',
      title: 'Thumbnail (Project Card)',
      type: 'image',
      options: {hotspot: true},
      fields: [
        defineField({
          name: 'alt',
          title: 'Alt text',
          type: 'string',
          validation: (Rule) => Rule.max(120),
        }),
      ],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'overview',
      title: 'Overview (English)',
      type: 'text',
      rows: 6,
      validation: (Rule) => Rule.max(900),
    }),
    defineField({
      name: 'overview_sr',
      title: 'Overview (Srpski)',
      type: 'text',
      rows: 6,
      validation: (Rule) => Rule.max(900),
    }),
    defineField({
      name: 'year',
      title: 'Year',
      type: 'string',
      validation: (Rule) => Rule.max(30),
    }),
    defineField({
      name: 'location',
      title: 'Location (English)',
      type: 'string',
      validation: (Rule) => Rule.max(80),
    }),
    defineField({
      name: 'location_sr',
      title: 'Location (Srpski)',
      type: 'string',
      validation: (Rule) => Rule.max(80),
    }),
    defineField({
      name: 'duration',
      title: 'Duration (English)',
      type: 'string',
      validation: (Rule) => Rule.max(80),
    }),
    defineField({
      name: 'duration_sr',
      title: 'Duration (Srpski)',
      type: 'string',
      validation: (Rule) => Rule.max(80),
    }),
    defineField({
      name: 'stack',
      title: 'Stack / Tools',
      type: 'string',
      validation: (Rule) => Rule.max(120),
    }),
    defineField({
      name: 'stack_sr',
      title: 'Stack / Tools (Srpski)',
      type: 'string',
      validation: (Rule) => Rule.max(120),
    }),
    defineField({
      name: 'services',
      title: 'Services',
      type: 'array',
      of: [{type: 'string'}],
    }),
    defineField({
      name: 'services_sr',
      title: 'Services (Srpski)',
      type: 'array',
      of: [{type: 'string'}],
    }),
    defineField({
      name: 'galleryImages',
      title: 'Gallery Images',
      type: 'array',
      of: [
        {
          type: 'image',
          options: {hotspot: true},
          fields: [
            defineField({
              name: 'alt',
              title: 'Alt text',
              type: 'string',
              validation: (Rule) => Rule.max(120),
            }),
          ],
        },
      ],
    }),
    defineField({
      name: 'sortOrder',
      title: 'Sort Order',
      type: 'number',
      description: 'Lower number appears first in the projects section.',
      validation: (Rule) => Rule.integer().min(0),
    }),
  ],
  preview: {
    select: {
      title: 'title',
      client: 'client',
      role: 'role',
      media: 'thumbnail',
    },
    prepare({title, client, role, media}) {
      return {
        title: title || 'Untitled project',
        subtitle: [client, role].filter(Boolean).join(' | '),
        media,
      }
    },
  },
})
