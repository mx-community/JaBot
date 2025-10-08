import fetch from "node-fetch";

// === Handler principal del comando ===
let handler = async (m, { conn, text, usedPrefix, command }) => {
  try {
    if (!text) return conn.reply(m.chat, `*🌷 Uso correcto: ${usedPrefix + command} <Bocchi the rock>*`, m, rcanal);

    await m.reply('⏳ Buscando anime...');

    const res = await fetch(`https://api-nv.eliasaryt.pro/api/animedl?query=${encodeURIComponent(text)}&key=hYSK8YrJpKRc9jSE`);
    const data = await res.json();

    if (!data.results || !data.results.status) 
      return conn.reply(m.chat, '*❌ No se encontró el anime.*', m);

    const anime = data.results;

    // Mensaje con info del anime y episodios
    let info = `╭══✦〘 ANIME INFO 〙✦══╮
│ 📌 *Título:* ${anime.title}
│ 📚 *Tipo:* ${anime.type}
│ 🎬 *Episodios disponibles:* ${anime.episodios}
│ 📝 *Descripción:*
│ ${anime.description.split("\n").join("\n│ ")}
╰═══════════════╯\n\n`;

    info += '*💡 Responde con el número del episodio y el idioma (ej: 1 Español) para descargar.*\n\n';
    
    anime.episodes.forEach(ep => {
      info += `• Episodio ${ep.episode} - ${ep.idioma}\n`;
    });

    // Enviar mensaje con imagen del anime
    await conn.sendMessage(m.chat, { image: { url: anime.image }, caption: info }, { quoted: m });

    // Guardamos temporalmente los episodios en memoria
    global.animeCache = global.animeCache || {};
    global.animeCache[m.chat] = anime.episodes;

  } catch (err) {
    console.error(err);
    conn.reply(m.chat, '*❌ Ocurrió un error al buscar el anime.*', m);
  }
};

// === Handler para descargar episodio según respuesta del usuario ===
let downloadHandler = async (m, { conn, text }) => {
  try {
    if (!global.animeCache || !global.animeCache[m.chat]) return;

    const [epNumber, ...langParts] = text.split(" ");
    const epLang = langParts.join(" ");
    if (!epNumber || !epLang) return;

    const episode = global.animeCache[m.chat].find(e => e.episode == epNumber && e.idioma.toLowerCase() === epLang.toLowerCase());
    if (!episode) return conn.reply(m.chat, '*❌ No se encontró ese episodio o idioma.*', m);

    await conn.sendMessage(m.chat, { text: `✅ Episodio ${episode.episode} - ${episode.idioma}\n🔗 Link de descarga: ${episode.pixeldrain}` }, { quoted: m });

  } catch (err) {
    console.error(err);
    conn.reply(m.chat, '*❌ Ocurrió un error al enviar el episodio.*', m);
  }
};

// === Exportar el comando ===
handler.command = ['anime', 'animedl']; // Puedes agregar más aliases
handler.limit = true; // Si quieres limitar su uso
handler.rowner = false; // No solo para owner
handler.mods = false;
handler.premium = true;

export { handler, downloadHandler };