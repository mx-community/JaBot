import yts from 'yt-search';
import fetch from 'node-fetch';
import pkg from '@whiskeysockets/baileys'
const {generateWAMessageFromContent, proto} = pkg

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
⊹ ✎ *Enlace:* ${url}`

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
]})})}}}, {quoted: m});

await conn.relayMessage(msg.key.remoteJid, msg.message, {messageId: msg.key.id})

}
handler.help = ['play'];
handler.tags = ['dl'];
handler.command = ['testplay'];
handler.disabled = false;

export default handler;
     
