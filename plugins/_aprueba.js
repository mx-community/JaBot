import fetch from 'node-fetch';
var handler = async (m, { conn, text, args, usedPrefix, command }) => {
if (!args[0]) {
if (!text) return conn.sendMessage(m.chat, { text: `Ingrese el comando y escriba un texto para crear una imagen.\n\n• *Por ejemplo:*\n${usedPrefix + command} Un gato.` }, { quoted: m });
try {
await m.react('⏳');
conn.sendPresenceUpdate('composing', m.chat);
var apii = await fetch(`https://api.agungny.my.id/api/text2img?prompt=${encodeURIComponent(text)}`);
var res = await apii.arrayBuffer();
await conn.sendMessage(m.chat, { image: { url: Buffer.from(res) }, caption: "🖼️  *image-ai.png*" }, { quoted: m });
} catch (error) {
console.error(error);
return await conn.sendMessage(m.chat, { text: `*[ 📍 ]*  ERROR_COMMAND = Command error, try again and if the error persists, report the command.` }, { quoted: m })
 }
} else if (args[0] === 'force' || args[0] === '--force') {
if (!text) {
return conn.sendMessage(m.chat, { text: `Ingrese de nuevo el comando y escriba lo que quiera para generar una imagen.\n\n• *Por ejemplo:*\n${usedPrefix + command} Un arbol con frutos.` }, { quoted: m });
}
await conn.sendMessage(m.chat, { text: `Intentare crear eso, espere un momento...` }, { quoted: m });
await m.react("⏳");
try {
const prompt = encodeURIComponent(text.trim());
const imageUrl = `https://anime-xi-wheat.vercel.app/api/ia-img?prompt=${prompt}`;
let mensajeResp = `${pickRandom(global.listos)}`
await conn.sendMessage(m.chat, { image: { url: imageUrl }, caption: mensajeResp }, { quoted: m });
} catch (e) {
console.error(e);
await conn.sendMessage(m.chat, { text: `*[ 📍 ]*  ERROR_COMMAND = Command error, try again and if the error persists, report the command.` }, { quoted: m })
}
};
 }

handler.command = ['imagina'];
export default handler;

function pickRandom(list) {
return list[Math.floor(Math.random() * list.length)]}

global.listos = ["Aqui tienes tu imagen. ¿Te gustaria que genere otra cosa?", "Tu imagen esta listo. ¿Que te parece? ¿O genero otra?", "Aqui tienes tu imagen solicitada. ¿Te parece bien o genero otra?"]

