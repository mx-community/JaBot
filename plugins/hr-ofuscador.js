import JavaScriptObfuscator from 'javascript-obfuscator'

let handler = async (m, {conn, text, command, usedPrefix }) => {
if (!text) return conn.sendMessage(m.chat, { text: `Ingrese el comando y pegue un codigo *JavaScript* para ofuscarlo.` }, { quoted: m })
try {
await m.react("⏳")
function obfuscateCode(code) {
return JavaScriptObfuscator.obfuscate(code, {
compact: false,
controlFlowFlattening: true,
deadCodeInjection: true,
simplify: true,
numbersToExpressions: true
}).getObfuscatedCode()
}
let obfuscatedCode = await obfuscateCode(text)
conn.sendMessage(m.chat, {text: obfuscatedCode}, {quoted: m})
await m.react("✅")
} catch (e) {
await conn.sendMessage(m.chat, { text: `*[ 📍 ]*  ERROR_COMMAND = ${e}` }, { quoted: m })
 }
}
handler.command = /^(ofuscar|encript)$/i
export default handler
  
