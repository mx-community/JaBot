let handler = async (m, { conn, usedPrefix, command }) => {
if (!db.data.chats[m.chat].economy && m.isGroup) {
return conn.sendMessage(m.chat, { text: `⦗ ᗢ ⦘ El comando *${usedPrefix + command}* está desactivado en este grupo.\n- Activalo si eres admin de la siguiente manera.\n\n• Por ejemplo:\n*${usedPrefix}rpg on*` }, { quoted: m })
}
let user = global.db.data.users[m.sender]
if (!user) return conn.sendMessage(m.chat, { text: `📍  No te encuentras en la base se datos.` }, { quoted: m })
if (user.health >= 100) return conn.sendMessage(m.chat, { text: `📍  Tu salud ya esta al limite, el limite de la salud es de 100.` }, { quoted: m })
if (user.coin <= 0) return conn.sendMessage(m.chat, { text: `📍  Solo tienes ${user.coin} de *${currency}*, no son suficientes para usar este comando.` }, { quoted: m })
const faltante = 100 - user.health
const disponible = Math.floor(user.coin / 50)
const curable = Math.min(faltante, disponible)
user.health += curable
user.coin -= curable * 50
user.lastHeal = Date.now()
const info = `〆  H E A L T H  :  R P G

\t\t⚶ Cura : +${curable} punto${curable !== 1 ? 's' : ''} de salud.
\t\t⚶ Gasto : -50 de *${currency}* 
\t\t⚶ ${currency} : ${user.coin.toLocaleString()} restante.
\t\t⚶ Salud : ${user.health}% actualmente.

> ${textbot}`
await conn.sendMessage(m.chat, { text: info }, { quoted: m })
}

handler.help = ['heal']
handler.tags = ['rpg']
handler.command = ['heal', 'curar']
handler.group = true

export default handler
