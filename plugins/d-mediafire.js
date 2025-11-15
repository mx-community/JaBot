import fetch from 'node-fetch'

let handler = async (m, {conn, args, usedPrefix, command}) => {
if (!args[0]) return conn.sendMessage(m.chat, { text: `Ingrese el comando mas un enlace de un archivo de *Mediafire* para descargarlo.` }, { quoted: m })

const url = args[0]
if (!/^https?:\/\/(www\.)?mediafire\.com/i.test(url)) {
return conn.sendMessage(m.chat, { text: `📍  No se ha podido acceder al enlace.\n- Verifique si el enlace es de *Mediafire* y vuelva a intentarlo.` }, { quoted: m })
}

await m.react('⏳')

try {
const api = `https://delirius-apiofc.vercel.app/download/mediafire?url=${encodeURIComponent(url)}`
const res = await fetch(api)
if (!res.ok) throw new Error(`Error de la API: ${res.status} ${res.statusText}`)

const json = await res.json()

// Normalizar posibles formatos de respuesta
const data = json?.data || json?.result || json

// Campos típicos que puede devolver la API
const fileUrl = data?.url || data?.link || data?.download || data?.dl || data?.download_url
const fileTitle = data?.title || data?.filename || data?.name || 'archivo'
const fileSize = data?.size || data?.filesize || 'Desconocido'
const fileMime = data?.mime || data?.mimetype || 'application/octet-stream'
const thumb = Buffer.from(await (await fetch(`${global.mMages}`)).arrayBuffer())

if (!fileUrl) throw new Error('No se pudo obtener el enlace de descarga.')

const caption = `·─┄ · ✦ *Mediafire : Download* ✦ ·

⊹ ✎ *Nombre:* ${fileTitle}
⊹ ✎ *Peso:* ${fileSize}
⊹ ✎ *Paquete:* ${fileMime}

📍  Descargando el archivo, espere un momento...`.trim()

await await conn.sendMessage(m.chat, { text: caption, mentions: [m.sender], contextInfo: { externalAdReply: { 
title: fileTitle, 
body: textbot, 
thumbnail: thumbBot, 
sourceUrl: null, 
mediaType: 1, renderLargerThumbnail: true }}}, { quoted: m })

conn.sendFile(m.chat, fileUrl, fileTitle, null, m, null, {mimetype: fileMime, asDocument: true})

await m.react('✅')
} catch (e) {
console.error('❌ Error en mediafire:', e)
await conn.sendMessage(m.chat, { text: `*[ 📍 ]*  ERROR_COMMAND = ${e}` }, { quoted: m })
await m.react('❌')
}
}

handler.command = ["mf", "mediafire"]

export default handler
  

/*import fetch from 'node-fetch'
import { lookup } from 'mime-types'

let handler = async (m, { conn, text, usedPrefix }) => {
if (!text) return conn.sendMessage(m.chat, { text: `Ingrese el comando mas un enlace de un archivo en *Mediafire* para descargarlo.` }, { quoted: m })
if (!/^https:\/\/www\.mediafire\.com\//i.test(text)) return conn.sendMessage(m.chat, { text: `📍  El enlace que ingresaste no es valido.\n- Recuerde copiar el enlace de un archivo de *Mediafire* para descargarlo.` }, { quoted: m })
try {
await conn.sendMessage(m.chat, { text: `Buscando resultados, espere un momento...` }, { quoted: m })
const res = await fetch(`${global.APIs.delirius.url}/download/mediafire?url=${encodeURIComponent(text)}`)
const json = await res.json()
const data = json.data
if (!json.status || !data?.filename || !data?.link) return conn.sendMessage(m.chat, { text: `📍  No se ha podido acceder al enlace...` }, { quoted: m })
const filename = data.filename
const filesize = data.size || 'desconocido'
const mimetype = data.mime || lookup(data.extension?.toLowerCase()) || 'application/octet-stream'
const dl_url = data.link.includes('u=') ? decodeURIComponent(data.link.split('u=')[1]) : data.link
const mfDescarga = `·─┄ · ✦ *Download : MF* ✦ ·

❒ *Nombre:* ${filename}
❒ *Peso:* ${filesize}
❒ *Paquete:* ${mimetype}

📍  Descargando el archivo, espere un momento...`

await conn.sendMessage(m.chat, { text: mfDescarga }, { quoted: m })
await conn.sendMessage(m.chat, { document: { url: dl_url }, fileName: filename, mimetype, "✅ " + filename}, { quoted: m })
} catch (e) {
await conn.sendMessage(m.chat, { text: `*[ 📍 ]*  ERROR_COMMAND = Command error, try again and if the error persists, report the command.` }, { quoted: m })
}}

handler.command = ['mf', 'mediafire']
handler.help = ['mediafire']
handler.tags = ['download']

export default handler*/
