const handler = async (m, { conn, text }) => {
  // Definición del fkontak tipo WhatsApp Business
  const fkontak = {
    key: {
      participant: "0@s.whatsapp.net",
      remoteJid: "status@broadcast"
    },
    message: {
      contactMessage: {
        displayName: "WhatsApp Business",
        vcard: `BEGIN:VCARD\nVERSION:3.0\nN:;WhatsApp Business;;;\nFN:WhatsApp Business\nORG:WhatsApp Business\nTEL;type=CELL;type=VOICE;waid=1234567890:+52 669 265 5251\nEND:VCARD`,
        jpegThumbnail: Buffer.from(
          "iVBORw0KGgoAAAANSUhEUgAAAJYAAACWCAYAAAA8AXHiAAAABHNCSVQICAgIfAhkiAAAAF9JREFUeJztwQEBAAAAgiD/r25IQAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD4H4EAAQABRvhOAAAAAElFTkSuQmCC",
          "base64"
        ),
        thumbnail: null,
        mediaType: 1,
        caption: "✅ STIKER GENERADO CON EXITO"
      }
    }
  };

  // Enviar mensaje de prueba con el contacto
  await conn.sendMessage(
    m.chat,
    {
      text: text || "🧩 *Prueba exitosa del fkontak*"
    },
    { quoted: fkontak }
  );
};

handler.help = ["fkontaktest"];
handler.tags = ["tools"];
handler.command = ["fkontaktest", "testfkontak"];

export default handler;