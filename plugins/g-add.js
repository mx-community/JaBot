import moment from 'moment-timezone'

let handler = async (m, { conn, args, text, usedPrefix, command }) => {
if (!text) return conn.sendMessage(m.chat, { text: `Ingrese el comando y el numero completo sin el símbolo internacional ( + ) para invitar al usuario.\n\n• Por ejemplo:\n*#${command}* 5493873655135` }, { quoted: m })
if (text.includes('+')) return conn.sendMessage(m.chat, { text: `📍  Debe de ingresar el numero completo todo junto sin el símbolo internacional ( + ).\n\n• Por ejemplo:\n*#${command}* 5493873655135` }, { quoted: m })
if (isNaN(text)) return conn.sendMessage(m.chat, { text: `📍  Recuerde que el numero no debe tener espacios ni el símbolo internacional ( + ).\n\n• Por ejemplo:\n*#${command}* 5493873655135` }, { quoted: m })
let group = m.chat
let link = 'https://chat.whatsapp.com/' + await conn.groupInviteCode(group)
let tag = m.sender ? '@' + m.sender.split('@')[0] : 'Usuario'
const chatLabel = m.isGroup ? (await conn.getName(m.chat) || 'Grupal') : 'Privado'
const horario = `${moment.tz('America/Caracas').format('DD/MM/YYYY hh:mm:ss A')}`
const invite = `·─┄ · ✦ *Invitación : Chat grupal* ✦ ·
- _Hola, mucho gusto, un participante de este mismo grupo te ha invitado a ti para que te unas._

⊹ ✎ *Grupo:*
• ${chatLabel}

⊹ ✎ *Enlace:*
• ${link}`
await conn.reply(`${text}@s.whatsapp.net`, invite, m, { mentions: [m.sender] })
conn.sendMessage(m.chat, { text: `✓  Se ha enviado la invitación al numero mencionado, esperemos y acepte la invitación.` }, { quoted: m })
}

handler.help = ['invite']
handler.tags = ['group']
handler.command = ['add', 'invitar']
handler.group = true
handler.botAdmin = true

export default handler