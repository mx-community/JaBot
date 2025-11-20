import fetch from 'node-fetch'
import yts from 'yt-search'

let handler = async (m, { conn, usedPrefix, args command, text }) => {
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
} else if (args[0] === "mp3" && !text) {
if (!text) throw m.reply(`Por favor, ingresa un enlace de *TikTok*.`);
conn.sendMessage(m.chat, { react: { text: "🕒", key: m.key } });
  let d2 = await fetch(`https://eliasar-yt-api.vercel.app/api/search/tiktok?query=${text}`)
  let dp = await d2.json()
      const doc = {
      audio: { url: dp.results.audio },
      mimetype: 'audio/mp4',
      fileName: `ttbykeni.mp3`
    };
    await conn.sendMessage(m.chat, doc, { quoted: m })
await conn.sendMessage(m.chat, { react: { text: '✅', key: m.key }});
}
}

handler.command = ["tiktokp", "tt"]
export default handler

  
