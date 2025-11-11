import { canLevelUp, xpRange } from '../lib/levelling.js'
import db from '../lib/database.js'

let handler = async (m, { conn }) => {
let mentionedJid = await m.mentionedJid
let who = mentionedJid[0] || (m.quoted ? await m.quoted.sender : m.sender)
let user = global.db.data.users[who]
let name = await (async () => user.name?.trim() || (await conn.getName(who).then(n => typeof n === 'string' && n.trim() ? n : who.split('@')[0]).catch(() => who.split('@')[0])))()
if (!user) {
await conn.sendMessage(m.chat, { text: "📍  El usuario como tal, no existe en la base de datos." }, { quoted: m })
return
}
let { min, xp } = xpRange(user.level, global.multiplier)
let before = user.level * 1
while (canLevelUp(user.level, user.coin user.exp, global.multiplier)) user.level++
if (before !== user.level) {
let txt = `❤️ \`¡¡Subiste de nivel con exito!!\`
- Si interactuas mas, subiras mas de nivel.
⊸ • ────────────── •

⊸ ✦ *Nivel:* ${before} / ${user.level} *(new)*
⊸ ✦ *Fecha* ${new Date().toLocaleString('id-ID')}
⊸ ✦ *${currency}:* ${user.coin}
⊸ ✦ *${currency2}:* ${user.exp}`;
await conn.sendMessage(m.chat, { text: txt, mentions: conn.parseMention }, { quoted: m })
} else {
let users = Object.entries(global.db.data.users).map(([key, value]) => {
return { ...value, jid: key }
})
let sortedLevel = users.sort((a, b) => (b.level || 0) - (a.level || 0))
let rank = sortedLevel.findIndex(u => u.jid === who) + 1
let txt = `> ¡Hola usuario ${name}, aun no has subido de nivel.
- Juega funciones *rpg* o *game* para recaudar.
⊸ • ────────────── •

⟤ *Nivel:* ${user.level} *(actual)*
⎋ *Interacción:* ${user.commands || "0"}
🜲 *Puesto:* ${rank} de ${sortedLevel.length} en top.

> ⪩ Tienes *${user.exp}* de *${currency2}* y el progreso faltante es ${user.exp - min} > ${xp} (${Math.floor(((user.exp - min) / xp) * 100)}%)`;
await conn.sendMessage(m.chat, { text: txt, mentions: conn.parseMention(txt) }, { quoted: m })
}}

handler.help = ['levelup']
handler.tags = ['rpg']
handler.command = ['nivel', 'lvl', 'level', 'levelup']

export default handler
