import fetch from 'node-fetch';
import baileys from '@whiskeysockets/baileys';

const { generateWAMessageContent, generateWAMessageFromContent, proto } = baileys;

const STICKERLY_API = `${global.APIs.delirius.url}/search/stickerly`;

let handler = async (m, { conn, text, usedPrefix, command }) => {
if (!text) return conn.sendMessage(m.chat, { text: `Ingrese el comando y escriba lo que quiera buscar en Sticker.Ly\n\n• Por ejemplo:\n*#${command}* Caballo Juan` }, { quoted: m });
await conn.sendMessage(m.chat, { text: `Buscando resultados, espere un momento...` }, { quoted: m });
try {
const res = await fetch(`${STICKERLY_API}?query=${encodeURIComponent(text)}`);
const json = await res.json();
if (!json.status || !json.data || json.data.length === 0) return conn.sendMessage(m.chat, { text: `📍  No se han encontrado resultados en la búsqueda.` }, { quoted: m });
const results = json.data.slice(0, 10);

async function createImage(url) {
const { imageMessage } = await generateWAMessageContent(
{ image: { url } },
{ upload: conn.waUploadToServer }
);
return imageMessage;
}

let cards = [];
for (let pack of results) {
let image = await createImage(pack.preview);

cards.push({
body: proto.Message.InteractiveMessage.Body.fromObject({
text: `❒ *Nombre:* ${pack.name}\n❒ *Autor:* ${pack.author}\n❒ *Stickers:* ${pack.sticker_count}\n❒ *Exportados:* ${pack.export_count}`
}),
footer: proto.Message.InteractiveMessage.Footer.fromObject({
text: "📍  Presione el boton de copiar para despues enviarlo y descargar el pack."
}),
header: proto.Message.InteractiveMessage.Header.fromObject({
title: '',
hasMediaAttachment: true,
imageMessage: image
}),
nativeFlowMessage: proto.Message.InteractiveMessage.NativeFlowMessage.fromObject({
buttons: [
{
name: 'cta_copy',
buttonParamsJson: JSON.stringify({
display_text: "Copiar pack",
id: "stickerly",
copy_code: `.stickerly ${pack.url}`
})
}
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
text: `·─┄ · ✦ *Stickerly : Search* ✦ ·*\n\n• *Resultados:* ${results.length} sticker packs\n• *Busqueda:* ${text}`
}),
footer: proto.Message.InteractiveMessage.Footer.create({
text: '📍  Deslice el dedo para ver los demas packs.'
}),
header: proto.Message.InteractiveMessage.Header.create({
hasMediaAttachment: false
}),
carouselMessage: proto.Message.InteractiveMessage.CarouselMessage.fromObject({
cards
})
})
}
}
}, { quoted: m });

await conn.relayMessage(m.chat, msg.message, { messageId: msg.key.id });

} catch (e) {
console.error(e);
await conn.sendMessage(m.chat, { text: `*[ 📍 ]*  ERROR_COMMAND = Command error, try again and if the error persists, report the command.` }, { quoted: m });
}
};

handler.help = ['stickerly <texto>'];
handler.tags = ['sticker', 'search'];
handler.command = ['stickerpack', 'stickerlys'];

export default handler;