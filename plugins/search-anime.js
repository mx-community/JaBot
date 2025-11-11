import fetch from 'node-fetch'

var handler = async (m, { conn, usedPrefix, command, text }) => {
if (!text) return conn.sendMessage(m.chat, { text: `Ingrese el comando mas el titulo del anime que desea buscar información.\n\n• Por ejemplo:\n*#${command}* Kimetsu no yaiba` }, { quoted: m })
try {
await conn.sendMessage(m.chat, { text: `Buscando resultados, espere un momento...` }, { quoted: m })
let res = await fetch('https://api.jikan.moe/v4/manga?q=' + text)
if (!res.ok) {
return conn.sendMessage(m.chat, { text: `📍 No se han encontrado resultados de su búsqueda.\n- Verifique si esta bien escrito y intentalo de nuevo.` }, { quoted: m })
}
let json = await res.json()
let { chapters, title_japanese, url, type, score, members, background, status, volumes, synopsis, favorites } = json.data[0]
let authorr = json.data[0].authors[0].name
let animeingfo = `
·─┄ · ✦ *Anime : Search* ✦ ·
- Resultados encontrados de *${title_japanese}*.

*Capítulo:* ${chapters}
*Transmisión:* ${type}
*Estado:* ${status}
*Volumes:* ${volumes}
*Favorito:* ${favorites}
*Puntaje:* ${score}
*Miembros:* ${members}
*Autor:* ${author}
*Fondo:* ${background}
*Sinopsis:* ${synopsis}
*Url:* ${url}` 
await conn.sendMessage(m.chat, { text: animeingfo, contextInfo: { externalAdReply: { 
title: title_japanese, 
body: authorr, 
thumbnail: json.dara[0].images.jpg.image_url, 
sourceUrl: null, 
mediaType: 1, renderLargerThumbnail: true }}}, { quoted: m })

} catch (error) {
await conn.sendMessage(m.chat, { text: `*[ 📍 ]*  ERROR_COMMAND = Command error, try again and if the error persists, report the command.` }, { quoted: m })
}}

handler.help = ['infoanime'] 
handler.tags = ['anime']
handler.command = ['infoanime', 'aninfo]

export default handler
