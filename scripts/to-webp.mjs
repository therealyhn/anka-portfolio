import sharp from 'sharp'
import { existsSync, statSync } from 'fs'
import { resolve } from 'path'
import { fileURLToPath } from 'url'

const ROOT = resolve(fileURLToPath(new URL('.', import.meta.url)), '..')

const tasks = [
  // PNG backgrounds — high quality, preserve resolution
  {
    input: 'src/assets/images/img/Background.png',
    output: 'src/assets/images/img/Background.webp',
    quality: 82,
  },
  {
    input: 'src/assets/images/img/anka_4x.png',
    output: 'src/assets/images/img/anka_4x.webp',
    quality: 85,
  },
  {
    input: 'src/assets/images/img/Background_aboutme.png',
    output: 'src/assets/images/img/Background_aboutme.webp',
    quality: 82,
  },
  {
    input: 'src/assets/images/img/Anka.png',
    output: 'src/assets/images/img/Anka.webp',
    quality: 85,
  },
  // SVG flag icons (embedded bitmaps) → WebP at 2× display size (32px → 72px)
  {
    input: 'src/assets/images/icons/serbian icon.svg',
    output: 'src/assets/images/icons/serbian-flag.webp',
    resize: 72,
    quality: 92,
  },
  {
    input: 'src/assets/images/icons/english icon.svg',
    output: 'src/assets/images/icons/english-flag.webp',
    resize: 72,
    quality: 92,
  },
  // SVG tool icons (embedded bitmaps) → WebP at 2× display size (~56px → 80px)
  {
    input: 'src/assets/images/icons/DaVinci Resolve icon (about me).svg',
    output: 'src/assets/images/icons/davinci-icon.webp',
    resize: 80,
    quality: 90,
  },
  {
    input: 'src/assets/images/icons/Figma icon (about me).svg',
    output: 'src/assets/images/icons/figma-icon.webp',
    resize: 80,
    quality: 90,
  },
]

for (const task of tasks) {
  const inputPath = resolve(ROOT, task.input)
  const outputPath = resolve(ROOT, task.output)

  if (!existsSync(inputPath)) {
    console.log(`⚠  skip (not found): ${task.input}`)
    continue
  }

  try {
    let pipeline = sharp(inputPath, { density: 144 })
    if (task.resize) {
      pipeline = pipeline.resize(task.resize, task.resize, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
    }
    await pipeline.webp({ quality: task.quality }).toFile(outputPath)

    const before = statSync(inputPath).size
    const after = statSync(outputPath).size
    const saved = Math.round((1 - after / before) * 100)
    console.log(`✓  ${task.input.split('/').pop()} → ${task.output.split('/').pop()}  (${kb(before)} → ${kb(after)}, -${saved}%)`)
  } catch (err) {
    console.error(`✗  ${task.input}: ${err.message}`)
  }
}

function kb(bytes) {
  return `${Math.round(bytes / 1024)}kB`
}
