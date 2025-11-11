let handler = async function (m, { conn, participants, groupMetadata }) {
const participantList = groupMetadata.participants || []
const mentionedJid = await m.mentionedJid
const userId = mentionedJid.length > 0 ? mentionedJid[0] : (m.quoted ? await m.quoted.sender : m.sender)
const participant = participantList.find(participant => participant.id === userId)
if (participant) {
await conn.sendMessage(m.chat, { text: `📁  *LID:* @${userId.split('@')[0]} = CODE ${participant.lid}`, mentions: [userId] }, { quoted: m })
} else {
await conn.sendMessage(m.chat, { text: `*[ 📍 ]*  ERROR_COMMAND = Command error, try again and if the error persists, report the command.` }, { quoted: m })
}}

handler.command = ['lid', 'mylid']
handler.help = ['mylid', 'lid']
handler.tags = ['tools']

export default handler