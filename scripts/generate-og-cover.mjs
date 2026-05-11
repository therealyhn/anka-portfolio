import { mkdir } from 'node:fs/promises'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import sharp from 'sharp'

const ROOT = resolve(fileURLToPath(new URL('.', import.meta.url)), '..')
const WIDTH = 1200
const HEIGHT = 630

const paths = {
  background: resolve(ROOT, 'src/assets/images/img/Background.webp'),
  portrait: resolve(ROOT, 'src/assets/images/img/anka_4x.webp'),
  logo: resolve(ROOT, 'src/assets/images/logo/SVG white text.svg'),
  output: resolve(ROOT, 'public/images/og-cover.jpg'),
}

await mkdir(dirname(paths.output), { recursive: true })

const background = await sharp(paths.background)
  .resize(WIDTH, HEIGHT, { fit: 'cover', position: 'left' })
  .modulate({ brightness: 0.72, saturation: 0.72 })
  .blur(0.3)
  .toBuffer()

const portrait = await sharp(paths.portrait)
  .trim({ background: { r: 0, g: 0, b: 0, alpha: 0 }, threshold: 4 })
  .resize({ height: 628, withoutEnlargement: false })
  .modulate({ brightness: 0.92, saturation: 0.12 })
  .toBuffer()

const logo = await sharp(paths.logo, { density: 300 })
  .resize({ width: 205 })
  .toBuffer()

const overlay = Buffer.from(`
<svg width="${WIDTH}" height="${HEIGHT}" viewBox="0 0 ${WIDTH} ${HEIGHT}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="leftFade" x1="0" x2="1" y1="0" y2="0">
      <stop offset="0" stop-color="#050505" stop-opacity="0.96"/>
      <stop offset="0.52" stop-color="#050505" stop-opacity="0.74"/>
      <stop offset="1" stop-color="#050505" stop-opacity="0.20"/>
    </linearGradient>
    <linearGradient id="bottomFade" x1="0" x2="0" y1="0" y2="1">
      <stop offset="0" stop-color="#050505" stop-opacity="0"/>
      <stop offset="1" stop-color="#050505" stop-opacity="0.78"/>
    </linearGradient>
  </defs>

  <rect width="${WIDTH}" height="${HEIGHT}" fill="url(#leftFade)"/>
  <rect width="${WIDTH}" height="${HEIGHT}" fill="url(#bottomFade)"/>
  <rect x="24" y="24" width="1152" height="582" rx="22" fill="none" stroke="#FAFAFA" stroke-opacity="0.16" stroke-width="2"/>

  <circle cx="82" cy="175" r="6" fill="#FF6632"/>
  <text x="102" y="181" fill="#FAFAFA" fill-opacity="0.86" font-family="Inter, Arial, sans-serif" font-size="19" font-weight="400">Available for freelance projects</text>

  <text x="72" y="288" fill="#FAFAFA" font-family="Inter, Arial, sans-serif" font-size="88" font-weight="500" letter-spacing="-2">
    <tspan x="72" dy="0">Anka Ljusic</tspan>
  </text>
  <text x="72" y="374" fill="#FAFAFA" font-family="Georgia, 'Times New Roman', serif" font-size="80" font-style="italic" font-weight="400" letter-spacing="-1">Digital</text>
  <text x="338" y="374" fill="#FAFAFA" font-family="Inter, Arial, sans-serif" font-size="80" font-weight="500" letter-spacing="-2">Designer</text>

  <text x="72" y="446" fill="#FAFAFA" fill-opacity="0.76" font-family="Inter, Arial, sans-serif" font-size="26" font-weight="300" letter-spacing="-0.2">
    <tspan x="72" dy="0">Brand identity, web &amp; product UI,</tspan>
    <tspan x="72" dy="38">and marketing visuals.</tspan>
  </text>

  <g transform="translate(72 548)" font-family="Inter, Arial, sans-serif" font-size="18" font-weight="500">
    <rect x="0" y="-28" width="134" height="42" rx="21" fill="#FF6632"/>
    <text x="22" y="-1" fill="#071E24">Belgrade</text>
    <rect x="150" y="-28" width="122" height="42" rx="21" fill="#FAFAFA" fill-opacity="0.12" stroke="#FAFAFA" stroke-opacity="0.20"/>
    <text x="172" y="-1" fill="#FAFAFA" fill-opacity="0.88">Remote</text>
    <rect x="288" y="-28" width="154" height="42" rx="21" fill="#FAFAFA" fill-opacity="0.12" stroke="#FAFAFA" stroke-opacity="0.20"/>
    <text x="310" y="-1" fill="#FAFAFA" fill-opacity="0.88">Worldwide</text>
  </g>
</svg>`)

await sharp(background)
  .composite([
    { input: portrait, left: 594, top: 2 },
    { input: overlay, left: 0, top: 0 },
    { input: logo, left: 72, top: 68 },
  ])
  .jpeg({
    quality: 88,
    mozjpeg: true,
    chromaSubsampling: '4:4:4',
  })
  .toFile(paths.output)

const metadata = await sharp(paths.output).metadata()
console.log(`Created ${paths.output} (${metadata.width}x${metadata.height})`)
