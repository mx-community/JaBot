import fs from 'fs'
import path from 'path'

var handler = async (m, { usedPrefix, command }) => {
try {
await conn.sendMessage(m.chat, { text: `Buscando errores en los archivos plugins...` }, { quoted: m })
conn.sendPresenceUpdate('composing', m.chat)
const pluginsDir = './plugins'
const files = fs.readdirSync(pluginsDir).filter(file => file.endsWith('.js'))
let response = `📍  *Plugins erroneos encontrados:*\n\n`
let hasErrors = false
for (const file of files) {
try {
await import(path.resolve(pluginsDir, file))
} catch (error) {
hasErrors = true
response += `[ ${file} ] = ERROR:\n> ${error.message}\n\n`
}}
if (!hasErrors) {
response += '✓  No se han encontrado plugins dañinos.'
}
await conn.sendMessage(m.chat, { text: response }, { quoted: m })
} catch (err) {
await conn.sendMessage(m.chat, { text: `*[ 📍 ]*  ERROR_COMMAND = Command error, try again and if the error persists, report the command.` }, { quoted: m })
}}

handler.command = ['syntax']
handler.help = ['syntax']
handler.tags = ['tools']
handler.owner = true

export default handler
