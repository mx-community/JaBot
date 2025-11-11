let handler = async (m, { conn, usedPrefix, command, isROwner }) => {
if (!isROwner) return
try {
await conn.sendMessage(m.chat, { text: `Reiniciando servidor principal de mx, espere un momento...` }, { quoted: m })
setTimeout(() => {
if (process.send) {
process.send("restart")
} else {
process.exit(0)
}}, 3000)
} catch (error) {
console.log(error)
conn.sendMessage(m.chat, { text: `📍  [ ERROR ] = ${error}` }, { quoted: m })
}}

handler.help = ['restart']
handler.tags = ['owner']
handler.command = ['restart', 'reiniciar'] 

export default handler
