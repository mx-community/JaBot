export async function before(m, { conn, isAdmin, isBotAdmin, isROwner }) {
if (m.isBaileys && m.fromMe) return !0
if (m.isGroup) return !1
if (!m.message) return !0
if (m.sender === conn.user?.jid) return
if (m.text.includes('PIEDRA') || m.text.includes('PAPEL') || m.text.includes('TIJERA') || m.text.includes('code') || m.text.includes('qr')) return !0
const chat = global.db.data.chats[m.chat]
const bot = global.db.data.settings[conn.user.jid] || {}
let mensajito = `📍  Hola usuario @${m.sender.split('@')[0]}, lo siento, pero no puedes usar el bot en chat privado.

🔐  Por ende, seras bloqueado por romper una regla ya establecida en este bot.
- Pero de igual modo, puedes unirte a los grupos disponibles para usar el bot.


• ✎ *MX COMMUNITY*
- https://chat.whatsapp.com/H1SzR4nk4qLHeI9cxwMBsW?mode=wwt


• ✎ *GENERAL : MX*
- https://chat.whatsapp.com/FsjVnRm3ZpJIYZOkuyTftF?mode=wwt


• ✎ *ASISTENCIA : MX*
- https://chat.whatsapp.com/GTuLNKByF0s9Z1ByZyGQTM?mode=wwt`
if (m.chat === '120363402356085997@newsletter') return !0
if (bot.antiPrivate && !isROwner) {
await conn.sendMessage(m.chat, { text: mensajito, mentions: await conn.parseMention(mensajito) }, { quoted: m })
await this.updateBlockStatus(m.chat, 'block')
}
return !1
}