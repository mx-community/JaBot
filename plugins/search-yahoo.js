import fetch from 'node-fetch';
let handler = async (m, { conn, command, text, usedPrefix }) => {
if (!text) return conn.sendMessage(m.chat, { text: `Ingrese el comando y escriba lo que quiera buscar en *Yahoo.*\n\n• Por ejemplo:\n*#${command}* Lol` }, { quoted: m });
await m.react('⏳');
try {
let res = await fetch(`https://delirius-apiofc.vercel.app/search/yahoo?query=${encodeURIComponent(text)}&language=en`);
let json = await res.json();
if (!json.data || json.data.length === 0) {
return conn.sendMessage(m.chat, { text: `📍  No se han encontrado resultados.\n- Verifique si esta bien escrito y intentelo de nuevo.`}, { quoted: m });
}
const thumb = Buffer.from(await (await fetch(`${global.mMages}`)).arrayBuffer())
let txt = '〆  Y A H O O  :  S E A R C H';
for (let i = 0; i < json.data.length; i++) {
let search = json.data[i];
txt += `\n\n`;
txt += `⚶ *Titulo:* ${search.title}\n`;
txt += `⚶ *Enlace:* ${search.link}\n`;
txt += `⚶ *Descripción:* ${search.description}`;
}
await await conn.sendMessage(m.chat, { text: `${}`, mentions: [m.sender], contextInfo: { externalAdReply: { 
title: "々  Y A H O O  々", 
body: botname, 
thumbnail: thumb, 
sourceUrl: null, 
mediaType: 1, renderLargerThumbnail: false }}}, { quoted: m })
//conn.sendMessage(m.chat, { text: txt, contextInfo: { externalAdReply: { title: 'Yahoo', body: textoInfo, thumbnailUrl: mxLogo, sourceUrl: null, mediaType: 1, showAdAttribution: true, renderLargerThumbnail: true }}} , { quoted: m });
} catch (error) {
console.error(error);
await conn.sendMessage(m.chat, { text: `*[ 📍 ]*  ERROR_COMMAND = ${error}` }, { quoted: m });
}
}
handler.command = ['yahoos'];
export default handler;
