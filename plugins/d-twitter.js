import fetch from 'node-fetch';
let handler = async (m, { conn, usedPrefix, command, args }) => {
if (!args[0]) return m.reply(`❪ ✎ › Ingrese el comando mas un enlace de un video o imagen de Twitter para descargarlo.`)
try {
let api = await fetch(`https://deliriussapi-oficial.vercel.app/download/twitterdl?url=${args[0]}`)
let json = await api.json()
let { type, media, info } = json
let { text, date, user_name, user_profile_image_url, likes, retweets, tweetURL } = info
let mbmd = `
۰─۰ ⧠ ${text}
⪧ *Usuario:* ${user_name}
⪧ *Enlace:* ${tweetURL}`
if (type === 'video') {
await conn.sendFile(m.chat, media[0].url, 'video.mp4', mbmd, m);
} else if (type === 'image') {
for (let i = 0; i < media.length; i++) {
await conn.sendFile(m.chat, media[i].url, `image${i + 1}.jpeg`, `*Imagen ${i + 1}*`, m);
}}
await conn.sendFile(m.chat, user_profile_image_url, 'profile.jpg', `Perfil ${user_name}`, m);
} catch (error) {
console.error(error)
}}
handler.command = /^(twitter|tw)$/i
export default handler
