/*import axios from 'axios'

const handler = async (m, { conn, text, usedPrefix, command}) => {
if (!text) return conn.sendMessage(m.chat, { text: `Ingrese el comando y escriba lo que quiere buscar en TikTok.\n\n• Por ejemplo:\n*${usedPrefix + command}* Trends de baile.` }, { quoted: m })
const isUrl = /(?:https:?\/{2})?(?:www\.|vm\.|vt\.|t\.)?tiktok\.com\/([^\s&]+)/gi.test(text)
try {
await conn.sendMessage(m.chat, { text: `Buscando resultados, espere un momento...` }, { quoted: m })
if (isUrl) {
const res = await axios.get(`https://www.tikwm.com/api/?url=${encodeURIComponent(text)}?hd=1`)
const data = res.data?.data;
if (!data?.play) return conn.sendMessage(m.chat, { text: `📍  No se han encontrado resultados sobre la búsqueda.` }, { quoted: m })
const { title, duration, author, created_at, type, images, music, play } = data
const caption = createCaption(title, author, duration, created_at)
if (type === 'image' && Array.isArray(images)) {
const medias = images.map(url => ({ type: 'image', data: { url }, caption }));
await conn.sendSylphy(m.chat, medias, { quoted: m })
if (music) {
await conn.sendMessage(m.chat, { audio: { url: music }, mimetype: 'audio/mp4', fileName: 'tiktok_audio.mp4' }, { quoted: m })
}} else {
await conn.sendMessage(m.chat, { video: { url: play }, caption }, { quoted: m })
}} else {
const res = await axios({ method: 'POST', url: 'https://tikwm.com/api/feed/search', headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8', 'Cookie': 'current_language=en', 'User-Agent': 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/116.0.0.0 Mobile Safari/537.36' }, data: { keywords: text, count: 20, cursor: 0, HD: 1 }})
const results = res.data?.data?.videos?.filter(v => v.play) || []
if (results.length < 2) return conn.reply(m.chat, 'ꕥ Se requieren al menos 2 resultados válidos con contenido.', m)
const medias = results.slice(0, 10).map(v => ({ type: 'video', data: { url: v.play }, caption: createSearchCaption(v) }))
await conn.sendSylphy(m.chat, medias, { quoted: fkontak })
}
await m.react('✅')
} catch (e) {
await m.react('📍')
await await conn.sendMessage(m.chat, { text: `*[ 📍 ]*  ERROR_COMMAND = ${e}` }, { quoted: m })
}}
function createCaption(title, author, duration, created_at = '') {
  return `·─┄ · ✦ *TikTok : Search* ✦ ·\n\n⏍ *Titulo:* ${title || 'Desconocido.'} / ${created_at || "Undefined Date."}\nⴵ *Duración:* ${duration || "Undefined."}\n🜲 *Creador:* ${author?.unique_id} *(@${author?.nickname})`
}
function createSearchCaption(data) {
return `·─┄ · ✦ *TikTok : Search* ✦ ·\n\n⏍ *Titulo:* ${data.title || 'Desconocido.'}\nⴵ *Duración:* ${data.duration || 'Undefined.'}\n🜲 *Creador:* ${data.author?.unique_id} *(@${data.author?.nickname})*`
}

handler.help = ['tiktoks', 'tts']
handler.tags = ['buscadores']
handler.command = ['tiktoks', 'tts']


export default handler
  */

/*import axios from "axios";
const { proto, generateWAMessageFromContent, generateWAMessageContent, } = (await import("@whiskeysockets/baileys")).default;

let handler = async (m, { conn, text, usedPrefix, command }) => {
if (!text) return conn.sendMessage(m.chat, { text: `Ingrese el comando y escriba lo que quiere buscar en *TikTok*.\n\n• Por ejemplo:\n*#${command}* Trends de baile` }, { quoted: m })
const createVideoMessage = async (url) => {
try {
const { data } = await axios.get(url, { responseType: "arraybuffer" });
const buffer = Buffer.from(data);
const { videoMessage } = await generateWAMessageContent({ video: buffer }, { upload: conn.waUploadToServer });
return videoMessage;
} catch {
return null;
}
};

try {
await conn.sendMessage(m.chat, { text: `Buscando videos, espere un momento...` }, { quoted: m });

const apiUrl = `https://api.starlights.uk/api/search/tiktok?text=${encodeURIComponent(
text
)}`;
const res = await axios.get(apiUrl);
const data = res.data;

if (!data?.status || !data?.result?.data?.length)
throw new Error("No se encontraron resultados en TikTok.");

let results = data.result.data.slice(0, 6);
let cards = [];

for (let v of results) {
let infoTiktok = `
• ✎ *Creador:* ${v.creator || "Desconocido"}
• ✎ *Duración:* ${v.duration || 0} segundos
• ✎ *Publicado:* ${v.create_time || "N/A"}
• ✎ *Vistas:* ${v.views?.toLocaleString() || 0}
• ✎ *Enlace:* ${v.url || "No disponible"}`;

let videoMsg = await createVideoMessage(v.nowm);
if (!videoMsg) continue;

cards.push({
body: proto.Message.InteractiveMessage.Body.fromObject({ text: `·─┄ · ✦ *TikTok : Result* ✦ ·\n• *Titulo:* ${v.title}\n• *Videos:* 5 resultados.` }),
footer: proto.Message.InteractiveMessage.Footer.fromObject({ text: infoTiktok, }),
header: proto.Message.InteractiveMessage.Header.fromObject({ title: v.title || "Video de tiktok.",
hasMediaAttachment: true,
videoMessage: videoMsg,
}),
nativeFlowMessage: proto.Message.InteractiveMessage.NativeFlowMessage.fromObject(
{
buttons: [
{
name: "cta_url",
buttonParamsJson: JSON.stringify({
display_text: "Ver en TikTok",
url: v.url || v.nowm,
}),
},
],
}
),
});
}

if (cards.length === 0)
throw new Error("No se pudo procesar ningún video.");

const msg = generateWAMessageFromContent(
m.chat,
{
viewOnceMessage: {
message: {
messageContextInfo: { deviceListMetadata: {}, deviceListMetadataVersion: 2 },
interactiveMessage: proto.Message.InteractiveMessage.fromObject({
body: proto.Message.InteractiveMessage.Body.create({ text: `·─┄ · ✦ *TikTok : Video* ✦ ·`, }), footer: proto.Message.InteractiveMessage.Footer.create({ text: "📍  Disfruta de los videos encontrados para ti.", }),
header: proto.Message.InteractiveMessage.Header.create({
hasMediaAttachment: false,
}),
carouselMessage: proto.Message.InteractiveMessage.CarouselMessage.fromObject(
{ cards }
),
}),
},
},
},
{ quoted: m }
);

await conn.relayMessage(m.chat, msg.message, { messageId: msg.key.id });
} catch (e) {
console.error(e);
await conn.sendMessage(m.chat, { text: `*[ 📍 ]*  ERROR_COMMAND = Command error, try again and if the error persists, report the command.` }, { quoted: m });
}
};

handler.help = ["tiktoksearch <texto>"];
handler.tags = ["search"];
handler.command = ["ttss", "tiktoks"];

export default handler;
*/
