import axios from 'axios';
let handler = async (m, { conn, text, usedPrefix, command }) => {
if (!text) return conn.sendMessage(m.chat, { text: `Ingrese el comando mas un enlace valido de un archivo de *TeraBox* para descargarlo.` }, { quoted: m });
await conn.sendMessage(m.chat, { text: `Descargando contenido, espere un momento...` }, { quoted: m });
try {
const result = await terabox(text);
if (!result.length) return conn.sendMessage(m.chat, { text: `📍  No se ha podido acceder al enlace.\n- Verifique si el enlace es de un archivo de *TeraBox.*`}, { quoted: m })

for (let i = 0; i < result.length; i++) {
const { fileName, type, thumb, url } = result[i];
const captions = `·─┄ · ✦ *Terabox - Download* ✦ ·

⊸⊹ *Plataforma:* TeraBox
⊸⊹ *Nombre:* ${fileName}
⊸⊹ *Formato:* ${type}
⊸⊹ *Enlace:* ${url}`;

 await conn.sendFile(m.chat, url, fileName, '', m, false, { thumbnail: thumb ? await getBuffer(thumb) : null});
}
} catch (err) {
console.error(err);
await conn.sendMessage(m.chat, { text: `*[ 📍 ]*  ERROR_COMMAND = ${err}` }, { quoted: m });
}
};

handler.command = ["terabox", "tbx"];
handler.help = ["terabox", "tbx"];
handler.tags = ["descargas"];

export default handler;

async function terabox(url) {
return new Promise(async (resolve, reject) => {
await axios
.post('https://teradl-api.dapuntaratya.com/generate_file', {
mode: 1,
url: url
})
.then(async (a) => {
const array = [];
for (let x of a.data.list) {
let dl = await axios
.post('https://teradl-api.dapuntaratya.com/generate_link', {
js_token: a.data.js_token,
cookie: a.data.cookie,
sign: a.data.sign,
timestamp: a.data.timestamp,
shareid: a.data.shareid,
uk: a.data.uk,
fs_id: x.fs_id
})
.then((i) => i.data)
.catch((e) => e.response);

if (!dl.download_link) continue;

array.push({
fileName: x.name,
type: x.type,
thumb: x.image,
url: dl.download_link.url_1
});
}
resolve(array);
})
.catch((e) => reject(e.response.data));
});
}


async function getBuffer(url) {
try {
const res = await axios({
method: 'get',
url,
responseType: 'arraybuffer'
});
return res.data;
} catch (err) {
console.error(err);
return null;
}
                     }
  
