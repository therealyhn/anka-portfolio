/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          ink: '#121212',
          charcoal: '#121212',
          paper: '#E7E7E7',
          surface: '#F3F3F3',
          line: '#B5B5B5',
          muted: '#6F6F6F',
          accent: '#FF6A2E',
          success: '#31D65B',
        },
      },
      fontFamily: {
        sans: ['Manrope', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        serif: ['Cormorant Garamond', 'ui-serif', 'Georgia', 'serif'],
      },
      maxWidth: {
        frame: '1280px',
      },
      borderRadius: {
        frame: '14px',
      },
      boxShadow: {
        edge: '0 2px 14px rgba(0, 0, 0, 0.08)',
      },
      transitionTimingFunction: {
        premium: 'cubic-bezier(0.22, 1, 0.36, 1)',
      },
    },
  },
  plugins: [],
}
