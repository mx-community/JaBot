import fetch from 'node-fetch';
let handler = async (m, { conn, command, text, usedPrefix }) => {
if (!text) return conn.sendMessage(m.chat, { text: `Ingrese el comando y escriba lo que quiera buscar en *Yahoo.*\n\n• *Por ejemplo:*\n${usedPrefix + command} Lol` }, { quoted: m });
await m.react('⏳');
try {
let res = await fetch(`https://delirius-apiofc.vercel.app/search/yahoo?query=${encodeURIComponent(text)}&language=en`);
let json = await res.json();
if (!json.data || json.data.length === 0) {
return conn.sendMessage(m.chat, { text: `No se han encontrado resultados.\n- Verifique si esta bien escrito y intentelo de nuevo.`}, { quoted: m });
}
let txt = '· •──• ✦ *RESULTADO* ✦ •──• ·';
for (let i = 0; i < json.data.length; i++) {
let search = json.data[i];
txt += `\n\n`;
txt += `⊸⊹ *Titulo:* ${search.title}\n`;
txt += `⊸⊹ *Descripcion:* ${search.description}\n`;
txt += `⊸⊹ *Enlace:* ${search.link}`;
}
await conn.reply(m.chat, txt, m)
 //conn.sendMessage(m.chat, { text: txt, contextInfo: { externalAdReply: { title: 'Yahoo', body: textoInfo, thumbnailUrl: mxLogo, sourceUrl: null, mediaType: 1, showAdAttribution: true, renderLargerThumbnail: true }}} , { quoted: m });
} catch (error) {
console.error(error);
await conn.sendMessage(m.chat, { text: `*[ 📍 ]*  ERROR_COMMAND = Command error, try again and if the error persists, report the command.` }, { quoted: m });
}
}
handler.command = ['yahoos'];
export default handler;
 
