import { webp2png } from '../lib/webp2mp4.js'
let handler = async (m, {conn, usedPrefix, command}) => {
const q = m.quoted || m
const mime = q.mediaType || ''
if (!/sticker/.test(mime)) return conn.sendMessage(m.chat, { text: `Ingrese el comando y responda a un sticker sin animación.` }, { quoted: m })
const media = await q.download()
let out = (await webp2png(media).catch((_) => null)) || Buffer.alloc(0)
await conn.sendFile(m.chat, out, 'error.png', null, m)
}
handler.help = ['timg  <reply>']
handler.tags = ['convertidor']
handler.command = ['timg']
export default handler
  
