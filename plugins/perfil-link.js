import { createHash } from 'crypto';  
import fetch from 'node-fetch';
const handler = async (m, { conn, command, usedPrefix, text }) => {
let user = global.db.data.users[m.sender];
if (user.misocial) return conn.sendMessage(m.chat, { text: `📌  Ya tienes un enlace en tu *#perfil*.\n- Eliminalo con *#d-red* para aplicar otro.` }, { quoted: m });
if (!text) return conn.sendMessage(m.chat, { text: `📍  Debes proporcionar un enlace para establecerlo en tu *#perfil*\n\n• Por ejemplo:\n*#${command}* https://instagram.com/ejemplo` }, { quoted: m });
user.misocial = text;
return conn.sendMessage(m.chat, { text: `✅  ¡Configurado con exito!\n- Usa *#perfil* para verlo.` }, { quoted: m });
};

handler.help = ['p-red <text>']
handler.tags = ['rpg']
handler.command = ['p-red']
export default handler;

