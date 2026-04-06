import {defineField, defineType} from 'sanity'

export const heroSection = defineType({
  name: 'heroSection',
  title: 'Hero Section',
  type: 'document',
  fields: [
    defineField({
      name: 'titleLineOne',
      title: 'Title Line One (English)',
      type: 'string',
      initialValue: "Hello I'm Anka",
      validation: (Rule) => Rule.required().max(60),
    }),
    defineField({
      name: 'titleLineOne_sr',
      title: 'Title Line One (Srpski)',
      type: 'string',
      validation: (Rule) => Rule.max(60),
    }),
    defineField({
      name: 'titleAccent',
      title: 'Title Accent — Italic Word (English)',
      type: 'string',
      initialValue: 'Digital',
      validation: (Rule) => Rule.required().max(24),
    }),
    defineField({
      name: 'titleAccent_sr',
      title: 'Title Accent — Italic Word (Srpski)',
      type: 'string',
      validation: (Rule) => Rule.max(24),
    }),
    defineField({
      name: 'titleLineTwo',
      title: 'Title Line Two (English)',
      type: 'string',
      initialValue: 'Designer',
      validation: (Rule) => Rule.required().max(40),
    }),
    defineField({
      name: 'titleLineTwo_sr',
      title: 'Title Line Two (Srpski)',
      type: 'string',
      validation: (Rule) => Rule.max(40),
    }),
    defineField({
      name: 'description',
      title: 'Description (English)',
      type: 'text',
      rows: 3,
      initialValue: 'I design products, platforms, and everything in between, made to make sense the first time you use them.',
      validation: (Rule) => Rule.required().min(20).max(220),
    }),
    defineField({
      name: 'description_sr',
      title: 'Description (Srpski)',
      type: 'text',
      rows: 3,
      validation: (Rule) => Rule.max(220),
    }),
  ],
  preview: {
    select: {
      titleLineOne: 'titleLineOne',
      titleLineTwo: 'titleLineTwo',
    },
    prepare({titleLineOne, titleLineTwo}) {
      return {
        title: `${titleLineOne || 'Hero'} ${titleLineTwo || ''}`.trim(),
        subtitle: 'Homepage Hero Content',
      }
    },
  },
})
