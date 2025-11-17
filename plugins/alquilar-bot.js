import fetch from 'node-fetch'

//Mecánica
const pHora = 1000
const pDia = 10000
const pSemana = 25000
const pMes = 50000

//Mecánica
const cHora = 20
const cDia = 200
const cSemana = 500
const cMes = 1000

let handler = async (m, { conn, usedPrefix, command, args }) => {
const thumb = Buffer.from(await (await fetch(`https://qu.ax/hNADg.jpg`)).arrayBuffer())
let texto = `⫶☰ \`Alojamiento + Premium\`
📍  _Hoy y mañana estas al dia, aloja el bot en un grupo y llevate el dia siendo un usuario *Premium*._

> *Tus recursos reales:*
💵 *ARS:* ${user.arcoins + " pesos." || "0 *(#mp)*"}

•─────────────• · · ·
⏰ *X Hora:* $${pHora} ARS
> Depende de cuantas horas quieras se suma el precio.
•─────────────• · · ·
⏰ *X Dia:* ${pDia} ARS
> Depende de cuantos dias quieras se suma el precio.
•─────────────• · · ·
⏰ *X Semana:* ${pSemana} ARS
> Depende de cuantas semanas quieras se suma el precio.
•─────────────• · · ·
⏰ *X Mes:* ${pMes} ARS
> Depende de cuantos meses quieras se suma el precio.
•─────────────• · · ·

• Ejemplo de compra:
*${usedPrefix + command}* 5 hora`
if (!args[0]) return conn.sendMessage(m.chat, { text: texto }, { quoted: m })
let user = global.db.data.users[m.sender]
let name = await (async () => global.db.data.users[m.sender].name || (async () => { try { const n = await conn.getName(m.sender); return typeof n === 'string' && n.trim() ? n : m.sender.split('@')[0] } catch { return m.sender.split('@')[0] } })())()
if (isNaN(args[0])) return conn.sendMessage(m.chat, { text: `📍  Únicamente puedes acceder a la compra usando numeros.\n\n• Por ejemplo:\n*#${command}* 2 dia\n\n*Nota:*\n> Se consumirá tu saldo real en el bot despues de haber transferido cierta cantidad requerida de pesos argentinos. *(ARS)*` }, { quoted: m })
let kk = args[1]?.toLowerCase() || "hora"
let precios = { "hora": pHora, "dia": pDia, "semana": pSemana, "mes": pMes }
let comisiones = { "hora": cHora, "dia": cDia, "semana": cSemana, "mes": cMes }
if (!precios[kk]) return 
conn.sendMessage(m.chat, { text: `📍  No existe ese formato, debes usarlo correctamente.\n- Aqui te dejo una pequeña lista de usos correspondientes.\n\n- hora\n- dia\n- semana\n- mes\n\n• Por ejemplo:\n*#${command}* 1 hora` }, { quoted: m })
let precio = precios[kk]
let comision = comisiones[kk]
let total = (precio * args[0]) + (comision * args[0])
if (user.arcoins < total) return conn.sendMessage(m.chat, { text: `📌  Lo siento, no tienes saldo suficiente para comprar esa membresía de tiempo.\n- Podes transferir *ARS* usando el comando *#mp* para despues alquilar el bot.` }, { quoted: m })
let tiempoMs = { "hora": 3600000, "dia": 86400000, "semana": 604800000, "mes": 2592000000 }[kk] * args[0]
let now = Date.now()
if (now < user.premiumTime) user.premiumTime += tiempoMs
else user.premiumTime = now + tiempoMs
user.premium = true
user.arcoins -= total
let tipos = { hora: "Hora(s)", dia: "Día(s)", semana: "Semana(s)", mes: "Mes(es)" }
let tipo = tipos[kk]
let cap = `·─┄ · ✦ *Servidor : ${name}* ✦ ·
> Se ha activado tu servidor y se te dio un bono a ser premium.

- Estás al dia hasta ${args[0]} ${tipo} de ser un usuario premium que has pagado por ${total} ARS en total.`
await conn.sendMessage(m.chat, { text: cap, mentions: [m.sender], contextInfo: { externalAdReply: { 
title: "Membresía Pagada.", 
body: "Obtienes: +1 servidor mas premium incluído.", 
thumbnail: thumb, 
sourceUrl: null, 
mediaType: 1, renderLargerThumbnail: true }}}, { quoted: m })
//conn.sendMessage(m.chat, { text: cap, mentions: [m.sender] }, { quoted: fkontak })
}

handler.tags = ['rg']
handler.help = ['premium']
handler.command = ['newplan', 'plan']

export default handler

