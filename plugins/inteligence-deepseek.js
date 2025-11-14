import axios from 'axios'

const handler = async (m, {conn, text, usedPrefix, command}) => {
if (!text) return conn.sendMessage(m.chat, { text: `Ingrese el comando y escriba un texto para obtener una respuesta.\n\n• Por ejemplo:\n*#${command}* Hola, como estas.` }, { quoted: m })
try {
await m.react("⏳")
let {data} = await axios.get(`https://archive-ui.tanakadomp.biz.id/ai/deepseek?text=${encodeURIComponent(text)}`)
await conn.sendMessage(m.chat, { text: data?.result || "No se xd." }, { quoted: m })
await m.react("👋🏻")
} catch (e) {
await conn.sendMessage(m.chat, { text: `*[ 📍 ]*  ERROR_COMMAND = ${e}` }, { quoted: m })
}
}

handler.command = /^(dps|seek)$/i
export default handler
