import ws from "ws"

const handler = async (m, { conn, command, usedPrefix, participants }) => {
try {
const users = [global.conn.user.jid, ...new Set(global.conns.filter((conn) => conn.user && conn.ws.socket && conn.ws.socket.readyState !== ws.CLOSED).map((conn) => conn.user.jid))]
function convertirMsADiasHorasMinutosSegundos(ms) {
const segundos = Math.floor(ms / 1000)
const minutos = Math.floor(segundos / 60)
const horas = Math.floor(minutos / 60)
const días = Math.floor(horas / 24)
const segRest = segundos % 60
const minRest = minutos % 60
const horasRest = horas % 24
let resultado = ""
if (días) resultado += `${días} días, `
if (horasRest) resultado += `${horasRest} horas, `
if (minRest) resultado += `${minRest} minutos, `
if (segRest) resultado += `${segRest} segundos`
return resultado.trim()
}
let groupBots = users.filter((bot) => participants.some((p) => p.id === bot))
if (participants.some((p) => p.id === global.conn.user.jid) && !groupBots.includes(global.conn.user.jid)) { groupBots.push(global.conn.user.jid) }
const botsGroup = groupBots.length > 0 ? groupBots.map((bot) => {
const isMainBot = bot === global.conn.user.jid
const v = global.conns.find((conn) => conn.user.jid === bot)
const uptime = isMainBot ? convertirMsADiasHorasMinutosSegundos(Date.now() - global.conn.uptime) : v?.uptime ? convertirMsADiasHorasMinutosSegundos(Date.now() - v.uptime) : "Activo desde ahora"
const mention = bot.replace(/[^0-9]/g, '')
return `@${mention}\n> Bot: ${isMainBot ? 'Principal' : 'Sub-Bot'}\n> Online: ${uptime}`}).join("\n\n") : `✧ No hay bots activos en este grupo`
const message = `*「 ✦ 」 Lista de bots activos*

❀ Principal: *1*
✿ Subs: *${users.length - 1}*

❏ En este grupo: *${groupBots.length}* bots
${botsGroup}`
const mentionList = groupBots.map(bot => bot.endsWith("@s.whatsapp.net") ? bot : `${bot}@s.whatsapp.net`)
rcanal.contextInfo.mentionedJid = mentionList
await conn.sendMessage(m.chat, { text: message, ...rcanal }, { quoted: m })
} catch (error) {
m.reply(`⚠︎ Se ha producido un problema.\n> Usa *${usedPrefix}report* para informarlo.\n\n${error.message}`)
}}

handler.tags = ["serbot"]
handler.help = ["botlist"]
handler.command = ["botlist", "listbots", "listbot", "bots", "sockets", "socket"]

export default handler/*

import ws from "ws"

const handler = async (m, { conn, command, usedPrefix, participants }) => {
  try {
    await m.react('🌸')

    const mainBot = global.conn
    const subBots = global.conns.filter(bot => bot.user && bot.ws?.socket && bot.ws.socket.readyState !== ws.CLOSED)
    const allBots = [mainBot, ...subBots]
    const activos = allBots.filter(bot => bot?.user?.jid)

    const _muptime = process.uptime() * 1000
    const uptime = clockString(_muptime)

    function convertirMsADiasHorasMinutosSegundos(ms) {
      let segundos = Math.floor(ms / 1000)
      let minutos = Math.floor(segundos / 60)
      let horas = Math.floor(minutos / 60)
      let dias = Math.floor(horas / 24)
      segundos %= 60
      minutos %= 60
      horas %= 24
      let resultado = ''
      if (dias) resultado += `${dias} días, `
      if (horas) resultado += `${horas} horas, `
      if (minutos) resultado += `${minutos} minutos, `
      if (segundos) resultado += `${segundos} segundos`
      return resultado.trim()
    }

    const botsEnGrupo = activos.filter(bot => participants.some(p => p.id === bot.user.jid))

    const listaBots = botsEnGrupo.length > 0
      ? botsEnGrupo.map((bot, i) => {
          const esPrincipal = bot === mainBot
          const nombre = bot.user?.name || (esPrincipal ? 'Bot Principal' : `Sub-Bot #${i + 1}`)
          const jid = bot.user?.jid || ''
          const link = `wa.me/${jid.replace(/[^0-9]/g, '')}`
          const tiempo = bot.uptime
            ? convertirMsADiasHorasMinutosSegundos(Date.now() - bot.uptime)
            : 'Desde ahora'
          return `╭══✦ ${esPrincipal ? '🌸' : '🍃'} *${nombre}*
│ 🍃 𝙏𝙞𝙥𝙤: ${esPrincipal ? '𝙋𝙧𝙞𝙣𝙘𝙞𝙥𝙖𝙡' : '𝙎𝙪𝙗-𝘽𝙤𝙩'}
│ 🌾 𝙇𝙞𝙣𝙠: ${link}
│ 🚀 𝙊𝙣𝙡𝙞𝙣𝙚: ${tiempo}
╰━━━━━━━━━━━━━━━⪼`
        }).join('\n\n')
      : '✧ No hay bots activos en este grupo. 🌙'

    const texto = `╭━━━〔 𝙎𝙊𝘾𝙆𝙀𝙏𝙎 𝘾𝙊𝙉𝙀𝘾𝙏𝘼𝘿𝙊𝙎 🏮 〕━━⬣
│ ❀ Principal: *1*
│ ⌛ 𝙏𝙞𝙚𝙢𝙥𝙤 𝙖𝙘𝙩𝙞𝙫𝙤: *${uptime}*
│ 💫 Subs en grupo: *${botsEnGrupo.length}*
│ ⚙️ Subs totales: *${activos.length}*
╰━━━━━━━━━━━━━━━━━━━━⬣


${listaBots}

> 🩵 *Socket Link Online:* https://wa.me/${mainBot.user.jid.replace(/[^0-9]/g, '')}
`

    const mentionList = botsEnGrupo.map(bot => bot.user.jid)
    await conn.sendMessage(m.chat, { 
      text: texto, 
      contextInfo: { mentionedJid: mentionList }
    }, { quoted: m })

  } catch (error) {
    m.reply(`⚠︎ Se ha producido un problema.\n> Usa *${usedPrefix}report* para informarlo.\n\n${error.message}`)
  }
}

handler.help = ['botlist', 'sockets', 'listbots']
handler.tags = ['serbot']
handler.command = ['sockets', 'botlist', 'listbots', 'bots', 'socket']

export default handler

function clockString(ms) {
  let h = isNaN(ms) ? '--' : Math.floor(ms / 3600000)
  let m = isNaN(ms) ? '--' : Math.floor(ms / 60000) % 60
  let s = isNaN(ms) ? '--' : Math.floor(ms / 1000) % 60
  return [h, m, s].map(v => v.toString().padStart(2, 0)).join(':')
}*/