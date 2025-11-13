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

  //APIS MX 📍
global.apimx_cafirexos = 'https://api.cafirexos.com'
global.apimx_key = 'BrunoSobrino'
global.apimx_brunosobrino = 'https://api-brunosobrino-dcaf9040.koyeb.app'
global.apimx_brunosobrino2 = 'https://api-brunosobrino.onrender.com'
global.baseapi_delirius = "https://delirius-apiofc.vercel.app"
global.baseapi_skynex = "https://skynex.boxmine.xyz"
global.apirest_key = 'BrunoSobrino' 
global.apirest_url = 'https://api.cafirexos.com' // Bloqueo de IP -> usar esta para no ser bloqueado: 'https://api-brunosobrino.onrender.com';
global.apirest_url2 = 'https://api-brunosobrino-dcaf9040.koyeb.app'
global.apirest_url3 = 'https://api-brunosobrino.onrender.com'
  
  
var fMage = "https://qu.ax/pZHAP.jpg"
var fMage2 = "https://qu.ax/CjXUm.jpg"
var fMage3 = "https://qu.ax/OdZjV.jpg"
var fMage4 = "https://qu.ax/BZCXW.jpg"
var fMage5 = "https://qu.ax/NUtMi.jpg"
var fMage6 = "https://qu.ax/nCkOS.jpg"
var fMage7 = "https://qu.ax/niBpw.jpg"
var fMage8 = "https://qu.ax/WkCBo.jpg"
var fMage9 = "https://qu.ax/qoYZp.jpg"
var fMage10 = "https://qu.ax/cngJw.jpg"
var fMage11 = "https://qu.ax/dwCHt.jpg"
var fMage12 = "https://qu.ax/yDSeo.jpg"
var fMage13 = "https://qu.ax/shFmH.jpg"
var fMage14 = "https://qu.ax/fEaFZ.jpg"
var fMage15 = "https://qu.ax/MDYPK.jpg"
var fMage16 = "https://qu.ax/XkGjU.jpg"
var fMage17 = "https://qu.ax/uxLCn.jpg"
var fMage18 = "https://qu.ax/fpAtH.jpg"

var fImagen = "https://qu.ax/mGWJo.jpg"
var fImagen2 = "https://qu.ax/yjwKQ.jpg"
var fImagen3 = "https://qu.ax/xKQmY.jpg"
var fImagen4 = "https://qu.ax/FGOYw.jpg"
var fImagen5 = "https://qu.ax/WeZPb.jpg"
var fImagen6 = "https://qu.ax/WmGNt.jpg"
var fImagen7 = "https://qu.ax/BfvEb.jpg"
var fImagen8 = "https://qu.ax/eaYtC.jpg"
var fImagen9 = "https://qu.ax/MVmRD.jpg"
var fImagen10 = "https://qu.ax/GbfQk.jpg"
var fImagen11 = "https://qu.ax/XPDQK.jpg"
var fImagen12 = "https://qu.ax/hNADg.jpg"
var fImagen13 = "https://qu.ax/Vijkj.jpg"
var fImagen14 = "https://qu.ax/ptwXa.jpg"
  
global.redes = [canal, comunidad, webmx, paypal].getRandom()
global.mMages = [fMage, fMage2, fMage3, fMage4, fMage5, fMage6, fMage7, fMage8, fMage9, fMage10, fMage11, fMage12, fMage13, fMage14, fMage15, fMage16, fMage17, fMage18].getRandom()
global.mImagen = [fImagen, fImagen2, fImagen3, fImagen4, fImagen5, fImagen6, fImagen7, fImagen8, fImagen9, fImagen10, fImagen11, fImagen12, fImagen13, fImagen14].getRandom()
//global.mVideos = ["","",""].getRandom()

global.nombre = m.pushName || 'Anónimo'
global.packsticker = `•─• ⟢ STICKER ⟣ •─•\nUsuario: ${nombre}\nBot: ${botname}\nCreado: ${fecha}\nHora: ${moment.tz('America/Caracas').format('HH:mm:ss')}`
global.packsticker2 = `\n•─• ⟢ CREATED ⟣ •─•`

global.fake = { contextInfo: { isForwarded: true, forwardedNewsletterMessageInfo: { newsletterJid: channelRD.id, newsletterName: channelRD.name, serverMessageId: -1 }
}}, { quoted: m }

// HORARIO 📍
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
"https://qu.ax/pZHAP.jpg", 
"https://qu.ax/CjXUm.jpg", 
"https://qu.ax/OdZjV.jpg", 
"https://qu.ax/BZCXW.jpg", 
"https://qu.ax/NUtMi.jpg", 
"https://qu.ax/nCkOS.jpg", 
"https://qu.ax/niBpw.jpg", 
"https://qu.ax/WkCBo.jpg", 
"https://qu.ax/qoYZp.jpg", 
"https://qu.ax/cngJw.jpg", 
"https://qu.ax/dwCHt.jpg", 
"https://qu.ax/yDSeo.jpg", 
"https://qu.ax/shFmH.jpg", 
"https://qu.ax/fEaFZ.jpg", 
"https://qu.ax/MDYPK.jpg", 
"https://qu.ax/XkGjU.jpg", 
"https://qu.ax/uxLCn.jpg", 
"https://qu.ax/fpAtH.jpg"
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
