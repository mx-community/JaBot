import fetch from 'node-fetch';
let handler = async(m, { conn, args, usedPrefix, command }) => {
if (!args[0]) return conn.sendMessage(m.chat, { text: `Ingrese el comando mas un enlace de cualquier pagina web para sacar su codigo HTML.\n\n• Por ejemplo:\n*#${command}* https://web_ejemplo.com` }, { quoted: m });
m.react('⏳');

let api = `https://delirius-apiofc.vercel.app/tools/htmlextract?url=${args[0]}`;
let titan = await fetch(api);
let json = await titan.json();
let data = json.html;

const thumb = Buffer.from(await (await fetch(`${global.mImagen}`)).arrayBuffer());
let infoHtml = `·─┄ · ✦ *Website : Html* ✦ ·
> Se ha extraido la pagina web con exito.

⊹ ✎ *Hecho:* HTML
⊹ ✎ *Pagina:* ${text}
${data}`
let paginaHtml = `${data}`

m.react('✅');
await conn.sendMessage(m.chat, { text: infoHtml.trim(), contextInfo: { externalAdReply: { 
title: botname, 
body: textbot, 
thumbnail: thumb, 
sourceUrl: null, 
mediaType: 1, renderLargerThumbnail: true }}}, { quoted: m });
conn.sendMessage(m.chat, { text: paginaHtml.trim() }, m);
//conn.sendMessage(m.chat, { image: { url: xd }, caption: html }, { quoted: fkontak });
};

handler.command = ['htmlweb', 'hweb'];

export default handler;
                          
