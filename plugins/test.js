import yts from 'yt-search'
import fetch from 'node-fetch'
import { generateWAMessageFromContent, proto } from '@whiskeysockets/baileys'

let handler = async (m, { conn, text, usedPrefix, command }) => {
  if (!text) return m.reply('🍓 *Por favor ingresa el nombre de la canción que deseas buscar.*')

  await m.react('🕓')

  try {
    const search = await yts(text)
    const videos = search.all
    if (!videos || videos.length === 0) throw 'No se encontraron resultados para tu búsqueda.'

    const video = videos[0]

    const info = `
╭━━━〔 ✦ 𝗗𝗘𝗦𝗖𝗔𝗥𝗚𝗔 ✦ 〕━━⬣
🌸 *Título:* ${video.title}
🎧 *Canal:* ${video.author.name || 'Desconocido'}
⏱ *Duración:* ${video.timestamp}
👀 *Vistas:* ${video.views}
📅 *Publicado:* ${video.ago}
🔗 *Link:* ${video.url}
╰━━━━━━━━━━━━━━━━━━⬣
`

    await conn.sendMessage(
      m.chat,
      {
        image: { url: video.thumbnail },
        caption: info,
        footer: '✦ ʀɪɴ ɪᴛᴏꜱʜɪ | ᴘʟᴀʏᴇʀ',
        buttons: [
          {
          buttonId: `.yta_2 ${videoInfo.url}`,
          buttonText: {
            displayText: 'ᥲᥙძі᥆',
          },
        },
        {
          buttonId: `.ytv_2 ${videoInfo.url}`,
          buttonText: {
            displayText: '᥎іძᥱ᥆',
          },
        ],
        headerType: 4,
        viewOnce: true,
      },
      { quoted: m }
    )

    await m.react('✅')
  } catch (error) {
    console.error(error)
    await m.react('❌')
    m.reply('⚠️ *Ocurrió un error al procesar la búsqueda.*')
  }
}

handler.command = ['play1', 'yta_2', 'ytv_2']
handler.help = ['play1']
handler.tags = ['descargas']
handler.register = true
export default handler

// 🔊 DESCARGA AUDIO
global.yta_2 = async (m, { conn, args }) => {
  if (!args[0]) return m.reply('🎧 *Debes proporcionar el enlace de YouTube.*')
  await m.react('🕓')

  const url = args[0]
  let res
  try {
    res = await (await fetch(`https://api.alyachan.dev/api/youtube?url=${url}&type=mp3&apikey=Gata-Dios`)).json()
  } catch {
    try {
      res = await (await fetch(`https://delirius-apiofc.vercel.app/download/ytmp3?url=${url}`)).json()
    } catch {
      res = await (await fetch(`https://api.vreden.my.id/api/ytmp3?url=${url}`)).json()
    }
  }

  if (!res.data || !res.data.url) return m.reply('❌ *No se pudo obtener el audio.*')

  await conn.sendFile(m.chat, res.data.url, 'audio.mp3', '', m, null, { mimetype: 'audio/mpeg', asDocument: false })
  await m.react('✅')
}

// 🎥 DESCARGA VIDEO
global.ytv_2 = async (m, { conn, args }) => {
  if (!args[0]) return m.reply('🎬 *Debes proporcionar el enlace de YouTube.*')
  await m.react('🕓')

  const url = args[0]
  let res
  try {
    res = await (await fetch(`https://api.alyachan.dev/api/youtube?url=${url}&type=mp4&apikey=Gata-Dios`)).json()
  } catch {
    try {
      res = await (await fetch(`https://delirius-apiofc.vercel.app/download/ytmp4?url=${url}`)).json()
    } catch {
      res = await (await fetch(`https://api.vreden.my.id/api/ytmp4?url=${url}`)).json()
    }
  }

  if (!res.data || !res.data.url) return m.reply('❌ *No se pudo obtener el video.*')

  await conn.sendMessage(
    m.chat,
    {
      video: { url: res.data.url },
      caption: '🎬 *Tu video está listo.*',
      mimetype: 'video/mp4',
    },
    { quoted: m }
  )
  await m.react('✅')
}