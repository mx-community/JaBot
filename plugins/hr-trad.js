import translate from '@vitalets/google-translate-api'
import fetch from 'node-fetch'

const handler = async (m, { args, usedPrefix, command }) => {
const defaultLang = 'es'
if (!args || !args[0]) {
if (m.quoted && m.quoted.text) {
args = [defaultLang, m.quoted.text]
} else {
return conn.sendMessage(m.chat, { text: `Ingrese el comando con el codigo de idioma y el texto a traducir.\n\n• Por ejemplo:\n*#${command}* en Hola` }, { quoted: m })
}}
let lang = args[0]
let text = args.slice(1).join(' ')
if ((args[0] || '').length !== 2) {
lang = defaultLang
text = args.join(' ')
}
try {
const result = await translate(`${text}`, { to: lang, autoCorrect: true })
await conn.sendMessage(m.chat, { text: result.text }, { quoted: m })
conn.reply(m.chat, result.text, m)
} catch (error) {
await conn.sendMessage(m.chat, { text: `📍  No se ha podido traducir el idioma.\n- Esto puede deberse a una falla en la api o un código no existente.` }, { quoted: m })
try {
const lol = await fetch(`https://api.lolhuman.xyz/api/translate/auto/${lang}?apikey=${lolkeysapi}&text=${text}`)
const loll = await lol.json()
const result2 = loll.result.translated
await conn.sendMessage(m.chat, { text: result2 }, { quoted: m })
} catch (error) {
await conn.sendMessage(m.chat, { text: `*[ 📍 ]*  ERROR_COMMAND = Command error, try again and if the error persists, report the command.` }, { quoted: m })
}}}

handler.help = ['translate']
handler.tags = ['tools']
handler.command = ['traducir', 'trad']

export default handler