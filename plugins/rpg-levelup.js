import { canLevelUp, xpRange } from '../lib/levelling.js'
import db from '../lib/database.js'

let handler = async (m, { conn }) => {
let mentionedJid = await m.mentionedJid
let who = mentionedJid[0] || (m.quoted ? await m.quoted.sender : m.sender)
let user = global.db.data.users[who]
let name = await (async () => user.name?.trim() || (await conn.getName(who).then(n => typeof n === 'string' && n.trim() ? n : who.split('@')[0]).catch(() => who.split('@')[0])))()
if (!user) {
await conn.sendMessage(m.chat, { text: `📍  No se han encontrado datos del usuario mensionado.\n- El usuario necesita registrarse para guardar sus datos.` }, { quoted: m })
return
}
let { min, xp } = xpRange(user.level, global.multiplier)
let before = user.level * 1
while (canLevelUp(user.level, user.exp, global.multiplier)) user.level++
if (before !== user.level) {
let txt = `·─┄ · ✦ *New : Level* ✦ ·
• Has subido de nivel exitosamente.

🜲 *Usuario:* @${name}
ᗢ *LVL:* ${user.level} (new)

> 📍  Sigue subiendo de nivel para lograr mas cosas.`
await conn.sendMessage(m.chat, { text: txt }, { quoted: m })
} else {
let users = Object.entries(global.db.data.users).map(([key, value]) => {
return { ...value, jid: key }
})
let sortedLevel = users.sort((a, b) => (b.level || 0) - (a.level || 0))
let rank = sortedLevel.findIndex(u => u.jid === who) + 1
let txt = `·─┄ · ✦ *Info : Level* ✦ ·

🜲 *Usuario:* @${name}
ᗢ *LVL:* ${user.level} (actual)
✦ *Próximo Nivel:* ${Math.floor(((user.exp - min) / xp) * 100)}% 

> 📍  Sigue subiendo ganando mas *${currency2}* para subir de nivel.`
await conn.sendMessage(m.chat, { text: txt }, { quoted: m })
}}

handler.help = ['levelup']
handler.tags = ['rpg']
handler.command = ['nivel', 'lvl', 'level', 'levelup']
handler.group = true

export default handler

    
