import fetch from 'node-fetch'
let handler = async (m, { conn, usedPrefix, command }) => {
if (!db.data.chats[m.chat].economy && m.isGroup) {
return conn.sendMessage(m.chat, { text: `⦗ ᗢ ⦘ El comando *${usedPrefix + command}* está desactivado en este grupo.\n- Activalo si eres admin de la siguiente manera.\n\n• Por ejemplo:\n*${usedPrefix}rpg on*` }, { quoted: m })
}
const thumb = Buffer.from(await (await fetch(`${global.mMages}`)).arrayBuffer())
let mentionedJid = await m.mentionedJid
let who = mentionedJid[0] ? mentionedJid[0] : m.quoted ? await m.quoted.sender : m.sender
let name = await (async () => global.db.data.users[who].name || (async () => { try { const n = await conn.getName(who); return typeof n === 'string' && n.trim() ? n : who.split('@')[0] } catch { return who.split('@')[0] } })())()
if (!(who in global.db.data.users)) return conn.sendMessage(m.chat, { text: `📍El usuario mensionado no existe en la base de datos.` }, { quoted: m })
let user = global.db.data.users[who]
let coin = user.coin || 0
let bank = user.bank || 0
let bankk = user.bankk || 0
let total = (user.coin || 0) + (user.bank || 0)
let total2 = (user.exp || 0) + (user.bankk || 0)
let level = user.level || 0
let exp = user.exp || 0
const texto = `- Hola usuario *@${name}*, aqui esta tu billetera.

> ⩽ *Recursos obtenidos* ⩾
≽ *${currency}:* ${coin.toLocaleString()}
≽ *${currency2}:* ${exp.toLocaleString()}

> ⩽ *Recursos guardados* ⩾
≽ *${currency}:* ${bank.toLocaleString()} en total.
≽ *${currency2}:* ${bankk.toLocaleString()} en total.

> ⩽ *Recaudado* ⩾
≽ *Recaudo ${currency}:* ${total.toLocaleString()} en total.
≽ *Recaudo ${currency2}:* ${total2.toLocaleString()} en total.

📍  Para guardar tus recursos, usa *#dep* o *#dep2* para guardar tus *${currency}* o *${currency2}*.`
await conn.sendMessage(m.chat, { text: texto, mentions: [who], contextInfo: { externalAdReply: { 
title: botname, 
body: "々 W A L L E T : B A L 々", 
thumbnail: thumb, 
sourceUrl: null, 
mediaType: 1, renderLargerThumbnail: false }}}, { quoted: m })

  //conn.sendMessage(m.chat, { text: texto, mentions: [who] }, { quoted: m })
}

handler.help = ['bal']
handler.tags = ['rpg']
handler.command = ['bal', 'balance', 'bank', 'wallet'] 
handler.group = true 

export default handler
