import fetch from 'node-fetch'
import { xpRange } from '../lib/levelling.js'
import fs from 'fs'
import PhoneNumber from 'awesome-phonenumber'

let handler = async (m, { conn, usedPrefix, __dirname, participants }) => {
  try {
    await m.react('🍋')

    const user = global.db.data.users[m.sender] || {}
    const name = await conn.getName(m.sender)
    const premium = user.premium ? '✅ Sí' : '❌ No'
    const limit = user.limit || 0
    const totalreg = Object.keys(global.db.data.users).length
    const groupUserCount = m.isGroup ? participants.length : '-'
    const groupsCount = Object.values(conn.chats).filter(v => v.id.endsWith('@g.us')).length
    const uptime = clockString(process.uptime() * 1000)
    const fecha = new Date(Date.now())
    const locale = 'es-PE'
    const dia = fecha.toLocaleDateString(locale, { weekday: 'long' })
    const fechaTxt = fecha.toLocaleDateString(locale, { day: 'numeric', month: 'long', year: 'numeric' })
    const hora = fecha.toLocaleTimeString(locale, { hour: '2-digit', minute: '2-digit' })
    
    const totalreg2 = Object.keys(global.db.data.users).length
    const totalCommands = Object.keys(global.plugins).length

    const userId = m.sender.split('@')[0]
    const phone = PhoneNumber('+' + userId)
    const pais = phone.getRegionCode() || 'Desconocido 🌐'
    
    const perfil = await conn.profilePictureUrl(conn.user.jid, 'image')
      .catch(() => 'https://files.catbox.moe/9i5o9z.jpg')

    const channelRD = { 
      id: '120363422142340004@newsletter', 
      name: '𝐊𝐚𝐧𝐞𝐤𝐢 𝐁𝐨𝐭 𝐀𝐈 : 𝐂𝐡𝐚𝐧𝐧𝐞𝐥 𝐎𝐟𝐢𝐜𝐢𝐚𝐥 ☯'
    }

    const metaMsg = {
      quoted: global.fakeMetaMsg,
      contextInfo: {
        mentionedJid: [m.sender],
        isForwarded: true,
        forwardedNewsletterMessageInfo: {
          newsletterJid: channelRD.id,
          serverMessageId: 100,
          newsletterName: channelRD.name
        },
        externalAdReply: {
          title: '🩸 Kaneki Bot AI',
          body: '☯ Dev: Shadow_xyz & OmarGranda',
          mediaUrl: null,
          description: null,
          previewType: "PHOTO",
          thumbnailUrl: perfil,
          mediaType: 1,
          renderLargerThumbnail: true
        }
      }
    }

    let tags = {
      'main': '𓂂𓏸 𐅹੭੭  `ᴍᴇɴᴜ ᴍᴀɪɴ` 🍓 ᦡᦡ',
      'fun': '𓂂𓏸 𐅹੭੭  `ᴍᴇɴᴜ ғᴜɴ` 🎭 ᦡᦡ',
      'rpg': '𓂂𓏸 𐅹੭੭  `ᴍᴇɴᴜ ʀᴘɢ` 🍂 ᦡᦡ',
      'anime': '𓂂𓏸 𐅹੭੭  `ᴍᴇɴᴜ ᴀɴɪᴍᴇ` 🌸',
      'descargas': '𓂂𓏸 𐅹੭੭  `ᴍᴇɴᴜ ᴅᴏᴡɴʟᴏᴀᴅ` 🎧 ᦡᦡ',
      'rg': '𓂂𓏸 𐅹੭੭  `ᴍᴇɴᴜ ᴘᴇʀғɪʟ` 🍃 ᦡᦡ',
      'grupo': '𓂂𓏸 𐅹੭੭  `ᴍᴇɴᴜ ɢʀᴜᴘᴏs` 🏮 ᦡᦡ',
      'ia': '𓂂𓏸 𐅹੭੭  `ᴍᴇɴᴜ ɪᴀ` ☁️ ᦡᦡ',
      'tools': '𓂂𓏸 𐅹੭੭  `ᴍᴇɴᴜ ᴛᴏᴏʟs` 🧩 ᦡᦡ',
      'owner': '𓂂𓏸 𐅹੭੭  `ᴍᴇɴᴜ ᴏᴡɴᴇʀ` ⚙️ ᦡᦡ',
      'socket': '𓂂𓏸 𐅹੭੭  `ᴍᴇɴᴜ ᴊᴀᴅɪ-ʙᴏᴛ` 🍰 ᦡᦡ',
      'nsfw': '𓂂𓏸 𐅹੭੭  `ᴍᴇɴᴜ ɴsғᴡ` 🍑 ᦡᦡ',
    }

    let commands = Object.values(global.plugins)
      .filter(v => v.help && v.tags)
      .map(v => {
        return {
          help: Array.isArray(v.help) ? v.help : [v.help],
          tags: Array.isArray(v.tags) ? v.tags : [v.tags]
        }
      })

    let menuTexto = ''
    for (let tag in tags) {
      let comandos = commands
        .filter(cmd => cmd.tags.includes(tag))
        .map(cmd => cmd.help.map(e => `> ര ׄ 🍃 ׅ  ${usedPrefix}${e}`).join('\n'))
        .join('\n')
      if (comandos) {
        menuTexto += `\n\n*${tags[tag]}*\n${comandos}`
      }
    }

    const infoUser = `
ര ׄ ☃️ ׅ  Bienvenid@ a | Kaneki Bot AI  
─────────────────────
🌿 *Usuario:* @${userId}
🍉 *Premium:* ${premium}
🌍 *País:* ${pais}
🎲 *Límite:* ${limit}
🎋 *Usuarios totales:* ${totalreg2}
☁️ *Grupos activos:* ${groupsCount}
🚀 *Tiempo activo:* ${uptime}
─────────────────────
🌾 *Bot:* ${(conn.user.jid == global.conn.user.jid ? '🌟 `ʙᴏᴛ ᴏғɪᴄɪᴀʟ`' : '✨ `sᴜʙ ʙᴏᴛ`')}
🕸️ *Comandos:* ${totalCommands}
📡 *Users:* ${totalreg2}
📡 *Fecha:* \`${hora}, ${dia}, ${fechaTxt}\`
─────────────────────\n`.trim()

    const cuerpo = infoUser + `\n*🍡 Mᴇɴú ᴅɪsᴘᴏɴɪʙʟᴇ:*

${menuTexto}`.trim()

    const imgs = [
      'https://i.pinimg.com/originals/b3/67/d5/b367d513d861de468305c32c6cd22756.jpg',
      'https://i.pinimg.com/originals/90/c8/58/90c858c65f0b3b2fca9a226fa369aa2b.png'
    ]
    let imageUrl = imgs[Math.floor(Math.random() * imgs.length)]

    await conn.sendMessage(m.chat, {
      image: { url: imageUrl },
      caption: cuerpo,
      fileName: '🩸 Kaneki Bot AI | Menu ☯',
      mimetype: 'image/jpeg',
      mentions: [m.sender],
      ...metaMsg
    })

  } catch (e) {
    console.error(e)
    await conn.sendMessage(m.chat, { 
      text: `✘ Error al enviar el menú: ${e.message}`,
      mentions: [m.sender] 
    })
  }
}

handler.help = ['menu']
handler.tags = ['main']
handler.command = ['menu','help','menú','allmenu','menucompleto']
handler.register = true

export default handler

function clockString(ms) {
  const h = isNaN(ms) ? '--' : Math.floor(ms / 3600000)
  const m = isNaN(ms) ? '--' : Math.floor(ms / 60000) % 60
  const s = isNaN(ms) ? '--' : Math.floor(ms / 1000) % 60
  return [h, m, s].map(v => v.toString().padStart(2, '0')).join(':')
}