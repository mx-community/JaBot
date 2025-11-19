import fetch from 'node-fetch';

let handler = async(m, { conn, text, usedPrefix, command }) => {
if (!text) return conn.sendMessage(m.chat, { text: `Ingrese el comando y el nombre del pais para ver su informacion.\n\n• Por ejemplo:\n*#${command}* Argentina` }, { quoted: m });
try {
await m.react("⏳");
let api = `https://delirius-apiofc.vercel.app/tools/flaginfo?query=${text}`;
let response = await fetch(api);
let json = await response.json();
let datas = json.data;
let park = `〆  C O U N T R Y  :  D A T A
\t𝇈 📍 \`\`\`Informacion del país.\`\`\`

\t\t⧆ *Nombre* : ${datas.officialName} *(${text})*
\t\t⧆ *Organización* : ${datas.memberOf}
\t\t⧆ *Capital* : ${datas.capitalCity}
\t\t⧆ *Continente* : ${datas.continent}
\t\t⧆ *Población* : ${population} aproximadamente.
\t\t⧆ *Prefijo* : +${callingCode}
\t\t⧆ *Moneda* : ${datas.currency}

\t\t📍 *Descripción:*
\t» ${datas.description}


> ${textbot}`;
let img = datas.image;
const thumb = Buffer.from(await (await fetch(`https://qu.ax/YOhTt.jpg`)).arrayBuffer());
/*conn.sendMessage(m.chat, { text: park, mentions: [m.sender], contextInfo: { externalAdReply: { 
title: "々  C O U N T R Y  :  D A T A  々', 
body: botname, 
thumbnail: thumb, 
sourceUrl: null, 
mediaType: 1, renderLargerThumbnail: false }}}, { quoted: m });*/

conn.sendMessage(m.chat, { image: { url: img }, caption: park }, { quoted: fkontak });
} catch (e) {
await conn.sendMessage(m.chat, { text: `*[ 📍 ]*  ERROR_COMMAND = ${e}` }, { quoted: m });
m.react('❌');
  }
};

handler.command = ['pais', 'flag'];
export default handler;

