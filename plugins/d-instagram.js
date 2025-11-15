import fetch from 'node-fetch'
let handler = async (m, { conn, usedPrefix, command, args }) => {
if (!args[0]) return conn.sendMessage(m.chat, { text: `Ingrese el comando mas un enlace de un video de *Instagram* para descargarlo.` }, { quoted: m })
try {
let api = await fetch(`https://deliriussapi-oficial.vercel.app/download/instagram?url=${args[0]}`)
let json = await api.json()
let { data } = json
let mbmd = data
for (let i = 0; i < mbmd.length; i++) {
let HFC = mbmd[i];
if (HFC.type === "image") {
await conn.sendMessage(m.chat, { image: { url: HFC.url } }, { quoted: m })
} else if (HFC.type === "video") {
await conn.sendMessage(m.chat, { video: { url: HFC.url } }, { quoted: m })
}}
} catch (error) {
console.error(error)
await conn.sendMessage(m.chat, { text: `*[ 📍 ]*  ERROR_COMMAND = ${error}` }, { quoted: m })
}}
handler.command = ["instagram", "ig"]
export default handler


