import fetch from "node-fetch";
import fs from "fs";
import path from "path";

let handler = async (m, { conn, text, usedPrefix, command }) => {
  try {
    global.animeCache = global.animeCache || {};

    // === Detectar si es respuesta con episodio ===
    if (global.animeCache[m.chat] && text && /^\d+\s+\w+/i.test(text)) {
      const [epNumber, ...langParts] = text.split(" ");
      const epLang = langParts.join(" ");

      const episode = global.animeCache[m.chat].find(e => e.episode == epNumber && e.idioma.toLowerCase() === epLang.toLowerCase());
      if (!episode) return conn.reply(m.chat, '*❌ No se encontró ese episodio o idioma.*', m);
      if (!episode.pixeldrain) return conn.reply(m.chat, '*❌ Este episodio no tiene enlace de descarga disponible.*', m);

      await m.reply('⏳ Descargando episodio...');

      // Descargar episodio
      const res = await fetch(episode.pixeldrain);
      const buffer = await res.arrayBuffer();
      const sizeMB = buffer.byteLength / 1024 / 1024;

      // Limite de WhatsApp
      if (sizeMB > 90) {
        return conn.reply(m.chat, `⚠️ El episodio pesa ${sizeMB.toFixed(2)}MB, demasiado grande para enviar por WhatsApp.\nAquí tienes el enlace de descarga:\n${episode.pixeldrain}`, m);
      }

      // Guardar temporalmente
      const filePath = path.join('/tmp', `ep${episode.episode}_${epLang}.mp4`);
      fs.writeFileSync(filePath, Buffer.from(buffer));

      // Enviar video
      await conn.sendMessage(m.chat, { video: fs.readFileSync(filePath), caption: `✅ Episodio ${episode.episode} - ${episode.idioma}` }, { quoted: m });

      // Borrar archivo temporal
      fs.unlinkSync(filePath);

      return;
    }

    // === Si es comando nuevo de anime ===
    if (!text) return conn.reply(m.chat, `*🌷 Uso correcto: ${usedPrefix + command} <Nombre del anime>*`, m);

    await conn.reply(m.chat, '⏳ Buscando anime...');

    const res = await fetch(`https://api-nv.eliasaryt.pro/api/animedl?query=${encodeURIComponent(text)}&key=hYSK8YrJpKRc9jSE`);
    const data = await res.json();

    if (!data.results || !data.results.status) 
      return conn.reply(m.chat, '*❌ No se encontró el anime.*', m);

    const anime = data.results;

    let info = `╭══✦〘 ANIME INFO 〙✦══╮
│ 📌 *Título:* ${anime.title}
│ 📚 *Tipo:* ${anime.type}
│ 🎬 *Episodios disponibles:* ${anime.episodes?.length || '0'}
│ 📝 *Descripción:*
│ ${anime.description?.split("\n").join("\n│ ") || 'Sin descripción'}
╰═══════════════╯\n\n`;

    info += '*💡 Responde con el número del episodio y el idioma (ej: 1 Español) para descargar.*\n\n';

    anime.episodes?.forEach(ep => {
      info += `• Episodio ${ep.episode} - ${ep.idioma}\n`;
    });

    await conn.sendMessage(m.chat, { image: { url: anime.image }, caption: info }, { quoted: m });

    // Guardamos episodios en caché
    global.animeCache[m.chat] = anime.episodes;

  } catch (err) {
    console.error(err);
    conn.reply(m.chat, '*❌ Ocurrió un error al procesar tu solicitud.*', m);
  }
};

handler.command = ['anime', 'animedl'];
handler.limit = true;
handler.rowner = false;
handler.mods = false;
handler.premium = true;

export default handler;