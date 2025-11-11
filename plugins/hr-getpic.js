let handler = async (m, { conn }) => {
let mentionedJid = await m.mentionedJid
let who = await m.quoted?.sender || mentionedJid?.[0]
if (!who) return conn.sendMessage(m.chat, { text: `Ingrese el comando y menciona a un usuario para ver su foto de perfil.\n\n• Por ejemplo:\n*#${command}* @${m.sender.split('@')[0]}`, mentions: [m.sender] }, { quoted: m })
let name = await (async () => global.db.data.users[who].name || (async () => { try { const n = await conn.getName(who); return typeof n === 'string' && n.trim() ? n : who.split('@')[0] } catch { return who.split('@')[0] } })())()
let pp = await conn.profilePictureUrl(who, 'image').catch(() => 'https://raw.githubusercontent.com/The-King-Destroy/Adiciones/main/Contenido/1745522645448.jpeg')
await conn.sendMessage(m.chat, { text: `Enviando foto de perfil, espere un momento...` }, { quoted: m })
await conn.sendMessage(m.chat, { image: { url:  }, caption: `✓ Foto de *${name}* descargada.` }, { quoted: m })
}
handler.help = ['pfp']
handler.tags = ['sticker']
handler.command = ['pfp', 'getpic']
handler.group = true
export default handler
