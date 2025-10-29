import pkg from '@whiskeysockets/baileys'
const { proto } = pkg

var handler = async (m, { conn }) => {
  try {
    let group = m.chat
    let metadata = await conn.groupMetadata(group)
    const pp = await conn.profilePictureUrl(group, 'image').catch(_ => 'https://files.catbox.moe/xr2m6u.jpg')
    let invite = 'https://chat.whatsapp.com/' + await conn.groupInviteCode(group)

    let info = `
*⌁☍꒷₊˚ Información del Grupo ꒷₊˚⌁*

*📛 Nombre:* ${metadata.subject}
*🧩 ID:* ${metadata.id}
*👑 Creado por:* ${metadata.owner ? '@' + metadata.owner.split('@')[0] : 'No disponible'}
*👥 Miembros:* ${metadata.participants.length}
${metadata.desc ? `\n*📝 Descripción:*\n${metadata.desc}\n` : ''}

> *🔗 Link del grupo:*
> ${invite}
    `.trim()

    const msg = {
      messageContextInfo: {
        deviceListMetadata: {},
        deviceListMetadataVersion: 2
      },
      interactiveMessage: proto.Message.InteractiveMessage.create({
        body: proto.Message.InteractiveMessage.Body.fromObject({
          text: info
        }),
        footer: proto.Message.InteractiveMessage.Footer.fromObject({
          text: textbot
        }),
        header: proto.Message.InteractiveMessage.Header.fromObject({
          title: "🌐 Link del Grupo",
          subtitle: "",
          hasMediaAttachment: true
        }),
        nativeFlowMessage: proto.Message.InteractiveMessage.NativeFlowMessage.fromObject({
          buttons: [
            {
              name: 'cta_copy',
              buttonParamsJson: JSON.stringify({
                display_text: "📋 Copiar Link",
                id: "copy_group_link",
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

    await conn.sendMessage(m.chat, {
      image: { url: pp },
      ...msg,
      mentions: metadata.owner ? [metadata.owner] : []
    })

  } catch (e) {
    console.error(e)
    m.reply('Error al obtener la información del grupo.')
  }
}

handler.help = ['link']
handler.tags = ['group']
handler.command = ['link', 'enlace']
handler.group = true
handler.botAdmin = true

export default handler