import fetch from "node-fetch";

const handler = async (m, { conn, text }) => {
  // Imagen desde tu enlace Catbox
  const thumbnail = await (await fetch("https://files.catbox.moe/ipahdi.jpg")).buffer();

  // Estructura tipo catálogo / producto
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
          description: "📦 Archivo premium listo para descargar.\n💠 Alta velocidad, sin límites ni esperas.",
          currencyCode: "USD",
          priceAmount1000: 100000, // = 100 USD (x1000)
          retailerId: "descarga-premium",
          productImageCount: 1,
          firstImageId: 1,
          salePrice: "100",
          originCountryCode: "US"
        },
        businessOwnerJid: "5219999999999@s.whatsapp.net"
      }
    }
  };

  // Envío del mensaje con quote tipo producto
  await conn.sendMessage(
    m.chat,
    {
      text: text || "✅ *Descarga completa disponible. Gracias por usar Rin Itoshi System* ⚡"
    },
    { quoted: fkontak }
  );
};

handler.help = ["fkontakdescarga"];
handler.tags = ["tools"];
handler.command = ["fkontakdescarga", "testfkontakdescarga"];

export default handler;