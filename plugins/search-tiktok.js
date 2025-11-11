import axios from "axios";
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