import db from '../lib/database.js'
import fs from 'fs'
import fetch from 'node-fetch'
import PhoneNumber from 'awesome-phonenumber'
import { createHash } from 'crypto'
import baileys from '@whiskeysockets/baileys'

const { proto } = baileys
let Reg = /\|?(.*)([.|] *?)([0-9]*)$/i

let handler = async function (m, { conn, text, usedPrefix, command }) {
const who = m.mentionedJid && m.mentionedJid[0]
? m.mentionedJid[0]
: m.fromMe
? conn.user.jid
: m.sender

const banner = 'https://i.pinimg.com/originals/90/c8/58/90c858c65f0b3b2fca9a226fa369aa2b.png'
const user = global.db.data.users[m.sender]
const name2 = await conn.getName(m.sender)
const pp = await conn.profilePictureUrl(who, 'image').catch(() => banner)

let bio
try {
const info = await conn.fetchStatus(who)
bio = info?.status?.trim() || "Sin descripción personal..."
} catch {
bio = "Sin descripción personal..."
}

const thumbBuffer = await fetch('https://i.postimg.cc/rFfVL8Ps/image.jpg')
.then(v => v.arrayBuffer())
.then(v => Buffer.from(v))
.catch(() => null)

const fkontak = {
key: { participant: '0@s.whatsapp.net', remoteJid: 'status@broadcast', fromMe: false, id: '📍' },
message: { locationMessage: { name: 'Registro.', jpegThumbnail: thumbBuffer } },
participant: '0@s.whatsapp.net'
}

if (user.registered) return conn.sendMessage(m.chat, { text: `📍  Ya estas regidtrado en la base de datos.` }, { quoted: m })
if (!Reg.test(text)) return conn.sendMessage(m.chat, { text: `Ingrese el comando y escriba su nombre y edad para registrarte.\n\n• Por ejemplo:\n*#${command}* Alan.18` }, { quoted: m })

let [_, name, splitter, age] = text.match(Reg)
if (!name) return conn.sendMessage(m.chat, { text: `📍  El nombre es opcional, registrate con tu nombre.\n\n• Por ejemplo:\n*#${command}* Alan.18` }, { quoted: m })
if (!age) return conn.sendMessage(m.chat, { text: `📍  La edad es opcional, registrese con su edad.\n\n• Por ejemplo:\n*#${command}* Alan.18` }, { quoted: m })
if (name.length >= 25) return conn.sendMessage(m.chat, { text: `📍  El nombre no debe de tener mas de 25 caracteres.` }, { quoted: m })
age = parseInt(age)
if (age > 100) return conn.sendMessage(m.chat, { text: `📍  El limite de mayor edad es de 99 años.` }, { quoted: m })
if (age < 10) return conn.sendMessage(m.chat, { text: `📍  El limite de menor edad es de 10 años.` }, { quoted: m })
user.name = `${name}`
user.age = age
user.regTime = +new Date()
user.registered = true

const hora = new Date().toLocaleTimeString('es-PE', { timeZone: 'America/Lima' })
const fechaObj = new Date()
const fecha = fechaObj.toLocaleDateString('es-PE', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'America/Lima' })
const dia = fechaObj.toLocaleDateString('es-PE', { weekday: 'long', timeZone: 'America/Lima' })
const sn = createHash('md5').update(m.sender).digest('hex').slice(0, 20)

const texto1 = `
·─┄ · ✦ *Register : Success* ✦ ·

⊹ ✎ *Usuario:* @${name2} ( ${name} )
⊹ ✎ *Numero:* ${PhoneNumber('+' + who.replace('@s.whatsapp.net', '')).getNumber('international')}
⊹ ✎ *Edad:* ${age} años.
⊹ ✎ *Codigo:* ${sn}-code
⊹ ✎ *Verificación:* ${hora}, ${dia}, ${fecha}`

await conn.sendMessage(m.chat, { text: texto1, mentions: [m.sender], contextInfo: { externalAdReply: { 
title: global.botname, 
body: global.textbot, 
thumbnail: global.mMages, 
sourceUrl: null, 
mediaType: 1, renderLargerThumbnail: true }}}, { quoted: m })
}

handler.help = ['reg']
handler.tags = ['rg']
handler.command = ['verify', 'verificar', 'reg', 'register', 'registrar']

export default handler