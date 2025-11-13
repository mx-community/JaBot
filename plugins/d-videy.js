import fetch from "node-fetch"
let handler = async (m, { text, conn, args, usedPrefix, command }) => {
if (!args[0]) return conn.sendMessage(m.chat, { text: `Ingrese el comando mas un enlace de un video de *Videy* para descargarlo.` }, { quoted: m });
try {
await conn.sendMessage(m.chat, { text: `Descargando el video, espere un momento...` }, { quoted: m });
let api = await fetch(`https://api.agatz.xyz/api/videydl?url=${args[0]}`)
let json = await api.json()
let { data } = json
await conn.sendMessage(m.chat, { video: { url: data }, caption: `` }, { quoted: m });
} catch (error) {
console.error(error)
await conn.sendMessage(m.chat, { text: `*[ 📍 ]*  ERROR_COMMAND = ${error}` }, { quoted: m });
}
}

handler.command = ['videy', 'dy'];

export default handler
  
