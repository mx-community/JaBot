import axios from 'axios';
import baileys from '@whiskeysockets/baileys';

const { generateWAMessageContent, generateWAMessageFromContent, proto } = baileys;

let handler = async (m, { conn, usedPrefix, command, text }) => {
if (!text) return conn.sendMessage(m.chat, { text: `Ingrese el comando y escriba el nombre de una canción para buscarla.\n\n• *Por ejemplo:*\n*#${command}* Yo te esperaré.` }, { quoted: m });
await conn.sendMessage(m.chat, { text: `Buscando resultados, espere un momento...` }, { quoted: m });
try {
const response = await axios.get(`https://apis-starlights-team.koyeb.app/starlight/soundcloud-search?text=${encodeURIComponent(text)}`);
const results = response.data;
if (!results || !Array.isArray(results) || results.length === 0) return conn.sendMessage(m.chat, { text: `📍  No se han encontrado resultados de la búsqueda, intentelo de nuevo.` }, { quoted: m });
async function createImage(url) {
const { imageMessage } = await generateWAMessageContent(
{ image: { url } },
{ upload: conn.waUploadToServer }
);
return imageMessage;
}

let cards = [];
for (let i = 0; i < results.length; i++) {
let track = results[i];

const image = await createImage(track.image || banner);

const infoHeader = `🝐✦  *SONG : NUMERO ${i + 1}*\n• *Resultados:* 10\n• *Búsqueda:* ${track.title || "Sin titulo."}\n• *Similares:* Variado.`;
const infoBody = `✎ *Artista:* ${track.artist || 'Desconocido'}
✎ *Reproducciones:* ${track.repro || 'N/A'}
✎ *Duración:* ${track.duration || 'N/A'}
✎ *Creador:* ${track.creator || 'Desconocido'}
✎ *URL:* ${track.url}
`;

cards.push({
body: proto.Message.InteractiveMessage.Body.fromObject({ text: infoHeader }),
footer: proto.Message.InteractiveMessage.Footer.fromObject({ text: infoBody }),
header: proto.Message.InteractiveMessage.Header.fromObject({
title: '',
hasMediaAttachment: true,
imageMessage: image
}),
nativeFlowMessage: proto.Message.InteractiveMessage.NativeFlowMessage.fromObject({
buttons: [
{ name: 'cta_copy', buttonParamsJson: JSON.stringify({ display_text: "Copiar 🎧", id: "soundcloud2", copy_code: `/soundcloud2 ${track.url}` }) },
{ name: 'cta_url', buttonParamsJson: JSON.stringify({ display_text: "📎 Ver", url: track.url })}
]
})
});
}

const msg = generateWAMessageFromContent(m.chat, {
viewOnceMessage: {
message: {
messageContextInfo: {
deviceListMetadata: {},
deviceListMetadataVersion: 2
},
interactiveMessage: proto.Message.InteractiveMessage.fromObject({
body: proto.Message.InteractiveMessage.Body.create({
text: `·─┄ · ✦ *Soundcloud* ✦ ·\n- Se han encontrado varios resultados entre las 10 canciones.`
}),
footer: proto.Message.InteractiveMessage.Footer.create({ text: '📍  Para descargar copie y envie el texto copiado para descargarlo.' }),
header: proto.Message.InteractiveMessage.Header.create({ hasMediaAttachment: false }),
carouselMessage: proto.Message.InteractiveMessage.CarouselMessage.fromObject({ cards })
})
}
}
}, { quoted: m });
await conn.relayMessage(m.chat, msg.message, { messageId: msg.key.id });

} catch (error) {
console.error(error);
await conn.sendMessage(m.chat, { text: `*[ 📍 ]*  ERROR_COMMAND = Command error, try again and if the error persists, report the command.` }, { quoted: m });
}
}

handler.tags = ['search'];
handler.help = ['soundcloudsearch <texto>'];
handler.command = ['songs'];

export default handler;