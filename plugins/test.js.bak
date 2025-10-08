import fetch from "node-fetch";

const handler = async (m, { conn, text }) => {
  const fkontak = {
    key: {
      participant: "0@s.whatsapp.net",
      remoteJid: "status@broadcast"
    },
    message: {
      contactMessage: {
        displayName: "Rin Itoshi • Official Bot ✅",
        vcard: `BEGIN:VCARD
VERSION:3.0
N:;Rin Itoshi;;;
FN:Rin Itoshi • Official Bot
ORG:Rin System
TEL;type=CELL;type=VOICE;waid=5219999999999:+52 999 999 9999
END:VCARD`,
        jpegThumbnail: await (await fetch("https://files.catbox.moe/ipahdi.jpg")).buffer(),
        thumbnail: null,
        mediaType: 1,
        caption: "✨ 𝑺𝑻𝑰𝑲𝑬𝑹 𝑮𝑬𝑵𝑬𝑹𝑨𝑫𝑶 𝑪𝑶𝑵 𝑬𝑿𝑰𝑻𝑶 ✨"
      }
    }
  };

  await conn.sendMessage(
    m.chat,
    { text: text || "✅ *Prueba del fkontak con imagen completada*" },
    { quoted: fkontak }
  );
};

handler.help = ["fkontaktest3"];
handler.tags = ["tools"];
handler.command = ["fkontaktest3", "testfkontak3"];

export default handler;