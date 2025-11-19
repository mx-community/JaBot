import { createHash } from 'crypto'
import fetch from 'node-fetch'
import uploadFile from '../lib/uploadFile.js'
import uploadImage from '../lib/uploadImage.js'
import { FormData, Blob } from "formdata-node"
import { fileTypeFromBuffer } from "file-type"
import crypto from "crypto"

const handler = async (m, { conn, command, usedPrefix, text }) => {
try {
let q = m.quoted ? m.quoted : m
let mime = (q.msg || q).mimetype || ''
switch (command) {
case 'turl': {
if (!mime) return conn.sendMessage(m.chat, { text: `Ingrese el comando y responda a una imagen o video.` }, { quoted: m })
await m.react('⏳')
const media = await q.download()
const isTele = /image\/(png|jpe?g|gif)|video\/mp4/.test(mime)
const link = await uploadImage(media)
const txt = `·─┄ · ✦ *Uploader : Success* ✦ ·

\t𝇈 📍 Imagen subida correctamente.

\t\t⩩ *Enlace:* ${link}

\t\t⩩ *Tamaño:* ${formatBytes(media.length)}

\t\t⩩ *Caducidad:* ${isTele ? 'No expira' : 'Desconocido'}

> ${textbot}`
const ppTelegra = Buffer.from(await (await fetch(`https://qu.ax/sHcff.jpg`)).arrayBuffer())
await conn.sendMessage(m.chat, { text: txt, mentions: [m.sender], contextInfo: { externalAdReply: { 
title: "々  U P L O A D  :  F I L E  々", 
body: null, 
thumbnail: ppTelegra, 
sourceUrl: link, 
mediaType: 1, renderLargerThumbnail: false }}}, { quoted: m })
await m.react('✅')
break
}
case 'catbox': {
if (!mime) return conn.sendMessage(m.chat, { text: `Ingrese el comando y responda a una imagen o video.` }, { quoted: m })
await m.react('⏳')
const media = await q.download()
const isTele = /image\/(png|jpe?g|gif)|video\/mp4/.test(mime)
const link = await catbox(media)
const txt = `·─┄ · ✦ *Uploader : Success* ✦ ·

\t𝇈 📍 Imagen subida correctamente a catbox.

\t\t⩩ *Enlace :* ${link}

\t\t⩩ *Tamaño :* ${formatBytes(media.length)}

\t\t⩩ *Caducidad :* ${isTele ? 'No expira' : 'Desconocido'}


> ${textbot}`
const ppCatbox = Buffer.from(await (await fetch(`https://qu.ax/sHcff.jpg`)).arrayBuffer())
await conn.sendMessage(m.chat, { text: txt, mentions: [m.sender], contextInfo: { externalAdReply: { 
title: "々  U P L O A D  :  F I L E  々", 
body: null, 
thumbnail: ppCatbox, 
sourceUrl: link, 
mediaType: 1, renderLargerThumbnail: false }}}, { quoted: m })
await m.react('✅')
break
}}} catch (error) {
await m.react('❌')
await conn.sendMessage(m.chat, { text: `*[ 📍 ]*  ERROR_COMMAND = ${error.message}` }, { quoted: m })
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
