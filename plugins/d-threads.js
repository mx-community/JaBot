import axios from "axios";
const handler = async (m, { conn, args, command, usedPrefix }) => {
if (!args[0]) return conn.sendMessage(m.chat, { text: `Ingrese el comando mas un enlace de un video o imagen de *Threads* para descargarlo.` }, { quoted: m });
try {
const res = await axios.get(global.baseapi_delirius + "/download/threads", { params: { url: args[0] }});
if (res.data.status && res.data.data.media.length > 0) {
const contextoTh = `
*THREADS - DOWNLOAD*
┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄

⊸⊹ *Usuario:* ${res.data.data.username || "---"}
⊸⊹ *Likes:* ${res.data.data.likes || "---"}
⊸⊹ *Enlace:* ${args[0].trim()}

📍  Se esta descargando el contenido, espere un momento...`;
await conn.sendMessage(m.chat, { text: contextoTh }, { quoted: m });
const media = res.data.data.media;
for (const item of media) {
if (item.type === "image") {
await conn.sendMessage(m.chat, { image: { url: item.url } }, { quoted: m } );
} else if (item.type === "video") {
await conn.sendMessage(m.chat, { video: { url: item.url } }, { quoted: m } );
    }
  }
} else {
await conn.sendMessage(m.chat, { text: `No se han encontrado resultados en el enlace, verifique el enlace coincide y vuelva a intentarlo.` }, { quoted: m });
}
} catch (err) {
await conn.sendMessage(m.chat, { text: `*[ 📍 ]*  ERROR_COMMAND = ${err}` }, { quoted: m });
console.log(new Error(err).message);
}
};

handler.command = ["threads", "th"];

export default handler;
