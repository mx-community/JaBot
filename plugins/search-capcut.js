import fetch from "node-fetch";

let handler = async (m, { conn, text, usedPrefix, command }) => {
if (!text) {
return conn.sendMessage(m.chat, { text: `Ingrese el comando y escriba lo que quiera buscar en *CapCut*.\n\n• Por ejemplo:\n*#${command}* Edit ponk` }, { quoted: m });
}

try {
await conn.sendMessage(m.chat, { text: `Buscando videos, espere un momento...` }, { quoted: m });
let res = await fetch(
`${global.APIs.vreden.url}/api/v1/search/capcut?query=${encodeURIComponent(text)}`
);
let json = await res.json();

if (!json.status || !json.result || !json.result.search_data?.length) {
return conn.sendMessage(m.chat, { text: `📍  No se han encontrado videos relacionados a la búsqueda, inténtelo de nuevo.` }, { quoted: m })
}

let resultados = json.result.search_data;
for (let i = 0; i < resultados.length; i++) {
let r = resultados[i];
let contextoCapcut = `·─┄ · ✦ *CapCut : Search* ✦ ·

⊹ ✎ *Videos:* ${i + 1}
⊹ ✎ *Short:* ${r.short_title || "N/A"}
⊹ ✎ *Calidad:* ${r.download.definition} - ${r.download.video_quality}
⊹ ✎ *Bitrate:* ${r.download.bitrate}bps`;
await conn.sendMessage(m.chat, { text: contextoCapcut, contextInfo: { externalAdReply: { title: r.title, body: `Enviando videos, espere un momento...`, thumbnailUrl: data.preview, sourceUrl: data.url, mediaType: 1, renderLargerThumbnail: false }}}, { quoted: m });
if (r.download?.video_original) { 
await conn.sendMessage(m.chat, { video: { url: r.download.video_original }, caption: null }, m );
}
}
} catch (e) {
console.error(e);
await conn.sendMessage(m.chat, { text: `*[ 📍 ]*  ERROR_COMMAND = Command error, try again and if the error persists, report the command.` }, { quoted: m });
}
};

handler.help = ["capcut <texto>"];
handler.tags = ["search"];
handler.command = ["cts", "capcuts"];

export default handler;