import fs from 'fs'

const handler = async (m, { conn, text, command, args, usedPrefix, isROwner }) => {
if (!isROwner) return
try {
const user = m.sender
let mentionedJid = await m.mentionedJid
let who = mentionedJid?.[0] || (await m.quoted?.sender) || (text ? text.replace(/[^0-9]/g, '') + '@s.whatsapp.net' : null)
switch (command) {
case 'backup': case 'scopy': {
await conn.sendMessage(m.chat, { text: `Creando copia de seguridad, aguarde un momento...` }, { quoted: m })
const date = new Date().toLocaleDateString('es', { day: 'numeric', month: 'long', year: 'numeric' })
const database = await fs.readFileSync('./database.json')
const creds = await fs.readFileSync('./Sessions/Principal/creds.json')
await conn.reply(m.chat, `${date} / Copia de seguridad.`, m)
await conn.sendMessage(m.sender, { document: database, mimetype: 'application/json', fileName: `database.json` }, { quoted: m })
await conn.sendMessage(m.sender, { document: creds, mimetype: 'application/json', fileName: `creds.json` }, { quoted: m })
break
}
case 'resetuser': case 'resetear': {
if (!who) return conn.sendMessage(m.chat, { text: `Ingrese el comando y mencione a un usuario para reiniciar sus datos en el bot.` }, { quoted: m })
const userNumber = who.split('@')[0]
const userData = global.db.data.users?.[who]
if (!userData) return conn.sendMessage(m.chat, { text: `📍  El usuario mencionado no esta en la base de datos.` }, { quoted: m })
if (userData.characters) {
for (let id in userData.characters) {
if (userData.characters[id].user === who) {
delete userData.characters[id]
}}}
if (userData.sales) {
for (let id in userData.sales) {
if (userData.sales[id].user === who) {
delete userData.sales[id]
}}}
for (let id in global.db.data.users) {
if (global.db.data.users[id]?.marry === who) {
delete global.db.data.users[id].marry
}}
delete global.db.data.users[who]
conn.sendMessage(m.chat, { text: `✓  Se ha eliminado todo rastro de registro al usuario @${userNumber}`, mentions: [who] }, { quoted: m })
break
}
case 'wbot': case 'ibot': {
const value = text ? text.trim().toLowerCase() : ''
const type = /jadibot|serbot/.test(command) ? 'jadibotmd' : null
if (!type) return conn.sendMessage(m.chat, { text: `Ingrese el comando y la opción definitiva para activar o desactivar los prebots.\n• Por ejemplo:\n*#${command}* off\n*#${command}* on` }, { quoted: m })
const isEnable = bot[type] || false
const enable = value === 'enable' || value === 'on'
const disable = value === 'disable' || value === 'off'
if (enable || disable) {
if (isEnable === enable) return conn.sendMessage(m.chat, { text: `📍  El tipo *${type}* ya esta ${enable ? 'activado' : 'desactivado'} en este momento.` }, { quoted: m })
bot[type] = enable
return conn.sendMessage(m.chat, { text: `✓  Has ${enable ? 'activado' : 'desactivado'} con exito el tipo *${type}* para los servidores.` }, { quoted: m })
}
break
}}} catch (e) {
await conn.sendMessage(m.chat, { text: `*[ 📍 ]*  ERROR_COMMAND = Command error, try again and if the error persists, report the command.` }, { quoted: m })
}}

handler.help = ['backup', 'copia', 'resetuser', 'resetear']
handler.tags = ['owner']
handler.command = ['backup', 'copia', 'resetuser', 'resetear', 'wbot', 'ibot']

export default handler
