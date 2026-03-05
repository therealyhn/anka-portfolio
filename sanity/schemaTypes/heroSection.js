import {defineField, defineType} from 'sanity'

export const heroSection = defineType({
  name: 'heroSection',
  title: 'Hero Section',
  type: 'document',
  fields: [
    defineField({
      name: 'titleLineOne',
      title: 'Title Line One',
      type: 'string',
      initialValue: "Hello I'm Anka",
      validation: (Rule) => Rule.required().max(60),
    }),
    defineField({
      name: 'titleAccent',
      title: 'Title Accent (Italic Word)',
      type: 'string',
      initialValue: 'Digital',
      validation: (Rule) => Rule.required().max(24),
    }),
    defineField({
      name: 'titleLineTwo',
      title: 'Title Line Two',
      type: 'string',
      initialValue: 'Designer',
      validation: (Rule) => Rule.required().max(40),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 3,
      initialValue: 'I design products, platforms, and everything in between, made to make sense the first time you use them.',
      validation: (Rule) => Rule.required().min(20).max(220),
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
