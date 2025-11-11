import fetch from 'node-fetch'

let handler = async (m, { text, usedPrefix, args, command }) => {
if (!text) return conn.sendMessage(m.chat, { text: `Ingrese el comando y escriba lo que quiera buscar en Google.\n\n• Por ejemplo:\n*#${command}* Arboles.` }, { quoted: m })
const apiUrl = `${global.APIs.delirius.url}/search/googlesearch?query=${encodeURIComponent(text)}`
let maxResults = Number(args[1]) || 3
try {
await conn.sendMessage(m.chat, { text: `Buscando resultados, espere un momento...` }, { quoted: m })
const response = await fetch(apiUrl)
if (!response.ok) throw new Error('No se pudo conectar con la API')
const result = await response.json()
if (!result.status || !Array.isArray(result.data) || !result.data.length) {
return conn.sendMessage(m.chat, { text: `📍  No se han encontrado resultados en la búsqueda.` }, { quoted: m })
}
let replyMessage = `·─┄ · ✦ *Google : Search* ✦ ·\n\n`
result.data.slice(0, maxResults).forEach((item, index) => {
replyMessage += `❒ \`Título:\` *${index + 1}. ${item.title || 'Sin título'}*\n`
replyMessage += `✐︎ \`Descripción:\` ${item.description ? `*${item.description}*` : '_Sin descripción_'}\n`
replyMessage += `ᗢ \`URL:\` ${item.url || '_Sin url_'}\n\n`})
await 
m.reply(replyMessage.trim())
} catch (error) {
await conn.sendMessage(m.chat, { text: `*[ 📍 ]*  ERROR_COMMAND = Command error, try again and if the error persists, report the command.` }, { quoted: m })
}}

handler.help = ['google']
handler.command = ['google']

export default handler