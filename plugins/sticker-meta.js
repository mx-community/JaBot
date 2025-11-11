let handler = async (m, { text, usedPrefix, command }) => {
const userId = m.sender
if (command === 'exif') {
const packParts = text.split(/[\u2022|]/).map(part => part.trim())
if (packParts.length < 2) {
return conn.sendMessage(m.chat, { text: `Ingrese el comando y escriba el nombre y descripción de un sticker.\n\n• Por ejemplo:\n*#${command}* Mx | Mx` }, { quoted: m })
}
const packText1 = packParts[0]
const packText2 = packParts[1]
if (!global.db.data.users[userId]) {
global.db.data.users[userId] = {}
}
const packstickers = global.db.data.users[userId]
packstickers.text1 = packText1
packstickers.text2 = packText2
await global.db.write()
return conn.sendMessage(m.chat, { text: `✓  Se ha configurado el titulo y descripción de los stickers, cada sticker creado su titulo y descripción sera modificada.` }, { quoted: m })
}
if (command === 'd-exif') {
if (!global.db.data.users[userId] || (!global.db.data.users[userId].text1 && !global.db.data.users[userId].text2)) {
return conn.sendMessage(m.chat, { text: `📍  No tienes ningun titulo y descripción establecido en los stickers.` }, { quoted: m })
}
const packstickers = global.db.data.users[userId]
delete packstickers.text1
delete packstickers.text2
await global.db.write()
return conn.sendMessage(m.chat, { text: `✓  Se ha configurado el titulo y descripción de los stickers por defecto con exito.` }, { quoted: m })
}}

handler.help = ['setmeta', 'delmeta']
handler.tags = ['tools']
handler.command = ['exif', 'd-exif']

export default handler