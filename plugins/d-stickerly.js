/*import fetch from "node-fetch"
import { sticker } from "../lib/sticker.js"
import fs from "fs"
import path from "path"
const API_STICKERLY = "https://delirius-apiofc.vercel.app/download/stickerly"
let handler = async (m, { conn, args, usedPrefix, command }) => {
if (!args[0]) {
return conn.sendMessage(m.chat, { text: `Ingrese el comando mas un enlace de un pack de stickers en *Sticker.Ly* para descargarlos.` }, { quoted: m })
}
try {
let url = `${API_STICKERLY}?url=${encodeURIComponent(args[0])}`
let res = await fetch(url)
if (!res.ok) throw new Error(`❌ Error al conectar con la API (${res.status})`)
let json = await res.json()
if (!json.status || !json.data || !json.data.stickers) return conn.sendMessage(m.chat, { text: `📍  No se ha podido acceder al enlace.\n- Verifique si es un pack de stickers y vuelva a intentarlo.` }, { quoted: m })
let data = json.data
let info = `
🝐✦  *StickerLy : Download*

⊹ ✎ *Nombre:* ${data.name}
⊹ ✎ *Autor:* ${data.author}
⊹ ✎ *Stickers:* ${data.total}
⊹ ✎ *Vistas:* ${data.viewCount}
⊹ ✎ *Animado:* ${data.isAnimated ? "Sí" : "No"}

> ⩽ *Propietario/a* ⩾
⊹ ✎ *Usuario:* ${data.username}
⊹ ✎ *Seguidores:* ${data.followers}`.trim()

await conn.sendMessage(m.chat, {
text: info,
contextInfo: {
externalAdReply: {
title: `📍  Paquete de Stickers.`,
body: `Enviando stickers, espere un momento...`,
thumbnailUrl: data.preview,
sourceUrl: data.url,
mediaType: 1,
renderLargerThumbnail: false
}}}, { quoted: m })
const tempDir = path.join("./tmp", `stickers_${Date.now()}`)
fs.mkdirSync(tempDir, { recursive: true })
let stickerBuffers = []
for (let i = 0; i < data.stickers.length; i++) {
try {
let stick = data.stickers[i]
let img = await fetch(stick)
let buffer = await img.arrayBuffer()
let stickerBuf = await sticker(Buffer.from(buffer), false, data.name, data.author)
stickerBuffers.push(stickerBuf)
} catch (e) {
console.log("Error con un sticker:", e)
}
}

await conn.sendMessage(m.chat, {
sticker: stickerBuffers,
packname: data.name,
author: data.author || "Stickerly",
}, { quoted: m })

fs.rmSync(tempDir, { recursive: true, force: true })
} catch (e) {
console.error(e)
await conn.sendMessage(m.chat, { text: `*[ 📍 ]*  ERROR_COMMAND = Command error, try again and if the error persists, report the command.` }, { quoted: m })
}
}

handler.help = ["stickerlydl <url>"]
handler.tags = ["sticker", "download"]
handler.command = ["sly", "stickerly"]

export default handler*/

import fetch from "node-fetch"
import fs from "fs"
import path from "path"
import JSZip from "jszip"
import { sticker } from "../lib/sticker.js"

const API = "https://delirius-apiofc.vercel.app/download/stickerly"

let handler = async (m, { conn, args, usedPrefix, command }) => {
if (!args[0]) return conn.sendMessage(m.chat, { text: `Ingrese el comando mas un enlace de un pack de *Sticker.ly* para descargarlo.` }, { quoted: m })

const PACK_NAME = "@mx-community"
const AUTHOR = "Sticker.Ly"
await m.react("⏳")
try {
const res = await fetch(`${API}?url=${encodeURIComponent(args[0])}`)
const json = await res.json()

if (!json.status || !json.data?.stickers?.length)
return conn.sendMessage(m.chat, { text: `📍  No se ha podido acceder al enlace.\n- Verifique si es un enlace de *Sticker.ly* y inténtalo de nuevo.` }, { quoted: m })

const data = json.data
const stickers = data.stickers

await conn.sendMessage(m.chat, { text: `Creando paquete nativo, espere un momento...` }, { quoted: m })

const zip = new JSZip()

const metadata = {
"sticker-pack-id": (Math.random() + 1).toString(36).substring(7),
"sticker-pack-name": PACK_NAME,
"sticker-pack-publisher": AUTHOR,
"android-app-store-link": "",
"ios-app-store-link": "",
"stickers": []
}

let count = 0

for (const url of stickers) {
try {
const img = await fetch(url)
const buff = Buffer.from(await img.arrayBuffer())
const webp = await sticker(buff, false, PACK_NAME, AUTHOR)

const fileName = `sticker_${count + 1}.webp`

zip.file(fileName, webp)
metadata.stickers.push({
"image-file": fileName,
"emojis": [""]
})

count++
await new Promise(r => setTimeout(r, 350))
} catch {}
}

zip.file("metadata.json", JSON.stringify(metadata, null, 2))

const packBuffer = await zip.generateAsync({ type: "nodebuffer" })
const filePath = path.join("/tmp", `${PACK_NAME.replace(/\s+/g, "_")}.wastickers`)
let listoXd = `·─┄ · ✦ *Pack : StickerLy* ✦ ·

⊸❒ *Proceso:* Extoso.
⊸❒ *A. actual:* ${PACK_NAME}
⊸❒ *Plataforma:* ${AUTHOR}`
fs.writeFileSync(filePath, packBuffer)

await conn.sendMessage(m.chat, {
document: fs.readFileSync(filePath),
mimetype: "application/x-wastickers",
fileName: `${PACK_NAME}.wastickers`,
caption: listoXd
}, { quoted: m })

fs.unlinkSync(filePath)
await m.react("✅")

} catch (err) {
console.log(err)
await conn.sendMessage(m.chat, { text: `*[ 📍 ]*  ERROR_COMMAND = ${e}` }, { quoted: m })
}
}

handler.help = ["stickerlypack <url>"]
handler.tags = ["sticker", "download"]
handler.command = ["stickerly", "sly"]

export default handler
