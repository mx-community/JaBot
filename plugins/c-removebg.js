import uploadImage from '../lib/uploadImage.js'
import { sticker } from '../lib/sticker.js'
import moment from 'moment-timezone'
let handler = async (m, {conn, text, args}) => {

let d = new Date(new Date + 3600000)
let locale = 'es'
let dia = d.toLocaleDateString(locale, {weekday: 'long'})
let fecha = d.toLocaleDateString('es', {day: 'numeric', month: 'numeric', year: 'numeric'})
let mes = d.toLocaleDateString('es', {month: 'long'})
let years = d.toLocaleDateString('es', {year: 'numeric'})
let hora = `${moment.tz('America/Buenos_Aires').format('HH:mm:ss')}`

let userId = m.sender
let packstickers = global.db.data.users[userId] || {}
let texto1 = packstickers.text1 || global.packsticker
let texto2 = packstickers.text2 || global.packsticker2let stiker = false
let json

let q = m.quoted ? m.quoted : m
let mime = (q.msg || q).mimetype || q.mediaType || ''
if (/image/g.test(mime) && !/webp/g.test(mime)) {
let buffer = await q.download()
let media = await uploadImage(buffer)
json = await (await fetch(`https://btch.us.kg/removebg?url=${media}`)).json()
stiker = await sticker(false, json.result.urls, texto1, texto2)
} else if (text) {
json = await (await fetch(`https://btch.us.kg/removebg?url=${text.trim()}`)).json()
} else return conn.sendMessage(m.chat, { text: `Ingrese el comando y responda a una imagen o un link para quitar el fondo.` }, { quoted: m })
let bgExitoso = `·─┄ · ✦ *Remove : BG* ✦ ·
\t々 📍 \`\`\`Fondo quitado correctamente.\`\`\`

\t\t⚶ *API :* (toru/tools/bg)
\t\t⚶ *Hora :* ${hora}
\t\t⚶ *Fecha :* ${fecha}


> ${textbot}`
await conn.sendMessage(m.chat, {image: {url: json.result.urls}, caption: bgExitoso}, {quoted: m})
}
handler.command = ["bg", "removebg"]
export default handler

const isUrl = (text) => {
const urlRegex = /^(https?):\/\/[^\s/$.?#]+\.(jpe?g|png)$/i
return urlRegex.test(text)
  }
  
