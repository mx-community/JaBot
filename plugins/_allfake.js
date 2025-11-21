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
global.tiempo = d.toLocaleString('es-AR', {hour: 'numeric', minute: 'numeric', second: 'numeric', hour12: true})

var canal = 'https://whatsapp.com/channel/0029VbBPMLXHrDZnt0R2iF1d'
var comunidad = 'https://chat.whatsapp.com/H1SzR4nk4qLHeI9cxwMBsW?mode=wwt'
var webmx = 'https://mx-website.vercel.app'
var paypal = 'https://www.paypal.me/aJosueUSDpaypal'

//Nombre y mas
global.botname = "ＴＯＲＵ : WhatsApp IA"
global.botgroup = "https://chat.whatsapp.com/H1SzR4nk4qLHeI9cxwMBsW?mode=wwt"
global.botcanal = "https://whatsapp.com/channel/0029VbBPMLXHrDZnt0R2iF1d"
global.botweb = "https://wa.me/5493873655135"
global.botmenu = "https://files.catbox.moe/nw4zrd.jpg"
global.botimg = "https://files.catbox.moe/3hm7im.jpg"
global.textbot = "ʙᴏᴛ ɪɴᴛᴇɢʀᴀᴛᴇᴅ ᴡɪᴛʜ ᴡʜᴀᴛsᴀᴘᴘ."
  
  //APIS MX 📍
global.apisf = 'https://delirius-apiofc.vercel.app'
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
  
  
global.fMage = "https://files.catbox.moe/elksya.jpg"
global.fMage2 = "https://files.catbox.moe/3hm7im.jpg"

global.fImagen = "https://files.catbox.moe/nw4zrd.jpg"
global.fImagen2 = "https://files.catbox.moe/esnv6d.jpg"
  
global.redes = [canal, comunidad, webmx, paypal].getRandom()
global.mMages = ["https://files.catbox.moe/elksya.jpg", "https://files.catbox.moe/3hm7im.jpg"].getRandom()
  //[fMage, fMage2, fMage3, fMage4, fMage5, fMage6, fMage7, fMage8, fMage9, fMage10, fMage11, fMage12, fMage13, fMage14, fMage15, fMage16, fMage17, fMage18].getRandom()
global.mImagen = ["https://files.catbox.moe/nw4zrd.jpg", "https://files.catbox.moe/esnv6d.jpg"].getRandom()
  //[fImagen, fImagen2, fImagen3, fImagen4, fImagen5, fImagen6, fImagen7, fImagen8, fImagen9, fImagen10, fImagen11, fImagen12, fImagen13, fImagen14].getRandom()
//global.mVideos = ["","",""].getRandom()

global.nombre = m.pushName || 'Anónimo'
global.packsticker = `· · · ─ ┄ ＴＯＲＵ ┄ ─ · · ·`
global.packsticker2 = `\n々 ${nombre}\n々 WhatsApp\n· · · ─ ┄ ⚶ ┄ ─ · · ·`

global.fake = { contextInfo: { isForwarded: true, forwardedNewsletterMessageInfo: { newsletterJid: channelRD.id, newsletterName: channelRD.name, serverMessageId: -1 }
}}, { quoted: m }

// HORARIO 📍
var ase = new Date(new Date().toLocaleString("en-AR", { timeZone: "America/Buenos_Aires" }))
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
"https://files.catbox.moe/elksya.jpg", 
"https://files.catbox.moe/3hm7im.jpg"
].getRandom()
  
global.rcanal = { contextInfo: { isForwarded: true, forwardedNewsletterMessageInfo: { newsletterJid: channelRD.id, serverMessageId: 100, newsletterName: channelRD.name, }, externalAdReply: { title: `· · · ─ ┄ ＴＯＲＵ ┄ ─ · · ·`, body: `${textbot}`, mediaUrl: null, description: null, previewType: "PHOTO", thumbnailUrl: icono, mediaType: 1, renderLargerThumbnail: false },},}

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
