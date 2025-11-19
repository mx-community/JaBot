
let handler = async (m, { conn, text, usedPrefix, command }) => {

    let teks = text ? text : m.quoted && m.quoted.text ? m.quoted.text : ''
     if (!teks) return conn.reply(m.chat, `📝 Que escribo? Ejemplo : *${usedPrefix + command}* Hola puercos`, m)
      m.react('⏳')
      let img = global.toruAPI('fgmods', '/api/maker/txt', { text: teks }, 'toruKeys')
      conn.sendFile(m.chat, img, 'img.png', `✅ Es mejor de lo que escribes tú ✍🏻`, m)
      m.react('✅')

  }
  handler.help = ['txt']
  handler.tags = ['fun']
  handler.command = ['txt']
  
  export default handler


	
