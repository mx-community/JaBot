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
let sinNada = `📍  Lo siento ${userId === m.sender ? `no tienes` : `@${userId.split('@')[0]}, no tienes`} personajes reclamados.
- Para reclamar un personaje use el comando *#cw*.`
return conn.sendMessage(m.chat, { text: sinNada, mentions: [userId] }, { quoted: m })
}

const page = parseInt(args[1]) || 1
const charactersPerPage = 50
const totalCharacters = userCharacters.length
const totalPages = Math.ceil(totalCharacters / charactersPerPage)
const startIndex = (page - 1) * charactersPerPage
const endIndex = Math.min(startIndex + charactersPerPage, totalCharacters)

if (page < 1 || page > totalPages) {
await conn.sendMessage(m.chat, { text: `📍  La página no es valida.\n- Ingrese el comando y el numero de la pagina de 1 al ${totalPages}.` }, { quoted: m })
return
}

let message = `🍙🎴 *ITSUKI - Harem de Personajes* 📚✨\n\n`
message += `👤 *Usuario:* @${userId.split('@')[0]}\n`
message += `🎴 *Total de personajes:* ${totalCharacters}\n`
message += `📄 *Página:* ${page} de ${totalPages}\n\n`
message += `━━━━━━━━━━━━━━━━━━━━\n\n`

for (let i = startIndex; i < endIndex; i++) {
const character = userCharacters[i]
message += `${i + 1}. *${character.name}* - Valor: ${character.value}\n`
}

message += `\n━━━━━━━━━━━━━━━━━━━━\n`
message += `📖 Página ${page}/${totalPages}\n\n`

if (page < totalPages) {
message += `💡 Usa ${usedPrefix}${command} ${page + 1} para ver más\n`
}

message += `\n🍱 "Esta es tu colección de personajes" ✨`

await conn.reply(m.chat, message, m, { mentions: [userId] })
} catch (error) {
await conn.reply(m.chat, 
`🍙❌ *ITSUKI - Error al Cargar*\n\n` +
`⚠️ No se pudo cargar el harem\n\n` +
`📝 *Error:* ${error.message}\n\n` +
`💡 Verifica que los archivos de base de datos existan\n\n` +
`📚 "Contacta al owner si el problema persiste"`,
m
)
}
}

handler.help = ['harem']
handler.tags = ['gacha']
handler.command = ['harem', 'claims', 'waifus', 'coleccion']
handler.group = true

export default handler