import axios from "axios"
const handler = async (m, { conn, command, usedPrefix, text, args }) => {

if (!args[0]) return conn.sendMessage(m.chat, { text: `Ingrese el comando y escriba un texto para crear una imagen.\n\n• Por ejemplo:\n*#${command}* Imagina un gato.` }, { quoted: m })
const promptDalle = args.join(' ')
if (promptDalle.length < 5) return conn.sendMessage(m.chat, { text: `📍  La descripción es demasiado corta, mínimo deben tener 10 características.` }, { quoted: m })
await m.react('⏳')
const dalleURL = `https://eliasar-yt-api.vercel.app/api/ai/text2img?prompt=${encodeURIComponent(promptDalle)}`
const dalleRes = await axios.get(dalleURL, { responseType: 'arraybuffer' })
await conn.sendMessage(m.chat, { image: Buffer.from(dalleRes.data) }, { quoted: m })
await m.react('✅')
}

handler.command = ["dalle"]
export default handler
