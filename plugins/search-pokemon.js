import fetch from 'node-fetch'

let handler = async (m, { conn, text, command, usedPrefix }) => {
try {
if (!text) return conn.sendMessage(m.chat, { text: `Ingrese el comando y escriba el nombre de algun pokemon para buscarlo.\n\n• Por ejemplo:\n*#${command}* Pikachu` }, { quoted: m })
const url = `https://some-random-api.com/pokemon/pokedex?pokemon=${encodeURIComponent(text)}`
await conn.sendMessage(m.chat, { text: `Buscando resultados, espere un momento...` }, { quoted: m })
const response = await fetch(url)
const json = await response.json()
if (!response.ok) return conn.sendMessage(m.chat, { text: `📍  No se han encontrado resultados de la búsqueda.\n- Recuerde que debe esta bien escrito y inténtelo de nuevo.` }, { quoted: m })
const aipokedex = `·─┄ · ✦ *Pokemon : Search* ✦ ·

• *Nombre:* ${json.name}\n
• *ID:* ${json.id}
• *Tipo:* ${json.type}
• *Habilidades:* ${json.abilities}
• *Tamaño:* ${json.height}
• *Peso:* ${json.weight}


📍  *Descripción:* ${json.description}`
await conn.sendMessage(m.chat, { text: aipokedex }, { quoted: m })
} catch (error) {
await conn.sendMessage(m.chat, { text: `*[ 📍 ]*  ERROR_COMMAND = Command error, try again and if the error persists, report the command.` }, { quoted: m })
}}

handler.help = ['pokedex']
handler.tags = ['fun']
handler.command = ['pokedex', 'pokex']

export default handler
