import moment from 'moment-timezone'
import fetch from 'node-fetch'
var handler = async (m, { conn, usedPrefix, command }) => {
if (!db.data.chats[m.chat].economy && m.isGroup) {
return conn.sendMessage(m.chat, { text: `⦗ ᗢ ⦘ El comando *${usedPrefix + command}* está desactivado en este grupo.\n- Activalo si eres admin de la siguiente manera.\n\n• Por ejemplo:\n*${usedPrefix}rpg on*` }, { quoted: m })
}
let user = global.db.data.users[m.sender]
const thumb = Buffer.from(await (await fetch(`https://qu.ax/fkKqr.jpg`)).arrayBuffer())
let hora = `${moment.tz('America/Buenos_Aires').format('HH:mm:ss')}`
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
let expGain = Math.floor(Math.random() * (60000 - 40000 + 1)) + 60000
user.coin += reward
user.exp += expGain
user.lastcofre = now + gap
let cofreA = `·─┄ · ✦ *Cofre : Coffer* ✦ ·

🪙 *${currency}:* +${reward.toLocaleString()}
⚡ *${currency2}:* +${expGain.toLocaleString()}
⏰ *Time Again:* ${wait}

> 📍  Ya reclamaste tu cofre, vuelva pronto.`
await conn.sendMessage(m.chat, { text: cofreA, mentions: [m.sender], contextInfo: { externalAdReply: { 
title: "々 C O F R E  :  R P G 々", 
body: textbot, 
thumbnail: thumb, 
sourceUrl: null, 
mediaType: 1, renderLargerThumbnail: false }}}, { quoted: m })

//await conn.sendMessage(m.chat, { text: cofreA }, { quoted: m })
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
  
