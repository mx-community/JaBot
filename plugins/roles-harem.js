import { promises as fs } from 'fs'

const charactersFilePath = './src/database/personajes.json'
const haremFilePath = './src/database/reclamados.json'

async function loadCharacters() {
try {
const data = await fs.readFile(charactersFilePath, 'utf-8')
return JSON.parse(data)
} catch (error) {
throw new Error('📍 No se pudo cargar el archivo characters.json.')
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

const userCharacters = characters.filter(character => character.user === userId)

if (userCharacters.length === 0) {
await conn.reply(m.chat, 
`📍  ${userId === m.sender ? 'No tienes personajes en tu harem para verlos.\n- Reclama tu primer personaje con *#rw*.' : 'No puedes acceder al harem de otro usuario.\n- Usa tu #harem para ver tus personajes.'}\n`,
m, 
{ mentions: [userId] }
)
return
}

const page = parseInt(args[1]) || 1
const charactersPerPage = 50
const totalCharacters = userCharacters.length
const totalPages = Math.ceil(totalCharacters / charactersPerPage)
const startIndex = (page - 1) * charactersPerPage
const endIndex = Math.min(startIndex + charactersPerPage, totalCharacters)

if (page < 1 || page > totalPages) {
await conn.reply(m.chat, 
`📍  La pagina ingresada no existe.\n- Ingrese el comando y la página del 1 al ${totalPages}.\n\n• Por ejemplo:\n*#${command}* 2`,
m
)
return
}

let message = `·─┄ · ✦ *Personajes : Harem* ✦ ·\n\n`
message += `🜲 *Usuario:* @${userId.split('@')[0]}\n`
message += `々 *Personajes:* ${totalCharacters} de 50\n`
message += `⎘ *Página:* ${page} de ${totalPages} pagina(s).\n\n`
message += `· · · •──────────────• · · ·\n\n`

for (let i = startIndex; i < endIndex; i++) {
const character = userCharacters[i]
message += `々 *Personaje ${i + 1}:* ${character.name}\n`
message += `🝢 *Genero:* ${character.gender}\n`
message += `✦ *Rango:* ${character.source}\n`
message += `⤷ ⛁ *Valor:* ${character.value} ${currency2}\n\n`
}

message += `· · · •──────────────• · · ·\n`
message += `⎘ Página ${page} de ${totalPages}\n`

if (page < totalPages) {
message += `> 📍  Ingrese el comando *#${command} ${page + 1}* para ver la siguiente pagina.\n`
}
await conn.reply(m.chat, message, m, { mentions: [userId] })
} catch (error) {
await conn.reply(m.chat, 
`📍 ${error.message}`,
m
)
}
}

handler.help = ['harem']
handler.tags = ['gacha']
handler.command = ['harem', 'claims']
handler.group = true

export default handler
