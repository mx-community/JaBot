import pkg from '@whiskeysockets/baileys'
import fs from 'fs'
import fetch from 'node-fetch'
import axios from 'axios'
import moment from 'moment-timezone'
const { generateWAMessageFromContent, prepareWAMessageMedia, proto } = pkg

var handler = m => m
handler.all = async function (m) { 
global.canalIdM = ["120363402356085997@newsletter", "120363318353263389@newsletter"]
global.canalNombreM = ["MX COMMUNITY", "MX : NOTIFY"]
global.channelRD = await getRandomChannel()

global.d = new Date(new Date + 3600000)
global.locale = 'es'
global.dia = d.toLocaleDateString(locale, {weekday: 'long'})
global.fecha = d.toLocaleDateString('es', {day: 'numeric', month: 'numeric', year: 'numeric'})
global.mes = d.toLocaleDateString('es', {month: 'long'})
global.año = d.toLocaleDateString('es', {year: 'numeric'})
global.tiempo = d.toLocaleString('en-US', {hour: 'numeric', minute: 'numeric', second: 'numeric', hour12: true})

var canal = 'https://whatsapp.com/channel/0029VbBPMLXHrDZnt0R2iF1d'
var comunidad = 'https://chat.whatsapp.com/H1SzR4nk4qLHeI9cxwMBsW?mode=wwt'
var webmx = 'https://mx-website.vercel.app'
var paypal = 'https://www.paypal.me/aJosueUSDpaypal'

var fMage = "https://qu.ax/BAuJt.jpg"
var fMage2 = "https://qu.ax/BTUHt.jpg"
var fMage3 = "https://qu.ax/shFmH.jpg"
var fImagen = "https://qu.ax/MooSb.jpg"
var fImagen2 = "https://qu.ax/XPDQK.jpg"
var fImagen3 = "https://qu.ax/GbfQk.jpg"

global.redes = [canal, comunidad, webmx, paypal].getRandom()
global.mMages = [fMage, fMage2, fMage3].getRandom()
global.mImagen = [fImagen, fImagen2, fImagen3].getRandom()
//global.mVideos = ["","",""].getRandom()

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
hour = 'Buenas dias, una linda madrugada.'
break
case (hour >= 3 && hour < 7):
hour = 'Buenos dias, un buen amanecer.'
break
case (hour >= 7 && hour < 12):
hour = 'Buenos dias, hermoso medio dia.'
break
case (hour >= 12 && hour < 18):
hour = 'Buenas tardes, la noche cae.'
break
case (hour >= 18 && hour < 22):
hour = 'Buenas noches, una bonita tarde con o sin estrellas.'
break
case (hour >= 22 && hour <= 23):
hour = 'Buenas noches, tiempo de dormir.'
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

global.gMages = [
'https://qu.ax/cngJw.jpg', 
'https://qu.ax/CjXUm.jpg', 
'https://qu.ax/pZHAP.jpg', 
'https://qu.ax/dwCHt.jpg', 
'https://qu.ax/WkCBo.jpg', 
'https://qu.ax/qoYZp.jpg'
].getRandom()

global.takedaHaru = [
'https://qu.ax/BZCXW.jpg', 
'https://qu.ax/niBpw.jpg', 
'https://qu.ax/OdZjV.jpg'
].getRandom()
/*
global.rcanal = { contextInfo: { isForwarded: true, forwardedNewsletterMessageInfo: { newsletterJid: channelRD.id, serverMessageId: '', newsletterName: channelRD.name }, externalAdReply: { title: botname, body: dev, mediaUrl: null, description: null, previewType: "PHOTO", thumbnail: await (await fetch(icono)).buffer(), sourceUrl: redes, mediaType: 1, renderLargerThumbnail: false }, mentionedJid: null }}
}
*/

/*
global.alanFake { contextInfo: { externalAdReply: { title: botname, body: textbot, thumbnail: mMages, sourceUrl: null, mediaType: 1, renderLargerThumbnail: true },},}
global.alanFake2 { contextInfo: { externalAdReply: { title: botname, body: textbot, thumbnail: mMages, sourceUrl: null, mediaType: 1, renderLargerThumbnail: true },},}
global.alanAdv { contextInfo: { externalAdReply: { title: "📍  FUNCIÓN NO EJECUTADO.", body: textbot, thumbnail: , sourceUrl: null, mediaType: 1, renderLargerThumbnail: true },},}
*/
  
global.rcanal = { contextInfo: { isForwarded: true, forwardedNewsletterMessageInfo: { newsletterJid: channelRD.id, serverMessageId: 100, newsletterName: channelRD.name, }, externalAdReply: { title: `${botname}`, body: `${textbot}`, mediaUrl: null, description: null, previewType: "PHOTO", thumbnailUrl: icono, mediaType: 1, renderLargerThumbnail: false },},}
global.rcanalx = { contextInfo: { isForwarded: true, forwardedNewsletterMessageInfo: { newsletterJid: channelRD.id, serverMessageId: 101, newsletterName: channelRD.name, }, externalAdReply: { title: 'CHANNEL : MX', body: `${textbot}`, mediaUrl: null, description: null, previewType: "PHOTO", thumbnailUrl: icono, mediaType: 1, renderLargerThumbnail: false },},}
global.rcanalw = { contextInfo: { isForwarded: true, forwardedNewsletterMessageInfo: { newsletterJid: channelRD.id, serverMessageId: 102, newsletterName: channelRD.name, }, externalAdReply: { title: botname, body: textbot, mediaUrl: null, description: null, previewType: "PHOTO", thumbnailUrl: icono, mediaType: 1, renderLargerThumbnail: false },},}

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
