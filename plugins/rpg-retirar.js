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
if (!args[0]) return conn.sendMessage(m.chat, { text: `Ingrese el comando y la cantidad de *${currency}* para retirar del banco.\n\n• Por ejemplo:\n*${usedPrefix + command}* 50` }, { quoted: m })
if ((args[0]) < 1) return conn.sendMessage(m.chat, { text: `⎉  Cantidad faltante o insuficiente.\n- Debe de ingresar una cantidad valida para retirar.\n\n• Por ejemplo:\n*${usedPrefix + command}* 50` }, { quoted: m })
if (args[0] == 'all') {
let count = parseInt(user.bank)
user.bank -= count * 1
user.coin += count * 1
let retirado = `〆  B A N K  :  R P G

\t-- ✅ \`\`\`Se ha retirado todo tu recurso con éxito.\`\`\`

\t\t⚶ Cantidad : ${count.toLocaleString()} *${currency}*
\t\t⚶ Fecha : ${fecha}
\t\t⚶ Hora : ${hora} (AR)

> ${textbot}`.trim()
await conn.sendMessage(m.chat, { text: retirado }, { quoted: m })
return !0
}
if (!Number(args[0])) return conn.sendMessage(m.chat, { text: `📍  Debe de ingresar el comando y una cantidad valida de *${currency}*.\n\n• Por ejemplo:\n*${usedPrefix + command}* 50` }, { quoted: m })
let count = parseInt(args[0])
if (!user.bank) return conn.sendMessage(m.chat, { text: `📍  Lo siento, no tienes suficientes *${currency}* para retirar esa cantidad.\n- Solo tienes ${user.bank.toLocaleString()} en tu banco.` }, { quoted: m })
if (user.bank < count) return conn.sendMessage(m.chat, { text: `📍  Solo dispones de ${user.bank.toLocaleString()} de *${currency}* en el banco.\n- La cantidad solicitada a retirar es erronea.` }, { quoted: m })
user.bank -= count * 1
user.coin += count * 1
let retirados = `〆  B A N K  :  R P G

\t-- ✅ \`\`\`Se ha retirado tu recurso con éxito.\`\`\`

\t\t⚶ Cantidad : ${count.toLocaleString()} *${currency}*
\t\t⚶ Fecha : ${fecha}
\t\t⚶ Hora : ${hora} (AR)

> ${textbot}`
await conn.sendMessage(m.chat, { text: retirados }, { quoted: m })
}

handler.help = ['retirar']
handler.tags = ['rpg']
handler.command = ['retirar', 'r', 'ret']
handler.group = true

export default handler
