import { createHash } from 'crypto';  
import fetch from 'node-fetch';
const handler = async (m, { conn, command, usedPrefix, text }) => {
let user = global.db.data.users[m.sender];
if (user.description) return conn.sendMessage(m.chat, { text: `📌  Ya tienes una descripción en tu perfil.\n- Eliminalo con *#d-desc* para aplicar otro.` }, { quoted: m });
if (!text) return conn.sendMessage(m.chat, { text: `📍  Debes escribir tu descripción para establecerlo en tu *#perfil*\n\n• Por ejemplo:\n*#${command}* Hola, este es mi perfil.` }, { quoted: m });
user.description = text;
return conn.sendMessage(m.chat, { text: `✅  ¡Configurado con exito!\n- Usa *#perfil* para verlo.` }, { quoted: m });
};

handler.help = ['p-desc <text>']
handler.tags = ['rpg']
handler.command = ['p-desc']
export default handler;

