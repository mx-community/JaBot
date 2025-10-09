import yts from 'yt-search'
import fetch from 'node-fetch'

const handler = async (m, { conn, args, usedPrefix, command }) => {
  if (!args[0]) return conn.reply(m.chat, `🍧 *Ingresa un título para buscar en YouTube.*`, m)

  await m.react('🕓')

  try {
    let searchResults = await searchVideos(args.join(" "))
    if (!searchResults.length) throw new Error('*✖️ No se encontraron resultados.*')

    let video = searchResults[0]
    let thumbnail = await (await fetch(video.miniatura)).buffer()

    const textMsg = `
╭━━━〔 𝐘𝐎𝐔𝐓𝐔𝐁𝐄 - 𝐏𝐋𝐀𝐘 〕━━⬣
🍧 *${video.titulo}*
│✧ *Canal:* ${video.canal}
│⌛ *Duración:* ${video.duracion}
│👁️ *Vistas:* ${video.vistas}
│📅 *Publicado:* ${video.publicado}
│🔗 *Link:* ${video.url}
╰━━━━━━━━━━━━━━⬣
    `.trim()

    const buttons = [
      { index: 1, quickReplyButton: { displayText: '🎧 AUDIO DOC', id: `${usedPrefix}ytmp3doc ${video.url}` } },
      { index: 2, quickReplyButton: { displayText: '🎬 VIDEO DOC', id: `${usedPrefix}ytmp4doc ${video.url}` } },
      { index: 3, quickReplyButton: { displayText: '🎶 AUDIO', id: `${usedPrefix}yta ${video.url}` } },
      { index: 4, quickReplyButton: { displayText: '📹 VIDEO', id: `${usedPrefix}ytmp4 ${video.url}` } }
    ]

    await conn.sendMessage(m.chat, {
      image: thumbnail,
      caption: textMsg,
      footer: '🩵 𝙍𝙞𝙣 𝙄𝙩𝙤𝙨𝙝𝙞 | 𝘽𝙊𝙏',
      templateButtons: buttons,
      viewOnce: true
    }, { quoted: m })

    await m.react('✅')

  } catch (e) {
    console.error(e)
    await m.react('✖️')
    conn.reply(m.chat, '*✖️ Error: No se pudo encontrar el video.*', m)
  }
}

handler.help = ['play555']
handler.tags = ['descargas']
handler.command = ['play555']
export default handler

async function searchVideos(query) {
  try {
    const res = await yts(query)
    return res.videos.slice(0, 10).map(video => ({
      titulo: video.title,
      url: video.url,
      miniatura: video.thumbnail,
      canal: video.author.name,
      publicado: video.ago || 'No disponible',
      vistas: video.views?.toLocaleString() || 'No disponible',
      duracion: video.duration.timestamp || 'No disponible'
    }))
  } catch (error) {
    console.error('*Error en yt-search:*', error.message)
    return []
  }
}