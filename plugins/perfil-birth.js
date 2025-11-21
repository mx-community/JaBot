import { createHash } from 'crypto';  
import fetch from 'node-fetch';

const handler = async (m, { conn, command, usedPrefix, text }) => {
let user = global.db.data.users[m.sender];
if (user.birth) {
return conn.sendMessage(m.chat, { text: `📌  Ya tienes una fecha establecida en tu *#perfil*.\n- Usa *#d-birth* para eliminarlo.` }, { quoted: m });
}

if (!text) return conn.sendMessage(m.chat, { text: `📍  Debes poner el dia, mes y año para establecer tu fecha.\n\n• Por ejemplo:\n*#${command}* 12/12/2025` }, { quoted: m });

function validarFechaNacimiento(text) {
const opcionesFecha = [
/^\d{1,2}\/\d{1,2}\/\d{4}$/ // dd/mm/yyyy or m/d/yyyy
];

let esValida = opcionesFecha.some(regex => regex.test(text));
if (!esValida) return null;

if (/^\d{1,2}\/\d{1,2}\/\d{4}$/.test(text)) {
const [dia, mes, año] = text.split('/');
const meses = ["enero", "febrero", "marzo", "abril", "mayo", "junio", "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"];
return `${parseInt(dia)} de ${meses[parseInt(mes) - 1]} de ${año}`;
}
return text;
}

let birth = validarFechaNacimiento(text);
if (!birth) {
return conn.sendMessage(m.chat, { text: `📍  La fecha debe ser valida.\n\n• Por ejemplo:\n*#${command}* 12/12/2025` }, { quoted: m });
}

user.birth = birth;
return conn.sendMessage(m.chat, { text: `✅  ¡Configurado con exito!\n- Usa *#perfil* para verlo.` }, { quoted: m });
};

handler.help = ['p-birth']
handler.tags = ['rpg']
handler.command = ['p-birth']
export default handler;

