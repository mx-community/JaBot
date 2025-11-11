const handler = async (m, { conn, usedPrefix, command, args, isOwner, isAdmin }) => {
const primaryBot = global.db.data.chats[m.chat].primaryBot
if (primaryBot && conn.user.jid !== primaryBot) throw !1
const chat = global.db.data.chats[m.chat]
let type = command.toLowerCase()
let isEnable = chat[type] !== undefined ? chat[type] : false
let opcionesX = `> ⟪ OPCIONES DISPONIBLES ⟫:
✎  *#welcome:*  » *on* / *off*
✎  *#detect:*  » *on* / *off*
✎  *#admind:*  » *on* / *off*
✎  *#linkd:*  » *on* / *off*
✎  *#menup:*  » *on* / *off*
✎  *#economy:*  » *on* / *off*
✎  *#juegos:*  » *on* / *off*

• Ejemplo de uso:
*#welcome* on (activar)
*#welcome* off (desactivar)`
if (args[0] === 'on' || args[0] === 'activar') {
if (isEnable) return conn.sendMessage(m.chat, { text: `✦  La función *#${type}* ya esta activo.\n- Para apagarlo use *#${type} off*.` }, { quoted: m })
isEnable = true
} else if (args[0] === 'off' || args[0] === 'desactivar') {
if (!isEnable) return conn.sendMessage(m.chat, { text: `✦  La función *#${type}* ya esta desactivado.\n- Para activarlo use *#${type} on*.` }, { quoted: m })
isEnable = false
} else {
return conn.sendMessage(m.chat, { text: `📍  Aqui estan todas las funciones disponibles en este bot.\n\n${opcionesX}` }, { quoted: m })
}
switch (type) {
case 'welcome': case 'welc': {
if (!m.isGroup) {
if (!isOwner) {
global.dfail('group', m, conn)
throw false
}} else if (!isAdmin) {
global.dfail('admin', m, conn)
throw false
}
chat.welcome = isEnable
break
}
case 'admind': case 'adminb': {
if (!m.isGroup) {
if (!isOwner) {
global.dfail('group', m, conn)
throw false
}} else if (!isAdmin) {
global.dfail('admin', m, conn)
throw false
}
chat.modoadmin = isEnable
break
}
case 'detect': case 'detector': {
if (!m.isGroup) {
if (!isOwner) {
global.dfail('group', m, conn)
throw false
}} else if (!isAdmin) {
global.dfail('admin', m, conn)
throw false
}
chat.detect = isEnable
break
}
case 'linkd': case 'durl': {
if (!m.isGroup) {
if (!isOwner) {
global.dfail('group', m, conn)
throw false
}} else if (!isAdmin) {
global.dfail('admin', m, conn)
throw false
}
chat.antiLink = isEnable
break
}
case 'menup': case 'pmenu': {
if (!m.isGroup) {
if (!isOwner) {
global.dfail('group', m, conn)
throw false
}} else if (!isAdmin) {
global.dfail('admin', m, conn)
throw false
}
chat.menup = isEnable
break
}
case 'economy': case 'recurs': {
if (!m.isGroup) {
if (!isOwner) {
global.dfail('group', m, conn)
throw false
}} else if (!isAdmin) {
global.dfail('admin', m, conn)
throw false
}
chat.economy = isEnable
break
}
case 'rpg': case 'juegos': {
if (!m.isGroup) {
if (!isOwner) {
global.dfail('group', m, conn)
throw false
}} else if (!isAdmin) {
global.dfail('admin', m, conn)
throw false
}
chat.gacha = isEnable
break
}}
chat[type] = isEnable
await conn.sendMessage(m.chat, { text: `「 ✓ 」 Se ha *${isEnable ? 'activado' : 'desactivado'}* la funcion *#${type}* con exito.` }, { quoted: m })
}

handler.tags = ['nable']
handler.command = ['welcome', 'welc', 'admind', 'adminb', 'menup', 'pmenu', 'economy', 'recurs', 'rpg', 'juegos', 'detect', 'detector', 'lind', 'durl']
handler.group = true

export default handler
