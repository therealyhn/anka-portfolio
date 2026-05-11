import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Injects <link rel="preload"> for LCP hero assets into the built index.html
function preloadHeroImages() {
  const TARGETS = ['Background', 'anka_4x']
  const found = {}

  return {
    name: 'preload-hero-images',
    generateBundle(_, bundle) {
      for (const filename of Object.keys(bundle)) {
        if (/Background-[^/]+\.webp$/.test(filename)) found['bg'] = '/' + filename
        if (/anka_4x-[^/]+\.webp$/.test(filename)) found['portrait'] = '/' + filename
      }
    },
    transformIndexHtml(html) {
      const tags = Object.values(found)
        .map((href) => `  <link rel="preload" as="image" href="${href}" fetchpriority="high">`)
        .join('\n')
      return html.replace('</head>', tags + '\n</head>')
    },
  }
}

export default defineConfig({
  plugins: [react(), preloadHeroImages()],
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          'react-vendor': ['react', 'react-dom', 'react-router-dom'],
          'sanity': ['@sanity/client'],
          'swiper': ['swiper'],
        },
      },
    },
  },
})
