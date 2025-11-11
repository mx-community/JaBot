import fetch from 'node-fetch'
import baileys from '@whiskeysockets/baileys'
const { generateWAMessageFromContent, proto } = baileys
let handler = async (m, { conn }) => {
try {
const group = m.chat
const metadata = await conn.groupMetadata(group)
const invite = 'https://chat.whatsapp.com/' + await conn.groupInviteCode(group)
const owner = metadata.owner ? '@' + metadata.owner.split('@')[0] : 'No disponible'
const desc = metadata.desc || "sin descripción."
const info = `⟢ ✎ *URL : GROUP*
⎔ *Nombre:* ${metadata.subject}
⎔ *ID:* ${metadata.id}
⎔ *Link:* ${invite}
`.trim()
conn.sendMessage(m.chat, { text: info }, { quoted: m })
} catch (e) {
console.error(e)
await conn.sendMessage(m.chat, { text: `*[ 📍 ]*  ERROR_COMMAND = Command error, try again and if the error persists, report the command.` }, { quoted: m })
}
}

handler.help = ['link', 'enlace']
handler.tags = ['group']
handler.command = ['link', 'enlace']
handler.group = true
handler.botAdmin = true

export default handler