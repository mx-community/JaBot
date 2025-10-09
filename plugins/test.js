import pkg from '@whiskeysockets/baileys'
const { proto, generateWAMessageFromContent } = pkg

let handler = async (m, { conn, usedPrefix }) => {
  const img = "https://files.catbox.moe/fft2hr.jpg"

  const texto = `
╭━⊰ 🌸 𝗔𝗰𝗰𝗲𝘀𝗼 𝗗𝗲𝗻𝗲𝗴𝗮𝗱𝗼 ⊱━╮
> 🦋 𝗛𝗼𝗹𝗮, 𝗽𝗮𝗿𝗮 𝘂𝘀𝗮𝗿 𝗲𝘀𝘁𝗲 𝗰𝗼𝗺𝗮𝗻𝗱𝗼 𝗱𝗲𝗯𝗲𝘀 𝗲𝘀𝘁𝗮𝗿 𝗿𝗲𝗴𝗶𝘀𝘁𝗿𝗮𝗱𝗼.

✨ 𝗨𝘀𝗮: *${usedPrefix}reg* 𝗽𝗮𝗿𝗮 𝗿𝗲𝗴𝗶𝘀𝘁𝗿𝗮𝗿𝘁𝗲
╰━━━━━━━━━━⬣
`

  const mediaMsg = await conn.prepareMessageMedia({ image: { url: img } }, { upload: conn.waUploadToServer })

  const msg = generateWAMessageFromContent(m.chat, {
    viewOnceMessage: {
      message: {
        interactiveMessage: proto.Message.InteractiveMessage.create({
          body: proto.Message.InteractiveMessage.Body.create({ text: texto }),
          footer: proto.Message.InteractiveMessage.Footer.create({ text: "...:." }),
          header: proto.Message.InteractiveMessage.Header.create({
            title: "Denegado — Regístrate",
            subtitle: "USD 0.00",
            hasMediaAttachment: true,
            imageMessage: mediaMsg.imageMessage
          }),
          nativeFlowMessage: proto.Message.InteractiveMessage.NativeFlowMessage.create({
            buttons: [
              {
                name: "quick_reply",
                buttonParamsJson: JSON.stringify({
                  display_text: "🪄 REGISTRARME",
                  id: `${usedPrefix}reg`
                })
              }
            ]
          })
        })
      }
    }
  }, { userJid: m.chat, quoted: m })

  await conn.relayMessage(m.chat, msg.message, { messageId: msg.key.id })
}

handler.help = ["denegado"]
handler.tags = ["info"]
handler.command = ["denegado"]

export default handler