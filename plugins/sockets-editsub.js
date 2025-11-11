import fetch from 'node-fetch'
import Jimp from 'jimp'

const handler = async (m, { conn, command, usedPrefix, text }) => {
const isSubBots = [conn.user.jid, ...global.owner.map(([number]) => `${number}@s.whatsapp.net`)].includes(m.sender)
if (!isSubBots) return conn.sendMessage(m.chat, { text: `📍  Solo puedes usar este comando con tu servidor.\n- Es decir, con el número vinculado al bot para editarlo tu mismo.` }, { quoted: m })
try {
const value = text ? text.trim() : ''
switch (command) {
case 's-foto': case 's-img': {
const q = m.quoted || m
const mime = (q.msg || q).mimetype || ''
if (!/image\/(png|jpe?g)/.test(mime)) return conn.sendMessage(m.chat, { text: `Ingrese el comando y responda a una imagen para cambiar la foto de perfil de tu servidor.` }, { quoted: m })
const media = await q.download()
if (!media) return conn.sendMessage(m.chat, { text: `📍  Debes responder a una imagen, nada de videos, stickers o textos.` }, { quoted: m })
const image = await Jimp.read(media)
const buffer = await image.getBufferAsync(Jimp.MIME_JPEG)
await conn.updateProfilePicture(conn.user.jid, buffer)
conn.sendMessage(m.chat, { text: `✓  Se ha configurado la foto de perfil del servidor con exito.` }, { quoted: m })
break
}
case 's-bio': case 's-desc': {
if (!text) return conn.sendMessage(m.chat, { text: `Ingrese el comando y escriba la biografía del servidor para configurarlo.` }, { quoted: m })
await conn.updateProfileStatus(text)
conn.sendMessage(m.chat, { text: `✓  Se ha configurado la biografía del servidor con exito.` }, { quoted: m })
break
}
case 's-name': case 's-nombre': {
if (!value) return conn.sendMessage(m.chat, { text: `Ingrese el comando y escriba el nuevo nombre para cambiar el nombre del servidor.` }, { quoted: m })
conn.reply(m.chat, '❀ Ingresa el nuevo nombre de usuario que deseas establecer.', m)
if (value.length < 3 || value.length > 25)
return conn.reply(m.chat, 'ꕥ El nombre debe tener entre 3 y 25 caracteres.')
await conn.updateProfileName(value)
m.reply(`❀ Se cambió el nombre de usuario a *${value}* correctamente.`)
break
}}} catch (error) {
await conn.sendMessage(m.chat, { text: `*[ 📍 ]*  ERROR_COMMAND = Command error, try again and if the error persists, report the command.` }, { quoted: m })
}}

handler.help = ['setpfp', 'setimage', 'setstatus', 'setbio', 'setusername', 'setuser']
handler.tags = ['socket']
handler.command = ['setpfp', 'setimage', 'setstatus', 'setbio', 'setusername', 'setuser']

export default handler
