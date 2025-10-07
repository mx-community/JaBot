import os from 'os'
import util from 'util'
import moment from 'moment-timezone'
import baileys from '@whiskeysockets/baileys'
const { proto } = baileys

let handler = async (m, { conn }) => {
  try {
    const mentionedJid = m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.sender
    const name = await conn.getName(m.sender)
    const uptime = clockString(process.uptime() * 1000)
    const totalUsers = Object.keys(global.db.data.users).length
    const registeredUsers = Object.values(global.db.data.users).filter(u => u.registered).length
    const totalCommands = Object.keys(global.plugins).length
    const latensi = (new Date() - m.messageTimestamp * 1000).toFixed(4)
    const format = size => (size / 1024 / 1024).toFixed(2) + ' MB'
    const totalmem = () => os.totalmem()
    const freemem = () => os.freemem()
    const fecha = moment.tz('America/Lima').format('DD/MM/YY')
    const hora = moment.tz('America/Lima').format('HH:mm:ss')
    const dia = moment.tz('America/Lima').format('dddd')
    const ucapan = () => {
      const time = moment.tz('America/Lima').format('HH')
      if (time >= 4 && time < 12) return '🌅 𝐁𝐮𝐞𝐧𝐨𝐬 𝐝í𝐚𝐬'
      if (time >= 12 && time < 18) return '🌤️ 𝐁𝐮𝐞𝐧𝐚𝐬 𝐭𝐚𝐫𝐝𝐞𝐬'
      return '🌙 𝐁𝐮𝐞𝐧𝐚𝐬 𝐧𝐨𝐜𝐡𝐞𝐬'
    }

    const menu = `
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
  🪵
`

    const botname = '🏔️ 𝙆𝙖𝙣𝙚𝙠𝙞𝘽𝙤𝙩-𝙑𝟯 🎋'
    const textbot = '⚙️ 𝙳𝙴𝚂𝙰𝚁𝚁𝙾𝙻𝙻𝙰𝙳𝙾 𝙿𝙾𝚁: 𝚂𝙷𝙰𝙳𝙾𝚆 𝙲𝙾𝚁𝙴'
    const redes = 'https://whatsapp.com/channel/0029VbBPa8EFsn0aLfyZl23j'
    const randomIcono = 'https://files.catbox.moe/ge2vz7.jpg'
    const channelRD = { id: '120363404182502020@newsletter', name: '┊▬ 𝘒𝘈𝘕𝘌𝘒𝘐 𝘒𝘌𝘕 ▬ ❜┊' }

    await conn.sendMessage(m.chat, { 
      text: menu,
      contextInfo: {
        mentionedJid: [mentionedJid],
        isForwarded: true,
        forwardedNewsletterMessageInfo: {
          newsletterJid: channelRD.id,
          serverMessageId: '',
          newsletterName: channelRD.name
        },
        externalAdReply: {
          title: botname,
          body: textbot,
          mediaType: 1,
          mediaUrl: redes,
          sourceUrl: redes,
          thumbnailUrl: randomIcono,
          showAdAttribution: false,
          renderLargerThumbnail: true
        }
      }
    }, { quoted: m })

  } catch (e) {
    console.error(e)
    m.reply('⚠️ Error al enviar el menú.')
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