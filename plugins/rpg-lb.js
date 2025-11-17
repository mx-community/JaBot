import { xpRange } from '../lib/levelling.js'

let handler = async (m, { conn, args }) => {
let users = Object.entries(global.db.data.users).map(([key, value]) => ({ ...value, jid: key }))
let sorted = users.sort((a, b) => (b.exp || 0) - (a.exp || 0))
const page = Math.max(1, Math.min(parseInt(args[0]) || 1, Math.ceil(sorted.length / 10)))
const startIndex = (page - 1) * 10
const endIndex = startIndex + 10
let text = `·─┄ · ✦ *Top : Usuarios* ✦ ·\n\n`
const slice = sorted.slice(startIndex, endIndex)
for (let i = 0; i < slice.length; i++) {
const { jid, exp, level, coin } = slice[i]
let name = await (async () => global.db.data.users[jid].name || (async () => { try { const n = await conn.getName(jid); return typeof n === 'string' && n.trim() ? n : jid.split('@')[0] } catch { return jid.split('@')[0] } })())()
text += `🜲 *Usuario ${startIndex + i + 1}:* @${name}\n`
text += `⛁ *${currency}:* ${coin.toLocaleString()}\n`
text += `⛁ *${currency2}:* ${exp.toLocaleString()}\n`
text += `ᗢ *LVL:* ${level}\n\n`
}
text += `> Pagina *${page}* entre *${Math.ceil(sorted.length / 10)}*`
if (page < Math.ceil(sorted.length / 10)) text += `\n- Ingrese el comando *#lb ${page + 1}* para ver la siguiente pagina.`
await conn.reply(m.chat, text.trim(), m, { mentions: conn.parseMention(text) })
}

handler.help = ['lboard']
handler.tags = ['rpg']
handler.command = ['lboard', 'topex', 'lb']
handler.group = true

export default handler

