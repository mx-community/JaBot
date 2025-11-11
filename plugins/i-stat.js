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
⏍ *Comandos:* ${toNum(totalCommands)}
⎋ *R. usuarios:* ${totalUsers.toLocaleString()}
⎌ *R. grupos:* ${totalChats.toLocaleString()}\n◇ *Plugins* » ${totalPlugins}
⫹⫺ *Servidores:* ${totalBots || "No hay servidores activos."}

> ⩽ *Servidor : ${hostname().slice(0, 8)}...* ⩾
⟡ *Plataforma:* ${platform()}
⟡ *CPU:* ${_cpus().length} cores
⟡ *RAM:* ${format(totalmem())}
⟡ *RAM Usado:* ${format(totalmem() - freemem())}
⟡ *Arquitectura:* » ${process.arch}

> ⩽ *Detalle : Node.js* ⩾
≽ *Ram Utilizada:* ${format(process.memoryUsage().rss)}
≽ *Heap Reservado:* ${format(process.memoryUsage().heapTotal)}
≽ *Heap Usado:* ${format(process.memoryUsage().heapUsed)}
≽ *Módulos Nativos:* ${format(process.memoryUsage().external)}
≽ *Buffers de Datos:* ${format(process.memoryUsage().arrayBuffers)}`
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
