import fetch from "node-fetch";
import fs from "fs";
import path from "path";

let pendingDownloads = {}; // Para guardar el anime temporal mientras el usuario elige

const handler = async (m, { conn, text, usedPrefix, command }) => {
  try {
    if (!text) return conn.reply(m.chat, `*❌ Ingresa el nombre del anime para buscar.*`, m);
    await m.react('⏳');

    // Llamada a la API
    const apiUrl = `https://api-nv.eliasaryt.pro/api/animedl?query=${encodeURIComponent(text)}&key=hYSK8YrJpKRc9jSE`;
    const res = await fetch(apiUrl);
    const data = await res.json();

    if (!data.results?.status) return conn.reply(m.chat, '*❌ Anime no encontrado.*', m);

    const anime = data.results;

    // Guardamos el anime para que el usuario pueda responder con el capítulo
    pendingDownloads[m.sender] = anime;

    // Construimos mensaje con la lista de episodios
    let info = `🎬 *${anime.title}* (${anime.type})\n\n`;
    info += `📝 *Descripción:*\n${anime.description}\n\n`;
    info += `📺 *Episodios:* ${anime.episodios}\n\n`;
    info += `🔗 *Link principal:* ${anime.url}\n\n`;
    info += `*Responde con el número del episodio que deseas descargar:*\n`;
    anime.episodes.forEach(ep => {
      info += `• ${ep.episode} [${ep.idioma}]\n`;
    });

    await conn.sendMessage(m.chat, { image: { url: anime.image }, caption: info }, { quoted: m });

  } catch (err) {
    console.error(err);
    conn.reply(m.chat, '*❌ Ocurrió un error al buscar el anime.*', m);
  }
};

// --- Handler para la respuesta del usuario con el episodio ---
const chooseEpisodeHandler = async (m, { conn, text }) => {
  const anime = pendingDownloads[m.sender];
  if (!anime) return; // no hay descarga pendiente

  const episodeNum = parseInt(text);
  if (!episodeNum || episodeNum < 1 || episodeNum > anime.episodes.length) 
    return conn.reply(m.chat, '*❌ Número de episodio inválido.*', m);

  const episode = anime.episodes[episodeNum - 1];
  await m.react('⏳'); // esperando descarga

  try {
    // Descargar el episodio de Pixeldrain
    const fileName = `${anime.title}_Ep${episode.episode}.mp4`;
    const filePath = path.join('./', fileName);

    const resp = await fetch(episode.pixeldrain);
    const fileStream = fs.createWriteStream(filePath);
    await new Promise((resolve, reject) => {
      resp.body.pipe(fileStream);
      resp.body.on("error", reject);
      fileStream.on("finish", resolve);
    });

    // Enviar video
    await conn.sendMessage(m.chat, {
      video: { url: filePath },
      caption: `🎬 *${anime.title}* - Episodio ${episode.episode}`,
    }, { quoted: m });

    fs.unlinkSync(filePath); // borrar archivo local
    delete pendingDownloads[m.sender]; // limpiar pendiente

  } catch (err) {
    console.error(err);
    conn.reply(m.chat, '*❌ Error al descargar el episodio.*', m);
  }
};

handler.command = /^(animedl|anime)$/i;
handler.tags = ['anime'];
handler.help = ['animedl <nombre del anime>'];

export { handler, chooseEpisodeHandler };