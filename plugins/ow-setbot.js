let handler = async (m, { conn, usedPrefix, args, text, command, isOwner }) => {
let media = m.quoted ? m.quoted : m;
let mime = (media.msg || media).mimetype || '';

if (args[0] === "foto" || args[0] === "pp" && !mime) {
if (!/image\/(jpe?g|png)/i.test(mime)) return conn.sendMessage(m.chat, { text: `Ingrese de nuevo el comando y responda a una imagen para cambiar la foto de perfil del bot.` }, { quoted: m })
try {
let img = await media.download();
await conn.updateProfilePicture(conn.user.jid, img);
await conn.sendMessage(m.chat, { text: `✓  Se ha cambiado la foto de perfil del bot con exito.` }, { quoted: m });
} catch (e) {
console.error(e);
await conn.sendMessage(m.chat, { text: `*[ 📍 ]*  ERROR_COMMAND = Command error, try again and if the error persists, report the command.` }, { quoted: m });
 }
} else if (args[0] === "prefix" && !text) {
if (!text) return conn.sendMessage(m.chat, { text: `Ingrese de nuevo el comando mas un prefijo valido para cambiarlo.\n\n• Por ejemplo:\n*#${command} prefix* /` }, { quoted: m });
try {
global.prefix = new RegExp('^[' + (text || global.opts['prefix'] || '‎xzXZ/i!#$%+£¢€¥^°=¶∆×÷π√✓©®:;?&.\\-').replace(/[|\\{}()[\]^$+*?.\-\^]/g, '\\$&') + ']');
return conn.sendMessage(m.chat, { text: `✓  Se ha cambiado el prefijo con exito.\n- Ahora el prefijo es *[ ${text} ]*.` }, { quoted: m });
} catch (e) {
await conn.sendMessage(m.chat, { text: `*[ 📍 ]*  ERROR_COMMAND = Command error, try again and if the error persists, report the command.` }, { quoted: m });
 }
} else if (args[0] === "desc" || args[0] === "description" && !text) {
if (!text) return conn.sendMessage(m.chat, { text: `Ingrese el comando y escriba la descripción del bot en su perfil principal.\n\n• Por ejemplo:\n*#${command} desc* Hola estoy usando WhatsApp.` }, { quoted: m });
try {
await conn.updateProfileStatus(text).catch(_ => _)
conn.sendMessage(m.chat, { text: `✓  Se ha configurado la nueva descripción del bot con exito.` }, { quoted: m });
} catch (e) {
await conn.sendMessage(m.chat, { text: `*[ 📍 ]*  ERROR_COMMAND = Command error, try again and if the error persists, report the command.` }, { quoted: m });
 }
} else if (args[0] === "name" || args[0] === "nombre" && !text) {
if (!text) return conn.sendMessage(m.chat, { text: `Ingrese de nuevo el comando y escriba el nuevo nombre de perfil del bot.\n\n• Por ejemplo:\n*#${command} name* MX BOT` }, { quoted: m });
try {
await conn.updateProfileName(text)
return conn.sendMessage(m.chat, { text: `✓  Se ha configurado el nombre del perfil en el bot con exito.` }, { quoted: m })
} catch (e) {
console.log(e)
await conn.sendMessage(m.chat, { text: `*[ 📍 ]*  ERROR_COMMAND = Command error, try again and if the error persists, report the command.` }, { quoted: m });
}
} else {
let noValido = `📍  Aqui tiene una lista de lo que puedes configurar en el numero del bot.


> ⩽ *Opciones : Disponibles* ⩾
⊹ ✎ *#${comando} foto*  <reply> 
> (Cambia la foto de perfil del bot.)
⊹ ✎ *#${comando} prefix*  <text>
> (Cambia el prefijo a un nuevo prefijo predeterminado.)
⊹ ✎ *#${comando} desc*  <text>
> (Cambia la descripción del perfil en el bot.)
⊹ ✎ *#${comando} name*  <text>
> (Cambia el nombre de perfil del bot.)`.trim();
return conn.sendMessage(m.chat, { text: noValido }, { quoted: m })
}
}


handler.help = ['setppbot'];
handler.tags = ['owner'];
handler.command = ['xbot'];
handler.owner = true;

export default handler;
