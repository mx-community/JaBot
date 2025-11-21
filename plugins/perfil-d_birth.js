import { createHash } from 'crypto';  
import fetch from 'node-fetch';

const handler = async (m, { conn, command, usedPrefix, text }) => {

let user = global.db.data.users[m.sender];

if (!user.birth) {
return conn.sendMessage(m.chat, { text: `📌  No tienes una fecha establecida en tu *#perfil*.\n- Usa *#p-birth* para poner una fecha.` }, { quoted: m });
}
user.birth = 'Sin fecha.';
return conn.sendMessage(m.chat, { text: `✅  ¡Configurado con exito!\n- Se a eliminado tu fecha en el *#perfil*.` }, { quoted: m });
};

handler.help = ['d-birth'];
handler.tags = ['rpg'];
handler.command = ['d-birth'];
export default handler;

