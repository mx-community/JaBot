import fetch from 'node-fetch';

var handler = async (m, { conn, args, usedPrefix, command }) => {
  const emoji = '🎵';

  if (!args[0]) {
    return conn.reply(
      m.chat,
      `${emoji} *¡Oh no~!* pásame un enlace de YouTube para traer el audio.\n\nUso:\n\`${usedPrefix + command} https://youtu.be/KHgllosZ3kA\``,
      m,
      { quoted: m }
    );
  }

  try {
    await conn.reply(
      m.chat,
      `🌸 *Procesando tu petición...*\nUn momento, senpai~ 🎧`,
      m,
      { quoted: m }
    );

    const url = args[0];
    const apiUrl = `https://dark-core-api.vercel.app/api/download/YTMP3?key=api&url=${encodeURIComponent(url)}`;
    const res = await fetch(apiUrl);
    const json = await res.json();

    if (!json.status || !json.download) {
      return conn.reply(
        m.chat,
        `❌ *No pude descargar el audio.*\nRazón: ${json.message || 'Respuesta inválida de la API.'}`,
        m,
        { quoted: m }
      );
    }

    const audioRes = await fetch(json.download);
    const audioBuffer = await audioRes.buffer();

    const caption = `
╭───[ 𝚈𝚃𝙼𝙿𝟹 • 🎶 ]───⬣
📌 *Título:* ${json.title}
📁 *Formato:* ${json.format}
📎 *Fuente:* ${url}
╰────────────────⬣`;

    await conn.sendMessage(
      m.chat,
      {
        audio: audioBuffer,
        mimetype: 'audio/mpeg',
        fileName: `${json.title}.mp3`,
        ptt: false,
        caption
      },
      { quoted: m }
    );

  } catch (e) {
    console.error(e);
    await conn.reply(
      m.chat,
      `❌ *Ocurrió un error al procesar el audio.*\nDetalles: ${e.message}`,
      m,
      { quoted: m }
    );
  }
};

handler.help = ['ytmp3'].map(v => v + ' <link>');
handler.tags = ['descargas'];
handler.command = ['ytpp', 'ytaudio', 'mp3'];

export default handler;
                                                   
