import { execSync } from 'child_process'

var handler = async (m, { conn, text, isROwner }) => {
if (!isROwner) return
await conn.sendMessage(m.chat, { text: `Actualizando pagina principal del bot, espere un momento...` }, { quoted: m })
try {
const stdout = execSync('git pull' + (m.fromMe && text ? ' ' + text : ''));
let messager = stdout.toString()
if (messager.includes('📍  La actualización de la pagina web ya esta en un estado normal.')) messager = '📍  La actualización del la pagina ya esta completa, no es necesario actualizarla.'
if (messager.includes('⏳  Actualización pendiente...')) messager = '✓  *[ WEB : ACTUALIZADO ]*\n\n' + stdout.toString()
conn.reply(m.chat, `·─┄ · ✦ *Update : Web* ✦ ·\n- _Se ha actualizado la pagina web con exito.\n\n⊹ ✎ *Version:* ${global.vs} (actual)\n⊹ ✎ *Actualizado:* ${global.fecha}\n⊹ ✎ *Web:* mx-website\n⊹ ✎ *Ruta:* ../plugins/(update.js)\n⊹ ✎ *Pruebas:*\n\`\`\`${messager}\`\`\``, m)
} catch { 
try {
const status = execSync('git status --porcelain')
if (status.length > 0) {
const conflictedFiles = status.toString().split('\n').filter(line => line.trim() !== '').map(line => {
if (line.includes('.npm/') || line.includes('.cache/') || line.includes('tmp/') || line.includes('database.json') || line.includes('sessions/Principal/') || line.includes('npm-debug.log')) {
return null
}
return '*→ ' + line.slice(3) + '*'}).filter(Boolean)
if (conflictedFiles.length > 0) {
const errorMessage = `📍  [ ERROR ]:\n\n${conflictedFiles.join('\n')}.`
await conn.reply(m.chat, errorMessage, m)
}}} catch (error) {
console.error(error)
let errorMessage2 = '📍  [ ERROR ]'
if (error.message) {
errorMessage2 += '\n•> error: ' + error.message
}
await conn.reply(m.chat, errorMessage2, m)
}}}

handler.help = ['update']
handler.tags = ['owner']
handler.command = ['update', 'fix', 'actualizar']
handler.owner = true
export default handler
