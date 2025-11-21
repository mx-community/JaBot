import fetch from 'node-fetch'

let handler = async (m, { conn, usedPrefix, command, text }) => {
let optionsXd = `〆  T I K T O K  :  D L

\t⸭ 📌 \`\`\`Descargas de tiktok.\`\`\`

\t\t⧡ ${usedPrefix}tiktok *<link>*
\t\t⧡ ${usedPrefix}p-tiktok *<link>*
\t\t⧡ ${usedPrefix}a-tiktok *<link>*

⚶ Por ejemplo:
${usedPrefix + command} https://vm.tiktok.com/ZNR1YX8Dm/

> ${textbot}`
if (!text) return conn.sendMessage(m.chat, { text: optionsXd }, { quoted: m })
try {
let regex = /https?:\/\/(?:www\.|vm\.|vt\.)?tiktok\.com\/[^\s]+/i
let match = m.text.match(regex)
if (!match) return conn.sendMessage(m.chat, { text: `📌  No se ha podido acceder al enlace.\n- Si el error persiste, reporte el comando..` }, { quoted: m })
let url = match[0]
let api = `https://www.tikwm.com/api/?url=${encodeURIComponent(url)}?hd=1`
let res = await fetch(api)
let json = await res.json()
if (!json || json.code !== 0 || !json.data) return conn.sendMessage(m.chat, { text: `📌  No se han encontrado resultados en el enlace.` }, { quoted: m })
const data = json.data
const { id, region, title, cover, origin_cover, duration, play, wmplay, music, music_info, play_count, digg_count, comment_count, share_count, download_count, author, images, create_time } = data
if (images && images.length > 0) {
let infoXd = `〆  T I K T O K  :  D L

\t⸭ ✅ ${title}

\t\t⧡ Descargas : *${download_count}*
\t\t⧡ Comentarios : *${comment_count}* 
\t\t⧡ Compartidos : *${share_count}*

> ${textbot}`
await m.react("⏰")
await conn.sendMessage(m.chat, { text: infoXd }, { quoted: m })
for (let i = 0; i < images.length; i++) {
await conn.sendMessage(m.chat, { image: { url: images[i] }, caption: `xd` }, m)
 }
await m.react("✅")
}} catch (err) {
console.error(err)
await conn.sendMessage(m.chat, { text: `*[ 📍 ]*  ERROR_COMMAND = ${err}` }, { quoted: m })
}
}

handler.command = ["p-tiktok", "p-tt"]
export default handler

