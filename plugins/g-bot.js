let handler = async (m, { conn, usedPrefix, command, args }) => {
let chat = global.db.data.chats[m.chat]
if (command === 'chat') {
if (args.length === 0) {
const estado = chat.isBanned ? '✗ Desactivado' : '✓ Activado'
return conn.sendMessage(m.chat, { text: `📍  Un administrador debe activar o desactivar esta funcion con el comando *#${command} on* o *#${command} off*.` }, { quoted: m })
}
if (args[0] === 'off') {
if (chat.isBanned) {
return conn.sendMessage(m.chat, { text: `📍  El bot ya esta desactivado.` }, { quoted: m })
}
chat.isBanned = true
return conn.sendMessage(m.chat, { text: `✓  Se ha desactivado el bot.` }, { quoted: m })
} else if (args[0] === 'on') {
if (!chat.isBanned) {
return conn.sendMessage(m.chat, { text: `📍  El bot ya esta activado.` }, { quoted: m })
}
chat.isBanned = false
return conn.sendMessage(m.chat, { text: `✓  Se ha activado el bot.` }, { quoted: m })
}}}

handler.help = ['chat  <on/off>']
handler.tags = ['grupos']
handler.command = ['chat']
handler.admin = true

export default handler
