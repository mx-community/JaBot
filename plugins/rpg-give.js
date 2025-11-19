import moment from 'moment-timezone'
import fetch from 'node-fetch'
async function handler(m, { conn, args, usedPrefix, command }) {
if (!db.data.chats[m.chat].economy && m.isGroup) {
return conn.sendMessage(m.chat, { text: `⦗ ᗢ ⦘ El comando *${usedPrefix + command}* está desactivado en este grupo.\n- Activalo si eres admin de la siguiente manera.\n\n• Por ejemplo:\n*${usedPrefix}rpg on*` }, { quoted: m })
}

let d = new Date(new Date + 3600000)
let hora = `${moment.tz('America/Buenos_Aires').format('HH:mm:ss')}`
let fecha = d.toLocaleDateString('es', {day: 'numeric', month: 'numeric', year: 'numeric'})

let mentionedJid = await m.mentionedJid
const who = m.quoted ? await m.quoted.sender : (mentionedJid && mentionedJid[0]) || (args[1] ? (args[1].replace(/[@ .+-]/g, '') + '@s.whatsapp.net') : '')   
if (!args[0]) return conn.sendMessage(m.chat, { text: `Ingrese el comando y la cantidad de *${currency}* mas en mencionar a un usuario.\n\n• Por ejemplo:\n*#${command}* 30000 @tag` }, { quoted: m })
if (!isNumber(args[0]) && args[0].startsWith('@')) return conn.sendMessage(m.chat, { text: `📍  Debe proporcionar una cantidad valida para regalar y menciona a un usuario.\n\n• Por ejemplo:\n*#${command}* 30000 @tag` }, { quoted: m })
if (!who) return conn.sendMessage(m.chat, { text: `📍  Usuario faltante, debes mencionar a un usuario.\n\n• Por ejemplo:\n*#${command}* 35000 @tag` }, { quoted: m })
if (!(who in global.db.data.users)) return conn.sendMessage(m.chat, { text: `📍  El usuario no esta en la base de datos para regalar tus recursos.` }, { quoted: m })
let user = global.db.data.users[m.sender]
let recipient = global.db.data.users[who]
let count = Math.min(Number.MAX_SAFE_INTEGER, Math.max(10, (isNumber(args[0]) ? parseInt(args[0]) : 10)))
if (typeof user.coin !== 'number') user.coin = 0
if (user.coin < count) return conn.sendMessage(m.chat, { text: `📍  No tienes esa cantidad de *${currency}* para regalar.\n- Solo dispones de *${user.coin}* de *${currency}*.` }, { quoted: m })
user.coin -= count
if (typeof recipient.coin !== 'number') recipient.coin = 0
recipient.coin += count   
if (isNaN(user.coin)) user.coin = 0
let name = await (async () => global.db.data.users[who].name || (async () => { try { const n = await conn.getName(who); return typeof n === 'string' && n.trim() ? n : who.split('@')[0] } catch { return who.split('@')[0] } })())()
let exitoso = `·─┄ · ✦ *Regalar : ${currency}* ✦ ·
\t𝇈 📍 \`\`\`Transferencia exitosa.\`\`\`

\t\t⚶ *Destinario :* @${name}
\t\t⚶ *Cantidad :* ${count.toLocaleString()} ${currency}
\t\t⚶ *Fecha :* ${fecha}
\t\t⚶ *Hora :* ${hora} (argentina)


> ${textbot}`
const thumb = Buffer.from(await (await fetch(`${global.rpgPay}`)).arrayBuffer())
await conn.sendMessage(m.chat, { text: exitoso, mentions: [who], contextInfo: { externalAdReply: { 
title: "⚶  G I V E  :  P A Y  ⚶", 
body: null, 
thumbnail: thumb, 
sourceUrl: null, 
mediaType: 1, renderLargerThumbnail: false }}}, { quoted: m })
}

handler.help = ['pay']
handler.tags = ['rpg']
handler.command = ['give']
handler.group = true

export default handler

function pickRandom(list) {
return list[Math.floor(Math.random() * list.length)]
}

function isNumber(x) {
return !isNaN(x)
}

global.rpgPay = ["https://qu.ax/yQwHe.jpg", "https://qu.ax/EsUSJ.jpg", "https://qu.ax/ONGix.jpg"].getRandom()
                                                                                                                                                                                                                    
