import { cpus as _cpus, totalmem, freemem, platform, hostname } from 'os'
import { execSync } from 'child_process'
import { sizeFormatter } from 'human-readable'

let format = sizeFormatter({ std: 'JEDEC', decimalPlaces: 2, keepTrailingZeroes: false, render: (literal, symbol) => `${literal} ${symbol}B` })
let handler = async (m, { conn }) => {
let totalUsers = Object.keys(global.db.data.users).length
let totalChats = Object.keys(global.db.data.chats).length
let totalPlugins = Object.values(global.plugins).filter((v) => v.help && v.tags).length
let totalBots = global.conns.filter(conn => conn.user && conn.ws.socket && conn.ws.socket.readyState !== 3).length
let totalCommands = Object.values(global.db.data.users).reduce((acc, user) => acc + (user.commands || 0), 0)
const thumb = Buffer.from(await (await fetch(`${global.mMages}`)).arrayBuffer())
let system = `·─ ✦ *ESTADO : STATUS* ✦ ─·

> [ *BASICO* ]
⫹⫺ *Servidores:* ${totalBots || "No hay servidores activos."}
⎋ *R. usuarios:* ${totalUsers.toLocaleString()}
⎌ *R. grupos:* ${totalChats.toLocaleString()}
◇ *Plugins* » 423 en total.

> [ *ESTADÍSTICAS* ]
❒ *OS:* Ubuntu 24.04 LTS 
❒ *Version Hosting:* 12.24.22.53-mx
❒ *Ram:* ${format(totalmem())} / 359.8 GB (DDR5 ECC)
❒ *CPU:* AMD EPYC 9654
❒ *Caduca:* 87 dias.
❒ *Dias usado:* 34 dias.
❒ *Coins Server:* $425,835,295
❒ *Consumo:* $300 CoinsMx
❒ *Almacenamiento:* 10 TB NVMe SSD
❒ *Country:* United States
❒ *CountryCode:* US
❒ *Region:* IA
❒ *RegionName:* Iowa
❒ *City:* Council Bluffs
❒ *Lat:* 42.3524
❒ *Lon:* -97.5244
❒ *Timezone:* America/Chicago
❒ *Uptime:* 34:12:29:24`
await conn.sendMessage(m.chat, { text: system, contextInfo: { externalAdReply: { 
title: `「 Estado : Status 」`, 
body: `Estado actual de ${botname}.`, 
thumbnail: thumb, 
sourceUrl: null, 
mediaType: 1, renderLargerThumbnail: false }}}, { quoted: m })
}

handler.help = ['estado']
handler.tags = ['info']
handler.command = ['estado', 'status', 'stat']

export default handler

function toNum(number) {
if (number >= 1000 && number < 1000000) {
return (number / 1000).toFixed(1) + 'k'
} else if (number >= 1000000) {
return (number / 1000000).toFixed(1) + 'M'
} else {
return number.toString()
}}
