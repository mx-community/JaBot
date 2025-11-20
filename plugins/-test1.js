import fetch from 'node-fetch'
let handler = async (m, { conn, text, usedPrefix, command }) => {
if (!text) return conn.sendMessage(m.chat, { text: `Ingrese el comando y escriba cualquier cosa para hablar con *BlackBox*.\n\n• *Por ejemplo:*\n${usedPrefix + command} Hola ¿Como estas?` }, { quoted: m })
await m.react('⏳')
try {
let api = await fetch(`https://apis-starlights-team.koyeb.app/starlight/blackbox?system=Eres+una+ai+llamada+blackbox&text=${text}`)
let json = await api.json()
if (json.results) {
await conn.sendMessage(m.chat, { text: json.results }, { quoted: m })
} else {
await conn.sendMessage(m.chat, { text: `No se ha podido conectar con *BlackBox*, intentelo de nuevo mas tarde.`}, { quoted: m })
}
} catch {
await conn.sendMessage(m.chat, { text: `*[ 📍 ]*  ERROR_COMMAND = Command error, try again and if the error persists, report the command.` }, { quoted: m })
}
}
handler.command = ['blackbox', 'ia-box']
export default handler
 
