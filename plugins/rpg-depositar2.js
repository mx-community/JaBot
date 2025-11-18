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
if (!args[0]) return conn.sendMessage(m.chat, { text: `Ingrese el comando y la cantidad de *${currency2}* para depositar o guardar.\n\n• Por ejemplo:\n*${usedPrefix + command}* 500` }, { quoted: m })
if ((args[0]) < 1) return conn.sendMessage(m.chat, { text: `⎉  Cantidad faltante o insuficiente.\n- Debe de ingresar una cantidad valida para depositar.\n\n• Por ejemplo:\n*${usedPrefix + command}* 500` }, { quoted: m })
if (args[0] == 'all') {
let count = parseInt(user.exp)
user.exp -= count * 1
user.bankk += count * 1
let depositado = `·─┄ · ✦ *Depositado* ✦ ·
> Se ha depositado todo tu recurso con éxito.

⚡ *Cantidad:* ${count.toLocaleString()} *${currency2}*
📅 *Fecha:* ${fecha}
⏳ *Hora:* ${hora} (argentina)`.trim()
await conn.sendMessage(m.chat, { text: depositado }, { quoted: m })
return !0
}
if (!Number(args[0])) return conn.sendMessage(m.chat, { text: `📍  Debe de ingresar el comando y una cantidad valida de *${currency2}*.\n\n• Por ejemplo:\n*${usedPrefix + command}* 500` }, { quoted: m })
let count = parseInt(args[0])
if (!user.exp) return conn.sendMessage(m.chat, { text: `📍  Lo siento, no tienes suficientes *${currency2}* para depositar esa cantidad.\n- Solo tienes ${user.exp.toLocaleString()} en tu perfil.` }, { quoted: m })
if (user.exp < count) return conn.sendMessage(m.chat, { text: `📍  Solo dispones de ${user.exp.toLocaleString()} de *${currency2}*.\n- No son suficientes para depositar.` }, { quoted: m })
user.exp -= count * 1
user.bankk += count * 1
let depositados = `·─┄ · ✦ *Depositado* ✦ ·
> Se ha depositado tu recurso con éxito.

⚡ *Cantidad:* ${count.toLocaleString()} *${currency2}*
📅 *Fecha:* ${fecha}
⏳ *Hora:* ${hora} (argentina)`
await conn.sendMessage(m.chat, { text: depositados }, { quoted: m })
}

handler.help = ['depositar2']
handler.tags = ['rpg']
handler.command = ['depositar2', 'd2', 'dep2']
handler.group = true

export default handler
