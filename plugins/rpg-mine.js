var handler = async (m, { conn, usedPrefix, command }) => {
if (!db.data.chats[m.chat].economy && m.isGroup) {
return m.reply(`《✦》Los comandos de *Economía* están desactivados en este grupo.\n\nUn *administrador* puede activarlos con el comando:\n» *${usedPrefix}economy on*`)
}
const user = global.db.data.users[m.sender]
if (!user) return
user.lastmine = user.lastmine || 0
user.coin = user.coin || 0
user.exp = user.exp || 0
user.health = user.health || 100
user.pickaxedurability = user.pickaxedurability || 100
if (user.health < 5)
return conn.sendMessage(m.chat, { text: `📍  Tu salud actual esta en ${user.health}%, debes curarte con el comando *#heal* para minar después.` }, { quoted: m })
const gap = 10 * 60 * 1000
const now = Date.now()
if (now < user.lastmine) {
const restante = user.lastmine - now
return conn.sendMessage(m.chat, { text: `📍  Debes esperar *${formatTime(restante)}* para volver a minar.` }, { quoted: m })
}
user.lastmine = now + gap
const evento = pickRandom(eventos)
let monedas, experiencia, salud
if (evento.tipo === 'victoria') {
monedas = Math.floor(Math.random() * 2001) + 7000
experiencia = Math.floor(Math.random() * 91) + 10
salud = Math.floor(Math.random() * 3) + 1
user.coin += monedas
user.exp += experiencia
user.health -= salud
} else {
monedas = Math.floor(Math.random() * 2001) + 3000
experiencia = Math.floor(Math.random() * 41) + 10
salud = Math.floor(Math.random() * 5) + 1
user.coin -= monedas
user.exp -= experiencia
user.health -= salud
if (user.coin < 0) user.coin = 0
if (user.exp < 0) user.exp = 0
}
if (user.health < 0) user.health = 0
const mensaje = `·─┄ · ✦ *Mineria : Miming* ✦ ·
- _${evento.mensaje}_ 

❒ *${currency}:* ${monedas.toLocaleString()} conseguidos.
❒ *${currency2}:* ${experiencia.toLocaleString()} conseguidos.
❒ *Salud:* -${salud.toLocaleString}% de perdida.`
await conn.sendMessage(m.chat, { text: mensaje }, { quoted: m })
}

handler.help = ['minar']
handler.tags = ['economy']
handler.command = ['minar', 'mine']
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
return list[Math.floor(Math.random() * list.length)]
}
const eventos = [
{ tipo: 'victoria', mensaje: 'Has minado en una cueva abandonada, no hay muchos recursos pero tampoco tan malos.' },
{ tipo: 'victoria', mensaje: 'Has minado en una cueva profunda con unos amigos, lograste conseguir algunos recursos aceptables.' },
{ tipo: 'victoria', mensaje: 'Usaste una explosión para despues descubrir muchos recursos, un dia nada mal para un minero.' },
{ tipo: 'victoria', mensaje: 'Has minado en una zona no tan conocida y conseguiste recursos basicos, un dia no tan malo.' },
{ tipo: 'derrota', mensaje: 'La explosión que usas en la mina ocasionó que el techo se derrumbé sobre ti, que dia tan malo.' },
{ tipo: 'derrota', mensaje: 'Tus amigos vieron que encontraron una criatura rara y te abandonaron a su suerte, que dia tan malo.' },
{ tipo: 'derrota', mensaje: 'La cueva abandonada en la que minas resulto ser la cueva de una criatura rara, mueres y nunca saliste.' },
{ tipo: 'derrota', mensaje: 'Has minado en una cueva profunda, pero debido a la profundidad las criaturas extrañas comen tu carne por ir solo.' }
]