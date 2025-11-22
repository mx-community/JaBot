import fetch from "node-fetch"
import fs from "fs"
import path from "path"
import { sticker } from "../lib/sticker.js"

const API_STICKERLY = "https://delirius-apiofc.vercel.app/download/stickerly"

let handler = async (m, { conn, args, usedPrefix, command }) => {
if (!args[0])
let hacelo = `\t〨  *S T I C K E R  _  L Y*

\t⸭ 📌 \`\`\`Descarga stickers facil.\`\`\`

\t\t⧡ ${usedPrefix + command}  *<link>*
\t\t⧡ ${usedPrefix}slys  *<text>*

\t\t⚶ Por ejemplo:
*${usedPrefix + command}* https://sticker.ly/s/MJ41LV`
return conn.sendMessage(m.chat, { 
text: hacelo.trim() 
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

const info = `\t〨  *S T I C K E R  _  L Y*

\t⸭ ✅ *${data.name}*

\t\t⧡ Usuario : *@${data.username}*
\t\t⧡ Creador : *${data.author}*
\t\t⧡ Pack : *${data.total}* stickers.
\t\t⧡ Vistas : *${data.viewCount}* vistas.
\t\t⧡ Descargas : *${data.exportCount}* descargas.
\t\t⧡ Animación ; *${data.isAnimated ? "Si" : "No"}

> ${textbot}`.trim()

await conn.sendMessage(m.chat, {
text: info, contextInfo: { externalAdReply: {
title: `々  S T I C K E R S  々`,
body: botname,
thumbnailUrl: data.preview,
sourceUrl: data.url,
mediaType: 1,
renderLargerThumbnail: false,
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
