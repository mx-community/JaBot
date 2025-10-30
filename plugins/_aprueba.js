
import fetch from 'node-fetch';
let handler = async (m, { conn, text, usedPrefix, command }) => {
if (!text) return conn.sendMessage(m.chat, { text: `Ingrese el comando y escriba el nombre del usuario en *TikTok* para buscarlo.\n\n• *Por ejemplo:*\n${usedPrefix + command} ejemplo_usuario`}, { quoted: m });
await m.react('⏳');
try {
const res = await fetch(`https://vapis.my.id/api/tt-stalk?username=${text}`);
const json = await res.json();
if (!json.status || !json.data) {
return await conn.sendMessage(m.chat, { text: `📍  No se han encontrado resultados.\n- Verifica si esta bien escrito y vuelva a intentarlo.`}, { quoted: m });
}

const { uniqueId: username, nickname, avatarLarger: profile, verified, region } = json.data.user;
const { followerCount: followers, followingCount: following, heart: likes, videoCount: videos } = json.data.stats;

let txt = `· •──• ✦ *RESULTADO* ✦ •──• ·

⊸⊹ *Usuario:* ${username}
⊸⊹ *Nombre:* ${nickname}
⊸⊹ *Seguidores:* ${followers}
⊸⊹ *Seguidos:* ${following}
⊸⊹ *Likes:* ${likes}
⊸⊹ *Videos:* ${videos}
⊸⊹ *Verificado:* ${verified ? 'Sí' : 'No'}
⊸⊹ *Region:* ${region || 'No disponible'}`;
await conn.sendMessage(m.chat, { image: { url: profile }, caption: txt }, { quoted: m });
  //conn.sendMessage(m.chat, { text: txt, contextInfo: { externalAdReply: { title: botname, body: textbot, thumbnailUrl: profile, sourceUrl: null, mediaType: 1, showAdAttribution: true, renderLargerThumbnail: true }}} , { quoted: m });
} catch (error) {
console.error(error);
await conn.sendMessage(m.chat, { text: `*[ 📍 ]*  ERROR_COMMAND = Command error, try again and if the error persists, report the command.` }, { quoted: m });
}
};
handler.command = ['tiktok-user', 'user-tiktok', 'ttstalk'];
export default handler;
                                                                             
