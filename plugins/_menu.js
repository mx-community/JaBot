import fetch from 'node-fetch'
import { xpRange } from '../lib/levelling.js'
import fs from 'fs'
import moment from 'moment-timezone'
import PhoneNumber from 'awesome-phonenumber'

let handler = async (m, { conn, usedPrefix, args, command, __dirname, participants }) => {
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
const dFormato = new Date(new Date + 3600000)
const fecha = new Date(Date.now())
const locale = 'es-AR'
const dia = fecha.toLocaleDateString(locale, { weekday: 'long' })
const fechaTxt = fecha.toLocaleDateString(locale, { day: 'numeric', month: 'long', year: 'numeric' })
const hora = `${moment.tz('America/Buenos_Aires').format('HH:mm:ss')}`
 //d.toLocaleString('es-AR', {hour: 'numeric', minute: 'numeric', second: 'numeric', hour: true})
//fecha.toLocaleTimeString(locale, { hour: '2-digit', minute: '2-digit' })
const totalCommands = Object.keys(global.plugins).length
const userId = m.sender.split('@')[0]
const phone = PhoneNumber('+' + userId)
const pais = phone.getRegionCode() || 'Desconocido 🌐'
const perfil = await conn.profilePictureUrl(conn.user.jid, 'image').catch(() => `${global.mMages}`)

await m.react('👋🏻')
if (!args[0]) {
let menu = `> ${hora}, ${dia} ${fechaTxt}

╭──────────────• · · · 
│🜲 *Usuario:* @${name} (Prem. ${premium})
│ⴵ *Actividad:* ${uptime} (Vs. ${vs})
│⚇ *Bot:* ${(conn.user.jid == global.conn.user.jid ? 'Principal' : 'PreBot')}
╰──────────────• · · · 

📍 Debe de ingresar la categoría del menu para verlo.

\`\`\`╭─────────────────•
│#menu ≽ completo • (0)
│#menu ≽ info     • (1)
│#menu ≽ descargas• (2)
│#menu ≽ grupos   • (3)
│#menu ≽ rpg      • (4)
│#menu ≽ settings • (5)
│#menu ≽ logos    • (6)
│#menu ≽ perfil   • (7)
│#menu ≽ search   • (8)
│#menu ≽ stickers • (9)
│#menu ≽ stickers • (10)
│#menu ≽ rw       • (11)
╰─────────────────•\`\`\`

• Por ejemplo:
*#menu completo*`
return conn.sendMessage(m.chat, { text: menu, mentions: [m.sender], contextInfo: { externalAdReply: { title: botname, body: textbot, thumbnail: thumbBot, sourceUrl: null, mediaType: 1, renderLargerThumbnail: true }}}, { quoted: m })
} else if (args[0] === '1' || args[0] === 'info') {
let menu1 = `╭──────────────• · · · 
│🜲 *Usuario:* @${name} *(Prem: ${premium})*
│々 *Versión:* ${vs} / ${(conn.user.jid == global.conn.user.jid ? 'Bot Principal.' : 'Servidor.')}
╰──────────────• · · · 

\`\`\`
╭───[ ⛉ INFORMACIÓN ⛉ ]─•
│#addnew   │✎ query.
│#addnew2  │✎ query.
│#info     │
│#ping     │
│#status   │
│#ds       │
│#main     │
│#mp       │
│#bk       │
╰─────────────────•
\`\`\`

> ${textbot}`
return conn.sendMessage(m.chat, { text: menu1, mentions: [m.sender], contextInfo: { externalAdReply: { title: botname, body: textbot, thumbnail: thumbBot, sourceUrl: null, mediaType: 1, renderLargerThumbnail: true }}}, { quoted: m })
} else if (args[0] === "descargas" || args[0] === "2") {
let menu2 = `╭──────────────• · · · 
│🜲 *Usuario:* @${name} *(Prem: ${premium})*
│々 *Versión:* ${vs} / ${(conn.user.jid == global.conn.user.jid ? 'Bot Principal.' : 'Servidor.')}
╰──────────────• · · · 

\`\`\`
╭───[ ⛉ DESCARGAS ⛉ ]─•
│#github   │✎ link.
│#apk      │✎ texto.
│#facebook │✎ link.
│#instagram│✎ link.
│#likee    │✎ link.
│#play     │✎ texto, link.
│#mediafire│✎ link.
│#twitter  │✎ link.
│#tiktok   │✎ link.
│#pinterest│✎ link.
╰─────────────────•
\`\`\`

${textbot}
`
return conn.sendMessage(m.chat, { text: menu2, mentions: [m.sender], contextInfo: { externalAdReply: { title: botname, body: textbot, thumbnail: thumbBot, sourceUrl: null, mediaType: 1, renderLargerThumbnail: true }}}, { quoted: m })
} else if (args[0] === "grupos" || args[0] === "3") {
let menu3 = `╭──────────────• · · · 
│🜲 *Usuario:* @${name} *(Prem: ${premium})*
│々 *Versión:* ${vs} / ${(conn.user.jid == global.conn.user.jid ? 'Bot Principal.' : 'Servidor.')}
╰──────────────• · · · 

\`\`\`
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
│#g-welcome│✎ texto.
│#link     │
╰─────────────────•
\`\`\`

> ${textbot}
`
return conn.sendMessage(m.chat, { text: menu3, mentions: [m.sender], contextInfo: { externalAdReply: { title: botname, body: textbot, thumbnail: thumbBot, sourceUrl: null, mediaType: 1, renderLargerThumbnail: true }}}, { quoted: m })
} else if (args[0] === "rpg" || args[0] === "4") {
let menu4 = `╭──────────────• · · · 
│🜲 *Usuario:* @${name} *(Prem: ${premium})*
│々 *Versión:* ${vs} / ${(conn.user.jid == global.conn.user.jid ? 'Bot Principal.' : 'Servidor.')}
╰──────────────• · · · 

\`\`\`
╭───[ ⛉ RPG GAME ⛉ ]─•
│#cofre    │
│#lb       │
│#levelup  │
│#minar    │
│#work     │
│#wallet   │
│#heal     │
│#fishing  │
│#dep      │✎ query.
│#dep2     │✎ query.
│#ret      │✎ query.
│#ret2     │✎ query.
╰─────────────────•
\`\`\`

> ${textbot}
`
return conn.sendMessage(m.chat, { text: menu4, mentions: [m.sender], contextInfo: { externalAdReply: { title: botname, body: textbot, thumbnail: thumbBot, sourceUrl: null, mediaType: 1, renderLargerThumbnail: true }}}, { quoted: m })
} else if (args[0] === "settings" || args[0] === "5") {
let menu5 = `╭──────────────• · · · 
│🜲 *Usuario:* @${name} *(Prem: ${premium})*
│々 *Versión:* ${vs} / ${(conn.user.jid == global.conn.user.jid ? 'Bot Principal.' : 'Servidor.')}
╰──────────────• · · · 

\`\`\`
╭───[ ⛉ SETTINGS ⛉ ]─•
│#hweb     │✎ link.
│#ofuscar  │✎ query.
│#lid      │
│#hd       │✎ reply.
│#webcapt  │✎ link.
│#cid      │✎ link.
│#trad     │✎ code+text.
╰─────────────────•
\`\`\`

> ${textbot}`
return conn.sendMessage(m.chat, { text: menu5, mentions: [m.sender], contextInfo: { externalAdReply: { title: botname, body: null, thumbnail: thumbBot, sourceUrl: null, mediaType: 1, renderLargerThumbnail: true }}}, { quoted: m })
} else if (args[0] === "logos" || args[0] === "6") {
let menu6 = `╭──────────────• · · · 
│🜲 *Usuario:* @${name} *(Prem: ${premium})*
│々 *Versión:* ${vs} / ${(conn.user.jid == global.conn.user.jid ? 'Bot Principal.' : 'Servidor.')}
╰──────────────• · · · 

\`\`\`
╭───[ ⛉ LOGOS ⛉ ]─•
│#logo1    │✎ text.
│#logo2    │✎ text.
│#logo3    │✎ text.
│#logo4    │✎ text.
│#logo5    │✎ text.
│#logo6    │✎ text.
│#logo7    │✎ text.
│#logo8    │✎ text.
│#logo9    │✎ text.
│#logo10   │✎ text.
│#logo11   │✎ text.
│#logo12   │✎ text.
│#logo13   │✎ text.
│#logo14   │✎ text.
│#logo15   │✎ text.
│#logo16   │✎ text.
│#logo17   │✎ text.
│#logo18   │✎ text.
│#logo19   │✎ text.
│#logo20   │✎ text.
│#logo21   │✎ text.
│#logo22   │✎ text.
│#logo23   │✎ text.
│#logo24   │✎ text.
│#logo25   │✎ text.
│#logo26   │✎ text.
│#logo27   │✎ text.
│#logo28   │✎ text.
│#logo29   │✎ text.
│#logo30   │✎ text.
│#logo31   │✎ text.
│#logo32   │✎ text.
│#logo33   │✎ text.
│#logo34   │✎ text.
│#logo35   │✎ text.
│#logo36   │✎ text.
│#logo37   │✎ text.
╰─────────────────•
\`\`\`

> ${textbot}`
return conn.sendMessage(m.chat, { text: menu6, mentions: [m.sender], contextInfo: { externalAdReply: { title: botname, body: null, thumbnail: thumbBot, sourceUrl: null, mediaType: 1, renderLargerThumbnail: true }}}, { quoted: m })
} else if (args[0] === "perfil" || args[0] === "7") {
let menu7 = `╭──────────────• · · · 
│🜲 *Usuario:* @${name} *(Prem: ${premium})*
│々 *Versión:* ${vs} / ${(conn.user.jid == global.conn.user.jid ? 'Bot Principal.' : 'Servidor.')}
╰──────────────• · · · 

\`\`\`
╭───[ ⛉ PROFILE ⛉ ]─•
│#perfil   │
│#pf-genero│✎ text.
│#d-genero │
│#pf-cumple│✎ query.
│#d-cumple │
│#pf-desc  │✎ text.
│#d-desc   │
│#verify   │✎ query.
│#dreg     │✎ code.
│#mycode   │
╰─────────────────•
\`\`\`

> ${textbot}`
return conn.sendMessage(m.chat, { text: menu7, mentions: [m.sender], contextInfo: { externalAdReply: { title: botname, body: null, thumbnail: thumbBot, sourceUrl: null, mediaType: 1, renderLargerThumbnail: true }}}, { quoted: m })
} else if (args[0] === "search" || args[0] === "8") {
let menu8 = `╭──────────────• · · · 
│🜲 *Usuario:* @${name} *(Prem: ${premium})*
│々 *Versión:* ${vs} / ${(conn.user.jid == global.conn.user.jid ? 'Bot Principal.' : 'Servidor.')}
╰──────────────• · · · 

\`\`\`
╭───[ ⛉ SEARCH ⛉ ]─•
│#tiktoks  │✎ text.
│#yts      │✎ text.
│#imagen   │✎ text.
│#spotifys │✎ text.
│#slys     │✎ text.
│#apples   │✎ text.
│#capcuts  │✎ text.
│#sounds   │✎ text.
│#tenor    │✎ text.
╰─────────────────•
\`\`\`

> ${textbot}`
return conn.sendMessage(m.chat, { text: menu8, mentions: [m.sender], contextInfo: { externalAdReply: { title: botname, body: null, thumbnail: thumbBot, sourceUrl: null, mediaType: 1, renderLargerThumbnail: true }}}, { quoted: m })
} else if (args[0] === "stickers" || args[0] === "9") {
let menu9 = `╭──────────────• · · · 
│🜲 *Usuario:* @${name} *(Prem: ${premium})*
│々 *Versión:* ${vs} / ${(conn.user.jid == global.conn.user.jid ? 'Bot Principal.' : 'Servidor.')}
╰──────────────• · · · 

\`\`\`
╭───[ ⛉ STICKERS ⛉ ]─•
│#sticker  │✎ reply.
│#brat     │✎ text.
│#emojix   │✎ emoji+emoji.
│#qc       │✎ text.
│#exif     │✎ text.
│#d-exif   │
╰─────────────────•
\`\`\`

> ${textbot}`
return conn.sendMessage(m.chat, { text: menu9, mentions: [m.sender], contextInfo: { externalAdReply: { title: botname, body: null, thumbnail: thumbBot, sourceUrl: null, mediaType: 1, renderLargerThumbnail: true }}}, { quoted: m })
} else if (args[0] === "tols" || args[0] === "10") {
let menu10 = `╭──────────────• · · · 
│🜲 *Usuario:* @${name} *(Prem: ${premium})*
│々 *Versión:* ${vs} / ${(conn.user.jid == global.conn.user.jid ? 'Bot Principal.' : 'Servidor.')}
╰──────────────• · · · 

\`\`\`
📍  El menu sigue en proceso, use otra categoria..
\`\`\`

> ${textbot}`
return conn.sendMessage(m.chat, { text: menu10, mentions: [m.sender], contextInfo: { externalAdReply: { title: botname, body: null, thumbnail: thumbBot, sourceUrl: null, mediaType: 1, renderLargerThumbnail: true }}}, { quoted: m })
} else if (args[0] === "completo" || args[0] === "all" || args[0] === "0") {
let menuAll = `${hora}, ${dia} ${fechaTxt}

╭──────────────• · · · 
│🜲 *Usuario:* @${name} (Prem. ${premium})
│ⴵ *Actividad:* ${uptime} (Vs. ${vs})
│⚇ *Bot:* ${(conn.user.jid == global.conn.user.jid ? 'Principal' : 'PreBot')}
╰──────────────• · · · 

\`\`\`
╭───[ ⛉ INFORMACIÓN ⛉ ]─•
│#addnew   │✎ query.
│#addnew2  │✎ query.
│#info     │
│#ping     │
│#status   │
│#ds       │
│#main     │
│#mp       │
│#bk       │
╰─────────────────•


╭───[ ⛉ DESCARGAS ⛉ ]─•
│#github   │✎ link.
│#apk      │✎ texto.
│#facebook │✎ link.
│#instagram│✎ link.
│#likee    │✎ link.
│#play     │✎ texto, link.
│#mediafire│✎ link.
│#twitter  │✎ link.
│#tiktok   │✎ link.
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
│#g-welcome│✎ texto.
│#link     │
╰─────────────────•


╭───[ ⛉ RPG GAME ⛉ ]─•
│#cofre    │
│#lb       │
│#levelup  │
│#minar    │
│#work     │
│#wallet   │
│#heal     │
│#fishing  │
│#dep      │✎ query.
│#dep2     │✎ query.
│#ret      │✎ query.
│#ret2     │✎ query.
╰─────────────────•


╭───[ ⛉ SETTINGS ⛉ ]─•
│#hweb     │✎ link.
│#ofuscar  │✎ query.
│#lid      │
│#hd       │✎ reply.
│#webcapt  │✎ link.
│#cid      │✎ link.
│#trad     │✎ code+text.
╰─────────────────•


╭───[ ⛉ LOGOS ⛉ ]─•
│#logo1    │✎ text.
│#logo2    │✎ text.
│#logo3    │✎ text.
│#logo4    │✎ text.
│#logo5    │✎ text.
│#logo6    │✎ text.
│#logo7    │✎ text.
│#logo8    │✎ text.
│#logo9    │✎ text.
│#logo10   │✎ text.
│#logo11   │✎ text.
│#logo12   │✎ text.
│#logo13   │✎ text.
│#logo14   │✎ text.
│#logo15   │✎ text.
│#logo16   │✎ text.
│#logo17   │✎ text.
│#logo18   │✎ text.
│#logo19   │✎ text.
│#logo20   │✎ text.
│#logo21   │✎ text.
│#logo22   │✎ text.
│#logo23   │✎ text.
│#logo24   │✎ text.
│#logo25   │✎ text.
│#logo26   │✎ text.
│#logo27   │✎ text.
│#logo28   │✎ text.
│#logo29   │✎ text.
│#logo30   │✎ text.
│#logo31   │✎ text.
│#logo32   │✎ text.
│#logo33   │✎ text.
│#logo34   │✎ text.
│#logo35   │✎ text.
│#logo36   │✎ text.
│#logo37   │✎ text.
╰─────────────────•


╭───[ ⛉ PROFILE ⛉ ]─•
│#perfil   │
│#pf-genero│✎ text.
│#d-genero │
│#pf-cumple│✎ query.
│#d-cumple │
│#pf-desc  │✎ text.
│#d-desc   │
│#verify   │✎ query.
│#dreg     │✎ code.
│#mycode   │
╰─────────────────•


╭───[ ⛉ SEARCH ⛉ ]─•
│#tiktoks  │✎ text.
│#yts      │✎ text.
│#imagen   │✎ text.
│#spotifys │✎ text.
│#slys     │✎ text.
│#apples   │✎ text.
│#capcuts  │✎ text.
│#sounds   │✎ text.
│#tenor    │✎ text.
╰─────────────────•


╭───[ ⛉ STICKERS ⛉ ]─•
│#sticker  │✎ reply.
│#brat     │✎ text.
│#emojix   │✎ emoji+emoji.
│#qc       │✎ text.
│#exif     │✎ text.
│#d-exif   │
╰─────────────────•


╭───[ ⛉ ROLL WAIFU ⛉ ]─•
│#harem    │✎ index.
│#rw       │
│#c        │✎ reply.
╰─────────────────•\`\`\`

> ${textbot}`
return conn.sendMessage(m.chat, { text: menuAll, mentions: [m.sender], contextInfo: { externalAdReply: { title: botname, body: textbot, thumbnail: thumbBot, sourceUrl: null, mediaType: 1, renderLargerThumbnail: true }}}, { quoted: m })
} else if (args[0] === "rw" || args[0] === "11") {
let menu10 = `╭──────────────• · · · 
│🜲 *Usuario:* @${name} *(Prem: ${premium})*
│々 *Versión:* ${vs} / ${(conn.user.jid == global.conn.user.jid ? 'Bot Principal.' : 'Servidor.')}
╰──────────────• · · · 


\`\`\`╭───[ ⛉ ROLL WAIFU ⛉ ]─•
│#harem    │✎ index.
│#rw       │
│#c        │✎ reply.
╰─────────────────•\`\`\`


> ${textbot}`
 return conn.sendMessage(m.chat, { text: menu10, mentions: [m.sender], contextInfo: { externalAdReply: { title: botname, body: textbot, thumbnail: thumbBot, sourceUrl: null, mediaType: 1, renderLargerThumbnail: true }}}, { quoted: m })
}
} catch (e) {
console.error(e)
await conn.sendMessage(m.chat, { text: `*[ 📍 ]*  ERROR_COMMAND = ${e}` }, { quoted: m })
}
}
handler.help = ['help  <category>', 'menu  <category>']
handler.tags = ['menus']
handler.command = ['menu', 'help']


export default handler

const more = String.fromCharCode(8206)
const readMore = more.repeat(4001)

 function clockString(ms) {
const h = isNaN(ms) ? '--' : Math.floor(ms / 3600000)
const m = isNaN(ms) ? '--' : Math.floor(ms / 60000) % 60
const s = isNaN(ms) ? '--' : Math.floor(ms / 1000) % 60
return [h, m, s].map(v => v.toString().padStart(2, '0')).join(':')
 }
 
/*
╭───[ ⛉ PROPIETARIO ⛉ ]─•
│#   │
│#│
│# │✎ texto.
│# │✎ texto.
│#  │✎ reply.
│#   │✎ texto.
│# │
│#    │✎ query.
│#    │✎ query.
╰─────────────────•
*/
