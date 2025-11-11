import { readdirSync, unlinkSync, existsSync, promises as fs } from 'fs'
import path from 'path'
import cp from 'child_process'
import { promisify } from 'util'
import moment from 'moment-timezone'
import fetch from 'node-fetch'
const exec = promisify(cp.exec).bind(cp)
const linkRegex = /https:\/\/chat\.whatsapp\.com\/([0-9A-Za-z]{20,24})/i

const handler = async (m, { conn, text, command, usedPrefix, args }) => {
try {
const nombre = m.pushName || 'Anónimo'
const tag = '@' + m.sender.split('@')[0]
const usertag = Array.from(new Set([...text.matchAll(/@(\d{5,})/g)]), m => `${m[1]}@s.whatsapp.net`)
const chatLabel = m.isGroup ? (await conn.getName(m.chat) || 'Grupal') : 'Privado'
const horario = `${moment.tz('America/Caracas').format('DD/MM/YYYY hh:mm:ss A')}`
switch (command) {
case 'speedtest': case 'stest': {
await conn.sendMessage(m.chat, { text: `Verificando velocidad, espere un momento...` }, { quoted: m })
const o = await exec('python3 ./lib/ookla-speedtest.py --secure --share')
const { stdout, stderr } = o
if (stdout.trim()) {
const url = stdout.match(/http[^"]+\.png/)?.[0]
if (url) await conn.sendMessage(m.chat, { image: { url }, caption: stdout.trim() }, { quoted: m })
}
if (stderr.trim()) {
const url2 = stderr.match(/http[^"]+\.png/)?.[0]
if (url2) await conn.sendMessage(m.chat, { image: { url: url2 }, caption: stderr.trim() }, { quoted: m })
}
break
}
case 'fixmsg': case 'ds': {
if (global.conn.user.jid !== conn.user.jid)
return conn.sendMessage(m.chat, { text: `📍  Este comando solo funciona en el numero principal del bot.` }, { quoted: m })
await conn.sendMessage(m.chat, { text: `Buscando archivos duplicados, espere un momento...` }, { quoted: m })

const chatIdList = m.isGroup ? [m.chat, m.sender] : [m.sender]
const sessionPath = './Sessions/'
let files = await fs.readdir(sessionPath)
let count = 0
for (let file of files) {
for (let id of chatIdList) {
if (file.includes(id.split('@')[0])) {
await fs.unlink(path.join(sessionPath, file))
count++
break
}}}
conn.sendMessage(m.chat, { text: `${count === 0 ? '✓  No se han encontrado archivos duplicados para eliminar.' : `✓  Se han eliminado *${count}* archivos duplicados con exito.`}` }, { quoted: m })
break
}
case 'main': case 'internet': {
await conn.sendMessage(m.chat, { text: `Enviando información variable, espere un momento...` }, { quoted: m })
const res = await fetch('https://api.github.com/repos/Shadow-nex/KanekiBot-V3')
if (!res.ok) throw new Error('No se pudo obtener los datos del repositorio.')
const json = await res.json()
const txt = `「 *Main : Info* 」

⧁ *Instagram:* ++++++
⧁ *Facebook* ++++++
⧁ *Twitter* ++++++
⧁ *WhatsApp:* ++++++
⧁ *Telegram:* ++++++`
await conn.sendMessage(m.chat, { image: catalogo, caption: txt }, { quoted: m })

break
}}} catch (err) {
await conn.sendMessage(m.chat, { text: `*[ 📍 ]*  ERROR_COMMAND = Command error, try again and if the error persists, report the command.` }, { quoted: m })
}}

handler.help = ['suggest', 'reporte', 'invite', 'speedtest', 'fixmsg', 'script']
handler.tags = ['main']
handler.command = ['speedtest', 'stest', 'fixmsg', 'ds', 'internet', 'main']

export default handler
