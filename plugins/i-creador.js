import fetch from 'node-fetch'
const handler = async (m, { conn, usedPrefix, command }) => {
const name = await conn.getName(m.sender)
const thumb = Buffer.from(await (await fetch(`https://qu.ax/hNADg.jpg`)).arrayBuffer())
let xd = `👋🏻  Hola usuario *${name}*.
- Para contactar con el creador, puedes usar los siguientes comandos:

1. *#internet*
2. *#main*

👍🏻  O tambien puedes entrar al enlace de abajo y en la sección de creador.

• *URL:*
> https://mx-website.vercel.app`


await conn.sendMessage(m.chat, { text: xd, mentions: conn.parseMention(xd), contextInfo: { externalAdReply: { 
title: botname, 
body: textbot, 
thumbnail: thumb, 
sourceUrl: null, 
mediaType: 1, renderLargerThumbnail: true }}}, { quoted: m })

};

handler.help = ['creador'];
handler.tags = ['info'];
handler.command = ['creador', 'creator'];
export default handler;