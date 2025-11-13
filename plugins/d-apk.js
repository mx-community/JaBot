import { search, download } from 'aptoide-scraper'

var handler = async (m, { conn, usedPrefix, command, text }) => {
if (!text) return conn.sendMessage(m.chat, { text: `Ingrese el comando y escriba el nombre de la app o apk para descargar.\n\n• Por ejemplo:\n*#${command}* WhatsApp` }, { quoted: m })
try {
await conn.sendMessage(m.chat, { text: `Buscando resultados, espere un momento...` }, { quoted: m })
let searchA = await search(text)
let data5 = await download(searchA[0].id)
let apkResultado = `·─┄ · ✦ *Apk : Download* ✦ ·

❒ *Nombre:* ${data5.name}
❒ *Actualización:* ${data5.lastup}
❒ *Peso:* ${data5.size}
❒ *Paquete:* ${data5.package}

📍  Descargando, espere un momento...`
await conn.sendMessage(m.chat, { text: apkResultado }, { quoted: m })
//conn.sendFile(m.chat, data5.icon, 'thumbnail.jpg', txt, null, rcanal)
if (data5.size.includes('GB') || data5.size.replace(' MB', '') > 999) {
return await conn.sendMessage(m.chat, { text: `📍  El archivo es demasiado pesado para descargar.\n- El limite maximo de descarga es de 999MB.` }, { quoted: m })
}
await conn.sendMessage(m.chat, { document: { url: data5.dllink }, mimetype: 'application/vnd.android.package-archive', fileName: data5.name + '.apk', caption: null }, { quoted: m })
} catch (error) {
await conn.sendMessage(m.chat, { text: `*[ 📍 ]*  ERROR_COMMAND = Command error, try again and if the error persists, report the command.` }, { quoted: m })
}}

handler.tags = ['descargas']
handler.help = ['apk']
handler.command = ['apk', 'app']


export default handler
