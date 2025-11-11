const pHora = 1000
const pDia = 10000
const pSemana = 25000
const pMes = 50000

const cHora = 20
const cDia = 200
const cSemana = 500
const cMes = 1000

let handler = async (m, { conn, usedPrefix, command, args }) => {
let texto = `【 *PREMIUM : BUY* 】
- Aqui hay opciones para ser un usuario *premium* en el bot.

• 1 *h* = ${pHora} ${currency}
• 1 *d* = ${pDia} ${currency}
• 1 *s* = ${pSemana} ${currency}
• 1 *m* = ${pMes} ${currency}

• Por ejemplo:
${usedPrefix + command} 1 h`
if (!args[0]) return conn.reply(m.chat, texto, fkontak)
let user = global.db.data.users[m.sender]
let name = await (async () => global.db.data.users[m.sender].name || (async () => { try { const n = await conn.getName(m.sender); return typeof n === 'string' && n.trim() ? n : m.sender.split('@')[0] } catch { return m.sender.split('@')[0] } })())()
if (isNaN(args[0])) return conn.sendMessage(m.chat, { text: `📍  Para ser un usuario *Premium* solo se aceptan numeros como duracion.\n\n• Por ejemplo:\n*#${command}* 1 h` }, { quoted: m })
let kk = args[1]?.toLowerCase() || "h"
let precios = { h: pHora, d: pDia, s: pSemana, m: pMes }
let comisiones = { h: cHora, d: cDia, s: cSemana, m: cMes }
if (!precios[kk]) return conn.sendMessage(m.chat, { text: `📍  Debes definir el formato correcto, si es en horas, dias, semanas o meses.\n\n• Por ejemplo:\n*#${command}* 1 h` }, { quoted: m })
let precio = precios[kk]
let comision = comisiones[kk]
let total = (precio * args[0]) + (comision * args[0])
if (user.pesosars < total) return conn.sendMessage(m.chat, { text: `📍  Tu saldo no es suficiente para ser un usuario premium.\n- Solo tienes *${user.pesosars}* disponibles en tu billetera.` }, { quoted: m })
let tiempoMs = { h: 3600000, d: 86400000, s: 604800000, m: 2592000000 }[kk] * args[0]
let now = Date.now()
if (now < user.premiumTime) user.premiumTime += tiempoMs
else user.premiumTime = now + tiempoMs
user.premium = true
user.pesosars -= total
let tipos = { h: "Hora(s)", d: "Día(s)", s: "Semana(s)", m: "Mes(es)" }
let tipo = tipos[kk]
let cap = `> ⪕ *NEW : PREM* ⪖
- Hola usuario ${name}, ahora eres un usuario premium.

ⴵ *Tiempo:* ${args[0]} ${tipo}
⎋ *Pago total:* ${total} Pesos argentinos.

• *Tenia:* ${user.pesosars + total} pesos argentinos.
• *Se gasto:* -${comision * args[0]} pesos argentinos.`
conn.sendMessage(m.chat, { text: cap, mentions: [m.sender] }, { quoted: fkontak })
}

handler.tags = ['rg']
handler.help = ['premium']
handler.command = ['vip', 'premium', 'prem']

export default handler