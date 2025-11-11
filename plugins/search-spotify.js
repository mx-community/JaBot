import fetch from 'node-fetch'
const { generateWAMessageContent, generateWAMessageFromContent, proto } = (await import('@whiskeysockets/baileys')).default

let handler = async (m, { conn, text, usedPrefix, command }) => {
if (!text) return conn.sendMessage(m.chat, { text: `Ingrese el comando y escriba el nombre de la canción para buscarlo en *Spotify.*\n\n• Por ejemplo:\n*#${command}* Sailor Song` }, { quoted: m })
await conn.sendMessage(m.chat, { text: `Buscando resultados, espere un momento...` }, { quoted: m });

try {
async function createImage(url) {
const { imageMessage } = await generateWAMessageContent(
{ image: { url } }, 
{ upload: conn.waUploadToServer }
)
return imageMessage
}

let push = [];
let api = await fetch(`${global.APIs.delirius.url}/search/spotify?q=${encodeURIComponent(text)}`);
let json = await api.json();

for (let track of json.data) {
let image = await createImage(track.image);
let spotyTextos = `🝐✦  *SPOTIFY : SONG*

✎ *Artistas:* ${track.artist}
✎ *Duración:* ${track.duration}
✎ *Álbum:* ${track.album}
✎ *Popularidad:* ${track.popularity}
✎ *Publicado:* ${track.publish}
✎ *Link:* ${track.url}`

push.push({
body: proto.Message.InteractiveMessage.Body.fromObject({
text: spotyTextos
}),
footer: proto.Message.InteractiveMessage.Footer.fromObject({
text: ''
}),
header: proto.Message.InteractiveMessage.Header.fromObject({
title: '',
hasMediaAttachment: true,
imageMessage: image
}),
nativeFlowMessage: proto.Message.InteractiveMessage.NativeFlowMessage.fromObject({
buttons: [
{ "name": "cta_copy", "buttonParamsJson": JSON.stringify({ display_text: "Copiar 🎧", id: "123456789", copy_code: `.spotify ${track.url}` })}, 
{ "name": "cta_url", "buttonParamsJson": JSON.stringify({ display_text: "Ver 📎", url: track.url })}
]
})
});
}

const msg = generateWAMessageFromContent(m.chat, {
viewOnceMessage: {
message: {
messageContextInfo: {
mentionedJid: [m.sender],
isForwarded: true,
forwardedNewsletterMessageInfo: {
newsletterJid: channelRD.id,
serverMessageId: 100,
newsletterName: channelRD.name
},
deviceListMetadata: {},
deviceListMetadataVersion: 2
},
interactiveMessage: proto.Message.InteractiveMessage.fromObject({
body: proto.Message.InteractiveMessage.Body.create({
text: `·─┄ · ✦ *Spotify : Search* ✦ ·\n- Resultados encontrados en *Spotify.*`
}),
footer: proto.Message.InteractiveMessage.Footer.create({
text: '📍  Copie y pegue el texto copiado para descargar el audio.'
}),
header: proto.Message.InteractiveMessage.Header.create({ hasMediaAttachment: false }),
carouselMessage: proto.Message.InteractiveMessage.CarouselMessage.fromObject({
cards: [...push]
})
})
}
}
}, { quoted: m });
await conn.relayMessage(m.chat, msg.message, { messageId: msg.key.id })
} catch (error) {
console.error(error);
await conn.sendMessage(m.chat, { text: `*[ 📍 ]*  ERROR_COMMAND = Command error, try again and if the error persists, report the command.` }, { quoted: m });
}
}

handler.help = ["spotifys *<texto>*"]
handler.tags = ["search"]
handler.command = ["spotifys"]

export default handler
