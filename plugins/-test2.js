import yts from 'yt-search';
import fetch from 'node-fetch';

let handler = async (m, { conn, command, text, args, usedPrefix }) => {
if (!text) return conn.sendMessage(m.chat, { text: `Ingrese el comando y escriba el nombre de la canción que desea buscar.\n\n• Por ejemplo:\n*${usedPrefix + command}* Comfort Chain` }, { quoted: m });
await conn.sendMessage(m.chat, { text: `Buscando resultados, espere un momento...` }, { quoted: m });
let res = await yts(text);
let vid = res.videos[0];
if (!vid) return conn.sendMessage(m.chat, { text: `📍  Debes de ingresar el nombre de la canción para buscar.\n\n• Por ejemplo:\n*${usedPrefix + command}* Comfort Chain` }, { quoted: m });

let { title, description, thumbnail, videoId, timestamp, views, ago, url } = vid;
let who = m.quoted ? m.quoted.sender : m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.fromMe ? conn.user.jid : m.sender;
let chat = global.db.data.chats[m.chat];

m.react('⏳'); 
let textoResultado = `⊹ ✎ *Titulo:* ${vid.title}
⊹ ✎ *Duración:* ${vid.timestamp}
⊹ ✎ *Vistas:* ${vid.views.toLocaleString()}
⊹ ✎ *Publicado:* ${vid.ago}
⊹ ✎ *Enlace:* ${url}`;

let msg = generateWAMessageFromContent(m.chat, { viewOnceMessage: { message: { messageContextInfo: { deviceListMetadata: {}, deviceListMetadataVersion: 2 },
interactiveMessage: proto.Message.InteractiveMessage.create({
body: proto.Message.InteractiveMessage.Body.create({ text: '' }),
footer: proto.Message.InteractiveMessage.Footer.create({ text: textoResultado }),
header: proto.Message.InteractiveMessage.Header.create({
title: '·─┄ · ✦ *Play : Search* ✦ ·', subtitle: '', hasMediaAttachment: false
}), nativeFlowMessage: proto.Message.InteractiveMessage.NativeFlowMessage.create({
buttons: [
{ name: 'quick_reply', buttonParamsJson: { display_text: "Video", id: `#video ${url}`} },
{ name: 'quick_reply', buttonParamsJson: { display_text: "Audio", id: `#audio ${url}`} }
]})})}}}, {});

}
handler.help = ['play'];
handler.tags = ['dl'];
handler.command = ['testplay'];
handler.disabled = false;

export default handler;
                                  

/*import pkg from '@whiskeysockets/baileys'
const {generateWAMessageFromContent, proto} = pkg

var handler = async (m, {conn, usedPrefix}) => {
let msg = generateWAMessageFromContent(m.chat, { viewOnceMessage: { message: { messageContextInfo: { deviceListMetadata: {}, deviceListMetadataVersion: 2 },
interactiveMessage: proto.Message.InteractiveMessage.create({
body: proto.Message.InteractiveMessage.Body.create({ text: 'Prueba 1' }),
footer: proto.Message.InteractiveMessage.Footer.create({ text: 'Prueba 2' }),
header: proto.Message.InteractiveMessage.Header.create({
title: 'Titulo 3', subtitle: 'Sub titulado.', hasMediaAttachment: false
}), nativeFlowMessage: proto.Message.InteractiveMessage.NativeFlowMessage.create({
buttons: [
{ name: 'single_select', buttonParamsJson: '{"title":"Listas ⚡","sections":[{"title":"Descargas 🎄","highlight_label":"Popular","rows":[{"header":"Play","title":"Descargador 🎬","description":"Presione para seleccionar.","id":"#play"},{"header":"header","title":"title","description":"description","id":"#tiktok"}]}]}' },
{ name: 'quick_reply', buttonParamsJson: '{"display_text":"⚡ Menu","id":"message"}' },
{ name: 'cta_url', buttonParamsJson: '{"display_text":"ENLACE 🎲","url":"https://www.google.com","merchant_url":"https://www.google.com"}' },
{ name: 'cta_call', buttonParamsJson: '{"display_text":"call","id":"message"}' },
{ name: 'cta_copy', buttonParamsJson: '{"display_text":"Copiar 🎬","id":"#ig","copy_code":"message"}' }, 
{ name: 'cta_reminder', buttonParamsJson: '{"display_text":"Seguir","id":"#play"}' },
{ name: 'cta_cancel_reminder', buttonParamsJson: '{"display_text":"No seguir","id":"#play"}' },
{ name: 'address_message', buttonParamsJson: '{"display_text":"Promocionar","id":"#menu"}' },
{ name: 'send_location', buttonParamsJson: ''}
]})})}}}, {})

await conn.relayMessage(msg.key.remoteJid, msg.message, {messageId: msg.key.id})
}
handler.command = /^(mboton)$/i

export default handler*/

