let handler = async (m, { conn, command, usedPrefix }) => {
if (!db.data.chats[m.chat].economy && m.isGroup) {
return conn.sendMessage(m.chat, { text: `⦗ ᗢ ⦘ El comando *${usedPrefix + command}* está desactivado en este grupo.\n- Activalo si eres admin de la siguiente manera.\n\n• Por ejemplo:\n*${usedPrefix}rpg on*` }, { quoted: m })
}
let user = global.db.data.users[m.sender]
if (!user) global.db.data.users[m.sender] = user = { coin: 0, exp: 0, lastFish: 0 }
const cooldown = 12 * 60 * 1000
const ahora = Date.now()
if (ahora < user.lastFish) {
const restante = user.lastFish - ahora
const wait = formatTimeMs(restante)
return conn.sendMessage(m.chat, { text: `📍  Debes esperar *${wait}* para volver a usar el comando.` }, { quoted: m })
}
user.lastFish = ahora + cooldown
const evento = pickRandom(eventos)
let monedas, experiencia
if (evento.tipo === 'victoria') {
monedas = Math.floor(Math.random() * 2001) + 11000
experiencia = Math.floor(Math.random() * 61) + 30
user.coin += monedas
user.exp += experiencia
} else {
monedas = Math.floor(Math.random() * 2001) + 5000
experiencia = Math.floor(Math.random() * 31) + 30
user.coin -= monedas
user.exp -= experiencia
if (user.exp < 0) user.exp = 0
if (user.coin < 0) user.coin = 0
}
const resultado = `·─┄ · ✦ *Pesca : Fishing* ✦ ·
🎣 ${evento.mensaje}

🪙 *${currency}:* ${monedas.toLocaleString()}
⚡ *${currency2}:* ${experiencia.toLocaleString()}
⏳ *Proximo:* ${wait}`
await conn.reply(m.chat, resultado, m)
await global.db.write()
}

handler.tags = ['rpg']
handler.help = ['pescar', 'fish']
handler.command = ['pescar', 'fish']
handler.group = true

export default handler

function formatTimeMs(ms) {
const totalSec = Math.ceil(ms / 1000)
const min = Math.floor(totalSec / 60)
const sec = totalSec % 60
const partes = []
if (min) partes.push(`${min} minuto${min !== 1 ? 's' : ''}`)
partes.push(`${sec} segundo${sec !== 1 ? 's' : ''}`)
return partes.join(' ')
}
function pickRandom(list) {
return list[Math.floor(Math.random() * list.length)]
}
const eventos = [
{ tipo: 'victoria', mensaje: '¡Has pescado un Salmón! Su sabor es exquisito, ganaste.' },
{ tipo: 'victoria', mensaje: '¡Has pescado una Trucha! Su frescura es admirable, ganaste.' },
{ tipo: 'victoria', mensaje: '¡Has capturado un Tiburón! Fue una intensa pelea, ganaste.' },
{ tipo: 'victoria', mensaje: '¡Increíble! Has pescado una Ballena. Fue una experiencia única, ganaste.' },
{ tipo: 'victoria', mensaje: '¡Has capturado un Pez Payaso! Colorido y travieso, ganaste.' },
{ tipo: 'victoria', mensaje: '¡Has atrapado una Anguila Dorada! Rara y valiosa, ganaste.' },
{ tipo: 'victoria', mensaje: '¡Has pescado un Mero Gigante! El esfuerzo valió la pena, ganaste.' },
{ tipo: 'victoria', mensaje: '¡Has capturado un Pulpo de tinta azul! Astuto pero tuyo, ganaste.' },
{ tipo: 'victoria', mensaje: '¡Sacaste una Carpa Real! Su peso impresiona, ganaste.' },
{ tipo: 'victoria', mensaje: '¡Has conseguido un Pez Dragón! Criatura legendaria, ganaste.' },
{ tipo: 'derrota', mensaje: 'Has sacado basura: una bolsa de plástico, perdiste.' },
{ tipo: 'derrota', mensaje: 'Has sacado basura: una lata vieja, perdiste.' },
{ tipo: 'derrota', mensaje: 'No pescaste nada esta vez. El agua estaba en calma, perdiste.' },
{ tipo: 'derrota', mensaje: 'Tu línea se rompió al atrapar algo enorme, perdiste.' },
{ tipo: 'derrota', mensaje: 'El pez se soltó justo al llegar a la superficie, perdiste.' }
]