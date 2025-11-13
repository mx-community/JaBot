import { makeWASocket } from '@whiskeysockets/baileys'

const handler = async (m, { conn, args, text, command, usedPrefix }) => {
try {
switch (command) {
case 'g-foto': case 'g-img': {
const q = m.quoted || m
const mime = (q.msg || q).mimetype || ''
if (!/image\/(png|jpe?g)/.test(mime)) return conn.sendMessage(m.chat, { text: `Ingrese el comando y responda a una imagen para cambiar el perfil grupal.` }, { quoted: m })
const img = await q.download()
if (!img) return conn.sendMessage(m.chat, { text: `📍  Solo puedes responder a una imagen, nada de videos, textos, stickers o audios.` }, { quoted: m })
await m.react('⏳')
await conn.updateProfilePicture(m.chat, img)
await m.react('✅')
conn.sendMessage(m.chat, { text: `✓  Se ha cambiado la foto de perfil con exito.` }, { quoted: m })
break
}
case 'g-desc': {
if (!args.length) return conn.sendMessage(m.chat, { text: `Ingrese el comando y escriba la descripción grupal para configurarla.\n\n• Por ejemplo:\n*#${command}* Nueva descripción grupal.` }, { quoted: m })
await m.react('⏳')
await conn.groupUpdateDescription(m.chat, args.join(' '))
await m.react('✅')
conn.sendMessage(m.chat, { text: `✓  Se ha configurado la descripción grupal con exito.\n- Los cambios puedes verlo en la descripción grupal.` }, { quoted: m })
break
}
case 'g-name': case 'g-nombre': {
if (!text) return conn.sendMessage(m.chat, { text: `Ingrese el comando y escriba el nuevo nombre del chat grupal.\n\n• Por ejemplo:\n*#${command}* Chat grupal.` }, { quoted: m })
await m.react('⏳')
await conn.groupUpdateSubject(m.chat, text)
await m.react('✅')
conn.sendMessage(m.chat, { text: `✓  Se ha configurado el chat grupal con exito.` }, { quoted: m })
break
}}} catch (e) {
await conn.sendMessage(m.chat, { text: `*[ 📍 ]*  ERROR_COMMAND = ${e}` }, { quoted: m })
}}

handler.help = ['g-foto', 'g-img', 'g-desc', 'g-name', 'g-nombre']
handler.tags = ['grupos']
handler.command = ['g-foto', 'g-img', 'g-desc', 'g-name', 'g-nombre']
handler.group = true
handler.admin = true
handler.botAdmin = true

export default handler

  
