import os from 'os'
import util from 'util'
import moment from 'moment-timezone'
import baileys from '@whiskeysockets/baileys'
const { generateWAMessageFromContent, proto } = baileys

let handler = async (m, { conn }) => {
  try {
    const mentionedJid = m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.sender
    const name = await conn.getName(m.sender)
    const uptime = clockString(process.uptime() * 1000)
    const totalUsers = Object.keys(global.db.data.users).length
    const registeredUsers = Object.values(global.db.data.users).filter(u => u.registered).length
    const totalCommands = Object.keys(global.plugins).length
    const totalStats = Object.values(global.db.data.stats).length || 0
    const latensi = (new Date() - m.messageTimestamp * 1000).toFixed(4)
    const format = size => (size / 1024 / 1024).toFixed(2) + ' MB'
    const totalmem = () => os.totalmem()
    const freemem = () => os.freemem()
    const toNum = n => n.toLocaleString('es-PE')
    const fecha = moment.tz('America/Lima').format('DD/MM/YY')
    const hora = moment.tz('America/Lima').format('HH:mm:ss')
    const dia = moment.tz('America/Lima').format('dddd')
    const ucapan = () => {
      const time = moment.tz('America/Lima').format('HH')
      if (time >= 4 && time < 12) return '🌅 𝐁𝐮𝐞𝐧𝐨𝐬 𝐝í𝐚𝐬'
      if (time >= 12 && time < 18) return '🌤️ 𝐁𝐮𝐞𝐧𝐚𝐬 𝐭𝐚𝐫𝐝𝐞𝐬'
      return '🌙 𝐁𝐮𝐞𝐧𝐚𝐬 𝐧𝐨𝐜𝐡𝐞𝐬'
    }

    const text = `
\`\`\`  ݊ ּ͜⏜݆ׄ͜⌒໊݂݁͜⏜݄͜ ͝⃞֟☁️⃛͜͝ ⃞໊݄⏜݆ׄ͜͜⌒ ּ͜⏜݆ׄ݊͜ ּ͜ \`\`\`
\`\`\`  ໍ۪۫꒰̥᷑ໍ᮫۪۫𝆬⭐ ࣮࣮᷑᷑𝐊֘𝐀۫𝐍〪࣮࣫𝐄۪۫࣫𝐊𝐈᮫࣮𝆬᷑•۫֘ ᮫𝆬ᤲ࣫𝐕֘ ᮫𝆬ᤲ࣫3֘ ᮫𝆬ᤲ࣫ 🌿᩠̥ໍ۪۫꒱̥ໍ۪۫ \`\`\`
\`\`\` ︶ִֶָ⏝︶ִֶָ⏝˖ ࣪ ୨✧୧ ࣪ ˖⏝ִֶָ︶⏝ִֶָ︶ \`\`\`

> \`\`\`${ucapan()} ᭡̵໋࡙ᮬ @${mentionedJid.split('@')[0]}\`\`\`
> \`\`\` ꨩ🍄ּֽ֪۪۪〫ࣳׄ ${dia} | ${fecha} | ${hora} *⃟░\`\`\`

  ☁️ *ᴜsᴜᴀʀɪᴏ:* ${name}
  🪷 *ᴄʀᴇᴀᴅᴏʀ:* 𝐒𝐡𝐚𝐝𝐨𝐰-𝐱𝐲𝐳
  🎋 *ᴄᴏᴍᴀɴᴅᴏs:* ${totalCommands}
  🪾 *ᴠs:* ${vs}
  🍃 *ʟɪʙʀᴇʀɪᴀ:* ${libreria}
  🪹 *ʙᴏᴛ:* ${(conn.user.jid == global.conn.user.jid ? 'Principal' : 'Sub-Bot')}
  🌹 *ʀᴜɴᴛɪᴍᴇ:* ${uptime}
  🪴 *ʀᴇɢɪsᴛʀᴀᴅᴏs:* ${totalUsers} (${registeredUsers})
  🫟 *ɴᴏ ʀᴇɢɪsᴛʀᴀᴅᴏs:* ${totalUsers - registeredUsers}
  

  🫛 *ʟᴀᴛᴇɴᴄɪᴀ:* ${latensi} ms
  🍓 *ʀᴀᴍ ᴜsᴀᴅᴀ:* ${format(totalmem() - freemem())}
  🌲 *ʀᴀᴍ ᴛᴏᴛᴀʟ:* ${format(totalmem())}
  🕸️ *ʀᴀᴍ ʟɪʙʀᴇ:* ${format(freemem())}  
  👻 *sᴏᴄᴋᴇᴛs ᴏɴʟɪɴᴇ:* ${totalUsers || '0'}
  🪵 *ᴄᴏᴍᴀɴᴅᴏꜱ ᴜꜱᴀᴅᴏꜱ:* ${toNum(totalStats)} (${totalStats})
`

    const imageUrl = 'https://files.catbox.moe/ge2vz7.jpg'

    const button = {
      name: 'cta_url',
      buttonParamsJson: JSON.stringify({
        display_text: '🌸 𝗠𝗲𝗻𝘂 𝗚𝗲𝗻𝗲𝗿𝗮𝗹 🌸',
        url: 'https://whatsapp.com/channel/0029VbBPa8EFsn0aLfyZl23j'
      })
    }

    const msg = generateWAMessageFromContent(m.chat, {
      viewOnceMessage: {
        message: {
          messageContextInfo: { mentionedJid: [mentionedJid] },
          interactiveMessage: proto.Message.InteractiveMessage.create({
            body: proto.Message.InteractiveMessage.Body.create({ text }),
            footer: proto.Message.InteractiveMessage.Footer.create({ text: '☁️ Kaneki Bot • System' }),
            header: proto.Message.InteractiveMessage.Header.create({
              title: '',
              subtitle: '',
              hasMediaAttachment: true,
              imageMessage: await conn.prepareMessageMedia({ image: { url: imageUrl } }, { upload: conn.waUploadToServer })
            }),
            nativeFlowMessage: proto.Message.InteractiveMessage.NativeFlowMessage.create({
              buttons: [button]
            })
          })
        }
      }
    }, { quoted: m })

    await conn.relayMessage(m.chat, msg.message, { messageId: msg.key.id })
  } catch (e) {
    console.error(e)
    m.reply('⚠️ Error al enviar el menu.')
  }
}

handler.help = ['menu']
handler.tags = ['main']
handler.command = ['menu', 'menú', 'help']

export default handler

function clockString(ms) {
  let d = Math.floor(ms / 86400000)
  let h = Math.floor(ms / 3600000) % 24
  let m = Math.floor(ms / 60000) % 60
  let s = Math.floor(ms / 1000) % 60
  return [d, 'd ', h, 'h ', m, 'm ', s, 's'].map(v => v.toString().padStart(2, 0)).join('')
}