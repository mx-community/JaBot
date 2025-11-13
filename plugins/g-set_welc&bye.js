import fetch from 'node-fetch'
import fs from 'fs'
import { generarBienvenida, generarDespedida } from './_fc-welcome.js'

const handler = async (m, { conn, command, usedPrefix, text, groupMetadata }) => {
const value = text ? text.trim() : ''
const chat = global.db.data.chats[m.chat]
let usoWelcome = `*#${command}* Hola {usuario}, bienvenido al grupo {group}, por favor lea descripción del grupo: {desc}`
let usoBye = `*#${command}* El usuario {usuario} se ha retirado del grupo {group}, esperamos y se encuentre bien.`
if (command === 'grupo?') {
let categoriasXd = `📍  Seleccione la categoria que desee editar.
- Puede observar en esta lista.

> ⩽ *Edición basica* ⩾
⊹ ✎  *#g-img*  <reply>
⊹ ✎  *#g-name*  <text>
⊹ ✎  *#g-desc*  <text>

> ⩽ *Edición de fuente* ⩾
⊹ ✎  *#setwelcome*  <text>
⊹ ✎  *#t-welcome*  
⊹ ✎  *#setbye*  <text>
⊹ ✎  *#t-bye*  `
return conn.sendMessage(m.chat, { text: categoriasXd.trim() }, { quoted: m })
}

try {
switch (command) {

case 'setwelcome': {
if (!value)
return conn.sendMessage(m.chat, { text: `Ingrese el comando y escriba la nueva bienvenida para dar a los usuarios nuevos.\n\n• Por ejemplo:\n${usoWelcome}` }, { quoted: m })
chat.sWelcome = value
conn.sendMessage(m.chat, { text: `✓  Se ha modificado con exito la bienvenida grupal.` }, { quoted: m })
break
}

case 'setbye': {
if (!value)
return conn.sendMessage(m.chat, { text: `Ingrese el comando y escriba la nueva despedida grupal para darle a los usuarios.\n\n• Por ejemplo:\n${usoBye}` }, { quoted: m })
chat.sBye = value
conn.sendMessage(m.chat, { text: `✓  Se ha configurado con exito la despedida grupal.` }, { quoted: m })
break
}

case 't-welcome': {
if (!chat.sWelcome) return conn.sendMessage(m.chat, { text: `📍  No hay una prueba de bienvenida establecida.\n- Use el comando *#setwelcome* para editar.` }, { quoted: m })
const { pp: ppWel, caption: captionWel, username } = await generarBienvenida({
conn,
userId: m.sender,
groupMetadata,
chat
})

await conn.sendMessage(m.chat, {
image: { url: ppWel },
caption: captionWel,
mentions: [m.sender]
}, { quoted: m })
break
}

case 't-bye': {
if (!chat.sBye) return conn.sendMessage(m.chat, { text: `📍  No hay una prueba de despedida establecida.\n- Use el comando *#setbye* para editar.` }, { quoted: m })
const { pp: ppBye, caption: captionBye, username } = await generarDespedida({
conn,
userId: m.sender,
groupMetadata,
chat
})

await conn.sendMessage(m.chat, {
image: { url: ppBye },
caption: captionBye,
mentions: [m.sender]
}, { quoted: m })
break
}
}

} catch (e) {
await conn.sendMessage(m.chat, { text: `*[ 📍 ]*  ERROR_COMMAND = ${e}` }, { quoted: m })
}
}

handler.help = ['setwelcome  <text>', 'setbye  <text>', 't-welcome', 't-bye', 'grupo?']
handler.tags = ['grupos']
handler.command = ['grupo?', 'setwelcome', 'setbye', 't-welcome', 't-bye']
handler.admin = true
handler.group = true

export default handler
