import fetch from 'node-fetch'
import axios from 'axios'
import cheerio from 'cheerio'
let handler = async (m, { conn, args, text, command }) => {
if (!text) return conn.sendMessage(m.chat, { text: `Ingrese el comando mas un enlace de un video o imagen de *Twitter* para descargarlo.\n\n• Por ejemplo:\n*#${command}* https://x.com/itsD3lay/status/1991129340067868894?t=LfY9O5INtjKTH8IKr562Kw&s=19` }, { quoted: m })
try {
await m.react("⏰")
const result = await twitterScraper(text);
if (!result.status) return conn.reply(m.chat, `📍  No se ha podido obtener el contenido de Twitter.`, m)
if (result.data.type === 'video') {
let videoText = `\t〨  *T W I T T E R*

\t⸭ ✅ ${result.data.title}

\t\t⧡ Duracion : ${result.data.duration}
\t\t⧡ Enlace : ${text}

> ${textbot}`
conn.sendFile(m.chat, result.data.dl[0].url, "video.mp4", videoText, m)

} else {
await conn.sendMessage(m.chat, { image: { url: result.data.imageUrl },
caption: `✓  Imagen de Twitter descargada.`}, { quoted: m })
}} catch (e) {
return await conn.sendMessage(m.chat, { text: `*[ 📍 ]*  ERROR_COMMAND = ${e}` }, { quoted: m })
}}

handler.command = ["x", "twitter", "tw"]
handler.help = ["twitter"]
handler.tags = ["download"]

export default handler

async function twitterScraper(url) {
return new Promise(async (resolve, reject) => {
try {
const twitterUrlMatch = url.match(/(https:\/\/x.com\/[^?]+)/)
const tMatch = url.match(/t=([^&]+)/)
const twitterUrl = twitterUrlMatch ? twitterUrlMatch[1] : ''
const t = tMatch ? tMatch[1] : ''
const urlnya = encodeURIComponent(`${twitterUrl}?t=${t}&s=19`)
const response = await axios.post("https://savetwitter.net/api/ajaxSearch",
`q=${urlnya}&lang=en`)
const $ = cheerio.load(response.data.data)
const isVideo = $('.tw-video').length > 0
const twitterId = $('#TwitterId').val()
if (isVideo) {
const videoThumbnail = $('.tw-video .thumbnail .image-tw img').attr('src')
const data = []
$('.dl-action a').each((i, elem) => {
const quality = $(elem).text().trim()
const url = $(elem).attr('href')
if ($(elem).hasClass('action-convert')) {
const audioUrl = $(elem).attr('data-audioUrl')
data.push({
quality: quality,
url: audioUrl || 'URL not found',
})
} else {
data.push({
quality: quality,
url: url
})
}})
const title = $('.tw-middle h3').text().trim()
const videoDuration = $('.tw-middle p').text().trim()
resolve({
status: true,
data: {
type: "video",
title: title,
duration: videoDuration,
twitterId: twitterId,
videoThumbnail: videoThumbnail,
dl: data
}})
} else {
const imageUrl = $('.photo-list .download-items__thumb img').attr('src')
const downloadUrl = $('.photo-list .download-items__btn a').attr('href')
resolve({
status: true,
data: {
type: "image",
twitterId: twitterId,
imageUrl: imageUrl,
dl: downloadUrl
}})
}} catch (error) {
reject(error)
}})
}

  
