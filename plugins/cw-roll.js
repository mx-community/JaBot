import { promises as fs } from 'fs'

const charactersFilePath = './src/database/characters[1].json'
const haremFilePath = './src/database/harem.json'

const cooldowns = {}

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

let handler = async (m, { conn }) => {
const userId = m.sender
const now = Date.now()

// Reaccionar al mensaje del usuario inmediatamente
await conn.sendMessage(m.chat, {
react: {
text: '⏳',
key: m.key
}
})

// Tiempo reducido de 15 minutos a 3 minutos
if (cooldowns[userId] && now < cooldowns[userId]) {
const remainingTime = Math.ceil((cooldowns[userId] - now) / 1000)
const minutes = Math.floor(remainingTime / 60)
const seconds = remainingTime % 60
await conn.sendMessage(m.chat, { text: `📍  Debe de esperar *${minutes} minutos y ${seconds} segundos* para volver a usar este comando.` }, { quoted: m })
return
}

try {
const characters = await loadCharacters()
const harem = await loadHarem()

const randomCharacter = characters[Math.floor(Math.random() * characters.length)]
const randomImage = randomCharacter.img[Math.floor(Math.random() * randomCharacter.img.length)]

// Verificar si el personaje ya está reclamado
const userHarem = harem.find(entry => entry.characterId === randomCharacter.id)
const statusMessage = userHarem ? 'Reclamado.' : 'Disponible.'

const message = `·─┄ · ✦ *Personaje : Coleccion* ✦ ·
> *ID:* ${randomCharacter.id}

々 *Nombre:* ${randomCharacter.name}
ᗜ *Genero:* ${randomCharacter.gender}
⛁ *Precio:* ${randomCharacter.value} *${currency2}*
✦ *Estado:* ${statusMessage}

${!userHarem ? `📍  Responda a este mensaje con el comando *#c* para reclamarlo.` : `📌  Personaje ya reclamado por un usuario.\n- Siga intentando con otro personaje.`}`

const mentions = userHarem ? [userHarem.userId] : []

// Enviar el mensaje con el personaje
await conn.sendFile(m.chat, randomImage, `${randomCharacter.name}.jpg`, message, m, { 
mentions,
contextInfo: {
mentionedJid: mentions
}
})

// Cooldown reducido de 15 minutos a 3 minutos (180 segundos)
cooldowns[userId] = now + 3 * 60 * 1000

} catch (error) {
await conn.sendMessage(m.chat, { text: `*[ 📍 ]*  ERROR_COMMAND = ${error.message}` }, { quoted: m })
}
}

handler.help = ['cw', 'cwroll']
handler.tags = ['personajes']
handler.command = ['cwroll', 'cw']
handler.group = true

export default handler
