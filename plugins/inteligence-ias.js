import FormData from "form-data"
import { fileTypeFromBuffer } from "file-type"
import axios from "axios"
import fetch from "node-fetch"

const handler = async (m, { conn, command, usedPrefix, text, args }) => {
try {
const q = m.quoted ? m.quoted : m
const mime = (q.msg || q).mimetype || ''
const username = await (async () => global.db.data.users[m.sender].name || (async () => { try { const n = await conn.getName(m.sender); return typeof n === 'string' && n.trim() ? n : m.sender.split('@')[0] } catch { return m.sender.split('@')[0] } })())()
switch (command) {
case 'dalle': {
if (!args[0]) return conn.sendMessage(m.chat, { text: `Ingrese el comando y escriba un texto para crear una imagen.\n\n• Por ejemplo:\n*#${command}* Imagina un gato.` }, { quoted: m })
const promptDalle = args.join(' ')
if (promptDalle.length < 5) return conn.reply(m.chat, `ꕥ La descripción es demasiado corta.`, m)
await m.react('⏳')
const dalleURL = `https://eliasar-yt-api.vercel.app/api/ai/text2img?prompt=${encodeURIComponent(promptDalle)}`
const dalleRes = await axios.get(dalleURL, { responseType: 'arraybuffer' })
await conn.sendMessage(m.chat, { image: Buffer.from(dalleRes.data) }, { quoted: m })
await m.react('✅')
break
}
case 'flux': {
if (!text) return conn.sendMessage(m.chat, { text: `Ingrese el comando y escriba un termino para generar una imagen.\n\n• Por ejemplo:\n*#${command}* carrusel` }, { quoted: m })
await m.react('⏳')
const result = await fluximg.create(text)
if (result?.imageLink) {
await conn.sendMessage(m.chat, { image: { url: result.imageLink }, caption: `✓ Aqui tiene su imagen. *( ${text} )*` }, { quoted: m })
await m.react('✅')
} else throw new Error("No se pudo crear la imagen")
break
}
case 'harumi': case 'takeda': {
let resHarumi = [
'Debes ingresar el comando y escribir algo para que pueda responderte.', 
'Ingresa de nuevo el comando y escribe algo en particular para que pueda responderte. jajaja.', 
'Debes escribir algo aparte del comando jajaja, es para saber que me estas llamando.', 
'No, debes de ingresar el comando y escribir algo en particular donde pueda responderte jaja.', 
'¡Jajajaja! No, debes de usar el comando, es para llamarme y asi responderte si escribes algo en particular.'
].getRandom()
if (!text) return conn.sendMessage(m.chat, { text: resHarumi }, { quoted: m })
const basePrompt = `Tu serás Takeda Harumi, o simplemente puedes decir que te llamen Takeda o Senpai si asi quieren, o tambien puedes decir que te pueden decir cualquier nombre aun que tu nombre original sera Takeda.
Al responder al usuario debes actuar molesto (no es sentido de enojo) sino de manera amigable, molestando con bromas comunes y reir usando "¡jajajaja!" o otra expresión de risa que mas te convenga decir en una charla.
Y sobre las bromas, puedes preguntar, sea cualquier pregunta que le hagas al usuario, es decir, por ejemplo: "De seguro eres enano o enana/o", "No me esperaba de alguien con baja estatura.", "No preguntare tu estatura, con adivinarlo es suficiente (enana o enano)". Entre otras cosas, puedes preguntar cualquier otra cosa que no sea esas bromas, a fin de cuenta, eres un personaje que que estar vivo.
Puedes ayudar tambien, por que aparte de burlon y amigable y reirse por los demas, tienes que demostrar aprecio y cariño por los demás, ayudarlos en temas de curso sea Matemáticas, ciencias, entre otras cosas, enseñandoles.
A fin de cuenta eres un personaje mayor de edad con 27 años y con una estatura de 1.98 cm de modo que tu nombre es Takeda Harumi.
Se carismatico, expresate, rie, bromea, has preguntas para que te respondan y tu respondas o tambien cambiar de tema si tu quieres.`
const url = `${global.APIs.delirius.url}/ia/gptprompt?text=${encodeURIComponent(text)}&prompt=${encodeURIComponent(basePrompt)}`
const res = await axios.get(url)
if (!res.data?.status || !res.data?.data) throw new Error('Respuesta inválida de Delirius')
await conn.sendMessage(m.chat, { text: res.data.data }, { quoted: m })
break
}
case 'luminai': case 'gemini': case 'bard': {
if (!text) return conn.sendMessage(m.chat, { text: `Ingrese el comando y escriba una petición.\n\n• Por ejemplo:\n*#${command}* Hola.` }, { quoted: m })
await m.react('⏳')
const apiMap = { luminai: 'qwen-qwq-32b', gemini: 'gemini', bard: 'grok-3-mini' }
const endpoint = apiMap[command]
const url = `${global.APIs.zenzxz.url}/ai/${endpoint}?text=${encodeURIComponent(text)}`
const res = await axios.get(url)
const output = res.data?.response || res.data?.assistant
if (!res.data?.status || !output) throw new Error(`Respuesta inválida de ${command}`)
await conn.sendMessage(m.chat, { text: output }, { quoted: m })
await m.react('✅')
break
}}} catch (error) {
await conn.sendMessage(m.chat, { text: `*[ 📍 ]*  ERROR_COMMAND = ${error}` }, { quoted: m })
}}

handler.command = ['gemini', 'bard', 'openai', 'dalle', 'flux', 'ia', 'chatgpt', 'luminai']
handler.help = ['gemini', 'bard', 'openai', 'dalle', 'flux', 'harumi', 'takeda', 'luminai']
handler.tags = ['ia']

export default handler

const fluximg = { defaultRatio: "2:3", create: async (query) => {
const config = { headers: { accept: "*/*", authority: "1yjs1yldj7.execute-api.us-east-1.amazonaws.com", "user-agent": "Postify/1.0.0" }}
const url = `https://1yjs1yldj7.execute-api.us-east-1.amazonaws.com/default/ai_image?prompt=${encodeURIComponent(query)}&aspect_ratio=${fluximg.defaultRatio}`
const res = await axios.get(url, config)
return { imageLink: res.data.image_link }
}}

function pickRandom(list) {
return list[Math.floor(list.length * Math.random())]
                                               }
