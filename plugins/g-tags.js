import fetch from 'node-fetch'

const handler = async (m, { conn, text, participants, command }) => {
const groupMetadata = await conn.groupMetadata(m.chat)
const groupName = groupMetadata.subject
const groupImg = await conn.profilePictureUrl(m.chat, 'image').catch(_ => `${global.mMages}`)
const totalMembers = participants.length
const sender = m.pushName || 'Usuario desconocido'

const mensaje = text ? text : 'Mencionando a todos.'
const time = new Date().toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' })

let texto = `·─┄ · ✦ *Mentions : Atención* ✦ ·

🜲 ${mensaje}
⪩ *Participantes:* ${totalMembers} en total.
⪩ *Grupo:* ${groupName}

╭──• *Listado : Tagall* •─┄┈ ·
${participants.map((p, i) => `│ *${i + 1}* ≽ @${p.id.split('@')[0]}`).join('\n')}
╰──• *Listado : Tagall* •─┄┈ ·`

await conn.sendMessage(m.chat, {
image: { url: groupImg },
caption: texto,
mentions: participants.map(a => a.id)
})
}

handler.help = ['todos', 'invocar', 'tagall']
handler.tags = ['group']
handler.command = ['todos', 'invocar', 'tagall']
handler.admin = true
handler.group = true

export default handler