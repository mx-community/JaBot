import fetch from "node-fetch";

let handler = async (m, { conn, text, usedPrefix, command }) => {
if (!text) return conn.sendMessage(m.chat, { text: `Ingrese el comando y escriba el nombre de una cancion para buscarlo en *AppleMusic.*\n\n• Por ejemplo:\n*#${command}* Yo te esperaré.` }, { quoted: m })
try {
let res, json;
try {
res = await fetch(`https://api.delirius.store/search/applemusic?text=${encodeURIComponent(text)}`);
json = await res.json();
if (!Array.isArray(json) || json.length === 0) throw new Error("Sin resultados API 1");
} catch (e) {
res = await fetch(`https://api.delirius.store/search/applemusicv2?query=${encodeURIComponent(text)}`);
let alt = await res.json();
if (!alt?.data || alt.data.length === 0) throw new Error("Sin resultados API 2");
json = alt.data.map(v => ({ title: v.title, type: "Canción", artists: v.artist, url: v.url, image: v.image }));
}

let result = json.slice(0, 5); // Limitar a 5 resultados
let textMsg = `·─┄ · ✦ *AppleMusic : Search* ✦ ·\n\n⊸❒ *Canciones:* 5\n⊸❒ *Buscador:* AppleMusic\n\n`;
result.forEach((item, i) => {
textMsg += `> *${i + 1}:* ${item.title}
✎ *Artista:* ${item.artists}
✎ *Tipo:* ${item.type || "Desconocido"}
✎ *Enlace:* ${item.url}\n\n`;
});

await conn.sendMessage(m.chat, { text: textMsg, contextInfo: { externalAdReply: { 
title: "❤️  Resultados encontrados en AppleMusic.", 
body: "Puede copiar los enlaces y descargarlo con un comando específico.", 
thumbnail: result[0].image, 
sourceUrl: null, 
mediaType: 1, renderLargerThumbnail: false }}}, { quoted: m });
} catch (err) {
console.error(err);
await conn.sendMessage(m.chat, { text: `*[ 📍 ]*  ERROR_COMMAND = Command error, try again and if the error persists, report the command.` }, { quoted: m });
}
};

handler.help = ["applemusicsearch <canción>"];
handler.tags = ["search"];
handler.command = ['apples'];

export default handler;
