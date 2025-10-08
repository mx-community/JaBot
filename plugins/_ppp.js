import fetch from "node-fetch";
import fs from "fs";
import path from "path";

const handler = async (m, { conn, text, usedPrefix, command }) => {
  try {
    if (!text) return conn.reply(m.chat, `*❌ Ingresa el nombre del anime para buscar.*`, m);

    await m.react('⏳'); // reacciona mientras busca

    // Llamada a la API
    const apiUrl = `https://api-nv.eliasaryt.pro/api/animedl?query=${encodeURIComponent(text)}&key=hYSK8YrJpKRc9jSE`;
    const res = await fetch(apiUrl);
    const data = await res.json();

    if (!data.results?.status) return conn.reply(m.chat, '*❌ Anime no encontrado.*', m);

    const anime = data.results;

    // Construir mensaje de info
    let info = `🎬 *${anime.title}* (${anime.type})\n\n`;
    info += `📝 *Descripción:*\n${anime.description}\n\n`;
    info += `📺 *Episodios:* ${anime.episodios}\n\n`;
    info += `🔗 *Link principal:* ${anime.url}\n\n`;
    info += `📄 *Lista de episodios:* \n`;
    anime.episodes.forEach(ep => {
      info += `• Episodio ${ep.episode} [${ep.idioma}]: ${ep.pixeldrain}\n`;
    });

    // Enviar mensaje con imagen de portada
    await conn.sendMessage(m.chat, {
      image: { url: anime.image },
      caption: info
    }, { quoted: m });

    // Crear documento descargable (txt)
    const docContent = `
🎬 ${anime.title} (${anime.type})

📝 Descripción:
${anime.description}

📺 Episodios: ${anime.episodios}

🔗 Link principal: ${anime.url}

📄 Lista de episodios:
${anime.episodes.map(ep => `Episodio ${ep.episode} [${ep.idioma}]: ${ep.pixeldrain}`).join('\n')}
    `.trim();

    const docPath = path.join('./', `${anime.title.replace(/[^a-zA-Z0-9]/g, '_')}_anime.txt`);
    fs.writeFileSync(docPath, docContent);

    // Enviar documento
    await conn.sendMessage(m.chat, {
      document: { url: docPath },
      mimetype: 'text/plain',
      fileName: `${anime.title}_Anime.txt`
    }, { quoted: m });

    // Opcional: borrar archivo local
    fs.unlinkSync(docPath);

  } catch (err) {
    console.error(err);
    conn.reply(m.chat, '*❌ Ocurrió un error al buscar el anime.*', m);
  }
};

handler.command = /^(animedl|anime)$/i;
handler.tags = ['anime'];
handler.help = ['animedl <nombre del anime>'];

export default handler;