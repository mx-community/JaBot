import fs from 'fs'
import fetch from 'node-fetch'
import { WAMessageStubType, pkg } from '@whiskeysockets/baileys'
const {generateWAMessageFromContent, proto} = pkg


async function generarBienvenida({ conn, userId, groupMetadata, chat }) {
const username = `@${userId.split('@')[0]}`
const pp = await conn.profilePictureUrl(userId, 'image').catch(() => `${global.mMages}`)
const fecha = new Date().toLocaleDateString("es-ES", { timeZone: "America/Mexico_City", day: 'numeric', month: 'long', year: 'numeric' })
const hora = fecha.toLocaleTimeString(locale, { hour: '2-digit', minute: '2-digit' })
const groupSize = groupMetadata.participants.length + 1
const desc = groupMetadata.desc?.toString() || 'Sin descripción'
const mensaje = (chat.sWelcome || 'Edita con el comando "setwelcome"')
.replace(/{usuario}/g, `${username}`)
.replace(/{grupo}/g, `${groupMetadata.subject}`)
.replace(/{desc}/g, `${desc}`)

const caption = `> 【 ✦ *¡¡BIENVENIDO!!* ✦ 】
👋🏻 ¡Hola ${username}! bienvenido/a al grupo.
- Esperamos y estes comodo en nuestra comunidad. ❤️

📍  Ahora somos *${groupSize}* en este grupo.
- Por favor, lea las reglas en la descripción del grupo.

> ⟤ *Detalles:*
• *Grupo:* ${groupMetadata.subject}
• *Hora:* ${hora}
• *Fecha:* ${fecha}`
return { pp, caption, username }
}

async function generarDespedida({ conn, userId, groupMetadata, chat }) {
const username = `@${userId.split('@')[0]}`
const pp = await conn.profilePictureUrl(userId, 'image').catch(() => 'https://raw.githubusercontent.com/The-King-Destroy/Adiciones/main/Contenido/1745522645448.jpeg')
const fecha = new Date().toLocaleDateString("es-ES", { timeZone: "America/Mexico_City", day: 'numeric', month: 'long', year: 'numeric' })
const groupSize = groupMetadata.participants.length - 1
const desc = groupMetadata.desc?.toString() || 'Sin descripción'
const mensaje = (chat.sBye || 'Edita con el comando "setbye"')
.replace(/{usuario}/g, `${username}`)
.replace(/{grupo}/g, `*${groupMetadata.subject}*`)
.replace(/{desc}/g, `*${desc}*`)

const caption = `> 【 ✦ *¡¡HASTA PRONTO!!* ✦ 】
👋🏻 ¡Adios ${username}! ha salido del grupo.
- Esperamos y le vaya bien.

> ⟤ *Detalles de salida:*
• *Usuarios:* ${groupSize}
• *Hora:* ${hora}
• *Fecha:* ${fecha}`
return { pp, caption, username }
}

let handler = m => m
handler.before = async function (m, { conn, participants, groupMetadata }) {
if (!m.messageStubType || !m.isGroup) return !0
const chat = global.db.data.chats[m.chat]
const userId = m.messageStubParameters[0]
const who = userId || '0@s.whatsapp.net'

const meta = groupMetadata
const totalMembers = meta.participants.length
const groupSubject = meta.subject
const date = new Date().toLocaleString('es-PE', { year: 'numeric', month: '2-digit', day: '2-digit', hour12: false, hour: '2-digit', minute: '2-digit' })

let thumbBuffer
try {
const res = await fetch('https://i.postimg.cc/rFfVL8Ps/image.jpg')
thumbBuffer = Buffer.from(await res.arrayBuffer())
} catch {
thumbBuffer = null
}


if (chat.welcome && m.messageStubType == WAMessageStubType.GROUP_PARTICIPANT_ADD) {
const { pp, caption, username } = await generarBienvenida({ conn, userId, groupMetadata, chat })
await conn.sendMessage(m.chat, {
text: caption,
mentions: await conn.parseMention(caption),
contextInfo: {
externalAdReply: {
title: groupMetadata.subject,
body: "✦  Esperamos y estes cómodo en este grupo.",
thumbnail: pp,
sourceUrl: null,
mediaType: 1,
renderLargerThumbnail: false
}
}
}, { quoted: fkontak })

}

if (chat.welcome && (m.messageStubType == WAMessageStubType.GROUP_PARTICIPANT_REMOVE || m.messageStubType == WAMessageStubType.GROUP_PARTICIPANT_LEAVE)) {
const { pp, caption, username } = await generarDespedida({ conn, userId, groupMetadata, chat })

await conn.sendMessage(m.chat, {
text: caption,
mentions: await conn.parseMention(caption),
contextInfo: {
externalAdReply: {
title: groupMetadata.subject,
body: "✦  Esperamos y le vays bien en la vida.",
thumbnail: pp,
sourceUrl: null,
mediaType: 1,
renderLargerThumbnail: false
}
}
}, { quoted: fkontak })
}
}

export { generarBienvenida, generarDespedida }
export default handler