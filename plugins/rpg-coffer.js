var handler = async (m, { conn, usedPrefix, command }) => {
if (!db.data.chats[m.chat].economy && m.isGroup) {
return m.reply(`《✦》Los comandos de *Economía* están desactivados en este grupo.\n\nUn *administrador* puede activarlos con el comando:\n» *${usedPrefix}economy on*`)
}
let user = global.db.data.users[m.sender]
let now = Date.now()
let gap = 86400000
user.lastcofre = user.lastcofre || 0
user.coin = user.coin || 0
user.exp = user.exp || 0
if (now < user.lastcofre) {
let wait = formatTime(Math.floor((user.lastcofre - now) / 1000))
return conn.sendMessage(m.chat, { text: `📍  Debes esperar *${wait}* para volver a abrir el cofre.` }, { quoted: m })
}
let reward = Math.floor(Math.random() * (60000 - 40000 + 1)) + 40000
let expGain = Math.floor(Math.random() * (111)) + 50
user.coin += reward
user.exp += expGain
user.level += 1
user.lastcofre = now + gap
let cofreA = `·─┄ · ✦ *Cofre : Coffer* ✦ ·

❒ *${currency}:* +${reward.toLocaleString()} conseguidos.
❒ *${currency2}:* +${expGain.toLocaleString()} conseguidos.
❒ *Nivel:* +1 conseguido.`
await conn.sendMessage(m.chat, { text: cofreA }, { quoted: m })
}

handler.help = ['cofre']
handler.tags = ['economía']
handler.command = ['coffer', 'cofre']
handler.group = true

export default handler

function formatTime(totalSec) {
const h = Math.floor(totalSec / 3600)
const m = Math.floor((totalSec % 3600) / 60)
const s = totalSec % 60
const txt = []
if (h > 0) txt.push(`${h} hora${h !== 1 ? 's' : ''}`)
if (m > 0 || h > 0) txt.push(`${m} minuto${m !== 1 ? 's' : ''}`)
txt.push(`${s} segundo${s !== 1 ? 's' : ''}`)
return txt.join(' ')
}
function pickRandom(list) {
return list[Math.floor(Math.random() * list.length)]
}
