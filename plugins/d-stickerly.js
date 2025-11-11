import fetch from "node-fetch"
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

export default handler