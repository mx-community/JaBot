import fetch from "node-fetch";

async function getLangs(episodes) {
  // Suponiendo que tu API ya devuelve los enlaces directos de sub y dub
  return episodes.map(ep => ({
    ...ep,
    lang: ep.sub ? ["sub"] : ep.dub ? ["dub"] : []
  }));
}

let handler = async (m, { command, usedPrefix, conn, text, args }) => {
  if (!text) return m.reply(
    `🌱 *Ingresa el título de algún anime.*\n\n` +
    `• ${usedPrefix + command} Bocchi the Rock`
  );

  try {
    m.react("⌛");
    const res = await fetch(`https://api-nv.eliasaryt.pro/api/animedl?query=${encodeURIComponent(text)}&key=hYSK8YrJpKRc9jSE`);
    const data = await res.json();

    if (!data.results || !data.results.status) return m.reply("❌ No se encontraron resultados.");

    const info = data.results;
    const episodes = await getLangs(info.episodes);

    const eps = episodes.map(e => {
      return `• Episodio ${e.episode} (${e.lang.includes("sub") ? "SUB" : ""}${e.lang.includes("dub") ? (e.lang.includes("sub") ? " & " : "") + "DUB" : ""})`;
    }).join("\n");

    const caption = `
乂 \`\`\`ANIME - DOWNLOAD\`\`\`

≡ 🌷 *Título :* ${info.title}
≡ 🌾 *Tipo :* ${info.type}
≡ 🌲 *Descripción :* ${info.description || "Sin descripción"}
≡ 🎬 *Episodios disponibles :* ${episodes.length}

${eps}

> Responde a este mensaje con el número del episodio y el idioma. Ejemplo: *1 sub*, *3 dub*
`.trim();

    const buffer = await (await fetch(info.image)).arrayBuffer();
    const sent = await conn.sendMessage(
      m.chat,
      { image: Buffer.from(buffer), caption },
      { quoted: m }
    );

    conn.anime = conn.anime || {};
    conn.anime[m.sender] = {
      title: info.title,
      episodes,
      key: sent.key,
      downloading: false,
      timeout: setTimeout(() => delete conn.anime[m.sender], 600_000) // 10 minutos
    };

  } catch (e) {
    console.error("Error en handler anime:", e);
    m.reply("⚠️ Error al procesar la solicitud: " + e.message);
  }
};

handler.before = async (m, { conn }) => {
  conn.anime = conn.anime || {};
  const session = conn.anime[m.sender];
  if (!session || !m.quoted || m.quoted.id !== session.key.id) return;

  if (session.downloading) return m.reply("⏳ Ya estás descargando un episodio. Espera a que termine.");

  let [epStr, langInput] = m.text.trim().split(/\s+/);
  const epi = parseInt(epStr);
  let idioma = langInput?.toLowerCase();

  if (isNaN(epi)) return m.reply("❌ Número de episodio no válido.");

  const episode = session.episodes.find(e => parseInt(e.episode) === epi);
  if (!episode) return m.reply(`❌ Episodio ${epi} no encontrado.`);

  const availableLangs = episode.lang || [];
  if (!availableLangs.length) return m.reply(`❌ No hay idiomas disponibles para el episodio ${epi}.`);

  if (!idioma || !availableLangs.includes(idioma)) {
    idioma = availableLangs[0]; // fallback
  }

  const idiomaLabel = idioma === "sub" ? "sub español" : "español latino";
  await m.reply(`📥 Descargando *${session.title}* - cap ${epi} (${idiomaLabel})`);
  m.react("📥");

  session.downloading = true;

  try {
    const videoRes = await fetch(episode[idioma]); // aquí debe estar el link directo de la API
    const videoBuffer = await videoRes.arrayBuffer();

    await conn.sendFile(
      m.chat,
      Buffer.from(videoBuffer),
      `${session.title} - cap ${epi} ${idiomaLabel}.mp4`,
      "",
      m,
      false,
      { mimetype: "video/mp4", asDocument: true }
    );

    m.react("✅");
  } catch (err) {
    console.error("Error al descargar:", err);
    m.reply("⚠️ Error al descargar el episodio: " + err.message);
  }

  clearTimeout(session.timeout);
  delete conn.anime[m.sender];
};

handler.command = ["anime", "animedl"];
handler.tags = ["download"];
handler.help = ["animedl"];
handler.premium = true;

export default handler;