/*import { xpRange } from '../lib/levelling.js'
import moment from 'moment-timezone'
import fetch from 'node-fetch'

let handler = async (m, { conn, args }) => {
try {
let texto = await m.mentionedJid
let userId = texto.length > 0 ? texto[0] : (m.quoted ? await m.quoted.sender : m.sender)
let name = await (async () => global.db.data.users[userId].name || (async () => { try { const n = await conn.getName(userId); return typeof n === 'string' && n.trim() ? n : userId.split('@')[0] } catch { return userId.split('@')[0] } })())()
if (!global.db.data.users) global.db.data.users = {}
if (!global.db.data.characters) global.db.data.characters = {}
if (!global.db.data.users[userId]) global.db.data.users[userId] = {}
const user = global.db.data.users[userId]
const cumpleanos = user.birth || 'Undefined'
const genero = user.genre || 'Undefined'
const description = user.description || 'Undefined'
const exp = user.exp || 0
const nivel = user.level || 0
const coin = user.coin || 0
const bank = user.bank || 0
const total = coin + bank
const total2 = exp + bank2
const sorted = Object.entries(global.db.data.users).map(([k, v]) => ({ ...v, jid: k })).sort((a, b) => (b.level || 0) - (a.level || 0))
const rank = sorted.findIndex(u => u.jid === userId) + 1
const progreso = (() => {
let datos = xpRange(nivel, global.multiplier)
return `${exp - datos.min} de ${datos.xp} con *(${Math.floor(((exp - datos.min) / datos.xp) * 100)}%)*` })()
const premium = user.premium || global.prems.map(v => v.replace(/\D+/g, '') + '@s.whatsapp.net').includes(userId)
const isLeft = premium ? (global.prems.includes(userId.split('@')[0]) ? 'Permanente' : (user.premiumTime ? await formatTime(user.premiumTime - Date.now()) : '—')) : '—'
const favId = user.favorite
const favLine = favId && global.db.data.characters?.[favId] ? `\n❒ *Reclamo valorado:* ${global.db.data.characters[favId].name || 'Desconocido.'}` : ''
const ownedIDs = Object.entries(global.db.data.characters).filter(([, c]) => c.user === userId).map(([id]) => id)
const haremCount = ownedIDs.length
const haremValue = ownedIDs.reduce((acc, id) => {
const char = global.db.data.characters[id] || {}
const value = typeof char.value === 'number' ? char.value : 0
return acc + value }, 0)
const pp = await conn.profilePictureUrl(userId, 'image').catch(_ => `${global.mMages}`)
const text = `> ⟪✶⟫ ╰• *Perfil  :  RPG* •╯
⎔ *Premium:*  ${premium ? `Time » *${isLeft}*` : 'No'}
⎔ *Name:*  ${name}
⎔ *Description:*  ${description}
⊸⊹ *Cumpleaños:*  ${cumpleanos}
⊸⊹ *Género:*  ${genero}

> ⪕ *Estadísticas* ⪖
🜲 *Rango:*  #${rank}
✦ *Nivel:*  [lvl ${nivel}]
🜸 *${currency}:*  ${coin.toLocaleString()} *(bk: ${total.toLocaleString()} total)*
⚶ *${currency2}:*  ${exp.toLocaleSteing()} *(bk: ${total2.toLocaleString()} total)*
ⴵ *Progreso:*  ${progreso}
⟤ *Interacción*  ${user.commands || "0"} usados.

> ⪕ *Personajes* ⪖
❒ *Reclamados:* ${haremCount}
❒ *Cada valor:* ${haremValue.toLocaleString()} ${favLine}`
await conn.sendMessage(m.chat, { image: { url: pp }, caption: text, mentions: [userId] }, { quoted: fkontak })
} catch (error) {
await await conn.sendMessage(m.chat, { text: `*[ 📍 ]*  ERROR_COMMAND = Command error, try again and if the error persists, report the command.` }, { quoted: m })
}}

handler.help = ['profile']
handler.tags = ['rg']
handler.command = ['profile', 'perfil', 'perfíl']
handler.group = true

export default handler

async function formatTime(ms) {
let s = Math.floor(ms / 1000), m = Math.floor(s / 60), h = Math.floor(m / 60), d = Math.floor(h / 24)
let months = Math.floor(d / 30), weeks = Math.floor((d % 30) / 7)
s %= 60; m %= 60; h %= 24; d %= 7
let t = months ? [`${months} mes${months > 1 ? 'es' : ''}:`] :
weeks ? [`${weeks} semana${weeks > 1 ? 's' : ''}:`] :
d ? [`${d} d${d > 1 ? 's' : ''}:`] : []
if (h) t.push(`${h} h:${h > 1 ? 's' : ''}:`)
if (m) t.push(`${m} m:${m > 1 ? 's' : ''}:`)
if (s) t.push(`${s} s${s > 1 ? 's' : ''}`)
return t.length > 1 ? t.slice(0, -1).join(' ') + ' y ' + t.slice(-1) : t[0]
}
*/
