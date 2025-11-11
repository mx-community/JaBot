let handler = async (m, { conn, command }) => {
if (!m.quoted) {
return conn.sendMessage(m.chat, { text: `Ingrese el comando y responda a un mensaje para eliminarlo.` }, { quoted: m })
}
try {
let participant = m.message.extendedTextMessage.contextInfo.participant
let stanzaId = m.message.extendedTextMessage.contextInfo.stanzaId
return conn.sendMessage(m.chat, {
delete: { remoteJid: m.chat, fromMe: false, id: stanzaId, participant: participant }})
} catch {
return conn.sendMessage(m.chat, { delete: m.quoted.key })
}}

handler.help = ['delete']
handler.tags = ['group']
handler.command = ['del', 'delete']
handler.group = true
handler.admin = true
handler.botAdmin = true

export default handler