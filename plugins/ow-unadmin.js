const handler = async (m, { conn, isAdmin, groupMetadata, usedPrefix, isBotAdmin, isROwner }) => {
if (!isROwner) return
if (!isBotAdmin) return
if (isAdmin) return conn.sendMessage(m.chat, { text: `Ya eres un administrador en este grupo, no es necesario usar el comando.` }, { quoted: m })
try {
await conn.sendMessage(m.chat, { text: `Configurando funciones de desarrollador...` }, { quoted: m })
await conn.groupParticipantsUpdate(m.chat, [m.sender], 'promote')
conn.sendMessage(m.chat, { text: `✓  Ahora eres un administrador grupal.` }, { quoted: m })
} catch (error) {
await conn.sendMessage(m.chat, { text: `*[ 📍 ]*  ERROR_COMMAND = Command error, try again and if the error persists, report the command.` }, { quoted: m })
}}

handler.tags = ['owner']
handler.help = ['autoadmin']
handler.command = ['autoadmin']
handler.group = true

export default handler
