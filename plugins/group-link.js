import pkg from '@whiskeysockets/baileys'
import fetch from 'node-fetch'
const { proto } = pkg

const handler = async (m, { conn }) => {
  try {
    // ✅ Reacciona mientras procesa
    await conn.sendMessage(m.chat, { react: { text: '⏳', key: m.key } })

    const group = m.chat
    const metadata = await conn.groupMetadata(group)

    // 🖼️ Foto del grupo
    const ppUrl = await conn.profilePictureUrl(group, 'image').catch(_ => 'https://files.catbox.moe/xr2m6u.jpg')
    const pp = await (await fetch(ppUrl)).arrayBuffer()

    // 🔗 Link de invitación
    const inviteCode = await conn.groupInviteCode(group)
    const invite = 'https://chat.whatsapp.com/' + inviteCode

    // 👑 Datos del grupo
    const owner = metadata.owner ? '@' + metadata.owner.split('@')[0] : 'No disponible'
    const desc = metadata.desc ? `\n*📝 Descripción:*\n${metadata.desc}\n` : ''

    const info = `
*⌁☍꒷₊˚ Group • Link ꒷₊˚⌁*

*📛 Nombre:* ${metadata.subject}
*🧩 ID:* ${metadata.id}
*👑 Creado por:* ${owner}
*👥 Miembros:* ${metadata.participants.length}
${desc}

> *🔗 Link del grupo:*
> ${invite}
`.trim()

    // 📦 Mensaje interactivo (ViewOnce)
    const msg = {
      viewOnceMessage: {
        message: {
          interactiveMessage: {
            body: { text: info },
            footer: { text: '🌸 Rin Itoshi' },
            header: {
              title: '✨ Información del Grupo',
              hasMediaAttachment: true,
              imageMessage: {
                jpegThumbnail: Buffer.from(pp),
                caption: metadata.subject
              }
            },
            nativeFlowMessage: {
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
            }
          }
        }
      }
    }

    // 🚀 Envía el mensaje
    await conn.relayMessage(m.chat, msg, {})

    // 💫 Reacción de confirmación
    await conn.sendMessage(m.chat, { react: { text: '✅', key: m.key } })

  } catch (e) {
    console.error(e)
    await conn.sendMessage(m.chat, { react: { text: '❌', key: m.key } })
    await m.reply('❌ *Error al obtener la información del grupo.*')
  }
}

handler.help = ['link', 'enlace']
handler.tags = ['group']
handler.command = ['link', 'enlace']
handler.group = true
handler.botAdmin = true

export default handler