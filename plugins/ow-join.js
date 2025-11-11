let handler = async (m, { conn, text, usedPrefix, command, args, participants, isOwner }) => {
let time = global.db.data.users[m.sender].lastjoin + 86400000
let linkRegex = /chat.whatsapp.com\/([0-9A-Za-z]{20,24})/i
let delay = time => new Promise(res => setTimeout(res, time))
 
let name = m.sender 
let [_, code] = text.match(linkRegex) || []
if (!args[0]) return conn.sendMessage(m.chat, { text: `Ingrese el comando mas un enlace de invitación de un grupo y el numero de dias para añadir al bot.\n\n• Por ejemplo:\n*#${command}* https://chat.whatsapp/ejemplo 3` }, { quoted: m })
if (!code) return conn.sendMessage(m.chat, { text: `📍  El enlace ingresado no es valido, debe de ser un enlace de un chat grupal.\n\n• Por ejemplo:\n*#${command}* https://chat.whatsapp/ejemplo 3` }, { quoted: m })
if (!args[1]) return conn.sendMessage(m.chat, { text: `📍  El numero dias es opcional, para que sea identificado y afirmado el tiempo que el bot permanece.\n\n• Por ejemplo:\n*#${command}* https://chat.whatsapp/ejemplo 3` }, { quoted: m })
if (isNaN(args[1])) return conn.sendMessage(m.chat, { text: `📍  Solo se admiten numeros, nada de texto, para representar la cantidad de dias que el bot estara en el grupo.\n\n• Por ejemplo:\n*#${command}* https://chat.whatsapp/ejemplo 3` }, { quoted: m })
let owbot = global.owner[1] 
conn.sendMessage(m.chat, { text: `Uniendome al grupo, espere un momento...` }, { quoted: m })
await delay(3000)
try {
let res = await conn.groupAcceptInvite(code)
let b = await conn.groupMetadata(res)
let d = b.participants.map(v => v.id)
let member = d.toString()
let e = await d.filter(v => v.endsWith(owbot + '@s.whatsapp.net'))
let nDays = 86400000 * args[1]
let now = new Date() * 1
if (now < global.db.data.chats[res].expiredg) global.db.data.chats[res].expiredg += nDays
else global.db.data.chats[res].expiredg = now + nDays
if (e.length) await conn.sendMessage(m.chat, { text: `✅  Me he unido con éxito al grupo ${await conn.getName(res)} y me quedare aproximadamente ${msToDate(global.db.data.chats[res].expiredg - now)}` }, { quoted: m })
if (e.length) await conn.reply(res, `👋🏻  Hola gente, soy un bot de WhatsApp.
Fui invitado por ${m.name}, espero y servir de gran ayuda.`, m, {
mentions: d
 }).then(async () => {
 await delay(7000)
 }).then( async () => {
 await conn.reply(res, `👋🏻  Para ver los demas comandos, usen el comando *#menu* para ver una lista de funciones.`, 0)
 await conn.reply(global.owner[1]+'@s.whatsapp.net', `≡ *INVITACIÓN A GRUPO*\n\n@${m.sender.split('@')[0]} ha invitado a *${conn.user.name}* al grupo\n\n*${await conn.getName(res)}*\n\n*ID* : ${res}\n\n📌 Enlace : ${args[0]}\n\nEl bot saldrá automáticamente después de \n\n${msToDate(global.db.data.chats[res].expiredg - now)}`, null, {mentions: [m.sender]})
 })
 if (!e.length) await conn.reply(global.owner[1]+'@s.whatsapp.net', `📍  \n\n@${m.sender.split('@')[0]} ha invitado a *${conn.user.name}* al grupo\n\n*${await conn.getName(res)}*\n\n*ID* : ${res}\n\n📌 Enlace : ${args[0]}\n\nEl bot saldrá automáticamente después de\n\n ${msToDate(global.db.data.chats[res].expiredg - now)}`, null, {mentions: [m.sender]})
 if (!e.length) await m.reply(`✅ Se invito al bot al grupo\n\n${await conn.getName(res)}\n\nEl bot saldrá automáticamente después de \n${msToDate(global.db.data.chats[res].expiredg - now)}`).then(async () => {
 let mes = `Hola a todos 👋🏻
 
*${conn.user.name}* es uno de los bots multidispositivo de WhatsApp construido con Node.js, *${conn.user.name}* Recién invitado por *${m.name}*

para ver el Menu del bot escribe

*${usedPrefix}help*

@${conn.user.jid.split('@')[0]} saldrá automáticamente después de \n\n${msToDate(global.db.data.chats[res].expiredg - now)}`
await conn.reply(res, mes, m, {
mentions: d
 })
 })
} catch (e) {
conn.reply(global.owner[1]+'@s.whatsapp.net', e)
throw `✳️ Lo siento, el bot no puede unirse a grupos`
}
}
handler.help = ['join <chat.whatsapp.com> <dias>']
handler.tags = ['owner']
handler.command = ['join', 'invite'] 
handler.owner = true

export default handler

function msToDate(ms) {
let d = isNaN(ms) ? '--' : Math.floor(ms / 86400000)
let h = isNaN(ms) ? '--' : Math.floor(ms / 3600000) % 24
let m = isNaN(ms) ? '--' : Math.floor(ms / 60000) % 60
let s = isNaN(ms) ? '--' : Math.floor(ms / 1000) % 60
return [d, 'd ', h, 'h ', m, 'm ', s, 's '].map(v => v.toString().padStart(2, 0)).join('')
}
