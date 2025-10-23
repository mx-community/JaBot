import axios from 'axios'

const handler = async (m, { conn, text }) => {
  if (!text) return m.reply('🎧 Ingresa el nombre o artista que quieres buscar en SoundCloud.')

  try {
    await m.react('⏳')


    const search = await axios.get('https://delirius-apiofc.vercel.app/search/soundcloud', {
      params: { q: text, limit: 1 }
    })
    const song = search.data?.data?.[0]
    if (!song) return m.reply('❌ No encontré resultados en SoundCloud.')

    const dl = await axios.get('https://api.siputzx.my.id/api/d/soundcloud', {
      params: { url: song.link }
    })
    if (!dl.data?.status) return m.reply('⚠️ No se pudo descargar el audio.')

    const audio = dl.data.data

    const info = `🎶 *${audio.title || 'Desconocido'}*
👤 ${audio.user || 'Desconocido'}
⏱️ ${msToTime(audio.duration) || 'Desconocido'}
🔗 ${song.link || 'N/A'}`

    await conn.sendMessage(m.chat, { text: info }, { quoted: m })

    await conn.sendMessage(
      m.chat,
      {
        audio: { url: audio.url },
        fileName: `${audio.title || 'soundcloud'}.mp3`,
        mimetype: 'audio/mpeg'
      },
      { quoted: m }
    )

    await m.react('✔️')
  } catch (e) {
    console.error(e)
    await m.reply('Error al procesar la solicitud.')
  }
}

function msToTime(ms) {
  const s = Math.floor((ms / 1000) % 60)
  const m = Math.floor((ms / (1000 * 60)) % 60)
  return `${m}:${s.toString().padStart(2, '0')}`
}

handler.command = ['sound', 'soundcloud']
handler.help = ['soundcloud <nombre o artista>']
handler.tags = ['download']
handler.limit = 2

export default handler