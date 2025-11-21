import { createHash } from 'crypto';
import fetch from 'node-fetch';

const handler = async (m, { conn, command, usedPrefix, text }) => {
let user = global.db.data.users[m.sender];

// Validación de entrada vacía
if (!text?.trim()) {
return conn.sendMessage(m.chat, { text: `📌  Debes ingresar solo numeros para editar tu edad.\n\n• Por ejemplo:\n*#${command} 25` }, { quoted: m });
}

// Validación de edad
const edad = parseInt(text);
if (isNaN(edad) || edad < 0 || edad > 500) {
return conn.sendMessage(m.chat, { text: `📍  Solo puedes editar tu edad desde 0 a 500.\n- Intentalo de nuevo con una edad mediana.` }, { quoted: m });
}

// Establecer la edad
user.age = edad;

// Respuesta exitosa
return conn.sendMessage(m.chat, { text: `✅  ¡Configurado con exito!\n- Usa *#perfil* para verlo.` }, { quoted: m });
};

// Configuración del comando
handler.help = ['p-age'];
handler.tags = ['rpg'];
handler.command = ['p-age'];

export default handler;

