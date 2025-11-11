let handler = async (m, { conn, usedPrefix, command }) => {
try {
if (!m.quoted) {
return conn.sendMessage(m.chat, { text: `Ingrese el comando y responda a un sticker sin movimiento para convertirlo en una imagen.` }, { quoted: m })
}
await conn.sendMessage(m.chat, { text: `Realizando imagen, espere un momento...` }, { quoted: m })
let xx = m.quoted
let imgBuffer = await xx.download()   
if (!imgBuffer) {
return conn.sendMessage(m.chat, { text: `📍  No se ha podido realizar la conversión.\n- Esto puede deberse a una falla o que respondiste a un sticker animado en ves de uno sin animación.` }, { quoted: m })
}
await conn.sendMessage(m.chat, { image: imgBuffer, caption: '·─┄ · ✦ *Image : Sticker* ✦ ·\n- Convertido a una imagen con exito.' }, { quoted: m })
} catch (e) {
await conn.sendMessage(m.chat, { text: `*[ 📍 ]*  ERROR_COMMAND = Command error, try again and if the error persists, report the command.` }, { quoted: m })
 }
}

handler.help = ['toimg']
handler.tags = ['tools']
handler.command = ['toimg', 'jpg', 'img'] 

export default handler