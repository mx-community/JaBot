import fetch from 'node-fetch'
import { xpRange } from '../lib/levelling.js'
import fs from 'fs'
import PhoneNumber from 'awesome-phonenumber'

let handler = async (m, { conn, usedPrefix, __dirname, participants }) => {
try {
const user = global.db.data.users[m.sender] || {}
const name = await conn.getName(m.sender)
const thumbBot = Buffer.from(await (await fetch(`${global.mImagen}`)).arrayBuffer())
const premium = user.premium ? '✓' : '✘'
const limit = user.limit || 0
const totalreg = Object.keys(global.db.data.users).length
const groupUserCount = m.isGroup ? participants.length : '-'
const groupsCount = Object.values(conn.chats).filter(v => v.id.endsWith('@g.us')).length
const uptime = clockString(process.uptime() * 1000)
const fecha = new Date(Date.now())
const locale = 'es-AR'
const dia = fecha.toLocaleDateString(locale, { weekday: 'long' })
const fechaTxt = fecha.toLocaleDateString(locale, { day: 'numeric', month: 'long', year: 'numeric' })
const hora = fecha.toLocaleTimeString(locale, { hour: '2-digit', minute: '2-digit' })
const totalCommands = Object.keys(global.plugins).length
const userId = m.sender.split('@')[0]
const phone = PhoneNumber('+' + userId)
const pais = phone.getRegionCode() || 'Desconocido 🌐'
const perfil = await conn.profilePictureUrl(conn.user.jid, 'image').catch(() => `${global.mMages}`)

await m.react('👋🏻')
if (!args[0]) {
let menu = `📍  ${dia}, ${fechaTxt}

╭──────────────• · · · 
│🜲 *Usuario:* @${name}
│✦ *Premium:* ${premium}
│ⴵ *Actividad:* ${uptime}
│⚇ *Bot:* ${(conn.user.jid == global.conn.user.jid ? 'Principal' : 'PreBot')}
│々 *Versión:* ${vs} 
╰──────────────• · · · 

\`\`\`
╭───[ ⛉ INFORMACIÓN ⛉ ]─•
│#info     │
│#ping     │
│#status   │
│#ds       │
│#main     │
╰─────────────────•


╭───[ ⛉ DESCARGAS ⛉ ]─•
│#github   │✎ link.
│#apk      │✎ texto.
│#facebook │✎ link.
│#instagram│✎ link.
│#play     │✎ texto, link.
│#mediafire│✎ link.
│#mega     │✎ link.
│#threads  │✎ link.
│#pinterest│✎ link.
╰─────────────────•


╭───[ ⛉ GRUPOS ⛉ ]─•
│#add      │✎ número.
│#kick     │✎ mention.
│#delete   │✎ meply.
│#promote  │✎ mention.
│#demote   │✎ mention.
│#warn     │✎ mention.
│#unwarn   │✎ mention.
│#g-img    │✎ reply.
│#g-name   │✎ texto.
│#g-desc   │✎ texto.
│#link     │
╰─────────────────•


╭───[ ⛉ RPG GAME ⛉ ]─•
│#cofre    │
│#lb       │
│#levelup  │
│#minar    │
│#work     │
│#ruleta   │✎ query.
│#slot     │✎ query.
│#color    │✎ query.
│#balance  │
│#dep      │✎ query.
│#ret      │✎ query.
╰─────────────────•


╭───[ ⛉ PROPIETARIO ⛉ ]─•
│#update   │
│#autoadmin│
│#bot-name │✎ texto.
│#bot-desc │✎ texto.
│#bot-img  │✎ reply.
│#bot-px   │✎ texto.
│#reprefix │
│#gfile    │✎ query.
│#dfile    │✎ query.
╰─────────────────•
\`\`\``
return conn.sendMessage(m.chat, { text: menu, mentions: [m.sender], contextInfo: { externalAdReply: { title: botname, body: textbot, thumbnail: thumbBot, sourceUrl: null, mediaType: 1, renderLargerThumbnail: true }}}, { quoted: m })
} else if (args[0] === '1' || args[0] === 'info') {
let menu1 = `╭──────────────• · · · 
│🜲 *Usuario:* @${name} *(Prem: ${premium})*
│ⴵ *Actividad:* ${uptime} / ${(conn.user.jid == global.conn.user.jid ? 'Bot Principal.' : 'PreBot.')}
╰──────────────• · · · 

\`\`\`
╭───[ ⛉ INFORMACIÓN ⛉ ]─•
│#info     │
│#ping     │
│#status   │
│#ds       │
│#main     │
╰─────────────────•
\`\`\``
return conn.sendMessage(m.chat, { text: menu1, mentions: [m.sender], contextInfo: { externalAdReply: { title: botname, body: textbot, thumbnail: thumbBot, sourceUrl: null, mediaType: 1, renderLargerThumbnail: true }}}, { quoted: m })
} else if (args[0] === "descargas" || args[0] === "2") {
let menu2 = `╭──────────────• · · · 
│🜲 *Usuario:* @${name} *(Prem: ${premium})*
│ⴵ *Actividad:* ${uptime} / ${(conn.user.jid == global.conn.user.jid ? 'Bot Principal.' : 'PreBot.')}
╰──────────────• · · · 

\`\`\`
╭───[ ⛉ DESCARGAS ⛉ ]─•
│#github   │✎ link.
│#apk      │✎ texto.
│#facebook │✎ link.
│#instagram│✎ link.
│#play     │✎ texto, link.
│#mediafire│✎ link.
│#mega     │✎ link.
│#threads  │✎ link.
│#pinterest│✎ link.
╰─────────────────•
\`\`\`
`
return conn.sendMessage(m.chat, { text: menu2, mentions: [m.sender], contextInfo: { externalAdReply: { title: botname, body: textbot, thumbnail: thumbBot, sourceUrl: null, mediaType: 1, renderLargerThumbnail: true }}}, { quoted: m })
}
} catch (e) {
console.error(e)
await conn.sendMessage(m.chat, { text: `*[ 📍 ]*  ERROR_COMMAND = ${e}` }, { quoted: m })
}
}
handler.help = ['help  <category>', 'menu  <category>']
handler.tags = ['menus']
handler.command = ['testmenu', 'mtest']


export default handler

const more = String.fromCharCode(8206)
const readMore = more.repeat(4001)

 
/*import axios from 'axios'
import fetch from 'node-fetch'
import { xpRange } from '../lib/levelling.js'
import fs from 'fs'
import PhoneNumber from 'awesome-phonenumber'

let handler = async (m, { conn, usedPrefix, command, __dirname, participants }) => {
try {
const user = global.db.data.users[m.sender] || {}
const name = await conn.getName(m.sender)
const premium = user.premium ? '✓' : '✘'
const limit = user.limit || 0
const totalreg = Object.keys(global.db.data.users).length
const groupUserCount = m.isGroup ? participants.length : '-'
const groupsCount = Object.values(conn.chats).filter(v => v.id.endsWith('@g.us')).length
const uptime = clockString(process.uptime() * 1000)
const fecha = new Date(Date.now())
const locale = 'es-AR'
const dia = fecha.toLocaleDateString(locale, { weekday: 'long' })
const fechaTxt = fecha.toLocaleDateString(locale, { day: 'numeric', month: 'long', year: 'numeric' })
const hora = fecha.toLocaleTimeString(locale, { hour: '2-digit', minute: '2-digit' })
const totalCommands = Object.keys(global.plugins).length
const userId = m.sender.split('@')[0]
const phone = PhoneNumber('+' + userId)
const pais = phone.getRegionCode() || 'Desconocido 🌐'
const perfil = await conn.profilePictureUrl(conn.user.jid, 'image').catch(() => `${global.mMages}`)
const thumbBot = Buffer.from(await (await fetch(`${global.mImagen}`)).arrayBuffer())

 await m.react('👋🏻')
if (command === 'mtest' || command === 'testmenu') {
let menu = `📍  ${dia}, ${fechaTxt}

╭──────────────• · · · 
│🜲 *Usuario:* @${name}
│✦ *Premium:* ${premium}
│ⴵ *Actividad:* ${uptime}
│⚇ *Bot:* ${(conn.user.jid == global.conn.user.jid ? 'Principal' : 'PreBot')}
│々 *Versión:* ${vs} 
╰──────────────• · · · 

\`\`\`
╭───[ ⛉ INFORMACIÓN ⛉ ]─•
│#info     │
│#ping     │
│#status   │
│#ds       │
│#main     │
╰─────────────────•


╭───[ ⛉ DESCARGAS ⛉ ]─•
│#github   │✎ link.
│#apk      │✎ texto.
│#facebook │✎ link.
│#instagram│✎ link.
│#play     │✎ texto, link.
│#mediafire│✎ link.
│#mega     │✎ link.
│#threads  │✎ link.
│#pinterest│✎ link.
╰─────────────────•


╭───[ ⛉ GRUPOS ⛉ ]─•
│#add      │✎ número.
│#kick     │✎ mention.
│#delete   │✎ meply.
│#promote  │✎ mention.
│#demote   │✎ mention.
│#warn     │✎ mention.
│#unwarn   │✎ mention.
│#g-img    │✎ reply.
│#g-name   │✎ texto.
│#g-desc   │✎ texto.
│#link     │
╰─────────────────•


╭───[ ⛉ RPG GAME ⛉ ]─•
│#cofre    │
│#lb       │
│#levelup  │
│#minar    │
│#work     │
│#ruleta   │✎ query.
│#slot     │✎ query.
│#color    │✎ query.
│#balance  │
│#dep      │✎ query.
│#ret      │✎ query.
╰─────────────────•


╭───[ ⛉ PROPIETARIO ⛉ ]─•
│#update   │
│#autoadmin│
│#bot-name │✎ texto.
│#bot-desc │✎ texto.
│#bot-img  │✎ reply.
│#bot-px   │✎ texto.
│#reprefix │
│#gfile    │✎ query.
│#dfile    │✎ query.
╰─────────────────•
\`\`\`
`
return conn.sendMessage(m.chat, { text: menu, mentions: [m.sender], contextInfo: { externalAdReply: { title: botname, body: textbot, thumbnail: thumbBot, sourceUrl: null, mediaType: 1, renderLargerThumbnail: true }}}, { quoted: m })
if (args[0] === '1' || args[0] === 'info') {
let menu1 = `╭──────────────• · · · 
│🜲 *Usuario:* @${name} *(Prem: ${premium})*
│ⴵ *Actividad:* ${uptime} / ${(conn.user.jid == global.conn.user.jid ? 'Bot Principal.' : 'PreBot.')}
╰──────────────• · · · 

\`\`\`
╭───[ ⛉ DESCARGAS ⛉ ]─•
│#github   │✎ link.
│#apk      │✎ texto.
│#facebook │✎ link.
│#instagram│✎ link.
│#play     │✎ texto, link.
│#mediafire│✎ link.
│#mega     │✎ link.
│#threads  │✎ link.
│#pinterest│✎ link.
╰─────────────────•
\`\`\`
`
return conn.sendMessage(m.chat, { text: menu1, mentions: [m.sender], contextInfo: { externalAdReply: { title: botname, body: textbot, thumbnail: thumbBot, sourceUrl: null, mediaType: 1, renderLargerThumbnail: true }}}, { quoted: m })
} else if (args[0] === '2' || args[0] === 'descargas') {
let menu2 = `╭──────────────• · · · 
│🜲 *Usuario:* @${name} *(Prem: ${premium})*
│ⴵ *Actividad:* ${uptime} / ${(conn.user.jid == global.conn.user.jid ? 'Bot Principal.' : 'PreBot.')}
╰──────────────• · · · 

\`\`\`
╭───[ ⛉ DESCARGAS ⛉ ]─•
│#github   │✎ link.
│#apk      │✎ texto.
│#facebook │✎ link.
│#instagram│✎ link.
│#play     │✎ texto, link.
│#mediafire│✎ link.
│#mega     │✎ link.
│#threads  │✎ link.
│#pinterest│✎ link.
╰─────────────────•
\`\`\`
`
return conn.sendMessage(m.chat, { text: menu2, mentions: [m.sender], contextInfo: { externalAdReply: { title: botname, body: textbot, thumbnail: thumbBot, sourceUrl: null, mediaType: 1, renderLargerThumbnail: true }}}, { quoted: m })
}
}
} catch (e) {
console.error(e)
await conn.sendMessage(m.chat, { text: `*[ 📍 ]*  ERROR_COMMAND = ${e}` }, { quoted: m })
}
}
handler.help = ['help  <category>', 'menu  <category>']
handler.tags = ['menus']
handler.command = ['testmenu', 'mtest']


export default handler

const more = String.fromCharCode(8206)
const readMore = more.repeat(4001)

function clockString(ms) {
const h = isNaN(ms) ? '--' : Math.floor(ms / 3600000)
const m = isNaN(ms) ? '--' : Math.floor(ms / 60000) % 60
const s = isNaN(ms) ? '--' : Math.floor(ms / 1000) % 60
return [h, m, s].map(v => v.toString().padStart(2, '0')).join(':')
}
*/
