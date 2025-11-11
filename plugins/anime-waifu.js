import fetch from 'node-fetch'

let handler = async (m, { conn, usedPrefix, command }) => {
try {
await m.react('⏳')
let res = await fetch('https://api.waifu.pics/sfw/waifu')
if (!res.ok) return
let json = await res.json()
if (!json.url) return
await conn.sendMessage(m.chat, { image: { url:  }, caption: `·─┄ · ✦ *Anime : Waifu* ✦ ·` }, { quoted: m })
} catch (error) {
await await conn.sendMessage(m.chat, { text: `*[ 📍 ]*  ERROR_COMMAND = Command error, try again and if the error persists, report the command.` }, { quoted: m })
}}

handler.help = ['waifu']
handler.tags = ['anime']
handler.command = ['waifu']

export default handler
