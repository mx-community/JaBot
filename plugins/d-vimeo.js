import fetch from "node-fetch"
let handler = async (m, { conn, args, usedPrefix, command }) => {
if (!args[0]) return conn.sendMessage(m.chat, { text: `Ingrese el comando mas un enlace de un video de *Vimeo* para descargarlo.` }, { quoted: m })
try {
await conn.sendMessage(m.chat, { text: `Descargando el video, espere un momento...` }, { quoted: m })
let api = await fetch(`https://apis-starlights-team.koyeb.app/starlight/vimeo-DL?url=${args[0]}`)
let { title, duration, thumbnail, medias } = await api.json()
let vid = medias.find(m => m.quality === "240p")?.url
await conn.sendMessage(m.chat, { video: { url: vid }, caption: `` }, { quoted: m })
} catch (error) {
console.error(error)
await conn.sendMessage(m.chat, { text: `*[ 📍 ]*  ERROR_COMMAND = ${error}` }, { quoted: m })
}}
handler.command = ['vimeo', 'vmeo']

export default handler
