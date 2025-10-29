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

    const info1 = `🌿 𝙂𝙍𝙐𝙋𝙊 - 𝙄𝙉𝙁𝙊 ✨`
    const info = `
📛 *Nombre:* ${metadata.subject}
🧩 *ID:* ${metadata.id}
👑 *Creador:* ${owner}
👥 *Miembros:* ${metadata.participants.length}
${desc}
🔗 *Link:* ${invite}
`.trim()

    const card = {
      body: proto.Message.InteractiveMessage.Body.fromObject({
        text: info1
      }),
      footer: proto.Message.InteractiveMessage.Footer.fromObject({
        text: info
      }),
      header: proto.Message.InteractiveMessage.Header.fromObject({
        title: metadata.subject,
        hasMediaAttachment: true,
        imageMessage: {
          jpegThumbnail: Buffer.from(pp)
        }
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
          },
          {
            name: 'cta_reply',
            buttonParamsJson: JSON.stringify({
              display_text: "📤 Reenviar Link",
              id: "reenviar_link",
              reply_text: `🔗 ${invite}`
            })
          }
        ]
      })
    }

    const msg = generateWAMessageFromContent(m.chat, {
      viewOnceMessage: {
        message: {
          messageContextInfo: {
            deviceListMetadata: {},
            deviceListMetadataVersion: 2
          },
          interactiveMessage: proto.Message.InteractiveMessage.fromObject({
            body: proto.Message.InteractiveMessage.Body.create({
              text: `✨ Información del grupo`
            }),
            footer: proto.Message.InteractiveMessage.Footer.create({
              text: '🌸 Rin Itoshi'
            }),
            header: proto.Message.InteractiveMessage.Header.create({
              hasMediaAttachment: false
            }),
            carouselMessage: proto.Message.InteractiveMessage.CarouselMessage.fromObject({
              cards: [card]
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
    await m.reply('❌ Error al obtener la información del grupo.')
  }
}

handler.help = ['link', 'enlace']
handler.tags = ['group']
handler.command = ['link', 'enlace']
handler.group = true
handler.botAdmin = true

export default handler