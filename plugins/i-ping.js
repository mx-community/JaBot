import speed from 'performance-now'
import { exec } from 'child_process'
import moment from 'moment-timezone'
import os from 'os'
import fetch from 'node-fetch'

let handler = async (m, { conn }) => {
const start = new Date().getTime()
await conn.sendMessage(m.chat, { text: `📍  Enviando resultados de avance, espere un momento...` }, { quoted: m })
const end = new Date().getTime()
const ping = end - start

const timestamp = speed()
const latency = speed() - timestamp

const uptime = process.uptime()
const hours = Math.floor(uptime / 3600)
const minutes = Math.floor((uptime % 3600) / 60)
const seconds = Math.floor(uptime % 60)
const uptimeFormatted = `${hours}h ${minutes}m ${seconds}s`

const usedRAM = (process.memoryUsage().heapUsed / 1024 / 1024 / 1024).toFixed(2)
const totalRAM = (os.totalmem() / 1024 / 1024 / 1024).toFixed(2)
const freeRAM = (os.freemem() / 1024 / 1024 / 1024).toFixed(2)
const cpu = os.cpus()[0]
const cpuModel = cpu.model.split('@')[0].trim()
const cpuSpeed = (cpu.speed / 1000).toFixed(2) // GHz 👻
const cores = os.cpus().length
const arch = os.arch()
const platform = os.platform().toUpperCase()
const nodeVer = process.version
const hostname = os.hostname()
const loadAvg = os.loadavg().map(n => n.toFixed(2)).join(', ')
const fechaHora = moment().tz('America/Buenos_Aires').format('YYYY/MM/DD, h:mm:ss A')

const thumb = Buffer.from(await (await fetch(`${global.mImagen}`)).arrayBuffer())

exec('neofetch --stdout', async (error, stdout) => {
let sysInfo = stdout.toString('utf-8').replace(/Memory:/, 'Ram:')
let response = `> •─• ⟢ *PING : TEST* ⟣ •─•
⊸❒ *Ping:* ${ping} ms
⊸❒ *Latencia:* ${latency.toFixed(2)} ms
⊸❒ *Actividad:* ${uptimeFormatted}
⊸❒ *F.H:* ${fechaHora}

> •─• ⟢ *USO DE RAM* ⟣ •─•
⊸❒ *Ram usado:* ${usedRAM} GB
⊸❒ *Ram libre:* ${freeRAM} GB
⊸❒ *Ram total:* ${totalRAM} GB

> •─• ⟢ *DETALLES* ⟣ •─•
⊸❒ *Carga:* ${loadAvg}
⊸❒ *Modelo:* ${cpuModel}
⊸❒ *Velocidad:* ${cpuSpeed} GHz
⊸❒ *Núcleos:* ${cores}
⊸❒ *Arquitectura:* ${arch}
⊸❒ *Plataforma:* ${platform}
⊸❒ *Hosting:* ${hostname} 
⊸❒ *Node.js:* ${nodeVer}
⊸❒ *Baileys:* mx-data@bails.
⊸❒ *Punto:* 1838284929392823.(true)
⊸❒ *Block:* @mx-community/unblock`

await conn.sendMessage(m.chat, {
text: response,
mentions: [m.sender],
contextInfo: {
externalAdReply: {
title: botname,
body: textbot,
thumbnail: thumb,
sourceUrl: redes,
mediaType: 1,
renderLargerThumbnail: true
}
}
}, { quoted: fkontak })
})
}

handler.help = ['ping', 'status', 'info']
handler.tags = ['info']
handler.command = ['ping', 'p', 'status']

export default handler
                                            
