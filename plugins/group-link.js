import fetch from 'node-fetch'
import baileys from '@whiskeysockets/baileys'
const { generateWAMessageFromContent, proto } = baileys

let handler = async (m, { conn }) => {
  try {
    await m.react('🕓')

    const group = m.chat
    const metadata = await conn.groupMetadata(group)

    const ppUrl = await conn.profilePictureUrl(group, 'image').catch(_ => 'https://files.catbox.moe/xr2m6u.jpg')
    const pp = await (await fetch(ppUrl)).arrayBuffer()
    const invite = 'https://chat.whatsapp.com/' + await conn.groupInviteCode(group)
    const owner = metadata.owner ? '@' + metadata.owner.split('@')[0] : 'No disponible'
    const desc = metadata.desc ? `\n📝 *Descripción:*\n${metadata.desc}\n` : ''

    const infoText = `
*📛 Nombre:* ${metadata.subject}
*🧩 ID:* ${metadata.id}
*👑 Creado por:* ${owner}
*👥 Miembros:* ${metadata.participants.length}
${desc}
`.trim()

    // 🖼️ Estructura del mensaje tipo “interactiveMessage”
    const msg = generateWAMessageFromContent(m.chat, {
      viewOnceMessage: {
        message: {
          messageContextInfo: {
            deviceListMetadata: {},
            deviceListMetadataVersion: 2
          },
          interactiveMessage: proto.Message.InteractiveMessage.fromObject({
            header: proto.Message.InteractiveMessage.Header.fromObject({
              title: '✨ Información del Grupo',
              hasMediaAttachment: true,
              imageMessage: {
                jpegThumbnail: Buffer.from(pp)
              }
            }),
            body: proto.Message.InteractiveMessage.Body.fromObject({
              text: infoText
            }),
            footer: proto.Message.InteractiveMessage.Footer.fromObject({
              text: dev
            }),
            nativeFlowMessage: proto.Message.InteractiveMessage.NativeFlowMessage.fromObject({
              buttons: [
                {
                  name: 'cta_copy',
                  buttonParamsJson: JSON.stringify({
                    display_text: "📋 Copiar Link",
                    copy_code: invite
                  })
                },
                {
                  name: 'cta_url',
                  buttonParamsJson: JSON.stringify({
                    display_text: "🌍 Abrir Grupo",
                    url: invite
                  })
                }
              ]
            })
          })
        }
      }
    }, { quoted: m })

    await conn.relayMessage(m.chat, msg.message, { messageId: msg.key.id })
    await m.react('✅')

  } catch (e) {
    console.error(e)
    await m.react('❌')
    await m.reply('❌ *Error al obtener la información del grupo.*')
  }
}

handler.help = ['link', 'enlace']
handler.tags = ['group']
handler.command = ['link', 'enlace']
handler.group = true
handler.botAdmin = true

export default handler