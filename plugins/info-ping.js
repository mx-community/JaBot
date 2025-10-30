/*import speed from 'performance-now'
import { exec } from 'child_process'
import moment from 'moment-timezone'
import fetch from 'node-fetch'

let handler = async (m, { conn }) => {
  let timestamp = speed()
  let latensi = speed() - timestamp

  const start = new Date().getTime()
  await conn.sendMessage(m.chat, { text: `*⚙️ 𝘊𝘢𝘭𝘤𝘶𝘭𝘢𝘯𝘥𝘰 𝘱𝘪𝘯𝘨...*` }, { quoted: m })
  const end = new Date().getTime()
  const latency = end - start

  const uptime = process.uptime()
  const hours = Math.floor(uptime / 3600)
  const minutes = Math.floor((uptime % 3600) / 60)
  const secondsUp = Math.floor(uptime % 60)
  const uptimeFormatted = `${hours}h ${minutes}m ${secondsUp}s`

  const usedRAM = (process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)
  const fechaHora = moment().tz('America/Lima').format('YYYY/MM/DD, h:mm A')

  const thumbBuffer = Buffer.from(await (await fetch('https://files.catbox.moe/ge2vz7.jpg')).arrayBuffer())

  exec(`neofetch --stdout`, async (error, stdout) => {
    let sysInfo = stdout.toString("utf-8").replace(/Memory:/, "Ram:")

    let response = 
` \`⚡ 𝗦 𝗧 𝗔 𝗧 𝗨 𝗦 • 𝗣 𝗜 𝗡 𝗚 🌿\`

┌ ° 🌟 *Ping:* ${latency} ms
> ° 📡 *Latency:* ${latensi.toFixed(4)} ms
> ° 💻 *RAM Usage:* ${usedRAM} MB
> ° ⏳ *Uptime:* ${uptimeFormatted}
└ ° 🗓️ *Date/Time:* ${fechaHora}
\`\`\`${sysInfo.trim()}\`\`\`
> ☄︎ кαиєкι вσт ν3 | 𝙿𝙾𝚆𝙴𝚁𝙴𝙳 𝙱𝚈 𝚂𝙷𝙰𝙳𝙾𝚆-𝚇𝚈𝚉`

    await conn.sendMessage(m.chat, {
      text: response,
      mentions: [m.sender],
      contextInfo: {
        externalAdReply: {
          title: '👑 𝐊𝐚𝐧𝐞𝐤𝐢 𝐁𝐨𝐭 𝐕3 💫 ',
          body: '🌷 ρσωєяє∂ ву ѕнα∂σω',
          thumbnail: thumbBuffer,
          sourceUrl: redes,
          mediaType: 1,
          renderLargerThumbnail: true
        }
      }
    }, { quoted: fkontak })
  })
}

handler.help = ['ping', 'p']
handler.tags = ['info']
handler.command = ['ping', 'p']

export default handler*/

import speed from 'performance-now'
import { exec } from 'child_process'
import moment from 'moment-timezone'
import os from 'os'
import fetch from 'node-fetch'

let handler = async (m, { conn }) => {
  const start = new Date().getTime()
  await m.react('📡')
  await conn.sendMessage(m.chat, { text: `⏳ *Calculando el ping...*` }, { quoted: m })
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
  const fechaHora = moment().tz('America/Lima').format('YYYY/MM/DD, h:mm:ss A')

  const thumb = Buffer.from(await (await fetch('https://files.catbox.moe/ge2vz7.jpg')).arrayBuffer())

  exec('neofetch --stdout', async (error, stdout) => {
    let sysInfo = stdout.toString('utf-8').replace(/Memory:/, 'Ram:')
    let response = `=============================
  🍬  🆂🆃🅰🆃🆄🆂 / 🅿🅸🅽🅶 🍃
=============================

━━━━━━━━━━━━━━━━━━━━━━
          ⬣ ᴘ ɪ ɴ ɢ ⬣
> 🚀 *Ping:* ${ping} ms
> 💫 *Latencia:* ${latency.toFixed(2)} ms
> 🌿 *Uptime:* ${uptimeFormatted}
> 🗓️ *Fecha/Hora:* ${fechaHora}

━━━━━━━━━━━━━━━━━━━━━━
     ⬣ ʀ ᴇ ᴄ ᴜ ʀ s ᴏ s ⬣
> 🍉 *RAM usada:* ${usedRAM} GB
> 💮 *RAM libre:* ${freeRAM} GB
> 💾 *RAM total:* ${totalRAM} GB
> 🌾 *Carga promedio:* ${loadAvg}

━━━━━━━━━━━━━━━━━━━━━━
          ⬣ ᴄ ᴘ ᴜ ⬣
> ⚙️ *Modelo:* ${cpuModel}
> 🔧 *Velocidad:* ${cpuSpeed} GHz
> 📡 *Núcleos:* ${cores}

━━━━━━━━━━━━━━━━━━━━━━
       ⬣ s ɪ s ᴛ ᴇ ᴍ ᴀ⬣
> 🖥️ *Arquitectura:* ${arch}
> 🌲 *Plataforma:* ${platform}
> 🌐 *Host:* ${hostname}
> 🟢 *NodeJS:* ${nodeVer}
\`\`\`${sysInfo.trim()}\`\`\`
━━━━━━━━━━━━━━━━━━━━━━

> ✨ *Estado del sistema óptimo y funcionando al 0%!* xD ⚙️🔥`

    await conn.sendMessage(m.chat, {
      text: response,
      mentions: [m.sender],
      contextInfo: {
        externalAdReply: {
          title: '    👑 𝐊𝐚𝐧𝐞𝐤𝐢 𝐁𝐨𝐭 𝐕3 💫',
          body: '',
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