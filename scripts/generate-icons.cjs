// Génère des icônes PNG simples (fond sombre + disque chlorophylle) sans dépendance externe.
const fs = require('fs')
const path = require('path')
const zlib = require('zlib')

const BG = [15, 15, 15, 255] // #0F0F0F
const ACCENT = [169, 192, 92, 255] // #A9C05C

function crc32(buf) {
  let c
  const table = crc32.table || (crc32.table = (() => {
    const t = new Uint32Array(256)
    for (let n = 0; n < 256; n++) {
      c = n
      for (let k = 0; k < 8; k++) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1
      t[n] = c
    }
    return t
  })())
  let crc = 0xffffffff
  for (let i = 0; i < buf.length; i++) crc = table[(crc ^ buf[i]) & 0xff] ^ (crc >>> 8)
  return (crc ^ 0xffffffff) >>> 0
}

function chunk(type, data) {
  const typeBuf = Buffer.from(type, 'ascii')
  const len = Buffer.alloc(4)
  len.writeUInt32BE(data.length, 0)
  const crcBuf = Buffer.alloc(4)
  crcBuf.writeUInt32BE(crc32(Buffer.concat([typeBuf, data])), 0)
  return Buffer.concat([len, typeBuf, data, crcBuf])
}

function drawIcon(size) {
  const cx = size / 2
  const cy = size / 2
  const r = size * 0.34
  const rows = []
  for (let y = 0; y < size; y++) {
    const row = Buffer.alloc(1 + size * 4)
    row[0] = 0 // filter type: none
    for (let x = 0; x < size; x++) {
      const dx = x + 0.5 - cx
      const dy = y + 0.5 - cy
      const inside = dx * dx + dy * dy <= r * r
      const px = inside ? ACCENT : BG
      const off = 1 + x * 4
      row[off] = px[0]
      row[off + 1] = px[1]
      row[off + 2] = px[2]
      row[off + 3] = px[3]
    }
    rows.push(row)
  }
  const raw = Buffer.concat(rows)
  const idatData = zlib.deflateSync(raw, { level: 9 })

  const ihdr = Buffer.alloc(13)
  ihdr.writeUInt32BE(size, 0)
  ihdr.writeUInt32BE(size, 4)
  ihdr[8] = 8 // bit depth
  ihdr[9] = 6 // color type RGBA
  ihdr[10] = 0
  ihdr[11] = 0
  ihdr[12] = 0

  const signature = Buffer.from([137, 80, 78, 71, 13, 10, 26, 10])
  return Buffer.concat([
    signature,
    chunk('IHDR', ihdr),
    chunk('IDAT', idatData),
    chunk('IEND', Buffer.alloc(0)),
  ])
}

const outDir = path.join(__dirname, '..', 'public', 'icons')
fs.mkdirSync(outDir, { recursive: true })

const sizes = [192, 512]
for (const size of sizes) {
  const png = drawIcon(size)
  fs.writeFileSync(path.join(outDir, `icon-${size}.png`), png)
  console.log(`Wrote icon-${size}.png`)
}

const favicon = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><rect width="64" height="64" fill="#0F0F0F"/><circle cx="32" cy="32" r="20" fill="#A9C05C"/></svg>`
fs.writeFileSync(path.join(outDir, 'favicon.svg'), favicon)
console.log('Wrote favicon.svg')
