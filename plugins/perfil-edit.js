import fetch from 'node-fetch';
const handler = async (m, { conn, command, usedPrefix, text }) => {
let comandos = `〆  P R O F I L E  :  R P G

\t⸭ 📌 \`\`\`Edita tu perfil rpg.\`\`\`

\t\t⧡ #p-genero  >  *(add)*
\t⧡ #d-genero  >  *(delete)*

\t\t⧡ #p-desc  >  *(add)*
\t⧡ #d-desc  >  *(delete)*

\t\t⧡ #p-birth  >  *(add)*
\t⧡ #d-birth  >  *(delete)*

\t\t⧡ #p-age  >  *(add)*
\t⧡ #d-age  >  *(delete)*

\t\t⧡ #p-red  >  *(add)*
\t⧡ #d-red  >  *(delete)*

> ${textbot}`
const thumb = Buffer.from(await (await fetch(`${global.mMages}`)).arrayBuffer())
await conn.sendMessage(m.chat, { text: `${}`, mentions: [m.sender], contextInfo: { externalAdReply: { 
title: "々  P R O F I L E  :  R P G  々", 
body: botname, 
thumbnail: thumb, 
sourceUrl: null, 
mediaType: 1, renderLargerThumbnail: true }}}, { quoted: m })
};


handler.help = ['myp'];
handler.tags = ['rpg'];
handler.command = ['myp'];

export default handler;

