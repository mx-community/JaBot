import fetch from 'node-fetch'
import yts from 'yt-search'
import axios from 'axios'
const MAX_FILE_SIZE_MB = 80
const CACHE_TIME = 10 * 60 * 1000
let ytCache = {}
function formatNumber(num) {
return num.toLocaleString('en-US')
}

async function getSize(url) {
try {
const res = await axios.head(url)
const len = res.headers['content-length']
return len ? parseInt(len, 10) : 0
} catch {
return 0
}
}

function formatSize(bytes) {
const units = ['B', 'KB', 'MB', 'GB']
let i = 0
while (bytes >= 1024 && i < units.length - 1) {
bytes /= 1024
i++
}
return `${bytes.toFixed(2)} ${units[i]}`
}

async function getStellar(url) {
try {
const api = `https://api.stellarwa.xyz/dl/ytdl?url=${encodeURIComponent(url)}&format=mp3&key=Shadow_Core`
const res = await fetch(api)
const data = await res.json()

if (data?.status && data?.data?.dl) {
return {
link: data.data.dl,
format: 'mp3'
}
}

throw new Error('No se pudo obtener el enlace de descarga')
} catch (e) {
console.error('Error en Stellar API:', e.message)
return null
}
}

async function getYupra(url) {
try {
const api = `https://api.yupra.my.id/api/downloader/ytmp4?url=${encodeURIComponent(url)}`
const res = await fetch(api)
const data = await res.json()

if (data?.result?.formats?.[0]?.url) {
return {
link: data.result.formats[0].url,
title: data.result.title || 'Desconocido',
format: 'mp4'
}
}
throw new Error('No se pudo obtener el enlace de descarga')
} catch (e) {
console.error('Error en Yupra API:', e.message)
return null
}
}

var handler = async (m, { text, conn }) => {
if (!text) return conn.sendMessage(m.chat, { text: `Ingrese el comando y escriba lo que quiere buscar en *YouTube*.\n\n• Por ejemplo:\n*#${command}* Jacob and the stone.` }, { quoted: m })

try {
await conn.sendMessage(m.chat, { text: `Buscando resultados, espere un momento...` }, { quoted: m })
const results = await yts(text)
const videos = results.videos.slice(0, 15)
if (!videos.length) return conn.sendMessage(m.chat, { text: `📍  No se han encontrado videos relacionados, intentelo de nuevo.` }, { quoted: m })
ytCache[m.sender] = { results: videos, timestamp: Date.now() }
let resultadoYt = `·─┄ · ✦ *YouTube : Search* ✦ ·
- _Responda a este mensaje con el formato y numero junto para descargarlo._

• Por ejemplo:
a2 *(Descarga en audio)*
v2 *(Descarga en video)*

·────────────────·\n\n`

for (let i = 0; i < videos.length; i++) {
const v = videos[i]
resultadoYt += `⊹⟡ *${i + 1}.* ${v.title}\n`
resultadoYt += `⊹⟡ *Duración:* ${v.timestamp || 'Desconocida'}\n`
resultadoYt += `⊹⟡ *Subido:* ${v.ago || 'N/D'}*\n`
resultadoYt += `⊹⟡ *Enlace:* ${v.url}\n`
resultadoYt += `\n${'-'.repeat(38)}\n\n`
}
await conn.sendMessage(m.chat, { image: { url: videos[0].thumbnail }, caption: resultadoYt }, { quoted: m })
} catch (e) {
conn.sendMessage(m.chat, { text: `📍  Ocurrio un error al procesar la busqueda de resultados.` }, { quoted: m })
}
}

handler.before = async (m, { conn }) => {
if (!m.text) return
const match = m.text.trim().match(/^(a|v)(\d{1,2})$/i)
if (!match) return

const type = match[1].toLowerCase() === 'a' ? 'audio' : 'video'
const index = parseInt(match[2]) - 1

const userCache = ytCache[m.sender]
if (!userCache || !userCache.results[index] || Date.now() - userCache.timestamp > CACHE_TIME)
return conn.sendMessage(m.chat, { text: `📍  La lista de seleccion a expirado.\n- Use de nuevo el comando para tener 1 minuto de seleccion.` }, { quoted: m })

const video = userCache.results[index]

try {
await conn.sendMessage(m.chat, { text: `Descargando, espere un momento...` }, { quoted: m })
const apiData = type === 'audio'
? await getStellar(video.url)
: await getYupra(video.url)

if (!apiData) return conn.sendMessage(m.chat, { text: `📍  Ocurrio un error con la api de descarga.` }, { quoted: m })

const size = await getSize(apiData.link)
const mb = size / (1024 * 1024)
const sendAsDoc = mb > MAX_FILE_SIZE_MB

const textoResultado = `🝐✦  *YouTube : Download*

⊹ ✎ *Titulo:* ${apiData.title}
⊹ ✎ *Duración:* ${video.timestamp || 'Desconocida'}
⊹ ✎ *Tamaño:* ${formatSize(size)}`

if (sendAsDoc) {
await conn.sendMessage( m.chat, { document: { url: apiData.link }, fileName: `${apiData.title}.${apiData.format}`, mimetype: type === 'audio' ? 'audio/mpeg' : 'video/mp4', caption: textoResultado + `\n\n> ⩽ *Detalles* ⩾\nPeso: (${MAX_FILE_SIZE_MB} MB)` }, { quoted: m })
} else if (type === 'audio') {
await conn.sendMessage( m.chat, { audio: { url: apiData.link }, fileName: `${apiData.title}.mp3`, mimetype: 'audio/mpeg', ptt: false, caption: `✓  Audio descargado.` }, { quoted: m })
} else {
await conn.sendMessage( m.chat, { video: { url: apiData.link }, fileName: `${apiData.title}.mp4`, mimetype: 'video/mp4', caption: `✓  Video descargado.` }, { quoted: m })
}


} catch (e) {
await conn.sendMessage(m.chat, { text: `*[ 📍 ]*  ERROR_COMMAND = Command error, try again and if the error persists, report the command.` }, { quoted: m })
}
}

handler.command = ['yts', 'playlist']

export default handler
