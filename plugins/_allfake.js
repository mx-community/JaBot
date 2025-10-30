import pkg from '@whiskeysockets/baileys'
import fs from 'fs'
import fetch from 'node-fetch'
import axios from 'axios'
import moment from 'moment-timezone'
const { generateWAMessageFromContent, prepareWAMessageMedia, proto } = pkg

var handler = m => m
handler.all = async function (m) { 
global.canalIdM = ["120363318353263389@newsletter", "120363422142340004@newsletter"]
global.canalNombreM = ["MX - BOT", "MX : NOTIFY"]
global.channelRD = await getRandomChannel()

global.d = new Date(new Date + 3600000)
global.locale = 'es'
global.dia = d.toLocaleDateString(locale, {weekday: 'long'})
global.fecha = d.toLocaleDateString('es', {day: 'numeric', month: 'numeric', year: 'numeric'})
global.mes = d.toLocaleDateString('es', {month: 'long'})
global.año = d.toLocaleDateString('es', {year: 'numeric'})
global.tiempo = d.toLocaleString('en-US', {hour: 'numeric', minute: 'numeric', second: 'numeric', hour12: true})

var canal = 'https://whatsapp.com/channel/0029VbC34Nt42DchIWA0q11f'  
var comunidad = 'https://whatsapp.com/channel/0029VbC34Nt42DchIWA0q11f'
var git = 'https://github.com/Shadow-nex'
var github = 'https://github.com/Shadow-nex/KanekiBot-V3' 
var correo = 'shadowcore.xyz@gmail.com'
global.redes = [canal, comunidad, git, github, correo].getRandom()

global.nombre = m.pushName || 'Anónimo'
global.packsticker = `•─• ⟢ ${botname} ⟣ •─•\nUsuario: ${nombre}\nBot: ${botname}\nCreado: ${fecha}\nHora: ${moment.tz('America/Caracas').format('HH:mm:ss')}`
global.packsticker2 = `\n${textbot}`

global.fake = { contextInfo: { isForwarded: true, forwardedNewsletterMessageInfo: { newsletterJid: channelRD.id, newsletterName: channelRD.name, serverMessageId: -1 }
}}, { quoted: m }

// (Horario Perú 🇵🇪)
var ase = new Date(new Date().toLocaleString("en-US", { timeZone: "America/Lima" }))
var hour = ase.getHours()
switch (true) {
  case (hour >= 0 && hour < 3):
    hour = '🌙 𝗟𝗶𝗻𝗱𝗮 𝗡𝗼𝗰𝗵𝗲 ✨ Que descanses bien 💫'
    break
  case (hour >= 3 && hour < 7):
    hour = '🌄 𝗕𝘂𝗲𝗻 𝗔𝗺𝗮𝗻𝗲𝗰𝗲𝗿 ☀️ ¡Inicia tu día con energía! ⚡'
    break
  case (hour >= 7 && hour < 12):
    hour = '🌞 𝗟𝗶𝗻𝗱𝗮 𝗠𝗮ñ𝗮𝗻𝗮 💐 ¡A brillar como el sol! 🌻'
    break
  case (hour >= 12 && hour < 18):
    hour = '🌤 𝗟𝗶𝗻𝗱𝗮 𝗧𝗮𝗿𝗱𝗲 💖 ¡Sigue dando lo mejor de ti! 💪'
    break
  case (hour >= 18 && hour < 22):
    hour = '🌆 𝗕𝗼𝗻𝗶𝘁𝗮 𝗡𝗼𝗰𝗵𝗲 🌙 ¡Relájate y disfruta el atardecer! 🌇'
    break
  case (hour >= 22 && hour <= 23):
    hour = '🌌 𝗗𝘂𝗹𝗰𝗲𝘀 𝗦𝘂𝗲ñ𝗼𝘀 😴 ¡Descansa y repón energías! 🌙'
    break
}
global.saludo = hour
global.nombre = m.pushName || 'Anónimo'


global.fkontak = { key: { participants:"0@s.whatsapp.net", "remoteJid": "status@broadcast", "fromMe": false, "id": "Halo" }, "message": { "contactMessage": { "vcard": `BEGIN:VCARD\nVERSION:3.0\nN:Sy;Bot;;;\nFN:y\nitem1.TEL;waid=${m.sender.split('@')[0]}:${m.sender.split('@')[0]}\nitem1.X-ABLabel:Ponsel\nEND:VCARD` }}, "participant": "0@s.whatsapp.net" }

global.icono = [
'https://qu.ax/BAuJt.jpg', 
'https://qu.ax/BTUHt.jpg', 
'https://qu.ax/shFmH.jpg',
'https://qu.ax/MooSb.jpg',
'https://qu.ax/XPDQK.jpg',
'https://qu.ax/GbfQk.jpg'
].getRandom()
/*
global.rcanal = { contextInfo: { isForwarded: true, forwardedNewsletterMessageInfo: { newsletterJid: channelRD.id, serverMessageId: '', newsletterName: channelRD.name }, externalAdReply: { title: botname, body: dev, mediaUrl: null, description: null, previewType: "PHOTO", thumbnail: await (await fetch(icono)).buffer(), sourceUrl: redes, mediaType: 1, renderLargerThumbnail: false }, mentionedJid: null }}
}
*/
global.rcanal = {
  contextInfo: {
    isForwarded: true,
    forwardedNewsletterMessageInfo: {
      newsletterJid: channelRD.id,
      serverMessageId: 100,
      newsletterName: channelRD.name,
    },
    externalAdReply: {
      title: `${botname} : @mx-commynity`,
      body: `${textbot}`,
      mediaUrl: null,
      description: null,
      previewType: "PHOTO",
      thumbnailUrl: icono,
      mediaType: 1,
      renderLargerThumbnail: false
    },
  },
}

global.rcanalx = {
  contextInfo: {
    isForwarded: true,
    forwardedNewsletterMessageInfo: {
      newsletterJid: channelRD.id,
      serverMessageId: 101,
      newsletterName: channelRD.name,
    },
    externalAdReply: {
      title: 'CHANNEL : MX',
      body: `${textbot}`,
      mediaUrl: null,
      description: null,
      previewType: "PHOTO",
      thumbnailUrl: icono,
      mediaType: 1,
      renderLargerThumbnail: false
    },
  },
}

global.rcanalw = {
  contextInfo: {
    isForwarded: true,
    forwardedNewsletterMessageInfo: {
      newsletterJid: channelRD.id,
      serverMessageId: 102,
      newsletterName: channelRD.name,
    },
    externalAdReply: {
      title: botname,
      body: textbot,
      mediaUrl: null,
      description: null,
      previewType: "PHOTO",
      thumbnailUrl: icono,
      mediaType: 1,
      renderLargerThumbnail: false
    },
  },
}

}
export default handler

function pickRandom(list) {
return list[Math.floor(Math.random() * list.length)]
}

async function getRandomChannel() {
let randomIndex = Math.floor(Math.random() * canalIdM.length)
let id = canalIdM[randomIndex]
let name = canalNombreM[randomIndex]
return { id, name }
}
