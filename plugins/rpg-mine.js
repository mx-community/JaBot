import moment from 'moment-timezone'
import fetch from 'node-fetch'
var handler = async (m, { conn, usedPrefix, command }) => {
if (!db.data.chats[m.chat].economy && m.isGroup) {
return conn.sendMessage(m.chat, { text: `⦗ ᗢ ⦘ El comando *${usedPrefix + command}* está desactivado en este grupo.\n- Activalo si eres admin de la siguiente manera.\n\n• Por ejemplo:\n*${usedPrefix}rpg on*` }, { quoted: m })
}
const user = global.db.data.users[m.sender]

let d = new Date(new Date + 3600000)
let locale = 'es'
let fecha = d.toLocaleDateString('es', {day: 'numeric', month: 'numeric', year: 'numeric'})
let hora = `${moment.tz('America/Buenos_Aires').format('HH:mm:ss')}`

if (!user) return
user.lastmine = user.lastmine || 0
user.coin = user.coin || 0
user.exp = user.exp || 0
user.health = user.health || 100
user.pickaxedurability = user.pickaxedurability || 100
if (user.health < 5)
return conn.sendMessage(m.chat, { text: `📍  No tienes suficiente salud para seguir minando.\n- Ingrese el comando *#heal* para sanarte.` }, { quoted: m })
const gap = 5 * 60 * 1000
const now = Date.now()
if (now < user.lastmine) {
const restante = user.lastmine - now
return conn.sendMessage(m.chat, { text: `📍  Debes esperar *${formatTime(restante)}* para volver a usar el comando.` }, { quoted: m })
}
user.lastmine = now + gap
const evento = pickRandom(eventos)
let monedas, experiencia, salud
let thumb
if (evento.tipo === 'victoria') {
thumb = Buffer.from(await (await fetch(`${global.ppVictoria}`)).arrayBuffer())
monedas = Math.floor(Math.random() * 2001) + 7000
experiencia = Math.floor(Math.random() * 91) + 10
salud = Math.floor(Math.random() * 3) + 1
user.coin += monedas
user.exp += experiencia
user.health -= salud
} else {
thumb = Buffer.from(await (await fetch(`${global.ppPerder}`)).arrayBuffer())
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
const exitoso = `·─┄ · ✦ *Mining : Mina* ✦ ·
\t𝇈 📍 ${evento.mensaje}

\t\t⚶ *${currency} :* ${monedas.toLocaleString()}
\t\t⚶ *${currency2} :* ${experiencia.toLocaleString()}
\t\t⚶ *Fecha :* ${fecha}
\t\t⚶ *Hora :* ${hora} (argentina)


> ${textbot}`
await conn.sendMessage(m.chat, { text: exitoso, mentions: [m.sender], contextInfo: { externalAdReply: { 
title: "⚶  M I N I N G  :  M I N A  ⚶", 
body: null, 
thumbnail: thumb, 
sourceUrl: null, 
mediaType: 1, renderLargerThumbnail: false }}}, { quoted: m })

//await conn.reply(m.chat, mensaje, m)
}

handler.help = ['minar']
handler.tags = ['economy']
handler.command = ['minar', 'mining', 'mine']
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
{ tipo: 'victoria', mensaje: 'Descubriste una veta de oro entre rocas inestables y lograste extraerla con éxito, ganaste.' },
{ tipo: 'victoria', mensaje: 'Hallaste una cámara secreta con gemas ocultas por siglos. Ganaste.' },
{ tipo: 'victoria', mensaje: 'Te cruzaste con un minero anciano que compartió herramientas y conocimientos valiosos, ganaste.' },
{ tipo: 'victoria', mensaje: 'Excavaste un túnel olvidado y encontraste un cofre de minerales raros, ganaste.' },
{ tipo: 'victoria', mensaje: 'Encontraste una cueva iluminada por cristales naturales que revelaban un tesoro oculto. Ganaste.' },
{ tipo: 'victoria', mensaje: 'Un golem de piedra te dio acceso a una sala de esmeraldas tras superar su acertijo, ganaste.' },
{ tipo: 'victoria', mensaje: 'Minaste junto a otros exploradores y compartieron contigo los beneficios de una fuente mágica, ganaste.' },
{ tipo: 'victoria', mensaje: 'Tras horas de excavación, hallaste una cámara sellada repleta de piedras lunares, ganaste.' },
{ tipo: 'victoria', mensaje: 'Tu pico tocó una superficie metálica: era un cofre con monedas antiguas de gran valor, ganaste.' },
{ tipo: 'victoria', mensaje: 'Siguiendo un mapa maltratado, diste con una cavidad llena de rubíes, ganaste.' },
{ tipo: 'derrota', mensaje: 'Tus herramientas se rompieron justo antes de descubrir un filón valioso. Te retiraste con las manos vacías, perdiste.' },
{ tipo: 'derrota', mensaje: 'Una explosión de gas te sorprendió y te hizo perder parte del botín mientras escapabas, perdiste.' },
{ tipo: 'derrota', mensaje: 'La cueva colapsó parcialmente y tus minerales quedaron enterrados, perdiste.' },
{ tipo: 'derrota', mensaje: 'Te atacaron murciélagos cegadores y saliste herido sin completar la recolección. Perdiste.' },
{ tipo: 'derrota', mensaje: 'Una trampa antigua se activó y dañó tu mochila, perdiendo varias gemas, perdiste.' }
]

global.ppPerder = ["https://qu.ax/ddDiD.jpg", "https://qu.ax/qhVQq.jpg", "https://qu.ax/ZGoSJ.jpg"].getRandom()
global.ppVictoria = ["https://qu.ax/wlVBf.jpg", "https://qu.ax/KQBdJ.jpg", "https://qu.ax/etWBt.jpg"].getRandom()
    
