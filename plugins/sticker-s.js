import { sticker } from '../lib/sticker.js'
import uploadFile from '../lib/uploadFile.js'
import uploadImage from '../lib/uploadImage.js'
import { webp2png } from '../lib/webp2mp4.js'

let handler = async (m, { conn, args }) => {
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

  
