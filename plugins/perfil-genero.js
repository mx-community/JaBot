import { createHash } from 'crypto';  
import fetch from 'node-fetch';

const handler = async (m, { conn, command, usedPrefix, text }) => {
let user = global.db.data.users[m.sender];
if (user.genre) return conn.sendMessage(m.chat, { text: `📌  Ya tienes un genero establecido en tu *#perfil*.\n- Usa *#d-genero* para eliminarlo.` }, { quoted: m });

if (!text) return conn.sendMessage(m.chat, { text: `📍  Debes ingresar un genero valido, de hombre o mujer.\n\n• Por ejemplo:\n*#${command}* hombre` }, { quoted: m });

function asignarGenre(text) {
let genre;
switch (text.toLowerCase()) {
case "hombre":
genre = "Hombre";
break;
case "mujer":
genre = "Mujer";
break;
default:
return null;
}
return genre;
}

let genre = asignarGenre(text);
if (!genre) {
return conn.sendMessage(m.chat, { text: `📍  No existe otro genero, debes elegir entre mujer o hombre.\n\n• Por ejemplo:\n*#${command}* hombre` }, { quoted: m });
}

user.genre = genre;

return conn.sendMessage(m.chat, { text: `✅  ¡Configurado con exito!\n- Usa *#perfil* para verlo.` }, { quoted: m });
};

handler.help = ['p-genero']
handler.tags = ['rpg']
handler.command = ['p-genero']
export default handler;

