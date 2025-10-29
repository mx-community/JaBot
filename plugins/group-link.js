import pkg from '@whiskeysockets/baileys'
const { proto } = pkg

var handler = async (m, { conn }) => {
  try {
    const group = m.chat
    const metadata = await conn.groupMetadata(group)
    const pp = await conn.profilePictureUrl(group, 'image').catch(_ => 'https://files.catbox.moe/xr2m6u.jpg')
    const invite = 'https://chat.whatsapp.com/' + await conn.groupInviteCode(group)

    const owner = metadata.owner ? '@' + metadata.owner.split('@')[0] : 'No disponible'
    const desc = metadata.desc ? `\n*📝 Descripción:*\n${metadata.desc}\n` : ''

    const info = `
*⌁☍꒷₊˚ Información del Grupo ꒷₊˚⌁*

*📛 Nombre:* ${metadata.subject}
*🧩 ID:* ${metadata.id}
*👑 Creado por:* ${owner}
*👥 Miembros:* ${metadata.participants.length}
${desc}

> *🔗 Link del grupo:*
> ${invite}
`.trim()

    const img = await fetch(pp).then(res => res.arrayBuffer())

    const msg = {
      interactiveMessage: proto.Message.InteractiveMessage.create({
        body: proto.Message.InteractiveMessage.Body.fromObject({
          text: info
        }),
        footer: proto.Message.InteractiveMessage.Footer.fromObject({
          text: textbot
        }),
        header: proto.Message.InteractiveMessage.Header.fromObject({
          title: "✨ Información del Grupo",
          subtitle: "🍬",
          hasMediaAttachment: true,
          jpegThumbnail: img
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

    await conn.relayMessage(m.chat, msg, {})

  } catch (e) {
    console.error(e)
    m.reply('❌ Error al obtener la información del grupo.')
  }
}

handler.help = ['link']
handler.tags = ['group']
handler.command = ['link', 'enlace']
handler.group = true
handler.botAdmin = true

export default handler