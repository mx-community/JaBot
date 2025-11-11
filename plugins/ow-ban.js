const handler = async (m, { conn, text, usedPrefix, command, args, isROwner }) => {
if (!isROwner) return
const bot = conn.user.jid.split('@')[0]
const users = global.db.data.users
const chats = global.db.data.chats
function no(number) { return number.replace(/\s/g, '').replace(/([@+-])/g, '') }
try {
let mentionedJid = await m.mentionedJid
let who = mentionedJid[0] ? mentionedJid[0] : m.quoted ? await m.quoted.sender : text ? no(text.split(' ')[0]) + '@s.whatsapp.net' : false
switch (command) {
case 'banned': {
if (!who) return conn.sendMessage(m.chat, { text: `Ingrese el comando y mencione a un usuario para banearlo del bot.` }, { quoted: m })
var reason = 'Sin Especificar'
if (mentionedJid && mentionedJid[0]) {
var mentionIdx = args.findIndex(arg => arg.startsWith('@'))
var reasonArgs = args.slice(mentionIdx + 1).join(' ')
if (reasonArgs.trim()) reason = reasonArgs.trim()
} else if (m.quoted) {
if (args.length) reason = args.join(' ')
} else if (text) {
var parts = text.trim().split(' ')
if (parts.length > 1) reason = parts.slice(1).join(' ')
}
if (who === conn.user.jid) return conn.sendMessage(m.chat, { text: `📍  No puedes usar este comando contra el bot.` }, { quoted: m })
if (global.owner.some(function (x) { return who === x[0] + '@s.whatsapp.net' })) {
return conn.sendMessage(m.chat, { text: `📍  No puedes usar este comando con el propietario del bot.` }, { quoted: m })
}
if (!users[who]) users[who] = {}
if (users[who].banned) return conn.sendMessage(m.chat, { text: `📍  El usuario mencionado ya ha sido baneado anteriormente.` }, { quoted: m })
users[who].banned = true
users[who].bannedReason = reason
var nameBan = await conn.getName(who)
await conn.sendMessage(m.chat, { text: `✓  Se ha baneado el usuario mencionado con exito, no podra usar el bot hasta ser desbaneado.` }, { quoted: m })
break
}
case 'unban': {
if (!who) return conn.sendMessage(m.chat, { text: `Ingrese el comando y mencione a un usuario baneado para desbanearlo del bot.` }, { quoted: m })
if (!users[who]) return conn.sendMessage(m.chat, { text: `📍  Lo siento pero el usuario mencionado no esta registrado en la base de datos.` }, { quoted: m })
if (!users[who].banned) return conn.sendMessage(m.chat, { text: `📍  El usuario mencionado no esta baneado.` }, { quoted: m })
users[who].banned = false
users[who].bannedReason = ''
let nameUnban = await conn.getName(who)
await conn.sendMessage(m.chat, { text: `✓  El usuario mencionado fue desbaneado con exito, ahora podra usar el bot.` }, { quoted: m })
break
}
case 'block': {
if (!who) return conn.sendMessage(m.chat, { text: `Ingrese el comando y mencione a un usuario para que el bot bloquee su numero.` }, { quoted: m })
await conn.updateBlockStatus(who, 'block')
conn.sendMessage(m.chat, { text: `✓  El usuario mencionado fue bloqueado del bot, no podra enviar mensajes individuales al bot.` }, { quoted: m })
break
}
case 'unblock': {
if (!who) return conn.sendMessage(m.chat, { text: `Ingrese ` }, { quoted: m })
conn.reply(m.chat, '❀ Por favor, menciona al usuario que quieres desbloquear del número de la Bot.', m)
await m.react('🕒')
await conn.updateBlockStatus(who, 'unblock')
await m.react('✔️')
conn.reply(m.chat, `❀ Desbloqueado correctamente a @${who.split('@')[0]}`, m, { mentions: [who] })
break
}
case 'banlist': {
await m.react('🕒')
const bannedUsers = Object.entries(users).filter(([_, data]) => data.banned)
const bannedChats = Object.entries(chats).filter(([_, data]) => data.isBanned)
const usersList = bannedUsers.map(([jid]) => {
const num = jid.split('@')[0]
return `▢ @${num}`
})
const chatsList = bannedChats.map(([jid]) => {
return `▢ ${jid}`
})
const bannedText = `✦ Usuarios Baneados • Total: ${bannedUsers.length}\n${usersList.join('\n')}\n\n✧ Chats Baneados • Total: ${bannedChats.length}\n${chatsList.join('\n')}`.trim()
const mentions = [...bannedUsers.map(([jid]) => jid), ...bannedChats.map(([jid]) => jid)]
await m.react('✔️')
conn.reply(m.chat, bannedText, m, { mentions })
break
}
case 'blocklist': {
await m.react('🕒')
const blocklist = await conn.fetchBlocklist()
let listText = `≡ *Lista de bloqueados*\n\n*Total :* ${blocklist.length}\n\n┌─⊷\n`
for (const i of blocklist) {
let num = i.split('@')[0]
listText += `▢ @${num}\n`
}
listText += '└───────────'
await m.react('✔️')
conn.reply(m.chat, listText, m, { mentions: blocklist })
break
}}} catch (e) {
await m.react('✖️')
return m.reply(`⚠︎ Se ha producido un problema.\n> Usa *${usedPrefix}report* para informarlo.\n\n` + (e.message || e))
}}

handler.help = ['banned', 'unban', 'block', 'unblock', 'banlist', 'blocklist']
handler.tags = ['mods']
handler.command = ['banned', 'unban', 'block', 'unblock', 'banlist', 'blocklist']

export default handler
