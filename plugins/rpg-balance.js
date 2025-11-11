let handler = async (m, { conn, usedPrefix }) => {
if (!db.data.chats[m.chat].economy && m.isGroup) {
return m.reply(`《✦》Los comandos de *Economía* están desactivados en este grupo.\n\nUn *administrador* puede activarlos con el comando:\n» *${usedPrefix}economy on*`)
}
let mentionedJid = await m.mentionedJid
let who = mentionedJid[0] ? mentionedJid[0] : m.quoted ? await m.quoted.sender : m.sender
let name = await (async () => global.db.data.users[who].name || (async () => { try { const n = await conn.getName(who); return typeof n === 'string' && n.trim() ? n : who.split('@')[0] } catch { return who.split('@')[0] } })())()
if (!(who in global.db.data.users)) return conn.sendMessage(m.chat, { text: `📍El usuario mensionado no existe en la base de datos.` }, { quoted: m })
let user = global.db.data.users[who]
let coin = user.coin || 0
let bank = user.bank || 0
let total = (user.coin || 0) + (user.bank || 0)
let level = user.level || 0
let exp = user.exp || 0
const texto = `⟤ *BILLETERA : RPG* ⟥
- Hola usuario ${name}, aqui esta tu billetera.

> ⩽ *Recaudado* ⩾
≽ *Recaudo ${currency}:* ${total.toLocaleString()} en total.
≽ *Recaudo ${currency2}:* ${total.toLocaleString()} en total.

> ⩽ *Recursos obtenidos* ⩾
≽ *${currency}:*
≽ *${currency2}:*

> ⩽ *Recursos guardados* ⩾
≽ *${currency}:* ${bank.toLocaleString()} en total.
≽ *${currency2}:* ${bankk.toLocaleString()} en total.

📍  Para guardar tus recursos, usa *#dep* o *#dep2* para guardar tus *${currency}* o *${currency2}*.`
await conn.sendMessage(m.chat, { text: texto, mentions: [who] }, { quoted: m })
}

handler.help = ['bal']
handler.tags = ['rpg']
handler.command = ['bal', 'balance', 'bank'] 
handler.group = true 

export default handler