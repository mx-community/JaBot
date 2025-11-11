import path from "path"
import { File } from "megajs"

const handler = async (m, { conn, args, usedPrefix, command, text }) => {
if (!text) {
return conn.sendMessage(m.chat, { text: `Ingrese el comando mas un enlace de un archivo de mega para descargarlo.` }, { quoted: m })
}
try {
await conn.sendMessage(m.chat, { text: `Descargando, espere un momento...` }, { quoted: m })
const file = File.fromURL(text)
await file.loadAttributes()
let maxSize = 300 * 1024 * 1024;
if (file.size >= maxSize) {
return conn.sendMessage(m.chat, { text: `📍  No se ha podido descargar el archivo debido a que es demasiado pesado.\n- El limite maximo de MB es de 300.` }, { quoted: m })
}
let cap = `·─┄ · ✦ *Mega : Download* ✦ ·

❒ *Nombre:* ${file.name}
❒ *Tamaño:* ${formatBytes(file.size)}
❒ *URL:* ${text}`
m.reply(cap)
const data = await file.downloadBuffer()
const fileExtension = path.extname(file.name).toLowerCase()
const mimeTypes = {
".mp4": "video/mp4",
".pdf": "application/pdf",
".zip": "application/zip",
".rar": "application/x-rar-compressed",
".7z": "application/x-7z-compressed",
".jpg": "image/jpeg",
".jpeg": "image/jpeg",
".png": "image/png",
}
let mimetype = mimeTypes[fileExtension] || "application/octet-stream"
await conn.sendFile(m.chat, data, file.name, "", m, null, { mimetype, asDocument: true })
} catch (e) {
return await conn.sendMessage(m.chat, { text: `*[ 📍 ]*  ERROR_COMMAND = Command error, try again and if the error persists, report the command.` }, { quoted: m })
}}

handler.help = ["mega"]
handler.tags = ["download"]
handler.command = ["mega", "mg"]

export default handler

function formatBytes(bytes) {
if (bytes === 0) return '0 Bytes'
const k = 1024
const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB']
const i = Math.floor(Math.log(bytes) / Math.log(k))
return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
}
