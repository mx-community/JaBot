import fetch from 'node-fetch'
import { xpRange } from '../lib/levelling.js'
import fs from 'fs'
import PhoneNumber from 'awesome-phonenumber'

let handler = async (m, { conn, usedPrefix, __dirname, participants }) => {
try {
await m.react('📍')

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

╭──• ⩽ *Information* ⩾ •──• · · ·
│⫶☰ _Informaciones bases._
│✎  *#ping*  
│✎  *#stat*  
│✎  *#creador*  
│✎  *#grupos*  
│✎  *#canal*  
│✎  *#ds*  
│✎  *#report*  <query>
│✎  *#suggest*  <query>
│✎  *#stest*  
│✎  *#main*  
╰──────• ⩽⩾ •─────• · · ·

╭──• ⩽ *Download* ⩾ •──• · · ·
│⫶☰ _Descargadores disponibles._
│✎  *#play*  <text>
│✎  *#audio*  <url/text>
│✎  *#video*  <url/text>
│✎  *#mediafire*  <url>
│✎  *#facebook*  <url>
│✎  *#instagram*  <url>
│✎  *#twitter*  <url>
│✎  *#threads*  <url>
│✎  *#terabox*  <url>
│✎  *#kwaii*  <url>
│✎  *#tiktok*  <url>
│✎  *#spotify*  <url>
│✎  *#sound*  <url>
│✎  *#stickerly*  <url>
│✎  *#mega*  <url>
│✎  *#github*  <url>
│✎  *#imagen*  <url>
│✎  *#pinterest*  <text/url>
│✎  *#pinimg*  <text>
│✎  *#pinvid*  <text>
╰──────• ⩽⩾ •─────• · · ·

╭──• ⩽ *Groups* ⩾ •──• · · ·
│⫶☰ _Para chats grupales._
│✎  *#add*  <number>
│✎  *#kick*  <mention>
│✎  *#promote*  <mention>
│✎  *#demote*  <mention>
│✎  *#link*  
│✎  *#revoke*  
│✎  *#delete*  <reply>
│✎  *#bot on/off*  
│✎  *#gw name*  <text>
│✎  *#gw desc*  <text>
│✎  *#gw foto*  <reply>
│✎  *#gw welc*  <text>
│✎  *#gw t-welc*  
│✎  *#gw bye*  <text>
│✎  *#gw t-bye*  
│✎  *#gw bchat*  
│✎  *#gw bchat2*  
│✎  *#setprim*  <mention>
│✎  *#notify*  <reply>
│✎  *#tagall*  <text>
│✎  *#warn*  <mention>
│✎  *#unwarn*  <mention>
╰──────• ⩽⩾ •─────• · · ·

╭──• ⩽ *Settings* ⩾ •──• · · ·
│⫶☰ _Ajustes aleatorios._
│✎  *#cid*  <url>
│✎  *#getpic*  <mention>
│✎  *#mylid*  
│✎  *#trad*  <code/text>
│✎  *#ss*  <url>
│✎  *#fetch*  <url>
│✎  *#calc*  <query>
╰──────• ⩽⩾ •─────• · · ·

╭──• ⩽ *RPG* ⩾ •──• · · ·
│⫶☰ _Gana experiencia y nivel._
│✎  *#balance*  
│✎  *#cofre*  
│✎  *#heal*  
│✎  *#lb*  
│✎  *#levelup*  
│✎  *#mine*  
│✎  *#profile*  
│✎  *#birth*  <query>
│✎  *#d-birth*  
│✎  *#genero*  <query>
│✎  *#d-genero*  
│✎  *#desc*  <query>
│✎  *#d-desc*  
│✎  *#work*  
╰──────• ⩽⩾ •─────• · · ·

╭──• ⩽ *Logos* ⩾ •──• · · ·
│⫶☰ _Crea logos personalizados_
│✎  *#logoc*  <text>
│✎  *#logo1*  <text>
│✎  *#logo2*  <text>
│✎  *#logo3*  <text>
│✎  *#logo4*  <text>
│✎  *#logo5*  <text>
│✎  *#logo6*  <text>
│✎  *#logo7*  <text>
│✎  *#logo8*  <text>
│✎  *#logo9*  <text>
│✎  *#logo10*  <text>
│✎  *#logo11*  <text>
│✎  *#logo12*  <text>
│✎  *#logo13*  <text>
│✎  *#logo14*  <text>
│✎  *#logo15*  <text>
│✎  *#logo16*  <text>
│✎  *#logo17*  <text>
│✎  *#logo18*  <text>
│✎  *#logo19*  <text>
│✎  *#logo20*  <text>
│✎  *#logo21*  <text>
│✎  *#logo22*  <text>
│✎  *#logo23*  <text>
│✎  *#logo24*  <text>
│✎  *#logo25*  <text>
│✎  *#logo26*  <text>
│✎  *#logo27*  <text>
│✎  *#logo28*  <text>
│✎  *#logo29*  <text>
│✎  *#logo30*  <text>
│✎  *#logo31*  <text>
│✎  *#logo32*  <text>
│✎  *#logo33*  <text>
│✎  *#logo34*  <text>
│✎  *#logo35*  <text>
│✎  *#logo36*  <text>
│✎  *#logo37*  <text>
╰──────• ⩽⩾ •─────• · · ·

╭──• ⩽ *Inteligence* ⩾ •──• · · ·
│⫶☰ _Chat bots de calidad._
│✎  *#takeda*  <text>
│✎  *#dalle*  <text>
│✎  *#flux*  <text>
│✎  *#luminai*  <text>
╰──────• ⩽⩾ •─────• · · ·

╭──• ⩽ *Stickers* ⩾ •──• · · ·
│⫶☰ _Crea stickers únicos._
│✎  *#sticker*  <reply>
│✎  *#exif*  <text|text>
│✎  *#d-exif*  
│✎  *#brat*  <text>
│✎  *#bratv*  <text>
│✎  *#emojix*  <emoji+emoji>
│✎  *#qc*  <text>
│✎  *#take*  <reply>
╰──────• ⩽⩾ •─────• · · ·

╭──• ⩽ *Sockets* ⩾ •──• · · ·
│⫶☰ _Servidores disponibles._
│✎  *#s-name*  <text>
│✎  *#s-desc*  <text>
│✎  *#s-foto*  <reply>
│✎  *#servers*  
│✎  *#newserver*  
╰──────• ⩽⩾ •─────• · · ·

╭──• ⩽ *Search* ⩾ •──• · · ·
│⫶☰ _Buscadores disponibles._
│✎  *#tenor*  <text>
│✎  *#tiktoks*  <text>
│✎  *#wikipedia*  <text>
│✎  *#spotifys*  <text>
│✎  *#wmusic*  <reply>
│✎  *#stickerlys*  <text>
│✎  *#songs*  <text>
│✎  *#wmusic2*  <reply>
│✎  *#pokex*  <query>
│✎  *#capcuts*  <text>
│✎  *#apples*  <text>
│✎  *#google*  <text>
╰──────• ⩽⩾ •─────• · · ·

╭──• ⩽ *Stalks* ⩾ •──• · · ·
│⫶☰ _Informacion sobre usuarios._
│✎  *#u-tiktok*  <user>
│✎  *#u-github*  <user>
╰──────• ⩽⩾ •─────• · · ·

╭──• ⩽ *Reactions* ⩾ •──• · · ·
│⫶☰ _Reacciones con amigos._
│✎  *#angry*  <mention>
│✎  *#bath*  <mention>
│✎  *#bite*  <mention>
│✎  *#bleh*  <mention>
│✎  *#blush*  <mention>
│✎  *#bored*  <mention>
│✎  *#clap*  <mention>
│✎  *#coffe*  <mention>
│✎  *#cry*  <mention>
│✎  *#cuddle*  <mention>
│✎  *#dance*  <mention>
│✎  *#drunk*  <mention>
│✎  *#eat*  <mention>
│✎  *#facepalm*  <mention>
│✎  *#happy*  <mention>
│✎  *#hug*  <mention>
│✎  *#kill*  <mention>
│✎  *#kiss*  <mention>
│✎  *#laugh*  <mention>
│✎  *#lick*  <mention>
│✎  *#slap*  <mention>
│✎  *#sleep*  <mention>
│✎  *#smoke*  <mention>
│✎  *#spit*  <mention>
│✎  *#step*  <mention>
│✎  *#think*  <mention>
│✎  *#love*  <mention>
│✎  *#pat*  <mention>
│✎  *#poke*  <mention>
│✎  *#pout*  <mention>
│✎  *#punch*  <mention>
│✎  *#preg*  <mention>
│✎  *#run*  <mention>
│✎  *#sad*  <mention>
│✎  *#scared*  <mention>
│✎  *#seduce*  <mention>
│✎  *#shy*  <mention>
│✎  *#walk*  <mention>
│✎  *#beso*  <mention>
│✎  *#dramatic*  <mention>
│✎  *#cringe*  <mention>
│✎  *#wink*  <mention>
│✎  *#smug*  <mention>
│✎  *#smile*  <mention>
│✎  *#5*  <mention>
│✎  *#bully*  <mention>
│✎  *#mano*  <mention>
│✎  *#wave*  <mention>
╰──────• ⩽⩾ •─────• · · ·

╭──• ⩽ *Creador* ⩾ •──• · · ·
│⫶☰ _Solo para owners._
│✎  *#banned*  <mention>
│✎  *#unban*  <mention>
│✎  *#block*  <mention>
│✎  *#unblock*  <mention>
│✎  *#banlist*  
│✎  *#blocklist*  
│✎  *#c-*  <code>
│✎  *#c+*  <code>
│✎  *#gplugin*  <reply>
│✎  *#gfile*  <query/text>
│✎  *#dfile*  <query/text>
│✎  *#vplugin*  <query>
│✎  *#reprefix*  
│✎  *#join*  <url/query>
│✎  *#vip*  <query>
│✎  *#restart*  
│✎  *#xbot foto*  <reply>
│✎  *#xbot name*  <text>
│✎  *#xbot desc*  <text>
│✎  *#xbot prefix*  <query>
│✎  *#update*  
│✎  *#syntax*  
│✎  *#autoadmin*  
╰──────• ⩽⩾ •─────• · · ·
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
