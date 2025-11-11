/*
FUNCION BETA, UN TEST DE COMANDO MANEJADO CON ARGS.
Para que las funciones solo funcionen en un comando.
Evitando el tedioso cambio de nombre por cada comando.
*/

import { makeWASocket } from '@whiskeysockets/baileys'
import fs from 'fs'
import { generarBienvenida, generarDespedida } from './_fc-welcome.js'

const handler = async (m, { conn, args, text, command, usedPrefix }) => {

const value = text ? text.trim() : ''
const chat = global.db.data.chats[m.chat]
let isClose = { 'open': 'not_announcement', 'abrir': 'not_announcement', 'close': 'announcement', 'cerrar': 'announcement', }[command]

if (args[0] === "nombre" || args[0] === "name") {
if (!text) return conn.sendMessage(m.chat, { text: `Ingrese de nuevo el comando y escriba el nuevo nombre grupal.\n\n• Por ejemplo:\n*#${command} name* Nuevo Nombre.` }, { quoted: m })
await conn.groupUpdateSubject(m.chat, text)
conn.sendMessage(m.chat, { text: `✓  Se ha configurado el nombre del bot con exito.` }, { quoted: m })
} else if (args[0] === "desc" || args[0] === "rule") {
if (!args.length) return conn.sendMessage(m.chat, { text: `Ingrese de nuevo el comando y escriba la nueva descripción del grupo.\n\n• Por ejemplo:\n*#${command} desc* Nueva descripción.` }, { quoted: m })
await conn.groupUpdateDescription(m.chat, args.join(' '))
await conn.sendMessage(m.chat, { text: `✓  Se ha configurado la descripción grupal con exito.` }, { quoted: m })
} else if (args[0] === "img" || args[0] === "foto") {
const q = m.quoted || m
const mime = (q.msg || q).mimetype || ''
if (!/image\/(png|jpe?g)/.test(mime)) return conn.sendMessage(m.chat, { text: `Ingrese el comando y responda a una imagen para cambiar la foto grupal.` }, { quoted: m })
const img = await q.download()
if (!img) return conn.sendMessage(m.chat, { text: `📍  Solo puedes responder a imagenes, nada de videos, textos o stickers.` }, { quoted: m })
await conn.updateProfilePicture(m.chat, img)
conn.sendMessage(m.chat, { text: `✓  Se ha configurado la foto grupal con exito.` }, { quoted: m })
} else if (args[0] === "welc" || args[0] === "welcome") {
let listaWelc = `> ⩽ *Listado : Disponible* ⩾
{grupo} = *(Menciona el nombre grupal)*
{usuario} = *(Menciona al usuario)*
{desc} = *(Muestra la descripción grupal)*`.trim()
if (!value) return conn.sendMessage(m.chat, { text: `Ingrese el comando y escriba un texto para configurar la bienvenida del bot.\n- Puedes usar las siguientes funciones disponibles.\n\n${listaWelc}\n\n• Por ejemplo:\n*#${command} welc* Hola {usuario}, bienvenido al grupo {grupo}, puedes leer la descripción grupal:\n{desc}` }, { quoted: m })
chat.sWelcome = value
await conn.sendMessage(m.chat, { text: `✓  Se ha configurado la bienvenida grupal con exito.\n- Puedes ver una preuba usando el comando *#${command} t-welc*.` }, { quoted: m })
} else if (args[0] === "t-welc") {
if (!chat.sWelcome) return conn.sendMessage(m.chat, { text: `📍  No has configurado una bienvenida grupal para probarlo.\n- Puede configurar su propia bienvenida grupal usando el comando: *#${command} welc*.` }, { quoted: m })
const { pp: ppWel, caption: captionWel, mentions: mentionsWel } = await generarBienvenida({ conn, userId: m.sender, groupMetadata, chat })
await conn.sendMessage(m.chat, { image: { url: ppWel }, caption: captionWel, mentions: mentionsWel }, { quoted: m })
try { fs.unlinkSync(ppWel) } catch {}
} else if (args[0] === "bye") {
let listaBye = `> ⩽ *Listado : Disponible* ⩾
{grupo} = *(Menciona el nombre grupal)*
{usuario} = *(Menciona al usuario)*
{desc} = *(Muestra la descripción grupal)*`.trim()
if (!value) return conn.sendMessage(m.chat, { text: `Ingrese el comando y escriba un texto para configurar la despedida grupal del bot.\n- Puedes usar las siguientes funciones disponibles.\n\n${listaBye}\n\n• Por ejemplo:\n*#${command} bye* El usuario {usuario} se ha salido del grupo {grupo}. Para memorizar las reglas, pueden leerlas.\n\n{desc}` }, { quoted: m })
chat.sBye = value
conn.sendMessage(m.chat, { text: `✓  Se ha configurado la despedida grupal con exito.\n- Puedes ver una prueba usando el comando *#${command} t-bye*.` }, { quoted: m })
} else if (args[0] === "t-bye") {
if (!chat.sBye) return conn.sendMessage(m.chat, { text: `📍  No has configurado una despedida grupal para probarlo.\n- Puede configurar su propia despedida grupal usando el comando: *#${command} bye*.` }, { quoted: m })
const { pp: ppBye, caption: captionBye, mentions: mentionsBye } = await generarDespedida({ conn, userId: m.sender, groupMetadata, chat })
await conn.sendMessage(m.chat, { image: { url: ppBye }, caption: captionBye, mentions: mentionsWel }, { quoted: m })
try { fs.unlinkSync(ppBye) } catch {}
} else if (args[0] === "bchat") {
await conn.groupSettingUpdate(m.chat, isClose)
if (isClose === 'announcement') {
await conn.groupSettingUpdate(m.chat, isClose)
conn.sendMessage(m.chat, { text: `✓  El chat grupal fue baneado.\n- Solo los administradores pueden enviar mensajes.` }, { quoted: m })
 }
} else if (args[0] === "bchat2") {
if (isClose === 'not_announcement') {
await conn.groupSettingUpdate(m.chat, isClose)
conn.sendMessage(m.chat, { text: `✓  El chat grupal fue desbaneado.\n- Ahora todos pueden enviar mensajes.` }, { quoted: m })
 }
} else {
let configXd = `> ⩽ *Opciones : Disponibles* ⩾
⊹ ✎ *#${command} name*
> ⤷ _Modificar el nombre grupal._
⊹ ✎ *#${command} desc*
> ⤷ _Modificar la descripción grupal._
⊹ ✎ *#${command} foto*
> ⤷ _Modificar el perfil grupal._
⊹ ✎ *#${command} welc*
> ⤷ _Modificar la bienvenida grupal._
⊹ ✎ *#${command} t-welc*
> ⤷ _Mostrar test de bienvenida._
⊹ ✎ *#${command} bye*
> ⤷ _Modificar la despedida grupal._
⊹ ✎ *#${command} t-bye*
> ⤷ _Mostrar test de despedida._
⊹ ✎ *#${command} bchat*
> ⤷ _Proceder baneo del chat._
⊹ ✎ *#${command} bchat2*
> ⤷ _Proceder desbaneo del chat._`.trim()
return conn.sendMessage(m.chat, { text: `📍  Lista de ediciones grupal para administradores.\n- Aqui te dejo una lista de funciones disponibles.\n\n${configXd}` }, { quoted: m })
}
}

handler.help = ['gpbanner', 'groupimg', 'gpdesc', 'groupdesc', 'gpname', 'groupname']
handler.tags = ['group']
handler.command = ['wg', 'gw']
handler.group = true
handler.admin = true
handler.botAdmin = true

export default handler
