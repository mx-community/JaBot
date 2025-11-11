import ws from 'ws'

const handler = async (m, { conn }) => {
const subBots = [...new Set([...global.conns.filter((conn) => conn.user && conn.ws.socket && conn.ws.socket.readyState !== ws.CLOSED).map((conn) => conn.user.jid)])]
if (global.conn?.user?.jid && !subBots.includes(global.conn.user.jid)) {
subBots.push(global.conn.user.jid)
}
const chat = global.db.data.chats[m.chat]
const mentionedJid = await m.mentionedJid
const who = mentionedJid[0] ? mentionedJid[0] : m.quoted ? await m.quoted.sender : false
if (!who) return conn.sendMessage(m.chat, { text: `Ingrese el comando y menciona a un bot (servidor) para ponerlo como principal en el grupo.` }, { quoted: m });
if (!subBots.includes(who)) return conn.sendMessage(m.chat, { text: `📍  Los datos no coinciden, el usuario mencionado no es un bot de la comunidad mx.` }, { quoted: m });
if (chat.primaryBot === who) {
return conn.sendMessage(m.chat, { text: `✓  El bot @${who.split`@`[0]} ahora es el principal en este chat grupal.`, mentions: [who] }, { quoted: m });
}
try {
chat.primaryBot = who
conn.sendMessage(m.chat, { text: `✓  Todos los comandos solo funcionaran con el bot @${who.split`@`[0]}.\n- Se ha establecido el bot como primario en este grupo.`, mentions: [who] }, { quoted: m });
} catch (e) {
await conn.sendMessage(m.chat, { text: `*[ 📍 ]*  ERROR_COMMAND = Command error, try again and if the error persists, report the command.` }, { quoted: m })
}}

handler.help = ['setprimary']
handler.tags = ['group']
handler.command = ['setprim']
handler.group = true
handler.admin = true

export default handler