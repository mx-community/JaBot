import fetch from 'node-fetch'

let handler = async (m, { conn }) => {
  try {
    const res = await fetch('https://nekos.best/api/v2/cosplay')
    const json = await res.json()

    if (!json.results || !json.results[0]?.url) 
      throw new Error('No se pudo obtener una imagen')

    const img = json.results[0].url

    await conn.sendMessage(m.chat, {
      image: { url: img },
      caption: '🎭 Aquí tienes un cosplay 👇'
    }, { quoted: m })

    m.react('✅')
  } catch (e) {
    console.error(e)
    m.reply('⚠️ No se pudo obtener una imagen en este momento.')
  }
}

handler.help = ['cosplay']
handler.tags = ['fun']
handler.command = ['cosplay']

export default handler