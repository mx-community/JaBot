let handler = m => m
handler.before = async function (m, { conn, isAdmin, isBotAdmin }) {
if (!m.isGroup) return !1
let chat = global.db.data.chats[m.chat]
if (isBotAdmin && chat.fRechazo) {
const prefixes = ['6', '90', '963', '966', '967', '249', '212', '92', '93', '94', '7', '49', '2', '91', '48']
if (prefixes.some(prefix => m.sender.startsWith(prefix))) {
await conn.groupRequestParticipantsUpdate(m.chat, [m.sender], 'reject')
await conn.sendMessage(m.chat, { text: `📌  Se ha rechazado la solicitud de entrada a un usuario.\n\n\t 📍  No se permiten numeros arabes o desconocidos.` }, { quoted: m })
}}}

export default handler
