/**
 * Génère les icônes PWA (192, 512, 32, 16, 180) depuis un SVG de capsule chromée.
 * Usage : node scripts/generate-icons.mjs
 * Dépendance : sharp  (npm install --save-dev sharp)
 */

import { createRequire } from 'module'
import { writeFileSync, mkdirSync } from 'fs'
import { fileURLToPath } from 'url'
import path from 'path'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const outDir = path.join(__dirname, '..', 'public', 'icons')
mkdirSync(outDir, { recursive: true })

// SVG de la capsule chromée — fond noir, rendu 3D métallique
const svgSource = (size) => {
  // Capsule centrée dans un carré size×size
  const cx = size / 2
  const cy = size / 2
  const rw = size * 0.40   // demi-largeur totale
  const rh = size * 0.165  // demi-hauteur
  const rx = rh            // rayon des bouts arrondis

  return `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 ${size} ${size}">
  <defs>
    <!-- Fond global -->
    <linearGradient id="bg" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#050608"/>
      <stop offset="100%" stop-color="#000000"/>
    </linearGradient>

    <!-- Moitié gauche — gradient chrome, fort contraste -->
    <radialGradient id="leftChrome" cx="32%" cy="22%" r="70%">
      <stop offset="0%"   stop-color="#cce0f0"/>
      <stop offset="15%"  stop-color="#90bcd8"/>
      <stop offset="35%"  stop-color="#3a6880"/>
      <stop offset="55%"  stop-color="#142030"/>
      <stop offset="75%"  stop-color="#080e14"/>
      <stop offset="100%" stop-color="#0a1520"/>
    </radialGradient>

    <!-- Moitié droite — gradient chrome (miroir asymétrique) -->
    <radialGradient id="rightChrome" cx="68%" cy="22%" r="70%">
      <stop offset="0%"   stop-color="#d8e8f4"/>
      <stop offset="12%"  stop-color="#a8cce0"/>
      <stop offset="30%"  stop-color="#507898"/>
      <stop offset="55%"  stop-color="#182838"/>
      <stop offset="78%"  stop-color="#080e14"/>
      <stop offset="100%" stop-color="#0a1520"/>
    </radialGradient>

    <!-- Reflet supérieur — bande brillante au sommet -->
    <linearGradient id="topSheen" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%"  stop-color="#e8f4ff" stop-opacity="0.9"/>
      <stop offset="30%" stop-color="#a0c8e8" stop-opacity="0.4"/>
      <stop offset="65%" stop-color="#4080a0" stop-opacity="0.0"/>
    </linearGradient>

    <!-- Point spéculaire gauche -->
    <radialGradient id="specL" cx="33%" cy="20%" r="28%">
      <stop offset="0%"  stop-color="#ffffff" stop-opacity="0.55"/>
      <stop offset="100%" stop-color="#ffffff" stop-opacity="0.0"/>
    </radialGradient>

    <!-- Point spéculaire droit -->
    <radialGradient id="specR" cx="67%" cy="20%" r="28%">
      <stop offset="0%"  stop-color="#ffffff" stop-opacity="0.45"/>
      <stop offset="100%" stop-color="#ffffff" stop-opacity="0.0"/>
    </radialGradient>

    <!-- Ombre portée -->
    <filter id="shadow" x="-20%" y="-30%" width="140%" height="200%">
      <feDropShadow dx="0" dy="${size*0.03}" stdDeviation="${size*0.025}" flood-color="#000" flood-opacity="0.8"/>
    </filter>

    <!-- Clip pour la moitié gauche de la capsule -->
    <clipPath id="leftHalf">
      <rect x="0" y="0" width="${cx}" height="${size}"/>
    </clipPath>
    <!-- Clip pour la moitié droite -->
    <clipPath id="rightHalf">
      <rect x="${cx}" y="0" width="${cx}" height="${size}"/>
    </clipPath>

    <!-- Forme capsule complète -->
    <rect id="pill" x="${cx - rw}" y="${cy - rh}" width="${rw * 2}" height="${rh * 2}" rx="${rx}" ry="${rx}"/>
  </defs>

  <!-- Fond noir -->
  <rect width="${size}" height="${size}" fill="url(#bg)"/>

  <!-- Capsule gauche -->
  <use href="#pill" fill="url(#leftChrome)" clip-path="url(#leftHalf)" filter="url(#shadow)"/>

  <!-- Capsule droite -->
  <use href="#pill" fill="url(#rightChrome)" clip-path="url(#rightHalf)"/>

  <!-- Reflet supérieur global -->
  <use href="#pill" fill="url(#topSheen)"/>

  <!-- Points spéculaires -->
  <use href="#pill" fill="url(#specL)" clip-path="url(#leftHalf)"/>
  <use href="#pill" fill="url(#specR)" clip-path="url(#rightHalf)"/>

  <!-- Ligne de jointure — ambre/or -->
  <line x1="${cx}" y1="${cy - rh + size*0.008}" x2="${cx}" y2="${cy + rh - size*0.008}"
        stroke="#c8902a" stroke-width="${size * 0.006}" opacity="0.85"/>

  <!-- Liseré lumineux de jointure -->
  <line x1="${cx}" y1="${cy - rh + size*0.008}" x2="${cx}" y2="${cy + rh - size*0.008}"
        stroke="#f0d080" stroke-width="${size * 0.002}" opacity="0.5"/>
</svg>`
}

const require = createRequire(import.meta.url)
let sharp
try {
  sharp = require('sharp')
} catch {
  console.error('sharp non installé. Lance : npm install --save-dev sharp')
  process.exit(1)
}

const sizes = [
  { name: 'icon-512.png',             size: 512 },
  { name: 'icon-192.png',             size: 192 },
  { name: 'icon-512-light-variant.png', size: 512 },
  { name: 'icon-192-light-variant.png', size: 192 },
  { name: 'apple-touch-icon-180.png', size: 180 },
  { name: 'favicon-32.png',           size: 32  },
  { name: 'favicon-16.png',           size: 16  },
]

for (const { name, size } of sizes) {
  const svg = svgSource(size)
  const buf = Buffer.from(svg)
  const out = path.join(outDir, name)
  await sharp(buf).png().toFile(out)
  console.log(`✓ ${name} (${size}×${size})`)
}

console.log('Icônes générées dans public/icons/')
