import cp, { exec as _exec } from 'child_process'
import { promisify } from 'util'

const exec = promisify(_exec).bind(cp)
const handler = async (m, { conn, isOwner, isROwner, command, text, usedPrefix, args }) => {
if (!isROwner) return
if (conn.user.jid != conn.user.jid) return
let o
try {
await conn.sendMessage(m.chat, { text: `Ejecutando codigo, espere un momento...` }, { quoted: m })
o = await exec(command.trimStart() + ' ' + text.trimEnd())

} catch (e) {
o = e
await conn.sendMessage(m.chat, { text: `📍  [ ERROR ] = ${e}` }, { quoted: m })
} finally {
const { stdout, stderr } = o
if (stdout.trim()) m.reply(stdout)
if (stderr.trim()) m.reply(stderr)
}}

handler.help = ['$']
handler.tags = ['owner']
handler.command = ["c+"]

export default handler
