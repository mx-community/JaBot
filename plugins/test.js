import fetch from "node-fetch"

const handler = async (m, { conn, text }) => {
  try {
    // Imagen del producto
    const thumbnail = await (await fetch("https://files.catbox.moe/ipahdi.jpg")).buffer()

    // Objeto tipo catálogo (productMessage)
    const fkontak = {
      key: {
        fromMe: false,
        participant: "0@s.whatsapp.net",
        remoteJid: "status@broadcast"
      },
      message: {
        productMessage: {
          product: {
            productImage: {
              mimetype: "image/jpeg",
              jpegThumbnail: thumbnail
            },
            title: "💾 𝐃𝐄𝐒𝐂𝐀𝐑𝐆𝐀 𝐂𝐎𝐌𝐏𝐋𝐄𝐓𝐀 ⚡",
            description: "",
            currencyCode: "USD",
            priceAmount1000: 100000,
            retailerId: "descarga-premium"
          },
          businessOwnerJid: "51919199620@s.whatsapp.net"
        }
      }
    }

    // Enviar el mensaje con quote tipo producto
    await conn.sendMessage(
      m.chat,
      {
        text: text || "✅ *Descarga completa disponible.*\nGracias por usar *Rin Itoshi System* ⚡"
      },
      { quoted: fkontak }
    )

  } catch (e) {
    console.error(e)
    m.reply("❌ Error al enviar el mensaje tipo fkontak.")
  }
}

handler.help = ["fkontakdescarga"]
handler.tags = ["tools"]
handler.command = ["fkontakdescarga", "testfkontakdescarga"]

export default handler