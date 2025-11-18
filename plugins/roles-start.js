import { promises as fs } from 'fs'

const charactersFilePath = './src/database/personajes.json'
const cooldowns = {}
const COOLDOWN_TIME = 15 * 1000

async function loadCharacters() {
  try {
    const data = await fs.readFile(charactersFilePath, 'utf-8')
    return JSON.parse(data)
  } catch (error) {
    throw new Error('📍  No se pudo cargar el archivo characters.json.')
  }
}

async function saveCharacters(characters) {
  try {
    await fs.writeFile(charactersFilePath, JSON.stringify(characters, null, 2), 'utf-8')
  } catch (error) {
    console.error('📍  Error al guardar characters.json:', error)
  }
}

let handler = async (m, { conn }) => {
  const userId = m.sender
  const now = Date.now()

  await conn.sendMessage(m.chat, { react: { text: '⏳', key: m.key } })

  if (cooldowns[userId] && now < cooldowns[userId]) {
    const remainingTime = Math.ceil((cooldowns[userId] - now) / 1000)
    const minutes = Math.floor(remainingTime / 60)
    const seconds = remainingTime % 60
    await conn.reply(
      m.chat,
      `📍  Debes esperar *${minutes} minutos y ${seconds} segundos* para volver a usar el comando.`,
      m
    )
    return
  }

  try {
    const characters = await loadCharacters()

    let randomCharacter = null
    let attempts = 0
    while (!randomCharacter && attempts < 10) {
      const candidate = characters[Math.floor(Math.random() * characters.length)]
      if (candidate.img && candidate.img.length > 0) randomCharacter = candidate
      attempts++
    }

    if (!randomCharacter)
      throw new Error('📍 No se encontró un personaje con imagen disponible.')

    const randomImage =
      randomCharacter.img[Math.floor(Math.random() * randomCharacter.img.length)]

    const isClaimed =
      randomCharacter.user && randomCharacter.user.trim() !== ''

    // USANDO LA MISMA MENCION QUE EL MENÚ
    const statusMessage = isClaimed
      ? `📍  Personaje ya reclamado por @${randomCharacter.user.split('@')[0]}`
      : '✅  Personaje libre para reclamar. ( *#c* )'

    // Mensaje principal
    const message = `·─┄ · ✦ *Personajes : Colección* ✦ ·
> ${statusMessage}

 🜲 *Nombre:* ${randomCharacter.name}
 ⛁ *Valor :* ${randomCharacter.value}
 ✦ *Tipo :* ${randomCharacter.source} / ${randomCharacter.gender}
 💾 ID: *${randomCharacter.id}*
`

    // Menciones para que funcione el tag - IGUAL QUE EN EL MENÚ
    const mentions = isClaimed ? [randomCharacter.user] : []

    await conn.sendFile(m.chat, randomImage, `${randomCharacter.name}.jpg`, message, m, {
      mentions,
      contextInfo: { 
        mentionedJid: mentions,
        // Opcional: agregar el mismo formato de newsletter si quieres
        isForwarded: true,
        forwardedNewsletterMessageInfo: {
          newsletterJid: 'status@broadcast', 
          serverMessageId: 100, 
          newsletterName: 'TORU' 
        }
      }
    })

    // Reacción de éxito
    await conn.sendMessage(m.chat, { react: { text: '✅', key: m.key } })

    // Actualizar cooldown
    cooldowns[userId] = now + COOLDOWN_TIME
  } catch (error) {
    await conn.reply(
      m.chat,
      `📍 ${error.message}`,
      m
    )
    await conn.sendMessage(m.chat, { react: { text: '❎', key: m.key } })
  }
}

handler.help = ['ver', 'rw', 'rollwaifu']
handler.tags = ['gacha']
handler.command = ['trw', 'rollwaifut']
handler.group = true

export default handler