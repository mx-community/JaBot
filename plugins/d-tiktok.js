import fetch from 'node-fetch'

let handler = async (m, { conn, usedPrefix, command, text }) => {
let optionsXd = `〆  T I K T O K  :  D L

\t⸭ 📌 \`\`\`Descargas de tiktok.\`\`\`

\t\t⧡ ${usedPrefix + command} *<link>*
\t\t⧡ ${usedPrefix}p-tiktok *<link>*
\t\t⧡ ${usedPrefix}a-tiktok *<link>*

⚶ Por ejemplo:
${usedPrefix + command} https://vm.tiktok.com/ZNdKt838j/

> ${textbot}`
if (!text) return conn.sendMessage(m.chat, { text: optionsXd.trim() }, { quoted: m })
try {
let regex = /https?:\/\/(?:www\.|vm\.|vt\.)?tiktok\.com\/[^\s]+/i
let match = m.text.match(regex)
if (!match) return conn.sendMessage(m.chat, { text: `📍  El enlace no es valido, verifique si es de *TikTok* y vuelva a intentarlo.` }, { quoted: m })
let url = match[0]
let api = `https://www.tikwm.com/api/?url=${encodeURIComponent(url)}?hd=1`
let res = await fetch(api)
let json = await res.json()
if (!json || json.code !== 0 || !json.data) return conn.sendMessage(m.chat, { text: `📍  No se han encontrado resultados en el enlace.` }, { quoted: m })
const data = json.data
const { id, region, title, cover, origin_cover, duration, play, wmplay, music, music_info, play_count, digg_count, comment_count, share_count, download_count, author, images, create_time } = data
let titulott = `〆  T I K T O K  :  D L

\t⸭ ✅ ${title}

\t\t⧡ ID : *${id}*
\t\t⧡ Duracion : *${duration}*
\t\t⧡ Publicado : *${create_time}*
\t\t⧡ Comentarios : *${comment_count}*
\t\t⧡ Compartidos : *${share_count}*
\t\t⧡ Descargas : *${download_count}*

> ${textbot}
`
await m.react("⏰")
await conn.sendMessage(m.chat, { video: { url: play }, caption: titulott, gifPlayback: false, jpegThumbnail: Buffer.from(await (await fetch(cover)).arrayBuffer()) }, { quoted: m })
} catch (err) {
console.error(err)
await conn.sendMessage(m.chat, { text: `*[ 📍 ]*  ERROR_COMMAND = ${err}` }, { quoted: m })
}
}

handler.command = ["tiktok", "tt"]
export default handler

 

/*import fetch from 'node-fetch'

let handler = async (m, { conn, usedPrefix, command, text }) => {
if (!text) return conn.sendMessage(m.chat, { text: `Ingrese el comando mas un enlace de un video o imagenes de *TikTok* para descargarlo.\n\n• Por ejemplo:\n*#${command}* https://vm.tiktok.com/ZNdKt838j/` }, { quoted: m })
try {
let regex = /https?:\/\/(?:www\.|vm\.|vt\.)?tiktok\.com\/[^\s]+/i
let match = m.text.match(regex)
if (!match) return conn.sendMessage(m.chat, { text: `📍  El enlace no es valido, verifique si es de *TikTok* y vuelva a intentarlo.` }, { quoted: m })
let url = match[0]
let api = `https://www.tikwm.com/api/?url=${encodeURIComponent(url)}?hd=1`
let res = await fetch(api)
let json = await res.json()
if (!json || json.code !== 0 || !json.data) return conn.sendMessage(m.chat, { text: `📍  No se han encontrado resultados en el enlace.` }, { quoted: m })
const data = json.data
const { id, region, title, cover, origin_cover, duration, play, wmplay, music, music_info, play_count, digg_count, comment_count, share_count, download_count, author, images, create_time } = data
if (images && images.length > 0) {
await conn.sendMessage(m.chat, { text: `Descargando imagenes, espere un momento...` }, { quoted: m })
for (let i = 0; i < images.length; i++) {
await conn.sendMessage(m.chat, { image: { url: images[i] }, caption: `` }, { quoted: m })
 }
} else {
await conn.sendMessage(m.chat, { text: `Descargando videos, espere un momento...` }, { quoted: m })
await conn.sendMessage(m.chat, { video: { url: play }, caption: ``, gifPlayback: false, jpegThumbnail: Buffer.from(await (await fetch(cover)).arrayBuffer()) }, { quoted: m })
}
} catch (err) {
console.error(err)
await conn.sendMessage(m.chat, { text: `*[ 📍 ]*  ERROR_COMMAND = ${err}` }, { quoted: m })
}
}

handler.command = ["tiktok", "tt"]
export default handler
*/
