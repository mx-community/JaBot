import axios from 'axios'
import cheerio from 'cheerio'

let handler = async (m, { conn, text, usedPrefix, command }) => {
if (!text) {
await conn.sendMessage(m.chat, { text: `Ingrese el comando y escriba lo que quiera buscar en Wikipedia.\n\n• Por ejemplo:\n*#${command}* Arboles.` }, { quoted: m })
return
}
try {
await conn.sendMessage(m.chat, { text: `Buscando resultados, espere un momento...` }, { quoted: m })
const link = await axios.get(`https://es.wikipedia.org/wiki/${text}`)
const $ = cheerio.load(link.data)
let wik = $('#firstHeading').text().trim()
let resulw = $('#mw-content-text > div.mw-parser-output').find('p').text().trim()
let woki = `·─┄ · ✦ *Wikipedia : Search* ✦ ·

> ❒ *Busqueda:* ${text}
> ❒ *Plataforma:* ${wik}

${resulw}`
await conn.sendMessage(m.chat, { text: woki }, { quoted: m })
} catch (e) {
await conn.sendMessage(m.chat, { text: `*[ 📍 ]*  ERROR_COMMAND = Command error, try again and if the error persists, report the command.` }, { quoted: m })
}}

handler.command = ['wiki', 'wikipedia'] 
export default handler