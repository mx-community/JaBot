import { createHash } from 'crypto';  
import fetch from 'node-fetch';

const handler = async (m, { conn }) => {
let user = global.db.data.users[m.sender];

if (!user.description) {
return conn.sendMessage(m.chat, { text: `📌  No tienes una descripción establecida en tu *#perfil*.\n- Usa *#p-desc* para establecer una descripción.` }, { quoted: m });
}
user.description = 'Sin descripción.';
return conn.sendMessage(m.chat, { text: `✅  ¡Configurado con éxito!\n- Se ha eliminado tu descripción en el *#perfil*.` }, { quoted: m });
};

handler.help = ['d-desc']
handler.tags = ['rpg']
handler.command = ['d-desc']
export default handler;


