import { createHash } from 'crypto';  
import fetch from 'node-fetch';

const handler = async (m, { conn }) => {
let user = global.db.data.users[m.sender];

if (!user.description) {
return conn.sendMessage(m.chat, { text: `📌  No tienes un genero establecida en tu *#perfil*.\n- Usa *#p-genero* para establecer un genero valido.` }, { quoted: m });
}
user.description = 'Sin genero.';
return conn.sendMessage(m.chat, { text: `✅  ¡Configurado con éxito!\n- Se ha eliminado tu genero en el *#perfil*.` }, { quoted: m });
};

handler.help = ['d-genero']
handler.tags = ['rpg']
handler.command = ['d-genero']
export default handler;


