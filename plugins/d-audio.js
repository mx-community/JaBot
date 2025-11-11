import axios from 'axios';
import crypto from 'crypto';

const savetube = {
api: {
base: "https://media.savetube.me/api",
cdn: "/random-cdn",
info: "/v2/info",
download: "/download"
},
headers: {
'accept': '*/*',
'content-type': 'application/json',
'origin': 'https://yt.savetube.me',
'referer': 'https://yt.savetube.me/',
'user-agent': 'Postify/1.0.0'
},

crypto: {
hexToBuffer: (hexString) => {
const matches = hexString.match(/.{1,2}/g);
return Buffer.from(matches.join(''), 'hex');
},

decrypt: async (enc) => {
const secretKey = 'C5D58EF67A7584E4A29F6C35BBC4EB12';
const data = Buffer.from(enc, 'base64');
const iv = data.slice(0, 16);
const content = data.slice(16);
const key = savetube.crypto.hexToBuffer(secretKey);

const decipher = crypto.createDecipheriv('aes-128-cbc', key, iv);
let decrypted = decipher.update(content);
decrypted = Buffer.concat([decrypted, decipher.final()]);

return JSON.parse(decrypted.toString());
}
},

isUrl: str => { 
try { 
new URL(str); 
return true; 
} catch (_) { 
return false; 
} 
},

youtube: url => {
const patterns = [
/youtube\.com\/watch\?v=([a-zA-Z0-9_-]{11})/,
/youtube\.com\/embed\/([a-zA-Z0-9_-]{11})/,
/youtube\.com\/v\/([a-zA-Z0-9_-]{11})/,
/youtube\.com\/shorts\/([a-zA-Z0-9_-]{11})/,
/youtu\.be\/([a-zA-Z0-9_-]{11})/
];
for (let regex of patterns) {
if (regex.test(url)) return url.match(regex)[1];
}
return null;
},

request: async (endpoint, data = {}, method = 'post') => {
try {
const { data: response } = await axios({
method,
url: `${endpoint.startsWith('http') ? '' : savetube.api.base}${endpoint}`,
data: method === 'post' ? data : undefined,
params: method === 'get' ? data : undefined,
headers: savetube.headers
});
return { status: true, code: 200, data: response };
} catch (error) {
return {
status: false,
code: error.response?.status || 500,
error: error.message
};
}
},

getCDN: async () => {
const response = await savetube.request(savetube.api.cdn, {}, 'get');
if (!response.status) return response;
return { status: true, code: 200, data: response.data.cdn };
},

download: async (link) => {
if (!link) return { status: false, code: 400, error: "Falta el enlace de YouTube." };
if (!savetube.isUrl(link)) return { status: false, code: 400, error: "URL inválida de YouTube." };

const id = savetube.youtube(link);
if (!id) return { status: false, code: 400, error: "*No se pudo extraer el ID del video.*" };

try {
const cdnRes = await savetube.getCDN();
if (!cdnRes.status) return cdnRes;
const cdn = cdnRes.data;

const infoRes = await savetube.request(`https://${cdn}${savetube.api.info}`, {
url: `https://www.youtube.com/watch?v=${id}`
});
if (!infoRes.status) return infoRes;

const decrypted = await savetube.crypto.decrypt(infoRes.data.data);

const dl = await savetube.request(`https://${cdn}${savetube.api.download}`, {
id: id,
downloadType: 'audio',
quality: '128',
key: decrypted.key
});

return {
status: true,
code: 200,
result: {
title: decrypted.title || "Desconocido",
type: 'audio',
format: 'mp3',
thumbnail: decrypted.thumbnail || `https://i.ytimg.com/vi/${id}/maxresdefault.jpg`,
download: dl.data.data.downloadUrl,
id: id,
key: decrypted.key,
duration: decrypted.duration,
quality: '128'
}
};

} catch (error) {
return { status: false, code: 500, error: error.message };
}
}
};

function formatDuration(seconds) {
if (isNaN(seconds)) return "??:?? min";
let h = Math.floor(seconds / 3600);
let m = Math.floor((seconds % 3600) / 60);
let s = seconds % 60;
if (h > 0) {
return `${h}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')} min`;
} else {
return `${m}:${s.toString().padStart(2, '0')} min`;
}
}

const handler = async (m, { conn, args }) => {
if (!args[0]) return conn.sendMessage(m.chat, { text: `Ingrese el comando mas un enlace de un video de *YouTube* para descargarlo en audio.` }, { quoted: m });
let url = args[0];
if (!savetube.isUrl(url)) return conn.sendMessage(m.chat, { text: `📍  El enlace ingresado no es valido.\n- Recuerde copiar el enlace de un video de *YouTube* para descargarlo en audio.` }, { quoted: m })
try {
conn.sendMessage(m.chat, { text: `Descargando audio, espere un momento...` }, { quoted: m });
let res = await savetube.download(url);
if (!res.status) {
return conn.sendMessage(m.chat, { text: `📍  No se ha podido descargar el audio, intentelo de nuevo.` }, { quoted: m })
}
const { title, duration, thumbnail, download } = res.result;
const durationFormatted = formatDuration(Number(duration));
await conn.sendMessage( m.chat, { audio: { url: download }, fileName: `${title}.mp3`, mimetype: "audio/mpeg", ptt: false, contextInfo: { externalAdReply: { title: title, body: `🌿 Duración: ${durationFormatted}`, sourceUrl: url, thumbnailUrl: thumbnail, mediaType: 1, renderLargerThumbnail: true }}}, { quoted: m });

} catch (e) {
await conn.sendMessage(m.chat, { text: `*[ 📍 ]*  ERROR_COMMAND = Command error, try again and if the error persists, report the command.` }, { quoted: m });
}
};

handler.command = ['yta', 'mp3', 'audio'];
export default handler;