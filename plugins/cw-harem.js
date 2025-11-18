import { promises as fs } from 'fs'

const charactersFilePath = './src/database/characters[1].json'
const haremFilePath = './src/database/harem.json'

async function loadCharacters() {
try {
const data = await fs.readFile(charactersFilePath, 'utf-8')
return JSON.parse(data)
} catch (error) {
throw new Error('No se pudo cargar el archivo characters.json.')
}
}

async function loadHarem() {
try {
const data = await fs.readFile(haremFilePath, 'utf-8')
return JSON.parse(data)
} catch (error) {
return []
}
}

let handler = async (m, { conn, args, usedPrefix, command }) => {
const ctxErr = global.rcanalx || {}
const ctxWarn = global.rcanalw || {}
const ctxOk = global.rcanalr || {}

try {
const characters = await loadCharacters()
const harem = await loadHarem()
let userId

if (m.quoted && m.quoted.sender) {
userId = m.quoted.sender
} else if (args[0] && args[0].startsWith('@')) {
userId = args[0].replace('@', '') + '@s.whatsapp.net'
} else {
userId = m.sender
}

const userCharacters = characters.filter(character => character.user === userId)

if (userCharacters.length === 0) {
let sinNada = `📍Lo siento ${userId === m.sender ? `no tienes` : `@${who.split`@`[0]}, no tienes`} personajes reclamados.
- Para reclamar un personaje use el comando *#rw*.`
return conn.sendMessage(m.chat, { text: sinNada, mentions: conn.parseMention(sinNada) }, { quoted: m })
}

const page = parseInt(args[1]) || 1
const charactersPerPage = 50
const totalCharacters = userCharacters.length
const totalPages = Math.ceil(totalCharacters / charactersPerPage)
const startIndex = (page - 1) * charactersPerPage
const endIndex = Math.min(startIndex + charactersPerPage, totalCharacters)

if (page < 1 || page > totalPages) {
await conn.sendMessage(m.chat, { text: `📍La página no es valida.\n- Ingrese el comando y el numero de la pagina del 1 al ${totalPages}.` }, { quoted: m })
return
}

let message = `·─┄ · ✦ *Harem : Personajes* ✦ ·\n\n`
message += `🜲 *Usuario:* @${userId.split('@')[0]}\n`
message += `々 *Personajes:* ${totalCharacters}\n`
message += `⎘ *Página:* ${page} de ${totalPages}\n\n`
message += `· · · •──────────────• · · ·\n\n`

for (let i = startIndex; i < endIndex; i++) {
const character = userCharacters[i]
message += `々 *Personaje ${i + 1}:* ${character.name}\n`
message += `⛁ *Precio:* ${character.value}\n`
}

message += `\n· · · •──────────────• · · ·\n`
message += `⎘ Página ${page} de ${totalPages}\n\n`
if (page < totalPages) {
message += `> 📍Ingrese el comando *#${command} ${page + 1}* para ver la siguiente pagina.\n`
}

await conn.reply(m.chat, message, m, { mentions: [userId] })
} catch (error) {
await conn.sendMessage(m.chat, { text: `*[ 📍 ]*ERROR_COMMAND = ${error}` }, { quoted: m })
}
}

handler.help = ['harem']
handler.tags = ['gacha']
handler.command = ['harem', 'claims']
handler.group = true

export default handler

/*import { promises as fs } from 'fs'

const charactersFilePath = './src/database/characters[1].json'
const haremFilePath = './src/database/harem.json'

async function loadCharacters() {
try {
const data = await fs.readFile(charactersFilePath, 'utf-8')
return JSON.parse(data)
} catch (error) {
throw new Error('No se pudo cargar el archivo characters.json.')
}
}

async function loadHarem() {
try {
const data = await fs.readFile(haremFilePath, 'utf-8')
return JSON.parse(data)
} catch (error) {
return []
}
}

let handler = async (m, { conn, args, usedPrefix, command }) => {
try {
const characters = await loadCharacters()
const harem = await loadHarem()
let userId

if (m.quoted && m.quoted.sender) {
userId = m.quoted.sender
} else if (args[0] && args[0].startsWith('@')) {
userId = args[0].replace('@', '') + '@s.whatsapp.net'
} else {
userId = m.sender
}
const exUsuario = await conn.getName(m.sender)
const exCitado = await conn.getName(who)

const userCharacters = characters.filter(character => character.user === userId)

if (userCharacters.length === 0) {
let sinNada = `📍  Lo siento ${userId === m.sender ? `no tienes` : `@${who.split`@`[0]}, no tienes`} personajes reclamados.
- Para reclamar un personaje use el comando *#cw*.`
return conn.sendMessage(m.chat, { text: sinNada, mentions: conn.parseMention(sinNada) }, { quoted: m })
}

const page = parseInt(args[1]) || 1
const charactersPerPage = 50
const totalCharacters = userCharacters.length
const totalPages = Math.ceil(totalCharacters / charactersPerPage)
const startIndex = (page - 1) * charactersPerPage
const endIndex = Math.min(startIndex + charactersPerPage, totalCharacters)

if (page < 1 || page > totalPages) {
await conn.sendMessage(m.chat, { text: `📍  La página no es valida.\n- Ingrese el comando y el numero de la pagina del 1 al ${totalPages}.` }, { quoted: m })
return
}

let message = `·─┄ · ✦ *Harem : Personajes* ✦ ·\n\n`
message += `🜲 *Usuario:* @${userId.split('@')[0]}\n`
message += `々 *Personajes:* ${totalCharacters}\n`
message += `⎘ *Página:* ${page} de ${totalPages}\n\n`
message += `· · · •──────────────• · · ·\n\n`

for (let i = startIndex; i < endIndex; i++) {
const character = userCharacters[i]
message += `々 *Personaje ${i + 1}:* ${character.name}\n`
message += `⛁ *Precio:* ${character.value}\n`
}
message += `\n· · · •──────────────• · · ·\n`
message += `⎘ Página ${page} de ${totalPages}\n\n`
if (page < totalPages) {
message += `> 📍  Ingrese el comando *#${command} ${page + 1}* para ver la siguiente pagina.\n`
}

await conn.reply(m.chat, message, m, { mentions: [userId] })
} catch (error) {
await await conn.sendMessage(m.chat, { text: `*[ 📍 ]*  ERROR_COMMAND = ${error.message}` }, { quoted: m })
}
}

handler.help = ['harem']
handler.tags = ['personajes']
handler.command = ['harem', 'claims']
handler.group = true

export default handler*/
