import axios from 'axios';

const handler = async (m, { text, conn, args }) => {
if (!args[0]) {
return conn.sendMessage(m.chat, { text: `Ingrese el comando mas un enlace de un video de *Kwaii* para descargarlo.` }, { quoted: m })
}

const kwaiUrl = args[0];
let res;

try {
await conn.sendMessage(m.chat, { text: `Descargando el video, espere un momento...` }, { quoted: m });
res = await axios.get(`https://api.nexfuture.com.br/api/downloads/kwai/dl?url=${kwaiUrl}`);
} catch (e) {
return conn.sendMessage(m.chat, { text: `📍  No se ha podido acceder al enlace.\n- Verifique si el enlace es de *Kwaii* y vuelva a intentarlo.` }, { quoted: m });
}

const result = res.data;
if (!result.status) {
return conn.sendMessage(m.chat, { text: `📍  No se han encontrado resultados en el enlace.` }, { quoted: m })
}

const videoTitle = result.resultado.titulo;
const videoDescription = result.resultado.descricao;
const videoCreator = result.resultado.criador.nome;
const videoUrl = result.resultado.video;
const thumbnailUrl = result.resultado.thumbnail;

if (!videoUrl) {
return conn.sendMessage(m.chat, { text: `📍  No se ha encontrado un enlace valido del video.` }, { quoted: m });
}

const txtKwaii = `·─┄ · ✦ *Kwaii : Download* ✦ ·

⊹ ✎ *Título:* ${videoTitle}
⊹ ✎ *Descripción:* ${videoDescription}
⊹ ✎ *Creado por:* ${videoCreator}
⊹ ✎ *Publicado:* ${new Date(result.resultado.publicado).toLocaleString()}`.trim();

const maxRetries = 3;

for (let attempt = 1; attempt <= maxRetries; attempt++) {
try {
await conn.sendMessage(m.chat, { video: { url: videoUrl }, caption: caption, thumbnail: thumbnailUrl, mimetype: 'video/mp4' }, { quoted: m });
break;
} catch (e) {
if (attempt === maxRetries) {
return await conn.sendMessage(m.chat, { text: `*[ 📍 ]*  ERROR_COMMAND = ${e}` }, { quoted: m });
}
await new Promise(resolve => setTimeout(resolve, 1000));
}
}
}

handler.help = ['kwaii  <url>'];
handler.tags = ['descargas'];
handler.command = ['kwaii', 'kw'];

export default handler;

  
