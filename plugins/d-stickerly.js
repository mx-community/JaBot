import fetch from "node-fetch"
import fs from "fs"
import path from "path"
import { sticker } from "../lib/sticker.js"

const API_STICKERLY = "https://delirius-apiofc.vercel.app/download/stickerly"

let handler = async (m, { conn, args, usedPrefix, command }) => {
if (!args[0])
return conn.sendMessage(m.chat, { 
text: `Ingrese el comando mas un enlace de un pack de *Sticker.Ly* para descargarlos.\n\n• Por ejemplo:\n*#${command}* https://sticker.ly/s/MJ41LV` 
}, 
{ quoted: m }
)

await m.react("⏳")

try {
const res = await fetch(`${API_STICKERLY}?url=${encodeURIComponent(args[0])}`)
if (!res.ok) throw new Error(`Error al conectar con la API (${res.status})`)
const json = await res.json()

if (!json.status || !json.data || !json.data.stickers?.length)
throw new Error("No se pudo obtener el pack. Verifica el enlace.")

const data = json.data

const info = `·─┄ · ✦ *Sticker.Ly* ✦ ·

⊹ ✎ *Pack:* ${data.name}
⊹ ✎ *Creador:* ${data.author} (@${data.username})
⊹ ✎ *Stickers:* ${data.total} stickers y ${data.viewCount} vistas.
⊹ ✎ *Descargas:* ${data.exportCount} y ${data.isAnimated ? "con animación." : "sin animación."}`.trim()

await conn.sendMessage(m.chat, {
text: info, contextInfo: { externalAdReply: {
title: `${data.name}`,
body: `📍  Enviando stickers, espere un momento...`,
thumbnailUrl: data.preview,
sourceUrl: data.url,
mediaType: 1,
renderLargerThumbnail: true,
},
},
},
{ quoted: m }
)

let success = 0
let failed = 0

for (const stick of data.stickers) {
try {
const imgRes = await fetch(stick)
if (!imgRes.ok) throw new Error("No se pudo descargar el sticker")

const imgBuffer = Buffer.from(await imgRes.arrayBuffer())
const stickerBuf = await sticker(imgBuffer, false, data.name, data.author)

await conn.sendMessage(m.chat, { sticker: stickerBuf }, { quoted: m })
success++
await new Promise((resolve) => setTimeout(resolve, 600)) // previene flood
} catch (err) {
failed++
console.log("Error con un sticker:", err.message)
}
}

await m.react("✅")

} catch (e) {
console.error("Error general:", e)
await conn.sendMessage(m.chat, { text: `*[ 📍 ]*  ERROR_COMMAND = ${e}` }, { quoted: m })
}
}

handler.help = ["stickerlydl <url>"]
handler.tags = ["sticker", "download"]
handler.command = ["stickerlydl", "stickerly", "sly"]

export default handler
