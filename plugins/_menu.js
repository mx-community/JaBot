import fetch from 'node-fetch'
import { xpRange } from '../lib/levelling.js'
import fs from 'fs'
import PhoneNumber from 'awesome-phonenumber'

let handler = async (m, { conn, usedPrefix, __dirname, participants }) => {
try {
await m.react('👋🏻')

const user = global.db.data.users[m.sender] || {}
const name = await conn.getName(m.sender)
const premium = user.premium ? '✓' : '✘'
const limit = user.limit || 0
const totalreg = Object.keys(global.db.data.users).length
const groupUserCount = m.isGroup ? participants.length : '-'
const groupsCount = Object.values(conn.chats).filter(v => v.id.endsWith('@g.us')).length
const uptime = clockString(process.uptime() * 1000)
const fecha = new Date(Date.now())
const locale = 'es-PE'
const dia = fecha.toLocaleDateString(locale, { weekday: 'long' })
const fechaTxt = fecha.toLocaleDateString(locale, { day: 'numeric', month: 'long', year: 'numeric' })
const hora = fecha.toLocaleTimeString(locale, { hour: '2-digit', minute: '2-digit' })
const totalCommands = Object.keys(global.plugins).length
const userId = m.sender.split('@')[0]
const phone = PhoneNumber('+' + userId)
const pais = phone.getRegionCode() || 'Desconocido 🌐'
const perfil = await conn.profilePictureUrl(conn.user.jid, 'image').catch(() => `${global.mMages}`)

const infoUser = `${hora}, ${dia}, ${fechaTxt}

╭──────────────• · · · 
│🜲 *Usuario:* @${name}
│✦ *Premium:* ${premium}
│ⴵ *Actividad:* ${uptime}
│⚇ *Bot:* ${(conn.user.jid == global.conn.user.jid ? 'Principal' : 'PreBot')}
│々 *Versión:* ${vs} 
╰──────────────• · · · 

╭─• ⫶☰ \`Informacion.\`
> *Informacion acerca del bot.*
│ *#creador*  
│ *#stest*  
│ *#ds*  
│ *#main*  
│ *#ping*  
│ *#status*  
└───────────•


╭─• ⫶☰ \`Descargas.\`
> *Descarga contenidos segun tu preferencia.*
│ *#apk*  <text>
│ *#github*  <url>
│ *#audio*  <url>
│ *#video*  <url>
│ *#imagen*  <text>
│ *#instagram*  <url>
│ *#facebook*  <url>
│ *#kwaii*  <url>
│ *#likee*  <url>
│ *#mediafire*  <url>
│ *#mega*  <url>
│ *#pinterest*  <url>
│ *#play*  <text/url>
│ *#sound*  <url>
│ *#spotify*  <text/url>
│ *#stickerly*  <url>
│ *#terabox*  <url>
│ *#tiktok*  <url>
│ *#threads*  <url>
│ *#twitter*  <url>
│ *#videy*  <url>
│ *#vimeo*  <url>
└───────────•


╭─• ⫶☰ \`Grupos.\`
> *Comandos para chats grupales.*
│ *#add*  <nro>
│ *#kick*  <mention>
│ *#delete*  <reply>
│ *#bot*  <on/off>
│ *#demote*  <mention>
│ *#promote*  <mention>
│ *#g-name*  <text>
│ *#g-img*  <reply>
│ *#g-desc*  <text>
│ *#setwelcome*  <text>
│ *#setbye*  <text>
│ *#setprim*  <query>
│ *#revoke*  
│ *#grupo?*  
│ *#tag*  <reply>
│ *#tagall*  <text>
│ *#warn*  <mention>
│ *#unwarn*  <mention>
│ *#enlace*  
└───────────•


╭─• ⫶☰ \`Herramientas.\`
> *Herramientas que podrian ser útiles en su uso.*
│ *#calcular*  <query>
│ *#ofuscar*  <code>
│ *#cid*  <url>
│ *#get*  <url>
│ *#cfoto*  
│ *#getpic*  <mention>
│ *#hweb*  <url>
│ *#mylid*  
│ *#traducir*  <id+text>
│ *#ss*  <url>
└───────────•


╭─• ⫶☰ \`Inteligencia Artificial.\`
> *Crea imagenes o charla con inteligencia artificial.*
│ *#chatgpt*  <text>
│ *#gemini*  <text>
│ *#imagina*  <text>
│ *#nanob*  <text>
│ *#dalle*  <text>
│ *#seek*  <text>
└───────────•


╭─• ⫶☰ \`Logos con diseño.\`
> *Crea logos personalizados, existe un total de 37 logos.*
│ *#logoc*  <text>
│ *#logo1*  <text>
│ *#logo2*  <text>
│ *#logo3*  <text>
│ *#logo4*  <text>
│ *#logo5*  <text>
│ *#logo6*  <text>
│ *#logo7*  <text>
│ *#logo8*  <text>
│ *#logo9*  <text>
│ *#logo10*  <text>
│ *#logo11*  <text>
│ *#logo12*  <text>
│ *#logo13*  <text>
│ *#logo14*  <text>
│ *#logo15*  <text>
│ *#logo16*  <text>
│ *#logo17*  <text>
│ *#logo18*  <text>
│ *#logo19*  <text>
│ *#logo20*  <text>
│ *#logo21*  <text>
│ *#logo22*  <text>
│ *#logo23*  <text>
│ *#logo24*  <text>
│ *#logo25*  <text>
│ *#logo26*  <text>
│ *#logo27*  <text>
│ *#logo28*  <text>
│ *#logo29*  <text>
│ *#logo30*  <text>
│ *#logo31*  <text>
│ *#logo32*  <text>
│ *#logo33*  <text>
│ *#logo34*  <text>
│ *#logo35*  <text>
│ *#logo36*  <text>
│ *#logo37*  <text>
└───────────•


╭─• ⫶☰ \`Buscadores.\`
> *Busca videos, musicas o imagenes por este medio.*
│ *#aninfo*  <text>
│ *#apples*  <text>
│ *#capcuts*  <text>
│ *#google*  <text>
│ *#pokex*  <text>
│ *#wmusic*  <reply>
│ *#wmusic2*  <reply>
│ *#songs*  <text>
│ *#spotifys*  <text>
│ *#stickerlys*  <text>
│ *#tenor*  <text>
│ *#tiktoks*  <text>
│ *#wikipedia*  <text>
│ *#playlist*  <text>
└───────────•


╭─• ⫶☰ \`Juegos RPG\`
> *Sube de nivel jugando estos comandos.*
│ *#balance*  
│ *#cofre*  
│ *#heal*  
│ *#lb*  
│ *#levelup*  
│ *#minar*  
│ *#work*  
└───────────•


╭─• ⫶☰ \`Servidores\`
> **
│ *#alquilar*  <query>
│ *#comprar*  <query>
│ *#servers*  
└───────────•


╭─• ⫶☰ \`Stalks : Redes\`
> *Vea la información del usuario usando estos comandos.*
│ *#u-github*  <user>
│ *#u-tiktok*  <user>
└───────────•


╭─• ⫶☰ \`Stickers\`
> *Crea tus propios stickers facil y rapido.*
│ *#sticker*  <reply>
│ *#exif*  <text|text>
│ *#d-exif*  
│ *#brat*  <text>
│ *#bratv*  <text>
│ *#emojix*  <emoji+emoji>
│ *#qc*  <text>
│ *#take*  <text>
└───────────•


╭─• ⫶☰ \`Propietario.\`
> *Comandos exclusivos para el propietario y administradores del bot.*
│ *#scopy*  
│ *#resetear*  
│ *#wbot*  <on/off>
│ *#banned*  <mention>
│ *#unban*  <mention>
│ *#block*  <mention>
│ *#unblock*  <mention>
│ *#banlist*  
│ *#blocklist*  
│ *#c+*  <query>
│ *#c-*  <query>
│ *#gplugin*  <query>
│ *#gfile*  <query>
│ *#dfile*  <query>
│ *#vplugin*  <query>
│ *#reprefix*  
│ *#xbot foto*  <reply>
│ *#xbot name*  <text>
│ *#xbot desc*  <text>
│ *#xbot prefix*  <text>
│ *#update*  
│ *#update2*  
│ *#autoadmin*  
└───────────•

`.trim()
const thumbBot = Buffer.from(await (await fetch(`${global.mImagen}`)).arrayBuffer())

await conn.sendMessage(m.chat, { text: infoUser, mentions: [m.sender], contextInfo: { externalAdReply: { 
title: botname, 
body: textbot, 
thumbnail: thumbBot, 
sourceUrl: null, 
mediaType: 1, renderLargerThumbnail: true }}}, { quoted: m })

} catch (e) {
console.error(e)
await conn.sendMessage(m.chat, { text: `*[ 📍 ]*  ERROR_COMMAND = Command error, try again and if the error persists, report the command.` }, { quoted: m })
}
}

handler.help = ['menu']
handler.tags = ['main']
handler.command = ['menu','help','menú','allmenu','menucompleto']

export default handler

function clockString(ms) {
const h = isNaN(ms) ? '--' : Math.floor(ms / 3600000)
const m = isNaN(ms) ? '--' : Math.floor(ms / 60000) % 60
const s = isNaN(ms) ? '--' : Math.floor(ms / 1000) % 60
return [h, m, s].map(v => v.toString().padStart(2, '0')).join(':')
}
  
