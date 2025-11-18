import { createHash } from 'crypto'
import fetch from 'node-fetch'
import uploadFile from '../lib/uploadFile.js'
import uploadImage from '../lib/uploadImage.js'
import { FormData, Blob } from "formdata-node"
import { fileTypeFromBuffer } from "file-type"
import crypto from "crypto"
const handler = async (m, { conn, command, usedPrefix, text, args }) => {
try {
let q = m.quoted ? m.quoted : m
let mime = (q.msg || q).mimetype || ''


if (args[0] === "--force" || args[0] === "force") {
if (!mime) return conn.sendMessage(m.chat, { text: `Ingrese de nuevo el comando y responda a una imagen o video para convertir en enlace.` }, { quoted: m })
await m.react("⏳")
  //conn.sendMessage(m.chat, { text: `Procesando, espere un momento...` }, { quoted: m })
const media = await q.download()
const isTele = /image\/(png|jpe?g|gif)|video\/mp4/.test(mime)
const link = await catbox(media)
const txt = `·─┄ · ✦ *Uploader : Force* ✦ ·

❒ *Enlace:* ${link}
❒ *Tamaño:* ${formatBytes(media.length)}
❒ *Expiración:* ${isTele ? 'No expira' : 'Desconocido'}`
await conn.sendMessage(m.chat, { text: txt }, { quoted: m })
  m.react("✅")
} else if (args[0] === "mp3" || args[0] === "audio") {
} else {
if (!mime) return conn.sendMessage(m.chat, { text: `Ingrese el comando y responda a una imagen o video para convertirlo en un enlace.` }, { quoted: m })
await conn.sendMessage(m.chat, { text: `Procesando, espere un momento...` }, { quoted: m })
const media = await q.download()
const isTele = /image\/(png|jpe?g|gif)|video\/mp4/.test(mime)
const link = await uploadImage(media)
const txt = `·─┄ · ✦ *Uploader : URL* ✦ ·
*» Enlace* : ${link}
*» Tamaño* : ${formatBytes(media.length)}
*» Expiración* : ${isTele ? 'No expira' : 'Desconocido'}`
await conn.sendMessage(m.chat, { text: txt }, { quoted: m })
}} catch (error) {
await conn.sendMessage(m.chat, { text: `*[ 📍 ]*  ERROR_COMMAND = Command error, try again and if the error persists, report the command.` }, { quoted: m })
}}

handler.help = ['tourl', 'catbox']
handler.tags = ['tools']
handler.command = ['turl', 'catbox']

export default handler

function formatBytes(bytes) {
if (bytes === 0) return '0 B'
const sizes = ['B', 'KB', 'MB', 'GB', 'TB']
const i = Math.floor(Math.log(bytes) / Math.log(1024))
return `${(bytes / 1024 ** i).toFixed(2)} ${sizes[i]}`
}
async function shortUrl(url) {
const res = await fetch(`https://tinyurl.com/api-create.php?url=${url}`)
return await res.text()
}
async function catbox(content) {
const { ext, mime } = (await fileTypeFromBuffer(content)) || {}
const blob = new Blob([content.toArrayBuffer()], { type: mime })
const formData = new FormData()
const randomBytes = crypto.randomBytes(5).toString("hex")
formData.append("reqtype", "fileupload")
formData.append("fileToUpload", blob, randomBytes + "." + ext)
const response = await fetch("https://catbox.moe/user/api.php", { method: "POST", body: formData, headers: { "User-Agent": "Mozilla/5.0 (X11; Linux x86_64)" }})
return await response.text()
}
