let handler = async (m, { conn, usedPrefix, command }) => {
if (!db.data.chats[m.chat].economy && m.isGroup) {
return m.reply(`《✦》Los comandos de *Economía* están desactivados en este grupo.\n\nUn *administrador* puede activarlos con el comando:\n» *${usedPrefix}economy on*`)
}
let user = global.db.data.users[m.sender]
if (!user) return conn.sendMessage(m.chat, { text: `📍  No te encuentras en la base se datos.` }, { quoted: m })
if (user.health >= 100) return conn.sendMessage(m.chat, { text: `📍  Tu salud ya esta al limite, el limite de la salud es 100.` }, { quoted: m })
if (user.coin <= 0) return conn.sendMessage(m.chat, { text: `📍  Solo tienes ${user.coin} de *${currency}*, no son suficientes para usar este comando.` }, { quoted: m })
const faltante = 100 - user.health
const disponible = Math.floor(user.coin / 50)
const curable = Math.min(faltante, disponible)
user.health += curable
user.coin -= curable * 50
user.lastHeal = Date.now()
const info = `·─┄ · ✦ *Curación : Heal* ✦ ·

❒ *Cura:* ${curable} punto${curable !== 1 ? 's' : ''} de salud.
❒ *Gasto:* -50 de *${currency}*
❒ *${currency}:* ${user.coin.toLocaleString()} restante.
❒ *Salud:* ${user.health} actualmente.`
await conn.sendMessage(m.chat, { text: info }, { quoted: m })
}

handler.help = ['heal']
handler.tags = ['rpg']
handler.command = ['heal', 'curar']
handler.group = true

export default handler