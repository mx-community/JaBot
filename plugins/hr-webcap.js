import fetch from 'node-fetch'

let handler = async (m, { conn, command, args, usedPrefix }) => {
if (!args[0]) return conn.sendMessage(m.chat, { text: `Ingrese el comando mas un enlace de cualquier pagina web para tomarle una captura.` }, { quoted: m })
try {
await conn.sendMessage(m.chat, { text: `Obteniendo resultados, espere un momento...` }, { quoted: m })
let ss = await (await fetch(`https://image.thum.io/get/fullpage/${args[0]}`)).buffer()
conn.sendMessage(m.chat, { image: { url: ss }, caption: `` }, { quoted: m })
} catch (error) {
await conn.sendMessage(m.chat, { text: `*[ 📍 ]*  ERROR_COMMAND = Command error, try again and if the error persists, report the command.` }, { quoted: m })
}}

handler.help = ['ssweb', 'ss']
handler.tags = ['tools']
handler.command = ['ssweb', 'ss']

export default handler