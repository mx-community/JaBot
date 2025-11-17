import { jidDecode } from '@whiskeysockets/baileys'
import path from 'path'
import fs from 'fs'
import ws from 'ws'

const linkRegex = /https:\/\/chat\.whatsapp\.com\/([0-9A-Za-z]{20,24})/i
const handler = async (m, { conn, command, usedPrefix, text }) => {
try {
const isSubBots = [conn.user.jid, ...global.owner.map(([number]) => `${number}@s.whatsapp.net`)].includes(m.sender)
if (!isSubBots) return conn.sendMessage(m.chat, { text: `📍  Este comando solo puede ser ejecutado por un servidor alquilado.\n- Puedes alquilar un servidor o socket para poder usar esta función.` }, { quoted: m })
switch (command) {
case 'self': case 'public': {
const config = global.db.data.settings[conn.user.jid]
const value = text ? text.trim().toLowerCase() : ''
const type = /self|public/.test(command) ? 'self' : /antiprivado|antiprivate/.test(command) ? 'antiPrivate' : /gponly|sologp/.test(command) ? 'gponly' : null
if (!type) return conn.sendMessage(m.chat, { text: `📍  Modo de configuración no reconocido.` }, { quoted: m })
const isEnable = config[type] || false
const enable = value === 'enable' || value === 'on'
const disable = value === 'disable' || value === 'off'
if (enable || disable) {
if (isEnable === enable)
return conn.sendMessage(m.chat, { text: `📍  Esta funcion ya esta ${enable ? 'activa' : 'desactivada'}.` }, { quoted: m })
config[type] = enable
return conn.sendMessage(m.chat, { text: `✅  Se ha ${enable ? 'activado' : 'desactivado'} el modo *${type}* con éxito en tu servidor.` }, { quoted: m })
}
conn.sendMessage(m.chat, { text: `Ingrese el comando mas el modo para activar o desactivar.\n\n• Por ejemplo:\n*#${command}* on\n*#${command}* off` }, { quoted: m })
break
}
case 's-join': {
if (!text) return conn.sendMessage(m.chat, { text: `Ingrese el comando mas un enlace de un grupo para unir el servidor.` }, { quoted: m })
const [_, code] = text.match(linkRegex) || []
if (!code) return conn.sendMessage(m.chat, { text: `📍  No se ha podido acceder al enlace.\n- Verifique si es un enlace grupal y intentelo de nuevo.` }, { quoted: m })
await m.react('⏳')
await conn.groupAcceptInvite(code)
await m.react('✅')
conn.sendMessage(m.chat, { text: `✅  El servidor se ha unido al grupo con éxito.` }, { quoted: m })
break
}
case 'ril': case 'evae': {
await m.react('⏳')
const id = text || m.chat
const chat = global.db.data.chats[m.chat]
chat.welcome = false
await conn.sendMessage(m.chat, { text: `✅  Comando ejecutado con éxito.\n- Eliminando cache y datos del servidor en este chat...` }, { quoted: m })
await conn.groupLeave(id)
chat.welcome = true
break
}
case 'tuog': {
const rawId = conn.user?.id || ''
const cleanId = jidDecode(rawId)?.user || rawId.split('@')[0]
const index = global.conns?.findIndex(c => c.user.jid === m.sender)
if (global.conn.user.jid === conn.user.jid)
return conn.sendMessage(m.chat, { text: `📍  El codigo de vinculación al servidor es erronea.\n- No se encuentran sesiones indicados.` }, { quoted: m })
if (index === -1 || !global.conns[index])
return conn.sendMessage(m.chat, { text: `📍  No se han encontrado sesiones activas de este modelo.\n- Posiblemente se trate de una falla.` }, { quoted: m })
conn.sendMessage(m.chat, { text: `✅  Se ha pausado el servidor con éxito.\n- Puede activar su servidor en el bot principal con *#start*.` }, { quoted: m })
setTimeout(async () => {
await global.conns[index].logout()
global.conns.splice(index, 1)
const sessionPath = path.join(global.jadi, cleanId)
if (fs.existsSync(sessionPath)) {
fs.rmSync(sessionPath, { recursive: true, force: true })
console.log(`📍︎ Sesión de ${cleanId} eliminada de ${sessionPath}`)
}}, 3000)
break
}
case 'start': {
const rawId = conn.user?.id || ''
const cleanId = jidDecode(rawId)?.user || rawId.split('@')[0]
const sessionPath = path.join(global.jadi, cleanId)
if (!fs.existsSync(sessionPath)) return conn.reply(m.chat, '❀ Este comando solo puede ejecutarse desde una instancia Sub-Bot.', m)
await m.react('⏳')
conn.sendMessage(m.chat, { text: `Activando servidor ID *${sessionPath}*, espere un momento...` }, { quoted: m })
if (typeof global.reloadHandler !== 'function')
throw new Error('📍  No se encontró la función global.reloadHandler')
await global.reloadHandler(true)
await m.react('✅')
conn.sendMessage(m.chat, { text: `Tu bot fue activado con exito en la pagina web.` }, { quoted: m })
break
}}} catch (error) {
await conn.sendMessage(m.chat, { text: `*[ 📍 ]*  ERROR_COMMAND = ${error.message}` }, { quoted: m })
}}

handler.command = ['self', 'public', 'antiprivate', 's-join', 'ril', 'evae', 'tuog', 'start']
handler.tags = ['socket']

export default handler