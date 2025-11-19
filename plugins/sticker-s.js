import { sticker } from '../lib/sticker.js'
import uploadFile from '../lib/uploadFile.js'
import uploadImage from '../lib/uploadImage.js'
import { webp2png } from '../lib/webp2mp4.js'
import fetch from 'node-fetch'

let handler = async (m, {conn, args, usedPrefix, command}) => {
let stiker = false
let userId = m.sender
let packstickers = global.db.data.users[userId] || {}
let texto1 = packstickers.text1 || global.packsticker
let texto2 = packstickers.text2 || global.packsticker2
const thumb = Buffer.from(await (await fetch(`${global.mMages}`)).arrayBuffer())
let stick = args.join(' ').split('|')
try {

let q = m.quoted ? m.quoted : m
let mime = (q.msg || q).mimetype || q.mediaType || ''
if (/webp|image|video/g.test(mime)) {
if (/video/g.test(mime))
if ((q.msg || q).seconds > 11)
return conn.sendMessage(m.chat, { text: `📍  El video no debe durar mas de 10 segundos.\n\n\t\t＃ Recorta el vídeo y inténtalo de nuevo.` }, { quoted: m })
let img = await q.download?.()
if (!img) return conn.sendMessage(m.chat, { text: `·─┄ · ✦ *Created : Stickers* ✦ ·\n\t𝇈 📍 \`\`\`Crea stickers sin limite.\`\`\`\n\n\t\t⧡ *${usedPrefix + command}* (imagen, video o link)\n\t\t⧡ *${usedPrefix}brat* (texto)\n\t\t⧡ *${usedPrefix}qc* (texto)\n\t\t⧡ *${usedPrefix}exif* (texto/texto2)\n\t\t⧡ *${usedPrefix}d-exif* (defauld)\n\n\n> ${textbot}` }, { quoted: m })
let out
try {
stiker = await sticker(img, false, texto1, texto2)
} catch (e) {
console.error(e)
} finally {
await m.react("⏳")
if (!stiker) {
if (/webp/g.test(mime)) out = await webp2png(img)
else if (/image/g.test(mime)) out = await uploadImage(img)
else if (/video/g.test(mime)) out = await uploadFile(img)
if (typeof out !== 'string') out = await uploadImage(img)
stiker = await sticker(false, out, texto1, texto2)
}
}
} else if (args[0]) {
if (isUrl(args[0])) stiker = await sticker(false, args[0], texto1, texto2)
else return conn.sendMessage(m.chat, { text: `📍  El enlace debe tener una terminación *jpg, png o jpeg*.\n- Puede usar enlaces de qu.ax o diferentes.` }, { quoted: m })
}
} catch (e) {
console.error(e)
if (!stiker) stiker = e
} finally {
if (stiker) conn.sendFile(m.chat, stiker, 'sticker.webp', '', m, true, { contextInfo: { forwardingScore: 200, isForwarded: false, externalAdReply: { showAdAttribution: false, title: "々  S T I C K E R S  々", body: textbot, mediaType: 2, sourceUrl: null, thumbnail: thumb } } }, {quoted: m} )
else
return conn.sendMessage(m.chat, { text: `·─┄ · ✦ *Created : Stickers* ✦ ·\n\t𝇈 📍 \`\`\`Crea stickers sin limite.\`\`\`\n\n\t\t⧡ *${usedPrefix + command}* (imagen, video o link)\n\t\t⧡ *${usedPrefix}brat* (texto)\n\t\t⧡ *${usedPrefix}qc* (texto)\n\t\t⧡ *${usedPrefix}exif* (texto/texto2)\n\t\t⧡ *${usedPrefix}d-exif* (defauld)\n\n\n> ${textbot}` }, { quoted: m })
}

}
handler.help = ['sticker']
handler.tags = ['sticker']
handler.command = ['s', 'sticker', 'stiker']

export default handler

/*function msToTime(duration) {
var milliseconds = parseInt((duration % 1000) / 100),
seconds = Math.floor((duration / 1000) % 60),
minutes = Math.floor((duration / (1000 * 60)) % 60),
hours = Math.floor((duration / (1000 * 60 * 60)) % 24)

hours = hours < 10 ? '0' + hours : hours
minutes = minutes < 10 ? '0' + minutes : minutes
seconds = seconds < 10 ? '0' + seconds : seconds

return minutes + ' m y ' + seconds + ' s '
}*/

const isUrl = (text) => {
return text.match(
new RegExp(/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&/=]*)(jpe?g|gif|png)/, 'gi')
)
}
  



/*import { sticker } from '../lib/sticker.js'
import uploadFile from '../lib/uploadFile.js'
import uploadImage from '../lib/uploadImage.js'
import { webp2png } from '../lib/webp2mp4.js'

let handler = async (m, { conn, args, usedPrefix, command }) => {
let stiker = false
let userId = m.sender
let packstickers = global.db.data.users[userId] || {}
let texto1 = packstickers.text1 || global.packsticker
let texto2 = packstickers.text2 || global.packsticker2
try {
let q = m.quoted ? m.quoted : m
let mime = (q.msg || q).mimetype || q.mediaType || ''
let txt = args.join(' ')
if (/webp|image|video/g.test(mime) && q.download) {
if (/video/.test(mime) && (q.msg || q).seconds > 16)
return conn.sendMessage(m.chat, { text: `📍  El video no debe durar mas de 15 segundos.\n\n\t\t＃ Recorta el vídeo y inténtalo de nuevo.` }, { quoted: m })
let buffer = await q.download()
await m.react('⏳')
let marca = txt ? txt.split(/[\u2022|]/).map(part => part.trim()) : [texto1, texto2]
stiker = await sticker(buffer, false, marca[0], marca[1])
} else if (args[0] && isUrl(args[0])) {
let buffer = await sticker(false, args[0], texto1, texto2)
stiker = buffer
} else {
let disponible = `·─┄ · ✦ *Created : Stickers* ✦ ·
\t𝇈 📍 \`\`\`Crea stickers sin limite.\`\`\`

\t\t⧡ *${usedPrefix + command}* (imagen y video)
\t\t⧡ *${usedPrefix}brat* (texto)
\t\t⧡ *${usedPrefix}qc* (texto)
\t\t⧡ *${usedPrefix}exif* (texto/texto2)
\t\t⧡ *${usedPrefix}d-exif* (defauld)


> ${textbot}
`
return conn.sendMessage(m.chat, { text: disponible }, { quoted: m })
}} catch (e) {
await await conn.sendMessage(m.chat, { text: `*[ 📍 ]*  ERROR_COMMAND = ${e.message}` }, { quoted: m })
await m.react('📍')
} finally {
if (stiker) {
conn.sendFile(m.chat, stiker, 'sticker.webp', '', m)
await m.react('✅')
}}}

handler.help = ['sticker']
handler.tags = ['sticker']
handler.command = ['s', 'sticker']

export default handler

const isUrl = (text) => {
return text.match(new RegExp(/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)(jpe?g|gif|png)/, 'gi'))
}

  */
