 let handler = async (m, { conn, usedPrefix, args, text, command, isOwner }) => {
let media = m.quoted ? m.quoted : m;
let mime = (media.msg || media).mimetype || '';

if (command === "bot-img") {
if (!/image\/(jpe?g|png)/i.test(mime)) return conn.sendMessage(m.chat, { text: `Ingrese de nuevo el comando y responda a una imagen para cambiar la foto de perfil del bot.` }, { quoted: m })
try {
let img = await media.download();
await conn.updateProfilePicture(conn.user.jid, img);
await conn.sendMessage(m.chat, { text: `✓  Se ha cambiado la foto de perfil del bot con exito.` }, { quoted: m });
} catch (e) {
console.error(e);
await conn.sendMessage(m.chat, { text: `*[ 📍 ]*  ERROR_COMMAND = Command error, try again and if the error persists, report the command.` }, { quoted: m });
 }
}

if (command === "bot-px") {
if (!text) return conn.sendMessage(m.chat, { text: `Ingrese de nuevo el comando mas un prefijo valido para cambiarlo.\n\n• Por ejemplo:\n*#${command} prefix* /` }, { quoted: m });
try {
global.prefix = new RegExp('^[' + (text || global.opts['prefix'] || '‎xzXZ/i!#$%+£¢€¥^°=¶∆×÷π√✓©®:;?&.\\-').replace(/[|\\{}()[\]^$+*?.\-\^]/g, '\\$&') + ']');
return conn.sendMessage(m.chat, { text: `✓  Se ha cambiado el prefijo con exito.\n- Ahora el prefijo es *[ ${text} ]*.` }, { quoted: m });
} catch (e) {
await conn.sendMessage(m.chat, { text: `*[ 📍 ]*  ERROR_COMMAND = Command error, try again and if the error persists, report the command.` }, { quoted: m });
 }
} 

if (command === "bot-desc") {
if (!text) return conn.sendMessage(m.chat, { text: `Ingrese el comando y escriba la descripción del bot en su perfil principal.\n\n• Por ejemplo:\n*#${command} desc* Hola estoy usando WhatsApp.` }, { quoted: m });
try {
await conn.updateProfileStatus(text).catch(_ => _)
conn.sendMessage(m.chat, { text: `✓  Se ha configurado la nueva descripción del bot con exito.` }, { quoted: m });
} catch (e) {
await conn.sendMessage(m.chat, { text: `*[ 📍 ]*  ERROR_COMMAND = Command error, try again and if the error persists, report the command.` }, { quoted: m });
 }
}

if (command === "bot-name") {
if (!text) return conn.sendMessage(m.chat, { text: `Ingrese de nuevo el comando y escriba el nuevo nombre de perfil del bot.\n\n• Por ejemplo:\n*#${command} name* MX BOT` }, { quoted: m });
try {
await conn.updateProfileName(text)
return conn.sendMessage(m.chat, { text: `✓  Se ha configurado el nombre del perfil en el bot con exito.` }, { quoted: m })
} catch (e) {
console.log(e)
await conn.sendMessage(m.chat, { text: `*[ 📍 ]*  ERROR_COMMAND = Command error, try again and if the error persists, report the command.` }, { quoted: m });
}
}

if (command === "xbot") {
let noValido = `📍  Aqui tiene una lista de lo que puedes configurar en el numero del bot.


> ⩽ *Opciones : Disponibles* ⩾
⊹ ✎ *#bot-img*  <reply>
> (Cambia la foto de perfil del bot.)
⊹ ✎ *#bot-px*  <query>
> (Cambia el prefijo a un nuevo prefijo predeterminado.)
⊹ ✎ *#bot-desc*  <text>
> (Cambia la descripción del perfil en el bot.)
⊹ ✎ *#bot-name*  <text>
> (Cambia el nombre de perfil del bot.)`.trim();
return conn.sendMessage(m.chat, { text: noValido }, { quoted: m })
}
}


handler.help = ['xbot', 'bot-name  <text>', 'bot-desc  <text>', 'bot-img  <reply>', 'bot-px  <query>'];
handler.tags = ['propietario'];
handler.command = ['bot-name', 'bot-desc', 'bot-img', 'bot-px', 'xbot'];
handler.owner = true;

export default handler;
