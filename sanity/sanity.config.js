import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { visionTool } from '@sanity/vision'
import { schemaTypes } from './schemaTypes'

export default defineConfig({
  name: 'default',
  title: 'Anka Portfolio',

  projectId: 'v69k4zml',
  dataset: 'production',

  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title('Content')
          .items([
            S.listItem()
              .title('Hero Section')
              .child(
                S.editor()
                  .id('heroSection')
                  .schemaType('heroSection')
                  .documentId('heroSection')
              ),
            S.listItem()
              .title('Services Section')
              .child(
                S.editor()
                  .id('servicesSection')
                  .schemaType('servicesSection')
                  .documentId('servicesSection')
              ),
            S.listItem()
              .title('About + Testimonial')
              .child(
                S.editor()
                  .id('aboutSection')
                  .schemaType('aboutSection')
                  .documentId('aboutSection')
              ),
            S.listItem()
              .title('Footer Section')
              .child(
                S.editor()
                  .id('footerSection')
                  .schemaType('footerSection')
                  .documentId('footerSection')
              ),
            S.listItem()
              .title('Projects')
              .child(S.documentTypeList('project').title('Projects')),
          ]),
    }),
    visionTool(),
  ],

  schema: {
    types: schemaTypes,
  },
})
