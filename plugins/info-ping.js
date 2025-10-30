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
> 🚀 *𝑝𝑖𝑛𝑔:* ${ping} ms
> 💫 *𝑙𝑎𝑡𝑒𝑛𝑐𝑖𝑎:* ${latency.toFixed(2)} ms
> 🌿 *𝑢𝑝𝑡𝑖𝑚𝑒:* ${uptimeFormatted}
> 🗓️ *𝑓𝑒𝑐ℎ𝑎/ℎ𝑜𝑟𝑎:* ${fechaHora}

━━━━━━━━━━━━━━━━━━━━━━
     ⬣ ʀ ᴇ ᴄ ᴜ ʀ s ᴏ s ⬣
> 🍉 *𝑟𝑎𝑚 𝑢𝑠𝑎𝑑𝑎:* ${usedRAM} GB
> 💮 *𝑟𝑎𝑚 𝑙𝑖𝑏𝑟𝑒:* ${freeRAM} GB
> 💾 *𝑟𝑎𝑚 𝑡𝑜𝑡𝑎𝑙:* ${totalRAM} GB
> 🌾 *𝑐𝑎𝑟𝑔𝑎 𝑝𝑟𝑜𝑚𝑒𝑑𝑖𝑜:* ${loadAvg}

━━━━━━━━━━━━━━━━━━━━━━
          ⬣ ᴄ ᴘ ᴜ ⬣
> ⚙️ *𝑚𝑜𝑑𝑒𝑙𝑜:* ${cpuModel}
> 🔧 *𝑣𝑒𝑙𝑜𝑐𝑖𝑑𝑎𝑑:* ${cpuSpeed} GHz
> 📡 *𝑛𝑢𝑐𝑙𝑒𝑜𝑠:* ${cores}

━━━━━━━━━━━━━━━━━━━━━━
       ⬣ s ɪ s ᴛ ᴇ ᴍ ᴀ⬣
> 🖥️ *𝑎𝑟𝑞𝑢𝑖𝑐𝑡𝑒𝑐𝑡𝑢𝑟𝑎:* ${arch}
> 🌲 *𝑝𝑙𝑎𝑡𝑎𝑓𝑜𝑟𝑚𝑎:* ${platform}
> 🌐 *ℎ𝑜𝑠𝑡:* ${hostname}
> 🟢 *𝑛𝑜𝑑𝑒𝑗𝑠:* ${nodeVer}
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