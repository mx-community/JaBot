import fs from 'fs';
import { img2img } from '../lib/nanobanana.js';
const handler = async (m, { conn, text, usedPrefix, command }) => {
const q = m.quoted ? m.quoted : m;
const mime = (q.msg || q).mimetype || q.mediaType || '';

if (!/image/g.test(mime)) return conn.sendMessage(m.chat, { text: `Ingrese el comando y responda a una imagen y escriba lo que quiera editar en la imagen.` }, { quoted: m });
if (!text) conn.sendMessage(m.chat, { text: `📍  Debe de ingresar el comando y responder a una imagen y escribir lo que quieres editar en la imagen.` }, { quoted: m });
const data = await q.download?.();
try {
const resultBuffer = await img2img(data, text);
console.log(resultBuffer)
await conn.sendMessage(m.chat, { image: resultBuffer, caption: '✓  Imagen generada.' }, { quoted: m });
} catch (error) {
console.error(error);
await conn.sendMessage(m.chat, { text: `*[ 📍 ]*  ERROR_COMMAND = ${error}` }, { quoted: m });
}
};

handler.help = ['nanob  <reply+text>'];
handler.tags = ['inteligencias'];
handler.command = ['nanob', 'nano'];
export default handler;
  
