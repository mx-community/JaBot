export async function before(m, { conn, groupMetadata }) {
  if (!m.text || !global.prefix.test(m.text)) return
  
  const usedPrefix = global.prefix.exec(m.text)[0]
  const command = m.text.slice(usedPrefix.length).trim().split(' ')[0].toLowerCase()
  if (!command) return

  const validCommand = (cmd, plugins) => {
    for (let plugin of Object.values(plugins)) {
      const cmds = Array.isArray(plugin.command) ? plugin.command : [plugin.command]
      if (cmds.includes(cmd)) return true
    }
    return false
  }

  const chat = global.db.data.chats[m.chat]
  const settings = global.db.data.settings[this.user.jid]
  const owner = [...global.owner.map(([number]) => number)]
    .map(v => v.replace(/[^0-9]/g, '') + '@s.whatsapp.net')
    .includes(m.sender)

  if (chat.modoadmin) return
  if (settings.self) return
  if (chat.isMute && !owner) return
  if (chat.isBanned && !owner) return
  if (['mute', 'bot'].includes(command)) return

  if (!validCommand(command, global.plugins)) {
    const sadow_xyz = {
      key: {
        fromMe: false,
        participant: '0@s.whatsapp.net',
        remoteJid: 'status@broadcast'
      },
      message: {
        extendedTextMessage: {
          text: '🌿 𝗞𝗮𝗻𝗲𝗸𝗶 | 𝐁𝐨𝐭 𝗩3 🚨',
          title: 'Canal Oficial 💫',
          previewType: 'NONE'
        }
      }
    }

    const channelRD = {
      id: '120363422142340004@newsletter',
      name: '🍓 KanekiBot Oficial'
    }

    await conn.sendMessage(m.chat, {
      text: `🎋 El comando *<${command}>* no existe.\n> Usa *${usedPrefix}help* para ver la lista de comandos disponibles.`,
      mentions: [m.sender],
      contextInfo: {
        isForwarded: true,
        forwardedNewsletterMessageInfo: {
          newsletterJid: channelRD.id,
          serverMessageId: '',
          newsletterName: channelRD.name
        },
        externalAdReply: {
          title: '🍉 𝘒𝘢𝘯𝘦𝘬𝘪𝘉𝘰𝘵-𝘝3 🍓',
          body: '💫 𝘗𝘰𝘸𝘦𝘳𝘦𝘥 𝘣𝘺 𝘚𝘩𝘢𝘥𝘰𝘸-𝘯𝘦𝘹',
          thumbnailUrl: 'https://files.catbox.moe/1pz6qa.jpg',
          sourceUrl: 'https://whatsapp.com/channel/0029VbAtbPA84OmJSLiHis2U',
          mediaType: 1,
          renderLargerThumbnail: true
        }
      }
    }, { quoted: sadow_xyz })
  }
}