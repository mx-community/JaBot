import db from '../lib/database.js'

const handler = async (m, { conn, text, command, usedPrefix }) => {
try {
const pp = await conn.profilePictureUrl(m.chat, 'image').catch(() => `${global.mMages}`)
let mentionedJid = await m.mentionedJid
let who = mentionedJid && mentionedJid.length ? mentionedJid[0] : m.quoted && await m.quoted.sender ? await m.quoted.sender : null
const user = global.db.data.users[m.sender]
const usuario = conn.user.jid.split`@`[0] + '@s.whatsapp.net'
const groupInfo = await conn.groupMetadata(m.chat)
const ownerGroup = groupInfo.owner || m.chat.split`-`[0] + '@s.whatsapp.net'
const ownerBot = global.owner[0][0] + '@s.whatsapp.net'
switch (command) {
case 'warn': case 'addwarn': {
if (!who || typeof who !== 'string' || !who.includes('@')) {
return conn.sendMessage(m.chat, { text: `Ingrese el comando y mencione a un participante para darle una advertencia.` }, { quoted: m })
}
const msgtext = text?.trim() || ''
const partes = msgtext.split(/\s+/)
const tieneMencion = partes.some(part => part.startsWith('@'))
const motivo = tieneMencion ? partes.filter(part => !part.startsWith('@')).join(' ').trim() || 'Sin especificar' : msgtext || 'Sin especificar'
if (who === conn.user.jid) return conn.sendMessage(m.chat, { text: `📍  No puedes usar este comando contra el bot.` }, { quoted: m })
if (who === ownerGroup) return conn.sendMessage(m.chat, { text: `📍  No puedes usar el comando con el propietario del grupo.` }, { quoted: m })
if (who === ownerBot) return conn.sendMessage(m.chat, { text: `📍  No puedes usar el comando con el propietario del bot.` }, { quoted: m })
user.warn = (user.warn || 0) + 1
await conn.sendMessage(m.chat, { text: `✓  Se ha dado una advertencia al usuario @${who.split`@`[0]}.\n\n• *Motivo:* ${motivo}\n• Advertencias:* ${user.warn} de 5\n\n📍  Si tiene el limite de 5 advertencias, sera eliminado del grupo.`, mentions: [who] }, { quoted: m })
if (user.warn >= 5) {
user.warn = 0
await conn.sendMessage(m.chat, { text: `✓  Se ha eliminado el usuario, alcanzo el limite de 5 advertencias.` }, { quoted: m })
await conn.groupParticipantsUpdate(m.chat, [who], 'remove')
}
break
}
case 'delwarn': case 'unwarn': {
if (!who) return conn.sendMessage(m.chat, { text: `Ingrese el comando y mencione a un usuario advertido para quitarle una advertencia.` }, { quoted: m })
if (mentionedJid.includes(conn.user.jid)) return
if (user.warn === 0) return conn.sendMessage(m.chat, { text: `📍  El usuario que has mencionado no tiene ninguna advertencia.` }, { quoted: m })
user.warn -= 1
await conn.sendMessage(m.chat, { text: `✓  Se ha quitado una advertencia de ${user.warn === 1 ? `@${who.split`@`[0]}` : `@${who.split`@`[0]}`} con exito. Ahora tiene ${user.warn} advertencia.`, mentions: [who] }, { quoted: m })
break
}}} catch (error) {
await conn.sendMessage(m.chat, { text: `*[ 📍 ]*  ERROR_COMMAND = Command error, try again and if the error persists, report the command.` }, { quoted: m })
}}

handler.help = ['advertencia', 'warn', 'addwarn', 'delwarn', 'unwarn', 'listadv', 'advlist']
handler.tags = ['group']
handler.command = ['warn', 'addwarn', 'delwarn', 'unwarn']
handler.group = true
handler.admin = true
handler.botAdmin = true

export default handler