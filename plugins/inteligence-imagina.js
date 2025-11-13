import fetch from 'node-fetch';
var handler = async (m, { text, usedPrefix, command }) => {
if (!text) return conn.sendMessage(m.chat, { text: `Ingrese el comando y escriba un texto para generar una imagen.\n\n• Por ejemplo:\n*#${command}* Un gato.` }, { quoted: m });
try {
await m.react('⏳');
conn.sendPresenceUpdate('composing', m.chat);
var apii = await fetch(`https://api.agungny.my.id/api/text2img?prompt=${encodeURIComponent(text)}`);
var res = await apii.arrayBuffer();
//await conn.reply(m.chat, 'Aquí está tu imagen:', m, rcanal);
await conn.sendMessage(m.chat, { image: { url: Buffer.from(res) }, caption: "✓  Aqui tiene su imagen." }, { quoted: m });
//conn.sendFile(m.chat, Buffer.from(res), 'image.png', '', m, rcanal);
await m.react('✅️');
} catch (error) {
console.error(error);
return await conn.sendMessage(m.chat, { text: `*[ 📍 ]*  ERROR_COMMAND = ${e}` }, { quoted: m })
}
}

handler.command = ['imagina'];
handler.help = ['imagina  <text>'];
handler.tags = ['inteligencia'];
export default handler;
