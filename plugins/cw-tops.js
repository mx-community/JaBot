import { promises as fs } from 'fs'
import fetch form 'node-fetch'
const charactersFilePath = './src/database/characters[1].json'

async function loadCharacters() {
try {
const data = await fs.readFile(charactersFilePath, 'utf-8')
return JSON.parse(data)
} catch (error) {
throw new Error('No se pudo cargar el archivo characters.json.')
}
}

let handler = async (m, { conn, args, usedPrefix, command }) => {

try {
const characters = await loadCharacters()
const page = parseInt(args[0]) || 1
const itemsPerPage = 10
const sortedCharacters = characters.sort((a, b) => Number(b.value) - Number(a.value))

const totalCharacters = sortedCharacters.length
const totalPages = Math.ceil(totalCharacters / itemsPerPage)
const startIndex = (page - 1) * itemsPerPage
const endIndex = startIndex + itemsPerPage
const thumb = Buffer.from(await (await fetch(`https://qu.ax/jnPQa.jpg`)).arrayBuffer())
if (page < 1 || page > totalPages) {
return await conn.sendMessage(m.chat, { text: `📍  Pagina no valida, debe de ingresar el comando y la pagina existente del 1 al ${totalPages}\n\n• Por ejemplo:\n*#${command}* 2` }, { quoted: m })
}

const charactersToShow = sortedCharacters.slice(startIndex, endIndex)

let message = `·─┄ · ✦ *Tops : Personajes* ✦ ·\n> Lista de personajes mas valiosos de la colección.\n\n`
message += `⎘ *Pagina:* ${page}\n`
message += `⎅ *Total:* ${totalPages} pagina(s).\n\n`
message += `· · · •──────────────• · · ·\n\n`

charactersToShow.forEach((character, index) => {
const position = startIndex + index + 1
const medal = position === 1 ? 'Primer lugar. 🏆' : position === 2 ? 'Segundo lugar. 🥈' : position === 3 ? 'Tercer lugar. 🥉' : 'Promedio. 👤'
message += `⎋ *Lugar:* #${position} de ${medal}\n`
message += `🜲 *Personaje:* ${character.name}\n`
message += `々 *Precio:* ${character.value} *${currency2}*.\n`
message += `🝯 *Origen:* ${character.source}\n\n`
})

message += `· · · •──────────────• · · · \n`
message += `⎘ *Pagina:* ${page} de ${totalPages} paginas disponibles.\n\n`

if (page < totalPages) {
message += `📍  Ingrese el comando *#${command} ${page + 1}* para ver la siguiente pagina.\n`
}
await conn.sendMessage(m.chat, { text: message, mentions: [m.sender], contextInfo: { externalAdReply: { 
title: "々  P E R S O N A J E S  :  ＴＯＲＵ  々", 
body: textbot, 
thumbnail: thumb, 
sourceUrl: null, 
mediaType: 1, renderLargerThumbnail: true }}}, { quoted: m })

//conn.reply(m.chat, message, m)
} catch (error) {
await conn.sendMessage(m.chat, { text: `*[ 📍 ]*  ERROR_COMMAND = ${error.message}` }, { quoted: m })
}
}

handler.help = ['cwtop']
handler.tags = ['personajes']
handler.command = ['topcw', 'cwtop']
handler.group = true

export default handler
