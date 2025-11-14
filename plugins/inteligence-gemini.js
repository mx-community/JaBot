import fetch from 'node-fetch'
var handler = async (m, {text, usedPrefix, command}) => {
if (!text) conn.sendMessage(m.chat, { text: `Ingrese el comando y escriba cualquier texto para tener una respuesta.\n\n• Por ejemplo:\n*#${command}* Hola, como estas.` }, { quoted: m })
try {
conn.sendPresenceUpdate('composing', m.chat)
var apii = await fetch(`https://apis-starlights-team.koyeb.app/starlight/gemini?text=${text}`)
var res = await apii.json()
await conn.sendMessage(m.chat, { text: res.result }, { quoted: m })
} catch (e) {
await conn.sendMessage(m.chat, { text: `*[ 📍 ]*  ERROR_COMMAND = ${e}` }, { quoted: m })
console.log(e)
}
}
handler.command = ['bard', 'gemini']
handler.help = ['bard', 'gemini']
handler.tags = ['herramientas']

export default handler
