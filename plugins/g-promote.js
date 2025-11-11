var handler = async (m, { conn, usedPrefix, command, text, groupMetadata, isAdmin }) => {
let mentionedJid = await m.mentionedJid
let user = mentionedJid && mentionedJid.length ? mentionedJid[0] : m.quoted && await m.quoted.sender ? await m.quoted.sender : null
if (!user) return conn.sendMessage(m.chat, { text: `Ingrese el comando y mencione o responda a un usuario para definirlo como administrador grupal.` }, { quoted: m })
try {
const groupInfo = await conn.groupMetadata(m.chat)
const ownerGroup = groupInfo.owner || m.chat.split('-')[0] + '@s.whatsapp.net'
if (user === ownerGroup || groupInfo.participants.some(p => p.id === user && p.admin))
return conn.sendMessage(m.chat, { text: `📍  El usuario mencionado ya es un administrador grupal.` }, { quoted: m })
await conn.groupParticipantsUpdate(m.chat, [user], 'promote')
await conn.sendMessage(m.chat, { text: `✓  El usuario mencionado ahora es un administrador grupal.` }, { quoted: m })
} catch (e) {
await conn.sendMessage(m.chat, { text: `*[ 📍 ]*  ERROR_COMMAND = Command error, try again and if the error persists, report the command.` }, { quoted: m })
}}

handler.help = ['promote']
handler.tags = ['group']
handler.command = ['promote', 'promover']
handler.group = true
handler.admin = true
handler.botAdmin = true

export default handler