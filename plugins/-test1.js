import fetch from 'node-fetch'
let handler = async (m, { conn, text, args, usedPrefix, command }) => {
let respuestas = `*\`RESPUESTA DEL REPORTE\`*
> 📍  La comunidad ha respondido tu reporte, esperamos y nuestro comentario te sea util.
⊹┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄⊹`

if (command === "support" || command === "soporte") {
if (!text) return conn.sendMessage(m.chat, { text: `Ingrese el comando y escriba el reporte o causa para enviarlo a los desarrolladores de la comunidad.\n\n• *Por ejemplo:*\n${usedPrefix + command} Hola, el comando #menu esta fallando continuamente, esperamos y sea arreglado lo antes posible.` }, { quoted: m });
const thumb1 = Buffer.from(await (await fetch(`https://qu.ax/FUOZP.jpg`)).arrayBuffer())
let teks = `📍  Nuevo reporte enviado de parte de un usuario.

• *Numero:* wa.me/${m.sender.split`@`[0]}
• *Mensaje:* ${text}

- Puede usar el comando *#rep-res* seguido del numero de usuario para enviarle una respuesta.`
conn.sendMessage('5493873655135@s.whatsapp.net', { text: teks, mentions: [m.sender], contextInfo: { externalAdReply: { 
title: "S O P O R T E", 
body: botname, 
thumbnail: thumb1, 
sourceUrl: null, 
mediaType: 1, renderLargerThumbnail: false }}}, { quoted: m })

//conn.reply('5493873655135@s.whatsapp.net', m.quoted ? teks + m.quoted.text : teks, null, { contextInfo: { mentionedJid: [m.sender] }})
await conn.sendMessage(m.chat, { text: `✓  Se ha enviado tu reporte a los de desarrolladores de esta comunidad.\n- Tendras respuesta cuanto antes, de ser una broma o otro intento, se te ignorara.` }, { quoted: m })
} 



if (command === "supres" || command === "res-port") {
const thumb2 = Buffer.from(await (await fetch(`${global.mMages}`)).arrayBuffer())
if (!text) return conn.sendMessage(m.chat, { text: `Ingrese el comando mas el numero y el texto para enviarle un mensaje de respuesta al usuario.\n\n• *Por ejemplo:*\n${usedPrefix + command} 5493873579805, Hola, nos encargaremos de eso.` }, { quoted: m })
await m.react("⏳")
try {
let text = args.join(" ").split(",")
//let [numero, mensaje] = text.split('|')
let numero = text[0].trim()
let mensaje = text[1] ? text[1].trim() : ''
if (!numero) return conn.sendMessage(m.chat, { text: `Debe de ingresar el numero completo todo junto sin el simbolo internacional (+).\n\n• *Por ejemplo:*\n${usedPrefix + command} 5493873579805, Hola` }, { quoted: m })
if (text.includes('+')) return await conn.sendMessage(m.chat, { text: `Debe de ingresar el numero sin el simbolo internacion (+) para continuar.\n\n• *Por ejemplo:*\n${usedPrefix + command} 5493873555555, Hola` }, { quoted: m })
if (!mensaje) return conn.sendMessage(m.chat, { text: `Debe de ingresar un texto para enviarle al usuario.\n\n• *Por ejemplo:*\n${usedPrefix + command} 5493873579805 Hola` }, { quoted: m })
await conn.sendMessage(numero+'@s.whatsapp.net', { text: `${respuestas}\n♨️ *Personal:*  \`\`\`@MX-ADMINISTRADOR\`\`\`\n📎 *Mensaje:*\n> ${mensaje}\n⊹┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄⊹\n\n- *_Si tienes mas preguntas, puedes enviar otro reporte usando el mismo comando._*`, mentions: [m.sender], contextInfo: { externalAdReply: { 
title: "々 S U P P O R T 々", 
body: botname, 
thumbnail: thumb2, 
sourceUrl: null, 
mediaType: 1, renderLargerThumbnail: false }}}, { quoted: m })

//conn.sendMessage(numero+'@s.whatsapp.net', { text: `${respuestas}\n♨️ *Personal:*  \`\`\`@MX-ADMINISTRADOR\`\`\`\n📎 *Mensaje:*\n> ${mensaje}\n⊹┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄⊹\n\n- *_Si tienes mas preguntas, puedes enviar otro reporte usando el mismo comando._*`, contextInfo: { externalAdReply: { title: '📍 Respuesta de sugerencia.', body: 'La comunidad te ha enviado la respuesta a tu sugerencia.', thumbnailUrl: '', sourceUrl: null, mediaType: 1, showAdAttribution: false, renderLargerThumbnail: false }}}, m)
//await conn.reply(m.chat, `Enviado con éxito`, m)
conn.sendMessage(m.chat, { text: `✓  Se ha enviado tu respuesta al reporte con el usuario, esperamos y pueda leer la respuesta.` }, { quoted: m })
} catch (e) {
await conn.sendMessage(m.chat, { text: `*[ 📍 ]*  ERROR_COMMAND = ${e}` }, { quoted: m })
    }
  }
}
handler.command = ["support", "soporte", "supres", "res-port"]
export default handler

                       
