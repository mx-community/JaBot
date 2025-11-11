let handler = async (m, { conn, usedPrefix, command }) => {
if (!db.data.chats[m.chat].economy && m.isGroup) {
return m.reply(`《✦》Los comandos de *Economía* están desactivados en este grupo.\n\nUn *administrador* puede activarlos con el comando:\n» *${usedPrefix}economy on*`)
}
let user = global.db.data.users[m.sender]
const cooldown = 2 * 60 * 1000
user.lastwork = user.lastwork || 0
if (Date.now() < user.lastwork) {
const tiempoRestante = formatTime(user.lastwork - Date.now())
return conn.sendMessage(m.chat, { text: `📍  Debe de esperar *${tiempoRestante}* para volver a usar el comando.` }, { quoted: m })
}
user.lastwork = Date.now() + cooldown
let logro = Math.floor(Math.random() * 1501) + 2000
let logro2 = Math.floor(Math.random() * 1501) + 2000
user.coin = logro
user.exp = logro2
user.level += 1
let infoRpg = `·─┄ · ✦ *Work : Chamba* ✦ ·
- _${pickRandom(trabajo)}_

> ⩽ *Ganancias* ⩾
❒ *${currency}:* +${logro.toLocaleString()}
❒ *${currency2}:* +${logro2.toLocaleString()}
❒ *Nivel:* +1 de nivel por trabajo.`
await conn.sendMessage(m.chat, { text: infoRpg }, { quoted: m })
}

handler.help = ['trabajar']
handler.tags = ['economy']
handler.command = ['w', 'work']
handler.group = true

export default handler

function formatTime(ms) {
const totalSec = Math.ceil(ms / 1000)
const minutes = Math.floor((totalSec % 3600) / 60)
const seconds = totalSec % 60
const parts = []
if (minutes > 0) parts.push(`${minutes} minuto${minutes !== 1 ? 's' : ''}`)
parts.push(`${seconds} segundo${seconds !== 1 ? 's' : ''}`)
return parts.join(' ')
}
function pickRandom(list) {
return list[Math.floor(list.length * Math.random())]
}
const trabajo = [
"Has trabajado en una barbería y has realizado un buen corte de cabello.",
"Has trabajado en un restaurante y atendiste muy bien a los clientes.",
"Has trabajado como cocinero en un restaurante, no te fue tan mal de dia a la noche.",
"Has trabajado en una panaderia y no te fue tan mal ayudando a panadero.",
"Has trabajado en una fábrica de mercancía y lo has hecho bien.",
"Has trabajado como secretario/a en una empresa, no te fue tan de dia a la noche."
]