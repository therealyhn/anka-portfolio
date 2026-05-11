import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Injects <link rel="preload"> for LCP hero assets into the built index.html
function preloadHeroImages() {
  const found = {}

  return {
    name: 'preload-hero-images',
    generateBundle(_, bundle) {
      for (const filename of Object.keys(bundle)) {
        if (/Background-[^/]+\.webp$/.test(filename)) found['bg'] = '/' + filename
        if (/anka_hero_mobile-[^/]+\.webp$/.test(filename)) found['portraitMobile'] = '/' + filename
        if (/anka_hero_desktop-[^/]+\.webp$/.test(filename)) found['portraitDesktop'] = '/' + filename
      }
    },
    transformIndexHtml(html) {
      const tags = [
        found.bg && `  <link rel="preload" as="image" href="${found.bg}" fetchpriority="high">`,
        found.portraitMobile && `  <link rel="preload" as="image" href="${found.portraitMobile}" fetchpriority="high" media="(max-width: 1023px)">`,
        found.portraitDesktop && `  <link rel="preload" as="image" href="${found.portraitDesktop}" fetchpriority="high" media="(min-width: 1024px)">`,
      ].filter(Boolean).join('\n')
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
          'react-vendor': ['react', 'react-dom', 'react-dom/client', 'react-router-dom'],
          'swiper': ['swiper'],
        },
      },
    },
  },
})
