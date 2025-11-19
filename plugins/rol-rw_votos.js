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

async function saveCharacters(characters) {
try {
await fs.writeFile(charactersFilePath, JSON.stringify(characters, null, 2))
} catch (error) {
throw new Error('📍 No se pudo guardar el archivo characters.json.')
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

async function saveHarem(harem) {
try {
await fs.writeFile(haremFilePath, JSON.stringify(harem, null, 2))
} catch (error) {
throw new Error('📍 No se pudo guardar el archivo harem.json.')
}
}

let cooldowns = new Map()
let characterVotes = new Map()

let handler = async (m, { conn, args, usedPrefix, command }) => {

try {
const userId = m.sender
const cooldownTime = 1 * 60 * 60 * 1000

if (cooldowns.has(userId)) {
const expirationTime = cooldowns.get(userId) + cooldownTime
const now = Date.now()
if (now < expirationTime) {
const timeLeft = expirationTime - now
const minutes = Math.floor((timeLeft / 1000 / 60) % 60)
const seconds = Math.floor((timeLeft / 1000) % 60)
await conn.reply(m.chat, 
`📍  Debes esperar *${Math.floor(minutes)} minuto${minutes !== 1 ? 's' : ''} y ${seconds} segundo${seconds !== 1 ? 's' : ''}* para volver a usar el comando.`,
m
)
return
}
}

const characters = await loadCharacters()
const characterName = args.join(' ')

if (!characterName) {
await conn.reply(m.chat, 
`📍  Debes ingresar el nombre del personaje para votar.\n\n• Por ejemplo:\n*#${command}* Takeda Harumi`,
m
)
return
}

const character = characters.find(c => c.name.toLowerCase() === characterName.toLowerCase())

if (!character) {
await conn.reply(m.chat, 
`📍  El personaje ingresado no existe.\n- Verifique la ortografía o vea si existe usando el comando *#toprw*.`,
m
)
return
}

if (characterVotes.has(character.name) && Date.now() < characterVotes.get(character.name)) {
const expirationTime = characterVotes.get(character.name)
const timeLeft = expirationTime - Date.now()
const minutes = Math.floor((timeLeft / 1000 / 60) % 60)
const seconds = Math.floor((timeLeft / 1000) % 60)
await conn.reply(m.chat, 
`📍  El personaje ( *${characterName}* ) ha sido votado recientemente en *${Math.floor(minutes)} minuto${minutes !== 1 ? 's' : ''} y ${seconds} segundo${seconds !== 1 ? 's' : ''}*.\n- Vuelva despues para votar por el personaje.`,
m
)
return
}

const incrementValue = Math.floor(Math.random() * 10) + 1
character.value = String(Number(character.value) + incrementValue)
character.votes = (character.votes || 0) + 1
await saveCharacters(characters)

const harem = await loadHarem()
const userEntry = harem.find(entry => entry.userId === userId && entry.characterId === character.id)

if (!userEntry) {
harem.push({
userId: userId,
characterId: character.id,
lastVoteTime: Date.now(),
voteCooldown: Date.now() + cooldownTime
})
} else {
userEntry.lastVoteTime = Date.now()
userEntry.voteCooldown = Date.now() + cooldownTime
}
await saveHarem(harem)

cooldowns.set(userId, Date.now())
characterVotes.set(character.name, Date.now() + cooldownTime)

await conn.reply(m.chat, 
`〆  P E R S O N A J E S  :  V O T E\n` +
`\t𝇈 📍 \`\`\`Has votado por el personaje correctamente.\`\`\`\n\n` +
`\t\t＃ *Valor anterior :* ${Number(character.value) - incrementValue} ${currency2}\n` +
`\t\t＃ *Ingremento :* +${incrementValue} mas.\n` +
`\t\t＃ *Nuevo valor :* ${character.value} ${currency2}\n` +
`\t\t＃ *Votos :* ${character.votes} en total.\n\n\n` +
`> ${textbot}`,
m
)
} catch (e) {
await conn.reply(m.chat, 
`📍 ${e.message}`,
m
)
}
}

handler.help = ['vote']
handler.tags = ['gacha']
handler.command = ['rvote', 'rvotar']
handler.group = true

export default handler
