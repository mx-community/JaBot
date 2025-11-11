var handler = async (m, { conn }) => {
try {
let res = await conn.groupRevokeInvite(m.chat)
let gruf = m.chat
let url = 'https://chat.whatsapp.com/' + await conn.groupInviteCode(gruf)
await conn.sendMessage(m.chat, { text: `📌  *Nuevo enlace:* ${url}` }, { quoted: m })
} catch (e) {
await conn.sendMessage(m.chat, { text: `*[ 📍 ]*  ERROR_COMMAND = Command error, try again and if the error persists, report the command.` }, { quoted: m })
 }
}

handler.help = ['revoke']
handler.tags = ['group']
handler.command = ['revoke', 'restablecer']
handler.group = true
handler.admin = true
handler.botAdmin = true

export default handler