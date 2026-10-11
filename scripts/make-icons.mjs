// Regenerates the app icons in public/. Run: node scripts/make-icons.mjs
import sharp from 'sharp'

const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
  <rect width="512" height="512" fill="#1a56c4"/>
  <g fill="#ffffff">
    <rect x="150" y="236" width="212" height="40" rx="8"/>
    <rect x="112" y="176" width="48" height="160" rx="14"/>
    <rect x="352" y="176" width="48" height="160" rx="14"/>
    <rect x="76" y="206" width="36" height="100" rx="12"/>
    <rect x="400" y="206" width="36" height="100" rx="12"/>
  </g>
</svg>`

for (const [name, size] of [
  ['icon-192.png', 192],
  ['icon-512.png', 512],
  ['apple-touch-icon.png', 180],
]) {
  await sharp(Buffer.from(svg)).resize(size, size).png().toFile(`public/${name}`)
}
