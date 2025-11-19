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
await fs.writeFile(charactersFilePath, JSON.stringify(characters, null, 2), 'utf-8')
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

let handler = async (m, { conn, args, usedPrefix, command }) => {


const userId = m.sender

if (args.length < 2) {
await conn.reply(m.chat, 
`📍  Debe de ingresar el nombre del personaje y mencionar a un usuario.\n\n• Por ejemplo:\n*#${command}* Takeda Harumi @tag`,
m
)
return
}

const characterName = args.slice(0, -1).join(' ').toLowerCase().trim()
let who = m.mentionedJid[0]

if (!who) {
await conn.reply(m.chat, 
`📍  Usuario faltante, debes mencionar a un usuario para darle el personaje.\n\n• Por ejemplo:\n*#${command}* ${characterName} @tag`,
m
)
return
}

if (who === userId) {
await conn.reply(m.chat, 
`📍  No puedes regalarte el personaje a ti mismo.\n- Menciona a un usuario.\n\n• Por ejemplo:\n*#${command}* Takeda Harumi @tag`,
m
)
return
}

try {
const characters = await loadCharacters()
const character = characters.find(c => c.name.toLowerCase() === characterName && c.user === userId)

if (!character) {
let personajeNoex = `〆  P E R S O N A J E
\t𝇈 📍 \`\`\`El personaje no existe en tu #harem.\`\`\`

\t\t⚶ *Personaje :* ${characterName || args[0]}


> 📌 _El personaje no existe o no lo tienes en tu harem, use *#rw* para buscar y reclamar._`.trim()
await conn.reply(m.chat, 
personajeNoex,
m
)
return
}

character.user = who
await saveCharacters(characters)

const harem = await loadHarem()
const userEntryIndex = harem.findIndex(entry => entry.userId === who)

if (userEntryIndex !== -1) {
harem[userEntryIndex].characterId = character.id
harem[userEntryIndex].lastClaimTime = Date.now()
} else {
const userEntry = {
userId: who,
characterId: character.id,
lastClaimTime: Date.now()
}
harem.push(userEntry)
}

await saveHarem(harem)

await conn.reply(m.chat, 
`〆  G I V E  :  G A C H A\n` +
`\t𝇈 📍 \`\`\`Personaje regalado correctamente.\`\`\`\n\n` +
`\t\t⚶ *Personaje :* ${character.name}\n` +
`\t\t⚶ *Propietario :* @${userId.split('@')[0]}\n` +
`\t\t⚶ *Destinario :* @${who.split('@')[0]}\n` +
`\t\t⚶ *Valor:* ${character.value} ${currency2}\n\n\n` +
`> ${textbot}`,
m, 
{ mentions: [userId, who] }
)
} catch (error) {
await conn.reply(m.chat, 
`📍 ${error.message}`,
m
)
}
}

handler.help = ['regalar prs']
handler.tags = ['gacha']
handler.command = ['givec', 'cgive']
handler.group = true

export default handler
