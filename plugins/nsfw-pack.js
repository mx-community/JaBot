import fetch from 'node-fetch'

const handler = async (m, { conn }) => {
  if (!db.data.chats[m.chat].nsfw && m.isGroup) {
  return m.reply(`ꕥ El contenido *NSFW* está desactivado en este grupo.\n\nUn *administrador* puede activarlo con el comando:\n» *${usedPrefix}nsfw on*`)
  }
  try {
    const res = await fetch('https://api.waifu.pics/nsfw/waifu')
    if (!res.ok) throw new Error('No se pudo obtener el pack, intenta de nuevo...')

    const json = await res.json()
    if (!json.url) throw new Error('La API no devolvio una URL valida')

    await conn.sendFile(m.chat, json.url, 'pack.jpg', '\`😏 Aqui tienes tu pack\`', m)
  } catch (error) {
    console.error(error)
    m.reply('*Ocurrio un error al obtener el pack, intenta mas tarde.*')
  }
}

handler.command = ['pack']
handler.tags = ['nsfw']
handler.help = ['pack']
handler.premium = true

export default handler