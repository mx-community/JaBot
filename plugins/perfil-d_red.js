import { createHash } from 'crypto';  
import fetch from 'node-fetch';

const handler = async (m, { conn }) => {
let user = global.db.data.users[m.sender];

if (!user.misocial) {
return conn.sendMessage(m.chat, { text: `📌  No tienes un enlace establecido en tu *#perfil*.\n- Usa *#p-red* para establecer un enlace.` }, { quoted: m });
}
user.misocial = 'Sin enlace.';
return conn.sendMessage(m.chat, { text: `✅  ¡Configurado con éxito!\n- Se ha eliminado tu enlace en el *#perfil*.` }, { quoted: m });
};

handler.help = ['d-red']
handler.tags = ['rpg']
handler.command = ['d-red']
export default handler;


