import yts from 'yt-search'
import fetch from 'node-fetch'
import { generateWAMessageFromContent, proto } from '@whiskeysockets/baileys'

let handler = async (m, { conn, text, usedPrefix, command }) => {
  if (!text) return m.reply('🍓 *Por favor ingresa el nombre de la canción que deseas buscar.*')

  await m.react('🕓')

  try {
    const search = await yts(text)
    if (!search.all || search.all.length === 0) throw '❌ No se encontraron resultados para tu búsqueda.'

    const videoInfo = search.all[0]

    const caption = `╭━━━〔 ✦ ʀɪɴ ɪᴛᴏꜱʜɪ ✦ 〕━━⬣
┃ 🍓 *Título:* ${videoInfo.title}
┃ 📺 *Canal:* ${videoInfo.author.name || 'Desconocido'}
┃ 👁️ *Vistas:* ${videoInfo.views}
┃ ⏳ *Duración:* ${videoInfo.timestamp}
┃ 📅 *Publicado:* ${videoInfo.ago}
┃ 🔗 *Link:* ${videoInfo.url}
╰━━━━━━━━━━━━━━━━━━⬣`

    const msg = generateWAMessageFromContent(m.chat, {
      viewOnceMessage: {
        message: {
          messageContextInfo: {
            deviceListMetadata: {},
            deviceListMetadataVersion: 2,
          },
          interactiveMessage: proto.Message.InteractiveMessage.create({
            body: proto.Message.InteractiveMessage.Body.create({
              text: caption,
            }),
            footer: proto.Message.InteractiveMessage.Footer.create({
              text: '✦ ʀɪɴ ɪᴛᴏꜱʜɪ | ᴘʟᴀʏᴇʀ',
            }),
            header: proto.Message.InteractiveMessage.Header.create({
              title: `🎧 ᯓᡣ𐭩 ᴘʟᴀʏ ʀɪɴ`,
              subtitle: 'YouTube Search',
              hasMediaAttachment: true,
              imageMessage: await conn
                .prepareMessageMedia(
                  { image: { url: videoInfo.thumbnail } },
                  { upload: conn.waUploadToServer }
                )
                .then(v => v.imageMessage),
            }),
            nativeFlowMessage: proto.Message.InteractiveMessage.NativeFlowMessage.create({
              buttons: [
                {
                  name: 'cta_url',
                  buttonParamsJson: JSON.stringify({
                    display_text: '🩷 Descargar Audio',
                    url: `${usedPrefix}yta_2 ${videoInfo.url}`,
                    merchant_url: `${videoInfo.url}`,
                  }),
                },
                {
                  name: 'cta_url',
                  buttonParamsJson: JSON.stringify({
                    display_text: '💜 Descargar Video',
                    url: `${usedPrefix}ytv_2 ${videoInfo.url}`,
                    merchant_url: `${videoInfo.url}`,
                  }),
                },
              ],
            }),
          }),
        },
      },
    }, { quoted: m })

    await conn.relayMessage(m.chat, msg.message, { messageId: msg.key.id })
    await m.react('✅')
  } catch (e) {
    console.error(e)
    await m.react('❌')
    return m.reply('⚠️ *Ocurrió un error al procesar la búsqueda.*')
  }
}

handler.command = ['play1']
handler.help = ['play1']
handler.tags = ['descargas']
handler.register = true
export default handler