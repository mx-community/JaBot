var handler = async (m, { conn, participants, usedPrefix, command }) => {
let mentionedJid = await m.mentionedJid
let user = mentionedJid && mentionedJid.length ? mentionedJid[0] : m.quoted && await m.quoted.sender ? await m.quoted.sender : null
if (!user) return conn.sendMessage(m.chat, { text: `Ingrese el comando y mencione a un usuario para eliminarlo del grupo.\n\n• Por ejemplo:\n*#${command}* @${m.sender.split`@`[0]}`, mentions: [m.sender] }, { quoted: m })
try {
const groupInfo = await conn.groupMetadata(m.chat)
const ownerGroup = groupInfo.owner || m.chat.split`-`[0] + '@s.whatsapp.net'
const ownerBot = global.owner[0][0] + '@s.whatsapp.net'
if (user === conn.user.jid) return conn.sendMessage(m.chat, { text: `📍  No puedes usar este comando contra el bot.` }, { quoted: m });
if (user === ownerGroup) return conn.sendMessage(m.chat, { text: `📍  No puedes usar el comando con el propietario del grupo.` }, { quoted: m });
if (user === ownerBot) return conn.sendMessage(m.chat, { text: `📍  No puedes usar el comando con el propietario del bot.` }, { quoted: m });
await conn.groupParticipantsUpdate(m.chat, [user], 'remove')
conn.sendMessage(m.chat, { text: `✓  Usuario eliminado con exito.` }, { quoted: m });
} catch (e) {
await conn.sendMessage(m.chat, { text: `*[ 📍 ]*  ERROR_COMMAND = Command error, try again and if the error persists, report the command.` }, { quoted: m });
}}

handler.help = ['kick']
handler.tags = ['group']
handler.command = ['kick', 'ban']
handler.admin = true
handler.group = true
handler.botAdmin = true

export default handler