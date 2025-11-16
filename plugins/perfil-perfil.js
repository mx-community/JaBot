import { xpRange } from '../lib/levelling.js'
import moment from 'moment-timezone'
import fetch from 'node-fetch'

let handler = async (m, { conn, args, command, usedPrefix }) => {
try {
let texto = await m.mentionedJid
let userId = texto?.length > 0 ? texto[0] : (m.quoted ? m.quoted.sender : m.sender)
if (!global.db.data.users[userId]) global.db.data.users[userId] = {}
const user = global.db.data.users[userId]
let name = user.name || (await conn.getName(userId).catch(() => userId.split('@')[0]))
let description = user.description || 'Sin descripción.'
let cumpleanos = user.birth || 'no birth.'
let genero = user.genre || 'Sin genero..'
let misocial = user.misocial || 'No link.'

let exp = user.exp || 0
let nivel = user.level || 0
let coin = user.coin || 0
let bank = user.bank || 0
let bankk = user.bankk || 0
let total = coin + bank
let total2 = exp + bankk

let { min, xp } = xpRange(nivel, global.multiplier)
let percent = Math.floor(((exp - min) / xp) * 100)
let barra = `${'▰'.repeat(Math.floor(percent / 10))}${'▱'.repeat(10 - Math.floor(percent / 10))}`

let sorted = Object.entries(global.db.data.users).map(([jid, v]) => ({ jid, ...v })).sort((a, b) => (b.level || 0) - (a.level || 0))
let rank = sorted.findIndex(u => u.jid === userId) + 1

let premium = user.premium || global.prems.includes(userId.split('@')[0])
let tiempoPremium = premium ? (user.premiumTime ? await formatTime(user.premiumTime - Date.now()) : 'Permanente') : 'No'
let pp = await conn.profilePictureUrl(userId, 'image').catch(_ => 'https://raw.githubusercontent.com/The-King-Destroy/Adiciones/main/Contenido/1745522645448.jpeg')

let text = `
╭──────────────• · · ·
│🜲 *Nombre:* @${name} 
│ᗢ *Premium:* ${premium ? `${tiempoPremium} ✓` : '(#prem) ✘'}
│⏍ *Cumple:* ${cumpleanos}
│✎ *Descripción:*
> ${description}
│⎋ *Red:* ${misocial}
╰──────────────• · · ·

> ➢ *Estadísticas:*
┌⊐ *LVL:* ${nivel}
└⊐ *Rango:* #${rank}

> ➢ *Economía / Perfil:*
⊐ *${global.currency}:* ${coin.toLocaleString()} • wallet
⊐ *${global.currency2}:* ${exp.toLocaleString()}

> ➢ *Economía / Guardado:*
⊐ *${global.currency}:* ${bank.toLocaleString()}
⊐ *${global.currency2}:* ${bankk.toLocaleString()}


> 📍  Puedes usar *#pf* para ver lo que puedes editar.`

/*await conn.sendMessage(m.chat, { text: text, mentions: [m.sender], contextInfo: { externalAdReply: { 
title: `Barra de nivel:`, 
body: `${barra} *${percent}%*`, 
thumbnail: pp, 
sourceUrl: null, 
mediaType: 1, renderLargerThumbnail: false }}}, { quoted: m })*/

await conn.sendMessage(m.chat, { image: { url: pp }, caption: text }, { quoted: m })
} catch (e) {
await conn.sendMessage(m.chat, { text: `*[ 📍 ]*  ERROR_COMMAND = ${e}` }, { quoted: m })
}}

handler.help = ['profile', 'perfil']
handler.tags = ['perfil']
handler.command = ['profile', 'perfil', 'perfíl']
export default handler

async function formatTime(ms) {
let s = Math.floor(ms / 1000)
let m = Math.floor(s / 60)
let h = Math.floor(m / 60)
let d = Math.floor(h / 24)
s %= 60; m %= 60; h %= 24
return `${d}d ${h}h ${m}m ${s}s`
}
