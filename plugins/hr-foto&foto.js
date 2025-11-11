import fetch from "node-fetch"

let handler = async (m, { conn }) => {
try {
await conn.sendMessage(m.chat, { text: `Buscando imagenes para compartir, espere unos segundos...` }, { quoted: m })
let data = await (await fetch('https://raw.githubusercontent.com/ShirokamiRyzen/WAbot-DB/main/fitur_db/ppcp.json')).json()
let cita = data[Math.floor(Math.random() * data.length)]
let cowi = await (await fetch(cita.cowo)).buffer()
await conn.sendMessage(m.chat, { image: { url: cowi }, caption: `> Foto para compartir: *Masculino.*` }, m )
let ciwi = await (await fetch(cita.cewe)).buffer()
await conn.sendMessage(m.chat, { image: { url: ciwi }, caption: `> Foto para compartir: *Femenina.*` }, m )
} catch (error) {
await await conn.sendMessage(m.chat, { text: `*[ 📍 ]*  ERROR_COMMAND = Command error, try again and if the error persists, report the command.` }, { quoted: m })
}}

handler.help = ['ppcouple']
handler.tags = ['anime']
handler.command = ['cfoto']

export default handler
