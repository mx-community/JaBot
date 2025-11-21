import { createHash } from 'crypto'
import fetch from 'node-fetch'
import moment from 'moment-timezone'

const handler = async (m, { conn, command, usedPrefix, text }) => {
try {
let uploadXd = `\t\t【  UPLOAD  :  FILES  】

\t⧆ \`\`\`📍 Sube archivos multimedia.\`\`\`

\t\t⧡ *${usedPrefix}turl* (todas las extensiones)
\t\t⧡ *${usedPrefix}catbox* (todas las extensiones)

> ${textbot}`
const thumb = Buffer.from(await (await fetch(`${global.mMages}`)).arrayBuffer())
await conn.sendMessage(m.chat, { text: uploadXd, mentions: [m.sender], contextInfo: { externalAdReply: { 
title: "々  UPLOAD  :  FILES  々", 
body: botname, 
thumbnail: thumb, 
sourceUrl: null, 
mediaType: 1, renderLargerThumbnail: false }}}, { quoted: m })
} catch (error) {
await conn.sendMessage(m.chat, { text: `*[ 📍 ]*  ERROR_COMMAND = ${error}` }, { quoted: m })
}}


handler.tags = ['tools']
handler.command = ['upload']

export default handler
