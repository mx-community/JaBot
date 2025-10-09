import yts from "yt-search"
import fetch from "node-fetch"
import { generateWAMessageFromContent, proto } from "@whiskeysockets/baileys"

let handler = async (m, { conn, args, usedPrefix, command }) => {
  if (!args[0]) return m.reply("🍉 *Ingresa un título para buscar en YouTube.*")

  await m.react("🕓")

  try {
    let res = await yts(args.join(" "))
    let video = res.videos[0]
    if (!video) return m.reply("✖️ *No se encontraron resultados.*")

    let caption = `
╭━━━〔 𝐘𝐎𝐔𝐓𝐔𝐁𝐄 - 𝐏𝐋𝐀𝐘 〕━━⬣
🍧 *${video.title}*
│✧ *Canal:* ${video.author.name}
│⌛ *Duración:* ${video.duration.timestamp}
│👁️ *Vistas:* ${video.views.toLocaleString()}
│📅 *Publicado:* ${video.ago}
│🔗 *Link:* ${video.url}
╰━━━━━━━━━━━━━━⬣
    `.trim()

    const msg = generateWAMessageFromContent(
      m.chat,
      {
        viewOnceMessage: {
          message: {
            messageContextInfo: {
              deviceListMetadata: {},
              deviceListMetadataVersion: 2,
            },
            interactiveMessage: proto.Message.InteractiveMessage.create({
              header: {
                title: "🎧 𝗬𝗢𝗨𝗧𝗨𝗕𝗘 𝗣𝗟𝗔𝗬",
                subtitle: "Búsqueda completada con éxito",
                hasMediaAttachment: true,
                ...(await conn.prepareMessageMedia(
                  { image: { url: video.thumbnail } },
                  { upload: conn.waUploadToServer }
                )),
              },
              body: { text: caption },
              footer: { text: "🩵 𝙍𝙞𝙣 𝙄𝙩𝙤𝙨𝙝𝙞 | 𝘽𝙊𝙏" },
              nativeFlowMessage: proto.Message.InteractiveMessage.NativeFlowMessage.create({
                buttons: [
                  {
                    name: "quick_reply",
                    buttonParamsJson: JSON.stringify({
                      display_text: "🎧 AUDIO DOC",
                      id: `${usedPrefix}ytmp3doc ${video.url}`,
                    }),
                  },
                  {
                    name: "quick_reply",
                    buttonParamsJson: JSON.stringify({
                      display_text: "🎬 VIDEO DOC",
                      id: `${usedPrefix}ytmp4doc ${video.url}`,
                    }),
                  },
                  {
                    name: "quick_reply",
                    buttonParamsJson: JSON.stringify({
                      display_text: "🎶 AUDIO",
                      id: `${usedPrefix}yta ${video.url}`,
                    }),
                  },
                  {
                    name: "quick_reply",
                    buttonParamsJson: JSON.stringify({
                      display_text: "📹 VIDEO",
                      id: `${usedPrefix}ytmp4 ${video.url}`,
                    }),
                  },
                ],
              }),
            }),
          },
        },
      },
      { quoted: m }
    )

    await conn.relayMessage(m.chat, msg.message, { messageId: msg.key.id })
    await m.react("✅")
  } catch (err) {
    console.error(err)
    await m.react("✖️")
    m.reply("✖️ *Error al buscar el video.*")
  }
}

handler.help = ["play1"]
handler.tags = ["descargas"]
handler.command = ["play1"]
export default handler