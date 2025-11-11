import fetch from "node-fetch";

let handler = async (m, { conn, text, usedPrefix, command }) => {
if (!text) {
return conn.sendMessage(m.chat, { text: `Ingrese el comando y escriba una petición exacta para descargarlos.\n\n• Por ejemplo: DJ netizen rahmatahalu` }, { quoted: m });
}

try {
await conn.sendMessage(m.chat, { text: `Descargando videos, espere un momento...` }, { quoted: m });

let res = await fetch(
`${global.APIs.vreden.url}/api/v1/search/capcut?query=${encodeURIComponent(text)}`
);
let json = await res.json();

if (!json.status || !json.result || !json.result.search_data?.length) {
return conn.sendMessage(m.chat, { text: `📍  No se han encontrado videos relacionados.` }, { quoted: m });
}

let resultados = json.result.search_data;

for (let i = 0; i < resultados.length; i++) {
let r = resultados[i];

if (r.download?.video_original) {
await conn.sendMessage(m.chat, {
video: { url: r.download.video_original },
caption: null,
});
}
}
} catch (e) {
console.error(e);
await conn.sendMessage(m.chat, { text: `*[ 📍 ]*  ERROR_COMMAND = ${e}` }, { quoted: m });
}
};

handler.help = ["capcut <texto>"];
handler.tags = ["search"];
handler.command = ["cuts", "capcuts"];

export default handler;
