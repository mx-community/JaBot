
import fetch from 'node-fetch'
const handler = async (m, { text, conn, args, usedPrefix, command }) => {
if (!args[0]) {
return conn.sendMessage(m.chat, { text: `Ingrese el comando mas un enlace de un video de *Facebook* para descargarlo.` }, { quoted: m })
}

try {
await m.react("⏳")

const apiUrl = `https://ruby-core.vercel.app/api/download/facebook?url=${encodeURIComponent(args[0])}`
const res = await fetch(apiUrl)
const json = await res.json()

if (!json.status || !json.download) {
await m.react('⚠️')
return conn.reply(m.chat, `No se pudo obtener el video, verifica el enlace por favor >w<`, m)
}

const { title, description, siteName } = json.metadata
const videoUrl = json.download

const caption = `
ㅤֺㅤ۪ㅤ ׄ＼ㅤ｜ㅤ／ׄㅤִㅤ۫ 
> ꜒📺ᮀ࠘࿑*\`𝐓𝐈𝐓𝐔𝐋𝐎\`*: ${title || 'Sin título'}
> ꜒📝ᮀ࠘࿑*\`𝐃𝐄𝐒𝐂𝐑𝐈𝐏𝐂𝐈𝐎́𝐍\`*: ${description || 'Sin descripción'}
> ꜒🌐ᮀ࠘࿑*\`𝐎𝐑𝐈𝐆𝐄𝐍\`*: ${siteName || 'Facebook'}
> ꜒👩🏻‍💻ᮀ࠘࿑*\`𝐀𝐏𝐈\`*: Ruby Core by Dioneibi
╰┈➤ *Hai~! 💕 Aquí tienes tu video listo, Onee-san~!* 🍰
`.trim()

await conn.sendMessage(m.chat, { video: { url: videoUrl }, caption: `Listo`}, { quoted: m })

} catch (e) {
console.error(e)
await m.react('⚠️')
return conn.reply(m.chat, `Hubo un error al procesar el video >_<`, m)
}
}

handler.help = ['facebook', 'fb']
handler.tags = ['descargas']
handler.command = ['tfacebook', 'tfb']

export default handler
