import fetch from 'node-fetch'

const handler = async (m, { text, usedPrefix, command, conn }) => {
const args = text.split(',').map(arg => arg.trim())
const thumb = Buffer.from(await (await fetch(`https://qu.ax/pGJPW.jpg`)).arrayBuffer())
if (args.length < 5) {
let establece = `⎙  N E W  :  A N I M E
\t𝇈 📍 \`\`\`Agrega personajes nuevos.\`\`\`

\t⸭ \`\`\`Como enviar:\`\`\`
\t\t＃ ${usedPrefix}iw : *(guia práctica)*

々 *Requisitos:*
\t⧡ _Nombre *(Personaje)*._
\t⧡ _Genero._
\t⧡ _Valor._
\t⧡ _Rango._
\t⧡ _Link._ *(catbox/qu_ax)*

＃ Uso:
${usedPrefix + command} Takeda Harumi, Hombre, 3000, Elite, https://qu.ax/uxLCn.jpg
`
return conn.sendMessage(m.chat, { text: establece, mentions: [m.sender], contextInfo: { externalAdReply: { 
title: "々  N E W  :  A N I M E  々", 
body: botname, 
thumbnail: thumb, 
sourceUrl: null, 
mediaType: 1, renderLargerThumbnail: false }}}, { quoted: m })
}

const [name, gender, value, source, img1] = args

if (!img1.startsWith('http')) {
return conn.reply(m.chat, `📍  Enlace faltante, debes proporcionar un enlace directo de tu anime.\n- Puedes usar *#iw* para ver la guia de enlaces en el apartado de subir imagenes.`, m )
}

const characterData = {
id: Date.now().toString(),
name,
gender,
value,
source,
img: img1,
vid: [],
user: null,
status: "Libre",
votes: 0
}

const tagNumber = '5493873655135@s.whatsapp.net'

const jsonMessage = `📌 \`N E W  :  A N I M E\`\n\n\`\`\`${JSON.stringify(characterData, null, 2)}\`\`\``
await conn.sendMessage(tagNumber, { text: jsonMessage })
conn.reply(m.chat, `✅  Se ha enviado tu anime ( *${name}* ) con exito a los desarrolladores del bot.\n\n- 📍  Verificaremos si el contenido sea bien vista, no aceptamos imagenes revelantes.`, m)
}

handler.command = ['wadd', 'animew']

export default handler
