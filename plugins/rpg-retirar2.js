import moment from 'moment-timezone'
let handler = async (m, { args, usedPrefix, command }) => {
if (!db.data.chats[m.chat].economy && m.isGroup) {
return conn.sendMessage(m.chat, { text: `⦗ ᗢ ⦘ El comando *${usedPrefix + command}* está desactivado en este grupo.\n- Activalo si eres admin de la siguiente manera.\n\n• Por ejemplo:\n*${usedPrefix}rpg on*` }, { quoted: m })
}

//Hora y fecha
let d = new Date(new Date + 3600000)
let locale = 'es'
let hora = `${moment.tz('America/Buenos_Aires').format('HH:mm:ss')}`
let fecha = d.toLocaleDateString('es', {day: 'numeric', month: 'numeric', year: 'numeric'})

let user = global.db.data.users[m.sender]
if (!args[0]) return conn.sendMessage(m.chat, { text: `Ingrese el comando y la cantidad de *${currency2}* para retirar del banco.\n\n• Por ejemplo:\n*${usedPrefix + command}* 500` }, { quoted: m })
if ((args[0]) < 1) return conn.sendMessage(m.chat, { text: `⎉  Cantidad faltante o insuficiente.\n- Debe de ingresar una cantidad valida para retirar.\n\n• Por ejemplo:\n*${usedPrefix + command}* 500` }, { quoted: m })
if (args[0] == 'all') {
let count = parseInt(user.bankk)
user.bankk -= count * 1
user.exp += count * 1
let retirado = `〆  B A N K  :  R P G

\t-- ✅ \`\`\`Se ha retirado todo tu recurso con éxito.\`\`\`

\t\t⚶ Cantidad: ${count.toLocaleString()} *${currency2}*
\t\t⚶ Fecha: ${fecha}
\t\t⚶ Hora: ${hora} (argentina)


> ${textbot}`.trim()
await conn.sendMessage(m.chat, { text: retirado }, { quoted: m })
return !0
}
if (!Number(args[0])) return conn.sendMessage(m.chat, { text: `📍  Debe de ingresar el comando y una cantidad valida de *${currency2}*.\n\n• Por ejemplo:\n*${usedPrefix + command}* 500` }, { quoted: m })
let count = parseInt(args[0])
if (!user.bankk) return conn.sendMessage(m.chat, { text: `📍  Lo siento, no tienes suficientes *${currency2}* para retirar esa cantidad.\n- Solo tienes ${user.bankk.toLocaleString()} en tu banco.` }, { quoted: m })
if (user.bankk < count) return conn.sendMessage(m.chat, { text: `📍  Solo dispones de ${user.bankk.toLocaleString()} de *${currency2}* en el banco.\n- La cantidad solicitada a retirar es erronea.` }, { quoted: m })
user.bankk -= count * 1
user.exp += count * 1
let retirados = `〆  B A N K  :  R P G

 \t-- ✅ \`\`\`Se ha retirado tu recurso con éxito.\`\`\`

\t\t⚶ Cantidad: ${count.toLocaleString()} *${currency2}*
\t\t⚶ Fecha: ${fecha}
\t\t⚶ Hora: ${hora} (argentina)


> ${textbot}`
await conn.sendMessage(m.chat, { text: retirados }, { quoted: m })
}

handler.help = ['retirar2']
handler.tags = ['rpg']
handler.command = ['retirar2', 'r2', 'ret2']
handler.group = true

export default handler
