import { downloadContentFromMessage } from "@whiskeysockets/baileys"

export async function before(m, { isAdmin, isBotAdmin }) {
let chat = db.data.chats[m.chat]
if (!chat.fViews || chat.isBanned) return
if (m.mtype == 'viewOnceMessageV2' || m.mtype.hasOwnProperty("viewOnce")) {
let msg = m.message.viewOnceMessageV2.message
let type = Object.keys(msg)[0]
let media = await downloadContentFromMessage(msg[type], type == 'imageMessage' ? 'image' : 'video')
let buffer = Buffer.from([])
for await (const chunk of media) {
buffer = Buffer.concat([buffer, chunk])}
if (/video/.test(type)) {
let xdV = `〆  ANTI  :  VIEWONCE
\t\t𝇈 📍 \`\`\`No se admite ocultar videos.\`\`\`

\t⚶ Titulo : *${msg[type].caption || "Undefined."}*
`
return this.sendFile(m.chat, buffer, 'error.mp4', xdV, m)
} else if (/image/.test(type)) {
let xdI = `〆  ANTI  :  VIEWONCE
𝇈 📍 \`\`\`No se admite ocultar imagenes.\`\`\`

\t⚶ Titulo : *${msg[type].caption || "Undefined."}*`
return this.sendFile(m.chat, buffer, 'error.jpg', xdI, m)
}}}

function formatFileSize(bytes) {
const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'TY', 'EY']
const i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)))
return Math.round(100 * (bytes / Math.pow(1024, i))) / 100 + ' ' + sizes[i]
}
