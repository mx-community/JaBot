import fetch from "node-fetch"

export async function before(m, { groupMetadata }) {
if (!m.text || !global.prefix.test(m.text)) return
const usedPrefix = global.prefix.exec(m.text)[0]
const command = m.text.slice(usedPrefix.length).trim().split(' ')[0].toLowerCase()
if (!command || command.length === 0) return
const validCommand = (command, plugins) => {
for (let plugin of Object.values(plugins)) {
if (plugin.command && (Array.isArray(plugin.command) ? plugin.command : [plugin.command]).includes(command)) {
return true
}}
return false
}
let chat = global.db.data.chats[m.chat]
let settings = global.db.data.settings[this.user.jid]
let owner = [...global.owner.map(([number]) => number)].map(v => v.replace(/[^0-9]/g, "") + "@s.whatsapp.net").includes(m.sender)
if (chat.modoadmin) return
if (settings.self) return
if (command === 'mute') return
if (chat.isMute && !owner) return
if (command === 'bot') return
if (chat.isBanned && !owner) return
if (validCommand(command, global.plugins)) {
} else {
const comando = command
/*const sadow_xyz = {
  key: {
    fromMe: false,
    participant: "0@s.whatsapp.net",
    remoteJid: "status@broadcast"
  },
  message: {
    extendedTextMessage: {
      text: "🌿 𝗞𝗮𝗻𝗲𝗸𝗶 | 𝐁𝐨𝐭 𝗩3 🚨",
      title: "Canal Oficial 💫",
      previewType: "NONE"
    }
  }
}*/


const thumbnailUrl = "https://files.catbox.moe/zisfjv.jpg" // 👉 tu imagen miniatura
const thumbnail = await (await fetch(thumbnailUrl)).buffer()

const sadow_xyz = {
  key: {
    fromMe: false,
    participant: "0@s.whatsapp.net",
    remoteJid: "status@broadcast"
  },
  message: {
    extendedTextMessage: {
      text: "🌿 𝗞𝗮𝗻𝗲𝗸𝗶 | 𝐁𝐨𝐭 𝗩3 🚨",
      title: "Canal Oficial 💫",
      previewType: "NONE",
      jpegThumbnail: thumbnail
    }
  }
}
/*
await conn.sendMessage(m.chat, { 
  text:
}, { quoted: sadow_xyz })
}}*/
await conn.sendMessage(m.chat, {
    text:  `🎋 El comando *<${comando}>* no existe.\n> Usa *${usedPrefix}help* para ver la lista de comandos disponibles.` ,
    mentions: [m.sender],
    contextInfo: {
      isForwarded: true,
      forwardedNewsletterMessageInfo: {
        newsletterJid: channelRD.id,
        serverMessageId: '',
        newsletterName: channelRD.name
      },
      externalAdReply: {
        title: ' 𝘒𝘢𝘯𝘦𝘬𝘪𝘉𝘰𝘵-𝘝3 🍓',
        body: '💫 𝘗𝘰𝘸𝘦𝘳𝘦𝘥 𝘣𝘺 𝘚𝘩𝘢𝘥𝘰𝘸-𝘯𝘦𝘹',
        thumbnailUrl: 'https://qu.ax/SRTGf.jpg',
        sourceUrl: '',
        mediaType: 1,
        renderLargerThumbnail: true
      },
     mentionedJid: null
    }
  }, { quoted: sadow_xyz });
}}