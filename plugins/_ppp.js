import fetch from "node-fetch";
import fs from "fs";
import path from "path";

// Objeto para guardar animes pendientes por usuario
let pendingDownloads = {};

const handler = async (m, { conn, text, usedPrefix, command }) => {
  try {
    // Si el usuario tiene un anime pendiente y envía un número -> descargar capítulo
    if (pendingDownloads[m.sender] && !isNaN(text)) {
      const anime = pendingDownloads[m.sender];
      const episodeNum = parseInt(text);

      if (episodeNum < 1 || episodeNum > anime.episodes.length) {
        return conn.reply(m.chat, '*❌ Número de episodio inválido.*', m);
      }

      const episode = anime.episodes[episodeNum - 1];
      await m.react('⏳'); // esperando descarga

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

      // Enviar como documento
      await conn.sendMessage(m.chat, {
        document: { url: filePath },
        mimetype: 'video/mp4',
        fileName: `${anime.title}_Ep${episode.episode}.mp4`,
        caption: `🎬 *${anime.title}* - Episodio ${episode.episode}`
      }, { quoted: m });

      fs.unlinkSync(filePath); // borrar archivo local
      delete pendingDownloads[m.sender]; // limpiar pendiente
      return;
    }

    // Si es un nuevo comando de búsqueda
    if (!text) return conn.reply(m.chat, `*❌ Ingresa el nombre del anime para buscar.*`, m);
    await m.react('⏳');

    const apiUrl = `https://api-nv.eliasaryt.pro/api/animedl?query=${encodeURIComponent(text)}&key=hYSK8YrJpKRc9jSE`;
    const res = await fetch(apiUrl);
    const data = await res.json();

    if (!data.results?.status) return conn.reply(m.chat, '*❌ Anime no encontrado.*', m);

    const anime = data.results;
    pendingDownloads[m.sender] = anime; // guardar anime para la respuesta del usuario

    // Construimos mensaje con lista de episodios
    let info = `🎬 *${anime.title}* (${anime.type})\n\n`;
    info += `📝 *Descripción:*\n${anime.description}\n\n`;
    info += `📺 *Episodios:* ${anime.episodios}\n\n`;
    info += `🔗 *Link principal:* ${anime.url}\n\n`;
    info += `*Responde con el número del episodio que deseas descargar:* \n`;
    anime.episodes.forEach(ep => {
      info += `• ${ep.episode} [${ep.idioma}]\n`;
    });

    await conn.sendMessage(m.chat, {
      image: { url: anime.image },
      caption: info
    }, { quoted: m });

  } catch (err) {
    console.error(err);
    conn.reply(m.chat, '*❌ Ocurrió un error al procesar tu solicitud.*', m);
  }
};

handler.command = ['animedl', 'anime']i;
handler.tags = ['anime'];
handler.help = ['animedl <nombre del anime>'];

export default handler;